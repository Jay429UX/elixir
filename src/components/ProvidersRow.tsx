"use client";

import { useState, useRef, useEffect } from "react";

interface Provider {
  id: string;
  name: string;
  logo: string;
  gameCount?: number;
}

interface ProvidersRowProps {
  title: string;
  icon?: React.ReactNode;
  providers: Provider[];
  showViewAll?: boolean;
}

export default function ProvidersRow({
  title,
  icon,
  providers,
  showViewAll = true,
}: ProvidersRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(6);
  const [cardWidth, setCardWidth] = useState(180);
  const gap = 16;

  const syncScrollState = () => {
    const el = containerRef.current;
    if (!el) return;
    setScrollPosition(el.scrollLeft);
    setMaxScroll(Math.max(0, el.scrollWidth - el.clientWidth));
  };

  useEffect(() => {
    const calculateLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;

        if (containerWidth < 520) {
          const mobileCardWidth = Math.max(132, Math.min(160, Math.floor((containerWidth - 1.25 * gap) / 2.25)));
          setCardsPerView(2);
          setCardWidth(mobileCardWidth);
        } else {
          const minCardWidth = 140;
          const maxCardWidth = 200;

          let numCards = Math.floor((containerWidth + gap) / (minCardWidth + gap));
          numCards = Math.max(3, Math.min(numCards, 8));

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
    const resizeObserver = new ResizeObserver(calculateLayout);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => {
      window.removeEventListener("resize", calculateLayout);
      resizeObserver.disconnect();
    };
  }, [providers.length]);

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
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
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
            disabled={!canScrollRight}
            aria-label="Scroll right"
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

      {/* Providers Container: native touch swipe + snap */}
      <div
        ref={containerRef}
        onScroll={syncScrollState}
        className="hide-scrollbar flex flex-nowrap snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth"
        style={{ gap: `${gap}px` }}
      >
        {providers.map((provider) => (
          <button
            key={provider.id}
            className="group snap-start flex flex-col items-center justify-center gap-3 p-5 sm:p-6 bg-dicey-card rounded-xl hover:bg-dicey-border/50 transition-all duration-200 shrink-0"
            style={{ width: cardWidth, height: cardWidth * 0.85 }}
          >
            <img
              src={provider.logo}
              alt={provider.name}
              className="h-16 sm:h-20 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-200"
            />
            {provider.gameCount !== undefined && (
              <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                {provider.gameCount} games
              </span>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
