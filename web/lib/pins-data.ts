export type AssemblyTier = "aero" | "monocoque" | "powertrain" | "brakes_gear" | "hardware";
export type KnollingTierFilter = "all" | AssemblyTier;

export interface TargetCallout {
  id: number;
  num: string;
  name: string;
  subsystem: string;
  part_number: string;
  x_percent: number;
  y_percent: number;
  leaderSide: "left" | "right";
  material: string;
  weightDelta: string;
  spec: string;
  operationalLimit: string;
  rationale: string;
  torqueSpec?: string;
  substrate?: string;
  qty?: number;
  tier?: AssemblyTier;
  plainExplainer?: string;
  weightVisual?: string;
  positionVisual?: string;
  wearVisual?: string;
  layers: {
    name: string;
    material: string;
    desc: string;
  }[];
}

// 1. Porsche 911 GT3 RS: Isolated Pin Definitions per Assembly Viewport
export const PORSCHE_CHASSIS_PINS: TargetCallout[] = [
  {
    id: 101,
    num: "01",
    name: "AZ31B Hydroformed Magnesium Roof",
    subsystem: "BIW & Monocoque",
    part_number: "992-817-010-MG",
    x_percent: 51.5,
    y_percent: 26.0,
    leaderSide: "left",
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
    id: 102,
    num: "02",
    name: "Dual-Element Active DRS Swan-Neck Wing",
    subsystem: "Active Aerodynamics",
    part_number: "992-827-901-RS",
    x_percent: 81.0,
    y_percent: 28.0,
    leaderSide: "right",
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
  },
  {
    id: 103,
    num: "03",
    name: "Forged Aero Teardrop Wishbones & Knuckle",
    subsystem: "Front Running Gear",
    part_number: "992-407-151-GT",
    x_percent: 28.5,
    y_percent: 68.0,
    leaderSide: "left",
    material: "Forged AlSi10Mg Aluminum",
    weightDelta: "40 kg Aerodynamic Downforce",
    spec: "M14x1.5 Ball-Joint Stud (140 Nm)",
    operationalLimit: "1.8G Threshold Braking Anti-Dive",
    rationale: "Airfoil-profile wishbone arms generate 40 kg of clean downforce alone while geometry eliminates brake dive under heavy deceleration.",
    layers: [
      { name: "Airfoil Teardrop Profile Arms", material: "Closed-Die Forged Aluminum", desc: "Drop-forged profile generates aerodynamic downforce in clean wheel-well airflow." },
      { name: "5-Axis CNC Knuckle Upright", material: "High-Tensile AlSi10Mg Alloy", desc: "High-rigidity upright transmitting steering rack forces without flex." },
      { name: "Anti-Dive Pivot Bushings", material: "Vulcanized Fluoroelastomer Core", desc: "Zero dynamic camber deflection under high lateral loading." }
    ]
  },
  {
    id: 104,
    num: "04",
    name: "Center-Lock Hub & 410mm PCCB Disc",
    subsystem: "Braking & Hub",
    part_number: "992-615-301-PCCB",
    x_percent: 28.0,
    y_percent: 78.0,
    leaderSide: "left",
    material: "C/SiC Carbon-Ceramic Matrix & 7075-T6 Bell",
    weightDelta: "-18.2 kg Rotating Mass",
    spec: "M30x1.5 Center-Lock Nut (600 Nm)",
    operationalLimit: "850°C Fade Resistance",
    rationale: "Withstands 850°C track braking without fading, while the central locking nut enables rapid pit changes with a single 600 Nm fastener.",
    layers: [
      { name: "Center-Lock Wheel Nut", material: "Forged 7075-T6 Anodized Aluminum", desc: "Tightened with 600 Nm torque spec; requires Castrol Optimoly paste on conical seat." },
      { name: "Carbon-Silicon Carbide Rotor", material: "Liquid Silicon Infiltrated (LSI) C/SiC", desc: "Lightweight ceramic matrix rotor dissipating extreme track kinetic energy." },
      { name: "Monobloc 6-Piston Caliper", material: "Cast Aluminum Fixed Caliper", desc: "Radial mount eliminating caliper bridge flex under high line pressure." }
    ]
  }
];

export const PORSCHE_ENGINE_PINS: TargetCallout[] = [
  {
    id: 201,
    num: "01",
    name: "Micro-Forged Titanium Connecting Rods",
    subsystem: "Internal Reciprocating Assembly",
    part_number: "992-103-020-TI",
    x_percent: 50.0,
    y_percent: 48.0,
    leaderSide: "left",
    material: "Ti-6Al-4V Grade 5 Titanium",
    weightDelta: "-470 g Rotating Mass (vs Forged Steel)",
    spec: "M9x1.0 Rod Bolts (25 Nm + 90° stretch)",
    operationalLimit: "9,000 RPM Continuous Piston Speed",
    rationale: "Ultralight titanium reduces tensile inertial loads on the crankshaft journal at 9,000 RPM, allowing rapid rev response without fatigue.",
    layers: [
      { name: "H-Beam Forged Shank", material: "Ti-6Al-4V Vacuum Arc Remelted", desc: "High tensile fatigue strength handling 9,000 RPM inertial tensile forces." },
      { name: "DLC-Coated Wrist Pin Bushing", material: "Beryllium-Free Copper Alloy", desc: "Zero-scuff interface against the 21 mm floating piston pin." },
      { name: "Fracture-Split Rod Cap", material: "Precision Micro-Fractured Ti", desc: "Interlocking jagged parting line eliminates cap fretting under lateral whip." }
    ]
  },
  {
    id: 202,
    num: "02",
    name: "Rigid Finger-Follower Valvetrain & DLC Camshaft",
    subsystem: "Cylinder Head Valvetrain",
    part_number: "992-109-015-RS",
    x_percent: 32.0,
    y_percent: 36.0,
    leaderSide: "left",
    material: "100Cr6 Bearing Steel & DLC Layer",
    weightDelta: "Zero Hydraulic Lifter Float",
    spec: "M7x1.0 Bearing Cap Bolts (16 Nm)",
    operationalLimit: "3,000 HV Surface Hardness",
    rationale: "Rigid finger followers eliminate the squish and mass of hydraulic lifters, maintaining precise valve timing and lift profiles past 9,000 RPM.",
    layers: [
      { name: "Diamond-Like Carbon Finger", material: "100Cr6 with 1.8 µm DLC", desc: "Extreme wear resistance under high-velocity camshaft lobe sliding contact." },
      { name: "Sodium-Filled Hollow Exhaust Valve", material: "Nimonic 80A Superalloy", desc: "Liquid sodium transfers heat from valve head to guide, preventing detonation." },
      { name: "Dual Concentric Valve Springs", material: "Superfinished Cr-Si Wire", desc: "Progressive resonant harmonics preventing valve bounce at rev limit." }
    ]
  },
  {
    id: 203,
    num: "03",
    name: "Individual Throttle Bodies (ITBs)",
    subsystem: "Induction & Air Metering",
    part_number: "992-133-063-ITB",
    x_percent: 68.0,
    y_percent: 32.0,
    leaderSide: "right",
    material: "CNC Billet 6061-T6 Aluminum",
    weightDelta: "Sub-50ms Transient Throttle Response",
    spec: "M6x1.0 Intake Flange Studs (10 Nm)",
    operationalLimit: "Individual Cylinder Velocity Stacks",
    rationale: "Individual butterflies at each intake port eliminate plenum vacuum lag, delivering immediate throttle response at corner apex exit.",
    layers: [
      { name: "Billet Velocity Stack Trumpet", material: "5-Axis CNC Aluminum", desc: "Bernoulli profile optimizing air velocity into the intake runner." },
      { name: "Precision Brass Throttle Plate", material: "Ground Brass Alloy (0.8mm)", desc: "Seals cleanly against vacuum while resisting blowback backfire." },
      { name: "Direct High-Pressure Piezo Injector", material: "Stainless Body (250 Bar)", desc: "Injects directly into combustion bowl during compression stroke." }
    ]
  },
  {
    id: 204,
    num: "04",
    name: "Dry-Sump 7-Stage Centrifugal Scavenge Array",
    subsystem: "Lubrication Circuit",
    part_number: "992-107-020-GT",
    x_percent: 64.0,
    y_percent: 66.0,
    leaderSide: "right",
    material: "AlSi17Cu4Mg Cast Alusil & Billet Gears",
    weightDelta: "-6.2 kg vs Sump / Zero Aeration",
    spec: "M8x1.25 Crankcase Flange (23 Nm)",
    operationalLimit: "Continuous 2.5G Lateral Oil Delivery",
    rationale: "Seven separate scavenge stages constantly suck oil and blowby gases from the crankcase directly into the external tank, eliminating crankshaft windage.",
    layers: [
      { name: "Centrifugal Oil-Air Separator", material: "Cyclonic Plastic Swirl Chamber", desc: "Spins frothy return oil to remove trapped air before suction pickup." },
      { name: "Internal Crankcase Scavenge Pumps", material: "Hardened Steel Trochoid Rotors", desc: "Pulls sustained 0.4 bar crankcase vacuum to reduce piston pumping loss." },
      { name: "Remote Aluminum Reservoir", material: "Baffled 6061 Aluminum Tank", desc: "Stores 10.2 liters of synthetic lubricant isolated from engine vibration." }
    ]
  }
];

export const PORSCHE_DOOR_PINS: TargetCallout[] = [
  {
    id: 301,
    num: "01",
    name: "Pre-Preg Carbon Fiber Outer Skin",
    subsystem: "Composite Door Structure",
    part_number: "992-831-011-CF",
    x_percent: 46.0,
    y_percent: 36.0,
    leaderSide: "left",
    material: "Toray T700 High-Tensile Carbon Weave",
    weightDelta: "-5.5 kg vs Steel Unibody Door",
    spec: "Autoclave Cured at 135°C & 6 Bar",
    operationalLimit: "Class-A Surface Tolerance",
    rationale: "Replacing the steel door cassette with pre-preg carbon fiber saves over 11 kg of mass across both doors while retaining aerodynamic stiffness at 300 km/h.",
    layers: [
      { name: "Outer 2x2 Twill Carbon Face", material: "Pre-Preg T700 Carbon Fiber", desc: "Aesthetic high-finish surface cured under vacuum pressure to eliminate pinholes." },
      { name: "Structural Rohacell Foam Core", material: "Polymethacrylimide (PMI) Core", desc: "Sandwich core preventing thin composite panel oil-canning and flutter at speed." },
      { name: "Inner Flange Bonding Surface", material: "Unidirectional Carbon Tapes", desc: "Reinforced hinge perimeter transmitting opening loads into the A-pillar." }
    ]
  },
  {
    id: 302,
    num: "02",
    name: "Hot-Formed Boron Steel Intrusion Beam",
    subsystem: "Crash Safety Cell",
    part_number: "992-837-120-BOR",
    x_percent: 54.0,
    y_percent: 58.0,
    leaderSide: "right",
    material: "22MnB5 Hot-Stamped Boron Steel",
    weightDelta: "1,500 MPa Tensile Strength",
    spec: "Laser-Welded to Structural Hinge Bracket",
    operationalLimit: "FIA Lateral Intrusion Compliance",
    rationale: "An ultra-high-strength boron tubular beam spans horizontally inside the composite door to prevent cabin intrusion in high-speed T-bone collisions.",
    layers: [
      { name: "Tubular Boron Crash Beam", material: "22MnB5 Quenched Steel", desc: "Martensitic grain structure with extreme yield strength against lateral impact." },
      { name: "Anti-Intrusion End Brackets", material: "High-Strength Low-Alloy Steel", desc: "Interlocks with vehicle B-pillar striker during cabin side collision." },
      { name: "Vibration Dampening Mastik", material: "Expandable Butyl Rubber Strip", desc: "Isolates beam from composite outer skin to eliminate buzz and rattle." }
    ]
  },
  {
    id: 303,
    num: "03",
    name: "Lightweight Textile Interior Pull Strap",
    subsystem: "Minimalist Ergonomics",
    part_number: "992-867-040-RS",
    x_percent: 68.0,
    y_percent: 64.0,
    leaderSide: "right",
    material: "Woven Nylon & Anodized Billet Bezel",
    weightDelta: "-450 g Mechanism Reduction",
    spec: "M5 Grade 8.8 Screw (4.5 Nm)",
    operationalLimit: "Weissach Heritage Spec",
    rationale: "Replaces heavy internal cable linkages and cast handles with a motorsport nylon loop, saving unsprung cabin mass in authentic RS tradition.",
    layers: [
      { name: "Reinforced Webbing Loop", material: "High-Tenacity Nylon Strap", desc: "Tensile rated to 400 kg for rapid emergency door unlatching." },
      { name: "CNC Aluminum Escutcheon", material: "6061-T6 Anodized Billet Bezel", desc: "Lightweight guide frame flush-mounted into interior carbon door card." },
      { name: "Micro-Cable Rotary Release", material: "Stainless Steel Aircraft Cable", desc: "Direct pull actuating primary rotary latch assembly." }
    ]
  }
];

