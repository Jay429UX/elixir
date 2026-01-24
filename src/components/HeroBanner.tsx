"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: "1",
    title: "Welcome Bonus",
    subtitle: "100% UP TO $1,000",
    description: "Start your journey with a massive welcome bonus on your first deposit",
    ctaText: "Claim Bonus",
  },
  {
    id: "2",
    title: "Live Casino",
    subtitle: "REAL DEALERS, REAL ACTION",
    description: "Experience the thrill of a real casino from the comfort of your home",
    ctaText: "Play Now",
  },
  {
    id: "3",
    title: "Weekly Cashback",
    subtitle: "GET 15% BACK",
    description: "Every week, get cashback on your net losses automatically",
    ctaText: "Learn More",
  },
];

export default function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-4 rounded-2xl overflow-hidden bg-dicey-card border border-dicey-border h-[320px]">

      {/* Slides Container */}
      <div className="relative h-full">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-200",
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Content */}
            <div className="relative z-10 px-14 py-16 h-full flex items-center">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-black bg-white rounded-full uppercase">
                  {slide.title}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight h-[60px] flex items-center text-balance whitespace-nowrap">
                  {slide.subtitle}
                </h1>
                <p className="text-lg text-gray-400 mb-6 max-w-md h-[56px] font-medium text-pretty">
                  {slide.description}
                </p>
                <div className="flex items-center gap-4">
                  {/* 3D Primary CTA button - Nuclear Green */}
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
                      className="relative block px-8 py-3 text-black font-bold rounded-xl transition-all duration-200 group-hover/btn:translate-y-0.5"
                      style={{
                        background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                        boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)',
                      }}
                    >
                      {slide.ctaText}
                    </span>
                  </button>
                  {/* Terms Apply - Ghost button */}
                  <button className="px-8 py-3 text-white/70 font-bold rounded-xl hover:text-white hover:bg-white/5 transition-colors duration-200">
                    Terms Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hero Image with fade mask */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 50%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 50%, black 100%)',
          }}
        >
          <img
            src="/hero.png"
            alt="Hero"
            className="w-full h-full object-cover object-right"
          />
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-200",
              index === activeSlide
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}
