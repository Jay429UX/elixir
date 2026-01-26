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
    ? 'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(110, 231, 183, 0.25) 0%, transparent 50%), #262827'
    : 'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(196, 181, 253, 0.2) 0%, transparent 50%), #2a1d42';

  return (
    <aside
      className={cn("fixed left-4 top-4 bottom-4 rounded-2xl overflow-y-auto transition-all duration-200 z-50 hidden lg:block", isSidebarCollapsed ? "w-16" : "w-60")}
      style={{
        background: sidebarGradient,
        border: theme === "green"
          ? '1px solid rgba(110, 231, 183, 0.15)'
          : '1px solid rgba(196, 181, 253, 0.15)',
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Logo */}
      <div className={cn("h-16 flex items-center", isSidebarCollapsed ? "justify-center" : "justify-start pl-2 lg:pl-5")}>
        <a href="/" className={cn("flex items-center", isSidebarCollapsed ? "flex-col gap-1" : "gap-2")}>
          <DotLottieReact
            src="/animations/dicey-dice.json"
            autoplay
            loop={false}
            dotLottieRefCallback={setDotLottie}
            style={{ width: isSidebarCollapsed ? '43px' : '95px', height: 'auto' }}
          />
          {/* BETA Tag */}
          <span
            className={cn(
              "font-bold tracking-wider uppercase rounded",
              isSidebarCollapsed ? "text-[7px] px-1 py-0.5" : "text-[10px] px-1.5 py-0.5"
            )}
            style={{
              background: theme === "green"
                ? 'linear-gradient(135deg, rgba(110, 231, 183, 0.2) 0%, rgba(110, 231, 183, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(196, 181, 253, 0.2) 0%, rgba(196, 181, 253, 0.1) 100%)',
              color: theme === "green" ? 'rgb(110, 231, 183)' : 'rgb(196, 181, 253)',
              border: theme === "green"
                ? '1px solid rgba(110, 231, 183, 0.3)'
                : '1px solid rgba(196, 181, 253, 0.3)',
            }}
          >
            Beta
          </span>
        </a>
      </div>

      {/* Separator */}
      <div className={cn("mx-auto mb-2", isSidebarCollapsed ? "w-8" : "mx-2 lg:mx-5")}>
        <div
          className="h-px"
          style={{
            background: theme === "green"
              ? 'linear-gradient(to right, transparent, rgba(110, 231, 183, 0.5), transparent)'
              : 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.5), transparent)',
          }}
        />
      </div>

      <div className={`${isSidebarCollapsed ? 'p-2 pt-0' : 'p-2 lg:p-5 pt-0'}`}>
        {/* Casino / Sports Toggle */}
        {isSidebarCollapsed ? (
          <div className="relative flex flex-col rounded-xl p-1 mb-6" style={{ background: theme === "green" ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.35)' }}>
            {/* Animated sliding indicator - theme-aware lighter shade */}
            <div
              className="absolute left-1 right-1 h-[calc(50%-4px)] rounded-lg transition-all duration-300 overflow-hidden"
              style={{
                top: activeTab === "casino" ? "4px" : "calc(50%)",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                background: theme === "green"
                  ? 'radial-gradient(ellipse at 50% 0%, #6ee7b7 0%, #34d399 40%, #10b981 100%)'
                  : 'radial-gradient(ellipse at 50% 0%, #c4b5fd 0%, #a78bfa 40%, #8b5cf6 100%)',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <span className="cta-shimmer card-shimmer-active" />
            </div>
            <button
              onClick={() => setActiveTab("casino")}
              className="relative z-10 p-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center"
              title="Casino"
            >
              <span
                className="flex items-center justify-center transition-all duration-300"
                style={activeTab === "casino" ? {
                  color: theme === "green" ? '#065f46' : '#4c1d95',
                  filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.4)) drop-shadow(-0.5px -0.5px 0px rgba(0, 0, 0, 0.3))',
                } : { color: '#9ca3af' }}
              >
                <CasinoIcon weight="fill" className="size-5" />
              </span>
            </button>
            <button
              onClick={() => setActiveTab("sports")}
              className="relative z-10 p-2.5 rounded-lg transition-colors duration-300 flex items-center justify-center"
              title="Sports"
            >
              <span
                className="flex items-center justify-center transition-all duration-300"
                style={activeTab === "sports" ? {
                  color: theme === "green" ? '#065f46' : '#4c1d95',
                  filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.4)) drop-shadow(-0.5px -0.5px 0px rgba(0, 0, 0, 0.3))',
                } : { color: '#9ca3af' }}
              >
                <FootballIcon weight="fill" className="size-5" />
              </span>
            </button>
          </div>
        ) : (
          <div className="relative flex rounded-xl p-1 mb-6" style={{ background: theme === "green" ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.35)' }}>
            {/* Animated sliding indicator - theme-aware lighter shade */}
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-300 overflow-hidden"
              style={{
                left: activeTab === "casino" ? "4px" : "calc(50%)",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                background: theme === "green"
                  ? 'radial-gradient(ellipse at 50% 0%, #6ee7b7 0%, #34d399 40%, #10b981 100%)'
                  : 'radial-gradient(ellipse at 50% 0%, #c4b5fd 0%, #a78bfa 40%, #8b5cf6 100%)',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <span className="cta-shimmer card-shimmer-active" />
            </div>
            <button
              onClick={() => setActiveTab("casino")}
              className="relative z-10 flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg transition-colors duration-300"
              title="Casino"
            >
              <span
                className="flex items-center justify-center transition-all duration-300"
                style={activeTab === "casino" ? {
                  color: theme === "green" ? '#065f46' : '#4c1d95',
                  filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.4)) drop-shadow(-0.5px -0.5px 0px rgba(0, 0, 0, 0.3))',
                } : { color: '#9ca3af' }}
              >
                <CasinoIcon weight="fill" className="size-5" />
              </span>
            </button>
            <button
              onClick={() => setActiveTab("sports")}
              className="relative z-10 flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg transition-colors duration-300"
              title="Sports"
            >
              <span
                className="flex items-center justify-center transition-all duration-300"
                style={activeTab === "sports" ? {
                  color: theme === "green" ? '#065f46' : '#4c1d95',
                  filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.4)) drop-shadow(-0.5px -0.5px 0px rgba(0, 0, 0, 0.3))',
                } : { color: '#9ca3af' }}
              >
                <FootballIcon weight="fill" className="size-5" />
              </span>
            </button>
          </div>
        )}

        {/* Casino Navigation - Casino Only */}
        {activeTab === "casino" && (
          <div className="mb-4">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                Original Games
              </h3>
            )}
            <nav className="space-y-1">
              {originalGames.map((game) => (
                <button
                  key={game.label}
                  className={cn(
                    "w-full flex items-center text-gray-300 hover:text-white hover:bg-dicey-card rounded-lg transition-colors duration-200 group",
                    isSidebarCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
                  )}
                  title={isSidebarCollapsed ? game.label : undefined}
                >
                  <span className="text-gray-500 group-hover:text-white transition-colors duration-200">
                    {game.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span className="text-sm font-medium">{game.label}</span>
                  )}
                </button>
              ))}
            </nav>

            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 mt-6 px-2">
                Casino
              </h3>
            )}
            <nav className="space-y-1">
              {casinoDropdownItems.map((item) => (
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
      <div className="absolute bottom-0 left-0 right-0">
        {/* Separator */}
        <div className={cn("mx-auto mb-2", isSidebarCollapsed ? "w-8" : "mx-5")}>
          <div
            className="h-px"
            style={{
              background: theme === "green"
                ? 'linear-gradient(to right, transparent, rgba(110, 231, 183, 0.5), transparent)'
                : 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.5), transparent)',
            }}
          />
        </div>
        {/* Powered by Magic Eden - only when expanded */}
        {!isSidebarCollapsed && (
          <div className="px-5 pb-2 pt-0 flex items-center gap-1.5">
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