// 2. Volkswagen Golf R Mk8
export const GOLF_CHASSIS_PINS: TargetCallout[] = [
  {
    id: 401,
    num: "01",
    name: "2.0L TSI EA888 Gen 4 Turbo Block",
    subsystem: "Powertrain Core",
    part_number: "06Q-100-031-H",
    x_percent: 26.0,
    y_percent: 52.0,
    leaderSide: "left",
    material: "GJL-250 Grey Cast Iron",
    weightDelta: "142 kg Closed-Deck Block",
    spec: "M10x1.5 (40 Nm + 90° + 90°)",
    operationalLimit: "320 PS / 420 Nm / 1.8 Bar",
    rationale: "Cast-iron crankcase resists cylinder distortion under high boost, preserving ring sealing under sustained Nürburgring thermals.",
    layers: [
      { name: "Continental R-Turbocharger", material: "Inconel Turbine & Water-Cooled Housing", desc: "Integrated exhaust manifold yields immediate transient spooling." },
      { name: "Cast-Iron Engine Crankcase", material: "GJL-250 Grey Cast Iron", desc: "Heavy-duty cross-bolted main bearing structure handling 420 Nm torque." },
      { name: "Direct High-Pressure Injection", material: "350-Bar Piezo Injectors", desc: "Ultra-fine fuel atomization maximizing thermal efficiency and knock resistance." }
    ]
  },
  {
    id: 402,
    num: "02",
    name: "DCC Adaptive MacPherson Struts",
    subsystem: "Front Suspension",
    part_number: "5WA-412-021-AC",
    x_percent: 23.5,
    y_percent: 62.0,
    leaderSide: "left",
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
    id: 403,
    num: "03",
    name: "R-Performance Torque Splitter",
    subsystem: "AWD Differential",
    part_number: "0CP-525-010-J",
    x_percent: 78.5,
    y_percent: 68.0,
    leaderSide: "right",
    material: "Die-Cast Aluminum & Multi-Plate Clutches",
    weightDelta: "26.5 kg Housing",
    spec: "M10x1.5 Subframe Bolts (60 Nm + 90°)",
    operationalLimit: "100% Torque to Outside Wheel",
    rationale: "Twin electro-mechanical multi-plate clutches independently power each rear wheel, virtually eliminating transverse FWD understeer in Drift Mode.",
    layers: [
      { name: "Die-Cast Aluminum Casing", material: "High-Pressure Cast Aluminum", desc: "Lightweight housing with integral cooling ribs and low-friction PTFE seals." },
      { name: "Twin Multi-Plate Clutches", material: "Carbon-Friction Carbon Discs", desc: "Electronically modulated clutch packs controlling individual rear wheel slip." },
      { name: "Hypoid Ring & Pinion", material: "Case-Hardened Alloy Steel", desc: "Precision-lapped ring and pinion transferring prop shaft drive power." }
    ]
  },
  {
    id: 404,
    num: "04",
    name: "Front Bumper Fascia Air Guides",
    subsystem: "Aerodynamic Bodywork",
    part_number: "5H0-807-217-GRU",
    x_percent: 12.0,
    y_percent: 70.0,
    leaderSide: "left",
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

// 3. McLaren F1 (XP5)
export const MCLAREN_F1_CHASSIS_PINS: TargetCallout[] = [
  {
    id: 501,
    num: "01",
    name: "Full Carbon-Fibre Monocoque Tub",
    subsystem: "Primary Survival Cell",
    part_number: "MF1-100-MONO-XP",
    x_percent: 54.0,
    y_percent: 52.0,
    leaderSide: "left",
    material: "Carbon-Kevlar Prepreg & Aluminum Honeycomb",
    weightDelta: "90 kg Total Tub Weight",
    spec: "Autoclave Cured High-Tensile Weave",
    operationalLimit: "Torsional Stiffness: 13,500 Nm/deg",
    rationale: "The world's first production carbon monocoque, housing the revolutionary central driver seat position for zero-parallax apex sightlines.",
    layers: [
      { name: "Outer Carbon-Kevlar Skin", material: "T300 Carbon Weave with Aramid", desc: "Puncture-resistant outer layer protecting driver against wheel-hub impacts." },
      { name: "Aluminum Honeycomb Core", material: "5052 Aerospace Aluminum Core", desc: "15 mm sandwich core providing immense beam stiffness and energy absorption." },
      { name: "Central Cockpit Bulkhead", material: "Prepreg Carbon Bulkhead", desc: "Rigid structure mounting the 6.1L V12 directly as a stressed structural member." }
    ]
  },
  {
    id: 502,
    num: "02",
    name: "BMW Motorsport S70/2 6.1L V12 & 24K Gold Heat Shield",
    subsystem: "Powertrain & Thermal Barrier",
    part_number: "S70-2-V12-627",
    x_percent: 28.0,
    y_percent: 46.0,
    leaderSide: "left",
    material: "Alusil Block, Titanium Rods & 24-Karat Gold Leaf",
    weightDelta: "627 PS / 266 kg Engine",
    spec: "Dual Overhead Cam 48-Valve (7,500 RPM)",
    operationalLimit: "Reflects 95% Radiant Exhaust Heat",
    rationale: "Pure 24-karat gold foil insulates the carbon monocoque from the blistering 800°C thermal radiation of the 6.1L naturally aspirated V12.",
    layers: [
      { name: "24-Karat Gold Foil Blanket", material: "Pure 24K Gold Leaf over Kapton", desc: "Highest reflectivity thermal barrier protecting carbon resin from degradation." },
      { name: "Alusil V12 Engine Block", material: "AlSi17Cu4Mg Aluminum-Silicon", desc: "Linerless cylinder bores with forged flat-top pistons." },
      { name: "Individual 12-Throttle Array", material: "Cast Magnesium Throttle Bodies", desc: "Instantaneous atmospheric intake response tuned by Paul Rosche." }
    ]
  },
  {
    id: 503,
    num: "03",
    name: "Inboard Pushrod & Subframe Kinematics",
    subsystem: "Front & Rear Running Gear",
    part_number: "MF1-300-PUSH-01",
    x_percent: 80.0,
    y_percent: 62.0,
    leaderSide: "right",
    material: "Machined Solid Billet Aluminum & Titanium Pushrods",
    weightDelta: "Zero Compliance Inboard Damper",
    spec: "Brembo 4-Piston Monobloc Caliper",
    operationalLimit: "Sub-1,140 kg Curb Weight Dynamics",
    rationale: "Inboard rocker-actuated dampers reduce unsprung corner mass and keep wishbone profiles completely exposed for clean aerodynamic ducting.",
    layers: [
      { name: "Titanium Inboard Pushrod", material: "Seamless Ti-3Al-2.5V Tubing", desc: "Transfers road wheel bump motions directly into horizontal shock dampers." },
      { name: "Billet Rocker Bellcrank", material: "CNC 7075-T6 Billet Alloy", desc: "Variable progressive motion ratio under heavy chassis compression." },
      { name: "Magnesium 17-Inch OZ Wheels", material: "Forged Magnesium Alloy", desc: "Ultra-lightweight wheels shedding crucial rotational inertia." }
    ]
  },
  {
    id: 504,
    num: "04",
    name: "Active Brake Aerofoil & Rear Kevlar Diffuser",
    subsystem: "Underbody Aerodynamics",
    part_number: "MF1-800-DIFF-AERO",
    x_percent: 14.0,
    y_percent: 42.0,
    leaderSide: "left",
    material: "Molded Carbon-Kevlar & Electric Flap Actuator",
    weightDelta: "Stabilizes Rear Center of Pressure",
    spec: "30° Airbrake Pop-Up Under Hard Deceleration",
    operationalLimit: "Ground Effect Floor Venturi Extraction",
    rationale: "Pops up automatically under high-speed braking to shift the center of pressure rearward, preventing pitch-over stability loss.",
    layers: [
      { name: "Pop-Up Active Aerofoil", material: "Prepreg Carbon Foil Element", desc: "Tilted by electric stepper motor to generate instant aerodynamic drag." },
      { name: "Underfloor Venturi Tunnels", material: "Kevlar Reinforced Undertray", desc: "Twin floor venturis creating low-pressure suction without drag penalty." },
      { name: "Titanium Exhaust Silencer Box", material: "Inconel 625 & Titanium Alloy", desc: "Forms an integral aerodynamic structural element in the rear diffuser." }
    ]
  }
];

// 4. Ferrari F40
export const FERRARI_F40_CHASSIS_PINS: TargetCallout[] = [
  {
    id: 601,
    num: "01",
    name: "Tubular Steel Spaceframe & Bonded Kevlar Tub",
    subsystem: "Chassis Structure",
    part_number: "F40-CHASSIS-120",
    x_percent: 48.0,
    y_percent: 54.0,
    leaderSide: "left",
    material: "25CrMo4 Chrome-Moly Steel & Kevlar Carbon Panels",
    weightDelta: "1,100 kg Dry Weight",
    spec: "Araldite Structural Composite Resin",
    operationalLimit: "Pure Mechanical Purity (No ABS, No Servo)",
    rationale: "Tubular trellis frame stiffened by bonded Kevlar composite floorpans and bulkheads, producing a visceral racecar for the street.",
    layers: [
      { name: "Chrome-Moly Steel Tube Trellis", material: "Seamless 25CrMo4 Tubes", desc: "Lightweight spaceframe cage distributing suspension shock loads." },
      { name: "Bonded Kevlar Floor Tub", material: "Aramid-Carbon Hybrid Weave", desc: "Chemically bonded composite panels tripling chassis torsional rigidity." },
      { name: "Door Cross-Brace Bar", material: "High-Tensile Tubular Steel", desc: "Visible tubular side-impact bar exposed inside the stripped interior." }
    ]
  },
  {
    id: 602,
    num: "02",
    name: "Tipo F120A 2.9L Twin-Turbo V8 & Behr Intercoolers",
    subsystem: "Twin-Turbocharged Powertrain",
    part_number: "F120A-040-V8",
    x_percent: 68.0,
    y_percent: 52.0,
    leaderSide: "right",
    material: "Silumin Aluminum Block & Twin IHI Turbochargers",
    weightDelta: "478 PS @ 7,000 RPM / 577 Nm",
    spec: "Twin Water-Cooled IHI RHB5 Turbos (1.1 Bar)",
    operationalLimit: "82 mm Bore x 67 mm Short-Stroke",
    rationale: "Short-stroke 2,936cc V8 with explosive boost threshold and sequential wastegate delivery, defining 1980s turbo homologation.",
    layers: [
      { name: "Twin Behr Air-to-Air Intercoolers", material: "Aluminum High-Flow Core", desc: "Mounted atop the engine bay fed by iconic side NACA ducts." },
      { name: "Twin IHI Turbochargers", material: "Inconel Turbine Wheels", desc: "Supplies 1.1 bar boost pressure for fierce mid-range acceleration." },
      { name: "Gated 5-Speed Transaxle", material: "Magnesium Casing & Dog-Leg Pattern", desc: "Exposed metallic shifter gate providing positive mechanical engagement." }
    ]
  },
  {
    id: 603,
    num: "03",
    name: "NACA Air Ducts & Composite Rear Wing",
    subsystem: "Aerodynamic Bodywork",
    part_number: "F40-BODY-AERO-01",
    x_percent: 24.0,
    y_percent: 44.0,
    leaderSide: "left",
    material: "Autoclave-Cured Carbon & Nomex Honeycomb",
    weightDelta: "Entire 11-Piece Body: Just 46 kg",
    spec: "Fixed High-Mount Composite Rear Aerofoil",
    operationalLimit: "Top Speed: 324 km/h (201 mph)",
    rationale: "Flush-mounted NACA ducts ingest boundary-layer air with zero flow separation to feed oil coolers and turbocharger intakes.",
    layers: [
      { name: "Submerged NACA Ducts", material: "Molded Carbon-Kevlar Panel", desc: "Gentle divergence drawing air without causing surface parasitic drag." },
      { name: "Rear Fixed Gurney Wing", material: "Carbon-Nomex Sandwich Wing", desc: "Provides high-speed rear axle downforce up to 324 km/h." },
      { name: "Slotted Lexan Rear Screen", material: "Vented Polycarbonate Sheet", desc: "Louvers evacuate blistering heat from the mid-mounted turbo engine." }
    ]
  }
];

// 5. Nissan Skyline GT-R (R34 V-Spec)
export const SKYLINE_R34_CHASSIS_PINS: TargetCallout[] = [
  {
    id: 701,
    num: "01",
    name: "RB26DETT Cast-Iron Inline-6 Twin-Turbo Block",
    subsystem: "Engine Architecture",
    part_number: "10102-AA300-RB26",
    x_percent: 36.0,
    y_percent: 48.0,
    leaderSide: "left",
    material: "High-Nickel Cast Iron & Forged Internals",
    weightDelta: "280+ PS / Easily Capable of 800+ HP",
    spec: "Twin Ceramic Turbochargers + 6-ITB Intake",
    operationalLimit: "8,000 RPM Factory Redline",
    rationale: "Indestructible cast-iron cylinder block coupled with individual throttle bodies and dual Garrett/Hitachi ceramic turbos.",
    layers: [
      { name: "Cast-Iron Engine Block", material: "High-Nickel Heavy Cast Iron", desc: "Thick-walled cylinder structure resisting massive boost pressure." },
      { name: "6 Individual Throttle Bodies", material: "Die-Cast Aluminum Assembly", desc: "Multi-throttle setup providing sharp naturally aspirated throttle feel." },
      { name: "Twin Ceramic Turbochargers", material: "Ceramic Turbine Wheels", desc: "Lightweight ceramic wheels spooling instantly under low exhaust mass flow." }
    ]
  },
  {
    id: 702,
    num: "02",
    name: "ATTESA E-TS Pro AWD Transfer Case & Active LSD",
    subsystem: "Torque Vectoring Drivetrain",
    part_number: "38100-AA400-ETS",
    x_percent: 54.0,
    y_percent: 58.0,
    leaderSide: "right",
    material: "Cast Aluminum Casing & Electronic Clutch Array",
    weightDelta: "0:100 RWD to 50:50 AWD in Milliseconds",
    spec: "16-Bit High-Speed Microprocessor",
    operationalLimit: "Active Yaw & Longitudinal Vectoring",
    rationale: "Monitors wheel slip, G-forces, and throttle position 100 times per second to meter drive torque dynamically to the front wheels and rear active LSD.",
    layers: [
      { name: "Multi-Plate Transfer Clutch", material: "Sintered Bronze & Steel Friction Discs", desc: "Modulated hydraulically to channel front axle torque on corner exit." },
      { name: "Active Rear Differential", material: "Electronically Controlled Multi-Plate LSD", desc: "Locks rear axles dynamically to stabilize vehicle yaw under power." },
      { name: "Getrag 6-Speed Manual", material: "Case-Hardened Helical Gears", desc: "Heavy-duty close-ratio transmission designed for motorsport reliability." }
    ]
  },
  {
    id: 703,
    num: "03",
    name: "Carbon Composite Underfloor Diffuser & Brembo Brakes",
    subsystem: "Chassis & Ground Effects",
    part_number: "748A0-AA400-DIFF",
    x_percent: 86.0,
    y_percent: 48.0,
    leaderSide: "right",
    material: "Compression-Molded Carbon Composite & Brembo Calipers",
    weightDelta: "Functional Factory Ground Effect Underbody",
    spec: "324mm Ventilated Front Discs",
    operationalLimit: "Super HICAS 4-Wheel Steering Response",
    rationale: "V-Spec models feature an authentic carbon fiber underbody diffuser that speeds up underbody airflow, creating a low-pressure ground effect seal.",
    layers: [
      { name: "Rear Carbon Diffuser Plate", material: "Compression-Molded Carbon Weave", desc: "Expands underfloor air smoothly behind the rear axle to generate suction." },
      { name: "Super HICAS Electric Actuator", material: "Brushless Motor & Tie Rods", desc: "Steers rear wheels up to 1 degree in-phase for high-speed lane change composure." },
      { name: "Gold Brembo 4-Piston Calipers", material: "Forged Monobloc Aluminum", desc: "Motorsport calipers clamping high-friction carbon-metallic brake pads." }
    ]
  }
];

// ============================================================================
// ELECTRONIC PARTS CATALOG (EPC) STANDARDIZED AXIAL EXPLODED BLUEPRINT DATASETS
// ============================================================================

// [01. SUSPENSION & HUB CORNER] Exploded along wheel spindle/centerline axis
export const EPC_SUSPENSION_EXPLODED_PINS: TargetCallout[] = [
  {
    id: 1001,
    num: "01",
    name: "Öhlins TTX Adjustable Coilover Strut & Spring",
    subsystem: "Damping & Corner Kinematics",
    part_number: "992-412-011-TTX",
    x_percent: 21.0,
    y_percent: 36.0,
    leaderSide: "left",
    material: "Hard-Anodized 6061-T6 Aluminum & Si-Cr Spring",
    weightDelta: "-2.4 kg vs Twin-Tube (-30% Friction)",
    spec: "M12x1.5 Top Nut (80 Nm) / Lower Cleat M14 (120 Nm)",
    operationalLimit: "4-Way Independent High/Low Rebound",
    rationale: "Twin-tube through-rod damper eliminates internal gas pressure cavitation under high-frequency track kerb strikes.",
    torqueSpec: "80 Nm / 120 Nm",
    substrate: "6061-T6 / Si-Cr Steel",
    qty: 2,
    layers: [
      { name: "Top Mount & Billet Camber Plate", material: "Forged 6061-T6 Aluminum", desc: "Spherical monoball bearing eliminating rubber bushing flex for pinpoint steering accuracy." },
      { name: "Dual Linear Springs & Helper", material: "Superfinished Silicon-Chrome Wire", desc: "Main 140 N/mm spring paired with helper spring to keep suspension seated at full droop." },
      { name: "Twin-Tube Solid Piston Cartridge", material: "Hard-Chrome Micro-Ground Steel Rod", desc: "Pressure-balanced piston delivering instant damping response with zero hysteresis." }
    ]
  },
  {
    id: 1002,
    num: "02",
    name: "Upper Wishbone A-Arm with Monoball Pivots",
    subsystem: "Kinematic Camber Control",
    part_number: "992-407-210-GT",
    x_percent: 41.5,
    y_percent: 22.0,
    leaderSide: "left",
    material: "Forged AlSi10Mg Aerospace Alloy",
    weightDelta: "-1.2 kg Unsprung Mass",
    spec: "Subframe Pivot M12x1.5 (110 Nm)",
    operationalLimit: "Zero Elastic Bushing Deflection",
    rationale: "Maintains optimal dynamic camber contact patch across maximum lateral cornering compression loading.",
    torqueSpec: "110 Nm",
    substrate: "AlSi10Mg Forging",
    qty: 2,
    layers: [
      { name: "Aero Teardrop Profile Arm", material: "Drop-Forged Light Alloy", desc: "Aerodynamically streamlined profile minimizing turbulence inside the front wheel house." },
      { name: "Teflon-Lined Spherical Uniball", material: "Stainless Steel Ball in Bronze Race", desc: "Zero-play pivot delivering unfiltered road texture and tire grip feedback to the steering rack." },
      { name: "Camber Shims Array", material: "Laser-Cut Stainless Spacers", desc: "Modular shim stack allowing rapid trackside camber adjustments from -1.5° to -4.0°." }
    ]
  },
  {
    id: 1003,
    num: "03",
    name: "5-Axis CNC Steering Knuckle Upright",
    subsystem: "Wheel Hub Carrier",
    part_number: "992-407-310-CNC",
    x_percent: 45.0,
    y_percent: 49.0,
    leaderSide: "left",
    material: "7075-T6 Billet Aluminum / S45C Spindle",
    weightDelta: "14,000 Nm/deg Torsional Rigidity",
    spec: "Tie Rod Taper Ball M14x1.5 (95 Nm)",
    operationalLimit: "Engineered Brake Duct Mounting Tabs",
    rationale: "The central nexus of suspension geometry, carrying steering tie rods, brake calipers, and hub bearings under braking loads.",
    torqueSpec: "95 Nm",
    substrate: "7075-T6 Billet",
    qty: 2,
    layers: [
      { name: "Upright Structural Body", material: "5-Axis Milled High-Strength Billet", desc: "Engineered ribbing provides extreme resistance to brake torque deflection." },
      { name: "Radial Brake Caliper Lugs", material: "Integral Milled Caliper Mounts", desc: "Eliminates intermediate adapter brackets to maximize caliper stiffness under 2G braking." },
      { name: "Steering Arm Horn", material: "Forged High-Tensile Steel Insert", desc: "High-angle geometry tuned for zero bump steer throughout full suspension travel." }
    ]
  },
  {
    id: 1004,
    num: "04",
    name: "Double-Row Angular Contact Wheel Bearing",
    subsystem: "Hub Core Bearing",
    part_number: "992-498-625-SKF",
    x_percent: 53.0,
    y_percent: 50.0,
    leaderSide: "right",
    material: "100Cr6 Vacuum-Degassed Bearing Steel",
    weightDelta: "Low-Drag Fluoroelastomer Friction Seals",
    spec: "Axle Spindle Nut (460 Nm Stake Nut)",
    operationalLimit: "120,000 N Dynamic Radial Load",
    rationale: "Dual-row angular contact balls absorb severe track side-loading and curb impacts with minimal rotational friction drag.",
    torqueSpec: "460 Nm",
    substrate: "100Cr6 Bearing Steel",
    qty: 2,
    layers: [
      { name: "Hardened Ball Raceway", material: "Induction-Hardened Bearing Steel", desc: "Micro-polished raceways with tight tolerances preventing hub runout under cornering." },
      { name: "Polyamide Ball Cage", material: "Fiber-Reinforced PA66", desc: "Low-friction cage distributing synthetic grease evenly at sustained 300 km/h speeds." },
      { name: "Triple-Lip Labyrinth Seal", material: "Fluoroelastomer FKM", desc: "Shields raceways from carbon brake dust, moisture, and high thermal radiation." }
    ]
  },
  {
    id: 1005,
    num: "05",
    name: "Wheel Hub with High-Tensile M14 Studs",
    subsystem: "Wheel Interface Hub",
    part_number: "992-407-605-HUB",
    x_percent: 60.5,
    y_percent: 50.5,
    leaderSide: "right",
    material: "Forged 42CrMo4 Chrome-Moly Steel",
    weightDelta: "5x130 PCD / Center-Lock Adaptable",
    spec: "Stud Press-Fit / Lug Nut M14x1.5 (130 Nm)",
    operationalLimit: "1,200 MPa Ultimate Tensile Strength",
    rationale: "Precision-machined hub flange ensures true rotor seating and transfers drive torque and lateral wheel forces into the knuckle.",
    torqueSpec: "130 Nm",
    substrate: "42CrMo4 Steel",
    qty: 2,
    layers: [
      { name: "Forged Spindle Flange", material: "Quenched & Tempered 42CrMo4", desc: "CNC-turned flange carrying disc rotor hat with sub-0.01 mm axial runout." },
      { name: "Grade 10.9 Wheel Studs", material: "Cold-Headed High-Tensile Alloy", desc: "Rolled threads withstand aggressive pneumatic pit gun impacts without stripping." },
      { name: "Center Bore Locating Ring", material: "Hard-Anodized Aluminum", desc: "Ensures perfect wheel hub-centric alignment to eliminate high-speed vibration." }
    ]
  },
  {
    id: 1006,
    num: "06",
    name: "410mm Carbon-Silicon Carbide (C/SiC) Rotor",
    subsystem: "Kinetic Braking Thermal Sink",
    part_number: "992-615-301-PCCB",
    x_percent: 74.0,
    y_percent: 48.0,
    leaderSide: "right",
    material: "Carbon-Silicon Carbide Matrix & 7075-T6 Bell",
    weightDelta: "-5.8 kg per corner (-50% Rotating Inertia)",
    spec: "Bobbin Drive Hardware (12 Nm)",
    operationalLimit: "1,000°C Peak Friction Operating Range",
    rationale: "Continuous carbon-silicon carbide ceramic composite eliminates thermal brake fade and reduces unsprung rotational mass by half.",
    torqueSpec: "12 Nm",
    substrate: "C/SiC Matrix",
    qty: 2,
    layers: [
      { name: "Floating 7075-T6 Aluminum Hat", material: "Hard-Anodized Billet Aluminum", desc: "Thermal expansion bobbins isolate hub from extreme ceramic friction ring temperatures." },
      { name: "Spiral Curved Cooling Vanes", material: "Ceramic Composite Core", desc: "Centrifugal pumping action forces massive volume of cooling air through the rotor interior." },
      { name: "Laser-Drilled Evacuation Holes", material: "Surface Friction Layer", desc: "Vents vaporized boundary layer pad gases and water film for instantaneous cold bite." }
    ]
  },
  {
    id: 1007,
    num: "07",
    name: "Brembo 6-Piston Monobloc Caliper Assembly",
    subsystem: "Hydraulic Brake Clamp",
    part_number: "992-615-105-BRM",
    x_percent: 88.0,
    y_percent: 48.0,
    leaderSide: "right",
    material: "One-Piece Monobloc Cast Aluminum & Ti Pistons",
    weightDelta: "Zero Caliper Bridge Deflection",
    spec: "M12 Radial Mounting Bolts (115 Nm)",
    operationalLimit: "Titanium Heat Radiation Caps (200 Bar)",
    rationale: "Single-piece monobloc structure eliminates flex bolts, delivering a firm, razor-sharp brake pedal with consistent high-pressure threshold modulation.",
    torqueSpec: "115 Nm",
    substrate: "Monobloc Aluminum",
    qty: 2,
    layers: [
      { name: "Radial Monobloc Caliper Bridge", material: "Cast & CNC Finished Aluminum", desc: "High-stiffness arch prevents caliper spread under maximum hydraulic pedal pressure." },
      { name: "Differential Diameter Ti Pistons", material: "30mm / 34mm / 38mm Titanium", desc: "Stepped piston diameters equalize pad pressure and combat taper wear along the rotor." },
      { name: "Stainless Steel Pad Guide Pins", material: "Superfinished 316 Stainless", desc: "Quick-release hairpin bridge pin allows 45-second trackside pad swaps." }
    ]
  },
  {
    id: 1008,
    num: "08",
    name: "Lower Wishbone Control Arm with Airfoil Profile",
    subsystem: "Lower Lateral Control",
    part_number: "992-407-151-GT",
    x_percent: 24.0,
    y_percent: 74.0,
    leaderSide: "left",
    material: "Forged AlSi10Mg Aluminum",
    weightDelta: "+40 kg Downforce at Speed",
    spec: "Subframe Mounting Bolts (160 Nm)",
    operationalLimit: "1.8G Longitudinal Braking Anti-Dive",
    rationale: "Drop-forged in an aerodynamic teardrop profile that acts as an inverted wing to generate downforce directly onto the front tires.",
    torqueSpec: "160 Nm",
    substrate: "Forged AlSi10Mg",
    qty: 2,
    layers: [
      { name: "Teardrop Section Arm", material: "Forged Airfoil Aluminum", desc: "Inverted aerodynamic cross-section producing authentic downforce in clean underbody flow." },
      { name: "Ball-Joint Carrier End", material: "Press-Fit Heavy Duty Ball Joint", desc: "M16 heavy-duty pin connecting directly to steering knuckle upright base." },
      { name: "Eccentric Alignment Bushing", material: "Anodized Cam Bolt Washer", desc: "Provides high-resolution trackside caster and track width adjustments." }
    ]
  }
];

// [02. CYLINDER & VALVETRAIN STACK] Exploded along cylinder bore axis (Zero-text CAD)
export const EPC_CYLINDER_EXPLODED_PINS: TargetCallout[] = [
  {
    id: 2001,
    num: "01",
    name: "Dual Concentric Valve Springs & Retainer",
    subsystem: "Valvetrain Dynamic Control",
    part_number: "992-109-025-VSP",
    x_percent: 24.0,
    y_percent: 26.0,
    leaderSide: "left",
    material: "Superfinished Cr-Si Spring Steel & Ti Retainer",
    weightDelta: "-40% Retainer Mass vs Steel",
    spec: "Valve Stem Locks / Collets (7° Cone)",
    operationalLimit: "9,000+ RPM Resonant Anti-Bounce",
    rationale: "Dual springs wind in opposite directions to prevent harmonic resonance, ensuring valve sealing at 9,000 RPM without valve float.",
    torqueSpec: "Collet 7° Seat",
    substrate: "Cr-Si Steel / Ti-6Al-4V",
    qty: 24,
    layers: [
      { name: "Titanium Spring Retainer", material: "Grade 5 Titanium (Ti-6Al-4V)", desc: "Extreme weight reduction on the reciprocating valve tip to resist rev-limit valve float." },
      { name: "Outer Progressive Spring", material: "Shot-Peened Silicon-Chrome", desc: "Primary spring providing 85 kg seat pressure and 140 kg open pressure." },
      { name: "Inner Damping Spring", material: "Opposite Helix Coil", desc: "Frictional contact dampens harmonic vibrations of the outer spring." }
    ]
  },
  {
    id: 2002,
    num: "02",
    name: "Sodium-Cooled Nimonic Poppet Valves",
    subsystem: "Combustion Chamber Sealing",
    part_number: "992-109-101-VAL",
    x_percent: 36.0,
    y_percent: 38.0,
    leaderSide: "left",
    material: "Nimonic 80A Superalloy / Hollow Sodium Core",
    weightDelta: "-180°C Valve Head Temperature",
    spec: "Precision Ground 45° Hardened Seat",
    operationalLimit: "950°C Continuous Exhaust Gas Flow",
    rationale: "Liquid sodium melts inside the hollow stem and sloshes back and forth, transferring extreme combustion heat away from the valve face to the guide.",
    torqueSpec: "Ground Seat 45°",
    substrate: "Nimonic 80A / Liquid Na",
    qty: 24,
    layers: [
      { name: "Hollow Friction-Welded Stem", material: "Nimonic Superalloy", desc: "Gun-drilled stem filled 60% with pure sodium to conduct heat into the cylinder head." },
      { name: "Stellite Hardfaced Valve Head", material: "Cobalt-Base Stellite Alloy", desc: "Laser-clad valve face resisting micro-welding and recession against the seat." },
      { name: "Hard-Chromed Valve Stem", material: "Flash Chrome Plating", desc: "Ultra-smooth sliding contact against bronze valve guides at 9,000 RPM." }
    ]
  },
  {
    id: 2003,
    num: "03",
    name: "Forged Lightweight Piston Crown with Slipper Skirt",
    subsystem: "Reciprocating Piston Assembly",
    part_number: "992-103-011-PIS",
    x_percent: 47.0,
    y_percent: 48.0,
    leaderSide: "left",
    material: "2618-T6 High-Strength Forged Aluminum",
    weightDelta: "-85 g per Piston vs Cast",
    spec: "Piston-to-Wall Clearance: 0.045 mm",
    operationalLimit: "102.0 mm Bore / 320°C Crown Temp",
    rationale: "Forged from low-silicon 2618 aerospace alloy for maximum fatigue resistance against combustion detonation at 13.3:1 compression.",
    torqueSpec: "0.045 mm Bore Fit",
    substrate: "2618-T6 Forged Al",
    qty: 6,
    layers: [
      { name: "Machined Valve Reliefs", material: "CNC 3D Crown Profile", desc: "Accommodates high valve lift without piston-to-valve interference at overlap." },
      { name: "Anti-Friction Moly Skirt Coating", material: "Screen-Printed Molybdenum Disulfide", desc: "Minimizes cylinder wall scuffing during high lateral piston thrust." },
      { name: "Thermal Barrier Crown Anodizing", material: "Hard Anodized Top Deck", desc: "Insulates piston crown to keep heat inside the combustion chamber for thermodynamic efficiency." }
    ]
  },
  {
    id: 2004,
    num: "04",
    name: "Floating DLC-Coated Wrist Pin with Wire Circlips",
    subsystem: "Piston-Rod Pivot",
    part_number: "992-103-215-PIN",
    x_percent: 61.0,
    y_percent: 40.0,
    leaderSide: "right",
    material: "Case-Hardened 18CrNiMo7-6 with 2 µm DLC",
    weightDelta: "Tool-Steel Taper-Bore Wall (72 g)",
    spec: "Floating Fit in Pin Bore (0.010 mm)",
    operationalLimit: "9,000 RPM G-Load Shear Strength",
    rationale: "Diamond-like carbon layer reduces sliding friction to zero, allowing the wrist pin to float freely without galling at high piston velocities.",
    torqueSpec: "Floating 0.010 mm",
    substrate: "18CrNiMo7-6 DLC",
    qty: 6,
    layers: [
      { name: "Tapered Wall Wrist Pin", material: "Vacuum Arc Remelted Tool Steel", desc: "Internal taper thickest at rod center to maximize shear resistance while paring end weight." },
      { name: "DLC Low-Friction Surface", material: "2 µm Amorphous Carbon Matrix", desc: "Eliminates metal-to-metal bonding in unbushed small-end rod eyes." },
      { name: "Round Wire Retaining Circlips", material: "High-Tensile Spring Wire", desc: "Snaps into piston pin groove to lock pin axially with zero dislodgement risk." }
    ]
  },
  {
    id: 2005,
    num: "05",
    name: "Micro-Forged Titanium H-Beam Connecting Rod",
    subsystem: "Reciprocating-to-Rotary Link",
    part_number: "992-103-020-TI",
    x_percent: 63.0,
    y_percent: 63.0,
    leaderSide: "left",
    material: "Ti-6Al-4V Grade 5 Titanium Alloy",
    weightDelta: "-470 g per set (-35% vs Forged Steel)",
    spec: "M9x1.0 ARP Spec Ti Bolts (25 Nm + 90° stretch)",
    operationalLimit: "9,000 RPM Tensile Inertia Rated",
    rationale: "Ultralight titanium reduces tensile inertial loads on the crankshaft journal at 9,000 RPM, allowing rapid rev response without fatigue.",
    torqueSpec: "25 Nm + 90°",
    substrate: "Ti-6Al-4V Grade 5",
    qty: 6,
    layers: [
      { name: "H-Beam Forged Column", material: "Ti-6Al-4V Remelted Forging", desc: "H-section balances column buckling resistance with low windage cross-section." },
      { name: "Fracture-Split Big End Cap", material: "Precision Micro-Fractured Ti", desc: "Interlocking fracture surface guarantees micron-exact alignment and fretting resistance." },
      { name: "Bronze Small-End Bushing", material: "CuSn8 High-Lead Phosphor Bronze", desc: "Provides high-load boundary lubrication interface with the wrist pin." }
    ]
  },
  {
    id: 2006,
    num: "06",
    name: "Tri-Metal Sputtered Crankshaft Bearing Shells",
    subsystem: "Hydrodynamic Journal Bearing",
    part_number: "992-103-310-BRG",
    x_percent: 74.0,
    y_percent: 74.0,
    leaderSide: "right",
    material: "Steel Backing + Bronze Matrix + PVD Sputter Overlay",
    weightDelta: "Resists 120 MPa Combustion Peak Pressure",
    spec: "Oil Clearance: 0.040 - 0.055 mm",
    operationalLimit: "Hydrodynamic Oil Wedge 10 Bar",
    rationale: "PVD sputter coating provides extreme fatigue strength against micro-spalling under full combustion load at 9,000 RPM.",
    torqueSpec: "Clearance: 0.045 mm",
    substrate: "Steel / Bronze / PVD",
    qty: 12,
    layers: [
      { name: "High-Tensile Steel Backing", material: "Deep-Drawing Carbon Steel", desc: "Ensures tight press fit in the rod bore to maintain radial crush and heat transfer." },
      { name: "Cast Copper-Lead Intermediate Layer", material: "CuPb24Sn Intermediate Matrix", desc: "Dampens shock loads and embeds microscopic contaminant particles." },
      { name: "Al-Sn-Si Sputtered Overlay", material: "Physical Vapor Deposition (PVD)", desc: "Extreme wear resistance preventing boundary contact during cold engine starts." }
    ]
  },
  {
    id: 2007,
    num: "07",
    name: "Fracture-Split Connecting Rod Cap Assembly",
    subsystem: "Big-End Journal Enclosure",
    part_number: "992-103-025-CAP",
    x_percent: 78.0,
    y_percent: 81.0,
    leaderSide: "right",
    material: "Ti-6Al-4V Grade 5 Titanium Alloy",
    weightDelta: "Micro-Interlocking Parting Line (Zero Fretting)",
    spec: "Precision Fractured Mating Interface",
    operationalLimit: "Eliminates Rod-End Ovalization at 9,000 RPM",
    rationale: "Interlocking crystalline fractures ensure micron-perfect realignment every time the cap is torqued, eliminating journal distortion.",
    torqueSpec: "M9 Titanium (25 Nm + 90°)",
    substrate: "Ti-6Al-4V Micro-Fractured",
    qty: 6,
    layers: [
      { name: "Fracture Parting Face", material: "Crystalline Interlocking Titanium", desc: "Interlocking surfaces eliminate cap shift under extreme reciprocating whip." },
      { name: "Bearing Retaining Notch", material: "Precision Machined Tang Slot", desc: "Prevents bearing shell rotation under hydrodynamic shear forces." },
      { name: "Weight Pad Balancing Boss", material: "Milled Ti Balancing Lug", desc: "Allows individual big-end dynamic balancing within ±0.5 grams across all cylinders." }
    ]
  },
  {
    id: 2008,
    num: "08",
    name: "High-Strength Aircraft Connecting Rod Bolts",
    subsystem: "Rod Cap Fastener",
    part_number: "992-103-912-ARP",
    x_percent: 82.0,
    y_percent: 89.0,
    leaderSide: "right",
    material: "Custom Age 625+ Superalloy",
    weightDelta: "260,000 PSI Tensile Yield Strength",
    spec: "Torque-Angle: 25 Nm Initial + 90° Stretch",
    operationalLimit: "Monitored Stretch: 0.155 - 0.165 mm",
    rationale: "Superalloy rod bolts provide extreme clamping load to keep the rod big-end round under crushing inertial tensile forces at 9,000 RPM.",
    torqueSpec: "25 Nm + 90°",
    substrate: "Custom Age 625+",
    qty: 12,
    layers: [
      { name: "Rolled J-Form Threads", material: "Post-Heat-Treat Thread Rolling", desc: "Rolled root radius eliminates stress concentrations to provide infinite fatigue life." },
      { name: "Precision Undercut Shank", material: "Turned & Ground Superalloy", desc: "Elastic deformation zone ensures consistent pre-load clamping tension." },
      { name: "12-Point Flanged Head", material: "Forged Aircraft Spline", desc: "Resists cam-out under high assembly torque and tight engine bay clearances." }
    ]
  }
];

// [03. MONOCOQUE & AERO] Exploded carbon tub, aero splitter, diffuser & wing (Zero-text 992 GT3 RS CAD)
export const EPC_MONOCOQUE_EXPLODED_PINS: TargetCallout[] = [
  {
    id: 3001,
    num: "01",
    name: "AZ31B Hydroformed Magnesium Roof with Dual Strakes",
    subsystem: "BIW Structural Roof Assembly",
    part_number: "992-817-010-MG",
    x_percent: 54.0,
    y_percent: 18.0,
    leaderSide: "left",
    material: "AZ31B-H24 Magnesium Alloy (1.1mm)",
    weightDelta: "-1.8 kg vs CFRP (-7.5mm CoG Height)",
    spec: "Dow Betamate 2090 Epoxy + M5 Ti Fasteners",
    operationalLimit: "440°C Superplastic Formed",
    rationale: "Hydroformed with longitudinal guide fins to channel airflow cleanly into the rear swan-neck wing while lowering vehicle center-of-gravity.",
    torqueSpec: "6.2 Nm (M5 Ti)",
    substrate: "AZ31B-H24 Magnesium",
    qty: 1,
    layers: [
      { name: "Double-Bubble Aero Channel", material: "AZ31B Magnesium Sheet", desc: "Directs laminar cockpit airflow smoothly into the rear wing plane." },
      { name: "PEO Dielectric Barrier", material: "Plasma Electrolytic Oxidation", desc: "Insulates magnesium from adjacent aluminum unibody to eliminate galvanic corrosion." },
      { name: "Structural Crash Adhesive", material: "Dow Betamate 2090 Toughened Epoxy", desc: "Continuous shear-load adhesive joint bonding roof into pillars." }
    ]
  },
  {
    id: 3002,
    num: "02",
    name: "Dual-Element Active DRS Swan-Neck Rear Wing Assembly",
    subsystem: "Active Aerodynamics Suite",
    part_number: "992-827-901-RS",
    x_percent: 77.0,
    y_percent: 19.0,
    leaderSide: "right",
    material: "High-Modulus Carbon Fiber & CNC 7075-T6 Pylons",
    weightDelta: "860 kg Downforce at 285 km/h (Active DRS Airbrake)",
    spec: "M8x1.25 Grade 10.9 Bolts (42 Nm into Shock Towers)",
    operationalLimit: "34° Hydraulic Flap Pitch in 0.3s",
    rationale: "Top-mounted swan-neck pylons eliminate air turbulence on the low-pressure wing underside, delivering crushing rear axle grip and instant DRS low-drag actuation.",
    torqueSpec: "42 Nm into Shock Towers",
    substrate: "High-Modulus Carbon / 7075-T6",
    qty: 1,
    layers: [
      { name: "Dual-Element Carbon Mainfoil", material: "Pre-Preg High-Modulus Carbon", desc: "Upper flap dynamically articulates 34 degrees via electro-hydraulic actuators." },
      { name: "Swan-Neck Aluminum Pylons", material: "CNC 7075-T6 Aerospace Billet", desc: "Transfers 860 kg downforce directly into rear BIW suspension shock towers." },
      { name: "Electro-Hydraulic Actuator", material: "Hard-Anodized Micro-Hydraulic RAM", desc: "Pivots wing into low-drag position in under 300 ms at steering wheel command." }
    ]
  },
  {
    id: 3003,
    num: "03",
    name: "Front Carbon Splitter & Dual Underbody Aero Strakes",
    subsystem: "Front Downforce Generation",
    part_number: "992-805-901-SPL",
    x_percent: 18.0,
    y_percent: 80.0,
    leaderSide: "left",
    material: "Compression-Molded 3K Carbon Weave & Kevlar Skid",
    weightDelta: "180 kg Front Downforce at 285 km/h",
    spec: "Quick-Release Cam-Loc Fasteners (M6 Ti Studs)",
    operationalLimit: "Sacrificial Jabroc Wooden Wear Skids",
    rationale: "Generates high stagnation pressure on the upper surface while accelerating underfloor airflow, eliminating high-speed aerodynamic front understeer.",
    torqueSpec: "Cam-Loc M6 (8.5 Nm)",
    substrate: "3K Carbon / Kevlar",
    qty: 1,
    layers: [
      { name: "Flat Splitter Blade", material: "Autoclave Pre-Preg Carbon", desc: "Rigid horizontal plane maintaining ground clearance under heavy braking dive." },
      { name: "Endplate Strakes", material: "Compression Molded Composite", desc: "Vortices isolate wheel well wake from entering underfloor venturi tunnels." },
      { name: "Titanium Chassis Struts", material: "Grade 5 Titanium Tension Rods", desc: "Transfers 180 kg front aerodynamic loads directly into the crash structure." }
    ]
  },
  {
    id: 3004,
    num: "04",
    name: "High-Rigidity 992 BIW Monocoque & Front Crash Tubes",
    subsystem: "Structural Chassis Core",
    part_number: "992-500-010-BIW",
    x_percent: 36.0,
    y_percent: 61.0,
    leaderSide: "left",
    material: "Multi-Material Aluminum-Steel Spaceframe & Cast Hardpoints",
    weightDelta: "42,000 Nm/deg Torsional Rigidity",
    spec: "Structural Flow-Drill Screws + Toughened Structural Adhesive",
    operationalLimit: "FIA Article 277 Survival Cell Compliance",
    rationale: "Hybrid unibody integrating cast aluminum shock towers with high-strength steel intrusion bulkheads for zero chassis flex under 1.8G lateral loading.",
    torqueSpec: "M10 Subframe (75 Nm)",
    substrate: "Cast AlSi10Mg / High-Yield Steel",
    qty: 1,
    layers: [
      { name: "Cast Aluminum Shock Towers", material: "Die-Cast AlSi10Mg Alloy", desc: "Provides high dimensional accuracy and rigidity for front double-wishbone pickups." },
      { name: "Extruded Side Sills", material: "Multi-Chamber 6000-Series Aluminum", desc: "Resists side-impact intrusion while transferring chassis torsion between axles." },
      { name: "High-Tensile B-Pillars", material: "Hot-Formed Boron Steel", desc: "Provides survival cell structural integrity during track rollover scenarios." }
    ]
  },
  {
    id: 3005,
    num: "05",
    name: "Aerodynamic Side Sill & Carbon Door Aperture Core",
    subsystem: "Lateral Airflow Management",
    part_number: "992-853-855-SIL",
    x_percent: 55.0,
    y_percent: 74.0,
    leaderSide: "right",
    material: "Pre-Preg Carbon Fiber & Honeycomb Sandwich",
    weightDelta: "-8.4 kg vs Standard Sheet Steel Doors",
    spec: "M6 Torx Fasteners (9.5 Nm)",
    operationalLimit: "Low-Pressure Airflow Boundary Sealing",
    rationale: "Sculpted side sills guide turbulent front wheel wake outward away from rear engine radiator intakes while sealing underfloor negative pressure.",
    torqueSpec: "9.5 Nm",
    substrate: "Carbon Composite / Honeycomb",
    qty: 2,
    layers: [
      { name: "Contoured Sill Skirt", material: "Carbon Fiber Composite", desc: "Aerodynamic edge blade preventing lateral air intrusion beneath the car." },
      { name: "CFRP Intrusion Beam", material: "Braided Carbon Tube Core", desc: "Provides side-impact barrier protection inside lightweight door structure." },
      { name: "Wheel-Arch Pressure Relief Ducts", material: "Carbon Louvre Array", desc: "Evacuates turbulent air pressure from front fender wells to cut lift." }
    ]
  },
  {
    id: 3006,
    num: "06",
    name: "Multi-Channel Underfloor Rear Diffuser with Vertical Strakes",
    subsystem: "Ground Effect Pressure Recovery",
    part_number: "992-807-531-DIF",
    x_percent: 79.0,
    y_percent: 82.0,
    leaderSide: "right",
    material: "High-Temperature Pre-Preg Carbon Composite",
    weightDelta: "14° Progressive Ramp Expansion Angle",
    spec: "M6 Titanium Torx Screws (8.0 Nm)",
    operationalLimit: "High-Velocity Venturi Pressure Recovery",
    rationale: "Expands accelerated underfloor air smoothly to atmospheric pressure at the rear, creating intense ground-effect suction without top-speed drag penalty.",
    torqueSpec: "8.0 Nm",
    substrate: "Carbon Fiber Weave",
    qty: 1,
    layers: [
      { name: "14° Upswept Expansion Ramp", material: "Autoclaved Carbon Core", desc: "Calibrated angle maximizing underbody vacuum without inducing aerodynamic stall." },
      { name: "Vertical Vortex Strakes", material: "Thin Carbon Blades", desc: "Maintains independent underfloor air channels during yaw cornering maneuvers." },
      { name: "Inconel Heat Shield Bezel", material: "Inconel 625 Thermal Barrier", desc: "Insulates composite diffuser ramp from 800°C titanium central exhaust tips." }
    ]
  }
];

// AUTHENTIC McLAREN F1 XP5 THREE-SEATER CARBON MONOCOQUE PIN DEFINITIONS
export const MCLAREN_F1_MONOCOQUE_EXPLODED_PINS: TargetCallout[] = [
  {
    id: 3101,
    num: "01",
    name: "3-Seater Carbon Monocoque Cell (Central Driver Position)",
    subsystem: "Carbon Fiber Tub Core",
    part_number: "XP5-F1-500-TUB",
    x_percent: 49.0,
    y_percent: 48.0,
    leaderSide: "left",
    material: "Toray T300 / T800 Carbon Fiber Pre-Preg & Nomex Honeycomb",
    weightDelta: "Under 100 kg Tub Weight / F1 Survival Rating",
    spec: "FIA Structural Homologation Crash Cell",
    operationalLimit: "Full Monocoque Torsional Rigidity 13,500 Nm/deg",
    rationale: "Gordon Murray's revolutionary central driver monocoque delivers 50:50 lateral weight distribution with unobstructed apex sightlines, flanked by two recessed passenger seats.",
    torqueSpec: "M10 Subframe (70 Nm)",
    substrate: "Toray T300/T800 Carbon",
    qty: 1,
    layers: [
      { name: "Central Cockpit Driving Tub", material: "Molded Carbon Pre-Preg", desc: "Single central seat positioning eliminates offset pedal box and steering angle asymmetry." },
      { name: "Nomex Honeycomb Sandwich Core", material: "Aerospace Honeycomb Barrier", desc: "Provides exceptional acoustic and thermal insulation while maximizing panel buckling resistance." },
      { name: "Co-Cured Aluminum Suspension Nodes", material: "Machined 7075 Hardpoints", desc: "Solid metal inserts co-cured into composite tub to anchor front double-wishbones with zero compliance." }
    ]
  },
  {
    id: 3102,
    num: "02",
    name: "Front Extruded Aluminum Crash Structure & Bumper Core",
    subsystem: "Front Impact Attenuation",
    part_number: "XP5-F1-805-CRASH",
    x_percent: 24.0,
    y_percent: 68.0,
    leaderSide: "left",
    material: "6063-T6 Extruded Aluminum Honeycomb Crash Box",
    weightDelta: "Progressive Controlled Deformation (40G Absorption)",
    spec: "M8 Aerospace Grade 5 Ti Fasteners",
    operationalLimit: "FIA Article 277 50 km/h Barrier Compliance",
    rationale: "Bolted directly to the front carbon monocoque bulkhead, absorbing high-speed frontal kinetic energy progressively before loads enter the driver survival cell.",
    torqueSpec: "38 Nm (Ti Fasteners)",
    substrate: "Extruded 6063-T6 Al",
    qty: 1,
    layers: [
      { name: "Deformation Crash Cones", material: "Extruded Aluminum Cells", desc: "Progressive crumple zones designed to collapse uniformly during impact." },
      { name: "Front Bulkhead Mounting Flange", material: "High-Tensile Billet Bracket", desc: "Distributes deceleration forces evenly across the front carbon tub face." },
      { name: "Nose Cone Carbon Fairing", material: "Lightweight Pre-Preg Carbon", desc: "Houses high-intensity projector headlamps and radiator intake ducts." }
    ]
  },
  {
    id: 3103,
    num: "03",
    name: "Side Radiator Cooling Duct & Underbody Aerodynamic Sill",
    subsystem: "Thermal Management & Ground Effect",
    part_number: "XP5-F1-807-SILL",
    x_percent: 71.0,
    y_percent: 73.0,
    leaderSide: "right",
    material: "Autoclaved Pre-Preg Carbon Fiber / Kevlar Matrix",
    weightDelta: "Houses Dual Side Heat Exchangers",
    spec: "Quick-Release Quarter-Turn Camlocks",
    operationalLimit: "Directs 180 L/s Airflow into Rear Engine Bay",
    rationale: "Channels high-velocity boundary layer air into side cooling pods, feeding aluminum radiator cores while sealing floor suction.",
    torqueSpec: "Quarter-Turn Camlock (8 Nm)",
    substrate: "Carbon / Kevlar Pre-Preg",
    qty: 2,
    layers: [
      { name: "Contoured Air Scoop Pod", material: "Pre-Preg Carbon Matrix", desc: "Diverts clean laminar side air directly into engine and oil cooling heat exchangers." },
      { name: "Underbody Ground-Effect Skirt", material: "Kevlar-Reinforced Carbon", desc: "Forms side seal maintaining low underbody air pressure generated by the twin vacuum fans." },
      { name: "Brake Duct Cooling Inlets", material: "Molded NACA Duct Channel", desc: "Forces ram-air into rear Brembo brake calipers to prevent track pad fade." }
    ]
  },
  {
    id: 3104,
    num: "04",
    name: "Dihedral Aerodynamic Door Frame & Hinge Mechanism",
    subsystem: "Cockpit Enclosure Architecture",
    part_number: "XP5-F1-810-DOOR",
    x_percent: 23.0,
    y_percent: 32.0,
    leaderSide: "left",
    material: "Pre-Preg Carbon Outer Skin & High-Yield A-Pillar Hinge",
    weightDelta: "Cuts Ingress Aperture Directly into Roofline",
    spec: "Gas-Strut Counterbalanced Dihedral Pivot",
    operationalLimit: "65° Upward/Forward Kinematic Swing",
    rationale: "Swings upward and outward into the roof contour, allowing driver and passengers effortless entry into the three-seater cockpit configuration.",
    torqueSpec: "M8 Inconel Pivot Pin (42 Nm)",
    substrate: "High-Modulus Carbon",
    qty: 2,
    layers: [
      { name: "Roof-Cutaway Carbon Shell", material: "High-Modulus Carbon Weave", desc: "Integrated roof glass section swings with the door to provide upright ingress." },
      { name: "Single-Pivot A-Pillar Hinge", material: "CNC Machined High-Yield Steel", desc: "Multi-axis hinge mechanism guiding door forward and clear of the front wheels." },
      { name: "Micro-Gas Strut Counterbalance", material: "Nitrogen-Charged Hydraulic Ram", desc: "Allows one-finger opening and closing with zero effort." }
    ]
  },
  {
    id: 3105,
    num: "05",
    name: "BMW Motorsport S70/2 Rear Subframe & Suspension Cradle",
    subsystem: "Powertrain Structural Mounting",
    part_number: "XP5-F1-505-SUB",
    x_percent: 85.0,
    y_percent: 18.0,
    leaderSide: "right",
    material: "TIG-Welded 4130 Chrome-Moly Aircraft Tubing",
    weightDelta: "Structural Stress-Bearing Member with V12 Engine",
    spec: "M12x1.5 High-Tensile Studs (115 Nm)",
    operationalLimit: "Torsional Reaction Load 627 PS / 650 Nm",
    rationale: "Rigidly anchors the 6.1L BMW S70/2 60° V12 engine and rear suspension wishbones to the carbon tub bulkhead with zero bush compliance.",
    torqueSpec: "115 Nm into Tub Hardpoints",
    substrate: "4130 Chrome-Molybdenum",
    qty: 1,
    layers: [
      { name: "Chrome-Moly Truss Framework", material: "Seamless 4130 Aircraft Tube", desc: "Triangulates engine mount points into rear suspension shock absorber turrets." },
      { name: "V12 Engine Block Solid Mounts", material: "Billet Aluminum Cleats", desc: "The BMW S70/2 engine block acts as a semi-stressed structural member of the chassis." },
      { name: "Rear Bilstein Damper Turrets", material: "Reinforced Multi-Node Welds", desc: "Handles extreme track compression forces under full aerodynamic downforce." }
    ]
  },
  {
    id: 3106,
    num: "06",
    name: "Engine Bay Firewall with 24K Gold Thermal Foil Insulation",
    subsystem: "Thermal Barrier & Cockpit Isolation",
    part_number: "XP5-F1-815-GOLD",
    x_percent: 74.0,
    y_percent: 26.0,
    leaderSide: "right",
    material: "Carbon-Nomex Sandwich with Genuine 24K Gold Heat Shield",
    weightDelta: "Reflects 95% of Radiant V12 Exhaust Heat",
    spec: "Aerospace Inconel Fasteners (6.5 Nm)",
    operationalLimit: "800°C Exhaust Radiant Protection",
    rationale: "Gordon Murray specified genuine 24-karat gold leaf lining for the engine bay firewall as the absolute most efficient heat reflector known to physics, shielding the carbon monocoque.",
    torqueSpec: "6.5 Nm",
    substrate: "24K Gold Leaf / Carbon-Nomex",
    qty: 1,
    layers: [
      { name: "24-Karat Gold Foil Layer", material: "Pure Embossed 24K Gold Foil", desc: "Reflects 95% of radiant heat emitted by the glowing 800°C V12 exhaust headers." },
      { name: "Microporous Ceramic Insulator", material: "Aerogel Thermal Blanket", desc: "Eliminates conductive heat transfer into the passenger cabin." },
      { name: "Composite Rear Bulkhead", material: "Pre-Preg Carbon Fiber / Nomex", desc: "Structural bulkhead sealing cockpit environment from engine fluids and sound." }
    ]
  }
];

// ============================================================================
// COMPREHENSIVE HOMOLOGATED PIN RESOLVER FOR ALL 5 VEHICLES & 3 VIEWPORTS
// ============================================================================

export function getHomologatedVehiclePins(
  carKey: string,
  stage: "chassis" | "powertrain" | "suspension"
): TargetCallout[] {
  const isPorsche = carKey.includes("porsche") || carKey === "porsche-911-gt3-rs";
  const isMcLaren = carKey.includes("mclaren") || carKey.includes("f1");
  const isVW = carKey.includes("golf") || carKey.includes("vw");
  const isFerrari = carKey.includes("ferrari") || carKey.includes("f40");
  const isNissan = carKey.includes("skyline") || carKey.includes("r34") || carKey.includes("gtr");

  // --------------------------------------------------------------------------
  // 1. CHASSIS STAGE [01. CHASSIS]
  // --------------------------------------------------------------------------
  if (stage === "chassis") {
    if (isMcLaren) return MCLAREN_F1_MONOCOQUE_EXPLODED_PINS;
    if (isPorsche) return EPC_MONOCOQUE_EXPLODED_PINS;

    if (isVW) {
      return EPC_MONOCOQUE_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "5WA-").replace("-MG", "-MQB");
        let rationale = p.rationale;
        let torqueSpec = p.torqueSpec;

        if (p.id === 3001) {
          name = "MQB Evo Hot-Formed Boron Steel & Aluminum Unibody";
          substrate = "1500 MPa Boron Steel / 6000 Al";
          part_number = "5WA-500-010-MQB";
          torqueSpec = "M10 Subframe (70 Nm + 90°)";
          rationale = "High-tensile unibody core with hot-formed boron A/B pillars delivering 34,000 Nm/deg torsional stiffness for 4MOTION R-Performance torque vectoring.";
        } else if (p.id === 3002) {
          name = "R-Performance Dual-Tier Roof Spoiler Foil";
          substrate = "Lightweight RIM Polyurethane";
          part_number = "5WA-827-901-R";
          torqueSpec = "M6 Torx T25 (9.0 Nm)";
          rationale = "Generates targeted high-speed downforce across rear axle while smoothing detachment vortex off hatch.";
        } else if (p.id === 3003) {
          name = "Golf R Aero Front Splitter with Brake Cooling Ducts";
          substrate = "High-Impact Thermoplastic / PUR";
          part_number = "5WA-805-901-SPL";
          torqueSpec = "M6 Torx T25 (8.5 Nm)";
          rationale = "Directs high-stagnation front air into dedicated wheel-well scoops to cool 357mm front brakes.";
        } else if (p.id === 3004) {
          name = "Club-Sport FIA 25CrMo4 Chrome-Moly Safety Half-Cage";
          substrate = "25CrMo4 Seamless Tubing";
          part_number = "5WA-857-CAGE-FIA";
          torqueSpec = "M10 Grade 10.9 (65 Nm)";
          rationale = "FIA-homologated half cage triangulating rear shock towers into the C-pillars for zero unibody torsion.";
        } else if (p.id === 3005) {
          name = "Golf R Sculpted Aerodynamic Side Sill Skirts";
          substrate = "Injection Molded PP-EPDM";
          part_number = "5WA-853-855-SIL";
          torqueSpec = "M5 Torx (4.5 Nm)";
          rationale = "Prevents turbulent front wheel wake from entering underfloor low-pressure ground-effect zones.";
        } else if (p.id === 3006) {
          name = "R-Performance Quad-Exit Diffuser with Titanium Tips";
          substrate = "High-Temp Polypropylene / Titanium";
          part_number = "5WA-807-531-DIF";
          torqueSpec = "M6 Torx (8.0 Nm)";
          rationale = "Expands underbody airflow smoothly around Akrapovič titanium exhaust canister.";
        }

        return { ...p, name, substrate, part_number, rationale, torqueSpec };
      });
    }

    if (isFerrari) {
      return EPC_MONOCOQUE_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "120A-");
        let rationale = p.rationale;
        let torqueSpec = p.torqueSpec;

        if (p.id === 3001) {
          name = "Tubular Steel Spaceframe with Bonded Kevlar / Carbon Panels";
          substrate = "25CrMo4 Steel Trusses & Kevlar";
          part_number = "120A-CHASSIS-TUB";
          torqueSpec = "M10 Grade 10.9 (65 Nm)";
          rationale = "Tubular trellis spaceframe stiffened with structural Araldite-bonded Kevlar tubs, producing an uncompromising 1,100 kg dry weight.";
        } else if (p.id === 3002) {
          name = "Fixed Composite Rear Aerofoil with Integrated Gurney Flap";
          substrate = "Carbon-Nomex Sandwich Composite";
          part_number = "120A-827-WING";
          torqueSpec = "M8 Stainless Hex (28 Nm)";
          rationale = "Iconic high-mount aerofoil providing essential rear axle stability at the F40's 324 km/h (201 mph) top speed.";
        } else if (p.id === 3003) {
          name = "Front Carbon-Kevlar Front Clamshell Section";
          substrate = "Autoclave Molded Carbon-Aramid";
          part_number = "120A-805-HOOD";
          torqueSpec = "Quarter-Turn Dzus Fasteners";
          rationale = "Single-piece forward-tilting clamshell allowing instant trackside inspection of front oil coolers and master cylinders.";
        } else if (p.id === 3004) {
          name = "Cockpit Survival Trellis & Tubular Side-Impact Bars";
          substrate = "Seamless 25CrMo4 Tubing";
          part_number = "120A-500-CAGE";
          torqueSpec = "TIG-Welded Nodes";
          rationale = "Exposed tubular spaceframe structure running directly through the minimalist cockpit perimeter.";
        } else if (p.id === 3005) {
          name = "Submerged NACA Boundary-Layer Intercooler Ducts";
          substrate = "Pre-Preg Carbon-Kevlar";
          part_number = "120A-853-NACA";
          torqueSpec = "Bonded Epoxy Joint";
          rationale = "Flush-mounted NACA ducts draw high-velocity cooling air without boundary layer flow separation.";
        } else if (p.id === 3006) {
          name = "Vented Rear Lexan Screen with Blister Extractors";
          substrate = "Polycarbonate / Carbon Vents";
          part_number = "120A-807-LEXAN";
          torqueSpec = "M5 Countersunk Screws (3.5 Nm)";
          rationale = "Evacuates blistering heat from the 2.9L twin-turbocharged V8 engine bay.";
        }

        return { ...p, name, substrate, part_number, rationale, torqueSpec };
      });
    }

    if (isNissan) {
      return EPC_MONOCOQUE_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "NIS-R34-");
        let rationale = p.rationale;
        let torqueSpec = p.torqueSpec;

        if (p.id === 3001) {
          name = "High-Rigidity V-Spec II Galvanized Steel Unibody with Seam Welds";
          substrate = "Galvanized Steel / Carbon Tunnel";
          part_number = "NIS-R34-500-VSPEC";
          torqueSpec = "Seam-Welded / M10 Braces (68 Nm)";
          rationale = "Factory V-Spec II platform with reinforced front strut towers, underfloor bracing, and full dry-carbon aerodynamic underbody tunnel.";
        } else if (p.id === 3002) {
          name = "V-Spec II Dual-Element Adjustable Rear Aerofoil";
          substrate = "Extruded Aluminum & Carbon Foil";
          part_number = "NIS-R34-827-WING";
          torqueSpec = "M8 Hex Bolts (35 Nm)";
          rationale = "Dual-tier rear wing featuring 4-position manual tilt angle adjustment for track-specific downforce balance.";
        } else if (p.id === 3003) {
          name = "V-Spec II OEM Autoclaved Dry-Carbon Ground Effect Diffuser";
          substrate = "Pre-Preg Dry Carbon Fiber";
          part_number = "NIS-R34-748A0-DIFF";
          torqueSpec = "M6 Titanium Fasteners (8.0 Nm)";
          rationale = "Factory autoclave-molded dry carbon underbody diffuser that speeds up underbody airflow, creating a true ground-effect suction seal.";
        } else if (p.id === 3004) {
          name = "Reinforced Front Strut Tower Bracing Bar";
          substrate = "Forged Billet Aluminum 6061-T6";
          part_number = "NIS-R34-TOWER-BRACE";
          torqueSpec = "M10 Flanged Nuts (55 Nm)";
          rationale = "Eliminates chassis flex across front shock towers during high-G corner entry with ATTESA AWD torque vectoring.";
        } else if (p.id === 3005) {
          name = "Front Bumper Fascia with Twin Intercooler Air Dams";
          substrate = "High-Impact RIM Urethane";
          part_number = "NIS-R34-FASCIA-AIR";
          torqueSpec = "M6 Fasteners (6.5 Nm)";
          rationale = "Massive front intake feeding front-mount intercooler and dedicated oil cooler ducting.";
        } else if (p.id === 3006) {
          name = "Super HICAS Rear Subframe Steering Cradle";
          substrate = "Cast Aluminum & High-Yield Steel";
          part_number = "NIS-R34-HICAS-CRADLE";
          torqueSpec = "M14 Subframe Studs (145 Nm)";
          rationale = "Houses electric rear-wheel steering actuator and ATTESA active rear differential.";
        }

        return { ...p, name, substrate, part_number, rationale, torqueSpec };
      });
    }

    return EPC_MONOCOQUE_EXPLODED_PINS;
  }

  // --------------------------------------------------------------------------
  // 2. POWERTRAIN STAGE [02. POWERTRAIN]
  // --------------------------------------------------------------------------
  if (stage === "powertrain") {
    if (isPorsche) return EPC_CYLINDER_EXPLODED_PINS;

    if (isMcLaren) {
      return EPC_CYLINDER_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "XP5-S70-");
        let rationale = p.rationale.replace("992", "McLaren F1 XP5").replace("9,000", "7,500");

        if (p.id === 2005) {
          name = "BMW Motorsport S70/2 Pankl Titanium H-Beam Connecting Rods";
          substrate = "Ti-6Al-4V Grade 5 Titanium";
          part_number = "XP5-S70-PANKL-TI";
          rationale = "Bespoke Pankl titanium connecting rods engineered by Paul Rosche to allow the 6.1L V12 to rev to 7,500 RPM with minimal reciprocating inertia.";
        } else if (p.id === 2003) {
          name = "Mahle Forged S70/2 Pistons with Slipper Skirts";
          substrate = "Mahle 124 Forged Alloy";
          part_number = "XP5-S70-MAHLE-PIS";
          rationale = "Lightweight forged pistons with deep valve pockets matching the 48-valve quad-cam cylinder heads.";
        } else if (p.id === 2008) {
          name = "Inconel 625+ High-Torque Connecting Rod Bolts";
          substrate = "Inconel 625+ Superalloy";
          part_number = "XP5-S70-BOLT-INC";
        }
        return { ...p, name, substrate, part_number, rationale };
      });
    }

    if (isVW) {
      return EPC_CYLINDER_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "5WA-EA888-");
        let rationale = p.rationale.replace("992", "Golf R Mk8 EA888").replace("9,000 RPM", "6,800 RPM");

        if (p.id === 2003) {
          name = "Mahle Forged Boost-Optimized EA888 Pistons";
          substrate = "Forged 2618 Aluminum Alloy";
          part_number = "5WA-103-PIS-EA";
          rationale = "Engineered with reinforced ring lands and thermal crown coating to withstand sustained 1.8 bar turbocharger boost.";
        } else if (p.id === 2005) {
          name = "Forged Micro-Alloy Steel Connecting Rods";
          substrate = "36MnVS4 Micro-Alloyed Steel";
          part_number = "5WA-103-ROD-EA";
          rationale = "Micro-alloyed forged steel construction designed for maximum fatigue strength under 420 Nm of low-end torque.";
        }
        return { ...p, name, substrate, part_number, rationale };
      });
    }

    if (isFerrari) {
      return EPC_CYLINDER_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "120A-V8-");
        let rationale = p.rationale.replace("992", "Ferrari F40 Tipo F120A").replace("9,000 RPM", "7,750 RPM");

        if (p.id === 2003) {
          name = "Mahle Forged Aluminum Pistons with Ceramic Crown Coating";
          substrate = "Mahle 124 Forged Alloy & Ceramic";
          part_number = "120A-MAHLE-PIS";
          rationale = "Ceramic thermal barrier coating insulates the crown from twin IHI turbocharger combustion temperatures.";
        } else if (p.id === 2005) {
          name = "Carrillo H-Beam Forged Connecting Rods";
          substrate = "4340 Chrome-Moly Forged Steel";
          part_number = "120A-CARRILLO-ROD";
          rationale = "High-tensile forged steel connecting rods handling violent 1.1 bar twin-turbo boost onset.";
        }
        return { ...p, name, substrate, part_number, rationale };
      });
    }

    if (isNissan) {
      return EPC_CYLINDER_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "NIS-RB26-");
        let rationale = p.rationale.replace("992", "Nissan Skyline GT-R R34 RB26DETT").replace("9,000 RPM", "8,000 RPM");

        if (p.id === 2005) {
          name = "Nismo Micro-Finished Forged Connecting Rods (RB26DETT)";
          substrate = "SNCM439 Nickel-Chrome Moly";
          part_number = "NIS-RB26-NISMO-ROD";
          rationale = "Shot-peened and micro-polished nickel-chrome molybdenum rods capable of 8,000+ RPM in Group A homologation trim.";
        } else if (p.id === 2003) {
          name = "Nismo Spec Forged Aluminum Pistons with Moly Skirts";
          substrate = "Forged A2618 Alloy";
          part_number = "NIS-RB26-PIS-SPEC";
          rationale = "Forged from high-temperature 2618 alloy with deep oil cooling channels underneath the piston deck.";
        }
        return { ...p, name, substrate, part_number, rationale };
      });
    }

    return EPC_CYLINDER_EXPLODED_PINS;
  }

  // --------------------------------------------------------------------------
  // 3. SUSPENSION STAGE [03. SUSPENSION]
  // --------------------------------------------------------------------------
  if (stage === "suspension") {
    if (isPorsche) return EPC_SUSPENSION_EXPLODED_PINS;

    if (isMcLaren) {
      return EPC_SUSPENSION_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "XP5-F1-").replace("-TTX", "-BILSTEIN");
        let rationale = p.rationale.replace("992", "McLaren F1 XP5");

        if (p.id === 1001) {
          name = "Bespoke Bilstein Monotube Racing Coilover with Eibach Springs";
          substrate = "Hard-Anodized Aluminum / Cr-Si";
          part_number = "XP5-F1-BILSTEIN-DAMPER";
          rationale = "Inboard horizontally-actuated monotube damper with zero unsprung weight penalty in wheel arch.";
        } else if (p.id === 1006) {
          name = "332mm Brembo Slotted Ventilated Motorsport Rotor";
          substrate = "Cast High-Carbon Steel Rotor & Billet Hat";
          part_number = "XP5-F1-BREMBO-ROTOR";
          rationale = "Gordon Murray specified cast steel for consistent initial pedal bite and tactile progressive modulation.";
        } else if (p.id === 1007) {
          name = "Brembo 4-Piston Monobloc Lightweight Caliper Assembly";
          substrate = "Monobloc Cast Aluminum Alloy";
          part_number = "XP5-F1-BREMBO-CALIPER";
        }
        return { ...p, name, substrate, part_number, rationale };
      });
    }

    if (isVW) {
      return EPC_SUSPENSION_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "5WA-").replace("-TTX", "-DCC");
        let rationale = p.rationale.replace("992", "Golf R Mk8");

        if (p.id === 1001) {
          name = "DCC Adaptive Dynamic Chassis Control Strut Assembly";
          substrate = "Hard-Chromed Micro-Alloy Steel";
          part_number = "5WA-412-021-DCC";
          rationale = "Electromagnetic proportional valves modifying rebound and compression damping 200 times per second.";
        } else if (p.id === 1006) {
          name = "357mm R-Performance Cross-Drilled Front Brake Discs";
          substrate = "Cast Iron Friction Ring & Aluminum Bell";
          part_number = "5WA-615-301-R357";
        }
        return { ...p, name, substrate, part_number, rationale };
      });
    }

    if (isFerrari) {
      return EPC_SUSPENSION_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "120A-").replace("-TTX", "-KONI");
        let rationale = p.rationale.replace("992", "Ferrari F40 Tipo F120A");

        if (p.id === 1001) {
          name = "Koni Twin-Tube Motorsport Shock Absorbers with Coil Springs";
          substrate = "Tempered Steel & Aluminum";
          part_number = "120A-KONI-SHOCK";
          rationale = "Classic Koni racing shocks tuned for racecar-direct feedback on smooth track surfaces.";
        } else if (p.id === 1006) {
          name = "330mm Brembo Cross-Drilled Ventilated Rotors";
          substrate = "High-Carbon Cast Iron Friction Disc";
          part_number = "120A-BREMBO-F40";
        }
        return { ...p, name, substrate, part_number, rationale };
      });
    }

    if (isNissan) {
      return EPC_SUSPENSION_EXPLODED_PINS.map((p) => {
        let name = p.name;
        let substrate = p.substrate;
        let part_number = p.part_number.replace("992-", "NIS-R34-").replace("-TTX", "-NISMO");
        let rationale = p.rationale.replace("992", "Nissan Skyline GT-R R34");

        if (p.id === 1001) {
          name = "Nismo S-Tune Inverted Monotube Coilover Assembly";
          substrate = "Inverted Steel Strut Body / Si-Cr Springs";
          part_number = "NIS-R34-NISMO-COIL";
          rationale = "Inverted damper design provides immense lateral stiffness to resist camber deflection under ATTESA AWD cornering.";
        } else if (p.id === 1006) {
          name = "324mm Brembo Slotted Ventilated Front Brake Discs";
          substrate = "High-Carbon Heat-Treated Iron";
          part_number = "NIS-R34-BREMBO-DISC";
        } else if (p.id === 1007) {
          name = "Brembo 4-Piston Gold Monobloc Caliper Assembly";
          substrate = "Forged Monobloc Aluminum (Gold Finish)";
          part_number = "NIS-R34-BREMBO-GOLD";
        }
        return { ...p, name, substrate, part_number, rationale };
      });
    }

    return EPC_SUSPENSION_EXPLODED_PINS;
  }

  // Fallback to chassis
  return EPC_MONOCOQUE_EXPLODED_PINS;
}

