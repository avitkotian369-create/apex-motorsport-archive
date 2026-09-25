"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Radio, Volume2, VolumeX, FastForward, CheckCircle2 } from "lucide-react";

interface RevPreloaderProps {
  onComplete?: () => void;
}

const ECU_LOGS = [
  "[BOOT] MOTEC M150 MOTORSPORT ECU INITIALIZING...",
  "[OK] CAN-BUS 2.0B CHASSIS PROTOCOL: ACTIVE (1000 KBPS)",
  "[OK] BOSCH MOTORSPORT ABS & TRACTION CONTROL: SYNCED",
  "[OK] ACTIVE DRS ACTUATOR CALIBRATION: COMPLETE (±0.05 MM)",
  "[OK] TITANIUM VALVETRAIN OIL PRESSURE: 6.2 BAR NOMINAL",
  "[OK] CARBON-CERAMIC BRAKE BEDDING TELEMETRY: NOMINAL",
  "[OK] ISO 7200 KNOLLING CAD INDEX: 6/6 VEHICLES MOUNTED",
  "[READY] MONOCOQUE ARCHIVE ENGAGED // GREEN FLAG"
];

export function RevPreloader({ onComplete }: RevPreloaderProps) {
  const [revs, setRevs] = useState(1200);
  const [gear, setGear] = useState(1);
  const [speed, setSpeed] = useState(48);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState(false);
  const [soundActive, setSoundActive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const hasFinishedRef = useRef(false);

  const finishPreloader = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      setIsComplete(true);
      if (onComplete) onComplete();
    }, 600);
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // 1.8s authentic sequential launch sweep

    // Cycle ECU diagnostic boot logs rapidly
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < ECU_LOGS.length) {
        setLogs((prev) => [...prev.slice(-3), ECU_LOGS[logIndex]]);
        logIndex++;
      }
    }, 220);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(1, elapsed / duration);
      setProgress(Math.floor(p * 100));

      // Ease-in rev sweep: 1,200 idle -> 9,000 peak redline
      const currentRevs = Math.floor(1200 + Math.pow(p, 1.3) * 7800);
      setRevs(currentRevs);

      // Sequential gear shifts
      const currentGear = Math.min(6, Math.floor(1 + p * 5.4));
      setGear(currentGear);

      // Speed climb
      const currentSpeed = Math.floor(48 + p * 248);
      setSpeed(currentSpeed);

      if (p >= 1) {
        clearInterval(interval);
        clearInterval(logInterval);
        setTimeout(() => {
          finishPreloader();
        }, 250);
      }
    }, 25);

    // Escape key listener to skip intro
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Space") {
        finishPreloader();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [finishPreloader]);

  if (isComplete) return null;

  // 16 Sequential LED Shift Lights Calculation
  // 1-4: Green (3000-5500) | 5-8: Amber (5500-7200) | 9-12: Red (7200-8400) | 13-16: Electric Blue (8400-9000)
  const leds = Array.from({ length: 16 }, (_, i) => {
    const ledThreshold = 2000 + i * (7000 / 16);
    const isActive = revs >= ledThreshold;

    let color = "bg-[#141B26]";
    let glow = "";

    if (isActive) {
      if (i < 4) {
        color = "bg-emerald-400";
        glow = "shadow-[0_0_12px_#34D399]";
      } else if (i < 8) {
        color = "bg-[#D2FF00]";
        glow = "shadow-[0_0_14px_#D2FF00]";
      } else if (i < 12) {
        color = "bg-red-500";
        glow = "shadow-[0_0_16px_#EF4444]";
      } else {
        color = "bg-[#38BDF8] animate-pulse";
        glow = "shadow-[0_0_20px_#38BDF8]";
      }
    }

    return { id: i, isActive, color, glow };
  });

  // SVG Radial Tachometer Arc calculation (180° sweep from -180° to 0°)
  // Radius = 140, circumference for semi-circle ~ 440
  const maxArc = 440;
  const normalizedRev = Math.max(0, Math.min(1, (revs - 1000) / 8000));
  const strokeOffset = maxArc - normalizedRev * maxArc;

  return (
    <aside
      aria-label="System Initialization"
      className={`fixed inset-0 z-[100] bg-[#05070B] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-700 ease-out ${
        isExiting ? "scale-105 opacity-0 blur-sm pointer-events-none" : "scale-100 opacity-100"
      }`}
    >
      {/* Background CAD Coordinate Grid & High-Voltage Vignette */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(210, 255, 0, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(210, 255, 0, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px"
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,4,6,0.95)_100%)]" />

      {/* 1. TOP TELEMETRY HEADER & SKIP INTRO BUTTON */}
      <div className="flex items-center justify-between border-b border-[#1A2234] pb-4 font-mono text-xs z-10">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D2FF00] animate-ping" />
          <span className="text-white font-bold tracking-widest uppercase">
            MOTEC D153 MOTORSPORT DASH // SYSTEM INITIALIZATION
          </span>
          <span className="hidden md:inline text-[#64748B] border-l border-[#1E293B] pl-3">
            SAMPLING RATE: 1000 HZ • CAN ID 0x3F0
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Audio toggle */}
          <button
            onClick={() => setSoundActive(!soundActive)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#222E44] bg-[#0A0E17] text-white hover:border-[#D2FF00] transition-colors cursor-pointer text-xs"
          >
            {soundActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#D2FF00]" />
                <span className="text-[10px] text-[#D2FF00] font-bold">AUDIO LIVE</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#64748B]" />
                <span className="text-[10px] text-[#64748B]">MUTED</span>
              </>
            )}
          </button>

          {/* Quick Skip Button */}
          <button
            onClick={finishPreloader}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#25324A] bg-[#0E1524] hover:bg-[#D2FF00] text-slate-300 hover:text-black font-mono font-bold text-xs tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(210,255,0,0.35)]"
          >
            <span>ESC // SKIP INTRO</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. CENTER MOTEC RACING INSTRUMENT CLUSTER */}
      <div className="max-w-4xl mx-auto w-full my-auto flex flex-col items-center justify-center relative z-10">
        {/* SEQUENTIAL LED SHIFT LIGHT ARRAY */}
        <div className="w-full max-w-xl mb-6 p-2 rounded-2xl bg-[#080B11] border border-[#1E283D] shadow-2xl flex items-center justify-between gap-1.5 sm:gap-2">
          {leds.map((led) => (
            <div
              key={led.id}
              className={`flex-1 h-3.5 rounded-sm transition-all duration-75 ${led.color} ${led.glow}`}
            />
          ))}
        </div>

        {/* RADIAL TACHOMETER SWEEP ARC & DIGITAL TELEMETRY CORE */}
        <div className="relative w-80 h-48 sm:w-96 sm:h-56 flex items-end justify-center">
          <svg viewBox="0 0 320 180" className="w-full h-full overflow-visible">
            {/* Background Arc Track */}
            <path
              d="M 30 160 A 130 130 0 0 1 290 160"
              fill="none"
              stroke="#131B29"
              strokeWidth="14"
              strokeLinecap="round"
            />
            {/* Active Sweeping Redline Arc */}
            <path
              d="M 30 160 A 130 130 0 0 1 290 160"
              fill="none"
              stroke="url(#tachometer-gradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={maxArc}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-75"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="tachometer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="45%" stopColor="#D2FF00" />
                <stop offset="80%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Central Digital Readouts Inside The Arc */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 text-center">
            {/* Large Digital Gear Indicator */}
            <div className="flex items-baseline gap-1 font-mono">
              <span className="text-7xl sm:text-8xl font-black text-white leading-none tracking-tighter drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                {gear}
              </span>
              <span className="text-sm font-sans font-bold text-[#D2FF00] tracking-widest uppercase">
                GEAR
              </span>
            </div>

            {/* High-Voltage RPM Counter */}
            <div className="font-mono mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D2FF00] tracking-tight">
                {revs.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-normal ml-1">RPM</span>
            </div>
          </div>
        </div>

        {/* Race Dash Sub-Telemetry Bar */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-lg mt-6 font-mono text-center">
          <div className="p-2.5 rounded-xl bg-[#090D15] border border-[#1A2438]">
            <span className="text-[9px] text-[#64748B] block font-bold uppercase">SPEED</span>
            <span className="text-lg font-black text-white">{speed} <span className="text-[10px] text-slate-500">KM/H</span></span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#090D15] border border-[#1A2438]">
            <span className="text-[9px] text-[#64748B] block font-bold uppercase">LAP DELTA</span>
            <span className="text-lg font-black text-emerald-400">-0.248 <span className="text-[10px]">S</span></span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#090D15] border border-[#1A2438]">
            <span className="text-[9px] text-[#64748B] block font-bold uppercase">THROTTLE</span>
            <span className="text-lg font-black text-[#D2FF00]">{progress}%</span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ECU DIAGNOSTICS BOOT LOG & PROGRESS STRIP */}
      <div className="border-t border-[#1A2234] pt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 font-mono text-xs z-10">
        {/* Terminal Boot Log (Cycling ECU Telemetry Messages) */}
        <div className="space-y-1 max-w-lg w-full">
          <div className="text-[10px] text-[#D2FF00] uppercase font-bold flex items-center gap-1.5 mb-1.5">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>ECU DIAGNOSTICS LOG STREAM</span>
          </div>
          <div className="bg-[#07090F] border border-[#172033] p-2.5 rounded-lg space-y-1 font-mono text-[10px] text-slate-400 shadow-inner min-h-[58px]">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#D2FF00] shrink-0" />
                <span className={index === logs.length - 1 ? "text-white font-bold" : "text-slate-400"}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Launch Sequence Progress Bar */}
        <div className="w-full md:w-64 space-y-1.5 text-right">
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>CALIBRATION</span>
            <span className="text-[#D2FF00] font-bold">{progress}% READY</span>
          </div>
          <div className="w-full h-2 bg-[#121824] rounded-full overflow-hidden border border-[#1E293B] p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#10B981] via-[#D2FF00] to-[#38BDF8] rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RevPreloader;
