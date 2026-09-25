"use client";

import React, { useState, useRef } from "react";
import { Settings } from "lucide-react";
import { WindTunnelStream } from "./wind-tunnel-stream";

interface HeroProps {
  onExploreClick?: () => void;
  onTelemetryClick?: () => void;
}

export function Hero({ onExploreClick, onTelemetryClick }: HeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 248.5, y: 112.4 });
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 12, y: -16 });
  const [activePin, setActivePin] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize between -1 and 1
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Smooth subtle 3D tilt
    setRotation({
      x: 12 - normY * 14,
      y: -16 + normX * 18
    });

    // Real CAD millimeter coordinates mapping
    const cadX = parseFloat((x * 3.8 + 120).toFixed(1));
    const cadY = parseFloat((y * 2.2 + 80).toFixed(1));
    setCoords({ x: cadX, y: cadY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 12, y: -16 });
    setCoords({ x: 248.5, y: 112.4 });
  };

  return (
    <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-speed-lines">
      {/* Aerodynamic Wind Tunnel Particle Stream Canvas */}
      <WindTunnelStream />

      {/* Kinetic Ambient Radial Glow in McLaren Papaya & High-Voltage Lime */}
      <div className="absolute -top-32 left-1/3 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#FF8000]/12 via-[#D2FF00]/10 to-cyan-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      {/* Split Screen Container (48% Left / 52% Right) */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
        {/* LEFT COLUMN: 48% Width Editorial Typography & CTAs */}
        <div className="w-full lg:w-[48%] space-y-6 flex flex-col justify-center">
          {/* Active Terminal Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D2FF00]/40 bg-[#D2FF00]/10 text-[#D2FF00] font-mono text-xs tracking-widest uppercase self-start shadow-[0_0_15px_rgba(210,255,0,0.15)]">
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

          {/* Subtitle */}
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
          <div className="pt-4 border-t border-[#1F2738]/80 flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#7E8B9F] uppercase tracking-wider">
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

        {/* RIGHT COLUMN: 52% Width Interactive Wireframe Lab Stage */}
        <div className="w-full lg:w-[52%]">
          <div
            ref={stageRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl bg-gradient-to-br from-[#0B0F19] via-[#07090F] to-[#04060A] border border-[#1E293B] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center p-4 sm:p-6 group select-none"
            style={{ perspective: "1000px" }}
          >
            {/* Stage Millimeter Grid & Coordinate Horizon */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(210, 255, 0, 0.12) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(56, 189, 248, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "32px 32px"
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(4,6,10,0.95)_100%)] pointer-events-none" />

            {/* Top Lab Header Info Strip */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono z-20 pointer-events-none">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#0D1322]/80 border border-[#1E283D] text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>ISOMETRIC CAD VIEWPORT // 3D WIREFRAME</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-slate-500 font-mono">
                <span>ROT: X:{rotation.x.toFixed(0)}° Y:{rotation.y.toFixed(0)}°</span>
                <span className="text-[#3A4559]">|</span>
                <span className="text-[#D2FF00]">PARALLAX ACTIVE</span>
              </div>
            </div>

            {/* 3D Reactive Chassis Silhouette Stage */}
            <div
              className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(10px)`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Layer 0: Ground Shadow & Floor Datum Ring */}
              <div className="absolute w-[80%] h-[55%] rounded-full bg-[#D2FF00]/5 blur-2xl transform -translate-y-8" />
              <svg
                viewBox="0 0 600 380"
                className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(210,255,0,0.15)]"
              >
                <defs>
                  {/* Neon Cyan to Electric Lime Gradient */}
                  <linearGradient id="chassisWireframeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#D2FF00" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FF8000" stopOpacity="0.75" />
                  </linearGradient>

                  <linearGradient id="aeroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.9" />
                  </linearGradient>
                </defs>

                {/* ISO Floor Datum Lines */}
                <g stroke="#1A2536" strokeWidth="1" strokeDasharray="3 3">
                  <ellipse cx="300" cy="300" rx="240" ry="60" fill="none" />
                  <line x1="60" y1="300" x2="540" y2="300" />
                  <line x1="300" y1="240" x2="300" y2="360" />
                </g>

                {/* 1. LAYER: POWERTRAIN & TRANSAXLE CORE (Bottom Tier) */}
                <g stroke="#FF8000" strokeWidth="1.2" fill="none" strokeOpacity="0.6">
                  {/* S58 Engine Block Isometric Box */}
                  <path d="M 230 190 L 290 165 L 340 185 L 280 210 Z" />
                  <path d="M 230 190 L 230 225 L 280 245 L 280 210" />
                  <path d="M 340 185 L 340 220 L 280 245" />
                  <line x1="290" y1="165" x2="290" y2="200" strokeDasharray="2 2" />
                  {/* Exhaust Manifold & Twin-Scroll Turbos */}
                  <circle cx="250" cy="180" r="10" stroke="#FF8000" strokeWidth="1" />
                  <circle cx="315" cy="175" r="10" stroke="#FF8000" strokeWidth="1" />
                  <path d="M 280 245 L 280 280 L 420 270" strokeDasharray="4 2" />
                </g>

                {/* 2. LAYER: WHEELS & SUSPENSION UPRIGHTS */}
                <g stroke="#38BDF8" strokeWidth="1.2" fill="none" strokeOpacity="0.5">
                  {/* Front Left Wheel */}
                  <ellipse cx="140" cy="240" rx="20" ry="42" stroke="#38BDF8" />
                  <ellipse cx="140" cy="240" rx="14" ry="30" stroke="#D2FF00" strokeDasharray="2 2" />
                  {/* Front Right Wheel */}
                  <ellipse cx="230" cy="185" rx="15" ry="32" stroke="#38BDF8" />
                  {/* Rear Left Wheel */}
                  <ellipse cx="440" cy="250" rx="22" ry="45" stroke="#38BDF8" />
                  <ellipse cx="440" cy="250" rx="15" ry="32" stroke="#FF8000" strokeDasharray="2 2" />
                  {/* Rear Right Wheel */}
                  <ellipse cx="490" cy="195" rx="16" ry="35" stroke="#38BDF8" />

                  {/* Suspension Wishbones */}
                  <line x1="155" y1="230" x2="230" y2="215" stroke="#38BDF8" strokeWidth="1" />
                  <line x1="420" y1="245" x2="350" y2="230" stroke="#38BDF8" strokeWidth="1" />
                </g>

                {/* 3. LAYER: STRUCTURAL CARBON MONOCOQUE TUB */}
                <g stroke="#D2FF00" strokeWidth="1.5" fill="none" strokeOpacity="0.85">
                  {/* Cockpit Safety Cell Tub */}
                  <path d="M 180 190 L 250 140 L 400 145 L 430 205 L 360 250 L 210 240 Z" />
                  {/* Internal Bulkheads & Floor Rails */}
                  <path d="M 250 140 L 250 200 L 210 240" strokeDasharray="3 3" />
                  <path d="M 400 145 L 400 205 L 360 250" strokeDasharray="3 3" />
                  {/* Roll Cage Halo Struts */}
                  <path d="M 270 140 L 320 95 L 375 100 L 390 145" stroke="#D2FF00" strokeWidth="1.2" />
                  <line x1="320" y1="95" x2="320" y2="155" strokeDasharray="2 2" />
                </g>

                {/* 4. LAYER: FLOATING AERO SHELL & SWAN-NECK WING */}
                <g stroke="url(#aeroGrad)" strokeWidth="1.8" fill="none">
                  {/* Roofline, Windshield, Hood Contour */}
                  <path d="M 90 225 Q 160 170 240 145 Q 310 80 370 85 Q 450 95 500 160 Q 520 185 510 205 Q 440 220 370 225 Q 220 235 90 225 Z" />
                  {/* Front Splitter & Canards */}
                  <path d="M 70 235 L 120 245 L 180 235" stroke="#38BDF8" strokeWidth="2" />
                  {/* Swan-Neck Carbon Rear Wing Assembly (Elevated) */}
                  <path d="M 460 115 L 475 75 L 530 80 L 515 120 Z" stroke="#D2FF00" strokeWidth="2" />
                  {/* Wing Pylons */}
                  <line x1="475" y1="75" x2="465" y2="135" stroke="#D2FF00" strokeWidth="1.5" />
                  <line x1="510" y1="80" x2="495" y2="140" stroke="#D2FF00" strokeWidth="1.5" />
                </g>
              </svg>

              {/* FLOATING DATUM PIN 1: + 01 AERO */}
              <div
                onMouseEnter={() => setActivePin("aero")}
                onMouseLeave={() => setActivePin(null)}
                className="absolute top-[20%] right-[22%] z-30 cursor-pointer group/pin"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="relative flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400 shadow-[0_0_12px_#38BDF8]" />
                  </span>
                  <div className={`px-2.5 py-1 rounded border font-mono text-[10px] font-bold tracking-wider transition-all duration-200 backdrop-blur-md ${
                    activePin === "aero"
                      ? "bg-cyan-500 text-black border-cyan-300 shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-110"
                      : "bg-[#090E1A]/90 text-cyan-400 border-cyan-500/40 hover:border-cyan-400"
                  }`}>
                    + 01 AERO // SWAN-NECK DRS
                  </div>
                </div>
              </div>

              {/* FLOATING DATUM PIN 2: + 02 MONOCOQUE */}
              <div
                onMouseEnter={() => setActivePin("monocoque")}
                onMouseLeave={() => setActivePin(null)}
                className="absolute top-[38%] left-[32%] z-30 cursor-pointer group/pin"
                style={{ transform: "translateZ(35px)" }}
              >
                <div className="relative flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D2FF00] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D2FF00] shadow-[0_0_12px_#D2FF00]" />
                  </span>
                  <div className={`px-2.5 py-1 rounded border font-mono text-[10px] font-bold tracking-wider transition-all duration-200 backdrop-blur-md ${
                    activePin === "monocoque"
                      ? "bg-[#D2FF00] text-black border-lime-300 shadow-[0_0_15px_rgba(210,255,0,0.6)] scale-110"
                      : "bg-[#0B110B]/90 text-[#D2FF00] border-[#D2FF00]/40 hover:border-[#D2FF00]"
                  }`}>
                    + 02 MONOCOQUE // CARBON SAFETY CELL
                  </div>
                </div>
              </div>

              {/* FLOATING DATUM PIN 3: + 03 S58 POWERTRAIN */}
              <div
                onMouseEnter={() => setActivePin("powertrain")}
                onMouseLeave={() => setActivePin(null)}
                className="absolute bottom-[24%] left-[28%] z-30 cursor-pointer group/pin"
                style={{ transform: "translateZ(25px)" }}
              >
                <div className="relative flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF8000] opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF8000] shadow-[0_0_12px_#FF8000]" />
                  </span>
                  <div className={`px-2.5 py-1 rounded border font-mono text-[10px] font-bold tracking-wider transition-all duration-200 backdrop-blur-md ${
                    activePin === "powertrain"
                      ? "bg-[#FF8000] text-black border-amber-300 shadow-[0_0_15px_rgba(255,128,0,0.6)] scale-110"
                      : "bg-[#140D07]/90 text-[#FF8000] border-[#FF8000]/40 hover:border-[#FF8000]"
                  }`}>
                    + 03 S58 POWERTRAIN // 3.0L TWIN-TURBO
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Live Cursor Coordinate Tracker */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-slate-400 z-20 pointer-events-none">
              <div className="flex items-center gap-2 bg-[#06080F]/90 px-2.5 py-1 rounded border border-[#1A2234]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
                <span className="text-[#D2FF00] font-bold">
                  DATUM: X: {coords.x}mm | Y: {coords.y}mm | Z: 0.0mm
                </span>
              </div>
              <div className="hidden sm:block text-[9px] text-[#55657E]">
                ISO 7200 ORTHOGRAPHIC WIREFRAME • MOUSE TRACKING
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
