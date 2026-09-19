from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy import String, Text, Float, Integer, ForeignKey, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Brand(Base):
    __tablename__ = "brands"

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)
    country: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    logo_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    cars: Mapped[List["Car"]] = relationship("Car", back_populates="brand", cascade="all, delete-orphan")


class Car(Base):
    __tablename__ = "cars"

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    brand_id: Mapped[int] = mapped_column(ForeignKey("brands.id", ondelete="CASCADE"), nullable=False, index=True)
    model: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    trim: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    vin_prefix: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    image_url: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    brand: Mapped["Brand"] = relationship("Brand", back_populates="cars")
    parts: Mapped[List["Part"]] = relationship("Part", back_populates="car", cascade="all, delete-orphan")


class Subsystem(Base):
    __tablename__ = "subsystems"

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False, index=True)  # Bumpers, Doors, Powertrain, HVAC, BIW
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    parts: Mapped[List["Part"]] = relationship("Part", back_populates="subsystem", cascade="all, delete-orphan")


class Part(Base):
    __tablename__ = "parts"

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    car_id: Mapped[int] = mapped_column(ForeignKey("cars.id", ondelete="CASCADE"), nullable=False, index=True)
    subsystem_id: Mapped[int] = mapped_column(ForeignKey("subsystems.id", ondelete="RESTRICT"), nullable=False, index=True)
    part_number: Mapped[str] = mapped_column(String(100), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)  # Powertrain, Cabin & Doors, BIW & Roof, Chassis & Aero
    sub_assembly: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)  # e.g., Rigid Valvetrain, Dry Sump System, Door Internals, Magnesium Roof
    physical_layer: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)  # Layer 1: Skin, Layer 2: Core, Layer 3: Hardware, Layer 4: Trim
    material: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    surface_treatment: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)  # DLC coating, PTWA plasma spray, clear coat
    weight_kg: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    function: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    manufacturing_process: Mapped[Optional[str]] = mapped_column(String(150), nullable=True)
    joint_spec: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    car: Mapped["Car"] = relationship("Car", back_populates="parts")
    subsystem: Mapped["Subsystem"] = relationship("Subsystem", back_populates="parts")
    fasteners: Mapped[List["Fastener"]] = relationship("Fastener", back_populates="part", cascade="all, delete-orphan")


class Fastener(Base):
    __tablename__ = "fasteners"

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    part_id: Mapped[int] = mapped_column(ForeignKey("parts.id", ondelete="CASCADE"), nullable=False, index=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    fastener_type: Mapped[str] = mapped_column(String(50), default="Bolt")  # Bolt, Screw, Nut, Clip, Rivet
    thread_size: Mapped[str] = mapped_column(String(50), nullable=False)  # e.g., M6x1.0, M8x1.25, M10x1.5, M12x1.75
    drive_type: Mapped[str] = mapped_column(String(50), nullable=False)   # Torx T25, Torx T30, Hex 10mm, Triple Square XZN
    grade: Mapped[str] = mapped_column(String(50), nullable=False)        # 8.8, 10.9, 12.9, A2-70 Stainless, Grade 5
    torque_spec_nm: Mapped[float] = mapped_column(Float, nullable=False)  # Torque in Nm
    quantity_used: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    x_percent: Mapped[float] = mapped_column(Float, nullable=False)       # 0.0 to 100.0 coordinate
    y_percent: Mapped[float] = mapped_column(Float, nullable=False)       # 0.0 to 100.0 coordinate
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    part: Mapped["Part"] = relationship("Part", back_populates="fasteners")
