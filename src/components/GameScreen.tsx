"use client";

import { useState } from "react";

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

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dicey-card border-b border-dicey-border">
        {/* Left - Back & Game Info */}
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-white text-sm font-medium">Back to Lobby</span>
          </button>

          <div className="flex items-center gap-3">
            <img
              src={game.image}
              alt={game.title}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-white font-semibold">{game.title}</h1>
              <span className="text-gray-400 text-sm">{game.provider}</span>
            </div>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* Favorite */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="p-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors"
          >
            <svg
              className={`w-5 h-5 ${isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>

          {/* Sound */}
          <button className="p-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          </button>

          {/* Info */}
          <button className="p-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-dicey-border/50 hover:bg-dicey-border rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-dicey-dark via-dicey-card to-dicey-dark">
            {/* Game Image as Background */}
            <div
              className="absolute inset-0 opacity-20 bg-cover bg-center blur-sm"
              style={{ backgroundImage: `url(${game.image})` }}
            />

            {/* Placeholder Content */}
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-dicey-border shadow-2xl">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">{game.title}</h2>
                <p className="text-gray-400">{game.provider}</p>
              </div>

              {/* Loading/Play Button */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
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
              <img src="/usdc.png" alt="USDC" className="w-5 h-5" />
              <span
                className="font-semibold"
                style={{
                  color: '#FFD700',
                  textShadow: '0 0 8px rgba(255, 215, 0, 0.6), 0 0 16px rgba(255, 193, 7, 0.4)',
                }}
              >
                1,250.00
              </span>
            </div>
            <button className="px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
              Deposit
            </button>
          </div>

          {/* Bet Amount Controls */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">Bet Amount:</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-lg text-white text-sm transition-colors">
                ½
              </button>
              <button className="px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-lg text-white text-sm transition-colors">
                2×
              </button>
              <input
                type="text"
                defaultValue="10.00"
                className="w-24 px-3 py-1.5 bg-dicey-dark border border-dicey-border rounded-lg text-white text-sm text-center focus:outline-none focus:border-gray-500"
              />
              <button className="px-3 py-1.5 bg-dicey-border/50 hover:bg-dicey-border rounded-lg text-white text-sm transition-colors">
                Max
              </button>
            </div>
          </div>

          {/* Play Button */}
          <button className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg shadow-green-500/25">
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
}
