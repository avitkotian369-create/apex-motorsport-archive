export interface Material {
  id: number;
  name: string;
  tensile_strength_mpa?: string;
  yield_strength_mpa?: string;
  description?: string;
}

export interface FastenerSpec {
  id: number;
  name: string;
  fastener_type: string;
  thread_size: string;
  drive_type: string;
  grade: string;
  torque_spec_nm: number;
  quantity_used: number;
  notes?: string;
}

export interface PinCallout {
  id: number;
  diagram_id: number;
  fastener_id: number;
  callout_number: number;
  x_percent: number;
  y_percent: number;
  label: string;
  fastener?: FastenerSpec;
}

export interface SchematicDiagram {
  id: number;
  subassembly_id: number;
  view_type: string;
  image_url: string;
  image_width: number;
  image_height: number;
  pins: PinCallout[];
}

export interface PartItem {
  id: number;
  subassembly_id: number;
  part_number: string;
  name: string;
  material?: Material;
  weight_kg?: number;
  fasteners: FastenerSpec[];
}

export interface Subassembly {
  id: number;
  vehicle_id: number;
  name: "Bumpers" | "Doors" | "Powertrain" | "HVAC" | "BIW" | "Chassis";
  description?: string;
  parts: PartItem[];
  schematics: SchematicDiagram[];
}

export interface Vehicle {
  id: number;
  brand_id: number;
  category: "car" | "bike";
  model: string;
  generation: string;
  trim?: string;
  year_start: number;
  year_end?: number;
  vin_prefix?: string;
  turntable_image_pattern?: string;
  turntable_total_frames: number;
  subassemblies?: Subassembly[];
}

export interface Brand {
  id: number;
  name: string;
  vehicle_category: "cars" | "bikes" | "both";
  country?: string;
  logo_url?: string;
  vehicles: Vehicle[];
}

export interface DailyTrivia {
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
