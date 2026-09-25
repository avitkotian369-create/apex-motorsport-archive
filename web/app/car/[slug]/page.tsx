"use client";

import React, { useState, useMemo, useRef, use, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Zap,
  Gauge,
  Flame,
  Scale,
  Wrench,
  Box
} from "lucide-react";
import {
  TargetCallout,
  KnollingTierFilter,
  getHomologatedVehicleKnollingPins
} from "@/lib/pins-data";
import {
  BlueprintCanvas,
  BenchmarkCarMeta
} from "@/components/blueprint/blueprint-canvas";
import { automotiveApi } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const CAR_META: Record<string, BenchmarkCarMeta> = {
  "porsche-911-gt3-rs": {
    name: "PORSCHE 911 GT3 RS (Weissach Package)",
    badge: "WEISSACH HOMOLOGATION",
    engine: "4.0L FLAT-6 NA (MA1.77)",
    power: "525 PS (386 kW)",
    redline: "9,000 RPM",
    dryWeight: "1,450 kg (DIN)",
    aeroBalance: "860 kg @ 285 km/h",
    defaultCutaway: "/assets/porsche-gt3rs-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,457 mm",
      trackFront: "1,630 mm",
      trackRear: "1,580 mm",
      overallLength: "4,572 mm",
      overallHeight: "1,322 mm"
    }
  },
  "bmw-m4-csl": {
    name: "BMW M4 CSL (Competition Sport Lightweight)",
    badge: "CSL LIGHTWEIGHT HOMOLOGATION",
    engine: "3.0L TWIN-TURBO I6 (S58B30T0)",
    power: "550 PS (405 kW)",
    redline: "7,200 RPM",
    dryWeight: "1,625 kg (DIN / -100 kg CSL)",
    aeroBalance: "CSL Carbon Ducktail & Splitter (220 kg)",
    defaultCutaway: "/assets/bmw-m4-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,857 mm",
      trackFront: "1,623 mm",
      trackRear: "1,608 mm",
      overallLength: "4,794 mm",
      overallHeight: "1,386 mm"
    }
  },
  "mclaren-f1-xp5": {
    name: "MCLAREN F1 XP5 (Le Mans Benchmark)",
    badge: "LE MANS BENCHMARK HOMOLOGATION",
    engine: "6.1L BMW S70/2 60° V12",
    power: "627 PS (461 kW)",
    redline: "7,500 RPM",
    dryWeight: "1,138 kg (Dry)",
    aeroBalance: "Active Pop-Up Brake Foil",
    defaultCutaway: "/assets/mclaren-f1-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,718 mm",
      trackFront: "1,568 mm",
      trackRear: "1,472 mm",
      overallLength: "4,288 mm",
      overallHeight: "1,140 mm"
    }
  },
  "volkswagen-golf-r-mk8": {
    name: "VOLKSWAGEN GOLF R MK8 (20 Years Edition)",
    badge: "20 YEARS HOMOLOGATION SPEC",
    engine: "2.0L TSI TURBO (EA888 GEN 4)",
    power: "320 PS (235 kW)",
    redline: "6,800 RPM",
    dryWeight: "1,551 kg (DIN)",
    aeroBalance: "High-Speed Aero Foil",
    defaultCutaway: "/assets/vw-golfr-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,628 mm",
      trackFront: "1,539 mm",
      trackRear: "1,514 mm",
      overallLength: "4,290 mm",
      overallHeight: "1,458 mm"
    }
  },
  "ferrari-f40": {
    name: "FERRARI F40 (Tipo F120AB)",
    badge: "TIPO F120AB HOMOLOGATION",
    engine: "2.9L TWIN-TURBO 90° V8 (TIPO F120A)",
    power: "478 PS (352 kW)",
    redline: "7,750 RPM",
    dryWeight: "1,100 kg (Dry)",
    aeroBalance: "Fixed Composite Gurney Wing",
    defaultCutaway: "/assets/ferrari-f40-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,450 mm",
      trackFront: "1,594 mm",
      trackRear: "1,606 mm",
      overallLength: "4,358 mm",
      overallHeight: "1,124 mm"
    }
  },
  "nissan-skyline-gtr-r34": {
    name: "NISSAN SKYLINE GT-R R34 (V-Spec II Nürburgring)",
    badge: "V-SPEC II NÜRBURGRING HOMOLOGATION",
    engine: "2.6L TWIN-TURBO RB26DETT",
    power: "280+ PS (206 kW)",
    redline: "8,000 RPM",
    dryWeight: "1,560 kg (DIN)",
    aeroBalance: "Carbon Ground Effect Diffuser",
    defaultCutaway: "/assets/skyline-r34-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,665 mm",
      trackFront: "1,480 mm",
      trackRear: "1,490 mm",
      overallLength: "4,600 mm",
      overallHeight: "1,360 mm"
    }
  }
};

