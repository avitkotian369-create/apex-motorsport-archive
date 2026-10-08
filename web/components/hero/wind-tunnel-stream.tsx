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
          {/* Subtle aerodynamic streamline gradients */}
          <linearGradient id="streamGradLime" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D2FF00" stopOpacity="0.05" />
            <stop offset="35%" stopColor="#D2FF00" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#D2FF00" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="streamGradCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.05" />
            <stop offset="35%" stopColor="#00E5FF" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.95" />
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

        {/* 4 FLOWING FINE BÉZIER STREAMLINES MOVING LEFT TO RIGHT */}
        <g fill="none" strokeLinecap="round" filter="url(#aeroGlow)">
          {/* Streamline 1: High Canopy Flow (Cyan, Opacity 20%) */}
          <path
            d="M -80 260 C 480 230, 960 210, 1380 200 C 1580 195, 1780 210, 2020 250"
            stroke="url(#streamGradCyan)"
            strokeWidth="1.3"
            opacity="0.20"
            className="animate-wind-stream-1"
          />

          {/* Streamline 2: Active Rear Wing & Airfoil Suction (#D2FF00, Opacity 20%) */}
          <path
            d="M -80 390 C 540 370, 1020 330, 1440 350 C 1660 360, 1820 310, 2020 340"
            stroke="url(#streamGradLime)"
            strokeWidth="1.5"
            opacity="0.20"
            className="animate-wind-stream-2"
          />

          {/* Streamline 3: Waistline Side-Scoop Vortex (Cyan, Opacity 20%) */}
          <path
            d="M -80 540 C 480 530, 940 500, 1360 520 C 1620 535, 1820 560, 2020 550"
            stroke="url(#streamGradCyan)"
            strokeWidth="1.4"
            opacity="0.20"
            className="animate-wind-stream-3"
          />

          {/* Streamline 4: Underbody Venturi Ground Effect (#D2FF00, Opacity 20%) */}
          <path
            d="M -80 800 C 520 790, 960 790, 1380 780 C 1640 760, 1840 710, 2020 680"
            stroke="url(#streamGradLime)"
            strokeWidth="1.6"
            opacity="0.20"
            className="animate-wind-stream-4"
          />
        </g>
      </svg>
    </div>
  );
}

export default WindTunnelStream;
