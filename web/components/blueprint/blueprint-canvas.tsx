"use client";

import React, { useState, useMemo, useRef } from "react";
import Image from "next/image";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Sparkles,
  Info,
  Layers,
  ChevronRight,
  X
} from "lucide-react";
import { CarDetail } from "@/lib/api";

interface BlueprintCanvasProps {
  carDetail: CarDetail | null;
  selectedFastenerId: number | null;
  onSelectFastener: (id: number) => void;
}

// 3 Streamlined Cinematic Assembly Stages
export type AssemblyStage = "cutaway" | "engine" | "door";

export function BlueprintCanvas({
  carDetail,
  selectedFastenerId,
  onSelectFastener,
}: BlueprintCanvasProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [assemblyStage, setAssemblyStage] = useState<AssemblyStage>("cutaway");
  const [activePeelIndex, setActivePeelIndex] = useState<number>(0);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(true);
  const [cursorCoords, setCursorCoords] = useState<{ x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const isVW = carDetail?.model?.toLowerCase().includes("golf") || carDetail?.brand_id === 2;

  // Assembly-specific high-resolution diagram
  const stageImage = useMemo(() => {
    if (isVW) {
      return "/assets/vw-golfr-cutaway.jpg";
    }
    if (assemblyStage === "engine") {
      return "/assets/porsche-flat6-engine.jpg";
    }
    if (assemblyStage === "door") {
      return "/assets/porsche-door-cutaway.jpg";
    }
    return "/assets/porsche-gt3rs-cutaway.jpg";
  }, [assemblyStage, isVW]);



  // The 5 Canonical Engineering Target Points for the Porsche GT3 RS Cutaway
  const targetCallouts = useMemo(() => {
    if (isVW) {
      // 4 Golf R targets
      return [
        {
          id: 101,
          num: "01",
          name: "2.0L TSI EA888 Gen 4 Block",
          subsystem: "Crankcase & Cylinders",
          part_number: "06Q-100-031-H",
          x_percent: 26.0,
          y_percent: 52.0,
          leaderSide: "left" as const,
          material: "GJL-250 Grey Cast Iron",
          weightDelta: "142 kg (Rigid Deck)",
          spec: "M10x1.5 (40 Nm + 90° + 90°)",
          operationalLimit: "6,800 RPM / 1.8 Bar Boost",
          rationale: "Cast-iron crankcase resists cylinder distortion under high boost, preserving ring sealing under track thermals.",
          layers: [
            { name: "Continental R-Turbo & Intake", material: "Cast Inconel & Al Exhaust Manifold", desc: "Integrated cylinder-head exhaust manifold ensures rapid spooling." },
            { name: "Cast-Iron Engine Block", material: "GJL-250 Grey Cast Iron", desc: "Heavy-duty cross-bolted main bearing structure handling 420 Nm torque." },
            { name: "Forged Crank & Sump", material: "Micro-Alloyed Forged Steel", desc: "Deep-draw baffled oil pan preventing pump cavitation during lateral acceleration." }
          ]
        },
        {
          id: 102,
          num: "02",
          name: "DCC Adaptive MacPherson Struts",
          subsystem: "Front Running Gear",
          part_number: "5WA-412-021-AC",
          x_percent: 23.5,
          y_percent: 62.0,
          leaderSide: "left" as const,
          material: "Forged Aluminum Knuckle & Steel Damper",
          weightDelta: "-3.2 kg Unsprung",
          spec: "M14x1.5 Pinch Bolt (70 Nm + 90°)",
          operationalLimit: "200 Hz Valving Response",
          rationale: "Electronically adjusted electromagnetic valves modify rebound and compression damping 200 times per second for curb-hopping composure.",
          layers: [
            { name: "Coilover Spring & Top Mount", material: "High-Tensile Silicon-Chromium Steel", desc: "Progressive rate coils with hardened rubber isolator bushings." },
            { name: "DCC Variable Damper", material: "Nitrogen Gas & Internal Solenoid Valve", desc: "Dynamic damping adjusts millisecond-by-millisecond to pavement imperfections." },
            { name: "Cast Steering Knuckle", material: "Forged Aluminum Alloy", desc: "High-rigidity upright transmitting steering rack forces without flex." }
          ]
        },
        {
          id: 103,
          num: "03",
          name: "R-Performance Torque Splitter",
          subsystem: "AWD Differential",
          part_number: "0CP-525-010-J",
          x_percent: 78.5,
          y_percent: 68.0,
          leaderSide: "right" as const,
          material: "Die-Cast Aluminum & Multi-Plate Clutches",
          weightDelta: "26.5 kg Housing",
          spec: "M10x1.5 Subframe Bolts (60 Nm + 90°)",
          operationalLimit: "100% Torque to Outside Wheel",
          rationale: "Twin electro-mechanical multi-plate clutches independently power each rear wheel, virtually eliminating transverse FWD understeer.",
          layers: [
            { name: "Die-Cast Aluminum Casing", material: "High-Pressure Cast Aluminum", desc: "Lightweight housing with integral cooling ribs and low-friction PTFE seals." },
            { name: "Twin Multi-Plate Clutches", material: "Carbon-Friction Carbon Discs", desc: "Electronically modulated clutch packs controlling individual rear wheel slip." },
            { name: "Hypoid Ring & Pinion", material: "Case-Hardened Alloy Steel", desc: "Precision-lapped ring and pinion transferring prop shaft drive power." }
          ]
        },
        {
          id: 104,
          num: "04",
          name: "Aero Fascia Air Guides",
          subsystem: "Aerodynamic Bodywork",
          part_number: "5H0-807-217-GRU",
          x_percent: 12.0,
          y_percent: 70.0,
          leaderSide: "left" as const,
          material: "Polypropylene Copolymer (PP-EPDM)",
          weightDelta: "7.1 kg Assembly",
          spec: "M6 Torx T25 Screws (9.0 Nm)",
          operationalLimit: "High-Speed Downforce Balance",
          rationale: "Directs targeted airflow through front bumper louvers to keep transmission fluid and DSG clutches within nominal operating thermal windows.",
          layers: [
            { name: "Outer Fascia Bumper Shell", material: "Injection Molded PP-EPDM", desc: "Aerodynamically contoured skin with deep gloss black grille aperture." },
            { name: "Internal Air Deflector Vanes", material: "Glass-Reinforced Polyamide", desc: "Directs high-pressure air through side-mounted auxiliary coolers." },
            { name: "Underbody Splice Fasteners", material: "Corrosion-Resistant Zinc-Plated Steel", desc: "Torx retainers ensuring undertray seal under high-speed vacuum." }
          ]
        }
      ];
    }

    // Porsche 911 GT3 RS Canonical 5 Reticles
    return [
      {
        id: 1,
        num: "01",
        name: "4.0L High-Rev Valvetrain & Dry Sump",
        subsystem: "Powertrain Core",
        part_number: "992-109-015-RS",
        x_percent: 68.5,
        y_percent: 50.0,
        leaderSide: "right" as const,
        material: "Forged Titanium & 100Cr6 Alloy Steel",
        weightDelta: "-8.4 kg Rotating Mass",
        spec: "M7x1.0 Gr.12.9 (16 Nm) / M11 Cross-Bolts (85 Nm)",
        operationalLimit: "9,000 RPM Continuous / 2.5G Lateral",
        rationale: "Eliminates hydraulic lifter collapse at high RPM using rigid finger followers, while 7-stage dry-sump scavenging prevents oil starvation at 2.5G.",
        layers: [
          { name: "Resonance Carbon Airbox & 6 ITBs", material: "Toray Carbon Pre-preg", desc: "Individual throttle bodies create instant atmospheric cylinder filling with zero delay." },
          { name: "Rigid Finger Follower Valvetrain", material: "DLC-Coated Steel (3000 HV)", desc: "Micro-shinned rigid rockers guarantee valve opening precision up to 9,000 RPM." },
          { name: "7-Stage Dry-Sump Crankcase", material: "Cast Alusil with PTWA Plasma Liner", desc: "Dedicated scavenge pumps evacuate crankcase oil directly into external tank." }
        ]
      },
      {
        id: 2,
        num: "02",
        name: "AZ31B Hydroformed Magnesium Roof",
        subsystem: "BIW & Monocoque",
        part_number: "992-817-010-MG",
        x_percent: 51.5,
        y_percent: 26.0,
        leaderSide: "left" as const,
        material: "AZ31B-H24 Magnesium Alloy (1.1mm)",
        weightDelta: "-1.8 kg vs CFRP (-7.5mm CoG)",
        spec: "Dow Betamate 2090 + M5 Ti Bolts (6.2 Nm)",
        operationalLimit: "440°C Superplastic Formed",
        rationale: "Removing weight from the vehicle's highest structural point lowers center of gravity height by 7.5 mm, directly neutralizing lateral cornering body roll.",
        layers: [
          { name: "Outer Double-Bubble Contour", material: "AZ31B Magnesium Sheet", desc: "Aerodynamic channels guide laminar cockpit airflow smoothly into the rear wing." },
          { name: "Dielectric PEO Surface Barrier", material: "Keronite Plasma Electrolytic Layer", desc: "Insulates magnesium from adjacent aluminum and steel unibody to prevent galvanic reaction." },
          { name: "Structural Crash Toughened Adhesive", material: "Dow Betamate 2090 Epoxy", desc: "High-modulus adhesive joint distributing roof shear loads into pillars without flex." }
        ]
      },
      {
        id: 3,
        num: "03",
        name: "Forged Aero Teardrop Wishbones & Center-Lock Hub",
        subsystem: "Running Gear & Chassis",
        part_number: "992-407-151-GT",
        x_percent: 31.0,
        y_percent: 74.0,
        leaderSide: "left" as const,
        material: "Forged AlSi10Mg + Forged 7075-T6 Nut",
        weightDelta: "-18.2 kg Rotating Mass",
        spec: "M30x1.5 Center-Lock (600 Nm)",
        operationalLimit: "40 kg Aerodynamic Front Downforce",
        rationale: "Wishbone arm profiles are aerodynamically shaped into airfoils that generate 40 kg of clean downforce alone while eliminating brake-dive geometry.",
        layers: [
          { name: "Airfoil Teardrop Upper & Lower Arms", material: "Closed-Die Forged Aluminum", desc: "Drop-forged profile generates aerodynamic downforce in clean wheel-well airflow." },
          { name: "Center-Lock Wheel Spindle", material: "42CrMo4 Quenched Steel Spindle", desc: "Central high-torque drive hub engineered for 600 Nm single-nut motorsport pit changes." },
          { name: "410mm Carbon-Silicon Rotor (PCCB)", material: "Carbon-Ceramic Matrix (C/SiC)", desc: "Withstands 850°C track braking without fading, halving unsprung rotating weight." }
        ]
      },
      {
        id: 4,
        num: "04",
        name: "Multi-Layer CFRP Door Assembly & Intrusion Core",
        subsystem: "Safety Cell & Doors",
        part_number: "992-831-011-RS",
        x_percent: 44.0,
        y_percent: 52.0,
        leaderSide: "left" as const,
        material: "Toray T700 CFRP + 22MnB5 Boron Steel",
        weightDelta: "-5.5 kg Per Door (-11 kg Total)",
        spec: "M8 XZN Triple-Square (34 Nm + 45°)",
        operationalLimit: "1,500 MPa Side Intrusion Resistance",
        rationale: "Integrates ultra-high-strength hot-formed boron steel inside a monolithic carbon skin, cutting unibody mass while exceeding FIA crash intrusion standards.",
        layers: [
          { name: "Outer CFRP Carbon Skin", material: "T700 2x2 Twill Pre-preg (1.4 mm)", desc: "Autoclave-molded carbon panel contoured with boundary-layer wheel arch air extractors." },
          { name: "Boron Steel Anti-Intrusion Beam", material: "Hot-Stamped 22MnB5 Boron Rebar", desc: "1,500 MPa high-yield structural beam shielding driver cockpit from side barrier impacts." },
          { name: "Minimalist Lightweight Door Card", material: "Molded Carbon Composite & Fabric Loop", desc: "Eliminates heavy electric latch motors in favor of iconic RS emergency fabric pull loops." }
        ]
      },
      {
        id: 5,
        num: "05",
        name: "Dual-Element Active DRS Swan-Neck Wing",
        subsystem: "Active Aerodynamics",
        part_number: "992-827-901-RS",
        x_percent: 81.0,
        y_percent: 28.0,
        leaderSide: "right" as const,
        material: "High-Modulus Carbon & CNC 7075-T6 Pylons",
        weightDelta: "860 kg Downforce at 285 km/h",
        spec: "M8x1.25 Gr.10.9 (42 Nm into Shock Towers)",
        operationalLimit: "34° Hydraulic DRS Flap Pivoting",
        rationale: "Top-mounted swan-neck pylons maintain uninterrupted airflow along the wing's low-pressure underside, boosting aerodynamic downforce by over 30%.",
        layers: [
          { name: "Dual-Element Carbon Mainfoil & Flap", material: "High-Modulus Pre-preg Carbon", desc: "Upper active flap dynamically tilts 34 degrees via electro-hydraulic cylinder for DRS low-drag mode." },
          { name: "Billet Aluminum Swan-Neck Pylons", material: "CNC 7075-T6 Aerospace Aluminum", desc: "Transfers 860 kg of crushing downforce directly into rear BIW suspension shock towers." },
          { name: "Electro-Hydraulic DRS Actuator", material: "Hard-Anodized Micro-Hydraulic RAM", desc: "Actuates low-drag flap position in under 0.3 seconds at steering wheel command." }
        ]
      }
    ];
  }, [isVW]);

  // Selected callout
  const activeCallout = useMemo(() => {
    if (selectedFastenerId) {
      const found = targetCallouts.find((c) => c.id === selectedFastenerId);
      if (found) return found;
    }
    return targetCallouts[0];
  }, [targetCallouts, selectedFastenerId]);

  // Coordinate tracking for live datum display
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setCursorCoords({ x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(1)) });
  };

  const handleMouseLeave = () => {
    setCursorCoords(null);
  };

  return (
    <div className="rounded-2xl border border-stone-800 bg-[#090b10] overflow-hidden shadow-2xl space-y-0 relative">
      {/* Top Cinematic Stage Header & Assembly Segmented Control */}
      <div className="px-6 py-4 border-b border-stone-800/80 bg-[#0c0f16] flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Active Vehicle & CAD Datum */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-stone-100 uppercase">
                {carDetail ? `${carDetail.model} ${carDetail.trim || ""}` : "PORSCHE 911 GT3 RS"}
              </span>
              <span className="px-2 py-0.5 text-[9px] font-mono font-bold rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                STAGE INSPECTION
              </span>
            </div>
            <div className="text-[11px] font-mono text-stone-400">
              DATUM: <span className="text-amber-300 font-bold">{cursorCoords ? `X:${cursorCoords.x.toFixed(1)}% / Y:${cursorCoords.y.toFixed(1)}%` : "STANDBY"}</span> • METRIC CAD PROJECTION
            </div>
          </div>
        </div>

        {/* Center: Cinematic Assembly Tabs */}
        {!isVW ? (
          <div className="p-1 rounded-xl bg-[#121622] border border-stone-800 flex items-center gap-1 shadow-inner">
            <button
              onClick={() => setAssemblyStage("cutaway")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                assemblyStage === "cutaway"
                  ? "bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
              }`}
            >
              [ CHASSIS MONOCOQUE ]
            </button>
            <button
              onClick={() => setAssemblyStage("engine")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                assemblyStage === "engine"
                  ? "bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
              }`}
            >
              [ 4.0L FLAT-6 POWERTRAIN ]
            </button>
            <button
              onClick={() => setAssemblyStage("door")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                assemblyStage === "door"
                  ? "bg-amber-500 text-black shadow-[0_0_12px_rgba(245,158,11,0.35)]"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/50"
              }`}
            >
              [ COMPOSITE DOOR CASSETTE ]
            </button>
          </div>
        ) : (
          <div className="px-3.5 py-1.5 rounded-lg bg-[#121622] border border-stone-800 text-xs font-mono font-bold text-amber-400">
            [ MQB EVO ARCHITECTURE & EA888 TSI ]
          </div>
        )}

        {/* Right: Stage Viewport Tools */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2.5 py-1 rounded text-[11px] border transition-colors ${
              showGrid ? "bg-stone-800 text-amber-400 border-amber-500/40" : "text-stone-500 border-stone-800"
            }`}
          >
            GRID
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.0))}
            className="p-1.5 rounded text-stone-400 hover:text-white border border-stone-800 hover:bg-stone-800"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="p-1.5 rounded text-stone-400 hover:text-white border border-stone-800 hover:bg-stone-800"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 rounded text-stone-400 hover:text-white border border-stone-800 hover:bg-stone-800"
            title="Reset Scale"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Full-Bleed Viewport & Floating Engineering Dossier Stage */}
      <div className="relative w-full h-[540px] sm:h-[600px] overflow-hidden bg-[#07090e] select-none flex items-center justify-center">
        {/* Subtle Engineering Millimeter Datum Grid */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(245, 158, 11, 0.15) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(245, 158, 11, 0.15) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
            }}
          />
        )}

        {/* Asphalt / Graphite Dark Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(5,7,11,0.85)_100%)] z-10" />

        {/* Canvas Workspace */}
        <div
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full flex items-center justify-center p-6 transition-transform duration-200 ease-out z-10"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Dominant CAD Cutaway Image */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <Image
              src={stageImage}
              alt="Automotive CAD Technical Cutaway"
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1200px"
              className="object-contain filter drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] pointer-events-none transition-opacity duration-300"
            />

            {/* Pulsing CAD Reticles with Thin Hairline Leader Lines */}
            {targetCallouts.map((callout) => {
              const isSelected = activeCallout.id === callout.id;

              return (
                <div
                  key={callout.id}
                  onClick={() => {
                    onSelectFastener(callout.id);
                    setIsDossierOpen(true);
                    setActivePeelIndex(0);
                  }}
                  style={{
                    left: `${callout.x_percent}%`,
                    top: `${callout.y_percent}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                >
                  {/* Outer Pulsing Radar Ring */}
                  <span
                    className={`absolute -inset-3 rounded-full pointer-events-none transition-all ${
                      isSelected
                        ? "animate-ping opacity-80 bg-amber-400"
                        : "opacity-0 group-hover:opacity-60 group-hover:animate-ping bg-amber-500"
                    }`}
                  />

                  {/* CAD Crosshair Reticle Center */}
                  <div
                    className={`relative flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200 ${
                      isSelected
                        ? "bg-amber-500 text-black shadow-[0_0_20px_#f59e0b] scale-125 border-2 border-white"
                        : "bg-[#0c0f16]/90 border border-amber-400/80 text-amber-300 hover:scale-115 hover:border-amber-400 hover:bg-amber-500 hover:text-black backdrop-blur-md"
                    }`}
                  >
                    {/* Reticle + Hairlines */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className={`w-3.5 h-[1px] ${isSelected ? "bg-black" : "bg-amber-400"}`} />
                      <div className={`h-3.5 w-[1px] absolute ${isSelected ? "bg-black" : "bg-amber-400"}`} />
                    </div>
                    <span className="text-[10px] font-mono font-bold relative z-10">{callout.num}</span>
                  </div>

                  {/* Hairline Leader Line & Hover Tooltip */}
                  <div
                    className={`absolute bottom-full mb-2 pointer-events-none transition-all duration-200 ${
                      callout.leaderSide === "left"
                        ? "right-1/2 translate-x-3 items-end"
                        : "left-1/2 -translate-x-3 items-start"
                    } ${isSelected ? "flex flex-col opacity-100" : "hidden group-hover:flex flex-col opacity-90"}`}
                  >
                    <div className="px-2.5 py-1 rounded bg-[#10141e]/95 border border-stone-700 text-stone-100 text-[10px] font-mono shadow-2xl backdrop-blur-md whitespace-nowrap flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="font-bold text-amber-300">{callout.name}</span>
                    </div>
                    {/* Hairline connector drop */}
                    <div className="w-[1px] h-2.5 bg-amber-400/60" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive "Engineering Dossier" Drawer (Right-Hand Overlay) */}
        {isDossierOpen && activeCallout && (
          <div className="absolute top-4 right-4 bottom-4 w-[360px] sm:w-[390px] rounded-xl border border-stone-800 bg-[#0c0f17]/95 backdrop-blur-xl shadow-2xl p-5 z-40 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-200">
            <div className="space-y-4">
              {/* Dossier Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-800/80">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                    <span>CALLOUT [{activeCallout.num}]</span>
                    <span>•</span>
                    <span className="text-stone-400">{activeCallout.subsystem}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-100 leading-snug font-mono">
                    {activeCallout.name}
                  </h3>
                  <div className="text-[10px] font-mono text-stone-400">
                    OEM PART NUMBER: <span className="text-stone-300">{activeCallout.part_number}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="p-1.5 rounded text-stone-500 hover:text-stone-300 hover:bg-stone-800 transition-colors"
                  title="Close Dossier"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 3 High-Signal Metric Badges */}
              <div className="grid grid-cols-3 gap-2 font-mono">
                {/* 1. Material Chemistry */}
                <div className="p-2 rounded-lg bg-[#121622] border border-stone-800/90 text-center space-y-0.5">
                  <span className="text-[8px] text-stone-400 uppercase block font-bold">MATERIAL</span>
                  <span className="text-xs font-bold text-emerald-400 truncate block" title={activeCallout.material}>
                    {activeCallout.material.split(" ")[0]}
                  </span>
                </div>

                {/* 2. Weight Delta */}
                <div className="p-2 rounded-lg bg-[#121622] border border-stone-800/90 text-center space-y-0.5">
                  <span className="text-[8px] text-stone-400 uppercase block font-bold">WEIGHT DELTA</span>
                  <span className="text-xs font-bold text-amber-400 truncate block">
                    {activeCallout.weightDelta.split(" ")[0]}
                  </span>
                </div>

                {/* 3. Load / Torque Spec */}
                <div className="p-2 rounded-lg bg-[#121622] border border-stone-800/90 text-center space-y-0.5">
                  <span className="text-[8px] text-stone-400 uppercase block font-bold">FASTENER TORQUE</span>
                  <span className="text-xs font-bold text-cyan-400 truncate block">
                    {activeCallout.spec.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Weissach Engineering Rationale */}
              <div className="p-3.5 rounded-lg bg-[#121622] border border-stone-800 space-y-1.5">
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  WEISSACH ENGINEERING RATIONALE
                </div>
                <p className="text-xs text-stone-300 font-sans leading-relaxed">
                  {activeCallout.rationale}
                </p>
                <div className="pt-2 border-t border-stone-800/80 flex justify-between text-[10px] font-mono text-stone-400">
                  <span>LIMIT: <span className="text-red-400 font-bold">{activeCallout.operationalLimit}</span></span>
                </div>
              </div>

              {/* Interactive Sub-Layer Slider */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    SUB-LAYER PEEL EXPLORER
                  </span>
                  <span className="text-amber-400">LAYER {activePeelIndex + 1} / {activeCallout.layers.length}</span>
                </div>

                {/* Pill Segmented Layer Switcher */}
                <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-[#121622] border border-stone-800 font-mono text-[10px]">
                  {activeCallout.layers.map((layer, idx) => (
                    <button
                      key={layer.name}
                      onClick={() => setActivePeelIndex(idx)}
                      className={`py-1 rounded text-center transition-all cursor-pointer truncate px-1 font-bold ${
                        activePeelIndex === idx
                          ? "bg-amber-500 text-black shadow-sm"
                          : "text-stone-400 hover:text-stone-200"
                      }`}
                      title={layer.name}
                    >
                      {idx === 0 ? "Outer Shell" : idx === 1 ? "Safety Frame" : "Core Mech"}
                    </button>
                  ))}
                </div>

                {/* Active Layer Details Card */}
                <div className="p-3 rounded-lg bg-[#121622] border border-stone-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-100 font-mono">
                    <span>{activeCallout.layers[activePeelIndex]?.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {activeCallout.layers[activePeelIndex]?.material}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-sans leading-relaxed">
                    {activeCallout.layers[activePeelIndex]?.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Dossier Footer Action */}
            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-stone-500 text-[10px]">SPEC: ISO 898-1 / DIN 912</span>
              <button
                onClick={() => {
                  const nextIdx = (targetCallouts.findIndex(c => c.id === activeCallout.id) + 1) % targetCallouts.length;
                  onSelectFastener(targetCallouts[nextIdx].id);
                  setActivePeelIndex(0);
                }}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
              >
                NEXT COMPONENT
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Minimized Dossier Button if closed */}
        {!isDossierOpen && (
          <button
            onClick={() => setIsDossierOpen(true)}
            className="absolute top-4 right-4 z-30 px-3.5 py-2 rounded-lg bg-[#121622]/90 border border-stone-700 text-amber-400 hover:border-amber-400 hover:text-amber-300 text-xs font-mono font-bold shadow-xl backdrop-blur-md flex items-center gap-2 cursor-pointer transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            OPEN ENGINEERING DOSSIER
          </button>
        )}
      </div>

      {/* Bottom Stage Status Bar */}
      <div className="px-6 py-2.5 bg-[#0c0f16] border-t border-stone-800 text-xs font-mono text-stone-400 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          Click any pulsing crosshair reticle on the schematic to inspect component metallurgy and sub-layer peel
        </span>
        <span className="text-amber-400 font-bold">5 ACTIVE TELEMETRY STATIONS</span>
      </div>
    </div>
  );
}
