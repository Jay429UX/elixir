"use client";

import { useState } from "react";
import {
  BiBoltCircle,
  BiChevronLeft,
  BiChevronRight,
  BiFootball,
  BiLockAlt,
  BiTrendingUp,
} from "react-icons/bi";
import BetSlip, { type BetSelection, type PlacedBet } from "./BetSlip";
import { useTab } from "@/context/TabContext";
import { cn } from "@/lib/utils";

interface Match {
  id: string;
  league: string;
  sport: "football" | "basketball" | "tennis" | "esports" | "racing" | "boost";
  homeTeam: string;
  awayTeam: string;
  homeOdds: number;
  drawOdds?: number;
  awayOdds: number;
  time: string;
  isLive?: boolean;
  homeScore?: number;
  awayScore?: number;
  minute?: string;
}

interface RaceCard {
  id: string;
  time: string;
  venue: string;
  meta: string;
  terms: string;
  runners: Array<{
    id: string;
    name: string;
    jockey: string;
    trainer: string;
    silkColor: string;
    odds: number;
    oddsLabel: string;
  }>;
}

interface BoostItem {
  id: string;
  title: string;
  subtitle: string;
  wasOdds: string;
  odds: number;
  oddsLabel: string;
}

interface InPlayRow {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: string;
  locked?: boolean;
  homeOdds: number;
  drawOdds: number;
  awayOdds: number;
}

const QUICK_FILTERS = [
  { id: "all", label: "All Events" },
  { id: "football", label: "Today's Football" },
  { id: "premier", label: "Premier League" },
  { id: "basketball", label: "NBA" },
  { id: "tennis", label: "ATP Finals" },
  { id: "esports", label: "Esports" },
] as const;

const FEATURED_MATCHES: Match[] = [
  {
    id: "f1",
    league: "Champions League",
    sport: "football",
    homeTeam: "Real Madrid",
    awayTeam: "Man City",
    homeOdds: 2.45,
    drawOdds: 3.2,
    awayOdds: 2.8,
    time: "Live",
    isLive: true,
    homeScore: 1,
    awayScore: 1,
    minute: "67'",
  },
  {
    id: "f2",
    league: "NBA",
    sport: "basketball",
    homeTeam: "LA Lakers",
    awayTeam: "Golden State",
    homeOdds: 1.85,
    awayOdds: 1.95,
    time: "Live",
    isLive: true,
    homeScore: 87,
    awayScore: 92,
    minute: "Q3",
  },
  {
    id: "f3",
    league: "ATP Finals",
    sport: "tennis",
    homeTeam: "J. Sinner",
    awayTeam: "C. Alcaraz",
    homeOdds: 1.75,
    awayOdds: 2.05,
    time: "Tomorrow 20:15",
  },
];

const UPCOMING_RACES: RaceCard[] = [
  {
    id: "r1",
    time: "22:41",
    venue: "Zia Park",
    meta: "4f 219y • Flat • Fast • 8 Runners",
    terms: "E/W 1/5 Odds, 3 Places",
    runners: [
      { id: "r1-1", name: "Hello Goodbye", jockey: "A. Juarez Jr.", trainer: "D. Cappellucci", silkColor: "#ec4899", odds: 4.0, oddsLabel: "3/1" },
      { id: "r1-2", name: "Ridgehead", jockey: "O. Andrade Jr.", trainer: "D. Martinez", silkColor: "#38bdf8", odds: 4.0, oddsLabel: "3/1" },
      { id: "r1-3", name: "Ragazza Vincente", jockey: "R. Guerra", trainer: "E. Kereluk", silkColor: "#e2e8f0", odds: 4.0, oddsLabel: "3/1" },
    ],
  },
  {
    id: "r2",
    time: "23:08",
    venue: "Zia Park",
    meta: "4f 219y • Flat • Fast • 8 Runners",
    terms: "E/W 1/5 Odds, 3 Places",
    runners: [
      { id: "r2-1", name: "Sunshine Lute", jockey: "E. Portillo Gomez", trainer: "J. Singh", silkColor: "#a855f7", odds: 3.5, oddsLabel: "5/2" },
      { id: "r2-2", name: "Juana Rumble", jockey: "E. Medellin", trainer: "E. Alcoverde", silkColor: "#14b8a6", odds: 5.0, oddsLabel: "4/1" },
      { id: "r2-3", name: "Hold My Scotch", jockey: "C. Ramos", trainer: "C. Lambert", silkColor: "#f59e0b", odds: 6.5, oddsLabel: "11/2" },
    ],
  },
  {
    id: "r3",
    time: "00:00",
    venue: "Mountaineer",
    meta: "7f 219y • Flat • Fast • 8 Runners",
    terms: "E/W 1/5 Odds, 3 Places",
    runners: [
      { id: "r3-1", name: "Some R Blessed", jockey: "L. Batista", trainer: "E. Clouston", silkColor: "#ef4444", odds: 3.25, oddsLabel: "9/4" },
      { id: "r3-2", name: "Meant To Be Lucky", jockey: "J. Stokes", trainer: "J. Hay", silkColor: "#22c55e", odds: 4.5, oddsLabel: "7/2" },
      { id: "r3-3", name: "Semper Anticus", jockey: "R. Barrios", trainer: "J. Silva", silkColor: "#eab308", odds: 7.0, oddsLabel: "6/1" },
    ],
  },
];

