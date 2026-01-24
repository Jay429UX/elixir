"use client";

import { useState, useEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";
import { useTab } from "@/context/TabContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

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
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8" cy="8" r="1.5" fill="currentColor" />
          <circle cx="16" cy="8" r="1.5" fill="currentColor" />
          <circle cx="8" cy="16" r="1.5" fill="currentColor" />
          <circle cx="16" cy="16" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
      label: "Dice",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8" cy="8" r="2" fill="currentColor" />
          <circle cx="16" cy="8" r="2" fill="currentColor" />
          <circle cx="8" cy="16" r="2" fill="currentColor" />
          <path d="M14 14l4 4M18 14l-4 4" strokeLinecap="round" />
        </svg>
      ),
      label: "Mines",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M2 12h20" strokeLinecap="round" />
          <path d="M12 6l6 6-6 6-6-6z" />
        </svg>
      ),
      label: "Limbo",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" />
          <path d="M12 8a4 4 0 014 4" fill="currentColor" stroke="none" />
        </svg>
      ),
      label: "Coinflip",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M7 10h2M15 10h2M7 14h4" />
          <circle cx="17" cy="14" r="2" fill="currentColor" />
        </svg>
      ),
      label: "Blackjack",
    },
  ];

  // Casino dropdown items
  const casinoDropdownItems: NavItem[] = [
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="8" cy="12" r="2" />
          <circle cx="16" cy="12" r="2" />
          <path d="M12 8v8" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: "Slots",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      label: "Live Casino",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v4M12 18v4" />
        </svg>
      ),
      label: "Roulette",
    },
    {
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="4" width="9" height="14" rx="1" />
          <rect x="13" y="4" width="9" height="14" rx="1" />
          <text x="6.5" y="13" fontSize="8" fill="currentColor" textAnchor="middle" stroke="none">A</text>
          <text x="17.5" y="13" fontSize="8" fill="currentColor" textAnchor="middle" stroke="none">K</text>
        </svg>
      ),
      label: "Blackjack",
    },
  ];

  const sportsNavItems: NavItem[] = [
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          <path d="M2 12h20" />
        </svg>
      ),
      label: "Football",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
        </svg>
      ),
      label: "Basketball",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
      label: "Tennis",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      ),
      label: "Ice Hockey",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="6" />
          <path d="M12 6v12" />
        </svg>
      ),
      label: "American Football",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="6" width="20" height="12" rx="2" />
          <path d="M12 6v12M6 6v12M18 6v12" />
        </svg>
      ),
      label: "Esports",
    },
  ];

  const { theme } = useTheme();

  const sidebarGradient = theme === "green"
    ? 'radial-gradient(ellipse 120% 40% at 50% 0%, rgba(34, 197, 94, 0.15) 0%, #131514 50%)'
    : 'radial-gradient(ellipse 120% 40% at 50% 0%, rgba(75, 45, 120, 0.25) 0%, #1a1229 50%)';

  return (
    <aside
      className={cn("fixed left-4 top-4 bottom-4 border border-dicey-border rounded-2xl overflow-y-auto transition-all duration-200 z-50 hidden lg:block", isSidebarCollapsed ? "w-16" : "w-60")}
      style={{
        background: sidebarGradient,
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-dicey-border">
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
              {/* Slot machine / cherry icon */}
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C8.5 3 6 5.5 6 8c0 1.5.5 2.5 1.5 3.5L6 14v3c0 1 1 2 2 2h8c1 0 2-1 2-2v-3l-1.5-2.5C17.5 10.5 18 9.5 18 8c0-2.5-2.5-5-6-5z" />
                <circle cx="9" cy="8" r="1.5" />
                <circle cx="15" cy="8" r="1.5" />
                <path d="M9 17h6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
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
              {/* Football/soccer icon */}
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2l3 5h-6l3-5" />
                <path d="M12 22l3-5h-6l3 5" />
                <path d="M2 12l5 3v-6l-5 3" />
                <path d="M22 12l-5 3v-6l5 3" />
                <circle cx="12" cy="12" r="3" />
              </svg>
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
              {/* Slot machine / cherry icon */}
              <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C8.5 3 6 5.5 6 8c0 1.5.5 2.5 1.5 3.5L6 14v3c0 1 1 2 2 2h8c1 0 2-1 2-2v-3l-1.5-2.5C17.5 10.5 18 9.5 18 8c0-2.5-2.5-5-6-5z" />
                <circle cx="9" cy="8" r="1.5" />
                <circle cx="15" cy="8" r="1.5" />
                <path d="M9 17h6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
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
              {/* Football/soccer icon */}
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2l3 5h-6l3-5" />
                <path d="M12 22l3-5h-6l3 5" />
                <path d="M2 12l5 3v-6l-5 3" />
                <path d="M22 12l-5 3v-6l5 3" />
                <circle cx="12" cy="12" r="3" />
              </svg>
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
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setOriginalsOpen(!originalsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-white bg-dicey-card hover:bg-dicey-border rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                    <span className="text-sm font-medium">Original Games</span>
                  </div>
                  <svg
                    className={cn("size-3 text-gray-400 transition-transform duration-200", originalsOpen && "rotate-180")}
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6 9L1 4h10L6 9z" />
                  </svg>
                </button>

                {originalsOpen && (
                  <div className="mt-1 ml-2 border-l border-dicey-border">
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
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="8" cy="12" r="2" />
                  <circle cx="16" cy="12" r="2" />
                  <path d="M12 8v8" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setCasinoOpen(!casinoOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-white bg-dicey-card hover:bg-dicey-border rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
                      <circle cx="8" cy="12" r="2" />
                      <circle cx="16" cy="12" r="2" />
                      <path d="M12 8v8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="text-sm font-medium">Casino</span>
                  </div>
                  <svg
                    className={cn("size-3 text-gray-400 transition-transform duration-200", casinoOpen && "rotate-180")}
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6 9L1 4h10L6 9z" />
                  </svg>
                </button>

                {casinoOpen && (
                  <div className="mt-1 ml-2 border-l border-dicey-border">
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
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
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium">Be the House</span>
            )}
          </button>
        </div>

      </div>

      {/* Bottom Section - Powered by & Toggle */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-dicey-border" style={{ background: 'inherit' }}>
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
            isSidebarCollapsed ? "justify-center" : "justify-start border-t border-dicey-border"
          )}
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isSidebarCollapsed ? "M13 9l3 3-3 3" : "M17 9l-3 3 3 3"}
            />
          </svg>
          {!isSidebarCollapsed && (
            <span className="text-sm">Collapse</span>
          )}
        </button>
      </div>
    </aside>
  );
}
