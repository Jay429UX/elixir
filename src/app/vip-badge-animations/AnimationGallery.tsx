"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import {
  BiCrosshair,
  BiLinkExternal,
  BiPause,
  BiPlay,
  BiPointer,
  BiRefresh,
} from "react-icons/bi";
import { cn } from "@/lib/utils";
import {
  VIP_TIERS,
  type HexSpec,
  type HexTierPalette,
  ProgressiveHexBadgeSvg,
  resolveProgressiveHexSpec,
} from "@/components/ui/ProgressiveHexBadge";

type StudyId =
  | "prism-orbit"
  | "articulated-plume"
  | "living-alchemy"
  | "royal-heartbeat"
  | "clockwork-forge"
  | "tactile-rig";

type SpeedSetting = 1 | 2 | 4; // multiplier on duration (1 = 1x, 2 = 0.5x, 4 = 0.25x)
type BackdropMode = "dark" | "modal" | "card";
type PipSetting = 0 | 1 | 2 | 3 | 4 | 5;

interface LayerPart {
  part: string;
  selector: string;
  role: "Lead" | "Support" | "Light" | "Accent";
  motion: string;
}

interface MotionStudy {
  id: StudyId;
  num: string;
  name: string;
  bestFor: string;
  smallScaleNote: string;
  summary: string;
  cycleLabel: string;
  interactive?: boolean;
  parts: LayerPart[];
}

const ROMAN = ["I", "II", "III", "IV", "V"] as const;
const SCALE_LADDER = [56, 36, 28, 24, 20, 18] as const;

