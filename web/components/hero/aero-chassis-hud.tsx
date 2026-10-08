"use client";

import React, { useState } from "react";
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
    x: 44,
    y: 228,
    spec: "01. FRONT SPLITTER & VENTURI TUNNEL // -14.2 kPa SUCTION @ 285 KM/H // PRE-PREG AUTOCLAVE CARBON",
  },
  {
    id: "monocoque",
    label: "02. T1100 COUPE SAFETY CELL",
    x: 310,
    y: 112,
    spec: "02. T1100 CARBON COUPE SURVIVAL CELL // INTEGRATED ROLL CAGE // 125 kN FIA CRUSH TOLERANCE",
  },
  {
    id: "cop",
    label: "03. CENTER OF PRESSURE // 41.5%",
    x: 300,
    y: 228,
    spec: "03. DYNAMIC CENTER OF PRESSURE // 41.5% FRONT / 58.5% REAR // OPTIMAL HIGH-SPEED PITCH BALANCE",
  },
  {
    id: "wing",
    label: "04. SWAN-NECK GT REAR WING",
    x: 535,
    y: 74,
    spec: "04. SWAN-NECK GT REAR WING // DUAL-ELEMENT WITH DRS ACTUATOR // 520 KG LOAD @ 12° AoA",
  },
];

