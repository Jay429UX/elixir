"use client";

import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  provider: string;
  image: string;
  isLive?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  isOriginal?: boolean;
  players?: number;
  rtp?: number;
  width?: number;
  className?: string;
  onPlay?: () => void;
}

const statusPillClass = "inline-flex w-fit items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-3 tracking-[0.03em]";

export default function GameCard({
  title,
  provider,
  image,
  isLive,
  isNew,
  isHot,
  isOriginal,
  players,
  rtp,
  width,
  className,
  onPlay,
}: GameCardProps) {

  return (
    <div
      className={cn("group relative flex-shrink-0 cursor-pointer", className)}
      style={{ width: width ? `${width}px` : '176px' }}
      onClick={onPlay}
    >
      {/* Game Image */}
      <div
        className="relative aspect-[3/4] rounded-xl overflow-hidden bg-dicey-card"
        style={{
          border: '1px solid rgba(196, 181, 253, 0.1)',
        }}
      >
        {isOriginal ? (
          <img
            src={image}
            alt=""
            width={600}
            height={804}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        ) : <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-200 group-hover:scale-110"
          style={{
            backgroundImage: `url(${image})`,
            backgroundColor: "#0a0a0a",
          }}
        />}

        {isOriginal && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b052b]/95 via-[#1b052b]/50 to-transparent px-2 pb-4 pt-10 text-center">
            <h3 className="hero-headline text-xl uppercase leading-none text-white">{title}</h3>
            <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-purple-200">Elixir Originals</p>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isOriginal && (title === "Limbo" || title === "Plinko" || title === "Keno") && (
            <span className="exclusive-pill ep-liquid-green">
              <span aria-hidden="true" className="ep-liquid">
                <span className="ep-liquid-wave" />
                {[0, 1, 2, 3, 4].map((bubble) => (
                  <span key={bubble} className={`ep-liquid-bubble ep-liquid-bubble-${bubble}`} />
                ))}
              </span>
              <span className="ep-label">Exclusive</span>
            </span>
          )}
          {isLive && (
            <span className={cn(statusPillClass, "bg-white text-black")}>
              <span className="size-1 bg-black rounded-full animate-pulse" />
              LIVE
            </span>
          )}
        </div>

        {/* Players Count */}
        {players && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] leading-3 text-white">
            <svg className="size-2.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="tabular-nums">{players}</span>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            aria-label={`Play ${title}`}
            className="flex items-center justify-center size-14 bg-white rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-200"
          >
            <svg
              className="size-6 text-black ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>

        {/* RTP Badge - Shows on hover */}
        {rtp && (
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="flex items-center justify-center gap-1 px-2 py-1 bg-black/80 backdrop-blur-sm text-white text-[10px] leading-3 font-medium rounded-lg">
              <span className="text-gray-400">RTP</span>
              <span className="text-white tabular-nums">{rtp.toFixed(2)}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
