"use client";

import { useState, type CSSProperties } from "react";
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
  ALCHEMIST_TIERS,
  AlchemistBadgeSvg,
  type AlchemistPartSpec,
} from "@/components/ui/AlchemistBadges";

type MotionMode = "signature" | "calm" | "entrance" | "tactile";
type SpeedSetting = 1 | 2 | 4;
type BackdropMode = "dark" | "modal" | "card";

const SCALE_LADDER = [56, 36, 28, 24, 20, 18] as const;

const MOTION_MODES: Array<{
  id: MotionMode;
  label: string;
  desc: string;
}> = [
  {
    id: "signature",
    label: "Signature Motion",
    desc: "Each tier runs its own bespoke alchemical physics simultaneously.",
  },
  {
    id: "calm",
    label: "Calm Chat (18–24px)",
    desc: "Silhouettes stay locked still while internal liquid, flame, and edge glints stay alive.",
  },
  {
    id: "entrance",
    label: "Rank-Up Forge",
    desc: "Choreographed multi-part assembly per artifact (Lead → Support → Accent).",
  },
  {
    id: "tactile",
    label: "Hover / Press Rig",
    desc: "Calm at rest — pointer hover or tap actuates every mechanical joint.",
  },
];

function backdropClass(mode: BackdropMode): string {
  if (mode === "modal") return "lu-gradient";
  if (mode === "card") return "bg-dicey-card-elevated";
  return "bg-dicey-darker";
}

