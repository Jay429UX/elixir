"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GameFiltersProps {
  onSortChange?: (sort: string) => void;
}

const sortOptions = [
  { id: "default", label: "Default", icon: "↺" },
  { id: "popularity-desc", label: "Most Popular", icon: "🔥" },
  { id: "popularity-asc", label: "Least Popular", icon: "📉" },
  { id: "newest", label: "Newest First", icon: "✨" },
  { id: "oldest", label: "Oldest First", icon: "📅" },
  { id: "a-z", label: "A → Z", icon: "🔤" },
  { id: "z-a", label: "Z → A", icon: "🔤" },
];

const categories = [
  { id: "all", label: "All Games" },
  { id: "slots", label: "Slots" },
  { id: "live", label: "Live Casino" },
  { id: "table", label: "Table Games" },
  { id: "jackpot", label: "Jackpots" },
  { id: "new", label: "New" },
];

export default function GameFilters({ onSortChange }: GameFiltersProps) {
  const [activeSort, setActiveSort] = useState("default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSortChange = (sortId: string) => {
    setActiveSort(sortId);
    setIsSortDropdownOpen(false);
    onSortChange?.(sortId);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const selectedSortLabel = sortOptions.find(s => s.id === activeSort)?.label || "Default";

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                activeCategory === category.id
                  ? "bg-white text-black"
                  : "bg-dicey-card border border-dicey-border text-gray-400 hover:text-white hover:border-gray-500"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-dicey-card border border-dicey-border rounded-xl text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
          >
            <svg className="size-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            <span>Sort: {selectedSortLabel}</span>
            <svg
              className={cn("size-4 text-gray-500 transition-transform", isSortDropdownOpen && "rotate-180")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isSortDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsSortDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-dicey-card border border-dicey-border rounded-xl shadow-xl z-20 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2",
                      activeSort === option.id
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-dicey-border/50 hover:text-white"
                    )}
                  >
                    <span className="text-xs">{option.icon}</span>
                    <span>{option.label}</span>
                    {activeSort === option.id && (
                      <svg className="size-4 ml-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
