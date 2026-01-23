"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import GameRow from "@/components/GameRow";
import LiveWinsFeed from "@/components/LiveWinsFeed";
import LiveChat from "@/components/LiveChat";

// Game data with real thumbnails
const popularGames = [
  { id: "1", title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza.webp", isHot: true, players: 1284 },
  { id: "2", title: "Gates of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp", isHot: true, players: 2156 },
  { id: "3", title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BigBassBonanza.webp", players: 892 },
  { id: "4", title: "Starlight Princess", provider: "Pragmatic Play", image: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp", isHot: true, players: 1876 },
  { id: "5", title: "Sugar Rush", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SugarRushSuperScatter.webp", players: 1567 },
  { id: "6", title: "Reactoonz 2", provider: "Play'n GO", image: "/games/playngo_reactoonztwo.webp", players: 521 },
  { id: "7", title: "Tome of Madness", provider: "Play'n GO", image: "/games/playngo_TomeofMadness.webp", players: 743 },
  { id: "8", title: "Buffalo King Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BuffaloKingMegaways1.webp", isHot: true, players: 1432 },
  { id: "9", title: "Hercules and Pegasus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_HerculesandPegasus.webp", players: 934 },
  { id: "10", title: "Fortune of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_FortuneofOlympus.webp", players: 1123 },
  { id: "11", title: "Sweet Bonanza 1000", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza1000.webp", players: 876 },
  { id: "12", title: "Fruit Party", provider: "Pragmatic Play", image: "/games/pragmaticexternal_FruitParty1.webp", players: 654 },
  { id: "13", title: "Santa's Wonderland", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SantasWonderland.webp", players: 567 },
  { id: "14", title: "Madame Destiny Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_MadameDestinyMegaways1.webp", players: 654 },
];

const liveGames = [
  { id: "l1", title: "X Roulette", provider: "Rollbit", image: "/games/rollbit_xroulette.webp", isLive: true, players: 234 },
  { id: "l2", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", isLive: true, isHot: true, players: 1532 },
  { id: "l3", title: "X Flip", provider: "Rollbit", image: "/games/rollbit_xflip.webp", isLive: true, players: 876 },
  { id: "l4", title: "Roller Coaster", provider: "Rollbit", image: "/games/rollbit_rollercoaster.webp", isLive: true, players: 432 },
  { id: "l5", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp", isLive: true, players: 567 },
  { id: "l6", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", isLive: true, isHot: true, players: 1234 },
  { id: "l7", title: "Life and Death", provider: "Hacksaw Gaming", image: "/games/hacksaw_LifeandDeath.webp", isLive: true, players: 345 },
  { id: "l8", title: "Fred's Food Truck", provider: "Hacksaw Gaming", image: "/games/hacksaw_FredsFoodTruck.webp", isLive: true, players: 678 },
  { id: "l9", title: "Pray for Three 96", provider: "Hacksaw Gaming", image: "/games/hacksaw_PrayforThree96.webp", isLive: true, players: 432 },
  { id: "l10", title: "Barbarossa", provider: "Peter & Sons", image: "/games/peterandsons_BarbarossaDragonEmpire.webp", isLive: true, players: 234 },
];

const newReleases = [
  { id: "n1", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp", isNew: true, players: 2341 },
  { id: "n2", title: "Life and Death", provider: "Hacksaw Gaming", image: "/games/hacksaw_LifeandDeath.webp", isNew: true, isHot: true, players: 1876 },
  { id: "n3", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", isNew: true, players: 987 },
  { id: "n4", title: "Fred's Food Truck", provider: "Hacksaw Gaming", image: "/games/hacksaw_FredsFoodTruck.webp", isNew: true, players: 654 },
  { id: "n5", title: "Pray for Three 96", provider: "Hacksaw Gaming", image: "/games/hacksaw_PrayforThree96.webp", isNew: true, players: 543 },
  { id: "n6", title: "Fortune of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_FortuneofOlympus.webp", isNew: true, players: 765 },
  { id: "n7", title: "Barbarossa", provider: "Peter & Sons", image: "/games/peterandsons_BarbarossaDragonEmpire.webp", isNew: true, players: 432 },
  { id: "n8", title: "Rollbot Bonanza", provider: "Rollbit", image: "/games/rollbit_rollbotbonanza.webp", isNew: true, isHot: true, players: 1567 },
  { id: "n9", title: "Rollbox", provider: "Rollbit", image: "/games/rollbit_rollbox.webp", isNew: true, players: 876 },
  { id: "n10", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", isNew: true, players: 1234 },
];

const tableGames = [
  { id: "t1", title: "X Roulette", provider: "Rollbit", image: "/games/rollbit_xroulette.webp", players: 234 },
  { id: "t2", title: "X Flip", provider: "Rollbit", image: "/games/rollbit_xflip.webp", players: 187 },
  { id: "t3", title: "Mines", provider: "Rollbit", image: "/games/rollbit_mines.webp", players: 321 },
  { id: "t4", title: "Plinko", provider: "Rollbit", image: "/games/rollbit_plinko.webp", players: 234 },
  { id: "t5", title: "Roller Coaster", provider: "Rollbit", image: "/games/rollbit_rollercoaster.webp", players: 143 },
  { id: "t6", title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza.webp", players: 567 },
  { id: "t7", title: "Gates of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp", players: 432 },
  { id: "t8", title: "Starlight Princess", provider: "Pragmatic Play", image: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp", players: 345 },
  { id: "t9", title: "Sugar Rush", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SugarRushSuperScatter.webp", players: 198 },
  { id: "t10", title: "Reactoonz 2", provider: "Play'n GO", image: "/games/playngo_reactoonztwo.webp", players: 156 },
];

const jackpotGames = [
  { id: "j1", title: "Buffalo King Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BuffaloKingMegaways1.webp", isHot: true, players: 3421 },
  { id: "j2", title: "Madame Destiny Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_MadameDestinyMegaways1.webp", players: 1234 },
  { id: "j3", title: "Hercules and Pegasus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_HerculesandPegasus.webp", players: 876 },
  { id: "j4", title: "Fortune of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_FortuneofOlympus.webp", isHot: true, players: 2156 },
  { id: "j5", title: "Tome of Madness", provider: "Play'n GO", image: "/games/playngo_TomeofMadness.webp", players: 543 },
  { id: "j6", title: "Rollbot Bonanza", provider: "Rollbit", image: "/games/rollbit_rollbotbonanza.webp", isHot: true, players: 1876 },
  { id: "j7", title: "Rollbox", provider: "Rollbit", image: "/games/rollbit_rollbox.webp", players: 765 },
  { id: "j8", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", players: 987 },
  { id: "j9", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", players: 654 },
  { id: "j10", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp", players: 567 },
];

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="min-h-screen bg-dicey-dark">
      <Header />
      <Sidebar />

      {/* Live Chat */}
      <LiveChat isOpen={isChatOpen} onToggle={() => setIsChatOpen(!isChatOpen)} />

      {/* Main Content */}
      <main className={`ml-60 pt-16 transition-[margin] duration-300 ${isChatOpen ? 'mr-80' : 'mr-0'}`}>
        <div className="p-6 max-w-[1440px] mx-auto">
          <HeroBanner />

          {/* Live Wins Feed */}
          <LiveWinsFeed />

          {/* Popular Games */}
          <GameRow
            title="Popular Games"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            games={popularGames}
          />

          {/* Live Casino */}
          <GameRow
            title="Live Casino"
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            }
            games={liveGames}
          />

          {/* New Releases */}
          <GameRow
            title="New Releases"
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <circle cx="7" cy="7" r="1.5" fill="currentColor" />
              </svg>
            }
            games={newReleases}
          />

          {/* Table Games */}
          <GameRow
            title="Table Games"
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M8 8h2v8H8zM14 8h2v8h-2z" fill="currentColor" />
              </svg>
            }
            games={tableGames}
          />

          {/* Jackpot Games */}
          <GameRow
            title="Jackpot Games"
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            }
            games={jackpotGames}
          />
        </div>
      </main>
    </div>
  );
}
