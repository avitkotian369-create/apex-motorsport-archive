"use client";

import React from "react";
import { Settings } from "lucide-react";

interface HeroProps {
  onExploreClick?: () => void;
  onTelemetryClick?: () => void;
}

export function Hero({ onExploreClick, onTelemetryClick }: HeroProps) {
  return (
    <section className="relative pt-16 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Pure, Dark Obsidian CAD Floor (#06080E) with Subtle Millimeter Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Smooth Darkroom Ambient Radial Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_25%_25%,rgba(210,255,0,0.045)_0%,transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,rgba(6,8,14,0.95)_20%,transparent_100%)]" />

      {/* Ultra-Clean, Minimal, Left-Aligned Editorial Typography Stage */}
      <div className="relative z-10 max-w-3xl space-y-8">
        {/* Active Terminal Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D2FF00]/30 bg-[#D2FF00]/5 text-[#D2FF00] font-mono text-xs tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
          <span className="font-bold">● ARCHIVE TERMINAL // V4.5 ACTIVE</span>
        </div>

        {/* Left-Aligned Bold Tracked Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.93] uppercase select-none">
          DECONSTRUCT <br />
          MOTORSPORT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#D2FF00] drop-shadow-[0_0_25px_rgba(210,255,0,0.2)]">
            ARCHITECTURE.
          </span>
        </h1>

        {/* Concise, Elegant Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-[#94A3B8] leading-relaxed font-normal max-w-2xl">
          Every carbon fiber weave, dry-sump passage, and titanium upright — unfolded into an authentic exploded knolling teardown terminal.
        </p>

        {/* Clean Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          {/* Primary CTA */}
          <button
            onClick={onExploreClick}
            className="px-6 sm:px-7 py-3.5 rounded-xl bg-[#D2FF00] hover:bg-[#e2ff40] text-black font-black text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-[0_0_25px_rgba(210,255,0,0.35)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>[ ⤹ EXPLORE VEHICLE DECK → ]</span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onTelemetryClick || onExploreClick}
            className="px-6 sm:px-7 py-3.5 rounded-xl border border-[#222E42] hover:border-[#D2FF00]/60 bg-[#0B0E16] hover:bg-[#111722] text-[#C4CDD9] hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Settings className="w-4 h-4 text-[#D2FF00]" />
            <span>[ ⚙️ LIVE TELEMETRY MATRIX ]</span>
          </button>
        </div>

        {/* Minimalist Footer Proof Line */}
        <div className="pt-8 border-t border-[#192234] flex flex-wrap items-center gap-4 text-xs font-mono text-[#78859B] uppercase tracking-wider">
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
