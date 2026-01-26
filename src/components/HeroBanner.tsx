"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface BannerData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  image: string;
}

const banners: BannerData[] = [
  {
    id: "1",
    title: "Welcome Bonus",
    subtitle: "100% UP TO $1,000",
    description: "Start your journey with a massive welcome bonus on your first deposit",
    ctaText: "Claim Bonus",
    image: "/hero.png",
  },
  {
    id: "2",
    title: "Live Casino",
    subtitle: "REAL DEALERS, REAL ACTION",
    description: "Experience the thrill of a real casino from the comfort of your home",
    ctaText: "Play Now",
    image: "/roulette-hero.png",
  },
];

export default function HeroBanner() {
  const { theme } = useTheme();

  return (
    <div className="flex gap-4 mb-4">
      {banners.map((banner) => (
        <div
          key={banner.id}
          className="relative flex-1 rounded-2xl overflow-hidden bg-dicey-card h-[180px] md:h-[220px]"
          style={{
            border: theme === "green"
              ? '1px solid rgba(110, 231, 183, 0.15)'
              : '1px solid rgba(196, 181, 253, 0.15)',
          }}
        >
          {/* Content */}
          <div className="relative z-10 px-4 py-6 md:px-8 md:py-8 h-full flex flex-col justify-center">
            <h1 className="text-xl md:text-3xl font-black text-white mb-1 md:mb-2 leading-tight">
              {banner.subtitle}
            </h1>
            <p className="text-xs md:text-sm text-gray-400 font-medium line-clamp-2 max-w-xs mb-3 md:mb-4">
              {banner.description}
            </p>

            {/* CTA Button */}
            <div className="flex items-center gap-3">
              {/* 3D Primary CTA button - Theme aware */}
              <button className="relative group/btn">
                {/* Bottom layer (shadow/glow) - soft uniform glow on hover */}
                <span className={cn(
                  "absolute -inset-1 rounded-lg transition-all duration-200 opacity-0 group-hover/btn:opacity-100 blur-md",
                  theme === "green" ? "bg-white/30" : "bg-[#39ff14]/20"
                )} />
                {/* Bubble particles on hover */}
                <span className={cn(
                  "absolute -top-2 left-3 size-2 rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]",
                  theme === "green" ? "bg-white/60" : "bg-[#39ff14]/60"
                )} />
                <span className={cn(
                  "absolute -top-1 left-8 size-1.5 rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.4s_ease-out_infinite_0.2s]",
                  theme === "green" ? "bg-white/50" : "bg-[#39ff14]/50"
                )} />
                <span className={cn(
                  "absolute -top-2 right-6 size-2.5 rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.4s]",
                  theme === "green" ? "bg-white/70" : "bg-[#39ff14]/70"
                )} />
                <span className={cn(
                  "absolute -top-1 right-12 size-1 rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.3s_ease-out_infinite_0.1s]",
                  theme === "green" ? "bg-white/40" : "bg-[#39ff14]/40"
                )} />
                <span className={cn(
                  "absolute top-0 left-1/2 size-1.5 rounded-full opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.1s_ease-out_infinite_0.3s]",
                  theme === "green" ? "bg-white/55" : "bg-[#39ff14]/55"
                )} />
                {/* Dark inset ring - extends bottom to cover 3D depth */}
                <span className="absolute -top-[1px] -left-[2px] -right-[2px] -bottom-[6px] rounded-[10px] bg-black/20" />
                {/* Middle layer - darker for depth */}
                <span className={cn(
                  "absolute inset-0 translate-y-1 rounded-lg",
                  theme === "green" ? "bg-gray-400" : "bg-[#1a5c0a]"
                )} />
                {/* Top layer (main button) with radial gradient */}
                <span
                  className="relative block px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm text-black font-bold rounded-lg transition-all duration-200 group-hover/btn:translate-y-0.5 overflow-hidden"
                  style={{
                    background: theme === "green"
                      ? 'radial-gradient(ellipse at 50% 0%, #ffffff 0%, #e5e5e5 40%, #d4d4d4 100%)'
                      : 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                    boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)',
                  }}
                >
                  {/* Shimmer effect */}
                  <span className="cta-shimmer" />
                  <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>
                    {banner.ctaText}
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Hero Image - background with left fade mask */}
          <div
            className="absolute inset-0 z-[1] hidden sm:block opacity-15"
            style={{
              backgroundImage: `url(${banner.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center right',
              maskImage: 'linear-gradient(to left, black 40%, transparent 80%)',
              WebkitMaskImage: 'linear-gradient(to left, black 40%, transparent 80%)',
            }}
          />
        </div>
      ))}
    </div>
  );
}
