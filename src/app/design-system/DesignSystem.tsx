"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BiBoltCircle,
  BiChat,
  BiCheck,
  BiChevronDown,
  BiCog,
  BiCopy,
  BiError,
  BiGame,
  BiGift,
  BiHomeAlt,
  BiLinkExternal,
  BiLockAlt,
  BiMenu,
  BiMinus,
  BiPlus,
  BiRefresh,
  BiRocket,
  BiSearch,
  BiShield,
  BiStar,
  BiTrophy,
  BiUser,
  BiWallet,
  BiX,
} from "react-icons/bi";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ModalCloseButton from "@/components/ui/ModalCloseButton";
import VipBadge from "@/components/ui/VipBadge";
import HeroBanner from "@/components/HeroBanner";
import GameCard from "@/components/GameCard";
import DepositModal from "@/components/DepositModal";
import SignUpModal from "@/components/SignUpModal";
import LevelUpBonusModal from "@/components/LevelUpBonusModal";
import { originalGames } from "@/lib/originalGames";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                 TOKEN DATA                                 */
/* -------------------------------------------------------------------------- */

const SURFACE_TOKENS = [
  { name: "Darker (App Canvas)", cssVar: "--dicey-darker", tw: "bg-dicey-darker", hex: "#140d24", usage: "Root page background & recessed wells" },
  { name: "Dark (Inset Surface)", cssVar: "--dicey-dark", tw: "bg-dicey-dark", hex: "#1a1229", usage: "Inputs, segmented tracks, inner panels" },
  { name: "Card (Primary Surface)", cssVar: "--dicey-card", tw: "bg-dicey-card", hex: "#231738", usage: "Modals, cards, dropdown menus, table wraps" },
  { name: "Card Elevated", cssVar: "--dicey-card-elevated", tw: "bg-dicey-card-elevated", hex: "#2a1d42", usage: "Hover states, close buttons, raised pills" },
  { name: "Border", cssVar: "--dicey-border", tw: "border-dicey-border", hex: "#362452", usage: "Panel borders, dividers, disabled track" },
  { name: "Border Light", cssVar: "--dicey-border-light", tw: "border-dicey-border-light", hex: "#453066", usage: "Active outlines & emphasized dividers" },
] as const;

const TEXT_TOKENS = [
  { name: "Text Primary", cssVar: "--text-primary", tw: "text-white", hex: "#ffffff", usage: "Headlines, primary values, active labels" },
  { name: "Text Secondary", cssVar: "--text-secondary", tw: "text-[#ded5eb]", hex: "#ded5eb", usage: "Body copy, descriptions, modal prose" },
  { name: "Text Muted", cssVar: "--text-muted", tw: "text-[#b7a9ca]", hex: "#b7a9ca", usage: "Captions, timestamps, helper labels" },
  { name: "Text Accent", cssVar: "--text-accent", tw: "text-[#d8b4fe]", hex: "#d8b4fe", usage: "Eyebrows, network tags, promo labels" },
] as const;

const BRAND_ACTION_TOKENS = [
  { name: "Action Bright (Neon)", cssVar: "--action-bright", tw: "text-[#39ff14]", hex: "#39ff14", usage: "Primary CTA highlight, active selection rings, live glow" },
  { name: "Action Base", cssVar: "--action-base", tw: "bg-[#32cd32]", hex: "#32cd32", usage: "3D jelly button mid-tone gradient" },
  { name: "Action Shade", cssVar: "--action-shade", tw: "bg-[#228b22]", hex: "#228b22", usage: "3D jelly button lower gradient" },
  { name: "Action Depth", cssVar: "--action-depth", tw: "bg-[#1a5c0a]", hex: "#1a5c0a", usage: "3D button bottom lip / pressed shadow" },
  { name: "Dicey Accent (Purple)", cssVar: "--dicey-accent", tw: "bg-dicey-accent", hex: "#a855f7", usage: "Brand purple accent, VIP highlights, focus accents" },
  { name: "Accent Light", cssVar: "--dicey-accent-light", tw: "bg-dicey-accent-light", hex: "rgba(168,85,247,0.25)", usage: "Soft ambient glows & tinted surfaces" },
] as const;

