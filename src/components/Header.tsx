"use client";

import { useState, useRef, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTab } from "@/context/TabContext";
import { cn } from "@/lib/utils";

interface CryptoAsset {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
}

const initialCryptoAssets: CryptoAsset[] = [
  { symbol: "USDC", name: "USD Coin", icon: "/usdc.png", balance: "1,250.00" },
  { symbol: "SOL", name: "Solana", icon: "/crypto/sol.svg", balance: "12.45" },
  { symbol: "ETH", name: "Ethereum", icon: "/crypto/eth.svg", balance: "0.85" },
  { symbol: "BTC", name: "Bitcoin", icon: "/crypto/btc.svg", balance: "0.0234" },
  { symbol: "USDT", name: "Tether", icon: "/crypto/usdt.svg", balance: "500.00" },
];

export default function Header() {
  const { isSidebarCollapsed } = useTab();
  const [isVIPDropdownOpen, setIsVIPDropdownOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(initialCryptoAssets);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset>(initialCryptoAssets[0]);
  const [rakebackAmount, setRakebackAmount] = useState(87.50);
  const [weeklyBonusAmount, setWeeklyBonusAmount] = useState(125);
  const [monthlyBonusAmount, setMonthlyBonusAmount] = useState(500);
  const [levelUpBonusAmount, setLevelUpBonusAmount] = useState(250);
  const [coinAnimations, setCoinAnimations] = useState<number[]>([]);
  // Countdown timers (in seconds)
  const [rakebackCountdown, setRakebackCountdown] = useState(0);
  const [weeklyCountdown, setWeeklyCountdown] = useState(0);
  const [monthlyCountdown, setMonthlyCountdown] = useState(0);
  const [levelUpCountdown, setLevelUpCountdown] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const walletDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'win',
      title: 'Big Win!',
      message: 'You won 500 USDC on Sweet Bonanza!',
      time: '2 min ago',
      read: false,
      icon: '🎰',
    },
    {
      id: 2,
      type: 'bonus',
      title: 'Bonus Available',
      message: 'Your weekly bonus is ready to claim',
      time: '1 hour ago',
      read: false,
      icon: '🎁',
    },
    {
      id: 3,
      type: 'vip',
      title: 'VIP Level Up!',
      message: 'Congratulations! You reached Diamond I',
      time: '3 hours ago',
      read: false,
      icon: '💎',
    },
    {
      id: 4,
      type: 'promo',
      title: 'Weekend Special',
      message: '50% deposit bonus this weekend only',
      time: '5 hours ago',
      read: true,
      icon: '🔥',
    },
    {
      id: 5,
      type: 'system',
      title: 'Deposit Confirmed',
      message: '100 USDC has been credited to your account',
      time: '1 day ago',
      read: true,
      icon: '✅',
    },
  ]);

  // Generic claim handler with countdown
  const handleClaim = (
    amount: number,
    setAmount: (val: number) => void,
    setCountdown: (val: number) => void,
    countdownSeconds: number
  ) => {
    if (amount <= 0) return;

    // Play cash sound (create new instance for overlapping sounds)
    const sound = new Audio('/sounds/cash.wav');
    sound.play().catch(() => {});

    // Trigger coin animation
    const animationId = Date.now();
    setCoinAnimations((prev) => [...prev, animationId]);
    setTimeout(() => {
      setCoinAnimations((prev) => prev.filter((id) => id !== animationId));
    }, 2000);

    // Update USDC balance
    const updatedAssets = cryptoAssets.map((asset) => {
      if (asset.symbol === 'USDC') {
        const currentBalance = parseFloat(asset.balance.replace(/,/g, ''));
        const newBalance = currentBalance + amount;
        return {
          ...asset,
          balance: newBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        };
      }
      return asset;
    });

    setCryptoAssets(updatedAssets);

    // Update selected crypto if it's USDC
    if (selectedCrypto.symbol === 'USDC') {
      const updatedUSDC = updatedAssets.find((a) => a.symbol === 'USDC');
      if (updatedUSDC) {
        setSelectedCrypto(updatedUSDC);
      }
    }

    // Reset amount and start countdown
    setAmount(0);
    setCountdown(countdownSeconds);
  };

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (rakebackCountdown > 0) setRakebackCountdown((prev) => prev - 1);
      if (weeklyCountdown > 0) setWeeklyCountdown((prev) => prev - 1);
      if (monthlyCountdown > 0) setMonthlyCountdown((prev) => prev - 1);
      if (levelUpCountdown > 0) setLevelUpCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [rakebackCountdown, weeklyCountdown, monthlyCountdown, levelUpCountdown]);

  // Format countdown based on duration
  const formatCountdown = (seconds: number, showDays: boolean = false) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    if (showDays && d > 0) {
      return `${d}d ${h}h ${m}m`;
    }
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate total claimable rewards
  const totalClaimable = rakebackAmount + weeklyBonusAmount + monthlyBonusAmount + levelUpBonusAmount;
  const claimableCount = [rakebackAmount, weeklyBonusAmount, monthlyBonusAmount, levelUpBonusAmount].filter(amount => amount > 0).length;

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVIPDropdownOpen(false);
      }
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target as Node)) {
        setIsWalletDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={cn("fixed top-0 right-0 z-40 h-16 transition-all duration-200", isSidebarCollapsed ? "left-[88px]" : "left-[272px]")}>
      <div className="flex items-center justify-between h-full px-4">
        {/* Center Navigation Container */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-0">
          <div className="relative flex items-end" style={{ gap: 0 }}>
            {/* Left curved section */}
            <svg
              className="h-[52px] w-auto text-dicey-card block"
              viewBox="0 0 76 102"
              fill="currentColor"
              style={{ marginRight: '-1px' }}
            >
              <path d="M75.8535 102H71.8535C49.2098 102 30.8535 83.6437 30.8535 61V42C30.8535 22.2789 17.8785 5.59042 0 0H75.8535V102Z" />
              <path d="M30.8535 61C30.8535 83.6437 49.2098 102 71.8535 102H75.8535V101H71.8535C49.762 101 31.8535 83.0914 31.8535 61V42C31.8535 22.5 19 6 1.5 0.5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            </svg>

            {/* Center content */}
            <div
              className="flex items-center gap-4 h-[52px] bg-dicey-card px-4 border-b border-white/[0.08]"
              style={{ margin: '0 -1px' }}
            >
              {/* VIP Progress with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsVIPDropdownOpen(!isVIPDropdownOpen)}
                  className="relative flex items-center gap-2 px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-full transition-colors cursor-pointer"
                >
                  {/* Rewards notification badge */}
                  {claimableCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center size-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                      {claimableCount}
                    </span>
                  )}
                  <img
                    src="/vip/Icon 1 (diamant)-_4mW1oBJ.png"
                    alt="VIP Diamond"
                    className="w-5 h-5 object-contain"
                  />
                  {/* Progress bar with sparks */}
                  <div className="relative w-16 h-1.5">
                    <div className="w-full h-full bg-dicey-dark rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-emerald-400 rounded-full"
                        style={{ width: '49%' }}
                      />
                    </div>
                    {/* Spark particles slightly behind the edge of progress */}
                    <div className="absolute top-1/2 -translate-y-1/2" style={{ left: 'calc(49% - 4px)' }}>
                      <span className="spark-particle spark-1" style={{ top: '-1px', left: '0px' }} />
                      <span className="spark-particle spark-2" style={{ top: '0px', left: '1px' }} />
                      <span className="spark-particle spark-3" style={{ top: '-2px', left: '-1px' }} />
                      <span className="spark-particle spark-4" style={{ top: '1px', left: '0px' }} />
                    </div>
                  </div>
                  <svg
                    className={cn("size-3 text-gray-400 transition-transform duration-200", isVIPDropdownOpen && "rotate-180")}
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6 9L1 4h10L6 9z" />
                  </svg>
                </button>

                {/* VIP Dropdown */}
                {isVIPDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-dicey-card border border-dicey-border rounded-xl z-50 overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)' }}>
                    {/* Current Rank Section */}
                    <div className="p-4 border-b border-dicey-border">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src="/vip/Icon 1 (diamant)-_4mW1oBJ.png"
                          alt="VIP Diamond"
                          className="w-10 h-10 object-contain"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">Diamond I</span>
                            <span className="text-xs text-gray-500">→</span>
                            <img
                              src="/vip/Icon 2 (diamant)-BcCwr7BA.png"
                              alt="Next Rank"
                              className="w-4 h-4 object-contain"
                            />
                            <span className="text-xs text-gray-400">Diamond II</span>
                          </div>
                          <span className="text-xs text-gray-500">2,550 XP needed to rank up</span>
                        </div>
                      </div>
                      <div className="relative w-full h-2">
                        <div className="w-full h-full bg-dicey-border rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-emerald-400 rounded-full"
                            style={{ width: '49%' }}
                          />
                        </div>
                        {/* Spark particles slightly behind the edge of progress */}
                        <div className="absolute top-1/2 -translate-y-1/2" style={{ left: 'calc(49% - 4px)' }}>
                          <span className="spark-particle spark-1" style={{ top: '-1px', left: '0px' }} />
                          <span className="spark-particle spark-2" style={{ top: '0px', left: '1px' }} />
                          <span className="spark-particle spark-3" style={{ top: '-2px', left: '-1px' }} />
                          <span className="spark-particle spark-4" style={{ top: '1px', left: '0px' }} />
                        </div>
                      </div>
                    </div>

                    {/* Rewards Section */}
                    <div className="p-2">
                      {/* Weekly Bonus */}
                      <div className="flex items-center justify-between p-3 hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">🎁</span>
                          <div>
                            <span className="text-sm text-white block">Weekly Bonus</span>
                            <span className="text-xs text-gray-500">
                              {weeklyBonusAmount > 0
                                ? `${weeklyBonusAmount.toFixed(2)} USDC available`
                                : weeklyCountdown > 0
                                ? 'Resets in countdown'
                                : 'No bonus available'}
                            </span>
                          </div>
                        </div>
                        {weeklyCountdown > 0 ? (
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-dicey-border text-gray-400 tabular-nums">
                            {formatCountdown(weeklyCountdown, true)}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaim(weeklyBonusAmount, setWeeklyBonusAmount, setWeeklyCountdown, 604800)}
                            disabled={weeklyBonusAmount <= 0}
                            className={weeklyBonusAmount > 0 ? "relative group/btn" : "px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-600 text-gray-400 cursor-not-allowed"}
                          >
                            {weeklyBonusAmount > 0 ? (
                              <>
                                <span className="absolute -inset-0.5 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-sm" />
                                <span className="absolute -top-1 left-1 size-1 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
                                <span className="absolute -top-0.5 right-2 size-1 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.2s]" />
                                <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
                                <span
                                  className="relative block px-3 py-1.5 text-xs text-black font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5"
                                  style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                                  }}
                                >
                                  Claim
                                </span>
                              </>
                            ) : (
                              'Claimed'
                            )}
                          </button>
                        )}
                      </div>

                      {/* Monthly Bonus */}
                      <div className="flex items-center justify-between p-3 hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">📅</span>
                          <div>
                            <span className="text-sm text-white block">Monthly Bonus</span>
                            <span className="text-xs text-gray-500">
                              {monthlyBonusAmount > 0
                                ? `${monthlyBonusAmount.toFixed(2)} USDC available`
                                : monthlyCountdown > 0
                                ? 'Resets in countdown'
                                : 'No bonus available'}
                            </span>
                          </div>
                        </div>
                        {monthlyCountdown > 0 ? (
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-dicey-border text-gray-400 tabular-nums">
                            {formatCountdown(monthlyCountdown, true)}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaim(monthlyBonusAmount, setMonthlyBonusAmount, setMonthlyCountdown, 2592000)}
                            disabled={monthlyBonusAmount <= 0}
                            className={monthlyBonusAmount > 0 ? "relative group/btn" : "px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-600 text-gray-400 cursor-not-allowed"}
                          >
                            {monthlyBonusAmount > 0 ? (
                              <>
                                <span className="absolute -inset-0.5 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-sm" />
                                <span className="absolute -top-1 left-1 size-1 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
                                <span className="absolute -top-0.5 right-2 size-1 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.2s]" />
                                <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
                                <span
                                  className="relative block px-3 py-1.5 text-xs text-black font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5"
                                  style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                                  }}
                                >
                                  Claim
                                </span>
                              </>
                            ) : (
                              'Claimed'
                            )}
                          </button>
                        )}
                      </div>

                      {/* Level Up Bonus */}
                      <div className="flex items-center justify-between p-3 hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">⬆️</span>
                          <div>
                            <span className="text-sm text-white block">Level Up Bonus</span>
                            <span className="text-xs text-gray-500">
                              {levelUpBonusAmount > 0
                                ? `${levelUpBonusAmount.toFixed(2)} USDC available`
                                : levelUpCountdown > 0
                                ? 'Next level required'
                                : 'No bonus available'}
                            </span>
                          </div>
                        </div>
                        {levelUpCountdown > 0 ? (
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-dicey-border text-gray-400 tabular-nums">
                            {formatCountdown(levelUpCountdown, true)}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaim(levelUpBonusAmount, setLevelUpBonusAmount, setLevelUpCountdown, 86400)}
                            disabled={levelUpBonusAmount <= 0}
                            className={levelUpBonusAmount > 0 ? "relative group/btn" : "px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-600 text-gray-400 cursor-not-allowed"}
                          >
                            {levelUpBonusAmount > 0 ? (
                              <>
                                <span className="absolute -inset-0.5 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-sm" />
                                <span className="absolute -top-1 left-1 size-1 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
                                <span className="absolute -top-0.5 right-2 size-1 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.2s]" />
                                <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
                                <span
                                  className="relative block px-3 py-1.5 text-xs text-black font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5"
                                  style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                                  }}
                                >
                                  Claim
                                </span>
                              </>
                            ) : (
                              'Claimed'
                            )}
                          </button>
                        )}
                      </div>

                      {/* Rakeback */}
                      <div className="flex items-center justify-between p-3 hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">💰</span>
                          <div>
                            <span className="text-sm text-white block">Rakeback</span>
                            <span className="text-xs text-gray-500">
                              {rakebackAmount > 0
                                ? `${rakebackAmount.toFixed(2)} USDC available`
                                : rakebackCountdown > 0
                                ? 'Resets in countdown'
                                : 'No rakeback available'}
                            </span>
                          </div>
                        </div>
                        {rakebackCountdown > 0 ? (
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-dicey-border text-gray-400 tabular-nums">
                            {formatCountdown(rakebackCountdown)}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaim(rakebackAmount, setRakebackAmount, setRakebackCountdown, 3600)}
                            disabled={rakebackAmount <= 0}
                            className={rakebackAmount > 0 ? "relative group/btn" : "px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-600 text-gray-400 cursor-not-allowed"}
                          >
                            {rakebackAmount > 0 ? (
                              <>
                                <span className="absolute -inset-0.5 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-sm" />
                                <span className="absolute -top-1 left-1 size-1 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
                                <span className="absolute -top-0.5 right-2 size-1 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.2s]" />
                                <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
                                <span
                                  className="relative block px-3 py-1.5 text-xs text-black font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5"
                                  style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                                  }}
                                >
                                  Claim
                                </span>
                              </>
                            ) : (
                              'Claimed'
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* VIP Dashboard Button */}
                    <div className="p-3 border-t border-dicey-border">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        VIP Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-dicey-border" />

              {/* Wallet Balance */}
              <div className="relative" ref={walletDropdownRef}>
                <button
                  onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-full transition-colors cursor-pointer"
                >
                  <img src={selectedCrypto.icon} alt={selectedCrypto.symbol} className="size-5" />
                  <span className="font-black tabular-nums gold-shimmer">
                    {selectedCrypto.balance}
                  </span>
                  <svg
                    className={cn("size-3 text-gray-400 transition-transform duration-200", isWalletDropdownOpen && "rotate-180")}
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6 9L1 4h10L6 9z" />
                  </svg>
                </button>
                {coinAnimations.map((id) => (
                  <div key={id} className="absolute -top-8 left-1/2 -translate-x-1/2 size-24 pointer-events-none z-50">
                    <DotLottieReact
                      src="/animations/Coin.lottie"
                      autoplay
                      loop={false}
                    />
                  </div>
                ))}

          {/* Wallet Dropdown */}
          {isWalletDropdownOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-dicey-card border border-dicey-border rounded-xl z-50 overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)' }}>
              {/* Crypto Assets List */}
              <div className="p-2">
                <span className="text-xs text-gray-500 px-3 py-2 block">Select Currency</span>
                {cryptoAssets.map((crypto) => (
                  <button
                    key={crypto.symbol}
                    onClick={() => {
                      setSelectedCrypto(crypto);
                      setIsWalletDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCrypto.symbol === crypto.symbol
                        ? 'bg-dicey-border'
                        : 'hover:bg-dicey-border/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={crypto.icon} alt={crypto.symbol} className="size-6" />
                      <span className="text-sm font-medium text-white">{crypto.symbol}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium tabular-nums">{crypto.balance}</span>
                      {selectedCrypto.symbol === crypto.symbol && (
                        <svg className="size-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Deposit & Withdraw Buttons */}
              <div className="p-3 border-t border-dicey-border flex gap-2">
                {/* 3D Primary Deposit Button - Nuclear Green */}
                <button className="relative flex-1 group/btn">
                  {/* Soft uniform glow on hover */}
                  <span className="absolute -inset-1 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
                  {/* Bubble particles on hover */}
                  <span className="absolute -top-1 left-2 size-1.5 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
                  <span className="absolute -top-0.5 left-6 size-1 rounded-full bg-[#39ff14]/50 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.4s_ease-out_infinite_0.2s]" />
                  <span className="absolute -top-1 right-4 size-1.5 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.4s]" />
                  <span className="absolute top-0 left-1/2 size-1 rounded-full bg-[#39ff14]/55 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.1s_ease-out_infinite_0.3s]" />
                  {/* Middle layer - darker for depth */}
                  <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
                  {/* Top layer with radial gradient */}
                  <span
                    className="relative flex items-center justify-center gap-2 px-4 py-2.5 text-black text-sm font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5"
                    style={{
                      background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                    }}
                  >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Deposit
                  </span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-dicey-border text-white rounded-lg text-sm font-semibold hover:bg-dicey-border/80 transition-colors duration-200">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Withdraw
                </button>
              </div>
            </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-dicey-border" />

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  aria-label="Notifications"
                  className="relative p-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-full transition-colors duration-200"
                >
                  <svg
                    className="size-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center size-4 bg-red-500 text-white text-[10px] font-bold rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-dicey-card border border-dicey-border rounded-xl z-50 overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)' }}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-dicey-border">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs text-gray-400 hover:text-white transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <span className="text-3xl mb-2 block">🔔</span>
                          <p className="text-sm text-gray-500">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                            className={cn(
                              "w-full flex items-start gap-3 p-3 hover:bg-dicey-border/50 transition-colors text-left",
                              !notification.read && "bg-dicey-border/30"
                            )}
                          >
                            <span className="text-xl flex-shrink-0">{notification.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">{notification.title}</span>
                                {!notification.read && (
                                  <span className="size-2 bg-blue-500 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-gray-400 truncate">{notification.message}</p>
                              <span className="text-[10px] text-gray-500">{notification.time}</span>
                            </div>
                          </button>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-dicey-border">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-dicey-border/50 rounded-lg transition-colors">
                        View All Notifications
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-dicey-border" />

              {/* User Profile */}
              <button
                aria-label="User menu"
                className="flex items-center gap-2 px-2 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-full transition-colors duration-200"
              >
                <div className="size-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-black">JD</span>
                </div>
                <svg
                  className="size-3 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M6 9L1 4h10L6 9z" />
                </svg>
              </button>
            </div>

            {/* Right curved section (mirrored) */}
            <svg
              className="h-[52px] w-auto text-dicey-card block"
              viewBox="0 0 76 102"
              fill="currentColor"
              style={{ transform: 'scaleX(-1)', marginLeft: '-1px' }}
            >
              <path d="M75.8535 102H71.8535C49.2098 102 30.8535 83.6437 30.8535 61V42C30.8535 22.2789 17.8785 5.59042 0 0H75.8535V102Z" />
              <path d="M30.8535 61C30.8535 83.6437 49.2098 102 71.8535 102H75.8535V101H71.8535C49.762 101 31.8535 83.0914 31.8535 61V42C31.8535 22.5 19 6 1.5 0.5" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
