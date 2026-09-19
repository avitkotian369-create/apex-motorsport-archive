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