const SEMANTIC_TOKENS = [
  { name: "Focus Ring", cssVar: "focus-visible", tw: "outline-[#c4b5fd]", hex: "#c4b5fd", usage: "2px solid outline with 4px offset" },
  { name: "Success / Win", cssVar: "emerald-400", tw: "text-emerald-400", hex: "#34d399", usage: "Positive payouts, 100x+ fizzy border" },
  { name: "Warning (Network)", cssVar: "amber-400", tw: "text-amber-400", hex: "#fbbf24", usage: "ERC-20 / network deposit caution banners" },
  { name: "Danger / Error", cssVar: "rose-400", tw: "text-rose-400", hex: "#fb7185", usage: "Destructive actions & validation errors" },
  { name: "Info / Sports", cssVar: "sky-400", tw: "text-sky-400", hex: "#38bdf8", usage: "Informational callouts & tier accents" },
] as const;

const TYPOGRAPHY_SCALE = [
  {
    role: "Display / Landing Hero",
    token: "font-[family-name:var(--font-hero)]",
    font: "Montserrat (900)",
    size: "44px – 56px",
    lineHeight: "0.96 – 1.05",
    tracking: "-0.045em to -0.02em",
    sample: "Play Smarter. Win Bigger.",
    className: "font-[family-name:var(--font-hero)] text-[40px] sm:text-[48px] font-black leading-[0.98] tracking-[-0.045em] text-white",
    usage: "Landing page hero H1 & Sign-up offer headline (100% up to $1,000)",
  },
  {
    role: "Hero / Section Banner",
    token: ".hero-headline",
    font: "Montserrat (900)",
    size: "32px – 36px",
    lineHeight: "1.05",
    tracking: "-0.015em",
    sample: "Join Elixir Today",
    className: "hero-headline text-3xl sm:text-4xl leading-none text-white",
    usage: "Modal hero titles, promo banners, landing section headers",
  },
  {
    role: "Page / Feature Heading",
    token: "text-2xl font-bold",
    font: "Geist Sans (700)",
    size: "24px (1.5rem)",
    lineHeight: "32px (1.33)",
    tracking: "-0.02em",
    sample: "Provably Fair Originals",
    className: "text-2xl font-bold tracking-[-0.02em] text-white",
    usage: "Top-level page titles, game category headers",
  },
  {
    role: "Numeric / Stat Value",
    token: ".ui-detail-value",
    font: "Geist Sans (600, tabular)",
    size: "20px (1.25rem)",
    lineHeight: "28px (1.4)",
    tracking: "0em",
    sample: "$1,619.45 • 142.80x",
    className: "ui-detail-value text-white",
    usage: "Balances, multipliers, KPI counters (always tabular-nums)",
  },
  {
    role: "Modal / Card Title",
    token: ".ui-modal-title",
    font: "Geist Sans (600)",
    size: "18px (1.125rem)",
    lineHeight: "1.4 (25.2px)",
    tracking: "-0.02em",
    sample: "Deposit Cryptocurrency",
    className: "ui-modal-title text-white",
    usage: "Modal headers, panel titles, card group headings",
  },
  {
    role: "Subheading / Lead",
    token: "text-base font-medium",
    font: "Geist Sans (500)",
    size: "16px (1rem)",
    lineHeight: "24px (1.5)",
    tracking: "-0.01em",
    sample: "Instant deposits with zero platform fees.",
    className: "text-base font-medium text-[#ded5eb]",
    usage: "Landing page lead paragraphs, card subtitles",
  },
  {
    role: "Body Copy",
    token: ".ui-body",
    font: "Geist Sans (400)",
    size: "14px (0.875rem)",
    lineHeight: "1.65 (23.1px)",
    tracking: "0em",
    sample: "Create your account in seconds and claim a 100% match bonus on your first deposit.",
    className: "ui-body",
    usage: "Default prose, modal descriptions, rules & FAQ copy",
  },
  {
    role: "Control / Button Label",
    token: "text-sm font-semibold",
    font: "Geist Sans (600)",
    size: "14px (0.875rem)",
    lineHeight: "20px (1.43)",
    tracking: "0em",
    sample: "Create account • Deposit",
    className: "text-sm font-semibold text-white",
    usage: "Buttons, segmented tabs, nav items, form inputs",
  },
  {
    role: "Caption / Table Meta",
    token: ".ui-caption",
    font: "Geist Sans (400)",
    size: "12px (0.75rem)",
    lineHeight: "18px (1.5)",
    tracking: "0em",
    sample: "Minimum deposit 10 USDC • 12 confirmations",
    className: "ui-caption",
    usage: "Helper text, table metadata, timestamps, secondary labels",
  },
  {
    role: "Eyebrow / Overline",
    token: ".ui-eyebrow",
    font: "Geist Sans (600)",
    size: "11px (0.6875rem)",
    lineHeight: "16px (1.45)",
    tracking: "0.02em – 0.08em",
    sample: "WELCOME BONUS • DEPOSIT ADDRESS",
    className: "ui-eyebrow uppercase tracking-[0.08em]",
    usage: "Section kickers, form field labels, badge kickers",
  },
  {
    role: "Monospace / Address",
    token: "font-mono text-xs",
    font: "Geist Mono (400)",
    size: "12px (0.75rem)",
    lineHeight: "18px (1.5)",
    tracking: "0em",
    sample: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD38",
    className: "font-mono text-xs text-white",
    usage: "Wallet addresses, transaction hashes, token codes",
  },
] as const;

