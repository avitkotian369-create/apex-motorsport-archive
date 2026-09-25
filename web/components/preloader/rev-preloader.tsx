"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { FastForward } from "lucide-react";

interface RevPreloaderProps {
  onComplete?: () => void;
}

const TELEMETRY_FEED = [
  "[OK] CAN-BUS TELEMETRY PROTOCOL: NOMINAL",
  "[OK] 5-TIER ISOMETRIC KNOLLING MATRICES: INDEXED (6/6)",
  "[OK] GEOMETRIC TOLERANCE: ±0.05 MM (ISO 7200)",
  "[OK] OPTICAL CALIBRATION LOCK: SYSTEM ARMED"
];

export function RevPreloader({ onComplete }: RevPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const hasFinishedRef = useRef(false);

  const finishPreloader = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    setIsExiting(true);
    // Smooth 0.3s aperture zoom and fade-out into the homepage
    setTimeout(() => {
      setIsComplete(true);
      if (onComplete) onComplete();
    }, 320);
  }, [onComplete]);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1350; // Smooth 1.35s precision sweep

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(1, elapsed / duration);
      const currentPct = Math.floor(p * 100);
      setProgress(currentPct);

      // Step telemetry feed logs smoothly across progression
      if (p < 0.3) {
        setActiveLogIndex(0);
      } else if (p < 0.6) {
        setActiveLogIndex(1);
      } else if (p < 0.9) {
        setActiveLogIndex(2);
      } else {
        setActiveLogIndex(3);
      }

      if (p >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          finishPreloader();
        }, 150);
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

  const formattedPct = progress < 10 ? `0${progress}` : `${progress}`;

  return (
    <aside
      aria-label="CAD Optical Calibration"
      className={`fixed inset-0 z-[100] bg-[#06080C] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden transition-all duration-300 ease-out ${
        isExiting
          ? "scale-115 opacity-0 blur-md pointer-events-none"
          : "scale-100 opacity-100"
      }`}
    >
      {/* Background CAD Coordinate Grid & Radial Ambient Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(210, 255, 0, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(56, 189, 248, 0.06) 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px"
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_30%,rgba(6,8,12,0.92)_100%)]" />

      {/* TOP BAR: Header Meta + Accessible [ SKIP ] Button */}
      <div className="flex items-center justify-between border-b border-[#161D2B] pb-4 font-mono text-xs z-20">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D2FF00] shadow-[0_0_10px_#D2FF00] animate-pulse" />
          <span className="text-white font-black tracking-widest uppercase">
            MONOCOQUE ARCHIVE // CAD OPTICAL CALIBRATION
          </span>
          <span className="hidden md:inline text-[#505D75] border-l border-[#1F2738] pl-3 text-[11px]">
            ISO 7200 STANDARDS • DATUM MATRIX ACTIVE
          </span>
        </div>

        {/* Accessible [ SKIP ] Button */}
        <button
          onClick={finishPreloader}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#222E42] bg-[#0A0E17]/90 hover:border-[#D2FF00] hover:bg-[#D2FF00] text-slate-300 hover:text-black font-mono font-bold text-xs tracking-wider transition-all duration-150 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(210,255,0,0.3)]"
          aria-label="Skip preloader animation"
        >
          <span>[ SKIP ]</span>
          <FastForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CENTER: OPTICAL CALIBRATION RETICLE & CONCENTRIC PULSING RINGS */}
      <div className="my-auto max-w-xl mx-auto w-full flex flex-col items-center justify-center relative z-20">
        <div className="relative w-72 h-72 sm:w-88 sm:h-88 flex items-center justify-center">
          {/* Razor-Thin SVG Crosshairs & Concentric Calibration Rings */}
          <svg
            viewBox="0 0 320 320"
            className="w-full h-full overflow-visible select-none pointer-events-none"
          >
            {/* Outer Concentric Tick Marks */}
            <circle
              cx="160"
              cy="160"
              r="150"
              fill="none"
              stroke="#1A2436"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* Rotating Outer Reticle Ring */}
            <circle
              cx="160"
              cy="160"
              r="134"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.2"
              strokeDasharray="40 25 15 25"
              strokeOpacity="0.6"
              className="animate-[spin_16s_linear_infinite]"
              style={{ transformOrigin: "160px 160px" }}
            />

            {/* Concentric Electric Lime Target Ring (Gently Pulsing) */}
            <circle
              cx="160"
              cy="160"
              r="104"
              fill="none"
              stroke="#D2FF00"
              strokeWidth="1.5"
              strokeDasharray="8 8"
              strokeOpacity="0.85"
              className="animate-pulse"
              filter="drop-shadow(0 0 6px rgba(210,255,0,0.5))"
            />

            {/* Cyan Inner Measurement Ring (Reverse Rotating) */}
            <circle
              cx="160"
              cy="160"
              r="76"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1"
              strokeDasharray="18 12"
              strokeOpacity="0.75"
              className="animate-[spin_10s_linear_infinite_reverse]"
              style={{ transformOrigin: "160px 160px" }}
            />

            {/* Precision Optical Center Ring */}
            <circle
              cx="160"
              cy="160"
              r="46"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeDasharray="4 4"
              strokeOpacity="0.4"
            />

            {/* Razor-Thin Crosshairs */}
            <line
              x1="10"
              y1="160"
              x2="310"
              y2="160"
              stroke="#38BDF8"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
            <line
              x1="160"
              y1="10"
              x2="160"
              y2="310"
              stroke="#D2FF00"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />

            {/* Center Datum Gap Crosshair Accent Lines */}
            <line x1="148" y1="160" x2="172" y2="160" stroke="#D2FF00" strokeWidth="1.5" />
            <line x1="160" y1="148" x2="160" y2="172" stroke="#D2FF00" strokeWidth="1.5" />

            {/* Corner Alignment Bracket Marks */}
            <path d="M 60 75 L 60 60 L 75 60" fill="none" stroke="#D2FF00" strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 260 75 L 260 60 L 245 60" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 60 245 L 60 260 L 75 260" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.8" />
            <path d="M 260 245 L 260 260 L 245 260" fill="none" stroke="#D2FF00" strokeWidth="1.5" strokeOpacity="0.8" />

            {/* 4 Cardinal Angle Markers */}
            <text x="164" y="24" fill="#38BDF8" fontSize="8" fontFamily="monospace" opacity="0.8">000° LAT</text>
            <text x="274" y="156" fill="#D2FF00" fontSize="8" fontFamily="monospace" opacity="0.8">090°</text>
            <text x="164" y="306" fill="#38BDF8" fontSize="8" fontFamily="monospace" opacity="0.8">180°</text>
            <text x="14" y="156" fill="#D2FF00" fontSize="8" fontFamily="monospace" opacity="0.8">270°</text>
          </svg>

          {/* Precision Monospace Percentage Counter In Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[10px] font-mono tracking-widest text-[#38BDF8] uppercase mb-0.5 opacity-90">
              ALIGNING //
            </span>
            <div className="flex items-baseline font-mono">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(210,255,0,0.35)]">
                {formattedPct}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-[#D2FF00] ml-1">
                %
              </span>
            </div>
            <span className="text-[9px] font-mono text-slate-400 tracking-wider mt-1">
              CHASSIS ISO 7200
            </span>
          </div>
        </div>

        {/* Monospace Diagnostic Telemetry Feed Underneath */}
        <div className="w-full max-w-md mt-6 space-y-1.5 font-mono text-xs">
          <div className="bg-[#090D15]/90 border border-[#182236] p-3 rounded-lg shadow-inner space-y-1.5">
            {TELEMETRY_FEED.map((line, idx) => {
              const isPast = idx < activeLogIndex;
              const isCurrent = idx === activeLogIndex;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 text-[11px] transition-all duration-200 ${
                    isCurrent
                      ? "text-[#D2FF00] font-bold"
                      : isPast
                      ? "text-slate-400 opacity-90"
                      : "text-slate-600 opacity-40"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    isCurrent ? "bg-[#D2FF00] animate-ping" : isPast ? "bg-cyan-400" : "bg-slate-700"
                  }`} />
                  <span className="truncate">{line}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM: Hairline 2px Progress Bar with Trailing Glow Dot */}
      <div className="relative w-full z-20 pt-4">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-2">
          <span className="tracking-wider uppercase text-slate-400">
            OPTICAL VECTOR INITIALIZATION
          </span>
          <span className="font-bold text-[#D2FF00]">
            TOLERANCE ±0.05 MM // {formattedPct}%
          </span>
        </div>

        {/* Hairline 2px Progress Bar Container */}
        <div className="relative w-full h-[2px] bg-[#141C2B] rounded-full overflow-visible">
          {/* Active progress fill */}
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-[#D2FF00] to-[#D2FF00] rounded-full transition-all duration-75 relative"
            style={{ width: `${progress}%` }}
          >
            {/* Trailing Glow Dot at Tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#D2FF00] shadow-[0_0_12px_#D2FF00] ring-2 ring-white/50" />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default RevPreloader;