// ============================================================================
// 6 HOMOLOGATED VEHICLE EXPLODED KNOLLING DATASETS (4 TIERS + HARDWARE)
// ============================================================================

export const PORSCHE_KNOLLING_PINS: TargetCallout[] = [
  {
    id: 1001,
    num: "01",
    tier: "aero",
    name: "Dual-Element Active DRS Swan-Neck Wing",
    plainExplainer: "Hydraulically tilts 34 degrees in 0.3 seconds to bleed drag on straights and clamp down with 860 kg of downforce in corners.",
    weightVisual: "Light (-4.5 kg)",
    positionVisual: "Rear Aero Deck",
    wearVisual: "High Endurance",
    subsystem: "Rear Aerodynamics",
    part_number: "992-827-901-RS",
    x_percent: 74.0,
    y_percent: 16.0,
    leaderSide: "right",
    material: "High-Modulus Pre-Preg Carbon & 7075-T6 Pylons",
    weightDelta: "860 kg Downforce @ 285 km/h",
    spec: "M8x1.25 Gr.10.9 (42 Nm)",
    operationalLimit: "34° Hydraulic Tilt Range",
    rationale: "Top-mounted swan-neck pylons maintain uninterrupted laminar airflow across the wing underside for 30% greater downforce.",
    substrate: "High-Modulus Carbon",
    torqueSpec: "42 Nm (M8x1.25)",
    qty: 1,
    layers: [
      { name: "Active Flap Element", material: "Pre-Preg Carbon", desc: "Electro-hydraulic tilting foil adjusting aerodynamic drag angle." }
    ]
  },
  {
    id: 1002,
    num: "02",
    tier: "aero",
    name: "Carbon Fiber Hood with S-Duct Extractors",
    plainExplainer: "Evacuates blistering heat from the central motorsport radiator and routes downforce-generating air over the roof.",
    weightVisual: "Ultra-Light (-2.3 kg)",
    positionVisual: "Front Clamshell",
    wearVisual: "Zero Wear",
    subsystem: "Front Aero Shell",
    part_number: "992-823-010-CF",
    x_percent: 26.0,
    y_percent: 18.0,
    leaderSide: "left",
    material: "Autoclaved Pre-Preg Carbon Fiber",
    weightDelta: "-2.3 kg vs Aluminum",
    spec: "M6 Torx T25 (12 Nm)",
    operationalLimit: "Zero Deflection @ 300 km/h",
    rationale: "Routes high-velocity radiator exhaust smoothly out the hood to feed the roof aerodynamic channels.",
    substrate: "CFRP Pre-Preg",
    torqueSpec: "12 Nm (M6 Torx)",
    qty: 1,
    layers: [
      { name: "S-Duct Scoop Shell", material: "CFRP", desc: "Aerodynamic extraction channel accelerating airflow." }
    ]
  },
  {
    id: 1003,
    num: "03",
    tier: "aero",
    name: "Aero Door Shells with Lateral Air-Channel Blades",
    plainExplainer: "Carves wheel-well turbulence outward to feed clean, cool air directly into the rear flat-6 intake scoops.",
    weightVisual: "Ultra-Light (-5.0 kg)",
    positionVisual: "Lateral Flanks",
    wearVisual: "Zero Wear",
    subsystem: "Side Aero Profile",
    part_number: "992-831-010-RS",
    x_percent: 86.0,
    y_percent: 22.0,
    leaderSide: "right",
    material: "Carbon-Aramid Composite",
    weightDelta: "-5.0 kg vs Aluminum",
    spec: "M8 Door Hinge Fasteners (24 Nm)",
    operationalLimit: "Track Lateral Aero Guide",
    rationale: "Creates laminar flow along the door flank to prevent wheel wake from stalling the side intake scoops.",
    substrate: "Carbon-Aramid Composite",
    torqueSpec: "24 Nm (M8 Bolts)",
    qty: 2,
    layers: [
      { name: "Scalloped Door Skin", material: "Autoclaved Carbon", desc: "Inward curve channeling airflow straight to engine bay." }
    ]
  },
  {
    id: 1004,
    num: "04",
    tier: "monocoque",
    name: "AZ31B Hydroformed Magnesium Roof Panel",
    plainExplainer: "Lowers the car's center of gravity by 7.5 millimeters at the highest structural point to eliminate lateral cornering roll.",
    weightVisual: "Ultra-Light (-1.8 kg)",
    positionVisual: "Roof Structure",
    wearVisual: "Zero Wear",
    subsystem: "BIW & Monocoque",
    part_number: "992-817-010-MG",
    x_percent: 50.0,
    y_percent: 38.0,
    leaderSide: "left",
    material: "AZ31B-H24 Magnesium Alloy (1.1mm)",
    weightDelta: "-1.8 kg vs CFRP (-7.5mm CoG)",
    spec: "Dow Betamate 2090 + M5 Ti Bolts (6.2 Nm)",
    operationalLimit: "440°C Superplastic Formed",
    rationale: "Lightweight magnesium alloy roof panel significantly reduces rotational inertia in sharp chicane transitions.",
    substrate: "AZ31B Magnesium",
    torqueSpec: "6.2 Nm (M5 Ti)",
    qty: 1,
    layers: [
      { name: "Outer Double-Bubble Contour", material: "AZ31B Sheet", desc: "Contoured channels guide airflow into rear wing." }
    ]
  },
  {
    id: 1005,
    num: "05",
    tier: "monocoque",
    name: "Carbon-Fiber Reinforced Unibody Safety Cell & FIA Half-Cage",
    plainExplainer: "Delivers immense torsional rigidity so suspension geometry works with razor-sharp precision under 4.2G apex loading.",
    weightVisual: "Balanced",
    positionVisual: "Passenger Cell",
    wearVisual: "Structural Core",
    subsystem: "Safety Cell & Cage",
    part_number: "992-500-010-BIW",
    x_percent: 68.0,
    y_percent: 42.0,
    leaderSide: "right",
    material: "Al-Mg-Si Extrusions & CFRP Bracing with 25CrMo4 Steel",
    weightDelta: "35,000 Nm/deg Torsional Stiffness",
    spec: "M10 Subframe Bolts (65 Nm)",
    operationalLimit: "FIA Homologated Cage",
    rationale: "Monocoque perimeter triangulates rear strut mounts directly into roof nodes for zero unibody deflection.",
    substrate: "CFRP & Aluminum Spaceframe",
    torqueSpec: "65 Nm (M10 Gr.10.9)",
    qty: 1,
    layers: [
      { name: "FIA 25CrMo4 Tubing", material: "Seamless Chrome-Moly", desc: "Driver protection cage bolted directly to rear bulkheads." }
    ]
  },
  {
    id: 1006,
    num: "06",
    tier: "powertrain",
    name: "4.0L Flat-6 NA Engine (MA1.77) with 6 ITBs",
    plainExplainer: "Revving to 9,000 RPM, six dedicated intake butterflies eliminate hesitation for immediate throttle modulation mid-corner.",
    weightVisual: "Heavy (182 kg)",
    positionVisual: "Rear Axle Cantilever",
    wearVisual: "High Endurance",
    subsystem: "Internal Combustion Engine",
    part_number: "992-100-020-GT3",
    x_percent: 48.0,
    y_percent: 58.0,
    leaderSide: "right",
    material: "AlSi17Cu4Mg Cast Alusil Block & Titanium Rods",
    weightDelta: "525 PS / 465 Nm @ 9,000 RPM",
    spec: "M10 Motor Mounts (85 Nm)",
    operationalLimit: "9,000 RPM Continuous Redline",
    rationale: "Naturally aspirated 4.0L flat-six features dry-sump lubrication with 7 suction stages for zero oil starvation under 2.0G cornering.",
    substrate: "Alusil Aluminum Alloy",
    torqueSpec: "85 Nm (Motor Mounts)",
    qty: 1,
    layers: [
      { name: "Titanium Connecting Rods", material: "Ti-6Al-4V", desc: "Reduces reciprocating weight for instant rev capability." }
    ]
  },
  {
    id: 1007,
    num: "07",
    tier: "powertrain",
    name: "7-Speed Dual-Clutch PDK Transmission with Electronic LSD",
    plainExplainer: "Swaps cogs in under 100 milliseconds and actively vectors locking torque across the rear wheels to stabilize trail-braking.",
    weightVisual: "Moderate (116 kg)",
    positionVisual: "Transaxle Bay",
    wearVisual: "High Endurance",
    subsystem: "Transmission & Driveline",
    part_number: "992-300-020-PDK",
    x_percent: 70.0,
    y_percent: 60.0,
    leaderSide: "right",
    material: "Die-Cast Aluminum & Case-Hardened Steel Gearsets",
    weightDelta: "Sub-100ms Lightning Shifts",
    spec: "M10 Bellhousing Bolts (48 Nm)",
    operationalLimit: "Electronic Multi-Plate Differential",
    rationale: "Shortened final drive ratio optimizes acceleration between 2nd and 5th gears for technical circuits.",
    substrate: "Die-Cast Aluminum",
    torqueSpec: "48 Nm (Bellhousing)",
    qty: 1,
    layers: [
      { name: "Wet Multi-Plate Clutch", material: "Carbon-Kevlar Friction Linings", desc: "Handles repeated track launch controls without overheating." }
    ]
  },
  {
    id: 1008,
    num: "08",
    tier: "powertrain",
    name: "Inconel / Titanium Featherweight Racing Exhaust",
    plainExplainer: "Crafted from thin-wall titanium to survive 850°C exhaust gas temperatures while cutting 9.5 kg off the rear overhang.",
    weightVisual: "Ultra-Light (-9.5 kg)",
    positionVisual: "Rear Underfloor",
    wearVisual: "High Heat Resistant",
    subsystem: "Exhaust Circuit",
    part_number: "992-251-010-TI",
    x_percent: 30.0,
    y_percent: 66.0,
    leaderSide: "left",
    material: "Grade 2 Titanium & Inconel 625",
    weightDelta: "-9.5 kg vs Stainless Steel",
    spec: "M8 V-Band Clamps (18 Nm)",
    operationalLimit: "850°C Thermal Durability",
    rationale: "Equal-length headers with dual sport catalysts maximize exhaust gas velocity to improve low-end torque.",
    substrate: "Grade 2 Pure Titanium",
    torqueSpec: "18 Nm (V-Band Clamps)",
    qty: 1,
    layers: [
      { name: "Titanium Muffler Body", material: "Titanium Sheet (0.9mm)", desc: "Acoustically tuned resonant chambers with central twin tips." }
    ]
  },
  {
    id: 1009,
    num: "09",
    tier: "brakes_gear",
    name: "Monobloc 6-Piston Aluminum Brake Caliper",
    plainExplainer: "Squeezes the carbon brake rotor with 6 pistons to stop the car safely under heavy track braking.",
    weightVisual: "Light",
    positionVisual: "Front Axle",
    wearVisual: "High Endurance",
    subsystem: "Front Braking Assembly",
    part_number: "992-351-409-CC",
    x_percent: 12.0,
    y_percent: 76.0,
    leaderSide: "left",
    material: "Forged Monobloc Aluminum (Yellow Finish)",
    weightDelta: "6 Staggered Pistons (30/34/38mm)",
    spec: "M14 Radial Bolts (140 Nm)",
    operationalLimit: "180 Bar Hydraulic Pressure",
    rationale: "Fixed radial mounting ensures zero caliper flex and consistent pedal travel under repeated threshold braking.",
    substrate: "Monobloc Aluminum",
    torqueSpec: "140 Nm (Radial Mounts)",
    qty: 2,
    layers: [
      { name: "Forged Bridge Caliper", material: "AlSi1Mg", desc: "Rigid one-piece construction preventing piston pad taper." }
    ]
  },
  {
    id: 1010,
    num: "10",
    tier: "brakes_gear",
    name: "410mm Carbon-Silicon Carbide (PCCB) Brake Rotor",
    plainExplainer: "Dissipates intense track heat without fade while saving 18.2 kg of unsprung spinning mass for faster suspension response.",
    weightVisual: "Light (-18.2 kg)",
    positionVisual: "Wheel Hub",
    wearVisual: "High Endurance",
    subsystem: "Friction & Hub",
    part_number: "992-615-301-PCCB",
    x_percent: 16.0,
    y_percent: 84.0,
    leaderSide: "left",
    material: "Liquid Silicon Infiltrated (LSI) C/SiC Composite",
    weightDelta: "-18.2 kg Unsprung Rotating Mass",
    spec: "M30 Center-Lock Nut (600 Nm)",
    operationalLimit: "850°C Thermal Fade Limit",
    rationale: "Internal 3D cooling vanes pump air through the friction ring to rapidly dissipate kinetic energy.",
    substrate: "C/SiC Ceramic Composite",
    torqueSpec: "600 Nm (Center-Lock Nut)",
    qty: 2,
    layers: [
      { name: "C/SiC Friction Ring", material: "Carbon Ceramic Matrix", desc: "Ceramic matrix resisting track abrasion for over 100,000 km." }
    ]
  },
  {
    id: 1011,
    num: "11",
    tier: "brakes_gear",
    name: "Aero Teardrop Wishbones & Double-Wishbone Suspension",
    plainExplainer: "Airfoil-profile suspension arms generate 40 kg of clean downforce alone while eliminating front-end dive under heavy braking.",
    weightVisual: "Light",
    positionVisual: "Front Subframe",
    wearVisual: "Moderate",
    subsystem: "Front Running Gear",
    part_number: "992-407-151-GT",
    x_percent: 34.0,
    y_percent: 80.0,
    leaderSide: "left",
    material: "Drop-Forged AlSi10Mg Aluminum",
    weightDelta: "40 kg Downforce @ 285 km/h",
    spec: "M14x1.5 Ball-Joint Stud (140 Nm)",
    operationalLimit: "1.8G Threshold Anti-Dive",
    rationale: "Teardrop airfoil profile turns suspension linkages into aerodynamic downforce generators in clean airflow.",
    substrate: "Forged AlSi10Mg",
    torqueSpec: "140 Nm (Ball-Joint Stud)",
    qty: 2,
    layers: [
      { name: "Airfoil Arm", material: "Forged Aluminum", desc: "Drop-forged profile reducing wheel-well turbulence." }
    ]
  },
  {
    id: 1012,
    num: "12",
    tier: "hardware",
    name: "Titanium & Grade 10.9 Precision Fastener Grid",
    plainExplainer: "Organized array of stretch-calibrated bolts and conical center-lock fasteners ensuring zero hardware loosening under intense curb strike vibration.",
    weightVisual: "Ultra-Light",
    positionVisual: "Knolling Hardware Bed",
    wearVisual: "Single-Use Stretch",
    subsystem: "Fastener Grid",
    part_number: "992-007-912-FAST",
    x_percent: 74.0,
    y_percent: 92.0,
    leaderSide: "right",
    material: "Grade 5 Titanium & Dacromet 10.9 Steel",
    weightDelta: "Torque-Calibrated Fasteners",
    spec: "M6–M30 Fasteners (6–600 Nm)",
    operationalLimit: "1,200 MPa Tensile Strength",
    rationale: "High-spec motorsport fasteners engineered to maintain precise pre-load under severe chassis vibration.",
    substrate: "Ti-6Al-4V & Dacromet Steel",
    torqueSpec: "Various (6–600 Nm)",
    qty: 64,
    layers: [
      { name: "Micro-Finished Bolt Shank", material: "Titanium Alloy", desc: "Anti-seize coated threads ensuring repeatable torque tension." }
    ]
  }
];

