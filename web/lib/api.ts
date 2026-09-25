const API_BASE_URL = credentialsBaseUrl();

function credentialsBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side execution: target FastAPI default port
    return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  }
  // Server-side execution
  return process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
}

export interface FastenerItem {
  id: number;
  part_id: number;
  name: string;
  fastener_type: string;
  thread_size: string;
  drive_type: string;
  grade: string;
  torque_spec_nm: number;
  quantity_used: number;
  x_percent: number;
  y_percent: number;
  notes?: string | null;
}

export interface PartItem {
  id: number;
  car_id: number;
  subsystem_id: number;
  part_number: string;
  name: string;
  category?: string | null;
  sub_assembly?: string | null;
  physical_layer?: string | null;
  material?: string | null;
  surface_treatment?: string | null;
  weight_kg?: number | null;
  function?: string | null;
  manufacturing_process?: string | null;
  joint_spec?: string | null;
  fasteners: FastenerItem[];
}

export interface SubsystemItem {
  id: number;
  name: string;
  description?: string | null;
}

export interface CarSummary {
  id: number;
  brand_id: number;
  model: string;
  trim?: string | null;
  year: number;
  vin_prefix?: string | null;
  image_url?: string | null;
}

export interface CarDetail extends CarSummary {
  parts: PartItem[];
}

export interface BrandItem {
  id: number;
  name: string;
  country?: string | null;
  logo_url?: string | null;
  cars: CarSummary[];
}

export interface DailyTriviaItem {
  date: string;
  category: "car" | "bike";
  vehicle_model: string;
  title: string;
  question: string;
  answer: string;
  technical_breakdown: string;
  engineering_fact: string;
  fastener_highlight: {
    part: string;
    spec: string;
    torque: string;
  };
}

// ============================================================================
// RESILIENT FALLBACK MOCK DATA (Instant rendering during Render cold-start)
// ============================================================================

export const FALLBACK_SUBSYSTEMS: SubsystemItem[] = [
  { id: 1, name: "Powertrain", description: "Engine block, valvetrain, titanium exhaust, individual throttle bodies" },
  { id: 2, name: "Cabin & Doors", description: "CFRP lightweight door shells, textile pull loops, FIA carbon bucket seats" },
  { id: 3, name: "BIW & Roof", description: "Hybrid aluminum-steel monocoque, AZ31B magnesium double-bubble roof" },
  { id: 4, name: "Chassis & Aero", description: "Active swan-neck wing, front S-duct nostrils, teardrop wishbones, PCCB carbon-ceramic brakes" },
];

export const FALLBACK_CARS: CarSummary[] = [
  {
    id: 1,
    brand_id: 1,
    model: "911 GT3 RS",
    trim: "Weissach Homologation Package (992.1)",
    year: 2024,
    vin_prefix: "WP0AF2A9",
    image_url: "/assets/porsche-gt3rs-cutaway.jpg",
  },
  {
    id: 2,
    brand_id: 2,
    model: "Golf R",
    trim: "Mk8 20 Years Edition",
    year: 2024,
    vin_prefix: "WVWZZZCD",
    image_url: "/assets/vw-golfr-cutaway.jpg",
  },
  {
    id: 3,
    brand_id: 3,
    model: "F1 (XP5)",
    trim: "Central Cockpit Le Mans Benchmark",
    year: 1993,
    vin_prefix: "SA9AB54B",
    image_url: "/assets/mclaren-f1-cutaway.jpg",
  },
  {
    id: 4,
    brand_id: 4,
    model: "F40",
    trim: "Tipo F120A Homologation",
    year: 1987,
    vin_prefix: "ZFFGJ34B",
    image_url: "/assets/ferrari-f40-cutaway.jpg",
  },
  {
    id: 5,
    brand_id: 5,
    model: "Skyline GT-R (R34)",
    trim: "V-Spec II Nürburgring Spec",
    year: 1999,
    vin_prefix: "BNR34-00",
    image_url: "/assets/skyline-r34-cutaway.jpg",
  },
];

export const FALLBACK_BRANDS: BrandItem[] = [
  { id: 1, name: "Porsche", country: "Germany", logo_url: "/logos/porsche.svg", cars: [FALLBACK_CARS[0]] },
  { id: 2, name: "Volkswagen", country: "Germany", logo_url: "/logos/vw.svg", cars: [FALLBACK_CARS[1]] },
  { id: 3, name: "McLaren", country: "United Kingdom", logo_url: "/logos/mclaren.svg", cars: [FALLBACK_CARS[2]] },
  { id: 4, name: "Ferrari", country: "Italy", logo_url: "/logos/ferrari.svg", cars: [FALLBACK_CARS[3]] },
  { id: 5, name: "Nissan", country: "Japan", logo_url: "/logos/nissan.svg", cars: [FALLBACK_CARS[4]] },
];

