"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Gauge,
  Scale,
  Flame,
  Maximize2,
  Crosshair,
  ArrowRight,
  Layers
} from "lucide-react";
import { VehicleRosterItem } from "@/data/vehicle-roster";
import { CadExplodedSchematic } from "./cad-exploded-schematic";

interface CadTerminalCardProps {
  car: VehicleRosterItem;
  priority?: boolean;
}

export function CadTerminalCard({ car, priority = false }: CadTerminalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showVectorMode, setShowVectorMode] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? 1.015 : 1
        }, ${isHovered ? 1.015 : 1}, 1)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out"
      }}
      className="bg-[#0C0E14] border border-[#1E2536] hover:border-[#D2FF00] rounded-2xl overflow-hidden group flex flex-col justify-between shadow-2xl hover:shadow-[0_0_40px_rgba(210,255,0,0.18)] relative transition-colors duration-300"
    >
      {/* High-Voltage Top-Right Corner Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D2FF00]/15 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

      {/* 1. CARD HEADER */}
      <div className="p-5 sm:p-6 border-b border-[#171E2D] relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Top-Left: Red rounded pill for homologation tag */}
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border border-red-500/60 text-red-400 bg-red-500/10 shadow-[0_0_12px_rgba(239,68,68,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {car.homologationTag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-sans text-white mt-2 group-hover:text-[#D2FF00] transition-colors tracking-tight">
              {car.brand} {car.model}
            </h3>
            <div className="text-xs font-mono text-[#717A8C] mt-0.5">{car.trim}</div>
          </div>

          {/* Top-Right: Dark box with bright yellow/lime text for engine block code */}
          <div className="text-right font-mono bg-[#07090E] px-3.5 py-2 rounded-xl border border-[#1A2233] shadow-inner shrink-0">
            <span className="text-[9px] text-[#616E82] uppercase tracking-wider block font-bold">
              ENGINE BLOCK
            </span>
            <span className="text-xs font-bold text-[#D2FF00] tracking-wide block mt-0.5">
              {car.engineBlockCode}
            </span>
          </div>
        </div>

        {/* 2. STANDARDIZED 16:10 / 16:9 CAD DARK-ROOM VIEWPORT */}
        <div className="relative w-full aspect-[16/10] mt-4 rounded-xl bg-[#080B10] border border-[#182030] overflow-hidden flex items-center justify-center group-hover:border-[#D2FF00]/50 transition-colors">
          {/* Subtle CAD Background Measurement Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px"
            }}
          />

          {/* Vignette Rim */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_60%,rgba(6,8,14,0.85)_100%)] z-10" />

          {/* Display Vector Mode or Cutaway Photo */}
          {showVectorMode || imageFailed ? (
            <CadExplodedSchematic slug={car.slug} className="p-4" />
          ) : (
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model} CAD Blueprint Schematic`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-3.5 filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
              priority={priority}
              onError={() => setImageFailed(true)}
            />
          )}

          {/* Top-Left: "● ONLINE CAD MECHANICAL TEARDOWN" active indicator */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-[#D2FF00]/50 text-[10px] font-mono font-bold text-[#D2FF00] flex items-center gap-2 shadow-[0_0_15px_rgba(210,255,0,0.3)] z-20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D2FF00] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D2FF00]" />
            </span>
            <Crosshair className="w-3 h-3 text-[#D2FF00]" />
            <span>ONLINE CAD MECHANICAL TEARDOWN</span>
          </div>

          {/* Top-Right: "↗ ORTHOGRAPHIC 4-VIEW SPEC" button */}
          <Link
            href={`/car/${car.slug}`}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md border border-[#252C3D] hover:border-[#D2FF00] text-[9px] font-mono text-[#8C98AC] hover:text-[#D2FF00] flex items-center gap-1.5 transition-colors z-20 cursor-pointer"
            title="Open Deep 4-View Orthographic Blueprint"
          >
            <Maximize2 className="w-3 h-3 text-[#FF8000]" />
            <span>ORTHOGRAPHIC 4-VIEW SPEC</span>
          </Link>

          {/* Bottom Vector Toggle Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowVectorMode((v) => !v);
            }}
            className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#1E2536] hover:border-[#D2FF00] text-[9px] font-mono text-[#A6B2C4] hover:text-white flex items-center gap-1 z-20 cursor-pointer transition-colors"
            title="Toggle between studio photography and vector CAD schematic"
          >
            <Layers className="w-3 h-3 text-[#D2FF00]" />
            <span>{showVectorMode ? "PHOTO VIEW" : "VECTOR SCHEMATIC"}</span>
          </button>

          {/* Bottom Left Corner Datum Watermark */}
          <div className="absolute bottom-3 left-3 text-[9px] font-mono text-[#55647A] z-20 hidden sm:block">
            ISO 7200 KNOLLING CAD // ±0.05 MM
          </div>
        </div>
      </div>

      {/* 3. TECHNICAL SPECIFICATIONS & 4-COLUMN TELEMETRY STRIP */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Bottom 4-Column Telemetry Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
          {/* Column 1: Output */}
          <div className="p-3 rounded-xl bg-[#07090F] border border-[#161D2B] hover:border-[#D2FF00]/40 transition-colors">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase font-bold">
              <Zap className="w-3 h-3 text-[#D2FF00]" />
              <span>OUTPUT</span>
            </div>
            <div className="font-bold text-white mt-1 text-sm tracking-tight">{car.output}</div>
          </div>

          {/* Column 2: Redline */}
          <div className="p-3 rounded-xl bg-[#07090F] border border-[#161D2B] hover:border-cyan-400/40 transition-colors">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase font-bold">
              <Gauge className="w-3 h-3 text-cyan-400" />
              <span>REDLINE</span>
            </div>
            <div className="font-bold text-cyan-400 mt-1 text-sm tracking-tight">{car.redline}</div>
          </div>

          {/* Column 3: Curb Weight */}
          <div className="p-3 rounded-xl bg-[#07090F] border border-[#161D2B] hover:border-[#FF8000]/40 transition-colors">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase font-bold">
              <Scale className="w-3 h-3 text-[#FF8000]" />
              <span>CURB WEIGHT</span>
            </div>
            <div className="font-bold text-amber-400 mt-1 text-sm tracking-tight">{car.weight}</div>
          </div>

          {/* Column 4: Downforce Metric */}
          <div className="p-3 rounded-xl bg-[#07090F] border border-[#161D2B] hover:border-red-400/40 transition-colors">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase font-bold">
              <Flame className="w-3 h-3 text-red-400" />
              <span>DOWNFORCE</span>
            </div>
            <div className="font-bold text-red-400 mt-1 text-sm truncate tracking-tight">{car.downforce}</div>
          </div>
        </div>

        {/* Powertrain Detail strip */}
        <div className="p-3 bg-[#07090F] border border-[#161D2B] rounded-xl text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#8A95A8]">
          <span className="text-[#647185] uppercase text-[10px] font-bold">POWERTRAIN CONFIG:</span>
          <span className="text-white font-medium truncate">{car.powertrain}</span>
        </div>

        {/* 4. FOOTER ACTION CALLOUT */}
        <div className="pt-2 flex items-center justify-between gap-3 font-mono">
          <div className="text-[10px] text-[#55647A] hidden sm:block">
            ARCHIVE STATUS: <span className="text-[#D2FF00] font-bold">12 PARTS DECOMPOSED</span>
          </div>
          <Link
            href={`/car/${car.slug}`}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0E1422] hover:bg-[#D2FF00] text-[#A6B2C4] hover:text-black border border-[#1E2536] hover:border-[#D2FF00] text-xs font-bold transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-lg"
          >
            <span>EXPLORE MECHANICAL TEARDOWN</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CadTerminalCard;
