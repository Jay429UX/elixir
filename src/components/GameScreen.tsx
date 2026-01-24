"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import DepositModal from "./DepositModal";

// Crypto assets for the deposit modal
const cryptoAssets = [
  { symbol: "USDC", name: "USD Coin", icon: "/usdc.png", balance: "1,250.00" },
  { symbol: "SOL", name: "Solana", icon: "/crypto/sol.svg", balance: "12.45" },
  { symbol: "ETH", name: "Ethereum", icon: "/crypto/eth.svg", balance: "0.85" },
  { symbol: "BTC", name: "Bitcoin", icon: "/crypto/btc.svg", balance: "0.0234" },
  { symbol: "USDT", name: "Tether", icon: "/crypto/usdt.svg", balance: "500.00" },
];

interface GameScreenProps {
  game: {
    title: string;
    provider: string;
    image: string;
  };
  onClose: () => void;
}

export default function GameScreen({ game, onClose }: GameScreenProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dicey-card border-b border-dicey-border">
        {/* Left - Back & Game Info */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors duration-200"
          >
            <svg className="size-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-white text-sm font-medium">Back to Lobby</span>
          </button>

          <div className="flex items-center gap-3">
            <img
              src={game.image}
              alt={game.title}
              className="size-10 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-white font-semibold text-balance">{game.title}</h1>
              <span className="text-gray-400 text-sm">{game.provider}</span>
            </div>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* Favorite */}
          <button
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors duration-200"
          >
            <svg
              className={cn("size-5", isFavorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400")}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          {/* Sound */}
          <button
            aria-label="Toggle sound"
            className="p-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors duration-200"
          >
            <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>

          {/* Info */}
          <button
            aria-label="Game info"
            className="p-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors duration-200"
          >
            <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Fullscreen */}
          <button
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors duration-200"
          >
            <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Game Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl aspect-video bg-dicey-card rounded-2xl border border-dicey-border overflow-hidden">
          {/* Placeholder Game Screen */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dicey-dark">
            {/* Game Image as Background */}
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center blur-sm"
              style={{ backgroundImage: `url(${game.image})` }}
            />

            {/* Placeholder Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="size-32 rounded-2xl overflow-hidden border-2 border-dicey-border shadow-2xl">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2 text-balance">{game.title}</h2>
                <p className="text-gray-400">{game.provider}</p>
              </div>

              {/* Loading/Play Button */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="size-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-gray-400 text-sm">Loading game...</span>
              </div>

              {/* Game will load here text */}
              <div className="mt-8 px-6 py-3 bg-dicey-border/30 rounded-xl border border-dicey-border">
                <span className="text-gray-500 text-sm">Game iframe will be embedded here</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Bet Controls (placeholder) */}
      <div className="px-4 py-3 bg-dicey-card border-t border-dicey-border">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          {/* Balance */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-dicey-border/50 rounded-lg">
              <img src="/usdc.png" alt="USDC" className="size-5" />
              <span className="font-semibold tabular-nums text-yellow-400">
                1,250.00
              </span>
            </div>
            {/* Deposit Button - 3D Nuclear Green */}
            <button
              onClick={() => setIsDepositModalOpen(true)}
              className="relative group/btn"
            >
              <span className="absolute -inset-0.5 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-sm" />
              <span className="absolute -top-1 left-2 size-1.5 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
              <span className="absolute -top-0.5 right-3 size-1 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.2s]" />
              <span className="absolute inset-0 translate-y-0.5 bg-[#1a5c0a] rounded-lg" />
              <span
                className="relative block px-4 py-2 text-black text-sm font-semibold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.2)',
                }}
              >
                <span className="cta-shimmer" />
                <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>Deposit</span>
              </span>
            </button>
          </div>

          {/* Bet Amount Controls */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">Bet Amount:</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-lg text-white text-sm transition-colors duration-200">
                ½
              </button>
              <button className="px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-lg text-white text-sm transition-colors duration-200">
                2×
              </button>
              <input
                type="text"
                defaultValue="10.00"
                className="w-24 px-3 py-1.5 bg-dicey-dark border border-dicey-border rounded-lg text-white text-sm text-center tabular-nums focus:outline-none focus:border-gray-500"
              />
              <button className="px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-lg text-white text-sm transition-colors duration-200">
                Max
              </button>
            </div>
          </div>

          {/* Play Button - 3D Nuclear Green CTA */}
          <button className="relative group/btn">
            {/* Bottom layer (shadow/glow) - soft uniform glow on hover */}
            <span className="absolute -inset-1 rounded-xl transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
            {/* Bubble particles on hover */}
            <span className="absolute -top-2 left-3 size-2 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
            <span className="absolute -top-1 left-8 size-1.5 rounded-full bg-[#39ff14]/50 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.4s_ease-out_infinite_0.2s]" />
            <span className="absolute -top-2 right-6 size-2.5 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.4s]" />
            <span className="absolute -top-1 right-12 size-1 rounded-full bg-[#39ff14]/40 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.3s_ease-out_infinite_0.1s]" />
            <span className="absolute top-0 left-1/2 size-1.5 rounded-full bg-[#39ff14]/55 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.1s_ease-out_infinite_0.3s]" />
            {/* Middle layer - darker for depth */}
            <span className="absolute inset-0 translate-y-1 bg-[#1a5c0a] rounded-xl" />
            {/* Top layer (main button) with radial gradient - nuclear green */}
            <span
              className="relative block px-8 py-3 text-black font-bold rounded-xl transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)',
              }}
            >
              {/* Shimmer effect */}
              <span className="cta-shimmer" />
              <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>
                Play Now
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        cryptoAssets={cryptoAssets}
      />
    </div>
  );
}
