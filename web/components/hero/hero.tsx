"use client";

import React from "react";
import { Settings } from "lucide-react";
import { WindTunnelStream } from "./wind-tunnel-stream";

interface HeroProps {
  onExploreClick?: () => void;
  onTelemetryClick?: () => void;
}

export function Hero({ onExploreClick, onTelemetryClick }: HeroProps) {
  return (
    <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-speed-lines">
      {/* Aerodynamic Wind Tunnel Particle Stream Canvas */}
      <WindTunnelStream />

      {/* Kinetic Ambient Radial Glow in McLaren Papaya & High-Voltage Lime */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#FF8000]/15 to-[#D2FF00]/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      {/* Ghosted Motorsport Architectural Blueprint Watermark Behind Hero */}
      <div className="absolute top-12 right-6 select-none pointer-events-none opacity-[0.03] font-mono font-black text-7xl sm:text-9xl tracking-tighter text-white z-0 leading-none">
        ISO 7200 // ARCHIVE
      </div>

      {/* Clean Spacious Editorial Typography & Action CTAs */}
      <div className="relative z-10 max-w-4xl space-y-8">
        {/* Active Terminal Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D2FF00]/40 bg-[#D2FF00]/10 text-[#D2FF00] font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(210,255,0,0.15)]">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
          <span className="font-bold">● ARCHIVE TERMINAL // V4.5 ACTIVE</span>
        </div>

        {/* High-Impact Tracked Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] uppercase select-none">
          DECONSTRUCT <br />
          MOTORSPORT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#D2FF00] drop-shadow-[0_0_30px_rgba(210,255,0,0.25)]">
            ARCHITECTURE.
          </span>
        </h1>

        {/* Subtitle with Clear Breathing Room */}
        <p className="text-base sm:text-xl text-[#94A3B8] leading-relaxed font-normal max-w-2xl">
          Every carbon fiber weave, dry-sump passage, and titanium upright — unfolded into an authentic exploded knolling teardown terminal.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          {/* Primary CTA */}
          <button
            onClick={onExploreClick}
            className="px-7 py-3.5 rounded-xl bg-[#D2FF00] hover:bg-[#e2ff40] text-black font-black text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-[0_0_30px_rgba(210,255,0,0.4)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>[ ⤹ EXPLORE VEHICLE DECK → ]</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onTelemetryClick || onExploreClick}
            className="px-7 py-3.5 rounded-xl border border-[#263145] hover:border-[#D2FF00]/60 bg-[#0D111A]/90 hover:bg-[#121824] text-[#C4CDD9] hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Settings className="w-4 h-4 text-[#D2FF00]" />
            <span>[ ⚙️ LIVE TELEMETRY MATRIX ]</span>
          </button>
        </div>

        {/* Quick-Read Proof Bar */}
        <div className="pt-6 border-t border-[#1F2738]/80 flex flex-wrap items-center gap-4 text-xs font-mono text-[#7E8B9F] uppercase tracking-wider">
          <span className="text-white font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
            6 HOMOLOGATED CHASSIS
          </span>
          <span className="text-[#3A4559]">•</span>
          <span className="text-slate-300 font-semibold">100+ OEM COMPONENTS</span>
          <span className="text-[#3A4559]">•</span>
          <span className="text-cyan-400 font-semibold">ISO 7200 CAD STANDARDS</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
