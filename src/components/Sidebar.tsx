"use client";

import { useState } from "react";
import { useTab } from "@/context/TabContext";
import { cn } from "@/lib/utils";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ElixirLogo from "@/components/ElixirLogo";
import { SidebarSimple, CaretDown } from "@phosphor-icons/react";
import {
  BiSolidDice5 as DiceIcon,
  BiSolidBomb as MinesIcon,
  BiSolidRocket as LimboIcon,
  BiSolidCoin as CoinflipIcon,
  BiSolidCard as BlackjackIcon,
  BiSolidDiamond as SlotsIcon,
  BiSolidVideo as LiveCasinoIcon,
  BiSolidJoystick as RouletteIcon,
  BiFootball as FootballIcon,
  BiSolidBasketball as BasketballIcon,
  BiSolidTennisBall as TennisIcon,
  BiSolidBall as HockeyIcon,
  BiSolidBall as AmericanFootballIcon,
  BiSolidJoystick as EsportsIcon,
  BiSolidGift as PromotionsIcon,
  BiSolidDiamond as CasinoIcon,
} from "react-icons/bi";

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
  const { activeTab, setActiveTab, activeSport, setActiveSport, isSidebarCollapsed, toggleSidebar } = useTab();
  const [isOriginalsOpen, setIsOriginalsOpen] = useState(true);
  const [isCasinoOpen, setIsCasinoOpen] = useState(false);

  const originalGames: OriginalGame[] = [
    {
      icon: <DiceIcon className="w-4 h-4" />,
      label: "Dice",
    },
    {
      icon: <MinesIcon className="w-4 h-4" />,
      label: "Mines",
    },
    {
      icon: <LimboIcon className="w-4 h-4" />,
      label: "Limbo",
    },
    {
      icon: <CoinflipIcon className="w-4 h-4" />,
      label: "Coinflip",
    },
    {
      icon: <BlackjackIcon className="w-4 h-4" />,
      label: "Blackjack",
    },
  ];

  // Casino dropdown items
  const casinoDropdownItems: NavItem[] = [
    {
      icon: <SlotsIcon className="w-4 h-4" />,
      label: "Slots",
    },
    {
      icon: <LiveCasinoIcon className="w-4 h-4" />,
      label: "Live Casino",
    },
    {
      icon: <RouletteIcon className="w-4 h-4" />,
      label: "Roulette",
    },
    {
      icon: <BlackjackIcon className="w-4 h-4" />,
      label: "Blackjack",
    },
  ];

  const sportsNavItems: NavItem[] = [
    {
      icon: <FootballIcon className="w-5 h-5" />,
      label: "Football",
    },
    {
      icon: <BasketballIcon className="w-5 h-5" />,
      label: "Basketball",
    },
    {
      icon: <TennisIcon className="w-5 h-5" />,
      label: "Tennis",
    },
    {
      icon: <HockeyIcon className="w-5 h-5" />,
      label: "Ice Hockey",
    },
    {
      icon: <AmericanFootballIcon className="w-5 h-5" />,
      label: "American Football",
    },
    {
      icon: <EsportsIcon className="w-5 h-5" />,
      label: "Esports",
    },
  ];


  const sidebarGradient = 'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(196, 181, 253, 0.2) 0%, transparent 50%), #2a1d42';

  return (
    <>
      {/* Collapse/Expand Toggle Tab - Outside sidebar, connected to right edge */}
      <button
        aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={toggleSidebar}
        className={cn(
          "fixed top-4 z-50 items-center gap-2 px-3 py-4 rounded-r-lg hover:bg-dicey-border transition-[transform,opacity,background-color,box-shadow] duration-200 hidden lg:flex",
          isSidebarCollapsed ? "left-[calc(16px+64px)]" : "left-[calc(16px+240px)]"
        )}
        style={{
          background: '#2a1d42',
          borderTop: '1px solid rgba(196, 181, 253, 0.15)',
          borderRight: '1px solid rgba(196, 181, 253, 0.15)',
          borderBottom: '1px solid rgba(196, 181, 253, 0.15)',
        }}
      >
        <SidebarSimple
          weight="fill"
          className={cn("size-5 text-white", !isSidebarCollapsed && "scale-x-[-1]")}
        />
      </button>

      <aside
        className={cn("hide-scrollbar fixed left-4 top-4 bottom-4 overflow-y-auto z-50 hidden lg:block", isSidebarCollapsed ? "w-16" : "w-60")}
        style={{
          background: sidebarGradient,
          border: '1px solid rgba(196, 181, 253, 0.15)',
          borderRadius: '16px 0 16px 16px',
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            borderRadius: '16px 0 16px 16px',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Logo */}
      <div className={cn("flex items-center justify-center", isSidebarCollapsed ? "h-16" : "h-24")}>
        <a href="/" aria-label="Elixir home" className="flex items-center justify-center">
          {isSidebarCollapsed ? (
            <ElixirLogo variant="icon" iconClassName="w-10 h-10" />
          ) : (
            <ElixirLogo iconClassName="w-9 h-9" textClassName="text-[26px]" gapClassName="gap-1.5" />
          )}
        </a>
      </div>

      {/* Separator */}
      <div className={cn("mx-auto mb-1", isSidebarCollapsed ? "w-8" : "mx-2 lg:mx-5")}>
        <div
          className="h-px"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.5), transparent)',
          }}
        />
      </div>

      <div className={`${isSidebarCollapsed ? 'p-2 pt-0 pb-14' : 'p-2 lg:p-5 pt-0 pb-14'}`}>
        {/* Casino / Sports Toggle */}
        {isSidebarCollapsed ? (
          <div className="relative flex flex-col tab-switch rounded-xl p-1 mb-3" style={{ background: 'rgba(0, 0, 0, 0.35)' }}>
            {/* Animated sliding indicator - theme-aware lighter shade */}
            <div
              className="tab-indicator absolute top-1 left-1 right-1 h-[calc(50%-4px)] rounded-lg transition-transform duration-200 overflow-hidden"
              style={{
                transform: activeTab === "casino" ? "translateY(0)" : "translateY(100%)",
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                background: 'radial-gradient(ellipse at 50% 0%, #c4b5fd 0%, #a78bfa 40%, #8b5cf6 100%)',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <span className="cta-shimmer card-shimmer-active" />
            </div>
            <button
              aria-pressed={activeTab === "casino"}
              onClick={() => setActiveTab("casino")}
              className="relative z-10 aspect-square w-full rounded-lg transition-colors duration-300 flex items-center justify-center"
              title="Casino"
            >
              <span
                className="flex items-center justify-center transition-[transform,opacity,background-color,box-shadow] duration-300"
                style={activeTab === "casino" ? {
                  color: '#4c1d95',
                  filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.4)) drop-shadow(-0.5px -0.5px 0px rgba(0, 0, 0, 0.3))',
                } : { color: '#9ca3af' }}
              >
                <CasinoIcon className="size-5" />
              </span>
            </button>
            <button
              aria-pressed={activeTab === "sports"}
              onClick={() => setActiveTab("sports")}
              className="relative z-10 aspect-square w-full rounded-lg transition-colors duration-300 flex items-center justify-center"
              title="Sports"
            >
              <span
                className="flex items-center justify-center transition-[transform,opacity,background-color,box-shadow] duration-300"
                style={activeTab === "sports" ? {
                  color: '#4c1d95',
                  filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.4)) drop-shadow(-0.5px -0.5px 0px rgba(0, 0, 0, 0.3))',
                } : { color: '#9ca3af' }}
              >
                <FootballIcon className="size-5" />
              </span>
            </button>
          </div>
        ) : (
          <div className="relative flex rounded-xl p-1 mb-3" style={{ background: 'rgba(0, 0, 0, 0.35)' }}>
            {/* Animated sliding indicator - theme-aware lighter shade */}
            <div
              className="tab-indicator absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-transform duration-200 overflow-hidden"
              style={{
                transform: activeTab === "casino" ? "translateX(0)" : "translateX(100%)",
                transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
                background: 'radial-gradient(ellipse at 50% 0%, #c4b5fd 0%, #a78bfa 40%, #8b5cf6 100%)',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              <span className="cta-shimmer card-shimmer-active" />
            </div>
            <button
              aria-pressed={activeTab === "casino"}
              onClick={() => setActiveTab("casino")}
              className="relative z-10 flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg transition-colors duration-300"
              title="Casino"
            >
              <span
                className="flex items-center justify-center transition-[transform,opacity,background-color,box-shadow] duration-300"
                style={activeTab === "casino" ? {
                  color: '#4c1d95',
                  filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.4)) drop-shadow(-0.5px -0.5px 0px rgba(0, 0, 0, 0.3))',
                } : { color: '#9ca3af' }}
              >
                <CasinoIcon className="size-5" />
              </span>
            </button>
            <button
              aria-pressed={activeTab === "sports"}
              onClick={() => setActiveTab("sports")}
              className="relative z-10 flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg transition-colors duration-300"
              title="Sports"
            >
              <span
                className="flex items-center justify-center transition-[transform,opacity,background-color,box-shadow] duration-300"
                style={activeTab === "sports" ? {
                  color: '#4c1d95',
                  filter: 'drop-shadow(1px 1px 0px rgba(255, 255, 255, 0.4)) drop-shadow(-0.5px -0.5px 0px rgba(0, 0, 0, 0.3))',
                } : { color: '#9ca3af' }}
              >
                <FootballIcon className="size-5" />
              </span>
            </button>
          </div>
        )}

        {/* Casino Navigation - Casino Only */}
        {activeTab === "casino" && (
          <div className="mb-4 space-y-1">
            {/* Original Games Dropdown */}
            {!isSidebarCollapsed ? (
              <div>
                <button
                  onClick={() => setIsOriginalsOpen(!isOriginalsOpen)}
                  className="w-full flex items-center justify-between text-gray-400 hover:text-white px-2 py-2 rounded-lg transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-2">
                    <DiceIcon className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Original Games</span>
                  </div>
                  <CaretDown
                    weight="bold"
                    className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      isOriginalsOpen && "rotate-180"
                    )}
                  />
                </button>
                <div className={cn(
                  "overflow-hidden transition-[transform,opacity,background-color,box-shadow] duration-200",
                  isOriginalsOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <nav className="space-y-0.5 pl-2">
                    {originalGames.map((game) => (
                      <button
                        key={game.label}
                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-dicey-card rounded-lg transition-colors duration-200 group"
                      >
                        <span className="text-gray-500 group-hover:text-white transition-colors duration-200">
                          {game.icon}
                        </span>
                        <span className="text-sm font-medium">{game.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            ) : (
              <nav className="space-y-1">
                {originalGames.map((game) => (
                  <button
                    key={game.label}
                    className="w-full flex items-center justify-center p-2.5 text-gray-300 hover:text-white hover:bg-dicey-card rounded-lg transition-colors duration-200 group"
                    title={game.label}
                  >
                    <span className="text-gray-500 group-hover:text-white transition-colors duration-200">
                      {game.icon}
                    </span>
                  </button>
                ))}
              </nav>
            )}

            {/* Separator between Original Games and Casino */}
            <div className={cn("my-2", isSidebarCollapsed ? "mx-auto w-8" : "mx-2")}>
              <div
                className="h-px"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.3), transparent)',
                }}
              />
            </div>

            {/* Casino Dropdown */}
            {!isSidebarCollapsed ? (
              <div>
                <button
                  onClick={() => setIsCasinoOpen(!isCasinoOpen)}
                  className="w-full flex items-center justify-between text-gray-400 hover:text-white px-2 py-2 rounded-lg transition-colors duration-200 group"
                >
                  <div className="flex items-center gap-2">
                    <CasinoIcon className="w-4 h-4" />
                    <span className="text-xs font-semibold uppercase tracking-wider">Casino</span>
                  </div>
                  <CaretDown
                    weight="bold"
                    className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      isCasinoOpen && "rotate-180"
                    )}
                  />
                </button>
                <div className={cn(
                  "overflow-hidden transition-[transform,opacity,background-color,box-shadow] duration-200",
                  isCasinoOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}>
                  <nav className="space-y-0.5 pl-2">
                    {casinoDropdownItems.map((item) => (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-dicey-card rounded-lg transition-colors duration-200 group"
                      >
                        <span className="text-gray-500 group-hover:text-white transition-colors duration-200">
                          {item.icon}
                        </span>
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            ) : (
              <nav className="space-y-1">
                {casinoDropdownItems.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center justify-center p-2.5 text-gray-300 hover:text-white hover:bg-dicey-card rounded-lg transition-colors duration-200 group"
                    title={item.label}
                  >
                    <span className="text-gray-500 group-hover:text-white transition-colors duration-200">
                      {item.icon}
                    </span>
                  </button>
                ))}
              </nav>
            )}

            {/* Separator after Casino section */}
            <div className={cn("my-2", isSidebarCollapsed ? "mx-auto w-8" : "mx-2")}>
              <div
                className="h-px"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.3), transparent)',
                }}
              />
            </div>
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
              {sportsNavItems.map((item) => {
                const sportKey = item.label.toLowerCase();
                const isActive = activeSport === sportKey;
                return (
                  <button
                    key={item.label}
                    onClick={() => setActiveSport(isActive ? null : sportKey)}
                    className={cn(
                      "w-full flex items-center rounded-lg transition-colors duration-200 group",
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-300 hover:text-white hover:bg-dicey-card",
                      isSidebarCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
                    )}
                    title={isSidebarCollapsed ? item.label : undefined}
                  >
                    <span className={cn("transition-colors duration-200", isActive ? "text-[#39ff14]" : "text-gray-500 group-hover:text-white")}>
                      {item.icon}
                    </span>
                    {!isSidebarCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Separator after Sports section */}
            <div className={cn("my-2", isSidebarCollapsed ? "mx-auto w-8" : "mx-2")}>
              <div
                className="h-px"
                style={{
                  background: 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.3), transparent)',
                }}
              />
            </div>
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
              <PromotionsIcon className="w-5 h-5" />
            </span>
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium">Promotions</span>
            )}
          </button>
        </div>

        {/* Promotion offer (expanded only) */}
        {!isSidebarCollapsed && (
          <div className="relative mt-2 mb-16 overflow-hidden rounded-xl">
            <img
              src="/promo-offer.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[20%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b052b] via-[#1b052b]/80 to-[#1b052b]/30" />
            <div className="relative flex flex-col items-start p-3 pt-14">
              <p className="text-[11px] font-semibold leading-[13px] text-lime-300">Weekend offer</p>
              <p className="hero-headline mt-1 text-xl leading-[22px] text-white">50 free spins</p>
              <p className="mt-1 text-[11px] leading-[14px] text-purple-200">On your next deposit of $20 or more</p>
              <PrimaryButton
                className="mt-3 w-full [&_.ui-button-face]:py-2 [&_.ui-button-face]:text-xs [&_.ui-button-glow]:hidden [&_.ui-button-ring]:hidden"
              >
                Get offer
              </PrimaryButton>
            </div>
          </div>
        )}

      </div>

      {/* Bottom Section - Powered by */}
      <div
        className="absolute bottom-0 left-0 right-0 pt-4 pb-3"
        style={{
          background: 'linear-gradient(to top, #2a1d42 70%, transparent 100%)',
        }}
      >
        {/* Separator */}
        <div className={cn("mx-auto mb-2", isSidebarCollapsed ? "w-8" : "mx-5")}>
          <div
            className="h-px"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.5), transparent)',
            }}
          />
        </div>
        {/* Powered by Layer84 - only when expanded */}
        {!isSidebarCollapsed && (
          <div className="px-5 flex items-center justify-center gap-1.5">
            <span className="text-[10px] text-gray-500">Built & Powered by</span>
            <a
              href="https://www.layer84.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-semibold text-gray-300 opacity-80 transition-opacity hover:text-white hover:opacity-100 focus-visible:opacity-100"
            >
              Layer84
            </a>
          </div>
        )}
        {/* When collapsed, show the Layer84 mark only */}
        {isSidebarCollapsed && (
          <div className="flex justify-center">
            <a href="https://www.layer84.co.uk" target="_blank" rel="noopener noreferrer" aria-label="Layer84">
              <img src="/layer84-mark.svg" alt="" className="size-5 opacity-60 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        )}
      </div>
    </aside>
    </>
  );
}
