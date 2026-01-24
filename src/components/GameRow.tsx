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
  onGameSelect?: (game: Game) => void;
}

export default function GameRow({
  title,
  icon,
  games,
  showViewAll = true,
  onGameSelect,
}: GameRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(7);
  const [cardWidth, setCardWidth] = useState(176);
  const gap = 16; // gap-4 = 1rem = 16px

  // Calculate cards per view and card width based on container width
  useEffect(() => {
    const calculateLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const minCardWidth = 160;
        const maxCardWidth = 200;

        // Calculate how many cards can fit
        let numCards = Math.floor((containerWidth + gap) / (minCardWidth + gap));
        numCards = Math.max(3, Math.min(numCards, 10)); // Between 3 and 10 cards

        // Calculate exact card width to fill container
        const exactCardWidth = (containerWidth - (numCards - 1) * gap) / numCards;
        const finalCardWidth = Math.min(maxCardWidth, Math.max(minCardWidth, exactCardWidth));

        setCardsPerView(numCards);
        setCardWidth(finalCardWidth);

        // Calculate max scroll
        const totalWidth = games.length * finalCardWidth + (games.length - 1) * gap;
        setMaxScroll(Math.max(0, totalWidth - containerWidth));
      }
    };

    calculateLayout();
    window.addEventListener("resize", calculateLayout);

    // Use ResizeObserver to detect container size changes (e.g., when chat opens/closes)
    const resizeObserver = new ResizeObserver(calculateLayout);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", calculateLayout);
      resizeObserver.disconnect();
    };
  }, [games.length]);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = (cardWidth + gap) * cardsPerView; // Scroll one full view
    if (direction === "right") {
      setScrollPosition((prev) => Math.min(prev + scrollAmount, maxScroll));
    } else {
      setScrollPosition((prev) => Math.max(prev - scrollAmount, 0));
    }
  };

  return (
    <section className="mb-6">
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

        <div className="flex items-center gap-1.5">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            disabled={scrollPosition === 0}
            className={`size-7 flex items-center justify-center bg-dicey-card hover:bg-dicey-border border border-dicey-border rounded-md transition-colors ${
              scrollPosition === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-3 h-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={scrollPosition >= maxScroll}
            className={`size-7 flex items-center justify-center bg-dicey-card hover:bg-dicey-border border border-dicey-border rounded-md transition-colors ${
              scrollPosition >= maxScroll ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg
              className="w-3 h-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Games Container */}
      <div ref={containerRef} className="overflow-hidden -mx-2 px-2">
        <div
          className="flex transition-transform duration-500 ease-out py-2"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            gap: `${gap}px`,
          }}
        >
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              provider={game.provider}
              image={game.image}
              isLive={game.isLive}
              isNew={game.isNew}
              isHot={game.isHot}
              players={game.players}
              width={cardWidth}
              onPlay={() => onGameSelect?.(game)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
