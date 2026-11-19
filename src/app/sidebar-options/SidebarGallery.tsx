"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bank,
  Basketball,
  Bomb,
  Cards,
  CaretDown,
  CircleNotch,
  Coin,
  DiamondsFour,
  DiceFive,
  Football,
  GameController,
  Gift,
  Hockey,
  House,
  MagnifyingGlass,
  Rocket,
  SoccerBall,
  Spade,
  Stack,
  TennisBall,
  VideoCamera,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const ORIGINALS = [
  { id: "dice", label: "Dice", icon: DiceFive },
  { id: "mines", label: "Mines", icon: Bomb },
  { id: "limbo", label: "Limbo", icon: Rocket },
  { id: "coinflip", label: "Coinflip", icon: Coin },
  { id: "blackjack-orig", label: "Blackjack", icon: Cards },
];

const CASINO = [
  { id: "slots", label: "Slots", icon: DiamondsFour },
  { id: "live", label: "Live Casino", icon: VideoCamera },
  { id: "roulette", label: "Roulette", icon: CircleNotch },
  { id: "blackjack", label: "Blackjack", icon: Cards },
];

const SPORTS = [
  { id: "football", label: "Football", icon: SoccerBall },
  { id: "basketball", label: "Basketball", icon: Basketball },
  { id: "tennis", label: "Tennis", icon: TennisBall },
  { id: "hockey", label: "Ice Hockey", icon: Hockey },
  { id: "nfl", label: "American Football", icon: Football },
  { id: "esports", label: "Esports", icon: GameController },
];

const EXTRAS = [
  { id: "promotions", label: "Promotions", icon: Gift },
  { id: "house", label: "Be the House", icon: Bank },
];

interface StyleMeta {
  id: number;
  name: string;
  tag: string;
  note: string;
}

const STYLES: StyleMeta[] = [
  { id: 1, name: "Floating Glass Rail", tag: "Refined Current", note: "Translucent violet panel, subtle top glow, crisp 1px border, and tighter spacing." },
  { id: 2, name: "Obsidian Dock", tag: "Icon Tiles", note: "Matte charcoal rail with 28px rounded icon boxes and a sharp lime active bar." },
  { id: 3, name: "Dual-Rail Split", tag: "2-Column", note: "Slim 52px primary icon rail on the far left paired with a clean sub-nav column." },
  { id: 4, name: "Pill-First Modern", tag: "Labeled Switch", note: "Full-pill active states, labeled Casino / Sports tabs, and clean section dividers." },
  { id: 5, name: "Carded Sections", tag: "Grouped Boxes", note: "Each nav section sits inside its own recessed dark card for strong visual grouping." },
  { id: 6, name: "Compact Slim Rail", tag: "High Density", note: "Narrower 216px width, tight rows, micro headers, and a slim promo bar." },
  { id: 7, name: "Neon Emerald Accent", tag: "Lime Theme", note: "Aligns the active state and mode switch with Elixir's electric lime CTA color." },
  { id: 8, name: "Editorial Minimal", tag: "Borderless", note: "Quiet, flat dark surface with no icon boxes—just crisp type and a subtle dot indicator." },
  { id: 9, name: "Originals Tile Grid", tag: "2-Col Grid", note: "Elixir Originals displayed as a 2-column mini tile grid above clean Casino list rows." },
  { id: 10, name: "Search + Count Badges", tag: "Utility", note: "Includes a live game filter input at the top and item count badges on group headers." },
];

