"use client";

import { useState, useEffect } from "react";
import AlphaVideo from "./ui/AlphaVideo";

const STORAGE_KEY = "dicey-confidentiality-accepted";

interface ConfidentialityModalProps {
  onAccept: () => void;
}

export default function ConfidentialityModal({ onAccept }: ConfidentialityModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const hasAccepted = localStorage.getItem(STORAGE_KEY);
    if (!hasAccepted) {
      setIsVisible(true);
    } else {
      // Already accepted, call onAccept immediately
      onAccept();
    }
  }, [onAccept]);

  // Don't render anything on server or before checking localStorage
  if (!isClient || !isVisible) return null;

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
    onAccept();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/80 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center px-4 pt-24 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] sm:pt-32">
      <div className="relative my-auto w-full max-w-md rounded-2xl bg-dicey-card">
        {/* Coin: large, with its upper half overflowing the top of the card */}
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[44%]">
          <div className="design-concept-coin cursor-pointer">
            <AlphaVideo
              webmSrc="/animations/coin-spin-3d.webm"
              webpSrc="/animations/coin-spin-3d.webp"
              poster="/animations/coin-spin-3d-poster.png"
              width={640}
              height={640}
              className="size-44 object-contain motion-reduce:hidden sm:size-64"
            />
            <img
              src="/animations/coin-spin-3d-poster.png"
              alt=""
              aria-hidden="true"
              width={256}
              height={256}
              className="hidden size-44 object-contain motion-reduce:block sm:size-64"
            />
          </div>
        </div>

        {/* Header */}
        <div className="px-5 pb-0 pt-[76px] sm:px-6 sm:pt-[92px]">
          <h2 className="text-xl font-bold text-white text-center mb-2">Design Concept</h2>
        </div>

        {/* Content */}
        <div className="p-5 pt-3 sm:p-6 sm:pt-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-4">
            <p className="text-yellow-200 text-sm leading-relaxed text-center">
              <strong className="text-yellow-400">Elixir is a portfolio concept. It is not a real casino and no real money is involved.</strong>
            </p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed text-center mb-4">
            Built by Layer84 to demonstrate product design and front end craft. Game thumbnails are placeholder images from third-party sources, used for demonstration only.
          </p>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-4">
            <p className="text-purple-200 text-sm leading-relaxed text-center">
              <span className="text-purple-400 font-medium">Tip:</span> Check the VIP dropdown and claim process in the header for examples of microanimations.
            </p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mb-4">
            <p className="text-blue-200 text-sm leading-relaxed text-center">
              <span className="text-blue-400 font-medium">Note:</span> Not every feature is built. This demo covers the homepage, game screen and a few interactive flows such as the VIP rewards, bonuses and sign up.
            </p>
          </div>

          <div className="bg-dicey-border/30 rounded-lg p-3 mb-6">
            <p className="text-gray-500 text-xs text-center">
              Sample data only. Nothing here is real, and no accounts or payments are processed.
            </p>
          </div>

          {/* Accept Button */}
          <button
            onClick={handleAccept}
            className="relative w-full group/btn"
          >
            <span className="absolute -inset-1 rounded-xl transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
            {/* Dark inset ring - extends bottom to cover 3D depth */}
            <span className="absolute -top-[1px] -left-[2px] -right-[2px] -bottom-[6px] rounded-[14px] bg-black/20" />
            <span className="absolute inset-0 translate-y-1 bg-[#1a5c0a] rounded-xl" />
            <span
              className="relative block w-full px-6 py-3 text-black font-bold rounded-xl transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden text-center"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)',
              }}
            >
              <span className="cta-shimmer" />
              <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>
                Explore the demo
              </span>
            </span>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
