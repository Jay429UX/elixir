"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowClockwise } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface TierPalette {
  name: string;
  level: number;
  spikes: boolean;
  metalLight: string;
  metalMid: string;
  metalDark: string;
  gemBright: string;
  gemDeep: string;
  glow: string;
  roman: string;
}

const TIERS: TierPalette[] = [
  {
    name: "Bronze",
    level: 1,
    spikes: false,
    metalLight: "#f6b27a",
    metalMid: "#c7723b",
    metalDark: "#6e3414",
    gemBright: "#ffb067",
    gemDeep: "#7a2c0b",
    glow: "rgba(246, 178, 122, 0.45)",
    roman: "I",
  },
  {
    name: "Silver",
    level: 2,
    spikes: false,
    metalLight: "#f1f5f9",
    metalMid: "#94a3b8",
    metalDark: "#475569",
    gemBright: "#7dd3fc",
    gemDeep: "#0369a1",
    glow: "rgba(125, 211, 252, 0.45)",
    roman: "II",
  },
  {
    name: "Gold",
    level: 3,
    spikes: false,
    metalLight: "#fef08a",
    metalMid: "#eab308",
    metalDark: "#854d0e",
    gemBright: "#fde047",
    gemDeep: "#a16207",
    glow: "rgba(250, 204, 21, 0.5)",
    roman: "III",
  },
  {
    name: "Emerald",
    level: 4,
    spikes: true,
    metalLight: "#bbf7d0",
    metalMid: "#22c55e",
    metalDark: "#14532d",
    gemBright: "#39ff14",
    gemDeep: "#15803d",
    glow: "rgba(57, 255, 20, 0.5)",
    roman: "IV",
  },
  {
    name: "Diamond",
    level: 5,
    spikes: true,
    metalLight: "#e0f2fe",
    metalMid: "#60a5fa",
    metalDark: "#1e3a8a",
    gemBright: "#c084fc",
    gemDeep: "#5b21b6",
    glow: "rgba(192, 132, 252, 0.55)",
    roman: "V",
  },
];

