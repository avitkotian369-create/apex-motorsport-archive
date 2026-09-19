"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Zap,
  Gauge,
  Scale,
  ShieldAlert,
  Flame,
  ArrowRight,
  BookOpen,
  ChevronDown,
  Compass,
  Award,
  Maximize2,
  ChevronRight,
  Sliders,
  CheckCircle2,
  Volume2,
  VolumeX,
  Radio,
  Crosshair
} from "lucide-react";

interface VehicleArchiveCard {
  slug: string;
  brand: string;
  model: string;
  trim: string;
  year: number;
  engineCode: string;
  powertrain: string;
  output: string;
  torque: string;
  redline: string;
  weight: string;
  downforce: string;
  topSpeed: string;
  zeroToHundred: string;
  image: string;
  badge: string;
  accent: string;
}

const VEHICLES: VehicleArchiveCard[] = [
  {
    slug: "porsche-911-gt3-rs",
    brand: "Porsche",
    model: "911 GT3 RS",
    trim: "Weissach Homologation Spec (992.1)",
    year: 2024,
    engineCode: "MA1.77",
    powertrain: "4.0L Naturally Aspirated Flat-6 (Dry Sump)",
    output: "525 PS (386 kW)",
    torque: "465 Nm @ 6,300 RPM",
    redline: "9,000 RPM",
    weight: "1,450 kg (DIN)",
    downforce: "860 kg @ 285 km/h",
    topSpeed: "296 km/h",
    zeroToHundred: "3.2s",
    image: "/assets/porsche-gt3rs-cutaway.jpg",
    badge: "MOTORSPORT HOMOLOGATION",
    accent: "border-[#FF8000]/60 text-[#FF8000] bg-[#FF8000]/10"
  },
  {
    slug: "volkswagen-golf-r-mk8",
    brand: "Volkswagen",
    model: "Golf R",
    trim: "Mk8 20 Years Edition (Torque Vectoring)",
    year: 2024,
    engineCode: "EA888 Gen 4",
    powertrain: "2.0L TSI Cast-Iron Turbocharged 4-Cyl",
    output: "320 PS (235 kW)",
    torque: "420 Nm @ 2,100 RPM",
    redline: "6,800 RPM",
    weight: "1,551 kg (DIN)",
    downforce: "R-Performance Aero Foil",
    topSpeed: "270 km/h",
    zeroToHundred: "4.6s",
    image: "/assets/vw-golfr-cutaway.jpg",
    badge: "MQB EVO ARCHITECTURE",
    accent: "border-cyan-500/60 text-cyan-400 bg-cyan-500/10"
  },
  {
    slug: "mclaren-f1-xp5",
    brand: "McLaren",
    model: "F1 (XP5)",
    trim: "Central Cockpit Le Mans Benchmark",
    year: 1993,
    engineCode: "BMW S70/2",
    powertrain: "6.1L Naturally Aspirated 60° V12",
    output: "627 PS (461 kW)",
    torque: "650 Nm @ 5,600 RPM",
    redline: "7,500 RPM",
    weight: "1,138 kg (Dry)",
    downforce: "Active Dynamic Brake Foil",
    topSpeed: "386.4 km/h",
    zeroToHundred: "3.2s",
    image: "/assets/mclaren-f1-cutaway.jpg",
    badge: "CARBON TUB PIONEER",
    accent: "border-[#D2FF00]/60 text-[#D2FF00] bg-[#D2FF00]/10"
  },
  {
    slug: "ferrari-f40",
    brand: "Ferrari",
    model: "F40",
    trim: "Tipo F120A Homologation",
    year: 1987,
    engineCode: "Tipo F120A",
    powertrain: "2.9L Twin-Turbocharged 90° V8",
    output: "478 PS (352 kW)",
    torque: "577 Nm @ 4,000 RPM",
    redline: "7,750 RPM",
    weight: "1,100 kg (Dry)",
    downforce: "High-Downforce Gurney Wing",
    topSpeed: "324 km/h",
    zeroToHundred: "3.8s",
    image: "/assets/ferrari-f40-cutaway.jpg",
    badge: "KEVLAR TUBULAR SPACEFRAME",
    accent: "border-red-500/60 text-red-400 bg-red-500/10"
  },
  {
    slug: "nissan-skyline-gtr-r34",
    brand: "Nissan",
    model: "Skyline GT-R (R34)",
    trim: "V-Spec II Nürburgring Spec",
    year: 1999,
    engineCode: "RB26DETT",
    powertrain: "2.6L Twin-Turbo Cast-Iron Inline-6",
    output: "280+ PS (206 kW)",
    torque: "392 Nm @ 4,400 RPM",
    redline: "8,000 RPM",
    weight: "1,560 kg (DIN)",
    downforce: "Carbon Ground Effect Diffuser",
    topSpeed: "266 km/h",
    zeroToHundred: "4.8s",
    image: "/assets/skyline-r34-cutaway.jpg",
    badge: "ATTESA E-TS PRO AWD",
    accent: "border-blue-400/60 text-blue-400 bg-blue-500/10"
  }
];

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

