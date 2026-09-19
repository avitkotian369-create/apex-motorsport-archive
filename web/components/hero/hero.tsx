"use client";

import React from "react";
import {
  Gauge,
  Zap,
  Activity,
  ShieldAlert,
  SlidersHorizontal,
  Flame,
  Scale
} from "lucide-react";
import { CarSummary, CarDetail } from "@/lib/api";

interface HeroProps {
  cars: CarSummary[];
  selectedCarId: number;
  onSelectCar: (id: number) => void;
  carDetail: CarDetail | null;
  onExploreClick: () => void;
}

export function Hero({
  cars,
  selectedCarId,
  onSelectCar,
  carDetail,
  onExploreClick
}: HeroProps) {
  const isVW = carDetail?.model?.toLowerCase().includes("golf") || carDetail?.brand_id === 2;

  return (
    <div className="rounded-xl border border-stone-800 bg-[#080c14] overflow-hidden shadow-2xl space-y-0">
      {/* Top Paddock Header: Model Switcher & Live Homologation Tag */}
      <div className="px-5 py-3 border-b border-stone-800/80 bg-[#0d121c] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Model Switcher Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold mr-2 flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
            TELEMETRY PADDOCK:
          </span>

          {(cars || []).map((car) => {
            const isSelected = selectedCarId === car.id;
            return (
              <button
                key={car.id}
                onClick={() => onSelectCar(car.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-amber-500 text-black shadow-[0_0_15px_rgba(229,169,60,0.35)]"
                    : "bg-[#141a24] text-stone-400 border border-stone-800 hover:text-stone-200 hover:border-stone-700"
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-black" : "bg-stone-600"}`} />
                {car.model}
                {car.trim && <span className="text-[10px] opacity-75 font-normal">({car.trim.split(" ")[0]})</span>}
              </button>
            );
          })}
        </div>

        {/* Right: Homologation & Track Condition Badge */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#141a24] border border-stone-800 text-stone-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>CALIBRATION:</span>
            <span className="text-emerald-400 font-bold">ACTIVE CAD</span>
          </div>

          <button
            onClick={onExploreClick}
            className="px-3 py-1 rounded bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-200 hover:text-white text-xs font-mono transition-colors"
          >
            JUMP TO BLUEPRINT ↓
          </button>
        </div>
      </div>

      {/* Main Paddock Telemetry Bar (Immediate High-Performance Metric Readout) */}
      <div className="p-5 bg-gradient-to-r from-[#0a0e18] via-[#0d1320] to-[#0a0e18]">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 font-mono">
          {/* Metric 1: Engine Architecture */}
          <div className="p-3.5 rounded-lg bg-[#111724] border border-stone-800/90 flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Zap className="w-3 h-3 text-amber-500" />
              POWERTRAIN
            </span>
            <div className="text-sm sm:text-base font-black text-stone-100 truncate">
              {!isVW ? "4.0L FLAT-6 NA" : "2.0L TSI EA888"}
            </div>
            <span className="text-[10px] text-stone-400 font-sans">
              {!isVW ? "Dry-Sump / 6 ITBs" : "Gen 4 Continental Turbo"}
            </span>
          </div>

          {/* Metric 2: Power Output */}
          <div className="p-3.5 rounded-lg bg-[#111724] border border-stone-800/90 flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Flame className="w-3 h-3 text-red-500" />
              PEAK POWER
            </span>
            <div className="text-sm sm:text-base font-black text-red-400">
              {!isVW ? "525 PS (386 kW)" : "320 PS (235 kW)"}
            </div>
            <span className="text-[10px] text-stone-400 font-sans">
              {!isVW ? "465 Nm @ 6,300 RPM" : "420 Nm @ 2,100 RPM"}
            </span>
          </div>

          {/* Metric 3: Rev Limit / Redline */}
          <div className="p-3.5 rounded-lg bg-[#111724] border border-stone-800/90 flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Gauge className="w-3 h-3 text-amber-400" />
              REDLINE
            </span>
            <div className="text-sm sm:text-base font-black text-amber-400">
              {!isVW ? "9,000 RPM" : "6,800 RPM"}
            </div>
            <span className="text-[10px] text-stone-400 font-sans">
              {!isVW ? "Rigid DLC Valvetrain" : "DOHC Variable Cam Timing"}
            </span>
          </div>

          {/* Metric 4: Aerodynamic Downforce */}
          <div className="p-3.5 rounded-lg bg-[#111724] border border-stone-800/90 flex flex-col justify-between space-y-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-3 h-3 text-cyan-400" />
              PEAK DOWNFORCE
            </span>
            <div className="text-sm sm:text-base font-black text-cyan-400">
              {!isVW ? "860 kg @ 285 km/h" : "High-Speed Aero Wing"}
            </div>
            <span className="text-[10px] text-stone-400 font-sans">
              {!isVW ? "Active Swan-Neck DRS" : "R-Performance Roof Spoiler"}
            </span>
          </div>

          {/* Metric 5: Curb Weight */}
          <div className="p-3.5 rounded-lg bg-[#111724] border border-stone-800/90 flex flex-col justify-between space-y-1 col-span-2 md:col-span-1">
            <span className="text-[10px] text-stone-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
              <Scale className="w-3 h-3 text-emerald-400" />
              CURB WEIGHT
            </span>
            <div className="text-sm sm:text-base font-black text-emerald-400">
              {!isVW ? "1,450 kg (DIN)" : "1,551 kg (DIN)"}
            </div>
            <span className="text-[10px] text-stone-400 font-sans">
              {!isVW ? "Weissach Carbon/Mg Pack" : "4Motion AWD Drivetrain"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