const SPACING_TOKENS = [
  { name: "--space-1", px: "4px", rem: "0.25rem", tw: "1", usage: "Tight icon gaps, button bottom lip" },
  { name: "--space-2", px: "8px", rem: "0.5rem", tw: "2", usage: "Inline chip gaps, compact grid gap" },
  { name: "--space-3", px: "12px", rem: "0.75rem", tw: "3", usage: "Button vertical padding, form stack" },
  { name: "--space-4", px: "16px", rem: "1rem", tw: "4", usage: "Detail grid padding, card inner gap" },
  { name: "--space-6", px: "24px", rem: "1.5rem", tw: "6", usage: "Modal padding, section column gap" },
  { name: "--space-8", px: "32px", rem: "2rem", tw: "8", usage: "Hero padding, major section spacing" },
] as const;

const RADIUS_TOKENS = [
  { name: "Pill / Badge", varName: "rounded-full", value: "9999px", usage: "Status pills, network tags, live dot" },
  { name: "Control", varName: "--radius-control", value: "12px (rounded-xl)", usage: "Buttons, inputs, segmented tracks, detail wells" },
  { name: "Card / Surface", varName: "rounded-2xl", value: "16px", usage: "Game cards, QR card, table containers" },
  { name: "Modal Panel", varName: "--radius-panel", value: "24px (rounded-3xl)", usage: "Dialogs, hero banners, showcase panels" },
] as const;

const VIP_TIERS = [
  { tier: "Bronze", src: "/vip/elixir/tier1.svg", range: "Tier 1" },
  { tier: "Silver", src: "/vip/elixir/tier2.svg", range: "Tier 2" },
  { tier: "Gold", src: "/vip/elixir/tier3.svg", range: "Tier 3" },
  { tier: "Diamond", src: "/vip/elixir/tier4.svg", range: "Tier 4" },
  { tier: "Sapphire", src: "/vip/elixir/tier5.svg", range: "Tier 5" },
] as const;

const CRYPTO_ASSETS = [
  { symbol: "USDC", name: "USD Coin", src: "/crypto/usdc.svg" },
  { symbol: "SOL", name: "Solana", src: "/crypto/sol.svg" },
  { symbol: "ETH", name: "Ethereum", src: "/crypto/eth.svg" },
  { symbol: "BTC", name: "Bitcoin", src: "/crypto/btc.svg" },
  { symbol: "USDT", name: "Tether", src: "/crypto/usdt.svg" },
  { symbol: "LTC", name: "Litecoin", src: "/crypto/ltc.svg" },
  { symbol: "DOGE", name: "Dogecoin", src: "/crypto/doge.svg" },
  { symbol: "XRP", name: "Ripple", src: "/crypto/xrp.svg" },
  { symbol: "BNB", name: "BNB", src: "/crypto/bnb.svg" },
  { symbol: "MATIC", name: "Polygon", src: "/crypto/matic.svg" },
] as const;