function SubLevelPips({
  subLevel,
  bright,
  y = 114,
}: {
  subLevel: number;
  bright: string;
  y?: number;
}) {
  const count = Math.max(1, Math.min(5, subLevel));
  const spacing = 12.5;
  const startX = 64 - ((count - 1) * spacing) / 2;
  const pillW = Math.max(26, count * spacing + 12);

  return (
    <g className="sv-pips">
      <rect
        x={64 - pillW / 2}
        y={y - 9.5}
        width={pillW}
        height="19"
        rx="9.5"
        fill="#090412"
        stroke="#3b2566"
        strokeWidth="2.2"
      />
      {Array.from({ length: count }).map((_, i) => (
        <circle
          key={i}
          className="sv-pip"
          cx={startX + i * spacing}
          cy={y}
          r="4.5"
          fill={bright}
          stroke="#ffffff"
          strokeOpacity="0.85"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function CombinedGemCrestSvg({
  tier,
  size,
  subLevel = 1,
}: {
  tier: TierPalette;
  size: number;
  subLevel?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const core = (
    <>
      <g className="sv-bezel">
        <path d="M64 6L114 35V93L64 122L14 93V35L64 6Z" fill="#090412" stroke="#090412" strokeWidth="5" strokeLinejoin="round" />
        <path d="M64 6L64 26L31 45L14 35L64 6Z" fill={`url(#tl-${uid})`} />
        <path d="M64 6L114 35L97 45L64 26L64 6Z" fill={`url(#tr-${uid})`} />
        <path d="M14 35L31 45V83L14 93V35Z" fill={`url(#l-${uid})`} />
        <path d="M114 35V93L97 83V45L114 35Z" fill={`url(#r-${uid})`} />
        <path d="M14 93L31 83L64 102V122L14 93Z" fill={`url(#bl-${uid})`} />
        <path d="M114 93L64 122V102L97 83L114 93Z" fill={`url(#br-${uid})`} />
        <path d="M15 92V35.5L64 7L113 35.5" stroke="#ffffff" strokeOpacity="0.65" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M64 24L99 44V84L64 104L29 84V44L64 24Z" fill="#0d0618" stroke="#05020a" strokeWidth="2" strokeLinejoin="round" />
        <path d="M98 45V83.5L64 103" stroke={tier.metalLight} strokeOpacity="0.45" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g className="sv-gem">
        <path d="M64 29L94 46.5V81.5L64 99L34 81.5V46.5L64 29Z" fill={`url(#core-${uid})`} />
        <path d="M64 29L79 47L64 41L49 47L64 29Z" fill="#ffffff" fillOpacity="0.42" />
        <path d="M64 29L94 46.5L79 47L64 29Z" fill="#ffffff" fillOpacity="0.24" />
        <path d="M34 46.5L64 29L49 47L34 46.5Z" fill="#ffffff" fillOpacity="0.52" />
        <path d="M34 46.5L49 47V76L34 81.5V46.5Z" fill="#ffffff" fillOpacity="0.16" />
        <path d="M94 46.5V81.5L79 76V47L94 46.5Z" fill="#000000" fillOpacity="0.28" />
        <path d="M34 81.5L49 76L64 87V99L34 81.5Z" fill="#000000" fillOpacity="0.2" />
        <path d="M64 99V87L79 76L94 81.5L64 99Z" fill={tier.gemBright} fillOpacity="0.55" />
        <path d="M64 41L79 50V78L64 87L49 78V50L64 41Z" fill={`url(#table-${uid})`} stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1" />
        <path d="M49 50L64 41L79 50L56 76L49 72V50Z" fill="#ffffff" fillOpacity="0.28" />
      </g>
      <circle cx="64" cy="27" r="3" fill={tier.metalLight} stroke="#090412" strokeWidth="1.2" />
      <circle cx="96" cy="45.5" r="2.8" fill={tier.metalMid} stroke="#090412" strokeWidth="1.2" />
      <circle cx="96" cy="82.5" r="2.8" fill={tier.metalDark} stroke="#090412" strokeWidth="1.2" />
      <circle cx="64" cy="101" r="3" fill={tier.metalDark} stroke="#090412" strokeWidth="1.2" />
      <circle cx="32" cy="82.5" r="2.8" fill={tier.metalMid} stroke="#090412" strokeWidth="1.2" />
      <circle cx="32" cy="45.5" r="2.8" fill={tier.metalLight} stroke="#090412" strokeWidth="1.2" />
      <path className="sv-glint" d="M48 42L50.5 48.5L57 51L50.5 53.5L48 60L45.5 53.5L39 51L45.5 48.5L48 42Z" fill="#ffffff" fillOpacity="0.95" />
    </>
  );

  return (
    <svg width={size} height={size} viewBox="-6 -6 140 140" fill="none" aria-label={tier.name}>
      <defs>
        <linearGradient id={`tl-${uid}`} x1="16" y1="8" x2="64" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor={tier.metalLight} />
          <stop offset="100%" stopColor={tier.metalMid} />
        </linearGradient>
        <linearGradient id={`tr-${uid}`} x1="64" y1="8" x2="112" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalLight} />
          <stop offset="100%" stopColor={tier.metalMid} />
        </linearGradient>
        <linearGradient id={`l-${uid}`} x1="16" y1="36" x2="36" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalLight} />
          <stop offset="100%" stopColor={tier.metalDark} />
        </linearGradient>
        <linearGradient id={`r-${uid}`} x1="92" y1="36" x2="112" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalMid} />
          <stop offset="100%" stopColor={tier.metalDark} />
        </linearGradient>
        <linearGradient id={`bl-${uid}`} x1="16" y1="84" x2="64" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalMid} />
          <stop offset="100%" stopColor={tier.metalDark} />
        </linearGradient>
        <linearGradient id={`br-${uid}`} x1="64" y1="92" x2="112" y2="116" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalDark} />
          <stop offset="100%" stopColor="#1b0e08" />
        </linearGradient>
        <radialGradient id={`core-${uid}`} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="26%" stopColor={tier.gemBright} />
          <stop offset="72%" stopColor={tier.gemDeep} />
          <stop offset="100%" stopColor="#090412" />
        </radialGradient>
        <linearGradient id={`table-${uid}`} x1="42" y1="36" x2="86" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.72" />
          <stop offset="45%" stopColor={tier.gemBright} stopOpacity="0.86" />
          <stop offset="100%" stopColor={tier.gemDeep} stopOpacity="0.96" />
        </linearGradient>
      </defs>

      {tier.spikes && (
        <g className="sv-spikes">
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <g key={deg} transform={`rotate(${deg} 64 64)`}>
              {tier.level === 5 ? (
                <>
                  <path d="M41 24L64 -4L87 24Z" fill={`url(#r-${uid})`} stroke="#090412" strokeWidth="3.2" strokeLinejoin="round" />
                  <path d="M41 24L64 -4V24Z" fill={`url(#tl-${uid})`} />
                  <path d="M64 -4L87 24H64V-4Z" fill={`url(#br-${uid})`} fillOpacity="0.65" />
                  <path d="M42.5 23L64 -3V23" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="1.2" strokeLinejoin="round" />
                  <path d="M46 24H82L78 17H50Z" fill="#090412" fillOpacity="0.35" />
                </>
              ) : (
                <>
                  <path d="M55 16L64 -2L73 16Z" fill={`url(#r-${uid})`} stroke="#090412" strokeWidth="3" strokeLinejoin="round" />
                  <path d="M55 16L64 -2V16Z" fill={`url(#tl-${uid})`} />
                  <path d="M64 -2L73 16H64V-2Z" fill={`url(#br-${uid})`} fillOpacity="0.65" />
                  <path d="M56 15L64 -1V15" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M56 16H72L70 11H58Z" fill="#090412" fillOpacity="0.35" />
                </>
              )}
            </g>
          ))}
        </g>
      )}

      {tier.spikes ? (
        <g transform="translate(64 64) scale(0.86) translate(-64 -64)">{core}</g>
      ) : (
        core
      )}

      <SubLevelPips subLevel={subLevel} bright={tier.gemBright} y={114} />
    </svg>
  );
}

