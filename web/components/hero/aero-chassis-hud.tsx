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
    label: "01. FRONT DIFFUSER TUNNEL",
    x: 48,
    y: 220,
    spec: "01. FRONT DIFFUSER TUNNEL // GROUND-EFFECT SUCTION (-14.2 kPa @ 285 KM/H) // PRE-PREG AUTOCLAVE CFRP",
  },
  {
    id: "monocoque",
    label: "02. T1100 MONOCOQUE TUB",
    x: 255,
    y: 114,
    spec: "02. T1100 MONOCOQUE TUB // 125 kN FIA CRUSH TOLERANCE // TORAYCA T1100G HIGH-MODULUS CARBON CELL",
  },
  {
    id: "cop",
    label: "03. CENTER OF PRESSURE // 41.5%",
    x: 305,
    y: 216,
    spec: "03. DYNAMIC CENTER OF PRESSURE // 41.5% FRONT / 58.5% REAR // PITCH STABILITY BIAS",
  },
  {
    id: "wing",
    label: "04. SWAN-NECK DRS AIRFOIL",
    x: 535,
    y: 78,
    spec: "04. SWAN-NECK DRS AIRFOIL // 520 KG LOAD @ 12° AoA // ACTIVE HYDRAULIC DRAG REDUCTION SYSTEM",
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

  // Cursor 3D Parallax & Tilt Angles
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
            CAD CHASSIS TERMINAL <span className="text-[#4E5B73]">{"//"}</span> APEX 3D FEA
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
              <linearGradient id="limeFlowGrad3D" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.15" />
                <stop offset="35%" stopColor="#D2FF00" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#D2FF00" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.25" />
              </linearGradient>

              {/* Monocoque Carbon FEA Stress Gradient */}
              <linearGradient id="feaStressGrad3D" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFB800" stopOpacity="0.25" />
                <stop offset="25%" stopColor="#FF8000" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#FF3300" stopOpacity="0.65" />
                <stop offset="75%" stopColor="#FF8000" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FFB800" stopOpacity="0.25" />
              </linearGradient>

              {/* Cyan Downforce Vector Arrow */}
              <marker
                id="cyanArrow3D"
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
                id="limeArrow3D"
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
                id="carbonRibHatch"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
                <line x1="0" y1="0" x2="8" y2="0" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
              </pattern>

              {/* Tire Contact Patch Grip Hatching */}
              <pattern
                id="contactPatchHatch"
                width="4"
                height="4"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(210,255,0,0.4)" strokeWidth="0.75" />
              </pattern>
            </defs>

            {/* ============================================================ */}
            {/* LAYER 0 (BACK - Depth: -10px): Grid, Station Slices, Ground Plane */}
            {/* ============================================================ */}
            <g style={{ transform: "translateZ(-10px)" }}>
              {/* Station Slices (Waterlines & Buttock Lines - 0.5px at 20% opacity) */}
              <g stroke="rgba(148, 163, 184, 0.2)" strokeWidth="0.5" strokeDasharray="3 3">
                {/* Station Cross-Sections along Length */}
                <line x1="48" y1="45" x2="48" y2="250" />
                <line x1="135" y1="45" x2="135" y2="250" />
                <line x1="220" y1="45" x2="220" y2="250" />
                <line x1="305" y1="45" x2="305" y2="250" />
                <line x1="390" y1="45" x2="390" y2="250" />
                <line x1="475" y1="45" x2="475" y2="250" />
                <line x1="560" y1="45" x2="560" y2="250" />

                {/* Horizontal Waterlines */}
                <line x1="20" y1="238" x2="600" y2="238" />
                <line x1="20" y1="180" x2="600" y2="180" />
                <line x1="20" y1="120" x2="600" y2="120" />
              </g>

              {/* Station Slice CAD Watermark Typography */}
              <g fill="rgba(148, 163, 184, 0.35)" fontSize="6.5" fontWeight="bold">
                <text x="48" y="42" textAnchor="middle">STA 0</text>
                <text x="135" y="42" textAnchor="middle">STA 500</text>
                <text x="220" y="42" textAnchor="middle">STA 1000</text>
                <text x="305" y="42" textAnchor="middle">STA 1500</text>
                <text x="390" y="42" textAnchor="middle">STA 2000</text>
                <text x="475" y="42" textAnchor="middle">STA 2500</text>
                <text x="560" y="42" textAnchor="middle">STA 3000</text>

                <text x="14" y="240" textAnchor="end">WL 100</text>
                <text x="14" y="182" textAnchor="end">WL 200</text>
                <text x="14" y="122" textAnchor="end">WL 300</text>
              </g>

              {/* Isometric Ground Grid Perspective Lines */}
              <g stroke="rgba(255,255,255,0.08)" strokeWidth="0.6">
                <line x1="15" y1="242" x2="605" y2="242" />
                <line x1="25" y1="255" x2="595" y2="255" strokeDasharray="4 4" />
                <line x1="50" y1="242" x2="10" y2="270" />
                <line x1="135" y1="242" x2="105" y2="270" />
                <line x1="220" y1="242" x2="195" y2="270" />
                <line x1="305" y1="242" x2="285" y2="270" />
                <line x1="390" y1="242" x2="375" y2="270" />
                <line x1="475" y1="242" x2="465" y2="270" />
                <line x1="560" y1="242" x2="555" y2="270" />
              </g>

              {/* Dashed Tire Contact-Patch Footprints with Grip Hatching */}
              {/* Front Contact Patch (under front tire at X=135, Y=244) */}
              <ellipse
                cx="135"
                cy="244"
                rx="22"
                ry="5"
                fill="url(#contactPatchHatch)"
                stroke="#D2FF00"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text x="135" y="258" fill="rgba(210,255,0,0.6)" fontSize="6" fontWeight="bold" textAnchor="middle">
                [ CP-FRONT: 245/35R20 ]
              </text>

              {/* Rear Contact Patch (under rear tire at X=475, Y=244) */}
              <ellipse
                cx="475"
                cy="244"
                rx="26"
                ry="5.5"
                fill="url(#contactPatchHatch)"
                stroke="#D2FF00"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text x="475" y="258" fill="rgba(210,255,0,0.6)" fontSize="6" fontWeight="bold" textAnchor="middle">
                [ CP-REAR: 335/30R21 ]
              </text>

              {/* Far-Side Axle & Wheel Shadow Silhouette (Axonometric Depth) */}
              <circle cx="152" cy="214" r="23" fill="none" stroke="rgba(100,116,139,0.22)" strokeWidth="0.8" />
              <circle cx="492" cy="214" r="24" fill="none" stroke="rgba(100,116,139,0.22)" strokeWidth="0.8" />
              <line x1="135" y1="220" x2="152" y2="214" stroke="rgba(100,116,139,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
              <line x1="475" y1="220" x2="492" y2="214" stroke="rgba(100,116,139,0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
            </g>

            {/* ============================================================ */}
            {/* LAYER 1 (MID - Depth: +15px): High-Density 3D Chassis Architecture */}
            {/* ============================================================ */}
            <g style={{ transform: "translateZ(15px)" }}>
              {/* Main Carbon Monocoque Safety Tub (Razor-Sharp 0.85px Stroke) */}
              <path
                d="
                  M 48 220 
                  L 125 212 
                  L 144 186 
                  L 194 180 
                  L 235 138 
                  L 280 114 
                  L 325 114 
                  L 360 138 
                  L 405 152 
                  L 450 164 
                  L 500 172 
                  L 518 186 
                  L 512 214 
                  L 385 218 
                  L 255 218 
                  L 144 218 
                  Z
                "
                fill={activeMode === "torsion" ? "url(#feaStressGrad3D)" : "url(#carbonRibHatch)"}
                stroke={activeMode === "torsion" ? "#FFB800" : "rgba(148, 163, 184, 0.55)"}
                strokeWidth={activeMode === "torsion" ? "1.6" : "0.9"}
                className="transition-colors duration-300"
              />

              {/* Visible Carbon Cross-Weave Structural Ribs & Bulkheads */}
              <g stroke="rgba(148, 163, 184, 0.35)" strokeWidth="0.75" strokeDasharray="3 2">
                {/* Bulkhead 1: Front Suspension Attachment Box */}
                <line x1="144" y1="186" x2="144" y2="218" />
                <line x1="144" y1="186" x2="194" y2="218" strokeDasharray="2 3" />
                {/* Bulkhead 2: Cockpit Pedal-Box & Master Cylinders */}
                <line x1="194" y1="180" x2="194" y2="218" />
                {/* Bulkhead 3: Fuel Cell Safety Cavity */}
                <line x1="280" y1="114" x2="280" y2="218" />
                <line x1="280" y1="114" x2="325" y2="218" strokeDasharray="2 3" />
                {/* Bulkhead 4: Engine Fire Wall & Torsional Bedplate */}
                <line x1="360" y1="138" x2="360" y2="218" />
                {/* Bulkhead 5: Transaxle Structural Carrier Node */}
                <line x1="450" y1="164" x2="450" y2="218" />
              </g>

              {/* Vented Front Wheel-Arch Louvers (Aerodynamic Pressure Relief Gills) */}
              <g stroke="rgba(210, 255, 0, 0.8)" strokeWidth="0.85">
                <line x1="118" y1="180" x2="132" y2="176" />
                <line x1="122" y1="176" x2="136" y2="172" />
                <line x1="126" y1="172" x2="140" y2="168" />
                <line x1="130" y1="168" x2="144" y2="164" />
              </g>

              {/* Multi-Element Front Splitter & Stepped Venturi Tunnels */}
              <path
                d="M 36 220 L 105 220 L 105 214 L 46 214 L 38 202 L 34 220 Z"
                fill="rgba(210,255,0,0.06)"
                stroke={activeMode === "cfd" ? "#D2FF00" : "rgba(148, 163, 184, 0.7)"}
                strokeWidth="1"
              />
              {/* Dual-Plane Aerodynamic Dive Canards */}
              <path d="M 68 202 L 92 195 L 90 192 L 66 198 Z" fill="none" stroke="#D2FF00" strokeWidth="0.85" />
              <path d="M 74 192 L 98 185 L 96 182 L 72 188 Z" fill="none" stroke="#D2FF00" strokeWidth="0.85" />

              {/* Cockpit Halo Safety Hoop with Titanium Center Clevis */}
              <path
                d="M 220 150 Q 262 100 305 110 L 312 132"
                fill="none"
                stroke={hoveredPinId === "monocoque" ? "#D2FF00" : activeMode === "torsion" ? "#FFB800" : "rgba(241, 245, 249, 0.85)"}
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <line x1="262" y1="122" x2="232" y2="148" stroke="rgba(241, 245, 249, 0.7)" strokeWidth="1.3" />
              <circle cx="262" cy="122" r="1.5" fill="#D2FF00" />

              {/* Underfloor Ground-Effect Venturi Tunnels with Vertical Strakes */}
              <path
                d="
                  M 105 222 
                  L 380 222 
                  Q 460 220 530 186 
                  L 530 222 
                  Z
                "
                fill="rgba(210,255,0,0.03)"
                stroke={activeMode === "downforce" ? "#00E5FF" : "rgba(148, 163, 184, 0.45)"}
                strokeWidth="0.9"
                strokeDasharray={activeMode === "downforce" ? "none" : "4 2"}
              />
              {/* Diffuser Vertical Strakes / Fences */}
              <line x1="430" y1="220" x2="480" y2="204" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="0.75" />
              <line x1="455" y1="221" x2="505" y2="195" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="0.75" />

              {/* Side Skirt with Vortex Generator Flick-Ups */}
              <path d="M 175 220 L 415 220 L 418 215 L 425 215 L 422 220" fill="none" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.8" />

              {/* Pushrod Suspension Geometry & Inboard Dampers */}
              {/* Front Pushrod Double Wishbones */}
              <line x1="135" y1="205" x2="178" y2="194" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.9" />
              <line x1="135" y1="228" x2="178" y2="222" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.9" />
              <line x1="135" y1="220" x2="192" y2="185" stroke="#D2FF00" strokeWidth="1" />
              {/* Inboard Coilover / Damper Reservoir */}
              <circle cx="192" cy="185" r="2.5" fill="#D2FF00" />
              <rect x="194" y="181" width="12" height="4" rx="1" fill="#1E293B" stroke="#D2FF00" strokeWidth="0.6" />

              {/* Rear Pushrod Double Wishbones */}
              <line x1="475" y1="204" x2="432" y2="194" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.9" />
              <line x1="475" y1="228" x2="432" y2="222" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.9" />
              <line x1="475" y1="220" x2="418" y2="186" stroke="#D2FF00" strokeWidth="1" />
              <circle cx="418" cy="186" r="2.5" fill="#D2FF00" />
              <rect x="404" y="182" width="12" height="4" rx="1" fill="#1E293B" stroke="#D2FF00" strokeWidth="0.6" />

              {/* Ventilated Carbon-Ceramic Brakes & Multi-Piston Calipers */}
              {/* Front Brakes */}
              <circle cx="135" cy="220" r="14" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
              <rect x="127" y="200" width="6" height="11" rx="1.5" fill="#FF8000" stroke="#FFF" strokeWidth="0.5" />

              {/* Rear Brakes */}
              <circle cx="475" cy="220" r="14.5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
              <rect x="467" y="199" width="6" height="11" rx="1.5" fill="#FF8000" stroke="#FFF" strokeWidth="0.5" />

              {/* Lightweight Center-Lock Forged Magnesium Wheels */}
              {/* Front Wheel (X=135, Y=220, R=25) */}
              <circle cx="135" cy="220" r="25" fill="#07090E" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="1.2" />
              <circle cx="135" cy="220" r="17" fill="#04060A" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="0.85" />
              {/* Multi-Spoke Webbing */}
              <g stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.75">
                <line x1="135" y1="203" x2="135" y2="237" />
                <line x1="118" y1="220" x2="152" y2="220" />
                <line x1="123" y1="208" x2="147" y2="232" />
                <line x1="123" y1="232" x2="147" y2="208" />
              </g>
              <circle cx="135" cy="220" r="6" fill="#1E293B" stroke="#D2FF00" strokeWidth="1" />
              <circle cx="135" cy="220" r="2" fill="#D2FF00" />

              {/* Rear Wheel (X=475, Y=220, R=26) */}
              <circle cx="475" cy="220" r="26" fill="#07090E" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="1.2" />
              <circle cx="475" cy="220" r="18" fill="#04060A" stroke="rgba(148, 163, 184, 0.7)" strokeWidth="0.85" />
              {/* Multi-Spoke Webbing */}
              <g stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.75">
                <line x1="475" y1="202" x2="475" y2="238" />
                <line x1="457" y1="220" x2="493" y2="220" />
                <line x1="462" y1="207" x2="488" y2="233" />
                <line x1="462" y1="233" x2="488" y2="207" />
              </g>
              <circle cx="475" cy="220" r="6" fill="#1E293B" stroke="#D2FF00" strokeWidth="1" />
              <circle cx="475" cy="220" r="2" fill="#D2FF00" />

              {/* Top-Mount Swan-Neck Active Rear Wing with DRS Actuator Linkage */}
              <path
                d="M 476 178 Q 488 88 522 82 L 530 82 Q 498 96 484 174"
                fill="none"
                stroke="rgba(241, 245, 249, 0.8)"
                strokeWidth="1.4"
              />
              {/* DRS Actuator Hydraulic Ram Linkage */}
              <rect x="518" y="76" width="12" height="4.5" rx="1" fill="#38BDF8" stroke="white" strokeWidth="0.6" />
              <line x1="524" y1="76" x2="538" y2="70" stroke="#38BDF8" strokeWidth="1" />
              <circle cx="538" cy="70" r="1.5" fill="#FFF" />
              {/* Dual-Element Airfoil & Gurney Flap */}
              <path
                d="M 502 82 Q 540 72 576 76 L 574 83 Q 540 78 504 87 Z"
                fill={activeMode === "downforce" ? "#00E5FF" : activeMode === "torsion" ? "#FFB800" : "#D2FF00"}
                stroke="white"
                strokeWidth="0.95"
              />
              <line x1="576" y1="76" x2="576" y2="69" stroke="white" strokeWidth="1.4" />
              {/* Wing Endplates */}
              <path d="M 498 67 L 579 67 L 579 93 L 498 93 Z" fill="none" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.8" />
            </g>

            {/* ============================================================ */}
            {/* LAYER 2 (FRONT - Depth: +30px): Flow Lines, Force Vectors, Pins */}
            {/* ============================================================ */}
            <g style={{ transform: "translateZ(30px)" }}>
              {/* Mode 01: [ 01 CFD FLOW ] - 4 Multi-Layer Bézier Streamlines */}
              {activeMode === "cfd" && (
                <g stroke="url(#limeFlowGrad3D)" fill="none" strokeLinecap="round" className="animate-in fade-in duration-200">
                  {/* Streamline 1: Splitter Underfloor & Venturi Diffuser Flow */}
                  <path
                    d="M 15 218 C 35 218, 80 224, 135 224 C 245 224, 385 222, 445 216 C 485 210, 525 186, 595 180"
                    strokeWidth="2.6"
                    className="animate-aero-dash-fast"
                  />
                  {/* Streamline 2: Nose Cone & Splitter Boundary Layer Flow */}
                  <path
                    d="M 15 208 C 40 208, 75 194, 125 184 C 175 174, 210 158, 245 142"
                    strokeWidth="1.9"
                    className="animate-aero-dash"
                  />
                  {/* Streamline 3: Windshield, Halo, & Roofline Flow curling into Swan-Neck Rear Wing */}
                  <path
                    d="M 15 150 C 85 150, 165 128, 225 106 C 275 90, 325 92, 375 104 C 425 116, 470 92, 510 82 C 535 76, 565 78, 595 80"
                    strokeWidth="2.7"
                    className="animate-aero-dash-fast"
                  />
                  {/* Streamline 4: Upper Freestream Wind-Tunnel Boundary Skim */}
                  <path
                    d="M 15 105 C 125 105, 215 78, 285 70 C 355 62, 445 72, 500 82 C 530 88, 565 84, 595 86"
                    strokeWidth="2.9"
                    className="animate-aero-dash"
                  />
                </g>
              )}

              {/* Mode 02: [ 02 DOWNFORCE ] - Downforce Load Vectors in Cyan #00E5FF */}
              {activeMode === "downforce" && (
                <g className="animate-in fade-in duration-200">
                  {/* Front Axle Downforce Vector */}
                  <line
                    x1="135"
                    y1="125"
                    x2="135"
                    y2="190"
                    stroke="#00E5FF"
                    strokeWidth="2.6"
                    markerEnd="url(#cyanArrow3D)"
                  />
                  <rect x="99" y="105" width="72" height="17" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="1" />
                  <text x="135" y="117" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ↓ 340 KG (38%)
                  </text>

                  {/* Center of Pressure Marker */}
                  <line
                    x1="290"
                    y1="60"
                    x2="290"
                    y2="105"
                    stroke="#D2FF00"
                    strokeWidth="2"
                    markerEnd="url(#limeArrow3D)"
                  />
                  <rect x="257" y="40" width="66" height="17" rx="3" fill="#0B0F17" stroke="#D2FF00" strokeWidth="1" />
                  <text x="290" y="52" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ⌖ COP: 41.5%
                  </text>

                  {/* Rear Wing & Diffuser Combined Downforce Vector */}
                  <line
                    x1="545"
                    y1="20"
                    x2="545"
                    y2="68"
                    stroke="#00E5FF"
                    strokeWidth="3.2"
                    markerEnd="url(#cyanArrow3D)"
                  />
                  <rect x="508" y="0" width="74" height="17" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="1" />
                  <text x="545" y="12" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                    ↓ 520 KG (62%)
                  </text>
                </g>
              )}

              {/* Mode 03: [ 03 TORSION FEA ] - FEA Stress Nodes in Amber #FFB800 */}
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
                    {/* Pulsing Target Halo */}
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