const BOOSTS: BoostItem[] = [
  {
    id: "boost-1",
    title: "Real Madrid, Arsenal & Bayern Munich All To Win",
    subtitle: "Featured Acca • European Midweek Special • Tomorrow 20:00",
    wasOdds: "Was 4.20",
    odds: 5.5,
    oddsLabel: "5.50",
  },
  {
    id: "boost-2",
    title: "LA Lakers & Boston Celtics Both To Win (+1.5)",
    subtitle: "NBA Enhanced Double • Tonight 01:00",
    wasOdds: "Was 2.90",
    odds: 3.6,
    oddsLabel: "3.60",
  },
  {
    id: "boost-3",
    title: "Sinner & T1 Both To Win In Straight Sets / Maps",
    subtitle: "Elixir Cross-Sport Boost • Today 18:00",
    wasOdds: "Was 3.10",
    odds: 4.0,
    oddsLabel: "4.00",
  },
];

/* Football-specific Detail Data */
const FOOTBALL_SUBTABS = [
  { id: "competitions", label: "Competitions" },
  { id: "featured", label: "Featured" },
  { id: "matches", label: "Matches" },
  { id: "inplay", label: "In-Play", badge: "6" },
  { id: "outrights", label: "Outrights", badge: "23" },
] as const;

type FlagCountry =
  | "england"
  | "italy"
  | "argentina"
  | "costarica"
  | "uruguay"
  | "dominican"
  | "chile"
  | "colombia";

const FOOTBALL_FEATURED: Array<Match & { homeCountry: FlagCountry; awayCountry: FlagCountry }> = [
  { id: "ff1", league: "International", sport: "football", homeTeam: "Argentina", awayTeam: "Costa Rica", homeCountry: "argentina", awayCountry: "costarica", homeOdds: 1.04, drawOdds: 10.0, awayOdds: 21.0, time: "Today 23:00" },
  { id: "ff2", league: "International", sport: "football", homeTeam: "Uruguay", awayTeam: "Dominican Rep.", homeCountry: "uruguay", awayCountry: "dominican", homeOdds: 1.06, drawOdds: 9.0, awayOdds: 17.0, time: "Today 23:30" },
  { id: "ff3", league: "World Cup Qual.", sport: "football", homeTeam: "Chile", awayTeam: "Colombia", homeCountry: "chile", awayCountry: "colombia", homeOdds: 3.6, drawOdds: 3.1, awayOdds: 1.85, time: "Today 23:00" },
];

const FOOTBALL_BOOSTS: BoostItem[] = [
  {
    id: "fb-1",
    title: "Real Madrid, Chelsea, Man City & Arsenal All To Win",
    subtitle: "Featured Acca • European Midweek Special • Tomorrow 17:45",
    wasOdds: "Was 2.75",
    odds: 3.0,
    oddsLabel: "3.00",
  },
  {
    id: "fb-2",
    title: "Bukayo Saka — Anytime Goalscorer",
    subtitle: "Arsenal v Chelsea • Tomorrow 17:45",
    wasOdds: "Was 2.10",
    odds: 2.6,
    oddsLabel: "2.60",
  },
  {
    id: "fb-3",
    title: "Kylian Mbappé — Anytime Goalscorer",
    subtitle: "Real Madrid v Man City • Tomorrow 20:00",
    wasOdds: "Was 2.00",
    odds: 2.45,
    oddsLabel: "2.45",
  },
  {
    id: "fb-4",
    title: "Lamine Yamal — 2+ Shots On Target",
    subtitle: "Barcelona v Atletico Madrid • Tomorrow 20:00",
    wasOdds: "Was 2.40",
    odds: 3.2,
    oddsLabel: "3.20",
  },
];

const POPULAR_COMPETITIONS = [
  { name: "England Premier League", country: "england" as const, count: 10 },
  { name: "England Championship", country: "england" as const, count: 12 },
  { name: "England League 1", country: "england" as const, count: 12 },
  { name: "England League 2", country: "england" as const, count: 12 },
  { name: "Italy Serie A", country: "italy" as const, count: 10 },
] as const;

