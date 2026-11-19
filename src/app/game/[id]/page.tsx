"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BiChevronLeft,
  BiExitFullscreen,
  BiFullscreen,
  BiSolidDice5,
  BiSolidGridAlt,
  BiSolidInfoCircle,
  BiSolidStar,
  BiSolidVolumeFull,
  BiStar,
} from "react-icons/bi";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LiveChat from "@/components/LiveChat";
import GameRow, { Game } from "@/components/GameRow";
import GameStatsPanel from "@/components/GameStatsPanel";
import LiveBetsTable from "@/components/LiveBetsTable";
import Footer from "@/components/Footer";
import { useTab } from "@/context/TabContext";
import { originalGames } from "@/lib/originalGames";

// This would normally come from an API or database
const allGames: Game[] = [
  ...originalGames,
  { id: "1", title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza.webp", isHot: true },
  { id: "2", title: "Gates of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp", isHot: true },
  { id: "3", title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BigBassBonanza.webp" },
  { id: "4", title: "Starlight Princess", provider: "Pragmatic Play", image: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp", isNew: true },
  { id: "5", title: "Sugar Rush", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SugarRushSuperScatter.webp" },
  { id: "6", title: "Reactoonz 2", provider: "Play'n GO", image: "/games/playngo_reactoonztwo.webp" },
  { id: "7", title: "Tome of Madness", provider: "Play'n GO", image: "/games/playngo_TomeofMadness.webp" },
  { id: "8", title: "Buffalo King Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BuffaloKingMegaways1.webp" },
  { id: "9", title: "The Dog House", provider: "Pragmatic Play", image: "/games/pragmaticexternal_TheDogHouse.webp" },
  { id: "10", title: "Fire Joker", provider: "Play'n GO", image: "/games/playngo_firejoker.webp" },
  { id: "11", title: "Book of Dead", provider: "Play'n GO", image: "/games/playngo_BookofDead.webp" },
  { id: "12", title: "Rise of Olympus", provider: "Play'n GO", image: "/games/playngo_RiseofOlympus.webp" },
  { id: "13", title: "Moon Princess", provider: "Play'n GO", image: "/games/playngo_MoonPrincess.webp" },
  { id: "14", title: "Gemix", provider: "Play'n GO", image: "/games/playngo_Gemix.webp" },
  { id: "15", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", isLive: true },
  { id: "16", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", isHot: true },
  { id: "17", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp" },
  { id: "18", title: "Rollbot Bonanza", provider: "Rollbit", image: "/games/rollbit_rollbotbonanza.webp" },
  { id: "19", title: "Mines", provider: "Rollbit", image: "/games/rollbit_mines.webp", isLive: true },
  { id: "20", title: "Plinko", provider: "Rollbit", image: "/games/rollbit_plinko.webp", isLive: true },
  { id: "21", title: "Chaos Crew", provider: "Hacksaw Gaming", image: "/games/hacksaw_ChaosCrew.webp" },
  { id: "22", title: "Stick Em", provider: "Hacksaw Gaming", image: "/games/hacksaw_StickEm.webp" },
];

const gamesData: Record<string, Game> = allGames.reduce((acc, game) => {
  acc[game.id] = game;
  return acc;
}, {} as Record<string, Game>);

interface GamePageProps {
  params: Promise<{ id: string }>;
}

export default function GamePage({ params }: GamePageProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isSidebarCollapsed, isChatOpen, toggleChat } = useTab();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  // Resolve params
  if (!resolvedParams) {
    params.then(setResolvedParams);
    return null;
  }

  const game = gamesData[resolvedParams.id] || {
    id: "0",
    title: "Unknown Game",
    provider: "Unknown Provider",
    image: "/games/pragmaticexternal_SweetBonanza.webp",
  };

  // Get more games from the same provider (excluding current game)
  const moreFromProvider = allGames.filter(
    (g) => g.provider === game.provider && g.id !== resolvedParams.id
  );

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-dvh">
      <Header />
      <Sidebar />

      {/* Live Chat */}
      <LiveChat isOpen={isChatOpen} onToggle={toggleChat} />

      {/* Game Content */}
      <main className={`pt-[calc(4rem+env(safe-area-inset-top,0px))] pb-[env(safe-area-inset-bottom,0px)] min-h-dvh transition-all duration-200 ease-out ${isSidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[272px]'} ${isChatOpen ? 'lg:mr-80' : 'mr-0'}`}>
        <div className="flex flex-col items-center justify-center px-4 py-4 sm:p-6 min-h-[calc(100dvh-4rem)]">
          {/* Controls Bar - Above Game */}
          <div className="w-full max-w-5xl flex items-center justify-between gap-2 mb-3">
            {/* Left - Back & Game Info */}
            <div className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2 sm:flex-initial sm:gap-3 sm:px-3 bg-dicey-card rounded-xl">
              <button
                onClick={handleClose}
                aria-label="Back to lobby"
                title="Back to lobby"
                className="grid size-8 shrink-0 place-items-center bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                <BiChevronLeft className="size-5 text-white" />
              </button>

              <div className="w-px h-6 shrink-0 bg-dicey-border" />

              <div className="flex min-w-0 items-center gap-2">
                <img
                  src={game.image}
                  alt={game.title}
                  className="size-8 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <h1 className="truncate text-white font-semibold text-sm">{game.title}</h1>
                  <span className="block truncate text-gray-400 text-xs">{game.provider}</span>
                </div>
              </div>
            </div>

            {/* Right - Settings */}
            <div className="flex shrink-0 items-center gap-0.5 px-1.5 py-2 sm:gap-1 sm:px-2 bg-dicey-card rounded-xl">
              {/* Favorite */}
              <button
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-1.5 sm:p-2 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                {isFavorite ? (
                  <BiSolidStar className="size-5 text-yellow-400" />
                ) : (
                  <BiStar className="size-5 text-gray-400" />
                )}
              </button>

              {/* Sound */}
              <button
                aria-label="Toggle sound"
                className="p-1.5 sm:p-2 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                <BiSolidVolumeFull className="size-5 text-gray-400" />
              </button>

              {/* Info */}
              <button
                aria-label="Game info"
                className="p-1.5 sm:p-2 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                <BiSolidInfoCircle className="size-5 text-gray-400" />
              </button>

              {/* Fullscreen */}
              <button
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 sm:p-2 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                {isFullscreen ? (
                  <BiExitFullscreen className="size-5 text-gray-400" />
                ) : (
                  <BiFullscreen className="size-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Game Container */}
          <div className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-video bg-dicey-card rounded-2xl overflow-hidden">
            {/* Placeholder Game Screen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-dicey-dark p-4">
              {/* Game Image as Background */}
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center blur-sm"
                style={{ backgroundImage: `url(${game.image})` }}
              />

              {/* Placeholder Content */}
              <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-6">
                <div className="size-20 sm:size-32 rounded-2xl overflow-hidden border-2 border-dicey-border shadow-2xl">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h2 className="text-lg sm:text-2xl font-bold text-white mb-1 sm:mb-2 text-balance">{game.title}</h2>
                  <p className="text-xs sm:text-base text-gray-400">{game.provider}</p>
                </div>

                {/* Loading/Play Button */}
                <div className="flex flex-col items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="size-2.5 sm:size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="size-2.5 sm:size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="size-2.5 sm:size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-gray-400 text-xs sm:text-sm">Loading game...</span>
                </div>

                {/* Game will load here text */}
                <div className="mt-1 sm:mt-8 px-4 py-2 sm:px-6 sm:py-3 bg-dicey-border/30 rounded-xl">
                  <span className="text-gray-500 text-xs sm:text-sm">Game iframe will be embedded here</span>
                </div>
              </div>
            </div>
          </div>

          {/* Game Stats & Top Wins Panel */}
          <GameStatsPanel title={game.title} provider={game.provider} image={game.image} rtp={game.rtp} />

          {/* More from Provider Section */}
          {moreFromProvider.length > 0 && (
            <div className="w-full max-w-5xl mt-8">
              <GameRow
                title={`More from ${game.provider}`}
                icon={
                  game.provider === "Elixir Originals" ? (
                    <img src="/elixir-originals-icon.jpg" alt="" className="size-6 rounded-md object-cover" />
                  ) : (
                    <BiSolidGridAlt className="size-5" />
                  )
                }
                games={moreFromProvider}
                showViewAll={false}
                useRouterNavigation={true}
              />
            </div>
          )}

          {/* Live Bets Table */}
          <div className="w-full max-w-5xl mt-4">
            <LiveBetsTable gameFilter={{ name: game.title, icon: game.image }} />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-6 sm:px-6">
          <Footer />
        </div>
      </main>
    </div>
  );
}