function roleBadgeClass(role: AlchemistPartSpec["role"]): string {
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

export default function AlchemistBadgeShowcase() {
  const [selectedIdx, setSelectedIdx] = useState<number>(4); // Default Grand Alchemist
  const [mode, setMode] = useState<MotionMode>("signature");
  const [speed, setSpeed] = useState<SpeedSetting>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [backdrop, setBackdrop] = useState<BackdropMode>("dark");
  const [showXray, setShowXray] = useState<boolean>(false);
  const [replayKey, setReplayKey] = useState<number>(0);
  const [tactileEngaged, setTactileEngaged] = useState<boolean>(false);

  const activeTier = ALCHEMIST_TIERS[selectedIdx];
  const activeMode = MOTION_MODES.find((m) => m.id === mode) ?? MOTION_MODES[0];
  const stageStyle = { "--alch-speed": speed } as CSSProperties;

  return (
    <main
      className={cn(
        "alch-stage min-h-dvh bg-dicey-darker px-4 py-8 text-white sm:px-8 sm:py-10",
        isPaused && "alch-paused"
      )}
      style={stageStyle}
    >
      <div className="mx-auto max-w-6xl space-y-7">
        {/* Page Header */}
        <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="min-w-0">
            <p className="ui-eyebrow uppercase tracking-[0.08em]">
              ELIXIR ORIGINAL CONCEPT · ALCHEMIST VIP PROGRESSION
            </p>
            <h1 className="hero-headline mt-1 text-3xl leading-tight text-white sm:text-4xl">
              Alchemist Relic Badges
            </h1>
            <p className="ui-body mt-2 max-w-2xl">
              Five original Elixir-themed progression ranks —{" "}
              <span className="font-semibold text-white">
                Apprentice, Herbalist, Transmuter, Arcanist, and Grand Alchemist
              </span>{" "}
              — each crafted as a distinct alchemical artifact with independently animated SVG parts
              engineered to stay sharp from <span className="font-semibold text-white">18px</span> chat rows
              up to <span className="font-semibold text-white">144px</span> hero modals.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/vip-badge-animations"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-[#d8b4fe] transition-colors hover:border-white/25 hover:text-white"
            >
              Hex Motion Lab <BiLinkExternal className="size-3.5" />
            </Link>
            <Link
              href="/vip-badge-editor"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-gray-200 transition-colors hover:border-white/25 hover:text-white"
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

        {/* Global Workbench Toolbar */}
        <section
          aria-label="Alchemist badge animation controls"
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-dicey-card p-3.5 sm:p-4"
        >
          {/* Motion Mode Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#b7a9ca]">Mode:</span>
            <div className="inline-flex flex-wrap rounded-xl bg-dicey-dark p-1">
              {MOTION_MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setMode(m.id);
                    if (m.id === "entrance") setReplayKey((k) => k + 1);
                  }}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                    mode === m.id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Speed + Pause + Replay + Surface + X-Ray */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl bg-dicey-dark p-1">
              {(
                [
                  [1, "1×"],
                  [2, "0.5×"],
                  [4, "0.25×"],
                ] as const
              ).map(([mult, label]) => (
                <button
                  key={mult}
                  type="button"
                  onClick={() => setSpeed(mult)}
                  className={cn(
                    "rounded-lg px-2 py-1 text-xs font-semibold transition-colors",
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
                "inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-colors",
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
              className="inline-flex items-center gap-1 rounded-xl border border-[#39ff14]/45 bg-[#39ff14]/15 px-2.5 py-1.5 text-xs font-bold text-[#39ff14] transition-colors hover:bg-[#39ff14] hover:text-[#071a04]"
            >
              <BiRefresh className="size-4" /> Replay
            </button>

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
                    "rounded-lg px-2 py-1 text-xs font-semibold transition-colors",
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
                "inline-flex items-center gap-1 rounded-xl border px-2.5 py-1.5 text-xs font-semibold transition-colors",
                showXray
                  ? "border-[#39ff14]/55 bg-[#39ff14]/15 text-[#39ff14]"
                  : "border-white/10 bg-dicey-dark text-gray-300 hover:border-white/25 hover:text-white"
              )}
            >
              <BiCrosshair className="size-3.5" /> Pivot X-Ray
            </button>
          </div>
        </section>

        {/* ================= ALL 5 ALCHEMIST RANKS LINEUP ================= */}
        <section aria-label="All 5 Alchemist VIP ranks" className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#b7a9ca]">
              The 5 Alchemist Ranks — Click Any Relic to Inspect Below
            </h2>
            <span className="text-xs text-[#b7a9ca]">{activeMode.desc}</span>
          </div>

          <div
            key={`lineup-${mode}-${replayKey}`}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {ALCHEMIST_TIERS.map((tier, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={cn(
                    "alch-tactile-trigger group flex min-w-0 flex-col rounded-2xl border p-4 text-left transition-all",
                    isSelected
                      ? "border-[#39ff14]/70 bg-dicey-card shadow-[0_0_0_1px_rgba(57,255,20,0.18)]"
                      : "border-white/10 bg-dicey-card hover:border-white/25"
                  )}
                >
                  <div className="mb-3 flex w-full items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="font-mono text-[11px] font-bold text-[#39ff14]">
                        TIER 0{tier.level}
                      </span>
                      <h3 className="truncate text-sm font-bold text-white">{tier.rank}</h3>
                      <p className="truncate text-[11px] text-[#b7a9ca]">{tier.artifact}</p>
                    </div>
                  </div>

                  {/* Hero + Small Scale Strip */}
                  <div
                    className={cn(
                      "flex w-full flex-col items-center justify-center gap-3 rounded-xl border border-white/10 py-4",
                      backdropClass(backdrop)
                    )}
                  >
                    <div
                      className={cn(
                        "alch-badge",
                        `alch-mode-${mode}`,
                        mode === "tactile" && tactileEngaged && "alch-engaged"
                      )}
                    >
                      <AlchemistBadgeSvg
                        tierIndex={idx}
                        alt={`${tier.rank} — ${tier.artifact}`}
                        width={96}
                        height={96}
                      />
                    </div>
                    <div className="flex items-end gap-2">
                      {([32, 24, 20, 18] as const).map((sz) => (
                        <div
                          key={sz}
                          className={cn(
                            "alch-badge",
                            `alch-mode-${mode}`,
                            mode === "tactile" && tactileEngaged && "alch-engaged"
                          )}
                        >
                          <AlchemistBadgeSvg
                            tierIndex={idx}
                            alt={`${tier.rank} at ${sz}px`}
                            width={sz}
                            height={sz}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-3 text-[11px] leading-snug text-[#ded5eb]">{tier.tagline}</p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================= MACRO INSPECTOR & LIVE UI CONTEXT ================= */}
        <section
          aria-label="Alchemist relic anatomy inspector"
          className="grid gap-5 lg:grid-cols-[440px_minmax(0,1fr)]"
        >
          {/* Left: 144px Macro Stage + Scale Ladder */}
          <div className="min-w-0 space-y-4 rounded-2xl border border-white/10 bg-dicey-card p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="ui-eyebrow uppercase tracking-[0.08em]">
                  TIER 0{activeTier.level} INSPECTOR
                </p>
                <h2 className="text-lg font-bold text-white">
                  {activeTier.rank} · {activeTier.artifact}
                </h2>
              </div>
              <span className="rounded-full border border-white/10 bg-dicey-dark px-2.5 py-1 text-[11px] font-semibold text-[#d8b4fe]">
                {activeMode.label}
              </span>
            </div>

            {/* Macro 144px Canvas */}
            <div
              key={`macro-${selectedIdx}-${mode}-${replayKey}`}
              onClick={
                mode === "tactile" ? () => setTactileEngaged((v) => !v) : undefined
              }
              className={cn(
                "alch-tactile-trigger relative flex h-64 flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10",
                backdropClass(backdrop),
                mode === "tactile" && "cursor-pointer"
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute size-44 rounded-full opacity-25 blur-2xl"
                style={{ background: activeTier.accent }}
              />

              <div className="relative flex items-center justify-center">
                <div
                  className={cn(
                    "alch-badge",
                    `alch-mode-${mode}`,
                    mode === "tactile" && tactileEngaged && "alch-engaged"
                  )}
                >
                  <AlchemistBadgeSvg
                    tierIndex={selectedIdx}
                    alt={`${activeTier.rank} macro preview`}
                    width={144}
                    height={144}
                  />
                </div>

                {showXray && (
                  <svg
                    viewBox="0 0 64 64"
                    width={144}
                    height={144}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                  >
                    {/* 1:1 Uniform Square Ratio Safe-Box (54x54 centered inside 64x64) */}
                    <rect
                      x="5"
                      y="5"
                      width="54"
                      height="54"
                      rx="4"
                      fill="none"
                      stroke="#39ff14"
                      strokeOpacity="0.45"
                      strokeWidth="0.6"
                      strokeDasharray="2 2"
                    />
                    {activeTier.pivots.map((p) => (
                      <g key={p.label}>
                        <circle cx={p.x} cy={p.y} r="2" fill="none" stroke={p.color} strokeWidth="0.65" />
                        <circle cx={p.x} cy={p.y} r="0.85" fill={p.color} />
                      </g>
                    ))}
                  </svg>
                )}
              </div>

              {mode === "tactile" && (
                <span className="mt-2 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2.5 py-0.5 text-[11px] font-medium text-purple-100">
                  <BiPointer className="size-3.5 text-[#39ff14]" />
                  {tactileEngaged ? "Engaged — tap to release" : "Hover, press, or tap to actuate"}
                </span>
              )}
            </div>

            {/* Small-Size Legibility Ladder */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold uppercase tracking-wider text-[#b7a9ca]">
                  Small-Size Legibility Ladder
                </span>
                <span className="text-[#b7a9ca]">56px → 18px live</span>
              </div>
              <div
                key={`ladder-${selectedIdx}-${mode}-${replayKey}`}
                className={cn(
                  "alch-tactile-trigger flex items-end justify-between gap-2 rounded-xl border border-white/10 px-3 py-3.5 sm:px-4",
                  backdropClass(backdrop)
                )}
              >
                {SCALE_LADDER.map((sz) => (
                  <div key={sz} className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "alch-badge",
                        `alch-mode-${mode}`,
                        mode === "tactile" && tactileEngaged && "alch-engaged"
                      )}
                    >
                      <AlchemistBadgeSvg
                        tierIndex={selectedIdx}
                        alt={`${activeTier.rank} ${sz}px`}
                        width={sz}
                        height={sz}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[#b7a9ca] tabular-nums">{sz}px</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Independent SVG Parts + Live Casino Context */}
          <div className="min-w-0 space-y-5 rounded-2xl border border-white/10 bg-dicey-card p-4 sm:p-5">
            {/* Independently Animated Parts */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#b7a9ca]">
                Independently Animated SVG Parts — {activeTier.artifact}
              </p>
              <div className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/10 bg-dicey-darker">
                {activeTier.parts.map((layer) => (
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

            {/* Live Casino Context Previews */}
            <div className="space-y-2.5">
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#b7a9ca]">
                Live Elixir UI Context (Real Production Sizes)
              </p>

              <div
                key={`ctx-${selectedIdx}-${mode}-${replayKey}`}
                className="grid gap-2.5 sm:grid-cols-2"
              >
                {/* Header Pill (24px) */}
                <div className="alch-tactile-trigger flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-dicey-darker px-3.5 py-3">
                  <span className="text-[11px] font-semibold text-[#b7a9ca]">Header Pill (24px)</span>
                  <div className="inline-flex items-center gap-2 rounded-full bg-dicey-card-elevated px-3 py-1.5">
                    <div
                      className={cn(
                        "alch-badge",
                        `alch-mode-${mode}`,
                        mode === "tactile" && tactileEngaged && "alch-engaged"
                      )}
                    >
                      <AlchemistBadgeSvg
                        tierIndex={selectedIdx}
                        alt="Header pill preview"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="h-1.5 w-14 overflow-hidden rounded-full bg-dicey-dark">
                      <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-[#39ff14] to-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Live Bets Row (20px) */}
                <div className="alch-tactile-trigger space-y-1.5 rounded-xl border border-white/10 bg-dicey-darker px-3.5 py-2.5">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#b7a9ca]">
                    Live Bets Row (20px)
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-1.5">
                      <div
                        className={cn(
                          "alch-badge shrink-0",
                          `alch-mode-${mode}`,
                          mode === "tactile" && tactileEngaged && "alch-engaged"
                        )}
                      >
                        <AlchemistBadgeSvg
                          tierIndex={selectedIdx}
                          alt="Live bets preview"
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className="truncate text-xs font-semibold text-white">PotionKing</span>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-xs font-bold tabular-nums">
                      <span className="text-[#39ff14]">128.4x</span>
                      <span className="text-white">$2,568</span>
                    </div>
                  </div>
                </div>

                {/* All-5-Tier Live Chat Feed (20px) */}
                <div className="alch-tactile-trigger space-y-1.5 rounded-xl border border-white/10 bg-dicey-darker p-3">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#b7a9ca]">
                    Live Chat — All 5 Ranks (20px)
                  </span>
                  {[
                    { idx: 4, user: "KingBrew", msg: "Philosopher's Crown unlocked!" },
                    { idx: 3, user: "StarWeaver", msg: "Astrolabe spins so clean" },
                    { idx: 2, user: "GoldCrucible", msg: "42x on Crash!!" },
                    { idx: 1, user: "MistKettle", msg: "gg nice win" },
                    { idx: 0, user: "GreenVial", msg: "first brew tonight" },
                  ].map((row) => (
                    <div key={row.user} className="flex items-center gap-1.5 text-xs">
                      <div
                        className={cn(
                          "alch-badge shrink-0",
                          `alch-mode-${mode}`,
                          mode === "tactile" && tactileEngaged && "alch-engaged"
                        )}
                      >
                        <AlchemistBadgeSvg
                          tierIndex={row.idx}
                          alt={`${ALCHEMIST_TIERS[row.idx].rank} chat badge`}
                          width={20}
                          height={20}
                        />
                      </div>
                      <span className="shrink-0 font-semibold text-purple-200">{row.user}</span>
                      <span className="truncate text-gray-400">{row.msg}</span>
                    </div>
                  ))}
                </div>

                {/* Rank-Up Mini Modal (80px) */}
                <div className="alch-tactile-trigger lu-gradient flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-4 text-center">
                  <div
                    className={cn(
                      "alch-badge",
                      `alch-mode-${mode}`,
                      mode === "tactile" && tactileEngaged && "alch-engaged"
                    )}
                  >
                    <AlchemistBadgeSvg
                      tierIndex={selectedIdx}
                      alt={`${activeTier.rank} rank up`}
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <p className="hero-headline text-xl uppercase leading-none text-white [text-shadow:none]">
                      RANK UP!
                    </p>
                    <p className="mt-1 text-xs text-[#ded5eb]">
                      You reached <span className="font-bold text-white">{activeTier.rank}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
