"use client";

import React from "react";

export function HeroCadBackdrop() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover opacity-[0.11]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle Fine Coordinate Dot Grid */}
          <pattern id="heroCadSubGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="0.75" fill="#94A3B8" opacity="0.3" />
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#64748B" strokeWidth="0.5" strokeDasharray="1 5" opacity="0.15" />
          </pattern>

          {/* Linear Gradients for Structural Shading */}
          <linearGradient id="chassisGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#D2FF00" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="monocoqueFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* 1. Underlying CAD Micro Dot Grid */}
        <rect width="1920" height="1080" fill="url(#heroCadSubGrid)" />

        {/* 2. CAD STATION LINES (STA) - Vertical Engineering Datums */}
        <g stroke="#64748B" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.45" font-family="monospace" fontSize="9" fill="#94A3B8">
          {/* STA -200 (Front Splitter Edge) */}
          <line x1="580" y1="120" x2="580" y2="940" />
          <text x="585" y="140">STA -200 [SPLITTER]</text>
          <text x="585" y="930">STA -200</text>

          {/* STA 00 (Front Axle Centerline Datum) */}
          <line x1="840" y1="80" x2="840" y2="980" stroke="#D2FF00" strokeWidth="1" strokeDasharray="8 4" opacity="0.65" />
          <text x="845" y="100" fill="#D2FF00" fontWeight="bold">STA 00 [REF_DATUM_FRONT]</text>
          <text x="845" y="970" fill="#D2FF00">STA 00</text>

          {/* STA 500 (Forward Monocoque Bulkhead) */}
          <line x1="1040" y1="120" x2="1040" y2="940" />
          <text x="1045" y="140">STA 500 [FWD_BULKHEAD]</text>
          <text x="1045" y="930">STA 500</text>

          {/* STA 1200 (Cockpit Centerline / Roll Hoop) */}
          <line x1="1280" y1="80" x2="1280" y2="980" stroke="#00E5FF" strokeWidth="1" strokeDasharray="8 4" opacity="0.6" />
          <text x="1285" y="100" fill="#00E5FF" fontWeight="bold">STA 1200 [ROLL_HOOP_APEX]</text>
          <text x="1285" y="970" fill="#00E5FF">STA 1200</text>

          {/* STA 1800 (Rear Engine Firehead) */}
          <line x1="1500" y1="120" x2="1500" y2="940" />
          <text x="1505" y="140">STA 1800 [ENG_FIREWALL]</text>
          <text x="1505" y="930">STA 1800</text>

          {/* STA 2450 (Rear Axle Centerline Datum) */}
          <line x1="1720" y1="80" x2="1720" y2="980" stroke="#D2FF00" strokeWidth="1" strokeDasharray="8 4" opacity="0.65" />
          <text x="1600" y="100" fill="#D2FF00" fontWeight="bold">STA 2450 [REAR_AXLE_REF]</text>
          <text x="1600" y="970" fill="#D2FF00">STA 2450</text>
        </g>

        {/* 3. CAD WATERLINES (WL) - Horizontal Elevation Datums */}
        <g stroke="#64748B" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.45" font-family="monospace" fontSize="9" fill="#94A3B8">
          {/* WL 00 (Ground Reference Plane) */}
          <line x1="480" y1="860" x2="1860" y2="860" stroke="#00E5FF" strokeWidth="1" opacity="0.5" />
          <text x="500" y="852" fill="#00E5FF">WL 00 [GROUND_PLANE_REF]</text>

          {/* WL 180 (Chassis Underside / Venturi Troughs) */}
          <line x1="480" y1="780" x2="1860" y2="780" />
          <text x="500" y="772">WL 180 [VENTURI_FLOOR]</text>

          {/* WL 380 (Wheel Center Hub Axis) */}
          <line x1="480" y1="680" x2="1860" y2="680" stroke="#D2FF00" strokeWidth="0.9" strokeDasharray="6 3" opacity="0.5" />
          <text x="500" y="672" fill="#D2FF00">WL 380 [WHEEL_HUB_AXIS]</text>

          {/* WL 600 (Cockpit Sill / Beltline) */}
          <line x1="480" y1="520" x2="1860" y2="520" />
          <text x="500" y="512">WL 600 [BELTLINE_PLANE]</text>

          {/* WL 840 (Roof Canopy Height) */}
          <line x1="480" y1="360" x2="1860" y2="360" />
          <text x="500" y="352">WL 840 [CANOPY_ROOF_APEX]</text>

          {/* WL 1000 (Active Wing Chord Elevation) */}
          <line x1="1300" y1="240" x2="1860" y2="240" stroke="#D2FF00" strokeWidth="1" strokeDasharray="8 4" opacity="0.55" />
          <text x="1310" y="232" fill="#D2FF00">WL 1000 [DRS_WING_PLANE]</text>
        </g>

        {/* 4. COORDINATE CROSSHAIRS (+) WITH RETICLE LABELS */}
        <g stroke="#D2FF00" strokeWidth="1" opacity="0.7">
          {/* Crosshair 1: STA 00, WL 380 (Front Hub) */}
          <path d="M 830 680 L 850 680 M 840 670 L 840 690" />
          <circle cx="840" cy="680" r="3" fill="none" stroke="#D2FF00" strokeWidth="0.8" />
          <text x="852" y="676" fill="#D2FF00" font-family="monospace" fontSize="8">[STA 00, WL 380]</text>

          {/* Crosshair 2: STA 2450, WL 380 (Rear Hub) */}
          <path d="M 1710 680 L 1730 680 M 1720 670 L 1720 690" />
          <circle cx="1720" cy="680" r="3" fill="none" stroke="#D2FF00" strokeWidth="0.8" />
          <text x="1732" y="676" fill="#D2FF00" font-family="monospace" fontSize="8">[STA 2450, WL 380]</text>

          {/* Crosshair 3: STA 500, WL 600 (Firewall Joint) */}
          <path d="M 1030 520 L 1050 520 M 1040 510 L 1040 530" stroke="#00E5FF" />
          <text x="1052" y="516" fill="#00E5FF" font-family="monospace" fontSize="8">[STA 500, WL 600]</text>

          {/* Crosshair 4: STA 1200, WL 840 (Roof Center) */}
          <path d="M 1270 360 L 1290 360 M 1280 350 L 1280 370" stroke="#00E5FF" />
          <text x="1292" y="356" fill="#00E5FF" font-family="monospace" fontSize="8">[STA 1200, WL 840]</text>
        </g>

        {/* 5. ORTHOGRAPHIC MOTORSPORT CHASSIS & CARBON MONOCOQUE CUTAWAY WIREFRAME */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Carbon Monocoque Survival Tub (Mid-Chassis Safety Cell) */}
          <path
            d="M 940 500 L 1180 380 L 1380 380 L 1480 480 L 1520 660 L 1440 760 L 960 760 L 900 660 Z"
            fill="url(#monocoqueFillGrad)"
            stroke="#D2FF00"
            strokeWidth="1.8"
            opacity="0.85"
          />

          {/* Honeycomb Core Structural Lattice Ribs */}
          <path
            d="M 980 750 L 1060 620 L 1140 750 M 1140 750 L 1220 620 L 1300 750 M 1300 750 L 1380 620 L 1440 750"
            stroke="#D2FF00"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.4"
          />

          {/* Full Exterior Silhouette Profile (GT3 RS / Hypercar Aerodynamics) */}
          <path
            d="M 540 820 
               L 590 820 
               L 610 740 
               Q 660 700 720 700 
               L 780 700 
               Q 840 580 920 540 
               L 1100 480 
               Q 1180 350 1280 350 
               L 1360 350 
               Q 1460 380 1540 480 
               L 1680 540 
               Q 1720 560 1760 600 
               L 1820 620 
               L 1850 720 
               L 1740 760 
               L 1600 800 
               L 1420 820 
               L 920 820 
               L 800 820 
               Z"
            stroke="url(#chassisGrad)"
            strokeWidth="2.2"
            opacity="0.9"
          />

          {/* Front Carbon Splitter & Underbody Venturi Plane */}
          <path d="M 510 830 L 640 830 L 660 815 L 530 815 Z" stroke="#00E5FF" strokeWidth="1.5" fill="#00E5FF" fillOpacity="0.05" />
          <line x1="510" y1="815" x2="510" y2="780" stroke="#00E5FF" strokeWidth="1.2" />
          <line x1="530" y1="815" x2="540" y2="780" stroke="#00E5FF" strokeWidth="0.8" />

          {/* Front Wheel Arch & Center-Lock Wheel Wireframe */}
          <circle cx="840" cy="680" r="140" stroke="#64748B" strokeWidth="1.2" opacity="0.6" strokeDasharray="6 3" />
          <circle cx="840" cy="680" r="110" stroke="#94A3B8" strokeWidth="1.5" opacity="0.75" />
          <circle cx="840" cy="680" r="75" stroke="#D2FF00" strokeWidth="1.2" opacity="0.8" strokeDasharray="4 2" />
          <circle cx="840" cy="680" r="28" stroke="#D2FF00" strokeWidth="2" fill="#080C14" />
          {/* Rotor Ventilation Slots & Caliper */}
          <path d="M 800 630 Q 820 620 850 630 L 860 660 L 810 660 Z" stroke="#00E5FF" strokeWidth="1.5" fill="#00E5FF" fillOpacity="0.15" />

          {/* Rear Wheel Arch & Center-Lock Wheel Wireframe */}
          <circle cx="1720" cy="680" r="148" stroke="#64748B" strokeWidth="1.2" opacity="0.6" strokeDasharray="6 3" />
          <circle cx="1720" cy="680" r="118" stroke="#94A3B8" strokeWidth="1.5" opacity="0.75" />
          <circle cx="1720" cy="680" r="82" stroke="#D2FF00" strokeWidth="1.2" opacity="0.8" strokeDasharray="4 2" />
          <circle cx="1720" cy="680" r="30" stroke="#D2FF00" strokeWidth="2" fill="#080C14" />
          {/* Rear Brake Caliper */}
          <path d="M 1680 630 Q 1700 620 1730 630 L 1740 660 L 1690 660 Z" stroke="#00E5FF" strokeWidth="1.5" fill="#00E5FF" fillOpacity="0.15" />

          {/* Front Double-Wishbone & Pushrod Suspension Linkages */}
          <g stroke="#00E5FF" strokeWidth="1.2" opacity="0.7">
            <line x1="840" y1="640" x2="940" y2="580" />
            <line x1="840" y1="720" x2="940" y2="740" />
            <line x1="840" y1="680" x2="970" y2="540" stroke="#D2FF00" strokeWidth="1.5" />
            <circle cx="970" cy="540" r="4" fill="#D2FF00" />
            <text x="980" y="540" fill="#D2FF00" font-family="monospace" fontSize="8">[PUSHROD_PIVOT]</text>
          </g>

          {/* Rear Multi-Link Subframe & Inboard Damper Geometry */}
          <g stroke="#00E5FF" strokeWidth="1.2" opacity="0.7">
            <line x1="1720" y1="640" x2="1620" y2="580" />
            <line x1="1720" y1="720" x2="1620" y2="740" />
            <line x1="1720" y1="680" x2="1580" y2="560" stroke="#D2FF00" strokeWidth="1.5" />
            <circle cx="1580" cy="560" r="4" fill="#D2FF00" />
            <text x="1490" y="560" fill="#D2FF00" font-family="monospace" fontSize="8">[REAR_BELLCRANK]</text>
          </g>

          {/* Mid-Rear Powertrain Cutaway: 4.0L Flat-6 Block & Transaxle */}
          <g stroke="#FF8000" strokeWidth="1.2" opacity="0.75">
            <rect x="1440" y="620" width="140" height="90" rx="4" fill="#FF8000" fillOpacity="0.04" />
            <ellipse cx="1480" cy="650" rx="14" ry="7" strokeDasharray="2 2" />
            <ellipse cx="1510" cy="650" rx="14" ry="7" strokeDasharray="2 2" />
            <ellipse cx="1540" cy="650" rx="14" ry="7" strokeDasharray="2 2" />
            {/* Transaxle Housing behind rear axle */}
            <path d="M 1580 650 L 1680 650 L 1690 710 L 1580 710 Z" stroke="#00E5FF" />
            <text x="1445" y="612" fill="#FF8000" font-family="monospace" fontSize="8">MA1.77 4.0L FLAT-6 // PDK TRANSAXLE</text>
          </g>

          {/* Swan-Neck Active Rear Wing Assembly */}
          <g opacity="0.95">
            {/* Swan-Neck Pylon Support Truss */}
            <path d="M 1620 540 Q 1660 380 1720 250" stroke="#00E5FF" strokeWidth="2.2" />
            <path d="M 1640 550 Q 1680 400 1730 255" stroke="#00E5FF" strokeWidth="1.2" opacity="0.6" strokeDasharray="4 2" />

            {/* High-Downforce Cambered Airfoil Chord */}
            <path
              d="M 1660 230 Q 1780 200 1860 220 Q 1880 235 1840 245 Q 1760 240 1660 230 Z"
              stroke="#D2FF00"
              strokeWidth="2.4"
              fill="#D2FF00"
              fillOpacity="0.1"
            />
            {/* Articulated Active DRS Flap */}
            <line x1="1830" y1="225" x2="1875" y2="195" stroke="#FF8000" strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="1830" cy="225" r="3" fill="#FF8000" />
            <text x="1750" y="190" fill="#FF8000" font-family="monospace" fontSize="9" fontWeight="bold">ACTIVE DRS FLAP [34° DEPLOYED]</text>
          </g>

          {/* Rear Underbody Venturi Diffuser Ramps & Vertical Strakes */}
          <g stroke="#00E5FF" strokeWidth="1.6" opacity="0.8">
            <path d="M 1540 820 L 1840 760 L 1860 790 L 1560 840 Z" fill="#00E5FF" fillOpacity="0.06" />
            <line x1="1620" y1="805" x2="1630" y2="835" />
            <line x1="1700" y1="790" x2="1715" y2="820" />
            <line x1="1780" y1="775" x2="1795" y2="805" />
            <text x="1640" y="855" fill="#00E5FF" font-family="monospace" fontSize="8">14° VENTURI DIFFUSER // EXPANSION TUNNEL</text>
          </g>
        </g>

        {/* 6. TECHNICAL DIMENSIONING CALLOUTS & EXTENTS */}
        <g stroke="#94A3B8" strokeWidth="0.9" font-family="monospace" fontSize="9" fill="#94A3B8" opacity="0.65">
          {/* Wheelbase Dimension Line */}
          <line x1="840" y1="890" x2="1720" y2="890" stroke="#D2FF00" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="840" y1="875" x2="840" y2="905" stroke="#D2FF00" strokeWidth="1.5" />
          <line x1="1720" y1="875" x2="1720" y2="905" stroke="#D2FF00" strokeWidth="1.5" />
          <text x="1200" y="884" fill="#D2FF00" textAnchor="middle" fontWeight="bold">
            ⟵ WHEELBASE DATUM: 2,457.0 MM (±0.05 MM) ⟶
          </text>

          {/* Overall Chassis Span */}
          <line x1="510" y1="930" x2="1860" y2="930" stroke="#00E5FF" strokeWidth="1.2" />
          <line x1="510" y1="915" x2="510" y2="945" stroke="#00E5FF" strokeWidth="1.5" />
          <line x1="1860" y1="915" x2="1860" y2="945" stroke="#00E5FF" strokeWidth="1.5" />
          <text x="1185" y="924" fill="#00E5FF" textAnchor="middle" fontWeight="bold">
            ⟵ TOTAL HOMOLOGATED SPAN: 4,572.0 MM ⟶
          </text>
        </g>

        {/* 7. ISO-7200 TITLE BLOCK IN BOTTOM-RIGHT OF BLUEPRINT */}
        <g transform="translate(1420, 960)" opacity="0.6">
          <rect width="440" height="75" fill="#060910" stroke="#1E293B" strokeWidth="1" rx="3" />
          <line x1="0" y1="25" x2="440" y2="25" stroke="#1E293B" strokeWidth="1" />
          <line x1="0" y1="50" x2="440" y2="50" stroke="#1E293B" strokeWidth="1" />
          <line x1="220" y1="0" x2="220" y2="50" stroke="#1E293B" strokeWidth="1" />

          <text x="10" y="16" fill="#64748B" font-family="monospace" fontSize="8">DRAWING CLASSIFICATION</text>
          <text x="10" y="40" fill="#FFFFFF" font-family="monospace" fontSize="10" fontWeight="bold">CAD-CHASSIS-992-GT3-RS</text>

          <text x="230" y="16" fill="#64748B" font-family="monospace" fontSize="8">ENGINEERING STANDARD</text>
          <text x="230" y="40" fill="#D2FF00" font-family="monospace" fontSize="10" fontWeight="bold">ISO 7200 // CLASS-A AEROSPACE</text>

          <text x="10" y="66" fill="#64748B" font-family="monospace" fontSize="8">SKUNKWORKS DYNAMICS LAB • SCALE 1:1</text>
          <text x="230" y="66" fill="#00E5FF" font-family="monospace" fontSize="8">TORSIONAL RIGIDITY: 42,000 NM/DEG</text>
        </g>
      </svg>
    </div>
  );
}

export default HeroCadBackdrop;