const MOTION_STUDIES: MotionStudy[] = [
  {
    id: "prism-orbit",
    num: "01",
    name: "Prism Orbit",
    bestFor: "18–24px Chat & Live Bets",
    smallScaleNote: "Zero silhouette wobble — pure internal refraction & edge-beam sweep.",
    summary:
      "Keeps the outer icon silhouette locked still for dense chat rows while light orbits clockwise across the 6 chamfered hex bevels, 6 crystal facets, specular gem ridge, and upper wing blades.",
    cycleLabel: "3.2s loop",
    parts: [
      { part: "Hex Bevel Beam", selector: ".kb-bevel-trace", role: "Lead", motion: "Clockwise stroke-dashoffset perimeter sweep" },
      { part: "Crystal Facets (×6)", selector: ".kb-facet-0..5", role: "Light", motion: "0.24s staggered clockwise refraction wave" },
      { part: "Specular Gem Ridge", selector: ".kb-gem-rim", role: "Light", motion: "Vector line-draw glint along top-left ridge" },
      { part: "Wing Upper Bevels", selector: ".kb-blade-upper", role: "Support", motion: "Top-to-bottom metallic gleam cascade" },
      { part: "Crown Gem + Sparks", selector: ".kb-crown-gem / .kb-spark", role: "Accent", motion: "Apex pinpoint diamond flash + flask bubbles" },
    ],
  },
  {
    id: "articulated-plume",
    num: "02",
    name: "Articulated Plume",
    bestFor: "24–40px Header & Profile",
    smallScaleNote: "Hinged outer blade fan & top apex flare stay crisp down to 20px.",
    summary:
      "True mechanical articulation: each individual wing blade pivots around its own inner hex hinge with shrinking organic delays (0→55→100→135ms), cheek plates recoil outward, sunburst rays fan symmetrically, and Bronze/Silver flask corks pop with pressure.",
    cycleLabel: "3.6s loop (rest beat)",
    parts: [
      { part: "Wing Blades (×2–4)", selector: ".kb-blade-0..3", role: "Lead", motion: "Hinged feather fan (+13° down to +6°), shrinking stagger" },
      { part: "Crown / Sunburst Rays", selector: ".kb-crown / .kb-ray-*", role: "Support", motion: "Crown lifts 2.4px; rays fan ±11° from base roots" },
      { part: "Cheek Armor Plates", selector: ".kb-cheek-l / .kb-cheek-r", role: "Support", motion: "Bilateral outward recoil (±1.35px) on expansion" },
      { part: "Flask Cork (Tiers 1–2)", selector: ".kb-cork", role: "Lead", motion: "Pressure pop (-3px, -13°) synced with rising bubbles" },
      { part: "Level Diamond Pips", selector: ".kb-pip-0..4", role: "Accent", motion: "Left-to-right rune ripple as wings lock back in" },
    ],
  },
  {
    id: "living-alchemy",
    num: "03",
    name: "Living Alchemy",
    bestFor: "28–64px VIP Cards",
    smallScaleNote: "Phase-offset buoyancy gives sculptural depth without harsh pops.",
    summary:
      "Applies classic overlapping action and follow-through: the heavy hex armor floats slowest, the recessed core lags +220ms, the crown hovers lightest at +380ms, and wing blades feather with aerodynamic counter-drag as the crest rises and falls.",
    cycleLabel: "3.2s harmonic",
    parts: [
      { part: "Hex Armor Frame", selector: ".kb-frame", role: "Lead", motion: "Heavy base buoyancy (±1.2px vertical float)" },
      { part: "Recessed Gem / Flask", selector: ".kb-core", role: "Support", motion: "+220ms phase-lag float (±1.7px) with subtle breathe" },
      { part: "Crown / Rays", selector: ".kb-crown / .kb-rays", role: "Support", motion: "+380ms lightest hover (±2.1px) with ±2.2° sway" },
      { part: "Aerodynamic Blades", selector: ".kb-blade-0..3", role: "Accent", motion: "Counter-drag pitch (+6.5° ↔ -5.5°) lagging blade-by-blade" },
      { part: "Elixir + Cork + Pips", selector: ".kb-liquid / .kb-cork / .kb-pips", role: "Accent", motion: "±6° slosh, gentle cork bob & +440ms trailing pips" },
    ],
  },
  {
    id: "royal-heartbeat",
    num: "04",
    name: "Royal Heartbeat",
    bestFor: "24px Header Pill & Alerts",
    smallScaleNote: "Center-outward contrast pulse reads instantly at tiny scale, then rests.",
    summary:
      "Energy gathers inside the center gem (brief anticipation inhale), then fires a double-beat kinetic shockwave outward: full-perimeter hex flash → cheek plates & V-prow kick → wing blade ripple → crown jewel + sparkles → charged level pips.",
    cycleLabel: "3.8s loop (50% rest)",
    parts: [
      { part: "Core Gem / Flask", selector: ".kb-core", role: "Lead", motion: "Inhale (0.92×) then double-beat ignition (1.09×)" },
      { part: "Perimeter Ring Flash", selector: ".kb-bevel-trace", role: "Light", motion: "Crisp full-hex luminous stroke flare on beat 1" },
      { part: "Cheeks & Bottom Prow", selector: ".kb-cheek / .kb-prow", role: "Support", motion: "Outward radial kick (±1.6px) + elastic seat" },
      { part: "Blades + Crown Sparks", selector: ".kb-blade-* / .kb-spark-*", role: "Accent", motion: "Fast 40ms blade ripple + twin pinpoint star glints" },
      { part: "Rune Pips", selector: ".kb-pip-0..4", role: "Accent", motion: "Sequential 50ms energy charge wave (1.45×)" },
    ],
  },
  {
    id: "clockwork-forge",
    num: "05",
    name: "Clockwork Forge",
    bestFor: "64–128px Rank-Up Modals",
    smallScaleNote: "Zero scale(0) pops — every piece locks along its mechanical axis.",
    summary:
      "Choreographed multi-stage relic assembly following strict Lead → Support → Accent handoffs: hex frame seats, cheek armor clamps inward, V-prow snaps up, gem fills while its specular ridge draws, wings unfold top-to-bottom, crown drops, pips stamp in, and a final sheen seals the crest.",
    cycleLabel: "3.8s assembly + hold",
    parts: [
      { part: "Hex Frame Base", selector: ".kb-frame", role: "Lead", motion: "0ms seat (0.84× → 1.03× → 1×)" },
      { part: "Cheeks & V-Prow", selector: ".kb-cheek / .kb-prow", role: "Support", motion: "Inward clamp (±5px → 0) & prow upward lock" },
      { part: "Core + Edge Draw", selector: ".kb-core / .kb-gem-rim", role: "Support", motion: "Core seats while specular highlight draws (1 → 0)" },
      { part: "Folding Wing Blades", selector: ".kb-blade-0..3", role: "Support", motion: "Unfold from -24° tucked hinges in shrinking stagger" },
      { part: "Crown, Pips & Sheen", selector: ".kb-crown / .kb-pip-* / .kb-glint", role: "Accent", motion: "Crown drops, pips stamp, final bevel beam + glint" },
    ],
  },
  {
    id: "tactile-rig",
    num: "06",
    name: "Tactile Micro-Rig",
    bestFor: "High-Frequency Interactive UI",
    smallScaleNote: "100% calm at rest — pointer hover fans blades, click compresses springs.",
    summary:
      "Zero idle motion noise. Hovering (mouse) or tapping the trigger mechanically wakes every sub-part with staggered spring transitions: blades fan open, cheeks widen, crown lifts, bevel beam sweeps, and pressing compresses the entire crest in 120ms.",
    cycleLabel: "Pointer-driven CSS",
    interactive: true,
    parts: [
      { part: "Staggered Wing Fan", selector: ".kb-blade-0..3", role: "Lead", motion: "Hover opens +12°..+4.5° (0–75ms stagger); press tucks -5°" },
      { part: "Crown / Rays / Cork", selector: ".kb-crown / .kb-ray-* / .kb-cork", role: "Support", motion: "Apex lifts -2.4px / rays fan ±10° / cork tilts -12°" },
      { part: "Cheeks & Gem Table", selector: ".kb-cheek / .kb-gem-table", role: "Support", motion: "Cheeks open ±1.3px; gem table blooms 1.08×" },
      { part: "Bevel Beam Sweep", selector: ".kb-bevel-trace", role: "Light", motion: "Single 480ms ease-out perimeter chase on enter" },
      { part: "Tactile Press", selector: ":active", role: "Accent", motion: "120ms compression across blades, crown & core" },
    ],
  },
];