const ICON_ITEMS = [
  { name: "BiHomeAlt", Icon: BiHomeAlt },
  { name: "BiGame", Icon: BiGame },
  { name: "BiTrophy", Icon: BiTrophy },
  { name: "BiWallet", Icon: BiWallet },
  { name: "BiGift", Icon: BiGift },
  { name: "BiStar", Icon: BiStar },
  { name: "BiRocket", Icon: BiRocket },
  { name: "BiBoltCircle", Icon: BiBoltCircle },
  { name: "BiChat", Icon: BiChat },
  { name: "BiSearch", Icon: BiSearch },
  { name: "BiUser", Icon: BiUser },
  { name: "BiShield", Icon: BiShield },
  { name: "BiLockAlt", Icon: BiLockAlt },
  { name: "BiCog", Icon: BiCog },
  { name: "BiCopy", Icon: BiCopy },
  { name: "BiCheck", Icon: BiCheck },
  { name: "BiError", Icon: BiError },
  { name: "BiChevronDown", Icon: BiChevronDown },
  { name: "BiMenu", Icon: BiMenu },
  { name: "BiX", Icon: BiX },
  { name: "BiPlus", Icon: BiPlus },
  { name: "BiMinus", Icon: BiMinus },
  { name: "BiRefresh", Icon: BiRefresh },
  { name: "BiLinkExternal", Icon: BiLinkExternal },
] as const;

const SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "layout", label: "Spacing & Radii" },
  { id: "components", label: "Components" },
  { id: "badges", label: "VIP & Status" },
  { id: "icons", label: "Icons & Assets" },
  { id: "patterns", label: "Patterns" },
] as const;

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

