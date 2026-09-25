"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Radio } from "lucide-react";

interface RevPreloaderProps {
  onComplete?: () => void;
}

const GEAR_RUNS = [
  { gear: 1, minRpm: 1200, maxRpm: 8200 },
  { gear: 2, minRpm: 4800, maxRpm: 8400 },
  { gear: 3, minRpm: 5200, maxRpm: 8550 },
  { gear: 4, minRpm: 5600, maxRpm: 8650 },
  { gear: 5, minRpm: 6000, maxRpm: 8750 },
  { gear: 6, minRpm: 6400, maxRpm: 8844 }
];

export function RevPreloader({ onComplete }: RevPreloaderProps) {
  const [gear, setGear] = useState(1);
  const [rpm, setRpm] = useState(1200);
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const hasFinishedRef = useRef(false);

  const finishPreloader = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      setIsComplete(true);
      if (onComplete) onComplete();
    }, 300);
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1400; // 1.4s authentic launch sequence

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(1, elapsed / duration);
      const currentPct = Math.floor(p * 100);
      setPercent(currentPct);

      // Cycle gears 1 through 6
      const totalGears = GEAR_RUNS.length;
      const progressInGears = p * totalGears;
      const gearIndex = Math.min(totalGears - 1, Math.floor(progressInGears));
      const profile = GEAR_RUNS[gearIndex];
      const frac = progressInGears - gearIndex;

      // Realistic progressive RPM curve
      const currentRpm = Math.floor(
        profile.minRpm + Math.pow(frac, 1.25) * (profile.maxRpm - profile.minRpm)
      );
      setRpm(currentRpm);
      setGear(profile.gear);

      if (p >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          finishPreloader();
        }, 80);
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
      aria-label="Apex Cockpit Telemetry Preloader"
      className={`fixed inset-0 z-50 bg-[#07090E] text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden transition-opacity duration-300 ease-out bg-[repeating-linear-gradient(45deg,rgba(210,255,0,0.02)_0px,rgba(210,255,0,0.02)_1px,transparent_1px,transparent_14px)] ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* 1. TOP UTILITY HEADER */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs z-10 w-full">
        {/* Left Column: Status Dot & Warming Core Message */}
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D2FF00] shadow-[0_0_8px_#D2FF00] animate-pulse" />
          <span className="text-white font-bold tracking-wider text-xs">
            [ APEX COCKPIT TELEMETRY ]
          </span>
          <span className="text-slate-400 font-normal tracking-wide hidden sm:inline">
            WARMING RUNTIME CORES
          </span>
        </div>

        {/* Right Column: Audio Live Pill & Subtle Skip Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={finishPreloader}
            className="bg-[#D2FF00]/10 border border-[#D2FF00]/30 text-[#D2FF00] text-xs font-mono px-3 py-1 rounded-md flex items-center gap-2 hover:bg-[#D2FF00]/20 transition-colors cursor-pointer"
            aria-label="Audio Live / Click to Skip"
          >
            {/* Animated Audio Equalizer Waveform Bars */}
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-1.5 bg-[#D2FF00] animate-pulse" />
              <span className="w-0.5 h-3 bg-[#D2FF00] animate-pulse delay-75" />
              <span className="w-0.5 h-2 bg-[#D2FF00] animate-pulse delay-150" />
            </span>
            <span className="font-bold tracking-wider">ılı. AUDIO LIVE</span>
            <span className="text-[10px] text-[#D2FF00]/60 hover:text-[#D2FF00] ml-1 pl-1.5 border-l border-[#D2FF00]/30 hidden sm:inline">
              [ SKIP ]
            </span>
          </button>
        </div>
      </div>

      {/* 2. CENTER LAUNCH CONTROL STAGE */}
      <div className="my-auto max-w-2xl mx-auto w-full flex flex-col items-center justify-center relative z-10 text-center space-y-6">
        {/* Mode Tag */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold tracking-widest text-[#D2FF00] uppercase">
          <Radio className="w-4 h-4 animate-pulse text-[#D2FF00]" />
          <span>((•)) LAUNCH CONTROL SEQUENTIAL CALIBRATION</span>
        </div>

        {/* Gear Display */}
        <div className="flex items-baseline justify-center">
          <span className="text-8xl sm:text-9xl font-black text-white leading-none tracking-tighter drop-shadow-[0_0_35px_rgba(255,255,255,0.2)] tabular-nums font-mono inline-block w-28 sm:w-36 text-center">
            {gear}
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#D2FF00] ml-2 tracking-widest font-mono">
            GEAR
          </span>
        </div>

        {/* Tachometer Header & Live RPM Readout */}
        <div className="space-y-1">
          <div className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            LIVE PADDOCK TACHOMETER
          </div>
          <div className="flex items-baseline justify-center gap-1.5 font-mono">
            <span className="text-5xl sm:text-6xl font-black text-[#D2FF00] tracking-tight drop-shadow-[0_0_20px_rgba(210,255,0,0.35)] tabular-nums font-mono inline-block min-w-[200px] sm:min-w-[250px] text-right">
              {rpm.toLocaleString()}
            </span>
            <span className="text-lg sm:text-xl font-bold text-[#D2FF00] w-12 text-left">
              RPM
            </span>
          </div>
        </div>

        {/* Tachometer Rev Progress Bar */}
        <div className="w-full max-w-xl mx-auto space-y-2 pt-2">
          <div className="h-2.5 w-full rounded-full bg-slate-900 border border-white/10 overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-[#10B981] transition-all duration-75"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Micro Telemetry Labels Below The Bar */}
          <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 tracking-wider px-1">
            <span className="tabular-nums">1,200 IDLE</span>
            <span className="text-white font-bold tabular-nums">{percent}% BOOT COMPLETE</span>
            <span className="tabular-nums">9,000 MAX REDLINE</span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM TELEMETRY FOOTER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center border-t border-white/10 pt-4 font-mono text-[11px] text-slate-500 z-10 w-full gap-2">
        {/* Left */}
        <div className="text-left uppercase tracking-wider text-slate-400">
          MOTORSPORT CAD ENGINE V4.4
        </div>

        {/* Center */}
        <div className="text-center">
          <span className="text-white font-bold tracking-widest uppercase">
            INITIALIZING FACTORY BLUEPRINT ARCHIVE
          </span>
        </div>

        {/* Right */}
        <div className="text-right uppercase tracking-wider text-slate-400">
          SYSTEM RUNTIME: <span className="text-[#10B981] font-bold">OPTIMAL</span>
        </div>
      </div>
    </aside>
  );
}

export default RevPreloader;
