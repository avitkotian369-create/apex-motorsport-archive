"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FastForward } from "lucide-react";

interface RevPreloaderProps {
  onComplete?: () => void;
}

const GEAR_RUNS = [
  { gear: 1, minRpm: 1800, maxRpm: 8400 },
  { gear: 2, minRpm: 5200, maxRpm: 8600 },
  { gear: 3, minRpm: 5600, maxRpm: 8750 },
  { gear: 4, minRpm: 6000, maxRpm: 8900 }
];

export function RevPreloader({ onComplete }: RevPreloaderProps) {
  const [gear, setGear] = useState(1);
  const [rpm, setRpm] = useState(1800);
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
    // Smooth 350ms fade-out into the homepage
    setTimeout(() => {
      setIsComplete(true);
      if (onComplete) onComplete();
    }, 350);
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1350; // Fast 1.35s total sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(1, elapsed / duration);

      const totalGears = GEAR_RUNS.length;
      const progressInGears = p * totalGears;
      const gearIndex = Math.min(totalGears - 1, Math.floor(progressInGears));
      const profile = GEAR_RUNS[gearIndex];
      const frac = progressInGears - gearIndex;
      setFraction(frac);

      // Fast, non-linear RPM spool
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
      aria-label="Gear Shift Preloader"
      className={`fixed inset-0 z-[100] bg-[#06080E] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-350 ease-out ${
        isExiting ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 50ms Electric Lime Micro-Flash */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 bg-[#D2FF00]/10 transition-opacity duration-75 ${
          limeFlash ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Subtle CAD Background Grid */}
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_35%,rgba(6,8,14,0.92)_100%)]" />

      {/* TOP HEADER: Subtle Meta + Unobtrusive [ SKIP ] Button */}
      <div className="flex items-center justify-between z-10 font-mono text-xs">
        <div className="flex items-center gap-2.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00]" />
          <span className="text-white font-bold tracking-wider text-[11px] uppercase">
            MONOCOQUE ARCHIVE
          </span>
          <span className="text-[#323E54] hidden sm:inline">{"//"}</span>
          <span className="text-[10px] text-[#63728B] hidden sm:inline uppercase">
            CALIBRATION RUN
          </span>
        </div>

        {/* Subtle [ SKIP ] Button */}
        <button
          onClick={finishPreloader}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1E273A] bg-[#0A0D15] hover:border-[#D2FF00]/60 hover:text-[#D2FF00] text-slate-400 font-mono text-xs tracking-wider transition-colors cursor-pointer"
          aria-label="Skip preloader"
        >
          <span>[ SKIP ]</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CENTER MINIMALIST GEAR DISPLAY */}
      <div className="my-auto max-w-sm mx-auto w-full flex flex-col items-center justify-center relative z-10 text-center">
        {/* Prominent Gear Number with Tactile Scale Punch */}
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

        {/* Razor-Thin Horizontal Rev Progress Line */}
        <div className="w-56 sm:w-64 h-[2px] bg-[#161F2E] rounded-full mt-4 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-slate-400 via-[#D2FF00] to-[#D2FF00] transition-all duration-75"
            style={{ width: `${Math.min(100, fraction * 100)}%` }}
          />
        </div>

        {/* Live Monospace RPM Readout */}
        <div className="mt-3 font-mono text-xs sm:text-sm text-slate-300 tracking-wider">
          <span className="font-extrabold text-[#D2FF00]">{rpm.toLocaleString()}</span>{" "}
          <span className="text-slate-500 font-medium">RPM</span>
        </div>
      </div>

      {/* BOTTOM FOOTER: Minimalist Telemetry Note */}
      <div className="flex items-center justify-between border-t border-[#131B2A] pt-4 font-mono text-[10px] text-slate-500 z-10">
        <span className="tracking-wider uppercase text-slate-400">
          SEQUENTIAL DOG-RING TRANSMISSION
        </span>
        <span className="text-right text-[#D2FF00]">
          GEAR {gear}/4 • ENGAGED
        </span>
      </div>
    </aside>
  );
}

export default RevPreloader;
