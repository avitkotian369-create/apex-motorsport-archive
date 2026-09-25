"use client";

import React from "react";
import Link from "next/link";
import { Layers, Box } from "lucide-react";

interface NavbarProps {
  currentCarSlug?: string;
}

export function Navbar({ currentCarSlug }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#08090C]/95 backdrop-blur-xl border-b border-[#1A1E29] transition-all overflow-hidden no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 overflow-visible">
        {/* Brand identity: MONOCOQUE // Automotive Anatomy Archive */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer shrink-0 overflow-visible select-none">
          <div className="w-9 h-9 shrink-0 rounded-lg bg-[#D2FF00] flex items-center justify-center text-black font-mono font-black text-sm tracking-tighter shadow-[0_0_15px_rgba(210,255,0,0.4)] group-hover:scale-105 transition-transform overflow-hidden">
            MQ
          </div>
          <div className="flex flex-col justify-center overflow-visible">
            <div className="flex items-center gap-2 overflow-visible">
              <span className="font-mono font-black tracking-wider text-sm sm:text-base text-white group-hover:text-[#D2FF00] transition-colors leading-none">
                MONOCOQUE
              </span>
              <span className="text-[#3A475C] font-mono text-xs hidden sm:inline leading-none">{"//"}</span>
              <span className="font-mono text-xs text-[#A6B2C4] uppercase tracking-wider hidden sm:inline leading-none">
                Automotive Anatomy Archive
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#637085] hidden md:block mt-1 leading-none">
              Interactive Knolling & Exploded Parts Catalog
            </span>
          </div>
        </Link>

        {/* Navigation & Telemetry Badges */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <Link
            href="/"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#222838] bg-[#0E121B] text-[#A6B2C4] hover:border-[#D2FF00]/50 hover:text-[#D2FF00] transition-colors cursor-pointer"
          >
            <Box className="w-3.5 h-3.5 text-[#D2FF00]" />
            <span>ROSTER CATALOG</span>
          </Link>

          <Link
            href={currentCarSlug ? `/car/${currentCarSlug}` : "/car/porsche-911-gt3-rs"}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#222838] bg-[#0E121B] text-[#A6B2C4] hover:border-[#FF8000]/50 hover:text-[#FF8000] transition-colors cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-[#FF8000]" />
            <span>KNOLLING VIEWPORT</span>
          </Link>

          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#10141E] border border-[#1E2433] text-[11px] text-[#8A95A8]">
            <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-ping" />
            <span className="font-bold text-white">6 HOMOLOGATED</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
