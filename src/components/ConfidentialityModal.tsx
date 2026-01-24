"use client";

import { useState, useEffect } from "react";

interface ConfidentialityModalProps {
  onAccept: () => void;
}

export default function ConfidentialityModal({ onAccept }: ConfidentialityModalProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleAccept = () => {
    setIsVisible(false);
    onAccept();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-dicey-card border border-dicey-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-center justify-center mb-4">
            <div className="size-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <svg className="size-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-white text-center mb-2">Confidential Prototype</h2>
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-4">
            <p className="text-yellow-200 text-sm leading-relaxed text-center">
              <strong className="text-yellow-400">Please do not share this prototype with anyone outside of Dicey.</strong>
            </p>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed text-center mb-4">
            This is an internal preview build. Some game thumbnails are using placeholder images from third-party sources for demonstration purposes only.
          </p>

          <div className="bg-dicey-border/30 rounded-lg p-3 mb-6">
            <p className="text-gray-500 text-xs text-center">
              By clicking "I Understand" you agree to keep this prototype confidential.
            </p>
          </div>

          {/* Accept Button */}
          <button
            onClick={handleAccept}
            className="relative w-full group/btn"
          >
            <span className="absolute -inset-1 rounded-xl transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
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
                I Understand
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
