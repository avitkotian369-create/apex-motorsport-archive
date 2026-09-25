"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FastForward } from "lucide-react";

interface RevPreloaderProps {
  onComplete?: () => void;
}

const GEAR_RUNS = [
  { gear: 1, minRpm: 1200, maxRpm: 8400 },
  { gear: 2, minRpm: 5200, maxRpm: 8600 },
  { gear: 3, minRpm: 5600, maxRpm: 8750 },
  { gear: 4, minRpm: 6000, maxRpm: 8900 }
];

export function RevPreloader({ onComplete }: RevPreloaderProps) {
  const [gear, setGear] = useState(1);
  const [rpm, setRpm] = useState(1200);
  const [fraction, setFraction] = useState(0);
  const [punch, setPunch] = useState(false);
  const [limeFlash, setLimeFlash] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prevGearRef = useRef(1);
  const hasFinishedRef = useRef(false);

  const finishPreloader = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    // Smooth fade-out into the homepage
    setTimeout(() => {
      setIsComplete(true);
      if (onComplete) onComplete();
    }, 350);
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1400; // Crisp ~1.4s progression across 4 gears

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(1, elapsed / duration);

      const totalGears = GEAR_RUNS.length;
      const progressInGears = p * totalGears;
      const gearIndex = Math.min(totalGears - 1, Math.floor(progressInGears));
      const profile = GEAR_RUNS[gearIndex];
      const frac = progressInGears - gearIndex;
      setFraction(frac);

      // Fast non-linear RPM climb
      const currentRpm = Math.floor(
        profile.minRpm + Math.pow(frac, 1.25) * (profile.maxRpm - profile.minRpm)
      );
      setRpm(currentRpm);
      setGear(profile.gear);

      // Detect Gear Shift: punch animation & 50ms lime micro-flash
      if (profile.gear !== prevGearRef.current) {
        prevGearRef.current = profile.gear;
        setPunch(true);
        setLimeFlash(true);
        setTimeout(() => setLimeFlash(false), 50);
        setTimeout(() => setPunch(false), 140);
      }

      if (p >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          finishPreloader();
        }, 120);
      }
    }, 20);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        finishPreloader();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishPreloader]);

  if (isComplete) return null;

  return (
    <aside
      aria-label="Launch Control Preloader"
      className={`fixed inset-0 z-[100] bg-[#06080E] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-350 ease-out ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 50ms Electric Lime Micro-Flash on Gear Shifts */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 bg-[#D2FF00]/10 transition-opacity duration-75 ${
          limeFlash ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Subtle CAD Coordinate Grid & Radial Ambient Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_35%,rgba(6,8,14,0.95)_100%)]" />

      {/* 1. TOP UTILITY HEADER */}
      <div className="flex items-center justify-between z-10 font-mono text-xs">
        {/* Left: Pulsing status indicator */}
        <div className="flex items-center gap-2.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-ping" />
          <span className="text-white font-bold tracking-wider text-[11px] uppercase">
            MONOCOQUE ARCHIVE
          </span>
          <span className="text-[#323E54] hidden sm:inline">{"//"}</span>
          <span className="text-[10px] text-[#8696AE] hidden sm:inline uppercase tracking-wider">
            CALIBRATION RUN
          </span>
        </div>

        {/* Right: Clean Bypass [ SKIP ] ⏭ Button */}
        <button
          onClick={finishPreloader}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E273A] bg-[#0A0D15] hover:border-[#D2FF00]/60 hover:text-[#D2FF00] text-slate-400 font-mono text-xs tracking-wider transition-colors cursor-pointer"
          aria-label="Skip preloader"
        >
          <span>[ SKIP ]</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. CENTER STAGE: DYNAMIC GEAR COUNTER & HORIZONTAL TACHOMETER */}
      <div className="my-auto max-w-md mx-auto w-full flex flex-col items-center justify-center relative z-10 text-center">
        {/* Dynamic Gear Counter */}
        <div className="flex items-baseline justify-center gap-2 font-mono">
          <span
            className={`text-8xl sm:text-9xl font-black text-white leading-none tracking-tighter transition-transform duration-100 select-none ${
              punch ? "scale-115 text-[#D2FF00] drop-shadow-[0_0_25px_rgba(210,255,0,0.5)]" : "scale-100"
            }`}
          >
            {gear}
          </span>
          <span className="text-sm font-bold tracking-widest text-[#D2FF00] uppercase font-mono">
            GEAR
          </span>
        </div>

        {/* Horizontal Tachometer Line */}
        <div className="w-64 sm:w-80 h-[2px] bg-[#161F2E] rounded-full mt-4 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#FF8000] via-[#D2FF00] to-[#D2FF00] transition-all duration-75"
            style={{ width: `${Math.min(100, fraction * 100)}%` }}
          />
        </div>

        {/* Micro-Labels: 1,200 IDLE (Left) and 9,000 MAX REDLINE (Right) */}
        <div className="w-64 sm:w-80 flex items-center justify-between font-mono text-[9px] text-[#55657E] mt-1.5 px-0.5 tracking-wider">
          <span>1,200 IDLE</span>
          <span>9,000 MAX REDLINE</span>
        </div>

        {/* Clean, High-Impact Monospace RPM Readout */}
        <div className="mt-4 font-mono text-sm sm:text-base tracking-wider text-white">
          <span className="font-black text-[#D2FF00] text-lg sm:text-xl drop-shadow-[0_0_12px_rgba(210,255,0,0.3)]">
            {rpm.toLocaleString()}
          </span>{" "}
          <span className="text-slate-400 font-bold text-xs">RPM</span>
        </div>
      </div>

      {/* 3. BOTTOM STATUS RIBBON */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center border-t border-[#131B2A] pt-4 font-mono text-[10px] text-slate-500 z-10 gap-2">
        {/* Left */}
        <div className="tracking-wider uppercase text-slate-400 text-left">
          SEQUENTIAL DOG-RING TRANSMISSION
        </div>
        {/* Center */}
        <div className="tracking-wider uppercase text-slate-500 text-center hidden sm:block">
          INITIALIZING FACTORY BLUEPRINT ARCHIVE
        </div>
        {/* Right */}
        <div className="text-right text-[#D2FF00] font-bold tracking-wider">
          GEAR {gear}/4 • ENGAGED
        </div>
      </div>
    </aside>
  );
}

export default RevPreloader;
