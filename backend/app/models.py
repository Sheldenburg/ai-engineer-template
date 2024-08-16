from datetime import datetime
from typing import Optional, List
from sqlmodel import Field, Relationship, SQLModel, JSON
from sqlalchemy.sql import func
from sqlalchemy import Column, DateTime


# Shared properties
# TODO replace email str with EmailStr when sqlmodel supports it
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = None


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str


# TODO replace email str with EmailStr when sqlmodel supports it
class UserRegister(SQLModel):
    email: str
    password: str
    full_name: str | None = None


# Properties to receive via API on update, all are optional
# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdate(UserBase):
    email: str | None = None  # type: ignore
    password: str | None = None


# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdateMe(SQLModel):
    full_name: str | None = None
    email: str | None = None


class UpdatePassword(SQLModel):
    current_password: str
    new_password: str


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner")


# Properties to return via API, id is always required
class UserPublic(UserBase):
    id: int
    chatList: list | None = None


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str
    description: str | None = None


# Properties to receive on item creation
class ItemCreate(ItemBase):
    title: str


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = None  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemPublic(ItemBase):
    id: int
    owner_id: int


class ItemsPublic(SQLModel):
    data: list[ItemPublic]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str


class ChatConfigBase(SQLModel):
    model: str
    temperature: float
    top_p: float | None = None
    top_k: int | None = None
    system_message: str | None = None


class ChatConfigCreate(ChatConfigBase):
    api_key: str | None = None


class ChatConfig(ChatConfigBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    api_key_encrypted: str | None = Field(default=None)


class ChatConfigPublic(SQLModel):
    model: str
    api_key: str | None = None
    temperature: float
    top_p: float | None = None
    top_k: int | None = None
    system_message: str | None = None


class MessageBase(SQLModel):
    role: str
    content: str


class Message(MessageBase):
    content: str
    role: str
    function_call: str | None = None
    tool_call: str | None = None


# class ChatBase(SQLModel):
#     id: str | None = None
#     chat_config_id: int | None = None
#     message: list[MessageBase] = []
#     created_at: datetime
#     updated_at: datetime
#     owner_id: int | None = None


class Chat(SQLModel, table=True):
    id: str | None = Field(default=None, primary_key=True)
    chat_config_id: int | None = Field(
        default=None, foreign_key="chatconfig.id", nullable=False
    )
    messages: List[dict] = Field(sa_column=Column(JSON))
    created_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

    updated_at: Optional[datetime] = Field(
        sa_column=Column(DateTime(timezone=True), onupdate=func.now())
    )
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)


class ChatPublic(SQLModel):
    id: str
    messages: List[Message]
    created_at: datetime
    updated_at: datetime
    owner_id: int
