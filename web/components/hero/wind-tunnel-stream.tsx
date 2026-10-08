"use client";

import React from "react";

export function WindTunnelStream() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle aerodynamic trail gradients */}
          <linearGradient id="streamGradLime" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.05" />
            <stop offset="30%" stopColor="#D2FF00" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="streamGradCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.05" />
            <stop offset="35%" stopColor="#00E5FF" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.1" />
          </linearGradient>

          {/* Aerodynamic Soft Glow Filter */}
          <filter id="aeroGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 6 CONTINUOUS ULTRA-FINE DASHED VECTOR STREAMLINES */}
        <g fill="none" strokeLinecap="round" filter="url(#aeroGlow)">
          {/* Streamline 1: Upper Chamber Boundary Layer (Cyan) */}
          <path
            d="M -80 180 Q 480 170 960 185 T 1980 175"
            stroke="url(#streamGradCyan)"
            strokeWidth="1.2"
            opacity="0.18"
            className="animate-wind-stream-1"
          />

          {/* Streamline 2: High Airfoil Suction & Active Rear Wing Chord (Electric Lime) */}
          <path
            d="M -80 270 Q 520 260 1020 250 Q 1480 230 1720 215 Q 1840 220 1980 255"
            stroke="url(#streamGradLime)"
            strokeWidth="1.5"
            opacity="0.24"
            className="animate-wind-stream-2"
          />

          {/* Streamline 3: Cockpit Canopy & Roof Apex Flow (Cyan) */}
          <path
            d="M -80 390 Q 580 375 1060 345 Q 1280 340 1480 410 Q 1740 470 1980 480"
            stroke="url(#streamGradCyan)"
            strokeWidth="1.3"
            opacity="0.20"
            className="animate-wind-stream-3"
          />

          {/* Streamline 4: Waistline & Side Radiator Scoop Vortex (Electric Lime) */}
          <path
            d="M -80 520 Q 540 515 980 495 Q 1380 500 1620 540 Q 1800 565 1980 560"
            stroke="url(#streamGradLime)"
            strokeWidth="1.4"
            opacity="0.22"
            className="animate-wind-stream-4"
          />

          {/* Streamline 5: Front Fascia, Hood Extraction & Beltline (Cyan) */}
          <path
            d="M -80 635 Q 520 625 840 590 Q 1120 570 1460 630 Q 1760 670 1980 675"
            stroke="url(#streamGradCyan)"
            strokeWidth="1.3"
            opacity="0.19"
            className="animate-wind-stream-5"
          />

          {/* Streamline 6: Underfloor Venturi Ground Effect & Rear Diffuser Expansion (Electric Lime) */}
          <path
            d="M -80 820 Q 520 815 820 810 Q 1240 810 1560 800 Q 1760 760 1980 735"
            stroke="url(#streamGradLime)"
            strokeWidth="1.6"
            opacity="0.25"
            className="animate-wind-stream-6"
          />
        </g>
      </svg>
    </div>
  );
}

export default WindTunnelStream;
