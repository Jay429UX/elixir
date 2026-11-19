"use client";

import { useRouter } from "next/navigation";
import ModalShell from "./ModalShell";
import PrimaryButton from "./ui/PrimaryButton";
import { gameHref } from "@/lib/gameIds";
import VipBadge from "@/components/ui/VipBadge";
import ModalCloseButton from "./ui/ModalCloseButton";
import DeepLiquidShader from "./ui/DeepLiquidShader";

export interface BetDetails {
  id: string;
  username: string;
  game: string;
  gameImage: string;
  isOriginal: boolean;
  amount: number; // total payout
  multiplier: number;
  vipBadge?: string;
  placedAt: number;
}

const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* Short, stable bet reference derived from the win id */
const betRef = (id: string) => {
  let h = 5381;
  for (const c of id) h = ((h << 5) + h + c.charCodeAt(0)) >>> 0;
  return `#${h.toString(16).toUpperCase().padStart(8, "0")}`;
};

const Usdc = ({ size = 16 }: { size?: number }) => <img src="/crypto/usdc.svg" alt="" width={size} height={size} className="inline-block" style={{ width: size, height: size }} />;

export default function BetDetailsModal({ bet, onClose }: { bet: BetDetails | null; onClose: () => void }) {
  const router = useRouter();
  if (!bet) return null;
  const href = gameHref(bet.game, bet.isOriginal);
  const stake = bet.amount / bet.multiplier;
  const profit = bet.amount - stake;
  const tier = bet.multiplier >= 100 ? "mega" : bet.multiplier >= 10 ? "big" : "base";
  const when = new Date(bet.placedAt);

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: "Bet amount", value: <span className="inline-flex items-center gap-1.5">{money(stake)}<Usdc /></span> },
    { label: "Multiplier", value: <span className={tier === "mega" ? "text-[#ffd35a]" : tier === "big" ? "text-lime-300" : ""}>{bet.multiplier}x</span> },
    { label: "Payout", value: <span className="inline-flex items-center gap-1.5">{money(bet.amount)}<Usdc /></span> },
    { label: "Profit", value: <span className="inline-flex items-center gap-1.5 text-lime-300">+{money(profit)}<Usdc /></span> },
    { label: "Game type", value: bet.isOriginal ? "Elixir Original" : "Casino" },
    { label: "Placed", value: when.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }) },
  ];

  return (
    <ModalShell isOpen onClose={onClose} labelledBy="bet-details-title">
      <div className="ui-modal-panel relative my-auto w-full max-w-md shrink-0 overflow-hidden" style={{ boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)" }}>
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <h2 id="bet-details-title" className="ui-modal-title">Bet details</h2>
          <ModalCloseButton onClick={onClose} label="Close bet details" />
        </div>

        <div className="px-5 pb-6 sm:px-6">
          {/* Game and player */}
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-lg">
              <img src={bet.gameImage} alt="" className="h-full w-full object-cover" />
              {bet.isOriginal && <span aria-hidden="true" className="hero-headline absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b052b] via-[#1b052b]/80 to-transparent pb-0.5 pt-3 text-center text-[7px] uppercase leading-none text-white">{bet.game}</span>}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-semibold text-white">{bet.game}</p>
              <div className="mt-1 flex items-center gap-1.5">
                {bet.vipBadge && <VipBadge src={bet.vipBadge} alt="VIP" className="size-6 shrink-0" />}
                <span className="truncate text-sm text-gray-300">{bet.username}</span>
              </div>
            </div>
          </div>

          {/* Payout highlight: 100x and up fills with bubbling green potion behind the number */}
          <div className={`relative isolate mt-4 overflow-hidden rounded-xl px-4 py-5 text-center ${tier === "mega" ? "bg-[#1b0f2c] shadow-[0_0_26px_rgba(57,255,20,0.38),0_0_6px_rgba(57,255,20,0.5)]" : "bg-black/20"}`}>
            {tier === "mega" && (
              <>
                <DeepLiquidShader className="absolute inset-0 -z-10 h-full w-full" />
              </>
            )}
            <p className="ui-caption relative">Won</p>
            <p className="relative mt-0.5 inline-flex items-center gap-2 text-3xl font-black tabular-nums text-white" style={tier === "mega" ? { textShadow: "0 2px 4px rgba(0,0,0,0.85), 0 0 22px rgba(57,255,20,0.55)" } : undefined}>
              <span className={tier === "mega" ? "text-[#fff3c4]" : "gold-shimmer"}>{money(bet.amount)}</span>
              <Usdc size={26} />
            </p>
            <p className={`relative mt-1 text-sm font-bold tabular-nums ${tier === "mega" ? "text-[#ffe9a6]" : tier === "big" ? "text-lime-300" : "text-gray-400"}`} style={tier === "mega" ? { textShadow: "0 1px 3px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.7)" } : undefined}>{bet.multiplier}x multiplier</p>
          </div>

          {/* Details */}
          <dl className="ui-detail-grid mt-4">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="ui-caption">{r.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold tabular-nums text-white">{r.value}</dd>
              </div>
            ))}
          </dl>

          {/* Opens the game's page. Games without a page in this prototype just close the modal. */}
          <PrimaryButton
            className="mt-5 w-full"
            onClick={() => { onClose(); if (href) router.push(href); }}
          >
            Play {bet.game}
          </PrimaryButton>

          <p className="ui-caption mt-4 text-center">Bet {betRef(bet.id)}</p>
        </div>
      </div>
    </ModalShell>
  );
}
