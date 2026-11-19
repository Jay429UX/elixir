"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import GameCard from "./GameCard";

export interface Game {
  id: string;
  title: string;
  provider: string;
  image: string;
  category?: "slots" | "live" | "table" | "jackpot" | "new";
  isLive?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  isOriginal?: boolean;
  players?: number;
  rtp?: number;
}

interface GameRowProps {
  title: string;
  icon?: React.ReactNode;
  games: Game[];
  showViewAll?: boolean;
  onGameSelect?: (game: Game) => void;
  useRouterNavigation?: boolean;
}

export default function GameRow({
  title,
  icon,
  games,
  showViewAll = true,
  onGameSelect,
  useRouterNavigation = false,
}: GameRowProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(7);
  const [cardWidth, setCardWidth] = useState(176);
  const gap = 16; // gap-4 = 1rem = 16px

  const syncScrollState = () => {
    const el = containerRef.current;
    if (!el) return;
    setScrollPosition(el.scrollLeft);
    setMaxScroll(Math.max(0, el.scrollWidth - el.clientWidth));
  };

  // Calculate cards per view and card width based on container width
  useEffect(() => {
    const calculateLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;

        if (containerWidth < 520) {
          // On compact mobile screens show 2 full cards + a peek of the 3rd for natural horizontal swiping
          const mobileCardWidth = Math.max(136, Math.min(168, Math.floor((containerWidth - 1.25 * gap) / 2.25)));
          setCardsPerView(2);
          setCardWidth(mobileCardWidth);
        } else {
          const minCardWidth = 160;
          const maxCardWidth = 200;

          let numCards = Math.floor((containerWidth + gap) / (minCardWidth + gap));
          numCards = Math.max(3, Math.min(numCards, 10));

          const exactCardWidth = (containerWidth - (numCards - 1) * gap) / numCards;
          const finalCardWidth = Math.min(maxCardWidth, Math.max(minCardWidth, exactCardWidth));

          setCardsPerView(numCards);
          setCardWidth(finalCardWidth);
        }

        requestAnimationFrame(syncScrollState);
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
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = (cardWidth + gap) * cardsPerView;
    el.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const canScrollLeft = scrollPosition > 4;
  const canScrollRight = scrollPosition < maxScroll - 4;
  const edgeMask = `linear-gradient(to right, ${canScrollLeft ? "transparent 0, black 28px" : "black 0"}, black calc(100% - ${canScrollRight ? 28 : 0}px), ${canScrollRight ? "transparent 100%" : "black 100%"})`;

  return (
    <section id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} tabIndex={-1} className="mb-9 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2.5">
          {icon && <span className="text-dicey-accent">{icon}</span>}
          <h2 className="text-lg font-semibold tracking-[-0.02em] leading-6 text-white">{title}</h2>
          {showViewAll && (
            <button className="text-sm text-gray-400 hover:text-white font-medium transition-colors">
              View All
            </button>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            aria-label={`Previous ${title.toLowerCase()}`}
            disabled={!canScrollLeft}
            className={`size-8 sm:size-7 flex items-center justify-center bg-dicey-card hover:bg-dicey-border rounded-md transition-colors ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
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
            aria-label={`Next ${title.toLowerCase()}`}
            disabled={!canScrollRight}
            className={`size-8 sm:size-7 flex items-center justify-center bg-dicey-card hover:bg-dicey-border rounded-md transition-colors ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
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

      {/* Games Container: native horizontal swipe + snap on touch, arrow controls on desktop */}
      <div className="relative -mx-2 px-2" style={{ maskImage: edgeMask, WebkitMaskImage: edgeMask }}>
        <div
          ref={containerRef}
          onScroll={syncScrollState}
          className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth py-2"
          style={{ gap: `${gap}px` }}
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
              isOriginal={game.isOriginal}
              players={game.players}
              rtp={game.rtp}
              width={cardWidth}
              className="snap-start"
              onPlay={() => {
                if (useRouterNavigation) {
                  router.push(`/game/${game.id}`);
                } else {
                  onGameSelect?.(game);
                }
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
