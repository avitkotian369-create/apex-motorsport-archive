"use client";

import React, { useState, useMemo, useRef, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  X,
  Zap,
  Gauge,
  ShieldAlert,
  Flame,
  Scale,
  Compass,
  Move,
  FileText,
  Wrench
} from "lucide-react";
import {
  EPC_SUSPENSION_EXPLODED_PINS,
  EPC_CYLINDER_EXPLODED_PINS,
  EPC_MONOCOQUE_EXPLODED_PINS,
  MCLAREN_F1_MONOCOQUE_EXPLODED_PINS,
  TargetCallout
} from "@/lib/pins-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface BenchmarkCarMeta {
  name: string;
  badge: string;
  engine: string;
  power: string;
  redline: string;
  dryWeight: string;
  aeroBalance: string;
  defaultCutaway: string;
  dimensions: {
    wheelbase: string;
    trackFront: string;
    trackRear: string;
    overallLength: string;
    overallHeight: string;
  };
}

const CAR_META: Record<string, BenchmarkCarMeta> = {
  "porsche-911-gt3-rs": {
    name: "PORSCHE 911 GT3 RS (992.1)",
    badge: "WEISSACH HOMOLOGATION",
    engine: "4.0L FLAT-6 NA (MA1.77)",
    power: "525 PS (386 kW)",
    redline: "9,000 RPM",
    dryWeight: "1,450 kg (DIN)",
    aeroBalance: "860 kg @ 285 km/h",
    defaultCutaway: "/assets/porsche-gt3rs-cutaway.jpg",
    dimensions: {
      wheelbase: "2,457 mm",
      trackFront: "1,630 mm",
      trackRear: "1,580 mm",
      overallLength: "4,572 mm",
      overallHeight: "1,322 mm"
    }
  },
  "volkswagen-golf-r-mk8": {
    name: "VOLKSWAGEN GOLF R (MK8)",
    badge: "MQB EVO 4MOTION",
    engine: "2.0L TSI TURBO (EA888 GEN 4)",
    power: "320 PS (235 kW)",
    redline: "6,800 RPM",
    dryWeight: "1,551 kg (DIN)",
    aeroBalance: "High-Speed Aero Foil",
    defaultCutaway: "/assets/vw-golfr-cutaway.jpg",
    dimensions: {
      wheelbase: "2,628 mm",
      trackFront: "1,539 mm",
      trackRear: "1,514 mm",
      overallLength: "4,290 mm",
      overallHeight: "1,458 mm"
    }
  },
  "mclaren-f1-xp5": {
    name: "MCLAREN F1 (XP5)",
    badge: "CARBON MONOCOQUE BENCHMARK",
    engine: "6.1L BMW S70/2 60° V12",
    power: "627 PS (461 kW)",
    redline: "7,500 RPM",
    dryWeight: "1,138 kg (Dry)",
    aeroBalance: "Active Pop-Up Brake Foil",
    defaultCutaway: "/assets/mclaren-f1-cutaway.jpg",
    dimensions: {
      wheelbase: "2,718 mm",
      trackFront: "1,568 mm",
      trackRear: "1,472 mm",
      overallLength: "4,288 mm",
      overallHeight: "1,140 mm"
    }
  },
  "ferrari-f40": {
    name: "FERRARI F40 (TIPO F120A)",
    badge: "KEVLAR TUBULAR HOMOLOGATION",
    engine: "2.9L TWIN-TURBO 90° V8",
    power: "478 PS (352 kW)",
    redline: "7,750 RPM",
    dryWeight: "1,100 kg (Dry)",
    aeroBalance: "Fixed Composite Gurney Wing",
    defaultCutaway: "/assets/ferrari-f40-cutaway.jpg",
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
    badge: "ATTESA E-TS PRO V-SPEC II",
    engine: "2.6L TWIN-TURBO RB26DETT",
    power: "280+ PS (206 kW)",
    redline: "8,000 RPM",
    dryWeight: "1,560 kg (DIN)",
    aeroBalance: "Carbon Ground Effect Diffuser",
    defaultCutaway: "/assets/skyline-r34-cutaway.jpg",
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

  // Resolve matching car metadata
  const carKey = useMemo(() => {
    if (rawSlug.includes("golf") || rawSlug.includes("vw")) return "volkswagen-golf-r-mk8";
    if (rawSlug.includes("mclaren") || rawSlug.includes("f1")) return "mclaren-f1-xp5";
    if (rawSlug.includes("ferrari") || rawSlug.includes("f40")) return "ferrari-f40";
    if (rawSlug.includes("skyline") || rawSlug.includes("r34") || rawSlug.includes("gtr")) return "nissan-skyline-gtr-r34";
    return "porsche-911-gt3-rs";
  }, [rawSlug]);

  const carInfo = CAR_META[carKey] || CAR_META["porsche-911-gt3-rs"];

  // Standardized 3 Sub-Assembly Viewports for EVERY Vehicle:
  // [ 01. CHASSIS & AERO MONOCOQUE ] | [ 02. POWERTRAIN & VALVETRAIN ] | [ 03. SUSPENSION & CORNER HUB ]
  const [assemblyStage, setAssemblyStage] = useState<"monocoque" | "cylinder" | "suspension">("monocoque");
  const [selectedCalloutId, setSelectedCalloutId] = useState<number | null>(null);
  const [hoveredCalloutId, setHoveredCalloutId] = useState<number | null>(null);
  const [activePeelIndex, setActivePeelIndex] = useState<number>(0);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [caliperMeasurement, setCaliperMeasurement] = useState<boolean>(false);
  const [datumPoints, setDatumPoints] = useState<{ p1: { x: number; y: number }; p2: { x: number; y: number } }>({
    p1: { x: 28, y: 72 },
    p2: { x: 74, y: 72 }
  });
  const [draggingDatum, setDraggingDatum] = useState<"p1" | "p2" | null>(null);
  const [cursorCoords, setCursorCoords] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Standardized 16:9 Axial Exploded Blueprint Asset Mapping with Graceful Fallback
  const targetStageImage = useMemo(() => {
    if (carKey === "mclaren-f1-xp5" && assemblyStage === "monocoque") {
      return "/assets/mclaren-f1-monocoque-exploded-v2.jpg";
    }
    if (assemblyStage === "monocoque") return "/assets/monocoque-exploded-v2.jpg";
    if (assemblyStage === "cylinder") return "/assets/cylinder-exploded-v2.jpg";
    return "/assets/suspension-exploded-v2.jpg";
  }, [carKey, assemblyStage]);

  const [activeImageSrc, setActiveImageSrc] = useState<string>(targetStageImage);

  useEffect(() => {
    setActiveImageSrc(targetStageImage);
  }, [targetStageImage]);

  // ELECTRONIC PARTS CATALOG (EPC) MULTI-CAR SYNCHRONIZED CALLOUTS:
  // Seeded across all 5 vehicles with genuine OEM nomenclature and metallurgical specs
  const currentPins: TargetCallout[] = useMemo(() => {
    let basePins = EPC_MONOCOQUE_EXPLODED_PINS;
    if (assemblyStage === "cylinder") basePins = EPC_CYLINDER_EXPLODED_PINS;
    if (assemblyStage === "suspension") basePins = EPC_SUSPENSION_EXPLODED_PINS;

    // Vehicle-Specific Adaptation
    if (carKey === "volkswagen-golf-r-mk8") {
      return basePins.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let rationale = p.rationale.replace("992", "Golf R Mk8").replace("9,000 RPM", "6,800 RPM");
        if (p.id === 3001) {
          name = "MQB Evo Hot-Formed Boron Steel & Aluminum Unibody";
          substrate = "1500 MPa Boron Steel / 6000 Al";
          rationale = "High-tensile unibody core with hot-formed boron A/B pillars delivering 34,000 Nm/deg torsional stiffness for 4MOTION R-Performance torque vectoring.";
        } else if (p.id === 3002) {
          name = "Golf R Aero Front Splitter with Brake Cooling Ducts";
          substrate = "High-Impact Thermoplastic / PUR";
        } else if (p.id === 3004) {
          name = "Club-Sport FIA 25CrMo4 Chrome-Moly Safety Half-Cage";
          substrate = "25CrMo4 Seamless Tubing";
        } else if (p.id === 3005) {
          name = "R-Performance Dual-Tier Roof Spoiler Foil";
          substrate = "Lightweight RIM Polyurethane";
        } else if (p.id === 1001) {
          name = "DCC Adaptive Dynamic Chassis Control Strut Assembly";
          substrate = "Hard-Chromed Micro-Alloy Steel";
        }
        return {
          ...p,
          name,
          substrate,
          part_number: p.part_number
            .replace("992-", "5WA-")
            .replace("-GT", "-MK8")
            .replace("-TTX", "-DCC")
            .replace("-TUB", "-MQB")
            .replace("-BRG", "-EA888")
            .replace("-PCCB", "-R357"),
          rationale
        };
      });
    }

    if (carKey === "mclaren-f1-xp5") {
      if (assemblyStage === "monocoque") {
        return MCLAREN_F1_MONOCOQUE_EXPLODED_PINS;
      }
      return basePins.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        const rationale = p.rationale.replace("992", "McLaren F1 XP5").replace("9,000 RPM", "7,500 RPM");
        if (p.id === 2005) {
          name = "BMW Motorsport S70/2 Pankl Titanium H-Beam Connecting Rods";
          substrate = "Ti-6Al-4V Grade 5 Titanium";
        } else if (p.id === 1001) {
          name = "Bespoke Bilstein Monotube Racing Coilover with Eibach Springs";
          substrate = "Hard-Anodized Aluminum / Cr-Si";
        }
        return {
          ...p,
          name,
          substrate,
          part_number: p.part_number
            .replace("992-", "XP5-F1-")
            .replace("-GT", "-XP5")
            .replace("-TTX", "-BILSTEIN")
            .replace("-TUB", "-CF-MONO")
            .replace("-BRG", "-S70-BRG")
            .replace("-PCCB", "-BREMBO"),
          rationale
        };
      });
    }

    if (carKey === "ferrari-f40") {
      return basePins.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        const rationale = p.rationale.replace("992", "Ferrari F40 Tipo F120A").replace("9,000 RPM", "7,750 RPM");
        if (p.id === 3001) {
          name = "Tubular Steel Spaceframe with Bonded Kevlar / Carbon Panels";
          substrate = "25CrMo4 Steel Trusses & Kevlar";
        } else if (p.id === 3005) {
          name = "High-Downforce Fixed Composite Rear Gurney Wing";
          substrate = "Carbon-Kevlar Composite";
        } else if (p.id === 2003) {
          name = "Mahle Forged Aluminum Pistons with Ceramic Crown Coating";
          substrate = "Mahle 124 Forged Alloy";
        } else if (p.id === 1001) {
          name = "Koni Twin-Tube Motorsport Shock Absorbers with Coil Springs";
          substrate = "Tempered Steel & Aluminum";
        }
        return {
          ...p,
          name,
          substrate,
          part_number: p.part_number
            .replace("992-", "120A-")
            .replace("-GT", "-F40")
            .replace("-TTX", "-KONI")
            .replace("-TUB", "-TUBOLARE")
            .replace("-BRG", "-F120-BRG")
            .replace("-PCCB", "-BREMBO-F40"),
          rationale
        };
      });
    }

    if (carKey === "nissan-skyline-gtr-r34") {
      return basePins.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let rationale = p.rationale.replace("992", "Nissan Skyline GT-R R34 V-Spec II").replace("9,000 RPM", "8,000 RPM");
        if (p.id === 3001) {
          name = "High-Rigidity V-Spec II Galvanized Steel Unibody with Seam Welds";
          substrate = "Galvanized Steel / Carbon Tunnel";
          rationale = "Factory V-Spec II platform with reinforced front strut towers, underfloor bracing, and full dry-carbon aerodynamic underbody tunnel.";
        } else if (p.id === 3003) {
          name = "V-Spec II OEM Autoclaved Dry-Carbon Ground Effect Diffuser";
          substrate = "Pre-Preg Dry Carbon Fiber";
        } else if (p.id === 2006) {
          name = "Nismo Micro-Finished Forged Connecting Rods (RB26DETT)";
          substrate = "SNCM439 Nickel-Chrome Moly";
        } else if (p.id === 1001) {
          name = "Nismo S-Tune Inverted Monotube Coilover Assembly";
          substrate = "Inverted Steel Strut Body";
        }
        return {
          ...p,
          name,
          substrate,
          part_number: p.part_number
            .replace("992-", "NIS-R34-")
            .replace("-GT", "-RB26")
            .replace("-TTX", "-NISMO")
            .replace("-TUB", "-VSPEC2")
            .replace("-BRG", "-RB-BRG")
            .replace("-PCCB", "-BREMBO-R34"),
          rationale
        };
      });
    }

    return basePins;
  }, [carKey, assemblyStage]);

  // Active callout (defaults to first pin of current assembly)
  const activeCallout = useMemo(() => {
    if (selectedCalloutId) {
      const found = currentPins.find((p) => p.id === selectedCalloutId);
      if (found) return found;
    }
    return currentPins[0] || null;
  }, [currentPins, selectedCalloutId]);

  // Coordinate tracking & draggable datum handles for millimeter laser precision
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    const cur = { x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(1)) };
    setCursorCoords(cur);

    if (draggingDatum) {
      setDatumPoints((prev) => ({
        ...prev,
        [draggingDatum]: cur
      }));
    }
  };

  const handleMouseUp = () => {
    if (draggingDatum) {
      setDraggingDatum(null);
    }
  };

  const handleMouseLeave = () => {
    setCursorCoords(null);
    setDraggingDatum(null);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#E2E8F0] selection:bg-[#D2FF00] selection:text-black flex flex-col font-sans relative overflow-x-hidden bg-cad-grid">
      {/* 1. TOP COCKPIT NAVIGATION */}
      <header className="border-b border-[#1E2536] bg-[#090C12]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Back Breadcrumb & Active Car Badge */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#222A3B] hover:border-[#D2FF00] bg-[#0E131E] text-xs font-mono font-bold text-[#A6B2C4] hover:text-[#D2FF00] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#D2FF00]" />
              <span>EXIT TO FACTORY ARCHIVE</span>
            </Link>

            <div className="h-6 w-[1px] bg-[#1E2536] hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-black text-white uppercase tracking-wider">
                  {carInfo.name}
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-[#D2FF00]/10 text-[#D2FF00] border border-[#D2FF00]/30">
                  {carInfo.badge}
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#637085] hidden md:block">
                STANDARDIZED CAD BLUEPRINT DARKROOM • ISO 7200 STANDARDS
              </div>
            </div>
          </div>

          {/* Live Telemetry Strip */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-xs">
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

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0E131E] border border-[#1E2536]">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[#647087]">AERO:</span>
              <span className="text-emerald-400 font-bold">{carInfo.aeroBalance}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CAD WORKSPACE STAGE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col space-y-4 w-full">
        {/* Viewport Switcher & Measurement Caliper Bar */}
        <div className="px-5 py-3 rounded-2xl border border-[#1E2536] bg-[#0A0D15]/90 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
          {/* Sub-Assembly Switcher Tabs - Unified Across ALL Vehicles */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0E131E] border border-[#1E2536] overflow-x-auto scrollbar-none">
            <button
              onClick={() => {
                setAssemblyStage("monocoque");
                setSelectedCalloutId(null);
                setHoveredCalloutId(null);
                setActivePeelIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                assemblyStage === "monocoque"
                  ? "bg-[#D2FF00] text-black shadow-[0_0_12px_rgba(210,255,0,0.4)]"
                  : "text-[#8A95A8] hover:text-white"
              }`}
            >
              [ 01. CHASSIS & AERO MONOCOQUE ]
            </button>
            <button
              onClick={() => {
                setAssemblyStage("cylinder");
                setSelectedCalloutId(null);
                setHoveredCalloutId(null);
                setActivePeelIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                assemblyStage === "cylinder"
                  ? "bg-[#D2FF00] text-black shadow-[0_0_12px_rgba(210,255,0,0.4)]"
                  : "text-[#8A95A8] hover:text-white"
              }`}
            >
              [ 02. POWERTRAIN & VALVETRAIN ]
            </button>
            <button
              onClick={() => {
                setAssemblyStage("suspension");
                setSelectedCalloutId(null);
                setHoveredCalloutId(null);
                setActivePeelIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                assemblyStage === "suspension"
                  ? "bg-[#D2FF00] text-black shadow-[0_0_12px_rgba(210,255,0,0.4)]"
                  : "text-[#8A95A8] hover:text-white"
              }`}
            >
              [ 03. SUSPENSION & CORNER HUB ]
            </button>
          </div>

          {/* Caliper Measurement Toggle & Datum Readout */}
          <div className="flex items-center gap-2.5 text-xs">
            {/* Interactive Caliper Measurement Toggle */}
            <button
              onClick={() => setCaliperMeasurement(!caliperMeasurement)}
              className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                caliperMeasurement
                  ? "bg-[#FF8000] text-black border-[#FF8000] shadow-[0_0_15px_rgba(255,128,0,0.4)]"
                  : "bg-[#0E131E] border-[#222A3B] text-[#A6B2C4] hover:border-[#FF8000] hover:text-[#FF8000]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>CALIPER MEASUREMENT {caliperMeasurement ? "[ON]" : "[OFF]"}</span>
            </button>

            <div className="text-[#647087] text-[11px] mr-2">
              DATUM: <span className="text-[#D2FF00] font-bold">{cursorCoords ? `X:${cursorCoords.x.toFixed(1)}% / Y:${cursorCoords.y.toFixed(1)}%` : "STANDBY"}</span>
            </div>

            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-2.5 py-1 rounded text-[11px] border transition-colors cursor-pointer ${
                showGrid ? "bg-[#161D2C] text-[#D2FF00] border-[#D2FF00]/40" : "text-[#637085] border-[#1C2230]"
              }`}
            >
              GRID
            </button>

            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.0))}
              className="p-1.5 rounded text-[#8A95A8] hover:text-white border border-[#1E2536] hover:bg-[#121622] cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="p-1.5 rounded text-[#8A95A8] hover:text-white border border-[#1E2536] hover:bg-[#121622] cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 rounded text-[#8A95A8] hover:text-white border border-[#1E2536] hover:bg-[#121622] cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. UNIFIED 16:9 CAD DARKROOM CANVAS & METALLURGICAL DOSSIER */}
        <div className="flex flex-col xl:flex-row gap-4 items-start w-full">
          {/* Main 16:9 CAD Darkroom Canvas Container */}
          <div className="relative flex-1 min-h-[580px] w-full rounded-2xl border border-[#1E2536] bg-[#090B10] overflow-hidden shadow-2xl flex items-center justify-center select-none">
            {/* Subtle 40px Millimeter Datum Grid Lines (3% opacity) */}
            {showGrid && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(148, 163, 184, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(148, 163, 184, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />
            )}

            {/* Corner Crosshairs & Millimeter Coordinate Reticles */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 text-[#94A3B8]/40 font-mono text-[10px] pointer-events-none z-20">
              <span className="text-[#D2FF00]/60 font-black">+</span>
              <span>[00.00, 00.00]</span>
            </div>
            <div className="absolute top-3 right-3 flex items-center gap-1.5 text-[#94A3B8]/40 font-mono text-[10px] pointer-events-none z-20">
              <span>[1920, 00.00]</span>
              <span className="text-[#D2FF00]/60 font-black">+</span>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[#94A3B8]/40 font-mono text-[10px] pointer-events-none z-20">
              <span className="text-[#D2FF00]/60 font-black">+</span>
              <span>[00.00, 1080]</span>
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[#94A3B8]/40 font-mono text-[10px] pointer-events-none z-20">
              <span>[1920, 1080]</span>
              <span className="text-[#D2FF00]/60 font-black">+</span>
            </div>

            {/* Dark Asphalt Vignette for depth */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(5,7,11,0.92)_100%)] z-10" />

            {/* Interactive Caliper Metric Dimension Overlays */}
            {caliperMeasurement && (
              <div className="absolute inset-0 z-25 font-mono text-[10px]">
                {/* Wheelbase Dimension Bar */}
                <div className="absolute bottom-12 left-[25%] right-[25%] border-b-2 border-dashed border-[#FF8000] flex items-center justify-center pointer-events-none">
                  <span className="bg-[#0C0E14] px-2 py-0.5 rounded border border-[#FF8000] text-[#FF8000] font-bold shadow-lg">
                    WHEELBASE: {carInfo.dimensions.wheelbase}
                  </span>
                </div>

                {/* Overall Length Dimension Bar */}
                <div className="absolute bottom-4 left-[6%] right-[6%] border-b border-[#D2FF00] flex items-center justify-center pointer-events-none">
                  <span className="bg-[#0C0E14] px-2 py-0.5 rounded border border-[#D2FF00] text-[#D2FF00] font-bold shadow-lg">
                    OVERALL LENGTH: {carInfo.dimensions.overallLength}
                  </span>
                </div>

                {/* Overall Height Dimension Bar */}
                <div className="absolute top-[20%] bottom-[20%] right-6 border-r border-dashed border-cyan-400 flex items-center justify-center pointer-events-none">
                  <span className="bg-[#0C0E14] px-1.5 py-0.5 rounded border border-cyan-400 text-cyan-400 font-bold rotate-90 shadow-lg">
                    HEIGHT: {carInfo.dimensions.overallHeight}
                  </span>
                </div>

                {/* Track Width Front Overlay */}
                <div className="absolute top-8 left-8 p-2 rounded-lg bg-[#0C0E14]/90 border border-[#222A3B] text-[#A6B2C4] space-y-1 pointer-events-none">
                  <div>FRONT TRACK: <span className="text-white font-bold">{carInfo.dimensions.trackFront}</span></div>
                  <div>REAR TRACK: <span className="text-white font-bold">{carInfo.dimensions.trackRear}</span></div>
                  <div className="text-[#D2FF00] text-[9px]">CALIPER TOLERANCE: ±0.05 MM</div>
                </div>

                {/* Draggable Datum Points Overlay */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line
                    x1={`${datumPoints.p1.x}%`}
                    y1={`${datumPoints.p1.y}%`}
                    x2={`${datumPoints.p2.x}%`}
                    y2={`${datumPoints.p2.y}%`}
                    stroke="#D2FF00"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="opacity-90"
                  />
                </svg>

                {/* Datum Point 1 Handle */}
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDraggingDatum("p1");
                  }}
                  style={{ left: `${datumPoints.p1.x}%`, top: `${datumPoints.p1.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 z-40 group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#D2FF00] text-black flex items-center justify-center shadow-[0_0_15px_#D2FF00] border-2 border-white font-bold text-[9px]">
                    <Move className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 border border-[#D2FF00]/50 text-[#D2FF00] text-[8px] whitespace-nowrap">
                    DATUM A ({datumPoints.p1.x.toFixed(0)}%, {datumPoints.p1.y.toFixed(0)}%)
                  </div>
                </div>

                {/* Datum Point 2 Handle */}
                <div
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    setDraggingDatum("p2");
                  }}
                  style={{ left: `${datumPoints.p2.x}%`, top: `${datumPoints.p2.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 z-40 group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF8000] text-black flex items-center justify-center shadow-[0_0_15px_#FF8000] border-2 border-white font-bold text-[9px]">
                    <Move className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/90 border border-[#FF8000]/50 text-[#FF8000] text-[8px] whitespace-nowrap">
                    DATUM B ({datumPoints.p2.x.toFixed(0)}%, {datumPoints.p2.y.toFixed(0)}%)
                  </div>
                </div>
              </div>
            )}

            {/* Standardized 16:9 CAD Darkroom Canvas Frame */}
            <div
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-full flex items-center justify-center p-4 transition-transform duration-200 ease-out z-10"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <div className="relative w-full max-w-5xl aspect-video max-h-full flex items-center justify-center rounded-xl overflow-hidden border border-[#1E2536]/40 bg-[#090B10]">
                <Image
                  src={activeImageSrc}
                  alt={`${carInfo.name} Standardized CAD Blueprint`}
                  fill
                  priority
                  sizes="(max-width: 1400px) 100vw, 1200px"
                  onError={() => {
                    // Graceful fallback to darkroom CAD blueprint so no car ever renders a blank screen
                    if (activeImageSrc !== "/assets/suspension-exploded-v2.jpg") {
                      setActiveImageSrc("/assets/suspension-exploded-v2.jpg");
                    }
                  }}
                  className="object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] pointer-events-none transition-opacity duration-300"
                />

                {/* CLEAN NUMBERED CALLOUTS (ZERO TEXT CLUTTER ON CANVAS):
                    Displays strictly 24px circular index badges: [01], [02], [03]...
                    Style: 24px circular badge with #D2FF00 hairline border, deep obsidian core,
                    and a fine pointer line connecting directly to the component. */}
                {currentPins.map((callout) => {
                  const isSelected = activeCallout?.id === callout.id;
                  const isHovered = hoveredCalloutId === callout.id;

                  return (
                    <div
                      key={callout.id}
                      onClick={() => {
                        setSelectedCalloutId(callout.id);
                        setIsDossierOpen(true);
                        setActivePeelIndex(0);
                      }}
                      onMouseEnter={() => setHoveredCalloutId(callout.id)}
                      onMouseLeave={() => setHoveredCalloutId(null)}
                      style={{
                        left: `${callout.x_percent}%`,
                        top: `${callout.y_percent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                    >
                      {/* Pulsing Radar Ring on Hover or Select */}
                      <span
                        className={`absolute -inset-2.5 rounded-full pointer-events-none transition-all ${
                          isSelected || isHovered
                            ? "animate-ping opacity-80 bg-[#D2FF00]"
                            : "opacity-0 group-hover:opacity-60 group-hover:animate-ping bg-[#D2FF00]"
                        }`}
                      />

                      {/* 24px Circular Index Badge (Hairline #D2FF00 border, deep obsidian core) */}
                      <div
                        className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
                          isSelected || isHovered
                            ? "bg-[#D2FF00] text-black shadow-[0_0_15px_#D2FF00] scale-125 border-2 border-white font-black"
                            : "bg-[#090B10] border border-[#D2FF00] text-[#D2FF00] hover:scale-115 hover:bg-[#D2FF00] hover:text-black font-bold"
                        }`}
                      >
                        <span className="text-[10px] font-mono leading-none select-none">
                          {callout.num}
                        </span>
                      </div>

                      {/* Fine Pointer Line connecting directly to the component */}
                      <div
                        className={`absolute pointer-events-none transition-opacity duration-200 ${
                          callout.leaderSide === "left"
                            ? "right-full top-1/2 -translate-y-1/2 pr-1 flex items-center"
                            : "left-full top-1/2 -translate-y-1/2 pl-1 flex items-center"
                        } ${isSelected || isHovered ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
                      >
                        <div
                          className={`h-[1px] w-3 ${
                            isSelected || isHovered ? "bg-[#D2FF00]" : "bg-[#94A3B8]/70"
                          }`}
                        />
                        <div
                          className={`w-1 h-1 rounded-full ${
                            isSelected || isHovered ? "bg-[#D2FF00]" : "bg-[#94A3B8]"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Minimized Dossier Button if closed */}
            {!isDossierOpen && (
              <button
                onClick={() => setIsDossierOpen(true)}
                className="absolute top-4 right-4 z-30 px-3.5 py-2 rounded-xl bg-[#0E131E]/95 border border-[#263145] text-[#D2FF00] hover:border-[#D2FF00] hover:text-white text-xs font-mono font-bold shadow-2xl backdrop-blur-xl flex items-center gap-2 cursor-pointer transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-[#D2FF00]" />
                <span>OPEN METALLURGICAL DOSSIER</span>
              </button>
            )}
          </div>

          {/* 4. SLIDE-OVER METALLURGICAL SPECS & TRACK ENGINEERING DOSSIER
              Positioned alongside the drawing on desktop so it does NOT cover the canvas */}
          {isDossierOpen && activeCallout && (
            <aside className="w-full xl:w-[390px] shrink-0 rounded-2xl border border-[#1E2536] bg-[#0A0D15]/95 backdrop-blur-2xl shadow-2xl p-6 z-40 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="space-y-5">
                {/* Dossier Header */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#1A2233]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#D2FF00] font-bold">
                      <span>CALLOUT [{activeCallout.num}]</span>
                      <span>•</span>
                      <span className="text-[#8A95A8]">{activeCallout.subsystem}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug font-mono">
                      {activeCallout.name}
                    </h3>
                    <div className="text-[10px] font-mono text-[#717A8C]">
                      OEM SPEC: <span className="text-[#A6B2C4] font-bold">{activeCallout.part_number}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDossierOpen(false)}
                    className="p-1.5 rounded-lg text-[#616E82] hover:text-white hover:bg-[#161D2B] transition-colors cursor-pointer"
                    title="Close Dossier"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 4 High-Signal Stat Chips */}
                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  {/* 1. Material Chemistry */}
                  <div className="p-2.5 rounded-lg bg-[#0E131E] border border-[#1A2233] space-y-0.5">
                    <span className="text-[8px] text-[#647185] uppercase block font-bold">MATERIAL / SUBSTRATE</span>
                    <span className="text-[11px] font-bold text-[#D2FF00] truncate block" title={activeCallout.substrate || activeCallout.material}>
                      {activeCallout.substrate || activeCallout.material.split(" ")[0]}
                    </span>
                  </div>

                  {/* 2. Weight Delta */}
                  <div className="p-2.5 rounded-lg bg-[#0E131E] border border-[#1A2233] space-y-0.5">
                    <span className="text-[8px] text-[#647185] uppercase block font-bold">WEIGHT DELTA</span>
                    <span className="text-[11px] font-bold text-[#FF8000] truncate block">
                      {activeCallout.weightDelta.split(" ")[0]}
                    </span>
                  </div>

                  {/* 3. Load / Fastener Spec */}
                  <div className="p-2.5 rounded-lg bg-[#0E131E] border border-[#1A2233] space-y-0.5">
                    <span className="text-[8px] text-[#647185] uppercase block font-bold">TORQUE / FASTENER</span>
                    <span className="text-[11px] font-bold text-cyan-400 truncate block">
                      {activeCallout.torqueSpec || activeCallout.spec.split(" ")[0]}
                    </span>
                  </div>

                  {/* 4. Operational Limit */}
                  <div className="p-2.5 rounded-lg bg-[#0E131E] border border-[#1A2233] space-y-0.5">
                    <span className="text-[8px] text-[#647185] uppercase block font-bold">THERMAL LIMIT</span>
                    <span className="text-[11px] font-bold text-red-400 truncate block">
                      {activeCallout.operationalLimit.split(" ")[0]}
                    </span>
                  </div>
                </div>

                {/* Track Engineering Rationale */}
                <div className="p-4 rounded-xl bg-[#0E131E] border border-[#1A2233] space-y-2">
                  <div className="text-[10px] text-[#FF8000] font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF8000]" />
                    TRACK ENGINEERING NOTES & RATIONALE
                  </div>
                  <p className="text-xs text-[#A6B2C4] font-sans leading-relaxed">
                    {activeCallout.rationale}
                  </p>
                  <div className="pt-2 border-t border-[#182030] flex justify-between text-[10px] font-mono text-[#626E82]">
                    <span>STATUS: <span className="text-[#D2FF00] font-bold">VERIFIED CAD</span></span>
                    <span>TOLERANCE: <span className="text-white">±0.05 MM</span></span>
                  </div>
                </div>

                {/* Interactive Sub-Assembly Peel */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#717A8C] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D2FF00]" />
                      SUB-ASSEMBLY PEEL EXPLORER
                    </span>
                    <span className="text-[#D2FF00]">LAYER {activePeelIndex + 1} / {activeCallout.layers.length}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#0E131E] border border-[#1A2233] font-mono text-[10px]">
                    {activeCallout.layers.map((layer, idx) => (
                      <button
                        key={layer.name}
                        onClick={() => setActivePeelIndex(idx)}
                        className={`py-1.5 rounded-lg text-center transition-all cursor-pointer truncate px-1 font-bold ${
                          activePeelIndex === idx
                            ? "bg-[#D2FF00] text-black shadow-sm"
                            : "text-[#8A95A8] hover:text-white"
                        }`}
                        title={layer.name}
                      >
                        {idx === 0 ? "Outer Shell" : idx === 1 ? "Structural Core" : "Kinematics"}
                      </button>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0E131E] border border-[#1A2233] space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-white font-mono">
                      <span>{activeCallout.layers[activePeelIndex]?.name}</span>
                      <span className="text-[10px] text-[#D2FF00] font-mono">
                        {activeCallout.layers[activePeelIndex]?.material}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] font-sans leading-relaxed">
                      {activeCallout.layers[activePeelIndex]?.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dossier Footer Action */}
              <div className="pt-4 mt-4 border-t border-[#182030] flex items-center justify-between text-xs font-mono">
                <span className="text-[#606D82] text-[10px]">STANDARDS: ISO 7200 / DIN 912</span>
                <button
                  onClick={() => {
                    const nextIdx = (currentPins.findIndex((c) => c.id === activeCallout.id) + 1) % currentPins.length;
                    setSelectedCalloutId(currentPins[nextIdx].id);
                    setActivePeelIndex(0);
                  }}
                  className="flex items-center gap-1.5 text-[#D2FF00] hover:text-white font-bold transition-colors cursor-pointer"
                >
                  NEXT COMPONENT
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </aside>
          )}
        </div>

        {/* 5. SYNCHRONIZED OEM PARTS LEDGER TABLE
            Columns: [ POS ] | [ OEM PART NUMBER ] | [ COMPONENT DESCRIPTION ] | [ SUBSTRATE / MATERIAL ] | [ TORQUE / FASTENER SPEC ] | [ QTY ] */}
        <section className="rounded-2xl border border-[#1E2536] bg-[#0A0D15]/95 backdrop-blur-xl overflow-hidden shadow-2xl font-mono">
          <div className="px-5 py-3.5 border-b border-[#1A2233] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0E131E]">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#D2FF00]" />
              <h2 className="text-xs font-black uppercase tracking-wider text-white">
                SYNCHRONIZED OEM PARTS LEDGER — ELECTRONIC PARTS CATALOG (EPC)
              </h2>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-[#D2FF00]/10 text-[#D2FF00] border border-[#D2FF00]/30">
                {currentPins.length} COMPONENTS INDEXED
              </span>
            </div>

            <div className="text-[11px] text-[#637085] flex items-center gap-4">
              <span>ACTIVE SUB-ASSEMBLY: <span className="text-[#FF8000] font-bold uppercase">{assemblyStage}</span></span>
              <span>ISO 7200 STANDARDS</span>
            </div>
          </div>

          {/* Parts Table Container */}
          <div className="overflow-x-auto scrollbar-none max-h-[420px] overflow-y-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#080B10] text-[#717E94] text-[10px] uppercase tracking-wider border-b border-[#1A2233] sticky top-0 z-20">
                <tr>
                  <th className="py-2.5 px-4 font-bold text-center w-16">[ POS ]</th>
                  <th className="py-2.5 px-4 font-bold">[ OEM PART NUMBER ]</th>
                  <th className="py-2.5 px-4 font-bold">[ COMPONENT DESCRIPTION ]</th>
                  <th className="py-2.5 px-4 font-bold">[ SUBSTRATE / MATERIAL ]</th>
                  <th className="py-2.5 px-4 font-bold">[ TORQUE / FASTENER SPEC ]</th>
                  <th className="py-2.5 px-4 font-bold text-center w-20">[ QTY ]</th>
                  <th className="py-2.5 px-4 font-bold text-right w-24">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#141B28]">
                {currentPins.map((part) => {
                  const isSelected = activeCallout?.id === part.id;
                  const isHovered = hoveredCalloutId === part.id;

                  return (
                    <tr
                      key={part.id}
                      onClick={() => {
                        setSelectedCalloutId(part.id);
                        setIsDossierOpen(true);
                        setActivePeelIndex(0);
                      }}
                      onMouseEnter={() => setHoveredCalloutId(part.id)}
                      onMouseLeave={() => setHoveredCalloutId(null)}
                      className={`transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-[#D2FF00]/15 text-white font-bold border-l-4 border-l-[#D2FF00]"
                          : isHovered
                          ? "bg-[#141C2B] text-[#D2FF00] border-l-4 border-l-[#D2FF00]"
                          : "hover:bg-[#0E1420] text-[#A6B2C4]"
                      }`}
                    >
                      {/* [ POS ]: 24px Circular Index Badge */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-black transition-all ${
                            isSelected || isHovered
                              ? "bg-[#D2FF00] text-black shadow-[0_0_12px_#D2FF00] border border-white"
                              : "bg-[#090B10] border border-[#D2FF00] text-[#D2FF00]"
                          }`}
                        >
                          {part.num}
                        </span>
                      </td>

                      {/* [ OEM PART NUMBER ] */}
                      <td className="py-3 px-4 font-mono text-[11px] text-[#D2FF00]">
                        {part.part_number}
                      </td>

                      {/* [ COMPONENT DESCRIPTION ] */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-white group-hover:text-[#D2FF00]">
                          {part.name}
                        </div>
                        <div className="text-[10px] text-[#637085]">{part.subsystem}</div>
                      </td>

                      {/* [ SUBSTRATE / MATERIAL ] */}
                      <td className="py-3 px-4 text-[11px] text-[#A6B2C4]">
                        <span className="px-2 py-0.5 rounded bg-[#101622] border border-[#1A2333] text-[10px]">
                          {part.substrate || part.material.split("(")[0]}
                        </span>
                      </td>

                      {/* [ TORQUE / FASTENER SPEC ] */}
                      <td className="py-3 px-4 text-[11px] text-[#94A3B8]">
                        <div className="flex items-center gap-1.5">
                          <Wrench className="w-3 h-3 text-[#FF8000]" />
                          <span>{part.torqueSpec || part.spec.split("(")[0]}</span>
                        </div>
                      </td>

                      {/* [ QTY ] */}
                      <td className="py-3 px-4 text-center font-bold text-white">
                        {part.qty || 1}
                      </td>

                      {/* Action CTA */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCalloutId(part.id);
                            setIsDossierOpen(true);
                            setActivePeelIndex(0);
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#D2FF00] text-black shadow-sm"
                              : "bg-[#151D2D] hover:bg-[#D2FF00] hover:text-black text-[#A6B2C4]"
                          }`}
                        >
                          INSPECT
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Ledger Footer Status */}
          <div className="px-5 py-2.5 bg-[#080B10] border-t border-[#1A2233] flex flex-col sm:flex-row items-center justify-between text-[10px] text-[#626E82]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
                TWO-WAY BLUEPRINT SYNCHRONIZATION ACTIVE
              </span>
              <span>•</span>
              <span>CLICK OR HOVER ANY ROW TO HIGHLIGHT CAD CALLOUT</span>
            </div>
            <div className="text-[#8A95A8]">
              METALLURGICAL TOLERANCE: <span className="text-white font-bold">±0.05 MM</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