export const BMW_M4_CSL_KNOLLING_PINS: TargetCallout[] = [
  {
    id: 4001,
    num: "01",
    tier: "aero",
    name: "Carbon Fiber Dual-Scoop Hood",
    plainExplainer: "Channels cold airflow over the radiators while slashing front-end weight by 1.2 kg to sharpen turn-in response.",
    weightVisual: "Ultra-Light (-1.2 kg)",
    positionVisual: "Front Clamshell",
    wearVisual: "Zero Wear",
    subsystem: "Front Aero Shell",
    part_number: "5123-8082-CSL",
    x_percent: 28.0,
    y_percent: 18.0,
    leaderSide: "left",
    material: "Autoclaved Pre-Preg Carbon Fiber (CFRP)",
    weightDelta: "-1.2 kg vs Aluminum",
    spec: "M6 Dzus Quick-Release (10 Nm)",
    operationalLimit: "Zero Deflection @ 307 km/h",
    rationale: "Dual recessed vents extract turbulent radiator wash while reducing front axle aerodynamic lift.",
    substrate: "CFRP Pre-Preg",
    torqueSpec: "10 Nm (M6 Dzus)",
    qty: 1,
    layers: [
      { name: "Gloss Clear Lacquer & Exposed Weave", material: "UV-Resistant Clear Coat", desc: "Dual visible carbon stripes accented with red contour lines." }
    ]
  },
  {
    id: 4002,
    num: "02",
    tier: "aero",
    name: "CSL Sculpted Carbon Ducktail Decklid",
    plainExplainer: "Generates high-speed rear axle downforce at track speeds without needing a drag-inducing wing.",
    weightVisual: "Light (-6.7 kg)",
    positionVisual: "Rear Decklid",
    wearVisual: "High Endurance",
    subsystem: "Rear Aerodynamics",
    part_number: "5124-8083-CSL",
    x_percent: 64.0,
    y_percent: 17.0,
    leaderSide: "right",
    material: "Pre-Preg Carbon Fiber Reinforced Polymer",
    weightDelta: "-6.7 kg vs Steel Trunk",
    spec: "M8 Torx T30 (19 Nm)",
    operationalLimit: "60 kg Rear Downforce @ 250 km/h",
    rationale: "Integrated upturned ducktail spoiler pays homage to the legendary E46 M3 CSL while creating clean aero downforce.",
    substrate: "Carbon Composite",
    torqueSpec: "19 Nm (M8 Torx)",
    qty: 1,
    layers: [
      { name: "Integrated Aerodynamic Ducktail", material: "CFRP Shell", desc: "Seamless high-kick spoiler delaying airflow separation." }
    ]
  },
  {
    id: 4003,
    num: "03",
    tier: "aero",
    name: "Carbon Front Splitter with Red CSL Accents",
    plainExplainer: "Splits incoming turbulent air to create high downforce across the front axle at triple-digit speeds.",
    weightVisual: "Light",
    positionVisual: "Lower Front Fascia",
    wearVisual: "Track Consumable",
    subsystem: "Front Aero Splitter",
    part_number: "5111-8084-SPL",
    x_percent: 13.5,
    y_percent: 21.0,
    leaderSide: "left",
    material: "Autoclaved Carbon Composite with Red Pinstripes",
    weightDelta: "45 kg Front Downforce @ 200 km/h",
    spec: "M5 Torx T20 Fasteners (8.5 Nm)",
    operationalLimit: "Ground-Effect Skid Surface",
    rationale: "Accelerates boundary-layer airflow under the front bumper to suck the front tires into the asphalt.",
    substrate: "Molded Carbon Composite",
    torqueSpec: "8.5 Nm (M5 Torx)",
    qty: 1,
    layers: [
      { name: "Leading Edge Splitter Blade", material: "Multi-Ply Carbon Composite", desc: "Divides stagnated front air into radiator intake and underbody suction zones." }
    ]
  },
  {
    id: 4004,
    num: "04",
    tier: "monocoque",
    name: "High-Strength Steel & Carbon Unibody Cell",
    plainExplainer: "Forms the rigid safety cell and structural backbone, resisting twisting forces when cornering at extreme grip levels.",
    weightVisual: "Balanced",
    positionVisual: "Central Chassis Core",
    wearVisual: "Structural Core",
    subsystem: "BIW & Monocoque Core",
    part_number: "4100-8085-TUB",
    x_percent: 50.0,
    y_percent: 39.0,
    leaderSide: "left",
    material: "Ultra-High-Strength Steel & Carbon Tunnel",
    weightDelta: "36,000 Nm/deg Torsional Rigidity",
    spec: "M10/M12 Subframe Bolts (120 Nm)",
    operationalLimit: "5.5G Peak Crash Energy Dissipation",
    rationale: "Lightened through rear seat deletion, sound insulation purge, and bonded carbon transmission tunnel reinforcement.",
    substrate: "UHSS & Carbon Fiber",
    torqueSpec: "120 Nm Subframe Bolts",
    qty: 1,
    layers: [
      { name: "Passenger Safety Cage", material: "Hot-Stamped Boron Steel", desc: "Provides unyielding cabin survival perimeter for driver." }
    ]
  },
  {
    id: 4005,
    num: "05",
    tier: "monocoque",
    name: "Cast Aluminum Precision Front Strut Brace",
    plainExplainer: "Connects the front shock towers to prevent chassis flex under violent braking and high lateral Gs.",
    weightVisual: "Light (-2.5 kg)",
    positionVisual: "Engine Bay Tower Bridge",
    wearVisual: "Zero Wear",
    subsystem: "Chassis Bracing",
    part_number: "5161-8086-BRACE",
    x_percent: 24.0,
    y_percent: 36.0,
    leaderSide: "left",
    material: "Topology-Optimized Cast Aluminum AlSi10Mg",
    weightDelta: "-2.5 kg vs Steel / +18% Shear Rigidity",
    spec: "M10 Flanged Hex (56 Nm)",
    operationalLimit: "Infinite Fatigue Life",
    rationale: "Complex geometric casting developed through FEA load simulation to eliminate camber deflection in extreme turns.",
    substrate: "AlSi10Mg Cast Aluminum",
    torqueSpec: "56 Nm (M10 Flanged)",
    qty: 1,
    layers: [
      { name: "Topology Cast Truss", material: "Billet AlSi10Mg", desc: "Ribbed internal lattices triangulate shock towers straight into the front bulkhead." }
    ]
  },
  {
    id: 4006,
    num: "06",
    tier: "powertrain",
    name: "S58 3.0L Twin-Turbo Inline-6 Engine Block",
    plainExplainer: "Pumps out 550 horsepower with forged crankshaft and 3D-printed cylinder head core for ultra-high boost pressures.",
    weightVisual: "Heavy (194 kg)",
    positionVisual: "Front-Mid Bay",
    wearVisual: "High Endurance",
    subsystem: "Reciprocating Powertrain",
    part_number: "1100-8087-S58",
    x_percent: 48.0,
    y_percent: 58.0,
    leaderSide: "right",
    material: "Closed-Deck AlSi Alloy & Forged Internals",
    weightDelta: "550 PS / 650 Nm @ 2.1 Bar Boost",
    spec: "M11 Cylinder Head Bolts (115 Nm)",
    operationalLimit: "7,200 RPM Peak Redline",
    rationale: "Features a wire-arc sprayed cylinder coating, forged lightweight crankshaft, and 3D printed water jacket cores for uniform cylinder cooling.",
    substrate: "Closed-Deck Aluminum",
    torqueSpec: "115 Nm (Head Bolts)",
    qty: 1,
    layers: [
      { name: "Closed-Deck Cylinder Block", material: "Die-Cast Aluminum", desc: "Withstands 140 bar peak cylinder combustion pressures." }
    ]
  },
  {
    id: 4007,
    num: "07",
    tier: "powertrain",
    name: "8-Speed M Steptronic Transmission with Drivelogic",
    plainExplainer: "Rips through gear changes in milliseconds to keep the twin-turbo engine right at peak acceleration.",
    weightVisual: "Moderate",
    positionVisual: "Longitudinal Tunnel",
    wearVisual: "High Endurance",
    subsystem: "Transmission & Driveline",
    part_number: "2400-8088-ZF8",
    x_percent: 68.0,
    y_percent: 56.0,
    leaderSide: "right",
    material: "High-Pressure Magnesium & Steel Planetary Gearsets",
    weightDelta: "Sub-100ms Shift Times",
    spec: "M10 Bellhousing Bolts (45 Nm)",
    operationalLimit: "800 Nm Torque Capacity",
    rationale: "Calibrated with aggressive CSL software for instant downshift rev-matching and brutal launch control clutch lockup.",
    substrate: "Die-Cast Magnesium / Steel",
    torqueSpec: "45 Nm (Bellhousing)",
    qty: 1,
    layers: [
      { name: "Lock-Up Torque Converter", material: "Billet Multi-Plate Clutch", desc: "Locks solid from 1,200 RPM for direct mechanical throttle feel." }
    ]
  },
  {
    id: 4008,
    num: "08",
    tier: "powertrain",
    name: "Lightweight Titanium Rear Exhaust Silencer",
    plainExplainer: "Reduces backpressure for faster turbo spool while shedding 4.3 kg off the rear axle with an intoxicating roar.",
    weightVisual: "Ultra-Light (-4.3 kg)",
    positionVisual: "Rear Underfloor",
    wearVisual: "High Heat Resistant",
    subsystem: "Exhaust Circuit",
    part_number: "1830-8089-TITAN",
    x_percent: 29.0,
    y_percent: 73.0,
    leaderSide: "left",
    material: "Grade 2 Pure Titanium & Electron Beam Welds",
    weightDelta: "-4.3 kg vs Stainless Exhaust",
    spec: "M8 V-Band Clamps (24 Nm)",
    operationalLimit: "900°C Exhaust Gas Temp",
    rationale: "Titanium rear muffler features electronically controlled sound flaps to balance race-track acoustics with backpressure scavenging.",
    substrate: "Grade 2 Titanium",
    torqueSpec: "24 Nm (V-Band Clamps)",
    qty: 1,
    layers: [
      { name: "Thin-Wall Titanium Piping", material: "1.0mm Grade 2 Titanium", desc: "Ultra-light resonant acoustic walls producing trademark rasp." }
    ]
  },
  {
    id: 4009,
    num: "09",
    tier: "brakes_gear",
    name: "M Carbon Ceramic 6-Piston Front Brake Caliper",
    plainExplainer: "Squeezes the carbon brake rotor with 6 pistons to stop the car safely under heavy track braking.",
    weightVisual: "Light",
    positionVisual: "Front Axle",
    wearVisual: "High Endurance",
    subsystem: "Front Braking Assembly",
    part_number: "3411-8090-CC",
    x_percent: 7.0,
    y_percent: 74.0,
    leaderSide: "left",
    material: "Monobloc Cast Aluminum (Gloss Red Finish)",
    weightDelta: "6-Piston Staggered Bore",
    spec: "M14 Radial Caliper Mounts (140 Nm)",
    operationalLimit: "180 Bar Hydraulic Line Pressure",
    rationale: "Radial mount geometry prevents caliper bridge spread under extreme hydraulic brake pressure at the end of the straightaway.",
    substrate: "Monobloc Forged Aluminum",
    torqueSpec: "140 Nm (Radial Mount)",
    qty: 2,
    layers: [
      { name: "Monobloc Bridge Structure", material: "Forged Aluminum Alloy", desc: "High bridge stiffness eliminating spongy brake pedal feel." }
    ]
  },
  {
    id: 4010,
    num: "10",
    tier: "brakes_gear",
    name: "400mm Carbon Ceramic Ventilated Brake Rotor",
    plainExplainer: "Dissipates friction temperatures up to 800°C without brake fade while cutting 14 kg of rotating unsprung mass.",
    weightVisual: "Light (-14 kg)",
    positionVisual: "Front Hub",
    wearVisual: "High Endurance",
    subsystem: "Friction & Hub",
    part_number: "3411-8091-ROTOR",
    x_percent: 13.0,
    y_percent: 73.0,
    leaderSide: "left",
    material: "C/SiC Carbon Ceramic Matrix & Billet Hat",
    weightDelta: "-14.3 kg Unsprung Rotating Mass",
    spec: "M14x1.25 Lug Bolts (140 Nm)",
    operationalLimit: "850°C Fade Resistance",
    rationale: "Long carbon fiber strands bonded with silicon carbide provide virtually wear-free track braking with zero thermal warpage.",
    substrate: "C/SiC Ceramic Composite",
    torqueSpec: "140 Nm (Wheel Lugs)",
    qty: 2,
    layers: [
      { name: "Carbon-Silicon Friction Ring", material: "Liquid Silicon Infiltrated Ceramic", desc: "Withstands extreme track abrasion without rotor thickness variation." }
    ]
  },
  {
    id: 4011,
    num: "11",
    tier: "brakes_gear",
    name: "CSL Inverted Track Damper & Spring Strut",
    plainExplainer: "Controls wheel compression over kerbs and bumps to keep tires glued to the racing surface.",
    weightVisual: "Light",
    positionVisual: "Front Wheel Arch",
    wearVisual: "Moderate",
    subsystem: "Suspension & Kinematics",
    part_number: "3131-8092-COIL",
    x_percent: 25.5,
    y_percent: 41.0,
    leaderSide: "left",
    material: "Hard-Anodized Aluminum & Si-Cr Spring Steel",
    weightDelta: "-8mm Ride Height vs Standard M4",
    spec: "M12 Strut Top Nut (64 Nm)",
    operationalLimit: "Electronic Damping Control",
    rationale: "Solid ball-joint bearings replace rubber bushings throughout the front and rear subframes for zero toe/camber compliance.",
    substrate: "Hard-Anodized Al / Cr-Si",
    torqueSpec: "64 Nm (Strut Top)",
    qty: 2,
    layers: [
      { name: "Auxiliary Helper Spring", material: "High-Tensile Cr-Si Steel", desc: "Maintains spring seating under full droop over track curbs." }
    ]
  },
  {
    id: 4012,
    num: "12",
    tier: "hardware",
    name: "High-Tensile Knolled Fastener & Hardware Grid",
    plainExplainer: "Precision torqued Grade 10.9 and Grade 5 titanium bolts engineered to withstand track vibrations and sheer forces.",
    weightVisual: "Ultra-Light",
    positionVisual: "Modular Hardware Grid",
    wearVisual: "Single-Use Stretch",
    subsystem: "Fastener Hardware Grid",
    part_number: "0711-8093-FAST",
    x_percent: 36.0,
    y_percent: 92.0,
    leaderSide: "right",
    material: "Grade 10.9 Dacromet Steel & Ti-6Al-4V",
    weightDelta: "Calibrated Torque Retention",
    spec: "M6–M14 Fasteners (10–140 Nm)",
    operationalLimit: "1,040 MPa Tensile Yield Strength",
    rationale: "Precision micro-finished fastener grid ensures critical suspension and subframe mounts do not relax under continuous track vibration.",
    substrate: "Dacromet 10.9 & Titanium",
    torqueSpec: "10–140 Nm (Various)",
    qty: 48,
    layers: [
      { name: "Corrosion-Proof Dacromet Coating", material: "Zinc-Aluminum Flake", desc: "Guarantees consistent torque-to-tension friction coefficients." }
    ]
  }
];

