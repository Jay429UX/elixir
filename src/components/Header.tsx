"use client";

import { useState, useRef, useEffect } from "react";

interface CryptoAsset {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
}

const cryptoAssets: CryptoAsset[] = [
  { symbol: "USDC", name: "USD Coin", icon: "/usdc.png", balance: "1,250.00" },
  { symbol: "SOL", name: "Solana", icon: "/crypto/sol.svg", balance: "12.45" },
  { symbol: "ETH", name: "Ethereum", icon: "/crypto/eth.svg", balance: "0.85" },
  { symbol: "BTC", name: "Bitcoin", icon: "/crypto/btc.svg", balance: "0.0234" },
  { symbol: "USDT", name: "Tether", icon: "/crypto/usdt.svg", balance: "500.00" },
];

export default function Header() {
  const [isVIPDropdownOpen, setIsVIPDropdownOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoAsset>(cryptoAssets[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const walletDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsVIPDropdownOpen(false);
      }
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target as Node)) {
        setIsWalletDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-dicey-card border-b border-dicey-border">
      <div className="flex items-center justify-between h-full px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white tracking-tight">
            DICEY
          </span>
        </div>

        {/* Wallet Balance - Centered */}
        <div className="absolute left-1/2 -translate-x-1/2" ref={walletDropdownRef}>
          <button
            onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-dicey-card border border-dicey-border rounded-lg hover:bg-dicey-border transition-colors cursor-pointer"
          >
            <img src={selectedCrypto.icon} alt={selectedCrypto.symbol} className="w-5 h-5" />
            <span className="text-white font-medium">{selectedCrypto.balance}</span>
            <svg
              className={`w-3 h-3 text-gray-400 transition-transform ${isWalletDropdownOpen ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M6 9L1 4h10L6 9z" />
            </svg>
          </button>

          {/* Wallet Dropdown */}
          {isWalletDropdownOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-dicey-card border border-dicey-border rounded-xl shadow-xl z-50 overflow-hidden">
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
                      <img src={crypto.icon} alt={crypto.symbol} className="w-8 h-8" />
                      <div className="text-left">
                        <span className="text-sm font-medium text-white block">{crypto.symbol}</span>
                        <span className="text-xs text-gray-500">{crypto.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">{crypto.balance}</span>
                      {selectedCrypto.symbol === crypto.symbol && (
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Deposit & Withdraw Buttons */}
              <div className="p-3 border-t border-dicey-border flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Deposit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-dicey-border text-white rounded-lg text-sm font-semibold hover:bg-dicey-border/80 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  Withdraw
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* VIP Progress with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsVIPDropdownOpen(!isVIPDropdownOpen)}
              className="flex items-center gap-3 px-3 py-1.5 bg-dicey-card border border-dicey-border rounded-lg hover:bg-dicey-border transition-colors cursor-pointer"
            >
              <img
                src="/vip/Icon 1 (diamant)-_4mW1oBJ.png"
                alt="VIP Diamond"
                className="w-6 h-6 object-contain"
              />
              <div className="flex flex-col gap-1 items-start">
                <span className="text-xs text-gray-400">Diamond I</span>
                <div className="w-32 h-1.5 bg-dicey-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    style={{ width: '49%' }}
                  />
                </div>
              </div>
              <svg
                className={`w-3 h-3 text-gray-400 transition-transform ${isVIPDropdownOpen ? 'rotate-180' : ''}`}
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M6 9L1 4h10L6 9z" />
              </svg>
            </button>

            {/* VIP Dropdown */}
            {isVIPDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-dicey-card border border-dicey-border rounded-xl shadow-xl z-50 overflow-hidden">
                {/* Current Rank Section */}
                <div className="p-4 border-b border-dicey-border">
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/vip/Icon 1 (diamant)-_4mW1oBJ.png"
                      alt="VIP Diamond"
                      className="w-10 h-10"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">Diamond I</span>
                        <span className="text-xs text-gray-500">→</span>
                        <img
                          src="/vip/Icon 2 (diamant)-BcCwr7BA.png"
                          alt="Next Rank"
                          className="w-4 h-4"
                        />
                        <span className="text-xs text-gray-400">Diamond II</span>
                      </div>
                      <span className="text-xs text-gray-500">2,550 XP needed to rank up</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-dicey-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      style={{ width: '49%' }}
                    />
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
                        <span className="text-xs text-gray-500">125 USDC available</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                      Claim
                    </button>
                  </div>

                  {/* Monthly Bonus */}
                  <div className="flex items-center justify-between p-3 hover:bg-dicey-border/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">📅</span>
                      <div>
                        <span className="text-sm text-white block">Monthly Bonus</span>
                        <span className="text-xs text-gray-500">500 USDC available</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                      Claim
                    </button>
                  </div>

                  {/* Level Up Bonus */}
                  <div className="flex items-center justify-between p-3 hover:bg-dicey-border/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">⬆️</span>
                      <div>
                        <span className="text-sm text-white block">Level Up Bonus</span>
                        <span className="text-xs text-gray-500">250 USDC available</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                      Claim
                    </button>
                  </div>

                  {/* Rakeback */}
                  <div className="flex items-center justify-between p-3 hover:bg-dicey-border/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">💰</span>
                      <div>
                        <span className="text-sm text-white block">Rakeback</span>
                        <span className="text-xs text-gray-500">87.50 USDC available</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                      Claim
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-dicey-card rounded-lg transition-colors">
            <svg
              className="w-5 h-5 text-gray-400"
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
            <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-2 hover:bg-dicey-card rounded-lg transition-colors">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-black">JD</span>
            </div>
            <svg
              className="w-3 h-3 text-gray-400"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M6 9L1 4h10L6 9z" />
            </svg>
          </button>
        </div>
      </div>

    </header>
  );
}