export const FALLBACK_CAR_DETAILS: Record<number, CarDetail> = {
  1: {
    ...FALLBACK_CARS[0],
    parts: [
      {
        id: 101,
        car_id: 1,
        subsystem_id: 3,
        part_number: "992-817-010-MG",
        name: "AZ31B Hydroformed Magnesium Roof",
        category: "BIW & Roof",
        sub_assembly: "Monocoque Roof Panel",
        physical_layer: "Outer Skin",
        material: "AZ31B-H24 Magnesium Alloy (1.1mm)",
        surface_treatment: "Keronite PEO Electrolytic Layer",
        weight_kg: 3.4,
        function: "Lowers center of gravity by 7.5 mm while channeling laminar airflow into rear wing",
        joint_spec: "Dow Betamate 2090 Epoxy + M5 Ti Fasteners",
        fasteners: [
          {
            id: 1001,
            part_id: 101,
            name: "M5 Grade 5 Titanium Roof Fastener",
            fastener_type: "Bolt",
            thread_size: "M5x0.8",
            drive_type: "Torx T20",
            grade: "Grade 5 Titanium (Ti-6Al-4V)",
            torque_spec_nm: 6.2,
            quantity_used: 18,
            x_percent: 51.5,
            y_percent: 26.0,
            notes: "Torqued with Loctite 243 medium threadlocker"
          }
        ]
      },
      {
        id: 102,
        car_id: 1,
        subsystem_id: 4,
        part_number: "992-827-901-RS",
        name: "Dual-Element Active DRS Swan-Neck Rear Wing",
        category: "Chassis & Aero",
        sub_assembly: "Active Aerodynamics",
        physical_layer: "Aero Foil",
        material: "High-Modulus Pre-Preg Carbon Fiber",
        surface_treatment: "Autoclave High-Gloss Clearcoat",
        weight_kg: 8.8,
        function: "Generates 860 kg downforce at 285 km/h with 34-degree electro-hydraulic DRS pitch",
        joint_spec: "M8x1.25 Grade 10.9 into Shock Towers",
        fasteners: [
          {
            id: 1002,
            part_id: 102,
            name: "M8 Swan-Neck Pylon Anchor Bolt",
            fastener_type: "Bolt",
            thread_size: "M8x1.25",
            drive_type: "Torx T40",
            grade: "10.9 High-Tensile Steel",
            torque_spec_nm: 42.0,
            quantity_used: 8,
            x_percent: 81.0,
            y_percent: 28.0,
            notes: "Anchors directly into rear suspension casting nodes"
          }
        ]
      },
      {
        id: 103,
        car_id: 1,
        subsystem_id: 1,
        part_number: "992-103-020-TI",
        name: "Micro-Forged Titanium H-Beam Connecting Rod",
        category: "Powertrain",
        sub_assembly: "Reciprocating Assembly",
        physical_layer: "Core Mechanism",
        material: "Ti-6Al-4V Grade 5 Titanium",
        surface_treatment: "Shot-Peened & Fracture Split",
        weight_kg: 0.38,
        function: "Reduces reciprocating mass by 470g across flat-6 assembly for 9,000 RPM operation",
        joint_spec: "M9x1.0 ARP Custom Age 625+ Rod Bolts",
        fasteners: [
          {
            id: 1003,
            part_id: 103,
            name: "M9 Titanium Rod Cap Bolt",
            fastener_type: "Bolt",
            thread_size: "M9x1.0",
            drive_type: "12-Point Spline",
            grade: "Custom Age 625+ Superalloy",
            torque_spec_nm: 25.0,
            quantity_used: 12,
            x_percent: 68.5,
            y_percent: 50.0,
            notes: "Torque-angle: 25 Nm + 90° stretch"
          }
        ]
      },
      {
        id: 104,
        car_id: 1,
        subsystem_id: 4,
        part_number: "992-412-011-TTX",
        name: "Öhlins TTX Adjustable Coilover Damper",
        category: "Chassis & Aero",
        sub_assembly: "Suspension Geometry",
        physical_layer: "Damping Unit",
        material: "Hard-Anodized 6061-T6 Aluminum / Si-Cr Steel",
        surface_treatment: "Kashima Hard Anodizing",
        weight_kg: 4.2,
        function: "Twin-tube through-rod damping with 4-way independent high/low speed control",
        joint_spec: "M14x1.5 Upright Pinch Bolt (120 Nm)",
        fasteners: [
          {
            id: 1004,
            part_id: 104,
            name: "M14 Lower Damper Strut Clevis Bolt",
            fastener_type: "Bolt",
            thread_size: "M14x1.5",
            drive_type: "Hex 19mm",
            grade: "Grade 12.9",
            torque_spec_nm: 120.0,
            quantity_used: 4,
            x_percent: 28.5,
            y_percent: 68.0,
            notes: "Direct load-bearing shear bolt into upright"
          }
        ]
      }
    ]
  },
  2: {
    ...FALLBACK_CARS[1],
    parts: [
      {
        id: 201,
        car_id: 2,
        subsystem_id: 1,
        part_number: "06Q-100-031-H",
        name: "2.0L TSI EA888 Gen 4 Cast-Iron Block",
        category: "Powertrain",
        sub_assembly: "Crankcase & Cylinders",
        physical_layer: "Core Block",
        material: "GJL-250 Grey Cast Iron",
        surface_treatment: "Honed Cylinder Liners",
        weight_kg: 142.0,
        function: "Heavy-duty cross-bolted main bearing structure withstanding 1.8 bar boost and 420 Nm torque",
        joint_spec: "M10x1.5 (40 Nm + 90° + 90°)",
        fasteners: []
      }
    ]
  },
  3: {
    ...FALLBACK_CARS[2],
    parts: [
      {
        id: 301,
        car_id: 3,
        subsystem_id: 3,
        part_number: "XP5-F1-500-TUB",
        name: "3-Seater Carbon Monocoque Cell (Central Driver Position)",
        category: "BIW & Roof",
        sub_assembly: "Carbon Tub Core",
        physical_layer: "Survival Monocoque",
        material: "Toray T300/T800 Carbon Fiber & Nomex Honeycomb",
        surface_treatment: "Autoclave High-Gloss Composite",
        weight_kg: 90.0,
        function: "Gordon Murray's revolutionary central driver monocoque delivering 50:50 lateral weight balance",
        joint_spec: "M10 Subframe (70 Nm)",
        fasteners: []
      }
    ]
  },
  4: {
    ...FALLBACK_CARS[3],
    parts: [
      {
        id: 401,
        car_id: 4,
        subsystem_id: 3,
        part_number: "120A-CHASSIS-TUB",
        name: "Tubular Steel Spaceframe with Bonded Kevlar Panels",
        category: "BIW & Roof",
        sub_assembly: "Trellis Spaceframe",
        physical_layer: "Structure",
        material: "25CrMo4 Chrome-Moly Steel & Kevlar Aramid",
        surface_treatment: "Structural Araldite Bonding",
        weight_kg: 110.0,
        function: "Pure mechanical purity spaceframe delivering visceral feedback and lightweight rigidity",
        joint_spec: "M10 Grade 10.9 (65 Nm)",
        fasteners: []
      }
    ]
  },
  5: {
    ...FALLBACK_CARS[4],
    parts: [
      {
        id: 501,
        car_id: 5,
        subsystem_id: 4,
        part_number: "NIS-R34-748A0",
        name: "V-Spec II OEM Autoclaved Dry-Carbon Ground Effect Diffuser",
        category: "Chassis & Aero",
        sub_assembly: "Underbody Ground Effect",
        physical_layer: "Aero Floor",
        material: "Pre-Preg Dry Carbon Fiber",
        surface_treatment: "Matte Racing Finish",
        weight_kg: 7.2,
        function: "Creates authentic low-pressure underbody ground-effect suction at high speeds",
        joint_spec: "M6 Titanium Fasteners (8.0 Nm)",
        fasteners: []
      }
    ]
  }
};

