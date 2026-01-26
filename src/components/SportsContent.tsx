"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Match {
  id: string;
  league: string;
  leagueLogo?: string;
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

interface FeaturedMatch extends Match {
  homeLogo: string;
  awayLogo: string;
}

const featuredMatches: FeaturedMatch[] = [
  {
    id: "f1",
    league: "UEFA Champions League",
    homeTeam: "Real Madrid",
    awayTeam: "Manchester City",
    homeLogo: "/sports/Real_Madrid_CF.svg.webp",
    awayLogo: "/sports/Manchester_City_FC_badge.svg.png",
    homeOdds: 2.45,
    drawOdds: 3.20,
    awayOdds: 2.80,
    time: "20:00",
    isLive: true,
    homeScore: 1,
    awayScore: 1,
    minute: "67'",
  },
  {
    id: "f2",
    league: "NBA",
    homeTeam: "LA Lakers",
    awayTeam: "Golden State",
    homeLogo: "/sports/58419ce2a6515b1e0ad75a69.png",
    awayLogo: "/sports/62066c9fd7b91b0004122608.png",
    homeOdds: 1.85,
    awayOdds: 1.95,
    time: "03:30",
    isLive: true,
    homeScore: 87,
    awayScore: 92,
    minute: "Q3",
  },
];

const footballMatches: Match[] = [
  { id: "1", league: "Premier League", homeTeam: "Arsenal", awayTeam: "Chelsea", homeOdds: 1.75, drawOdds: 3.80, awayOdds: 4.20, time: "15:00" },
  { id: "2", league: "Premier League", homeTeam: "Liverpool", awayTeam: "Man United", homeOdds: 1.55, drawOdds: 4.20, awayOdds: 5.50, time: "17:30", isLive: true, homeScore: 2, awayScore: 0, minute: "34'" },
  { id: "3", league: "La Liga", homeTeam: "Barcelona", awayTeam: "Atletico Madrid", homeOdds: 1.65, drawOdds: 3.90, awayOdds: 4.80, time: "21:00" },
  { id: "4", league: "Serie A", homeTeam: "AC Milan", awayTeam: "Inter Milan", homeOdds: 2.90, drawOdds: 3.20, awayOdds: 2.40, time: "20:45" },
  { id: "5", league: "Bundesliga", homeTeam: "Bayern Munich", awayTeam: "Dortmund", homeOdds: 1.45, drawOdds: 4.50, awayOdds: 6.00, time: "18:30" },
];

const basketballMatches: Match[] = [
  { id: "b1", league: "NBA", homeTeam: "Boston Celtics", awayTeam: "Miami Heat", homeOdds: 1.65, awayOdds: 2.20, time: "01:00" },
  { id: "b2", league: "NBA", homeTeam: "Phoenix Suns", awayTeam: "Denver Nuggets", homeOdds: 2.10, awayOdds: 1.72, time: "03:30", isLive: true, homeScore: 54, awayScore: 61, minute: "Q2" },
  { id: "b3", league: "EuroLeague", homeTeam: "Real Madrid", awayTeam: "Barcelona", homeOdds: 1.85, awayOdds: 1.95, time: "21:00" },
];

const tennisMatches: Match[] = [
  { id: "t1", league: "ATP Finals", homeTeam: "Djokovic", awayTeam: "Alcaraz", homeOdds: 1.90, awayOdds: 1.90, time: "14:00" },
  { id: "t2", league: "ATP Finals", homeTeam: "Sinner", awayTeam: "Medvedev", homeOdds: 1.75, awayOdds: 2.05, time: "19:00", isLive: true, homeScore: 2, awayScore: 1, minute: "Set 4" },
];

const esportsMatches: Match[] = [
  { id: "e1", league: "LoL Worlds", homeTeam: "T1", awayTeam: "Gen.G", homeOdds: 1.55, awayOdds: 2.40, time: "12:00" },
  { id: "e2", league: "CS2 Major", homeTeam: "FaZe", awayTeam: "Natus Vincere", homeOdds: 1.80, awayOdds: 2.00, time: "18:00", isLive: true, homeScore: 1, awayScore: 1, minute: "Map 3" },
  { id: "e3", league: "Dota 2 TI", homeTeam: "Team Spirit", awayTeam: "Tundra", homeOdds: 2.10, awayOdds: 1.70, time: "15:00" },
];

