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
    homeLogo: "https://media.api-sports.io/football/teams/541.png",
    awayLogo: "https://media.api-sports.io/football/teams/50.png",
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
    homeLogo: "https://media.api-sports.io/basketball/teams/145.png",
    awayLogo: "https://media.api-sports.io/basketball/teams/144.png",
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
              className="bg-dicey-card border border-dicey-border rounded-xl p-5 relative overflow-hidden"
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
                  <div className="size-12 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚽</span>
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
                  <div className="size-12 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚽</span>
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
                : "bg-dicey-card border border-dicey-border text-gray-300 hover:text-white"
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
        <div className="bg-dicey-card border border-dicey-border rounded-xl overflow-hidden">
          {getMatches().map((match, index) => (
            <div
              key={match.id}
              className={cn(
                "p-4 flex items-center justify-between hover:bg-dicey-border/30 transition-colors duration-200",
                index !== getMatches().length - 1 && "border-b border-dicey-border"
              )}
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
        <div className="fixed bottom-4 right-4 w-80 bg-dicey-card border border-dicey-border rounded-xl shadow-2xl overflow-hidden z-40">
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
          <div className="p-4 border-t border-dicey-border">
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
            <button className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200">
              Place Bet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
