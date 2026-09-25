"use client";

import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { WindTunnelStream } from "./wind-tunnel-stream";

interface HeroProps {
  onExploreClick?: () => void;
  onTelemetryClick?: () => void;
}

export function Hero({ onExploreClick, onTelemetryClick }: HeroProps) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates around center (-1 to 1)
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseOffset({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-speed-lines">
      {/* Aerodynamic Wind Tunnel Particle Stream Canvas */}
      <WindTunnelStream />

      {/* Kinetic Ambient Radial Glow in McLaren Papaya & High-Voltage Lime */}
      <div className="absolute -top-32 left-1/3 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#FF8000]/12 via-[#D2FF00]/10 to-cyan-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      {/* Ambient Grid Floor Reflection */}
      <div className="absolute bottom-0 right-0 w-[55%] h-44 bg-gradient-to-t from-[#D2FF00]/5 via-transparent to-transparent pointer-events-none blur-xl" />

      {/* Split Hero Layout: Left Typography (52%) & Right Floating Zero-G Artifacts (48%) */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-4">
        {/* LEFT COLUMN: Clean Editorial Typography & CTAs (Intact, Zero Clutter) */}
        <div className="w-full lg:w-[52%] space-y-7">
          {/* Active Terminal Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D2FF00]/40 bg-[#D2FF00]/10 text-[#D2FF00] font-mono text-xs tracking-widest uppercase shadow-[0_0_15px_rgba(210,255,0,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
            <span className="font-bold">● ARCHIVE TERMINAL // V4.5 ACTIVE</span>
          </div>

          {/* High-Impact Tracked Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95] uppercase select-none">
            DECONSTRUCT <br />
            MOTORSPORT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#D2FF00] drop-shadow-[0_0_30px_rgba(210,255,0,0.25)]">
              ARCHITECTURE.
            </span>
          </h1>

          {/* Subtitle with Clear Breathing Room */}
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-normal max-w-xl">
            Every carbon fiber weave, dry-sump passage, and titanium upright — unfolded into an authentic exploded knolling teardown terminal.
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {/* Primary CTA */}
            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-xl bg-[#D2FF00] hover:bg-[#e2ff40] text-black font-black text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-[0_0_30px_rgba(210,255,0,0.4)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>[ ⤹ EXPLORE VEHICLE DECK → ]</span>
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onTelemetryClick || onExploreClick}
              className="px-6 py-3.5 rounded-xl border border-[#263145] hover:border-[#D2FF00]/60 bg-[#0D111A]/90 hover:bg-[#121824] text-[#C4CDD9] hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Settings className="w-4 h-4 text-[#D2FF00]" />
              <span>[ ⚙️ LIVE TELEMETRY MATRIX ]</span>
            </button>
          </div>

          {/* Quick-Read Proof Bar */}
          <div className="pt-5 border-t border-[#1F2738]/80 flex flex-wrap items-center gap-3.5 text-xs font-mono text-[#7E8B9F] uppercase tracking-wider">
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

        {/* RIGHT COLUMN: ZERO-GRAVITY DECONSTRUCTED MECHANICAL ARTIFACTS */}
        <div className="w-full lg:w-[48%] relative h-[360px] sm:h-[440px] flex items-center justify-center select-none pointer-events-none">
          {/* Subtle Ground Horizon Light Bar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#D2FF00]/30 to-transparent" />

          {/* ARTIFACT 1: CARBON-CERAMIC BRAKE ROTOR & MONOBLOC CALIPER (Midground, Crisp Focus) */}
          <div
            className="absolute z-20 transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${mouseOffset.x * 22}px, ${mouseOffset.y * 18}px, 0px) rotate(${mouseOffset.x * 6}deg)`
            }}
          >
            <div className="relative group">
              {/* Rotor SVG Illustration */}
              <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] filter">
                {/* Outer Cross-Drilled Carbon-Ceramic Disc */}
                <circle cx="110" cy="110" r="95" fill="#141821" stroke="#2D3748" strokeWidth="6" />
                <circle cx="110" cy="110" r="92" fill="none" stroke="#3E4A5E" strokeWidth="1" strokeDasharray="3 4" />
                
                {/* Cooling Vanes / Spiral Slots */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <line
                    key={i}
                    x1="110"
                    y1="35"
                    x2="110"
                    y2="60"
                    stroke="#D2FF00"
                    strokeWidth="1.2"
                    strokeOpacity="0.4"
                    transform={`rotate(${i * 22.5} 110 110)`}
                  />
                ))}

                {/* Central Floating Bell (Billet Aluminum Hat) */}
                <circle cx="110" cy="110" r="48" fill="#0C0F17" stroke="#4A5568" strokeWidth="3" />
                <circle cx="110" cy="110" r="28" fill="#07090E" stroke="#D2FF00" strokeWidth="1" strokeDasharray="2 3" />

                {/* Drive Pins / Bobbins */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <circle
                    key={i}
                    cx="110"
                    cy="66"
                    r="3.5"
                    fill="#FF8000"
                    stroke="#FFFFFF"
                    strokeWidth="0.8"
                    transform={`rotate(${i * 36} 110 110)`}
                  />
                ))}

                {/* Monobloc 6-Piston Caliper (Clamping Top-Right) */}
                <path
                  d="M 125 18 C 160 20 195 50 202 90 L 180 98 C 174 68 150 44 125 40 Z"
                  fill="#E53E3E"
                  stroke="#FC8181"
                  strokeWidth="1.5"
                />
                <circle cx="150" cy="48" r="7" fill="#2D3748" stroke="#E2E8F0" strokeWidth="1" />
                <circle cx="172" cy="72" r="7" fill="#2D3748" stroke="#E2E8F0" strokeWidth="1" />
              </svg>

              {/* Technical Datum Tag */}
              <div className="absolute -bottom-2 right-4 px-2 py-0.5 rounded bg-[#090D16]/90 border border-[#253248] text-[9px] font-mono text-[#D2FF00] tracking-wider shadow-lg">
                410MM CCM-R // 6-PISTON
              </div>

              {/* Ambient Ground Shadow Reflection */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-44 h-4 bg-[#D2FF00]/10 rounded-full blur-md" />
            </div>
          </div>

          {/* ARTIFACT 2: TITANIUM CONNECTING ROD & PISTON PIN (Upper Left - Slight Depth of Field Blur) */}
          <div
            className="absolute top-4 left-6 z-10 transition-transform duration-300 ease-out filter blur-[0.6px] opacity-85"
            style={{
              transform: `translate3d(${mouseOffset.x * -18}px, ${mouseOffset.y * -14}px, 0px) rotate(${-22 + mouseOffset.y * 8}deg)`
            }}
          >
            <div className="relative">
              <svg width="110" height="170" viewBox="0 0 110 170" className="drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)]">
                {/* Small End / Wrist Pin Bore */}
                <circle cx="55" cy="24" r="16" fill="#0C0E14" stroke="#A0AEC0" strokeWidth="3" />
                <circle cx="55" cy="24" r="9" fill="#05070A" stroke="#38BDF8" strokeWidth="1.2" />

                {/* H-Beam Titanium Shank */}
                <path d="M 47 40 L 45 110 L 65 110 L 63 40 Z" fill="#1A202C" stroke="#718096" strokeWidth="1.5" />
                <line x1="55" y1="44" x2="55" y2="106" stroke="#D2FF00" strokeWidth="1.5" strokeDasharray="3 3" />

                {/* Big End Journal & Billet Rod Cap with ARP Bolts */}
                <circle cx="55" cy="135" r="25" fill="#0C0E14" stroke="#CBD5E0" strokeWidth="3.5" />
                <circle cx="55" cy="135" r="15" fill="#05070A" stroke="#FF8000" strokeWidth="1.5" />
                <circle cx="34" cy="135" r="3" fill="#D2FF00" />
                <circle cx="76" cy="135" r="3" fill="#D2FF00" />
              </svg>

              <div className="absolute top-1 left-0 px-1.5 py-0.5 rounded bg-[#090D16]/80 border border-slate-700 text-[8px] font-mono text-cyan-300">
                TI-6AL-4V H-BEAM
              </div>
            </div>
          </div>

          {/* ARTIFACT 3: BILLET CENTER-LOCK WHEEL NUT & SPLINED HUB (Bottom Left, Crisp Foreground) */}
          <div
            className="absolute bottom-2 left-16 z-30 transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${mouseOffset.x * 32}px, ${mouseOffset.y * 26}px, 0px) rotate(${15 + mouseOffset.x * 12}deg)`
            }}
          >
            <div className="relative">
              <svg width="130" height="130" viewBox="0 0 130 130" className="drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)]">
                {/* Outer Splined Drive Ring */}
                <polygon
                  points="65,10 88,24 105,48 105,82 88,106 65,120 42,106 25,82 25,48 42,24"
                  fill="#111622"
                  stroke="#FF8000"
                  strokeWidth="3"
                />
                {/* Center Anodized Aluminum Lock Nut */}
                <circle cx="65" cy="65" r="36" fill="#1A202C" stroke="#D2FF00" strokeWidth="2.5" />
                <circle cx="65" cy="65" r="20" fill="#07090E" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
                {/* Center-lock directional arrow */}
                <path d="M 52 65 A 13 13 0 0 1 78 65" fill="none" stroke="#D2FF00" strokeWidth="2" markerEnd="url(#arrow)" />
                <text x="65" y="69" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontFamily="monospace" fontWeight="bold">600 NM</text>
              </svg>

              <div className="absolute -bottom-1 left-2 px-2 py-0.5 rounded bg-[#090D16]/90 border border-amber-500/50 text-[8px] font-mono text-amber-400">
                CENTER-LOCK // 600 NM
              </div>
            </div>
          </div>

          {/* ARTIFACT 4: CARBON FIBER AERO ENDPLATE & CANARD (Top Right - Soft Background Blur) */}
          <div
            className="absolute top-2 right-4 z-10 transition-transform duration-300 ease-out filter blur-[1.2px] opacity-70"
            style={{
              transform: `translate3d(${mouseOffset.x * -26}px, ${mouseOffset.y * -20}px, 0px) rotate(${18 - mouseOffset.x * 8}deg)`
            }}
          >
            <div className="relative">
              <svg width="150" height="110" viewBox="0 0 150 110" className="drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                {/* Twill Carbon Weave Surface */}
                <path
                  d="M 15 20 L 130 10 C 145 35 135 85 90 95 L 35 80 Z"
                  fill="#141822"
                  stroke="#38BDF8"
                  strokeWidth="2"
                />
                <line x1="30" y1="30" x2="110" y2="70" stroke="#D2FF00" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.6" />
                {/* Titanium Mounting Bracket Holes */}
                <circle cx="35" cy="40" r="3.5" fill="#E2E8F0" />
                <circle cx="50" cy="55" r="3.5" fill="#E2E8F0" />
              </svg>

              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#090D16]/80 border border-cyan-800 text-[8px] font-mono text-cyan-400">
                DRS WING ENDPLATE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
