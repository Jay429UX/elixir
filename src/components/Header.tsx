"use client";

import { useState, useRef, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTab } from "@/context/TabContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import LevelUpBonusModal from "./LevelUpBonusModal";
import {
  CaretDown,
  Bell,
  Lock,
  ChartBar,
  Plus,
  ArrowUp,
  CaretRight,
  User,
  Gear,
  ShieldCheck,
  Receipt,
  Headset,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";

interface CryptoAsset {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  usdValue: number; // USD value of the balance
}

interface FiatCurrency {
  code: string;
  symbol: string;
  rate: number; // Rate relative to USD
}

const fiatCurrencies: FiatCurrency[] = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "JPY", symbol: "¥", rate: 149.50 },
  { code: "AUD", symbol: "A$", rate: 1.53 },
  { code: "CAD", symbol: "C$", rate: 1.36 },
  { code: "CHF", symbol: "Fr", rate: 0.88 },
  { code: "CNY", symbol: "¥", rate: 7.24 },
  { code: "HKD", symbol: "HK$", rate: 7.82 },
  { code: "SGD", symbol: "S$", rate: 1.34 },
  { code: "INR", symbol: "₹", rate: 83.12 },
  { code: "KRW", symbol: "₩", rate: 1320.50 },
  { code: "BRL", symbol: "R$", rate: 4.97 },
  { code: "MXN", symbol: "MX$", rate: 17.15 },
  { code: "SEK", symbol: "kr", rate: 10.42 },
  { code: "NOK", symbol: "kr", rate: 10.65 },
  { code: "DKK", symbol: "kr", rate: 6.87 },
  { code: "NZD", symbol: "NZ$", rate: 1.64 },
  { code: "ZAR", symbol: "R", rate: 18.75 },
  { code: "AED", symbol: "د.إ", rate: 3.67 },
];

