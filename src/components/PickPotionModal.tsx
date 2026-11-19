"use client";

import { useEffect, useRef, useState } from "react";
import { BiCheck as Check } from "react-icons/bi";
import ModalShell from "./ModalShell";
import ModalCloseButton from "./ui/ModalCloseButton";
import PrimaryButton from "./ui/PrimaryButton";
import { cn } from "@/lib/utils";

interface BonusPotion {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  video: string;
  poster: string;
  pillClass: string;
}

const BONUS_POTIONS: BonusPotion[] = [
  {
    id: "match",
    badge: "Most popular",
    title: "Deposit Match",
    highlight: "100% up to $1,000",
    description: "Double your first deposit instantly.",
    video: "/videos/signup-cauldron-loop.mp4",
    poster: "/videos/signup-cauldron-poster.jpg",
    pillClass: "border-[#39ff14]/40 bg-[#39ff14]/15 text-[#9bff8a]",
  },
  {
    id: "spins",
    badge: "Instant play",
    title: "Free Spins",
    highlight: "50 Free Spins",
    description: "Play Crash, Plinko & Slots.",
    video: "/videos/free-spins-v3.mp4",
    poster: "/videos/signup-wand-poster.jpg",
    pillClass: "border-purple-300/40 bg-purple-400/20 text-purple-200",
  },
  {
    id: "cashback",
    badge: "Low risk",
    title: "Cashback Shield",
    highlight: "15% Weekly Back",
    description: "15% back on net losses for 7 days.",
    video: "/videos/promo-chest.mp4",
    poster: "/videos/promo-chest-poster.jpg",
    pillClass: "border-amber-300/40 bg-amber-400/20 text-amber-200",
  },
];

