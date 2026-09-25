"use client";

import React, { useState } from "react";

interface CadExplodedSchematicProps {
  slug: string;
  className?: string;
}

interface PartSouqItem {
  id: number;
  badge: string;
  name: string;
  tier: string;
  partNumber: string;
  material: string;
  spec: string;
  x: number;
  y: number;
}

const VEHICLE_PARTS_DATA: Record<string, PartSouqItem[]> = {
  "porsche-911-gt3-rs": [
    {
      id: 1,
      badge: "01",
      name: "Dual-Element Active DRS Swan-Neck Wing",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "OEM #992-827-081-RS",
      material: "High-Modulus Prepreg Carbon Fiber",
      spec: "860 kg Downforce @ 285 km/h (Active Hydraulic Ram)",
      x: 630,
      y: 75
    },
    {
      id: 2,
      badge: "02",
      name: "Vented S-Duct Carbon Front Hood",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "OEM #992-823-011-WP",
      material: "CFRP with Clear Lacquer Finish",
      spec: "Integrated Twin Radiator Exit Nostrils",
      x: 230,
      y: 95
    },
    {
      id: 3,
      badge: "03",
      name: "Lightweight Aluminum-Steel Composite Monocoque",
      tier: "TIER 2 // MONOCOQUE",
      partNumber: "OEM #992-500-010-GT",
      material: "High-Strength Steel & Aluminum with AZ31B Magnesium Roof",
      spec: "-7.5mm Center-of-Gravity Reduction / FIA Spec Half-Cage",
      x: 260,
      y: 215
    },
    {
      id: 4,
      badge: "04",
      name: "4.0L High-Revving Naturally Aspirated Boxer-6",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "MA1.77 // 4.0-NA-525PS",
      material: "Plasma-Coated Aluminum Bedplate, Titanium Rods",
      spec: "525 PS @ 8,500 RPM, 9,000 RPM Redline, 6 Individual Throttle Bodies",
      x: 520,
      y: 275
    },
    {
      id: 5,
      badge: "05",
      name: "7-Speed Dual-Clutch PDK Transaxle",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "OEM #CG2-00-PDK-GT",
      material: "Die-Cast Magnesium Casing with Mechanical LSD",
      spec: "Shorter Final Drive Ratio, Electronic Torque Vectoring",
      x: 640,
      y: 300
    },
    {
      id: 6,
      badge: "06",
      name: "Aerodynamic Teardrop Double-Wishbone Front Axle",
      tier: "TIER 4 // SUSPENSION",
      partNumber: "OEM #992-407-151-RS",
      material: "Forged Aluminum with Aero Profile Tube",
      spec: "+40 kg Downforce at Front Axle, Anti-Dive Braking Kinematics",
      x: 180,
      y: 385
    },
    {
      id: 7,
      badge: "07",
      name: "410mm PCCB Carbon-Ceramic Brake Assembly",
      tier: "TIER 4 // BRAKES",
      partNumber: "OEM #992-615-301-CC",
      material: "Carbon-Fiber Reinforced Silicon Carbide (C/SiC)",
      spec: "6-Piston Monobloc Aluminum Calipers, Internal Cooling Vanes",
      x: 135,
      y: 435
    },
    {
      id: 8,
      badge: "08",
      name: "Chassis Fastener & Dacromet Hardware Grid",
      tier: "TIER 5 // HARDWARE",
      partNumber: "ISO 7200 // M8-M14 DIN 931",
      material: "Grade 10.9 Zinc-Flake Dacromet Coated Steel",
      spec: "Torque-to-Yield Monocoque & Subframe Retention Array",
      x: 430,
      y: 440
    }
  ],
  "bmw-m4-csl": [
    {
      id: 1,
      badge: "01",
      name: "Integrated CFRP Ducktail Bootlid & Aero Spoiler",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "OEM #51-62-8-085-CSL",
      material: "Carbon-Fiber Reinforced Polymer (CFRP)",
      spec: "+220 kg Rear Downforce @ 250 km/h",
      x: 630,
      y: 75
    },
    {
      id: 2,
      badge: "02",
      name: "Carbon Lightweight Hood with Twin Recessed Channels",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "OEM #41-61-8-084-CSL",
      material: "Twin-Skin CFRP (-1.2 kg delta)",
      spec: "Functional Air Evacuation & Aerodynamic Recesses",
      x: 230,
      y: 95
    },
    {
      id: 3,
      badge: "03",
      name: "G82 Lightweight Structural Unibody Cell",
      tier: "TIER 2 // MONOCOQUE",
      partNumber: "OEM #41-00-8-090-CSL",
      material: "Hot-Stamped High-Strength Steel & Carbon Roof",
      spec: "-100 kg Net Weight Reduction / Cast Aluminum Front Strut Brace",
      x: 260,
      y: 215
    },
    {
      id: 4,
      badge: "04",
      name: "3.0L Twin-Turbo Inline-6 Engine (S58B30T0)",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "S58B30T0 // 550PS-CSL",
      material: "Closed-Deck Cylinder Block with 3D-Printed Core Head",
      spec: "550 PS @ 6,250 RPM, 650 Nm Torque, 2.1 bar Boost Pressure",
      x: 520,
      y: 275
    },
    {
      id: 5,
      badge: "05",
      name: "8-Speed M Steptronic Transmission with Drivelogic",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "OEM #GA8HP76Z-CSL",
      material: "Reinforced Aluminum Casing with Active M Differential",
      spec: "Track-Calibrated Shift Logic & Integrated Fluid Cooler",
      x: 640,
      y: 300
    },
    {
      id: 6,
      badge: "06",
      name: "Double-Joint Spring Strut Front Suspension",
      tier: "TIER 4 // SUSPENSION",
      partNumber: "OEM #31-12-8-083-CSL",
      material: "Forged Aluminum Control Arms with Auxiliary Springs",
      spec: "-8mm Lower Ride Height, Stiffened Anti-Roll Bars",
      x: 180,
      y: 385
    },
    {
      id: 7,
      badge: "07",
      name: "M Carbon-Ceramic 400mm Brake System",
      tier: "TIER 4 // BRAKES",
      partNumber: "OEM #34-11-8-082-CCB",
      material: "Carbon-Ceramic Rotors with Red 6-Piston Calipers",
      spec: "-14.3 kg Unsprung Mass Reduction, Fade-Free Track Performance",
      x: 135,
      y: 435
    },
    {
      id: 8,
      badge: "08",
      name: "M Subframe Yield Stud & Chassis Hardware Grid",
      tier: "TIER 5 // HARDWARE",
      partNumber: "DIN 7984 // M10-M16 High-Tensile",
      material: "Zinc-Nickel Coated Grade 10.9 Fasteners",
      spec: "Direct Rigid Rear Subframe Solid-Bush Bolting Array",
      x: 430,
      y: 440
    }
  ],
  "mclaren-f1-xp5": [
    {
      id: 1,
      badge: "01",
      name: "Active 30° Dynamic Pop-Up Airbrake Foil",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "F1-AERO-XP5-001",
      material: "Toray High-Modulus Carbon Fiber Prepreg",
      spec: "Automatic 30° Deployment under Heavy Braking (>80 km/h)",
      x: 630,
      y: 75
    },
    {
      id: 2,
      badge: "02",
      name: "Forward Carbon Fascia & Dihedral Butterfly Doors",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "F1-BODY-XP5-012",
      material: "Nomex Honeycomb Sandwiched Carbon Composite",
      spec: "Zero-Parasitic Drag Front Underfloor Diffuser Ducts",
      x: 230,
      y: 95
    },
    {
      id: 3,
      badge: "03",
      name: "Monolithic Carbon Fiber Tub & Central Driver Cell",
      tier: "TIER 2 // MONOCOQUE",
      partNumber: "F1-CHASSIS-XP5-101",
      material: "Full Carbon Fiber Monocoque Chassis Tub",
      spec: "First Road Car Monolithic Carbon Monocoque / 1,138 kg Total Dry Weight",
      x: 260,
      y: 215
    },
    {
      id: 4,
      badge: "04",
      name: "6.1L 60° Naturally Aspirated V12 Engine (BMW S70/2)",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "BMW-S70/2-V12-627PS",
      material: "Alusil Aluminum-Silicon Block, 24-Karat Gold Heat Shielding",
      spec: "627 PS @ 7,400 RPM, 650 Nm Torque, 7,500 RPM Redline",
      x: 520,
      y: 275
    },
    {
      id: 5,
      badge: "05",
      name: "Transverse 6-Speed Manual Transaxle",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "WEISMANN-6MT-XP5",
      material: "Magnesium Alloy Casing with AP Racing Carbon Triple-Plate Clutch",
      spec: "Transverse Packaging for Optimal Polar Moment of Inertia",
      x: 640,
      y: 300
    },
    {
      id: 6,
      badge: "06",
      name: "Inboard Pushrod Cantilever Double-Wishbones",
      tier: "TIER 4 // SUSPENSION",
      partNumber: "F1-SUSP-XP5-301",
      material: "CNC Billet Aluminium A-Arms & Bilstein Monotube Dampers",
      spec: "Ground-Plane Kinematic Geometry with Sub-Millimeter Compliance",
      x: 180,
      y: 385
    },
    {
      id: 7,
      badge: "07",
      name: "Unassisted 4-Piston Monobloc Brembo Brakes",
      tier: "TIER 4 // BRAKES",
      partNumber: "BREMBO-F1-XP5-401",
      material: "Cross-Drilled Steel Discs with Aluminum Monobloc Calipers",
      spec: "Pure Hydraulic Mechanical Feedback (No Servo Assistance)",
      x: 135,
      y: 435
    },
    {
      id: 8,
      badge: "08",
      name: "Individually Serialized Titanium Fastener Grid",
      tier: "TIER 5 // HARDWARE",
      partNumber: "MIL-SPEC-TI-6AL-4V",
      material: "Aerospace Grade 5 Titanium Alloy",
      spec: "Every Bolt Individually Weighed & Dimension-Checked Prior to Assembly",
      x: 430,
      y: 440
    }
  ],
  "ferrari-f40": [
    {
      id: 1,
      badge: "01",
      name: "Fixed High-Downforce Rear Gurney Wing & Clamshell",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "FER-139882-F40",
      material: "Carbon-Kevlar Nomex Honeycomb Weave",
      spec: "One-Piece Detachable Clamshell Rear Body Section",
      x: 630,
      y: 75
    },
    {
      id: 2,
      badge: "02",
      name: "Front Clamshell with Dual NACA Ducts & Louvers",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "FER-139881-F40",
      material: "Ultra-Thin Kevlar & Composite Panels (46 kg Total Shell)",
      spec: "Dual NACA Cooling Ducts Feeding Oil & Brake Radiators",
      x: 230,
      y: 95
    },
    {
      id: 3,
      badge: "03",
      name: "Tubular 25CrMo4 Steel Spaceframe with Kevlar Bulkheads",
      tier: "TIER 2 // MONOCOQUE",
      partNumber: "TIPO-F120AB-TUBULAR",
      material: "25CrMo4 Chrome-Molybdenum Steel & Bonded Kevlar Tub",
      spec: "Torsional Rigidity 12,000 Nm/deg / 1,100 kg Total Dry Weight",
      x: 260,
      y: 215
    },
    {
      id: 4,
      badge: "04",
      name: "2.9L Twin-Turbo 90° V8 Engine (Tipo F120A)",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "TIPO-F120A-V8-TT",
      material: "Silumin Aluminum Alloy with Nikasil Cylinder Liners",
      spec: "478 PS @ 7,000 RPM, Dual IHI Water-Cooled Turbos (1.1 bar boost)",
      x: 520,
      y: 275
    },
    {
      id: 5,
      badge: "05",
      name: "5-Speed Manual Transaxle with Dog-Leg Gate",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "FER-139550-5MT",
      material: "Magnesium Transaxle Housing with ZF Limited-Slip Differential",
      spec: "Mechanical Open-Gate Shifter, Twin-Plate Dry Clutch",
      x: 640,
      y: 300
    },
    {
      id: 6,
      badge: "06",
      name: "Unequal-Length Double-Wishbone Track Suspension",
      tier: "TIER 4 // SUSPENSION",
      partNumber: "FER-139700-SUSP",
      material: "Tubular Steel A-Arms with Adjustable Koni Coilovers",
      spec: "Dual Ride-Height Hydraulic Lift Adjustment System",
      x: 180,
      y: 385
    },
    {
      id: 7,
      badge: "07",
      name: "Brembo 330mm Ventilated Cross-Drilled Discs",
      tier: "TIER 4 // BRAKES",
      partNumber: "FER-139600-BRK",
      material: "Cast-Iron Rotors with 4-Piston Aluminum Calipers",
      spec: "Unassisted Manual Hydraulic Braking Circuit (Zero ABS)",
      x: 135,
      y: 435
    },
    {
      id: 8,
      badge: "08",
      name: "Cadmium-Plated Motorsport Spaceframe Hardware Grid",
      tier: "TIER 5 // HARDWARE",
      partNumber: "UNI-5737 // Grade 8.8-10.9",
      material: "Cadmium-Plated Steel with Safety Locking Wire",
      spec: "Spaceframe Node Bolting & Clamshell Hinge Pin Assembly",
      x: 430,
      y: 440
    }
  ],
  "nissan-skyline-gtr-r34": [
    {
      id: 1,
      badge: "01",
      name: "4-Way Adjustable Carbon Rear Wing & Splitter",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "NISMO-96030-R34-CF",
      material: "Dry Carbon Fiber Composite",
      spec: "4-Position Angle of Attack with High-Speed Aero Blade",
      x: 630,
      y: 75
    },
    {
      id: 2,
      badge: "02",
      name: "V-Spec II Carbon NACA Duct Engine Hood",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "OEM #65100-AA400-VS2",
      material: "Lightweight Aluminum & Dry Carbon Center NACA",
      spec: "Direct Cold-Air Turbocharger Intercooler Ducting",
      x: 230,
      y: 95
    },
    {
      id: 3,
      badge: "03",
      name: "Stiffened BNR34 Steel Unibody with Carbon Diffuser",
      tier: "TIER 2 // MONOCOQUE",
      partNumber: "BNR34-CHASSIS-V-SPEC2",
      material: "High-Rigidity Galvanized Steel & Carbon Underfloor Venturi",
      spec: "+56% Torsional Rigidity vs R33 / Advanced Underfloor Ground Effects",
      x: 260,
      y: 215
    },
    {
      id: 4,
      badge: "04",
      name: "2.6L Twin-Turbo Inline-6 Engine (RB26DETT N1 Spec)",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "RB26DETT // 280+PS-N1",
      material: "Reinforced Cast-Iron 24U Engine Block, Ceramic-Coated Pistons",
      spec: "280+ PS (Gentlemen's Agreement) / 8,000 RPM Rev Limit / Twin Garrett T28",
      x: 520,
      y: 275
    },
    {
      id: 5,
      badge: "05",
      name: "Getrag 6-Speed Manual & ATTESA E-TS Pro AWD",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "GETRAG-V160-ATTESA-PRO",
      material: "Cast Aluminum Housing with Active Electro-Hydraulic LSD",
      spec: "Active 50:50 to 0:100 Front/Rear Torque Distribution (1,000 Hz)",
      x: 640,
      y: 300
    },
    {
      id: 6,
      badge: "06",
      name: "Multi-Link Front & Rear Track Suspension with Super-HICAS",
      tier: "TIER 4 // SUSPENSION",
      partNumber: "OEM #54500-AA400-NISMO",
      material: "Forged Aluminum Multi-Links with Inverted Monotube Dampers",
      spec: "Active Rear-Wheel Steer Kinematics with Track Camber Adjustment",
      x: 180,
      y: 385
    },
    {
      id: 7,
      badge: "07",
      name: "Brembo Gold 4-Piston Front & 2-Piston Rear Brakes",
      tier: "TIER 4 // BRAKES",
      partNumber: "BREMBO-GOLD-R34-01",
      material: "Curved-Vane 324mm Rotors with Gold Monobloc Calipers",
      spec: "ABS with Multi-Channel Deceleration G-Sensor Feedback",
      x: 135,
      y: 435
    },
    {
      id: 8,
      badge: "08",
      name: "Zinc-Yellow High-Torque Multi-Link Fastener Array",
      tier: "TIER 5 // HARDWARE",
      partNumber: "JIS-B-1180 // Grade 10.9",
      material: "Zinc-Yellow Dichromate Plated High-Tensile Bolts",
      spec: "ATTESA Subframe & Differential Mounting Hard-Point Stud Grid",
      x: 430,
      y: 440
    }
  ],
  "volkswagen-golf-r-mk8": [
    {
      id: 1,
      badge: "01",
      name: "Dual-Level R-Performance Roof Spoiler & Airfoils",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "OEM #5H0-827-933-R20",
      material: "Aerodynamic Injection-Molded High-Density Composite",
      spec: "Reduced Lift Coefficient & Optimized Rear Axle High-Speed Balance",
      x: 630,
      y: 75
    },
    {
      id: 2,
      badge: "02",
      name: "Lightweight Aluminum Hood with Direct Cooling Flow",
      tier: "TIER 1 // AERO SHELL",
      partNumber: "OEM #5H0-823-031-AL",
      material: "Pressed Deep-Draw Aerospace Aluminum Alloy",
      spec: "-6.2 kg Unsprung Front Overhang Weight Reduction",
      x: 230,
      y: 95
    },
    {
      id: 3,
      badge: "03",
      name: "MQB Evo Hot-Stamped Boron Steel Structural Safety Cell",
      tier: "TIER 2 // MONOCOQUE",
      partNumber: "MQB-EVO-GOLF-R20-BODY",
      material: "Ultra-High-Strength 1,500 MPa Boron Steel & Aluminum Subframe",
      spec: "+10% Torsional Rigidity vs Mk7.5 / Cast Aluminum Front Subframe",
      x: 260,
      y: 215
    },
    {
      id: 4,
      badge: "04",
      name: "2.0L TSI Turbocharged 4-Cylinder (EA888 Gen 4)",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "EA888-GEN4-320PS-R",
      material: "Grey Cast-Iron Block with Aluminum-Silicon Cylinder Head",
      spec: "320 PS @ 5,600 RPM, 420 Nm Torque, Continental Water-Cooled Turbo",
      x: 520,
      y: 275
    },
    {
      id: 5,
      badge: "05",
      name: "7-Speed Dual-Clutch DSG with R-Performance Torque Vectoring",
      tier: "TIER 3 // POWERTRAIN",
      partNumber: "DQ381-7A-4MOTION",
      material: "Reinforced DSG with Twin Multi-Plate Clutch Rear Differential",
      spec: "100% Rear Torque Allocation to Outer Wheel in Drift/Special Nürburgring Mode",
      x: 640,
      y: 300
    },
    {
      id: 6,
      badge: "06",
      name: "MacPherson Struts with 200Hz Adaptive DCC Damping",
      tier: "TIER 4 // SUSPENSION",
      partNumber: "OEM #5H0-413-031-DCC",
      material: "Cast Aluminum Swivel Bearings & Electromagnetic Dampers",
      spec: "+1.3° Negative Camber on Front Axle, Vehicle Dynamics Manager (VDM)",
      x: 180,
      y: 385
    },
    {
      id: 7,
      badge: "07",
      name: "358mm Cross-Drilled Front Discs with Akebono Calipers",
      tier: "TIER 4 // BRAKES",
      partNumber: "OEM #5H0-615-301-R20",
      material: "Cast-Iron Friction Ring with Cast Aluminum Center Bell",
      spec: "2-Piston Floating Calipers (-0.6 kg Unsprung Mass per Disc)",
      x: 135,
      y: 435
    },
    {
      id: 8,
      badge: "08",
      name: "Micro-Alloyed Torx & Stretch Bolt Subframe Hardware Grid",
      tier: "TIER 5 // HARDWARE",
      partNumber: "VAG-SPEC // Torx T25-T50 M8-M14",
      material: "Micro-Alloyed Zinc-Flake Coated Tensile Steel",
      spec: "Engine Mount & Multi-Link Subframe Elastic Stretch Hardware Array",
      x: 430,
      y: 440
    }
  ]
};

