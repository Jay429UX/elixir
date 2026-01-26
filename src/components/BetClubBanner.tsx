"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface RewardCard {
  id: string;
  title: string;
  description: string;
  reward: string;
  rewardAmount: string;
  gradient: string;
  amountDisplay: string;
}

const rewardCards: RewardCard[] = [
  {
    id: "bet-club",
    title: "Bet Club",
    description: "Get a $5 Free Bet when you place 5x $5 win singles",
    reward: "$5 Free Bet",
    rewardAmount: "$5",
    gradient: "from-purple-600 via-purple-500 to-blue-500",
    amountDisplay: "$5",
  },
  {
    id: "acca-club",
    title: "Acca Club",
    description: "Get a $10 Free Bet when you place 2x $10 pre-match Accas",
    reward: "$10 Free Bet",
    rewardAmount: "$10",
    gradient: "from-cyan-500 via-teal-400 to-green-400",
    amountDisplay: "$10",
  },
  {
    id: "bet-builder",
    title: "Bet Builder Club",
    description: "Get a $5 Free Bet when you place a $10 Bet Builder",
    reward: "$5 Free Bet",
    rewardAmount: "$5",
    gradient: "from-green-500 via-emerald-400 to-cyan-400",
    amountDisplay: "$5",
  },
];

export default function BetClubBanner() {
  const { theme } = useTheme();
  const [timeLeft, setTimeLeft] = useState({ hours: 9, minutes: 24 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.minutes === 0) {
          if (prev.hours === 0) {
            return { hours: 23, minutes: 59 };
          }
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return { ...prev, minutes: prev.minutes - 1 };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative mb-4 rounded-2xl overflow-hidden"
      style={{
        border: theme === "green"
          ? '1px solid rgba(110, 231, 183, 0.15)'
          : '1px solid rgba(196, 181, 253, 0.15)',
      }}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        }}
      />
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
        }}
      />

      <div className="relative flex flex-col lg:flex-row">
        {/* Left Section - Main Promo */}
        <div className="relative flex-shrink-0 lg:w-[420px] p-6 lg:p-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-4 mt-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-6 h-6 rounded-full border-2 border-gray-600 flex items-center justify-center">
                <span className="text-xs">0/3</span>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center">
            <h2 className="text-5xl lg:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(59,130,246,0.5)]"
                style={{
                  textShadow: '0 0 40px rgba(59,130,246,0.4)',
                  WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                }}
              >
                BET
              </span>
            </h2>
            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-[0.3em] -mt-1">
              CLUB
            </h3>
          </div>

          {/* Subtitle */}
          <p className="text-gray-400 text-sm text-center mt-4">
            Total rewards available this week
          </p>

          {/* Reward Badge */}
          <div className="flex justify-center mt-3">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              <span className="text-blue-400 font-bold">$20 Free Bets</span>
            </div>
          </div>

          {/* Terms */}
          <p className="text-gray-500 text-xs text-center mt-6 leading-relaxed max-w-sm mx-auto">
            Opt in required. Each Club has its own T&Cs. Qualification criteria and odds restrictions apply. Free Bets are credited upon settlement of qualifying bets, valid for 7 days, and Free Bet stake is not returned. Further restrictions and{" "}
            <button className="text-blue-400 hover:underline">T&Cs apply</button>
          </p>
        </div>

        {/* Right Section - Weekly Rewards */}
        <div className="flex-1 p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-lg">Weekly Rewards</h3>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
              </svg>
              <span>{timeLeft.hours}h {timeLeft.minutes}m</span>
            </div>
          </div>

          {/* Reward Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rewardCards.map((card) => (
              <div
                key={card.id}
                className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-900/40 transition-all duration-300 cursor-pointer"
              >
                {/* Card Gradient Background */}
                <div className={`h-32 bg-gradient-to-br ${card.gradient} relative overflow-hidden`}>
                  {/* Amount Display */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black text-white/90">
                      {card.amountDisplay}
                    </span>
                  </div>
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h4 className="text-gray-400 text-sm mb-1">{card.title}</h4>
                  <p className="text-white text-sm font-medium leading-snug">
                    {card.description}
                  </p>

                  {/* Reward Tag */}
                  <div className="mt-3 inline-flex items-center gap-1.5 bg-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1">
                    <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-400 text-xs font-semibold">{card.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
