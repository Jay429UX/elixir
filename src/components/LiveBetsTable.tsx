"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Bet {
  id: string;
  gameIcon: string;
  gameName: string;
  player: string;
  vipLevel: number;
  wager: number;
  multiplier: number;
  payout: number;
  timestamp: Date;
  isHighRoller: boolean;
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

type FilterType = "all" | "highRollers" | "myBets";

const gameData = [
  { name: "Sweet Bonanza", icon: "/games/pragmaticexternal_SweetBonanza.webp" },
  { name: "Gates of Olympus", icon: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp" },
  { name: "Big Bass Bonanza", icon: "/games/pragmaticexternal_BigBassBonanza.webp" },
  { name: "Starlight Princess", icon: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp" },
  { name: "Sugar Rush", icon: "/games/pragmaticexternal_SugarRushSuperScatter.webp" },
  { name: "X Crash", icon: "/games/rollbit_xcrash.webp" },
  { name: "Mines", icon: "/games/rollbit_mines.webp" },
  { name: "Plinko", icon: "/games/rollbit_plinko.webp" },
  { name: "Wanted Dead or Wild", icon: "/games/hacksaw_WantedDeadoraWild.webp" },
  { name: "Le Zeus", icon: "/games/hacksaw_LeZeus.webp" },
  { name: "Rollbot Bonanza", icon: "/games/rollbit_rollbotbonanza.webp" },
  { name: "Buffalo King Megaways", icon: "/games/pragmaticexternal_BuffaloKingMegaways1.webp" },
];

const generateUsername = () => {
  const adjectives = ["Lucky", "Big", "Cool", "Fast", "Pro", "Epic", "Wild", "Crypto", "Diamond", "Golden", "Degen", "Based", "Chad", "Rich", "Moon"];
  const nouns = ["Player", "Winner", "Gamer", "Star", "King", "Wolf", "Tiger", "Shark", "Ace", "Boss", "Whale", "Ape", "Punter", "Roller", "Spinner"];
  const num = Math.floor(Math.random() * 999);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${num}`;
};

const generateBet = (id: number): Bet => {
  const game = gameData[Math.floor(Math.random() * gameData.length)];
  const isHighRoller = Math.random() > 0.85;
  const wager = isHighRoller
    ? Math.floor(Math.random() * 9000) + 1000
    : Math.floor(Math.random() * 100) + 1;
  const multiplier = Math.random() > 0.7
    ? parseFloat((Math.random() * 50 + 1).toFixed(2))
    : parseFloat((Math.random() * 5).toFixed(2));
  const payout = parseFloat((wager * multiplier).toFixed(2));
  // Higher VIP levels for high rollers
  const vipLevel = isHighRoller
    ? Math.floor(Math.random() * 4) + 5
    : Math.floor(Math.random() * vipBadges.length);

  return {
    id: `bet-${id}-${Date.now()}`,
    gameIcon: game.icon,
    gameName: game.name,
    player: generateUsername(),
    vipLevel,
    wager,
    multiplier,
    payout,
    timestamp: new Date(),
    isHighRoller,
  };
};

// Generate initial bets
const createInitialBets = (): Bet[] =>
  Array.from({ length: 20 }, (_, i) => generateBet(i));

export default function LiveBetsTable() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isClient, setIsClient] = useState(false);

  // Initialize bets only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setBets(createInitialBets());
  }, []);

  // Simulate incoming bets
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setBets((prev) => {
        const newBet = generateBet(prev.length);
        const newBets = [newBet, ...prev];
        return newBets.slice(0, 50); // Keep only last 50 bets
      });
    }, 800 + Math.random() * 400);

    return () => clearInterval(interval);
  }, [isClient]);

  const filteredBets = bets.filter((bet) => {
    if (filter === "highRollers") return bet.isHighRoller;
    if (filter === "myBets") return bet.player === "You";
    return true;
  });

  const formatAmount = (amount: number) => {
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(1)}k`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const getMultiplierColor = (multiplier: number) => {
    if (multiplier >= 10) return "text-yellow-400";
    if (multiplier >= 5) return "text-green-400";
    if (multiplier >= 2) return "text-blue-400";
    return "text-gray-400";
  };

  return (
    <section className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
          </span>
          <h2 className="text-lg font-semibold text-white">Live Bets</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-dicey-card border border-dicey-border rounded-lg p-1">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200",
              filter === "all"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            )}
          >
            All Bets
          </button>
          <button
            onClick={() => setFilter("highRollers")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200",
              filter === "highRollers"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            )}
          >
            High Rollers
          </button>
          <button
            onClick={() => setFilter("myBets")}
            className={cn(
              "px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200",
              filter === "myBets"
                ? "bg-white text-black"
                : "text-gray-400 hover:text-white"
            )}
          >
            My Bets
          </button>
        </div>
      </div>

      {/* Table Container with Mask */}
      <div className="relative">
        <div className="rounded-xl overflow-hidden">
          {/* Table Body */}
          <div className="overflow-hidden p-2 flex flex-col gap-2">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-4 py-3 rounded-lg bg-dicey-border/20">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Game</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Player</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Wager</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Multiplier</span>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Payout</span>
            </div>
            {filteredBets.length === 0 ? (
              <div className="flex items-center justify-center py-12 text-gray-500 text-pretty">
                No bets to display
              </div>
            ) : (
              filteredBets.slice(0, 10).map((bet, index) => (
                <div
                  key={bet.id}
                  className={cn(
                    "grid grid-cols-5 gap-4 px-4 py-3 rounded-lg transition-colors duration-200",
                    index === 0 ? "animate-fade-in bg-dicey-border/30" : "bg-dicey-border/20"
                  )}
                >
                  {/* Game */}
                  <div className="flex items-center gap-3">
                    <img
                      src={bet.gameIcon}
                      alt={bet.gameName}
                      className="size-8 rounded-lg object-cover"
                    />
                    <span className="text-sm text-white font-medium truncate">{bet.gameName}</span>
                  </div>

                  {/* Player */}
                  <div className="flex items-center gap-2">
                    <img
                      src={vipBadges[bet.vipLevel]}
                      alt="VIP"
                      className="size-4 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-400 truncate">{bet.player}</span>
                  </div>

                  {/* Wager */}
                  <div className="flex items-center justify-end">
                    <span className="text-sm text-white font-medium tabular-nums">{formatAmount(bet.wager)}</span>
                  </div>

                  {/* Multiplier */}
                  <div className="flex items-center justify-end">
                    <span className={cn("text-sm font-bold tabular-nums", getMultiplierColor(bet.multiplier))}>
                      {bet.multiplier.toFixed(2)}x
                    </span>
                  </div>

                  {/* Payout */}
                  <div className="flex items-center justify-end">
                    <span className={cn("text-sm font-bold tabular-nums", bet.payout >= bet.wager ? "text-green-400" : "text-gray-400")}>
                      {bet.payout >= bet.wager ? formatAmount(bet.payout) : "$0.00"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom fade mask - outside the table */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dicey-darker to-transparent pointer-events-none rounded-b-xl" />
      </div>
    </section>
  );
}
