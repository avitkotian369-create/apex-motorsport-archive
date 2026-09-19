"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Compass,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Camera
} from "lucide-react";
import { CarDetail } from "@/lib/api";

interface TurntableProps {
  car: CarDetail | null;
  onSwitchToBlueprint: () => void;
}

// 4 Major Authentic Paddock Exploration Views
const PORSCHE_STAGES = [
  {
    id: "cutaway",
    title: "Chassis & Aero Monocoque",
    subtitle: "Complete Weissach Cutaway (CFRP + Boron Steel)",
    image: "/assets/porsche-gt3rs-cutaway.jpg",
    badge: "STAGE 01: FULL CHASSIS CUTAWAY",
    summary: "Exposes hybrid aluminum-steel unibody, carbon aerodynamic ducts, and roof architecture.",
    stats: [
      { label: "PEAK DOWNFORCE", value: "860 kg @ 285 km/h", color: "text-amber-400" },
      { label: "UNIBODY RIGIDITY", value: "32,000 Nm/deg", color: "text-red-400" },
      { label: "CURB WEIGHT", value: "1,450 kg (DIN)", color: "text-emerald-400" },
    ],
  },
  {
    id: "engine",
    title: "4.0L Naturally Aspirated Flat-6",
    subtitle: "Dry-Sump Motorsport Crankcase (9,000 RPM Valvetrain)",
    image: "/assets/porsche-flat6-engine.jpg",
    badge: "STAGE 02: FLAT-6 POWERTRAIN",
    summary: "Individual throttle bodies, rigid finger-follower valvetrain, and titanium connecting rods.",
    stats: [
      { label: "REDLINE", value: "9,000 RPM", color: "text-red-400" },
      { label: "OUTPUT", value: "525 PS / 465 Nm", color: "text-amber-400" },
      { label: "VALVETRAIN", value: "Rigid DLC Rockers", color: "text-cyan-400" },
    ],
  },
  {
    id: "door",
    title: "Lightweight Door Assembly",
    subtitle: "Multi-Layer Peeling (CFRP Skin, Boron Intrusion Beam, Pull Straps)",
    image: "/assets/porsche-door-cutaway.jpg",
    badge: "STAGE 03: SUB-ASSEMBLY DECOMPOSITION",
    summary: "Carbon-fiber outer panel bonded to high-strength boron anti-intrusion beam and fabric pull loops.",
    stats: [
      { label: "DOOR WEIGHT", value: "6.9 kg (-5.5 kg vs Al)", color: "text-emerald-400" },
      { label: "SKIN THICKNESS", value: "1.4 mm Pre-preg", color: "text-amber-400" },
      { label: "SIDE PROTECTION", value: "Boron Rebar (1500 MPa)", color: "text-red-400" },
    ],
  },
];

const GOLF_STAGES = [
  {
    id: "cutaway",
    title: "MQB Evo Chassis & 4Motion Drivetrain",
    subtitle: "Transverse AWD Layout with R-Performance Torque Splitter",
    image: "/assets/vw-golfr-cutaway.jpg",
    badge: "STAGE 01: ARCHITECTURE CUTAWAY",
    summary: "Exposes EA888 Gen 4 turbo installation, DCC MacPherson struts, and twin-clutch rear axle.",
    stats: [
      { label: "POWER OUTPUT", value: "320 PS / 420 Nm", color: "text-amber-400" },
      { label: "AWD SPLIT", value: "Up to 100% Rear Outer", color: "text-cyan-400" },
      { label: "STEEL GRADE", value: "Hot-Formed 22MnB5", color: "text-red-400" },
    ],
  },
  {
    id: "engine",
    title: "2.0L TSI EA888 Gen 4",
    subtitle: "High-Pressure Direct Injection with Continental Turbocharger",
    image: "/assets/vw-golfr-cutaway.jpg",
    badge: "STAGE 02: EA888 GEN 4 TSI",
    summary: "Water-cooled exhaust manifold integrated directly into cylinder head for rapid spooling.",
    stats: [
      { label: "INJECTION", value: "350 Bar Direct", color: "text-amber-400" },
      { label: "CRANKCASE", value: "GJL-250 Grey Cast Iron", color: "text-stone-300" },
      { label: "TORQUE SPREAD", value: "2,100 - 5,350 RPM", color: "text-emerald-400" },
    ],
  },
];

