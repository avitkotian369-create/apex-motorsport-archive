from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.automotive import Brand, Car, Subsystem, Part, Fastener
from app.schemas.automotive import (
    BrandResponse,
    CarResponse,
    CarDetailResponse,
    SubsystemResponse,
    FastenerResponse,
)

router = APIRouter(prefix="/api/automotive", tags=["Automotive"])


@router.get("/brands", response_model=List[BrandResponse])
async def list_brands(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Brand).options(selectinload(Brand.cars)))
    return result.scalars().all()


@router.get("/subsystems", response_model=List[SubsystemResponse])
async def list_subsystems(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Subsystem).order_by(Subsystem.id))
    return result.scalars().all()


@router.get("/cars", response_model=List[CarResponse])
async def list_cars(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Car).order_by(Car.id))
    return result.scalars().all()


@router.get("/cars/{car_id}", response_model=CarDetailResponse)
async def get_car_detail(car_id: int, db: AsyncSession = Depends(get_db)):
    query = (
        select(Car)
        .where(Car.id == car_id)
        .options(selectinload(Car.parts).selectinload(Part.fasteners))
    )
    result = await db.execute(query)
    car = result.scalar_one_or_none()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car


@router.get("/cars/{car_id}/fasteners", response_model=List[FastenerResponse])
async def get_car_fasteners(car_id: int, db: AsyncSession = Depends(get_db)):
    query = (
        select(Fastener)
        .join(Part, Fastener.part_id == Part.id)
        .where(Part.car_id == car_id)
    )
    result = await db.execute(query)
    return result.scalars().all()
