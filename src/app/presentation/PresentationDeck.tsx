"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BiChevronLeft,
  BiChevronRight,
  BiCopy,
  BiError,
  BiGridAlt,
  BiLinkExternal,
  BiNote,
  BiPrinter,
  BiRocket,
} from "react-icons/bi";
import PrimaryButton from "@/components/ui/PrimaryButton";
import VipBadge from "@/components/ui/VipBadge";
import DepositModal from "@/components/DepositModal";
import SignUpModal from "@/components/SignUpModal";
import LevelUpBonusModal from "@/components/LevelUpBonusModal";
import ElixirLogo from "@/components/ElixirLogo";
import { cn } from "@/lib/utils";

const CRYPTO_PREVIEW = [
  { symbol: "USDC", name: "USD Coin", icon: "/crypto/usdc.svg", balance: "1,619.45" },
  { symbol: "SOL", name: "Solana", icon: "/crypto/sol.svg", balance: "12.45" },
  { symbol: "ETH", name: "Ethereum", icon: "/crypto/eth.svg", balance: "0.85" },
  { symbol: "BTC", name: "Bitcoin", icon: "/crypto/btc.svg", balance: "0.0234" },
  { symbol: "USDT", name: "Tether", icon: "/crypto/usdt.svg", balance: "500.00" },
  { symbol: "LTC", name: "Litecoin", icon: "/crypto/ltc.svg", balance: "0.00" },
  { symbol: "DOGE", name: "Dogecoin", icon: "/crypto/doge.svg", balance: "0.00" },
  { symbol: "XRP", name: "Ripple", icon: "/crypto/xrp.svg", balance: "0.00" },
  { symbol: "BNB", name: "BNB", icon: "/crypto/bnb.svg", balance: "0.00" },
  { symbol: "MATIC", name: "Polygon", icon: "/crypto/matic.svg", balance: "0.00" },
];

interface SlideMeta {
  id: string;
  num: string;
  kicker: string;
  title: string;
  notes: string;
}

const SLIDES: SlideMeta[] = [
  {
    id: "hook",
    num: "01",
    kicker: "THE PITCH",
    title: "iGaming Doesn't Need Another Dark Template.",
    notes:
      "Lead with the big pitch: players bounce between dozens of identical crypto casinos every week. Elixir was designed to break that sea of sameness — combining a memorable character-led brand with high-trust, tactile UI.",
  },
  {
    id: "opportunity",
    num: "02",
    kicker: "THE OPPORTUNITY",
    title: "When Every Competitor Looks Identical, UI Is the Moat.",
    notes:
      "Frame why design matters commercially: generic templates signal low trust and zero differentiation. By investing in bespoke motion, crisp typography, and frictionless flows, Elixir wins on first-impression credibility and brand recall.",
  },
  {
    id: "world",
    num: "03",
    kicker: "THE ELIXIR EXPERIENCE",
    title: "A Living Brand World You Can Feel",
    notes:
      "Let the live videos sell the product: the Alchemist King brings personality to every touchpoint — from the $100 Risk-Free Guarantee hero to Pick Your Potion and Free Spins — paired with tactile 3D CTAs that make every click rewarding.",
  },
  {
    id: "conversion",
    num: "04",
    kicker: "BUILT TO CONVERT",
    title: "Effortless Onboarding. High-Trust Deposits.",
    notes:
      "Show how the UI directly protects revenue: Sign Up takes two fields with zero clutter, and the Deposit experience eliminates scrolling and layout jumps — giving players instant QR scanning and clear network safeguards.",
  },
  {
    id: "retention",
    num: "05",
    kicker: "BUILT TO RETAIN",
    title: "VIP Progression Players Actually Want to Chase",
    notes:
      "Pitch the retention loop: instead of dull tier names in a table, players climb from faceted Bronze, Silver, and Gold gems to spiked Diamond and Sapphire crests — celebrated with a high-impact Rank Up reveal.",
  },
  {
    id: "scale",
    num: "06",
    kicker: "BUILT TO SCALE",
    title: "Not a Concept Mockup — A Production Design System",
    notes:
      "Reassure stakeholders that this isn't fragile eye candy: Elixir runs on a documented token system (/design-system), shared primitives, and memoized performance so new games, promos, and landing pages ship fast without visual drift.",
  },
  {
    id: "closing",
    num: "07",
    kicker: "THE VISION",
    title: "Unmistakable Brand. Zero-Friction Product.",
    notes:
      "Wrap up cleanly: Elixir proves that a casino and sportsbook can feel playful, atmospheric, and trustworthy all at once. Invite them to click into the live app, Design System, or Deposit flow.",
  },
];