export default function SportsContent() {
  const [selectedSport, setSelectedSport] = useState<string>("all");
  const [betSlip, setBetSlip] = useState<Array<{ match: Match; selection: string; odds: number }>>([]);

  const addToBetSlip = (match: Match, selection: string, odds: number) => {
    const exists = betSlip.find((b) => b.match.id === match.id);
    if (exists) {
      setBetSlip(betSlip.filter((b) => b.match.id !== match.id));
    } else {
      setBetSlip([...betSlip, { match, selection, odds }]);
    }
  };

  const isInBetSlip = (matchId: string, selection: string) => {
    return betSlip.some((b) => b.match.id === matchId && b.selection === selection);
  };

  const sports = [
    { id: "all", label: "All Sports", icon: "🏆" },
    { id: "football", label: "Football", icon: "⚽" },
    { id: "basketball", label: "Basketball", icon: "🏀" },
    { id: "tennis", label: "Tennis", icon: "🎾" },
    { id: "esports", label: "Esports", icon: "🎮" },
  ];

  const getMatches = () => {
    switch (selectedSport) {
      case "football":
        return footballMatches;
      case "basketball":
        return basketballMatches;
      case "tennis":
        return tennisMatches;
      case "esports":
        return esportsMatches;
      default:
        return [...footballMatches, ...basketballMatches, ...tennisMatches, ...esportsMatches];
    }
  };

  const OddsButton = ({ match, selection, odds }: { match: Match; selection: string; odds: number }) => {
    const isSelected = isInBetSlip(match.id, selection);
    return (
      <button
        onClick={() => addToBetSlip(match, selection, odds)}
        className={cn(
          "flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all duration-200",
          isSelected
            ? "bg-white text-black"
            : "bg-dicey-border hover:bg-dicey-border/80 text-white"
        )}
      >
        <span className="block text-xs text-gray-400 mb-0.5">{selection}</span>
        <span className="tabular-nums">{odds.toFixed(2)}</span>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Featured Matches */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          Featured Matches
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {featuredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-dicey-card rounded-xl p-5 relative overflow-hidden"
            >
              {match.isLive && (
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-semibold">
                  <span className="size-1.5 bg-red-500 rounded-full animate-pulse" />
                  LIVE {match.minute}
                </div>
              )}
              <div className="text-xs text-gray-400 mb-4">{match.league}</div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 bg-white/10 rounded-full flex items-center justify-center overflow-hidden p-1">
                    <img src={match.homeLogo} alt={match.homeTeam} className="size-full object-contain" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{match.homeTeam}</div>
                    {match.isLive && <div className="text-2xl font-bold text-white tabular-nums">{match.homeScore}</div>}
                  </div>
                </div>
                <div className="text-gray-500 text-sm font-medium">
                  {match.isLive ? "VS" : match.time}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-white font-semibold">{match.awayTeam}</div>
                    {match.isLive && <div className="text-2xl font-bold text-white tabular-nums">{match.awayScore}</div>}
                  </div>
                  <div className="size-12 bg-white/10 rounded-full flex items-center justify-center overflow-hidden p-1">
                    <img src={match.awayLogo} alt={match.awayTeam} className="size-full object-contain" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <OddsButton match={match} selection="1" odds={match.homeOdds} />
                {match.drawOdds && <OddsButton match={match} selection="X" odds={match.drawOdds} />}
                <OddsButton match={match} selection="2" odds={match.awayOdds} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sport Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => setSelectedSport(sport.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
              selectedSport === sport.id
                ? "bg-white text-black"
                : "bg-dicey-card text-gray-300 hover:text-white"
            )}
          >
            <span>{sport.icon}</span>
            {sport.label}
          </button>
        ))}
      </div>

      {/* Matches List */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">📅</span>
          Upcoming Matches
        </h2>
        <div className="bg-dicey-card rounded-xl overflow-hidden">
          {getMatches().map((match, index) => (
            <div
              key={match.id}
              className="p-4 flex items-center justify-between hover:bg-dicey-border/30 transition-colors duration-200"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-500">{match.league}</span>
                  {match.isLive && (
                    <span className="flex items-center gap-1 text-xs text-red-400">
                      <span className="size-1.5 bg-red-500 rounded-full animate-pulse" />
                      {match.minute}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-white font-medium">
                    {match.homeTeam}
                    {match.isLive && <span className="ml-2 text-gray-400 tabular-nums">{match.homeScore}</span>}
                  </div>
                  <span className="text-gray-500">vs</span>
                  <div className="text-white font-medium">
                    {match.isLive && <span className="mr-2 text-gray-400 tabular-nums">{match.awayScore}</span>}
                    {match.awayTeam}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {!match.isLive && (
                  <span className="text-sm text-gray-400">{match.time}</span>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToBetSlip(match, "1", match.homeOdds)}
                    className={cn(
                      "px-3 py-1.5 rounded text-sm font-semibold tabular-nums transition-all duration-200",
                      isInBetSlip(match.id, "1")
                        ? "bg-white text-black"
                        : "bg-dicey-border hover:bg-dicey-border/80 text-white"
                    )}
                  >
                    {match.homeOdds.toFixed(2)}
                  </button>
                  {match.drawOdds && (
                    <button
                      onClick={() => addToBetSlip(match, "X", match.drawOdds!)}
                      className={cn(
                        "px-3 py-1.5 rounded text-sm font-semibold tabular-nums transition-all duration-200",
                        isInBetSlip(match.id, "X")
                          ? "bg-white text-black"
                          : "bg-dicey-border hover:bg-dicey-border/80 text-white"
                      )}
                    >
                      {match.drawOdds.toFixed(2)}
                    </button>
                  )}
                  <button
                    onClick={() => addToBetSlip(match, "2", match.awayOdds)}
                    className={cn(
                      "px-3 py-1.5 rounded text-sm font-semibold tabular-nums transition-all duration-200",
                      isInBetSlip(match.id, "2")
                        ? "bg-white text-black"
                        : "bg-dicey-border hover:bg-dicey-border/80 text-white"
                    )}
                  >
                    {match.awayOdds.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bet Slip */}
      {betSlip.length > 0 && (
        <div className="fixed bottom-4 right-4 w-80 bg-dicey-card rounded-xl shadow-2xl overflow-hidden z-40">
          <div className="bg-white text-black px-4 py-3 font-semibold flex items-center justify-between">
            <span>Bet Slip (<span className="tabular-nums">{betSlip.length}</span>)</span>
            <button
              onClick={() => setBetSlip([])}
              className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
            >
              Clear
            </button>
          </div>
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {betSlip.map((bet) => (
              <div key={`${bet.match.id}-${bet.selection}`} className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white">
                    {bet.match.homeTeam} vs {bet.match.awayTeam}
                  </div>
                  <div className="text-xs text-gray-400">
                    {bet.selection === "1" ? bet.match.homeTeam : bet.selection === "2" ? bet.match.awayTeam : "Draw"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold tabular-nums">{bet.odds.toFixed(2)}</span>
                  <button
                    aria-label="Remove bet"
                    onClick={() => setBetSlip(betSlip.filter((b) => !(b.match.id === bet.match.id && b.selection === bet.selection)))}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-sm">Total Odds</span>
              <span className="text-white font-bold tabular-nums">
                {betSlip.reduce((acc, bet) => acc * bet.odds, 1).toFixed(2)}
              </span>
            </div>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                placeholder="Stake"
                className="flex-1 bg-dicey-border rounded-lg px-3 py-2 text-white text-sm tabular-nums outline-none focus:ring-2 focus:ring-white/20"
              />
              <span className="text-gray-400 self-center text-sm">USDC</span>
            </div>
            {/* Place Bet - 3D Nuclear Green CTA */}
            <button className="relative group/btn w-full">
              {/* Bottom layer (shadow/glow) - soft uniform glow on hover */}
              <span className="absolute -inset-1 rounded-xl transition-all duration-200 opacity-0 group-hover/btn:opacity-100 bg-[#39ff14]/20 blur-md" />
              {/* Bubble particles on hover */}
              <span className="absolute -top-2 left-6 size-2 rounded-full bg-[#39ff14]/60 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.2s_ease-out_infinite]" />
              <span className="absolute -top-1 left-16 size-1.5 rounded-full bg-[#39ff14]/50 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.4s_ease-out_infinite_0.2s]" />
              <span className="absolute -top-2 right-10 size-2.5 rounded-full bg-[#39ff14]/70 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-3_1s_ease-out_infinite_0.4s]" />
              <span className="absolute -top-1 right-20 size-1 rounded-full bg-[#39ff14]/40 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-2_1.3s_ease-out_infinite_0.1s]" />
              <span className="absolute top-0 left-1/2 size-1.5 rounded-full bg-[#39ff14]/55 opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-[bubble-1_1.1s_ease-out_infinite_0.3s]" />
              {/* Dark inset ring - extends bottom to cover 3D depth */}
              <span className="absolute -top-[1px] -left-[2px] -right-[2px] -bottom-[6px] rounded-[14px] bg-black/40" />
              {/* Middle layer - darker for depth */}
              <span className="absolute inset-0 translate-y-1 bg-[#1a5c0a] rounded-xl" />
              {/* Top layer (main button) with radial gradient - nuclear green */}
              <span
                className="relative block py-3 text-black font-bold rounded-xl transition-all duration-200 group-hover/btn:translate-y-0.5 text-center overflow-hidden"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, #39ff14 0%, #32cd32 40%, #228b22 100%)',
                  boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.2)',
                }}
              >
                {/* Shimmer effect */}
                <span className="cta-shimmer" />
                <span className="relative" style={{ textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.15)' }}>
                  Place Bet
                </span>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
