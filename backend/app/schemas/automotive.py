from typing import List, Optional
from pydantic import BaseModel, ConfigDict


# Fastener Schemas
class FastenerBase(BaseModel):
    name: str
    fastener_type: str = "Bolt"
    thread_size: str
    drive_type: str
    grade: str
    torque_spec_nm: float
    quantity_used: int = 1
    x_percent: float
    y_percent: float
    notes: Optional[str] = None


class FastenerResponse(FastenerBase):
    id: int
    part_id: int
    model_config = ConfigDict(from_attributes=True)


# Part Schemas
class PartBase(BaseModel):
    part_number: str
    name: str
    category: Optional[str] = None
    sub_assembly: Optional[str] = None
    physical_layer: Optional[str] = None
    material: Optional[str] = None
    surface_treatment: Optional[str] = None
    weight_kg: Optional[float] = None
    function: Optional[str] = None
    manufacturing_process: Optional[str] = None
    joint_spec: Optional[str] = None


class PartDetailResponse(PartBase):
    id: int
    car_id: int
    subsystem_id: int
    fasteners: List[FastenerResponse] = []
    model_config = ConfigDict(from_attributes=True)


# Subsystem Schemas
class SubsystemResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


# Car Schemas
class CarBase(BaseModel):
    model: str
    trim: Optional[str] = None
    year: int
    vin_prefix: Optional[str] = None
    image_url: Optional[str] = None


class CarResponse(CarBase):
    id: int
    brand_id: int
    model_config = ConfigDict(from_attributes=True)


class CarDetailResponse(CarResponse):
    parts: List[PartDetailResponse] = []
    model_config = ConfigDict(from_attributes=True)


# Brand Schemas
class BrandResponse(BaseModel):
    id: int
    name: str
    country: Optional[str] = None
    logo_url: Optional[str] = None
    cars: List[CarResponse] = []
    model_config = ConfigDict(from_attributes=True)
