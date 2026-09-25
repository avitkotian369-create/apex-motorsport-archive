"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  Search,
  ShieldAlert,
  Compass,
  CheckCircle2,
  ChevronRight,
  Database,
  Wind,
  Layers,
  Cpu
} from "lucide-react";
import { VEHICLE_ROSTER } from "@/data/vehicle-roster";
import { CadTerminalCard } from "@/components/blueprint/cad-terminal-card";
import { RevPreloader } from "@/components/preloader/rev-preloader";
import { Hero } from "@/components/hero/hero";

interface EditorialArticle {
  id: string;
  number: string;
  tag: string;
  tagColor: string;
  title: string;
  readTime: string;
  summary: string;
  author: string;
  bulletPoints: string[];
  specs: { label: string; value: string }[];
}

const EDITORIAL_FEED: EditorialArticle[] = [
  {
    id: "crankshaft-kinematics",
    number: "01",
    tag: "DAILY CAR & MOTORSPORT INSIGHT",
    tagColor: "text-[#D2FF00] border-[#D2FF00]/40 bg-[#D2FF00]/10",
    title: "Flat-Plane vs. Cross-Plane Crankshaft Harmonics, Secondary Balance & Scavenging",
    readTime: "4 MIN READ",
    summary:
      "Why 180° flat-plane configurations spool effortlessly to 9,000 RPM with 35% lower rotational inertia, and how secondary order vertical shaking forces are mitigated via hollow titanium rods and dry-sump dampening.",
    author: "Powertrain Dynamics Lab",
    bulletPoints: [
      "Cross-plane counterweights add parasitic rotating mass; 180° flat journals shed 18 kg inertia.",
      "Even-firing alternate exhaust pulses eliminate exhaust pulse collision for optimal scavenging.",
      "Inherent secondary imbalance at 2x engine speed is absorbed via high-rigidity structural bedplates."
    ],
    specs: [
      { label: "REV CEILING", value: "9,000 RPM" },
      { label: "CRANKPIN OFFSET", value: "180° FLAT" },
      { label: "ROTATIONAL DELTA", value: "-35% INERTIA" }
    ]
  },
  {
    id: "chassis-safety-geometry",
    number: "02",
    tag: "CHASSIS DYNAMICS & TRACK SAFETY",
    tagColor: "text-[#FF8000] border-[#FF8000]/40 bg-[#FF8000]/10",
    title: "Roll-Cage Node Triangulation, Harness Angles & Sustained Brake Boiling Points",
    readTime: "5 MIN READ",
    summary:
      "Deconstructing structural load distribution under 4.2G apex compression, critical 10°–20° harness departure geometry, and fluid compressibility thresholds under 750°C carbon-ceramic rotor loads.",
    author: "Safety & Chassis Engineering",
    bulletPoints: [
      "Node-to-node gusset triangulation increases chassis torsional rigidity by up to 140%.",
      "Harness shoulder belts must maintain a 10° to 20° downward angle to prevent spinal compression.",
      "High dry boiling point racing fluid (>325°C) prevents vapor lock under repetitive 250 km/h braking."
    ],
    specs: [
      { label: "HARNESS ANGLE", value: "10° - 20°" },
      { label: "TORSIONAL GAIN", value: "+140% kNm/deg" },
      { label: "DRY BOILING PT", value: "> 325°C" }
    ]
  },
  {
    id: "performance-laptime-science",
    number: "03",
    tag: "PERFORMANCE MODIFICATION GUIDE",
    tagColor: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
    title: "Unsprung Rotational Mass ROI vs. Static Horsepower & Dynamic Camber Curves",
    readTime: "6 MIN READ",
    summary:
      "Why reducing 1 kg of wheel and brake rotor mass equals a 4x kinetic inertia reduction during acceleration and braking, and how elastokinematic camber recovery dictates contact patch grip.",
    author: "Aerodynamics & Setup Team",
    bulletPoints: [
      "Forged magnesium/aluminum wheels dramatically reduce shock damper velocity overload.",
      "Dynamic camber compliance bushings prevent outer tire shoulder roll scrub under sustained apex G.",
      "Bolt-on cold-air intakes yield minimal delta compared to proper heat shielding and brake ducting."
    ],
    specs: [
      { label: "UNSPRUNG RATIO", value: "1 kg : 4 kg" },
      { label: "OPTIMAL STATIC CAMBER", value: "-2.8° FRONT" },
      { label: "ROTATING MASS", value: "-14.4 kg FORGED" }
    ]
  }
];

