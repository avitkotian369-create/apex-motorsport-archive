"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { WindTunnelStream } from "./wind-tunnel-stream";
import { HeroCadBackdrop } from "./hero-cad-backdrop";

interface HeroProps {
  onExploreClick?: () => void;
  onTelemetryClick?: () => void;
  onDispatchClick?: () => void;
}

export function Hero({ onExploreClick, onDispatchClick }: HeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#06080E]">
      {/* Layer 0: Overhead Stage Light (Ambient Radial Spotlight) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -15%, rgba(210,255,0,0.09) 0%, rgba(10,14,23,0.6) 50%, transparent 100%)"
        }}
      />

      {/* Layer 1: Technical Coordinate Grid (Crisp 48px grid with crosshairs at 64px intervals) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="engGrid48" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
            <pattern id="crosshairGrid64" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 32 28 L 32 36 M 28 32 L 36 32" fill="none" stroke="#D2FF00" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#engGrid48)" />
          <rect width="100%" height="100%" fill="url(#crosshairGrid64)" />
        </svg>
      </div>

      {/* Layer 2: Ghosted CAD Chassis Cutaway (Orthographic Blueprint Wireframe) */}
      <HeroCadBackdrop />

      {/* Layer 3: Animated Wind-Tunnel Streamlines (4 Flowing Bézier Vectors) */}
      <WindTunnelStream />

      {/* Corner Telemetry Stamps */}
      {/* Top-Left Stamp */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-10 font-mono text-[10px] sm:text-xs text-[#78859B]/70 tracking-widest uppercase flex items-center gap-2 select-none pointer-events-none">
        <span className="text-[#D2FF00]/60">┌</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] animate-pulse" />
        <span>[ SYS_CAD // CALIBRATION ACTIVE ]</span>
      </div>

      {/* Top-Right Stamp */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-10 font-mono text-[10px] sm:text-xs text-[#78859B]/70 tracking-widest uppercase flex items-center gap-2 select-none pointer-events-none">
        <span>⌖ LAT: 48.8584 // VELOCITY: 285 KM/H // ISO-7200</span>
        <span className="text-[#D2FF00]/60">┐</span>
      </div>

      {/* Editorial Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 pt-24 pb-20 flex flex-col items-start justify-center min-h-[70vh]">
        {/* Top Badge: Modernized aerospace pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#D2FF00]/10 border border-[#D2FF00]/25 text-[#D2FF00] font-mono text-[11px] tracking-wider uppercase mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(210,255,0,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-pulse" />
          <span>APEX ARCHIVE — AUTOMOTIVE ANATOMY & CAD TERMINAL</span>
        </div>

        {/* Headline: Staggered typography with clean contrast and depth */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white leading-[0.92] mb-6">
          DECONSTRUCT<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
            MOTORSPORT
          </span><br />
          <span className="text-[#D2FF00] drop-shadow-[0_0_35px_rgba(210,255,0,0.35)]">
            ARCHITECTURE.
          </span>
        </h1>

        {/* Description Copy: Clean, razor-sharp engineering manifesto text */}
        <p className="max-w-2xl text-slate-300/80 text-base sm:text-lg leading-relaxed font-sans font-normal mb-10">
          A dedicated motorsport engineering terminal engineered for track drivers, technical builders, and chassis purists to explore factory CAD schematics, mechanical teardowns, and aerodynamic physics with zero marketing clutter.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {/* Primary CTA */}
          <button
            onClick={onExploreClick}
            className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#D2FF00] hover:bg-[#e2ff40] text-black font-black text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-[0_0_30px_rgba(210,255,0,0.4)] hover:shadow-[0_0_40px_rgba(210,255,0,0.6)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>[ EXPLORE VEHICLE DECK → ]</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onDispatchClick || onExploreClick}
            className="px-6 sm:px-8 py-3.5 rounded-xl border border-white/10 hover:border-[#D2FF00]/40 bg-[#0B0E16] hover:bg-[#111722] text-[#C4CDD9] hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(210,255,0,0.15)]"
          >
            <BookOpen className="w-4 h-4 text-[#D2FF00]" />
            <span>[ 📖 READ TECHNICAL DISPATCH ]</span>
          </button>
        </div>

        {/* Proof Bar */}
        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 text-xs font-mono text-slate-400 w-full">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
            <span>6 HOMOLOGATED CHASSIS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>100+ FACTORY CAD COMPONENTS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span>ISO 7200 CLASS-A SPEC</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
