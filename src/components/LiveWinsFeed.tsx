"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Win {
  id: string;
  username: string;
  game: string;
  gameImage: string;
  amount: number;
  multiplier: number;
  vipLevel: number;
  isNew?: boolean;
  shouldBump?: boolean;
}

const vipBadges = [
  "/vip/Icon%202%20(iron)-BWRwb8a7.png",
  "/vip/Icon%201%20(gold)-9sMBN4Vh.png",
  "/vip/Icon%202%20(platinum)-DPA4FuH1.png",
  "/vip/Icon%201%20(diamant)-_4mW1oBJ.png",
  "/vip/Icon%204%20(gold)-B969YQB8.png",
  "/vip/Icon%204%20(platinum)-28ZBS5o7.png",
  "/vip/Icon%205%20(gold)-T356dNZq.png",
  "/vip/Icon%205%20(platinum)-BAlv4mS-.png",
  "/vip/Icon%202%20(diamant)-BcCwr7BA.png",
];

// Same games as Popular Games section
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

let winCounter = 0;

const generateWin = (): Win => {
  const multiplier = Math.random() < 0.1
    ? Math.floor(Math.random() * 500) + 50
    : Math.floor(Math.random() * 20) + 1;
  const baseAmount = Math.random() * 100 + 1;
  const vipLevel = Math.floor(Math.random() * vipBadges.length);
  const gameData = games[Math.floor(Math.random() * games.length)];
  winCounter++;
  return {
    id: `win-${winCounter}-${Date.now()}`,
    username: generateUsername(),
    game: gameData.name,
    gameImage: gameData.image,
    amount: parseFloat((baseAmount * multiplier).toFixed(2)),
    multiplier: multiplier,
    vipLevel: vipLevel,
    isNew: true,
  };
};

// Generate initial wins
const createInitialWins = (): Win[] => {
  return Array.from({ length: 15 }, () => ({ ...generateWin(), isNew: false }));
};

export default function LiveWinsFeed() {
  const [wins, setWins] = useState<Win[]>(() => createInitialWins());
  const [isHovered, setIsHovered] = useState(false);

  // Add new wins periodically - faster interval (15% faster = ~1.7s instead of 2s)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
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
  }, [isHovered]);

  const formatAmount = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}k`;
    }
    return amount.toFixed(2);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-white"></span>
          </span>
          <h2 className="text-lg font-semibold text-white">Live Wins</h2>
        </div>
      </div>

      {/* Relative container for gradient fades */}
      <div
        className="relative overflow-hidden -mx-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner container with padding for hover effects */}
        <div className="py-4 px-1">
          <div
            className="flex gap-3 transition-transform duration-300 ease-out"
            style={{ width: 'fit-content' }}
          >
            {wins.map((win) => (
              <div
                key={win.id}
                className={cn(
                  "group/card relative flex-shrink-0 min-w-[260px] transition-all duration-200 hover:-translate-y-2 hover:rotate-1 cursor-pointer",
                  win.isNew && "animate-slide-in-left",
                  win.shouldBump && !win.isNew && "animate-nudge-right"
                )}
              >
                {/* Animated gradient border highlight on hover */}
                <div className="absolute -inset-[2px] rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 win-card-gradient">
                  <div className="absolute inset-[2px] rounded-[6px] bg-dicey-card" />
                </div>

                {/* Card content */}
                <div className="relative flex items-center gap-3 px-4 py-2 bg-dicey-card border border-dicey-border rounded-lg group-hover/card:border-transparent overflow-hidden">
                  {/* Shimmer overlay on hover */}
                  <div className="card-shimmer opacity-0 group-hover/card:opacity-100 transition-opacity duration-200" />
                  <div className="w-10 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={win.gameImage}
                      alt={win.game}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      {win.vipLevel >= 0 && (
                        <img
                          src={vipBadges[win.vipLevel]}
                          alt="VIP"
                          className="size-4 flex-shrink-0"
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
                      <img src="/usdc.png" alt="USDC" className="size-4" />
                      <span className="text-sm font-semibold text-white tabular-nums">
                        {formatAmount(win.amount)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 tabular-nums">
                      {win.multiplier}x
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Only right gradient fade - no left fade since new wins come from left */}
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0612] to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
