"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Gauge,
  Scale,
  Flame,
  Layers,
  Car
} from "lucide-react";
import { VehicleRosterItem } from "@/data/vehicle-roster";

interface CadTerminalCardProps {
  car: VehicleRosterItem;
  priority?: boolean;
}

export function CadTerminalCard({ car, priority = false }: CadTerminalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Single-action Preview Knolling Teardown toggle (false = Hero Assembled, true = Knolling Teardown)
  const [showTeardownPreview, setShowTeardownPreview] = useState(false);
  const [heroImageFailed, setHeroImageFailed] = useState(false);
  const [knollingImageFailed, setKnollingImageFailed] = useState(false);

  const heroImage = car.cinematicHeroImageUrl || car.image;
  const teardownImage = car.knollingTeardownImageUrl || car.knollingImageUrl;

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -4;
    const rotY = ((x - centerX) / centerX) * 4;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleCardMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleCardMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? 1.012 : 1
        }, ${isHovered ? 1.012 : 1}, 1)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.35s ease-out"
      }}
      className="bg-[#0C0E14] border border-[#1E2536] hover:border-[#D2FF00] rounded-2xl overflow-hidden group h-full flex flex-col justify-between shadow-2xl hover:shadow-[0_0_40px_rgba(210,255,0,0.18)] relative transition-colors duration-300 select-none"
    >
      {/* High-Voltage Top-Right Corner Ambient Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D2FF00]/15 via-transparent to-transparent pointer-events-none rounded-tr-2xl" />

      {/* 1. CARD HEADER */}
      <div className="p-5 sm:p-6 border-b border-[#171E2D] relative flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            {/* Top-Left: Red rounded pill for homologation tag */}
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border border-red-500/60 text-red-400 bg-red-500/10 shadow-[0_0_12px_rgba(239,68,68,0.2)] whitespace-nowrap overflow-hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 animate-pulse" />
                <span className="truncate">{car.homologationTag}</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-sans text-white mt-2 group-hover:text-[#D2FF00] transition-colors tracking-tight truncate">
                {car.brand} {car.model}
              </h3>
              <div className="text-xs font-mono text-[#717A8C] mt-0.5 truncate">{car.trim}</div>
            </div>

            {/* Top-Right: Dark box with engine code and proper padding so text never clips */}
            <div className="text-right font-mono bg-[#07090E] px-2.5 py-1.5 rounded-xl border border-[#1A2233] shadow-inner shrink-0 max-w-[170px] whitespace-nowrap overflow-hidden">
              <span className="text-[9px] text-[#616E82] uppercase tracking-wider block font-bold">
                ENGINE BLOCK
              </span>
              <span className="text-xs font-bold text-[#D2FF00] tracking-wide block mt-0.5 truncate">
                {car.engineBlockCode}
              </span>
            </div>
          </div>

          {/* 2. STANDARDIZED 16:10 CAD DARK-ROOM SHOWROOM VIEWPORT */}
          <div className="relative w-full aspect-[16/10] mt-4 rounded-xl bg-gradient-to-t from-[#06080E] via-[#090D16] to-[#040608] border border-[#182030] overflow-hidden flex items-center justify-center group-hover:border-[#D2FF00]/50 transition-colors shadow-inner">
            {/* Subtle CAD Background Measurement Grid Lines (opacity-15) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px"
              }}
            />

            {/* Dark Vignette Overlay & Floor Horizon */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(4,6,8,0.92)_100%)] z-10 shadow-[inset_0_0_50px_rgba(0,0,0,0.85)]" />

            {/* Floor Ambient Glow Beneath the Tires Matching Car Theme */}
            <div
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-16 rounded-full blur-2xl pointer-events-none transition-all duration-500 z-5"
              style={{
                background: car.accentColor || "rgba(210, 255, 0, 0.15)",
                opacity: isHovered || showTeardownPreview ? 0.75 : 0.4
              }}
            />

            {/* Main Viewport Content */}
            <div className="relative w-full h-full flex items-center justify-center z-10 pointer-events-none">
              {showTeardownPreview ? (
                <Image
                  src={knollingImageFailed ? heroImage : teardownImage}
                  alt={`${car.brand} ${car.model} Exploded Knolling Mechanical Teardown`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-2 filter brightness-100 contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                  onError={() => setKnollingImageFailed(true)}
                />
              ) : (
                <Image
                  src={heroImageFailed ? teardownImage : heroImage}
                  alt={`${car.brand} ${car.model} Cinematic Assembled Chassis`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-2 filter brightness-100 contrast-105 group-hover:scale-[1.02] transition-transform duration-500"
                  priority={priority}
                  onError={() => setHeroImageFailed(true)}
                />
              )}
            </div>

            {/* Top-Left: Status pill (Replaced backdrop-blur with opaque hex) */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-[#0B0F17]/95 border border-[#D2FF00]/50 text-[10px] font-mono font-bold text-[#D2FF00] flex items-center gap-2 shadow-[0_0_15px_rgba(210,255,0,0.3)] z-20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D2FF00] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D2FF00]" />
              </span>
              <span>
                {showTeardownPreview
                  ? "● KNOLLING CAD // FULL MECHANICAL TEARDOWN"
                  : "● SHOWROOM SPEC // ASSEMBLED CHASSIS"}
              </span>
            </div>

            {/* Top-Right: Clean single-action toggle button */}
            <button
              onClick={() => setShowTeardownPreview(!showTeardownPreview)}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-[#0B0F17]/95 hover:bg-[#D2FF00] text-[#D2FF00] hover:text-black border border-[#D2FF00]/40 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all z-20 cursor-pointer shadow-lg"
              title="Toggle between assembled chassis and knolling teardown"
            >
              {showTeardownPreview ? (
                <>
                  <Car className="w-3.5 h-3.5" />
                  <span>[ ⤹ VIEW FULL ASSEMBLED ]</span>
                </>
              ) : (
                <>
                  <Layers className="w-3.5 h-3.5" />
                  <span>[ ⤹ PREVIEW KNOLLING TEARDOWN ]</span>
                </>
              )}
            </button>

            {/* Bottom Left Corner Datum Watermark */}
            <div className="absolute bottom-3 left-3 text-[9px] font-mono text-[#55647A] z-20 hidden sm:block">
              {showTeardownPreview
                ? "ISO 7200 KNOLLING CAD // ±0.05 MM"
                : "MONOCOQUE SHOWROOM SPEC // ASSEMBLED"}
            </div>
          </div>
        </div>
      </div>

      {/* 3. TECHNICAL SPECIFICATIONS & 4-COLUMN TELEMETRY STRIP */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Bottom 4-Column Telemetry Strip with aligned baselines */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
          {/* Column 1: Output */}
          <div className="p-3 rounded-xl bg-[#07090F] border border-[#161D2B] hover:border-[#D2FF00]/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase font-bold">
              <Zap className="w-3 h-3 text-[#D2FF00]" />
              <span>OUTPUT</span>
            </div>
            <div className="font-bold text-white mt-1 text-sm tracking-tight truncate">{car.output}</div>
          </div>

          {/* Column 2: Redline */}
          <div className="p-3 rounded-xl bg-[#07090F] border border-[#161D2B] hover:border-cyan-400/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase font-bold">
              <Gauge className="w-3 h-3 text-cyan-400" />
              <span>REDLINE</span>
            </div>
            <div className="font-bold text-cyan-400 mt-1 text-sm tracking-tight truncate">{car.redline}</div>
          </div>

          {/* Column 3: Curb Weight */}
          <div className="p-3 rounded-xl bg-[#07090F] border border-[#161D2B] hover:border-[#FF8000]/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase font-bold">
              <Scale className="w-3 h-3 text-[#FF8000]" />
              <span>CURB WEIGHT</span>
            </div>
            <div className="font-bold text-amber-400 mt-1 text-sm tracking-tight truncate">{car.weight}</div>
          </div>

          {/* Column 4: Downforce Metric */}
          <div className="p-3 rounded-xl bg-[#07090F] border border-[#161D2B] hover:border-red-400/40 transition-colors flex flex-col justify-between">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase font-bold">
              <Flame className="w-3 h-3 text-red-400" />
              <span>DOWNFORCE</span>
            </div>
            <div className="font-bold text-red-400 mt-1 text-sm tracking-tight truncate">{car.downforce}</div>
          </div>
        </div>

        {/* Powertrain Detail strip */}
        <div className="p-3 bg-[#07090F] border border-[#161D2B] rounded-xl text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#8A95A8]">
          <span className="text-[#647185] uppercase text-[10px] font-bold">POWERTRAIN CONFIG:</span>
          <span className="text-white font-medium truncate">{car.powertrain}</span>
        </div>

        {/* 4. FOOTER ACTION CALLOUT WITH PRIMARY CAD TEARDOWN CTA */}
        <div className="pt-2 flex items-center justify-between gap-3 font-mono">
          <div className="text-[10px] text-[#55647A] hidden sm:block">
            ARCHIVE STATUS: <span className="text-[#D2FF00] font-bold">12 PARTS DECOMPOSED</span>
          </div>
          <Link
            href={`/car/${car.slug}`}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0E1422] hover:bg-[#D2FF00] text-white hover:text-black border border-[#1E2536] hover:border-[#D2FF00] text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 group/btn cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(210,255,0,0.35)]"
          >
            <span>[ ⚙️ ENTER CAD MECHANICAL TEARDOWN → ]</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CadTerminalCard;
