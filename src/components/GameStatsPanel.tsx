"use client";

import { useEffect, useRef, useState } from "react";
import { BiCheck, BiChevronDown, BiSolidTrophy } from "react-icons/bi";
import VipBadge from "@/components/ui/VipBadge";
import { cn } from "@/lib/utils";

interface GameStatsPanelProps {
  title: string;
  provider: string;
  image: string;
  rtp?: number;
}

type StatsTab = "top" | "lucky" | "yours" | "description";
type Timeframe = "Lifetime" | "This Week" | "Today";

interface WinRow {
  rank: number;
  user: string;
  vipTier: number;
  date: string;
  bet: string;
  multiplier: string;
  payout: string;
  currency: "usdc" | "usdt";
}

const VIP_BADGES = [
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier4.svg",
  "/vip/elixir/tier5.svg",
];

const TOP_WINS: WinRow[] = [
  { rank: 1, user: "TheGoobr", vipTier: 4, date: "11/16/2026", bet: "$5,000.00", multiplier: "81.50x", payout: "$407,500.00", currency: "usdc" },
  { rank: 2, user: "perfsuo", vipTier: 3, date: "11/14/2026", bet: "$5,000.00", multiplier: "81.50x", payout: "$407,500.00", currency: "usdt" },
  { rank: 3, user: "TheGoobr", vipTier: 4, date: "11/14/2026", bet: "$5,000.00", multiplier: "81.50x", payout: "$407,500.00", currency: "usdc" },
  { rank: 4, user: "KryptonX", vipTier: 2, date: "11/12/2026", bet: "$2,500.00", multiplier: "64.20x", payout: "$160,500.00", currency: "usdc" },
  { rank: 5, user: "MoonKing", vipTier: 3, date: "11/10/2026", bet: "$1,200.00", multiplier: "92.00x", payout: "$110,400.00", currency: "usdt" },
];

const LUCKY_WINS: WinRow[] = [
  { rank: 1, user: "Tsmith96", vipTier: 1, date: "11/16/2026", bet: "$2.50", multiplier: "800.00x", payout: "$2,000.00", currency: "usdc" },
  { rank: 2, user: "Vortex77", vipTier: 2, date: "11/15/2026", bet: "$5.00", multiplier: "420.00x", payout: "$2,100.00", currency: "usdt" },
  { rank: 3, user: "LuckyElixir", vipTier: 0, date: "11/13/2026", bet: "$1.00", multiplier: "312.50x", payout: "$312.50", currency: "usdc" },
  { rank: 4, user: "NightOwl", vipTier: 1, date: "11/11/2026", bet: "$4.00", multiplier: "245.00x", payout: "$980.00", currency: "usdc" },
  { rank: 5, user: "PixelAce", vipTier: 2, date: "11/09/2026", bet: "$3.00", multiplier: "198.40x", payout: "$595.20", currency: "usdt" },
];

const YOUR_WINS: WinRow[] = [
  { rank: 1, user: "You (JD)", vipTier: 4, date: "11/17/2026", bet: "$50.00", multiplier: "14.20x", payout: "$710.00", currency: "usdc" },
  { rank: 2, user: "You (JD)", vipTier: 4, date: "11/15/2026", bet: "$25.00", multiplier: "8.40x", payout: "$210.00", currency: "usdc" },
  { rank: 3, user: "You (JD)", vipTier: 4, date: "11/12/2026", bet: "$100.00", multiplier: "3.15x", payout: "$315.00", currency: "usdt" },
];

const RANK_COLORS = ["text-amber-400", "text-slate-300", "text-amber-600"];

