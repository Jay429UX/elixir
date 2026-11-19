"use client";

import Link from "next/link";
import LiveWinsFeed from "@/components/LiveWinsFeed";
import VipBadge from "@/components/ui/VipBadge";

export default function LiveWinsLab() {
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-[1440px]">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
          ← Back to casino
        </Link>
        <p className="ui-eyebrow mt-6">Elixir component workbench</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Live Wins Feed Lab
        </h1>
        <p className="ui-body mt-2 max-w-2xl">
          Isolated page for working on <code className="text-purple-200">LiveWinsFeed.tsx</code> and its card tiers.
        </p>

        {/* Live component */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#0d0718]/60 p-5 sm:p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-300/80">
            Live Component (&lt;LiveWinsFeed /&gt;)
          </p>
          <LiveWinsFeed />
        </section>

        {/* Static 3-tier reference cards */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-[#0d0718]/60 p-5 sm:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-purple-300/80">
            All 3 Tiers (Static Reference)
          </p>
          <svg className="sr-only" aria-hidden="true">
            <filter id="lab-fizzy-noise" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.11" numOctaves="3" seed="7" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>

          <div className="flex flex-wrap items-center gap-4">
            {/* Base */}
            <div className="flex min-w-[260px] items-center gap-3 rounded-lg border border-purple-300/10 bg-dicey-card px-4 py-2">
              <img src="/games/pragmaticexternal_SweetBonanza.webp" alt="Sweet Bonanza" className="h-12 w-10 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <VipBadge src="/vip/elixir/tier1.svg" alt="Bronze" level={1} className="size-6 shrink-0" />
                  <span className="text-sm text-gray-400">Player..</span>
                </div>
                <span className="block truncate text-xs text-gray-500">Sweet Bonanza</span>
              </div>
              <div className="flex shrink-0 flex-col items-end">
                <div className="flex items-center gap-1">
                  <img src="/crypto/usdc.svg" alt="USDC" className="size-4" />
                  <span className="text-sm font-semibold tabular-nums text-white">124.50</span>
                </div>
                <span className="mt-0.5 rounded px-1.5 py-0.5 text-xs font-bold tabular-nums text-gray-300 bg-white/10">4x</span>
              </div>
            </div>

            {/* Big 10x+ */}
            <div className="flex min-w-[260px] items-center gap-3 rounded-lg border border-purple-300/10 bg-dicey-card px-4 py-2">
              <img src="/games/originals/limbo-thumb.webp" alt="Limbo" className="h-12 w-10 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <VipBadge src="/vip/elixir/tier2.svg" alt="Silver" level={2} className="size-6 shrink-0" />
                  <span className="text-sm text-gray-400">Lucky7..</span>
                </div>
                <span className="block truncate text-xs text-gray-500">Limbo</span>
              </div>
              <div className="flex shrink-0 flex-col items-end">
                <div className="flex items-center gap-1">
                  <img src="/crypto/usdc.svg" alt="USDC" className="size-4" />
                  <span className="text-sm font-semibold tabular-nums text-white">1.37k</span>
                </div>
                <span className="mt-0.5 rounded px-1.5 py-0.5 text-xs font-bold tabular-nums text-lime-300 bg-lime-400/15">20x</span>
              </div>
            </div>

            {/* Mega 100x+ */}
            <div className="relative min-w-[260px]">
              <div aria-hidden="true" className="pointer-events-none absolute -inset-[2px] rounded-[10px]">
                <div className="win-card-fizzy absolute inset-0 rounded-[10px]" style={{ filter: "url(#lab-fizzy-noise)" }} />
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
              </div>
              <div className="relative flex items-center gap-3 overflow-hidden rounded-lg bg-dicey-card px-4 py-2 shadow-[inset_0_0_18px_rgba(57,255,20,0.1)]">
                <img src="/games/pragmaticexternal_HerculesandPegasus.webp" alt="Hercules and Pegasus" className="h-12 w-10 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <VipBadge src="/vip/elixir/tier3.svg" alt="Gold" level={3} className="size-6 shrink-0" />
                    <span className="text-sm text-gray-400">CoolWi..</span>
                  </div>
                  <span className="block truncate text-xs text-gray-500">Hercules and Pegasus</span>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <div className="flex items-center gap-1">
                    <img src="/crypto/usdc.svg" alt="USDC" className="size-4" />
                    <span className="text-sm font-semibold tabular-nums text-white">8.18k</span>
                  </div>
                  <span className="mt-0.5 rounded-md bg-gradient-to-b from-amber-300 to-amber-500 px-2 py-0.5 text-xs font-extrabold tabular-nums text-[#2b1400]">
                    184x
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