interface KingdomTier {
  name: string;
  subtitle: string;
  level: number;
  roman: string;
  metalLight: string;
  metalMid: string;
  metalDark: string;
  gemBright: string;
  gemDeep: string;
  glow: string;
}

const KINGDOM_TIERS: KingdomTier[] = [
  {
    name: "Initiate",
    subtitle: "Ember Vial",
    level: 1,
    roman: "I",
    metalLight: "#f6b27a",
    metalMid: "#c7723b",
    metalDark: "#6e3414",
    gemBright: "#ff9e44",
    gemDeep: "#8a2b06",
    glow: "rgba(255, 158, 68, 0.45)",
  },
  {
    name: "Alchemist",
    subtitle: "Frost Mana",
    level: 2,
    roman: "II",
    metalLight: "#e2e8f0",
    metalMid: "#94a3b8",
    metalDark: "#334155",
    gemBright: "#38bdf8",
    gemDeep: "#0369a1",
    glow: "rgba(56, 189, 248, 0.45)",
  },
  {
    name: "Archmage",
    subtitle: "Solar Brew",
    level: 3,
    roman: "III",
    metalLight: "#fef08a",
    metalMid: "#eab308",
    metalDark: "#713f12",
    gemBright: "#fde047",
    gemDeep: "#b45309",
    glow: "rgba(250, 204, 21, 0.5)",
  },
  {
    name: "Royal Brew",
    subtitle: "Venom Elixir",
    level: 4,
    roman: "IV",
    metalLight: "#bbf7d0",
    metalMid: "#22c55e",
    metalDark: "#14532d",
    gemBright: "#39ff14",
    gemDeep: "#15803d",
    glow: "rgba(57, 255, 20, 0.55)",
  },
  {
    name: "Sovereign",
    subtitle: "Arcane Crown",
    level: 5,
    roman: "V",
    metalLight: "#f3e8ff",
    metalMid: "#a855f7",
    metalDark: "#3b0764",
    gemBright: "#e879f9",
    gemDeep: "#6b21a8",
    glow: "rgba(232, 121, 249, 0.55)",
  },
];

