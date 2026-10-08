"use client";

import React, { useState } from "react";
import { Wind, Gauge, Shield, Activity } from "lucide-react";

export type AeroMode = "velocity" | "downforce" | "rigidity";

export function AeroChassisHud() {
  const [activeMode, setActiveMode] = useState<AeroMode>("velocity");
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Mode-dependent gradient IDs and color tokens
  const getStreamlineStroke = () => {
    switch (activeMode) {
      case "velocity":
        return "url(#velocityGrad)";
      case "downforce":
        return "url(#downforceGrad)";
      case "rigidity":
        return "url(#rigidityGrad)";
    }
  };

  const getActiveColor = () => {
    switch (activeMode) {
      case "velocity":
        return "#D2FF00";
      case "downforce":
        return "#00E5FF";
      case "rigidity":
        return "#FFB800";
    }
  };

  return (
    <div className="relative w-full bg-transparent overflow-hidden font-mono select-none group">
      {/* Soft Ambient Coordinate Grid & Gradient Accents (Integrated into Darkroom Grid) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-[radial-gradient(ellipse_at_center,rgba(210,255,0,0.06)_0%,transparent_70%)] pointer-events-none blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none blur-2xl" />

      {/* Top Header Strip: Status & Telemetry Mode */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/[0.08] text-xs">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] animate-ping"
            style={{ backgroundColor: getActiveColor(), color: getActiveColor() }}
          />
          <span className="font-bold text-white uppercase tracking-wider text-[11px] sm:text-xs">
            AERODYNAMIC FLOW HUD <span className="text-[#4E5B73]">{"//"}</span> ISO 7200 ORTHOGRAPHIC
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded border border-white/5">
          <Activity className="w-3 h-3 text-[#D2FF00]" />
          <span>CFD TUNNEL: WT-04 ACTIVE</span>
        </div>
      </div>

      {/* Interactive Mode Toggles: [ CFD VELOCITY ] | [ DOWNFORCE VECTORS ] | [ TORSIONAL RIGIDITY ] */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-3 pb-2 text-[10px] sm:text-xs">
        <button
          onClick={() => setActiveMode("velocity")}
          className={`px-2.5 py-2 rounded-lg border font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMode === "velocity"
              ? "bg-[#D2FF00] text-black border-[#D2FF00] shadow-[0_0_18px_rgba(210,255,0,0.4)] scale-[1.02]"
              : "bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white border-white/10"
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          <span className="truncate">[ CFD VELOCITY ]</span>
        </button>

        <button
          onClick={() => setActiveMode("downforce")}
          className={`px-2.5 py-2 rounded-lg border font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMode === "downforce"
              ? "bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_0_18px_rgba(0,229,255,0.4)] scale-[1.02]"
              : "bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white border-white/10"
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span className="truncate">[ DOWNFORCE VECTORS ]</span>
        </button>

        <button
          onClick={() => setActiveMode("rigidity")}
          className={`px-2.5 py-2 rounded-lg border font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMode === "rigidity"
              ? "bg-[#FFB800] text-black border-[#FFB800] shadow-[0_0_18px_rgba(255,184,0,0.4)] scale-[1.02]"
              : "bg-white/[0.02] hover:bg-white/[0.06] text-slate-400 hover:text-white border-white/10"
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span className="truncate">[ TORSIONAL RIGIDITY ]</span>
        </button>
      </div>

      {/* GPU-Accelerated SVG Aerodynamic Stage */}
      <div className="relative z-10 w-full aspect-[16/9] min-h-[220px] max-h-[295px] my-2 bg-transparent rounded-xl overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 540 280"
          className="w-full h-full transform-gpu select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* 1. Electric Lime Streamline Gradient (#D2FF00) */}
            <linearGradient id="velocityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.2" />
              <stop offset="35%" stopColor="#D2FF00" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#D2FF00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.3" />
            </linearGradient>

            {/* 2. Cyan Streamline Gradient (#00E5FF) */}
            <linearGradient id="downforceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#00E5FF" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#00E5FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.3" />
            </linearGradient>

            {/* 3. Amber Streamline Gradient (#FFB800) */}
            <linearGradient id="rigidityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB800" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#FFB800" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#FFB800" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFB800" stopOpacity="0.3" />
            </linearGradient>

            {/* Downforce Vector Arrowhead (#00E5FF) */}
            <marker
              id="downforceHead"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5FF" />
            </marker>

            {/* Lime Vector Arrowhead (#D2FF00) */}
            <marker
              id="limeHead"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D2FF00" />
            </marker>

            {/* Amber Rigidity Arrowhead (#FFB800) */}
            <marker
              id="rigidityHead"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFB800" />
            </marker>

            {/* Diagonal Carbon Weave Hatch */}
            <pattern
              id="carbonHatch"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            </pattern>
          </defs>

          {/* Coordinate Crosshairs */}
          <g stroke="rgba(255,255,255,0.1)" strokeWidth="1">
            <line x1="15" y1="15" x2="30" y2="15" />
            <line x1="15" y1="15" x2="15" y2="30" />
            <line x1="525" y1="15" x2="510" y2="15" />
            <line x1="525" y1="15" x2="525" y2="30" />
            <line x1="15" y1="265" x2="30" y2="265" />
            <line x1="15" y1="265" x2="15" y2="250" />
            <line x1="525" y1="265" x2="510" y2="265" />
            <line x1="525" y1="265" x2="525" y2="250" />
          </g>

          {/* Ground Plane Datum Line */}
          <line
            x1="10"
            y1="218"
            x2="530"
            y2="218"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1"
            strokeDasharray="6 3"
          />

          {/* Wheels / Tires Profiles (Orthographic Alignment) */}
          <circle cx="108" cy="200" r="26" fill="#0A0E17" stroke="#3A475C" strokeWidth="2" />
          <circle cx="108" cy="200" r="16" fill="#07090E" stroke="#5A6B85" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="432" cy="200" r="27" fill="#0A0E17" stroke="#3A475C" strokeWidth="2" />
          <circle cx="432" cy="200" r="17" fill="#07090E" stroke="#5A6B85" strokeWidth="1.2" strokeDasharray="3 3" />

          {/* ORTHOGRAPHIC MONOCOQUE CHASSIS OUTLINE */}
          {/* Main Carbon Monocoque Tub Body & Safety Survival Cell */}
          <path
            d="
              M 40 200
              L 65 200
              L 75 192
              L 128 192
              L 138 170
              L 182 165
              L 215 124
              L 260 104
              L 300 106
              L 335 130
              L 375 145
              L 415 160
              L 458 160
              L 472 175
              L 472 195
              L 460 200
              L 350 200
              L 240 200
              L 136 200
              Z
            "
            fill="url(#carbonHatch)"
            stroke={activeMode === "rigidity" ? "#FFB800" : "#55647A"}
            strokeWidth="1.8"
            className="transition-colors duration-300"
          />

          {/* Front Aerodynamic Splitter Blade with Endplate */}
          <path
            d="M 28 200 L 72 200 L 72 194 L 32 194 L 28 184 L 26 200 Z"
            fill={activeMode === "velocity" ? "rgba(210,255,0,0.15)" : activeMode === "downforce" ? "rgba(0,229,255,0.15)" : "rgba(255,184,0,0.15)"}
            stroke={getActiveColor()}
            strokeWidth="1.6"
            className="transition-colors duration-300"
          />

          {/* Cockpit Halo Safety Hoop Structure */}
          <path
            d="M 198 142 Q 240 98 280 110 L 286 130"
            fill="none"
            stroke={hoveredHotspot === "halo" ? "#D2FF00" : activeMode === "rigidity" ? "#FFB800" : "#8A99AD"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Underfloor Ground-Effect Venturi Tunnel Kickup */}
          <path
            d="
              M 72 202
              L 340 202
              Q 410 200 478 174
              L 478 202
              Z
            "
            fill="rgba(210,255,0,0.03)"
            stroke={activeMode === "downforce" ? "#00E5FF" : activeMode === "rigidity" ? "#FFB800" : "#D2FF00"}
            strokeWidth="1.5"
            strokeDasharray={activeMode === "downforce" ? "none" : "4 2"}
          />

          {/* Swan-Neck Rear Wing Pylons & Dual-Element Airfoil */}
          {/* Pylons */}
          <path
            d="M 442 165 L 466 86 L 476 86 L 468 160"
            fill="none"
            stroke="#4A5568"
            strokeWidth="1.6"
          />
          {/* Main Airfoil Blade */}
          <path
            d="M 452 84 Q 484 76 520 80 L 518 87 Q 484 82 454 88 Z"
            fill={activeMode === "downforce" ? "#00E5FF" : activeMode === "rigidity" ? "#FFB800" : "#D2FF00"}
            stroke="#E2E8F0"
            strokeWidth="1"
          />
          {/* Gurney Flap */}
          <line x1="520" y1="80" x2="520" y2="74" stroke="#FFF" strokeWidth="1.5" />

          {/* DYNAMIC STREAMLINES (GPU CSS Dash Animation) */}
          {/* Dynamic streamlines curling over splitter, roofline, waistline, and rear wing */}
          <g stroke={getStreamlineStroke()} fill="none" strokeLinecap="round" className="transition-all duration-300">
            {/* Streamline 1: Splitter Leading Edge Curling Underneath Venturi */}
            <path
              d="M 10 196 C 24 196, 50 204, 90 204 C 180 204, 320 204, 380 200 C 430 195, 470 178, 528 170"
              strokeWidth="2.5"
              className="animate-aero-dash-fast"
            />

            {/* Streamline 2: Splitter Curling Upwards Over Hood and Nose */}
            <path
              d="M 10 188 C 30 188, 50 175, 95 168 C 140 162, 175 145, 215 130"
              strokeWidth="1.8"
              className="animate-aero-dash"
            />

            {/* Streamline 3: Freestream Attached Flow Curling Smoothly Over Roofline & Canopy */}
            <path
              d="M 10 135 C 70 135, 140 115, 195 95 C 245 78, 290 80, 340 92 C 390 105, 430 84, 465 76 C 485 72, 510 74, 530 76"
              strokeWidth="2.4"
              className="animate-aero-dash-fast"
            />

            {/* Streamline 4: Boundary Layer Curling Directly Over Swan-Neck Rear Wing Top Surface */}
            <path
              d="M 10 95 C 110 95, 190 70, 260 62 C 330 54, 410 65, 460 76 C 485 82, 505 80, 530 82"
              strokeWidth="2.8"
              className="animate-aero-dash"
            />

            {/* Streamline 5: Cockpit Waistline Flow into Sidepod & Rear Wing Underside */}
            <path
              d="M 10 162 C 85 162, 150 155, 230 148 C 310 142, 380 142, 450 120 C 480 110, 510 102, 530 100"
              strokeWidth="1.6"
              className="animate-aero-dash-fast"
            />

            {/* Streamline 6: Diffuser High-Velocity Wake Expansion Plume */}
            <path
              d="M 10 216 C 120 216, 260 216, 360 212 C 420 205, 475 186, 530 180"
              strokeWidth="2"
              className="animate-aero-dash"
            />
          </g>

          {/* VECTOR FORCE ARROWS (Displayed Depending on Active Mode) */}
          {/* Mode 1: [ CFD VELOCITY ] Flow Direction Vectors */}
          {activeMode === "velocity" && (
            <g className="animate-in fade-in duration-200">
              {/* Splitter Ingestion Flow Vector */}
              <line x1="20" y1="184" x2="60" y2="184" stroke="#D2FF00" strokeWidth="2" markerEnd="url(#limeHead)" />
              <rect x="22" y="166" width="56" height="15" rx="3" fill="#07090E" stroke="#D2FF00" strokeWidth="0.8" />
              <text x="50" y="177" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                → 285 KM/H
              </text>

              {/* Roof Freestream Flow Vector */}
              <line x1="240" y1="52" x2="295" y2="52" stroke="#D2FF00" strokeWidth="2.2" markerEnd="url(#limeHead)" />
              <rect x="245" y="34" width="56" height="15" rx="3" fill="#07090E" stroke="#D2FF00" strokeWidth="0.8" />
              <text x="273" y="45" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                → 310 KM/H
              </text>

              {/* Rear Diffuser High-Velocity Suction Vector */}
              <line x1="450" y1="186" x2="495" y2="175" stroke="#D2FF00" strokeWidth="2" markerEnd="url(#limeHead)" />
              <rect x="460" y="194" width="56" height="15" rx="3" fill="#07090E" stroke="#D2FF00" strokeWidth="0.8" />
              <text x="488" y="205" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                → 245 KM/H
              </text>
            </g>
          )}

          {/* Mode 2: [ DOWNFORCE VECTORS ] Downward Load Vector Arrows */}
          {activeMode === "downforce" && (
            <g className="animate-in fade-in duration-200">
              {/* Front Splitter Downforce Vector */}
              <line
                x1="80"
                y1="130"
                x2="80"
                y2="188"
                stroke="#00E5FF"
                strokeWidth="2.5"
                markerEnd="url(#downforceHead)"
              />
              <rect x="46" y="110" width="68" height="16" rx="4" fill="#07090E" stroke="#00E5FF" strokeWidth="1" />
              <text x="80" y="121" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ↓ 340 KG (38%)
              </text>

              {/* Aerodynamic Center of Pressure (COP) Vector */}
              <line
                x1="255"
                y1="60"
                x2="255"
                y2="100"
                stroke="#D2FF00"
                strokeWidth="2"
                markerEnd="url(#limeHead)"
              />
              <rect x="222" y="40" width="66" height="16" rx="4" fill="#07090E" stroke="#D2FF00" strokeWidth="1" />
              <text x="255" y="51" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ⌖ COP: 42%
              </text>

              {/* Rear Wing & Diffuser Combined Downforce Vector */}
              <line
                x1="482"
                y1="34"
                x2="482"
                y2="76"
                stroke="#00E5FF"
                strokeWidth="3"
                markerEnd="url(#downforceHead)"
              />
              <rect x="446" y="14" width="72" height="16" rx="4" fill="#07090E" stroke="#00E5FF" strokeWidth="1" />
              <text x="482" y="25" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ↓ 520 KG (62%)
              </text>
            </g>
          )}

          {/* Mode 3: [ TORSIONAL RIGIDITY ] Chassis Structural Vectors */}
          {activeMode === "rigidity" && (
            <g className="animate-in fade-in duration-200">
              {/* Front Bulkhead Suspension Node Vector */}
              <line
                x1="120"
                y1="160"
                x2="95"
                y2="135"
                stroke="#FFB800"
                strokeWidth="2.5"
                markerEnd="url(#rigidityHead)"
              />
              <rect x="68" y="112" width="78" height="16" rx="4" fill="#07090E" stroke="#FFB800" strokeWidth="1" />
              <text x="107" y="123" fill="#FFB800" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ↗ 45 kN·m/deg
              </text>

              {/* Central Monocoque Tub Torsional Node Vector */}
              <circle cx="260" cy="140" r="14" fill="none" stroke="#FFB800" strokeWidth="1.8" strokeDasharray="3 3" />
              <circle cx="260" cy="140" r="4" fill="#FFB800" />
              <rect x="216" y="160" width="88" height="16" rx="4" fill="#07090E" stroke="#FFB800" strokeWidth="1" />
              <text x="260" y="171" fill="#FFB800" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ↺ 52.0 kN·m/deg TUB
              </text>

              {/* Rear Subframe Node Shear Vector */}
              <line
                x1="410"
                y1="150"
                x2="435"
                y2="125"
                stroke="#FFB800"
                strokeWidth="2.5"
                markerEnd="url(#rigidityHead)"
              />
              <rect x="410" y="102" width="78" height="16" rx="4" fill="#07090E" stroke="#FFB800" strokeWidth="1" />
              <text x="449" y="113" fill="#FFB800" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ↘ 48 kN·m/deg
              </text>
            </g>
          )}

          {/* Interactive Probing Nodes */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("splitter")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="50" cy="198" r="4" fill="#D2FF00" className="animate-pulse" />
            <circle cx="50" cy="198" r="8" fill="none" stroke="#D2FF00" strokeWidth="1" opacity="0.6" />
          </g>

          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("halo")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="240" cy="116" r="4" fill="#00E5FF" className="animate-pulse" />
            <circle cx="240" cy="116" r="8" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.6" />
          </g>

          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("wing")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="488" cy="82" r="4" fill="#FFB800" className="animate-pulse" />
            <circle cx="488" cy="82" r="8" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.6" />
          </g>
        </svg>

        {/* Probing Tooltip Tag */}
        {hoveredHotspot && (
          <div className="absolute top-2 left-2 bg-[#080B12]/95 border border-[#D2FF00]/60 px-3 py-1.5 rounded-lg shadow-2xl text-[10px] text-white flex items-center gap-2 pointer-events-none animate-in fade-in duration-150">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
            <span>
              {hoveredHotspot === "splitter" && "01. CARBON FIBER FRONT SPLITTER // BOUNDARY SEPARATION DAM"}
              {hoveredHotspot === "halo" && "02. TI-6AL-4V SAFETY MONOCOQUE HALO // 125 kN TORSIONAL RESISTANCE"}
              {hoveredHotspot === "wing" && "03. SWAN-NECK DRS DUAL WING // 860 KG MAXIMUM HIGH-SPEED APEX LOAD"}
            </span>
          </div>
        )}
      </div>

      {/* TELEMETRY DATA OVERLAY (Subtle, Clean Monospace Telemetry Data) */}
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
          {activeMode === "velocity" && "DYNAMIC FLOW VELOCITY: 294 KM/H (Re: 4.8×10⁶)"}
          {activeMode === "downforce" && "TOTAL APEX DOWNFORCE: 860 KG @ 285 KM/H"}
          {activeMode === "rigidity" && "COMPOSITE TORSIONAL RIGIDITY: 52.0 kNm/deg"}
        </span>
        <span className="text-[#D2FF00] font-bold">FIA HOMOLOGATED</span>
      </div>
    </div>
  );
}

export default AeroChassisHud;
