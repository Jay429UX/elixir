"use client";

import { useState, useEffect } from "react";

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
    <div className="relative mb-8 rounded-2xl overflow-hidden bg-dicey-card border border-dicey-border h-[320px]">

      {/* Slides Container */}
      <div className="relative h-full">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Content */}
            <div className="relative z-10 px-14 py-16 h-full flex items-center">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-black bg-white rounded-full uppercase tracking-wider">
                  {slide.title}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight h-[60px] flex items-center tracking-tight whitespace-nowrap">
                  {slide.subtitle}
                </h1>
                <p className="text-lg text-gray-400 mb-6 max-w-md h-[56px] font-medium">
                  {slide.description}
                </p>
                <div className="flex items-center gap-4">
                  <button className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                    {slide.ctaText}
                  </button>
                  <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
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
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === activeSlide
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