function KingdomElixirSvg({
  tier,
  size,
  subLevel = 1,
}: {
  tier: KingdomTier;
  size: number;
  subLevel?: number;
}) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="-6 -6 140 140" fill="none" aria-label={tier.name}>
      <defs>
        <linearGradient id={`ke-tl-${uid}`} x1="16" y1="8" x2="72" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor={tier.metalLight} />
          <stop offset="100%" stopColor={tier.metalMid} />
        </linearGradient>
        <linearGradient id={`ke-r-${uid}`} x1="82" y1="24" x2="114" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalMid} />
          <stop offset="100%" stopColor={tier.metalDark} />
        </linearGradient>
        <linearGradient id={`ke-br-${uid}`} x1="64" y1="88" x2="112" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalDark} />
          <stop offset="100%" stopColor="#12081c" />
        </linearGradient>
        <radialGradient id={`ke-core-${uid}`} cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="28%" stopColor={tier.gemBright} />
          <stop offset="75%" stopColor={tier.gemDeep} />
          <stop offset="100%" stopColor="#090412" />
        </radialGradient>
      </defs>

      {/* Tier 4 & 5: Radiating 3D beveled spikes (skip 0deg on Sovereign where the crown sits) */}
      {tier.level >= 4 && (
        <g className="sv-spikes">
          {(tier.level === 5 ? [60, 120, 180, 240, 300] : [45, 135, 225, 315]).map((deg) => (
            <g key={deg} transform={`rotate(${deg} 64 64)`}>
              <path d="M50 22L64 0L78 22Z" fill={`url(#ke-r-${uid})`} stroke="#090412" strokeWidth="3" strokeLinejoin="round" />
              <path d="M50 22L64 0V22Z" fill={`url(#ke-tl-${uid})`} />
              <path d="M51.5 21L64 1V21" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.1" />
            </g>
          ))}
        </g>
      )}

      {/* Tier 2-4: Twin side fins; Tier 5 (Sovereign): Layered 3D royal wings */}
      {tier.level >= 2 && tier.level < 5 && (
        <g className="sv-wings">
          <path d="M26 48L8 40L15 62L8 74L26 78Z" fill={`url(#ke-tl-${uid})`} stroke="#090412" strokeWidth="3" strokeLinejoin="round" />
          <path d="M102 48L120 40L113 62L120 74L102 78Z" fill={`url(#ke-r-${uid})`} stroke="#090412" strokeWidth="3" strokeLinejoin="round" />
        </g>
      )}
      {tier.level === 5 && (
        <g className="sv-wings">
          {/* Left layered royal wing */}
          <path d="M28 44L3 32L14 54L4 64L18 72L9 84L30 82Z" fill={`url(#ke-tl-${uid})`} stroke="#090412" strokeWidth="3" strokeLinejoin="round" />
          <path d="M26 52L11 49L17 61L11 71L27 72Z" fill={`url(#ke-r-${uid})`} fillOpacity="0.45" />
          {/* Right layered royal wing */}
          <path d="M100 44L125 32L114 54L124 64L110 72L119 84L98 82Z" fill={`url(#ke-r-${uid})`} stroke="#090412" strokeWidth="3" strokeLinejoin="round" />
          <path d="M102 52L117 49L111 61L117 71L101 72Z" fill={`url(#ke-br-${uid})`} fillOpacity="0.45" />
        </g>
      )}

      {/* Tier 3: Top arch; Tier 5 (Sovereign): Detailed 3D faceted crown with pearls & 3 jewels */}
      {tier.level === 3 && (
        <g className="sv-crown">
          <path
            d="M46 24L52 10L64 4L76 10L82 24Z"
            fill={`url(#ke-tl-${uid})`}
            stroke="#090412"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <circle cx="64" cy="15" r="3" fill={tier.gemBright} stroke="#090412" strokeWidth="1" />
        </g>
      )}
      {tier.level === 5 && (
        <g className="sv-crown">
          <path
            d="M41 26L45 7L57 16L64 1L71 16L83 7L87 26Z"
            fill={`url(#ke-tl-${uid})`}
            stroke="#090412"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Right-half shading on crown */}
          <path d="M64 1L71 16L83 7L87 26H64V1Z" fill={`url(#ke-r-${uid})`} fillOpacity="0.6" />
          {/* Beveled crown band */}
          <rect x="41" y="20" width="46" height="7" rx="2.5" fill={`url(#ke-br-${uid})`} stroke="#090412" strokeWidth="2" />
          {/* Crown tip pearls */}
          <circle cx="45" cy="6" r="2.8" fill={tier.metalLight} stroke="#090412" strokeWidth="2" />
          <circle cx="64" cy="2" r="3.2" fill="#ffffff" stroke="#090412" strokeWidth="2.2" />
          <circle cx="83" cy="6" r="2.8" fill={tier.metalMid} stroke="#090412" strokeWidth="2" />
          {/* 3 inlaid crown jewels */}
          <circle cx="52" cy="23.5" r="2.2" fill={tier.gemBright} stroke="#090412" strokeWidth="1.2" />
          <circle cx="64" cy="14" r="3.2" fill={tier.gemBright} stroke="#090412" strokeWidth="1.4" />
          <circle cx="76" cy="23.5" r="2.2" fill={tier.gemBright} stroke="#090412" strokeWidth="1.2" />
        </g>
      )}

      {/* Unified 3D Octagonal Elixir Medallion (always centered at 64, 64) */}
      <g transform={`translate(64 64) scale(${tier.level >= 3 ? 0.84 : 0.92}) translate(-64 -64)`}>
        <g className="sv-bezel">
          <path d="M44 12H84L112 40V88L84 116H44L16 88V40L44 12Z" fill="#090412" stroke="#090412" strokeWidth="5" strokeLinejoin="round" />
          <path d="M44 12H84L76 28H52L44 12Z" fill={`url(#ke-tl-${uid})`} />
          <path d="M16 40L44 12L52 28L32 48L16 40Z" fill={`url(#ke-tl-${uid})`} />
          <path d="M84 12L112 40L96 48L76 28L84 12Z" fill={`url(#ke-tl-${uid})`} />
          <path d="M16 40L32 48V80L16 88V40Z" fill={`url(#ke-tl-${uid})`} />
          <path d="M112 40V88L96 80V48L112 40Z" fill={`url(#ke-r-${uid})`} />
          <path d="M16 88L32 80L52 100L44 116L16 88Z" fill={`url(#ke-r-${uid})`} />
          <path d="M84 116L76 100L96 80L112 88L84 116Z" fill={`url(#ke-br-${uid})`} />
          <path d="M52 100H76L84 116H44L52 100Z" fill={`url(#ke-br-${uid})`} />

          {/* Recessed dark well */}
          <path d="M50 26H78L98 46V82L78 102H50L30 82V46L50 26Z" fill="#0e0619" stroke="#05020a" strokeWidth="2" />
        </g>

        {/* Faceted Elixir Drop / Diamond Core */}
        <g className="sv-gem">
          <path d="M64 34C64 34 86 58 86 74C86 86 76 95 64 95C52 95 42 86 42 74C42 58 64 34 64 34Z" fill={`url(#ke-core-${uid})`} stroke="#ffffff" strokeOpacity="0.45" strokeWidth="1.4" />
          <path d="M64 34C64 34 86 58 86 74C86 86 76 95 64 95V34Z" fill="#000000" fillOpacity="0.2" />
          <path d="M51 64C49 71 51 80 57 85" stroke="#ffffff" strokeWidth="2.8" strokeLinecap="round" strokeOpacity="0.85" />
        </g>
        <path className="sv-glint" d="M56 50L58 54L62 56L58 58L56 62L54 58L50 56L54 54L56 50Z" fill="#ffffff" fillOpacity="0.95" />
      </g>

      <SubLevelPips subLevel={subLevel} bright={tier.gemBright} y={113} />
    </svg>
  );
}