export const MCLAREN_F1_KNOLLING_PINS: TargetCallout[] = [
  {
    id: 5001,
    num: "01",
    tier: "aero",
    name: "Active Pop-Up Aerodynamic Airbrake Foil",
    plainExplainer: "Raises 30 degrees during high-speed threshold braking to increase rear downforce and drag, stabilizing the rear axle.",
    weightVisual: "Light (-3.2 kg)",
    positionVisual: "Rear Decklid",
    wearVisual: "High Endurance",
    subsystem: "Active Aerodynamics",
    part_number: "XP5-827-AIRBRAKE",
    x_percent: 75.0,
    y_percent: 18.0,
    leaderSide: "right",
    material: "Autoclaved Pre-Preg Carbon Composite",
    weightDelta: "+120 kg Downforce under Braking",
    spec: "M6 Titanium Fasteners (12 Nm)",
    operationalLimit: "30° Pop-Up Angle Deployment",
    rationale: "Pivots upward to create base drag and increase rear tire contact patch loading under threshold braking from 300+ km/h.",
    substrate: "Carbon Composite",
    torqueSpec: "12 Nm (Titanium)",
    qty: 1,
    layers: [
      { name: "Pop-Up Wing Element", material: "Nomex Honeycomb Carbon", desc: "Ultralight wing flap deploying in 0.25 seconds." }
    ]
  },
  {
    id: 5002,
    num: "02",
    tier: "aero",
    name: "Carbon-Composite Front Maintenance Clamshell",
    plainExplainer: "Tilts open to give rapid trackside access to the brake fluid reservoirs, onboard Kenwood CD changer, and aluminum toolkit.",
    weightVisual: "Ultra-Light",
    positionVisual: "Front Clamshell",
    wearVisual: "Zero Wear",
    subsystem: "Front Bodywork",
    part_number: "XP5-805-HOOD",
    x_percent: 24.0,
    y_percent: 19.0,
    leaderSide: "left",
    material: "Pre-Preg Carbon Fiber / Nomex Core",
    weightDelta: "-8.5 kg vs Conventional Hood",
    spec: "Quarter-Turn Dzus Fasteners",
    operationalLimit: "Zero Deflection @ 386 km/h",
    rationale: "Seamless carbon front clamshell forms the aerodynamic nose cone directing air into twin radiator ducts.",
    substrate: "Carbon / Nomex Sandwich",
    torqueSpec: "Quarter-Turn Dzus",
    qty: 1,
    layers: [
      { name: "Outer Aero Shell", material: "Carbon Fiber", desc: "Aerodynamic nose profile with low drag coefficient (0.32 Cd)." }
    ]
  },
  {
    id: 5003,
    num: "03",
    tier: "aero",
    name: "Ground-Effect Underbody Venturi Diffusers",
    plainExplainer: "Pairs with twin Kevlar electric suction fans in the rear to suck the floor directly onto the track surface without drag.",
    weightVisual: "Light",
    positionVisual: "Underbody Venturi",
    wearVisual: "Zero Wear",
    subsystem: "Ground Effect Floor",
    part_number: "XP5-807-DIFF",
    x_percent: 84.0,
    y_percent: 24.0,
    leaderSide: "right",
    material: "Carbon-Kevlar Sandwich Composite",
    weightDelta: "Active Fan Ground Effect",
    spec: "M6 Titanium Countersunk (8 Nm)",
    operationalLimit: "High-Temperature Resistant",
    rationale: "Two electric fans evacuate boundary layer air to reduce aerodynamic lift without incurring the high-drag penalty of large exterior wings.",
    substrate: "Carbon-Kevlar Composite",
    torqueSpec: "8 Nm (Countersunk)",
    qty: 1,
    layers: [
      { name: "Venturi Strakes", material: "Kevlar Composite", desc: "Directs turbulent air smoothly around rear half-shafts." }
    ]
  },
  {
    id: 5004,
    num: "04",
    tier: "monocoque",
    name: "Revolutionary 3-Seat Carbon Monocoque Tub",
    plainExplainer: "The world's first production carbon monocoque, placing the driver centrally for zero-parallax vision with unmatched structural strength.",
    weightVisual: "Ultra-Light (100 kg)",
    positionVisual: "Central Survival Cell",
    wearVisual: "Structural Core",
    subsystem: "Monocoque Chassis",
    part_number: "XP5-MONO-TUB",
    x_percent: 50.0,
    y_percent: 38.0,
    leaderSide: "left",
    material: "Pre-Preg Carbon Fiber & Aluminum Honeycomb Core",
    weightDelta: "100 kg Total Tub Weight",
    spec: "Bonded Epoxy & Titanium Nodes",
    operationalLimit: "Formula 1 Impact Compliance",
    rationale: "Gordon Murray's central cockpit layout delivers 50:50 lateral weight distribution and unobstructed apex sightlines flanked by passenger seats.",
    substrate: "Carbon / Aluminum Honeycomb",
    torqueSpec: "Bonded Aerospace Epoxy",
    qty: 1,
    layers: [
      { name: "Central Seat Monocoque", material: "Pre-Preg Carbon", desc: "Molded central seating well positioning driver at vehicle polar center." }
    ]
  },
  {
    id: 5005,
    num: "05",
    tier: "monocoque",
    name: "24-Karat Gold Foil Engine Bay Thermal Shield",
    plainExplainer: "Deflects radiant exhaust heat away from the carbon fiber monocoque using 16 grams of pure reflective gold.",
    weightVisual: "Negligible (16 g)",
    positionVisual: "Engine Bay Bulkhead",
    wearVisual: "Zero Wear",
    subsystem: "Thermal Barrier",
    part_number: "XP5-GOLD-HEAT",
    x_percent: 32.0,
    y_percent: 42.0,
    leaderSide: "left",
    material: "99.99% Pure 24-Karat Gold Leaf & Kapton Film",
    weightDelta: "16 Grams Total Mass",
    spec: "Self-Adhesive High-Temp Polyimide",
    operationalLimit: "98% Infrared Heat Reflection",
    rationale: "Gold is the most efficient natural reflector of infrared radiant heat, preventing exhaust temperatures from degrading the carbon monocoque resin.",
    substrate: "24K Gold & Kapton Film",
    torqueSpec: "Polyimide Adhesive",
    qty: 1,
    layers: [
      { name: "Gold Leaf Barrier", material: "24K Gold", desc: "Reflects exhaust radiation up to 600°C away from carbon tub." }
    ]
  },
  {
    id: 5006,
    num: "06",
    tier: "powertrain",
    name: "BMW Motorsport S70/2 6.1L 60° V12 Engine",
    plainExplainer: "Produces 627 naturally aspirated horsepower with 12 individual throttle butterflies and continuous variable valve timing.",
    weightVisual: "Balanced (266 kg)",
    positionVisual: "Mid-Engine Bay",
    wearVisual: "High Endurance",
    subsystem: "Naturally Aspirated V12",
    part_number: "XP5-S70-V12",
    x_percent: 49.0,
    y_percent: 59.0,
    leaderSide: "right",
    material: "Alusil Cast Block, Magnesium Sump & Pankl Titanium Rods",
    weightDelta: "627 PS / 650 Nm @ 7,500 RPM",
    spec: "M10 Titanium Engine Mounts (75 Nm)",
    operationalLimit: "7,500 RPM Peak Redline",
    rationale: "Engineered by Paul Rosche to Gordon Murray's exacting specifications: dry-sump lubrication, 12 ITBs, and dual fuel injectors per cylinder.",
    substrate: "Alusil Block & Magnesium",
    torqueSpec: "75 Nm (Engine Mounts)",
    qty: 1,
    layers: [
      { name: "Pankl Titanium Rods", material: "Ti-6Al-4V", desc: "Ultra-low reciprocating mass allowing lightning 7,500 RPM throttle response." }
    ]
  },
  {
    id: 5007,
    num: "07",
    tier: "powertrain",
    name: "Transverse 6-Speed Manual Transaxle & AP Triple Clutch",
    plainExplainer: "Compact transverse packaging engineered by Gordon Murray to keep polar moment of inertia minimal for lightning turn-in.",
    weightVisual: "Light (88 kg)",
    positionVisual: "Rear Transaxle",
    wearVisual: "High Endurance",
    subsystem: "Transmission & Driveline",
    part_number: "XP5-TRANS-6SPD",
    x_percent: 69.0,
    y_percent: 58.0,
    leaderSide: "right",
    material: "Magnesium Alloy Casing & Billet Helical Gearsets",
    weightDelta: "88 kg Complete Transaxle Weight",
    spec: "M10 Magnesium Casing Bolts (38 Nm)",
    operationalLimit: "Triple-Plate AP Racing Clutch",
    rationale: "Transverse arrangement keeps engine and transmission as close to vehicle center of gravity as possible.",
    substrate: "Magnesium Alloy",
    torqueSpec: "38 Nm (Casing Bolts)",
    qty: 1,
    layers: [
      { name: "Triple-Plate Carbon Clutch", material: "AP Racing Carbon", desc: "Compact diameter reducing rotational inertia." }
    ]
  },
  {
    id: 5008,
    num: "08",
    tier: "powertrain",
    name: "Hand-Welded Inconel Resonant Exhaust Manifold",
    plainExplainer: "Equal-length equal-pulse exhaust runners crafted from paper-thin Inconel superalloy producing legendary V12 acoustic resonance.",
    weightVisual: "Ultra-Light (-7 kg)",
    positionVisual: "Engine Exhaust Flange",
    wearVisual: "High Heat Resistant",
    subsystem: "Exhaust Circuit",
    part_number: "XP5-EXH-INC",
    x_percent: 31.0,
    y_percent: 68.0,
    leaderSide: "left",
    material: "Inconel 625 Superalloy Sheet (0.8mm)",
    weightDelta: "-7.0 kg vs Stainless Steel",
    spec: "M8 Inconel Studs (22 Nm)",
    operationalLimit: "950°C Continuous Heat Resistance",
    rationale: "Superalloy tubes expand without cracking under extreme temperature cycles while producing F1-grade harmonic acoustics.",
    substrate: "Inconel 625",
    torqueSpec: "22 Nm (Inconel Studs)",
    qty: 1,
    layers: [
      { name: "6-into-1 Inconel Collector", material: "Inconel 625", desc: "Harmonically tuned pulse scavenging collector." }
    ]
  },
  {
    id: 5009,
    num: "09",
    tier: "brakes_gear",
    name: "Brembo 4-Piston Monobloc Motorsport Caliper",
    plainExplainer: "Direct pedal modulation caliper without ABS to provide pure, unfiltered hydraulic brake feedback directly to the driver's foot.",
    weightVisual: "Light",
    positionVisual: "Front Hub Knuckle",
    wearVisual: "High Endurance",
    subsystem: "Front Braking Assembly",
    part_number: "XP5-BREMBO-CAL",
    x_percent: 11.5,
    y_percent: 75.0,
    leaderSide: "left",
    material: "Monobloc Cast Aluminum Alloy",
    weightDelta: "Non-Servo Direct Hydraulic",
    spec: "M12 High-Tensile Bolts (110 Nm)",
    operationalLimit: "160 Bar Line Pressure",
    rationale: "Gordon Murray opted out of ABS and power steering to deliver unadulterated mechanical feedback through the pedals.",
    substrate: "Monobloc Aluminum",
    torqueSpec: "110 Nm (Mounting Bolts)",
    qty: 2,
    layers: [
      { name: "Monobloc Caliper Body", material: "Cast Aluminum", desc: "Stiff bridge casting resisting deflection under hard deceleration." }
    ]
  },
  {
    id: 5010,
    num: "10",
    tier: "brakes_gear",
    name: "332mm Ventilated High-Carbon Cast Steel Brake Rotor",
    plainExplainer: "Specified by Gordon Murray for consistent pedal bite and immediate cold-weather response without the unpredictability of early carbon brakes.",
    weightVisual: "Balanced",
    positionVisual: "Billet Rotor Hat",
    wearVisual: "High Endurance",
    subsystem: "Friction & Hub",
    part_number: "XP5-BREMBO-ROT",
    x_percent: 15.5,
    y_percent: 83.0,
    leaderSide: "left",
    material: "High-Carbon Cast Iron Friction Disc & Billet Aluminum Bell",
    weightDelta: "Instant Cold Pedal Bite",
    spec: "M14 Lug Fasteners (120 Nm)",
    operationalLimit: "750°C Thermal Limit",
    rationale: "Cast iron discs provide progressive tactile pedal modulation that early carbon-carbon brakes could not match in road use.",
    substrate: "High-Carbon Steel / Aluminum",
    torqueSpec: "120 Nm (Wheel Nuts)",
    qty: 2,
    layers: [
      { name: "Curved Vane Rotor", material: "Cast High-Carbon Iron", desc: "Directional cooling vanes pumping heat away from hub." }
    ]
  },
  {
    id: 5011,
    num: "11",
    tier: "brakes_gear",
    name: "Inboard Pushrod Horizontal Dampers with Eibach Springs",
    plainExplainer: "Transfers wheel motions through cantilever rocker arms into inboard dampers, eliminating unsprung mass in the wheel arches.",
    weightVisual: "Ultra-Light",
    positionVisual: "Inboard Chassis Mount",
    wearVisual: "Moderate",
    subsystem: "Pushrod Kinematics",
    part_number: "XP5-BILSTEIN-DAM",
    x_percent: 32.0,
    y_percent: 78.0,
    leaderSide: "left",
    material: "Hard-Anodized Aluminum Monotube & Cr-Si Springs",
    weightDelta: "Zero Wheel-Arch Damper Mass",
    spec: "M10 Pivot Bolts (52 Nm)",
    operationalLimit: "Ground-Effect Camber Stability",
    rationale: "Inboard pushrod geometry keeps unsprung wheel assembly mass ultra-low, allowing instantaneous suspension reaction to pavement ripples.",
    substrate: "Aluminum / Cr-Si Wire",
    torqueSpec: "52 Nm (Pivot Bolts)",
    qty: 2,
    layers: [
      { name: "Bespoke Bilstein Damper", material: "Aluminum Body", desc: "Monotube damper with nitrogen gas reservoir." }
    ]
  },
  {
    id: 5012,
    num: "12",
    tier: "hardware",
    name: "Mil-Spec Grade 5 Titanium Aerospace Fastener Grid",
    plainExplainer: "Each fastener was individually weighed during development to guarantee Gordon Murray's stringent 1,138 kg total curb weight target.",
    weightVisual: "Ultra-Light",
    positionVisual: "Knolling Hardware Grid",
    wearVisual: "Single-Use Stretch",
    subsystem: "Aircraft Fastener Grid",
    part_number: "XP5-AERO-FAST",
    x_percent: 73.0,
    y_percent: 92.0,
    leaderSide: "right",
    material: "Ti-6Al-4V Aerospace Grade 5 Titanium",
    weightDelta: "-45% Fastener Mass vs Steel",
    spec: "M5–M14 Fasteners (8–120 Nm)",
    operationalLimit: "Aircraft Homologation Standards",
    rationale: "Every single bolt was custom machined with hollow heads or drilled shanks to eliminate even fractions of an ounce.",
    substrate: "Grade 5 Titanium",
    torqueSpec: "Various (8–120 Nm)",
    qty: 60,
    layers: [
      { name: "Hollow-Head Titanium Bolts", material: "Ti-6Al-4V", desc: "Center-drilled heads shaving gram-level mass across vehicle." }
    ]
  }
];

