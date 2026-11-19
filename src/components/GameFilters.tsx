"use client";

import { useState } from "react";
import {
  BiSolidDiamond,
  BiSolidGame,
  BiSolidGridAlt,
  BiSolidPurchaseTag,
  BiSolidTrophy,
  BiSolidVideo,
} from "react-icons/bi";
import { cn } from "@/lib/utils";

interface GameFiltersProps {
  onSortChange?: (sort: string) => void;
  onCategoryChange?: (category: string) => void;
}

const sortOptions = [
  { id: "default", label: "Default" },
  { id: "popularity-desc", label: "Most Popular" },
  { id: "popularity-asc", label: "Least Popular" },
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
  { id: "a-z", label: "A → Z" },
  { id: "z-a", label: "Z → A" },
];

const categories = [
  {
    id: "all",
    label: "All Games",
    icon: <BiSolidGridAlt className="size-5" />,
  },
  {
    id: "slots",
    label: "Slots",
    icon: <BiSolidDiamond className="size-5" />,
  },
  {
    id: "live",
    label: "Live Casino",
    icon: <BiSolidVideo className="size-5" />,
  },
  {
    id: "table",
    label: "Table Games",
    icon: <BiSolidGame className="size-5" />,
  },
  {
    id: "jackpot",
    label: "Jackpots",
    icon: <BiSolidTrophy className="size-5" />,
  },
  {
    id: "new",
    label: "New Releases",
    icon: <BiSolidPurchaseTag className="size-5" />,
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
            aria-label={`Filter games: ${selectedCategory?.label}`}
            aria-haspopup="menu"
            aria-expanded={isCategoryDropdownOpen}
            title={`Filter: ${selectedCategory?.label}`}
            className="relative flex items-center gap-2 px-3.5 py-2.5 bg-dicey-card rounded-xl text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span className="text-gray-400">{selectedCategory?.icon}</span>
            {activeCategory !== "all" && <span aria-hidden="true" className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-lime-300" />}
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
              <div className="absolute left-0 top-full mt-2 w-48 bg-dicey-card rounded-xl shadow-xl z-20 overflow-hidden">
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
            aria-label={`Sort games: ${selectedSortLabel}`}
            aria-haspopup="menu"
            aria-expanded={isSortDropdownOpen}
            title={`Sort: ${selectedSortLabel}`}
            className="relative flex items-center gap-2 px-3.5 py-2.5 bg-dicey-card rounded-xl text-sm text-gray-300 hover:text-white transition-colors"
          >
            <svg className="size-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            {activeSort !== "default" && <span aria-hidden="true" className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-lime-300" />}
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
              <div className="absolute right-0 top-full mt-2 w-48 bg-dicey-card rounded-xl shadow-xl z-20 overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center",
                      activeSort === option.id
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-dicey-border/50 hover:text-white"
                    )}
                  >
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