const ROSTER_LINKS = [
  { slug: "porsche-911-gt3-rs", label: "PORSCHE 911 GT3 RS" },
  { slug: "mclaren-f1-xp5", label: "MCLAREN F1 (XP5)" },
  { slug: "ferrari-f40", label: "FERRARI F40" },
  { slug: "nissan-skyline-gtr-r34", label: "NISSAN SKYLINE GT-R" },
  { slug: "volkswagen-golf-r-mk8", label: "VW GOLF R (MK8)" },
  { slug: "bmw-m4-csl", label: "BMW M4 CSL" }
];

export default function CarCadTerminalPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawSlug = resolvedParams.slug.toLowerCase();

  // 1. Resolve matching car metadata across 6 homologated vehicles
  const carKey = useMemo(() => {
    if (rawSlug.includes("bmw") || rawSlug.includes("m4") || rawSlug.includes("csl") || rawSlug.includes("g82")) return "bmw-m4-csl";
    if (rawSlug.includes("golf") || rawSlug.includes("vw")) return "volkswagen-golf-r-mk8";
    if (rawSlug.includes("mclaren") || rawSlug.includes("f1") || rawSlug.includes("xp5")) return "mclaren-f1-xp5";
    if (rawSlug.includes("ferrari") || rawSlug.includes("f40")) return "ferrari-f40";
    if (rawSlug.includes("skyline") || rawSlug.includes("r34") || rawSlug.includes("gtr")) return "nissan-skyline-gtr-r34";
    return "porsche-911-gt3-rs";
  }, [rawSlug]);

  const carInfo = CAR_META[carKey] || CAR_META["porsche-911-gt3-rs"];

  // 2. Layer Isolation Pills state:
  // [ALL PARTS] | [AERO SHELL] | [MONOCOQUE] | [POWERTRAIN] | [BRAKES & GEAR] | [HARDWARE]
  const [activeTier, setActiveTier] = useState<KnollingTierFilter>("all");
  const [selectedCalloutId, setSelectedCalloutId] = useState<number | null>(null);
  const [hoveredCalloutId, setHoveredCalloutId] = useState<number | null>(null);
  const [glowColor, setGlowColor] = useState<"lime" | "papaya">("lime");

  // Progressive disclosure drawer tracking per card
  const [expandedCardIds, setExpandedCardIds] = useState<Record<number, boolean>>({});
  const [filterIsolatedOnly, setFilterIsolatedOnly] = useState<boolean>(false);

  const toggleCardDossier = (partId: number) => {
    setExpandedCardIds((prev) => ({
      ...prev,
      [partId]: !prev[partId]
    }));
  };

  // Canvas interactive tools state
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [caliperMeasurement, setCaliperMeasurement] = useState<boolean>(false);

  // Two-way synchronization row refs
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 3. Knolling Callouts for this Vehicle
  const allPins: TargetCallout[] = useMemo(() => {
    return getHomologatedVehicleKnollingPins(carKey, "all");
  }, [carKey]);

  // Filtered or full pins list depending on user preference
  const displayedPins = useMemo(() => {
    if (filterIsolatedOnly && activeTier !== "all") {
      return allPins.filter((p) => p.tier === activeTier);
    }
    return allPins;
  }, [allPins, filterIsolatedOnly, activeTier]);

  // Active callout (defaults to first pin)
  const activeCallout = useMemo(() => {
    if (selectedCalloutId) {
      const found = allPins.find((p) => p.id === selectedCalloutId);
      if (found) return found;
    }
    return allPins[0] || null;
  }, [allPins, selectedCalloutId]);

  // Resilient backend integration check (non-blocking)
  useEffect(() => {
    automotiveApi.getCars().catch(() => {});
  }, []);

  // Handler: Canvas pin clicked -> Scrolls to and highlights matching ledger card
  const handlePinSelect = useCallback((pinId: number) => {
    setSelectedCalloutId(pinId);
    setGlowColor("lime");

    // Two-Way Sync: Scroll matching card into view smoothly
    const cardEl = cardRefs.current[pinId];
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);

  const handlePinHover = useCallback((pinId: number | null) => {
    setHoveredCalloutId(pinId);
  }, []);

  // Handler: Ledger card clicked -> Illuminates pin with McLaren Papaya or Lime glow
  const handleCardClick = useCallback((partId: number) => {
    setSelectedCalloutId(partId);
    setGlowColor("papaya");
  }, []);

  return (
    <div className="min-h-screen bg-[#08090C] text-[#E2E8F0] selection:bg-[#D2FF00] selection:text-black flex flex-col font-sans relative overflow-x-hidden bg-cad-grid">
      {/* 1. TOP COCKPIT NAVIGATION & LIVE TELEMETRY STRIP */}
      <header className="border-b border-[#1E2536] bg-[#090C12]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back Breadcrumb & Active Car Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#222A3B] hover:border-[#D2FF00] bg-[#0E131E] text-xs font-mono font-bold text-[#A6B2C4] hover:text-[#D2FF00] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#D2FF00]" />
              <span className="hidden sm:inline">EXIT TO MONOCOQUE ARCHIVE</span>
              <span className="sm:hidden">EXIT</span>
            </Link>

            <div className="h-6 w-[1px] bg-[#1E2536] hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-mono font-black text-white uppercase tracking-wider">
                  {carInfo.name}
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-[#D2FF00]/10 text-[#D2FF00] border border-[#D2FF00]/30">
                  {carInfo.badge}
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#637085] hidden md:block">
                MONOCOQUE // AUTOMOTIVE ANATOMY ARCHIVE • ISO 7200 STANDARDS
              </div>
            </div>
          </div>

          {/* Live Telemetry Strip */}
          <div className="hidden lg:flex items-center gap-2.5 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0E131E] border border-[#1E2536]">
              <Zap className="w-3.5 h-3.5 text-[#D2FF00]" />
              <span className="text-[#647087]">ENG:</span>
              <span className="text-white font-bold">{carInfo.engine}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0E131E] border border-[#1E2536]">
              <Flame className="w-3.5 h-3.5 text-[#FF8000]" />
              <span className="text-[#647087]">POWER:</span>
              <span className="text-[#FF8000] font-bold">{carInfo.power}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0E131E] border border-[#1E2536]">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[#647087]">REDLINE:</span>
              <span className="text-cyan-400 font-bold">{carInfo.redline}</span>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0E131E] border border-[#1E2536]">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[#647087]">WEIGHT:</span>
              <span className="text-amber-400 font-bold">{carInfo.dryWeight}</span>
            </div>
          </div>
        </div>

        {/* 6-Car Homologation Roster Switcher Bar */}
        <div className="border-t border-[#161C2A] bg-[#07090E] px-4 sm:px-6 lg:px-8 py-1.5 overflow-x-auto scrollbar-none flex items-center gap-2 font-mono text-[11px]">
          <span className="text-[#55647A] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Box className="w-3 h-3 text-[#D2FF00]" />
            ROSTER:
          </span>
          {ROSTER_LINKS.map((item) => {
            const isCurrent = carKey === item.slug;
            return (
              <Link
                key={item.slug}
                href={`/car/${item.slug}`}
                className={`px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#D2FF00] text-black shadow-[0_0_10px_rgba(210,255,0,0.3)] font-black"
                    : "bg-[#0E131E] text-[#8A95A8] hover:text-white hover:bg-[#161E2E] border border-[#1E2536]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* 2. MAIN CAD WORKSPACE STAGE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-6 w-full">
        {/* EXPLODED ISOMETRIC KNOLLING CANVAS */}
        <section className="w-full relative">
          <BlueprintCanvas
            carKey={carKey}
            carInfo={carInfo}
            activeTier={activeTier}
            onTierChange={(tier) => {
              setActiveTier(tier);
              setSelectedCalloutId(null);
              setHoveredCalloutId(null);
            }}
            pins={allPins}
            selectedPinId={selectedCalloutId}
            onSelectPin={handlePinSelect}
            hoveredPinId={hoveredCalloutId}
            onHoverPin={handlePinHover}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
            panOffset={panOffset}
            onPanChange={setPanOffset}
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid((g) => !g)}
            caliperMeasurement={caliperMeasurement}
            onToggleCaliper={() => setCaliperMeasurement((c) => !c)}
            glowColor={glowColor}
          />
        </section>

        {/* 3. DE-CLUTTERED, BEGINNER-FRIENDLY PARTS LEDGER */}
        <section className="rounded-2xl border border-[#1E2536] bg-[#0A0D15]/95 backdrop-blur-xl overflow-hidden shadow-2xl font-mono">
          {/* Ledger Header */}
          <div className="px-5 py-4 border-b border-[#1A2233] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0E131E]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#D2FF00] flex items-center justify-center text-black font-black text-xs shadow-[0_0_12px_rgba(210,255,0,0.3)]">
                MQ
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <span>EXPLODED PARTS CATALOG</span>
                  <span className="text-[#3A475C]">{"//"}</span>
                  <span className="text-[#D2FF00]">{carInfo.name}</span>
                </h2>
                <div className="text-[11px] text-[#637085] flex items-center gap-2 pt-0.5">
                  <span>Interactive Knolling & Exploded Parts Catalog</span>
                  <span>•</span>
                  <span>ISO 7200 Certification</span>
                </div>
              </div>
            </div>

            {/* Active Tier Filter Status */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#717E94] text-[11px]">ACTIVE ISOLATION:</span>
              <span className="px-2.5 py-1 rounded-lg bg-[#D2FF00]/10 text-[#D2FF00] border border-[#D2FF00]/30 font-bold uppercase text-[11px]">
                {activeTier === "all"
                  ? `ALL PARTS (${allPins.length}/${allPins.length})`
                  : `${activeTier.toUpperCase()} LAYER (${allPins.filter((p) => p.tier === activeTier).length} PARTS)`}
              </span>
              {activeTier !== "all" && (
                <>
                  <button
                    onClick={() => setFilterIsolatedOnly((f) => !f)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border border-[#2B384E] bg-[#121824] text-[#A6B2C4] hover:text-[#D2FF00] hover:border-[#D2FF00]/50 transition-colors cursor-pointer"
                  >
                    {filterIsolatedOnly ? "SHOW FULL GRID (DIMMED)" : "FILTER ISOLATED ONLY"}
                  </button>
                  <button
                    onClick={() => {
                      setActiveTier("all");
                      setFilterIsolatedOnly(false);
                    }}
                    className="text-[10px] text-[#A6B2C4] hover:text-white underline cursor-pointer"
                  >
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Cards Grid: 1 or 2 columns of clean, beginner-friendly cards */}
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedPins.map((part) => {
              const isSelected = activeCallout?.id === part.id;
              const isHovered = hoveredCalloutId === part.id;
              const isTierMatch = activeTier === "all" || part.tier === activeTier;
              const isExpanded = expandedCardIds[part.id] || false;

              // Border glow state
              const isPapaya = glowColor === "papaya" && isSelected;

              return (
                <div
                  key={part.id}
                  ref={(el) => {
                    cardRefs.current[part.id] = el;
                  }}
                  onClick={() => handleCardClick(part.id)}
                  onMouseEnter={() => setHoveredCalloutId(part.id)}
                  onMouseLeave={() => setHoveredCalloutId(null)}
                  className={`rounded-xl border transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between space-y-3 ${
                    !isTierMatch ? "opacity-35 hover:opacity-80" : "opacity-100"
                  } ${
                    isSelected
                      ? isPapaya
                        ? "bg-[#16110B] border-[#FF8000] shadow-[0_0_20px_rgba(255,128,0,0.25)] ring-1 ring-[#FF8000]"
                        : "bg-[#11160B] border-[#D2FF00] shadow-[0_0_20px_rgba(210,255,0,0.25)] ring-1 ring-[#D2FF00]"
                      : isHovered
                      ? "bg-[#111724] border-[#D2FF00]/60"
                      : "bg-[#0B0E17] border-[#1C2538] hover:border-[#2D3B54]"
                  }`}
                >
                  {/* Card Header: Number Badge + Common Name + Tier Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      {/* Clean 26px Number Badge */}
                      <span
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-mono font-black transition-all shadow-md shrink-0 ${
                          isSelected
                            ? isPapaya
                              ? "bg-[#FF8000] text-black shadow-[0_0_12px_#FF8000] border border-white"
                              : "bg-[#D2FF00] text-black shadow-[0_0_12px_#D2FF00] border border-white"
                            : isHovered
                            ? "bg-[#D2FF00] text-black shadow-[0_0_10px_#D2FF00]"
                            : "bg-[#121824] text-[#D2FF00] border border-[#D2FF00]/40"
                        }`}
                      >
                        {part.num}
                      </span>

                      {/* Common Name */}
                      <div>
                        <h3 className="text-sm font-bold font-sans text-white group-hover:text-[#D2FF00] leading-snug">
                          {part.num}. {part.name}
                        </h3>
                        <span className="text-[10px] text-[#637085] font-mono">
                          {part.subsystem}
                        </span>
                      </div>
                    </div>

                    {/* Tier Badge */}
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold bg-[#141B28] text-[#8A95A8] border border-[#222E42] shrink-0">
                      {part.tier || "HARDWARE"}
                    </span>
                  </div>

                  {/* Plain-English Explainer (1 Prominent, High-Readability Sentence) */}
                  <p className="text-xs sm:text-[13px] text-[#CBD5E1] font-sans leading-relaxed font-normal bg-[#0F1420]/60 p-2.5 rounded-lg border border-[#172032]">
                    {part.plainExplainer || part.rationale}
                  </p>

                  {/* Quick-Read Visual Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-[#131B2A] text-cyan-300 border border-cyan-800/40">
                      {part.weightVisual || `Weight: ${part.weightDelta.split(" ")[0]}`}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#131B2A] text-emerald-300 border border-emerald-800/40">
                      {part.positionVisual || `Position: ${part.subsystem.split(" ")[0]}`}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#131B2A] text-amber-300 border border-amber-800/40">
                      {part.wearVisual || "Wear: High Endurance"}
                    </span>
                  </div>

                  {/* Progressive Disclosure Toggle Button */}
                  <div className="pt-1 border-t border-[#161F30]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCardDossier(part.id);
                      }}
                      className="w-full flex items-center justify-between text-[11px] font-mono font-bold text-[#8A95A8] hover:text-[#D2FF00] transition-colors py-1 cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <Wrench className="w-3 h-3 text-[#D2FF00]" />
                        <span>{isExpanded ? "HIDE TECHNICAL DOSSIER" : "VIEW TECHNICAL SPECS"}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 text-[#D2FF00]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* Progressive Disclosure Drawer */}
                    {isExpanded && (
                      <div className="mt-2.5 p-3 rounded-lg bg-[#080B12] border border-[#1A253A] space-y-2.5 text-xs font-mono animate-in fade-in duration-150">
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-[#64748B] block uppercase text-[8px] font-bold">OEM PART NUMBER</span>
                            <span className="text-[#D2FF00] font-bold">{part.part_number}</span>
                          </div>
                          <div>
                            <span className="text-[#64748B] block uppercase text-[8px] font-bold">TORQUE / FASTENER</span>
                            <span className="text-cyan-400 font-bold">{part.torqueSpec || part.spec.split("(")[0]}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[#64748B] block uppercase text-[8px] font-bold">METALLURGY / SUBSTRATE</span>
                            <span className="text-white font-bold">{part.substrate || part.material}</span>
                          </div>
                        </div>

                        {part.layers && part.layers.length > 0 && (
                          <div className="pt-2 border-t border-[#141C2B] text-[10px]">
                            <span className="text-[#64748B] block uppercase text-[8px] font-bold mb-1">
                              SUB-ASSEMBLY DECONSTRUCTION
                            </span>
                            <div className="space-y-1">
                              {part.layers.map((layer, idx) => (
                                <div key={idx} className="flex items-start gap-1.5 text-[#94A3B8]">
                                  <span className="text-[#D2FF00]">•</span>
                                  <span>
                                    <strong className="text-white">{layer.name}:</strong> {layer.desc}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ledger Footer Status */}
          <div className="px-5 py-3 bg-[#080B10] border-t border-[#1A2233] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#626E82]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
                TWO-WAY BLUEPRINT SYNCHRONIZATION ACTIVE
              </span>
              <span>•</span>
              <span>CLICK ANY CARD OR BADGE TO HIGHLIGHT CAD PIN</span>
            </div>
            <div className="text-[#8A95A8]">
              MONOCOQUE ARCHIVE TOLERANCE: <span className="text-white font-bold">±0.05 MM</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