export const GOLF_R_KNOLLING_PINS: TargetCallout[] = [
  {
    id: 6001,
    num: "01",
    tier: "aero",
    name: "R-Performance Dual-Tier Roof Spoiler Foil",
    plainExplainer: "Generates targeted high-speed downforce across the rear axle while smoothing detachment vortex off the hatch.",
    weightVisual: "Light",
    positionVisual: "Rear Roof Lip",
    wearVisual: "High Endurance",
    subsystem: "Rear Aerodynamics",
    part_number: "5WA-827-901-R",
    x_percent: 72.0,
    y_percent: 17.0,
    leaderSide: "right",
    material: "Lightweight RIM Polyurethane",
    weightDelta: "High-Speed Axle Stability",
    spec: "M6 Torx T25 (9.0 Nm)",
    operationalLimit: "Zero Deflection @ 270 km/h",
    rationale: "Dual-tier design balances downforce with minimal drag penalty on the Autobahn.",
    substrate: "RIM Polyurethane",
    torqueSpec: "9.0 Nm (M6 Torx)",
    qty: 1,
    layers: [
      { name: "Aero Extension Blade", material: "Polyurethane", desc: "Smoothes air detachment over rear hatch glass." }
    ]
  },
  {
    id: 6002,
    num: "02",
    tier: "aero",
    name: "Golf R High-Flow Front Splitter & Brake Ducts",
    plainExplainer: "Directs high-stagnation front air into dedicated wheel-well scoops to cool 357mm front brakes.",
    weightVisual: "Light",
    positionVisual: "Front Bumper Skirt",
    wearVisual: "Track Consumable",
    subsystem: "Front Aero Splitter",
    part_number: "5WA-805-901-SPL",
    x_percent: 24.0,
    y_percent: 20.0,
    leaderSide: "left",
    material: "High-Impact Thermoplastic / PUR",
    weightDelta: "Front Downforce & Brake Cooling",
    spec: "M6 Torx T25 (8.5 Nm)",
    operationalLimit: "Ground Strike Compliant",
    rationale: "Directs airflow straight to brake discs, lowering friction temperatures by up to 80°C on track.",
    substrate: "Impact-Resistant Thermoplastic",
    torqueSpec: "8.5 Nm (M6 Torx)",
    qty: 1,
    layers: [
      { name: "Front Air Dam", material: "Molded Plastic", desc: "Channels turbulent air under engine belly pan." }
    ]
  },
  {
    id: 6003,
    num: "03",
    tier: "aero",
    name: "Sculpted Aerodynamic Side Sill Skirts",
    plainExplainer: "Prevents turbulent front wheel wake from entering underfloor low-pressure ground-effect zones.",
    weightVisual: "Light",
    positionVisual: "Rocker Panels",
    wearVisual: "Zero Wear",
    subsystem: "Side Profile Aero",
    part_number: "5WA-853-855-SIL",
    x_percent: 85.0,
    y_percent: 23.0,
    leaderSide: "right",
    material: "Injection Molded PP-EPDM",
    weightDelta: "Underbody Seal Efficiency",
    spec: "M5 Torx (4.5 Nm)",
    operationalLimit: "All-Weather Durability",
    rationale: "Keeps air flowing cleanly down the vehicle flanks to feed the rear diffuser.",
    substrate: "PP-EPDM Polymer",
    torqueSpec: "4.5 Nm (M5 Screws)",
    qty: 2,
    layers: [
      { name: "Flared Rocker Blade", material: "PP-EPDM", desc: "Deflects dirt and rock chips while guiding air." }
    ]
  },
  {
    id: 6004,
    num: "04",
    tier: "monocoque",
    name: "MQB Evo 1500 MPa Hot-Formed Boron Steel Unibody",
    plainExplainer: "Delivers 34,000 Nm/deg torsional stiffness so the rear torque-vectoring differential can pivot the car through hairpins.",
    weightVisual: "Balanced",
    positionVisual: "Structural BIW",
    wearVisual: "Structural Core",
    subsystem: "Platform Core",
    part_number: "5WA-500-010-MQB",
    x_percent: 50.0,
    y_percent: 39.0,
    leaderSide: "left",
    material: "1500 MPa Boron Steel & 6000-Series Aluminum",
    weightDelta: "34,000 Nm/deg Torsional Stiffness",
    spec: "M10 Subframe (70 Nm + 90°)",
    operationalLimit: "Euro NCAP 5-Star Safety",
    rationale: "Hot-stamped boron pillars provide extreme unyielding rigidity under severe chassis lateral G forces.",
    substrate: "Boron Steel & Aluminum",
    torqueSpec: "70 Nm + 90° (Subframe)",
    qty: 1,
    layers: [
      { name: "Hot-Formed B-Pillar", material: "Boron Ultra-High-Strength Steel", desc: "Toughened structural ring resisting cabin intrusion." }
    ]
  },
  {
    id: 6005,
    num: "05",
    tier: "monocoque",
    name: "Club-Sport FIA 25CrMo4 Chrome-Moly Half-Cage",
    plainExplainer: "Triangulates rear shock towers directly into C-pillars to eliminate unibody twist under heavy track curb hopping.",
    weightVisual: "Light (-14 kg rear seat delete)",
    positionVisual: "Cabin Rear Half",
    wearVisual: "Zero Wear",
    subsystem: "Chassis Bracing",
    part_number: "5WA-857-CAGE-FIA",
    x_percent: 66.0,
    y_percent: 41.0,
    leaderSide: "right",
    material: "25CrMo4 Seamless Chrome-Moly Tubing",
    weightDelta: "-14 kg with Rear Seat Delete",
    spec: "M10 Grade 10.9 (65 Nm)",
    operationalLimit: "FIA Homologated Roll Bar",
    rationale: "Directly stiffens the rear strut towers to maximize the effectiveness of the rear electronic torque vectoring differential.",
    substrate: "25CrMo4 Steel",
    torqueSpec: "65 Nm (M10 Bolts)",
    qty: 1,
    layers: [
      { name: "Diagonal Strut Crossbar", material: "Chrome-Moly Tubing", desc: "Diagonal brace locking rear shock towers into chassis floor." }
    ]
  },
  {
    id: 6006,
    num: "06",
    tier: "powertrain",
    name: "2.0L TSI EA888 Gen 4 Continental Turbo Engine",
    plainExplainer: "Boosts 320 horsepower with high-pressure 350-bar direct injection and cast-iron block durability.",
    weightVisual: "Moderate (145 kg)",
    positionVisual: "Transverse Front Bay",
    wearVisual: "High Endurance",
    subsystem: "Turbocharged Engine",
    part_number: "5WA-100-EA888-G4",
    x_percent: 48.0,
    y_percent: 58.0,
    leaderSide: "right",
    material: "Grey Cast Iron Block & Forged Crankshaft",
    weightDelta: "320 PS / 420 Nm @ 2,100 RPM",
    spec: "M10 Engine Mounts (60 Nm)",
    operationalLimit: "6,800 RPM Redline / 1.8 Bar Boost",
    rationale: "Cast-iron cylinder block provides massive fatigue resistance under high continuous turbo boost pressures.",
    substrate: "GJL-250 Grey Cast Iron",
    torqueSpec: "60 Nm (Engine Mounts)",
    qty: 1,
    layers: [
      { name: "Continental Turbocharger", material: "Twin-Scroll Inconel Turbine", desc: "Delivers 1.8 bar of boost with minimal spool lag." }
    ]
  },
  {
    id: 6007,
    num: "07",
    tier: "powertrain",
    name: "7-Speed DSG & R-Performance Torque Vectoring Axle",
    plainExplainer: "Distributes up to 100% of rear drive torque to the outside wheel in Drift Mode to eliminate understeer.",
    weightVisual: "Moderate (88 kg)",
    positionVisual: "Front Transverse / Rear Axle",
    wearVisual: "High Endurance",
    subsystem: "Transmission & AWD",
    part_number: "5WA-300-DQ381",
    x_percent: 68.0,
    y_percent: 57.0,
    leaderSide: "right",
    material: "Dual Clutch Transaxle & Twin Multi-Plate Rear Differential",
    weightDelta: "Dynamic Torque Vectoring",
    spec: "M10 Bellhousing Bolts (40 Nm)",
    operationalLimit: "Twin Electronically Controlled Clutches",
    rationale: "Twin multi-plate clutches on the rear differential allow independent left/right rear wheel torque distribution.",
    substrate: "Aluminum / Steel",
    torqueSpec: "40 Nm (Bellhousing)",
    qty: 1,
    layers: [
      { name: "Twin Multi-Plate Clutches", material: "Carbon Wet Friction", desc: "Clutches actively vector drive torque to rear wheels." }
    ]
  },
  {
    id: 6008,
    num: "08",
    tier: "powertrain",
    name: "Akrapovič Titanium Lightweight Quad-Exit Exhaust",
    plainExplainer: "Shaves 7 kg off the rear overhang while delivering crisp quad-pipe pops during upshifts.",
    weightVisual: "Ultra-Light (-7 kg)",
    positionVisual: "Rear Diffuser Center",
    wearVisual: "High Heat Resistant",
    subsystem: "Exhaust Circuit",
    part_number: "5WA-251-AKRAP",
    x_percent: 29.0,
    y_percent: 70.0,
    leaderSide: "left",
    material: "Grade 2 Titanium & Carbon Fiber Tips",
    weightDelta: "-7.0 kg vs Standard Steel",
    spec: "M8 Exhaust Clamps (25 Nm)",
    operationalLimit: "Active Exhaust Flaps",
    rationale: "Electronic exhaust flap system reduces backpressure at full throttle for enhanced turbo breathing.",
    substrate: "Titanium & Carbon",
    torqueSpec: "25 Nm (Clamps)",
    qty: 1,
    layers: [
      { name: "Titanium Silencer Cannister", material: "0.8mm Titanium", desc: "Lightweight resonance chamber producing signature exhaust pops." }
    ]
  },
  {
    id: 6009,
    num: "09",
    tier: "brakes_gear",
    name: "357mm R-Performance Cross-Drilled Front Brake Discs",
    plainExplainer: "Cast iron friction ring with aluminum hat saves 600 grams per corner while venting brake pad gas through drillings.",
    weightVisual: "Light (-1.2 kg per axle)",
    positionVisual: "Front Wheel Hub",
    wearVisual: "High Endurance",
    subsystem: "Brake Rotors",
    part_number: "5WA-615-301-R357",
    x_percent: 12.0,
    y_percent: 75.0,
    leaderSide: "left",
    material: "Cast Iron Friction Ring & Aluminum Bell",
    weightDelta: "-600 g Unsprung Weight per Corner",
    spec: "M14 Lug Bolts (140 Nm)",
    operationalLimit: "Cross-Drilled Pin-Drive Float",
    rationale: "Floating aluminum bell accommodates radial thermal rotor expansion without warping under track usage.",
    substrate: "Cast Iron & Aluminum",
    torqueSpec: "140 Nm (Wheel Bolts)",
    qty: 2,
    layers: [
      { name: "Drilled Friction Ring", material: "High-Carbon Iron", desc: "Cross-drilled holes scrape pad glaze and vent outgas." }
    ]
  },
  {
    id: 6010,
    num: "10",
    tier: "brakes_gear",
    name: "2-Piston Floating Aluminum Front Brake Calipers",
    plainExplainer: "Clamps high-friction semi-metallic track pads with stiff bridge castings to stop from 250 km/h repeatedly.",
    weightVisual: "Moderate",
    positionVisual: "Front Axle Knuckle",
    wearVisual: "High Endurance",
    subsystem: "Front Calipers",
    part_number: "5WA-615-105-CAL",
    x_percent: 16.0,
    y_percent: 82.0,
    leaderSide: "left",
    material: "Cast Aluminum (Gloss Blue Finish with R Logo)",
    weightDelta: "High-Clamping Hydraulic Line Pressure",
    spec: "M12 Carrier Bolts (120 Nm)",
    operationalLimit: "160 Bar Line Pressure",
    rationale: "Stiff caliper carrier bridge ensures firm, progressive pedal response without sponginess.",
    substrate: "Cast Aluminum",
    torqueSpec: "120 Nm (Carrier Bolts)",
    qty: 2,
    layers: [
      { name: "Dual-Piston Housing", material: "Cast Aluminum", desc: "Evenly distributes clamping pressure across brake pads." }
    ]
  },
  {
    id: 6011,
    num: "11",
    tier: "brakes_gear",
    name: "DCC Adaptive Dynamic Chassis Control Damper Struts",
    plainExplainer: "Electromagnetic valves adjust compression and rebound damping 200 times per second for instant curb compliance.",
    weightVisual: "Light",
    positionVisual: "Front MacPherson Strut",
    wearVisual: "Moderate",
    subsystem: "Electronic Damper System",
    part_number: "5WA-412-021-DCC",
    x_percent: 33.0,
    y_percent: 79.0,
    leaderSide: "left",
    material: "Hard-Chromed Micro-Alloy Steel & Coil Springs",
    weightDelta: "Millisecond Variable Damping",
    spec: "M14 Strut Pinch Bolt (70 Nm + 90°)",
    operationalLimit: "200 Hz Valving Response Time",
    rationale: "Electromagnetic proportional valves tailor damping continuously to eliminate body dive and roll in Race mode.",
    substrate: "Micro-Alloy Steel",
    torqueSpec: "70 Nm + 90° (Pinch Bolt)",
    qty: 2,
    layers: [
      { name: "Proportional Solenoid Valve", material: "Magnetic Actuator", desc: "Regulates internal oil bypass flow within milliseconds." }
    ]
  },
  {
    id: 6012,
    num: "12",
    tier: "hardware",
    name: "Micro-Alloyed Torx T25/T30 & Subframe Stretch Bolt Grid",
    plainExplainer: "High-grade OEM hardware ensuring zero subframe shifting under violent launch control starts.",
    weightVisual: "Ultra-Light",
    positionVisual: "Subframe Mounting Points",
    wearVisual: "Single-Use Stretch",
    subsystem: "Hardware Fasteners",
    part_number: "5WA-007-FAST-GRID",
    x_percent: 75.0,
    y_percent: 92.0,
    leaderSide: "right",
    material: "Grade 10.9 Micro-Alloyed Steel",
    weightDelta: "Torque-to-Yield Calibration",
    spec: "M6–M14 Fasteners (9–140 Nm)",
    operationalLimit: "High Fatigue Strength",
    rationale: "Torque-to-yield bolts provide consistent clamping force across the aluminum front subframe.",
    substrate: "Dacromet Steel",
    torqueSpec: "Various (9–140 Nm)",
    qty: 48,
    layers: [
      { name: "Stretch Subframe Bolt", material: "Grade 10.9 Steel", desc: "Elongates plastically to maintain high clamping force." }
    ]
  }
];

