"use client";

import React from "react";

interface CadExplodedSchematicProps {
  slug: string;
  className?: string;
}

export function CadExplodedSchematic({ slug, className = "" }: CadExplodedSchematicProps) {
  const isBMW = slug.includes("bmw") || slug.includes("m4");
  const isMcLaren = slug.includes("mclaren") || slug.includes("f1");
  const isFerrari = slug.includes("ferrari") || slug.includes("f40");
  const isNissan = slug.includes("skyline") || slug.includes("r34");
  const isGolf = slug.includes("golf") || slug.includes("vw");

  // Accent highlight per chassis
  let accentStroke = "#D2FF00";
  let chassisCode = "992.1-GT3-RS";
  let engineType = "FLAT-6 NA 4.0L";

  if (isBMW) {
    accentStroke = "#EF4444";
    chassisCode = "G82-M4-CSL";
    engineType = "S58 TWIN-TURBO 3.0L";
  } else if (isMcLaren) {
    accentStroke = "#D2FF00";
    chassisCode = "XP5-CARBON-TUB";
    engineType = "BMW S70/2 V12 6.1L";
  } else if (isFerrari) {
    accentStroke = "#EF4444";
    chassisCode = "F120AB-SPACEFRAME";
    engineType = "TIPO F120A V8 2.9L TT";
  } else if (isNissan) {
    accentStroke = "#38BDF8";
    chassisCode = "BNR34-ATTESA-AWD";
    engineType = "RB26DETT I6 2.6L TT";
  } else if (isGolf) {
    accentStroke = "#06B6D4";
    chassisCode = "MQB-EVO-4MOTION";
    engineType = "EA888 GEN 4 2.0L TSI";
  }

  return (
    <div className={`relative w-full h-full flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id={`cadGrid-${slug}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148, 163, 184, 0.07)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(210, 255, 0, 0.15)" />
          </pattern>

          {/* Gradients */}
          <linearGradient id={`aeroGrad-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentStroke} stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id={`monocoqueGrad-${slug}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id={`powertrainGrad-${slug}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* 1. CAD Background Grid */}
        <rect width="800" height="500" fill="#080B10" />
        <rect width="800" height="500" fill={`url(#cadGrid-${slug})`} />

        {/* 2. Datum Axis & Centerlines */}
        <g stroke="rgba(148, 163, 184, 0.18)" strokeDasharray="4 4" strokeWidth="1">
          <line x1="60" y1="250" x2="740" y2="250" />
          <line x1="400" y1="40" x2="400" y2="460" />
          {/* Isometric Angled Projection Lines */}
          <line x1="160" y1="120" x2="640" y2="380" stroke="rgba(148, 163, 184, 0.08)" />
          <line x1="160" y1="380" x2="640" y2="120" stroke="rgba(148, 163, 184, 0.08)" />
        </g>

        {/* 3. TIER 1: FLOATING OUTER AERO SHELL & BODY PANELS (Top Y: 70 - 150) */}
        <g id="tier-1-aero" className="transition-all duration-300">
          {/* Floating Carbon Hood */}
          <polygon
            points="240,90 380,65 480,100 320,135"
            fill={`url(#aeroGrad-${slug})`}
            stroke={accentStroke}
            strokeWidth="1.5"
            strokeDasharray="none"
          />
          <line x1="300" y1="105" x2="410" y2="85" stroke={accentStroke} strokeWidth="1" strokeOpacity="0.6" />
          <text x="320" y="80" fill={accentStroke} fontSize="9" fontFamily="monospace" fontWeight="bold">
            01. FLOATING AERO HOOD
          </text>

          {/* Floating Rear High-Downforce Wing */}
          <polygon
            points="530,70 650,50 670,68 550,90"
            fill={`url(#aeroGrad-${slug})`}
            stroke={accentStroke}
            strokeWidth="1.75"
          />
          {/* Swan-Neck Wing Pylons */}
          <line x1="560" y1="85" x2="570" y2="130" stroke={accentStroke} strokeWidth="2" />
          <line x1="630" y1="65" x2="640" y2="115" stroke={accentStroke} strokeWidth="2" />
          <text x="560" y="55" fill={accentStroke} fontSize="9" fontFamily="monospace" fontWeight="bold">
            02. REAR AERO WING
          </text>

          {/* Front Fascia / Splitter Guide */}
          <polygon
            points="140,140 230,120 250,145 160,165"
            fill="rgba(30, 41, 59, 0.5)"
            stroke="rgba(210, 255, 0, 0.5)"
            strokeWidth="1"
          />
          {/* Exploded Vertical Datum Stems */}
          <line x1="350" y1="120" x2="350" y2="200" stroke="rgba(210, 255, 0, 0.4)" strokeDasharray="3 3" />
          <line x1="600" y1="80" x2="600" y2="180" stroke="rgba(210, 255, 0, 0.4)" strokeDasharray="3 3" />
        </g>

        {/* 4. TIER 2: BARE STRUCTURAL UNIBODY / MONOCOQUE CELL (Mid Y: 180 - 280) */}
        <g id="tier-2-monocoque">
          {/* Main Passenger Safety Tub */}
          <polygon
            points="230,220 440,170 590,210 520,300 310,310 180,260"
            fill={`url(#monocoqueGrad-${slug})`}
            stroke="#94A3B8"
            strokeWidth="2"
          />
          {/* Structural A-Pillars & Roof Hoop */}
          <polygon
            points="320,195 430,170 480,210 370,240"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />
          {/* Door Aperture Cutout */}
          <polygon
            points="280,235 380,210 420,265 315,285"
            fill="#0B0F19"
            stroke="rgba(148, 163, 184, 0.4)"
            strokeWidth="1"
          />
          {/* Magnesium Roof Reinforcement Node */}
          <line x1="375" y1="182" x2="425" y2="225" stroke={accentStroke} strokeWidth="1.5" />
          <circle cx="375" cy="182" r="3" fill={accentStroke} />
          <text x="210" y="295" fill="#94A3B8" fontSize="10" fontFamily="monospace" fontWeight="bold">
            03. BARE CHASSIS MONOCOQUE
          </text>
        </g>

        {/* 5. TIER 3: POWERTRAIN & DRIVETRAIN (Mid-Low Y: 290 - 370) */}
        <g id="tier-3-powertrain">
          {/* Engine Block & Cylinders */}
          <polygon
            points="460,280 570,255 610,290 500,325"
            fill={`url(#powertrainGrad-${slug})`}
            stroke="#F59E0B"
            strokeWidth="1.75"
          />
          {/* Cylinder Bore Indicative Circles */}
          <ellipse cx="500" cy="285" rx="8" ry="4" fill="none" stroke="#F59E0B" strokeWidth="1" />
          <ellipse cx="525" cy="280" rx="8" ry="4" fill="none" stroke="#F59E0B" strokeWidth="1" />
          <ellipse cx="550" cy="275" rx="8" ry="4" fill="none" stroke="#F59E0B" strokeWidth="1" />

          {/* Transaxle / Gearbox Housing */}
          <polygon
            points="550,295 640,280 660,310 570,330"
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#38BDF8"
            strokeWidth="1.5"
          />

          {/* Exhaust Header Run */}
          <path
            d="M 505 310 Q 560 350 630 340 T 670 335"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2"
            strokeDasharray="none"
          />
          <text x="510" y="360" fill="#F59E0B" fontSize="9" fontFamily="monospace" fontWeight="bold">
            04. {engineType} POWERTRAIN
          </text>
        </g>

        {/* 6. TIER 4: SUSPENSION, BRAKES & HARDWARE (Bottom Y: 360 - 450) */}
        <g id="tier-4-suspension">
          {/* Front Left Double-Wishbone & Upright */}
          <polygon points="170,380 230,360 240,380 180,400" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="160" cy="405" r="22" fill="none" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="160" cy="405" r="14" fill="none" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* Brake Caliper */}
          <rect x="142" y="390" width="8" height="18" rx="2" fill={accentStroke} />

          {/* Rear Right Running Gear */}
          <polygon points="610,380 670,365 680,385 620,405" fill="none" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="690" cy="385" r="22" fill="none" stroke="#94A3B8" strokeWidth="3" />
          <rect x="675" y="375" width="8" height="18" rx="2" fill={accentStroke} />

          {/* Fastener Grid Array (Bottom Right) */}
          <g transform="translate(320, 420)">
            <rect x="0" y="0" width="160" height="40" fill="rgba(15, 23, 42, 0.7)" stroke="#334155" strokeWidth="1" rx="4" />
            <circle cx="20" cy="20" r="4" fill="#E2E8F0" />
            <circle cx="40" cy="20" r="4" fill="#E2E8F0" />
            <circle cx="60" cy="20" r="4" fill="#E2E8F0" />
            <circle cx="80" cy="20" r="4" fill="#E2E8F0" />
            <circle cx="100" cy="20" r="4" fill="#E2E8F0" />
            <circle cx="120" cy="20" r="4" fill="#E2E8F0" />
            <circle cx="140" cy="20" r="4" fill={accentStroke} />
            <text x="15" y="12" fill="#64748B" fontSize="7" fontFamily="monospace">HARDWARE GRID (M6-M14)</text>
          </g>
        </g>

        {/* 7. CAD Dimension Line Calipers */}
        <g stroke="rgba(210, 255, 0, 0.7)" strokeWidth="1">
          {/* Wheelbase Dimension Line */}
          <line x1="160" y1="465" x2="690" y2="465" />
          <line x1="160" y1="455" x2="160" y2="475" />
          <line x1="690" y1="455" x2="690" y2="475" />
          <text x="380" y="460" fill="#D2FF00" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
            DATUM WHEELBASE SPEC // ±0.05 MM
          </text>
        </g>

        {/* 8. Technical Border Corner Crosshairs */}
        <g stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1">
          {/* Top Left */}
          <line x1="20" y1="20" x2="40" y2="20" />
          <line x1="20" y1="20" x2="20" y2="40" />
          {/* Top Right */}
          <line x1="780" y1="20" x2="760" y2="20" />
          <line x1="780" y1="20" x2="780" y2="40" />
          {/* Bottom Left */}
          <line x1="20" y1="480" x2="40" y2="480" />
          <line x1="20" y1="480" x2="20" y2="460" />
          {/* Bottom Right */}
          <line x1="780" y1="480" x2="760" y2="480" />
          <line x1="780" y1="480" x2="780" y2="460" />
        </g>

        {/* 9. CAD Stamp Watermark */}
        <text x="35" y="475" fill="#475569" fontSize="9" fontFamily="monospace">
          {`MONOCOQUE // ${chassisCode} // ISO 7200`}
        </text>
        <text x="765" y="475" fill="#475569" fontSize="9" fontFamily="monospace" textAnchor="end">
          EXPLODED 4-TIER KNOLLING
        </text>
      </svg>
    </div>
  );
}
