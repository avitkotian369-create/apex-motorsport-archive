"use client";

import React, { useState } from "react";
import { BookOpen, Crosshair, Cpu, Wind, ShieldCheck, Activity } from "lucide-react";
import { WindTunnelStream } from "./wind-tunnel-stream";

interface HeroProps {
  onExploreClick?: () => void;
  onTelemetryClick?: () => void;
  onDispatchClick?: () => void;
}

export function Hero({ onExploreClick, onDispatchClick }: HeroProps) {
  const [activeVector, setActiveVector] = useState<"downforce" | "torsion" | "load">("downforce");

  return (
    <section className="relative pt-20 pb-16 px-6 sm:px-12 flex items-center justify-between gap-8 max-w-7xl mx-auto overflow-hidden bg-cad-grid">
      {/* Aerodynamic Wind Tunnel Particle Stream Canvas flowing across stage */}
      <WindTunnelStream />

      {/* Volumetric Darkroom Overhead Spotlight with Electric Lime Falloff */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(210,255,0,0.06)_0%,rgba(255,255,255,0.02)_40%,transparent_80%)] rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Large Technical Monospace Watermark Typography in Background Right Quadrant (3% opacity) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 font-mono font-black text-7xl sm:text-9xl text-white/[0.03] select-none pointer-events-none tracking-tighter leading-none text-right z-0">
        <div>{"// CHASSIS SPEC 01"}</div>
        <div>{"MONOCOQUE ARCHIVE"}</div>
      </div>

      {/* Main Split Grid (Left: Editorial Typography / Right: Interactive CAD Monocoque Schematics Display) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
        {/* LEFT COLUMN (Cols 1-6): Clean Editorial Typography & CTAs */}
        <div className="lg:col-span-6 space-y-6 max-w-2xl">
          {/* Top Pill Badge: APEX ARCHIVE — THE MOTORSPORT & AUTOMOTIVE ANATOMY TERMINAL */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D2FF00]/40 bg-[#D2FF00]/10 text-[#D2FF00] font-mono text-xs tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
            <span className="font-bold">APEX ARCHIVE — THE MOTORSPORT & AUTOMOTIVE ANATOMY TERMINAL</span>
          </div>

          {/* Left-Aligned Bold Tracked Headline with Electric Lime #D2FF00 Accent */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] text-white leading-[0.95] uppercase select-none">
            DECONSTRUCT <br />
            MOTORSPORT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#D2FF00] drop-shadow-[0_0_25px_rgba(210,255,0,0.25)]">
              ARCHITECTURE.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-normal max-w-xl">
            A dedicated motorsport engineering terminal built for car enthusiasts, track drivers, and technical builders to explore authentic factory CAD schematics, deep mechanical teardowns, and racing physics with zero marketing clutter.
          </p>

          {/* Action Buttons: [ EXPLORE VEHICLE DECK → ] (lime fill) and [ 📖 READ TECHNICAL DISPATCH ] (outline) */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {/* Primary CTA */}
            <button
              onClick={onExploreClick}
              className="px-6 sm:px-7 py-3 rounded-xl bg-[#D2FF00] hover:bg-[#e2ff40] text-black font-black text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-[0_0_25px_rgba(210,255,0,0.35)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>[ EXPLORE VEHICLE DECK → ]</span>
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onDispatchClick || onExploreClick}
              className="px-6 sm:px-7 py-3 rounded-xl border border-white/10 hover:border-[#D2FF00]/60 bg-[#0B0E16] hover:bg-[#111722] text-[#C4CDD9] hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-[#D2FF00]" />
              <span>[ 📖 READ TECHNICAL DISPATCH ]</span>
            </button>
          </div>

          {/* Proof Bar */}
          <div className="pt-5 border-t border-[#192234] flex flex-wrap items-center gap-4 text-xs font-mono text-[#78859B] uppercase tracking-wider">
            <span className="text-white font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
              6 HOMOLOGATED CHASSIS
            </span>
            <span className="text-[#323D52]">•</span>
            <span className="text-slate-300 font-semibold">100+ OEM COMPONENTS</span>
            <span className="text-[#323D52]">•</span>
            <span className="text-cyan-400 font-semibold">ISO 7200 STANDARDS</span>
          </div>
        </div>

        {/* RIGHT COLUMN (Cols 7-12): High-Impact Interactive CAD Telemetry & Monocoque Schematics Display */}
        <div className="lg:col-span-6 relative w-full">
          {/* Main CAD Skunkworks Terminal Container */}
          <div className="relative border border-white/10 bg-[#07090E]/80 rounded-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.85)] hover:border-white/20 transition-all select-none font-mono">
            {/* Technical Registration Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-pulse" />
                <span className="text-xs font-bold text-white tracking-wider">
                  CHASSIS MATRIX // MONOCOQUE SAFETY CELL
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#8C98AC]">
                <span className="text-[#D2FF00] font-bold">● ACTIVE TELEMETRY</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-400">ISO 7200</span>
              </div>
            </div>

            {/* Coordinate Crosshairs Bar */}
            <div className="flex items-center justify-between py-2 text-[10px] text-slate-400 border-b border-white/5 bg-[#090D15]/60 px-3 rounded-lg my-3">
              <div className="flex items-center gap-1.5">
                <Crosshair className="w-3 h-3 text-[#D2FF00]" />
                <span className="text-white font-bold">DATUM:</span>
                <span>⌖ X: 1420.5 &nbsp;Y: 884.0 &nbsp;Z: 285.0</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-[#8C98AC]">
                <Activity className="w-3 h-3 text-cyan-400" />
                <span>SAMPLING: 1,000 HZ</span>
              </div>
            </div>

            {/* Center Visual: SVG Vector Isometric Wireframe & Technical Blueprint Grid */}
            <div className="relative w-full aspect-[16/10] sm:h-64 rounded-xl bg-gradient-to-b from-[#05070B] via-[#080B12] to-[#040609] border border-white/10 p-2 overflow-hidden flex items-center justify-center">
              {/* Internal Fine CAD Drafting Grid */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(210, 255, 0, 0.2) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(210, 255, 0, 0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: "24px 24px"
                }}
              />

              {/* Vector Isometric Chassis Schematics Graphic */}
              <svg
                viewBox="0 0 600 360"
                className="w-full h-full relative z-10 text-white"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Ground Reference Plane / Grid Projection */}
                <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
                  <line x1="50" y1="280" x2="550" y2="280" />
                  <line x1="100" y1="310" x2="500" y2="310" />
                  <line x1="150" y1="330" x2="450" y2="330" />
                  <line x1="120" y1="260" x2="200" y2="340" />
                  <line x1="480" y1="260" x2="400" y2="340" />
                  <line x1="300" y1="240" x2="300" y2="340" strokeDasharray="3 3" stroke="#D2FF00" opacity="0.3" />
                </g>

                {/* Monocoque Safety Tub (Isometric Silhouette Lines) */}
                <g stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
                  {/* Cockpit Canopy Arc */}
                  <path d="M 220 180 Q 300 110 380 180" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.8" />
                  {/* Driver Halo / Survival Cell Ring */}
                  <ellipse cx="300" cy="180" rx="90" ry="35" stroke="#D2FF00" strokeWidth="1.5" strokeDasharray="4 2" />
                  {/* Lower Tub Sills */}
                  <path d="M 160 220 L 220 220 L 380 220 L 440 220" stroke="white" strokeWidth="2" />
                  {/* Front Bulkhead & Crush Structure */}
                  <polygon points="120,230 160,200 160,240 120,245" stroke="rgba(255,128,0,0.8)" strokeWidth="1.5" fill="rgba(255,128,0,0.05)" />
                  {/* Rear Engine Subframe Truss (Twin Triangle) */}
                  <polygon points="440,200 480,230 440,240" stroke="rgba(56,189,248,0.8)" strokeWidth="1.5" fill="rgba(56,189,248,0.05)" />
                  {/* Integrated Swan-Neck Rear Wing Profile */}
                  <path d="M 460 170 Q 480 140 500 140" stroke="#D2FF00" strokeWidth="2" />
                  <line x1="470" y1="138" x2="520" y2="138" stroke="#D2FF00" strokeWidth="3" />
                </g>

                {/* Aerodynamic Flow Streamlines (Interactive / Dynamic) */}
                <g>
                  {/* Flow vector 1 over front splitter */}
                  <path d="M 60 240 Q 140 220 220 190 T 380 180 T 520 140" stroke="url(#aeroGrad)" strokeWidth="2" strokeDasharray="6 4" />
                  {/* Flow vector 2 underbody ground venturi */}
                  <path d="M 80 270 Q 200 260 300 260 T 480 240" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                  {/* Downforce arrows on rear wing */}
                  <path d="M 495 110 L 495 132 M 490 125 L 495 132 L 500 125" stroke="#D2FF00" strokeWidth="2" />
                  <path d="M 515 110 L 515 132 M 510 125 L 515 132 L 520 125" stroke="#D2FF00" strokeWidth="2" />
                  <text x="475" y="100" fill="#D2FF00" fontSize="10" fontFamily="monospace" fontWeight="bold">860 KG DRS</text>
                </g>

                {/* Front Downforce Arrow */}
                <g>
                  <path d="M 130 180 L 130 205 M 126 198 L 130 205 L 134 198" stroke="#FF8000" strokeWidth="1.5" />
                  <text x="100" y="172" fill="#FF8000" fontSize="9" fontFamily="monospace">FRONT DOWNFORCE</text>
                </g>

                {/* Center CG / Torsional Rigidity Vector */}
                <g>
                  <circle cx="300" cy="220" r="14" stroke="#D2FF00" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="300" cy="220" r="4" fill="#D2FF00" />
                  <text x="270" y="248" fill="white" fontSize="9" fontFamily="monospace">CENTER OF GRAVITY</text>
                </g>

                {/* Vector Mode Selector Tabs embedded inside display */}
                <defs>
                  <linearGradient id="aeroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#D2FF00" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Mode Toggle Pills (Top Right inside display) */}
              <div className="absolute top-2 right-2 flex items-center gap-1 z-20">
                <button
                  onClick={() => setActiveVector("downforce")}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-colors cursor-pointer ${
                    activeVector === "downforce"
                      ? "bg-[#D2FF00] text-black"
                      : "bg-[#0B0F17]/90 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  AERO DRS
                </button>
                <button
                  onClick={() => setActiveVector("torsion")}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-colors cursor-pointer ${
                    activeVector === "torsion"
                      ? "bg-[#D2FF00] text-black"
                      : "bg-[#0B0F17]/90 text-slate-400 hover:text-white border border-white/10"
                  }`}
                >
                  TORSION
                </button>
              </div>

              {/* Technical Watermark Tag in Corner */}
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-500 z-20">
                <span>SIMULATION: CFD COMPRESSIBLE FLOW (MACH 0.28)</span>
              </div>
            </div>

            {/* Bottom Data Row: 3 Micro-Metric Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/10 mt-3 text-xs">
              {/* Badge 1 */}
              <div className="p-2.5 rounded-xl bg-[#090D16] border border-white/10 flex flex-col justify-between">
                <div className="text-[9px] text-slate-400 uppercase font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>TORSIONAL RIGIDITY</span>
                </div>
                <div className="text-white font-black text-xs sm:text-sm mt-1">42,000 Nm/deg</div>
              </div>

              {/* Badge 2 */}
              <div className="p-2.5 rounded-xl bg-[#090D16] border border-white/10 flex flex-col justify-between">
                <div className="text-[9px] text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Wind className="w-3 h-3 text-[#D2FF00]" />
                  <span>DRS DOWNFORCE</span>
                </div>
                <div className="text-[#D2FF00] font-black text-xs sm:text-sm mt-1">860 kg @ 285 km/h</div>
              </div>

              {/* Badge 3 */}
              <div className="p-2.5 rounded-xl bg-[#090D16] border border-white/10 flex flex-col justify-between">
                <div className="text-[9px] text-slate-400 uppercase font-bold flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>DRY WEIGHT</span>
                </div>
                <div className="text-cyan-400 font-black text-xs sm:text-sm mt-1">1,138 kg CARBON-TUB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