function PromoMiniCard({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="rounded-xl border border-lime-400/25 bg-gradient-to-r from-[#1d3b18] to-[#172038] p-2.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-lime-300">Weekend Offer</p>
            <p className="text-xs font-extrabold text-white">50 Free Spins</p>
          </div>
          <span className="rounded-lg bg-[#39ff14] px-2.5 py-1 text-[11px] font-bold text-[#071a04]">
            Claim
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-300/15 bg-gradient-to-br from-[#341c56] via-[#22123c] to-[#150b29] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-lime-300">Weekend offer</p>
      <p className="mt-0.5 text-sm font-black text-white">50 free spins</p>
      <p className="mt-0.5 text-[11px] leading-snug text-purple-200/75">On your next deposit of $20+</p>
      <div className="mt-2.5 rounded-lg bg-gradient-to-b from-[#39ff14] to-[#228b22] py-1.5 text-center text-xs font-bold text-[#071a04]">
        Get offer
      </div>
    </div>
  );
}

function SidebarExample({ id }: { id: number }) {
  const [tab, setTab] = useState<"casino" | "sports">("casino");
  const [active, setActive] = useState("dice");
  const [query, setQuery] = useState("");
  const [origOpen, setOrigOpen] = useState(true);
  const [casinoOpen, setCasinoOpen] = useState(true);

  const filteredOriginals = query
    ? ORIGINALS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : ORIGINALS;
  const filteredCasino = query
    ? CASINO.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : CASINO;

  const isEmerald = id === 7;
  const isObsidian = id === 2;
  const isMinimal = id === 8;
  const isCompact = id === 6;

  // Style 3: Dual-Rail Split
  if (id === 3) {
    return (
      <div className="flex h-[540px] w-[264px] overflow-hidden rounded-2xl border border-white/10 bg-[#170e28] shadow-2xl">
        {/* Left icon rail */}
        <div className="flex w-[54px] shrink-0 flex-col items-center justify-between border-r border-white/10 bg-[#110a1f] py-3">
          <div className="flex flex-col items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-purple-500/20 text-purple-200">
              <House weight="fill" className="size-4" />
            </div>
            <div className="my-1 h-px w-6 bg-white/10" />
            <button
              type="button"
              onClick={() => setTab("casino")}
              className={cn(
                "grid size-9 place-items-center rounded-xl transition-colors",
                tab === "casino" ? "bg-[#8b5cf6] text-white shadow-md" : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
              title="Casino"
            >
              <Spade weight="fill" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setTab("sports")}
              className={cn(
                "grid size-9 place-items-center rounded-xl transition-colors",
                tab === "sports" ? "bg-[#8b5cf6] text-white shadow-md" : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
              title="Sports"
            >
              <Football weight="fill" className="size-4" />
            </button>
            <div className="my-1 h-px w-6 bg-white/10" />
            <button
              type="button"
              onClick={() => setActive("promotions")}
              className={cn(
                "grid size-9 place-items-center rounded-xl transition-colors",
                active === "promotions" ? "bg-white/15 text-white" : "text-gray-400 hover:bg-white/5"
              )}
              title="Promotions"
            >
              <Gift weight="fill" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setActive("house")}
              className={cn(
                "grid size-9 place-items-center rounded-xl transition-colors",
                active === "house" ? "bg-white/15 text-white" : "text-gray-400 hover:bg-white/5"
              )}
              title="Be the House"
            >
              <Bank weight="fill" className="size-4" />
            </button>
          </div>
          <span className="rounded bg-purple-400/15 px-1.5 py-0.5 text-[8px] font-bold uppercase text-purple-300">
            Beta
          </span>
        </div>

        {/* Right sub-nav */}
        <div className="flex flex-1 flex-col justify-between p-3">
          <div className="space-y-4 overflow-y-auto">
            <img src="/elixir-logo.png" alt="Elixir" className="h-auto w-24" />
            {tab === "casino" ? (
              <>
                <div>
                  <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-purple-300/80">
                    Original Games
                  </p>
                  <div className="space-y-0.5">
                    {ORIGINALS.map(({ id: itemId, label, icon: Icon }) => (
                      <button
                        key={itemId}
                        type="button"
                        onClick={() => setActive(itemId)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                          active === itemId ? "bg-white/10 text-white" : "text-purple-200/70 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Icon weight="fill" className="size-4 shrink-0" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-purple-300/80">
                    Casino
                  </p>
                  <div className="space-y-0.5">
                    {CASINO.map(({ id: itemId, label, icon: Icon }) => (
                      <button
                        key={itemId}
                        type="button"
                        onClick={() => setActive(itemId)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                          active === itemId ? "bg-white/10 text-white" : "text-purple-200/70 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Icon weight="fill" className="size-4 shrink-0" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-purple-300/80">
                  Sports
                </p>
                <div className="space-y-0.5">
                  {SPORTS.map(({ id: itemId, label, icon: Icon }) => (
                    <button
                      key={itemId}
                      type="button"
                      onClick={() => setActive(itemId)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
                        active === itemId ? "bg-white/10 text-white" : "text-purple-200/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <Icon weight="fill" className="size-4 shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <PromoMiniCard compact />
        </div>
      </div>
    );
  }

  return (
    <aside
      className={cn(
        "flex h-[540px] flex-col justify-between overflow-y-auto rounded-2xl p-3.5 shadow-2xl",
        isCompact ? "w-[216px] p-3" : "w-[244px]",
        isObsidian && "border border-white/10 bg-[#111116]",
        isMinimal && "bg-[#150e23]",
        isEmerald && "border border-emerald-400/20 bg-gradient-to-b from-[#17122b] to-[#0b1815]",
        !isObsidian && !isMinimal && !isEmerald && "border border-purple-300/15 bg-[#231738]"
      )}
    >
      <div className="space-y-3">
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-1 pt-0.5">
          <div className="flex items-center gap-2">
            <img src="/elixir-logo.png" alt="Elixir" className={cn("h-auto object-contain", isCompact ? "w-24" : "w-28")} />
            <span className="rounded border border-purple-300/25 bg-purple-300/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-200">
              Beta
            </span>
          </div>
        </div>

        {/* Search for Style 10 */}
        {id === 10 && (
          <label className="relative block">
            <MagnifyingGlass className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-purple-300/60" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter games..."
              className="w-full rounded-xl border border-white/10 bg-black/30 py-1.5 pl-8 pr-3 text-xs text-white placeholder-purple-300/50 outline-none focus:border-purple-400/60"
            />
          </label>
        )}

        {/* Mode Switch */}
        {id === 4 || id === 7 ? (
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-black/35 p-1">
            {(
              [
                ["casino", "Casino", Spade],
                ["sports", "Sports", Football],
              ] as const
            ).map(([key, label, Icon]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold transition-colors",
                  tab === key
                    ? isEmerald
                      ? "bg-[#39ff14] text-[#071a04]"
                      : "bg-purple-500 text-white shadow"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Icon weight="fill" className="size-3.5" />
                {label}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-black/30 p-1">
            <button
              type="button"
              onClick={() => setTab("casino")}
              className={cn(
                "grid place-items-center rounded-lg py-1.5 transition-colors",
                tab === "casino" ? "bg-purple-400/90 text-[#1b052b] shadow" : "text-gray-400 hover:text-white"
              )}
              aria-label="Casino"
            >
              <Spade weight="fill" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setTab("sports")}
              className={cn(
                "grid place-items-center rounded-lg py-1.5 transition-colors",
                tab === "sports" ? "bg-purple-400/90 text-[#1b052b] shadow" : "text-gray-400 hover:text-white"
              )}
              aria-label="Sports"
            >
              <Football weight="fill" className="size-4" />
            </button>
          </div>
        )}

        {/* Navigation Groups */}
        {tab === "casino" ? (
          <div className="space-y-3">
            {/* Originals */}
            <div className={cn(id === 5 && "rounded-xl border border-white/10 bg-[#160e26] p-2.5")}>
              <button
                type="button"
                onClick={() => setOrigOpen((v) => !v)}
                className="mb-1.5 flex w-full items-center justify-between px-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-300/75 hover:text-white"
              >
                <span className="flex items-center gap-1.5">
                  <Stack weight="fill" className="size-3.5" />
                  Original Games
                </span>
                <span className="flex items-center gap-1">
                  {id === 10 && (
                    <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[9px] text-purple-200">
                      {filteredOriginals.length}
                    </span>
                  )}
                  <CaretDown className={cn("size-3 transition-transform", !origOpen && "-rotate-90")} />
                </span>
              </button>

              {origOpen && (
                id === 9 ? (
                  <div className="grid grid-cols-2 gap-1.5">
                    {filteredOriginals.map(({ id: itemId, label, icon: Icon }) => (
                      <button
                        key={itemId}
                        type="button"
                        onClick={() => setActive(itemId)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-1 rounded-xl border py-2.5 text-[11px] font-semibold transition-colors",
                          active === itemId
                            ? "border-purple-400/60 bg-purple-500/20 text-white"
                            : "border-white/5 bg-white/5 text-purple-200/75 hover:border-white/15 hover:text-white"
                        )}
                      >
                        <Icon weight="fill" className="size-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {filteredOriginals.map(({ id: itemId, label, icon: Icon }) => {
                      const isActive = active === itemId;
                      return (
                        <button
                          key={itemId}
                          type="button"
                          onClick={() => setActive(itemId)}
                          className={cn(
                            "relative flex w-full items-center gap-2.5 text-left text-xs font-medium transition-colors",
                            isCompact ? "px-2 py-1" : "px-2.5 py-1.5",
                            id === 4 && "rounded-full",
                            id !== 4 && !isMinimal && "rounded-xl",
                            isActive
                              ? isEmerald
                                ? "bg-[#39ff14]/15 font-semibold text-[#39ff14]"
                                : isObsidian
                                  ? "bg-white/10 text-white"
                                  : isMinimal
                                    ? "text-white"
                                    : "bg-white/10 text-white"
                              : "text-purple-200/70 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          {isObsidian && isActive && (
                            <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[#39ff14]" />
                          )}
                          {isMinimal && isActive && (
                            <span className="size-1.5 rounded-full bg-[#39ff14]" />
                          )}
                          {isObsidian ? (
                            <span className="grid size-6 place-items-center rounded-lg bg-white/5 text-purple-200">
                              <Icon weight="fill" className="size-3.5" />
                            </span>
                          ) : (
                            <Icon weight="fill" className="size-4 shrink-0" />
                          )}
                          <span>{label}</span>
                        </button>
                      );
                    })}
                  </div>
                )
              )}
            </div>

            {/* Casino */}
            <div className={cn(id === 5 && "rounded-xl border border-white/10 bg-[#160e26] p-2.5")}>
              <button
                type="button"
                onClick={() => setCasinoOpen((v) => !v)}
                className="mb-1.5 flex w-full items-center justify-between px-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-300/75 hover:text-white"
              >
                <span className="flex items-center gap-1.5">
                  <Spade weight="fill" className="size-3.5" />
                  Casino
                </span>
                <span className="flex items-center gap-1">
                  {id === 10 && (
                    <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[9px] text-purple-200">
                      {filteredCasino.length}
                    </span>
                  )}
                  <CaretDown className={cn("size-3 transition-transform", !casinoOpen && "-rotate-90")} />
                </span>
              </button>

              {casinoOpen && (
                <div className="space-y-0.5">
                  {filteredCasino.map(({ id: itemId, label, icon: Icon }) => {
                    const isActive = active === itemId;
                    return (
                      <button
                        key={itemId}
                        type="button"
                        onClick={() => setActive(itemId)}
                        className={cn(
                          "relative flex w-full items-center gap-2.5 text-left text-xs font-medium transition-colors",
                          isCompact ? "px-2 py-1" : "px-2.5 py-1.5",
                          id === 4 ? "rounded-full" : !isMinimal && "rounded-xl",
                          isActive
                            ? isEmerald
                              ? "bg-[#39ff14]/15 font-semibold text-[#39ff14]"
                              : isMinimal
                                ? "text-white"
                                : "bg-white/10 text-white"
                            : "text-purple-200/70 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {isObsidian && isActive && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-[#39ff14]" />
                        )}
                        {isMinimal && isActive && <span className="size-1.5 rounded-full bg-[#39ff14]" />}
                        {isObsidian ? (
                          <span className="grid size-6 place-items-center rounded-lg bg-white/5 text-purple-200">
                            <Icon weight="fill" className="size-3.5" />
                          </span>
                        ) : (
                          <Icon weight="fill" className="size-4 shrink-0" />
                        )}
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={cn(id === 5 && "rounded-xl border border-white/10 bg-[#160e26] p-2.5")}>
            <p className="mb-1.5 px-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-300/75">
              Sportsbook
            </p>
            <div className="space-y-0.5">
              {SPORTS.map(({ id: itemId, label, icon: Icon }) => (
                <button
                  key={itemId}
                  type="button"
                  onClick={() => setActive(itemId)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                    active === itemId ? "bg-white/10 text-white" : "text-purple-200/70 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon weight="fill" className="size-4 shrink-0" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="h-px bg-white/10" />

        {/* Extras */}
        <div className="space-y-0.5">
          {EXTRAS.map(({ id: itemId, label, icon: Icon }) => (
            <button
              key={itemId}
              type="button"
              onClick={() => setActive(itemId)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                active === itemId ? "bg-white/10 text-white" : "text-purple-200/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon weight="fill" className="size-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Promo + Attribution */}
      <div className="mt-4 space-y-2.5">
        <PromoMiniCard compact={isCompact || id === 10 || id === 8} />
        <p className="text-center text-[10px] text-purple-300/50">
          Built &amp; Powered by <span className="font-semibold text-purple-200/70">Layer84</span>
        </p>
      </div>
    </aside>
  );
}

export default function SidebarGallery() {
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
          ← Back to casino
        </Link>
        <p className="ui-eyebrow mt-6">Elixir design lab · left navigation</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
          10 Left Navigation Variations
        </h1>
        <p className="ui-body mt-2 max-w-2xl">
          Interactive left sidebar concepts—click items or switch between Casino and Sports inside any rail to test the feel.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {STYLES.map((style) => (
            <article
              key={style.id}
              className="flex flex-col rounded-3xl border border-white/10 bg-[#0d0718]/70 p-5"
            >
              <div className="mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-purple-300">
                    {String(style.id).padStart(2, "0")}
                  </span>
                  <h2 className="text-base font-bold text-white">{style.name}</h2>
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-purple-200">
                    {style.tag}
                  </span>
                </div>
                <p className="ui-caption mt-1">{style.note}</p>
              </div>

              <div className="flex flex-1 items-center justify-center rounded-2xl bg-[#090412] p-4">
                <SidebarExample id={style.id} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