export const FERRARI_F40_KNOLLING_PINS: TargetCallout[] = [
  {
    id: 7001,
    num: "01",
    tier: "aero",
    name: "Fixed Composite Rear Aerofoil with Integrated Gurney Flap",
    plainExplainer: "Provides essential high-speed aerodynamic downforce at the F40's 324 km/h (201 mph) top speed.",
    weightVisual: "Ultra-Light (-8 kg)",
    positionVisual: "Rear Clamshell Tail",
    wearVisual: "High Endurance",
    subsystem: "Rear Aerofoil",
    part_number: "120A-827-WING",
    x_percent: 73.0,
    y_percent: 17.0,
    leaderSide: "right",
    material: "Carbon-Nomex Sandwich Composite",
    weightDelta: "-8.0 kg vs Steel/Aluminum",
    spec: "M8 Stainless Hex (28 Nm)",
    operationalLimit: "Zero Deflection @ 324 km/h",
    rationale: "Massive rear wing stabilizes the high-speed rear axle balance of the 1,100 kg dry weight supercar.",
    substrate: "Carbon-Nomex Composite",
    torqueSpec: "28 Nm (M8 Stainless)",
    qty: 1,
    layers: [
      { name: "Wing Mainplane", material: "Carbon Fiber", desc: "Hollow composite aerofoil structure." }
    ]
  },
  {
    id: 7002,
    num: "02",
    tier: "aero",
    name: "Full Carbon-Kevlar Front Clamshell Section",
    plainExplainer: "Single-piece forward-tilting clamshell allowing instant trackside inspection of front oil coolers and master cylinders.",
    weightVisual: "Ultra-Light (12 kg)",
    positionVisual: "Front Bodywork",
    wearVisual: "Zero Wear",
    subsystem: "Front Clamshell",
    part_number: "120A-805-HOOD",
    x_percent: 25.0,
    y_percent: 19.0,
    leaderSide: "left",
    material: "Autoclave Molded Carbon-Aramid",
    weightDelta: "12 kg Total Mass for Entire Clamshell",
    spec: "Quarter-Turn Dzus Fasteners",
    operationalLimit: "Rapid Paddock Removal",
    rationale: "Lightweight single-piece composite skin eliminates seams and latches, saving substantial curb weight.",
    substrate: "Carbon-Aramid Kevlar",
    torqueSpec: "Dzus Quarter-Turn",
    qty: 1,
    layers: [
      { name: "Green Resin Aramid Shell", material: "Kevlar Weave", desc: "Translucent woven Kevlar fibers visible through thin red paint." }
    ]
  },
  {
    id: 7003,
    num: "03",
    tier: "aero",
    name: "Submerged NACA Boundary-Layer Intercooler Ducts",
    plainExplainer: "Draws high-velocity cooling air directly into the twin Behr intercoolers without boundary-layer flow separation.",
    weightVisual: "Ultra-Light",
    positionVisual: "Rear Quarter Panels",
    wearVisual: "Zero Wear",
    subsystem: "Intercooler Ducts",
    part_number: "120A-853-NACA",
    x_percent: 85.0,
    y_percent: 22.0,
    leaderSide: "right",
    material: "Pre-Preg Carbon-Kevlar",
    weightDelta: "Zero Drag Air Induction",
    spec: "Bonded Epoxy Joint",
    operationalLimit: "Laminar Flow Intake",
    rationale: "NACA ducts introduce air into the engine bay with zero added aerodynamic form drag.",
    substrate: "Carbon-Kevlar",
    torqueSpec: "Bonded Joint",
    qty: 2,
    layers: [
      { name: "Recessed Scoop Wall", material: "Kevlar", desc: "Draws cool boundary layer air into intercooler shrouds." }
    ]
  },
  {
    id: 7004,
    num: "04",
    tier: "monocoque",
    name: "Tubular Steel Trellis Spaceframe with Bonded Kevlar Tubs",
    plainExplainer: "Tubular trellis spaceframe stiffened with structural Araldite-bonded Kevlar tubs, producing an uncompromising 1,100 kg dry weight.",
    weightVisual: "Ultra-Light (85 kg)",
    positionVisual: "Chassis Trellis",
    wearVisual: "Structural Core",
    subsystem: "Spaceframe Chassis",
    part_number: "120A-CHASSIS-TUB",
    x_percent: 50.0,
    y_percent: 38.0,
    leaderSide: "left",
    material: "25CrMo4 Steel Trusses & Bonded Kevlar",
    weightDelta: "1,100 kg Total Dry Weight",
    spec: "M10 Grade 10.9 (65 Nm)",
    operationalLimit: "Torsional Race Rigidity",
    rationale: "Combines the crashworthiness of steel tubing with the lightweight shear stiffness of composite Kevlar panels.",
    substrate: "25CrMo4 Steel & Kevlar",
    torqueSpec: "65 Nm (M10)",
    qty: 1,
    layers: [
      { name: "Tubular Steel Truss", material: "25CrMo4 Steel", desc: "Triangulated chassis rails supporting mid-mounted V8." }
    ]
  },
  {
    id: 7005,
    num: "05",
    tier: "monocoque",
    name: "Cockpit Survival Trellis & Tubular Side-Impact Bars",
    plainExplainer: "Exposed tubular spaceframe running through the green-glue resin cockpit perimeter with pure racecar minimalism.",
    weightVisual: "Light",
    positionVisual: "Cockpit Perimeter",
    wearVisual: "Zero Wear",
    subsystem: "Cabin Framework",
    part_number: "120A-500-CAGE",
    x_percent: 67.0,
    y_percent: 41.0,
    leaderSide: "right",
    material: "Seamless 25CrMo4 Steel Tubing",
    weightDelta: "Unadorned Race Architecture",
    spec: "TIG-Welded Nodes",
    operationalLimit: "Side-Impact Protection",
    rationale: "Completely exposed structural tubing forms the door sills with zero carpeting or soundproofing.",
    substrate: "25CrMo4 Seamless Steel",
    torqueSpec: "TIG-Welded Joint",
    qty: 1,
    layers: [
      { name: "Side-Impact Tube", material: "High-Tensile Steel", desc: "Protects driver against side collisions." }
    ]
  },
  {
    id: 7006,
    num: "06",
    tier: "powertrain",
    name: "Tipo F120A 2.9L Twin-Turbocharged 90° V8 Engine",
    plainExplainer: "Unleashes 478 raw horsepower via twin water-cooled IHI turbochargers producing dramatic, violent boost onset.",
    weightVisual: "Light (160 kg)",
    positionVisual: "Longitudinal Mid-Bay",
    wearVisual: "High Endurance",
    subsystem: "Twin-Turbo V8 Engine",
    part_number: "120A-V8-TIPO",
    x_percent: 48.0,
    y_percent: 58.0,
    leaderSide: "right",
    material: "Silumin Aluminum Block & Mahle Forged Pistons",
    weightDelta: "478 PS / 577 Nm @ 1.1 Bar Boost",
    spec: "M10 Motor Mounts (70 Nm)",
    operationalLimit: "7,750 RPM Peak Redline",
    rationale: "Twin IHI water-cooled turbochargers feed individual cylinder banks to produce legendary boost aggression.",
    substrate: "Silumin Aluminum Alloy",
    torqueSpec: "70 Nm (Engine Mounts)",
    qty: 1,
    layers: [
      { name: "Mahle Ceramic Crown Pistons", material: "Forged Alloy & Ceramic", desc: "Ceramic thermal barrier resisting 1.1 bar turbo boost heat." }
    ]
  },
  {
    id: 7007,
    num: "07",
    tier: "powertrain",
    name: "5-Speed Gated Manual Transaxle with Dog-Ring Engagement",
    plainExplainer: "Exposed metal gate manual transmission shifting straight-cut cogs behind the driver with razor-sharp mechanical clack.",
    weightVisual: "Light (72 kg)",
    positionVisual: "Rear Transaxle",
    wearVisual: "High Endurance",
    subsystem: "Manual Transaxle",
    part_number: "120A-300-TRANS",
    x_percent: 69.0,
    y_percent: 57.0,
    leaderSide: "right",
    material: "Magnesium Casing & Hardened Chrome-Moly Gears",
    weightDelta: "72 kg Casing Weight",
    spec: "M10 Magnesium Casing Bolts (35 Nm)",
    operationalLimit: "Heavy-Duty Dual-Plate Clutch",
    rationale: "Mounted longitudinally behind the rear axle for optimal weight balance and direct gearshift linkage.",
    substrate: "Magnesium Alloy",
    torqueSpec: "35 Nm (Casing Bolts)",
    qty: 1,
    layers: [
      { name: "Gated Shifter Tower", material: "Polished Billet Steel", desc: "Classic open-gate shift pattern with reverse lockout." }
    ]
  },
  {
    id: 7008,
    num: "08",
    tier: "powertrain",
    name: "Twin Behr Aluminum Top-Mount Charge-Air Intercoolers",
    plainExplainer: "Cools pressurized boost air from 140°C down to 45°C before entering the magnesium intake plenum.",
    weightVisual: "Ultra-Light",
    positionVisual: "Above Cylinder Heads",
    wearVisual: "High Heat Resistant",
    subsystem: "Charge Air Cooling",
    part_number: "120A-BEHR-COOL",
    x_percent: 30.0,
    y_percent: 68.0,
    leaderSide: "left",
    material: "Brazed Aluminum Tube & Fin Core",
    weightDelta: "-95°C Charge Air Temp Delta",
    spec: "M6 Mounting Studs (10 Nm)",
    operationalLimit: "High Heat Dissipation",
    rationale: "Top-mounted directly beneath the louvered rear Lexan window for efficient heat extraction.",
    substrate: "Brazed Aluminum",
    torqueSpec: "10 Nm (Mounts)",
    qty: 2,
    layers: [
      { name: "Intercooler Fin Core", material: "Aluminum Alloy", desc: "Dense cooling fins withstanding continuous turbo heat." }
    ]
  },
  {
    id: 7009,
    num: "09",
    tier: "brakes_gear",
    name: "Brembo 4-Piston Calipers with Aluminum Pistons",
    plainExplainer: "Race-derived fixed calipers clamping cross-drilled rotors with zero brake servo assist for pure driver threshold modulation.",
    weightVisual: "Light",
    positionVisual: "Front & Rear Hubs",
    wearVisual: "High Endurance",
    subsystem: "Braking Calipers",
    part_number: "120A-BREMBO-F40",
    x_percent: 11.5,
    y_percent: 75.0,
    leaderSide: "left",
    material: "High-Rigidity Cast Aluminum",
    weightDelta: "Unassisted Manual Hydraulic Line",
    spec: "M12 Caliper Mounts (105 Nm)",
    operationalLimit: "160 Bar Line Pressure",
    rationale: "Unassisted master cylinder demands strong pedal pressure, giving the driver complete control over wheel lockup.",
    substrate: "Cast Aluminum",
    torqueSpec: "105 Nm (Mounts)",
    qty: 4,
    layers: [
      { name: "Caliper Piston Seal", material: "High-Temp Viton", desc: "Withstands severe track brake fluid temperatures." }
    ]
  },
  {
    id: 7010,
    num: "10",
    tier: "brakes_gear",
    name: "330mm Cross-Drilled Ventilated Motorsport Rotors",
    plainExplainer: "Cross-drilled heat-treated iron discs shedding friction dust and high heat under violent deceleration.",
    weightVisual: "Moderate",
    positionVisual: "Wheel Hubs",
    wearVisual: "High Endurance",
    subsystem: "Brake Rotors",
    part_number: "120A-ROTORS-330",
    x_percent: 15.5,
    y_percent: 83.0,
    leaderSide: "left",
    material: "High-Carbon Heat-Treated Iron Disc & Billet Hat",
    weightDelta: "Cross-Drilled Heat Dissipation",
    spec: "M14 Center Lug Pin (550 Nm)",
    operationalLimit: "750°C Fade Resistance",
    rationale: "Radial drill patterns prevent pad glazing during continuous 300+ km/h threshold braking cycles.",
    substrate: "Heat-Treated High-Carbon Iron",
    torqueSpec: "550 Nm (Center Nut)",
    qty: 4,
    layers: [
      { name: "Ventilated Friction Ring", material: "High-Carbon Iron", desc: "Internal vents circulating cooling air." }
    ]
  },
  {
    id: 7011,
    num: "11",
    tier: "brakes_gear",
    name: "Koni Twin-Tube Motorsport Shock Absorbers with Coil Springs",
    plainExplainer: "Adjustable race dampers mounted to unequal-length tubular wishbones for razor-sharp steering turn-in.",
    weightVisual: "Light",
    positionVisual: "Suspension Wishbones",
    wearVisual: "Moderate",
    subsystem: "Suspension Shocks",
    part_number: "120A-KONI-SHOCK",
    x_percent: 33.0,
    y_percent: 79.0,
    leaderSide: "left",
    material: "Tempered Steel & Anodized Aluminum / Coil Springs",
    weightDelta: "Unequal-Length Wishbones",
    spec: "M12 Wishbone Pivot (78 Nm)",
    operationalLimit: "Adjustable Rebound Valving",
    rationale: "Classic Koni race valving tuned specifically for mechanical grip on high-speed track surfaces.",
    substrate: "Tempered Steel & Aluminum",
    torqueSpec: "78 Nm (Wishbone Pivot)",
    qty: 4,
    layers: [
      { name: "Koni Shock Cartridge", material: "Chromed Steel", desc: "Twin-tube damping chamber regulating spring rebound." }
    ]
  },
  {
    id: 7012,
    num: "12",
    tier: "hardware",
    name: "Quick-Release Quarter-Turn Dzus Race Fasteners",
    plainExplainer: "Allows mechanics to unlock and lift off the entire rear body clamshell in under fifteen seconds in the paddock.",
    weightVisual: "Ultra-Light",
    positionVisual: "Clamshell Perimeter",
    wearVisual: "High Endurance",
    subsystem: "Body Fasteners",
    part_number: "120A-DZUS-FAST",
    x_percent: 74.0,
    y_percent: 92.0,
    leaderSide: "right",
    material: "Zinc-Plated Spring Steel & Billet Pins",
    weightDelta: "Quarter-Turn Quick Release",
    spec: "Quarter-Turn Dzus Cam Lock",
    operationalLimit: "Rapid Paddock Servicing",
    rationale: "Enables instant trackside removal of both the front and rear clamshells without power tools.",
    substrate: "Spring Steel & Zinc",
    torqueSpec: "Quarter-Turn Lock",
    qty: 32,
    layers: [
      { name: "Cam-Lock Spring Wire", material: "Spring Steel", desc: "Locks slotted stud firmly against vibration." }
    ]
  }
];

