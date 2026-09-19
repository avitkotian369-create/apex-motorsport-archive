"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, Layers, ChevronRight, Check } from "lucide-react";
import { BrandItem, CarSummary } from "@/lib/api";

interface DirectoryProps {
  brands: BrandItem[];
  cars: CarSummary[];
  selectedCarId: number;
  onSelectCar: (carId: number) => void;
  activePortal: "cars" | "bikes";
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Directory({
  brands,
  cars,
  selectedCarId,
  onSelectCar,
}: DirectoryProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);

  // Filter cars based on search, selected letter, and brand
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      // Find parent brand
      const brand = brands.find((b) => b.id === car.brand_id);
      const brandName = brand?.name || "";
      const fullName = `${brandName} ${car.model} ${car.trim || ""}`.toLowerCase();

      // Text search match
      if (searchQuery.trim() && !fullName.includes(searchQuery.toLowerCase().trim())) {
        return false;
      }

      // Letter filter match (matches brand first letter)
      if (selectedLetter && !brandName.toUpperCase().startsWith(selectedLetter)) {
        return false;
      }

      // Brand filter match
      if (selectedBrandId && car.brand_id !== selectedBrandId) {
        return false;
      }

      return true;
    });
  }, [cars, brands, searchQuery, selectedLetter, selectedBrandId]);

  return (
    <div className="space-y-6">
      {/* Directory Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Global Model & Blueprint Directory
          </h2>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Explore factory OEM engineering schematics and fastener specifications.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search model, trim, or brand..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>
      </div>

      {/* A-Z Letter Filter Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-none">
        <button
          onClick={() => setSelectedLetter(null)}
          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors shrink-0 ${
            selectedLetter === null
              ? "bg-cyan-500 text-slate-950 font-bold"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          ALL
        </button>
        {ALPHABET.map((letter) => {
          const hasBrand = brands.some((b) => b.name.toUpperCase().startsWith(letter));
          return (
            <button
              key={letter}
              onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
              disabled={!hasBrand}
              className={`px-2 py-1 rounded-lg text-xs font-mono font-medium transition-colors shrink-0 ${
                selectedLetter === letter
                  ? "bg-cyan-500 text-slate-950 font-bold"
                  : hasBrand
                  ? "text-slate-300 hover:text-white hover:bg-slate-800"
                  : "text-slate-700 cursor-not-allowed"
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Brand Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-500 flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3" /> Brand:
        </span>
        <button
          onClick={() => setSelectedBrandId(null)}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            selectedBrandId === null
              ? "bg-slate-800 text-cyan-400 border border-cyan-500/30"
              : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
          }`}
        >
          All Brands ({brands.length})
        </button>
        {brands.map((brand) => (
          <button
            key={brand.id}
            onClick={() => setSelectedBrandId(selectedBrandId === brand.id ? null : brand.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              selectedBrandId === brand.id
                ? "bg-slate-800 text-cyan-400 border border-cyan-500/30"
                : "bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white"
            }`}
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCars.map((car) => {
          const brand = brands.find((b) => b.id === car.brand_id);
          const isSelected = car.id === selectedCarId;

          return (
            <div
              key={car.id}
              onClick={() => onSelectCar(car.id)}
              className={`group relative overflow-hidden rounded-xl border transition-all cursor-pointer p-5 flex flex-col justify-between ${
                isSelected
                  ? "bg-[#0d0e12] border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                  : "bg-[#08090b] border-slate-800/80 hover:border-slate-700 hover:bg-[#0d0e12]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
                    {brand?.name} • {car.year}
                  </span>
                  {isSelected && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> ACTIVE INSPECTOR
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {car.model}
                  </h3>
                  {car.trim && (
                    <p className="text-xs text-slate-400 font-sans mt-0.5">{car.trim}</p>
                  )}
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/80">
                  <span>VIN Prefix: {car.vin_prefix || "N/A"}</span>
                  <span className="text-slate-400 group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                    Inspect Schematics <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCars.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 font-mono text-xs">
            No models matched the current filter. Try resetting search or brand filters.
          </div>
        )}
      </div>
    </div>
  );
}