// Interactive 3D Card Tilt Component for vehicles
function TiltVehicleCard({ car }: { car: VehicleArchiveCard }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out"
      }}
      className="bg-[#0C0E14] border border-[#1E2536] hover:border-[#D2FF00] rounded-2xl overflow-hidden group flex flex-col justify-between shadow-2xl hover:shadow-[0_0_40px_rgba(210,255,0,0.18)] relative"
    >
      {/* High-Voltage Corner Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D2FF00]/15 to-transparent pointer-events-none rounded-tr-2xl" />

      {/* Card Header & Full-Bleed Cutaway */}
      <div className="p-6 border-b border-[#171E2D] relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className={`px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-wider uppercase border ${car.accent}`}>
              {car.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-2 group-hover:text-[#D2FF00] transition-colors">
              {car.brand} {car.model}
            </h3>
            <div className="text-xs font-mono text-[#717A8C] mt-0.5">{car.trim}</div>
          </div>
          <div className="text-right font-mono bg-[#07090E] px-3 py-2 rounded-lg border border-[#1A2233]">
            <span className="text-[9px] text-[#616E82] uppercase tracking-wider block">ENGINE BLOCK</span>
            <span className="text-xs font-bold text-[#D2FF00]">{car.engineCode}</span>
          </div>
        </div>

        {/* Hero Cutaway Viewport with Full-Bleed look & Glowing Lime Online Badge */}
        <div className="relative w-full h-64 mt-4 rounded-xl bg-[#06080E] border border-[#182030] overflow-hidden flex items-center justify-center group-hover:border-[#D2FF00]/50 transition-colors">
          <Image
            src={car.image}
            alt={`${car.brand} ${car.model} Technical CAD Cutaway`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-3 filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
            priority
          />

          {/* Glowing #D2FF00 reticle badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#D2FF00]/50 text-[10px] font-mono font-bold text-[#D2FF00] flex items-center gap-1.5 shadow-[0_0_12px_rgba(210,255,0,0.3)]">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
            <Crosshair className="w-3 h-3 text-[#D2FF00]" />
            <span>ONLINE CAD</span>
          </div>

          <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#252C3D] text-[9px] font-mono text-[#8C98AC] flex items-center gap-1.5">
            <Maximize2 className="w-3 h-3 text-[#FF8000]" />
            <span>ORTHOGRAPHIC 4-VIEW SPEC</span>
          </div>
        </div>
      </div>

      {/* Immediate Technical Badges Grid */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-[#07090F] border border-[#161D2B]">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase">
              <Zap className="w-3 h-3 text-[#D2FF00]" />
              <span>OUTPUT</span>
            </div>
            <div className="font-bold text-white mt-1 text-sm">{car.output}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#07090F] border border-[#161D2B]">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase">
              <Gauge className="w-3 h-3 text-cyan-400" />
              <span>REDLINE</span>
            </div>
            <div className="font-bold text-white mt-1 text-sm">{car.redline}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#07090F] border border-[#161D2B]">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase">
              <Scale className="w-3 h-3 text-[#FF8000]" />
              <span>CURB WEIGHT</span>
            </div>
            <div className="font-bold text-white mt-1 text-sm">{car.weight}</div>
          </div>

          <div className="p-3 rounded-lg bg-[#07090F] border border-[#161D2B]">
            <div className="flex items-center gap-1 text-[9px] text-[#637085] uppercase">
              <Flame className="w-3 h-3 text-red-400" />
              <span>DOWNFORCE</span>
            </div>
            <div className="font-bold text-white mt-1 text-sm truncate">{car.downforce}</div>
          </div>
        </div>

        {/* Powertrain Detail strip */}
        <div className="p-3.5 bg-[#07090F] border border-[#161D2B] rounded-lg text-xs font-mono flex items-center justify-between text-[#8A95A8]">
          <span className="text-[#647185] uppercase text-[10px]">POWERTRAIN:</span>
          <span className="text-white font-medium">{car.powertrain}</span>
        </div>

        {/* Primary CTA button with Pulsing "READY FOR DISSECTION" indicator */}
        <Link
          href={`/car/${car.slug}`}
          className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-[#FF8000] to-[#D2FF00] hover:from-[#ff9426] hover:to-[#e1ff33] text-black font-black font-mono text-xs uppercase tracking-widest transition-all duration-200 shadow-[0_0_25px_rgba(255,128,0,0.3)] flex items-center justify-between group/btn cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>INSPECT SCHEMATIC</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-normal font-bold">
            <span className="bg-black/20 px-2 py-0.5 rounded text-black font-mono">READY FOR DISSECTION</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function MotorsportHomePage() {
  // 1. Full-Bleed Cockpit Bootup Preloader State
  const [loading, setLoading] = useState(true);
  const [loadPercent, setLoadPercent] = useState(0);
  const [currentGear, setCurrentGear] = useState(1);
  const [revCounter, setRevCounter] = useState(1200);
  const [soundActive, setSoundActive] = useState(true);

  // 2. Interactive Cursor Radial Spotlight State
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  // Search & filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  // Expanded article cards state
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(null);

  // Scroll transition detection state
  const [scrollProgress, setScrollProgress] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);

  // Full-bleed cockpit preloader bootup sequence (1.25s)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 1250;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      setLoadPercent(Math.floor(progress * 100));
      setRevCounter(Math.floor(1200 + progress * 7800)); // 1,200 to 9,000 RPM
      setCurrentGear(Math.min(6, Math.floor(1 + progress * 5.5)));

      if (progress >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setLoading(false);
        }, 180);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  // Global mousemove listener for smooth radial cursor spotlight
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll listener for fluid speed-line dynamics into CAD darkroom
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const threshold = 600;
      const p = Math.min(1, Math.max(0, y / threshold));
      setScrollProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        v.brand.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.trim.toLowerCase().includes(q) ||
        v.engineCode.toLowerCase().includes(q) ||
        v.powertrain.toLowerCase().includes(q);

      const matchesBrand =
        !selectedBrand || v.brand.toLowerCase() === selectedBrand.toLowerCase();

      return matchesSearch && matchesBrand;
    });
  }, [searchQuery, selectedBrand]);

  const scrollToVehicles = () => {
    if (deckRef.current) {
      deckRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      const el = document.getElementById("vehicle-cad-deck");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#E2E8F0] selection:bg-[#D2FF00] selection:text-black font-sans relative overflow-x-hidden bg-cad-grid">
      {/* 1. INTERACTIVE CURSOR RADIAL SPOTLIGHT (Papaya #FF8000 & Electric Lime #D2FF00 Dual-Tone Glow) */}
      <div
        className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 128, 0, 0.045), rgba(210, 255, 0, 0.035), transparent 75%)`
        }}
      />

      {/* 2. AMBIENT PARTICLES / AERODYNAMIC STREAMLINES DRIFT */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {/* Streamline Flow Line 1 */}
        <div className="absolute top-[22%] left-0 w-72 h-[1px] bg-gradient-to-r from-transparent via-[#D2FF00]/30 to-transparent animate-streamline-1" />
        {/* Streamline Flow Line 2 */}
        <div className="absolute top-[48%] left-0 w-96 h-[1px] bg-gradient-to-r from-transparent via-[#FF8000]/30 to-transparent animate-streamline-2" />
        {/* Streamline Flow Line 3 */}
        <div className="absolute top-[78%] left-0 w-80 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-streamline-3" />

        {/* Ambient Telemetry Floating Particles */}
        <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-[#D2FF00]/40 animate-particle-1" />
        <div className="absolute top-1/2 right-[18%] w-1 h-1 rounded-full bg-[#FF8000]/40 animate-particle-2" />
        <div className="absolute top-3/4 left-[30%] w-2 h-2 rounded-full bg-white/20 animate-particle-3" />
      </div>

      {/* 3. FULL-BLEED COCKPIT BOOTUP PRELOADER (Lando Norris / McLaren F1 HUD) */}
      {loading && (
        <div className="fixed inset-0 z-[100] bg-[#060709] bg-speed-lines flex flex-col justify-between p-6 sm:p-12 transition-opacity duration-300">
          {/* Top HUD Telemetry Bar */}
          <div className="flex items-center justify-between border-b border-[#1E2536] pb-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D2FF00] animate-ping" />
              <span className="text-white font-bold tracking-widest">[ APEX COCKPIT TELEMETRY ]</span>
              <span className="text-[#8A95A8] hidden sm:inline">WARMING RUNTIME CORES</span>
            </div>

            {/* Sound Toggle Icon & Wave Animation */}
            <button
              onClick={() => setSoundActive(!soundActive)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#222A3B] bg-[#0E131E] text-white hover:border-[#D2FF00] transition-colors cursor-pointer"
            >
              {soundActive ? (
                <>
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-[#D2FF00] rounded animate-audio-1" />
                    <span className="w-1 bg-[#D2FF00] rounded animate-audio-2" />
                    <span className="w-1 bg-[#D2FF00] rounded animate-audio-3" />
                    <span className="w-1 bg-[#D2FF00] rounded animate-audio-4" />
                  </div>
                  <Volume2 className="w-4 h-4 text-[#D2FF00]" />
                  <span className="text-[10px] text-[#D2FF00] font-bold">AUDIO LIVE</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-[#606D82]" />
                  <span className="text-[10px] text-[#606D82]">MUTED</span>
                </>
              )}
            </button>
          </div>

          {/* Center Full-Bleed Cockpit HUD */}
          <div className="max-w-4xl mx-auto w-full text-center space-y-8 my-auto relative">
            <div className="text-[11px] font-mono tracking-widest text-[#D2FF00] uppercase flex items-center justify-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LAUNCH CONTROL SEQUENTIAL CALIBRATION</span>
            </div>

            {/* Massive Gear Counter & Rev Gauge */}
            <div className="relative inline-block">
              <div className="text-8xl sm:text-9xl font-black text-white font-mono tracking-tighter flex items-center justify-center">
                <span>{currentGear}</span>
                <span className="text-lg sm:text-2xl text-[#D2FF00] ml-3 font-sans font-bold uppercase tracking-wider">
                  GEAR
                </span>
              </div>
            </div>

            {/* Electric Lime Rev Counter readout */}
            <div className="font-mono">
              <div className="text-xs uppercase tracking-widest text-[#717A8C]">LIVE PADDOCK TACHOMETER</div>
              <div className="text-4xl sm:text-6xl font-bold text-[#D2FF00] tracking-tight mt-1">
                {revCounter.toLocaleString()} <span className="text-lg text-white/50 font-normal">RPM</span>
              </div>
            </div>

            {/* High-Voltage Sweeping Rev Arc / Bar */}
            <div className="max-w-xl mx-auto space-y-2">
              <div className="w-full h-3.5 bg-[#121622] rounded-full overflow-hidden border border-[#222A3B] p-0.5 shadow-[0_0_20px_rgba(210,255,0,0.15)]">
                <div
                  className="h-full bg-gradient-to-r from-[#FF8000] via-[#D2FF00] to-emerald-400 rounded-full transition-all duration-75"
                  style={{ width: `${loadPercent}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-[#8C98AC]">
                <span>1,200 IDLE</span>
                <span className="text-white font-bold text-[#D2FF00]">{loadPercent}% BOOT COMPLETE</span>
                <span>9,000 MAX REDLINE</span>
              </div>
            </div>
          </div>

          {/* Bottom Cockpit Status Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#1E2536] pt-4 font-mono text-[11px] text-[#637085] gap-2">
            <span>MOTORSPORT CAD ENGINE V4.5</span>
            <span className="text-white font-bold uppercase tracking-widest">
              INITIALIZING FACTORY BLUEPRINT ARCHIVE
            </span>
            <span>SYSTEM RUNTIME: OPTIMAL</span>
          </div>
        </div>
      )}

      {/* TOP EDITORIAL BRANDING BAR (McLaren & Lando Minimalist Style) */}
      <header className="sticky top-0 z-40 bg-[#08090C]/90 backdrop-blur-md border-b border-[#1A1E29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#D2FF00] flex items-center justify-center text-black font-black text-sm tracking-tighter shadow-[0_0_15px_rgba(210,255,0,0.5)]">
              AX
            </div>
            <div>
              <span className="font-mono font-bold tracking-wider text-sm text-white">APEX ARCHIVE</span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-[#717A8C] border-l border-[#222838] pl-2">
                MOTORSPORT ANATOMY TERMINAL
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <button
              onClick={scrollToVehicles}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#222838] bg-[#0E121B] hover:border-[#D2FF00]/50 hover:text-[#D2FF00] transition-colors cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>CAD PADDOCK DECK</span>
            </button>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#10141E] border border-[#1E2433] text-[11px] text-[#8A95A8]">
              <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
              <span>CAD V4.5 LIVE</span>
            </div>
          </div>
        </div>
      </header>

      {/* 4. HERO SECTION OVERHAUL WITH GHOSTED WATERMARKS & TECHNICAL ELEVATION LINES */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden bg-speed-lines">
        {/* Kinetic Radial Ambient Glow in McLaren Papaya & High-Voltage Lime */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-[#FF8000]/15 to-[#D2FF00]/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

        {/* Ghosted Motorsport Architectural Blueprint Watermark Behind Hero */}
        <div className="absolute top-12 right-4 select-none pointer-events-none opacity-[0.035] font-mono font-black text-7xl sm:text-9xl tracking-tighter text-white z-0 leading-none">
          TYPE 992 // SPEC 01
        </div>

        {/* Ghosted Technical Blueprint Elevation Lines Overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#D2FF00" strokeWidth="1" strokeDasharray="6 6" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#FF8000" strokeWidth="1" strokeDasharray="8 8" />
          <circle cx="85%" cy="40%" r="180" stroke="#FFFFFF" strokeWidth="1" fill="none" strokeDasharray="4 8" />
          <circle cx="85%" cy="40%" r="120" stroke="#D2FF00" strokeWidth="1" fill="none" strokeDasharray="2 4" />
        </svg>

        <div className="space-y-8 max-w-5xl relative z-10">
          {/* Eyebrow badge with Electric Lime */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#D2FF00]/40 bg-[#D2FF00]/10 text-[#D2FF00] font-mono text-xs tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
            <Award className="w-3.5 h-3.5" />
            <span>APEX ARCHIVE — THE MOTORSPORT & AUTOMOTIVE ANATOMY TERMINAL</span>
          </div>

          {/* Massive Kinetic Typography */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95] uppercase">
            DECONSTRUCT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FF8000] to-[#D2FF00]">
              MOTORSPORT
            </span> <br />
            ARCHITECTURE.
          </h1>

          {/* Clean Subhead stating exact purpose */}
          <p className="text-base sm:text-xl text-[#94A3B8] leading-relaxed max-w-3xl font-normal">
            A dedicated motorsport engineering terminal built for car enthusiasts, track drivers, and technical builders
            to explore authentic factory CAD schematics, deep mechanical teardowns, and racing physics with zero marketing clutter.
          </p>

          {/* Hero CTAs with Papaya & Lime accents */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToVehicles}
              className="px-7 py-3.5 rounded-lg bg-[#D2FF00] hover:bg-[#e0ff33] text-black font-black text-xs uppercase tracking-widest transition-all duration-200 shadow-[0_0_25px_rgba(210,255,0,0.35)] flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>EXPLORE VEHICLE DECK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#daily-editorial"
              className="px-6 py-3.5 rounded-lg border border-[#263145] hover:border-[#FF8000]/50 bg-[#0D111A] text-[#C4CDD9] font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#FF8000]" />
              <span>READ TECHNICAL DISPATCH</span>
            </a>
          </div>
        </div>

        {/* Titanium Rules & Track Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-8 border-t border-[#1F2738] text-xs font-mono relative z-10">
          <div className="p-4 bg-[#0B0E16]/80 backdrop-blur border border-[#1A2233] rounded-lg">
            <div className="text-[#647087] uppercase text-[10px] tracking-wider">SCHEMATICS DATABASE</div>
            <div className="text-xl font-bold text-white mt-1">HOMOLOGATION CAD</div>
            <div className="text-[#D2FF00] text-[10px] mt-1.5 flex items-center gap-1">
              <span>●</span> GT3 RS & MK8 GOLF R
            </div>
          </div>
          <div className="p-4 bg-[#0B0E16]/80 backdrop-blur border border-[#1A2233] rounded-lg">
            <div className="text-[#647087] uppercase text-[10px] tracking-wider">AERO DOWNFORCE</div>
            <div className="text-xl font-bold text-white mt-1">860 KG @ 285 KM/H</div>
            <div className="text-[#FF8000] text-[10px] mt-1.5 flex items-center gap-1">
              <span>●</span> ACTIVE HYDRAULIC DRS
            </div>
          </div>
          <div className="p-4 bg-[#0B0E16]/80 backdrop-blur border border-[#1A2233] rounded-lg">
            <div className="text-[#647087] uppercase text-[10px] tracking-wider">ALLOY CHEMISTRY</div>
            <div className="text-xl font-bold text-white mt-1">AZ31B & TI-6AL-4V</div>
            <div className="text-cyan-400 text-[10px] mt-1.5 flex items-center gap-1">
              <span>●</span> FULL TRACEABILITY
            </div>
          </div>
          <div className="p-4 bg-[#0B0E16]/80 backdrop-blur border border-[#1A2233] rounded-lg">
            <div className="text-[#647087] uppercase text-[10px] tracking-wider">SUBSYSTEM ISOLATION</div>
            <div className="text-xl font-bold text-white mt-1">3 ISOLATED TIERS</div>
            <div className="text-emerald-400 text-[10px] mt-1.5 flex items-center gap-1">
              <span>●</span> CHASSIS • ENGINE • CABIN
            </div>
          </div>
        </div>
      </section>

      {/* 5. DAILY ENGINEERING, SAFETY & MODIFICATION FEED (Faint Racing Apex Kerb Stripes & Fade Masks) */}
      <section id="daily-editorial" className="py-20 bg-[#06070A] bg-kerb-stripes border-y border-[#161B26] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
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
                  className={`bg-[#0C0F17]/90 backdrop-blur-md border rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group shadow-xl ${
                    isExpanded
                      ? "border-[#D2FF00] bg-[#0E131E] shadow-[0_0_30px_rgba(210,255,0,0.15)] -translate-y-1.5"
                      : "border-[#1C2230] hover:border-[#2E394E]"
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

      {/* 6. INFINITE KINETIC TICKER MARQUEE (High-Voltage Motorsport Accent) */}
      <div className="w-full bg-[#D2FF00] text-black py-3 overflow-hidden font-mono text-xs sm:text-sm font-black tracking-widest uppercase select-none shadow-[0_0_25px_rgba(210,255,0,0.3)] relative z-10">
        <div className="animate-marquee-infinite whitespace-nowrap">
          <span className="mx-4">{"/// APEX MOTORSPORT CAD ARCHIVE"}</span>
          <span className="mx-4">{"/// 9,000 RPM FLAT-6"}</span>
          <span className="mx-4">{"/// FIA HOMOLOGATED"}</span>
          <span className="mx-4">{"/// CARBON MONOCOQUE DISSECTION"}</span>
          <span className="mx-4">{"/// 860 KG ACTIVE DRS DOWNFORCE"}</span>
          <span className="mx-4">{"/// EA888 TSI 4MOTION"}</span>
          <span className="mx-4">{"/// APEX MOTORSPORT CAD ARCHIVE"}</span>
          <span className="mx-4">{"/// 9,000 RPM FLAT-6"}</span>
          <span className="mx-4">{"/// FIA HOMOLOGATED"}</span>
          <span className="mx-4">{"/// CARBON MONOCOQUE DISSECTION"}</span>
          <span className="mx-4">{"/// 860 KG ACTIVE DRS DOWNFORCE"}</span>
          <span className="mx-4">{"/// EA888 TSI 4MOTION"}</span>
        </div>
      </div>

      {/* 7. FLUID SCROLL DYNAMICS & SPEED-LINE TRACK (Lando Norris Style) */}
      <div
        className="py-16 flex flex-col items-center justify-center text-center cursor-pointer group transition-all duration-500 relative z-10"
        onClick={scrollToVehicles}
        style={{
          opacity: 0.75 + scrollProgress * 0.25,
          transform: `scale(${0.98 + scrollProgress * 0.02})`
        }}
      >
        <span className="text-[11px] font-mono tracking-widest text-[#D2FF00] uppercase mb-3 group-hover:text-white transition-colors flex items-center gap-2">
          <span className="w-2 h-0.5 bg-[#D2FF00]" />
          SCROLL TO ENTER PADDOCK CAD DARKROOM
          <span className="w-2 h-0.5 bg-[#D2FF00]" />
        </span>

        {/* Speed-line track that stretches downward */}
        <div className="w-6 h-12 border-2 border-[#2C364A] group-hover:border-[#D2FF00] rounded-full flex items-start justify-center p-1.5 transition-colors shadow-[0_0_15px_rgba(210,255,0,0.2)]">
          <div
            className="w-1.5 bg-[#D2FF00] rounded-full animate-bounce"
            style={{ height: `${8 + scrollProgress * 12}px` }}
          />
        </div>
        <ChevronDown className="w-4 h-4 text-[#D2FF00] group-hover:text-white mt-2 animate-pulse" />
      </div>

      {/* 8. INTERACTIVE VEHICLE SEARCH DECK & CAD DARKROOM (3D Card Tilt + CAD Coordinate Axes) */}
      <section
        id="vehicle-cad-deck"
        ref={deckRef}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-700 relative z-10"
        style={{
          filter: `brightness(${0.95 + scrollProgress * 0.05})`
        }}
      >
        {/* Faint CAD Coordinate Axes Watermarks (X, Y, Z Datum Marks) */}
        <div className="absolute top-4 left-6 font-mono text-[9px] text-[#4E5B73] opacity-40 select-none pointer-events-none hidden md:block">
          <div>DATUM ORIGIN: [X: 0.000, Y: 0.000, Z: 0.000]</div>
          <div>PROJECTION: ISO 7200 ORTHOGRAPHIC 1:10</div>
        </div>
        <div className="absolute top-4 right-6 font-mono text-[9px] text-[#4E5B73] opacity-40 select-none pointer-events-none hidden md:block text-right">
          <div>CAD REGISTRY REVISION: D.4</div>
          <div>SURFACE TOLERANCE: ±0.05 MM</div>
        </div>

        {/* Sticky-ready prominent Search & Brand Filter Bar */}
        <div className="sticky top-16 z-30 bg-[#08090C]/95 backdrop-blur-xl border border-[#1F273A] p-6 rounded-2xl shadow-2xl mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-[#D2FF00] font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" />
                <span>[ 02. FACTORY CAD INSPECTION REGISTRY ]</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                ACTIVE VEHICLE SCHEMATICS
              </h2>
            </div>

            {/* Quick-select Brand Pills (All, Porsche, Volkswagen, McLaren, Ferrari) */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {[
                { label: "ALL SCHEMATICS", value: null },
                { label: "PORSCHE", value: "Porsche" },
                { label: "VOLKSWAGEN", value: "Volkswagen" },
                { label: "MCLAREN", value: "McLaren" },
                { label: "FERRARI", value: "Ferrari" },
                { label: "NISSAN", value: "Nissan" }
              ].map((pill) => {
                const isActive = selectedBrand === pill.value;
                return (
                  <button
                    key={pill.label}
                    onClick={() => setSelectedBrand(pill.value)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#D2FF00] text-black shadow-[0_0_15px_rgba(210,255,0,0.45)] scale-105"
                        : "bg-[#10141F] border border-[#222A3B] text-[#8C98AC] hover:border-[#D2FF00]/40 hover:text-white"
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Instant Fuzzy Search Bar */}
          <div className="mt-5 relative">
            <Search className="w-4 h-4 text-[#717A8C] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by chassis code, model, or engine (e.g. GT3, EA888, Flat-6, 4.0L, 992.1)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-[#0C1019] border border-[#222A3B] rounded-xl text-sm text-white placeholder-[#5A6578] focus:outline-none focus:border-[#D2FF00] font-mono transition-colors shadow-inner"
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
        </div>

        {/* Visual Vehicle Showcase Cards with 3D Mouse Perspective Tilt */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredVehicles.map((car) => (
            <TiltVehicleCard key={car.slug} car={car} />
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

      {/* FOOTER */}
      <footer className="mt-24 border-t border-[#161B26] bg-[#050608] py-10 text-center text-xs font-mono text-[#5A6578] relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00]" />
            <span className="text-white font-bold">APEX ARCHIVE</span>
            <span>— MOTORSPORT ANATOMY & SCHEMATICS</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>ENGINEERING PURISTS ONLY</span>
            <span>•</span>
            <span>TOLERANCES TO ISO 7200</span>
            <span>•</span>
            <span>ZERO CLUTTER</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
