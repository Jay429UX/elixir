"use client";

import { useState, useEffect, useRef } from "react";
import VipBadge from "@/components/ui/VipBadge";
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
  currency: "usdc" | "usdt" | "btc" | "eth" | "sol";
  timestamp: Date;
  isHighRoller: boolean;
}

const CURRENCIES: Bet["currency"][] = ["usdc", "usdt", "btc", "eth", "sol"];

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

const generateBet = (id: number, fixedGame?: { name: string; icon: string }): Bet => {
  const game = fixedGame || gameData[Math.floor(Math.random() * gameData.length)];
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
    currency: CURRENCIES[id % CURRENCIES.length],
    timestamp: new Date(),
    isHighRoller,
  };
};

// Generate initial bets
const createInitialBets = (fixedGame?: { name: string; icon: string }): Bet[] =>
  Array.from({ length: 20 }, (_, i) => generateBet(i, fixedGame));

interface LiveBetsTableProps {
  gameFilter?: {
    name: string;
    icon: string;
  };
}

export default function LiveBetsTable({ gameFilter }: LiveBetsTableProps = {}) {
  const [bets, setBets] = useState<Bet[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isClient, setIsClient] = useState(false);
  const nextBetIdRef = useRef(20);

  // Initialize bets only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    nextBetIdRef.current = 20;
    setBets(createInitialBets(gameFilter));
  }, [gameFilter]);

  // Simulate incoming bets
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      const nextId = nextBetIdRef.current++;
      setBets((prev) => {
        const newBet = generateBet(nextId, gameFilter);
        const newBets = [newBet, ...prev];
        return newBets.slice(0, 50); // Keep only last 50 bets
      });
    }, 800 + Math.random() * 400);

    return () => clearInterval(interval);
  }, [isClient, gameFilter]);

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex size-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
          </span>
          <h2 className="truncate text-lg font-semibold text-white">
            {gameFilter ? `Live Bets on ${gameFilter.name}` : "Live Bets"}
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex w-full sm:w-auto rounded-xl bg-dicey-card p-1">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "flex-1 sm:flex-initial whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-150",
              filter === "all"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            All Bets
          </button>
          <button
            onClick={() => setFilter("highRollers")}
            className={cn(
              "flex-1 sm:flex-initial whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-150",
              filter === "highRollers"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            High Rollers
          </button>
          <button
            onClick={() => setFilter("myBets")}
            className={cn(
              "flex-1 sm:flex-initial whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-150",
              filter === "myBets"
                ? "bg-white/10 text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            My Bets
          </button>
        </div>
      </div>

      {/* Table Container with Mask */}
      <div className="relative">
        <div className="rounded-2xl border border-white/[0.06] bg-dicey-card overflow-hidden">
          {/* Table Body */}
          <div className="overflow-hidden p-2.5 sm:p-3 flex flex-col gap-1">
            {/* Table Header */}
            <div className={cn(
              "grid items-center gap-3 px-2.5 pb-2.5 pt-1.5 mb-0.5 border-b border-white/[0.06] sm:gap-4 sm:px-4 sm:py-2.5",
              gameFilter
                ? "grid-cols-[minmax(0,1fr)_58px_88px] sm:grid-cols-[minmax(0,1.6fr)_minmax(84px,0.8fr)_minmax(88px,0.8fr)_minmax(112px,1fr)]"
                : "grid-cols-[minmax(0,1fr)_58px_88px] sm:grid-cols-[minmax(0,1.65fr)_minmax(0,1.25fr)_minmax(84px,0.7fr)_minmax(88px,0.7fr)_minmax(112px,0.85fr)]"
            )}>
              {!gameFilter && (
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Game</span>
              )}
              <span className={cn(
                "text-[11px] font-semibold text-gray-400 uppercase tracking-wider",
                !gameFilter && "hidden sm:block"
              )}>Player</span>
              <span className="hidden sm:block text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right">Wager</span>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right whitespace-nowrap">
                <span className="sm:hidden">Mult.</span>
                <span className="hidden sm:inline">Multiplier</span>
              </span>
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider text-right whitespace-nowrap">Payout</span>
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
                    "grid items-center gap-3 px-2.5 py-2.5 sm:gap-4 sm:px-4 sm:py-3 rounded-xl transition-colors duration-150 hover:bg-white/[0.04]",
                    index % 2 === 1 ? "bg-black/20" : "bg-transparent",
                    gameFilter
                      ? "grid-cols-[minmax(0,1fr)_58px_88px] sm:grid-cols-[minmax(0,1.6fr)_minmax(84px,0.8fr)_minmax(88px,0.8fr)_minmax(112px,1fr)]"
                      : "grid-cols-[minmax(0,1fr)_58px_88px] sm:grid-cols-[minmax(0,1.65fr)_minmax(0,1.25fr)_minmax(84px,0.7fr)_minmax(88px,0.7fr)_minmax(112px,0.85fr)]"
                  )}
                >
                  {/* Game - only show when not filtering by game */}
                  {!gameFilter && (
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                      <img
                        src={bet.gameIcon}
                        alt={bet.gameName}
                        className="size-8 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <span className="block text-sm text-white font-medium truncate">{bet.gameName}</span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400 sm:hidden">
                          <VipBadge
                            src={vipBadges[bet.vipLevel]}
                            alt=""
                            className="size-3.5 shrink-0"
                          />
                          <span className="truncate">{bet.player}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Player */}
                  <div className={cn("min-w-0 items-center gap-2", gameFilter ? "flex" : "hidden sm:flex")}>
                    <VipBadge
                      src={vipBadges[bet.vipLevel]}
                      alt="VIP"
                      className="size-5 sm:size-6 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-300 truncate">{bet.player}</span>
                  </div>

                  {/* Wager */}
                  <div className="hidden sm:flex items-center justify-end">
                    <span className="text-sm text-white/90 font-medium tabular-nums">{formatAmount(bet.wager)}</span>
                  </div>

                  {/* Multiplier */}
                  <div className="flex items-center justify-end whitespace-nowrap">
                    <span className={cn("text-xs sm:text-sm font-bold tabular-nums", getMultiplierColor(bet.multiplier))}>
                      {bet.multiplier.toFixed(2)}x
                    </span>
                  </div>

                  {/* Payout */}
                  <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                    <span className={cn("text-xs sm:text-sm font-bold tabular-nums", bet.payout >= bet.wager ? "text-green-400" : "text-gray-400")}>
                      {bet.payout >= bet.wager ? formatAmount(bet.payout) : "$0.00"}
                    </span>
                    <img
                      src={`/crypto/${bet.currency}.svg`}
                      alt={bet.currency.toUpperCase()}
                      className="size-4 shrink-0"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom fade mask - outside the table */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dicey-darker to-transparent pointer-events-none rounded-b-xl" />
      </div>
    </section>
  );
}