export const SKYLINE_R34_KNOLLING_PINS: TargetCallout[] = [
  {
    id: 8001,
    num: "01",
    tier: "aero",
    name: "V-Spec II 4-Way Adjustable High Rear Aerofoil",
    plainExplainer: "Features a 4-position manual tilt angle adjustment to balance rear downforce with straightaway speed at Fuji Speedway.",
    weightVisual: "Light",
    positionVisual: "Rear Trunk Deck",
    wearVisual: "High Endurance",
    subsystem: "Rear Aerodynamics",
    part_number: "NIS-R34-827-WING",
    x_percent: 73.0,
    y_percent: 17.0,
    leaderSide: "right",
    material: "Extruded Aluminum Pylons & Carbon Blade",
    weightDelta: "4-Stage Angle of Attack",
    spec: "M8 Hex Bolts (35 Nm)",
    operationalLimit: "Zero Deflection @ 266 km/h",
    rationale: "Allows track engineers to quickly dial in rear downforce for high-speed circuits or technical layouts.",
    substrate: "Carbon Fiber & Aluminum",
    torqueSpec: "35 Nm (M8 Hex)",
    qty: 1,
    layers: [
      { name: "Adjustable Carbon Blade", material: "Carbon Fiber", desc: "4 manual angle of attack positions." }
    ]
  },
  {
    id: 8002,
    num: "02",
    tier: "aero",
    name: "V-Spec II OEM Autoclaved Dry-Carbon Underbody Diffuser",
    plainExplainer: "Speeds up underfloor air exiting the rear bumper to create true ground-effect suction, gluing the rear tires down.",
    weightVisual: "Ultra-Light (-5 kg)",
    positionVisual: "Rear Floor Pan",
    wearVisual: "High Endurance",
    subsystem: "Ground Effect Diffuser",
    part_number: "NIS-R34-748A0-DIFF",
    x_percent: 25.0,
    y_percent: 20.0,
    leaderSide: "left",
    material: "Autoclaved Pre-Preg Dry Carbon Fiber",
    weightDelta: "-5.0 kg vs Wet Layup",
    spec: "M6 Titanium Fasteners (8.0 Nm)",
    operationalLimit: "Ground-Effect Aerodynamics",
    rationale: "Factory OEM autoclave carbon tunnel creates low-pressure zone under the rear differential for high-speed stability.",
    substrate: "Dry Pre-Preg Carbon",
    torqueSpec: "8.0 Nm (M6 Ti)",
    qty: 1,
    layers: [
      { name: "Diffuser Tunnel Core", material: "Pre-Preg Carbon", desc: "Aerodynamic underbody tray accelerating airflow." }
    ]
  },
  {
    id: 8003,
    num: "03",
    tier: "aero",
    name: "Front Bumper Fascia with Twin Intercooler Air Dams",
    plainExplainer: "Massive front intake feeding front-mount intercooler, radiator, and dedicated oil cooler ducting.",
    weightVisual: "Light",
    positionVisual: "Front Fascia",
    wearVisual: "Zero Wear",
    subsystem: "Front Air Induction",
    part_number: "NIS-R34-FASCIA-AIR",
    x_percent: 85.0,
    y_percent: 22.0,
    leaderSide: "right",
    material: "High-Impact RIM Urethane",
    weightDelta: "High-Flow Charge Air Intake",
    spec: "M6 Fasteners (6.5 Nm)",
    operationalLimit: "High-Speed Cooling",
    rationale: "Channels high stagnation pressure air straight into the massive front-mount tube-and-fin intercooler.",
    substrate: "RIM Urethane",
    torqueSpec: "6.5 Nm (M6)",
    qty: 1,
    layers: [
      { name: "Lower Bumper Lip", material: "RIM Urethane", desc: "Durable lower lip withstanding curbs and road debris." }
    ]
  },
  {
    id: 8004,
    num: "04",
    tier: "monocoque",
    name: "High-Rigidity V-Spec II Galvanized Steel Unibody with Seam Welds",
    plainExplainer: "Factory reinforced unibody platform with seam-welded shock towers and carbon transmission floor tunnel.",
    weightVisual: "Balanced",
    positionVisual: "Platform Core",
    wearVisual: "Structural Core",
    subsystem: "Unibody BIW",
    part_number: "NIS-R34-500-VSPEC",
    x_percent: 50.0,
    y_percent: 39.0,
    leaderSide: "left",
    material: "Galvanized Steel & Carbon Floor Tunnel",
    weightDelta: "+56% Torsional Rigidity vs R33",
    spec: "Seam-Welded / M10 Braces (68 Nm)",
    operationalLimit: "ATTESA AWD G-Force Load",
    rationale: "High-rigidity chassis handles violent AWD launch loads and lateral transitions without unibody shudder.",
    substrate: "Galvanized Steel / Carbon",
    torqueSpec: "68 Nm (Braces)",
    qty: 1,
    layers: [
      { name: "Seam-Welded Turret", material: "High-Strength Steel", desc: "Additional factory spot welds stiffening front towers." }
    ]
  },
  {
    id: 8005,
    num: "05",
    tier: "monocoque",
    name: "Billet Aluminum 6061-T6 Front Strut Tower Bracing Bar",
    plainExplainer: "Eliminates chassis flex across front shock towers during high-G corner entry with ATTESA AWD torque vectoring.",
    weightVisual: "Light (-1.8 kg)",
    positionVisual: "Engine Bay Tower Bridge",
    wearVisual: "Zero Wear",
    subsystem: "Chassis Bracing",
    part_number: "NIS-R34-TOWER-BRACE",
    x_percent: 66.0,
    y_percent: 41.0,
    leaderSide: "right",
    material: "Forged Billet Aluminum 6061-T6",
    weightDelta: "-1.8 kg vs Steel Bar",
    spec: "M10 Flanged Nuts (55 Nm)",
    operationalLimit: "Zero Deflection Bracing",
    rationale: "Locks the front strut towers together to prevent dynamic camber distortion when the front wheels pull under boost.",
    substrate: "Forged 6061-T6 Aluminum",
    torqueSpec: "55 Nm (Flanged Nuts)",
    qty: 1,
    layers: [
      { name: "Oval Aluminum Crossbar", material: "Extruded Aluminum", desc: "Rigid bar dissipating lateral shock tower compression." }
    ]
  },
  {
    id: 8006,
    num: "06",
    tier: "powertrain",
    name: "2.6L Twin-Turbo RB26DETT Cast-Iron Inline-6 Engine",
    plainExplainer: "Group A homologated bulletproof cast-iron block with individual throttle bodies revving cleanly to 8,000 RPM.",
    weightVisual: "Heavy (205 kg)",
    positionVisual: "Front Longitudinal Bay",
    wearVisual: "High Endurance",
    subsystem: "Twin-Turbo Inline-6",
    part_number: "NIS-R34-RB26DETT",
    x_percent: 48.0,
    y_percent: 58.0,
    leaderSide: "right",
    material: "Cast-Iron Cylinder Block & 6 Individual Throttle Bodies",
    weightDelta: "280+ PS / 392 Nm @ 8,000 RPM",
    spec: "M10 Engine Mounts (75 Nm)",
    operationalLimit: "8,000 RPM Continuous Redline",
    rationale: "Cast-iron block engineered for legendary reliability under 8,000+ RPM Group A homologation racing duty.",
    substrate: "Cast Iron / Aluminum Head",
    torqueSpec: "75 Nm (Mounts)",
    qty: 1,
    layers: [
      { name: "6 Individual Throttle Bodies", material: "Billet Aluminum", desc: "Direct intake response at each cylinder port." }
    ]
  },
  {
    id: 8007,
    num: "07",
    tier: "powertrain",
    name: "Getrag 6-Speed Close-Ratio Manual Transmission",
    plainExplainer: "Bulletproof 6-speed manual handling brutal AWD clutch dumps and transferring torque to front and rear driveshafts.",
    weightVisual: "Moderate (62 kg)",
    positionVisual: "Drivetrain Tunnel",
    wearVisual: "High Endurance",
    subsystem: "Transmission & Driveline",
    part_number: "NIS-R34-GETRAG-6",
    x_percent: 68.0,
    y_percent: 57.0,
    leaderSide: "right",
    material: "Die-Cast Aluminum Casing & Triple-Cone Synchros",
    weightDelta: "Heavy-Duty Close-Ratio Gearsets",
    spec: "M10 Bellhousing Bolts (45 Nm)",
    operationalLimit: "600+ Nm Torque Handling",
    rationale: "Getrag 233 6-speed manual transmission with close gear ratios keeps the RB26 in its peak boost powerband.",
    substrate: "Die-Cast Aluminum",
    torqueSpec: "45 Nm (Bellhousing)",
    qty: 1,
    layers: [
      { name: "Triple-Cone Synchronizers", material: "High-Carbon Steel", desc: "Smooth high-RPM gear shifts without grinding." }
    ]
  },
  {
    id: 8008,
    num: "08",
    tier: "powertrain",
    name: "ATTESA E-TS Pro Active Limited-Slip Rear Differential",
    plainExplainer: "Hydraulically locks both rear wheels together in milliseconds to eliminate inside wheel wheelspin on corner exits.",
    weightVisual: "Moderate (38 kg)",
    positionVisual: "Rear Axle Cradle",
    wearVisual: "High Endurance",
    subsystem: "Active AWD Differential",
    part_number: "NIS-R34-ATTESA-DIFF",
    x_percent: 29.0,
    y_percent: 71.0,
    leaderSide: "left",
    material: "Cast Iron Housing & Electronically Controlled Multi-Plate Clutch",
    weightDelta: "Active Torque Vectoring",
    spec: "M12 Subframe Bolts (85 Nm)",
    operationalLimit: "Millisecond Hydraulic Pressure",
    rationale: "Monitors 16-bit G-sensors and wheel speeds to lock rear differential and apportion drive torque to the front wheels.",
    substrate: "Cast Iron & Steel",
    torqueSpec: "85 Nm (Subframe)",
    qty: 1,
    layers: [
      { name: "Electronic Clutch Pack", material: "Multi-Plate Steel", desc: "Clamps to vector torque between rear wheels." }
    ]
  },
  {
    id: 8009,
    num: "09",
    tier: "brakes_gear",
    name: "Brembo 4-Piston Gold Monobloc Caliper Assembly",
    plainExplainer: "Iconic gold Brembo calipers clamping high-friction compound pads for fade-free stops lap after lap.",
    weightVisual: "Light",
    positionVisual: "Front Hub Upright",
    wearVisual: "High Endurance",
    subsystem: "Braking Calipers",
    part_number: "NIS-R34-BREMBO-GOLD",
    x_percent: 11.5,
    y_percent: 75.0,
    leaderSide: "left",
    material: "Forged Monobloc Aluminum (Gold Finish)",
    weightDelta: "4-Piston Staggered Bore",
    spec: "M14 Caliper Bolts (125 Nm)",
    operationalLimit: "160 Bar Line Pressure",
    rationale: "Staggered piston diameters ensure even pad wear and predictable pedal bite on technical racetracks.",
    substrate: "Forged Aluminum",
    torqueSpec: "125 Nm (Caliper Bolts)",
    qty: 2,
    layers: [
      { name: "Gold Monobloc Body", material: "Forged Aluminum", desc: "High bridge stiffness preventing deflection under load." }
    ]
  },
  {
    id: 8010,
    num: "10",
    tier: "brakes_gear",
    name: "324mm Brembo Slotted Ventilated Front Brake Discs",
    plainExplainer: "High-carbon heat-treated iron discs with curved directional vanes pumping cooling air through the rotor core.",
    weightVisual: "Moderate",
    positionVisual: "Wheel Hub",
    wearVisual: "High Endurance",
    subsystem: "Brake Rotors",
    part_number: "NIS-R34-BREMBO-DISC",
    x_percent: 15.5,
    y_percent: 83.0,
    leaderSide: "left",
    material: "High-Carbon Heat-Treated Iron",
    weightDelta: "Slotted Surface Cleaning",
    spec: "M12x1.25 Lug Nuts (110 Nm)",
    operationalLimit: "700°C Thermal Durability",
    rationale: "Curved directional cooling vanes pump cooling air from the center of the hub outward through the rotor disc.",
    substrate: "High-Carbon Iron",
    torqueSpec: "110 Nm (Wheel Nuts)",
    qty: 2,
    layers: [
      { name: "Directional Vanes", material: "Cast Iron", desc: "Spiraled internal cooling channels." }
    ]
  },
  {
    id: 8011,
    num: "11",
    tier: "brakes_gear",
    name: "Nismo S-Tune Inverted Monotube Coilover Assembly",
    plainExplainer: "Inverted damper design provides immense lateral stiffness to resist camber deflection under ATTESA AWD cornering.",
    weightVisual: "Light",
    positionVisual: "Multi-Link Suspension",
    wearVisual: "Moderate",
    subsystem: "Suspension Coilovers",
    part_number: "NIS-R34-NISMO-COIL",
    x_percent: 33.0,
    y_percent: 79.0,
    leaderSide: "left",
    material: "Inverted Steel Strut Body & Si-Cr Springs",
    weightDelta: "-15mm Track Ride Height",
    spec: "M12 Strut Top (65 Nm)",
    operationalLimit: "Inverted Monotube Design",
    rationale: "Inverted monotube design moves the thicker damper cartridge to the top, resisting massive lateral suspension loads.",
    substrate: "Hardened Steel / Si-Cr",
    torqueSpec: "65 Nm (Top Mount)",
    qty: 2,
    layers: [
      { name: "Inverted Piston Rod", material: "Chromed Hardened Steel", desc: "Thick inverted shaft resisting bending loads under AWD grip." }
    ]
  },
  {
    id: 8012,
    num: "12",
    tier: "hardware",
    name: "Grade 10.9 Zinc-Coated High-Torque Fastener Grid",
    plainExplainer: "Ensures critical AWD transfer case and multi-link suspension arms stay torqued under violent AWD launches.",
    weightVisual: "Ultra-Light",
    positionVisual: "Suspension Subframe",
    wearVisual: "High Endurance",
    subsystem: "Hardware Fasteners",
    part_number: "NIS-R34-FAST-GRID",
    x_percent: 74.0,
    y_percent: 92.0,
    leaderSide: "right",
    material: "Grade 10.9 Zinc-Yellow Steel",
    weightDelta: "Torque Retention under AWD Launches",
    spec: "M6–M14 Fasteners (12–145 Nm)",
    operationalLimit: "High-Tensile Strength",
    rationale: "Withstands repetitive violent launch control shock loadings without thread deformation or fatigue shear.",
    substrate: "Grade 10.9 Zinc Steel",
    torqueSpec: "Various (12–145 Nm)",
    qty: 54,
    layers: [
      { name: "Zinc-Chromate Plating", material: "Protective Zinc Barrier", desc: "Corrosion resistance under harsh track conditions." }
    ]
  }
];

export function getHomologatedVehicleKnollingPins(
  carKey: string,
  tierFilter?: "all" | AssemblyTier | string
): TargetCallout[] {
  let pins: TargetCallout[] = PORSCHE_KNOLLING_PINS;
  const key = (carKey || "").toLowerCase();

  if (key.includes("bmw") || key.includes("m4") || key.includes("csl") || key.includes("g82")) {
    pins = BMW_M4_CSL_KNOLLING_PINS;
  } else if (key.includes("mclaren") || key.includes("f1") || key.includes("xp5")) {
    pins = MCLAREN_F1_KNOLLING_PINS;
  } else if (key.includes("golf") || key.includes("vw") || key.includes("volkswagen")) {
    pins = GOLF_R_KNOLLING_PINS;
  } else if (key.includes("ferrari") || key.includes("f40")) {
    pins = FERRARI_F40_KNOLLING_PINS;
  } else if (key.includes("skyline") || key.includes("r34") || key.includes("gtr") || key.includes("nissan")) {
    pins = SKYLINE_R34_KNOLLING_PINS;
  }

  if (tierFilter && tierFilter !== "all") {
    return pins.filter((p) => p.tier === tierFilter);
  }

  return pins;
}



