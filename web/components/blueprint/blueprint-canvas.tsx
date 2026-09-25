"use client";

import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Compass,
  Grid,
  Move
} from "lucide-react";
import { TargetCallout, AssemblyTier } from "@/lib/pins-data";
import { CarDetail } from "@/lib/api";

export interface BenchmarkCarMeta {
  name: string;
  badge: string;
  engine: string;
  power: string;
  redline: string;
  dryWeight: string;
  aeroBalance: string;
  defaultCutaway: string;
  subtitle?: string;
  engineSubtext?: string;
  dimensions: {
    wheelbase: string;
    trackFront: string;
    trackRear: string;
    overallLength: string;
    overallHeight: string;
  };
}

export type SubAssemblyStage = "chassis" | "powertrain" | "suspension";
export type KnollingTierFilter = "all" | AssemblyTier;

export interface BlueprintCanvasProps {
  carKey?: string;
  carInfo?: BenchmarkCarMeta;
  activeTier?: KnollingTierFilter;
  onTierChange?: (tier: KnollingTierFilter) => void;
  // Backward compatibility
  assemblyStage?: SubAssemblyStage;
  onAssemblyStageChange?: (stage: SubAssemblyStage) => void;
  pins?: TargetCallout[];
  selectedPinId?: number | null;
  onSelectPin?: (id: number) => void;
  hoveredPinId?: number | null;
  onHoverPin?: (id: number | null) => void;
  zoomLevel?: number;
  onZoomChange?: (zoom: number | ((prev: number) => number)) => void;
  panOffset?: { x: number; y: number };
  onPanChange?: (offset: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  caliperMeasurement?: boolean;
  onToggleCaliper?: () => void;
  glowColor?: "lime" | "papaya";
  // Backward compatibility
  carDetail?: CarDetail | null;
  selectedFastenerId?: number | null;
  onSelectFastener?: (id: number) => void;
}

const DEFAULT_CAR_META: BenchmarkCarMeta = {
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
  dimensions: {
    wheelbase: "2,457 mm",
    trackFront: "1,630 mm",
    trackRear: "1,580 mm",
    overallLength: "4,572 mm",
    overallHeight: "1,322 mm"
  }
};

export const LAYER_PILLS: { id: KnollingTierFilter; label: string }[] = [
  { id: "all", label: "[ALL PARTS]" },
  { id: "aero", label: "[AERO SHELL]" },
  { id: "monocoque", label: "[MONOCOQUE]" },
  { id: "powertrain", label: "[POWERTRAIN]" },
  { id: "brakes_gear", label: "[BRAKES & GEAR]" },
  { id: "hardware", label: "[HARDWARE]" },
];

export function BlueprintCanvas({
  carKey = "porsche-911-gt3-rs",
  carInfo = DEFAULT_CAR_META,
  activeTier: propActiveTier,
  onTierChange,
  onAssemblyStageChange,
  pins = [],
  selectedPinId = null,
  onSelectPin,
  hoveredPinId = null,
  onHoverPin,
  zoomLevel: propZoom,
  onZoomChange,
  panOffset: propPan,
  onPanChange,
  showGrid: propGrid,
  onToggleGrid,
  caliperMeasurement: propCaliper,
  onToggleCaliper,
  glowColor = "lime",
  selectedFastenerId,
  onSelectFastener,
}: BlueprintCanvasProps) {
  // Internal state
  const [internalTier, setInternalTier] = useState<KnollingTierFilter>("all");
  const [internalZoom, setInternalZoom] = useState(1);
  const [internalPan, setInternalPan] = useState({ x: 0, y: 0 });
  const [internalGrid, setInternalGrid] = useState(true);
  const [internalCaliper, setInternalCaliper] = useState(false);
  const [internalSelectedId, setInternalSelectedId] = useState<number | null>(null);

  const activeTier = propActiveTier !== undefined ? propActiveTier : internalTier;
  const setTier = (tier: KnollingTierFilter) => {
    if (onTierChange) onTierChange(tier);
    else setInternalTier(tier);

    // Map tier back to legacy assemblyStage if handler provided
    if (onAssemblyStageChange) {
      if (tier === "powertrain") onAssemblyStageChange("powertrain");
      else if (tier === "brakes_gear") onAssemblyStageChange("suspension");
      else onAssemblyStageChange("chassis");
    }
  };

  const zoom = propZoom !== undefined ? propZoom : internalZoom;
  const setZoom = onZoomChange || setInternalZoom;

  const pan = propPan !== undefined ? propPan : internalPan;
  const setPan = onPanChange || setInternalPan;

  const isGridOn = propGrid !== undefined ? propGrid : internalGrid;
  const toggleGrid = onToggleGrid || (() => setInternalGrid((g) => !g));

  const isCaliperOn = propCaliper !== undefined ? propCaliper : internalCaliper;
  const toggleCaliper = onToggleCaliper || (() => setInternalCaliper((c) => !c));

  const activeSelectedId = selectedPinId !== undefined ? selectedPinId : (selectedFastenerId || internalSelectedId);
  const handleSelect = (id: number) => {
    if (onSelectPin) onSelectPin(id);
    else if (onSelectFastener) onSelectFastener(id);
    else setInternalSelectedId(id);
  };

  // Draggable Datum Caliper handles
  const [datumPoints, setDatumPoints] = useState<{ p1: { x: number; y: number }; p2: { x: number; y: number } }>({
    p1: { x: 25, y: 75 },
    p2: { x: 75, y: 75 }
  });
  const [draggingDatum, setDraggingDatum] = useState<"p1" | "p2" | null>(null);
  const [cursorCoords, setCursorCoords] = useState<{ x: number; y: number } | null>(null);

  // Pan dragging state
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Vehicle Knolling teardown photo selection
  const primaryKnollingImage = useMemo(() => {
    if (carInfo?.defaultCutaway && carInfo.defaultCutaway.includes("knolling-teardown")) {
      return carInfo.defaultCutaway;
    }
    const key = (carKey || "").toLowerCase();
    if (key.includes("bmw") || key.includes("m4") || key.includes("csl") || key.includes("g82")) {
      return "/assets/bmw-m4-knolling-teardown.jpg";
    }
    if (key.includes("mclaren") || key.includes("f1") || key.includes("xp5")) {
      return "/assets/mclaren-f1-knolling-teardown.jpg";
    }
    if (key.includes("golf") || key.includes("vw") || key.includes("volkswagen")) {
      return "/assets/vw-golfr-knolling-teardown.jpg";
    }
    if (key.includes("ferrari") || key.includes("f40")) {
      return "/assets/ferrari-f40-knolling-teardown.jpg";
    }
    if (key.includes("skyline") || key.includes("r34") || key.includes("gtr") || key.includes("nissan")) {
      return "/assets/skyline-r34-knolling-teardown.jpg";
    }
    // Default: Porsche 911 GT3 RS knolling teardown
    return "/assets/porsche-gt3rs-knolling-teardown.jpg";
  }, [carKey, carInfo?.defaultCutaway]);

  const [currentImageSrc, setCurrentImageSrc] = useState<string>(primaryKnollingImage);

  useEffect(() => {
    setCurrentImageSrc(primaryKnollingImage);
  }, [primaryKnollingImage]);

  const handleImageError = () => {
    setCurrentImageSrc("/assets/bmw-m4-knolling-teardown.jpg");
  };

  // Tracking mouse movement for caliper and pan
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
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
      return;
    }