function CountryFlag({ country, className = "size-5" }: { country: FlagCountry; className?: string }) {
  const base = cn("shrink-0 overflow-hidden rounded-full ring-1 ring-white/15", className);
  switch (country) {
    case "england":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <rect width="24" height="24" fill="#ffffff" />
          <rect x="10" width="4" height="24" fill="#ce1124" />
          <rect y="10" width="24" height="4" fill="#ce1124" />
        </svg>
      );
    case "italy":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <rect x="0" width="8" height="24" fill="#009246" />
          <rect x="8" width="8" height="24" fill="#ffffff" />
          <rect x="16" width="8" height="24" fill="#ce2b37" />
        </svg>
      );
    case "argentina":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <rect width="24" height="8" fill="#74acdf" />
          <rect y="8" width="24" height="8" fill="#ffffff" />
          <rect y="16" width="24" height="8" fill="#74acdf" />
          <circle cx="12" cy="12" r="2.6" fill="#f6b40e" />
        </svg>
      );
    case "costarica":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <rect width="24" height="4" fill="#002b7f" />
          <rect y="4" width="24" height="4" fill="#ffffff" />
          <rect y="8" width="24" height="8" fill="#ce1126" />
          <rect y="16" width="24" height="4" fill="#ffffff" />
          <rect y="20" width="24" height="4" fill="#002b7f" />
        </svg>
      );
    case "uruguay":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <rect width="24" height="24" fill="#ffffff" />
          <rect y="4" width="24" height="3" fill="#0038a8" />
          <rect y="10" width="24" height="3" fill="#0038a8" />
          <rect y="16" width="24" height="3" fill="#0038a8" />
          <rect width="11" height="11" fill="#ffffff" />
          <circle cx="5.5" cy="5.5" r="2.8" fill="#fcd116" />
        </svg>
      );
    case "dominican":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <rect width="10" height="10" fill="#002d62" />
          <rect x="14" width="10" height="10" fill="#ce1126" />
          <rect y="14" width="10" height="10" fill="#ce1126" />
          <rect x="14" y="14" width="10" height="10" fill="#002d62" />
          <rect x="10" width="4" height="24" fill="#ffffff" />
          <rect y="10" width="24" height="4" fill="#ffffff" />
        </svg>
      );
    case "chile":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <rect width="24" height="12" fill="#ffffff" />
          <rect y="12" width="24" height="12" fill="#d52b1e" />
          <rect width="12" height="12" fill="#0039a6" />
          <circle cx="6" cy="6" r="2.2" fill="#ffffff" />
        </svg>
      );
    case "colombia":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <rect width="24" height="12" fill="#fcd116" />
          <rect y="12" width="24" height="6" fill="#003893" />
          <rect y="18" width="24" height="6" fill="#ce1126" />
        </svg>
      );
  }
}

const FOOTBALL_INPLAY: InPlayRow[] = [
  { id: "ip1", homeTeam: "Atletico Independiente Reserves", awayTeam: "CD Real Espana Reserves", homeScore: 1, awayScore: 1, minute: "77'", homeOdds: 8.0, drawOdds: 2.15, awayOdds: 2.05 },
  { id: "ip2", homeTeam: "Atlético Mineiro U20", awayTeam: "São Paulo U20", homeScore: 0, awayScore: 0, minute: "34'", homeOdds: 1.95, drawOdds: 2.9, awayOdds: 4.33 },
  { id: "ip3", homeTeam: "Santos FC Women", awayTeam: "Sao Paulo Futebol Clube Women", homeScore: 0, awayScore: 1, minute: "35'", homeOdds: 13.0, drawOdds: 5.0, awayOdds: 1.25 },
  { id: "ip4", homeTeam: "Newcastle UTD (EMPEROR)", awayTeam: "Arsenal (UNLEASHED)", homeScore: 1, awayScore: 0, minute: "Live", locked: true, homeOdds: 1.5, drawOdds: 3.6, awayOdds: 5.5 },
  { id: "ip5", homeTeam: "Ceará SC Women", awayTeam: "Maracana EC Women", homeScore: 0, awayScore: 0, minute: "1'", locked: true, homeOdds: 1.8, drawOdds: 3.2, awayOdds: 4.0 },
  { id: "ip6", homeTeam: "Liverpool (HAYMAKER)", awayTeam: "Napoli (BOUNTY)", homeScore: 0, awayScore: 0, minute: "Live", homeOdds: 2.5, drawOdds: 2.5, awayOdds: 3.25 },
];

const ALL_MATCHES: Match[] = [
  { id: "1", league: "Premier League", sport: "football", homeTeam: "Arsenal", awayTeam: "Chelsea", homeOdds: 1.75, drawOdds: 3.8, awayOdds: 4.2, time: "15:00" },
  { id: "2", league: "Premier League", sport: "football", homeTeam: "Liverpool", awayTeam: "Man United", homeOdds: 1.55, drawOdds: 4.2, awayOdds: 5.5, time: "Live", isLive: true, homeScore: 2, awayScore: 0, minute: "34'" },
  { id: "3", league: "La Liga", sport: "football", homeTeam: "Barcelona", awayTeam: "Atletico Madrid", homeOdds: 1.65, drawOdds: 3.9, awayOdds: 4.8, time: "21:00" },
  { id: "b1", league: "NBA", sport: "basketball", homeTeam: "Boston Celtics", awayTeam: "Miami Heat", homeOdds: 1.65, awayOdds: 2.2, time: "01:00" },
  { id: "b2", league: "NBA", sport: "basketball", homeTeam: "Phoenix Suns", awayTeam: "Denver Nuggets", homeOdds: 2.1, awayOdds: 1.72, time: "Live", isLive: true, homeScore: 54, awayScore: 61, minute: "Q2" },
  { id: "t1", league: "ATP Finals", sport: "tennis", homeTeam: "N. Djokovic", awayTeam: "D. Medvedev", homeOdds: 1.9, awayOdds: 1.9, time: "14:00" },
  { id: "e1", league: "LoL Worlds", sport: "esports", homeTeam: "T1", awayTeam: "Gen.G", homeOdds: 1.55, awayOdds: 2.4, time: "12:00" },
  { id: "e2", league: "CS2 Major", sport: "esports", homeTeam: "FaZe", awayTeam: "Natus Vincere", homeOdds: 1.8, awayOdds: 2.0, time: "Live", isLive: true, homeScore: 1, awayScore: 1, minute: "Map 3" },
];