export default function PresentationDeck() {
  const [current, setCurrent] = useState(0);
  const [gridView, setGridView] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [vipLvl, setVipLvl] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [openModal, setOpenModal] = useState<"deposit" | "signup" | "levelup" | null>(null);

  const total = SLIDES.length;
  const activeSlide = SLIDES[current];

  const goPrev = () => setCurrent((c) => Math.max(0, c - 1));
  const goNext = () => setCurrent((c) => Math.min(total - 1, c + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openModal) return;
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrent((c) => Math.min(total - 1, c + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrent((c) => Math.max(0, c - 1));
      } else if (e.key === "g" || e.key === "G") {
        setGridView((v) => !v);
      } else if (e.key === "n" || e.key === "N") {
        setShowNotes((v) => !v);
      } else if (e.key === "Escape" && gridView) {
        setGridView(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gridView, openModal, total]);

  const renderSlide = (index: number) => {
    switch (index) {
      /* SLIDE 1: THE HOOK */
      case 0:
        return (
          <div className="relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1b1030] via-[#140d24] to-[#0d0718] p-10 sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-3/5 overflow-hidden opacity-45"
              style={{
                maskImage: "linear-gradient(to left, black 15%, transparent 92%)",
                WebkitMaskImage: "linear-gradient(to left, black 15%, transparent 92%)",
              }}
            >
              <img
                src="/videos/alchemist-midas-brew-poster.jpg"
                alt=""
                className="hidden h-full w-full object-cover object-[70%_30%] motion-reduce:block"
              />
              <video
                src="/videos/alchemist-midas-brew.mp4"
                poster="/videos/alchemist-midas-brew-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover object-[70%_30%] motion-reduce:hidden"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 left-1/4 size-96 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #39ff14 0%, transparent 70%)" }}
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ElixirLogo variant="icon" iconClassName="size-9" />
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ded5eb]">
                  Elixir • Product &amp; UI Pitch
                </span>
              </div>
              <span className="font-mono text-xs text-[#b7a9ca]">01 / 0{total}</span>
            </div>

            <div className="relative max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/35 bg-[#39ff14]/10 px-3.5 py-1 text-xs font-semibold text-[#39ff14]">
                <BiRocket className="size-3.5" />
                Next-Gen Casino &amp; Sportsbook UI
              </div>
              <h1 className="font-[family-name:var(--font-hero)] text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl">
                Most casinos look like clones.{" "}
                <span className="text-[#39ff14]">Elixir is built to stand apart.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-[#ded5eb] sm:text-lg">
                A character-driven gaming experience pairing unmistakable visual craft with frictionless crypto conversion and a production-ready design system.
              </p>
            </div>

            <div className="relative flex flex-wrap items-center gap-8 border-t border-white/10 pt-5 text-xs text-[#b7a9ca]">
              <span>
                <strong className="font-semibold text-white">Brand:</strong> Alchemist&apos;s Kingdom
              </span>
              <span>
                <strong className="font-semibold text-white">Experience:</strong> Casino, Originals &amp; Sportsbook
              </span>
              <span>
                <strong className="font-semibold text-white">Crafted by:</strong> Design Engineering
              </span>
            </div>
          </div>
        );

      /* SLIDE 2: THE MARKET OPPORTUNITY */
      case 1:
        return (
          <div className="relative flex h-full flex-col justify-between bg-gradient-to-br from-[#19102b] to-[#110a1f] p-10 sm:p-14">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#d8b4fe]">
                02 — Why Elixir Wins
              </span>
              <span className="font-mono text-xs text-[#b7a9ca]">02 / 0{total}</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-hero)] text-3xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl">
                  When every competitor looks identical,{" "}
                  <span className="text-[#39ff14]">UI is the moat.</span>
                </h2>
                <p className="text-base leading-relaxed text-[#ded5eb]">
                  Players decide whether to trust a platform in seconds. Generic dark templates feel disposable — Elixir feels intentional, alive, and worth coming back to.
                </p>
              </div>

              <div className="space-y-4 border-l border-white/10 pl-6 sm:pl-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-rose-300/90">The Sea of Sameness</p>
                  <p className="mt-1 text-sm text-[#b7a9ca]">
                    Flat buttons, noisy banners, confusing multi-step wallets, and zero emotional connection.
                  </p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#39ff14]">The Elixir Advantage</p>
                  <ul className="mt-2 space-y-2 text-sm text-white">
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#39ff14]" />
                      <span><strong>Instant recall:</strong> Iconic Alchemist King &amp; potion lore across every touchpoint</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#39ff14]" />
                      <span><strong>Higher trust:</strong> Calm, legible data tables and crystal-clear deposit safeguards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#39ff14]" />
                      <span><strong>Built to ship:</strong> Full token system so new promos &amp; pages launch in hours</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#b7a9ca]">
              <span>Great UI isn&apos;t decoration — it&apos;s conversion, retention, and brand equity.</span>
              <span className="font-mono text-white">02 / 0{total}</span>
            </div>
          </div>
        );

      /* SLIDE 3: THE LIVING BRAND WORLD */
      case 2:
        return (
          <div className="relative flex h-full flex-col justify-between bg-gradient-to-br from-[#19102b] to-[#110a1f] p-10 sm:p-14">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#d8b4fe]">
                03 — Brand World &amp; Tactile Feel
              </span>
              <span className="font-mono text-xs text-[#b7a9ca]">03 / 0{total}</span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:items-center">
              <div className="space-y-5">
                <h2 className="font-[family-name:var(--font-hero)] text-3xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-5xl">
                  An experience players can feel.
                </h2>
                <p className="text-sm leading-relaxed text-[#ded5eb] sm:text-base">
                  From custom looping character videos to tactile 3D neon-lime CTAs with rising potion bubbles, every interaction reinforces that Elixir is in a league of its own.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <PrimaryButton>Claim Guarantee</PrimaryButton>
                  <span className="text-xs text-[#b7a9ca]">← Tactile 3D press &amp; bubble physics</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#1b052b] p-6 shadow-2xl">
                  <img
                    src="/videos/alchemist-midas-brew-poster.jpg"
                    alt=""
                    className="pointer-events-none absolute inset-0 hidden h-full w-full object-cover object-[75%_30%] opacity-65 motion-reduce:block"
                  />
                  <video
                    src="/videos/alchemist-midas-brew.mp4"
                    poster="/videos/alchemist-midas-brew-poster.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[75%_30%] opacity-65 motion-reduce:hidden"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#160424] via-[#160424]/80 to-transparent" />
                  <div className="relative max-w-xs space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-[0.08em] text-purple-300">
                      Alchemist&apos;s Guarantee
                    </p>
                    <p className="font-[family-name:var(--font-hero)] text-3xl font-black leading-[0.95] tracking-[-0.03em] text-white">
                      $100 RISK-FREE BET
                    </p>
                    <p className="text-xs leading-relaxed text-[#ded5eb]">
                      Storytelling, motion, and offer unified into one unforgettable hero moment.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: "Pick Your Potion", video: "/videos/alchemist-potion-wand-mini.mp4", poster: "/videos/alchemist-potion-wand-mini-poster.jpg" },
                    { label: "50 Free Spins", video: "/videos/free-spins-v3.mp4", poster: "/videos/alchemist-potion-wand-poster.jpg" },
                    { label: "Welcome Offer", video: "/videos/signup-new.mp4", poster: "/videos/signup-new-poster.jpg" },
                  ].map((clip) => (
                    <div key={clip.label} className="relative h-20 overflow-hidden rounded-2xl border border-white/10 bg-[#1b052b]">
                      <video
                        src={clip.video}
                        poster={clip.poster}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover opacity-80 motion-reduce:hidden"
                      />
                      <img
                        src={clip.poster}
                        alt={clip.label}
                        className="hidden h-full w-full object-cover opacity-80 motion-reduce:block"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 left-2.5 text-[10px] font-semibold text-white">
                        {clip.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#b7a9ca]">
              <span>Bespoke video loops with automatic reduced-motion fallbacks</span>
              <span className="font-mono text-white">03 / 0{total}</span>
            </div>
          </div>
        );

      /* SLIDE 4: BUILT TO CONVERT (SIGN UP & DEPOSIT) */
      case 3:
        return (
          <div className="relative flex h-full flex-col justify-between bg-gradient-to-br from-[#19102b] to-[#110a1f] p-10 sm:p-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#d8b4fe]">
                04 — Built to Convert
              </span>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setOpenModal("signup")}
                  className="rounded-xl border border-white/15 bg-dicey-dark px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/30"
                >
                  Try Sign Up
                </button>
                <PrimaryButton onClick={() => setOpenModal("deposit")}>Try Deposit Flow</PrimaryButton>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-hero)] text-3xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-4xl">
                  Zero friction where revenue happens.
                </h2>
                <p className="text-sm leading-relaxed text-[#ded5eb] sm:text-base">
                  Every extra field or layout jump costs deposits. Elixir streamlines onboarding to two fields and turns crypto funding into a single calm, rock-solid split screen.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-xl border border-white/10 bg-dicey-dark p-3.5">
                    <p className="text-lg font-black text-[#39ff14]">2 Fields</p>
                    <p className="mt-0.5 text-xs text-[#b7a9ca]">Frictionless Sign Up (Email + Password)</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-dicey-dark p-3.5">
                    <p className="text-lg font-black text-[#39ff14]">1 View</p>
                    <p className="mt-0.5 text-xs text-[#b7a9ca]">All 10 coins + live QR without scrolling</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-white/10 bg-dicey-dark p-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/crypto/usdc.svg" alt="USDC" className="size-9" />
                    <div>
                      <p className="text-sm font-bold text-white">USD Coin</p>
                      <p className="text-xs text-[#b7a9ca]">Instant Scannable QR</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-purple-200">
                    Ethereum (ERC-20)
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2.5">
                  <span className="min-w-0 flex-1 truncate font-mono text-xs text-white">
                    0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-[#39ff14] px-2.5 py-1 text-xs font-bold text-[#071a04]">
                    <BiCopy className="size-3.5" /> Copy
                  </span>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-amber-400/25 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-200">
                  <BiError className="mt-0.5 size-4 shrink-0 text-amber-400" />
                  <span>
                    Proactive network safeguard on every asset prevents costly transfer mistakes.
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#b7a9ca]">
              <span>Designed for confidence on first deposit</span>
              <span className="font-mono text-white">04 / 0{total}</span>
            </div>
          </div>
        );

      /* SLIDE 5: BUILT TO RETAIN (VIP PROGRESSION) */
      case 4:
        return (
          <div className="relative flex h-full flex-col justify-between bg-gradient-to-br from-[#19102b] to-[#110a1f] p-10 sm:p-14">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#d8b4fe]">
                05 — Built to Retain
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-xl bg-dicey-dark p-1">
                  {([1, 2, 3, 4, 5] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setVipLvl(lvl)}
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                        vipLvl === lvl ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                      )}
                    >
                      Lvl {lvl}
                    </button>
                  ))}
                </div>
                <PrimaryButton onClick={() => setOpenModal("levelup")}>Preview Rank Up</PrimaryButton>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div className="grid grid-cols-5 gap-3">
                {[
                  { name: "Bronze", src: "/vip/elixir/tier1.svg" },
                  { name: "Silver", src: "/vip/elixir/tier2.svg" },
                  { name: "Gold", src: "/vip/elixir/tier3.svg" },
                  { name: "Diamond", src: "/vip/elixir/tier4.svg" },
                  { name: "Sapphire", src: "/vip/elixir/tier5.svg" },
                ].map((t) => (
                  <div key={t.name} className="flex flex-col items-center rounded-2xl border border-white/10 bg-dicey-dark/70 px-2 py-5 text-center">
                    <VipBadge src={t.src} alt={t.name} level={vipLvl} className="size-16" />
                    <p className="mt-3 text-xs font-bold text-white">{t.name}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-hero)] text-2xl font-black leading-tight tracking-[-0.02em] text-white sm:text-4xl">
                  Progression that feels like an achievement.
                </h2>
                <p className="text-sm leading-relaxed text-[#ded5eb]">
                  Players earn bespoke faceted gem crests and spiked star-hex emblems with live level pips — culminating in a celebratory Rank Up reveal that turns loyalty into a spectacle.
                </p>
                <p className="text-xs text-[#39ff14]">
                  ✓ Memoized SVG rendering keeps animations buttery smooth even alongside live 1s bonus timers.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#b7a9ca]">
              <span>5 Tiers × 5 Sub-levels = 25 distinct visual states</span>
              <span className="font-mono text-white">05 / 0{total}</span>
            </div>
          </div>
        );

      /* SLIDE 6: BUILT TO SCALE (DESIGN SYSTEM) */
      case 5:
        return (
          <div className="relative flex h-full flex-col justify-between bg-gradient-to-br from-[#19102b] to-[#110a1f] p-10 sm:p-14">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#d8b4fe]">
                06 — Built to Scale
              </span>
              <Link
                href="/design-system"
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-dark px-3.5 py-2 text-xs font-semibold text-[#39ff14] hover:border-[#39ff14]/40"
              >
                Open Design System <BiLinkExternal className="size-3.5" />
              </Link>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
              <div className="space-y-4">
                <h2 className="font-[family-name:var(--font-hero)] text-3xl font-black leading-[1.02] tracking-[-0.03em] text-white sm:text-4xl">
                  Ready for the next 50 campaigns, not just 1 homepage.
                </h2>
                <p className="text-sm leading-relaxed text-[#ded5eb] sm:text-base">
                  Every color, font scale, button, badge, and spacing unit lives in one living Design System — so marketing landing pages and product features ship fast and stay cohesive.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Color System", val: "Purple-Noir + Lime", sub: "Semantic CSS variables" },
                  { label: "Type Scale", val: "11-Step Hierarchy", sub: "Montserrat Hero + Geist UI" },
                  { label: "UI Primitives", val: "Shared & Audited", sub: "Unified tabs, inputs & modals" },
                  { label: "Lab Workflow", val: "7 Workbench Routes", sub: "Rapid visual A/B testing" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-dicey-dark p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#d8b4fe]">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-base font-bold text-white">{item.val}</p>
                    <p className="mt-1 text-xs text-[#b7a9ca]">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#b7a9ca]">
              <span>Consistent from landing hero down to live bet rows</span>
              <span className="font-mono text-white">06 / 0{total}</span>
            </div>
          </div>
        );

      /* SLIDE 7: CLOSING VISION */
      case 6:
      default:
        return (
          <div className="relative flex h-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#1b1030] via-[#140d24] to-[#0d0718] p-10 sm:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full opacity-25 blur-3xl"
              style={{ background: "radial-gradient(circle, #39ff14 0%, transparent 70%)" }}
            />

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#d8b4fe]">
                07 — Explore Live
              </span>
              <span className="font-mono text-xs text-[#b7a9ca]">07 / 0{total}</span>
            </div>

            <div className="relative max-w-3xl space-y-6">
              <h2 className="font-[family-name:var(--font-hero)] text-4xl font-black leading-[0.96] tracking-[-0.04em] text-white sm:text-5xl">
                Unmistakable brand.{" "}
                <span className="text-[#39ff14]">Zero-friction product.</span>
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-[#ded5eb]">
                Elixir brings together character storytelling, conversion-focused UX, and a scalable component system — ready to explore live in the browser.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/" target="_blank">
                  <PrimaryButton>Launch Live App</PrimaryButton>
                </Link>
                <Link
                  href="/design-system"
                  target="_blank"
                  className="rounded-xl border border-white/15 bg-dicey-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30"
                >
                  Design System
                </Link>
                <Link
                  href="/deposit-lab"
                  target="_blank"
                  className="rounded-xl border border-white/15 bg-dicey-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/30"
                >
                  Deposit Lab
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-[#b7a9ca]">
              <span>Thank you for watching — let&apos;s dive into the live product.</span>
              <span className="font-mono text-white">Elixir</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0716] text-white print:bg-[#140d24]">
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.25in;
          }
          body {
            background: #140d24 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      `}</style>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c0716]/90 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <ElixirLogo variant="icon" iconClassName="size-7" playEntrance={false} />
            <span className="text-xs font-semibold tracking-wide text-[#ded5eb]">
              ELIXIR • PRODUCT PITCH DECK
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGridView((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                gridView
                  ? "border-[#39ff14]/50 bg-[#39ff14]/15 text-[#39ff14]"
                  : "border-white/10 bg-dicey-card text-[#ded5eb] hover:border-white/25 hover:text-white"
              )}
            >
              <BiGridAlt className="size-4" />
              {gridView ? "Stage" : "Slides"}
            </button>

            <button
              type="button"
              onClick={() => setShowNotes((v) => !v)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                showNotes
                  ? "border-purple-400/50 bg-purple-500/15 text-purple-200"
                  : "border-white/10 bg-dicey-card text-[#ded5eb] hover:border-white/25 hover:text-white"
              )}
            >
              <BiNote className="size-4" />
              Notes
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3 py-1.5 text-xs font-semibold text-[#ded5eb] hover:border-white/25 hover:text-white"
            >
              <BiPrinter className="size-4" />
              PDF
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-dicey-card px-3 py-1.5 text-xs font-semibold text-white hover:border-white/25"
            >
              App <BiLinkExternal className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 print:hidden">
        {gridView ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrent(idx);
                  setGridView(false);
                }}
                className={cn(
                  "flex flex-col justify-between rounded-2xl border p-5 text-left transition-all",
                  current === idx
                    ? "border-[#39ff14]/65 bg-[#39ff14]/10"
                    : "border-white/10 bg-dicey-card hover:border-white/25"
                )}
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#39ff14]">{s.num}</span>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[#d8b4fe]">
                    {s.kicker}
                  </p>
                  <h3 className="mt-1.5 text-sm font-bold text-white">{s.title}</h3>
                </div>
                <p className="mt-4 line-clamp-3 text-[11px] leading-relaxed text-[#b7a9ca]">
                  {s.notes}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative min-h-[540px] w-full overflow-hidden rounded-3xl border border-white/15 shadow-[0_30px_100px_rgba(0,0,0,0.75)] lg:aspect-[16/9]">
              {renderSlide(current)}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={current === 0}
                  className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 disabled:opacity-40"
                >
                  <BiChevronLeft className="size-4" /> Prev
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={current === total - 1}
                  className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 disabled:opacity-40"
                >
                  Next <BiChevronRight className="size-4" />
                </button>
                <span className="ml-2 hidden text-[11px] text-[#b7a9ca] sm:inline">
                  ← / → navigate • G slides • N notes
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrent(idx)}
                    aria-label={`Slide ${s.num}: ${s.title}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      current === idx ? "w-6 bg-[#39ff14]" : "w-2 bg-white/20 hover:bg-white/40"
                    )}
                  />
                ))}
              </div>
            </div>

            {showNotes && (
              <div className="rounded-2xl border border-white/10 bg-dicey-card/70 px-5 py-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#d8b4fe]">
                  Pitch Notes — Slide {activeSlide.num}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#ded5eb]">{activeSlide.notes}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <div className="hidden space-y-6 print:block">
        {SLIDES.map((s, idx) => (
          <section
            key={s.id}
            className="break-after-page overflow-hidden rounded-3xl border border-white/15"
            style={{ aspectRatio: "16 / 9" }}
          >
            {renderSlide(idx)}
          </section>
        ))}
      </div>

      <DepositModal
        isOpen={openModal === "deposit"}
        onClose={() => setOpenModal(null)}
        cryptoAssets={CRYPTO_PREVIEW}
      />
      <SignUpModal isOpen={openModal === "signup"} onClose={() => setOpenModal(null)} />
      <LevelUpBonusModal
        isOpen={openModal === "levelup"}
        onClose={() => setOpenModal(null)}
        bonusAmount={245.13}
        onClaim={() => {}}
      />
    </div>
  );
}
