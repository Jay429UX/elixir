"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowClockwise, X } from "@phosphor-icons/react";
import VipBadge from "@/components/ui/VipBadge";
import DeepLiquidShader from "@/components/ui/DeepLiquidShader";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";

const FROM = { label: "Bronze I", badge: "/vip/elixir/tier1.svg" };
const TO = { label: "Silver I", badge: "/vip/elixir/tier2.svg" };
const BONUS = 245.13;

interface AnimationOption {
  id: number;
  name: string;
  tag: string;
  note: string;
}

const OPTIONS: AnimationOption[] = [
  { id: 1, name: "Bronze → Silver Morph", tag: "Kept · Flash Morph", note: "Starts as Bronze I, bursts with a bright flash, and transforms into Silver I with a sheen." },
  { id: 2, name: "Layered SVG Assembly", tag: "Kept · Staggered", note: "Builds piece by piece: aura → hex medallion → spikes fan out → potion bottle drops in → star pops." },
  { id: 3, name: "Bronze Core → Silver Forge", tag: "Morph + Build", note: "Bronze I fades in the core while Silver spikes shoot out, medallion locks over it, and the potion drops in." },
  { id: 4, name: "Rimlight Trace → Fill", tag: "Stroke Draw + Build", note: "The hex rimlight traces the outline first, then medallion, spikes, and potion assemble inside." },
  { id: 5, name: "Staggered 6-Spike Bloom", tag: "Clockwise Bloom", note: "Medallion and potion land first, then each of the 6 outer spikes pops out clockwise one by one." },
  { id: 6, name: "Potion-First Alchemy", tag: "Bottle First", note: "The potion flask rises from the liquid below, then the medallion clamps around it and spikes lock." },
  { id: 7, name: "Morph + Staggered Parts", tag: "Bronze → Assembly", note: "Bronze I flashes into the Silver hex medallion, then the spikes and potion assemble in sequence." },
  { id: 8, name: "Converging Parts Snap", tag: "Top & Bottom Meet", note: "Upper spikes drop from above, lower spikes & potion rise from below, locking into the medallion." },
  { id: 9, name: "Spikes Lock + Rim Flash", tag: "Rotate-Lock", note: "Core pops in, spikes rotate -60° into their sockets, and the rimlight flashes bright white." },
  { id: 10, name: "Grand Finale", tag: "Morph + Full Build", note: "Bronze I flashes into Silver medallion, spikes rotate-lock, potion hops in with a bounce, and sheen sweeps." },
];

function PotionPreview({ className, live = false }: { className?: string; live?: boolean }) {
  if (live) {
    return <DeepLiquidShader className={className} />;
  }
  return (
    <div
      aria-hidden="true"
      className={cn("relative overflow-hidden", className)}
      style={{
        background: "linear-gradient(180deg, rgba(89,235,34,0.92) 0%, #2ab816 28%, #0f5e16 75%, #072d0b 100%)",
        boxShadow: "inset 0 3px 10px rgba(210,255,150,0.45)",
      }}
    >
      <div
        className="absolute inset-x-0 -top-2 h-4 rounded-[50%] opacity-80"
        style={{ background: "radial-gradient(ellipse at 50% 60%, #b8ff65 0%, #44d61d 70%, transparent 100%)" }}
      />
      <span className="absolute bottom-3 left-[14%] size-3 rounded-full border border-white/40 bg-white/15" />
      <span className="absolute bottom-6 left-[32%] size-4 rounded-full border border-white/35 bg-white/10" />
      <span className="absolute bottom-4 right-[22%] size-5 rounded-full border border-white/40 bg-white/15" />
      <span className="absolute bottom-8 right-[38%] size-2.5 rounded-full border border-white/40 bg-white/20" />
    </div>
  );
}

function KingOverlay({ live = false, size = "md" }: { live?: boolean; size?: "sm" | "md" }) {
  const widthCls = size === "sm" ? "w-[205px]" : "w-[280px] sm:w-[350px]";
  if (live) {
    return (
      <video
        src="/animations/king-peek-coin.webm"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className={cn("pointer-events-none absolute left-1/2 top-0 z-10 h-auto -translate-x-1/2", widthCls)}
      />
    );
  }
  return (
    <img
      src="/animations/king-peek-poster.png"
      alt=""
      aria-hidden="true"
      className={cn("pointer-events-none absolute left-1/2 top-0 z-10 h-auto -translate-x-1/2", widthCls)}
    />
  );
}

function AnimatedCenterBadge({ id, replayKey }: { id: number; replayKey: number }) {
  const badgeSize = "size-28 sm:size-32";
  const hasBronzeStart = id === 1 || id === 3 || id === 7 || id === 10;

  return (
    <div key={replayKey} className="lum-svg-parts relative mx-auto flex size-36 items-center justify-center">
      {id === 1 && (
        <>
          <span
            aria-hidden="true"
            className="lum-morph-flash pointer-events-none absolute size-32 rounded-full bg-radial from-white via-sky-300/60 to-transparent blur-md"
          />
          <div className="lum-morph-old pointer-events-none absolute">
            <VipBadge src={FROM.badge} alt={FROM.label} className={badgeSize} />
          </div>
          <div className="lum-morph-new">
            <VipBadge src={TO.badge} alt={TO.label} className={badgeSize} sheen />
          </div>
        </>
      )}

      {id !== 1 && (
        <>
          {hasBronzeStart && (
            <>
              <span
                aria-hidden="true"
                className="lum-morph-flash pointer-events-none absolute size-32 rounded-full bg-radial from-white via-sky-300/50 to-transparent blur-md"
              />
              <div className="lum-forge-old pointer-events-none absolute">
                <VipBadge src={FROM.badge} alt={FROM.label} className={badgeSize} />
              </div>
            </>
          )}
          <div className={`lum-opt-${id}`}>
            <VipBadge
              src={TO.badge}
              alt={TO.label}
              className={badgeSize}
              sheen={id === 2 || id === 10}
            />
          </div>
        </>
      )}
    </div>
  );
}

