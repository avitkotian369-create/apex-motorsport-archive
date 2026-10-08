"use client";

import React, { useState } from "react";
import { Wind, Gauge, Shield, Activity } from "lucide-react";

export type AeroMode = "cfd" | "downforce" | "torsion";

export function AeroChassisHud() {
  const [activeMode, setActiveMode] = useState<AeroMode>("cfd");
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({ x: 2450, y: 680 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const relY = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    // Map normalized 0-1 to realistic automotive CAD coordinates in mm
    const mmX = Math.round(relX * 4500);
    const mmY = Math.round((1 - relY) * 1400);
    setMouseCoords({ x: mmX, y: mmY });
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

  return (
    <div
      onMouseMove={handleMouseMove}
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

      {/* Subtle CAD Background Grid & Soft Radial Accents */}
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
            CAD CHASSIS TERMINAL <span className="text-[#4E5B73]">{"//"}</span> APEX FEA
          </span>
        </div>

        {/* Active Mouse-Tracking Coordinate Readout */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 bg-white/[0.03] px-2.5 py-1 rounded border border-white/10 font-mono tracking-wider tabular-nums">
          <Activity className="w-3 h-3 text-[#D2FF00]" />
          <span>
            ⌖ X: {mouseCoords.x.toLocaleString()} mm | Y: {mouseCoords.y.toLocaleString()} mm | ISO 7200 CLASS-A
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

      {/* GPU-Accelerated Razor-Sharp Technical CAD Wireframe Viewport */}
      <div className="relative z-10 w-full aspect-[16/9] min-h-[220px] max-h-[295px] my-2 bg-[#06080E]/80 rounded-lg border border-white/[0.06] overflow-hidden flex items-center justify-center shadow-inner">
        <svg
          viewBox="0 0 600 300"
          className="w-full h-full transform-gpu select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Streamline Gradients */}
            <linearGradient id="limeFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#D2FF00" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#D2FF00" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.3" />
            </linearGradient>

            {/* FEA Stress Heat Gradient along Monocoque Safety Tub */}
            <linearGradient id="feaStressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFB800" stopOpacity="0.3" />
              <stop offset="25%" stopColor="#FF8000" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#FF4400" stopOpacity="0.65" />
              <stop offset="75%" stopColor="#FFB800" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFD000" stopOpacity="0.3" />
            </linearGradient>

            {/* Cyan Downforce Marker Arrow */}
            <marker
              id="cyanArrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00E5FF" />
            </marker>

            {/* Lime Marker Arrow */}
            <marker
              id="limeArrow"
              viewBox="0 0 10 10"
              refX="5"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#D2FF00" />
            </marker>

            {/* Carbon Weave Hatch */}
            <pattern
              id="wireHatch"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* 1. Coordinate Drafting Grid Marks */}
          <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.8">
            <line x1="20" y1="20" x2="35" y2="20" />
            <line x1="20" y1="20" x2="20" y2="35" />
            <line x1="580" y1="20" x2="565" y2="20" />
            <line x1="580" y1="20" x2="580" y2="35" />
            <line x1="20" y1="280" x2="35" y2="280" />
            <line x1="20" y1="280" x2="20" y2="265" />
            <line x1="580" y1="280" x2="565" y2="280" />
            <line x1="580" y1="280" x2="580" y2="265" />
          </g>

          {/* Ground Plane Datum Line */}
          <line
            x1="15"
            y1="238"
            x2="585"
            y2="238"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="0.8"
            strokeDasharray="4 4"
          />

          {/* 2. RAZOR-SHARP TECHNICAL CAD WIREFRAME CHASSIS */}
          {/* Main Monocoque Safety Tub & Structural Bulkheads (0.75px–1px Stroke) */}
          <path
            d="
              M 55 220 
              L 125 212 
              L 142 188 
              L 190 182 
              L 230 140 
              L 275 118 
              L 320 118 
              L 355 142 
              L 400 156 
              L 445 168 
              L 495 174 
              L 510 188 
              L 505 212 
              L 380 216 
              L 250 216 
              L 140 216 
              Z
            "
            fill={activeMode === "torsion" ? "url(#feaStressGrad)" : "url(#wireHatch)"}
            stroke={activeMode === "torsion" ? "#FFB800" : "rgba(148, 163, 184, 0.45)"}
            strokeWidth={activeMode === "torsion" ? "1.5" : "0.9"}
            className="transition-colors duration-300"
          />

          {/* Internal Structural Bulkhead Ribs & Load Lines */}
          <g stroke="rgba(148, 163, 184, 0.3)" strokeWidth="0.75" strokeDasharray="3 2">
            {/* Front Suspension Bulkhead Node */}
            <line x1="142" y1="188" x2="140" y2="216" />
            {/* Steering Rack & Pedal Box Node */}
            <line x1="190" y1="182" x2="190" y2="216" />
            {/* Fuel Cell / Driver Seat Bulkhead */}
            <line x1="275" y1="118" x2="275" y2="216" />
            {/* Rear Engine Fire Wall Bulkhead */}
            <line x1="355" y1="142" x2="355" y2="216" />
            {/* Transaxle Carrier Ring */}
            <line x1="445" y1="168" x2="445" y2="216" />
          </g>

          {/* Front Carbon-Composite Splitter & Dive Planes (Canards) */}
          {/* Main Lower Splitter Blade */}
          <path
            d="M 38 220 L 95 220 L 95 215 L 44 215 L 38 205 L 35 220 Z"
            fill="rgba(210,255,0,0.06)"
            stroke={activeMode === "cfd" ? "#D2FF00" : "rgba(148, 163, 184, 0.6)"}
            strokeWidth="0.9"
          />
          {/* Stacked Dive Planes / Aerodynamic Canards */}
          <path d="M 68 204 L 88 198 L 86 195 L 66 201 Z" fill="none" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.8" />
          <path d="M 72 195 L 94 189 L 92 186 L 70 192 Z" fill="none" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.8" />

          {/* Cockpit FIA Safety Halo & Windshield A-Pillar */}
          <path
            d="M 215 152 Q 255 106 295 116 L 302 136"
            fill="none"
            stroke={hoveredHotspot === "halo" ? "#D2FF00" : activeMode === "torsion" ? "#FFB800" : "rgba(226, 232, 240, 0.7)"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Halo Central V-Strut */}
          <line x1="255" y1="126" x2="225" y2="150" stroke="rgba(226, 232, 240, 0.6)" strokeWidth="1.2" />

          {/* Underfloor Ground-Effect Venturi Tunnel Kickup */}
          <path
            d="
              M 95 222 
              L 370 222 
              Q 450 220 520 188 
              L 520 222 
              Z
            "
            fill="rgba(210,255,0,0.03)"
            stroke={activeMode === "downforce" ? "#00E5FF" : "rgba(148, 163, 184, 0.4)"}
            strokeWidth="0.85"
            strokeDasharray={activeMode === "downforce" ? "none" : "3 2"}
          />

          {/* Multi-Link Suspension Wishbones & Forged Magnesium Wheels */}
          {/* Front Wheels (Center at X=130, Y=218, R=24) */}
          <circle cx="130" cy="218" r="24" fill="#07090E" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1" />
          <circle cx="130" cy="218" r="15" fill="#04060A" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.8" />
          <circle cx="130" cy="218" r="6" fill="#1E293B" stroke="#D2FF00" strokeWidth="0.8" />
          {/* Brake Rotor Disc & Caliper */}
          <circle cx="130" cy="218" r="11" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" strokeDasharray="2 2" />
          <rect x="124" y="200" width="5" height="9" rx="1" fill="#FF8000" />
          {/* Front Suspension Double Wishbones & Pushrod */}
          <line x1="130" y1="205" x2="168" y2="195" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.85" />
          <line x1="130" y1="226" x2="168" y2="220" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.85" />
          <line x1="130" y1="218" x2="185" y2="186" stroke="rgba(210, 255, 0, 0.7)" strokeWidth="0.8" />

          {/* Rear Wheels (Center at X=470, Y=218, R=25) */}
          <circle cx="470" cy="218" r="25" fill="#07090E" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1" />
          <circle cx="470" cy="218" r="16" fill="#04060A" stroke="rgba(148, 163, 184, 0.6)" strokeWidth="0.8" />
          <circle cx="470" cy="218" r="6" fill="#1E293B" stroke="#D2FF00" strokeWidth="0.8" />
          {/* Brake Rotor Disc & Caliper */}
          <circle cx="470" cy="218" r="12" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.75" strokeDasharray="2 2" />
          <rect x="464" y="199" width="5" height="10" rx="1" fill="#FF8000" />
          {/* Rear Suspension Double Wishbones & Pushrod */}
          <line x1="470" y1="204" x2="430" y2="194" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.85" />
          <line x1="470" y1="226" x2="430" y2="220" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.85" />
          <line x1="470" y1="218" x2="415" y2="188" stroke="rgba(210, 255, 0, 0.7)" strokeWidth="0.8" />

          {/* Top-Mount Swan-Neck Active Rear Wing with DRS Actuator */}
          {/* Curved Swan-Neck Pylons */}
          <path
            d="M 470 178 Q 482 92 514 86 L 522 86 Q 492 98 478 174"
            fill="none"
            stroke="rgba(226, 232, 240, 0.7)"
            strokeWidth="1.2"
          />
          {/* DRS Hydraulic Actuator Cylinder */}
          <rect x="510" y="80" width="10" height="4" rx="1" fill="#38BDF8" stroke="white" strokeWidth="0.6" />
          <line x1="515" y1="80" x2="528" y2="76" stroke="#38BDF8" strokeWidth="0.8" />
          {/* Main Airfoil Profile & Dual-Element Flap */}
          <path
            d="M 495 86 Q 530 76 565 80 L 562 86 Q 530 82 497 90 Z"
            fill={activeMode === "downforce" ? "#00E5FF" : activeMode === "torsion" ? "#FFB800" : "#D2FF00"}
            stroke="white"
            strokeWidth="0.9"
          />
          {/* Gurney Flap */}
          <line x1="565" y1="80" x2="565" y2="74" stroke="white" strokeWidth="1.2" />
          {/* Aerodynamic Endplate */}
          <path d="M 492 72 L 568 72 L 568 96 L 492 96 Z" fill="none" stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.75" />

          {/* 3. TECHNICAL DIMENSION CALLOUTS WITH DASHED LEADER LINES */}
          {/* Callout 1: Wheelbase WB: 2,750 MM */}
          <g stroke="rgba(148, 163, 184, 0.5)" strokeWidth="0.8">
            <line x1="130" y1="242" x2="130" y2="265" strokeDasharray="2 2" />
            <line x1="470" y1="242" x2="470" y2="265" strokeDasharray="2 2" />
            {/* Dimension Span Arrow */}
            <line x1="130" y1="258" x2="470" y2="258" />
            <line x1="130" y1="254" x2="130" y2="262" />
            <line x1="470" y1="254" x2="470" y2="262" />
          </g>
          <rect x="250" y="250" width="100" height="15" rx="3" fill="#0B0F17" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="0.8" />
          <text x="300" y="261" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle">
            WB: 2,750 MM
          </text>

          {/* Callout 2: Aero Splitter Stagnation: 101.3 kPa */}
          <g>
            {/* Stagnation Dot on Splitter */}
            <circle cx="40" cy="216" r="3" fill="#00E5FF" className="animate-ping" />
            <circle cx="40" cy="216" r="2.5" fill="#00E5FF" />
            <polyline
              points="40,216 25,185 85,185"
              fill="none"
              stroke="#00E5FF"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            <rect x="88" y="177" width="170" height="15" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="0.8" />
            <text x="94" y="188" fill="#00E5FF" fontSize="7.5" fontWeight="bold">
              AERO SPLITTER STAGNATION: 101.3 KPA
            </text>
          </g>

          {/* Callout 3: Downforce Bias: 38% F / 62% R */}
          <g>
            <polyline
              points="300,118 300,75 360,75"
              fill="none"
              stroke="rgba(210,255,0,0.6)"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
            <rect x="362" y="67" width="160" height="15" rx="3" fill="#0B0F17" stroke="rgba(210,255,0,0.5)" strokeWidth="0.8" />
            <text x="368" y="78" fill="#D2FF00" fontSize="7.5" fontWeight="bold">
              DOWNFORCE BIAS: 38% F / 62% R
            </text>
          </g>

          {/* 4. DYNAMIC FLOW & PARTICLES BY ACTIVE MODE */}
          {/* Mode 01: [ 01 CFD FLOW ] - 4 Multi-Layer Bézier Streamlines in Electric Lime #D2FF00 */}
          {activeMode === "cfd" && (
            <g stroke="url(#limeFlowGrad)" fill="none" strokeLinecap="round" className="animate-in fade-in duration-200">
              {/* Streamline 1: Splitter Underfloor & Venturi Diffuser Flow */}
              <path
                d="M 15 218 C 35 218, 75 224, 130 224 C 240 224, 380 222, 440 216 C 480 210, 520 188, 580 182"
                strokeWidth="2.5"
                className="animate-aero-dash-fast"
              />

              {/* Streamline 2: Nose Cone & Splitter Boundary Layer Flow */}
              <path
                d="M 15 208 C 40 208, 70 196, 120 186 C 170 176, 205 160, 240 145"
                strokeWidth="1.8"
                className="animate-aero-dash"
              />

              {/* Streamline 3: Windshield, Halo, & Roofline Flow curling into Swan-Neck Rear Wing */}
              <path
                d="M 15 152 C 80 152, 160 130, 220 110 C 270 94, 320 96, 370 108 C 420 120, 465 96, 505 86 C 530 80, 555 82, 585 84"
                strokeWidth="2.6"
                className="animate-aero-dash-fast"
              />

              {/* Streamline 4: Upper Freestream Wind-Tunnel Boundary Skim */}
              <path
                d="M 15 110 C 120 110, 210 82, 280 74 C 350 66, 440 76, 495 86 C 525 92, 555 88, 585 90"
                strokeWidth="2.8"
                className="animate-aero-dash"
              />
            </g>
          )}

          {/* Mode 02: [ 02 DOWNFORCE ] - Downforce Load Vectors in Cyan #00E5FF */}
          {activeMode === "downforce" && (
            <g className="animate-in fade-in duration-200">
              {/* Front Axle Downforce Vector */}
              <line
                x1="130"
                y1="130"
                x2="130"
                y2="190"
                stroke="#00E5FF"
                strokeWidth="2.5"
                markerEnd="url(#cyanArrow)"
              />
              <rect x="94" y="110" width="72" height="17" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="1" />
              <text x="130" y="122" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ↓ 340 KG (38%)
              </text>

              {/* Center of Pressure Marker */}
              <line
                x1="285"
                y1="65"
                x2="285"
                y2="108"
                stroke="#D2FF00"
                strokeWidth="2"
                markerEnd="url(#limeArrow)"
              />
              <rect x="252" y="45" width="66" height="17" rx="3" fill="#0B0F17" stroke="#D2FF00" strokeWidth="1" />
              <text x="285" y="57" fill="#D2FF00" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ⌖ COP: 41.5%
              </text>

              {/* Rear Wing & Diffuser Combined Downforce Vector */}
              <line
                x1="535"
                y1="25"
                x2="535"
                y2="72"
                stroke="#00E5FF"
                strokeWidth="3"
                markerEnd="url(#cyanArrow)"
              />
              <rect x="498" y="5" width="74" height="17" rx="3" fill="#0B0F17" stroke="#00E5FF" strokeWidth="1" />
              <text x="535" y="17" fill="#00E5FF" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                ↓ 520 KG (62%)
              </text>
            </g>
          )}

          {/* Mode 03: [ 03 TORSION FEA ] - FEA Stress-Distribution Gradient in Amber #FFB800 */}
          {activeMode === "torsion" && (
            <g className="animate-in fade-in duration-200">
              {/* Central Monocoque Torsion FEA Node */}
              <circle cx="280" cy="150" r="16" fill="none" stroke="#FFB800" strokeWidth="1.8" strokeDasharray="3 3" />
              <circle cx="280" cy="150" r="5" fill="#FFB800" className="animate-ping" />
              <circle cx="280" cy="150" r="4" fill="#FFB800" />
              <rect x="180" y="170" width="200" height="18" rx="3" fill="#0B0F17" stroke="#FFB800" strokeWidth="1" />
              <text x="280" y="182" fill="#FFB800" fontSize="8" fontWeight="bold" textAnchor="middle">
                TORSIONAL RIGIDITY: 42,000 NM/DEG
              </text>

              {/* Front Bulkhead FEA Shear Vector */}
              <line x1="140" y1="170" x2="115" y2="145" stroke="#FFB800" strokeWidth="2.2" />
              <text x="110" y="135" fill="#FFB800" fontSize="7" fontWeight="bold">
                FRONT BULKHEAD: 45 kN·m/deg
              </text>

              {/* Rear Cradle FEA Shear Vector */}
              <line x1="440" y1="165" x2="465" y2="140" stroke="#FFB800" strokeWidth="2.2" />
              <text x="460" y="135" fill="#FFB800" fontSize="7" fontWeight="bold">
                REAR CRADLE: 38 kN·m/deg
              </text>
            </g>
          )}

          {/* Probing Interactive Hotspots */}
          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("splitter")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="50" cy="216" r="4" fill="#D2FF00" className="animate-pulse" />
            <circle cx="50" cy="216" r="8" fill="none" stroke="#D2FF00" strokeWidth="1" opacity="0.6" />
          </g>

          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("halo")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="255" cy="120" r="4" fill="#00E5FF" className="animate-pulse" />
            <circle cx="255" cy="120" r="8" fill="none" stroke="#00E5FF" strokeWidth="1" opacity="0.6" />
          </g>

          <g
            className="cursor-pointer"
            onMouseEnter={() => setHoveredHotspot("wing")}
            onMouseLeave={() => setHoveredHotspot(null)}
          >
            <circle cx="540" cy="80" r="4" fill="#FFB800" className="animate-pulse" />
            <circle cx="540" cy="80" r="8" fill="none" stroke="#FFB800" strokeWidth="1" opacity="0.6" />
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
