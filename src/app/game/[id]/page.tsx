"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import LiveChat from "@/components/LiveChat";
import GameRow, { Game } from "@/components/GameRow";
import LiveBetsTable from "@/components/LiveBetsTable";
import Footer from "@/components/Footer";
import { useTab } from "@/context/TabContext";

// This would normally come from an API or database
const allGames: Game[] = [
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
  const [isChatOpen, setIsChatOpen] = useState(true);
  const { isSidebarCollapsed } = useTab();
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
    <div className="min-h-screen">
      <Header />
      <Sidebar />

      {/* Live Chat */}
      <LiveChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />

      {/* Game Content */}
      <main className={`pt-16 min-h-screen transition-all duration-200 ease-out ${isSidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[272px]'} ${isChatOpen ? 'lg:mr-80' : 'mr-0'}`}>
        <div className="flex flex-col items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
          {/* Controls Bar - Above Game */}
          <div className="w-full max-w-5xl flex items-center justify-between mb-3">
            {/* Left - Back & Game Info */}
            <div className="flex items-center gap-3 px-3 py-2 bg-dicey-card border border-dicey-border rounded-xl">
              <button
                onClick={handleClose}
                className="flex items-center gap-2 px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                <svg className="size-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-white text-sm font-medium">Back to Lobby</span>
              </button>

              <div className="w-px h-6 bg-dicey-border" />

              <div className="flex items-center gap-2">
                <img
                  src={game.image}
                  alt={game.title}
                  className="size-8 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-white font-semibold text-sm">{game.title}</h1>
                  <span className="text-gray-400 text-xs">{game.provider}</span>
                </div>
              </div>
            </div>

            {/* Right - Settings */}
            <div className="flex items-center gap-1 px-2 py-2 bg-dicey-card border border-dicey-border rounded-xl">
              {/* Favorite */}
              <button
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                <svg
                  className={cn("size-5", isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400")}
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>

              {/* Sound */}
              <button
                aria-label="Toggle sound"
                className="p-2 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>

              {/* Info */}
              <button
                aria-label="Game info"
                className="p-2 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              {/* Fullscreen */}
              <button
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-dicey-border rounded-lg transition-colors duration-200"
              >
                <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isFullscreen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Game Container */}
          <div className="relative w-full max-w-5xl aspect-video bg-dicey-card rounded-2xl border border-dicey-border overflow-hidden">
            {/* Placeholder Game Screen */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-dicey-dark">
              {/* Game Image as Background */}
              <div
                className="absolute inset-0 opacity-20 bg-cover bg-center blur-sm"
                style={{ backgroundImage: `url(${game.image})` }}
              />

              {/* Placeholder Content */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="size-32 rounded-2xl overflow-hidden border-2 border-dicey-border shadow-2xl">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2 text-balance">{game.title}</h2>
                  <p className="text-gray-400">{game.provider}</p>
                </div>

                {/* Loading/Play Button */}
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-gray-400 text-sm">Loading game...</span>
                </div>

                {/* Game will load here text */}
                <div className="mt-8 px-6 py-3 bg-dicey-border/30 rounded-xl border border-dicey-border">
                  <span className="text-gray-500 text-sm">Game iframe will be embedded here</span>
                </div>
              </div>
            </div>
          </div>

          {/* More from Provider Section */}
          {moreFromProvider.length > 0 && (
            <div className="w-full max-w-5xl mt-8">
              <GameRow
                title={`More from ${game.provider}`}
                icon={
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
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
        <Footer />
      </main>
    </div>
  );
}
