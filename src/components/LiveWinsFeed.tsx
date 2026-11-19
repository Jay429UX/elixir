"use client";

import { useState, useEffect, useRef } from "react";
import VipBadge from "@/components/ui/VipBadge";
import { cn } from "@/lib/utils";
import { originalGames } from "@/lib/originalGames";
import BetDetailsModal, { type BetDetails } from "@/components/BetDetailsModal";

interface Win {
  id: string;
  username: string;
  game: string;
  gameImage: string;
  isOriginal: boolean;
  amount: number;
  multiplier: number;
  vipLevel: number;
  placedAt: number;
  isNew?: boolean;
  shouldBump?: boolean;
}

const vipBadges = [
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier4.svg",
  "/vip/elixir/tier4.svg",
  "/vip/elixir/tier4.svg",
  "/vip/elixir/tier5.svg",
  "/vip/elixir/tier5.svg",
];

const originals = originalGames.map(game => ({ name: game.title, image: game.image }));

// Other games in the simulated live feed.
const games = [
  { name: "Sweet Bonanza", image: "/games/pragmaticexternal_SweetBonanza.webp" },
  { name: "Gates of Olympus", image: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp" },
  { name: "Big Bass Bonanza", image: "/games/pragmaticexternal_BigBassBonanza.webp" },
  { name: "Starlight Princess", image: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp" },
  { name: "Sugar Rush", image: "/games/pragmaticexternal_SugarRushSuperScatter.webp" },
  { name: "Reactoonz 2", image: "/games/playngo_reactoonztwo.webp" },
  { name: "Tome of Madness", image: "/games/playngo_TomeofMadness.webp" },
  { name: "Buffalo King Megaways", image: "/games/pragmaticexternal_BuffaloKingMegaways1.webp" },
  { name: "Hercules and Pegasus", image: "/games/pragmaticexternal_HerculesandPegasus.webp" },
  { name: "Fortune of Olympus", image: "/games/pragmaticexternal_FortuneofOlympus.webp" },
  { name: "Sweet Bonanza 1000", image: "/games/pragmaticexternal_SweetBonanza1000.webp" },
  { name: "Fruit Party", image: "/games/pragmaticexternal_FruitParty1.webp" },
  { name: "Santa's Wonderland", image: "/games/pragmaticexternal_SantasWonderland.webp" },
  { name: "Madame Destiny Megaways", image: "/games/pragmaticexternal_MadameDestinyMegaways1.webp" },
];

const generateUsername = () => {
  const adjectives = ["Lucky", "Big", "Cool", "Fast", "Pro", "Epic", "Wild", "Crypto", "Diamond", "Golden"];
  const nouns = ["Player", "Winner", "Gamer", "Star", "King", "Wolf", "Tiger", "Shark", "Ace", "Boss"];
  const num = Math.floor(Math.random() * 999);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${num}`;
};

/* Bigger multipliers get louder: gold for 100x and up, lime for 10x and up, quiet grey below. */
const multiplierTier = (m: number) => (m >= 100 ? "mega" : m >= 10 ? "big" : "base");
const multiplierClass = {
  mega: "rounded-md bg-gradient-to-b from-[#ffe27a] to-[#f2a21c] px-1.5 py-px text-xs font-black text-[#3a2406] shadow-[0_0_10px_rgba(255,190,50,0.55)]",
  big: "rounded-md bg-lime-300/15 px-1.5 py-px text-xs font-bold text-lime-300",
  base: "text-xs text-gray-500",
} as const;

let winCounter = 0;

const generateWin = (): Win => {
  const multiplier = Math.random() < 0.1
    ? Math.floor(Math.random() * 500) + 50
    : Math.floor(Math.random() * 20) + 1;
  const baseAmount = Math.random() * 100 + 1;
  const vipLevel = Math.floor(Math.random() * vipBadges.length);
  const isOriginal = winCounter % 3 === 0;
  const gamePool = isOriginal ? originals : games;
  const gameData = gamePool[Math.floor(Math.random() * gamePool.length)];
  winCounter++;
  return {
    id: `win-${winCounter}-${Date.now()}`,
    username: generateUsername(),
    game: gameData.name,
    gameImage: gameData.image,
    isOriginal,
    amount: parseFloat((baseAmount * multiplier).toFixed(2)),
    multiplier: multiplier,
    vipLevel: vipLevel,
    placedAt: Date.now(),
    isNew: true,
  };
};

// Generate initial wins
const createInitialWins = (): Win[] => {
  return Array.from({ length: 15 }, () => ({ ...generateWin(), isNew: false }));
};

export default function LiveWinsFeed() {
  const [wins, setWins] = useState<Win[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [selectedBet, setSelectedBet] = useState<BetDetails | null>(null);

  // Initialize wins only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setWins(createInitialWins());
  }, []);

  // Add new wins periodically - faster interval (15% faster = ~1.7s instead of 2s)
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      if (!isHovered && !selectedBet) {
        setWins(prev => {
          const newWin = generateWin();
          // Add new win to the beginning, mark existing cards to bump, remove from end
          const updated = [
            newWin,
            ...prev.slice(0, 19).map(w => ({ ...w, shouldBump: true }))
          ];
          return updated;
        });

        // Remove the animation flags after animation completes
        setTimeout(() => {
          setWins(prev => prev.map(w => ({ ...w, isNew: false, shouldBump: false })));
        }, 250);
      }
    }, 1200); // faster interval

    return () => clearInterval(interval);
  }, [isHovered, isClient, selectedBet]);

  const formatAmount = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}k`;
    }
    return amount.toFixed(2);
  };

  return (
    <section aria-labelledby="live-wins-title" className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-white"></span>
          </span>
          <h2 id="live-wins-title" className="text-lg font-semibold text-white">Live Wins</h2>
          <svg className="sr-only" aria-hidden="true">
            <filter id="win-fizzy-noise" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves="3" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
        </div>
      </div>

      {/* Relative container for gradient fades */}
      <div
        className="relative overflow-hidden -mx-1 -mt-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner container with extra top padding so hover lift + rising fizz bubbles never clip */}
        <div className="pt-8 pb-4 px-1">
          <div
            className="flex gap-3 transition-transform duration-300 ease-out"
            style={{ width: 'fit-content' }}
          >
            {wins.map((win) => (
              <div
                key={win.id}
                role="button"
                tabIndex={0}
                aria-label={`View bet details: ${win.username} won ${win.amount.toFixed(2)} USDC on ${win.game}`}
                onClick={() => setSelectedBet({ ...win, vipBadge: win.vipLevel >= 0 ? vipBadges[win.vipLevel] : undefined })}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedBet({ ...win, vipBadge: win.vipLevel >= 0 ? vipBadges[win.vipLevel] : undefined });
                  }
                }}
                className={cn(
                  "group/card relative flex-shrink-0 min-w-[260px] transition-all duration-200 hover:-translate-y-2 hover:rotate-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 rounded-lg",
                  win.isNew && "animate-slide-in-left",
                  win.shouldBump && !win.isNew && "animate-nudge-right"
                )}
              >
                {/* 100x+ bubbling green fizzy border (noisy/bubbly ring + tiny detailed micro-bubbles) */}
                {win.multiplier >= 100 && (
                  <div aria-hidden="true" className="pointer-events-none absolute -inset-[2px] rounded-[10px]">
                    <div
                      className="win-card-fizzy absolute inset-0 rounded-[10px]"
                      style={{ filter: "url(#win-fizzy-noise)" }}
                    />
                    <span className="win-fizz-dot -top-0.5 left-[8%] size-[3px]" style={{ animationDelay: "0s" }} />
                    <span className="win-fizz-dot -top-1 left-[17%] size-[4px]" style={{ animationDelay: "0.35s" }} />
                    <span className="win-fizz-dot -top-0.5 left-[29%] size-[3px]" style={{ animationDelay: "0.8s" }} />
                    <span className="win-fizz-dot -top-1 left-[44%] size-[5px]" style={{ animationDelay: "0.15s" }} />
                    <span className="win-fizz-dot -top-0.5 left-[58%] size-[3px]" style={{ animationDelay: "0.65s" }} />
                    <span className="win-fizz-dot -top-1 right-[24%] size-[4px]" style={{ animationDelay: "1.05s" }} />
                    <span className="win-fizz-dot -top-0.5 right-[11%] size-[3px]" style={{ animationDelay: "0.45s" }} />
                    <span className="win-fizz-dot -bottom-0.5 left-[15%] size-[3px]" style={{ animationDelay: "0.5s" }} />
                    <span className="win-fizz-dot -bottom-1 left-[34%] size-[4px]" style={{ animationDelay: "0.95s" }} />
                    <span className="win-fizz-dot -bottom-0.5 right-[32%] size-[3px]" style={{ animationDelay: "0.2s" }} />
                    <span className="win-fizz-dot -bottom-1 right-[14%] size-[4px]" style={{ animationDelay: "0.75s" }} />
                    <span className="win-fizz-dot -left-0.5 top-[38%] size-[3px]" style={{ animationDelay: "0.6s" }} />
                    <span className="win-fizz-dot -right-0.5 top-[48%] size-[3px]" style={{ animationDelay: "1.15s" }} />
                  </div>
                )}

                {/* Animated gradient border highlight on hover */}
                {win.multiplier < 100 && (
                  <div className="absolute -inset-[2px] rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 win-card-gradient">
                    <div className="absolute inset-[2px] rounded-[6px] bg-dicey-card" />
                  </div>
                )}

                {/* Card content */}
                <div
                  className="relative flex items-center gap-3 px-4 py-2 bg-dicey-card rounded-lg overflow-hidden"
                  style={{
                    border: win.multiplier >= 100 ? '1px solid transparent' : '1px solid rgba(196, 181, 253, 0.1)',
                    boxShadow: win.multiplier >= 100 ? 'inset 0 0 18px rgba(57, 255, 20, 0.1)' : undefined,
                  }}
                >
                  {/* Shimmer overlay on hover */}
                  <div className="card-shimmer opacity-0 group-hover/card:opacity-100 transition-opacity duration-200" />
                  <div className="relative w-10 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={win.gameImage}
                      alt={win.game}
                      className="w-full h-full object-cover"
                    />
                    {win.isOriginal && <span aria-hidden="true" className="hero-headline absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b052b] via-[#1b052b]/80 to-transparent pb-0.5 pt-2 text-center text-[6px] uppercase leading-none text-white">{win.game}</span>}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {win.vipLevel >= 0 && (
                        <VipBadge
                          src={vipBadges[win.vipLevel]}
                          alt="VIP"
                          className="size-6 flex-shrink-0"
                        />
                      )}
                      <span className="text-sm text-gray-400">
                        {win.username.length > 6 ? `${win.username.slice(0, 6)}..` : win.username}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 truncate">
                      {win.game}
                    </span>
                  </div>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <div className="flex items-center gap-1">
                      {/* USDC Icon */}
                      <img src="/crypto/usdc.svg" alt="USDC" className="size-4" />
                      <span className="text-sm font-semibold text-white tabular-nums">
                        {formatAmount(win.amount)}
                      </span>
                    </div>
                    <span className={`tabular-nums ${multiplierClass[multiplierTier(win.multiplier)]}`}>
                      {win.multiplier}x
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Only right gradient fade - no left fade since new wins come from left */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dicey-darker to-transparent pointer-events-none z-10" />
      </div>
      <BetDetailsModal bet={selectedBet} onClose={() => setSelectedBet(null)} />
    </section>
  );
}