const LAYER_IDEAS = [
  {
    id: 1,
    name: "01 · Forge & Lock",
    tag: "Entrance Sequence",
    note: "Bezel pops in → spikes rotate-lock & wings spread → crown drops in → gem core ignites → glint flashes.",
  },
  {
    id: 2,
    name: "02 · Living Gem & Glint",
    tag: "Subtle Idle",
    note: "Metal frame stays solid while the inner gem breathes, the star glint twinkles, and rank pips ripple.",
  },
  {
    id: 3,
    name: "03 · Hover Flourish",
    tag: "Interactive Hover",
    note: "Hover either badge: spikes flare outward, wings spread, crown lifts with a bounce, and the glint rotates.",
  },
  {
    id: 4,
    name: "04 · Sequential Rank-Up Pips",
    tag: "Sub-Level Gain",
    note: "Built for leveling 1 → 5: the bottom rank bar pops and each pip ignites one by one in sequence.",
  },
  {
    id: 5,
    name: "05 · Prism Shimmer & Sway",
    tag: "Ambient Luxury",
    note: "Gentle breathing across the outer spikes, side wings, and gem core—calm enough for profile/header cards.",
  },
];

export default function VipBadgeSvgGallery() {
  const [previewSize, setPreviewSize] = useState<number>(88);
  const [subLevel, setSubLevel] = useState<number>(3);
  const [replayKey, setReplayKey] = useState<number>(0);

  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
              ← Back to casino
            </Link>
            <p className="ui-eyebrow mt-6">Elixir design lab · selected vip badges</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              VIP Badge Sets + Sub-Levels (1–5)
            </h1>
            <p className="ui-body mt-2 max-w-2xl">
              Both sets use 1–5 glowing rank pips in a recessed bottom crest bar to distinguish sub-levels (e.g. Bronze 1–5 or Initiate 1–5).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-xl border border-white/10 bg-dicey-dark p-1">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSubLevel(lvl)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    subLevel === lvl ? "bg-[#39ff14] text-[#071a04]" : "text-gray-400 hover:text-white"
                  )}
                >
                  Lvl {lvl}
                </button>
              ))}
            </div>

            <div className="inline-flex rounded-xl border border-white/10 bg-dicey-dark p-1">
              {[
                [24, "Table (24px)"],
                [44, "Card (44px)"],
                [64, "Medium (64px)"],
                [88, "Modal (88px)"],
                [120, "Large (120px)"],
              ].map(([sz, label]) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setPreviewSize(Number(sz))}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    previewSize === sz ? "bg-white text-black" : "text-gray-400 hover:text-white"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-3xl border border-white/10 bg-[#0d0718]/70 p-6">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-lg font-bold text-white">01 · 3D Gem Crest (Combined 01 + 03)</h2>
            <p className="ui-caption">Showing Level {subLevel} across all 5 tiers</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col items-center justify-between rounded-2xl border border-white/5 bg-dicey-card px-4 py-6"
              >
                <div
                  className="flex min-h-[128px] items-center justify-center"
                  style={{ filter: `drop-shadow(0 6px 18px ${tier.glow})` }}
                >
                  <CombinedGemCrestSvg tier={tier} size={previewSize} subLevel={subLevel} />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-bold text-white">
                    {tier.name} {subLevel}
                  </p>
                  <p className="text-[11px] text-purple-300/65">
                    Tier {tier.roman} · {tier.spikes ? "Spiked" : "Base"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 1-5 Progression Strip for Bronze */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-dicey-dark/70 px-5 py-4">
            <span className="text-xs font-semibold text-purple-200">Bronze 1–5 progression:</span>
            <div className="flex flex-wrap items-center gap-5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div key={lvl} className="flex flex-col items-center gap-1">
                  <CombinedGemCrestSvg tier={TIERS[0]} size={48} subLevel={lvl} />
                  <span className="text-[11px] font-medium text-purple-200/80">Bronze {lvl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* In-context table row preview */}
          <div className="mt-4 flex flex-wrap items-center gap-5 rounded-xl border border-white/5 bg-dicey-dark/70 px-4 py-3 text-xs">
            <span className="text-purple-300/60">In-table preview (20px):</span>
            {TIERS.map((tier, i) => (
              <span key={tier.name} className="inline-flex items-center gap-1.5 font-semibold text-white">
                <CombinedGemCrestSvg tier={tier} size={20} subLevel={subLevel} />
                <span>{["You (JD)", "Tsmith96", "TheGoobr", "KryptonX", "Whale84"][i]}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Second set: Royal Elixir Medallions (remade from scratch) */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#0d0718]/70 p-6">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-white">02 · Royal Elixir Ranks</h2>
              <p className="ui-caption mt-0.5">
                Cohesive 3D octagonal medallions with an Elixir drop core, evolving across Kingdom/Elixir rank names (Initiate → Alchemist → Archmage → Royal Brew → Sovereign).
              </p>
            </div>
            <p className="ui-caption">Showing Level {subLevel} across all 5 tiers</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {KINGDOM_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="flex flex-col items-center justify-between rounded-2xl border border-white/5 bg-dicey-card px-4 py-6"
              >
                <div
                  className="flex min-h-[128px] items-center justify-center"
                  style={{ filter: `drop-shadow(0 6px 18px ${tier.glow})` }}
                >
                  <KingdomElixirSvg tier={tier} size={previewSize} subLevel={subLevel} />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-bold text-white">
                    {tier.name} {subLevel}
                  </p>
                  <p className="text-[11px] text-purple-300/65">
                    {tier.roman} · {tier.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 1-5 Progression Strip for Royal Brew */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-dicey-dark/70 px-5 py-4">
            <span className="text-xs font-semibold text-purple-200">Initiate 1–5 progression:</span>
            <div className="flex flex-wrap items-center gap-5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div key={lvl} className="flex flex-col items-center gap-1">
                  <KingdomElixirSvg tier={KINGDOM_TIERS[0]} size={48} subLevel={lvl} />
                  <span className="text-[11px] font-medium text-purple-200/80">Initiate {lvl}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-5 rounded-xl border border-white/5 bg-dicey-dark/70 px-4 py-3 text-xs">
            <span className="text-purple-300/60">In-table preview (20px):</span>
            {KINGDOM_TIERS.map((tier, i) => (
              <span key={tier.name} className="inline-flex items-center gap-1.5 font-semibold text-white">
                <KingdomElixirSvg tier={tier} size={20} subLevel={subLevel} />
                <span>{["You (JD)", "Tsmith96", "TheGoobr", "KryptonX", "Whale84"][i]}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Layer-Level Animation Examples for Both Sets */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-[#0d0718]/70 p-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="ui-eyebrow">Layer-by-layer svg motion</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white">
                5 Layer Animation Ideas (Both Sets)
              </h2>
              <p className="ui-caption mt-1">
                Each example targets individual SVG layers (.sv-bezel, .sv-spikes, .sv-wings, .sv-crown, .sv-gem, .sv-glint, .sv-pip).
              </p>
            </div>
            <button
              type="button"
              onClick={() => setReplayKey((k) => k + 1)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#39ff14]/60 hover:bg-[#39ff14]/10"
            >
              <ArrowClockwise className="size-4" />
              Replay Entrances
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {LAYER_IDEAS.map((idea) => (
              <article
                key={`${idea.id}-${replayKey}`}
                className="flex flex-col justify-between rounded-2xl border border-white/10 bg-dicey-card p-5"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{idea.name}</h3>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-purple-200">
                      {idea.tag}
                    </span>
                  </div>
                  <p className="ui-caption mt-1">{idea.note}</p>
                </div>

                <div
                  className={cn(
                    "sv-anim-stage mt-5 grid grid-cols-2 gap-3 rounded-xl bg-dicey-dark p-4",
                    `sv-idea-${idea.id}`,
                    idea.id === 3 && "cursor-pointer"
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div style={{ filter: `drop-shadow(0 6px 14px ${TIERS[4].glow})` }}>
                      <CombinedGemCrestSvg tier={TIERS[4]} size={88} subLevel={subLevel} />
                    </div>
                    <span className="text-[11px] font-medium text-purple-200/80">Set 01 · Diamond</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div style={{ filter: `drop-shadow(0 6px 14px ${KINGDOM_TIERS[4].glow})` }}>
                      <KingdomElixirSvg tier={KINGDOM_TIERS[4]} size={88} subLevel={subLevel} />
                    </div>
                    <span className="text-[11px] font-medium text-purple-200/80">Set 02 · Sovereign</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
