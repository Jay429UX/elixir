"use client";

import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTab } from "@/context/TabContext";
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

  const casinoNavItems: NavItem[] = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: "Popular",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Recent",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      label: "Favorites",
    },
  ];

  const casinoCategories: NavItem[] = [
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z" />
        </svg>
      ),
      label: "Slots",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      label: "Live Casino",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M8 8h2v8H8zM14 8h2v8h-2z" />
        </svg>
      ),
      label: "Table Games",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Game Shows",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="7" cy="7" r="1.5" />
        </svg>
      ),
      label: "New Releases",
    },
    {
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      label: "Jackpots",
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

  const currentItems = activeTab === "casino" ? casinoCategories : sportsNavItems;
  const quickItems = activeTab === "casino" ? casinoNavItems : [];

  return (
    <aside
      className={cn("fixed left-4 top-4 bottom-4 border border-dicey-border rounded-2xl overflow-y-auto transition-all duration-200", isSidebarCollapsed ? "w-16" : "w-60")}
      style={{
        background: 'radial-gradient(ellipse 120% 40% at 50% 0%, rgba(75, 45, 120, 0.25) 0%, #1a1229 50%)',
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-dicey-border">
        <a href="/" className="flex items-center">
          <DotLottieReact
            src="/animations/Dicey-Logo.json"
            autoplay
            loop={false}
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

        {/* Quick Access - Casino Only */}
        {activeTab === "casino" && quickItems.length > 0 && (
          <div className="mb-6">
            {!isSidebarCollapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                Quick Access
              </h3>
            )}
            <nav className="space-y-1">
              {quickItems.map((item) => (
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
                    <>
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium bg-white/10 text-gray-300">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Categories */}
        <div>
          {!isSidebarCollapsed && (
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              {activeTab === "casino" ? "Categories" : "Sports"}
            </h3>
          )}
          <nav className="space-y-1">
            {currentItems.map((item) => (
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
                  <>
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium bg-white/10 text-gray-300">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>
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