    if (isPanning) {
      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;
      panStartRef.current = { x: e.clientX, y: e.clientY };
      setPan((prev: { x: number; y: number }) => ({
        x: prev.x + dx,
        y: prev.y + dy
      }));
    }
  }, [draggingDatum, isPanning, setPan]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0 && !draggingDatum) {
      setIsPanning(true);
      panStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    if (draggingDatum) setDraggingDatum(null);
  };

  const handleMouseLeave = () => {
    setCursorCoords(null);
    setIsPanning(false);
    setDraggingDatum(null);
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Caliper distance calculation in millimeters (scaled to vehicle dimensions)
  const caliperDistanceMm = useMemo(() => {
    const dx = Math.abs(datumPoints.p2.x - datumPoints.p1.x);
    const dy = Math.abs(datumPoints.p2.y - datumPoints.p1.y);
    const hypotPercent = Math.hypot(dx, dy);
    const baseLengthMm = 4500;
    const dist = (hypotPercent / 100) * baseLengthMm;
    return dist.toFixed(1);
  }, [datumPoints]);

  return (
    <div className="relative w-full rounded-2xl border border-[#1E2536] bg-[#090B10] overflow-hidden shadow-2xl flex flex-col select-none">
      {/* 1. TOP TOOLBAR: LAYER ISOLATION PILLS & CAD UTILITIES */}
      <div className="px-4 sm:px-6 py-3 border-b border-[#1E2536] bg-[#0A0D15]/95 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 font-mono z-30">
        {/* Layer Isolation Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0E131E] border border-[#1E2536] overflow-x-auto scrollbar-none max-w-full">
          {LAYER_PILLS.map((pill) => {
            const isActive = activeTier === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setTier(pill.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#D2FF00] text-black shadow-[0_0_14px_rgba(210,255,0,0.5)] font-black"
                    : "text-[#8A95A8] hover:text-white hover:bg-[#151D2D]"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* CAD Canvas Tools: Caliper, Grid & Controls */}
        <div className="flex items-center gap-2 text-xs">
          {/* Caliper Toggle */}
          <button
            onClick={toggleCaliper}
            className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isCaliperOn
                ? "bg-[#FF8000] text-black border-[#FF8000] shadow-[0_0_15px_rgba(255,128,0,0.4)]"
                : "bg-[#0E131E] border-[#222A3B] text-[#A6B2C4] hover:border-[#FF8000] hover:text-[#FF8000]"
            }`}
            title="Toggle Datum Caliper Measurement"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CALIPER</span>
            <span>{isCaliperOn ? "[ON]" : "[OFF]"}</span>
          </button>

          {/* Grid Toggle */}
          <button
            onClick={toggleGrid}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] border transition-colors cursor-pointer flex items-center gap-1 ${
              isGridOn ? "bg-[#161D2C] text-[#D2FF00] border-[#D2FF00]/40" : "text-[#637085] border-[#1C2230]"
            }`}
            title="Toggle CAD Grid"
          >
            <Grid className="w-3 h-3" />
            <span className="hidden md:inline">GRID</span>
          </button>

          {/* Smooth Zoom Controls */}
          <div className="flex items-center gap-1 bg-[#0E131E] border border-[#1E2536] p-0.5 rounded-lg">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 3.0))}
              className="p-1.5 rounded text-[#8A95A8] hover:text-white hover:bg-[#182030] cursor-pointer transition-colors"
              title="Zoom In (+25%)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[10px] text-[#A6B2C4] font-bold min-w-[38px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 0.6))}
              className="p-1.5 rounded text-[#8A95A8] hover:text-white hover:bg-[#182030] cursor-pointer transition-colors"
              title="Zoom Out (-25%)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetView}
              className="p-1.5 rounded text-[#8A95A8] hover:text-white hover:bg-[#182030] cursor-pointer transition-colors"
              title="Reset Zoom & Pan"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. EXPLODED ISOMETRIC KNOLLING VIEWPORT */}
      <div
        className="relative w-full aspect-video min-h-[500px] max-h-[740px] overflow-hidden bg-[#07090E] flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Subtle CAD 40px Measurement Grid */}
        {isGridOn && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        )}

        {/* Dark-room Radial Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_55%,rgba(4,6,10,0.85)_100%)] z-15" />

        {/* Tier Boundary Guide Badges on Canvas Margin */}
        <div className="absolute left-4 top-0 bottom-0 pointer-events-none z-20 flex flex-col justify-between py-6 font-mono text-[9px] text-[#55647A] tracking-wider select-none">
          <div className="flex items-center gap-1.5 bg-[#090C12]/80 px-2 py-1 rounded border border-[#1A2234]">
            <span className={`w-1.5 h-1.5 rounded-full ${activeTier === "aero" ? "bg-[#D2FF00]" : "bg-[#55647A]"}`} />
            <span>01. AERO SHELL & BODY PANELS</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#090C12]/80 px-2 py-1 rounded border border-[#1A2234]">
            <span className={`w-1.5 h-1.5 rounded-full ${activeTier === "monocoque" ? "bg-[#D2FF00]" : "bg-[#55647A]"}`} />
            <span>02. STRUCTURAL MONOCOQUE / UNIBODY</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#090C12]/80 px-2 py-1 rounded border border-[#1A2234]">
            <span className={`w-1.5 h-1.5 rounded-full ${activeTier === "powertrain" ? "bg-[#D2FF00]" : "bg-[#55647A]"}`} />
            <span>03. POWERTRAIN & DRIVETRAIN</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#090C12]/80 px-2 py-1 rounded border border-[#1A2234]">
            <span className={`w-1.5 h-1.5 rounded-full ${activeTier === "brakes_gear" || activeTier === "hardware" ? "bg-[#D2FF00]" : "bg-[#55647A]"}`} />
            <span>04. SUSPENSION, BRAKES & HARDWARE</span>
          </div>
        </div>

        {/* Floating Zoom & Reset Overlay Buttons (Bottom Right of Viewport) */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 bg-[#0B0E17]/90 backdrop-blur-xl border border-[#1E2536] p-1.5 rounded-xl shadow-2xl">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3.0))}
            className="p-1.5 rounded-lg bg-[#141B28] hover:bg-[#D2FF00] hover:text-black text-[#A6B2C4] font-mono text-xs font-bold transition-all cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.6))}
            className="p-1.5 rounded-lg bg-[#141B28] hover:bg-[#D2FF00] hover:text-black text-[#A6B2C4] font-mono text-xs font-bold transition-all cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-1.5 rounded-lg bg-[#141B28] hover:bg-[#D2FF00] hover:text-black text-[#A6B2C4] font-mono text-xs font-bold transition-all cursor-pointer"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Draggable Datum Caliper Vector Overlay */}
        {isCaliperOn && (
          <div className="absolute inset-0 z-25 font-mono text-[10px] pointer-events-none">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1={`${datumPoints.p1.x}%`}
                y1={`${datumPoints.p1.y}%`}
                x2={`${datumPoints.p2.x}%`}
                y2={`${datumPoints.p2.y}%`}
                stroke="#FF8000"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-90"
              />
            </svg>

            {/* Datum A Handle */}
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                setDraggingDatum("p1");
              }}
              style={{ left: `${datumPoints.p1.x}%`, top: `${datumPoints.p1.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 z-40 pointer-events-auto"
            >
              <div className="w-6 h-6 rounded-full bg-[#D2FF00] text-black flex items-center justify-center shadow-[0_0_15px_#D2FF00] border-2 border-white font-bold text-[9px]">
                <Move className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Datum B Handle */}
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                setDraggingDatum("p2");
              }}
              style={{ left: `${datumPoints.p2.x}%`, top: `${datumPoints.p2.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing p-1 z-40 pointer-events-auto"
            >
              <div className="w-6 h-6 rounded-full bg-[#FF8000] text-black flex items-center justify-center shadow-[0_0_15px_#FF8000] border-2 border-white font-bold text-[9px]">
                <Move className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Caliper Readout Badge */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/95 border border-[#FF8000] text-[#FF8000] font-bold text-xs shadow-2xl flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" />
              <span>CALIPER SPAN: {caliperDistanceMm} MM (±0.05 MM)</span>
            </div>
          </div>
        )}

        {/* 3. TRANSFORM CONTAINER: ZOOM & PAN WITH ISOMETRIC TEARDOWN PHOTO */}
        <div
          ref={canvasRef}
          className="relative w-full h-full flex items-center justify-center transition-transform duration-100 ease-out z-10"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          <div className="relative w-full max-w-5xl aspect-video max-h-full flex items-center justify-center">
            {/* Exploded Teardown Photography / Knolling Schematic */}
            <Image
              src={currentImageSrc}
              alt={`${carInfo.name} Exploded Mechanical Teardown Knolling`}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1200px"
              onError={handleImageError}
              className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] pointer-events-none transition-all duration-300"
            />

            {/* 4. CLEAN 24PX CIRCULAR NUMBERED BADGES (ZERO TEXT ON CANVAS) */}
            {pins.map((callout) => {
              const isSelected = activeSelectedId === callout.id;
              const isHovered = hoveredPinId === callout.id;

              // Layer Isolation: Dim pins not belonging to active tier
              const isTierMatch = activeTier === "all" || callout.tier === activeTier;

              const isPapaya = glowColor === "papaya" && isSelected;
              const pingColor = isPapaya ? "bg-[#FF8000]" : "bg-[#D2FF00]";
              const activeBorderColor = isPapaya ? "border-[#FF8000]" : "border-[#D2FF00]";
              const shadowGlow = isPapaya
                ? "shadow-[0_0_20px_#FF8000]"
                : "shadow-[0_0_20px_#D2FF00]";

              return (
                <div
                  key={callout.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(callout.id);
                  }}
                  onMouseEnter={() => {
                    if (onHoverPin) onHoverPin(callout.id);
                  }}
                  onMouseLeave={() => {
                    if (onHoverPin) onHoverPin(null);
                  }}
                  style={{
                    left: `${callout.x_percent}%`,
                    top: `${callout.y_percent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group transition-all duration-200 ${
                    isTierMatch
                      ? "opacity-100 scale-100"
                      : "opacity-25 scale-90 pointer-events-none"
                  }`}
                  title={`${callout.num}. ${callout.name}`}
                >
                  {/* Pulsing Radar Ring on Select or Hover */}
                  <span
                    className={`absolute -inset-2.5 rounded-full pointer-events-none transition-all ${
                      isSelected || isHovered
                        ? `animate-ping opacity-85 ${pingColor}`
                        : `opacity-0 group-hover:opacity-60 group-hover:animate-ping ${pingColor}`
                    }`}
                  />

                  {/* Clean 24px Circular Numbered Badge (Zero text clutter) */}
                  <div
                    className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 ${
                      isSelected || isHovered
                        ? isPapaya
                          ? `bg-[#FF8000] text-black ${shadowGlow} scale-125 border-2 border-white font-black`
                          : `bg-[#D2FF00] text-black ${shadowGlow} scale-125 border-2 border-white font-black`
                        : `bg-[#090B10] border ${activeBorderColor} text-[#D2FF00] hover:scale-120 hover:bg-[#D2FF00] hover:text-black font-bold shadow-lg`
                    }`}
                  >
                    <span className="text-[10px] font-mono leading-none select-none font-black">
                      {callout.num}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. CANVAS FOOTER STATUS STRIP */}
      <div className="px-5 py-2.5 bg-[#080B10] border-t border-[#1E2536] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#63758D]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
          <span className="text-white font-bold">MONOCOQUE EXPLODED MECHANICAL TEARDOWN</span>
          <span className="text-[#3A475C]">•</span>
          <span>ISO 7200 KNOLLING CAD SPECIFICATION</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span>DATUM: <span className="text-cyan-400 font-bold">{cursorCoords ? `${cursorCoords.x}%, ${cursorCoords.y}%` : "CALIBRATED"}</span></span>
          <span>ACTIVE TIER: <span className="text-[#D2FF00] font-bold uppercase">{activeTier}</span></span>
          <span>PINS INDEXED: <span className="text-white font-bold">{pins.length}</span></span>
          <span>TOLERANCE: <span className="text-[#FF8000] font-bold">±0.05 MM</span></span>
        </div>
      </div>
    </div>
  );
}

export default BlueprintCanvas;
