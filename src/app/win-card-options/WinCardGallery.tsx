"use client";

import Link from "next/link";
import VipBadge from "@/components/ui/VipBadge";
import { cn } from "@/lib/utils";

interface OptionMeta {
  id: number;
  name: string;
  tag: string;
  note: string;
}

const OPTIONS: OptionMeta[] = [
  { id: 1, name: "Bubbling Green Fizzy", tag: "Current", note: "Flowing lime-emerald border with 7 micro-bubbles popping around the perimeter." },
  { id: 2, name: "Carbonated Fizz Inside", tag: "Bottom-Up Fizz", note: "Crisp green border with a soft bottom glow and tiny bubbles rising inside the card." },
  { id: 3, name: "Orbiting Neon Spark", tag: "Conic Trace", note: "Bright `#39ff14` comet tracing smoothly around the rounded card border." },
  { id: 4, name: "Breathing Elixir Rim", tag: "Minimal", note: "Clean 1px neon-lime border that gently pulses in brightness without particles." },
  { id: 5, name: "Potion Floor Tint", tag: "Subtle Liquid", note: "Soft green potion gradient along the bottom edge with a crisp lime hairline border." },
  { id: 6, name: "Electric Lime Shimmer", tag: "Sheen Sweep", note: "Diagonal lime-and-white glass sheen sweeping across an emerald-bordered card." },
  { id: 7, name: "Top-Edge Fizz Halo", tag: "Double Ring", note: "Inner lime hairline + outer emerald halo with tiny bubbles rising along the top edge." },
  { id: 8, name: "Toxic Cauldron Blend", tag: "Green + Purple", note: "Animated lime-to-purple gradient border that bridges Elixir's purple & green palette." },
];

