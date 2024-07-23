from typing import Any

from fastapi import APIRouter, HTTPException, Response
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models import Item, ItemCreate, ItemPublic, ItemsPublic, ItemUpdate, Message

from pydantic import BaseModel

from fastapi.responses import StreamingResponse

router = APIRouter()


class Message(BaseModel):
    content: str
    role: str = "user"


class ChatRequest(BaseModel):
    messages: list[Message]


SYSTEM_PROMPT = """You are a helpful assistant."""


@router.post("/chat")
async def chat_handler(chat_request: ChatRequest) -> dict:
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + chat_request.messages
    # Azure Open AI takes the deployment name as the model name
    model = os.getenv("AZURE_OPENAI_CHATGPT_DEPLOYMENT", "chatgpt")

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
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + chat_request.messages
    # Azure Open AI takes the deployment name as the model name
    model = os.getenv("AZURE_OPENAI_CHATGPT_DEPLOYMENT", "chatgpt")

    async def response_stream():
        chat_coroutine = clients["openai"].chat.completions.create(
            model=model,
            messages=messages,
            stream=True,
        )
        async for event in await chat_coroutine:
            if event.choices:
                first_choice = event.model_dump()["choices"][0]
                yield json.dumps(
                    {"delta": first_choice["delta"]}, ensure_ascii=False
                ) + "\n"

    return StreamingResponse(response_stream())


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