export default function GameStatsPanel({ title, provider, image, rtp = 99.0 }: GameStatsPanelProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<StatsTab>("top");
  const [timeframe, setTimeframe] = useState<Timeframe>("Lifetime");
  const [rowLimit, setRowLimit] = useState<number>(3);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [openMenu, setOpenMenu] = useState<"timeframe" | "limit" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  const rawRows = activeTab === "top" ? TOP_WINS : activeTab === "lucky" ? LUCKY_WINS : YOUR_WINS;
  const rows = rawRows.slice(0, rowLimit);

  return (
    <section
      aria-label={`${title} stats and wins`}
      className="w-full max-w-5xl mt-6 rounded-2xl bg-dicey-card"
    >
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02] active:!scale-100"
      >
        <div className="flex items-center gap-3">
          <img src={image} alt="" className="size-7 rounded-lg object-cover ring-1 ring-white/10" />
          <span className="text-base font-bold text-white">{title}</span>
          <span className="hidden rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-purple-200/80 sm:inline-block">
            {provider}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Record holder pill */}
          <div className="hidden items-center gap-2.5 rounded-xl border border-white/10 bg-dicey-dark px-3 py-1.5 sm:flex">
            <span className="flex items-center gap-1.5 text-xs font-bold tabular-nums text-amber-300">
              <BiSolidTrophy className="size-4 text-amber-400" />
              800.00x
            </span>
            <span className="h-3.5 w-px bg-white/10" />
            <span className="flex items-center gap-1.5 text-xs font-medium text-purple-100">
              <VipBadge src={VIP_BADGES[1]} alt="Silver" className="size-4" />
              Tsmith96
            </span>
          </div>

          <span className="grid size-8 place-items-center rounded-lg bg-white/5 text-purple-200">
            <BiChevronDown className={cn("size-5 transition-transform duration-200", isOpen && "rotate-180")} />
          </span>
        </div>
      </button>

      {/* Smooth accordion body */}
      <div
        aria-hidden={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
        )}
      >
        <div className={cn("min-w-0", isOpen ? "overflow-visible" : "overflow-hidden")}>
          <div className="min-w-0 border-t border-white/10 px-4 pb-5 pt-4 sm:px-5">
          {/* Tabs + Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div role="tablist" aria-label="Game stats views" className="grid w-full grid-cols-4 rounded-xl bg-dicey-dark p-1 sm:inline-flex sm:w-auto">
              {(
                [
                  ["top", "Top Wins"],
                  ["lucky", "Lucky Wins"],
                  ["yours", "Your Wins"],
                  ["description", "Info"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-2 py-1.5 text-[11px] font-semibold transition-colors duration-150 sm:px-3 sm:text-xs",
                    activeTab === id
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {id === "description" ? (
                    <>
                      <span className="sm:hidden">Details</span>
                      <span className="hidden sm:inline">Description</span>
                    </>
                  ) : (
                    label
                  )}
                </button>
              ))}
            </div>

            {activeTab !== "description" && (
              <div ref={menuRef} className="relative flex items-center gap-2">
                {/* Timeframe custom dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openMenu === "timeframe"}
                    onClick={() => setOpenMenu((m) => (m === "timeframe" ? null : "timeframe"))}
                    className="flex items-center gap-1.5 rounded-lg border border-purple-300/15 bg-dicey-dark px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-purple-300/35"
                  >
                    <span>{timeframe}</span>
                    <BiChevronDown className={cn("size-4 text-purple-300/80 transition-transform duration-150", openMenu === "timeframe" && "rotate-180")} />
                  </button>
                  {openMenu === "timeframe" && (
                    <div
                      role="listbox"
                      aria-label="Timeframe"
                      className="absolute right-0 top-full z-30 mt-1.5 w-32 rounded-xl border border-purple-300/15 bg-dicey-card-elevated p-1 shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
                    >
                      {(["Lifetime", "This Week", "Today"] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          role="option"
                          aria-selected={timeframe === opt}
                          onClick={() => {
                            setTimeframe(opt);
                            setOpenMenu(null);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                            timeframe === opt
                              ? "bg-white/10 text-white"
                              : "text-purple-200/75 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span>{opt}</span>
                          {timeframe === opt && <BiCheck className="size-4 text-green-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Row limit custom dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openMenu === "limit"}
                    onClick={() => setOpenMenu((m) => (m === "limit" ? null : "limit"))}
                    className="flex items-center gap-1 rounded-lg border border-purple-300/15 bg-dicey-dark px-2.5 py-1.5 text-xs font-semibold tabular-nums text-white transition-colors hover:border-purple-300/35"
                  >
                    <span>{rowLimit}</span>
                    <BiChevronDown className={cn("size-4 text-purple-300/80 transition-transform duration-150", openMenu === "limit" && "rotate-180")} />
                  </button>
                  {openMenu === "limit" && (
                    <div
                      role="listbox"
                      aria-label="Rows to show"
                      className="absolute right-0 top-full z-30 mt-1.5 w-20 rounded-xl border border-purple-300/15 bg-dicey-card-elevated p-1 shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
                    >
                      {[3, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          role="option"
                          aria-selected={rowLimit === num}
                          onClick={() => {
                            setRowLimit(num);
                            setOpenMenu(null);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium tabular-nums transition-colors",
                            rowLimit === num
                              ? "bg-white/10 text-white"
                              : "text-purple-200/75 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span>{num}</span>
                          {rowLimit === num && <BiCheck className="size-4 text-green-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {activeTab === "description" ? (
            <div className="mt-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="relative w-28 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-dicey-dark sm:w-32">
                  <img src={image} alt={title} className="aspect-[3/4] w-full object-cover" />
                  {provider === "Elixir Originals" && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b052b]/95 via-[#1b052b]/55 to-transparent px-2 pb-2.5 pt-8 text-center">
                      <p className="hero-headline text-base uppercase leading-none text-white">{title}</p>
                      <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-purple-200">
                        Elixir Originals
                      </p>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  <span className="inline-block rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-purple-200">
                    {provider === "Elixir Originals" ? "Originals" : provider}
                  </span>

                  <h3 className="text-sm font-bold text-white sm:text-base">
                    Play {title} Online With Crypto at Elixir
                  </h3>

                  <p className="text-xs leading-relaxed text-purple-200/80">
                    <span className="font-semibold text-white">{provider}&apos;s</span> {title} pairs fast, responsive rounds with transparent odds and instant crypto payouts. Set your stake, choose your target, and watch every round resolve in real time.
                  </p>
                  <p className="text-xs leading-relaxed text-purple-200/80">
                    Built for both casual spins and high-roller sessions, {title} features a theoretical{" "}
                    <span className="font-semibold text-white">{rtp.toFixed(2)}% RTP</span> ({(100 - rtp).toFixed(2)}% house edge) and provably fair verification on every outcome.
                  </p>

                  <div className="grid max-w-sm grid-cols-2 gap-2.5 pt-1 text-xs">
                    <div className="rounded-xl border border-white/10 bg-dicey-dark px-3.5 py-2.5">
                      <p className="text-purple-300/70">Theoretical RTP</p>
                      <p className="mt-0.5 text-sm font-bold tabular-nums text-white">{rtp.toFixed(2)}%</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-dicey-dark px-3.5 py-2.5">
                      <p className="text-purple-300/70">House Edge</p>
                      <p className="mt-0.5 text-sm font-bold tabular-nums text-green-400">{(100 - rtp).toFixed(2)}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collapsible Quick Guide with fade + Read More button */}
              <div className="relative mt-5">
                <h4 className="text-xs font-bold text-purple-200/90">
                  The Quick Guide to Elixir {title}
                </h4>
                <div
                  className={cn(
                    "mt-1.5 space-y-1.5 text-xs leading-relaxed text-purple-200/70",
                    !isDescExpanded && "max-h-12 overflow-hidden"
                  )}
                >
                  <p>
                    1. Pick your wager size in USDC, USDT, or supported crypto and confirm your risk settings before starting the round.
                  </p>
                  <p>
                    2. Track live multipliers and recent Top Wins in the leaderboard tabs above to see how other players are pacing their sessions.
                  </p>
                  <p>
                    3. Verify any round&apos;s fairness anytime—every result is deterministically generated and auditable.
                  </p>
                </div>

                {!isDescExpanded && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-dicey-card via-dicey-card/85 to-transparent"
                  />
                )}

                <div className={cn("relative z-10 flex justify-center", isDescExpanded ? "mt-4" : "-mt-2")}>
                  <button
                    type="button"
                    onClick={() => setIsDescExpanded((v) => !v)}
                    className="rounded-lg border border-white/10 bg-dicey-card-elevated px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:border-purple-300/30 hover:bg-white/10"
                  >
                    {isDescExpanded ? "Show Less" : "Read More"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 w-full min-w-0 overflow-x-auto overscroll-x-contain">
              <table className="w-full sm:min-w-[600px] border-collapse text-left text-xs">
                <thead>
                  <tr className="text-purple-300/65">
                    <th className="px-2 sm:px-3 pb-3 font-medium">Rank</th>
                    <th className="px-2 sm:px-3 pb-3 font-medium">User</th>
                    <th className="hidden sm:table-cell px-3 pb-3 font-medium">Date</th>
                    <th className="hidden sm:table-cell px-3 pb-3 font-medium">Bet</th>
                    <th className="px-2 sm:px-3 pb-3 font-medium">Mult.</th>
                    <th className="px-2 sm:px-3 pb-3 text-right font-medium">Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {rows.map((row, idx) => (
                    <tr
                      key={`${row.rank}-${row.user}-${row.date}`}
                      className={cn(
                        "transition-colors hover:bg-white/[0.04]",
                        idx % 2 === 1 && "bg-black/25"
                      )}
                    >
                      <td className="rounded-l-xl px-2 sm:px-3 py-3 font-bold text-white whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 sm:gap-2">
                          <BiSolidTrophy className={cn("size-3.5 sm:size-4 shrink-0", RANK_COLORS[idx] ?? "text-purple-300/60")} />
                          {row.rank === 1 ? "1st" : row.rank === 2 ? "2nd" : row.rank === 3 ? "3rd" : `${row.rank}th`}
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 py-3 font-semibold text-white max-w-[100px] sm:max-w-none">
                        <span className="inline-flex max-w-full items-center gap-1.5 sm:gap-2">
                          <VipBadge src={VIP_BADGES[row.vipTier]} alt="VIP" className="size-4 sm:size-5 shrink-0" />
                          <span className="truncate">{row.user}</span>
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-3 py-3 tabular-nums text-purple-200/70">{row.date}</td>
                      <td className="hidden sm:table-cell px-3 py-3 font-semibold tabular-nums text-white">
                        <span className="inline-flex items-center gap-1.5">
                          {row.bet}
                          <img src={`/crypto/${row.currency}.svg`} alt={row.currency.toUpperCase()} className="size-4" />
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 py-3 font-medium tabular-nums text-purple-200 whitespace-nowrap">{row.multiplier}</td>
                      <td className="rounded-r-xl px-2 sm:px-3 py-3 text-right font-bold tabular-nums text-green-400 whitespace-nowrap">
                        <span className="inline-flex items-center justify-end gap-1 sm:gap-1.5">
                          {row.payout}
                          <img src={`/crypto/${row.currency}.svg`} alt={row.currency.toUpperCase()} className="size-3.5 sm:size-4 shrink-0" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}