function SampleWinCard({ id }: { id: number }) {
  const innerContent = (
    <>
      <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-md">
        <img
          src="/games/playngo_TomeofMadness.webp"
          alt="Tome of Madness"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <VipBadge src="/vip/elixir/tier3.svg" alt="VIP" className="size-6 shrink-0" />
          <span className="text-sm text-gray-300">FastSt..</span>
        </div>
        <span className="truncate text-xs text-gray-500">Tome of Madness</span>
      </div>
      <div className="flex shrink-0 flex-col items-end">
        <div className="flex items-center gap-1">
          <img src="/crypto/usdc.svg" alt="USDC" className="size-4" />
          <span className="text-sm font-semibold tabular-nums text-white">2.89k</span>
        </div>
        <span className="mt-0.5 rounded-md bg-gradient-to-b from-amber-300 to-amber-500 px-2 py-0.5 text-xs font-extrabold tabular-nums text-[#2b1400]">
          118x
        </span>
      </div>
    </>
  );

  return (
    <div className="relative min-w-[260px]">
      {id === 1 && (
        <>
          <div aria-hidden="true" className="pointer-events-none absolute -inset-[2px] rounded-[10px]">
            <div
              className="win-card-fizzy absolute inset-0 rounded-[10px]"
              style={{ filter: "url(#wc-fizzy-noise)" }}
            />
            <span className="win-fizz-dot -top-0.5 left-[8%] size-[3px]" style={{ animationDelay: "0s" }} />
            <span className="win-fizz-dot -top-1 left-[17%] size-[4px]" style={{ animationDelay: "0.35s" }} />
            <span className="win-fizz-dot -top-0.5 left-[29%] size-[3px]" style={{ animationDelay: "0.8s" }} />
            <span className="win-fizz-dot -top-1 left-[44%] size-[5px]" style={{ animationDelay: "0.15s" }} />
            <span className="win-fizz-dot -top-0.5 left-[58%] size-[3px]" style={{ animationDelay: "0.65s" }} />
            <span className="win-fizz-dot -top-1 right-[24%] size-[4px]" style={{ animationDelay: "1.05s" }} />
            <span className="win-fizz-dot -top-0.5 right-[11%] size-[3px]" style={{ animationDelay: "0.45s" }} />
            <span className="win-fizz-dot -bottom-0.5 left-[15%] size-[3px]" style={{ animationDelay: "0.5s" }} />
            <span className="win-fizz-dot -bottom-1 left-[34%] size-[4px]" style={{ animationDelay: "0.95s" }} />
            <span className="win-fizz-dot -bottom-0.5 right-[32%] size-[3px]" style={{ animationDelay: "0.2s" }} />
            <span className="win-fizz-dot -bottom-1 right-[14%] size-[4px]" style={{ animationDelay: "0.75s" }} />
            <span className="win-fizz-dot -left-0.5 top-[38%] size-[3px]" style={{ animationDelay: "0.6s" }} />
            <span className="win-fizz-dot -right-0.5 top-[48%] size-[3px]" style={{ animationDelay: "1.15s" }} />
          </div>
          <div className="relative flex items-center gap-3 overflow-hidden rounded-lg bg-dicey-card px-4 py-2 shadow-[inset_0_0_18px_rgba(57,255,20,0.1)]">
            {innerContent}
          </div>
        </>
      )}

      {id === 2 && (
        <div className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-[#39ff14]/55 bg-dicey-card px-4 py-2 shadow-[0_0_14px_rgba(57,255,20,0.18)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-[#39ff14]/20 to-transparent"
          />
          <span className="wc-carb-dot left-[18%] size-1.5" style={{ animationDelay: "0s" }} />
          <span className="wc-carb-dot left-[38%] size-2" style={{ animationDelay: "0.5s" }} />
          <span className="wc-carb-dot left-[58%] size-1" style={{ animationDelay: "1.0s" }} />
          <span className="wc-carb-dot right-[20%] size-1.5" style={{ animationDelay: "0.3s" }} />
          <span className="wc-carb-dot right-[34%] size-2" style={{ animationDelay: "1.4s" }} />
          <div className="relative z-10 flex w-full items-center gap-3">{innerContent}</div>
        </div>
      )}

      {id === 3 && (
        <div className="wc-orbit-wrap bg-[#39ff14]/20 shadow-[0_0_16px_rgba(57,255,20,0.2)]">
          <div className="relative flex items-center gap-3 overflow-hidden rounded-[7.5px] bg-dicey-card px-4 py-2">
            {innerContent}
          </div>
        </div>
      )}

      {id === 4 && (
        <div className="wc-breathe relative flex items-center gap-3 overflow-hidden rounded-lg border bg-dicey-card px-4 py-2">
          {innerContent}
        </div>
      )}

      {id === 5 && (
        <div className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-lime-400/50 bg-dicey-card px-4 py-2 shadow-[0_0_12px_rgba(57,255,20,0.16)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-emerald-500/30 via-lime-400/10 to-transparent"
          />
          <div className="relative z-10 flex w-full items-center gap-3">{innerContent}</div>
        </div>
      )}

      {id === 6 && (
        <div className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-[#39ff14]/60 bg-dicey-card px-4 py-2 shadow-[0_0_14px_rgba(57,255,20,0.2)]">
          <span aria-hidden="true" className="wc-sheen-bar" />
          <div className="relative z-10 flex w-full items-center gap-3">{innerContent}</div>
        </div>
      )}

      {id === 7 && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[2px] rounded-[10px] border border-[#39ff14]/35 shadow-[0_0_16px_rgba(57,255,20,0.25)]"
          >
            <span className="win-fizz-dot -top-1 left-[20%] size-1.5" style={{ animationDelay: "0s" }} />
            <span className="win-fizz-dot -top-1 left-[50%] size-2" style={{ animationDelay: "0.5s" }} />
            <span className="win-fizz-dot -top-1 right-[22%] size-1.5" style={{ animationDelay: "1s" }} />
          </div>
          <div className="relative flex items-center gap-3 overflow-hidden rounded-lg border border-[#39ff14]/70 bg-dicey-card px-4 py-2">
            {innerContent}
          </div>
        </>
      )}

      {id === 8 && (
        <>
          <div aria-hidden="true" className="wc-cauldron-border pointer-events-none absolute -inset-[1.5px] rounded-[9px]" />
          <div className="relative flex items-center gap-3 overflow-hidden rounded-lg bg-dicey-card px-4 py-2">
            {innerContent}
          </div>
        </>
      )}
    </div>
  );
}

function QuietNeighborCard({ label, mult }: { label: string; mult: string }) {
  return (
    <div className="hidden min-w-[200px] items-center justify-between gap-3 rounded-lg border border-purple-300/10 bg-dicey-card px-4 py-2 opacity-65 sm:flex">
      <div className="flex items-center gap-2.5">
        <div className="h-12 w-10 rounded-md bg-white/5" />
        <div>
          <p className="text-xs text-gray-400">Player..</p>
          <p className="text-[11px] text-gray-500">{label}</p>
        </div>
      </div>
      <span className="rounded bg-white/10 px-2 py-0.5 text-xs font-bold text-lime-300">{mult}</span>
    </div>
  );
}

export default function WinCardGallery() {
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-10 text-white sm:px-8">
      <svg className="sr-only" aria-hidden="true">
        <filter id="wc-fizzy-noise" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves="3" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
          ← Back to casino
        </Link>
        <p className="ui-eyebrow mt-6">Elixir design lab · live wins feed</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
          8 Green Fizzy Border Options (100x+ Win Card)
        </h1>
        <p className="ui-body mt-2 max-w-2xl">
          Compare 8 green/fizzy border treatments for high-multiplier (`100x+`) Live Wins cards, shown alongside normal neighbor cards.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {OPTIONS.map((opt) => (
            <article
              key={opt.id}
              className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0d0718]/70 p-5"
            >
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-purple-300">
                    {String(opt.id).padStart(2, "0")}
                  </span>
                  <h2 className="text-base font-bold text-white">{opt.name}</h2>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                      opt.id === 1
                        ? "bg-[#39ff14]/15 text-[#9bff8a]"
                        : "bg-white/10 text-purple-200"
                    )}
                  >
                    {opt.tag}
                  </span>
                </div>
                <p className="ui-caption mt-1">{opt.note}</p>
              </div>

              <div className="flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[var(--dicey-darker,#140d24)] px-4 py-7">
                <QuietNeighborCard label="Limbo" mult="20x" />
                <SampleWinCard id={opt.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
