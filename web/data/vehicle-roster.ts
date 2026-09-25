export interface VehicleRosterItem {
  slug: string;
  brand: string;
  model: string;
  trim: string;
  year: number;
  homologationTag: string;
  engineBlockCode: string;
  powertrain: string;
  output: string;
  torque: string;
  redline: string;
  weight: string;
  downforce: string;
  topSpeed: string;
  zeroToHundred: string;
  image: string;
  knollingImageUrl: string;
  explodedImage?: string;
  accentColor: string;
  accentBorder: string;
  accentText: string;
  description: string;
  tierSummary: {
    aero: string;
    monocoque: string;
    powertrain: string;
    brakes_gear: string;
    hardware: string;
  };
}

export const VEHICLE_ROSTER: VehicleRosterItem[] = [
  {
    slug: "porsche-911-gt3-rs",
    brand: "Porsche",
    model: "911 GT3 RS",
    trim: "Weissach Package (992.1)",
    year: 2024,
    homologationTag: "WEISSACH HOMOLOGATION",
    engineBlockCode: "MA1.77 // 4.0L FLAT-6",
    powertrain: "4.0L Naturally Aspirated Boxer-6 (MA1.77 / Dry Sump)",
    output: "525 PS (386 kW)",
    torque: "465 Nm @ 6,300 RPM",
    redline: "9,000 RPM",
    weight: "1,450 kg (DIN)",
    downforce: "860 kg @ 285 km/h",
    topSpeed: "296 km/h",
    zeroToHundred: "3.2s",
    image: "/assets/porsche-gt3rs-knolling-teardown.jpg",
    knollingImageUrl: "/assets/porsche-gt3rs-knolling-teardown.jpg",
    explodedImage: "/assets/porsche-gt3rs-knolling-teardown.jpg",
    accentColor: "rgba(255, 128, 0, 0.15)",
    accentBorder: "border-[#FF8000]/60",
    accentText: "text-[#FF8000]",
    description: "Active swan-neck DRS wing, S-duct nostrils, AZ31B magnesium roof, and titanium valvetrain revving to 9,000 RPM.",
    tierSummary: {
      aero: "Dual-Element DRS Swan-Neck Wing (860 kg @ 285 km/h)",
      monocoque: "AZ31B Magnesium Roof (-7.5mm CoG) & FIA Half-Cage",
      powertrain: "4.0L Flat-6 NA (525 PS) with 6 ITBs & 7-Speed PDK",
      brakes_gear: "410mm PCCB Carbon-Ceramic Rotors & Teardrop Wishbones",
      hardware: "Torque-to-Yield Monocoque Dacromet Fastener Grid"
    }
  },
  {
    slug: "bmw-m4-csl",
    brand: "BMW",
    model: "M4 CSL",
    trim: "G82 Competition Sport Lightweight (-100 kg)",
    year: 2023,
    homologationTag: "CSL LIGHTWEIGHT HOMOLOGATION",
    engineBlockCode: "S58B30T0 // 3.0L TWIN-TURBO",
    powertrain: "3.0L Twin-Turbo Inline-6 (S58B30T0 / Closed-Deck)",
    output: "550 PS (405 kW)",
    torque: "650 Nm @ 2,750 RPM",
    redline: "7,200 RPM",
    weight: "1,625 kg (DIN)",
    downforce: "220 kg @ 250 km/h",
    topSpeed: "307 km/h",
    zeroToHundred: "3.7s",
    image: "/assets/bmw-m4-knolling-teardown.jpg",
    knollingImageUrl: "/assets/bmw-m4-knolling-teardown.jpg",
    explodedImage: "/assets/bmw-m4-knolling-teardown.jpg",
    accentColor: "rgba(239, 68, 68, 0.15)",
    accentBorder: "border-red-500/60",
    accentText: "text-red-400",
    description: "Authentic knolling teardown benchmark: ducktail CFRP aero, 3D-printed cylinder head core, and titanium exhaust.",
    tierSummary: {
      aero: "Integrated CFRP Ducktail & 3-Stage Front Splitter",
      monocoque: "Structural Unibody (-100 kg) & Cast Aluminum Strut Truss",
      powertrain: "550 PS S58 Twin-Turbo I6 with 3D Core Head & 8-Spd M Steptronic",
      brakes_gear: "M Carbon-Ceramic 6-Piston Calipers & Inverted Track Dampers",
      hardware: "High-Tensile Dacromet Subframe Yield Stud Grid"
    }
  },
  {
    slug: "mclaren-f1-xp5",
    brand: "McLaren",
    model: "F1 (XP5)",
    trim: "Central Cockpit Le Mans Benchmark",
    year: 1993,
    homologationTag: "LE MANS BENCHMARK HOMOLOGATION",
    engineBlockCode: "BMW S70/2 // 6.1L 60° V12",
    powertrain: "6.1L Naturally Aspirated 60° V12 (S70/2 / Gold Foil Bay)",
    output: "627 PS (461 kW)",
    torque: "650 Nm @ 5,600 RPM",
    redline: "7,500 RPM",
    weight: "1,138 kg (Dry)",
    downforce: "Active Dynamic Brake Foil",
    topSpeed: "386.4 km/h",
    zeroToHundred: "3.2s",
    image: "/assets/mclaren-f1-knolling-teardown.jpg",
    knollingImageUrl: "/assets/mclaren-f1-knolling-teardown.jpg",
    explodedImage: "/assets/mclaren-f1-knolling-teardown.jpg",
    accentColor: "rgba(210, 255, 0, 0.15)",
    accentBorder: "border-[#D2FF00]/60",
    accentText: "text-[#D2FF00]",
    description: "Pioneering monolithic carbon monocoque, central driving position, gold foil thermal insulation, and transverse V12 transaxle.",
    tierSummary: {
      aero: "Active 30° Pop-Up Dynamic Airbrake & Dihedral Butterfly Doors",
      monocoque: "First Monolithic Carbon Monocoque Tub & Central Driver Cell",
      powertrain: "BMW Motorsport 6.1L V12 (627 PS) & Transverse 6-Speed Transaxle",
      brakes_gear: "Inboard Pushrod Cantilever Dampers & Non-Servo Brembo Brakes",
      hardware: "Individually Weighed Mil-Spec Grade 5 Titanium Fastener Grid"
    }
  },
  {
    slug: "ferrari-f40",
    brand: "Ferrari",
    model: "F40",
    trim: "Tipo F120AB Kevlar Homologation",
    year: 1987,
    homologationTag: "TIPO F120AB HOMOLOGATION",
    engineBlockCode: "TIPO F120A // 2.9L TT V8",
    powertrain: "2.9L Twin-Turbocharged 90° V8 (Tipo F120A / Dual IHI)",
    output: "478 PS (352 kW)",
    torque: "577 Nm @ 4,000 RPM",
    redline: "7,750 RPM",
    weight: "1,100 kg (Dry)",
    downforce: "Fixed High-Downforce Gurney",
    topSpeed: "324 km/h",
    zeroToHundred: "3.8s",
    image: "/assets/ferrari-f40-knolling-teardown.jpg",
    knollingImageUrl: "/assets/ferrari-f40-knolling-teardown.jpg",
    explodedImage: "/assets/ferrari-f40-knolling-teardown.jpg",
    accentColor: "rgba(239, 68, 68, 0.15)",
    accentBorder: "border-red-500/60",
    accentText: "text-red-400",
    description: "Raw Kevlar-Nomex clamshells, open-gate dog-leg manual, tubular steel spaceframe, and explosive twin-turbo boost.",
    tierSummary: {
      aero: "Fixed High-Downforce Gurney Wing & Full Kevlar Clamshells",
      monocoque: "Tubular 25CrMo4 Spaceframe with Bonded Kevlar Bulkheads",
      powertrain: "Tipo F120A Twin-Turbo 2.9L V8 & Triple Center-Exit Exhaust",
      brakes_gear: "Brembo 4-Piston Unassisted Calipers & Cross-Drilled Steel Discs",
      hardware: "Cadmium-Plated Motorsport Spaceframe Hardware Grid"
    }
  },
  {
    slug: "nissan-skyline-gtr-r34",
    brand: "Nissan",
    model: "Skyline GT-R (R34)",
    trim: "V-Spec II Nürburgring Spec",
    year: 1999,
    homologationTag: "V-SPEC II NÜRBURGRING HOMOLOGATION",
    engineBlockCode: "RB26DETT // 2.6L TT I6",
    powertrain: "2.6L Twin-Turbocharged Cast-Iron Inline-6 (RB26DETT)",
    output: "280+ PS (206 kW)",
    torque: "392 Nm @ 4,400 RPM",
    redline: "8,000 RPM",
    weight: "1,560 kg (DIN)",
    downforce: "Carbon Ground Effect Diffuser",
    topSpeed: "266 km/h",
    zeroToHundred: "4.8s",
    image: "/assets/skyline-r34-knolling-teardown.jpg",
    knollingImageUrl: "/assets/skyline-r34-knolling-teardown.jpg",
    explodedImage: "/assets/skyline-r34-knolling-teardown.jpg",
    accentColor: "rgba(59, 130, 246, 0.15)",
    accentBorder: "border-blue-500/60",
    accentText: "text-blue-400",
    description: "ATTESA E-TS Pro electro-hydraulic AWD, Getrag 6-speed, carbon underbody venturi diffusers, and bulletproof RB26DETT.",
    tierSummary: {
      aero: "Adjustable 4-Position Carbon Wing & Nismo Vented NACA Hood",
      monocoque: "V-Spec II Stiffened Unibody & Carbon Underbody Ground Venturi",
      powertrain: "RB26DETT Twin-Turbo I6 with 6 ITBs & Getrag 6-Speed ATTESA AWD",
      brakes_gear: "Brembo Gold Monobloc Calipers & Nismo Inverted Monotube Struts",
      hardware: "Grade 10.9 Zinc-Yellow High-Torque Multi-Link Hardware Grid"
    }
  },
  {
    slug: "volkswagen-golf-r-mk8",
    brand: "Volkswagen",
    model: "Golf R",
    trim: "Mk8 20 Years Edition (MQB Evo)",
    year: 2024,
    homologationTag: "20 YEARS HOMOLOGATION SPEC",
    engineBlockCode: "EA888 GEN 4 // 2.0L TSI",
    powertrain: "2.0L TSI Cast-Iron Turbocharged 4-Cyl (EA888 Gen 4)",
    output: "320 PS (235 kW)",
    torque: "420 Nm @ 2,100 RPM",
    redline: "6,800 RPM",
    weight: "1,551 kg (DIN)",
    downforce: "R-Performance Aero Foil",
    topSpeed: "270 km/h",
    zeroToHundred: "4.6s",
    image: "/assets/vw-golfr-knolling-teardown.jpg",
    knollingImageUrl: "/assets/vw-golfr-knolling-teardown.jpg",
    explodedImage: "/assets/vw-golfr-knolling-teardown.jpg",
    accentColor: "rgba(6, 182, 212, 0.15)",
    accentBorder: "border-cyan-500/60",
    accentText: "text-cyan-400",
    description: "MQB Evo hot-stamped boron steel unibody, 200Hz DCC electromagnetic damping, and R-Performance torque-vectoring rear differential.",
    tierSummary: {
      aero: "Dual-Level Roof Spoiler, Aluminum Hood & Oversized Intercooler Ducts",
      monocoque: "MQB Evo Hot-Stamped Boron Steel Unibody & Cast Aluminum Subframe",
      powertrain: "EA888 Gen 4 2.0L TSI (320 PS), 7-Spd DSG & Torque Vectoring Splitter",
      brakes_gear: "Akebono 2-Piston Floating Calipers & DCC Adaptive Electromagnetic Struts",
      hardware: "Micro-Alloyed Torx T25/T30 & Subframe Stretch Bolt Hardware Grid"
    }
  }
];

export function getVehicleBySlug(slug: string): VehicleRosterItem {
  const clean = (slug || "").toLowerCase();
  const match = VEHICLE_ROSTER.find((item) => {
    if (item.slug === clean) return true;
    if (clean.includes("bmw") || clean.includes("m4") || clean.includes("csl")) return item.slug === "bmw-m4-csl";
    if (clean.includes("mclaren") || clean.includes("f1") || clean.includes("xp5")) return item.slug === "mclaren-f1-xp5";
    if (clean.includes("ferrari") || clean.includes("f40")) return item.slug === "ferrari-f40";
    if (clean.includes("skyline") || clean.includes("r34") || clean.includes("gtr")) return item.slug === "nissan-skyline-gtr-r34";
    if (clean.includes("golf") || clean.includes("vw") || clean.includes("volkswagen")) return item.slug === "volkswagen-golf-r-mk8";
    if (clean.includes("porsche") || clean.includes("gt3") || clean.includes("911")) return item.slug === "porsche-911-gt3-rs";
    return false;
  });
  return match || VEHICLE_ROSTER[0];
}
