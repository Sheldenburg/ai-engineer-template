from typing import Any

from fastapi import APIRouter, HTTPException, Response, status
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import (
    Item,
    ItemCreate,
    ItemPublic,
    ItemsPublic,
    ItemUpdate,
    Message,
    MessageBase,
)

from pydantic import BaseModel

from fastapi.responses import StreamingResponse

from openai import OpenAI

import os

from dotenv import load_dotenv

from app.api.utils import get_streamed_response
from app.models import (
    ChatConfig,
    ChatConfigBase,
    ChatConfigCreate,
    ChatConfigPublic,
    Chat,
    ChatPublic,
)

from app.core.security import encrypt_api_key, decrypt_api_key

router = APIRouter()

load_dotenv()


class ChatRequest(BaseModel):
    input: str
    messages: list[Message]
    chat_id: str


class ChatSaveReuqest(BaseModel):
    chat_id: str
    messages: list[MessageBase]


# SYSTEM_PROMPT = """You are a helpful assistant."""


def get_openai_generator_stream(
    chat_request: ChatRequest,
    system_message: str,
    session: SessionDep,
    current_user: CurrentUser,
):
    messages = chat_request.dict()["messages"]
    if len(messages) == 0:
        messages = [{"role": "system", "content": system_message}] + [
            {"role": "user", "content": chat_request.input}
        ]
    else:
        messages = messages + [{"role": "user", "content": chat_request.input}]
    # messages = chat_request.messages
    chatConfig = get_chat_config(session, current_user)
    client = OpenAI(api_key=chatConfig["api_key"])
    openai_stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
        # model="gpt-4o",
        messages=messages,
        temperature=0.0,
        stream=True,
    )
    final_response = ""
    for event in openai_stream:
        if event.choices[0].delta.content is not None:
            # print(event.choices[0].delta.content, end="")
            final_response += event.choices[0].delta.content
            yield event.choices[0].delta.content
    messages = messages + [{"role": "assistant", "content": final_response}]
    save_chat_to_db(
        chat_id=chat_request.chat_id,
        messages=messages,
        session=session,
        current_user=current_user,
    )


def get_openai_generator(chat_request: ChatRequest, system_message: str):
    messages = (
        [{"role": "system", "content": system_message}]
        + chat_request.messages
        + [{"role": "user", "content": chat_request.input}]
    )
    # messages = chat_request.messages
    client = OpenAI()
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.0,
        stream=False,
    )
    first_choice = response.model_dump()["choices"][0]
    return {"message": first_choice["message"]}


def get_chat_config(session: SessionDep, current_user: CurrentUser) -> ChatConfigPublic:
    statement = select(ChatConfig).where(ChatConfig.owner_id == current_user.id)
    chatConfig = session.exec(statement).first().dict()
    if not chatConfig:
        return ChatConfigPublic()
    else:
        chatConfig["api_key"] = decrypt_api_key(chatConfig["api_key_encrypted"])
    return chatConfig


def save_chat_to_db(
    session: SessionDep,
    current_user: CurrentUser,
    chat_id: str,
    messages: list[dict],
) -> dict:
    # messages = list(map(lambda x: Message(**x), messages))
    statement = select(Chat).where(Chat.id == chat_id)
    chatHistory = session.exec(statement).first()
    if chatHistory:
        # update the chat history based on the chat_id in sqlmodel
        try:
            chatHistory.messages = messages
            chatHistory.updated_at = func.now()
            session.add(chatHistory)
            session.commit()
            session.refresh(chatHistory)
        except Exception as e:
            print(e)
    else:
        # create a new chat history
        chatHistory = Chat(
            id=chat_id,
            chat_config_id=get_chat_config(session, current_user)["id"],
            messages=messages,
            owner_id=current_user.id,
            updated_at=func.now(),
        )
        session.add(chatHistory)
        session.commit()
        session.refresh(chatHistory)
    return chatHistory.dict()


@router.post("/config", response_model=ChatConfigBase)
def create_chat_config(
    *, session: SessionDep, current_user: CurrentUser, config_in: ChatConfigCreate
) -> Any:
    """
    Create chat config.
    """
    # check if the user already has a chat config
    statement = select(ChatConfig).where(ChatConfig.owner_id == current_user.id)
    chatConfig = session.exec(statement).first()
    if chatConfig:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has a chat config.",
        )

    chatConfig = ChatConfig.model_validate(
        config_in,
        update={
            "owner_id": current_user.id,
            "api_key_encrypted": encrypt_api_key(config_in.api_key),
        },
    )
    session.add(chatConfig)
    session.commit()
    session.refresh(chatConfig)
    return chatConfig


@router.get("/config", response_model=ChatConfigPublic)
def read_chat_config(
    session: SessionDep, current_user: CurrentUser
) -> ChatConfigPublic:
    """
    Retrieve chat config from db.

    """
    return get_chat_config(session, current_user)


@router.put("/config", response_model=ChatConfigPublic)
def create_chat_config(
    *, session: SessionDep, current_user: CurrentUser, config_in: ChatConfigCreate
) -> Any:
    """
    Create chat config.
    """
    # check if the user already has a chat config
    statement = select(ChatConfig).where(ChatConfig.owner_id == current_user.id)
    results = session.exec(statement)
    chatConfig = results.one()
    if not chatConfig:
        raise HTTPException(status_code=404, detail="Chat config not found")

    update_dict = config_in.dict(exclude_unset=True)
    update_dict["api_key_encrypted"] = encrypt_api_key(config_in.api_key)
    del update_dict["api_key"]
    for key, value in update_dict.items():
        setattr(chatConfig, key, value)

    session.add(chatConfig)
    session.commit()
    session.refresh(chatConfig)

    return chatConfig


@router.post("/")
async def chat_handler(
    chat_request: ChatRequest, session: SessionDep, current_user: CurrentUser
) -> dict:
    statement = select(ChatConfig).where(ChatConfig.owner_id == current_user.id)
    chatConfig = session.exec(statement).first()
    try:
        return get_openai_generator(chat_request, chatConfig.system_message)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/stream")
async def chat_stream_handler(
    chat_request: ChatRequest, session: SessionDep, current_user: CurrentUser
) -> StreamingResponse:
    content = ""
    # get the chat config from the database if it exists
    chatConfig = get_chat_config(session, current_user)
    try:
        return StreamingResponse(
            get_openai_generator_stream(
                chat_request, chatConfig["system_message"], session, current_user
            ),
            media_type="text/event-stream",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/chat_list", response_model=list[dict])
async def get_chat_list(session: SessionDep, current_user: CurrentUser) -> list:
    """
    Get a list of chats belong to the given user.
    """
    chatList = []
    statement = select(Chat).where(Chat.owner_id == current_user.id)
    allChats = session.exec(statement).all()
    # print(allChats)
    for chat in allChats:
        chatList.append({"id": chat.id, "title": chat.messages[1]["content"]})
    return chatList


@router.get("/{chat_id}", response_model=ChatPublic)
async def get_chat(
    chat_id: str,
    session: SessionDep,
) -> dict:
    """
    Get chat history.
    """
    statement = select(Chat).where(Chat.id == chat_id)
    chatHistory = session.exec(statement).first()
    if chatHistory:
        return chatHistory
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Chat history not found."
        )
