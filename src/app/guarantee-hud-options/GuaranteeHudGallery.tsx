"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BiChevronDown, BiLinkExternal, BiShield, BiTimeFive, BiX } from "react-icons/bi";
import { cn } from "@/lib/utils";

function formatTime(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

export default function GuaranteeHudGallery() {
  const [usedAmount, setUsedAmount] = useState(35);
  const [secondsLeft, setSecondsLeft] = useState(14 * 3600 + 28 * 60 + 42);
  const [headerPopoverOpen, setHeaderPopoverOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const max = 100;
  const remaining = Math.max(0, max - usedAmount);
  const pct = Math.min(100, (usedAmount / max) * 100);
  const timeStr = formatTime(secondsLeft);

  return (
    <div className="min-h-screen bg-dicey-darker px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="ui-eyebrow uppercase tracking-[0.08em]">NON-INTRUSIVE HUD EXPLORATION</p>
            <h1 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-white">
              Alchemist&apos;s Guarantee — 4 Placement Options
            </h1>
            <p className="ui-body mt-1 max-w-2xl">
              In-flow and docked alternatives to a floating toast so the active guarantee never overlaps page content.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-dicey-card-elevated"
          >
            Back to App
            <BiLinkExternal className="size-3.5" />
          </Link>
        </div>

        {/* Shared Interactive Controls */}
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/10 bg-dicey-card px-5 py-4">
          <div className="flex flex-1 flex-wrap items-center gap-6">
            <div className="min-w-[220px] flex-1">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#ded5eb]">Simulated Coverage Used</span>
                <span className="font-mono font-semibold text-[#39ff14]">${usedAmount} / $100</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={usedAmount}
                onChange={(e) => setUsedAmount(Number(e.target.value))}
                className="w-full accent-[#39ff14]"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-[#b7a9ca]">
              <BiTimeFive className="size-4 text-[#39ff14]" />
              <span>Live timer:</span>
              <span className="font-mono font-semibold text-white tabular-nums">{timeStr}</span>
            </div>
          </div>
        </div>

        {/* OPTION 01: Inline Top Banner (In-Flow above Hero) */}
        <section className="space-y-3 rounded-2xl border border-white/10 bg-dicey-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-mono text-xs font-bold text-[#39ff14]">01</span>
              <h2 className="inline-block ml-2 text-base font-bold text-white">
                Inline Top Strip (Above Hero / Below Header)
              </h2>
              <p className="mt-0.5 text-xs text-[#b7a9ca]">
                Sits in normal document flow right above the hero banners — pushes content down cleanly with zero overlap.
              </p>
            </div>
            <span className="rounded-full border border-[#39ff14]/35 bg-[#39ff14]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#39ff14]">
              Zero Overlap
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-dicey-darker p-4">
            {/* Simulated Inline Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#39ff14]/35 bg-dicey-card px-4 py-2.5">
              <div className="flex items-center gap-3">
                <div className="grid size-8 shrink-0 place-items-center rounded-lg border border-[#39ff14]/35 bg-[#39ff14]/15 text-[#39ff14]">
                  <BiShield className="size-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Alchemist&apos;s Guarantee Active</span>
                    <span className="hidden text-[11px] text-[#b7a9ca] sm:inline">
                      — First bet backed 100% up to $100
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-1.5 w-28 overflow-hidden rounded-full bg-dicey-darker">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.max(pct, usedAmount > 0 ? 4 : 0)}%`,
                        background: "linear-gradient(90deg, #32cd32 0%, #39ff14 100%)",
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-white">
                    <span className="text-[#39ff14]">${usedAmount}</span>
                    <span className="text-[#b7a9ca]"> / $100</span>
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 rounded-lg bg-dicey-dark px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums text-[#d8b4fe]">
                  <BiTimeFive className="size-3.5 text-[#39ff14]" />
                  {timeStr}
                </span>

                <button
                  type="button"
                  aria-label="Dismiss"
                  className="grid size-6 place-items-center rounded-md text-gray-400 hover:bg-white/10 hover:text-white"
                >
                  <BiX className="size-4" />
                </button>
              </div>
            </div>

            {/* Simulated Hero below */}
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="h-20 rounded-xl border border-white/5 bg-dicey-card/40 p-3 text-xs text-[#b7a9ca]">
                Hero Banner 1 (Cleanly below, never covered)
              </div>
              <div className="h-20 rounded-xl border border-white/5 bg-dicey-card/40 p-3 text-xs text-[#b7a9ca]">
                Hero Banner 2
              </div>
            </div>
          </div>
        </section>

        {/* OPTION 02: Header Pill + Expandable Popover */}
        <section className="space-y-3 rounded-2xl border border-white/10 bg-dicey-card p-6">
          <div>
            <span className="font-mono text-xs font-bold text-[#39ff14]">02</span>
            <h2 className="inline-block ml-2 text-base font-bold text-white">
              Header Status Pill (Next to Balance)
            </h2>
            <p className="mt-0.5 text-xs text-[#b7a9ca]">
              Lives inside the top bar right beside your wallet balance. Click the pill below to toggle its detail popover.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-dicey-darker p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-dicey-card/80 px-4 py-2.5">
              <span className="text-xs font-semibold text-[#b7a9ca]">Header Bar</span>

              <div className="relative flex items-center gap-2">
                {/* Guarantee Pill */}
                <button
                  type="button"
                  onClick={() => setHeaderPopoverOpen((o) => !o)}
                  className="inline-flex items-center gap-2 rounded-full border border-[#39ff14]/45 bg-[#39ff14]/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#39ff14]/15"
                >
                  <BiShield className="size-4 text-[#39ff14]" />
                  <span className="tabular-nums">${remaining} left</span>
                  <span className="hidden font-mono text-[11px] text-[#d8b4fe] sm:inline">• {timeStr}</span>
                  <BiChevronDown className={cn("size-3.5 text-[#b7a9ca] transition-transform", headerPopoverOpen && "rotate-180")} />
                </button>

                {/* Simulated Balance Pill */}
                <div className="rounded-full border border-white/10 bg-dicey-dark px-3.5 py-1.5 text-xs font-bold tabular-nums text-white">
                  $1,619.45
                </div>

                {headerPopoverOpen && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-2xl border border-[#39ff14]/40 bg-dicey-card p-4 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Alchemist&apos;s Guarantee</span>
                      <span className="font-mono text-[11px] text-[#d8b4fe]">{timeStr}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#b7a9ca]">
                      First bet backed 100% — refunded as bonus funds if it misses.
                    </p>
                    <div className="mt-3 space-y-1.5">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-dicey-darker">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.max(pct, usedAmount > 0 ? 4 : 0)}%`,
                            background: "linear-gradient(90deg, #32cd32 0%, #39ff14 100%)",
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] tabular-nums">
                        <span className="text-[#39ff14] font-semibold">${usedAmount} / $100 used</span>
                        <span className="text-[#ded5eb]">${remaining} left</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* OPTION 03 & 04 Side-by-Side */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* OPTION 03: Sidebar Boost Card */}
          <section className="space-y-3 rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#39ff14]">03</span>
              <h2 className="inline-block ml-2 text-base font-bold text-white">
                Sidebar Active Perk Card
              </h2>
              <p className="mt-0.5 text-xs text-[#b7a9ca]">
                Pinned inside the left sidebar — always visible while browsing, zero main-canvas overlap.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-dicey-darker p-4">
              <div className="w-60 space-y-2.5 rounded-xl border border-[#39ff14]/35 bg-dicey-card p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="grid size-7 place-items-center rounded-lg bg-[#39ff14]/15 text-[#39ff14]">
                      <BiShield className="size-4" />
                    </div>
                    <span className="text-xs font-bold text-white">King&apos;s Guarantee</span>
                  </div>
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39ff14] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#39ff14]" />
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-dicey-darker">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.max(pct, usedAmount > 0 ? 4 : 0)}%`,
                        background: "linear-gradient(90deg, #32cd32 0%, #39ff14 100%)",
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] tabular-nums">
                    <span className="font-semibold text-[#39ff14]">${usedAmount} / $100</span>
                    <span className="font-mono text-[#d8b4fe]">{timeStr}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* OPTION 04: Compact Inline Hero Badge / Ribbon */}
          <section className="space-y-3 rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#39ff14]">04</span>
              <h2 className="inline-block ml-2 text-base font-bold text-white">
                Hero Card Active State (In-Place)
              </h2>
              <p className="mt-0.5 text-xs text-[#b7a9ca]">
                Instead of a separate widget, the Hero Banner itself flips to an &ldquo;Active Guarantee&rdquo; progress state once claimed.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-dicey-darker p-4">
              <div className="relative overflow-hidden rounded-xl border border-[#39ff14]/40 bg-dicey-card p-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 w-40 opacity-30"
                  style={{
                    backgroundImage: "url(/videos/alchemist-midas-brew-poster.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "75% 25%",
                    maskImage: "linear-gradient(to left, black 15%, transparent 95%)",
                    WebkitMaskImage: "linear-gradient(to left, black 15%, transparent 95%)",
                  }}
                />
                <div className="relative space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#39ff14]/15 px-2 py-0.5 text-[10px] font-bold uppercase text-[#39ff14]">
                      Active Guarantee
                    </span>
                    <span className="font-mono text-[11px] text-[#d8b4fe]">{timeStr} left</span>
                  </div>
                  <p className="text-base font-black text-white">${remaining} Protection Remaining</p>
                  <div className="max-w-xs space-y-1">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-dicey-darker">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.max(pct, usedAmount > 0 ? 4 : 0)}%`,
                          background: "linear-gradient(90deg, #32cd32 0%, #39ff14 100%)",
                        }}
                      />
                    </div>
                    <p className="text-[11px] text-[#b7a9ca] tabular-nums">
                      ${usedAmount} of $100 backed wager used
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* OPTIONS 05 & 06: More Visual Styles */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* OPTION 05: Alchemist Potion Vial Gauge */}
          <section className="space-y-3 rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#39ff14]">05</span>
              <h2 className="ml-2 inline-block text-base font-bold text-white">
                Potion Vial Gauge (Themed)
              </h2>
              <p className="mt-0.5 text-xs text-[#b7a9ca]">
                A glowing Elixir flask shows remaining protection visually as liquid level, paired with live stats.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-dicey-darker p-5">
              <div className="flex items-center gap-4 rounded-xl border border-[#39ff14]/35 bg-dicey-card p-4">
                {/* Visual Potion Flask */}
                <div className="relative flex h-16 w-11 shrink-0 flex-col items-center justify-end overflow-hidden rounded-b-2xl rounded-t-lg border-2 border-white/25 bg-dicey-darker p-0.5">
                  <div
                    className="w-full rounded-b-xl transition-all duration-300"
                    style={{
                      height: `${Math.max(100 - pct, 8)}%`,
                      background: "linear-gradient(180deg, #39ff14 0%, #228b22 100%)",
                      boxShadow: "0 0 14px rgba(57, 255, 20, 0.55)",
                    }}
                  />
                  <span className="absolute inset-0 grid place-items-center font-mono text-[10px] font-black text-white drop-shadow">
                    ${remaining}
                  </span>
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-white">Alchemist&apos;s Guarantee</span>
                    <span className="font-mono text-[11px] font-semibold text-[#d8b4fe] tabular-nums">
                      {timeStr}
                    </span>
                  </div>
                  <p className="text-xs text-[#b7a9ca]">
                    <strong className="text-[#39ff14]">${remaining}</strong> protection remaining •{" "}
                    <span className="tabular-nums">${usedAmount} / $100 used</span>
                  </p>
                  <p className="text-[11px] text-purple-300/80">
                    100% refunded in bonus funds if your first bet misses
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* OPTION 06: Segmented 10-Block Energy Bar */}
          <section className="space-y-3 rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#39ff14]">06</span>
              <h2 className="ml-2 inline-block text-base font-bold text-white">
                10-Segment Energy Meter
              </h2>
              <p className="mt-0.5 text-xs text-[#b7a9ca]">
                Each glowing block equals $10 of backed wager — crisp at a glance without reading tiny numbers.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-dicey-darker p-5">
              <div className="space-y-3 rounded-xl border border-[#39ff14]/35 bg-dicey-card p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <BiShield className="size-4 text-[#39ff14]" />
                    <span className="text-xs font-bold text-white">Alchemist&apos;s Guarantee</span>
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#d8b4fe] tabular-nums">
                    <BiTimeFive className="size-3.5 text-[#39ff14]" />
                    {timeStr}
                  </span>
                </div>

                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: 10 }, (_, idx) => {
                    const filled = (idx + 1) * 10 <= usedAmount;
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "h-3 rounded-sm transition-all duration-200",
                          filled
                            ? "bg-[#39ff14] shadow-[0_0_8px_rgba(57,255,20,0.45)]"
                            : "bg-dicey-darker border border-white/10"
                        )}
                      />
                    );
                  })}
                </div>

                <div className="flex items-center justify-between text-[11px] tabular-nums">
                  <span className="font-semibold text-[#39ff14]">${usedAmount} / $100 used</span>
                  <span className="text-[#ded5eb]">${remaining} remaining</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* OPTIONS 07 & 08: Ultra-Compact */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* OPTION 07: Ultra-Slim 1-Line Pill */}
          <section className="space-y-3 rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#39ff14]">07</span>
              <h2 className="ml-2 inline-block text-base font-bold text-white">
                Ultra-Slim Single-Line Pill
              </h2>
              <p className="mt-0.5 text-xs text-[#b7a9ca]">
                Minimal footprint — fits cleanly in a corner or above a game table without blocking anything.
              </p>
            </div>

            <div className="flex items-center justify-center rounded-2xl border border-white/10 bg-dicey-darker p-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#39ff14]/45 bg-dicey-card px-4 py-2 shadow-lg">
                <BiShield className="size-4 text-[#39ff14]" />
                <span className="text-xs font-bold text-white">Guarantee</span>
                <span className="h-3 w-px bg-white/15" />
                <span className="text-xs font-semibold tabular-nums text-[#39ff14]">
                  ${remaining} left
                </span>
                <span className="h-3 w-px bg-white/15" />
                <span className="font-mono text-[11px] font-semibold tabular-nums text-[#d8b4fe]">
                  {timeStr}
                </span>
              </div>
            </div>
          </section>

          {/* OPTION 08: Docked Bottom Status Bar */}
          <section className="space-y-3 rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#39ff14]">08</span>
              <h2 className="ml-2 inline-block text-base font-bold text-white">
                Docked Bottom Status Bar
              </h2>
              <p className="mt-0.5 text-xs text-[#b7a9ca]">
                Anchored cleanly at the bottom of the viewport with a subtle glowing top edge.
              </p>
            </div>

            <div className="flex flex-col justify-end rounded-2xl border border-white/10 bg-dicey-darker pt-10">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-b-2xl border-t border-[#39ff14]/40 bg-dicey-card px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39ff14] opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-[#39ff14]" />
                  </span>
                  <span className="text-xs font-bold text-white">Alchemist&apos;s Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-xs tabular-nums">
                  <span className="font-semibold text-[#39ff14]">${usedAmount} / $100</span>
                  <span className="font-mono text-[11px] text-[#d8b4fe]">{timeStr}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
