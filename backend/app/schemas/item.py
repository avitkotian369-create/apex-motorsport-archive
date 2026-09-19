from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class TaskItemBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, example="Setup database migrations")
    description: Optional[str] = Field(default="", example="Configure Alembic or Prisma schema migrations")
    status: str = Field(default="todo", example="todo")
    is_completed: bool = Field(default=False, example=False)


class TaskItemCreate(TaskItemBase):
    pass


class TaskItemUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = None
    status: Optional[str] = None
    is_completed: Optional[bool] = None


class TaskItemResponse(TaskItemBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
