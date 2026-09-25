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
  Wind
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
import { ChassisSwitcher } from "@/components/navigation/chassis-switcher";
import { automotiveApi } from "@/lib/api";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const CAR_META: Record<string, BenchmarkCarMeta> = {
  "porsche-911-gt3-rs": {
    name: "PORSCHE 911 GT3 RS",
    subtitle: "992.1 Weissach Package Track Homologation",
    badge: "WEISSACH TRACK HOMOLOGATION",
    engine: "MA1.77 // 4.0L FLAT-6",
    engineSubtext: "Naturally Aspirated Direct Injection • Dry Sump",
    power: "525 PS (386 kW)",
    redline: "9,000 RPM",
    dryWeight: "1,450 kg (DIN)",
    aeroBalance: "860 kg @ 285 km/h",
    defaultCutaway: "/assets/porsche-gt3rs-knolling-teardown.jpg",
    cinematicHeroImageUrl: "/assets/porsche-gt3rs-hero.jpg",
    knollingTeardownImageUrl: "/assets/porsche-gt3rs-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,457 mm",
      trackFront: "1,630 mm",
      trackRear: "1,580 mm",
      overallLength: "4,572 mm",
      overallHeight: "1,322 mm"
    }
  },
  "bmw-m4-csl": {
    name: "BMW M4 CSL",
    subtitle: "G82 Competition Sport Lightweight (-100 kg)",
    badge: "CSL LIGHTWEIGHT HOMOLOGATION",
    engine: "S58B30T0 // 3.0L TWIN-TURBO",
    engineSubtext: "Closed-Deck Bi-Turbo I6 • 3D Printed Head Core",
    power: "550 PS (405 kW)",
    redline: "7,200 RPM",
    dryWeight: "1,625 kg (DIN)",
    aeroBalance: "220 kg @ 250 km/h",
    defaultCutaway: "/assets/bmw-m4-knolling-teardown.jpg",
    cinematicHeroImageUrl: "/assets/bmw-m4-hero.jpg",
    knollingTeardownImageUrl: "/assets/bmw-m4-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,857 mm",
      trackFront: "1,623 mm",
      trackRear: "1,608 mm",
      overallLength: "4,794 mm",
      overallHeight: "1,386 mm"
    }
  },
  "mclaren-f1-xp5": {
    name: "MCLAREN F1 (XP5)",
    subtitle: "Central Cockpit Le Mans Production Speed Record",
    badge: "LE MANS BENCHMARK HOMOLOGATION",
    engine: "BMW S70/2 // 6.1L 60° V12",
    engineSubtext: "Naturally Aspirated 48-Valve • Pure Gold Foil Bay",
    power: "627 PS (461 kW)",
    redline: "7,500 RPM",
    dryWeight: "1,138 kg (Dry)",
    aeroBalance: "Active Dynamic Brake Foil",
    defaultCutaway: "/assets/mclaren-f1-knolling-teardown.jpg",
    cinematicHeroImageUrl: "/assets/mclaren-f1-hero.jpg",
    knollingTeardownImageUrl: "/assets/mclaren-f1-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,718 mm",
      trackFront: "1,568 mm",
      trackRear: "1,472 mm",
      overallLength: "4,288 mm",
      overallHeight: "1,140 mm"
    }
  },
  "volkswagen-golf-r-mk8": {
    name: "VOLKSWAGEN GOLF R",
    subtitle: "Mk8 20 Years Edition • MQB Evo Architecture",
    badge: "20 YEARS HOMOLOGATION SPEC",
    engine: "EA888 GEN 4 // 2.0L TSI",
    engineSubtext: "Continental Turbocharged Direct Injection • 350 Bar",
    power: "320 PS (235 kW)",
    redline: "6,800 RPM",
    dryWeight: "1,551 kg (DIN)",
    aeroBalance: "R-Performance Aero Foil",
    defaultCutaway: "/assets/vw-golfr-knolling-teardown.jpg",
    cinematicHeroImageUrl: "/assets/vw-golfr-hero.jpg",
    knollingTeardownImageUrl: "/assets/vw-golfr-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,628 mm",
      trackFront: "1,539 mm",
      trackRear: "1,514 mm",
      overallLength: "4,290 mm",
      overallHeight: "1,458 mm"
    }
  },
  "ferrari-f40": {
    name: "FERRARI F40",
    subtitle: "Tipo F120AB Kevlar-Nomex Clamshell Homologation",
    badge: "TIPO F120AB HOMOLOGATION",
    engine: "TIPO F120A // 2.9L TT V8",
    engineSubtext: "Twin IHI Turbocharged 90° V8 • Behr Intercooled",
    power: "478 PS (352 kW)",
    redline: "7,750 RPM",
    dryWeight: "1,100 kg (Dry)",
    aeroBalance: "Fixed Composite Gurney Wing",
    defaultCutaway: "/assets/ferrari-f40-knolling-teardown.jpg",
    cinematicHeroImageUrl: "/assets/ferrari-f40-hero.jpg",
    knollingTeardownImageUrl: "/assets/ferrari-f40-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,450 mm",
      trackFront: "1,594 mm",
      trackRear: "1,606 mm",
      overallLength: "4,358 mm",
      overallHeight: "1,124 mm"
    }
  },
  "nissan-skyline-gtr-r34": {
    name: "NISSAN SKYLINE GT-R (R34)",
    subtitle: "V-Spec II Nürburgring Spec • ATTESA E-TS Pro AWD",
    badge: "V-SPEC II NÜRBURGRING HOMOLOGATION",
    engine: "RB26DETT // 2.6L TT I6",
    engineSubtext: "Twin Ceramic Turbochargers • 6 Individual Throttles",
    power: "280+ PS (206 kW)",
    redline: "8,000 RPM",
    dryWeight: "1,560 kg (DIN)",
    aeroBalance: "Carbon Ground Effect Diffuser",
    defaultCutaway: "/assets/skyline-r34-knolling-teardown.jpg",
    cinematicHeroImageUrl: "/assets/skyline-r34-hero.jpg",
    knollingTeardownImageUrl: "/assets/skyline-r34-knolling-teardown.jpg",
    dimensions: {
      wheelbase: "2,665 mm",
      trackFront: "1,480 mm",
      trackRear: "1,490 mm",
      overallLength: "4,600 mm",
      overallHeight: "1,360 mm"
    }
  }
};

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
    if (pinId !== null) {
      const cardEl = cardRefs.current[pinId];
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, []);

  // Handler: Ledger card clicked -> Illuminates pin with McLaren Papaya or Lime glow
  const handleCardClick = useCallback((partId: number) => {
    setSelectedCalloutId(partId);
    setGlowColor("papaya");
  }, []);

  return (
    <div className="min-h-screen bg-[#06080E] text-[#E2E8F0] selection:bg-[#D2FF00] selection:text-black flex flex-col font-sans relative overflow-x-hidden bg-cad-grid">
      {/* 1. TIER 1: MINIMALIST UTILITY NAVIGATION (HEIGHT: ~48PX) */}
      <header className="border-b border-[#161F30] bg-[#0B0F17]/95 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-4">
          {/* Left: Sleek back navigation link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#D2FF00] group-hover:-translate-x-1 transition-all" />
            <span className="tracking-wider uppercase">SHOWROOM / ARCHIVE</span>
          </Link>

          {/* Center: Compact & Scalable Chassis Switcher Dropdown */}
          <div className="flex-1 flex justify-center">
            <ChassisSwitcher currentSlug={carKey} />
          </div>

          {/* Right: Subtle CAD terminal metadata */}
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-500 tracking-wider shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] animate-pulse" />
            <span>MONOCOQUE CAD // ISO 7200</span>
          </div>
        </div>
      </header>

      {/* 2. MAIN CAD WORKSPACE STAGE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-6 w-full">
        {/* TIER 2: VEHICLE HERO IDENTITY & STAMPED ENGINE PLATE */}
        <section className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#161F30]">
          {/* Left Column: Hero Title, Subtitle, Homologation Badge */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              {/* Refined Red Homologation Pill */}
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border border-red-500/60 text-red-400 bg-red-500/10 shadow-[0_0_14px_rgba(239,68,68,0.25)]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {carInfo.badge}
              </span>
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                AUTOMOTIVE ANATOMY ARCHIVE // VIN #MQ-{carInfo.dimensions.wheelbase.replace(/\D/g, "")}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-sans tracking-tight text-white uppercase leading-none pt-1">
              {carInfo.name}
            </h1>

            <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">
              {carInfo.subtitle}
            </p>
          </div>

          {/* Right Column: Billet Aluminum Stamped VIN / Engine ID Plate */}
          <div className="relative rounded-xl border border-slate-700/60 bg-gradient-to-br from-[#141B28] via-[#0B0F19] to-[#06080E] p-4 sm:px-5 sm:py-3.5 shadow-2xl shrink-0 min-w-[280px] sm:min-w-[340px] overflow-hidden group">
            {/* Stamped Corner Rivets */}
            <span className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-500 border border-slate-300/40 shadow-inner" />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-500 border border-slate-300/40 shadow-inner" />
            <span className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-slate-500 border border-slate-300/40 shadow-inner" />
            <span className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-slate-500 border border-slate-300/40 shadow-inner" />

            {/* Subtle Stamped Metal Header Bar */}
            <div className="flex items-center justify-between text-[9px] font-mono font-bold tracking-wider text-slate-400 border-b border-slate-800/80 pb-1.5 mb-2">
              <span className="flex items-center gap-1.5 text-slate-400 uppercase">
                <Wrench className="w-3 h-3 text-[#D2FF00]" />
                ENGINE PLATFORM
              </span>
              <span className="text-slate-500 tracking-widest uppercase">OEM STAMPED</span>
            </div>

            {/* Engine Code in Electric Lime */}
            <div className="text-base sm:text-lg font-mono font-black text-[#D2FF00] tracking-wide">
              {carInfo.engine}
            </div>

            {/* Engine Subtext */}
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
              {carInfo.engineSubtext}
            </div>
          </div>
        </section>

        {/* TIER 3: FLOATING TELEMETRY HUD STRIP (4 CLEAN PILLARS) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
          {/* Column 1: OUTPUT */}
          <div className="group relative rounded-xl border border-white/10 hover:border-[#D2FF00]/50 bg-[#0D121D]/90 p-3.5 sm:p-4 shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <Zap className="w-3.5 h-3.5 text-[#D2FF00] group-hover:scale-110 transition-transform" />
                <span>OUTPUT</span>
              </div>
              <span className="text-[9px] text-[#D2FF00] bg-[#D2FF00]/10 border border-[#D2FF00]/30 px-1.5 py-0.2 rounded font-bold">
                PEAK
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black text-white mt-1.5 tracking-tight">
              {carInfo.power}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Peak Track Power
            </div>
            {/* Plain English tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full left-0 right-0 mb-2 p-2.5 rounded-lg bg-[#05070A]/95 border border-[#1E2536] text-[11px] text-slate-300 font-sans z-30 pointer-events-none shadow-2xl">
              Maximum continuous mechanical work delivered to the driveline.
            </div>
          </div>

          {/* Column 2: REDLINE */}
          <div className="group relative rounded-xl border border-white/10 hover:border-cyan-400/50 bg-[#0D121D]/90 p-3.5 sm:p-4 shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <Gauge className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>REDLINE</span>
              </div>
              {/* Mini glowing tachometer arc micro-indicator */}
              <svg className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 16 A 8 8 0 0 1 20 16" strokeDasharray="2 2" />
                <line x1="12" y1="16" x2="17" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-lg sm:text-xl font-black text-cyan-400 mt-1.5 tracking-tight">
              {carInfo.redline}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Maximum Engine Speed
            </div>
            {/* Plain English tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full left-0 right-0 mb-2 p-2.5 rounded-lg bg-[#05070A]/95 border border-[#1E2536] text-[11px] text-slate-300 font-sans z-30 pointer-events-none shadow-2xl">
              Peak rotational engine crankshaft limit before ignition cut to protect the valvetrain.
            </div>
          </div>

          {/* Column 3: CURB WEIGHT */}
          <div className="group relative rounded-xl border border-white/10 hover:border-amber-400/50 bg-[#0D121D]/90 p-3.5 sm:p-4 shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <Scale className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>CURB WEIGHT</span>
              </div>
              <span className="text-[9px] text-amber-400 bg-amber-400/10 border border-amber-400/30 px-1.5 py-0.2 rounded font-bold">
                DIN
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black text-amber-400 mt-1.5 tracking-tight">
              {carInfo.dryWeight}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              DIN Unladen Weight
            </div>
            {/* Plain English tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full left-0 right-0 mb-2 p-2.5 rounded-lg bg-[#05070A]/95 border border-[#1E2536] text-[11px] text-slate-300 font-sans z-30 pointer-events-none shadow-2xl">
              Complete vehicle mass with 90% fuel and all operating fluids ready for track operation.
            </div>
          </div>

          {/* Column 4: DOWNFORCE */}
          <div className="group relative rounded-xl border border-white/10 hover:border-red-400/50 bg-[#0D121D]/90 p-3.5 sm:p-4 shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <Flame className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                <span>DOWNFORCE</span>
              </div>
              {/* Aero Wind Chevron */}
              <div className="flex items-center text-[9px] text-red-400 bg-red-400/10 border border-red-400/30 px-1.5 py-0.2 rounded font-bold gap-0.5">
                <Wind className="w-2.5 h-2.5" />
                <span>AERO</span>
              </div>
            </div>
            <div className="text-lg sm:text-xl font-black text-red-400 mt-1.5 tracking-tight truncate">
              {carInfo.aeroBalance}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              High-Speed Aero Load
            </div>
            {/* Plain English tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-full left-0 right-0 mb-2 p-2.5 rounded-lg bg-[#05070A]/95 border border-[#1E2536] text-[11px] text-slate-300 font-sans z-30 pointer-events-none shadow-2xl">
              Generates enough negative lift to pin the car firmly through high-speed track curves.
            </div>
          </div>
        </section>
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
        <section className="rounded-2xl border border-white/10 bg-[#0D121D]/95 overflow-hidden shadow-2xl font-mono">
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
                      ? "bg-[#111724] border-[#D2FF00] shadow-[0_0_25px_rgba(210,255,0,0.35)] ring-2 ring-[#D2FF00] scale-[1.01]"
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
                            ? "bg-[#D2FF00] text-black shadow-[0_0_15px_#D2FF00] scale-110 border border-white"
                            : "bg-[#121824] text-[#D2FF00] border border-[#D2FF00]/40"
                        }`}
                      >
                        {part.num}
                      </span>

                      {/* Common Name */}
                      <div>
                        <h3 className={`text-sm font-bold font-sans transition-colors leading-snug ${isHovered ? "text-[#D2FF00]" : "text-white group-hover:text-[#D2FF00]"}`}>
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
