from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.item import TaskItem
from app.schemas.item import TaskItemCreate, TaskItemUpdate, TaskItemResponse

router = APIRouter(prefix="/api/tasks", tags=["Tasks"])


@router.get("", response_model=List[TaskItemResponse])
async def list_tasks(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
):
    query = select(TaskItem).offset(skip).limit(limit).order_by(TaskItem.id.desc())
    result = await db.execute(query)
    return result.scalars().all()


@router.post("", response_model=TaskItemResponse, status_code=status.HTTP_201_CREATED)
async def create_task(
    task_in: TaskItemCreate,
    db: AsyncSession = Depends(get_db),
):
    task = TaskItem(
        title=task_in.title,
        description=task_in.description or "",
        status=task_in.status,
        is_completed=task_in.is_completed,
    )
    db.add(task)
    await db.commit()
    await db.refresh(task)
    return task


@router.get("/{task_id}", response_model=TaskItemResponse)
async def get_task(
    task_id: int,
    db: AsyncSession = Depends(get_db),
):
    query = select(TaskItem).where(TaskItem.id == task_id)
    result = await db.execute(query)
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.patch("/{task_id}", response_model=TaskItemResponse)
async def update_task(
    task_id: int,
    task_in: TaskItemUpdate,
    db: AsyncSession = Depends(get_db),
):
    query = select(TaskItem).where(TaskItem.id == task_id)
    result = await db.execute(query)
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(task, field, value)

    await db.commit()
    await db.refresh(task)
    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    task_id: int,
    db: AsyncSession = Depends(get_db),
):
    query = select(TaskItem).where(TaskItem.id == task_id)
    result = await db.execute(query)
    task = result.scalar_one_or_none()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    await db.delete(task)
    await db.commit()
    return None
