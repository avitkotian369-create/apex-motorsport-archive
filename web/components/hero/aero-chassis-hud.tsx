"use client";

import React, { useState } from "react";
import { Wind, Gauge, Flame, Activity } from "lucide-react";

export type AeroMode = "velocity" | "downforce" | "thermal";

export function AeroChassisHud() {
  const [activeMode, setActiveMode] = useState<AeroMode>("velocity");
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  return (
    <div className="relative w-full rounded-2xl bg-[#07090E]/85 border border-white/[0.08] p-4 sm:p-5 shadow-2xl overflow-hidden font-mono select-none group">
      {/* Background CAD Sub-Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Header Strip: Status & Telemetry Mode */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/[0.08] text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
          <span className="font-bold text-white uppercase tracking-wider text-[11px] sm:text-xs">
            CAD CHASSIS HUD <span className="text-[#4E5B73]">{"//"}</span> MONOCOQUE TUB
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 bg-[#0E131E] px-2.5 py-1 rounded border border-white/5">
          <Activity className="w-3 h-3 text-[#D2FF00]" />
          <span>WIND TUNNEL: WT-04 LIVE</span>
        </div>
      </div>

      {/* Interactive Mode Toggle Controls */}
      <div className="relative z-10 grid grid-cols-3 gap-1.5 pt-3 pb-2 text-[10px] sm:text-xs">
        <button
          onClick={() => setActiveMode("velocity")}
          className={`px-2.5 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMode === "velocity"
              ? "bg-[#D2FF00] text-black border-[#D2FF00] shadow-[0_0_15px_rgba(210,255,0,0.35)]"
              : "bg-[#0A0D15] hover:bg-[#111624] text-slate-400 hover:text-white border-white/5"
          }`}
        >
          <Wind className="w-3.5 h-3.5" />
          <span className="truncate">[ CFD VELOCITY ]</span>
        </button>

        <button
          onClick={() => setActiveMode("downforce")}
          className={`px-2.5 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMode === "downforce"
              ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.35)]"
              : "bg-[#0A0D15] hover:bg-[#111624] text-slate-400 hover:text-white border-white/5"
          }`}
        >
          <Gauge className="w-3.5 h-3.5" />
          <span className="truncate">[ DOWNFORCE VECTORS ]</span>
        </button>

        <button
          onClick={() => setActiveMode("thermal")}
          className={`px-2.5 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeMode === "thermal"
              ? "bg-[#FF8000] text-black border-[#FF8000] shadow-[0_0_15px_rgba(255,128,0,0.35)]"
              : "bg-[#0A0D15] hover:bg-[#111624] text-slate-400 hover:text-white border-white/5"
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span className="truncate">[ THERMAL SHEAR ]</span>
        </button>
      </div>

      {/* Interactive GPU-Accelerated SVG Schematic Stage */}
      <div className="relative z-10 w-full aspect-[16/9] min-h-[220px] max-h-[290px] my-2 bg-[#05070B] rounded-xl border border-white/[0.06] overflow-hidden flex items-center justify-center shadow-inner">
        <svg
          viewBox="0 0 540 280"
          className="w-full h-full transform-gpu select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Velocity Flow Gradient */}
            <linearGradient id="velocityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D2FF00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.5" />
            </linearGradient>

            {/* Thermal Gradient */}
            <linearGradient id="thermalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#FF8000" stopOpacity="0.75" />
              <stop offset="60%" stopColor="#FF3344" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF8000" stopOpacity="0.6" />
            </linearGradient>

            {/* Downforce Vector Arrowheads */}
            <marker
              id="downforceHead"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#22D3EE" />
            </marker>

            {/* Subtle Diagonal Carbon Hatch Pattern */}
            <pattern
              id="carbonHatch"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
            </pattern>

            {/* Thermal Hotspot Glow Gradients */}
            <radialGradient id="brakeHeat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF3344" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#FF8000" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF8000" stopOpacity="0" />
            </radialGradient>

            <radialGradient id="exhaustHeat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FF2200" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FF8000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF8000" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Subtle Engineering Coordinate Crosshairs */}
          <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
            <line x1="20" y1="20" x2="35" y2="20" />
            <line x1="20" y1="20" x2="20" y2="35" />
            <line x1="520" y1="20" x2="505" y2="20" />
            <line x1="520" y1="20" x2="520" y2="35" />
            <line x1="20" y1="260" x2="35" y2="260" />
            <line x1="20" y1="260" x2="20" y2="245" />
            <line x1="520" y1="260" x2="505" y2="260" />
            <line x1="520" y1="260" x2="520" y2="245" />
          </g>

          {/* 2. CARBON-FIBER SAFETY TUB & CHASSIS CONTOUR */}
          {/* Main Survival Cell Carbon Tub Body */}
          <path
            d="
              M 45 195 
              L 120 195 
              L 135 172 
              L 185 168 
              L 215 130 
              L 255 110 
              L 280 110 
              L 320 135 
              L 355 145 
              L 440 165 
              L 475 160 
              L 475 195 
              L 360 195 
              L 240 195 
              Z
            "
            fill="url(#carbonHatch)"
            stroke="#4A5568"
            strokeWidth="1.5"
            className="transition-colors duration-300"
          />

          {/* Underfloor Ground-Effect Venturi Tunnel Kickup */}
          <path
            d="
              M 40 198 
              L 340 198 
              Q 410 196 480 168 
              L 480 198 
              Z
            "
            fill="rgba(210,255,0,0.04)"
            stroke={activeMode === "downforce" ? "#22D3EE" : "#D2FF00"}
            strokeWidth="1.5"
            strokeDasharray={activeMode === "downforce" ? "none" : "4 2"}
          />

          {/* Front FIA Crash Structure Cone */}
          <path
            d="M 45 195 L 45 178 L 135 172 L 120 195 Z"
            fill="rgba(255,255,255,0.04)"
            stroke="#718096"
            strokeWidth="1"
          />

          {/* Cockpit Halo Safety Hoop */}
          <path
            d="M 195 145 Q 235 105 270 115 L 275 135"
            fill="none"
            stroke={hoveredHotspot === "halo" ? "#D2FF00" : "#A0AEC0"}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Rear Active Wing / Diffuser Pylon */}
          <path
            d="M 445 165 L 465 95 L 505 92 L 475 160"
            fill="none"
            stroke="#4A5568"
            strokeWidth="1.5"
          />
          {/* Rear Wing Airfoil Blade */}
          <path
            d="M 455 92 Q 485 86 515 90 L 512 96 Q 485 92 458 97 Z"
            fill={activeMode === "downforce" ? "#22D3EE" : "#D2FF00"}
            stroke="#E2E8F0"
            strokeWidth="1"
          />

          {/* 3. THERMAL SHEAR HEAT MAP OVERLAYS (Visible in Thermal Mode) */}
          {activeMode === "thermal" && (
            <g className="animate-in fade-in duration-300">
              {/* Front Wheel / Brake Duct Friction Thermal Wake */}
              <circle cx="105" cy="185" r="35" fill="url(#brakeHeat)" />
              {/* Radiator Core / Sidepod Exhaust */}
              <ellipse cx="260" cy="165" rx="45" ry="20" fill="url(#brakeHeat)" />
              {/* Rear Turbo / Exhaust Diffuser Heat Plume */}
              <circle cx="430" cy="160" r="40" fill="url(#exhaustHeat)" />
              {/* Thermal Annotations */}
              <text x="75" y="165" fill="#FF8000" fontSize="8" fontWeight="bold">
                BRAKE: 420°C
              </text>
              <text x="240" y="148" fill="#FF8000" fontSize="8" fontWeight="bold">
                CORE: 108°C
              </text>
              <text x="415" y="135" fill="#FF3344" fontSize="8" fontWeight="bold">
                EXHAUST: 680°C
              </text>
            </g>
          )}

          {/* 4. AERODYNAMIC STREAMLINES (GPU CSS Dash Animation) */}
          <g
            stroke={
              activeMode === "velocity"
                ? "url(#velocityGrad)"
                : activeMode === "thermal"
                ? "url(#thermalGrad)"
                : "rgba(34,211,238,0.7)"
            }
            fill="none"
            strokeLinecap="round"
          >
            {/* Streamline 1: Upper Canopy Freestream */}
            <path
              d="M 15 65 C 130 65, 210 50, 270 58 C 340 68, 420 55, 525 60"
              strokeWidth="1.5"
              className="animate-aero-dash"
            />

            {/* Streamline 2: Cockpit Boundary Layer */}
            <path
              d="M 15 105 C 120 105, 185 85, 255 75 C 330 65, 420 75, 525 72"
              strokeWidth="2"
              className="animate-aero-dash-fast"
            />

            {/* Streamline 3: Hood & Survival Cell Attached Flow */}
            <path
              d="M 15 140 C 95 140, 160 120, 225 115 C 310 110, 410 115, 525 105"
              strokeWidth="2.5"
              className="animate-aero-dash"
            />

            {/* Streamline 4: Sidepod Intake & Waistline Undercut */}
            <path
              d="M 15 168 C 85 168, 150 162, 235 158 C 320 152, 410 148, 525 130"
              strokeWidth="1.8"
              className="animate-aero-dash-fast"
            />

            {/* Streamline 5: Underfloor Ground-Effect High-Velocity Suction */}
            <path
              d="M 15 200 C 120 200, 250 200, 350 200 C 410 196, 465 176, 525 160"
              strokeWidth="3"
              stroke={activeMode === "downforce" ? "#22D3EE" : "#D2FF00"}
              className="animate-aero-dash-fast"
            />

            {/* Streamline 6: Diffuser Expansion Plume Vortex */}
            <path
              d="M 15 218 C 130 218, 270 218, 360 214 C 425 205, 475 185, 525 175"
              strokeWidth="1.5"
              className="animate-aero-dash"
            />
          </g>

          {/* 5. DOWNFORCE VECTORS (Visible in Downforce Mode) */}
          {activeMode === "downforce" && (
            <g className="animate-in fade-in duration-300">
              {/* Front Splitter Downforce Arrow */}
              <line
                x1="85"
                y1="135"
                x2="85"
                y2="190"
                stroke="#22D3EE"
                strokeWidth="2.5"
                markerEnd="url(#downforceHead)"
              />
              <rect x="52" y="115" width="66" height="16" rx="4" fill="#0A0D15" stroke="#22D3EE" strokeWidth="1" />
              <text x="85" y="127" fill="#22D3EE" fontSize="8" fontWeight="bold" textAnchor="middle">
                ↓ 340 KG (38%)
              </text>

              {/* Monocoque Center of Pressure (COP) Arrow */}
              <line
                x1="260"
                y1="65"
                x2="260"
                y2="105"
                stroke="#D2FF00"
                strokeWidth="2"
                markerEnd="url(#downforceHead)"
              />
              <rect x="228" y="45" width="64" height="16" rx="4" fill="#0A0D15" stroke="#D2FF00" strokeWidth="1" />
              <text x="260" y="57" fill="#D2FF00" fontSize="8" fontWeight="bold" textAnchor="middle">
                ⌖ COP: 42%
              </text>

              {/* Rear Diffuser & Wing Downforce Arrow */}
              <line
                x1="480"
                y1="40"
                x2="480"
                y2="88"
                stroke="#22D3EE"
                strokeWidth="3"
                markerEnd="url(#downforceHead)"
              />
              <rect x="445" y="20" width="70" height="16" rx="4" fill="#0A0D15" stroke="#22D3EE" strokeWidth="1" />
              <text x="480" y="32" fill="#22D3EE" fontSize="8" fontWeight="bold" textAnchor="middle">
                ↓ 520 KG (62%)
              </text>
            </g>
          )}

          {/* 6. INTERACTIVE CAD HOTSPOT PROBES */}
          {/* Probe 1: FIA Crash Cell */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("crash-cell")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="85" cy="185" r="4" fill="#D2FF00" className="animate-pulse" />
            <circle cx="85" cy="185" r="8" fill="none" stroke="#D2FF00" strokeWidth="1" opacity="0.6" />
          </g>

          {/* Probe 2: Titanium Halo */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("halo")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="235" cy="120" r="4" fill="#22D3EE" className="animate-pulse" />
            <circle cx="235" cy="120" r="8" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.6" />
          </g>

          {/* Probe 3: Venturi Ground Tunnel */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("venturi")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="410" cy="190" r="4" fill="#FF8000" className="animate-pulse" />
            <circle cx="410" cy="190" r="8" fill="none" stroke="#FF8000" strokeWidth="1" opacity="0.6" />
          </g>
        </svg>

        {/* Hover Hotspot Tooltip Pill */}
        {hoveredHotspot && (
          <div className="absolute top-3 left-3 bg-[#080B12]/95 border border-[#D2FF00]/60 px-3 py-1.5 rounded-lg shadow-2xl text-[10px] text-white flex items-center gap-2 pointer-events-none animate-in fade-in duration-150">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
            <span>
              {hoveredHotspot === "crash-cell" && "01. FIA COMPOSITE CRASH STRUCTURE // 120 kJ ABSORPTION"}
              {hoveredHotspot === "halo" && "02. GRADE 5 TITANIUM HALO // 125 kN VERTICAL LOAD RESISTANCE"}
              {hoveredHotspot === "venturi" && "03. CARBON VENTURI DIFFUSER // SUCTION GROUND EFFECT (-14 kPa)"}
            </span>
          </div>
        )}
      </div>

      {/* Live Monospace Telemetry Readouts (Prompt Mandatory Spec) */}
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08] text-center font-mono">
        {/* DRAG COEFF */}
        <div className="bg-[#0A0D15] p-2.5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] text-[#6E7B91] uppercase font-bold tracking-wider">
            DRAG COEFF
          </span>
          <span className="text-white font-black text-xs sm:text-sm text-[#D2FF00] tracking-tight mt-0.5">
            0.38 Cd
          </span>
        </div>

        {/* FRONT AERO */}
        <div className="bg-[#0A0D15] p-2.5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] text-[#6E7B91] uppercase font-bold tracking-wider">
            FRONT AERO
          </span>
          <span className="text-white font-black text-xs sm:text-sm text-cyan-400 tracking-tight mt-0.5">
            38%
          </span>
        </div>

        {/* REAR DIFFUSER */}
        <div className="bg-[#0A0D15] p-2.5 rounded-xl border border-white/5 flex flex-col items-center justify-center">
          <span className="text-[9px] text-[#6E7B91] uppercase font-bold tracking-wider">
            REAR DIFFUSER
          </span>
          <span className="text-white font-black text-xs sm:text-sm text-[#FF8000] tracking-tight mt-0.5">
            62%
          </span>
        </div>
      </div>

      {/* Mode-Specific Real-Time Sensor Footnote */}
      <div className="relative z-10 mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-[#718096] uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          {activeMode === "velocity" && "DYNAMIC VELOCITY: 294 KM/H (Re: 4.8×10⁶)"}
          {activeMode === "downforce" && "TOTAL AERO DOWNFORCE: 860 KG @ 250 KM/H"}
          {activeMode === "thermal" && "THERMAL BOUNDARY: CERAMIC TBC PASSIVE DISSIPATION"}
        </span>
        <span className="text-[#D2FF00] font-bold">100% HOMOLOGATED</span>
      </div>
    </div>
  );
}

export default AeroChassisHud;
