"use client";

import { useState } from "react";
import {
  BiCheckCircle,
  BiEditAlt,
  BiLockAlt,
  BiReceipt,
  BiTrash,
  BiX,
} from "react-icons/bi";
import PrimaryButton from "./ui/PrimaryButton";
import { cn } from "@/lib/utils";

export interface BetSelection {
  id: string;
  eventTitle: string;
  selectionLabel: string;
  odds: number;
  silkColor?: string;
  ewTerms?: string;
  isLive?: boolean;
}

export interface PlacedBet {
  id: string;
  selections: BetSelection[];
  stake: number;
  totalOdds: number;
  payout: number;
  placedAt: string;
  betMode: "single" | "parlay";
  singleStakes: Record<string, string>;
  ewEnabled: Record<string, boolean>;
}

interface BetSlipProps {
  betSlip: BetSelection[];
  setBetSlip: React.Dispatch<React.SetStateAction<BetSelection[]>>;
  placedBets: PlacedBet[];
  setPlacedBets: React.Dispatch<React.SetStateAction<PlacedBet[]>>;
  slipTab: "slip" | "placed";
  setSlipTab: React.Dispatch<React.SetStateAction<"slip" | "placed">>;
  singleStakes: Record<string, string>;
  setSingleStakes: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  ewEnabled: Record<string, boolean>;
  setEwEnabled: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  editingTicketId: string | null;
  setEditingTicketId: React.Dispatch<React.SetStateAction<string | null>>;
  justPlacedId: string | null;
  setJustPlacedId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function BetSlip({
  betSlip,
  setBetSlip,
  placedBets,
  setPlacedBets,
  slipTab,
  setSlipTab,
  singleStakes,
  setSingleStakes,
  ewEnabled,
  setEwEnabled,
  editingTicketId,
  setEditingTicketId,
  justPlacedId,
  setJustPlacedId,
}: BetSlipProps) {
  const [betMode, setBetMode] = useState<"single" | "parlay">("single");
  const [parlayStake, setParlayStake] = useState<string>("25.00");

  const effectiveMode = betSlip.length <= 1 ? "single" : betMode;
  const totalOdds = betSlip.reduce((acc, b) => acc * b.odds, 1);
  const numericParlayStake = parseFloat(parlayStake) || 0;

  const singleTotalStake = betSlip.reduce((sum, b) => {
    const val = parseFloat(singleStakes[b.id] ?? "10") || 0;
    return sum + val * (ewEnabled[b.id] ? 2 : 1);
  }, 0);

  const singleTotalReturn = betSlip.reduce((sum, b) => {
    const val = parseFloat(singleStakes[b.id] ?? "10") || 0;
    const isEw = Boolean(ewEnabled[b.id]);
    return sum + val * b.odds + (isEw ? val * (1 + (b.odds - 1) * 0.2) : 0);
  }, 0);

  const totalStake = effectiveMode === "single" ? singleTotalStake : numericParlayStake;
  const potentialReturn =
    effectiveMode === "single" ? singleTotalReturn : numericParlayStake * totalOdds;

  const applyQuickStake = (amount: number) => {
    const formatted = amount.toFixed(2);
    if (effectiveMode === "parlay") {
      setParlayStake(formatted);
    } else {
      const next: Record<string, string> = {};
      betSlip.forEach((b) => {
        next[b.id] = formatted;
      });
      setSingleStakes((prev) => ({ ...prev, ...next }));
    }
  };

  const handlePlaceBet = () => {
    if (betSlip.length === 0 || totalStake <= 0) return;
    const ticketId = editingTicketId ?? `ELX-${Math.floor(1000 + Math.random() * 9000)}`;
    const ticket: PlacedBet = {
      id: ticketId,
      selections: [...betSlip],
      stake: totalStake,
      totalOdds,
      payout: potentialReturn,
      placedAt: editingTicketId ? "Updated just now" : "Just now",
      betMode: effectiveMode,
      singleStakes: { ...singleStakes },
      ewEnabled: { ...ewEnabled },
    };

    setPlacedBets((prev) =>
      editingTicketId
        ? prev.map((t) => (t.id === editingTicketId ? ticket : t))
        : [ticket, ...prev]
    );
    setBetSlip([]);
    setEditingTicketId(null);
    setJustPlacedId(ticketId);
    setSlipTab("placed");
  };

  const startEditingTicket = (ticket: PlacedBet) => {
    setEditingTicketId(ticket.id);
    setBetSlip([...ticket.selections]);
    setBetMode(ticket.betMode);
    setSingleStakes({ ...ticket.singleStakes });
    setEwEnabled({ ...ticket.ewEnabled });
    setParlayStake(ticket.stake.toFixed(2));
    setJustPlacedId(null);
    setSlipTab("slip");
  };

  const deletePlacedTicket = (ticketId: string) => {
    setPlacedBets((prev) => prev.filter((t) => t.id !== ticketId));
    if (justPlacedId === ticketId) setJustPlacedId(null);
    if (editingTicketId === ticketId) {
      setEditingTicketId(null);
      setBetSlip([]);
      setSlipTab("placed");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-dicey-card">
      {/* Top Tabs: Bet Slip | My Bets */}
      <div className="border-b border-white/10 p-3">
        <div className="grid grid-cols-2 rounded-xl bg-dicey-dark p-1">
          <button
            type="button"
            onClick={() => setSlipTab("slip")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-colors",
              slipTab === "slip" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
            )}
          >
            <span>Bet Slip</span>
            {betSlip.length > 0 && (
              <span className="rounded-full bg-[#39ff14] px-1.5 py-0.5 text-[10px] font-extrabold text-[#071a04] tabular-nums">
                {betSlip.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSlipTab("placed")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-colors",
              slipTab === "placed" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
            )}
          >
            <span>My Bets</span>
            {placedBets.length > 0 && (
              <span className="rounded-full bg-purple-500/30 px-1.5 py-0.5 text-[10px] font-bold text-[#d8b4fe] tabular-nums">
                {placedBets.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* BODY */}
      {slipTab === "placed" ? (
        /* ======================== MY BETS TAB ======================== */
        placedBets.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <BiReceipt className="size-9 text-white/20" />
            <p className="mt-3 text-sm font-semibold text-white">No open bets</p>
            <p className="mt-1 text-xs text-[#b7a9ca]">
              Placed tickets appear here. Pre-match bets can be edited or cancelled anytime.
            </p>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {justPlacedId && (
              <div className="flex items-center gap-2 rounded-xl border border-[#39ff14]/40 bg-[#39ff14]/15 px-3.5 py-2.5 text-xs text-white">
                <BiCheckCircle className="size-4 shrink-0 text-[#39ff14]" />
                <span>
                  Ticket <strong className="font-mono text-[#39ff14]">#{justPlacedId}</strong> confirmed
                </span>
              </div>
            )}

            <div className="max-h-96 space-y-2.5 overflow-y-auto pr-0.5">
              {placedBets.map((ticket) => {
                const hasLive = ticket.selections.some((s) => s.isLive);
                return (
                  <div
                    key={ticket.id}
                    className="space-y-2.5 rounded-xl border border-white/10 bg-dicey-dark p-3.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#d8b4fe]">#{ticket.id}</span>
                        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#b7a9ca]">
                          {ticket.betMode === "parlay" ? `${ticket.selections.length}-Leg Parlay` : "Singles"}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#39ff14]">
                        <span className="size-1.5 rounded-full bg-[#39ff14]" />
                        Open
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {ticket.selections.map((s) => (
                        <div key={s.id} className="flex items-center justify-between gap-2 text-xs">
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-white">{s.selectionLabel}</p>
                            <p className="truncate text-[11px] text-[#b7a9ca]">{s.eventTitle}</p>
                          </div>
                          <span className="shrink-0 font-mono font-bold text-[#39ff14] tabular-nums">
                            {s.odds.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs tabular-nums">
                      <div>
                        <span className="block text-[10px] text-[#b7a9ca]">Stake</span>
                        <span className="font-bold text-white">${ticket.stake.toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] text-[#b7a9ca]">Est. Payout</span>
                        <span className="font-bold text-[#39ff14]">${ticket.payout.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                      <span className="text-[11px] text-[#b7a9ca]">{ticket.placedAt}</span>
                      {hasLive ? (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gray-400">
                          <BiLockAlt className="size-3" /> Live Locked
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => startEditingTicket(ticket)}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-dicey-card px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:border-white/25"
                          >
                            <BiEditAlt className="size-3.5 text-[#d8b4fe]" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deletePlacedTicket(ticket.id)}
                            className="inline-flex items-center gap-1 rounded-lg border border-rose-400/25 bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-300 transition-colors hover:border-rose-400/50 hover:text-white"
                          >
                            <BiTrash className="size-3.5" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setJustPlacedId(null);
                setSlipTab("slip");
              }}
              className="w-full rounded-xl border border-white/10 bg-dicey-dark py-2.5 text-xs font-semibold text-white transition-colors hover:border-white/25"
            >
              Build New Bet
            </button>
          </div>
        )
      ) : betSlip.length === 0 ? (
        /* ======================== EMPTY SLIP ======================== */
        <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
          <BiReceipt className="size-9 text-white/20" />
          <p className="mt-3 text-sm font-semibold text-white">Your Bet Slip is empty</p>
          <p className="mt-1 text-xs text-[#b7a9ca]">
            Tap any odds on a match, race, or boost to add it here.
          </p>
        </div>
      ) : (
        /* ======================== ACTIVE SLIP ======================== */
        <div className="flex flex-col">
          {/* Editing Banner */}
          {editingTicketId && (
            <div className="flex items-center justify-between border-b border-purple-400/25 bg-purple-500/15 px-4 py-2.5 text-xs">
              <span className="font-semibold text-[#d8b4fe]">
                Editing <span className="font-mono text-white">#{editingTicketId}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setEditingTicketId(null);
                  setBetSlip([]);
                  setSlipTab("placed");
                }}
                className="font-semibold text-gray-300 hover:text-white"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Singles vs Parlay Toggle (only shown when 2+ selections exist) */}
          {betSlip.length >= 2 && (
            <div className="border-b border-white/10 px-4 py-2.5">
              <div className="grid grid-cols-2 rounded-xl bg-dicey-dark p-1">
                <button
                  type="button"
                  onClick={() => setBetMode("single")}
                  className={cn(
                    "rounded-lg py-1.5 text-xs font-semibold transition-colors",
                    effectiveMode === "single" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  Singles ({betSlip.length})
                </button>
                <button
                  type="button"
                  onClick={() => setBetMode("parlay")}
                  className={cn(
                    "rounded-lg py-1.5 text-xs font-semibold transition-colors",
                    effectiveMode === "parlay" ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  Parlay ({totalOdds.toFixed(2)}x)
                </button>
              </div>
            </div>
          )}

          {/* Selection Cards */}
          <div className="max-h-80 space-y-2.5 overflow-y-auto p-4">
            {betSlip.map((b) => {
              const sVal = parseFloat(singleStakes[b.id] ?? "10") || 0;
              const isEw = Boolean(ewEnabled[b.id]);
              const singleReturn = sVal * b.odds + (isEw ? sVal * (1 + (b.odds - 1) * 0.2) : 0);

              return (
                <div
                  key={b.id}
                  className="space-y-2.5 rounded-xl border border-white/10 bg-dicey-dark p-3.5"
                >
                  {/* Row 1: Selection + Odds + Remove */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex min-w-0 items-start gap-2">
                      {b.silkColor && (
                        <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0" aria-hidden="true">
                          <path
                            d="M8.5 3.5L4 6.5L5.8 10.5L7.8 9.6V20.5H16.2V9.6L18.2 10.5L20 6.5L15.5 3.5C14.7 4.7 13.4 5.3 12 5.3C10.6 5.3 9.3 4.7 8.5 3.5Z"
                            fill={b.silkColor}
                          />
                        </svg>
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-white">{b.selectionLabel}</p>
                        <p className="truncate text-[11px] text-[#b7a9ca]">{b.eventTitle}</p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="rounded-lg bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-bold text-[#39ff14] tabular-nums">
                        {b.odds.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        aria-label="Remove selection"
                        onClick={() =>
                          setBetSlip((prev) => prev.filter((item) => item.id !== b.id))
                        }
                        className="grid size-6 place-items-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <BiX className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Each-Way Pill (Racing only) */}
                  {effectiveMode === "single" && b.ewTerms && (
                    <button
                      type="button"
                      onClick={() =>
                        setEwEnabled((prev) => ({ ...prev, [b.id]: !prev[b.id] }))
                      }
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors",
                        isEw
                          ? "border-[#39ff14]/50 bg-[#39ff14]/15 text-[#39ff14]"
                          : "border-white/10 bg-dicey-card text-[#b7a9ca] hover:text-white"
                      )}
                    >
                      <span>{isEw ? "✓ Each-Way Active (×2)" : "+ Add Each-Way"}</span>
                      <span className="opacity-75">• 1/5 Odds</span>
                    </button>
                  )}

                  {/* Clean Single Stake + Return */}
                  {effectiveMode === "single" && (
                    <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-2.5">
                      <div className="flex w-32 sm:w-28 items-center gap-1 rounded-lg border border-white/10 bg-dicey-card px-2.5 py-1.5 focus-within:border-lime-300/60">
                        <span className="text-xs font-semibold text-[#b7a9ca]">$</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          min="0"
                          step="1"
                          value={singleStakes[b.id] ?? "10.00"}
                          onChange={(e) =>
                            setSingleStakes((prev) => ({ ...prev, [b.id]: e.target.value }))
                          }
                          className="w-full bg-transparent text-xs font-bold text-white tabular-nums outline-none"
                        />
                      </div>
                      <div className="text-right tabular-nums">
                        <span className="text-[11px] text-[#b7a9ca]">Payout </span>
                        <span className="text-xs font-bold text-[#39ff14]">
                          ${singleReturn.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="space-y-3 border-t border-white/10 bg-dicey-dark/50 p-4">
            {effectiveMode === "parlay" && (
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-dark px-3 py-2 focus-within:border-lime-300/60">
                  <span className="text-xs font-semibold text-[#b7a9ca]">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="1"
                    value={parlayStake}
                    onChange={(e) => setParlayStake(e.target.value)}
                    placeholder="Parlay Stake"
                    className="w-full bg-transparent text-sm font-bold text-white tabular-nums outline-none"
                  />
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-[#b7a9ca]">Parlay Odds</span>
                  <span className="font-mono text-xs font-bold text-[#39ff14] tabular-nums">
                    {totalOdds.toFixed(2)}x
                  </span>
                </div>
              </div>
            )}

            {/* Quick Stake Chips */}
            <div className="grid grid-cols-3 gap-2">
              {[5, 25, 100].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => applyQuickStake(amt)}
                  className="rounded-xl border border-white/10 bg-dicey-dark py-1.5 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Totals */}
            <div className="flex items-center justify-between rounded-xl bg-dicey-dark px-3.5 py-2.5 text-xs tabular-nums">
              <div>
                <span className="block text-[10px] text-[#b7a9ca]">Total Stake</span>
                <span className="font-bold text-white">${totalStake.toFixed(2)}</span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] text-[#b7a9ca]">Est. Payout</span>
                <span className="text-sm font-extrabold text-[#39ff14]">
                  ${potentialReturn.toFixed(2)}
                </span>
              </div>
            </div>

            <PrimaryButton onClick={handlePlaceBet} className="w-full">
              {editingTicketId ? "Save Changes" : `Place Bet • $${totalStake.toFixed(2)}`}
            </PrimaryButton>

            <button
              type="button"
              onClick={() => {
                if (editingTicketId) {
                  deletePlacedTicket(editingTicketId);
                } else {
                  setBetSlip([]);
                }
              }}
              className={cn(
                "flex w-full items-center justify-center gap-1.5 py-1 text-xs font-semibold transition-colors",
                editingTicketId ? "text-rose-300 hover:text-rose-200" : "text-[#b7a9ca] hover:text-white"
              )}
            >
              <BiTrash className="size-3.5" />
              {editingTicketId ? "Delete This Bet" : "Clear Bet Slip"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
