# import sentry_sdk
from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

from mangum import Mangum

from app.api.main_route import api_router
from app.core.config import settings

def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


# if settings.SENTRY_DSN and settings.ENVIRONMENT != "local":
#     sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

@app.get("/")
async def read_root():
    return {"Hello": "World!"}

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        # allow_origins=[
        #     str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        # ],
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# origins = ["http://localhost:3000", "*"]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.include_router(api_router, prefix=settings.API_V1_STR)

handler = Mangum(app)



# from typing import Union
# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from mangum import Mangum
# import requests

# app = FastAPI()

# origins = ["http://localhost:3000", "*"]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# @app.get("/")
# async def read_root():
#     return {"Hello": "World!"}


# @app.get("/items/{item_id}")
# async def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


# @app.get("/call-external")
# async def example_external_request():
#     response = requests.get("https://jsonplaceholder.typicode.com/todos/1")
#     return response.json()


# handler = Mangum(app)

