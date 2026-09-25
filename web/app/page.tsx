"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  Search,
  ShieldAlert,
  Compass
} from "lucide-react";
import { VEHICLE_ROSTER } from "@/data/vehicle-roster";
import { CadTerminalCard } from "@/components/blueprint/cad-terminal-card";
import { RevPreloader } from "@/components/preloader/rev-preloader";
import { Hero } from "@/components/hero/hero";

export default function MotorsportHomePage() {
  // 1. Launch Control Preloader State
  const [loading, setLoading] = useState(true);

  // Search & filter state (Mechanical DNA + Marque Brand)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const deckRef = useRef<HTMLDivElement>(null);

  const scrollToVehicles = () => {
    if (deckRef.current) {
      deckRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredVehicles = useMemo(() => {
    return VEHICLE_ROSTER.filter((v) => {
      // 1. Brand filter
      const matchesBrand =
        !selectedBrand || v.brand.toLowerCase() === selectedBrand.toLowerCase();

      // 2. Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.trim.toLowerCase().includes(q) ||
        v.engineBlockCode.toLowerCase().includes(q) ||
        v.powertrain.toLowerCase().includes(q) ||
        v.homologationTag.toLowerCase().includes(q);

      return matchesBrand && matchesSearch;
    });
  }, [selectedBrand, searchQuery]);

  return (
    <main className="min-h-screen bg-[#06080E] text-slate-100 relative selection:bg-[#D2FF00] selection:text-black font-sans">
      {/* 1. Launch Control Preloader */}
      {loading && <RevPreloader onComplete={() => setLoading(false)} />}

      {/* 2. Top Minimalist Header */}
      <header className="sticky top-0 z-40 bg-[#0B0F17]/95 border-b border-[#1A1E29] overflow-hidden no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between overflow-visible">
          <div className="flex items-center gap-3 shrink-0 overflow-visible select-none">
            <div className="w-8 h-8 shrink-0 rounded bg-[#D2FF00] flex items-center justify-center text-black font-black text-sm tracking-tighter shadow-[0_0_15px_rgba(210,255,0,0.5)] overflow-hidden">
              MQ
            </div>
            <div className="flex items-center overflow-visible">
              <span className="font-mono font-bold tracking-wider text-sm text-white leading-none">MONOCOQUE</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-[#717A8C] border-l border-[#222838] pl-2 uppercase leading-none">
                Automotive Anatomy Archive
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={scrollToVehicles}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#222838] bg-[#0E121B] hover:border-[#D2FF00]/50 hover:text-[#D2FF00] transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>KNOLLING CATALOG DECK</span>
            </button>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#10141E] border border-[#1E2433] text-[11px] text-[#8A95A8]">
              <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
              <span>CAD V4.5 LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Hero Section */}
      <Hero
        onExploreClick={scrollToVehicles}
        onTelemetryClick={scrollToVehicles}
      />

      {/* 4. Single Clean Nürburgring Lap-Time Benchmark Ticker */}
      <div className="w-full bg-[#0B0F17] py-2.5 border-y border-white/10 text-xs font-mono text-white overflow-hidden uppercase select-none relative z-20">
        <div className="flex items-center animate-marquee-infinite whitespace-nowrap">
          <span className="inline-flex items-center gap-2 mx-6 text-[#D2FF00] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
            NÜRBURGRING BENCHMARK LAP TIMES:
          </span>
          <span className="mx-4 text-white">
            <span className="text-[#FF8000] font-bold">PORSCHE 911 GT3 RS:</span> 6:49.328
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-red-400 font-bold">BMW M4 CSL:</span> 7:15.677
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-[#D2FF00] font-bold">MCLAREN F1:</span> 391 KM/H TOP SPEED
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-cyan-400 font-bold">VW GOLF R:</span> 7:47.310
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-red-400 font-bold">FERRARI F40:</span> 324 KM/H BENCHMARK
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-blue-400 font-bold">SKYLINE GT-R R34:</span> 7:52.000
          </span>
          <span className="text-[#4E5B73]">•</span>

          {/* Loop repeat */}
          <span className="inline-flex items-center gap-2 mx-6 text-[#D2FF00] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
            NÜRBURGRING BENCHMARK LAP TIMES:
          </span>
          <span className="mx-4 text-white">
            <span className="text-[#FF8000] font-bold">PORSCHE 911 GT3 RS:</span> 6:49.328
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-red-400 font-bold">BMW M4 CSL:</span> 7:15.677
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-[#D2FF00] font-bold">MCLAREN F1:</span> 391 KM/H TOP SPEED
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-cyan-400 font-bold">VW GOLF R:</span> 7:47.310
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-red-400 font-bold">FERRARI F40:</span> 324 KM/H BENCHMARK
          </span>
          <span className="text-[#4E5B73]">•</span>
          <span className="mx-4 text-white">
            <span className="text-blue-400 font-bold">SKYLINE GT-R R34:</span> 7:52.000
          </span>
        </div>
      </div>

      {/* 5. Direct Flow into Vehicle Search Deck & CAD Darkroom */}
      <section
        id="vehicle-cad-deck"
        ref={deckRef}
        className="pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
      >
        {/* Sticky Search & Brand Filter Bar */}
        <div className="sticky top-16 z-30 bg-[#07090E]/95 border border-white/10 p-6 rounded-2xl shadow-2xl mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#D2FF00] font-bold uppercase tracking-widest mb-1">
                [ 02. FACTORY CAD INSPECTION REGISTRY ]
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                ACTIVE VEHICLE SCHEMATICS
              </h2>
            </div>

            {/* Subtle Metadata Badge (Non-clickable) */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#8C98AC] bg-[#07090E] px-3.5 py-1.5 rounded-lg border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
              <span>HOMOLOGATED CAD DATABASE: 6 UNITS</span>
            </div>
          </div>

          {/* Authentic Milled Billet Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#717A8C] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by chassis code, model, or engine (e.g. GT3, M4 CSL, S58, V12, F40, RB26, EA888)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#0B0F17] border border-white/15 focus:border-[#D2FF00] rounded-lg text-sm text-white placeholder-[#5A6578] font-mono transition-colors shadow-inner outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-[#8C98AC] hover:text-white bg-[#1A2233] px-2 py-1 rounded cursor-pointer"
              >
                CLEAR
              </button>
            )}
          </div>

          {/* Interactive Marque Brand Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 font-mono text-xs">
            <span className="text-[10px] uppercase font-bold text-[#64748B] mr-1 hidden sm:inline">
              CHASSIS MARQUE:
            </span>
            {[
              { label: "ALL", value: null },
              { label: "PORSCHE", value: "Porsche" },
              { label: "BMW", value: "BMW" },
              { label: "MCLAREN", value: "McLaren" },
              { label: "FERRARI", value: "Ferrari" },
              { label: "NISSAN", value: "Nissan" },
              { label: "VOLKSWAGEN", value: "Volkswagen" }
            ].map((pill) => {
              const isActive = selectedBrand === pill.value;
              return (
                <button
                  key={pill.label}
                  onClick={() => setSelectedBrand(pill.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#D2FF00] text-black shadow-[0_0_15px_rgba(210,255,0,0.4)] scale-105"
                      : "bg-[#0E131E] border border-[#1C2536] text-[#8C98AC] hover:text-white hover:border-[#D2FF00]/40"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Vehicle Showcase Cards with locked heights & standardized grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredVehicles.map((car, idx) => (
            <CadTerminalCard key={car.slug} car={car} priority={idx < 2} />
          ))}
        </div>

        {/* Empty Search Fallback */}
        {filteredVehicles.length === 0 && (
          <div className="p-16 text-center bg-[#0C0F17] border border-[#1C2230] rounded-2xl font-mono">
            <ShieldAlert className="w-10 h-10 text-[#D2FF00] mx-auto mb-3" />
            <div className="text-white font-bold text-base mb-1">NO VEHICLE SCHEMATICS MATCH YOUR FILTER</div>
            <p className="text-xs text-[#717A8C] mb-6 max-w-md mx-auto">
              We are continuously importing CAD packages. Try filtering by &quot;Porsche&quot;, &quot;Volkswagen&quot;, or searching &quot;GT3&quot;, &quot;EA888&quot;, &quot;Flat-6&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand(null);
              }}
              className="px-5 py-2.5 rounded-lg bg-[#D2FF00] text-black font-bold text-xs transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* 6. Footer */}
      <footer className="mt-12 border-t border-white/10 bg-[#07090E] py-10 text-center text-xs font-mono text-[#5A6578] relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00]" />
            <span className="text-white font-bold">MONOCOQUE // AUTOMOTIVE ANATOMY ARCHIVE</span>
            <span>— Interactive Knolling & Exploded Parts Catalog</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>ENGINEERING PURISTS ONLY</span>
            <span className="text-[#323D52]">•</span>
            <span className="text-[#D2FF00]">ISO 7200 STANDARDS</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