export function AeroChassisHud() {
  const [activeMode, setActiveMode] = useState<AeroMode>("cfd");
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ relX: 0.5, relY: 0.5, mmX: 2450, mmY: 680 });

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
            GT HOMOLOGATION CAD <span className="text-[#4E5B73]">{"//"}</span> 3D COUPE SCHEMATIC
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

      {/* GPU-Accelerated 3D Parallax Viewport Container */}
      <div
        style={{ perspective: "900px" }}
        className="relative z-10 w-full aspect-[16/9] min-h-[235px] max-h-[310px] my-2 bg-[#06080E]/90 rounded-xl border border-white/[0.08] overflow-hidden flex items-center justify-center shadow-inner"
      >
        {/* Ambient Volumetric Ground Reflection Glow (Transitions by Active Mode) */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-20 pointer-events-none blur-3xl transition-all duration-500 rounded-full z-0"
          style={{
            background:
              activeMode === "cfd"
                ? "radial-gradient(ellipse at center, rgba(210, 255, 0, 0.22) 0%, transparent 70%)"
                : activeMode === "downforce"
                ? "radial-gradient(ellipse at center, rgba(0, 229, 255, 0.24) 0%, transparent 70%)"
                : "radial-gradient(ellipse at center, rgba(255, 184, 0, 0.24) 0%, transparent 70%)",
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
          <svg
            viewBox="0 0 620 310"
            className="w-full h-full select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Streamline Flow Gradient */}
              <linearGradient id="gtLimeFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.15" />
                <stop offset="30%" stopColor="#D2FF00" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#D2FF00" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.25" />
              </linearGradient>

              {/* Monocoque Carbon FEA Stress Gradient */}
              <linearGradient id="gtFeaStressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFB800" stopOpacity="0.25" />
                <stop offset="30%" stopColor="#FF8000" stopOpacity="0.45" />
                <stop offset="55%" stopColor="#FF3300" stopOpacity="0.65" />
                <stop offset="75%" stopColor="#FF8000" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFB800" stopOpacity="0.25" />
              </linearGradient>

              {/* Cyan Downforce Vector Arrow */}
              <marker
                id="gtCyanArrow"
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
                id="gtLimeArrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#D2FF00" />
              </marker>

              {/* Carbon Composite Cross-Weave Hatching */}
              <pattern
                id="gtCarbonHatch"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" />
                <line x1="0" y1="0" x2="8" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" />
              </pattern>

              {/* Tire Contact Patch Grip Hatching */}
              <pattern
                id="gtContactHatch"
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
                <line x1="45" y1="45" x2="45" y2="250" />
                <line x1="135" y1="45" x2="135" y2="250" />
                <line x1="220" y1="45" x2="220" y2="250" />
                <line x1="305" y1="45" x2="305" y2="250" />
                <line x1="390" y1="45" x2="390" y2="250" />
                <line x1="475" y1="45" x2="475" y2="250" />
                <line x1="565" y1="45" x2="565" y2="250" />

                <line x1="20" y1="240" x2="600" y2="240" />
                <line x1="20" y1="180" x2="600" y2="180" />
                <line x1="20" y1="120" x2="600" y2="120" />
              </g>

              {/* Station Slice Labels */}
              <g fill="rgba(148, 163, 184, 0.35)" fontSize="6.5" fontWeight="bold">
                <text x="45" y="42" textAnchor="middle">STA 0</text>
                <text x="135" y="42" textAnchor="middle">STA 500</text>
                <text x="220" y="42" textAnchor="middle">STA 1000</text>
                <text x="305" y="42" textAnchor="middle">STA 1500</text>
                <text x="390" y="42" textAnchor="middle">STA 2000</text>
                <text x="475" y="42" textAnchor="middle">STA 2500</text>
                <text x="565" y="42" textAnchor="middle">STA 3000</text>

                <text x="14" y="242" textAnchor="end">WL 100</text>
                <text x="14" y="182" textAnchor="end">WL 200</text>
                <text x="14" y="122" textAnchor="end">WL 300</text>
              </g>

              {/* Isometric Ground Grid Perspective Lines */}
              <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.6">
                <line x1="15" y1="242" x2="605" y2="242" />
                <line x1="25" y1="255" x2="595" y2="255" strokeDasharray="4 4" />
                <line x1="45" y1="242" x2="10" y2="270" />
                <line x1="135" y1="242" x2="105" y2="270" />
                <line x1="220" y1="242" x2="195" y2="270" />
                <line x1="305" y1="242" x2="285" y2="270" />
                <line x1="390" y1="242" x2="375" y2="270" />
                <line x1="475" y1="242" x2="465" y2="270" />
                <line x1="565" y1="242" x2="555" y2="270" />
              </g>

              {/* Contact-Patch Footprints (Staggered 20" Front & 21" Rear) */}
              <ellipse
                cx="135"
                cy="242"
                rx="22"
                ry="4.5"
                fill="url(#gtContactHatch)"
                stroke="#D2FF00"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text x="135" y="256" fill="rgba(210,255,0,0.6)" fontSize="6" fontWeight="bold" textAnchor="middle">
                [ CP-FRONT: 275/35ZR20 ]
              </text>

              <ellipse
                cx="475"
                cy="242"
                rx="26"
                ry="5"
                fill="url(#gtContactHatch)"
                stroke="#D2FF00"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text x="475" y="256" fill="rgba(210,255,0,0.6)" fontSize="6" fontWeight="bold" textAnchor="middle">
                [ CP-REAR: 335/30ZR21 ]
              </text>

              {/* Far-Side Axle & Rim Shadow Silhouettes */}
              <circle cx="152" cy="216" r="23" fill="none" stroke="rgba(100,116,139,0.2)" strokeWidth="0.8" />
              <circle cx="490" cy="214" r="25" fill="none" stroke="rgba(100,116,139,0.2)" strokeWidth="0.8" />
              <line x1="135" y1="216" x2="152" y2="216" stroke="rgba(100,116,139,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="475" y1="214" x2="490" y2="214" stroke="rgba(100,116,139,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
            </g>

            {/* ============================================================ */}
            {/* LAYER 1 (MID - Depth: +15px): Sculpted GT Coupe Supercar Body */}
            {/* ============================================================ */}
            <g style={{ transform: "translateZ(15px)" }}>
              {/* Outer Coupe Monocoque Shell (Sculpted GT Supercar Silhouette) */}
              <path
                d="
                  M 36 230 
                  L 95 230 
                  L 100 226 
                  A 29 29 0 0 1 162 226 
                  L 200 226 
                  L 415 226 
                  A 31 31 0 0 1 506 226 
                  L 522 226 
                  L 535 222 
                  L 528 200 
                  L 520 178 
                  L 512 168 
                  L 455 162 
                  L 360 118 
                  L 315 112 
                  L 255 116 
                  L 195 170 
                  L 155 178 
                  L 125 186 
                  L 65 204 
                  L 48 224 
                  Z
                "
                fill={activeMode === "torsion" ? "url(#gtFeaStressGrad)" : "url(#gtCarbonHatch)"}
                stroke={activeMode === "torsion" ? "#FFB800" : "rgba(148, 163, 184, 0.6)"}
                strokeWidth={activeMode === "torsion" ? "1.6" : "0.95"}
                className="transition-colors duration-300"
              />

              {/* Muscular Front Fender Arches & Aerodynamic Bonnet Ducts */}
              {/* Hood Sloping Contour & Muscle Crease */}
              <path
                d="M 52 216 Q 110 200 195 170"
                fill="none"
                stroke="rgba(241, 245, 249, 0.55)"
                strokeWidth="0.75"
              />
              {/* Dual Hood Aerodynamic Nostrils / Relief Vents (GT3 RS Style) */}
              <g stroke="#D2FF00" strokeWidth="0.8" fill="rgba(210, 255, 0, 0.1)">
                <polygon points="120,192 145,188 152,192 124,196" />
                <polygon points="135,186 160,182 166,186 139,190" />
              </g>

              {/* Front Wheel Arch Pressure-Relief Fender Louvers */}
              <g stroke="rgba(210, 255, 0, 0.75)" strokeWidth="0.8">
                <line x1="115" y1="184" x2="128" y2="180" />
                <line x1="120" y1="180" x2="133" y2="176" />
                <line x1="125" y1="176" x2="138" y2="172" />
                <line x1="130" y1="172" x2="143" y2="168" />
              </g>

              {/* Front Bumper Radiator Inlets & Chin Splitter */}
              <path
                d="M 32 232 L 95 232 L 95 226 L 42 226 L 36 216 L 30 232 Z"
                fill="rgba(210,255,0,0.08)"
                stroke={activeMode === "cfd" ? "#D2FF00" : "rgba(148, 163, 184, 0.7)"}
                strokeWidth="1.1"
              />
              {/* Dual-Plane Aerodynamic Dive Canards on Bumper */}
              <path d="M 60 212 L 82 205 L 80 202 L 58 208 Z" fill="none" stroke="#D2FF00" strokeWidth="0.85" />
              <path d="M 66 202 L 88 195 L 86 192 L 64 198 Z" fill="none" stroke="#D2FF00" strokeWidth="0.85" />
              {/* Front Bumper Large Radiator Air Intake Mesh */}
              <polygon points="46,225 80,225 76,214 48,220" fill="none" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="0.6" strokeDasharray="1 1" />

              {/* Greenhouse & Pillars (Iconic GT Coupe Side Window Glass & Hofmeister / Fastback Kink) */}
              <path
                d="
                  M 205 168 
                  L 255 120 
                  Q 310 115 352 122 
                  L 378 152 
                  L 205 168 
                  Z
                "
                fill="rgba(6, 8, 14, 0.85)"
                stroke="rgba(226, 232, 240, 0.85)"
                strokeWidth="0.9"
              />
              {/* B-Pillar & Rear Quarter Glass Divider */}
              <line x1="312" y1="116" x2="310" y2="162" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="1" />
              {/* Quarter Glass Triangular Window */}
              <polygon points="316,120 348,124 372,152 316,160" fill="rgba(15, 23, 42, 0.75)" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.6" />

              {/* Interior Sports Carbon Bucket Seat & Titanium Roll Cage Triangulation */}
              <g stroke="rgba(148, 163, 184, 0.35)" strokeWidth="0.85">
                {/* Roll Cage Diagonal Braces */}
                <line x1="312" y1="116" x2="375" y2="162" strokeDasharray="3 2" />
                <line x1="350" y1="120" x2="315" y2="162" strokeDasharray="3 2" />
                {/* Driver Seat Headrest Silhouette */}
                <ellipse cx="275" cy="138" rx="5" ry="7" fill="none" stroke="#D2FF00" strokeWidth="0.75" />
                <path d="M 270 148 Q 262 165 258 170" fill="none" stroke="rgba(210, 255, 0, 0.5)" strokeWidth="0.75" />
              </g>

              {/* Wide Body Rear Haunches & Flared Fenders with Intercooler Side Air Intake */}
              <path
                d="M 330 162 Q 410 152 475 168 Q 512 170 516 178"
                fill="none"
                stroke="rgba(241, 245, 249, 0.6)"
                strokeWidth="0.85"
              />
              {/* Side Intercooler Air Intake Scoop Duct on Rear Flank */}
              <polygon
                points="392,185 422,175 420,195 394,198"
                fill="rgba(6, 8, 14, 0.9)"
                stroke={activeMode === "cfd" ? "#D2FF00" : "rgba(148, 163, 184, 0.6)"}
                strokeWidth="0.8"
              />

              {/* Production Fine Panel Cut Lines (0.5px Width) */}
              <g stroke="rgba(148, 163, 184, 0.45)" strokeWidth="0.5">
                {/* Hood Front Shut Line */}
                <line x1="95" y1="205" x2="98" y2="226" />
                {/* Hood Rear Scuttle / Cowl Shut Line */}
                <line x1="190" y1="170" x2="192" y2="185" />
                {/* Front Door Forward Shut Line */}
                <path d="M 195 170 Q 200 195 198 226" fill="none" />
                {/* Front Door Rear Shut Line (B-Pillar down to sill) */}
                <path d="M 378 152 Q 382 188 384 226" fill="none" />
                {/* Side Sill Lower Rocker Panel Line */}
                <line x1="198" y1="222" x2="384" y2="222" />
                {/* Rear Bumper Fascia Separation Seam */}
                <path d="M 512 172 Q 508 195 510 220" fill="none" />
                {/* Aerodynamic Side Winglet Mirror on Door Stalk */}
                <line x1="206" y1="168" x2="198" y2="162" strokeWidth="1" />
                <path d="M 194 162 Q 202 158 206 162 Z" fill="rgba(226, 232, 240, 0.8)" />
              </g>

              {/* Track-Spec Aggressive Rear Underbody Diffuser */}
              <path
                d="M 425 226 L 530 226 L 538 205 L 450 222 Z"
                fill="none"
                stroke={activeMode === "downforce" ? "#00E5FF" : "rgba(148, 163, 184, 0.55)"}
                strokeWidth="0.9"
              />
              <line x1="465" y1="225" x2="495" y2="216" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.75" />
              <line x1="490" y1="225" x2="520" y2="210" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.75" />

              {/* Top-Mount Swan-Neck GT Rear Wing with DRS Actuator Linkage */}
              {/* Twin Swan-Neck Pylons Arching from Decklid */}
              <path
                d="M 468 164 Q 482 82 516 78 L 526 78 Q 494 92 476 164"
                fill="none"
                stroke="rgba(241, 245, 249, 0.85)"
                strokeWidth="1.4"
              />
              {/* DRS Hydraulic Ram Actuator Cylinder */}
              <rect x="514" y="72" width="12" height="4.5" rx="1" fill="#38BDF8" stroke="white" strokeWidth="0.6" />
              <line x1="520" y1="72" x2="534" y2="66" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="534" cy="66" r="1.5" fill="#FFF" />
              {/* Dual-Element High-Downforce GT Airfoil & Gurney Flap */}
              <path
                d="M 498 78 Q 540 68 578 72 L 576 79 Q 540 74 500 83 Z"
                fill={activeMode === "downforce" ? "#00E5FF" : activeMode === "torsion" ? "#FFB800" : "#D2FF00"}
                stroke="white"
                strokeWidth="1"
              />
              <line x1="578" y1="72" x2="578" y2="65" stroke="white" strokeWidth="1.5" />
              {/* Endplate Aerodynamic Fence */}
              <path d="M 494 62 L 582 62 L 582 90 L 494 90 Z" fill="none" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="0.8" />

              {/* Staggered Track Wheels (20" Front & 21" Rear with Tight Track Stance) */}
              {/* Front Wheel (X=135, Y=216, 20-inch proportion) */}
              <circle cx="135" cy="216" r="25" fill="#07090E" stroke="rgba(148, 163, 184, 0.55)" strokeWidth="1.2" />
              <circle cx="135" cy="216" r="17" fill="#04060A" stroke="rgba(148, 163, 184, 0.75)" strokeWidth="0.85" />
              {/* Multi-Spoke Forged Alloy Web */}
              <g stroke="rgba(148, 163, 184, 0.55)" strokeWidth="0.75">
                <line x1="135" y1="199" x2="135" y2="233" />
                <line x1="118" y1="216" x2="152" y2="216" />
                <line x1="123" y1="204" x2="147" y2="228" />
                <line x1="123" y1="228" x2="147" y2="204" />
              </g>
              {/* Drilled Carbon-Ceramic Rotor & 6-Piston Caliper */}
              <circle cx="135" cy="216" r="13" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
              <rect x="127" y="196" width="6" height="11" rx="1.5" fill="#FF8000" stroke="#FFF" strokeWidth="0.5" />
              {/* Center Lock Anodized Hex Nut */}
              <circle cx="135" cy="216" r="5" fill="#1E293B" stroke="#D2FF00" strokeWidth="1" />
              <circle cx="135" cy="216" r="1.5" fill="#D2FF00" />

              {/* Rear Wheel (X=475, Y=214, 21-inch staggered proportion) */}
              <circle cx="475" cy="214" r="27" fill="#07090E" stroke="rgba(148, 163, 184, 0.55)" strokeWidth="1.2" />
              <circle cx="475" cy="214" r="19" fill="#04060A" stroke="rgba(148, 163, 184, 0.75)" strokeWidth="0.85" />
              {/* Multi-Spoke Forged Alloy Web */}
              <g stroke="rgba(148, 163, 184, 0.55)" strokeWidth="0.75">
                <line x1="475" y1="195" x2="475" y2="233" />
                <line x1="456" y1="214" x2="494" y2="214" />
                <line x1="462" y1="201" x2="488" y2="227" />
                <line x1="462" y1="227" x2="488" y2="201" />
              </g>
              {/* Drilled Carbon-Ceramic Rotor & 4-Piston Caliper */}
              <circle cx="475" cy="214" r="14.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
              <rect x="467" y="193" width="6" height="11" rx="1.5" fill="#FF8000" stroke="#FFF" strokeWidth="0.5" />
              {/* Center Lock Anodized Hex Nut */}
              <circle cx="475" cy="214" r="5.5" fill="#1E293B" stroke="#D2FF00" strokeWidth="1" />
              <circle cx="475" cy="214" r="1.5" fill="#D2FF00" />
            </g>

            {/* ============================================================ */}
            {/* LAYER 2 (FRONT - Depth: +30px): Streamlines, Vectors, Datum Pins */}
            {/* ============================================================ */}
            <g style={{ transform: "translateZ(30px)" }}>
              {/* Mode 01: [ 01 CFD FLOW ] - Multi-Layer Bézier Streamlines Over Hood & Coupe Arc */}
              {activeMode === "cfd" && (
                <g stroke="url(#gtLimeFlowGrad)" fill="none" strokeLinecap="round" className="animate-in fade-in duration-200">
                  {/* Streamline 1: Chin Splitter Underbody Venturi Flow to Rear Diffuser */}
                  <path
                    d="M 15 228 C 35 228, 80 232, 135 232 C 245 232, 385 230, 445 224 C 485 218, 525 198, 595 190"
                    strokeWidth="2.6"
                    className="animate-aero-dash-fast"
                  />
                  {/* Streamline 2: Nose & Hood Aerodynamic Relief Extraction Outflow */}
                  <path
                    d="M 15 212 C 45 212, 80 198, 135 186 C 185 174, 220 156, 255 138"
                    strokeWidth="2"
                    className="animate-aero-dash"
                  />
                  {/* Streamline 3: Sloping Windshield, Roof Arc, and Fastback Rear Window to Rear Wing */}
                  <path
                    d="M 15 152 C 90 152, 170 128, 230 106 C 275 90, 325 90, 375 102 C 430 116, 475 92, 510 82 C 535 76, 565 76, 595 78"
                    strokeWidth="2.8"
                    className="animate-aero-dash-fast"
                  />
                  {/* Streamline 4: High-Velocity Freestream Skimming Over GT Rear Wing */}
                  <path
                    d="M 15 105 C 125 105, 215 76, 285 68 C 355 60, 445 70, 500 78 C 530 84, 565 80, 595 82"
                    strokeWidth="2.9"
                    className="animate-aero-dash"
                  />
                </g>
              )}

              {/* Mode 02: [ 02 DOWNFORCE ] - Cyan Load Vectors on Chin Splitter & GT Wing */}
              {activeMode === "downforce" && (
                <g className="animate-in fade-in duration-200">
                  {/* Front Axle / Splitter Downforce Vector */}
                  <line
                    x1="135"
                    y1="125"
                    x2="135"
                    y2="190"
                    stroke="#00E5FF"
                    strokeWidth="2.6"
                    markerEnd="url(#gtCyanArrow)"
                  />
                  <rect x="99" y="105" width="72" height="17" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="1" />
                  <text x="135" y="117" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ↓ 340 KG (38%)
                  </text>

                  {/* Dynamic Center of Pressure Marker */}
                  <line
                    x1="295"
                    y1="60"
                    x2="295"
                    y2="105"
                    stroke="#D2FF00"
                    strokeWidth="2"
                    markerEnd="url(#gtLimeArrow)"
                  />
                  <rect x="262" y="40" width="66" height="17" rx="3" fill="#0B0F17" stroke="#D2FF00" strokeWidth="1" />
                  <text x="295" y="52" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ⌖ COP: 41.5%
                  </text>

                  {/* Rear GT Wing Downforce Vector */}
                  <line
                    x1="540"
                    y1="20"
                    x2="540"
                    y2="66"
                    stroke="#00E5FF"
                    strokeWidth="3.2"
                    markerEnd="url(#gtCyanArrow)"
                  />
                  <rect x="503" y="0" width="74" height="17" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="1" />
                  <text x="540" y="12" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ↓ 520 KG (62%)
                  </text>
                </g>
              )}

              {/* Mode 03: [ 03 TORSION FEA ] - Chassis Stress Nodes along Coupe Tub */}
              {activeMode === "torsion" && (
                <g className="animate-in fade-in duration-200">
                  {/* Central Monocoque Torsion FEA Node */}
                  <circle cx="280" cy="150" r="16" fill="none" stroke="#FFB800" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="280" cy="150" r="5" fill="#FFB800" className="animate-ping" />
                  <circle cx="280" cy="150" r="4" fill="#FFB800" />
                  <rect x="180" y="168" width="200" height="18" rx="3" fill="#0B0F17" stroke="#FFB800" strokeWidth="1" />
                  <text x="280" y="180" fill="#FFB800" fontSize="8" fontWeight="bold" textAnchor="middle">
                    TORSIONAL RIGIDITY: 42,000 NM/DEG
                  </text>

                  {/* Front Bulkhead FEA Shear Vector */}
                  <line x1="144" y1="170" x2="118" y2="145" stroke="#FFB800" strokeWidth="2.2" />
                  <text x="114" y="135" fill="#FFB800" fontSize="7" fontWeight="bold">
                    FRONT BULKHEAD: 45 kN·m/deg
                  </text>

                  {/* Rear Cradle FEA Shear Vector */}
                  <line x1="445" y1="165" x2="470" y2="140" stroke="#FFB800" strokeWidth="2.2" />
                  <text x="465" y="135" fill="#FFB800" fontSize="7" fontWeight="bold">
                    REAR CRADLE: 38 kN·m/deg
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

      {/* Clean Telemetry Data Overlay (Subtle, Clean Monospace Telemetry Data) */}
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
