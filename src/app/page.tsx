"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BiSolidBolt,
  BiSolidDice5,
  BiSolidGame,
  BiSolidGridAlt,
  BiSolidPurchaseTag,
  BiSolidStar,
  BiSolidVideo,
} from "react-icons/bi";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeroBanner from "@/components/HeroBanner";
import BetClubBanner from "@/components/BetClubBanner";
import GameRow from "@/components/GameRow";
import LiveWinsFeed from "@/components/LiveWinsFeed";
import LiveChat from "@/components/LiveChat";
import SportsContent from "@/components/SportsContent";
import LiveBetsTable from "@/components/LiveBetsTable";
import Footer from "@/components/Footer";
import ProvidersRow from "@/components/ProvidersRow";
import GameFilters from "@/components/GameFilters";
import ConfidentialityModal from "@/components/ConfidentialityModal";
import SignUpModal from "@/components/SignUpModal";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useTab } from "@/context/TabContext";

import type { Game } from "@/components/GameRow";
import { originalGames } from "@/lib/originalGames";

// Game data with real thumbnails
const popularGames: Game[] = [
  { id: "1", title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza.webp", category: "slots", isHot: true, players: 1284, rtp: 96.51 },
  { id: "2", title: "Gates of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp", category: "slots", isHot: true, players: 2156, rtp: 96.50 },
  { id: "3", title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BigBassBonanza.webp", category: "slots", players: 892, rtp: 96.71 },
  { id: "4", title: "Starlight Princess", provider: "Pragmatic Play", image: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp", category: "slots", isHot: true, players: 1876, rtp: 96.50 },
  { id: "5", title: "Sugar Rush", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SugarRushSuperScatter.webp", category: "slots", players: 1567, rtp: 96.50 },
  { id: "6", title: "Reactoonz 2", provider: "Play'n GO", image: "/games/playngo_reactoonztwo.webp", category: "slots", players: 521, rtp: 96.20 },
  { id: "7", title: "Tome of Madness", provider: "Play'n GO", image: "/games/playngo_TomeofMadness.webp", category: "jackpot", players: 743, rtp: 96.59 },
  { id: "8", title: "Buffalo King Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BuffaloKingMegaways1.webp", category: "jackpot", isHot: true, players: 1432, rtp: 96.52 },
  { id: "9", title: "Hercules and Pegasus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_HerculesandPegasus.webp", category: "slots", players: 934, rtp: 96.50 },
  { id: "10", title: "Fortune of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_FortuneofOlympus.webp", category: "slots", players: 1123, rtp: 96.50 },
  { id: "11", title: "Sweet Bonanza 1000", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza1000.webp", category: "slots", players: 876, rtp: 96.53 },
  { id: "12", title: "Fruit Party", provider: "Pragmatic Play", image: "/games/pragmaticexternal_FruitParty1.webp", category: "slots", players: 654, rtp: 96.47 },
  { id: "13", title: "Santa's Wonderland", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SantasWonderland.webp", category: "slots", players: 567, rtp: 96.67 },
  { id: "14", title: "Madame Destiny Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_MadameDestinyMegaways1.webp", category: "jackpot", players: 654, rtp: 96.56 },
  { id: "15", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", category: "table", isHot: true, players: 1987, rtp: 99.00 },
  { id: "16", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", category: "slots", players: 1543, rtp: 96.38 },
  { id: "17", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp", category: "slots", players: 1234, rtp: 96.25 },
  { id: "18", title: "Rollbot Bonanza", provider: "Rollbit", image: "/games/rollbit_rollbotbonanza.webp", category: "jackpot", isHot: true, players: 1678, rtp: 97.00 },
  { id: "19", title: "Mines", provider: "Rollbit", image: "/games/rollbit_mines.webp", category: "table", players: 987, rtp: 99.00 },
  { id: "20", title: "Plinko", provider: "Rollbit", image: "/games/rollbit_plinko.webp", category: "table", players: 876, rtp: 99.00 },
];

const liveGames: Game[] = [
  { id: "l1", title: "X Roulette", provider: "Rollbit", image: "/games/rollbit_xroulette.webp", category: "live", isLive: true, players: 234, rtp: 97.30 },
  { id: "l2", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", category: "live", isLive: true, isHot: true, players: 1532, rtp: 99.00 },
  { id: "l3", title: "X Flip", provider: "Rollbit", image: "/games/rollbit_xflip.webp", category: "live", isLive: true, players: 876, rtp: 98.00 },
  { id: "l4", title: "Roller Coaster", provider: "Rollbit", image: "/games/rollbit_rollercoaster.webp", category: "live", isLive: true, players: 432, rtp: 97.50 },
  { id: "l5", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp", category: "live", isLive: true, players: 567, rtp: 96.25 },
  { id: "l6", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", category: "live", isLive: true, isHot: true, players: 1234, rtp: 96.38 },
  { id: "l7", title: "Life and Death", provider: "Hacksaw Gaming", image: "/games/hacksaw_LifeandDeath.webp", category: "live", isLive: true, players: 345, rtp: 96.29 },
  { id: "l8", title: "Fred's Food Truck", provider: "Hacksaw Gaming", image: "/games/hacksaw_FredsFoodTruck.webp", category: "live", isLive: true, players: 678, rtp: 96.30 },
  { id: "l9", title: "Pray for Three 96", provider: "Hacksaw Gaming", image: "/games/hacksaw_PrayforThree96.webp", category: "live", isLive: true, players: 432, rtp: 96.00 },
  { id: "l10", title: "Barbarossa", provider: "Peter & Sons", image: "/games/peterandsons_BarbarossaDragonEmpire.webp", category: "live", isLive: true, players: 234, rtp: 96.20 },
  { id: "l11", title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza.webp", category: "live", isLive: true, players: 1876, rtp: 96.51 },
  { id: "l12", title: "Gates of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp", category: "live", isLive: true, isHot: true, players: 2341, rtp: 96.50 },
  { id: "l13", title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BigBassBonanza.webp", category: "live", isLive: true, players: 987, rtp: 96.71 },
  { id: "l14", title: "Starlight Princess", provider: "Pragmatic Play", image: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp", category: "live", isLive: true, players: 1567, rtp: 96.50 },
  { id: "l15", title: "Mines", provider: "Rollbit", image: "/games/rollbit_mines.webp", category: "live", isLive: true, players: 654, rtp: 99.00 },
  { id: "l16", title: "Plinko", provider: "Rollbit", image: "/games/rollbit_plinko.webp", category: "live", isLive: true, players: 543, rtp: 99.00 },
  { id: "l17", title: "Rollbot Bonanza", provider: "Rollbit", image: "/games/rollbit_rollbotbonanza.webp", category: "live", isLive: true, isHot: true, players: 1987, rtp: 97.00 },
  { id: "l18", title: "Sugar Rush", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SugarRushSuperScatter.webp", category: "live", isLive: true, players: 876, rtp: 96.50 },
];

const newReleases: Game[] = [
  { id: "n1", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp", category: "new", isNew: true, players: 2341, rtp: 96.25 },
  { id: "n2", title: "Life and Death", provider: "Hacksaw Gaming", image: "/games/hacksaw_LifeandDeath.webp", category: "new", isNew: true, isHot: true, players: 1876, rtp: 96.29 },
  { id: "n3", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", category: "new", isNew: true, players: 987, rtp: 96.38 },
  { id: "n4", title: "Fred's Food Truck", provider: "Hacksaw Gaming", image: "/games/hacksaw_FredsFoodTruck.webp", category: "new", isNew: true, players: 654, rtp: 96.30 },
  { id: "n5", title: "Pray for Three 96", provider: "Hacksaw Gaming", image: "/games/hacksaw_PrayforThree96.webp", category: "new", isNew: true, players: 543, rtp: 96.00 },
  { id: "n6", title: "Fortune of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_FortuneofOlympus.webp", category: "new", isNew: true, players: 765, rtp: 96.50 },
  { id: "n7", title: "Barbarossa", provider: "Peter & Sons", image: "/games/peterandsons_BarbarossaDragonEmpire.webp", category: "new", isNew: true, players: 432, rtp: 96.20 },
  { id: "n8", title: "Rollbot Bonanza", provider: "Rollbit", image: "/games/rollbit_rollbotbonanza.webp", category: "new", isNew: true, isHot: true, players: 1567, rtp: 97.00 },
  { id: "n9", title: "Rollbox", provider: "Rollbit", image: "/games/rollbit_rollbox.webp", category: "new", isNew: true, players: 876, rtp: 98.50 },
  { id: "n10", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", category: "new", isNew: true, players: 1234, rtp: 99.00 },
  { id: "n11", title: "Sweet Bonanza 1000", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza1000.webp", category: "new", isNew: true, players: 1654, rtp: 96.53 },
  { id: "n12", title: "Buffalo King Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BuffaloKingMegaways1.webp", category: "new", isNew: true, isHot: true, players: 2134, rtp: 96.52 },
  { id: "n13", title: "Reactoonz 2", provider: "Play'n GO", image: "/games/playngo_reactoonztwo.webp", category: "new", isNew: true, players: 876, rtp: 96.20 },
  { id: "n14", title: "Tome of Madness", provider: "Play'n GO", image: "/games/playngo_TomeofMadness.webp", category: "new", isNew: true, players: 765, rtp: 96.59 },
  { id: "n15", title: "X Roulette", provider: "Rollbit", image: "/games/rollbit_xroulette.webp", category: "new", isNew: true, players: 543, rtp: 97.30 },
  { id: "n16", title: "X Flip", provider: "Rollbit", image: "/games/rollbit_xflip.webp", category: "new", isNew: true, players: 654, rtp: 98.00 },
  { id: "n17", title: "Mines", provider: "Rollbit", image: "/games/rollbit_mines.webp", category: "new", isNew: true, players: 432, rtp: 99.00 },
  { id: "n18", title: "Plinko", provider: "Rollbit", image: "/games/rollbit_plinko.webp", category: "new", isNew: true, players: 543, rtp: 99.00 },
];

const tableGames: Game[] = [
  { id: "t1", title: "X Roulette", provider: "Rollbit", image: "/games/rollbit_xroulette.webp", category: "table", players: 234, rtp: 97.30 },
  { id: "t2", title: "X Flip", provider: "Rollbit", image: "/games/rollbit_xflip.webp", category: "table", players: 187, rtp: 98.00 },
  { id: "t3", title: "Mines", provider: "Rollbit", image: "/games/rollbit_mines.webp", category: "table", players: 321, rtp: 99.00 },
  { id: "t4", title: "Plinko", provider: "Rollbit", image: "/games/rollbit_plinko.webp", category: "table", players: 234, rtp: 99.00 },
  { id: "t5", title: "Roller Coaster", provider: "Rollbit", image: "/games/rollbit_rollercoaster.webp", category: "table", players: 143, rtp: 97.50 },
  { id: "t6", title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza.webp", category: "table", players: 567, rtp: 96.51 },
  { id: "t7", title: "Gates of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp", category: "table", players: 432, rtp: 96.50 },
  { id: "t8", title: "Starlight Princess", provider: "Pragmatic Play", image: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp", category: "table", players: 345, rtp: 96.50 },
  { id: "t9", title: "Sugar Rush", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SugarRushSuperScatter.webp", category: "table", players: 198, rtp: 96.50 },
  { id: "t10", title: "Reactoonz 2", provider: "Play'n GO", image: "/games/playngo_reactoonztwo.webp", category: "table", players: 156, rtp: 96.20 },
  { id: "t11", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", category: "table", isHot: true, players: 1876, rtp: 99.00 },
  { id: "t12", title: "Rollbot Bonanza", provider: "Rollbit", image: "/games/rollbit_rollbotbonanza.webp", category: "table", players: 987, rtp: 97.00 },
  { id: "t13", title: "Rollbox", provider: "Rollbit", image: "/games/rollbit_rollbox.webp", category: "table", players: 654, rtp: 98.50 },
  { id: "t14", title: "Big Bass Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BigBassBonanza.webp", category: "table", players: 543, rtp: 96.71 },
  { id: "t15", title: "Buffalo King Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BuffaloKingMegaways1.webp", category: "table", isHot: true, players: 1234, rtp: 96.52 },
  { id: "t16", title: "Tome of Madness", provider: "Play'n GO", image: "/games/playngo_TomeofMadness.webp", category: "table", players: 432, rtp: 96.59 },
  { id: "t17", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp", category: "table", players: 567, rtp: 96.25 },
  { id: "t18", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", category: "table", players: 876, rtp: 96.38 },
];

const jackpotGames: Game[] = [
  { id: "j1", title: "Buffalo King Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_BuffaloKingMegaways1.webp", category: "jackpot", isHot: true, players: 3421, rtp: 96.52 },
  { id: "j2", title: "Madame Destiny Megaways", provider: "Pragmatic Play", image: "/games/pragmaticexternal_MadameDestinyMegaways1.webp", category: "jackpot", players: 1234, rtp: 96.56 },
  { id: "j3", title: "Hercules and Pegasus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_HerculesandPegasus.webp", category: "jackpot", players: 876, rtp: 96.50 },
  { id: "j4", title: "Fortune of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_FortuneofOlympus.webp", category: "jackpot", isHot: true, players: 2156, rtp: 96.50 },
  { id: "j5", title: "Tome of Madness", provider: "Play'n GO", image: "/games/playngo_TomeofMadness.webp", category: "jackpot", players: 543, rtp: 96.59 },
  { id: "j6", title: "Rollbot Bonanza", provider: "Rollbit", image: "/games/rollbit_rollbotbonanza.webp", category: "jackpot", isHot: true, players: 1876, rtp: 97.00 },
  { id: "j7", title: "Rollbox", provider: "Rollbit", image: "/games/rollbit_rollbox.webp", category: "jackpot", players: 765, rtp: 98.50 },
  { id: "j8", title: "X Crash", provider: "Rollbit", image: "/games/rollbit_xcrash.webp", category: "jackpot", players: 987, rtp: 99.00 },
  { id: "j9", title: "Wanted Dead or Wild", provider: "Hacksaw Gaming", image: "/games/hacksaw_WantedDeadoraWild.webp", category: "jackpot", players: 654, rtp: 96.38 },
  { id: "j10", title: "Le Zeus", provider: "Hacksaw Gaming", image: "/games/hacksaw_LeZeus.webp", category: "jackpot", players: 567, rtp: 96.25 },
  { id: "j11", title: "Sweet Bonanza", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza.webp", category: "jackpot", isHot: true, players: 2876, rtp: 96.51 },
  { id: "j12", title: "Gates of Olympus", provider: "Pragmatic Play", image: "/games/pragmaticexternal_GatesofOlympusSuperScatter.webp", category: "jackpot", isHot: true, players: 3156, rtp: 96.50 },
  { id: "j13", title: "Starlight Princess", provider: "Pragmatic Play", image: "/games/pragmaticexternal_StarlightPrincessSuperScatter.webp", category: "jackpot", players: 1987, rtp: 96.50 },
  { id: "j14", title: "Sugar Rush", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SugarRushSuperScatter.webp", category: "jackpot", players: 1654, rtp: 96.50 },
  { id: "j15", title: "Reactoonz 2", provider: "Play'n GO", image: "/games/playngo_reactoonztwo.webp", category: "jackpot", players: 876, rtp: 96.20 },
  { id: "j16", title: "Life and Death", provider: "Hacksaw Gaming", image: "/games/hacksaw_LifeandDeath.webp", category: "jackpot", players: 765, rtp: 96.29 },
  { id: "j17", title: "Barbarossa", provider: "Peter & Sons", image: "/games/peterandsons_BarbarossaDragonEmpire.webp", category: "jackpot", players: 543, rtp: 96.20 },
  { id: "j18", title: "Sweet Bonanza 1000", provider: "Pragmatic Play", image: "/games/pragmaticexternal_SweetBonanza1000.webp", category: "jackpot", isHot: true, players: 2345, rtp: 96.53 },
];

const providers = [
  { id: "p1", name: "Nolimit City", logo: "/providers/logo_3_2_bw_white.svg", gameCount: 87 },
  { id: "p2", name: "Pragmatic Play", logo: "/providers/logo_3_2_bw_white (1).svg", gameCount: 342 },
  { id: "p3", name: "Hacksaw Gaming", logo: "/providers/logo_3_2_bw_white (2).svg", gameCount: 156 },
  { id: "p4", name: "Play'n GO", logo: "/providers/logo_3_2_bw_white (3).svg", gameCount: 289 },
  { id: "p5", name: "Evolution", logo: "/providers/logo_3_2_bw_white (4).svg", gameCount: 178 },
  { id: "p6", name: "Backseat Gaming", logo: "/providers/logo_3_2_bw_white (5).svg", gameCount: 45 },
  { id: "p7", name: "Big Time Gaming", logo: "/providers/logo_3_2_bw_white (6).svg", gameCount: 67 },
  { id: "p8", name: "NetEnt", logo: "/providers/logo_3_2_bw_white (7).svg", gameCount: 234 },
  { id: "p9", name: "BGaming", logo: "/providers/logo_3_2_bw_white (8).svg", gameCount: 123 },
  { id: "p10", name: "Red Tiger", logo: "/providers/logo_3_2_bw_white (9).svg", gameCount: 198 },
  { id: "p11", name: "PG Soft", logo: "/providers/logo_3_2_bw_white (10).svg", gameCount: 156 },
  { id: "p12", name: "Playtech", logo: "/providers/logo_3_2_bw_white (11).svg", gameCount: 312 },
];

// Combine all games for filtering
const allGames: Game[] = [...popularGames, ...liveGames, ...newReleases, ...tableGames, ...jackpotGames];

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const { activeTab, isSidebarCollapsed, isChatOpen, toggleChat } = useTab();
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const signUpShown = useRef(false);

  // Visual-only sign up prompt: appears once per page load, after the confidentiality notice is accepted
  const handleConfidentialityAccepted = useCallback(() => {
    if (signUpShown.current) return;
    signUpShown.current = true;
    setTimeout(() => setIsSignUpOpen(true), 400);
  }, []);

  const handleGameSelect = (game: Game) => {
    router.push(`/game/${game.id}`);
  };

  // Filter and sort games based on selected category
  const getFilteredGames = (games: Game[]) => {
    let filtered = games;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = games.filter(game => game.category === selectedCategory);
    }

    // Apply sorting
    switch (sortOption) {
      case "popularity-desc":
        filtered = [...filtered].sort((a, b) => (b.players || 0) - (a.players || 0));
        break;
      case "popularity-asc":
        filtered = [...filtered].sort((a, b) => (a.players || 0) - (b.players || 0));
        break;
      case "a-z":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "oldest":
        filtered = [...filtered].sort((a, b) => (a.isNew ? 1 : 0) - (b.isNew ? 1 : 0));
        break;
    }

    return filtered;
  };

  // Check if a category should be shown based on filter
  const shouldShowCategory = (categoryId: string) => {
    return selectedCategory === "all" || selectedCategory === categoryId;
  };

  return (
    <div className="min-h-dvh">
      {/* Confidentiality Modal - manages its own visibility via localStorage */}
      <ConfidentialityModal onAccept={handleConfidentialityAccepted} />
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />

      <Header />
      <Sidebar />

      {/* Live Chat */}
      <LiveChat isOpen={isChatOpen} onToggle={toggleChat} />

      {/* Main Content */}
      <main className={`pt-[calc(4rem+env(safe-area-inset-top,0px))] pb-[calc(5rem+env(safe-area-inset-bottom,0px))] lg:pb-0 ${isSidebarCollapsed ? 'lg:ml-[88px]' : 'lg:ml-[272px]'} ${isChatOpen ? 'lg:mr-80' : 'mr-0'}`}>
        <div className="px-4 py-6 sm:p-6 xl:p-8 max-w-[1440px] mx-auto">
          <h1 className="sr-only">Elixir casino and sports</h1>
          {activeTab === "casino" ? (
            <>
              <HeroBanner
                onBrowseOriginals={() => {
                  setSelectedCategory("all");
                  requestAnimationFrame(() => document.getElementById("elixir-originals")?.focus());
                }}
                onBrowseGames={() => {
                  setSelectedCategory("all");
                  requestAnimationFrame(() => document.getElementById("popular-games")?.focus());
                }}
              />

              {/* Live Wins Feed */}
              <LiveWinsFeed />

              {/* Game Filters */}
              <GameFilters
                onCategoryChange={(category) => setSelectedCategory(category)}
                onSortChange={(sort) => setSortOption(sort)}
              />

              {getFilteredGames(originalGames).length > 0 && (
                <GameRow
                  title="Elixir Originals"
                  icon={<img src="/elixir-originals-icon.jpg" alt="" className="size-6 rounded-md object-cover" />}
                  games={getFilteredGames(originalGames)}
                  showViewAll={false}
                  onGameSelect={handleGameSelect}
                />
              )}

              {/* New Releases */}
              {shouldShowCategory("new") && getFilteredGames(newReleases).length > 0 && (
                <GameRow
                  title="New Releases"
                  icon={<BiSolidPurchaseTag className="size-5" />}
                  games={getFilteredGames(newReleases)}
                  onGameSelect={handleGameSelect}
                />
              )}

              {/* Popular Games - Second (shows slots) */}
              {shouldShowCategory("slots") && getFilteredGames(popularGames).length > 0 && (
                <GameRow
                  title="Popular Games"
                  icon={<BiSolidBolt className="size-5" />}
                  games={getFilteredGames(popularGames)}
                  onGameSelect={handleGameSelect}
                />
              )}

              {/* Live Casino */}
              {shouldShowCategory("live") && getFilteredGames(liveGames).length > 0 && (
                <GameRow
                  title="Live Casino"
                  icon={<BiSolidVideo className="size-5" />}
                  games={getFilteredGames(liveGames)}
                  onGameSelect={handleGameSelect}
                />
              )}

              {/* Table Games */}
              {shouldShowCategory("table") && getFilteredGames(tableGames).length > 0 && (
                <GameRow
                  title="Table Games"
                  icon={<BiSolidGame className="size-5" />}
                  games={getFilteredGames(tableGames)}
                  onGameSelect={handleGameSelect}
                />
              )}

              {/* Jackpot Games */}
              {shouldShowCategory("jackpot") && getFilteredGames(jackpotGames).length > 0 && (
                <GameRow
                  title="Jackpot Games"
                  icon={<BiSolidStar className="size-5" />}
                  games={getFilteredGames(jackpotGames)}
                  onGameSelect={handleGameSelect}
                />
              )}

              {/* Providers Section */}
              <ProvidersRow
                title="Providers"
                icon={<BiSolidGridAlt className="size-5" />}
                providers={providers}
              />

              {/* Live Bets Table */}
              <LiveBetsTable />

              {/* Footer */}
              <Footer />
            </>
          ) : (
            <>
              <SportsContent />
              <Footer />
            </>
          )}
        </div>
      </main>
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
