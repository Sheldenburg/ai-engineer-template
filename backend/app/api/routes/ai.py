from typing import Any

from fastapi import APIRouter, HTTPException, Response, status
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Item, ItemCreate, ItemPublic, ItemsPublic, ItemUpdate, Message

from pydantic import BaseModel

from fastapi.responses import StreamingResponse

from openai import OpenAI

import json

import os

from dotenv import load_dotenv

from app.api.utils import get_streamed_response

router = APIRouter()

load_dotenv()


class Message(BaseModel):
    content: str
    role: str


class ChatRequest(BaseModel):
    input: str
    messages: list[Message]


SYSTEM_PROMPT = """You are a helpful assistant."""


def get_openai_generator(chat_request: ChatRequest):
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


@router.post("/chat")
async def chat_handler(chat_request: ChatRequest) -> dict:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + chat_request.messages
    model = os.getenv("OPENAI_API_KEY", "chatgpt")

    response = await clients["openai"].chat.completions.create(
        model=model,
        messages=messages,
        stream=False,
    )
    first_choice = response.model_dump()["choices"][0]
    return {"message": first_choice["message"]}


@router.post("/chat/stream")
async def chat_stream_handler(
    chat_request: ChatRequest,
) -> StreamingResponse:
    print(chat_request)
    try:
        return StreamingResponse(
            get_openai_generator(chat_request), media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get("/chat/test")
async def chat_test() -> list[dict]:
    test_messages = [
        {"role": "user", "content": "hi how to cook salmon"},
        {
            "role": "assistant",
            "content": "Cooking salmon is relatively easy and can be done in various ways. Here are a few popular methods:\n\n1. **Baking**:\n   - Preheat your oven to 375°F (190°C).\n   - Place the salmon fillets on a baking sheet lined with parchment paper.\n   - Season with salt, pepper, and your choice of herbs (like dill or thyme) and a squeeze of lemon.\n   - Bake for about 15-20 minutes, or until the salmon is cooked through and flakes easily with a fork.\n\n2. **Pan-Searing**:\n   - Heat a tablespoon of oil in a skillet over medium-high heat.\n   - Season the salmon with salt and pepper.\n   - Place the salmon skin-side down in the skillet.\n   - Cook for about 4-5 minutes, then flip and cook for another 3-4 minutes, or until the salmon is cooked to your desired doneness.\n\n3. **Grilling**:\n   - Preheat your grill to medium-high heat.\n   - Brush the salmon with olive oil and season with salt and pepper.\n   - Place the salmon skin-side down on the grill.\n   - Grill for about 6-8 minutes per side, or until the salmon is cooked through.\n\n4. **Poaching**:\n   - Fill a large skillet with water or broth and bring to a simmer.\n   - Add aromatics like lemon slices, dill, and peppercorns to the water.\n   - Gently lower the salmon into the simmering liquid.\n   - Poach for about 10-15 minutes, or until the salmon is opaque and cooked through.\n\nRemember to always check the internal temperature of the salmon to ensure it reaches 145°F (63°C) for safe consumption.Cooking salmon is relatively easy and can be done in various ways. Here are a few popular methods:\n\n1. **Baking**:\n   - Preheat your oven to 375°F (190°C).\n   - Place the salmon fillets on a baking sheet lined with parchment paper.\n   - Season with salt, pepper, and your choice of herbs (like dill or thyme) and a squeeze of lemon.\n   - Bake for about 15-20 minutes, or until the salmon is cooked through and flakes easily with a fork.\n\n2. **Pan-Searing**:\n   - Heat a tablespoon of oil in a skillet over medium-high heat.\n   - Season the salmon with salt and pepper.\n   - Place the salmon skin-side down in the skillet.\n   - Cook for about 4-5 minutes, then flip and cook for another 3-4 minutes, or until the salmon is cooked to your desired doneness.\n\n3. **Grilling**:\n   - Preheat your grill to medium-high heat.\n   - Brush the salmon with olive oil and season with salt and pepper.\n   - Place the salmon skin-side down on the grill.\n   - Grill for about 6-8 minutes per side, or until the salmon is cooked through.\n\n4. **Poaching**:\n   - Fill a large skillet with water or broth and bring to a simmer.\n   - Add aromatics like lemon slices, dill, and peppercorns to the water.\n   - Gently lower the salmon into the simmering liquid.\n   - Poach for about 10-15 minutes, or until the salmon is opaque and cooked through.\n\nRemember to always check the internal temperature of the salmon to ensure it reaches 145°F (63°C) for safe consumption.",
        },
    ]
    return test_messages
