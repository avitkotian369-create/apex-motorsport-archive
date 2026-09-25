"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { WindTunnelStream } from "./wind-tunnel-stream";
import { AeroChassisHud } from "./aero-chassis-hud";

interface HeroProps {
  onExploreClick?: () => void;
  onTelemetryClick?: () => void;
  onDispatchClick?: () => void;
}

export function Hero({ onExploreClick, onDispatchClick }: HeroProps) {
  return (
    <section className="relative min-h-[82vh] pt-24 sm:pt-28 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center overflow-hidden bg-cad-grid">
      {/* Aerodynamic Wind Tunnel Particle Stream Canvas flowing across stage */}
      <WindTunnelStream />

      {/* Volumetric Darkroom Overhead Spotlight with Electric Lime Falloff */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(210,255,0,0.04)_0%,transparent_70%)] rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      {/* Large Technical Monospace Watermark Typography in Background */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 font-mono font-black text-7xl sm:text-9xl text-white/[0.02] select-none pointer-events-none tracking-tighter leading-none text-right z-0">
        <div>{"// APEX SPEC"}</div>
        <div>{"MONOCOQUE ARCHIVE"}</div>
      </div>

      {/* 2-Column Responsive Grid: Left Editorial + Right CAD Chassis HUD */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headline, Subtext, CTAs, Proof Bar */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Sleek Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-[#D2FF00]/20 bg-[#D2FF00]/10 text-[#D2FF00] font-mono text-xs tracking-wider uppercase mb-6 shadow-[0_0_12px_rgba(210,255,0,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
            <span className="font-bold">APEX ARCHIVE — THE MOTORSPORT & AUTOMOTIVE ANATOMY TERMINAL</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] text-white leading-[0.94] mb-6 uppercase select-none">
            DECONSTRUCT<br />
            MOTORSPORT<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#D2FF00] drop-shadow-[0_0_30px_rgba(210,255,0,0.25)]">
              ARCHITECTURE.
            </span>
          </h1>

          {/* Subtext */}
          <p className="max-w-xl text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 font-normal">
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

        {/* Right Column: Interactive Aerodynamic Streamline & CAD Chassis HUD */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <AeroChassisHud />
        </div>
      </div>
    </section>
  );
}

export default Hero;
