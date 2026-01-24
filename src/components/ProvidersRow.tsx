"use client";

import { useState, useRef, useEffect } from "react";

interface Provider {
  id: string;
  name: string;
  logo: string;
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

  useEffect(() => {
    const calculateLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const minCardWidth = 140;
        const maxCardWidth = 200;

        let numCards = Math.floor((containerWidth + gap) / (minCardWidth + gap));
        numCards = Math.max(3, Math.min(numCards, 8));

        const exactCardWidth = (containerWidth - (numCards - 1) * gap) / numCards;
        const finalCardWidth = Math.min(maxCardWidth, Math.max(minCardWidth, exactCardWidth));

        setCardsPerView(numCards);
        setCardWidth(finalCardWidth);

        const totalWidth = providers.length * finalCardWidth + (providers.length - 1) * gap;
        setMaxScroll(Math.max(0, totalWidth - containerWidth));
      }
    };

    calculateLayout();
    window.addEventListener("resize", calculateLayout);
    return () => window.removeEventListener("resize", calculateLayout);
  }, [providers.length]);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = (cardWidth + gap) * cardsPerView;
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
          <button
            onClick={() => scroll("left")}
            disabled={scrollPosition === 0}
            aria-label="Scroll left"
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
            aria-label="Scroll right"
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

      {/* Providers Container */}
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex flex-nowrap transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${scrollPosition}px)`,
            gap: `${gap}px`,
          }}
        >
          {providers.map((provider) => (
            <button
              key={provider.id}
              className="group flex items-center justify-center p-6 bg-dicey-card border border-dicey-border rounded-xl hover:border-white/20 hover:bg-dicey-border/50 transition-all duration-200 shrink-0"
              style={{ width: cardWidth, height: cardWidth * 0.6 }}
            >
              <img
                src={provider.logo}
                alt={provider.name}
                className="h-10 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-200"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
