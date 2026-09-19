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

export const automotiveApi = {
  async getHealth(): Promise<{ status: string; service: string }> {
    const res = await fetch(`${API_BASE_URL}/api/health`, { cache: "no-store" });
    if (!res.ok) throw new Error("Backend offline");
    return res.json();
  },

  async getBrands(): Promise<BrandItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/automotive/brands`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch brands");
    return res.json();
  },

  async getSubsystems(): Promise<SubsystemItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/automotive/subsystems`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch subsystems");
    return res.json();
  },

  async getCars(): Promise<CarSummary[]> {
    const res = await fetch(`${API_BASE_URL}/api/automotive/cars`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch cars");
    return res.json();
  },

  async getCarDetail(carId: number): Promise<CarDetail> {
    const res = await fetch(`${API_BASE_URL}/api/automotive/cars/${carId}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch car detail for id ${carId}`);
    return res.json();
  },

  async getCarFasteners(carId: number): Promise<FastenerItem[]> {
    const res = await fetch(`${API_BASE_URL}/api/automotive/cars/${carId}/fasteners`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch fasteners for car ${carId}`);
    return res.json();
  },
};
