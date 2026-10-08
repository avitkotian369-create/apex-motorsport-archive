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
    <section className="relative w-full overflow-hidden bg-cad-grid">
      {/* 1. Full-Bleed CAD Blueprint & Chassis Backdrop (Wireframe, Station Lines & Coordinate Crosshairs) */}
      <HeroCadBackdrop />

      {/* 2. Dynamic Wind-Tunnel Streamline Flow (Laminar Horizontal Vector Streams) */}
      <WindTunnelStream />

      {/* 3. Refined Architectural Overhead Studio Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle 800px at 50% -10%, rgba(210,255,0,0.07) 0%, rgba(13,18,29,0.3) 60%, transparent 100%)"
        }}
      />

      {/* 4. Background Monospace Watermark */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-black text-7xl sm:text-9xl text-white opacity-[0.025] select-none pointer-events-none tracking-tighter leading-none text-right z-0">
        <div>{"// SKUNKWORKS"}</div>
        <div>{"CAD TERMINAL"}</div>
      </div>

      {/* 5. CAD Studio Corner Telemetry Reticles */}
      {/* Top-Left Telemetry Bracket */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-8 z-10 font-mono text-[10px] sm:text-xs text-[#78859B]/70 tracking-widest uppercase flex items-center gap-2 select-none pointer-events-none">
        <span className="text-[#D2FF00]/60">┌</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] animate-pulse" />
        <span>[ SYS_CAD // CALIBRATION ACTIVE ]</span>
      </div>

      {/* Top-Right Telemetry Bracket */}
      <div className="absolute top-4 sm:top-6 right-4 sm:right-8 z-10 font-mono text-[10px] sm:text-xs text-[#78859B]/70 tracking-widest uppercase flex items-center gap-2 select-none pointer-events-none">
        <span>⌖ LAT: 48.8584 // VELOCITY: 285 KM/H</span>
        <span className="text-[#D2FF00]/60">┐</span>
      </div>

      {/* Bottom-Right Telemetry Grid Coordinates */}
      <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-8 z-10 font-mono text-[10px] sm:text-xs text-[#78859B]/60 tracking-widest uppercase flex items-center gap-2 select-none pointer-events-none">
        <span>GRID: ISO-7200 CLASS-A</span>
        <span className="text-[#D2FF00]/60">┘</span>
      </div>

      {/* 6. Clean High-Impact Editorial Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 pt-24 pb-20 flex flex-col items-start justify-center min-h-[70vh]">
        {/* Sleek Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-[#D2FF00]/20 bg-[#D2FF00]/10 text-[#D2FF00] font-mono text-xs tracking-wider uppercase mb-6 shadow-[0_0_12px_rgba(210,255,0,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
          <span className="font-bold">APEX ARCHIVE — THE MOTORSPORT & AUTOMOTIVE ANATOMY TERMINAL</span>
        </div>

        {/* Headline with Crisp High-Contrast Drop Shadow */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] text-white leading-[0.92] mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          DECONSTRUCT<br />
          MOTORSPORT<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#D2FF00]">
            ARCHITECTURE.
          </span>
        </h1>

        {/* Description */}
        <p className="max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed mb-8 font-normal">
          A dedicated motorsport engineering terminal built for car enthusiasts, track drivers, and technical builders to explore authentic factory CAD schematics, deep mechanical teardowns, and racing physics with zero marketing clutter.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-3.5 mb-8">
          {/* Primary CTA */}
          <button
            onClick={onExploreClick}
            className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#D2FF00] hover:bg-[#e2ff40] text-black font-black text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-[0_0_25px_rgba(210,255,0,0.35)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>[ EXPLORE VEHICLE DECK → ]</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onDispatchClick || onExploreClick}
            className="px-6 sm:px-8 py-3.5 rounded-xl border border-white/10 hover:border-[#D2FF00]/60 bg-[#0B0E16] hover:bg-[#111722] text-[#C4CDD9] hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-[#D2FF00]" />
            <span>[ 📖 READ TECHNICAL DISPATCH ]</span>
          </button>
        </div>

        {/* Proof Bar */}
        <div className="pt-6 border-t border-[#192234] flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-[#78859B] uppercase tracking-wider w-full">
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
    </section>
  );
}

export default Hero;