/* Choose 1 of 3 video-backed bonus potions to activate, or dismiss with "No thanks". */
export default function PickPotionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
  onBrowseAll?: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string>(BONUS_POTIONS[0].id);
  const selected = BONUS_POTIONS.find((b) => b.id === selectedId) ?? BONUS_POTIONS[0];
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollTargetRef = useRef<string | null>(null);
  const scrollLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const centerCard = (id: string, behavior: ScrollBehavior = "smooth") => {
    const track = carouselRef.current;
    const card = cardRefs.current[id];
    if (!track || !card || track.scrollWidth <= track.clientWidth + 4) return;
    const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    scrollTargetRef.current = behavior === "smooth" ? id : null;
    if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    if (behavior === "smooth") {
      scrollLockTimerRef.current = setTimeout(() => {
        scrollTargetRef.current = null;
      }, 500);
    }
    track.scrollTo({ left: Math.max(0, targetLeft), behavior });
  };

  useEffect(() => {
    if (!isOpen) return;
    const id = requestAnimationFrame(() => centerCard(selectedId, "auto"));
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (scrollLockTimerRef.current) clearTimeout(scrollLockTimerRef.current);
    };
  }, []);

  const handleSelectPotion = (id: string) => {
    setSelectedId(id);
    centerCard(id, "smooth");
  };

  const handleCarouselScroll = () => {
    const track = carouselRef.current;
    if (!track || track.scrollWidth <= track.clientWidth + 4) return;
    const centerX = track.scrollLeft + track.clientWidth / 2;

    if (scrollTargetRef.current) {
      const targetCard = cardRefs.current[scrollTargetRef.current];
      if (targetCard) {
        const targetCenter = targetCard.offsetLeft + targetCard.clientWidth / 2;
        if (Math.abs(centerX - targetCenter) <= 6) {
          scrollTargetRef.current = null;
        } else {
          return;
        }
      }
    }

    let closestId: string | null = null;
    let closestDist = Infinity;
    for (const bonus of BONUS_POTIONS) {
      const card = cardRefs.current[bonus.id];
      if (!card) continue;
      const dist = Math.abs(card.offsetLeft + card.clientWidth / 2 - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closestId = bonus.id;
      }
    }

    if (closestId && closestId !== selectedId) {
      setSelectedId(closestId);
    }
  };

  const handleActivate = () => {
    onClose();
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} labelledBy="pick-potion-title">
      <div
        className="my-auto w-full max-w-3xl shrink-0 pt-[96px] pb-4 sm:py-[136px]"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="relative">
          {/* Flask: transparent video, upper half overflowing the top of the panel */}
          <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[58%]">
            <video
              src="/animations/flask-swish.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              width={480}
              height={480}
              className="size-52 object-contain motion-reduce:hidden sm:size-60"
            />
            <img
              src="/animations/flask-swish-poster.png"
              alt=""
              aria-hidden="true"
              width={480}
              height={480}
              className="hidden size-52 object-contain motion-reduce:block sm:size-60"
            />
          </div>

          <div className="ui-modal-panel relative px-5 pb-6 pt-[104px] sm:px-8 sm:pb-8 sm:pt-[116px]">
            <div className="absolute right-4 top-4">
              <ModalCloseButton onClick={onClose} label="Close pick your potion" />
            </div>

            <div className="text-center">
              <p className="ui-eyebrow">Choose your bonus</p>
              <h2 id="pick-potion-title" className="hero-headline mt-1 text-4xl leading-none text-white sm:text-5xl">
                Pick your potion
              </h2>
              <p className="ui-body mx-auto mt-3 max-w-md text-balance">
                Select one bonus to activate on your account, or skip for now.
              </p>
            </div>

            {/* 3 video-backed bonus cards: swipe-to-select carousel on mobile, 3-col grid on sm+ */}
            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              role="radiogroup"
              aria-label="Bonus potions"
              className="hide-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[11%] pb-2 pt-2 sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3.5 sm:overflow-visible sm:px-0 sm:py-0"
            >
              {BONUS_POTIONS.map((bonus) => {
                const isSelected = bonus.id === selectedId;

                return (
                  <button
                    ref={(el) => {
                      cardRefs.current[bonus.id] = el;
                    }}
                    key={bonus.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => handleSelectPotion(bonus.id)}
                    className={cn(
                      "group relative flex min-h-[248px] w-[78%] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300/70 sm:min-h-[268px] sm:w-auto sm:snap-align-none",
                      isSelected
                        ? "-translate-y-1 border-[#39ff14]/80 sm:shadow-[0_12px_32px_rgba(57,255,20,0.22)]"
                        : "border-white/15 opacity-85 hover:-translate-y-0.5 hover:border-white/35 hover:opacity-100"
                    )}
                  >
                    {/* Video background */}
                    <img
                      src={bonus.poster}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-center motion-reduce:block"
                    />
                    <video
                      src={bonus.video}
                      poster={bonus.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 motion-reduce:hidden",
                        isSelected ? "scale-105" : "group-hover:scale-105"
                      )}
                    />

                    {/* Contrast scrim */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-0 transition-opacity duration-200",
                        isSelected
                          ? "bg-gradient-to-t from-[#110522] via-[#110522]/65 to-[#110522]/15"
                          : "bg-gradient-to-t from-[#110522]/95 via-[#110522]/70 to-[#110522]/30"
                      )}
                    />

                    {/* Top badge + selection check */}
                    <div className="relative z-10 flex w-full items-center justify-between gap-2">
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm",
                          bonus.pillClass
                        )}
                      >
                        {bonus.badge}
                      </span>
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-full border backdrop-blur-sm transition-colors",
                          isSelected
                            ? "border-[#39ff14] bg-[#39ff14] text-[#071a04]"
                            : "border-white/30 bg-black/30 text-transparent"
                        )}
                      >
                        <Check className="size-3.5" />
                      </span>
                    </div>

                    {/* Bottom copy */}
                    <div className="relative z-10 mt-auto pt-12">
                      <p className="text-xs font-bold uppercase tracking-wider text-purple-200/90">
                        {bonus.title}
                      </p>
                      <p
                        className="mt-1 font-[family-name:var(--font-hero)] text-[22px] font-black leading-[1.02] tracking-[-0.02em] text-white"
                        style={{ textShadow: "0 2px 12px rgba(8, 2, 18, 0.75)" }}
                      >
                        {bonus.highlight}
                      </p>
                      <p className="mt-1.5 text-xs leading-snug text-purple-100/85">
                        {bonus.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile pagination dots */}
            <div className="mt-1 flex justify-center gap-2 sm:hidden">
              {BONUS_POTIONS.map((bonus) => {
                const active = bonus.id === selectedId;
                return (
                  <button
                    key={bonus.id}
                    type="button"
                    aria-label={`Select ${bonus.title}`}
                    onClick={() => handleSelectPotion(bonus.id)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200",
                      active ? "w-5 bg-[#39ff14]" : "w-1.5 bg-white/30"
                    )}
                  />
                );
              })}
            </div>

            <div className="mt-5 sm:mt-6 flex flex-col items-center gap-3">
              <PrimaryButton onClick={handleActivate} className="w-full">
                Activate {selected.title}
              </PrimaryButton>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1.5 text-sm font-medium text-[var(--text-muted)] transition-colors hover:text-white"
              >
                No thanks
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