const initialCryptoAssets: CryptoAsset[] = [
  { symbol: "USDC", name: "USD Coin", icon: "/usdc.png", balance: "1,250.00", usdValue: 1250.00 },
  { symbol: "SOL", name: "Solana", icon: "/crypto/sol.svg", balance: "12.45", usdValue: 2365.50 },
  { symbol: "ETH", name: "Ethereum", icon: "/crypto/eth.svg", balance: "0.85", usdValue: 2805.00 },
  { symbol: "BTC", name: "Bitcoin", icon: "/crypto/btc.svg", balance: "0.0234", usdValue: 2340.00 },
  { symbol: "USDT", name: "Tether", icon: "/crypto/usdt.svg", balance: "500.00", usdValue: 500.00 },
  { symbol: "LTC", name: "Litecoin", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23345D9D'/%3E%3Cpath d='M10.5 22.5L12 17L10 17.5L10.5 15.5L12.5 15L14.5 7.5H18L16 14.5L18 14L17.5 16L15.5 16.5L14 22.5H10.5Z' fill='white'/%3E%3C/svg%3E", balance: "0.00", usdValue: 0 },
  { symbol: "DOGE", name: "Dogecoin", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23C2A633'/%3E%3Cpath d='M13 10H17.5C20.5 10 23 12.5 23 16C23 19.5 20.5 22 17.5 22H13V10ZM15 12V20H17.5C19.5 20 21 18.5 21 16C21 13.5 19.5 12 17.5 12H15Z' fill='white'/%3E%3Cpath d='M11 15H19V17H11V15Z' fill='white'/%3E%3C/svg%3E", balance: "0.00", usdValue: 0 },
  { symbol: "XRP", name: "Ripple", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2323292F'/%3E%3Cpath d='M22.5 9H25L20 14.5C18 16.5 14 16.5 12 14.5L7 9H9.5L13.5 13C15 14.5 17 14.5 18.5 13L22.5 9Z' fill='white'/%3E%3Cpath d='M9.5 23H7L12 17.5C14 15.5 18 15.5 20 17.5L25 23H22.5L18.5 19C17 17.5 15 17.5 13.5 19L9.5 23Z' fill='white'/%3E%3C/svg%3E", balance: "0.00", usdValue: 0 },
  { symbol: "BNB", name: "BNB", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23F3BA2F'/%3E%3Cpath d='M16 8L12.5 11.5L14.5 13.5L16 12L17.5 13.5L19.5 11.5L16 8Z' fill='white'/%3E%3Cpath d='M10 14L8 16L10 18L12 16L10 14Z' fill='white'/%3E%3Cpath d='M16 14L12.5 17.5L14.5 19.5L16 18L17.5 19.5L19.5 17.5L16 14Z' fill='white'/%3E%3Cpath d='M22 14L20 16L22 18L24 16L22 14Z' fill='white'/%3E%3Cpath d='M16 20L14.5 21.5L16 23L17.5 21.5L16 20Z' fill='white'/%3E%3C/svg%3E", balance: "0.00", usdValue: 0 },
  { symbol: "MATIC", name: "Polygon", icon: "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='16' fill='%238247E5'/%3E%3Cpath d='M20.5 13.5L16.5 11L12.5 13.5V18.5L16.5 21L20.5 18.5V13.5Z' fill='none' stroke='white' stroke-width='1.5'/%3E%3Cpath d='M16.5 11V16L20.5 13.5' fill='none' stroke='white' stroke-width='1.5'/%3E%3Cpath d='M16.5 16L12.5 13.5' fill='none' stroke='white' stroke-width='1.5'/%3E%3Cpath d='M16.5 16V21' fill='none' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E", balance: "0.00", usdValue: 0 },
];

export default function Header() {
  const { isSidebarCollapsed } = useTab();
  const { theme } = useTheme();
  const [isVIPDropdownOpen, setIsVIPDropdownOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [cryptoAssets, setCryptoAssets] = useState<CryptoAsset[]>(initialCryptoAssets);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset>(initialCryptoAssets[0]);
  const [rakebackAmount, setRakebackAmount] = useState(245.13);
  const [dailyBonusAmount, setDailyBonusAmount] = useState(124.32);
  const [levelUpBonusAmount, setLevelUpBonusAmount] = useState(245.13);
  const [coinAnimations, setCoinAnimations] = useState<number[]>([]);
  // Countdown timers (in seconds)
  const [rakebackCountdown, setRakebackCountdown] = useState(0);
  const [dailyCountdown, setDailyCountdown] = useState(0);
  const [levelUpCountdown, setLevelUpCountdown] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const walletDropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Wallet display settings
  const [showInFiat, setShowInFiat] = useState(false);
  const [selectedFiat, setSelectedFiat] = useState<FiatCurrency>(fiatCurrencies[0]);
  const [hideZeroBalances, setHideZeroBalances] = useState(false);
  const [isFiatSelectorOpen, setIsFiatSelectorOpen] = useState(false);

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
    const sound = new Audio('/sounds/coins.wav');
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
      if (dailyCountdown > 0) setDailyCountdown((prev) => prev - 1);
      if (levelUpCountdown > 0) setLevelUpCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [rakebackCountdown, dailyCountdown, levelUpCountdown]);

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
  const totalClaimable = rakebackAmount + dailyBonusAmount + levelUpBonusAmount;
  const claimableCount = [rakebackAmount, dailyBonusAmount, levelUpBonusAmount].filter(amount => amount > 0).length;

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
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 lg:h-16">
      <div className="flex items-center justify-between h-full px-2 lg:px-4">
        {/* Center Navigation Container - fixed position relative to viewport center adjusted for sidebar */}
        <div
          className="fixed top-0 w-auto transition-all duration-200"
          style={{
            left: isSidebarCollapsed ? 'calc(44px + (100vw - 44px) / 2)' : 'calc(136px + (100vw - 136px) / 2)',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="relative flex items-end justify-center" style={{ gap: 0, filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.15))' }}>
            {/* Left curved section - hidden on mobile */}
            <svg
              className="hidden lg:block h-[52px] w-auto text-dicey-card-elevated"
              viewBox="0 0 76 102"
              fill="currentColor"
              style={{ marginRight: '-1px' }}
            >
              <path d="M75.8535 102H71.8535C49.2098 102 30.8535 83.6437 30.8535 61V42C30.8535 22.2789 17.8785 5.59042 0 0H75.8535V102Z" />
            </svg>

            {/* Center content */}
            <div
              className="relative flex items-center gap-2 lg:gap-4 h-14 lg:h-[52px] bg-dicey-card-elevated px-2 lg:px-4 w-full lg:w-auto justify-center"
              style={{ margin: '0 -1px' }}
            >
              {/* Bottom border glow - centered, fades at edges */}
              <div
                className="absolute bottom-0 left-4 right-4 h-px"
                style={{
                  background: theme === "green"
                    ? 'linear-gradient(to right, transparent, rgba(110, 231, 183, 0.4), transparent)'
                    : 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.4), transparent)',
                  boxShadow: theme === "green"
                    ? '0 0 8px rgba(110, 231, 183, 0.3)'
                    : '0 0 8px rgba(196, 181, 253, 0.3)',
                }}
              />
              {/* VIP Progress with Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsVIPDropdownOpen(!isVIPDropdownOpen)}
                  className="relative flex items-center gap-2 px-3 py-1.5 bg-dicey-border-light hover:bg-dicey-border-light/80 rounded-full transition-colors cursor-pointer"
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
                  {/* Progress bar with sparks - hidden on small mobile */}
                  <div className="relative w-12 lg:w-16 h-1.5 hidden sm:block">
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
                  <CaretDown
                    weight="fill"
                    className={cn("size-3 text-gray-400 transition-transform duration-200", isVIPDropdownOpen && "rotate-180")}
                  />
                </button>

                {/* VIP Dropdown */}
                {isVIPDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-dicey-card-elevated rounded-xl z-50 overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)' }}>
                    {/* Current Rank Section */}
                    <div className="p-4">
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
                    <div className="p-2 space-y-2">
                      {/* Daily Bonus */}
                      <div className="flex items-center justify-between p-3 bg-white/[0.06] rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={cn("size-8 flex-shrink-0", dailyBonusAmount <= 0 && "grayscale opacity-50")}>
                            <DotLottieReact
                              src="/animations/bonus-coin.lottie"
                              autoplay={dailyBonusAmount > 0}
                              loop={dailyBonusAmount > 0}
                            />
                          </div>
                          <div>
                            <span className="text-sm text-white block">Daily Bonus</span>
                          <span className="text-xs text-gray-500">
                            {dailyBonusAmount > 0
                              ? <><span className="font-bold gold-shimmer">{dailyBonusAmount.toFixed(2)} USDC</span> available</>
                              : dailyCountdown > 0
                              ? 'Resets in countdown'
                              : 'No bonus available'}
                          </span>
                          </div>
                        </div>
                        {dailyCountdown > 0 ? (
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-dicey-border text-gray-400 tabular-nums">
                            {formatCountdown(dailyCountdown, true)}
                          </span>
                        ) : (
                          <button
                            onClick={() => handleClaim(dailyBonusAmount, setDailyBonusAmount, setDailyCountdown, 86400)}
                            disabled={dailyBonusAmount <= 0}
                            className={dailyBonusAmount > 0 ? "relative group/btn" : "px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-600 text-gray-400 cursor-not-allowed"}
                          >
                            {dailyBonusAmount > 0 ? (
                              <>
                                <span className="absolute -inset-0.5 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-sm" />
                                <span className="absolute -top-1 left-1 size-1 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
                                <span className="absolute -top-0.5 right-2 size-1 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.2s]" />
                                <span className="absolute -top-[1px] -left-[2px] -right-[2px] -bottom-[4px] rounded-[10px] bg-black/20" />
                                <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
                                <span
                                  className="relative block px-3 py-1.5 text-xs text-black font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden"
                                  style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                                  }}
                                >
                                  <span className="cta-shimmer" />
                                  <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>Claim</span>
                                </span>
                              </>
                            ) : (
                              'Claimed'
                            )}
                          </button>
                        )}
                      </div>

                      {/* Level Up Bonus */}
                      <button
                        onClick={() => setIsLevelUpModalOpen(true)}
                        className="w-full flex items-center justify-between p-3 bg-white/[0.06] rounded-xl text-left hover:bg-white/[0.08] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn("size-8 flex-shrink-0", levelUpBonusAmount <= 0 && "grayscale opacity-50")}>
                            <DotLottieReact
                              src="/animations/bonus-coin.lottie"
                              autoplay={levelUpBonusAmount > 0}
                              loop={levelUpBonusAmount > 0}
                            />
                          </div>
                          <div>
                            <span className="text-sm text-white block">Level Up Bonus</span>
                            <span className="text-xs text-gray-500">
                              {levelUpBonusAmount > 0
                                ? <><span className="font-bold gold-shimmer">{levelUpBonusAmount.toFixed(2)} USDC</span> available</>
                                : 'Reach next level'}
                            </span>
                          </div>
                        </div>
                        {levelUpBonusAmount > 0 ? (
                          <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#39ff14]/20 text-[#39ff14]">
                            View
                          </span>
                        ) : (
                          <span className="p-1.5 rounded-lg bg-dicey-border text-gray-400">
                            <Lock weight="fill" className="size-4" />
                          </span>
                        )}
                      </button>

                      {/* Rakeback */}
                      <div className="flex items-center justify-between p-3 bg-white/[0.06] rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={cn("size-8 flex-shrink-0", rakebackAmount <= 0 && "grayscale opacity-50")}>
                            <DotLottieReact
                              src="/animations/bonus-coin.lottie"
                              autoplay={rakebackAmount > 0}
                              loop={rakebackAmount > 0}
                            />
                          </div>
                          <div>
                            <span className="text-sm text-white block">Rakeback</span>
                            <span className="text-xs text-gray-500">
                              {rakebackAmount > 0
                                ? <><span className="font-bold gold-shimmer">{rakebackAmount.toFixed(2)} USDC</span> available</>
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
                                <span className="absolute -top-[1px] -left-[2px] -right-[2px] -bottom-[4px] rounded-[10px] bg-black/20" />
                                <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
                                <span
                                  className="relative block px-3 py-1.5 text-xs text-black font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden"
                                  style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                                  }}
                                >
                                  <span className="cta-shimmer" />
                                  <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>Claim</span>
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
                    <div className="p-3">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                        <ChartBar weight="fill" className="w-4 h-4" />
                        VIP Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider - hidden on mobile */}
              <div
                className="hidden sm:block w-px h-6 rounded-full"
                style={{
                  background: theme === "green"
                    ? 'linear-gradient(to bottom, transparent, rgba(110, 231, 183, 0.5), transparent)'
                    : 'linear-gradient(to bottom, transparent, rgba(196, 181, 253, 0.5), transparent)',
                  boxShadow: theme === "green"
                    ? '0 0 8px rgba(110, 231, 183, 0.3)'
                    : '0 0 8px rgba(196, 181, 253, 0.3)',
                }}
              />

              {/* Wallet Balance */}
              <div className="relative" ref={walletDropdownRef}>
                <button
                  onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-dicey-border-light hover:bg-dicey-border-light/80 rounded-full transition-colors cursor-pointer"
                >
                  <img src={selectedCrypto.icon} alt={selectedCrypto.symbol} className="size-5" />
                  <span className="font-black tabular-nums gold-shimmer">
                    {showInFiat
                      ? `${selectedFiat.symbol}${(selectedCrypto.usdValue * selectedFiat.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : selectedCrypto.balance
                    }
                  </span>
                  <CaretDown
                    weight="fill"
                    className={cn("size-3 text-gray-400 transition-transform duration-200", isWalletDropdownOpen && "rotate-180")}
                  />
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
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-dicey-card-elevated rounded-xl z-50 overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)' }}>
                    {/* Deposit & Withdraw Buttons */}
                    <div className="p-3 flex gap-2">
                      {/* 3D Primary Deposit Button - Nuclear Green */}
                      <button
                        onClick={() => {
                          setIsWalletDropdownOpen(false);
                          setIsDepositModalOpen(true);
                        }}
                        className="relative flex-1 group/btn"
                      >
                        {/* Soft uniform glow on hover */}
                        <span className="absolute -inset-1 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
                        {/* Bubble particles on hover */}
                        <span className="absolute -top-1 left-2 size-1.5 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
                        <span className="absolute -top-0.5 left-6 size-1 rounded-full bg-[#39ff14]/50 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.4s_ease-out_infinite_0.2s]" />
                        <span className="absolute -top-1 right-4 size-1.5 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.4s]" />
                        <span className="absolute top-0 left-1/2 size-1 rounded-full bg-[#39ff14]/55 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.1s_ease-out_infinite_0.3s]" />
                        {/* Dark inset ring - extends bottom to cover 3D depth */}
                        <span className="absolute -top-[1px] -left-[2px] -right-[2px] -bottom-[4px] rounded-[10px] bg-black/20" />
                        {/* Middle layer - darker for depth */}
                        <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
                        {/* Top layer with radial gradient */}
                        <span
                          className="relative flex items-center justify-center gap-2 px-4 py-2.5 text-black text-sm font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden"
                          style={{
                            background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                          }}
                        >
                          <span className="cta-shimmer" />
                          <Plus weight="bold" className="size-4 relative" />
                          <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>Deposit</span>
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setIsWalletDropdownOpen(false);
                          setIsWithdrawModalOpen(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-dicey-border text-white rounded-lg text-sm font-semibold hover:bg-dicey-border/80 transition-colors duration-200"
                      >
                        <ArrowUp weight="bold" className="size-4" />
                        Withdraw
                      </button>
                    </div>

                    {/* Playable Balance Section */}
                    <div className="p-3 pt-0">
                      <span className="text-xs text-gray-500 px-2 py-1 block mb-2">Playable Balance</span>

                      {/* Crypto Tokens Card */}
                      <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden mb-2">
                        {cryptoAssets
                          .filter(crypto => !hideZeroBalances || parseFloat(crypto.balance.replace(/,/g, '')) > 0)
                          .map((crypto, index, filteredArray) => (
                          <button
                            key={crypto.symbol}
                            onClick={() => {
                              setSelectedCrypto(crypto);
                              setIsWalletDropdownOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center justify-between p-3 transition-colors",
                              selectedCrypto.symbol === crypto.symbol
                                ? 'bg-white/[0.06]'
                                : 'hover:bg-white/[0.06]',
                              index !== filteredArray.length - 1 && 'border-b border-white/[0.04]'
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <img src={crypto.icon} alt={crypto.symbol} className="size-6" />
                              <span className="text-sm font-medium text-white">{crypto.symbol}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-white font-medium tabular-nums">
                                {showInFiat
                                  ? `${selectedFiat.symbol}${(crypto.usdValue * selectedFiat.rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                                  : crypto.balance
                                }
                              </span>
                              {selectedCrypto.symbol === crypto.symbol && (
                                <svg className="size-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>

                      {/* Be the House Card */}
                      <button className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 mb-2 flex items-center justify-between hover:bg-white/[0.08] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="size-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                            <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-white">Be the House</span>
                        </div>
                        <span className="text-sm text-white font-medium tabular-nums">$2,001.00</span>
                      </button>

                      {/* Shared Pots Card */}
                      <button className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 flex items-center justify-between hover:bg-white/[0.08] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="size-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                            <svg className="size-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                              <circle cx="9" cy="7" r="4" strokeWidth="2" stroke="currentColor" fill="none" />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-white">Shared Pots</span>
                        </div>
                        <span className="text-sm text-gray-500 font-medium tabular-nums">$0.00</span>
                      </button>

                      {/* Settings Section */}
                      <div className="mt-3 pt-3 border-t border-white/[0.04] space-y-2">
                        {/* Show in Fiat Toggle */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Show in fiat</span>
                            {showInFiat && (
                              <div className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFiatSelectorOpen(!isFiatSelectorOpen);
                                  }}
                                  className="flex items-center gap-1 px-2 py-0.5 bg-dicey-border/50 hover:bg-dicey-border rounded text-xs text-white transition-colors"
                                >
                                  {selectedFiat.code}
                                  <CaretDown weight="fill" className={cn("size-2.5 text-gray-400 transition-transform", isFiatSelectorOpen && "rotate-180")} />
                                </button>
                                {isFiatSelectorOpen && (
                                  <div className="absolute top-full left-0 mt-1 bg-dicey-dark rounded-lg overflow-hidden z-10 min-w-[80px] max-h-48 overflow-y-auto">
                                    {fiatCurrencies.map((fiat) => (
                                      <button
                                        key={fiat.code}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedFiat(fiat);
                                          setIsFiatSelectorOpen(false);
                                        }}
                                        className={cn(
                                          "w-full px-3 py-1.5 text-xs text-left transition-colors",
                                          selectedFiat.code === fiat.code
                                            ? "bg-dicey-border text-white"
                                            : "text-gray-400 hover:bg-dicey-border/50 hover:text-white"
                                        )}
                                      >
                                        {fiat.symbol} {fiat.code}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowInFiat(!showInFiat);
                              if (!showInFiat) setIsFiatSelectorOpen(false);
                            }}
                            className={cn(
                              "relative w-9 h-5 rounded-full transition-colors",
                              showInFiat ? "bg-green-500" : "bg-dicey-border"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                                showInFiat && "translate-x-4"
                              )}
                            />
                          </button>
                        </div>

                        {/* Hide Zero Balances Toggle */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">Hide zero balances</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setHideZeroBalances(!hideZeroBalances);
                            }}
                            className={cn(
                              "relative w-9 h-5 rounded-full transition-colors",
                              hideZeroBalances ? "bg-green-500" : "bg-dicey-border"
                            )}
                          >
                            <span
                              className={cn(
                                "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform",
                                hideZeroBalances && "translate-x-4"
                              )}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider - hidden on mobile */}
              <div
                className="hidden sm:block w-px h-6 rounded-full"
                style={{
                  background: theme === "green"
                    ? 'linear-gradient(to bottom, transparent, rgba(110, 231, 183, 0.5), transparent)'
                    : 'linear-gradient(to bottom, transparent, rgba(196, 181, 253, 0.5), transparent)',
                  boxShadow: theme === "green"
                    ? '0 0 8px rgba(110, 231, 183, 0.3)'
                    : '0 0 8px rgba(196, 181, 253, 0.3)',
                }}
              />

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  aria-label="Notifications"
                  className="relative p-1.5 bg-dicey-border-light hover:bg-dicey-border-light/80 rounded-full transition-colors duration-200"
                >
                  <Bell weight="fill" className="size-5 text-gray-400" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center size-4 bg-red-500 text-white text-[10px] font-bold rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <div className="absolute top-full right-0 mt-2 w-80 bg-dicey-card-elevated rounded-xl z-50 overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)' }}>
                    {/* Header */}
                    <div className="flex items-center justify-between p-4">
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
                    <div className="p-3">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-dicey-border/50 rounded-lg transition-colors">
                        View All Notifications
                        <CaretRight weight="bold" className="size-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Divider - hidden on mobile */}
              <div
                className="hidden sm:block w-px h-6 rounded-full"
                style={{
                  background: theme === "green"
                    ? 'linear-gradient(to bottom, transparent, rgba(110, 231, 183, 0.5), transparent)'
                    : 'linear-gradient(to bottom, transparent, rgba(196, 181, 253, 0.5), transparent)',
                  boxShadow: theme === "green"
                    ? '0 0 8px rgba(110, 231, 183, 0.3)'
                    : '0 0 8px rgba(196, 181, 253, 0.3)',
                }}
              />

              {/* User Profile */}
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  aria-label="User menu"
                  className="flex items-center gap-2 px-2 py-1.5 bg-dicey-border-light hover:bg-dicey-border-light/80 rounded-full transition-colors duration-200"
                >
                  <div className="size-6 bg-white rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-black">JD</span>
                  </div>
                  <CaretDown weight="fill" className={cn("size-3 text-gray-400 transition-transform duration-200", isUserDropdownOpen && "rotate-180")} />
                </button>

                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-dicey-card-elevated rounded-xl z-50 overflow-hidden" style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3)' }}>
                    {/* User Info Header */}
                    <div className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 bg-white rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-black">JD</span>
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">John Doe</span>
                          <span className="text-xs text-gray-500">john.doe@email.com</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <UserCircle weight="fill" className="size-5 text-gray-500" />
                        <span className="text-sm">Profile</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <User weight="fill" className="size-5 text-gray-500" />
                        <span className="text-sm">Account Details</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <Gear weight="fill" className="size-5 text-gray-500" />
                        <span className="text-sm">Preferences</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <ShieldCheck weight="fill" className="size-5 text-gray-500" />
                        <span className="text-sm">Verification</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <Receipt weight="fill" className="size-5 text-gray-500" />
                        <span className="text-sm">Transactions</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-dicey-border/50 rounded-lg transition-colors">
                        <Headset weight="fill" className="size-5 text-gray-500" />
                        <span className="text-sm">Support</span>
                      </button>
                    </div>

                    {/* Logout */}
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                        <SignOut weight="fill" className="size-5" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right curved section (mirrored) - hidden on mobile */}
            <svg
              className="hidden lg:block h-[52px] w-auto text-dicey-card-elevated"
              viewBox="0 0 76 102"
              fill="currentColor"
              style={{ transform: 'scaleX(-1)', marginLeft: '-1px' }}
            >
              <path d="M75.8535 102H71.8535C49.2098 102 30.8535 83.6437 30.8535 61V42C30.8535 22.2789 17.8785 5.59042 0 0H75.8535V102Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        cryptoAssets={cryptoAssets}
      />

      {/* Withdraw Modal */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        cryptoAssets={cryptoAssets}
      />

      {/* Level Up Bonus Modal */}
      <LevelUpBonusModal
        isOpen={isLevelUpModalOpen}
        onClose={() => setIsLevelUpModalOpen(false)}
        bonusAmount={levelUpBonusAmount}
        onClaim={() => handleClaim(levelUpBonusAmount, setLevelUpBonusAmount, setLevelUpCountdown, 86400)}
      />
    </header>
  );
}
