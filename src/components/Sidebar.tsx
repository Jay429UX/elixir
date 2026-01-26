"use client";

import { useState, useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";
import { useTab } from "@/context/TabContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import {
  DiceFive as DiceIcon,
  Bomb as MinesIcon,
  Rocket as LimboIcon,
  Coin as CoinflipIcon,
  Cards as BlackjackIcon,
  DiamondsFour as SlotsIcon,
  VideoCamera as LiveCasinoIcon,
  CircleNotch as RouletteIcon,
  Stack as OriginalsIcon,
  SoccerBall as FootballIcon,
  Basketball as BasketballIcon,
  TennisBall as TennisIcon,
  Hockey as HockeyIcon,
  Football as AmericanFootballIcon,
  GameController as EsportsIcon,
  Gift as PromotionsIcon,
  Bank as HouseIcon,
  CaretDown,
  SidebarSimple,
  Spade as CasinoIcon,
} from "@phosphor-icons/react";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

interface OriginalGame {
  icon: React.ReactNode;
  label: string;
}

export default function Sidebar() {
  const { activeTab, setActiveTab, isSidebarCollapsed, toggleSidebar } = useTab();
  const [originalsOpen, setOriginalsOpen] = useState(false);
  const [casinoOpen, setCasinoOpen] = useState(false);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  // Play logo animation every 4 seconds
  useEffect(() => {
    if (!dotLottie) return;

    const interval = setInterval(() => {
      dotLottie.play();
    }, 4000);

    return () => clearInterval(interval);
  }, [dotLottie]);

  const originalGames: OriginalGame[] = [
    {
      icon: <DiceIcon weight="fill" className="w-4 h-4" />,
      label: "Dice",
    },
    {
      icon: <MinesIcon weight="fill" className="w-4 h-4" />,
      label: "Mines",
    },
    {
      icon: <LimboIcon weight="fill" className="w-4 h-4" />,
      label: "Limbo",
    },
    {
      icon: <CoinflipIcon weight="fill" className="w-4 h-4" />,
      label: "Coinflip",
    },
    {
      icon: <BlackjackIcon weight="fill" className="w-4 h-4" />,
      label: "Blackjack",
    },
  ];

  // Casino dropdown items
  const casinoDropdownItems: NavItem[] = [
    {
      icon: <SlotsIcon weight="fill" className="w-4 h-4" />,
      label: "Slots",
    },
    {
      icon: <LiveCasinoIcon weight="fill" className="w-4 h-4" />,
      label: "Live Casino",
    },
    {
      icon: <RouletteIcon weight="bold" className="w-4 h-4" />,
      label: "Roulette",
    },
    {
      icon: <BlackjackIcon weight="fill" className="w-4 h-4" />,
      label: "Blackjack",
    },
  ];

  const sportsNavItems: NavItem[] = [
    {
      icon: <FootballIcon weight="fill" className="w-5 h-5" />,
      label: "Football",
    },
    {
      icon: <BasketballIcon weight="fill" className="w-5 h-5" />,
      label: "Basketball",
    },
    {
      icon: <TennisIcon weight="fill" className="w-5 h-5" />,
      label: "Tennis",
    },
    {
      icon: <HockeyIcon weight="fill" className="w-5 h-5" />,
      label: "Ice Hockey",
    },
    {
      icon: <AmericanFootballIcon weight="fill" className="w-5 h-5" />,
      label: "American Football",
    },
    {
      icon: <EsportsIcon weight="fill" className="w-5 h-5" />,
      label: "Esports",
    },
  ];

  const { theme } = useTheme();

  const sidebarGradient = theme === "green"
    ? 'radial-gradient(ellipse 120% 40% at 50% 0%, rgba(34, 197, 94, 0.15) 0%, #262827 50%)'
    : 'radial-gradient(ellipse 120% 40% at 50% 0%, rgba(75, 45, 120, 0.25) 0%, #2a1d42 50%)';

  return (
    <aside
      className={cn("fixed left-4 top-4 bottom-4 rounded-2xl overflow-y-auto transition-all duration-200 z-50 hidden lg:block", isSidebarCollapsed ? "w-16" : "w-60")}
      style={{
        background: sidebarGradient,
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center">
        <a href="/" className="flex items-center">
          <DotLottieReact
            src="/animations/dicey-dice.json"
            autoplay
            loop={false}
            dotLottieRefCallback={setDotLottie}
            style={{ width: isSidebarCollapsed ? '43px' : '95px', height: 'auto' }}
          />
        </a>
      </div>

      <div className={`${isSidebarCollapsed ? 'p-2' : 'p-5'}`}>
        {/* Casino / Sports Toggle */}
        {isSidebarCollapsed ? (
          <div className="flex flex-col gap-2 mb-6">
            <button
              onClick={() => setActiveTab("casino")}
              className={cn(
                "p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center",
                activeTab === "casino"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white hover:bg-dicey-border"
              )}
              title="Casino"
            >
              <CasinoIcon weight="fill" className="size-5" />
            </button>
            <button
              onClick={() => setActiveTab("sports")}
              className={cn(
                "p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center",
                activeTab === "sports"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white hover:bg-dicey-border"
              )}
              title="Sports"
            >
              <FootballIcon weight="fill" className="size-5" />
            </button>
          </div>
        ) : (
          <div className="flex bg-dicey-darker rounded-xl p-1 mb-6">
            <button
              onClick={() => setActiveTab("casino")}
              className={cn(
                "flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg transition-all duration-200",
                activeTab === "casino"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              )}
              title="Casino"
            >
              <CasinoIcon weight="fill" className="size-5" />
            </button>
            <button
              onClick={() => setActiveTab("sports")}
              className={cn(
                "flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg transition-all duration-200",
                activeTab === "sports"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              )}
              title="Sports"
            >
              <FootballIcon weight="fill" className="size-5" />
            </button>
          </div>
        )}

        {/* Original Games - Casino Only */}
        {activeTab === "casino" && (
          <div className="mb-6">
            {isSidebarCollapsed ? (
              <button
                className="w-full flex items-center justify-center p-2.5 text-gray-400 hover:text-white hover:bg-dicey-border rounded-lg transition-colors"
                title="Original Games"
              >
                <OriginalsIcon weight="fill" className="w-5 h-5" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setOriginalsOpen(!originalsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-white bg-dicey-card hover:bg-dicey-border rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <OriginalsIcon weight="fill" className="w-5 h-5" />
                    <span className="text-sm font-medium">Original Games</span>
                  </div>
                  <CaretDown
                    weight="fill"
                    className={cn("size-3 text-gray-400 transition-transform duration-200", originalsOpen && "rotate-180")}
                  />
                </button>

                {originalsOpen && (
                  <div className="mt-1 ml-2">
                    {originalGames.map((game) => (
                      <button
                        key={game.label}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-dicey-card rounded-r-lg transition-colors"
                      >
                        <span className="text-gray-500">{game.icon}</span>
                        <span className="text-sm">{game.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Casino Dropdown - Casino Only */}
        {activeTab === "casino" && (
          <div className="mb-4">
            {isSidebarCollapsed ? (
              <button
                className="w-full flex items-center justify-center p-2.5 text-gray-400 hover:text-white hover:bg-dicey-border rounded-lg transition-colors"
                title="Casino"
              >
                <SlotsIcon weight="fill" className="w-5 h-5" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => setCasinoOpen(!casinoOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-white bg-dicey-card hover:bg-dicey-border rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <SlotsIcon weight="fill" className="w-5 h-5" />
                    <span className="text-sm font-medium">Casino</span>
                  </div>
                  <CaretDown
                    weight="fill"
                    className={cn("size-3 text-gray-400 transition-transform duration-200", casinoOpen && "rotate-180")}
                  />
                </button>

                {casinoOpen && (
                  <div className="mt-1 ml-2">
                    {casinoDropdownItems.map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-dicey-card rounded-r-lg transition-colors"
                      >
                        <span className="text-gray-500">{item.icon}</span>
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Sports Categories - Sports Only */}
        {activeTab === "sports" && (
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                Sports
              </h3>
            )}
            <nav className="space-y-1">
              {sportsNavItems.map((item) => (
                <button
                  key={item.label}
                  className={cn(
                    "w-full flex items-center text-gray-300 hover:text-white hover:bg-dicey-card rounded-lg transition-colors duration-200 group",
                    isSidebarCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
                  )}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <span className="text-gray-500 group-hover:text-white transition-colors duration-200">
                    {item.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Promotions Link */}
        <div className="mb-1">
          <button
            className={cn(
              "w-full flex items-center text-gray-300 hover:text-white hover:bg-dicey-card rounded-lg transition-colors duration-200 group",
              isSidebarCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
            )}
            title={isSidebarCollapsed ? "Promotions" : undefined}
          >
            <span className="text-gray-500 group-hover:text-white transition-colors duration-200">
              <PromotionsIcon weight="fill" className="w-5 h-5" />
            </span>
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium">Promotions</span>
            )}
          </button>
        </div>

        {/* Be the House Link */}
        <div className="mb-4">
          <button
            className={cn(
              "w-full flex items-center text-gray-300 hover:text-white hover:bg-dicey-card rounded-lg transition-colors duration-200 group",
              isSidebarCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
            )}
            title={isSidebarCollapsed ? "Be the House" : undefined}
          >
            <span className="text-gray-500 group-hover:text-white transition-colors duration-200">
              <HouseIcon weight="fill" className="w-5 h-5" />
            </span>
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium">Be the House</span>
            )}
          </button>
        </div>

      </div>

      {/* Bottom Section - Powered by & Toggle */}
      <div className="absolute bottom-0 left-0 right-0" style={{ background: 'inherit' }}>
        {/* Powered by Magic Eden - only when expanded */}
        {!isSidebarCollapsed && (
          <div className="p-3 flex flex-col items-center gap-1">
            <span className="text-[10px] text-gray-500">Built & Powered by</span>
            <img
              src="/magic-eden-logo.svg"
              alt="Magic Eden"
              className="h-3 opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        )}
        {/* Collapse/Expand Toggle Button */}
        <button
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={toggleSidebar}
          className={cn(
            "w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white hover:bg-dicey-border/50 transition-colors duration-200",
            isSidebarCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <SidebarSimple
            weight="fill"
            className={cn("size-5", !isSidebarCollapsed && "scale-x-[-1]")}
          />
          {!isSidebarCollapsed && (
            <span className="text-sm">Collapse</span>
          )}
        </button>
      </div>
    </aside>
  );
}
