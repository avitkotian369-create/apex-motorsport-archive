"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Wind, Gauge, Shield, Activity } from "lucide-react";

export type AeroMode = "cfd" | "downforce" | "torsion";

interface DatumPin {
  id: string;
  label: string;
  x: number;
  y: number;
  spec: string;
}

const HARDPOINT_PINS: DatumPin[] = [
  {
    id: "diffuser",
    label: "01. FRONT CHIN SPLITTER & VENTURI",
    x: 65,
    y: 244,
    spec: "01. FRONT CHIN SPLITTER // S-DUCT VENTURI (-14.2 kPa @ 285 KM/H) // PRE-PREG AUTOCLAVE CFRP",
  },
  {
    id: "monocoque",
    label: "02. T1100 COUPE SAFETY CELL",
    x: 320,
    y: 116,
    spec: "02. T1100 WEISSACH CARBON CELL // AZ31B MAGNESIUM ROOF (-7.5 MM CoG) // 125 kN FIA CRUSH",
  },
  {
    id: "cop",
    label: "03. CENTER OF PRESSURE // 41.5%",
    x: 324,
    y: 246,
    spec: "03. DYNAMIC CENTER OF PRESSURE // 41.5% FRONT / 58.5% REAR // OPTIMAL HIGH-SPEED PITCH BALANCE",
  },
  {
    id: "wing",
    label: "04. SWAN-NECK GT REAR WING",
    x: 540,
    y: 76,
    spec: "04. SWAN-NECK GT REAR WING // DUAL-ELEMENT WITH DRS ACTUATOR // 860 KG APEX LOAD (-4.2° AoA)",
  },
];

