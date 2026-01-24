"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface GameFiltersProps {
  onSortChange?: (sort: string) => void;
  onCategoryChange?: (category: string) => void;
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
  {
    id: "all",
    label: "All Games",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    id: "slots",
    label: "Slots",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z" />
      </svg>
    ),
  },
  {
    id: "live",
    label: "Live Casino",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    id: "table",
    label: "Table Games",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M8 8h2v8H8zM14 8h2v8h-2z" />
      </svg>
    ),
  },
  {
    id: "jackpot",
    label: "Jackpots",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: "new",
    label: "New Releases",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="7" cy="7" r="1.5" />
      </svg>
    ),
  },
];

export default function GameFilters({ onSortChange, onCategoryChange }: GameFiltersProps) {
  const [activeSort, setActiveSort] = useState("default");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSortChange = (sortId: string) => {
    setActiveSort(sortId);
    setIsSortDropdownOpen(false);
    onSortChange?.(sortId);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setIsCategoryDropdownOpen(false);
    onCategoryChange?.(categoryId);
  };

  const selectedSortLabel = sortOptions.find(s => s.id === activeSort)?.label || "Default";
  const selectedCategory = categories.find(c => c.id === activeCategory);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-dicey-card border border-dicey-border rounded-xl text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
          >
            <span className="text-gray-400">{selectedCategory?.icon}</span>
            <span>{selectedCategory?.label}</span>
            <svg
              className={cn("size-4 text-gray-500 transition-transform", isCategoryDropdownOpen && "rotate-180")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Category Dropdown Menu */}
          {isCategoryDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsCategoryDropdownOpen(false)}
              />
              <div className="absolute left-0 top-full mt-2 w-48 bg-dicey-card border border-dicey-border rounded-xl shadow-xl z-20 overflow-hidden">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center gap-2",
                      activeCategory === category.id
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-dicey-border/50 hover:text-white"
                    )}
                  >
                    <span className="text-gray-400">{category.icon}</span>
                    <span>{category.label}</span>
                    {activeCategory === category.id && (
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

        {/* Spacer */}
        <div className="flex-1" />

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
