"use client";

import { useState, useEffect, useRef } from "react";

interface Win {
  id: string;
  username: string;
  game: string;
  gameImage: string;
  amount: number;
  multiplier: number;
  vipLevel: number;
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

const generateWin = (id: number): Win => {
  const multiplier = Math.random() < 0.1
    ? Math.floor(Math.random() * 500) + 50
    : Math.floor(Math.random() * 20) + 1;
  const baseAmount = Math.random() * 100 + 1;
  // All users have a VIP badge
  const vipLevel = Math.floor(Math.random() * vipBadges.length);
  const gameData = games[Math.floor(Math.random() * games.length)];
  return {
    id: `win-${id}-${Date.now()}`,
    username: generateUsername(),
    game: gameData.name,
    gameImage: gameData.image,
    amount: parseFloat((baseAmount * multiplier).toFixed(2)),
    multiplier: multiplier,
    vipLevel: vipLevel,
  };
};

// Generate initial wins once
const initialWins: Win[] = Array.from({ length: 20 }, (_, i) => generateWin(i));

export default function LiveWinsFeed() {
  const [wins] = useState<Win[]>(initialWins);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Pure CSS animation - no state updates causing re-renders
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      if (!isHovered) {
        position += speed;
        const halfWidth = scrollContainer.scrollWidth / 2;
        if (position >= halfWidth) {
          position = 0;
        }
        scrollContainer.style.transform = `translateX(-${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  const formatAmount = (amount: number) => {
    if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}k`;
    }
    return amount.toFixed(2);
  };

  // Duplicate wins for seamless loop
  const displayWins = [...wins, ...wins];

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <h2 className="text-lg font-semibold text-white">Live Wins</h2>
        </div>
      </div>

      {/* Relative container for gradient fades */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Inner container with padding for hover effects */}
        <div className="py-4">
          <div
            ref={scrollRef}
            className="flex gap-3 will-change-transform"
            style={{ width: 'fit-content' }}
          >
            {displayWins.map((win, index) => (
              <div
                key={`${win.id}-${index}`}
                className="group/card relative flex-shrink-0 min-w-[260px] transition-transform duration-200 hover:-translate-y-2 hover:rotate-1 cursor-pointer"
              >
                {/* Gradient border with glow - hidden by default, shown on hover */}
                <div className="absolute -inset-[2px] rounded-lg opacity-0 group-hover/card:opacity-100 transition-opacity duration-200">
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-[2px]">
                    <div className="absolute inset-[2px] rounded-[6px] bg-dicey-card" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 blur-md" />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-l from-pink-500/10 via-purple-500/10 to-cyan-500/10 blur-md" />
                </div>

                {/* Card content */}
                <div className="relative flex items-center gap-3 px-4 py-2 bg-dicey-card border border-dicey-border rounded-lg group-hover/card:border-transparent overflow-hidden">
                  {/* Shimmer overlay on hover */}
                  <div className="card-shimmer opacity-0 group-hover/card:opacity-100 transition-opacity" />
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
                          className="w-4 h-4 flex-shrink-0"
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
                      <img src="/usdc.png" alt="USDC" className="w-4 h-4" />
                      <span className="text-sm font-semibold text-white">
                        {formatAmount(win.amount)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {win.multiplier}x
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-dicey-dark to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-dicey-dark to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
}
