"use client";

import React from "react";
import Image from "next/image";
import { Settings } from "lucide-react";
import { WindTunnelStream } from "./wind-tunnel-stream";

interface HeroProps {
  onExploreClick?: () => void;
  onTelemetryClick?: () => void;
}

export function Hero({ onExploreClick, onTelemetryClick }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] pt-28 pb-12 px-6 sm:px-12 flex items-center justify-between gap-8 max-w-7xl mx-auto overflow-hidden">
      {/* Aerodynamic Wind Tunnel Particle Stream Canvas flowing across hood & wing */}
      <WindTunnelStream />

      {/* Volumetric Darkroom Lighting & Ambient Vignette */}
      <div className="absolute -top-32 left-1/3 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#FF8000]/10 via-[#D2FF00]/8 to-cyan-500/8 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      {/* Main Split Grid (50% Left Editorial Typography / 50% Right Seamless Shadow Machine) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* LEFT COLUMN (Cols 1-6): Clean Editorial Typography & CTAs */}
        <div className="lg:col-span-6 space-y-6 max-w-2xl">
          {/* Active Terminal Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D2FF00]/30 bg-[#D2FF00]/5 text-[#D2FF00] font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
            <span className="font-bold">● ARCHIVE TERMINAL // V4.5 ACTIVE</span>
          </div>

          {/* Left-Aligned Bold Tracked Headline (Never crops on 1080p/laptop viewports) */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] uppercase select-none">
            DECONSTRUCT <br />
            MOTORSPORT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#D2FF00] drop-shadow-[0_0_25px_rgba(210,255,0,0.25)]">
              ARCHITECTURE.
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-normal max-w-xl">
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

          {/* Proof Bar */}
          <div className="pt-6 border-t border-[#192234] flex flex-wrap items-center gap-4 text-xs font-mono text-[#78859B] uppercase tracking-wider">
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

        {/* RIGHT COLUMN (Cols 7-12): Seamless Shadow Machine Silhouette (NO HARD FRAMES) */}
        <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] flex items-center justify-center select-none pointer-events-none">
          {/* Subtle Ground Horizon Light Bar */}
          <div className="absolute bottom-10 left-1/4 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#D2FF00]/25 to-transparent" />

          {/* Soft Asphalt Floor Reflection & Grounding Glow */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-[#D2FF00]/12 rounded-full blur-2xl" />

          {/* Atmospheric Radial Light Behind Vehicle Silhouette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(210,255,0,0.06)_0%,transparent_65%)]" />

          {/* Seamless Silhouette Image Container with Circular / Elliptical Alpha Feathering */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              maskImage: "radial-gradient(ellipse 85% 75% at 55% 50%, black 45%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 55% 50%, black 45%, transparent 100%)"
            }}
          >
            <Image
              src="/assets/porsche-gt3rs-hero.jpg"
              alt="Porsche 911 GT3 RS Weissach Aerodynamic Chassis Silhouette"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain object-center scale-105 brightness-95 contrast-125 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* Technical Registration Datums (Micro CAD Crosshair Markers) */}
          {/* Datum 1: Active Swan-Neck Rear Wing */}
          <div className="absolute top-[22%] right-[12%] flex items-center gap-1.5 font-mono text-[9px] text-slate-400 bg-[#070A10]/95 px-2 py-0.5 rounded border border-white/10 shadow-lg">
            <span className="text-[#D2FF00] font-bold">⌖</span>
            <span>AERO_DATUM: X:1420.0 Y:884.5</span>
          </div>

          {/* Datum 2: Carbon Monocoque Core Hub */}
          <div className="absolute bottom-[24%] right-[42%] flex items-center gap-1.5 font-mono text-[9px] text-slate-400 bg-[#070A10]/95 px-2 py-0.5 rounded border border-white/10 shadow-lg">
            <span className="text-cyan-400 font-bold">⌖</span>
            <span>HUB_AXLE: Z:285.0 MM</span>
          </div>

          {/* Datum 3: Front Splitter Stagnation Point */}
          <div className="absolute bottom-[32%] left-[8%] flex items-center gap-1.5 font-mono text-[9px] text-slate-400 bg-[#070A10]/95 px-2 py-0.5 rounded border border-white/10 shadow-lg">
            <span className="text-[#FF8000] font-bold">⌖</span>
            <span>STAGNATION: P_MAX 101.3 kPa</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
