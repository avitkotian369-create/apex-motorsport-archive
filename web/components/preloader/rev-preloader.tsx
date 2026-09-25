"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FastForward } from "lucide-react";

interface RevPreloaderProps {
  onComplete?: () => void;
}

// Dyno run gear profiles: 1st through 4th gear
const GEAR_PROFILES = [
  { gear: 1, minRpm: 1500, maxRpm: 8600, minSpeed: 0, maxSpeed: 74 },
  { gear: 2, minRpm: 5400, maxRpm: 8750, minSpeed: 74, maxSpeed: 132 },
  { gear: 3, minRpm: 5800, maxRpm: 8850, minSpeed: 132, maxSpeed: 186 },
  { gear: 4, minRpm: 6200, maxRpm: 9000, minSpeed: 186, maxSpeed: 242 }
];

export function RevPreloader({ onComplete }: RevPreloaderProps) {
  const [revs, setRevs] = useState(1500);
  const [gear, setGear] = useState(1);
  const [speed, setSpeed] = useState(0);
  const [dynoPoints, setDynoPoints] = useState<{ x: number; y: number }[]>([]);
  const [shiftFlash, setShiftFlash] = useState(false);
  const [punchScale, setPunchScale] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const prevGearRef = useRef(1);
  const hasFinishedRef = useRef(false);

  const finishPreloader = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    // Smooth motion streak dissolve into the homepage
    setTimeout(() => {
      setIsComplete(true);
      if (onComplete) onComplete();
    }, 450);
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 2200; // 2.2s dyno acceleration pull across 4 gears
    const points: { x: number; y: number }[] = [];

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(1, elapsed / duration);

      // Gear calculation
      const totalGears = GEAR_PROFILES.length;
      const gearProgress = p * totalGears;
      const currentGearIndex = Math.min(totalGears - 1, Math.floor(gearProgress));
      const profile = GEAR_PROFILES[currentGearIndex];
      const fractionInGear = gearProgress - currentGearIndex;

      // Realistic engine spool curve
      const currentRpm = Math.floor(
        profile.minRpm + Math.pow(fractionInGear, 1.3) * (profile.maxRpm - profile.minRpm)
      );
      setRevs(currentRpm);
      setGear(profile.gear);

      const currentSpeed = Math.floor(
        profile.minSpeed + fractionInGear * (profile.maxSpeed - profile.minSpeed)
      );
      setSpeed(currentSpeed);

      // Build real-time sawtooth dyno waveform path
      // X maps across dyno width (0 to 360), Y maps RPM (1000 to 9200) to height (140 down to 10)
      const graphX = Math.round(p * 360);
      const graphY = Math.round(140 - ((currentRpm - 1000) / 8200) * 125);
      points.push({ x: graphX, y: graphY });
      setDynoPoints([...points]);

      // Detect Gear Shift: punch animation & 80ms ignition-cut micro flash
      if (profile.gear !== prevGearRef.current) {
        prevGearRef.current = profile.gear;
        setPunchScale(true);
        setShiftFlash(true);
        setTimeout(() => setShiftFlash(false), 80);
        setTimeout(() => setPunchScale(false), 160);
      }

      // Shift flash trigger right before gear upshift
      if (fractionInGear > 0.95 && currentGearIndex < totalGears - 1) {
        setShiftFlash(true);
        setTimeout(() => setShiftFlash(false), 80);
      }

      if (p >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          finishPreloader();
        }, 160);
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

  // Convert dyno points into an SVG path
  const dynoPathData = dynoPoints.length > 0
    ? dynoPoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`, "")
    : "M 0 135";

  const dynoAreaPath = dynoPoints.length > 0
    ? `${dynoPathData} L ${dynoPoints[dynoPoints.length - 1].x} 145 L 0 145 Z`
    : "";

  return (
    <aside
      aria-label="Motorsport Dyno Pull Initialization"
      className={`fixed inset-0 z-[100] bg-[#05070B] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-500 ease-out ${
        isExiting
          ? "scale-110 opacity-0 blur-lg tracking-widest pointer-events-none"
          : "scale-100 opacity-100"
      }`}
    >
      {/* 80ms Ignition Cut Micro-Flash Overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 bg-[#D2FF00]/15 transition-opacity duration-75 ${
          shiftFlash ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Background CAD Coordinate Grid & High-Voltage Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(210, 255, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(210, 255, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,4,6,0.95)_100%)]" />

      {/* 1. TOP HEADER & ACCESSIBLE SKIP BUTTON */}
      <div className="flex items-center justify-between border-b border-[#1A2234] pb-4 font-mono text-xs z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D2FF00] shadow-[0_0_10px_#D2FF00] animate-ping" />
          <span className="text-white font-bold tracking-widest uppercase">
            CHASSIS DYNAMOMETER // LIVE W.O.T. POWER SPRINT
          </span>
          <span className="hidden md:inline text-[#64748B] border-l border-[#1E293B] pl-3">
            ACCELERATION RUN • 1ST TO 4TH GEAR PULL
          </span>
        </div>

        {/* Skip Button */}
        <button
          onClick={finishPreloader}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#25324A] bg-[#0E1524] hover:bg-[#D2FF00] text-slate-300 hover:text-black font-mono font-bold text-xs tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(210,255,0,0.35)]"
          aria-label="Skip preloader animation"
        >
          <span>[ SKIP ⏭ ]</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. CENTER DYNAMOMETER RUNNER & CENTRAL GEAR BOX */}
      <div className="max-w-4xl mx-auto w-full my-auto flex flex-col items-center justify-center relative z-10 space-y-6">
        {/* CENTRAL MILLED METAL GEAR BOX */}
        <div
          className={`relative px-8 py-5 rounded-2xl bg-gradient-to-b from-[#161D2B] via-[#0E131E] to-[#080B12] border-2 transition-all duration-150 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-center gap-4 ${
            punchScale
              ? "border-[#D2FF00] scale-110 shadow-[0_0_35px_rgba(210,255,0,0.5)]"
              : "border-[#253248] scale-100"
          }`}
        >
          {/* Milled Corner Rivets */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-600 shadow-inner" />
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-600 shadow-inner" />
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-600 shadow-inner" />
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-600 shadow-inner" />

          {/* Large Bold Punching Gear Number */}
          <span
            className={`text-8xl sm:text-9xl font-black font-mono leading-none tracking-tighter transition-all duration-100 ${
              punchScale
                ? "text-[#D2FF00] drop-shadow-[0_0_30px_#D2FF00]"
                : "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            }`}
          >
            {gear}
          </span>

          <div className="flex flex-col justify-center font-mono">
            <span className="text-sm sm:text-base font-bold text-[#D2FF00] tracking-widest uppercase">
              GEAR
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">
              DOG-RING BOX
            </span>
            <span className="text-xl sm:text-2xl font-black text-white mt-1">
              {speed} <span className="text-xs text-slate-400 font-normal">KM/H</span>
            </span>
          </div>
        </div>

        {/* LIVE SAWTOOTH DYNO WAVEFORM DISPLAY */}
        <div className="w-full max-w-2xl bg-[#080C14] border border-[#1C263A] rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          {/* Dyno Grid Background */}
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mb-2 border-b border-[#151D2D] pb-1.5">
            <span className="text-[#D2FF00] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] animate-ping" />
              DYNO RPM SAWTOOTH TRACE (1ST → 4TH GEAR)
            </span>
            <span>REDLINE 9,000 RPM // W.O.T.</span>
          </div>

          <div className="relative w-full h-36">
            {/* Horizontal RPM Reference Guidelines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-red-500 text-[8px] font-mono text-red-400 pl-1">9,000 RPM [REDLINE]</div>
              <div className="border-b border-amber-400 text-[8px] font-mono text-amber-300 pl-1">7,000 RPM</div>
              <div className="border-b border-lime-400 text-[8px] font-mono text-lime-300 pl-1">5,000 RPM [TORQUE PEAK]</div>
              <div className="border-b border-slate-600 text-[8px] font-mono text-slate-400 pl-1">3,000 RPM</div>
            </div>

            {/* Sawtooth SVG Canvas */}
            <svg
              viewBox="0 0 360 150"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible relative z-10"
            >
              <defs>
                <linearGradient id="dynoWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="40%" stopColor="#D2FF00" />
                  <stop offset="75%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>

                <linearGradient id="dynoFillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Shaded Area Under Sawtooth Curve */}
              {dynoAreaPath && (
                <path d={dynoAreaPath} fill="url(#dynoFillGrad)" />
              )}

              {/* Live Traced Sawtooth Line */}
              <path
                d={dynoPathData}
                fill="none"
                stroke="url(#dynoWaveGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="drop-shadow(0 0 8px rgba(210,255,0,0.5))"
              />

              {/* Current Leading Tracer Head */}
              {dynoPoints.length > 0 && (
                <circle
                  cx={dynoPoints[dynoPoints.length - 1].x}
                  cy={dynoPoints[dynoPoints.length - 1].y}
                  r="4"
                  fill="#FFFFFF"
                  stroke="#D2FF00"
                  strokeWidth="2"
                  className="animate-pulse"
                />
              )}
            </svg>
          </div>

          {/* RPM Numerical Live Readout */}
          <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#151D2D] mt-1">
            <span className="text-slate-400">
              CURRENT TACH: <span className="text-[#D2FF00] font-black text-sm">{revs.toLocaleString()} RPM</span>
            </span>
            <span className="text-emerald-400 font-bold">
              IGNITION TIMING: +28.5° ADV
            </span>
          </div>
        </div>
      </div>

      {/* 3. TELEMETRY FOOTER & PROGRESS */}
      <div className="border-t border-[#1A2234] pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs z-10">
        <div className="text-[11px] text-slate-400 tracking-wider">
          <span className="text-[#D2FF00] font-bold">CHASSIS DYNO BENCH</span> {"//"} SEQUENTIAL DOG-BOX CALIBRATION {"//"} 100% W.O.T.
        </div>

        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="text-white font-bold">PULL PROGRESS: GEAR {gear}/4</span>
          <div className="w-32 h-1.5 bg-[#121824] rounded-full overflow-hidden border border-[#1E293B]">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-[#D2FF00] to-red-500 rounded-full transition-all duration-75"
              style={{ width: `${(gear / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RevPreloader;