const SPORTS_BANNERS = [
  {
    id: "sb1",
    eyebrow: "ALCHEMIST'S GUARANTEE",
    title: "$100 Risk-Free First Sports Bet",
    description: "Back your first match or race with the King's potion — 100% refunded in bonus funds if it misses.",
    cta: "Explore Football",
    action: "football" as const,
    poster: "/videos/alchemist-midas-brew-poster.jpg",
  },
  {
    id: "sb2",
    eyebrow: "ELIXIR ACCA BOOST",
    title: "Up to 50% Extra on Multi-Leg Parlays",
    description: "Combine 3 or more selections across Football, NBA, or Tennis to unlock automatic boosted odds.",
    cta: "View Boosts",
    action: "boosts" as const,
    poster: "/videos/alchemist-potion-wand-mini-poster.jpg",
  },
  {
    id: "sb3",
    eyebrow: "LIVE IN-PLAY",
    title: "Real-Time Odds Across Every League",
    description: "Instant bet placement and live score tracking across Premier League, Champions League, and NBA.",
    cta: "See Live Matches",
    action: "all" as const,
    poster: "/videos/signup-new-poster.jpg",
  },
] as const;

export default function SportsContent() {
  const { activeSport, setActiveSport } = useTab();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [footballSubTab, setFootballSubTab] = useState<string>("featured");
  const [bannerIndex, setBannerIndex] = useState(0);
  const [betSlip, setBetSlip] = useState<BetSelection[]>([]);
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
  const [slipTab, setSlipTab] = useState<"slip" | "placed">("slip");
  const [singleStakes, setSingleStakes] = useState<Record<string, string>>({});
  const [ewEnabled, setEwEnabled] = useState<Record<string, boolean>>({});
  const [editingTicketId, setEditingTicketId] = useState<string | null>(null);
  const [justPlacedId, setJustPlacedId] = useState<string | null>(null);

  const activeBanner = SPORTS_BANNERS[bannerIndex];

  const toggleSelection = (sel: BetSelection) => {
    setSlipTab("slip");
    setJustPlacedId(null);
    setBetSlip((prev) => {
      const exists = prev.some((item) => item.id === sel.id);
      if (exists) return prev.filter((item) => item.id !== sel.id);
      setSingleStakes((s) => (s[sel.id] ? s : { ...s, [sel.id]: "10.00" }));
      return [...prev, sel];
    });
  };

  const isSelected = (id: string) => betSlip.some((item) => item.id === id);

  const filteredMatches = ALL_MATCHES.filter((m) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "premier") return m.league === "Premier League";
    return m.sport === selectedFilter;
  });

  const isFootballView = activeSport === "football";

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      {/* LEFT: Main Sportsbook Feed OR Football Detail View */}
      <div className="min-w-0 space-y-6">
        {isFootballView ? (
          /* ===================== FOOTBALL DETAIL VIEW ===================== */
          <>
            {/* Football Banner Header + Sub-tabs */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-dicey-card via-dicey-card to-[#2f1d4e] p-5 sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full opacity-20 blur-3xl"
                style={{ background: "radial-gradient(circle, #39ff14 0%, transparent 70%)" }}
              />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-xl border border-[#39ff14]/35 bg-[#39ff14]/15 text-[#39ff14]">
                      <BiFootball className="size-5" />
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-white">Football</h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveSport(null)}
                    className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-dicey-dark px-3 py-1.5 text-xs font-semibold text-[#ded5eb] transition-colors hover:border-white/25 hover:text-white"
                  >
                    <BiChevronLeft className="size-4" />
                    All Sports
                  </button>
                </div>

                {/* Sub-navigation Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {FOOTBALL_SUBTABS.map((tab) => {
                    const active = footballSubTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFootballSubTab(tab.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                          active
                            ? "border-[#39ff14]/65 bg-[#39ff14]/15 text-[#39ff14]"
                            : "border-white/10 bg-dicey-dark text-[#ded5eb] hover:border-white/25 hover:text-white"
                        )}
                      >
                        <span>{tab.label}</span>
                        {"badge" in tab && tab.badge && (
                          <span
                            className={cn(
                              "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                              active ? "bg-[#39ff14] text-[#071a04]" : "bg-white/10 text-[#d8b4fe]"
                            )}
                          >
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Featured Matches (3-Column Grid) */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white">Featured Matches</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {FOOTBALL_FEATURED.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-dicey-card p-4"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between text-[11px]">
                        <span className="text-[#b7a9ca]">{m.time}</span>
                        <span className="rounded-md bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#d8b4fe]">
                          {m.league}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm font-semibold text-white">
                        <div className="flex items-center gap-2">
                          <CountryFlag country={m.homeCountry} className="size-4" />
                          <p className="truncate">{m.homeTeam}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <CountryFlag country={m.awayCountry} className="size-4" />
                          <p className="truncate">{m.awayTeam}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-1.5">
                      {[
                        { code: "Home", label: m.homeTeam, odds: m.homeOdds },
                        { code: "Draw", label: "Draw", odds: m.drawOdds ?? 3.2 },
                        { code: "Away", label: m.awayTeam, odds: m.awayOdds },
                      ].map((opt) => {
                        const selId = `${m.id}-${opt.code}`;
                        const active = isSelected(selId);
                        return (
                          <button
                            key={opt.code}
                            type="button"
                            onClick={() =>
                              toggleSelection({
                                id: selId,
                                eventTitle: `${m.homeTeam} vs ${m.awayTeam}`,
                                selectionLabel: opt.label,
                                odds: opt.odds,
                                isLive: m.isLive,
                              })
                            }
                            className={cn(
                              "rounded-xl border px-2 py-2 text-center transition-colors",
                              active
                                ? "border-[#39ff14] bg-[#39ff14] text-[#071a04]"
                                : "border-white/10 bg-dicey-dark text-white hover:border-white/25"
                            )}
                          >
                            <span className={cn("block text-[10px]", active ? "text-[#071a04]/75 font-semibold" : "text-[#b7a9ca]")}>
                              {opt.code}
                            </span>
                            <span className="block text-xs font-bold tabular-nums text-[#39ff14]">
                              <span className={active ? "text-[#071a04]" : "text-[#39ff14]"}>{opt.odds.toFixed(2)}</span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Football Boosts */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <BiTrendingUp className="size-4 text-[#39ff14]" />
                <h2 className="text-base font-bold text-white">Boosts</h2>
              </div>

              <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-dicey-card">
                {FOOTBALL_BOOSTS.map((b) => {
                  const active = isSelected(b.id);
                  return (
                    <div
                      key={b.id}
                      className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.02]"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{b.title}</p>
                        <p className="mt-0.5 text-xs text-[#b7a9ca]">{b.subtitle}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          toggleSelection({
                            id: b.id,
                            eventTitle: "Football Boost",
                            selectionLabel: b.title,
                            odds: b.odds,
                          })
                        }
                        className={cn(
                          "shrink-0 rounded-xl border px-3.5 py-1.5 text-right transition-colors",
                          active
                            ? "border-[#39ff14] bg-[#39ff14] text-[#071a04]"
                            : "border-purple-400/35 bg-purple-500/15 text-white hover:border-purple-300/60"
                        )}
                      >
                        <span className={cn("block text-[10px] line-through", active ? "text-[#071a04]/70" : "text-[#d8b4fe]")}>
                          {b.wasOdds}
                        </span>
                        <span className="block text-xs font-extrabold tabular-nums">▲ {b.oddsLabel}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Popular Competitions */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Popular Competitions</h2>
                <button
                  type="button"
                  onClick={() => setFootballSubTab("competitions")}
                  className="rounded-lg border border-white/10 bg-dicey-card px-2.5 py-1 text-[11px] font-semibold text-[#ded5eb] hover:border-white/25 hover:text-white"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-dicey-card">
                {POPULAR_COMPETITIONS.map((comp) => (
                  <button
                    key={comp.name}
                    type="button"
                    onClick={() => setFootballSubTab("matches")}
                    className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3">
                      <CountryFlag country={comp.country} />
                      <span className="text-sm font-semibold text-white">{comp.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#b7a9ca]">
                      <span className="tabular-nums">{comp.count}</span>
                      <BiChevronRight className="size-4" />
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* In-Play Matches Table */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#39ff14]" />
                <h2 className="text-base font-bold text-white">In-Play</h2>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-dicey-card">
                {/* Table Header */}
                <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/10 bg-dicey-dark/70 px-4 py-2.5 text-[11px] font-semibold text-[#b7a9ca]">
                  <span>Today</span>
                  <div className="hidden w-[216px] grid-cols-3 gap-1.5 text-center sm:grid sm:w-[252px]">
                    <span>Home</span>
                    <span>Draw</span>
                    <span>Away</span>
                  </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-white/10">
                  {FOOTBALL_INPLAY.map((row) => (
                    <div
                      key={row.id}
                      className="grid grid-cols-1 items-center gap-3 px-4 py-3 sm:grid-cols-[1fr_auto]"
                    >
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-white">
                          <span className="truncate">{row.homeTeam}</span>
                          <span className="font-mono text-xs tabular-nums text-white">{row.homeScore}</span>
                        </div>
                        <div className="flex items-center justify-between gap-3 text-sm font-semibold text-white">
                          <span className="truncate">{row.awayTeam}</span>
                          <span className="font-mono text-xs tabular-nums text-white">{row.awayScore}</span>
                        </div>
                        <span className="inline-block rounded bg-[#39ff14]/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#39ff14]">
                          {row.minute}
                        </span>
                      </div>

                      <div className="grid w-full grid-cols-3 gap-1.5 sm:w-[252px]">
                        {[
                          { code: "Home", label: row.homeTeam, odds: row.homeOdds },
                          { code: "Draw", label: "Draw", odds: row.drawOdds },
                          { code: "Away", label: row.awayTeam, odds: row.awayOdds },
                        ].map((opt) => {
                          if (row.locked) {
                            return (
                              <div
                                key={opt.code}
                                className="grid h-10 place-items-center rounded-xl border border-white/10 bg-dicey-dark text-gray-500"
                              >
                                <BiLockAlt className="size-3.5" />
                              </div>
                            );
                          }
                          const selId = `${row.id}-${opt.code}`;
                          const active = isSelected(selId);
                          return (
                            <button
                              key={opt.code}
                              type="button"
                              onClick={() =>
                                toggleSelection({
                                  id: selId,
                                  eventTitle: `${row.homeTeam} vs ${row.awayTeam}`,
                                  selectionLabel: opt.label,
                                  odds: opt.odds,
                                  isLive: true,
                                })
                              }
                              className={cn(
                                "min-h-10 rounded-xl border py-1.5 sm:py-0 sm:h-10 text-xs font-bold tabular-nums transition-colors",
                                active
                                  ? "border-[#39ff14] bg-[#39ff14] text-[#071a04]"
                                  : "border-white/10 bg-dicey-dark text-white hover:border-white/25 hover:bg-white/[0.04]"
                              )}
                            >
                              <span className={cn("block text-[9px] font-semibold sm:hidden", active ? "text-[#071a04]/75" : "text-[#b7a9ca]")}>
                                {opt.code}
                              </span>
                              {opt.odds.toFixed(2)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          /* ===================== MAIN SPORTSBOOK OVERVIEW ===================== */
          <>
            {/* Top Sports Promo Banner */}
            <div className="space-y-2.5">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#2e1854] via-dicey-card to-[#1a1229] p-6 sm:p-7">
                <img
                  src={activeBanner.poster}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/3 object-cover object-[75%_30%] opacity-35"
                  style={{
                    maskImage: "linear-gradient(to left, black 15%, transparent 92%)",
                    WebkitMaskImage: "linear-gradient(to left, black 15%, transparent 92%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full opacity-20 blur-3xl"
                  style={{ background: "radial-gradient(circle, #39ff14 0%, transparent 70%)" }}
                />

                <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div className="max-w-lg space-y-1.5">
                    <p className="ui-eyebrow uppercase tracking-[0.08em]">{activeBanner.eyebrow}</p>
                    <h1 className="font-[family-name:var(--font-hero)] text-2xl font-black leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                      {activeBanner.title}
                    </h1>
                    <p className="text-xs leading-relaxed text-[#ded5eb] sm:text-sm">
                      {activeBanner.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (activeBanner.action === "football") {
                        setActiveSport("football");
                      } else {
                        setSelectedFilter("all");
                      }
                    }}
                    className="shrink-0 self-start rounded-xl border border-[#39ff14]/45 bg-[#39ff14]/15 px-4 py-2 text-xs font-bold text-[#39ff14] transition-colors hover:bg-[#39ff14] hover:text-[#071a04] sm:self-end"
                  >
                    {activeBanner.cta}
                  </button>
                </div>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-1.5">
                {SPORTS_BANNERS.map((b, idx) => (
                  <button
                    key={b.id}
                    type="button"
                    aria-label={`Show banner ${idx + 1}: ${b.title}`}
                    onClick={() => setBannerIndex(idx)}
                    className={cn(
                      "h-1.5 rounded-full transition-all",
                      bannerIndex === idx ? "w-5 bg-[#39ff14]" : "w-1.5 bg-white/25 hover:bg-white/45"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Quick League / Event Pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
              {QUICK_FILTERS.map((f) => {
                const active = selectedFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      if (f.id === "football") {
                        setActiveSport("football");
                      } else {
                        setSelectedFilter(f.id);
                      }
                    }}
                    className={cn(
                      "shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors",
                      active
                        ? "border-[#39ff14]/65 bg-[#39ff14]/15 text-[#39ff14]"
                        : "border-white/10 bg-dicey-card text-[#ded5eb] hover:border-white/25 hover:text-white"
                    )}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Featured Matches (3-Column Grid) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white">Featured Matches</h2>
                <span className="text-xs text-[#b7a9ca]">{FEATURED_MATCHES.length} live &amp; upcoming</span>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {FEATURED_MATCHES.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/10 bg-dicey-card p-4"
                  >
                    <div>
                      <div className="mb-3 flex items-center justify-between text-[11px]">
                        {m.isLive ? (
                          <span className="inline-flex items-center gap-1.5 font-bold text-[#39ff14]">
                            <span className="size-1.5 rounded-full bg-[#39ff14]" />
                            Live • {m.minute}
                          </span>
                        ) : (
                          <span className="text-[#b7a9ca]">{m.time}</span>
                        )}
                        <span className="rounded-md bg-purple-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-[#d8b4fe]">
                          {m.league}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-sm font-semibold text-white">
                        <div className="flex items-center justify-between">
                          <span className="truncate">{m.homeTeam}</span>
                          {m.isLive && <span className="tabular-nums text-white">{m.homeScore}</span>}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="truncate">{m.awayTeam}</span>
                          {m.isLive && <span className="tabular-nums text-white">{m.awayScore}</span>}
                        </div>
                      </div>
                    </div>

                    <div className={cn("mt-4 grid gap-1.5", m.drawOdds ? "grid-cols-3" : "grid-cols-2")}>
                      {[
                        { code: "1", label: m.homeTeam, odds: m.homeOdds },
                        ...(m.drawOdds ? [{ code: "X", label: "Draw", odds: m.drawOdds }] : []),
                        { code: "2", label: m.awayTeam, odds: m.awayOdds },
                      ].map((opt) => {
                        const selId = `${m.id}-${opt.code}`;
                        const active = isSelected(selId);
                        return (
                          <button
                            key={opt.code}
                            type="button"
                            onClick={() =>
                              toggleSelection({
                                id: selId,
                                eventTitle: `${m.homeTeam} vs ${m.awayTeam}`,
                                selectionLabel: opt.label,
                                odds: opt.odds,
                                isLive: m.isLive,
                              })
                            }
                            className={cn(
                              "rounded-xl border px-2 py-2 text-center transition-colors",
                              active
                                ? "border-[#39ff14] bg-[#39ff14] text-[#071a04]"
                                : "border-white/10 bg-dicey-dark text-white hover:border-white/25"
                            )}
                          >
                            <span className={cn("block text-[10px]", active ? "text-[#071a04]/75 font-semibold" : "text-[#b7a9ca]")}>
                              {opt.code}
                            </span>
                            <span className="block text-xs font-bold tabular-nums">{opt.odds.toFixed(2)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Next Races (3-Column Grid) */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BiBoltCircle className="size-4 text-[#d8b4fe]" />
                  <h2 className="text-base font-bold text-white">Next Races</h2>
                </div>
                <span className="rounded-lg border border-white/10 bg-dicey-card px-2.5 py-1 text-[11px] font-semibold text-[#ded5eb]">
                  Meetings
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {UPCOMING_RACES.map((race) => (
                  <div
                    key={race.id}
                    className="rounded-2xl border border-white/10 bg-dicey-card p-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-white">
                        {race.time} {race.venue}
                      </p>
                      <BiChevronRight className="size-4 text-[#b7a9ca]" />
                    </div>
                    <p className="mt-0.5 text-[11px] text-[#b7a9ca]">{race.meta}</p>
                    <p className="text-[11px] text-[#d8b4fe]/80">{race.terms}</p>

                    <div className="mt-3 divide-y divide-white/10">
                      {race.runners.map((runner) => {
                        const selId = `${race.id}-${runner.id}`;
                        const active = isSelected(selId);
                        return (
                          <div key={runner.id} className="flex items-center justify-between gap-2 py-2.5 first:pt-1 last:pb-0">
                            <div className="flex min-w-0 items-center gap-2.5">
                              <svg
                                viewBox="0 0 24 24"
                                className="size-7 shrink-0 drop-shadow-sm"
                                aria-hidden="true"
                              >
                                <path
                                  d="M8.5 3.5L4 6.5L5.8 10.5L7.8 9.6V20.5H16.2V9.6L18.2 10.5L20 6.5L15.5 3.5C14.7 4.7 13.4 5.3 12 5.3C10.6 5.3 9.3 4.7 8.5 3.5Z"
                                  fill={runner.silkColor}
                                  stroke="rgba(255,255,255,0.28)"
                                  strokeWidth="1.1"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M9.6 3.8C10.3 4.8 11.1 5.3 12 5.3C12.9 5.3 13.7 4.8 14.4 3.8"
                                  fill="none"
                                  stroke="rgba(20,13,36,0.55)"
                                  strokeWidth="1.2"
                                />
                              </svg>
                              <div className="min-w-0">
                                <p className="truncate text-xs font-bold text-white">{runner.name}</p>
                                <p className="truncate text-[10px] text-[#b7a9ca]">
                                  J: {runner.jockey} • T: {runner.trainer}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                toggleSelection({
                                  id: selId,
                                  eventTitle: `${race.time} ${race.venue}`,
                                  selectionLabel: runner.name,
                                  odds: runner.odds,
                                  silkColor: runner.silkColor,
                                  ewTerms: race.terms,
                                })
                              }
                              className={cn(
                                "shrink-0 rounded-lg border px-2.5 py-1.5 text-xs font-bold tabular-nums transition-colors",
                                active
                                  ? "border-[#39ff14] bg-[#39ff14] text-[#071a04]"
                                  : "border-white/10 bg-dicey-dark text-white hover:border-white/25 hover:bg-white/[0.04]"
                              )}
                            >
                              {runner.odds.toFixed(2)}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Boosts */}
            <section className="space-y-3">
              <div className="flex items-center gap-2">
                <BiTrendingUp className="size-4 text-[#39ff14]" />
                <h2 className="text-base font-bold text-white">Elixir Boosts</h2>
              </div>

              <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-dicey-card">
                {BOOSTS.map((b) => {
                  const active = isSelected(b.id);
                  return (
                    <div
                      key={b.id}
                      className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.02]"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white">{b.title}</p>
                        <p className="mt-0.5 text-xs text-[#b7a9ca]">{b.subtitle}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          toggleSelection({
                            id: b.id,
                            eventTitle: "Elixir Boost",
                            selectionLabel: b.title,
                            odds: b.odds,
                          })
                        }
                        className={cn(
                          "shrink-0 rounded-xl border px-3.5 py-1.5 text-right transition-colors",
                          active
                            ? "border-[#39ff14] bg-[#39ff14] text-[#071a04]"
                            : "border-purple-400/35 bg-purple-500/15 text-white hover:border-purple-300/60"
                        )}
                      >
                        <span className={cn("block text-[10px] line-through", active ? "text-[#071a04]/70" : "text-[#d8b4fe]")}>
                          {b.wasOdds}
                        </span>
                        <span className="block text-xs font-extrabold tabular-nums">▲ {b.oddsLabel}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* All Matches */}
            <section className="space-y-3">
              <h2 className="text-base font-bold text-white">Upcoming &amp; In-Play</h2>
              <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-dicey-card">
                {filteredMatches.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="font-semibold text-[#d8b4fe]">{m.league}</span>
                        {m.isLive ? (
                          <span className="font-bold text-[#39ff14]">• Live {m.minute}</span>
                        ) : (
                          <span className="text-[#b7a9ca]">• {m.time}</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-white">
                        {m.homeTeam} <span className="text-[#b7a9ca]">vs</span> {m.awayTeam}
                        {m.isLive && (
                          <span className="ml-2 font-mono text-xs text-[#39ff14]">
                            ({m.homeScore}–{m.awayScore})
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-1.5">
                      {[
                        { code: "1", label: m.homeTeam, odds: m.homeOdds },
                        ...(m.drawOdds ? [{ code: "X", label: "Draw", odds: m.drawOdds }] : []),
                        { code: "2", label: m.awayTeam, odds: m.awayOdds },
                      ].map((opt) => {
                        const selId = `${m.id}-${opt.code}`;
                        const active = isSelected(selId);
                        return (
                          <button
                            key={opt.code}
                            type="button"
                            onClick={() =>
                              toggleSelection({
                                id: selId,
                                eventTitle: `${m.homeTeam} vs ${m.awayTeam}`,
                                selectionLabel: opt.label,
                                odds: opt.odds,
                                isLive: m.isLive,
                              })
                            }
                            className={cn(
                              "min-w-[60px] rounded-xl border px-3 py-1.5 text-center text-xs font-bold tabular-nums transition-colors",
                              active
                                ? "border-[#39ff14] bg-[#39ff14] text-[#071a04]"
                                : "border-white/10 bg-dicey-dark text-white hover:border-white/25"
                            )}
                          >
                            {opt.odds.toFixed(2)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      {/* RIGHT: Docked Bet Slip + My Bets */}
      <aside id="sports-bet-slip" className='scroll-mt-20 space-y-4 xl:sticky xl:top-20'>
        <BetSlip
          betSlip={betSlip}
          setBetSlip={setBetSlip}
          placedBets={placedBets}
          setPlacedBets={setPlacedBets}
          slipTab={slipTab}
          setSlipTab={setSlipTab}
          singleStakes={singleStakes}
          setSingleStakes={setSingleStakes}
          ewEnabled={ewEnabled}
          setEwEnabled={setEwEnabled}
          editingTicketId={editingTicketId}
          setEditingTicketId={setEditingTicketId}
          justPlacedId={justPlacedId}
          setJustPlacedId={setJustPlacedId}
        />
      </aside>

      {/* Mobile / tablet quick-jump pill to Bet Slip when selections exist */}
      {betSlip.length > 0 && (
        <button
          type="button"
          onClick={() => document.getElementById("sports-bet-slip")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] right-4 z-30 flex items-center gap-2 rounded-full border border-[#39ff14]/60 bg-[#181026]/95 px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md xl:hidden"
        >
          <span>Bet Slip</span>
          <span className="rounded-full bg-[#39ff14] px-2 py-0.5 text-[11px] font-extrabold text-[#071a04] tabular-nums">
            {betSlip.length}
          </span>
        </button>
      )}
    </div>
  );
}