export function TurntableViewer({ car, onSwitchToBlueprint }: TurntableProps) {
  const isVW = car?.model?.toLowerCase().includes("golf") || car?.brand_id === 2;
  const stages = isVW ? GOLF_STAGES : PORSCHE_STAGES;
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const activeStage = stages[activeStageIdx] || stages[0];

  const handlePrev = () => {
    setActiveStageIdx((prev) => (prev - 1 + stages.length) % stages.length);
  };

  const handleNext = () => {
    setActiveStageIdx((prev) => (prev + 1) % stages.length);
  };

  return (
    <div className="rounded-xl border border-stone-800 bg-[#0c0e12] overflow-hidden shadow-2xl space-y-3">
      {/* Top Motorsport Paddock Header */}
      <div className="px-5 py-3.5 border-b border-stone-800/90 bg-[#12151c] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-mono font-bold text-stone-100 uppercase tracking-wider">
                MOTORSPORT PADDOCK CUTAWAY & ARCHITECTURAL STAGE
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-400 border border-stone-700">
                {car?.model || "VEHICLE"}
              </span>
            </div>
            <p className="text-[11px] font-mono text-stone-400">
              AUTHENTIC OEM HIGH-RESOLUTION CUTAWAY • REAL COMPONENT ARCHITECTURE
            </p>
          </div>
        </div>

        {/* View Selection Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {stages.map((stage, idx) => (
            <button
              key={stage.id}
              onClick={() => setActiveStageIdx(idx)}
              className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all ${
                activeStageIdx === idx
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(217,119,6,0.2)]"
                  : "bg-[#0c0e12] text-stone-400 border-stone-800 hover:text-stone-200 hover:border-stone-700"
              }`}
            >
              {stage.id.toUpperCase()}
            </button>
          ))}

          <button
            onClick={onSwitchToBlueprint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono font-bold bg-amber-600 hover:bg-amber-500 text-black shadow-[0_0_15px_rgba(217,119,6,0.3)] transition-all cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            INSPECT BLUEPRINT
          </button>
        </div>
      </div>

      {/* Main Photographic Cutaway Viewport */}
      <div className="px-5 py-2">
        <div className="relative h-[440px] sm:h-[480px] w-full rounded-lg border border-stone-800 bg-[#08090b] overflow-hidden flex items-center justify-center select-none group">
          {/* Subtle Grid Lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(229, 169, 60, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(229, 169, 60, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Authentic Vehicle High-Resolution Image */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <Image
              src={activeStage.image}
              alt={activeStage.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-300"
            />
          </div>

          {/* Viewport Overlay Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
            <span className="px-2.5 py-1 rounded bg-[#0c0e12]/90 border border-stone-700 text-[10px] font-mono text-amber-400 font-bold tracking-widest backdrop-blur-md">
              {activeStage.badge}
            </span>
            <span className="text-xs font-bold text-stone-100 font-mono drop-shadow-md">
              {activeStage.title}
            </span>
          </div>

          {/* Quick Stats Floating Card (Bottom Right) */}
          <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-3 p-3 rounded-lg bg-[#0c0e12]/90 border border-stone-800 backdrop-blur-md">
            {activeStage.stats.map((stat) => (
              <div key={stat.label} className="text-right px-2 border-r last:border-r-0 border-stone-800 font-mono">
                <span className="text-[9px] text-stone-400 uppercase block">{stat.label}</span>
                <span className={`text-xs font-bold ${stat.color}`}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Left/Right Carousel Nav Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0c0e12]/80 border border-stone-700 text-stone-300 hover:text-white hover:border-amber-400 transition-all opacity-70 group-hover:opacity-100"
            title="Previous View"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#0c0e12]/80 border border-stone-700 text-stone-300 hover:text-white hover:border-amber-400 transition-all opacity-70 group-hover:opacity-100"
            title="Next View"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Stage Description & Engineering Summary */}
      <div className="px-5 py-3 border-t border-stone-800/80 bg-[#12151c] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-stone-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-stone-400 font-sans">{activeStage.summary}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-stone-400">
          <span>VIEW {activeStageIdx + 1} OF {stages.length}</span>
          <span className="text-amber-500">•</span>
          <span className="text-stone-300 font-bold uppercase">{activeStage.subtitle}</span>
        </div>
      </div>
    </div>
  );
}