function CopyChip({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* Clipboard unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-dicey-darker px-2 py-0.5 font-mono text-[11px] text-[#ded5eb] transition-colors hover:border-white/25 hover:text-white"
      title={`Copy ${value}`}
    >
      {copied ? <BiCheck className="size-3.5 text-[#39ff14]" /> : <BiCopy className="size-3 opacity-70" />}
      <span>{copied ? "Copied" : label ?? value}</span>
    </button>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 border-b border-white/10 pb-4">
      <p className="ui-eyebrow uppercase tracking-[0.08em]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-white">{title}</h2>
      <p className="ui-body mt-1 max-w-2xl">{description}</p>
    </div>
  );
}

export default function DesignSystem() {
  const [segTab, setSegTab] = useState<"overview" | "landing" | "app">("overview");
  const [vipLevel, setVipLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum (ERC-20)");
  const [customSample, setCustomSample] = useState("");
  const [openModal, setOpenModal] = useState<"deposit" | "signup" | "levelup" | null>(null);

  return (
    <div className="min-h-screen bg-dicey-darker text-white">
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-dicey-darker/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-3">
            <img src="/elixir-icon.jpg" alt="Elixir" className="size-8 rounded-lg object-cover" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-white">Elixir Design System</span>
                <span className="rounded-full border border-[#39ff14]/35 bg-[#39ff14]/10 px-2 py-0.5 text-[10px] font-semibold text-[#39ff14]">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-[#b7a9ca]">Tokens, Typography Scale & UI Primitives</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-xl bg-dicey-dark p-1 lg:flex" aria-label="Design system sections">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-dicey-card-elevated"
          >
            Back to App
            <BiLinkExternal className="size-3.5" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-16 px-5 py-10 sm:px-8 sm:py-12">
        {/* Hero Overview */}
        <section className="relative overflow-hidden rounded-3xl border border-dicey-border bg-dicey-card p-6 sm:p-10">
          <div
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)" }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="ui-eyebrow uppercase tracking-[0.08em]">ELIXIR DESIGN LANGUAGE</p>
              <h1 className="mt-2 font-[family-name:var(--font-hero)] text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl">
                Foundations for Product &amp; Landing Pages
              </h1>
              <p className="ui-body mt-4 max-w-2xl">
                Single source of truth for Elixir&apos;s purple-noir surfaces, neon-lime action hierarchy,
                Montserrat display &amp; Geist UI type scale, 4px spacing grid, and interactive primitives.
                Click any token chip to copy its CSS variable, hex value, or Tailwind class.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#typography">
                  <PrimaryButton>Explore Type Scale</PrimaryButton>
                </a>
                <a
                  href="#colors"
                  className="rounded-xl border border-white/10 bg-dicey-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                >
                  Browse Color Tokens
                </a>
              </div>
            </div>

            <div className="ui-detail-grid">
              <div>
                <p className="ui-caption">Display Font</p>
                <p className="ui-detail-value text-white">Montserrat</p>
                <p className="mt-0.5 text-[11px] text-[#d8b4fe]">--font-hero (100–900)</p>
              </div>
              <div>
                <p className="ui-caption">UI &amp; Mono Fonts</p>
                <p className="ui-detail-value text-white">Geist</p>
                <p className="mt-0.5 text-[11px] text-[#d8b4fe]">Sans &amp; Mono</p>
              </div>
              <div>
                <p className="ui-caption">Spacing Base</p>
                <p className="ui-detail-value text-white">4px Grid</p>
                <p className="mt-0.5 text-[11px] text-[#b7a9ca]">--space-1 to --space-8</p>
              </div>
              <div>
                <p className="ui-caption">Motion Curve</p>
                <p className="ui-detail-value text-white">160ms</p>
                <p className="mt-0.5 text-[11px] text-[#b7a9ca]">cubic-bezier(.23,1,.32,1)</p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. COLOR TOKENS */}
        <section className="space-y-8">
          <SectionHeader
            id="colors"
            eyebrow="01 / COLOR SYSTEM"
            title="Color Tokens"
            description="Built around deep purple-noir surfaces (--dicey-darker through --dicey-card-elevated) paired with high-contrast neon-lime CTAs (--action-bright) and lavender accents."
          />

          {/* Surfaces & Borders */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Surfaces &amp; Borders</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SURFACE_TOKENS.map((t) => (
                <div key={t.name} className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-dicey-card p-4">
                  <div
                    className="size-12 shrink-0 rounded-xl border border-white/15 shadow-inner"
                    style={{ backgroundColor: t.hex }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs text-[#b7a9ca]">{t.usage}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      <CopyChip value={`var(${t.cssVar})`} label={t.cssVar} />
                      <CopyChip value={t.hex} />
                      <CopyChip value={t.tw} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text & Brand Action */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Text Hierarchy</h3>
              <div className="space-y-2.5">
                {TEXT_TOKENS.map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-dicey-card px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid size-8 place-items-center rounded-lg bg-dicey-dark text-sm font-bold" style={{ color: t.hex }}>
                        Aa
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-[#b7a9ca]">{t.usage}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <CopyChip value={`var(${t.cssVar})`} label={t.cssVar} />
                      <CopyChip value={t.hex} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white">Brand &amp; Action Tokens</h3>
              <div className="space-y-2.5">
                {BRAND_ACTION_TOKENS.map((t) => (
                  <div key={t.name} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-dicey-card px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="size-8 shrink-0 rounded-lg border border-white/15" style={{ background: t.hex }} />
                      <div>
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <p className="text-xs text-[#b7a9ca]">{t.usage}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      <CopyChip value={`var(${t.cssVar})`} label={t.cssVar} />
                      <CopyChip value={t.hex} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Semantic & Gradients */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Semantic &amp; Status Colors</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {SEMANTIC_TOKENS.map((t) => (
                <div key={t.name} className="rounded-2xl border border-white/10 bg-dicey-card p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="size-4 rounded-full" style={{ backgroundColor: t.hex }} />
                    <span className="text-sm font-semibold text-white">{t.name}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-[#b7a9ca]">{t.usage}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <CopyChip value={t.hex} />
                    <CopyChip value={t.tw} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. TYPOGRAPHY SCALE */}
        <section className="space-y-6">
          <SectionHeader
            id="typography"
            eyebrow="02 / TYPOGRAPHY SCALE"
            title="Type Scale & Landing Page Reference"
            description="Montserrat (--font-hero) drives high-impact display & landing headlines; Geist Sans (--font-sans) powers all product UI; Geist Mono (--font-mono) handles addresses and hashes."
          />

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-dicey-card px-4 py-3">
            <span className="text-xs font-medium text-[#ded5eb]">
              Test custom copy across every scale step:
            </span>
            <input
              type="text"
              value={customSample}
              onChange={(e) => setCustomSample(e.target.value)}
              placeholder="Type custom landing headline or UI text..."
              className="w-full max-w-md rounded-xl border border-white/10 bg-dicey-dark px-3.5 py-2 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-[#c4b5fd]/60"
            />
          </div>

          <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-dicey-card">
            {TYPOGRAPHY_SCALE.map((item) => (
              <div key={item.role} className="grid gap-4 p-5 lg:grid-cols-[260px_1fr] lg:items-center">
                <div className="space-y-1.5">
                  <p className="text-sm font-bold text-white">{item.role}</p>
                  <p className="text-xs text-[#b7a9ca]">{item.font}</p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#ded5eb]">
                    <span>Size: <strong className="text-white">{item.size}</strong></span>
                    <span>LH: <strong className="text-white">{item.lineHeight}</strong></span>
                    <span>Track: <strong className="text-white">{item.tracking}</strong></span>
                  </div>
                  <div className="pt-1">
                    <CopyChip value={item.token} />
                  </div>
                </div>

                <div className="min-w-0 space-y-2">
                  <p className={cn("break-words", item.className)}>
                    {customSample.trim() ? customSample : item.sample}
                  </p>
                  <p className="text-[11px] text-[#b7a9ca]">{item.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SPACING, RADII & MOTION */}
        <section className="space-y-6">
          <SectionHeader
            id="layout"
            eyebrow="03 / LAYOUT & MOTION"
            title="Spacing, Radius & Elevation Tokens"
            description="A strict 4px spacing scale paired with two primary corner radii: 12px for controls and 24px for panels."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Spacing */}
            <div className="rounded-2xl border border-white/10 bg-dicey-card p-5">
              <h3 className="mb-4 text-sm font-semibold text-white">4px Spacing Grid</h3>
              <div className="space-y-3">
                {SPACING_TOKENS.map((s) => (
                  <div key={s.name} className="flex items-center gap-3">
                    <div className="w-24 shrink-0 font-mono text-xs text-[#d8b4fe]">{s.name}</div>
                    <div className="w-12 shrink-0 text-xs font-semibold tabular-nums text-white">{s.px}</div>
                    <div
                      className="h-3 rounded bg-[#39ff14]/80"
                      style={{ width: s.px }}
                    />
                    <span className="min-w-0 flex-1 truncate text-xs text-[#b7a9ca]">{s.usage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Radii */}
            <div className="rounded-2xl border border-white/10 bg-dicey-card p-5">
              <h3 className="mb-4 text-sm font-semibold text-white">Border Radii</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {RADIUS_TOKENS.map((r) => (
                  <div key={r.name} className="rounded-xl border border-white/10 bg-dicey-dark p-3.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-white">{r.name}</span>
                      <CopyChip value={r.varName} />
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-[#39ff14]">{r.value}</p>
                    <p className="mt-1.5 text-[11px] text-[#b7a9ca]">{r.usage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. COMPONENT TOKENS & PRIMITIVES */}
        <section className="space-y-6">
          <SectionHeader
            id="components"
            eyebrow="04 / COMPONENT PRIMITIVES"
            title="Buttons, Controls, Forms & Surfaces"
            description="Interactive building blocks styled with Elixir's shared component classes and Tailwind patterns."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Buttons */}
            <div className="space-y-4 rounded-2xl border border-white/10 bg-dicey-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Buttons</h3>
                <CopyChip value=".ui-primary-button" />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <PrimaryButton>Primary Jelly CTA</PrimaryButton>
                <PrimaryButton disabled>Disabled</PrimaryButton>
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-dicey-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                >
                  Secondary
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-[#39ff14] px-3 py-1.5 text-xs font-bold text-[#071a04] transition-opacity hover:opacity-90"
                >
                  Inline Copy
                </button>
                <ModalCloseButton onClick={() => {}} label="Close example" />
              </div>
            </div>

            {/* Segmented Controller */}
            <div className="space-y-4 rounded-2xl border border-white/10 bg-dicey-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Segmented Controller</h3>
                <CopyChip value="bg-white/10 text-white" />
              </div>
              <div role="tablist" aria-label="Example segmented controller" className="inline-flex rounded-xl bg-dicey-dark p-1">
                {([
                  ["overview", "Overview"],
                  ["landing", "Landing"],
                  ["app", "Product App"],
                ] as const).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={segTab === id}
                    onClick={() => setSegTab(id)}
                    className={cn(
                      "rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-150",
                      segTab === id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#b7a9ca]">
                Used in Sign Up / Sign In, Live Bets filter tabs, and Game Stats tabs.
              </p>
            </div>

            {/* Inputs & Custom Dropdown */}
            <div className="space-y-4 rounded-2xl border border-white/10 bg-dicey-card p-6">
              <h3 className="text-sm font-semibold text-white">Inputs &amp; Dropdowns</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Email address"
                  className="w-full rounded-xl border border-white/10 bg-dicey-dark px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition-colors focus:border-lime-300/60"
                />
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-dicey-dark px-4 py-3 text-sm text-white transition-colors hover:border-white/25"
                  >
                    <span className="truncate">{selectedNetwork}</span>
                    <BiChevronDown className={cn("size-4 text-gray-400 transition-transform", dropdownOpen && "rotate-180")} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-1.5 rounded-xl border border-dicey-border bg-dicey-card p-1 shadow-xl">
                      {["Ethereum (ERC-20)", "Solana", "Bitcoin", "Polygon"].map((net) => (
                        <button
                          key={net}
                          type="button"
                          onClick={() => {
                            setSelectedNetwork(net);
                            setDropdownOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-colors",
                            selectedNetwork === net
                              ? "bg-white/10 text-white"
                              : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                          )}
                        >
                          {net}
                          {selectedNetwork === net && <BiCheck className="size-4 text-[#39ff14]" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Alerts & Surfaces */}
            <div className="space-y-4 rounded-2xl border border-white/10 bg-dicey-card p-6">
              <h3 className="text-sm font-semibold text-white">Callouts &amp; Table Rows</h3>
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-400/25 bg-amber-500/10 px-3.5 py-2.5 text-xs leading-snug text-amber-200">
                <BiError className="mt-0.5 size-4 shrink-0 text-amber-400" />
                <span>
                  You must send <strong>USDC on Ethereum (ERC-20)</strong> only. Sending via another network may result in permanent loss.
                </span>
              </div>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <div className="flex items-center justify-between bg-dicey-dark px-3.5 py-2 text-xs">
                  <span className="text-[#ded5eb]">Row 1 (Base)</span>
                  <span className="font-semibold tabular-nums text-[#39ff14]">+2.45 ETH</span>
                </div>
                <div className="flex items-center justify-between bg-black/25 px-3.5 py-2 text-xs">
                  <span className="text-[#ded5eb]">Row 2 (Alternating bg-black/25)</span>
                  <span className="font-semibold tabular-nums text-white">1.00 BTC</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. VIP BADGES & STATUS PILLS */}
        <section className="space-y-6">
          <SectionHeader
            id="badges"
            eyebrow="05 / VIP & STATUS"
            title="VIP Tiers & Status Pills"
            description="Dynamic SVG crests for Tiers 1–5 with live level pips, paired with game card & live feed pills."
          />

          <div className="rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-white">VIP Badge Tiers</h3>
              <div className="flex items-center gap-1.5 rounded-xl bg-dicey-dark p-1">
                {([1, 2, 3, 4, 5] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setVipLevel(lvl)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                      vipLevel === lvl ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    Lvl {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {VIP_TIERS.map((v) => (
                <div key={v.tier} className="flex flex-col items-center rounded-xl border border-white/10 bg-dicey-dark p-4 text-center">
                  <VipBadge src={v.src} alt={v.tier} level={vipLevel} className="size-16" />
                  <p className="mt-2.5 text-sm font-bold text-white">{v.tier}</p>
                  <p className="text-[11px] text-[#b7a9ca]">
                    {v.range} • Pip {vipLevel}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-white/10 pt-5">
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2.5 py-1 text-[11px] font-semibold text-purple-200 border border-purple-400/30">
                Exclusive
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 text-[11px] font-semibold text-amber-300 border border-amber-400/30">
                Hot
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#39ff14]/15 px-2.5 py-1 text-[11px] font-semibold text-[#39ff14] border border-[#39ff14]/35">
                New
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-dicey-dark px-2.5 py-1 text-[11px] font-medium text-white">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39ff14] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#39ff14]" />
                </span>
                Live Feed
              </span>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-purple-200/90">
                Ethereum (ERC-20)
              </span>
            </div>
          </div>
        </section>

        {/* 6. ICONS & BRAND ASSETS */}
        <section className="space-y-6">
          <SectionHeader
            id="icons"
            eyebrow="06 / ICONOGRAPHY & ASSETS"
            title="Boxicons, Crypto Tokens & Brand Marks"
            description="Elixir standardizes on Boxicons (react-icons/bi) for product UI, vector SVGs for all 10 supported cryptocurrencies, and dedicated brand marks."
          />

          {/* Boxicons */}
          <div className="rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Boxicons (react-icons/bi)</h3>
              <CopyChip value='from "react-icons/bi"' />
            </div>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-8">
              {ICON_ITEMS.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-dicey-dark p-3 text-center"
                >
                  <Icon className="size-5 text-white" />
                  <CopyChip value={name} />
                </div>
              ))}
            </div>
          </div>

          {/* Crypto Assets & Brand Marks */}
          <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-dicey-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-white">Cryptocurrency Icons (/crypto/*.svg)</h3>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                {CRYPTO_ASSETS.map((c) => (
                  <div
                    key={c.symbol}
                    className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-dicey-dark p-2.5"
                  >
                    <img src={c.src} alt={c.symbol} className="size-7 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white">{c.symbol}</p>
                      <p className="truncate text-[10px] text-[#b7a9ca]">{c.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-dicey-card p-6">
              <h3 className="mb-4 text-sm font-semibold text-white">Brand Marks</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center rounded-xl border border-white/10 bg-dicey-dark p-4 text-center">
                  <img src="/elixir-icon.jpg" alt="Elixir Icon" className="size-14 rounded-xl object-cover" />
                  <p className="mt-2.5 text-xs font-semibold text-white">Elixir Mark</p>
                  <p className="mt-0.5 font-mono text-[10px] text-[#b7a9ca]">/elixir-icon.jpg</p>
                </div>
                <div className="flex flex-col items-center rounded-xl border border-white/10 bg-dicey-dark p-4 text-center">
                  <img src="/elixir-originals-icon.jpg" alt="Elixir Originals" className="size-14 rounded-xl object-cover" />
                  <p className="mt-2.5 text-xs font-semibold text-white">Originals Mark</p>
                  <p className="mt-0.5 font-mono text-[10px] text-[#b7a9ca]">/elixir-originals-icon.jpg</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. COMPOSITE PATTERNS (HERO BANNERS, GAME CARDS, MODALS) */}
        <section className="space-y-8">
          <SectionHeader
            id="patterns"
            eyebrow="07 / COMPOSITE PATTERNS"
            title="Hero Banners, Game Cards & Modals"
            description="Live production components rendered with Elixir's tokens — ready to reference when composing landing pages and product flows."
          />

          {/* Hero Banners */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Hero Banners</h3>
              <CopyChip value="<HeroBanner />" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-dicey-card p-4 sm:p-6">
              <HeroBanner />
            </div>
          </div>

          {/* Game Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Game Cards</h3>
              <CopyChip value="<GameCard />" />
            </div>
            <div className="flex gap-4 overflow-x-auto rounded-2xl border border-white/10 bg-dicey-card p-5">
              {originalGames.slice(0, 5).map((game, i) => (
                <GameCard
                  key={game.id}
                  title={game.title}
                  provider={game.provider}
                  image={game.image}
                  isOriginal={game.isOriginal}
                  isHot={i === 0}
                  isNew={i === 2}
                  isLive={i === 3}
                  players={180 + i * 73}
                />
              ))}
            </div>
          </div>

          {/* Modal Previews */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Live Modal Showcases</h3>
            <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-dicey-card p-5">
              <PrimaryButton onClick={() => setOpenModal("deposit")}>Open Deposit Modal</PrimaryButton>
              <button
                type="button"
                onClick={() => setOpenModal("signup")}
                className="rounded-xl border border-white/10 bg-dicey-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                Open Sign Up / Sign In Modal
              </button>
              <button
                type="button"
                onClick={() => setOpenModal("levelup")}
                className="rounded-xl border border-white/10 bg-dicey-dark px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
              >
                Open Level Up Modal
              </button>
            </div>
          </div>
        </section>
      </main>

      <DepositModal
        isOpen={openModal === "deposit"}
        onClose={() => setOpenModal(null)}
        cryptoAssets={CRYPTO_ASSETS.map((c, idx) => ({
          symbol: c.symbol,
          name: c.name,
          icon: c.src,
          balance: idx === 0 ? "1,619.45" : idx === 1 ? "12.45" : idx === 2 ? "0.85" : "0.00",
        }))}
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