export default function MotorsportHomePage() {
  // 1. Launch Control Preloader State
  const [loading, setLoading] = useState(true);

  // Search & filter state (Mechanical DNA + Marque Brand)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  const deckRef = useRef<HTMLDivElement>(null);
  const dispatchRef = useRef<HTMLElement>(null);

  const scrollToVehicles = () => {
    if (deckRef.current) {
      deckRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDispatch = () => {
    if (dispatchRef.current) {
      dispatchRef.current.scrollIntoView({ behavior: "smooth" });
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

      {/* 3. Hero Section with Blueprint Grid & Watermark Typography */}
      <Hero
        onExploreClick={scrollToVehicles}
        onDispatchClick={scrollToDispatch}
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

      {/* 5. TOP 4 TELEMETRY SPEC MODULES (Positioned directly above Anatomy & Dynamics archives) */}
      <section className="pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Module 1: SCHEMATICS DATABASE */}
          <div className="bg-[#0B0F17] border border-white/10 p-5 rounded-lg flex flex-col justify-between hover:border-[#D2FF00]/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-[#8C98AC]">
              <div className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Database className="w-3.5 h-3.5 text-[#D2FF00]" />
                <span>SCHEMATICS DATABASE</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-pulse" />
            </div>
            <div className="mt-3">
              <div className="text-xl font-black text-white font-mono">HOMOLOGATION CAD</div>
              <div className="text-xs font-mono text-[#D2FF00] mt-1 flex items-center gap-1.5">
                <span>●</span> GT3 RS & MK8 GOLF R
              </div>
            </div>
          </div>

          {/* Module 2: AERO DOWNFORCE */}
          <div className="bg-[#0B0F17] border border-white/10 p-5 rounded-lg flex flex-col justify-between hover:border-cyan-400/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-[#8C98AC]">
              <div className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Wind className="w-3.5 h-3.5 text-cyan-400" />
                <span>AERO DOWNFORCE</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="mt-3">
              <div className="text-xl font-black text-white font-mono">860 KG @ 285 KM/H</div>
              <div className="text-xs font-mono text-cyan-400 mt-1 flex items-center gap-1.5">
                <span>●</span> ACTIVE HYDRAULIC DRS
              </div>
            </div>
          </div>

          {/* Module 3: ALLOY CHEMISTRY */}
          <div className="bg-[#0B0F17] border border-white/10 p-5 rounded-lg flex flex-col justify-between hover:border-[#FF8000]/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-[#8C98AC]">
              <div className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-[#FF8000]" />
                <span>ALLOY CHEMISTRY</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#FF8000] animate-pulse" />
            </div>
            <div className="mt-3">
              <div className="text-xl font-black text-white font-mono">AZ31B & TI-6AL-4V</div>
              <div className="text-xs font-mono text-amber-400 mt-1 flex items-center gap-1.5">
                <span>●</span> FULL TRACEABILITY
              </div>
            </div>
          </div>

          {/* Module 4: SUBSYSTEM ISOLATION */}
          <div className="bg-[#0B0F17] border border-white/10 p-5 rounded-lg flex flex-col justify-between hover:border-emerald-400/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-[#8C98AC]">
              <div className="flex items-center gap-1.5 uppercase font-bold tracking-wider">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                <span>SUBSYSTEM ISOLATION</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="mt-3">
              <div className="text-xl font-black text-white font-mono">3 ISOLATED TIERS</div>
              <div className="text-xs font-mono text-emerald-400 mt-1 flex items-center gap-1.5">
                <span>●</span> CHASSIS • ENGINE • CABIN
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DAILY MOTORSPORT ENGINEERING & MODIFICATION DISPATCH (ANATOMY, DYNAMICS & SETUP ARCHIVES) */}
      <section
        id="daily-editorial"
        ref={dispatchRef}
        className="py-12 bg-[#06070A] bg-kerb-stripes border-y border-white/10 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-[#D2FF00] font-mono text-xs font-bold tracking-widest uppercase mb-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
                DAILY MOTORSPORT ENGINEERING & MODIFICATION DISPATCH
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                ANATOMY, DYNAMICS & SETUP ARCHIVES
              </h2>
            </div>
            <p className="text-xs font-mono text-[#717A8C] max-w-md leading-relaxed">
              Curated by race engineers, powertrain tuners, and chassis dynamics specialists. Strictly component physics,
              fastener tolerances, and track lap-time ROI.
            </p>
          </div>

          {/* Dynamic 3-Column Editorial Grid with Expanding Hover States */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {EDITORIAL_FEED.map((article) => {
              const isExpanded = expandedArticleId === article.id;
              return (
                <div
                  key={article.id}
                  onMouseEnter={() => setExpandedArticleId(article.id)}
                  onMouseLeave={() => setExpandedArticleId(null)}
                  className={`bg-[#0D121D] border rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group shadow-xl ${
                    isExpanded
                      ? "border-[#D2FF00] bg-[#0E1524] shadow-[0_0_30px_rgba(210,255,0,0.15)] -translate-y-1"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#6B788E]">{article.number}</span>
                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${article.tagColor}`}>
                          {article.tag}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#626E82]">{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#D2FF00] transition-colors leading-snug mb-3">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#909CB0] leading-relaxed mb-6 font-normal">
                      {article.summary}
                    </p>

                    <div className="grid grid-cols-3 gap-2 mb-6 p-2.5 bg-[#080A10] rounded-lg border border-[#171C27] text-center font-mono">
                      {article.specs.map((s, idx) => (
                        <div key={idx}>
                          <div className="text-[8px] text-[#606D82] uppercase">{s.label}</div>
                          <div className="text-[11px] font-bold text-white mt-0.5">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2.5 mb-6 border-t border-[#181E2B] pt-4">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#D2FF00] font-bold">
                        Mechanical Insights
                      </div>
                      {article.bulletPoints.map((bp, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-[#A6B2C4] leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D2FF00] shrink-0 mt-0.5" />
                          <span>{bp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#161B26] flex items-center justify-between text-xs font-mono text-[#6E7B91]">
                    <span>{article.author}</span>
                    <span className="group-hover:translate-x-1.5 transition-transform text-white font-bold flex items-center gap-1 text-xs">
                      READ DOSSIER <ChevronRight className="w-3.5 h-3.5 text-[#D2FF00]" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. GLOWING NEON WARNING TICKER (Directly above vehicle catalog transition) */}
      <div className="w-full bg-[#D2FF00] py-2.5 shadow-[0_0_30px_rgba(210,255,0,0.3)] overflow-hidden select-none relative z-20">
        <div className="animate-marquee-infinite whitespace-nowrap text-black font-black text-sm tracking-widest uppercase">
          <span className="mx-4">CARBON MONOCOQUE DISSECTION /// 860 KG ACTIVE DRS DOWNFORCE /// EA888 TSI 4MOTION /// APEX MOTORSPORT CAD ARCHIVE /// 9,000 RPM FLAT-6 /// FIA HOMOLOGATED VEHICLES ///</span>
          <span className="mx-4">CARBON MONOCOQUE DISSECTION /// 860 KG ACTIVE DRS DOWNFORCE /// EA888 TSI 4MOTION /// APEX MOTORSPORT CAD ARCHIVE /// 9,000 RPM FLAT-6 /// FIA HOMOLOGATED VEHICLES ///</span>
          <span className="mx-4">CARBON MONOCOQUE DISSECTION /// 860 KG ACTIVE DRS DOWNFORCE /// EA888 TSI 4MOTION /// APEX MOTORSPORT CAD ARCHIVE /// 9,000 RPM FLAT-6 /// FIA HOMOLOGATED VEHICLES ///</span>
          <span className="mx-4">CARBON MONOCOQUE DISSECTION /// 860 KG ACTIVE DRS DOWNFORCE /// EA888 TSI 4MOTION /// APEX MOTORSPORT CAD ARCHIVE /// 9,000 RPM FLAT-6 /// FIA HOMOLOGATED VEHICLES ///</span>
        </div>
      </div>

      {/* 8. PADDOCK CAD MOUSE SCROLL PROMPT */}
      <div
        onClick={scrollToVehicles}
        className="py-14 flex flex-col items-center justify-center text-center cursor-pointer group select-none relative z-10 transition-transform duration-300 hover:scale-105"
      >
        <span className="text-xs font-mono tracking-widest text-[#D2FF00] uppercase mb-3.5 group-hover:text-white transition-colors">
          — SCROLL TO ENTER PADDOCK CAD DARKROOM —
        </span>

        {/* Illuminated Computer Mouse Contour with animated pulsing lime scroll wheel */}
        <div className="w-6 h-10 border-2 border-[#2C364A] group-hover:border-[#D2FF00] rounded-full flex items-start justify-center p-1.5 transition-colors shadow-[0_0_15px_rgba(210,255,0,0.2)]">
          <div className="w-1 h-2 bg-[#D2FF00] rounded-full animate-mouse-wheel" />
        </div>

        {/* Subtle Bouncing Chevron */}
        <span className="text-[#D2FF00] group-hover:text-white mt-2 font-mono text-sm leading-none animate-bounce">
          ⌄
        </span>
      </div>

      {/* 9. FACTORY CAD INSPECTION REGISTRY & VEHICLE SCHEMATICS */}
      <section
        id="vehicle-cad-deck"
        ref={deckRef}
        className="pt-6 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10"
      >
        {/* Sticky Search & Brand Filter Bar */}
        <div className="sticky top-16 z-30 bg-[#07090E]/95 border border-white/10 p-6 rounded-2xl shadow-2xl mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono text-[#D2FF00] font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <span>[ 02. FACTORY CAD INSPECTION REGISTRY ]</span>
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

          {/* Styled Terminal Input with Subtle Inner Glow */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by chassis code, model, or engine (e.g. GT3, M4 CSL, S58, V12, F40, RB26, EA888)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#07090E] border border-white/15 focus:border-[#D2FF00] rounded-xl text-sm text-slate-200 placeholder:text-slate-600 font-mono transition-colors shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] outline-none"
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
              { label: "ALL SCHEMATICS", value: null },
              { label: "PORSCHE", value: "Porsche" },
              { label: "VOLKSWAGEN", value: "Volkswagen" },
              { label: "MCLAREN", value: "McLaren" },
              { label: "FERRARI", value: "Ferrari" },
              { label: "BMW", value: "BMW" },
              { label: "NISSAN", value: "Nissan" }
            ].map((pill) => {
              const isActive = selectedBrand === pill.value;
              return (
                <button
                  key={pill.label}
                  onClick={() => setSelectedBrand(pill.value)}
                  className={`px-4 py-1.5 rounded-md text-xs font-mono uppercase transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#D2FF00] text-black font-bold shadow-[0_0_15px_rgba(210,255,0,0.4)]"
                      : "bg-[#10141D] hover:bg-white/10 text-slate-300 border border-white/5"
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

      {/* 8. Footer */}
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
