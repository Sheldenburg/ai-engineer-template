from typing import Any

from fastapi import APIRouter, HTTPException, Response, status
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Item, ItemCreate, ItemPublic, ItemsPublic, ItemUpdate, Message

from pydantic import BaseModel

from fastapi.responses import StreamingResponse

from openai import OpenAI

import os

from dotenv import load_dotenv

from app.api.utils import get_streamed_response
from app.models import ChatConfig, ChatConfigBase, ChatConfigCreate, ChatConfigPublic

from app.core.security import encrypt_api_key, decrypt_api_key

router = APIRouter()

load_dotenv()


class Message(BaseModel):
    content: str
    role: str
    function_call: str | None = None
    tool_call: str | None = None


class ChatRequest(BaseModel):
    input: str
    messages: list[Message]


SYSTEM_PROMPT = """You are a helpful assistant."""


def get_openai_generator_stream(chat_request: ChatRequest):
    messages = (
        [{"role": "system", "content": SYSTEM_PROMPT}]
        + chat_request.messages
        + [{"role": "user", "content": chat_request.input}]
    )
    # messages = chat_request.messages
    client = OpenAI()
    openai_stream = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=0.0,
        stream=True,
    )
    for event in openai_stream:
        if event.choices[0].delta.content is not None:
            # print(event.choices[0].delta.content, end="")
            yield event.choices[0].delta.content


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

    statement = select(ChatConfig).where(ChatConfig.owner_id == current_user.id)
    chatConfig = session.exec(statement).first().dict()
    chatConfig["api_key"] = decrypt_api_key(chatConfig["api_key_encrypted"])
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
    chat_request: ChatRequest,
) -> StreamingResponse:
    # 1. save and update the chat config in the database
    try:
        return StreamingResponse(
            get_openai_generator_stream(chat_request), media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
