"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Car, ChevronDown, Search, Check, X } from "lucide-react";
import { VEHICLE_ROSTER, VehicleRosterItem } from "@/data/vehicle-roster";

interface ChassisSwitcherProps {
  currentSlug: string;
  className?: string;
}

export function ChassisSwitcher({ currentSlug, className = "" }: ChassisSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Identify active vehicle
  const activeCar = useMemo(() => {
    const clean = (currentSlug || "").toLowerCase();
    return (
      VEHICLE_ROSTER.find((c) => {
        if (c.slug === clean) return true;
        if (clean.includes("bmw") || clean.includes("m4") || clean.includes("csl")) return c.slug === "bmw-m4-csl";
        if (clean.includes("mclaren") || clean.includes("f1") || clean.includes("xp5")) return c.slug === "mclaren-f1-xp5";
        if (clean.includes("ferrari") || clean.includes("f40")) return c.slug === "ferrari-f40";
        if (clean.includes("skyline") || clean.includes("r34") || clean.includes("gtr")) return c.slug === "nissan-skyline-gtr-r34";
        if (clean.includes("golf") || clean.includes("vw")) return c.slug === "volkswagen-golf-r-mk8";
        if (clean.includes("porsche") || clean.includes("gt3") || clean.includes("911")) return c.slug === "porsche-911-gt3-rs";
        return false;
      }) || VEHICLE_ROSTER[0]
    );
  }, [currentSlug]);

  // Filter vehicles based on search query
  const filteredVehicles = useMemo(() => {
    if (!searchQuery.trim()) return VEHICLE_ROSTER;
    const q = searchQuery.toLowerCase().trim();
    return VEHICLE_ROSTER.filter(
      (car) =>
        car.model.toLowerCase().includes(q) ||
        car.brand.toLowerCase().includes(q) ||
        car.trim.toLowerCase().includes(q) ||
        car.engineBlockCode.toLowerCase().includes(q) ||
        car.slug.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    router.push(`/car/${slug}`);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${className}`}>
      {/* Chassis Switcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2 bg-[#0B0F17] hover:bg-[#121824] border border-white/10 hover:border-[#D2FF00]/50 text-xs font-mono rounded-lg px-3 py-1.5 text-white transition-all shadow-md cursor-pointer select-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Car className="w-3.5 h-3.5 text-[#D2FF00] group-hover:scale-110 transition-transform" />
        <span className="font-bold tracking-wider uppercase text-slate-200 group-hover:text-white">
          {activeCar.brand} {activeCar.model}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 group-hover:text-white transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#D2FF00]" : ""
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-80 sm:w-96 rounded-xl border border-[#1E273A] bg-[#0A0D15]/98 backdrop-blur-xl shadow-2xl p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 font-mono">
          {/* Search Header */}
          <div className="relative mb-2">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by brand, model, or code..."
              className="w-full bg-[#06090E] border border-[#1E273A] focus:border-[#D2FF00] rounded-lg pl-8 pr-7 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Grouped / Scrollable Vehicle List */}
          <div className="max-h-72 overflow-y-auto space-y-1 pr-0.5">
            {filteredVehicles.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500 font-mono">
                No matching chassis in archive
              </div>
            ) : (
              filteredVehicles.map((car: VehicleRosterItem) => {
                const isSelected = car.slug === activeCar.slug;
                return (
                  <button
                    key={car.slug}
                    type="button"
                    onClick={() => handleSelect(car.slug)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#141B28] border border-[#D2FF00]/40 text-white shadow-inner"
                        : "hover:bg-[#111723] hover:border-slate-700/50 border border-transparent text-slate-300"
                    }`}
                  >
                    {/* Left: Vehicle Title + Subtitle */}
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white tracking-wide truncate">
                          {car.brand} {car.model}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-black uppercase bg-[#D2FF00]/20 text-[#D2FF00] border border-[#D2FF00]/40">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {car.engineBlockCode} • {car.trim}
                      </div>
                    </div>

                    {/* Right: Electric Lime Checkmark if active */}
                    <div className="shrink-0 flex items-center">
                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-[#D2FF00] text-black flex items-center justify-center shadow-[0_0_8px_#D2FF00]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-[10px] text-slate-500 font-mono">{car.output.split(" ")[0]} PS</span>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Metadata */}
          <div className="pt-2 mt-2 border-t border-[#161F30] flex items-center justify-between text-[9px] text-slate-500">
            <span>{filteredVehicles.length} of {VEHICLE_ROSTER.length} CHASSIS</span>
            <span className="text-slate-400">ESC TO CLOSE</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChassisSwitcher;