export function AeroChassisHud() {
  const [activeMode, setActiveMode] = useState<AeroMode>("cfd");
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ relX: 0.5, relY: 0.5, mmX: 2450, mmY: 680 });
  const [carImageSrc, setCarImageSrc] = useState<string>("/assets/porsche-gt3rs-cutaway.jpg");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const relY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const mmX = Math.round(relX * 4500);
    const mmY = Math.round((1 - relY) * 1400);
    setMousePos({ relX, relY, mmX, mmY });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, relX: 0.5, relY: 0.5 }));
    setHoveredPinId(null);
  };

  const getActiveColor = () => {
    switch (activeMode) {
      case "cfd":
        return "#D2FF00";
      case "downforce":
        return "#00E5FF";
      case "torsion":
        return "#FFB800";
    }
  };

  // 3D Parallax Tilt Angles
  const tiltX = (mousePos.relY - 0.5) * -10;
  const tiltY = (mousePos.relX - 0.5) * 14;

  const activeTooltip = HARDPOINT_PINS.find((p) => p.id === hoveredPinId)?.spec;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#0B0F17]/90 border border-white/10 rounded-xl p-5 shadow-2xl overflow-hidden font-mono select-none group"
    >
      {/* Corner Coordinate Brackets (+ Crosshairs & L-Brackets at each corner) */}
      <span className="absolute top-2 left-2 text-slate-500 font-mono text-[11px] leading-none select-none pointer-events-none">
        +
      </span>
      <span className="absolute top-2 right-2 text-slate-500 font-mono text-[11px] leading-none select-none pointer-events-none">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-slate-500 font-mono text-[11px] leading-none select-none pointer-events-none">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-slate-500 font-mono text-[11px] leading-none select-none pointer-events-none">
        +
      </span>

      <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-white/20 pointer-events-none" />

      {/* Subtle CAD Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[radial-gradient(ellipse_at_center,rgba(210,255,0,0.05)_0%,transparent_70%)] pointer-events-none blur-2xl" />

      {/* Top Header Strip: Status & Active Mouse-Tracking Coordinate Readout */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08] text-xs">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] animate-ping"
            style={{ backgroundColor: getActiveColor(), color: getActiveColor() }}
          />
          <span className="font-bold text-white uppercase tracking-wider text-[11px] sm:text-xs">
            GT HOMOLOGATION CAD <span className="text-[#4E5B73]">{"//"}</span> 911 GT3 RS BLUEPRINT
          </span>
        </div>

        {/* Active Mouse-Tracking Coordinate Readout */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 bg-white/[0.03] px-2.5 py-1 rounded border border-white/10 font-mono tracking-wider tabular-nums">
          <Activity className="w-3 h-3 text-[#D2FF00]" />
          <span>
            ⌖ X: {mousePos.mmX.toLocaleString()} mm | Y: {mousePos.mmY.toLocaleString()} mm | ISO 7200 CLASS-A
          </span>
        </div>
      </div>

      {/* Aerospace-Grade Segmented Control (Zero Text Clipping) */}
      <div className="relative z-10 flex flex-wrap sm:flex-nowrap gap-2 w-full pt-3 pb-2 text-[11px] font-mono tracking-wider">
        <button
          onClick={() => setActiveMode("cfd")}
          className={`flex-1 min-w-0 px-3 py-1.5 rounded-lg border font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeMode === "cfd"
              ? "bg-[#D2FF00] text-black border-[#D2FF00] shadow-[0_0_18px_rgba(210,255,0,0.4)]"
              : "bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border-white/10"
          }`}
        >
          <Wind className="w-3.5 h-3.5 shrink-0" />
          <span>[ 01 CFD FLOW ]</span>
        </button>

        <button
          onClick={() => setActiveMode("downforce")}
          className={`flex-1 min-w-0 px-3 py-1.5 rounded-lg border font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeMode === "downforce"
              ? "bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_18px_rgba(0,229,255,0.4)]"
              : "bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border-white/10"
          }`}
        >
          <Gauge className="w-3.5 h-3.5 shrink-0" />
          <span>[ 02 DOWNFORCE ]</span>
        </button>

        <button
          onClick={() => setActiveMode("torsion")}
          className={`flex-1 min-w-0 px-3 py-1.5 rounded-lg border font-bold uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
            activeMode === "torsion"
              ? "bg-[#FFB800] text-black border-[#FFB800] shadow-[0_0_18px_rgba(255,184,0,0.4)]"
              : "bg-white/[0.03] hover:bg-white/[0.08] text-slate-400 hover:text-white border-white/10"
          }`}
        >
          <Shield className="w-3.5 h-3.5 shrink-0" />
          <span>[ 03 TORSION FEA ]</span>
        </button>
      </div>

      {/* 1. CAD Viewport with 3D Parallax Tilt & Authentic Porsche GT3 RS Blueprint Composite */}
      <div
        style={{ perspective: "900px" }}
        className="relative z-10 w-full h-[320px] flex items-center justify-center my-2 bg-[#06080E]/95 rounded-xl border border-white/[0.08] overflow-hidden shadow-inner"
      >
        {/* Ambient Volumetric Ground Reflection Glow (Transitions by Active Mode) */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-20 pointer-events-none blur-3xl transition-all duration-500 rounded-full z-0"
          style={{
            background:
              activeMode === "cfd"
                ? "radial-gradient(ellipse at center, rgba(210, 255, 0, 0.24) 0%, transparent 70%)"
                : activeMode === "downforce"
                ? "radial-gradient(ellipse at center, rgba(0, 229, 255, 0.26) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(255, 184, 0, 0.26) 0%, transparent 70%)",
          }}
        />

        {/* 3D Tilted Inner Stage with Layered Depth */}
        <div
          style={{
            transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.12s cubic-bezier(0.2, 0, 0, 1)",
            willChange: "transform",
          }}
          className="relative w-full h-full flex items-center justify-center z-10"
        >
          {/* Authentic Darkroom Porsche 911 GT3 RS Blueprint Silhouette with Engineering Aesthetics */}
          <div
            style={{ transform: "translateZ(8px)" }}
            className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none select-none z-10"
          >
            <div className="relative w-full max-w-[540px] aspect-[16/9]">
              <Image
                src={carImageSrc}
                alt="Porsche 911 GT3 RS CAD Blueprint"
                fill
                priority
                onError={() => {
                  if (carImageSrc !== "/assets/porsche-gt3rs-hero.jpg") {
                    setCarImageSrc("/assets/porsche-gt3rs-hero.jpg");
                  }
                }}
                className="object-contain pointer-events-none select-none transition-all duration-300"
                style={{
                  filter: "brightness(0.85) contrast(1.25) drop-shadow(0 15px 30px rgba(0,0,0,0.8))",
                }}
              />
            </div>
          </div>

          {/* Precision SVG Technical Overlay: Station Slices, Ground Plane, Edge Wireframe & Streamlines */}
          <svg
            viewBox="0 0 640 320"
            className="absolute inset-0 w-full h-full select-none z-20"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Streamline Flow Gradient */}
              <linearGradient id="gtStreamlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.15" />
                <stop offset="30%" stopColor="#D2FF00" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#D2FF00" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.25" />
              </linearGradient>

              {/* Monocoque FEA Stress Gradient */}
              <linearGradient id="gtFeaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFB800" stopOpacity="0.25" />
                <stop offset="30%" stopColor="#FF8000" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#FF3300" stopOpacity="0.65" />
                <stop offset="75%" stopColor="#FF8000" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFB800" stopOpacity="0.25" />
              </linearGradient>

              {/* Cyan Downforce Vector Arrow */}
              <marker
                id="gtDownforceArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5FF" />
              </marker>

              {/* Lime Vector Arrow */}
              <marker
                id="gtLimeMarker"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#D2FF00" />
              </marker>

              {/* Tire Contact Patch Grip Hatching */}
              <pattern
                id="gtContactPattern"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(210,255,0,0.4)" strokeWidth="0.75" />
              </pattern>
            </defs>

            {/* ============================================================ */}
            {/* LAYER 0 (BACK - Depth: -10px): Station Slices, Ground Plane, CP */}
            {/* ============================================================ */}
            <g style={{ transform: "translateZ(-10px)" }}>
              {/* Station Slices (Waterlines & Buttock Lines - 0.5px at 20% opacity) */}
              <g stroke="rgba(148, 163, 184, 0.2)" strokeWidth="0.5" strokeDasharray="3 3">
                <line x1="70" y1="45" x2="70" y2="260" />
                <line x1="162" y1="45" x2="162" y2="260" />
                <line x1="244" y1="45" x2="244" y2="260" />
                <line x1="324" y1="45" x2="324" y2="260" />
                <line x1="404" y1="45" x2="404" y2="260" />
                <line x1="484" y1="45" x2="484" y2="260" />
                <line x1="560" y1="45" x2="560" y2="260" />

                <line x1="20" y1="252" x2="620" y2="252" />
                <line x1="20" y1="180" x2="620" y2="180" />
                <line x1="20" y1="115" x2="620" y2="115" />
              </g>

              {/* Station Slice CAD Watermark Typography */}
              <g fill="rgba(148, 163, 184, 0.35)" fontSize="6.5" fontWeight="bold">
                <text x="70" y="42" textAnchor="middle">STA 0 (NOSE)</text>
                <text x="162" y="42" textAnchor="middle">STA 500 (F-AXLE)</text>
                <text x="244" y="42" textAnchor="middle">STA 1000 (COWL)</text>
                <text x="324" y="42" textAnchor="middle">STA 1500 (CoG)</text>
                <text x="404" y="42" textAnchor="middle">STA 2000 (FLAT-6)</text>
                <text x="484" y="42" textAnchor="middle">STA 2500 (R-AXLE)</text>
                <text x="560" y="42" textAnchor="middle">STA 3000 (WING)</text>

                <text x="14" y="254" textAnchor="end">WL 100</text>
                <text x="14" y="182" textAnchor="end">WL 200</text>
                <text x="14" y="117" textAnchor="end">WL 300</text>
              </g>

              {/* Studio Asphalt Isometric Floor Plane Aligned with Car's Wheels */}
              <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.6">
                <line x1="15" y1="252" x2="625" y2="252" />
                <line x1="25" y1="266" x2="615" y2="266" strokeDasharray="4 4" />
                <line x1="70" y1="252" x2="35" y2="280" />
                <line x1="162" y1="252" x2="135" y2="280" />
                <line x1="244" y1="252" x2="225" y2="280" />
                <line x1="324" y1="252" x2="310" y2="280" />
                <line x1="404" y1="252" x2="395" y2="280" />
                <line x1="484" y1="252" x2="480" y2="280" />
                <line x1="560" y1="252" x2="560" y2="280" />
              </g>

              {/* Contact-Patch Footprints Aligned to Ground Asphalt */}
              <ellipse
                cx="162"
                cy="252"
                rx="24"
                ry="4.5"
                fill="url(#gtContactPattern)"
                stroke="#D2FF00"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <ellipse
                cx="484"
                cy="252"
                rx="28"
                ry="5"
                fill="url(#gtContactPattern)"
                stroke="#D2FF00"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Wheel Hub Real Tire Specs: 275/35 R20 (F) and 335/30 R21 (R) */}
              <g>
                <circle cx="162" cy="222" r="6" fill="#0B0F17" stroke="#D2FF00" strokeWidth="1" />
                <line x1="162" y1="228" x2="162" y2="274" stroke="rgba(210,255,0,0.6)" strokeWidth="0.75" strokeDasharray="2 2" />
                <rect x="112" y="274" width="100" height="15" rx="3" fill="#0B0F17" stroke="#D2FF00" strokeWidth="0.8" />
                <text x="162" y="285" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  275/35 R20 (F)
                </text>
              </g>

              <g>
                <circle cx="484" cy="220" r="6.5" fill="#0B0F17" stroke="#D2FF00" strokeWidth="1" />
                <line x1="484" y1="226" x2="484" y2="274" stroke="rgba(210,255,0,0.6)" strokeWidth="0.75" strokeDasharray="2 2" />
                <rect x="434" y="274" width="100" height="15" rx="3" fill="#0B0F17" stroke="#D2FF00" strokeWidth="0.8" />
                <text x="484" y="285" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                  335/30 R21 (R)
                </text>
              </g>

              {/* Center of Gravity (CoG) Crosshair Icon Between Wheelbase */}
              <g>
                <circle cx="324" cy="198" r="9" fill="none" stroke="#D2FF00" strokeWidth="1" strokeDasharray="3 2" className="animate-pulse" />
                <circle cx="324" cy="198" r="3" fill="#D2FF00" />
                <line x1="312" y1="198" x2="336" y2="198" stroke="#D2FF00" strokeWidth="1" />
                <line x1="324" y1="186" x2="324" y2="210" stroke="#D2FF00" strokeWidth="1" />
                <rect x="244" y="166" width="160" height="15" rx="3" fill="#0B0F17" stroke="#D2FF00" strokeWidth="0.8" />
                <text x="324" y="177" fill="#D2FF00" fontSize="7" fontWeight="bold" textAnchor="middle">
                  ⌖ CoG [39% H // -7.5 MM AZ31B ROOF]
                </text>
              </g>

              {/* Aerodynamic Stagnation Datum at the Nose */}
              <g>
                <circle cx="65" cy="244" r="4" fill="#00E5FF" className="animate-ping" />
                <circle cx="65" cy="244" r="3" fill="#00E5FF" />
                <polyline points="65,244 45,210 115,210" fill="none" stroke="#00E5FF" strokeWidth="0.8" strokeDasharray="2 2" />
                <rect x="118" y="202" width="170" height="15" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="0.8" />
                <text x="124" y="213" fill="#00E5FF" fontSize="7" fontWeight="bold">
                  ⌖ NOSE STAGNATION: 101.3 kPa (0° α)
                </text>
              </g>
            </g>

            {/* ============================================================ */}
            {/* LAYER 1 (MID - Depth: +15px): Cyan/Lime CAD Edge Overlay */}
            {/* ============================================================ */}
            <g style={{ transform: "translateZ(15px)" }}>
              {/* Fine Cyan/Lime Wireframe & Edge-Detection Paths Aligned to Body Panels */}
              {/* 1. Chin Splitter Edge & Endplate Fence */}
              <path
                d="M 52 248 L 115 248 L 115 242 L 62 242 L 56 230 L 48 248 Z"
                fill="none"
                stroke="rgba(0, 229, 255, 0.85)"
                strokeWidth="1"
              />

              {/* 2. Hood Relief Nostrils & Air Extraction Vents (GT3 RS S-Ducts) */}
              <g stroke="#D2FF00" strokeWidth="0.9" fill="rgba(210, 255, 0, 0.08)">
                <polygon points="145,204 175,198 182,202 150,208" />
                <polygon points="160,198 190,192 196,196 166,202" />
              </g>

              {/* 3. Vented Wheel-Arch Fender Louvers */}
              <g stroke="rgba(210, 255, 0, 0.75)" strokeWidth="0.8">
                <line x1="145" y1="188" x2="158" y2="184" />
                <line x1="150" y1="184" x2="163" y2="180" />
                <line x1="155" y1="180" x2="168" y2="176" />
                <line x1="160" y1="176" x2="173" y2="172" />
              </g>

              {/* 4. Roof Arch & Greenhouse Glass Edge */}
              <path
                d="M 235 174 L 295 118 Q 355 112 405 120 L 440 156"
                fill="none"
                stroke="rgba(0, 229, 255, 0.7)"
                strokeWidth="1"
              />

              {/* 5. Swan-Neck GT Rear Wing Pylons & Dual-Element Airfoil */}
              <path
                d="M 488 162 Q 504 78 540 74 L 550 74 Q 518 88 500 162"
                fill="none"
                stroke="rgba(210, 255, 0, 0.85)"
                strokeWidth="1.2"
              />
              <path
                d="M 515 74 Q 555 64 595 68 L 593 75 Q 555 70 517 79 Z"
                fill={activeMode === "downforce" ? "#00E5FF" : activeMode === "torsion" ? "#FFB800" : "#D2FF00"}
                stroke="#FFFFFF"
                strokeWidth="0.9"
              />
              <line x1="595" y1="68" x2="595" y2="61" stroke="#FFFFFF" strokeWidth="1.4" />
              <path d="M 510 58 L 600 58 L 600 86 L 510 86 Z" fill="none" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.75" />

              {/* Mode 03 TORSION FEA Structural Mesh Overlay */}
              {activeMode === "torsion" && (
                <g className="animate-in fade-in duration-200">
                  <path
                    d="M 70 242 L 150 236 L 225 180 L 305 118 L 415 120 L 490 168 L 560 186 L 560 236 L 150 242 Z"
                    fill="url(#gtFeaGrad)"
                    stroke="#FFB800"
                    strokeWidth="1.4"
                    strokeDasharray="4 2"
                  />
                  <rect x="220" y="140" width="200" height="18" rx="3" fill="#0B0F17" stroke="#FFB800" strokeWidth="1" />
                  <text x="320" y="152" fill="#FFB800" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TORSIONAL RIGIDITY: 42,000 NM/DEG
                  </text>
                </g>
              )}
            </g>

            {/* ============================================================ */}
            {/* LAYER 2 (FRONT - Depth: +30px): Real-Contour Streamlines & Vectors */}
            {/* ============================================================ */}
            <g style={{ transform: "translateZ(30px)" }}>
              {/* Mode 01: [ 01 CFD FLOW ] - Animated SVG Streamlines Hugging Real Car Contours */}
              {activeMode === "cfd" && (
                <g stroke="url(#gtStreamlineGrad)" fill="none" strokeLinecap="round" className="animate-in fade-in duration-200">
                  {/* Streamline 1: Starts ahead of splitter, rides low along underfloor diffuser tunnel, exits up through rear diffuser */}
                  <path
                    d="M 20 246 C 45 246, 85 248, 160 248 C 280 248, 410 246, 480 238 C 520 230, 565 215, 620 205"
                    strokeWidth="2.8"
                    className="animate-aero-dash-fast"
                  />

                  {/* Streamline 2: Rises over front bumper, dips through hood relief ducts, sweeps up windshield, hugs roofline */}
                  <path
                    d="M 20 228 C 45 228, 70 216, 120 204 C 150 196, 185 186, 230 170 C 275 140, 310 116, 360 116 C 420 116, 465 138, 510 162"
                    strokeWidth="2.2"
                    className="animate-aero-dash"
                  />

                  {/* Streamline 3: High-speed upper flow traveling over roof, striking swan-neck rear wing airfoil at -4.2° AoA, shedding animated vortex dashes */}
                  <path
                    d="M 20 102 C 140 102, 230 76, 310 68 C 390 60, 465 72, 515 78 C 540 82, 565 78, 620 84"
                    strokeWidth="3"
                    className="animate-aero-dash-fast"
                  />

                  {/* Shedding Vortex Dashes off Wing Tips */}
                  <path
                    d="M 590 64 C 602 60, 615 64, 625 72"
                    strokeWidth="1.8"
                    className="animate-aero-dash"
                  />
                  <path
                    d="M 590 86 C 604 90, 616 86, 625 80"
                    strokeWidth="1.8"
                    className="animate-aero-dash"
                  />
                </g>
              )}

              {/* Mode 02: [ 02 DOWNFORCE ] - Cyan Load Vectors on Front Splitter & Rear Wing */}
              {activeMode === "downforce" && (
                <g className="animate-in fade-in duration-200">
                  {/* Front Axle / Splitter Downforce Vector */}
                  <line
                    x1="162"
                    y1="130"
                    x2="162"
                    y2="200"
                    stroke="#00E5FF"
                    strokeWidth="2.6"
                    markerEnd="url(#gtDownforceArrow)"
                  />
                  <rect x="126" y="110" width="72" height="17" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="1" />
                  <text x="162" y="122" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ↓ 340 KG (38%)
                  </text>

                  {/* Dynamic Center of Pressure Marker */}
                  <line
                    x1="324"
                    y1="60"
                    x2="324"
                    y2="108"
                    stroke="#D2FF00"
                    strokeWidth="2"
                    markerEnd="url(#gtLimeMarker)"
                  />
                  <rect x="291" y="40" width="66" height="17" rx="3" fill="#0B0F17" stroke="#D2FF00" strokeWidth="1" />
                  <text x="324" y="52" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ⌖ COP: 41.5%
                  </text>

                  {/* Rear GT Wing Downforce Vector */}
                  <line
                    x1="550"
                    y1="15"
                    x2="550"
                    y2="62"
                    stroke="#00E5FF"
                    strokeWidth="3.2"
                    markerEnd="url(#gtDownforceArrow)"
                  />
                  <rect x="513" y="0" width="74" height="17" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="1" />
                  <text x="550" y="12" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ↓ 520 KG (62%)
                  </text>
                </g>
              )}

              {/* 4 Interactive Technical Datum Pins */}
              {HARDPOINT_PINS.map((pin) => {
                const isHovered = hoveredPinId === pin.id;
                return (
                  <g
                    key={pin.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredPinId(pin.id)}
                    onMouseLeave={() => setHoveredPinId(null)}
                  >
                    {/* Pulsing Target Reticle Halo */}
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={isHovered ? 9 : 6}
                      fill="none"
                      stroke={isHovered ? "#D2FF00" : "rgba(210, 255, 0, 0.45)"}
                      strokeWidth={isHovered ? 1.5 : 0.8}
                      className={isHovered ? "animate-pulse" : ""}
                    />
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={isHovered ? 4.5 : 3}
                      fill={isHovered ? "#D2FF00" : "#00E5FF"}
                      className={isHovered ? "animate-ping" : ""}
                    />
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={2.5}
                      fill="#FFF"
                    />
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Micro-Telemetry Tooltip on Hover */}
          {activeTooltip && (
            <div className="absolute top-3 left-3 max-w-[85%] bg-[#080B12]/95 border border-[#D2FF00]/80 px-3.5 py-2 rounded-lg shadow-2xl text-[10px] text-white flex items-center gap-2 pointer-events-none animate-in fade-in zoom-in-95 duration-150 z-30 font-mono">
              <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping shrink-0" />
              <span className="leading-tight tracking-wider">{activeTooltip}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Clean Telemetry Data Overlay (Preserved Exact Spec) */}
      <div className="relative z-10 grid grid-cols-3 gap-2.5 pt-3 border-t border-white/[0.08] text-center font-mono">
        {/* Metric 1: AERO EFFICIENCY */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] text-[#6E7B91] uppercase font-bold tracking-wider">
            AERO EFFICIENCY
          </span>
          <span className="text-white font-black text-xs sm:text-sm tracking-tight mt-0.5 text-[#D2FF00]">
            3.42 L/D
          </span>
        </div>

        {/* Metric 2: STAGNATION PRESSURE */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] text-[#6E7B91] uppercase font-bold tracking-wider">
            STAGNATION PRESSURE
          </span>
          <span className="text-white font-black text-xs sm:text-sm tracking-tight mt-0.5 text-[#00E5FF]">
            101.3 kPa
          </span>
        </div>

        {/* Metric 3: REAR DIFFUSER BALANCE */}
        <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] text-[#6E7B91] uppercase font-bold tracking-wider">
            REAR DIFFUSER BALANCE
          </span>
          <span className="text-white font-black text-xs sm:text-sm tracking-tight mt-0.5 text-[#FFB800]">
            62%
          </span>
        </div>
      </div>

      {/* Bottom Sub-Footnote */}
      <div className="relative z-10 mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-[#718096] uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getActiveColor() }} />
          {activeMode === "cfd" && "DYNAMIC FLOW VELOCITY: 294 KM/H (Re: 4.8×10⁶)"}
          {activeMode === "downforce" && "TOTAL APEX DOWNFORCE: 860 KG @ 285 KM/H"}
          {activeMode === "torsion" && "COMPOSITE TORSIONAL RIGIDITY: 42,000 NM/DEG"}
        </span>
        <span className="text-[#D2FF00] font-bold">FIA HOMOLOGATED</span>
      </div>
    </div>
  );
}

export default AeroChassisHud;