function CenteredLevelUpModal({
  id,
  replayKey,
  live = false,
}: {
  id: number;
  replayKey: number;
  live?: boolean;
}) {
  const padTop = live ? "pt-[148px] sm:pt-[182px]" : "pt-[108px]";
  const kingSize = live ? "md" : "sm";

  return (
    <div className={cn("relative mx-auto w-full max-w-md", padTop)}>
      <KingOverlay live={live} size={kingSize} />
      <div className="ui-modal-panel relative w-full overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-5 py-3.5 sm:px-6">
          <h3 className="ui-modal-title text-base sm:text-lg">Level Up Bonus</h3>
          <span className="grid size-8 place-items-center rounded-xl bg-dicey-card-elevated text-[var(--text-secondary)]">
            <X className="size-4" />
          </span>
        </div>

        <div className="px-4 pb-5 sm:px-6 sm:pb-6">
          <div className="lu-gradient relative mb-4 min-h-[320px] w-full overflow-hidden rounded-xl pt-6 text-center sm:min-h-[350px]">
            <PotionPreview live={live} className="absolute inset-x-0 bottom-0 h-[44%] w-full" />
            <div className="relative z-10 px-4">
              <AnimatedCenterBadge id={id} replayKey={replayKey} />
              <h4 className="hero-headline relative mt-1 text-3xl text-white">Rank up!</h4>
              <p className="ui-body relative mt-1 text-xs sm:text-sm">
                You moved from {FROM.label} to {TO.label}.
              </p>
            </div>
          </div>

          <PrimaryButton className="w-full">
            <span className="inline-flex items-center gap-1.5">
              Claim {BONUS.toFixed(2)}
              <img src="/crypto/usdc.svg" alt="USDC" className="size-5" />
            </span>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function LevelUpModalGallery() {
  const [replayCounts, setReplayCounts] = useState<Record<number, number>>({});
  const [globalReplay, setGlobalReplay] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selected = OPTIONS.find((o) => o.id === selectedId) ?? null;

  const replayOne = (id: number) => {
    setReplayCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const replayAll = () => {
    setGlobalReplay((n) => n + 1);
  };

  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
              ← Back to casino
            </Link>
            <p className="ui-eyebrow mt-6">Elixir design lab · morph &amp; layered svg assembly</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              10 Morph &amp; Layered SVG Assembly Options
            </h1>
            <p className="ui-body mt-2 max-w-2xl">
              Keeping Bronze → Silver Morph and Layered SVG Assembly, plus 8 more choreographed ways the SVG layers build, trace, bloom, and lock together.
            </p>
          </div>

          <button
            type="button"
            onClick={replayAll}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#39ff14]/60 hover:bg-[#39ff14]/10"
          >
            <ArrowClockwise className="size-4" />
            Replay All Entrances
          </button>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {OPTIONS.map((opt) => (
            <article
              key={opt.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d0718]/70 p-5 sm:p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-purple-300">
                      {String(opt.id).padStart(2, "0")}
                    </span>
                    <h2 className="text-base font-bold text-white">{opt.name}</h2>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-200">
                      {opt.tag}
                    </span>
                  </div>
                  <p className="ui-caption mt-1">{opt.note}</p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => replayOne(opt.id)}
                    aria-label={`Replay ${opt.name}`}
                    className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-purple-100 transition-colors hover:border-white/30 hover:bg-white/10"
                  >
                    <ArrowClockwise className="size-3.5" />
                    Replay
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedId(opt.id)}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-[#39ff14]/60 hover:bg-[#39ff14]/10"
                  >
                    Inspect Live
                  </button>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center rounded-2xl bg-[#11081f] px-3 py-6">
                <CenteredLevelUpModal
                  id={opt.id}
                  replayKey={globalReplay + (replayCounts[opt.id] ?? 0)}
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Live modal inspector */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Live preview: ${selected.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedId(null)}
        >
          <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between text-xs text-purple-200">
              <span>
                <strong>
                  {String(selected.id).padStart(2, "0")} · {selected.name}
                </strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => replayOne(selected.id)}
                  className="inline-flex items-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 font-semibold text-white hover:bg-white/20"
                >
                  <ArrowClockwise className="size-3.5" />
                  Replay
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-white hover:bg-white/20"
                >
                  Close
                </button>
              </div>
            </div>
            <CenteredLevelUpModal
              id={selected.id}
              replayKey={globalReplay + (replayCounts[selected.id] ?? 0)}
              live
            />
          </div>
        </div>
      )}
    </main>
  );
}
