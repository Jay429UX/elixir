"use client";

import { useState, useRef, useEffect } from "react";
import GameCard from "./GameCard";

interface Game {
  id: string;
  title: string;
  provider: string;
  image: string;
  isLive?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  players?: number;
}

interface GameRowProps {
  title: string;
  icon?: React.ReactNode;
  games: Game[];
  showViewAll?: boolean;
}

export default function GameRow({
  title,
  icon,
  games,
  showViewAll = true,
}: GameRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(7);

  // Calculate items per page based on container width
  useEffect(() => {
    const calculateItemsPerPage = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = 176; // w-44 = 11rem = 176px
        const gap = 16; // gap-4 = 1rem = 16px
        const items = Math.floor((containerWidth + gap) / (cardWidth + gap));
        setItemsPerPage(Math.max(1, items));
      }
    };

    calculateItemsPerPage();
    window.addEventListener("resize", calculateItemsPerPage);
    return () => window.removeEventListener("resize", calculateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(games.length / itemsPerPage);

  const scroll = (direction: "left" | "right") => {
    if (direction === "right") {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    } else {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && <span className="text-dicey-accent">{icon}</span>}
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {showViewAll && (
            <button className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              View All
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={currentPage === 0}
            className={`p-2 bg-dicey-card hover:bg-dicey-border border border-dicey-border rounded-lg transition-colors ${
              currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-3 h-3 text-gray-400 -rotate-90"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M6 9L1 4h10L6 9z" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={currentPage >= totalPages - 1}
            className={`p-2 bg-dicey-card hover:bg-dicey-border border border-dicey-border rounded-lg transition-colors ${
              currentPage >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-3 h-3 text-gray-400 rotate-90"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M6 9L1 4h10L6 9z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Games Container */}
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {/* Render all pages */}
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div
              key={pageIndex}
              className="flex gap-4 flex-shrink-0"
              style={{ width: "100%" }}
            >
              {games
                .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                .map((game) => (
                  <GameCard
                    key={game.id}
                    title={game.title}
                    provider={game.provider}
                    image={game.image}
                    isLive={game.isLive}
                    isNew={game.isNew}
                    isHot={game.isHot}
                    players={game.players}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
