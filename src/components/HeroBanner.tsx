"use client";

import { useRef, useState } from "react";
import WelcomeBonusModal from "./WelcomeBonusModal";
import PickPotionModal from "./PickPotionModal";
import PrimaryButton from "./ui/PrimaryButton";
import { cn } from "@/lib/utils";

interface BannerData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  mobileDescription?: string;
  ctaText: string;
  image: string;
  video?: string;
  poster?: string;
  videoOffset?: string;
}

const banners: BannerData[] = [
  {
    id: "1",
    title: "Alchemist's Guarantee",
    subtitle: "$100 RISK-FREE BET",
    description: "Back your first play with the King's potion and get 100% back as bonus funds if it misses.",
    mobileDescription: "100% back in bonus funds if it misses.",
    ctaText: "Claim Guarantee",
    image: "/hero.png",
    video: "/videos/alchemist-midas-brew.mp4",
    poster: "/videos/alchemist-midas-brew-poster.jpg",
  },
  {
    id: "2",
    title: "Elixir Originals",
    subtitle: "PICK YOUR POTION",
    description: "Crash, Plinko, Mines and more. Eight exclusive ways to play.",
    mobileDescription: "Eight exclusive Elixir Originals to play.",
    ctaText: "Select Bonus",
    image: "/roulette-hero.png",
    video: "/videos/alchemist-potion-wand-mini.mp4",
    poster: "/videos/alchemist-potion-wand-mini-poster.jpg",
    videoOffset: "0%",
  },
];

export default function HeroBanner({ onBrowseOriginals, onBrowseGames }: { onBrowseOriginals?: () => void; onBrowseGames?: () => void }) {
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isPotionOpen, setIsPotionOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtEnd(max <= 0 || el.scrollLeft >= max - 4);
    const firstCard = el.firstElementChild as HTMLElement | null;
    const cardWidth = (firstCard ? firstCard.offsetWidth : el.clientWidth * 0.9) + 12;
    setActiveIndex(Math.min(banners.length - 1, Math.round(el.scrollLeft / cardWidth)));
  };

  return (
    <>
    <div className="relative mb-6 xl:mb-8">
    <div
      ref={scrollerRef}
      onScroll={handleScroll}
      role="region"
      aria-label="Featured offers"
      tabIndex={0}
      className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 xl:grid xl:grid-cols-2 xl:gap-4 xl:overflow-visible xl:pb-0"
    >
      {banners.map((banner) => (
        <div
          key={banner.id}
          onPointerEnter={(event) => {
            if (event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            const card = event.currentTarget;
            const video = card.querySelector("video");
            video?.play().then(() => {
              if (!card.matches(":hover")) video.pause();
            }).catch(() => {});
          }}
          onPointerLeave={(event) => {
            event.currentTarget.querySelector("video")?.pause();
          }}
          onClick={banner.id === "2" ? () => setIsPotionOpen(true) : undefined}
          className={cn("relative w-[calc(100%_-_2.5rem)] min-w-0 shrink-0 snap-start rounded-2xl overflow-hidden bg-dicey-card min-h-[196px] sm:min-h-[240px] xl:w-auto", banner.id === "2" && "cursor-pointer")}
        >
          {/* Content */}
          <div className="relative z-10 px-5 py-5 sm:p-8 h-full flex flex-col items-start">
            <p className="mb-2 sm:mb-3 text-[13px] sm:text-[16px] font-extrabold uppercase tracking-[0.04em] text-[var(--text-accent)]">{banner.title}</p>
            <h2
              className="mb-2 sm:mb-3 max-w-[390px] font-[family-name:var(--font-hero)] text-[28px] font-black uppercase leading-[0.94] tracking-[-0.04em] text-white sm:text-[44px] text-balance"
              style={{ textShadow: "0 4px 16px rgba(10, 2, 20, 0.65)" }}
            >
              {banner.subtitle}
            </h2>
            <p className="mb-4 sm:mb-5 max-w-[360px] text-[13px] sm:text-[15px] font-normal leading-[1.4] sm:leading-[1.45] text-[var(--text-secondary)]">
              <span className="block truncate sm:hidden">{banner.mobileDescription ?? banner.description}</span>
              <span className="hidden sm:inline text-pretty">{banner.description}</span>
            </p>

            {/* CTA Button */}
            <div className="mt-auto flex items-center gap-3">
              {/* 3D Primary CTA button - Theme aware */}
              <PrimaryButton onClick={() => banner.id === "1" ? setIsBonusOpen(true) : setIsPotionOpen(true)}>
                {banner.ctaText}
              </PrimaryButton>
            </div>
          </div>

          {/* Hero media stays behind the content and never captures clicks. */}
          {banner.video ? (
            <div
              className="pointer-events-none absolute inset-0 z-[1] opacity-80"
              aria-hidden="true"
              style={{
                maskImage: 'linear-gradient(to right, transparent 15%, rgba(0, 0, 0, 0.12) 48%, black 95%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 15%, rgba(0, 0, 0, 0.12) 48%, black 95%)',
              }}
            >
              <img
                src={banner.poster}
                alt=""
                className="absolute top-0 h-full w-full object-cover object-center"
                style={{ left: banner.videoOffset ?? "18%" }}
              />
              <video
                src={banner.video}
                poster={banner.poster}
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute top-0 h-full w-full object-cover object-center motion-reduce:hidden"
                style={{ left: banner.videoOffset ?? "18%" }}
              />
            </div>
          ) : (
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
          )}
        </div>
      ))}
    </div>
    {/* Mobile only: fade the right edge until the last card is reached */}
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 right-0 w-16 rounded-r-2xl bg-gradient-to-l from-[#1b052b] to-transparent transition-opacity duration-300 xl:hidden ${atEnd ? "opacity-0" : "opacity-100"}`}
    />
    {/* Mobile only: dots show there is more to scroll */}
    <div className="mt-3 flex justify-center gap-2 xl:hidden" aria-hidden="true">
      {banners.map((b, i) => (
        <span key={b.id} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-5 bg-lime-300" : "w-1.5 bg-white/30"}`} />
      ))}
    </div>
    </div>
    <PickPotionModal isOpen={isPotionOpen} onClose={() => setIsPotionOpen(false)} onBrowseAll={onBrowseOriginals} />
    <WelcomeBonusModal
      isOpen={isBonusOpen}
      onClose={() => setIsBonusOpen(false)}
      onExplore={() => {
        setIsBonusOpen(false);
        onBrowseGames?.();
      }}
    />
    </>
  );
}