function backdropClass(mode: BackdropMode): string {
  if (mode === "modal") return "lu-gradient";
  if (mode === "card") return "bg-dicey-card-elevated";
  return "bg-dicey-darker";
}

function roleBadgeClass(role: LayerPart["role"]): string {
  switch (role) {
    case "Lead":
      return "border-[#39ff14]/40 bg-[#39ff14]/15 text-[#9bff8a]";
    case "Support":
      return "border-purple-300/35 bg-purple-400/15 text-purple-200";
    case "Light":
      return "border-cyan-300/35 bg-cyan-400/15 text-cyan-200";
    case "Accent":
      return "border-amber-300/35 bg-amber-400/15 text-amber-200";
  }
}

export default function AnimationGallery() {
  const [tiers, setTiers] = useState<HexTierPalette[]>(() => VIP_TIERS.map((t) => ({ ...t })));
  const [specs, setSpecs] = useState<HexSpec[]>(() =>
    VIP_TIERS.map((t) => ({ ...resolveProgressiveHexSpec(t.level) }))
  );
  const [activeStudyId, setActiveStudyId] = useState<StudyId>("prism-orbit");
  const [activeTierIdx, setActiveTierIdx] = useState<number>(4); // Default Sapphire
  const [speed, setSpeed] = useState<SpeedSetting>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [pips, setPips] = useState<PipSetting>(3);
  const [backdrop, setBackdrop] = useState<BackdropMode>("dark");
  const [showXray, setShowXray] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);
  const [tactileEngaged, setTactileEngaged] = useState<boolean>(false);

  // Sync live user-saved badge config from /api/vip-badges
  useEffect(() => {
    let active = true;
    fetch("/api/vip-badges")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data?.tiers || !data?.specs) return;
        const nextTiers = (data.tiers as HexTierPalette[]).map((t) => ({ ...t }));
        const nextSpecs = nextTiers.map((t) => ({
          ...(data.specs[String(t.level)] as HexSpec),
        }));
        setTiers(nextTiers);
        setSpecs(nextSpecs);
      })
      .catch(() => {
        /* fallback to bundled config */
      });
    return () => {
      active = false;
    };
  }, []);

  const activeStudy = MOTION_STUDIES.find((s) => s.id === activeStudyId) ?? MOTION_STUDIES[0];
  const activeTier = tiers[activeTierIdx] ?? tiers[0];
  const activeSpec = specs[activeTierIdx] ?? specs[0];
  const resolvedLevel = pips === 0 ? undefined : (pips as 1 | 2 | 3 | 4 | 5);
  const stageStyle = { "--vbm-speed": speed } as CSSProperties;

  return (
    <main
      className={cn(
        "vbm-stage min-h-dvh bg-dicey-darker px-4 py-8 text-white sm:px-8 sm:py-10",
        isPaused && "vbm-paused"
      )}
      style={stageStyle}
    >
      <div className="mx-auto max-w-6xl space-y-7">
        {/* Page Header */}
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="min-w-0">
            <p className="ui-eyebrow uppercase tracking-[0.08em]">
              VIP BADGE MOTION LAB · INDEPENDENT SVG CHOREOGRAPHY
            </p>
            <h1 className="hero-headline mt-1 text-3xl leading-tight text-white sm:text-4xl">
              Multi-Layer SVG Badge Animations
            </h1>
            <p className="ui-body mt-2 max-w-2xl">
              Six independent-part motion studies rigged onto your live 5-tier badges — hinged wing blades,
              clockwise crystal facets, vector bevel-beam traces, flask cork pops, and level-pip waves — tuned
              to stay legible from <span className="font-semibold text-white">18px</span> chat badges up to{" "}
              <span className="font-semibold text-white">128px</span> rank-up modals.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/alchemist-badges"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#39ff14]/40 bg-[#39ff14]/15 px-3.5 py-2 text-xs font-bold text-[#9bff8a] transition-colors hover:border-[#39ff14]/70 hover:bg-[#39ff14]/25"
            >
              Alchemist Relics <BiLinkExternal className="size-3.5" />
            </Link>
            <Link
              href="/vip-badge-editor"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-[#d8b4fe] transition-colors hover:border-white/25 hover:text-white"
            >
              Badge Editor <BiLinkExternal className="size-3.5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-dicey-card-elevated"
            >
              Back to Casino <BiLinkExternal className="size-3.5" />
            </Link>
          </div>
        </header>

        {/* Global Workbench Controls */}
        <section
          aria-label="Animation workbench controls"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-dicey-card p-3.5 sm:p-4"
        >
          {/* Speed + Play/Pause + Replay */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#b7a9ca]">Speed:</span>
            <div className="inline-flex rounded-xl bg-dicey-dark p-1">
              {(
                [
                  [1, "1× Live"],
                  [2, "0.5×"],
                  [4, "0.25× Slow-Mo"],
                ] as const
              ).map(([mult, label]) => (
                <button
                  key={mult}
                  type="button"
                  onClick={() => setSpeed(mult)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                    speed === mult ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className={cn(
                "inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                isPaused
                  ? "border-amber-300/50 bg-amber-400/15 text-amber-200"
                  : "border-white/10 bg-dicey-dark text-gray-200 hover:border-white/25 hover:text-white"
              )}
            >
              {isPaused ? <BiPlay className="size-4" /> : <BiPause className="size-4" />}
              {isPaused ? "Resume" : "Pause"}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsPaused(false);
                setReplayKey((k) => k + 1);
              }}
              className="inline-flex items-center gap-1 rounded-xl border border-[#39ff14]/45 bg-[#39ff14]/15 px-3 py-1.5 text-xs font-bold text-[#39ff14] transition-colors hover:bg-[#39ff14] hover:text-[#071a04]"
            >
              <BiRefresh className="size-4" /> Replay
            </button>
          </div>

          {/* Pips + Surface + Pivot X-Ray */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[#b7a9ca]">Pips:</span>
              <div className="inline-flex rounded-xl bg-dicey-dark p-1">
                {([0, 1, 2, 3, 4, 5] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setPips(lvl)}
                    className={cn(
                      "rounded-lg px-2 py-1 text-xs font-semibold transition-colors",
                      pips === lvl ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    {lvl === 0 ? "Off" : ROMAN[lvl - 1]}
                  </button>
                ))}
              </div>
            </div>

            <div className="inline-flex rounded-xl bg-dicey-dark p-1">
              {(
                [
                  ["dark", "Dark"],
                  ["modal", "Modal"],
                  ["card", "Card"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setBackdrop(id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                    backdrop === id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowXray((x) => !x)}
              className={cn(
                "inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                showXray
                  ? "border-[#39ff14]/55 bg-[#39ff14]/15 text-[#39ff14]"
                  : "border-white/10 bg-dicey-dark text-gray-300 hover:border-white/25 hover:text-white"
              )}
            >
              <BiCrosshair className="size-3.5" /> Pivot X-Ray
            </button>
          </div>
        </section>

        {/* ================= HERO SPOTLIGHT INSPECTOR ================= */}
        <section
          aria-label="Spotlight SVG animation inspector"
          className="grid gap-5 lg:grid-cols-[440px_minmax(0,1fr)]"
        >
          {/* Left: Macro Stage + Real-Size Ladder */}
          <div className="min-w-0 space-y-4 rounded-2xl border border-white/10 bg-dicey-card p-4 sm:p-5">
            {/* Study & Tier Pickers */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="ui-eyebrow uppercase tracking-[0.08em]">
                  SPOTLIGHT · {activeStudy.num}
                </p>
                <h2 className="text-lg font-bold text-white">{activeStudy.name}</h2>
              </div>
              <span className="rounded-full border border-white/10 bg-dicey-dark px-2.5 py-1 text-[11px] font-semibold text-[#d8b4fe]">
                {activeStudy.cycleLabel}
              </span>
            </div>

            {/* Tier Selector */}
            <div className="flex w-full flex-wrap gap-1 rounded-xl bg-dicey-dark p-1">
              {tiers.map((tier, idx) => (
                <button
                  key={tier.name}
                  type="button"
                  onClick={() => setActiveTierIdx(idx)}
                  className={cn(
                    "flex-1 whitespace-nowrap rounded-lg px-2 py-1.5 text-center text-xs font-semibold transition-colors",
                    activeTierIdx === idx
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {tier.name}
                </button>
              ))}
            </div>

            {/* Macro 136px Canvas */}
            <div
              key={`spotlight-${activeStudy.id}-${activeTierIdx}-${replayKey}`}
              className={cn(
                "vbm-tactile-trigger relative flex h-60 flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10",
                backdropClass(backdrop),
                activeStudy.interactive && "cursor-pointer"
              )}
              onClick={
                activeStudy.interactive
                  ? () => setTactileEngaged((v) => !v)
                  : undefined
              }
            >
              {/* Subtle radial depth glow behind macro badge */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute size-44 rounded-full opacity-25 blur-2xl"
                style={{ background: activeTier.elixirMid }}
              />

              <div className="relative flex items-center justify-center">
                <div
                  className={cn(
                    "vbm-badge",
                    `vbm-${activeStudy.id}`,
                    activeStudy.interactive && tactileEngaged && "vbm-tactile-engaged"
                  )}
                >
                  <ProgressiveHexBadgeSvg
                    tierIndex={activeTierIdx}
                    tierOverride={activeTier}
                    specOverride={activeSpec}
                    level={resolvedLevel}
                    alt={`${activeTier.name} ${activeStudy.name} preview`}
                    width={136}
                    height={136}
                    className="overflow-visible"
                  />
                </div>

                {/* Optional Anatomical Joint / Pivot X-Ray Overlay (mapped 1:1 to 64x64 viewBox) */}
                {showXray && (
                  <svg
                    viewBox="0 0 64 64"
                    width={136}
                    height={136}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    <circle cx="32" cy="32" r="2.2" fill="none" stroke="#39ff14" strokeWidth="0.6" />
                    <line x1="29" y1="32" x2="35" y2="32" stroke="#39ff14" strokeWidth="0.45" />
                    <line x1="32" y1="29" x2="32" y2="35" stroke="#39ff14" strokeWidth="0.45" />
                    {/* Crown / Apex pivot */}
                    <circle cx="32" cy="13" r="1.4" fill="#39ff14" opacity="0.9" />
                    {/* Left & Right Wing Hinge Pivots */}
                    {activeSpec.wings > 0 && (
                      <>
                        <circle cx="18.5" cy="21" r="1.15" fill="#22d3ee" />
                        <circle cx="45.5" cy="21" r="1.15" fill="#22d3ee" />
                        <circle cx="17" cy="28" r="1.15" fill="#22d3ee" />
                        <circle cx="47" cy="28" r="1.15" fill="#22d3ee" />
                        {activeSpec.wings >= 3 && (
                          <>
                            <circle cx="17" cy="34.6" r="1.15" fill="#22d3ee" />
                            <circle cx="47" cy="34.6" r="1.15" fill="#22d3ee" />
                          </>
                        )}
                        {activeSpec.wings >= 4 && (
                          <>
                            <circle cx="17" cy="40.6" r="1.15" fill="#22d3ee" />
                            <circle cx="47" cy="40.6" r="1.15" fill="#22d3ee" />
                          </>
                        )}
                      </>
                    )}
                    {/* Flask Cork hinge */}
                    {activeSpec.core === "flask" && (
                      <circle cx="28.5" cy="22" r="1.25" fill="#facc15" />
                    )}
                    {/* Prow pivot */}
                    <circle cx="32" cy="51" r="1.2" fill="#f472b6" />
                  </svg>
                )}
              </div>

              {activeStudy.interactive && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2.5 py-0.5 text-[11px] font-medium text-purple-100">
                  <BiPointer className="size-3.5 text-[#39ff14]" />
                  {tactileEngaged ? "Engaged — tap to release" : "Hover, press, or tap to actuate"}
                </span>
              )}
            </div>

            {/* Real-Size Readability Ladder (56px down to 18px) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold uppercase tracking-wider text-[#b7a9ca]">
                  Small-Size Legibility Ladder
                </span>
                <span className="text-[#b7a9ca]">56px → 18px live</span>
              </div>
              <div
                key={`ladder-${activeStudy.id}-${activeTierIdx}-${replayKey}`}
                className={cn(
                  "vbm-tactile-trigger flex items-end justify-between gap-2 rounded-xl border border-white/10 px-3 py-3.5 sm:px-4",
                  backdropClass(backdrop)
                )}
              >
                {SCALE_LADDER.map((sz) => (
                  <div key={sz} className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "vbm-badge",
                        `vbm-${activeStudy.id}`,
                        activeStudy.interactive && tactileEngaged && "vbm-tactile-engaged"
                      )}
                    >
                      <ProgressiveHexBadgeSvg
                        tierIndex={activeTierIdx}
                        tierOverride={activeTier}
                        specOverride={activeSpec}
                        level={resolvedLevel}
                        alt={`${activeTier.name} at ${sz}px`}
                        width={sz}
                        height={sz}
                        className="overflow-visible"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[#b7a9ca] tabular-nums">{sz}px</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Choreography Breakdown + Live UI Context Mockups */}
          <div className="min-w-0 space-y-5 rounded-2xl border border-white/10 bg-dicey-card p-4 sm:p-5">
            {/* Study Description */}
            <div className="space-y-2 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[#39ff14]/40 bg-[#39ff14]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#9bff8a]">
                  Best for: {activeStudy.bestFor}
                </span>
                <span className="text-xs text-[#b7a9ca]">{activeStudy.smallScaleNote}</span>
              </div>
              <p className="text-sm leading-relaxed text-[#ded5eb]">{activeStudy.summary}</p>
            </div>

            {/* Independent SVG Layer Choreography Table */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#b7a9ca]">
                Independently Animated SVG Parts ({activeStudy.parts.length})
              </p>
              <div className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/10 bg-dicey-darker">
                {activeStudy.parts.map((layer) => (
                  <div
                    key={layer.part}
                    className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 text-xs sm:flex-nowrap"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className={cn(
                          "shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase",
                          roleBadgeClass(layer.role)
                        )}
                      >
                        {layer.role}
                      </span>
                      <span className="font-semibold text-white">{layer.part}</span>
                      <code className="hidden rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-purple-200/80 xl:inline">
                        {layer.selector}
                      </code>
                    </div>
                    <span className="text-[#b7a9ca] sm:text-right">{layer.motion}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Real UI Context Stress Test */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#b7a9ca]">
                Live In-Context Preview (Real UI Sizes)
              </p>

              <div
                key={`ctx-${activeStudy.id}-${activeTierIdx}-${replayKey}`}
                className="grid gap-2.5 sm:grid-cols-2"
              >
                {/* Header VIP Pill (24px) */}
                <div className="vbm-tactile-trigger flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-dicey-darker px-3.5 py-3">
                  <span className="text-[11px] font-semibold text-[#b7a9ca]">Header Pill (24px)</span>
                  <div className="inline-flex items-center gap-2 rounded-full bg-dicey-card-elevated px-3 py-1.5">
                    <div
                      className={cn(
                        "vbm-badge",
                        `vbm-${activeStudy.id}`,
                        activeStudy.interactive && tactileEngaged && "vbm-tactile-engaged"
                      )}
                    >
                      <ProgressiveHexBadgeSvg
                        tierIndex={activeTierIdx}
                        tierOverride={activeTier}
                        specOverride={activeSpec}
                        level={resolvedLevel}
                        alt="Header VIP badge"
                        width={24}
                        height={24}
                        className="overflow-visible"
                      />
                    </div>
                    <div className="h-1.5 w-14 overflow-hidden rounded-full bg-dicey-dark">
                      <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Live Bets Table Row (20px) */}
                <div className="vbm-tactile-trigger space-y-1.5 rounded-xl border border-white/10 bg-dicey-darker px-3.5 py-2.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#b7a9ca]">
                    Live Bets Row (20px)
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <div
                        className={cn(
                          "vbm-badge shrink-0",
                          `vbm-${activeStudy.id}`,
                          activeStudy.interactive && tactileEngaged && "vbm-tactile-engaged"
                        )}
                      >
                        <ProgressiveHexBadgeSvg
                          tierIndex={activeTierIdx}
                          tierOverride={activeTier}
                          specOverride={activeSpec}
                          level={resolvedLevel}
                          alt="Live bets badge"
                          width={20}
                          height={20}
                          className="overflow-visible"
                        />
                      </div>
                      <span className="truncate text-xs font-semibold text-white">MoonWhale</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-xs font-bold tabular-nums">
                      <span className="text-amber-300">42.5x</span>
                      <span className="text-green-400">$1,240</span>
                    </div>
                  </div>
                </div>

                {/* Multi-Tier Chat Feed (20px) */}
                <div className="vbm-tactile-trigger space-y-1.5 rounded-xl border border-white/10 bg-dicey-darker p-3">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#b7a9ca]">
                    Live Chat Feed (20px)
                  </span>
                  {[
                    { idx: 4, user: "AlchemistKing", msg: "just hit 142x on Plinko!" },
                    { idx: 2, user: "GoldRush99", msg: "gg nice run" },
                    { idx: 0, user: "BrewStarter", msg: "gl everyone" },
                  ].map((row) => (
                    <div key={row.user} className="flex items-center gap-1.5 text-xs">
                      <div
                        className={cn(
                          "vbm-badge shrink-0",
                          `vbm-${activeStudy.id}`,
                          activeStudy.interactive && tactileEngaged && "vbm-tactile-engaged"
                        )}
                      >
                        <ProgressiveHexBadgeSvg
                          tierIndex={row.idx}
                          tierOverride={tiers[row.idx]}
                          specOverride={specs[row.idx]}
                          level={resolvedLevel}
                          alt={`${tiers[row.idx].name} chat badge`}
                          width={20}
                          height={20}
                          className="overflow-visible"
                        />
                      </div>
                      <span className="shrink-0 font-semibold text-purple-200">{row.user}</span>
                      <span className="truncate text-gray-400">{row.msg}</span>
                    </div>
                  ))}
                </div>

                {/* Rank-Up Mini Modal (72px) */}
                <div className="vbm-tactile-trigger lu-gradient flex items-center gap-3.5 rounded-xl border border-white/10 px-4 py-3">
                  <div
                    className={cn(
                      "vbm-badge shrink-0",
                      `vbm-${activeStudy.id}`,
                      activeStudy.interactive && tactileEngaged && "vbm-tactile-engaged"
                    )}
                  >
                    <ProgressiveHexBadgeSvg
                      tierIndex={activeTierIdx}
                      tierOverride={activeTier}
                      specOverride={activeSpec}
                      level={resolvedLevel}
                      alt="Rank up preview"
                      width={72}
                      height={72}
                      className="overflow-visible"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="hero-headline text-lg uppercase leading-none text-white [text-shadow:none]">
                      RANK UP!
                    </p>
                    <p className="mt-1 truncate text-xs text-[#ded5eb]">
                      {activeTier.name} {resolvedLevel ? ROMAN[resolvedLevel - 1] : ""} Unlocked
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ALL 6 STUDIES COMPARISON GRID ================= */}
        <section aria-label="All 6 VIP badge animation studies" className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#b7a9ca]">
              All 6 Animation Studies — Click Any Study or Tier to Inspect Above
            </h2>
            <span className="text-xs text-[#b7a9ca]">
              Shown at 52px across all 5 tiers + 22px small-scale strip
            </span>
          </div>

          <div
            key={`grid-${replayKey}`}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {MOTION_STUDIES.map((study) => {
              const isSelected = study.id === activeStudyId;

              return (
                <article
                  key={study.id}
                  className={cn(
                    "vbm-tactile-trigger flex min-w-0 flex-col justify-between rounded-2xl border p-4 transition-colors sm:p-5",
                    isSelected
                      ? "border-[#39ff14]/65 bg-dicey-card shadow-[0_0_0_1px_rgba(57,255,20,0.16)]"
                      : "border-white/10 bg-dicey-card hover:border-white/25"
                  )}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#39ff14]">
                          {study.num}
                        </span>
                        <h3 className="text-base font-bold text-white">{study.name}</h3>
                      </div>
                      <span className="rounded-full border border-white/10 bg-dicey-dark px-2.5 py-0.5 text-[11px] font-semibold text-[#d8b4fe]">
                        {study.bestFor}
                      </span>
                    </div>

                    {/* All 5 Live Tiers at 56px */}
                    <div
                      className={cn(
                        "mt-3.5 grid grid-cols-5 gap-1.5 rounded-xl border border-white/10 px-2 py-4 sm:px-3",
                        backdropClass(backdrop)
                      )}
                    >
                      {tiers.map((tier, idx) => (
                        <button
                          key={tier.name}
                          type="button"
                          onClick={() => {
                            setActiveStudyId(study.id);
                            setActiveTierIdx(idx);
                          }}
                          aria-label={`Inspect ${study.name} on ${tier.name}`}
                          className="group flex flex-col items-center gap-1.5 rounded-lg py-1 transition-colors hover:bg-white/[0.04]"
                        >
                          <div className={cn("vbm-badge", `vbm-${study.id}`)}>
                            <ProgressiveHexBadgeSvg
                              tierIndex={idx}
                              tierOverride={tier}
                              specOverride={specs[idx]}
                              level={resolvedLevel}
                              alt={`${tier.name} ${study.name}`}
                              width={52}
                              height={52}
                              className="overflow-visible"
                            />
                          </div>
                          <span className="text-[10px] font-medium text-[#b7a9ca] group-hover:text-white">
                            {tier.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Small-Size (22px) Live Strip */}
                    <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-dicey-darker px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b7a9ca]">
                          22px
                        </span>
                        <div className="flex items-center gap-2">
                          {tiers.map((tier, idx) => (
                            <div key={tier.name} className={cn("vbm-badge", `vbm-${study.id}`)}>
                              <ProgressiveHexBadgeSvg
                                tierIndex={idx}
                                tierOverride={tier}
                                specOverride={specs[idx]}
                                level={resolvedLevel}
                                alt={`${tier.name} 22px`}
                                width={22}
                                height={22}
                                className="overflow-visible"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-gray-400">
                        {study.interactive ? "Hover / press card" : study.cycleLabel}
                      </span>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-[#ded5eb]">
                      {study.smallScaleNote}
                    </p>
                  </div>

                  {/* Footer Actions */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
                    <div className="flex flex-wrap gap-1">
                      {study.parts.slice(0, 3).map((p) => (
                        <span
                          key={p.part}
                          className="rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-purple-200/85"
                        >
                          {p.part}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveStudyId(study.id);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={cn(
                        "shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                        isSelected
                          ? "bg-[#39ff14] text-[#071a04]"
                          : "border border-white/10 bg-dicey-dark text-white hover:border-white/25"
                      )}
                    >
                      {isSelected ? "Inspecting" : "Inspect"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