export function CadExplodedSchematic({ slug, className = "" }: CadExplodedSchematicProps) {
  const isBMW = slug.includes("bmw") || slug.includes("m4");
  const isMcLaren = slug.includes("mclaren") || slug.includes("f1");
  const isFerrari = slug.includes("ferrari") || slug.includes("f40");
  const isNissan = slug.includes("skyline") || slug.includes("r34");
  const isGolf = slug.includes("golf") || slug.includes("vw");

  // Determine active parts dataset
  let matchedKey = "porsche-911-gt3-rs";
  let accentStroke = "#FF8000";
  let chassisCode = "992.1-GT3-RS";

  if (isBMW) {
    matchedKey = "bmw-m4-csl";
    accentStroke = "#EF4444";
    chassisCode = "G82-M4-CSL";
  } else if (isMcLaren) {
    matchedKey = "mclaren-f1-xp5";
    accentStroke = "#D2FF00";
    chassisCode = "XP5-CARBON-TUB";
  } else if (isFerrari) {
    matchedKey = "ferrari-f40";
    accentStroke = "#EF4444";
    chassisCode = "F120AB-SPACEFRAME";
  } else if (isNissan) {
    matchedKey = "nissan-skyline-gtr-r34";
    accentStroke = "#38BDF8";
    chassisCode = "BNR34-ATTESA-AWD";
  } else if (isGolf) {
    matchedKey = "volkswagen-golf-r-mk8";
    accentStroke = "#06B6D4";
    chassisCode = "MQB-EVO-4MOTION";
  }

  const parts = VEHICLE_PARTS_DATA[matchedKey] || VEHICLE_PARTS_DATA["porsche-911-gt3-rs"];
  const [activePartId, setActivePartId] = useState<number | null>(null);

  const activePart = parts.find((p) => p.id === activePartId);

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-between select-none ${className}`}>
      {/* 1. MAIN INTERACTIVE SVG KNOLLING CANVAS */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 800 500"
          className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(0,0,0,0.9)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle CAD Coordinate Grid Pattern */}
            <pattern id={`cadGrid-${slug}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.06)" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.2" fill="rgba(210, 255, 0, 0.12)" />
            </pattern>

            {/* Subtle Glow Filters */}
            <filter id={`glow-${slug}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Material Shading Gradients */}
            <linearGradient id={`aeroGrad-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={accentStroke} stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1E293B" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id={`monocoqueGrad-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0B101E" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id={`powertrainGrad-${slug}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* 1. CAD Background Grid */}
          <rect width="800" height="500" fill="#080B10" />
          <rect width="800" height="500" fill={`url(#cadGrid-${slug})`} />

          {/* 2. Datum Axis & Subtle Alignments */}
          <g stroke="rgba(148, 163, 184, 0.14)" strokeDasharray="3 3" strokeWidth="1">
            <line x1="50" y1="250" x2="750" y2="250" />
            <line x1="400" y1="30" x2="400" y2="470" />
            {/* Soft Tier Guideline Markers */}
            <line x1="80" y1="140" x2="720" y2="140" stroke="rgba(148, 163, 184, 0.05)" />
            <line x1="80" y1="280" x2="720" y2="280" stroke="rgba(148, 163, 184, 0.05)" />
            <line x1="80" y1="410" x2="720" y2="410" stroke="rgba(148, 163, 184, 0.05)" />
          </g>

          {/* 3. TIER 1: FLOATING OUTER AERO SHELL (Detached High Elements) */}
          <g
            id="tier-1-aero"
            className="transition-all duration-300"
            filter={activePartId === 1 || activePartId === 2 ? `url(#glow-${slug})` : undefined}
          >
            {/* Detached Hood */}
            <polygon
              points="240,90 380,65 480,100 320,135"
              fill={`url(#aeroGrad-${slug})`}
              stroke={activePartId === 2 ? "#D2FF00" : accentStroke}
              strokeWidth={activePartId === 2 ? "2.5" : "1.5"}
            />
            {/* Hood NACA cooling slits */}
            <line x1="290" y1="102" x2="330" y2="88" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="340" y1="118" x2="380" y2="104" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />

            {/* Detached Rear Aero Wing */}
            <polygon
              points="530,70 650,50 670,68 550,90"
              fill={`url(#aeroGrad-${slug})`}
              stroke={activePartId === 1 ? "#D2FF00" : accentStroke}
              strokeWidth={activePartId === 1 ? "2.5" : "1.75"}
            />
            {/* Swan-Neck Wing Pylons */}
            <line x1="560" y1="85" x2="570" y2="125" stroke={accentStroke} strokeWidth="2" />
            <line x1="630" y1="65" x2="640" y2="110" stroke={accentStroke} strokeWidth="2" />

            {/* Detached Front Splitter Guide */}
            <polygon
              points="140,140 230,120 250,145 160,165"
              fill="rgba(30, 41, 59, 0.6)"
              stroke="rgba(210, 255, 0, 0.45)"
              strokeWidth="1.2"
            />
          </g>

          {/* 4. TIER 2: BARE STRUCTURAL MONOCOQUE / SAFETY CELL (Mid Tier) */}
          <g
            id="tier-2-monocoque"
            className="transition-all duration-300"
            filter={activePartId === 3 ? `url(#glow-${slug})` : undefined}
          >
            {/* Main Carbon Tub Body */}
            <polygon
              points="230,220 440,170 590,210 520,300 310,310 180,260"
              fill={`url(#monocoqueGrad-${slug})`}
              stroke={activePartId === 3 ? "#D2FF00" : "#94A3B8"}
              strokeWidth={activePartId === 3 ? "2.5" : "1.75"}
            />
            {/* Windscreen Hoop / Roll Truss */}
            <polygon
              points="320,195 430,170 480,210 370,240"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.5"
            />
            {/* Door Aperture Recess */}
            <polygon
              points="280,235 380,210 420,265 315,285"
              fill="#060910"
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth="1"
            />
            {/* Magnesium Roof Reinforcement Node */}
            <line x1="375" y1="182" x2="425" y2="225" stroke={accentStroke} strokeWidth="1.5" />
            <circle cx="375" cy="182" r="3" fill={accentStroke} />
          </g>

          {/* 5. TIER 3: POWERTRAIN & TRANSAXLE (Engine, Heads, Gearbox) */}
          <g
            id="tier-3-powertrain"
            className="transition-all duration-300"
            filter={activePartId === 4 || activePartId === 5 ? `url(#glow-${slug})` : undefined}
          >
            {/* Engine Block */}
            <polygon
              points="460,280 570,255 610,290 500,325"
              fill={`url(#powertrainGrad-${slug})`}
              stroke={activePartId === 4 ? "#D2FF00" : "#F59E0B"}
              strokeWidth={activePartId === 4 ? "2.5" : "1.75"}
            />
            {/* Cylinder Bores */}
            <ellipse cx="500" cy="285" rx="8" ry="4" fill="none" stroke="#F59E0B" strokeWidth="1" />
            <ellipse cx="525" cy="280" rx="8" ry="4" fill="none" stroke="#F59E0B" strokeWidth="1" />
            <ellipse cx="550" cy="275" rx="8" ry="4" fill="none" stroke="#F59E0B" strokeWidth="1" />

            {/* Gearbox / Transaxle Housing */}
            <polygon
              points="550,295 640,280 660,310 570,330"
              fill="rgba(59, 130, 246, 0.25)"
              stroke={activePartId === 5 ? "#D2FF00" : "#38BDF8"}
              strokeWidth={activePartId === 5 ? "2.5" : "1.5"}
            />

            {/* Exhaust Headers */}
            <path
              d="M 505 310 Q 560 348 630 338 T 670 335"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
            />
          </g>

          {/* 6. TIER 4: SUSPENSION & BRAKE RUNNING GEAR */}
          <g
            id="tier-4-suspension"
            className="transition-all duration-300"
            filter={activePartId === 6 || activePartId === 7 ? `url(#glow-${slug})` : undefined}
          >
            {/* Front Double-Wishbone */}
            <polygon
              points="170,380 230,360 240,380 180,400"
              fill="none"
              stroke={activePartId === 6 ? "#D2FF00" : "#38BDF8"}
              strokeWidth={activePartId === 6 ? "2.5" : "1.5"}
            />
            {/* Brake Rotor Disc & Caliper */}
            <circle
              cx="160"
              cy="405"
              r="22"
              fill="none"
              stroke={activePartId === 7 ? "#D2FF00" : "#94A3B8"}
              strokeWidth={activePartId === 7 ? "3.5" : "3"}
            />
            <circle cx="160" cy="405" r="14" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 2" />
            <rect
              x="142"
              y="390"
              width="8"
              height="18"
              rx="2"
              fill={activePartId === 7 ? "#D2FF00" : accentStroke}
            />

            {/* Rear Wishbone & Disc */}
            <polygon points="610,380 670,365 680,385 620,405" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
            <circle cx="690" cy="385" r="22" fill="none" stroke="#94A3B8" strokeWidth="3" />
            <rect x="675" y="375" width="8" height="18" rx="2" fill={accentStroke} />
          </g>

          {/* 7. TIER 5: HARDWARE FASTENER GRID ARRAY */}
          <g
            id="tier-5-hardware"
            transform="translate(320, 420)"
            className="transition-all duration-300"
            filter={activePartId === 8 ? `url(#glow-${slug})` : undefined}
          >
            <rect
              x="0"
              y="0"
              width="160"
              height="36"
              fill="rgba(15, 23, 42, 0.75)"
              stroke={activePartId === 8 ? "#D2FF00" : "#334155"}
              strokeWidth={activePartId === 8 ? "2" : "1"}
              rx="4"
            />
            <circle cx="20" cy="18" r="4" fill="#E2E8F0" />
            <circle cx="40" cy="18" r="4" fill="#E2E8F0" />
            <circle cx="60" cy="18" r="4" fill="#E2E8F0" />
            <circle cx="80" cy="18" r="4" fill="#E2E8F0" />
            <circle cx="100" cy="18" r="4" fill="#E2E8F0" />
            <circle cx="120" cy="18" r="4" fill="#E2E8F0" />
            <circle cx="140" cy="18" r="4" fill={accentStroke} />
          </g>

          {/* 8. CLEAN PARTSOUQ NUMBERED BADGES (01 to 08) WITH NO CROSSING POINTER TEXT */}
          {parts.map((p) => {
            const isSelected = activePartId === p.id;
            return (
              <g
                key={p.id}
                transform={`translate(${p.x}, ${p.y})`}
                className="cursor-pointer transition-transform duration-200"
                style={{
                  transformOrigin: `${p.x}px ${p.y}px`
                }}
                onMouseEnter={() => setActivePartId(p.id)}
                onMouseLeave={() => setActivePartId(null)}
                onClick={() => setActivePartId((prev) => (prev === p.id ? null : p.id))}
              >
                {/* Outer Ring Glow on Active */}
                {isSelected && (
                  <circle cx="0" cy="0" r="16" fill="none" stroke="#D2FF00" strokeWidth="1.5" className="animate-ping" opacity="0.6" />
                )}

                {/* Main Badge Disc */}
                <circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill="#0B0F19"
                  stroke={isSelected ? "#D2FF00" : "rgba(148, 163, 184, 0.55)"}
                  strokeWidth={isSelected ? "2" : "1.2"}
                  className="transition-colors duration-200"
                />

                {/* Badge Number */}
                <text
                  x="0"
                  y="3.5"
                  fill={isSelected ? "#D2FF00" : "#E2E8F0"}
                  fontSize="9.5"
                  fontFamily="monospace"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="transition-colors duration-200"
                >
                  {p.badge}
                </text>
              </g>
            );
          })}

          {/* 9. CAD STAMP & TOLERANCES WATERMARK */}
          <text x="30" y="475" fill="#475569" fontSize="9" fontFamily="monospace">
            {`MONOCOQUE // ${chassisCode} // ISO 7200`}
          </text>
          <text x="770" y="475" fill="#475569" fontSize="9" fontFamily="monospace" textAnchor="end">
            EXPLODED 5-TIER KNOLLING DECONSTRUCTION
          </text>
        </svg>

        {/* 2. FLOATING PARTSOUQ ACTIVE TOOLTIP HUD */}
        {activePart && (
          <div className="absolute top-4 left-4 right-4 z-30 pointer-events-none transition-all duration-300 transform translate-y-0">
            <div className="max-w-md mx-auto bg-[#07090F]/95 backdrop-blur-xl border border-[#D2FF00] p-3.5 rounded-xl shadow-[0_0_30px_rgba(210,255,0,0.25)] flex items-start justify-between gap-3 text-left">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
                  <span className="text-[10px] font-mono text-[#D2FF00] font-black uppercase tracking-wider">
                    {`[ PART ${activePart.badge} // ${activePart.tier} ]`}
                  </span>
                </div>
                <div className="text-white text-xs font-bold font-sans mt-0.5 leading-snug">
                  {activePart.name}
                </div>
                <div className="text-[10px] font-mono text-[#8C98AC] mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-emerald-400 font-semibold">{activePart.partNumber}</span>
                  <span>•</span>
                  <span>{activePart.material}</span>
                </div>
                <div className="text-[10px] font-mono text-[#E2E8F0] mt-1 bg-[#101524] px-2 py-0.5 rounded border border-[#1E273A] inline-block">
                  {activePart.spec}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-[#D2FF00] bg-[#D2FF00]/10 px-2 py-1 rounded border border-[#D2FF00]/40">
                  {`#${activePart.badge}`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM PARTSOUQ COMPONENT CHIPS STRIP FOR QUICK INSPECTION */}
      <div className="w-full px-3 py-2 bg-[#06080E]/90 border-t border-[#141B28] flex items-center justify-between gap-1 overflow-x-auto text-[10px] font-mono scrollbar-none">
        <span className="text-[#64748B] shrink-0 uppercase text-[9px] font-bold mr-1">
          PARTSOUQ INDEX:
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {parts.map((p) => {
            const isSelected = activePartId === p.id;
            return (
              <button
                key={p.id}
                onMouseEnter={() => setActivePartId(p.id)}
                onMouseLeave={() => setActivePartId(null)}
                onClick={() => setActivePartId((prev) => (prev === p.id ? null : p.id))}
                className={`px-2 py-1 rounded transition-colors cursor-pointer shrink-0 font-bold ${
                  isSelected
                    ? "bg-[#D2FF00] text-black shadow-[0_0_10px_rgba(210,255,0,0.5)]"
                    : "bg-[#0F1420] text-[#8C98AC] hover:text-white border border-[#1E2536] hover:border-[#D2FF00]/40"
                }`}
              >
                {p.badge}
              </button>
            );
          })}
        </div>
        <span className="text-[9px] text-[#475569] shrink-0 ml-1 hidden sm:inline">
          HOVER BADGE FOR OEM DOSSIER
        </span>
      </div>
    </div>
  );
}

export default CadExplodedSchematic;