/**
 * Resilient fetch with fast timeout (1500ms).
 * If the backend is cold-starting on Render, aborts gracefully and falls back to mock data.
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 1500): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

export const automotiveApi = {
  async getHealth(): Promise<{ status: string; service: string }> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/api/health`, { cache: "no-store" });
      if (!res.ok) throw new Error("Backend offline");
      return await res.json();
    } catch {
      return { status: "healthy", service: "MONOCOQUE Automotive Local Fallback" };
    }
  },

  async getBrands(): Promise<BrandItem[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/api/automotive/brands`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch brands");
      return await res.json();
    } catch {
      return FALLBACK_BRANDS;
    }
  },

  async getSubsystems(): Promise<SubsystemItem[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/api/automotive/subsystems`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch subsystems");
      return await res.json();
    } catch {
      return FALLBACK_SUBSYSTEMS;
    }
  },

  async getCars(): Promise<CarSummary[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/api/automotive/cars`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch cars");
      return await res.json();
    } catch {
      return FALLBACK_CARS;
    }
  },

  async getCarDetail(carId: number): Promise<CarDetail> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/api/automotive/cars/${carId}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch car detail for id ${carId}`);
      return await res.json();
    } catch {
      return FALLBACK_CAR_DETAILS[carId] || FALLBACK_CAR_DETAILS[1];
    }
  },

  async getCarFasteners(carId: number): Promise<FastenerItem[]> {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/api/automotive/cars/${carId}/fasteners`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to fetch fasteners for car ${carId}`);
      return await res.json();
    } catch {
      const car = FALLBACK_CAR_DETAILS[carId] || FALLBACK_CAR_DETAILS[1];
      return car.parts.flatMap((p) => p.fasteners);
    }
  },

  getCarBySlug(slug: string): CarDetail {
    const s = slug.toLowerCase();
    if (s.includes("golf") || s.includes("vw")) return FALLBACK_CAR_DETAILS[2];
    if (s.includes("mclaren") || s.includes("f1")) return FALLBACK_CAR_DETAILS[3];
    if (s.includes("ferrari") || s.includes("f40")) return FALLBACK_CAR_DETAILS[4];
    if (s.includes("skyline") || s.includes("r34") || s.includes("gtr")) return FALLBACK_CAR_DETAILS[5];
    return FALLBACK_CAR_DETAILS[1];
  }
};
