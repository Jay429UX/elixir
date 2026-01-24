"use client";

import { cn } from "@/lib/utils";

interface GameCardProps {
  title: string;
  provider: string;
  image: string;
  isLive?: boolean;
  isNew?: boolean;
  isHot?: boolean;
  players?: number;
  width?: number;
  onPlay?: () => void;
}

export default function GameCard({
  title,
  provider,
  image,
  isLive,
  isNew,
  isHot,
  players,
  width,
  onPlay,
}: GameCardProps) {
  return (
    <div
      className="group relative flex-shrink-0 cursor-pointer"
      style={{ width: width ? `${width}px` : '176px' }}
      onClick={onPlay}
    >
      {/* Game Image */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-dicey-card border border-dicey-border">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-200 group-hover:scale-110"
          style={{
            backgroundImage: `url(${image})`,
            backgroundColor: "#0a0a0a",
          }}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isLive && (
            <span className="flex items-center gap-1 px-2 py-1 bg-white text-black text-xs font-medium rounded-md">
              <span className="size-1.5 bg-black rounded-full animate-pulse" />
              LIVE
            </span>
          )}
          {isNew && (
            <span className="px-2 py-1 bg-white text-black text-xs font-medium rounded-md">
              NEW
            </span>
          )}
          {isHot && (
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-md">
              HOT
            </span>
          )}
        </div>

        {/* Players Count */}
        {players && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-black/60 text-white text-xs rounded-md border border-white/10">
            <svg className="size-3" fill="currentColor" viewBox="0 0 24 24">
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
      </div>
    </div>
  );
}
