"use client";

import { useState } from "react";
import ModalShell from "./ModalShell";
import VipBadge from "@/components/ui/VipBadge";
import DeepLiquidShader from "@/components/ui/DeepLiquidShader";
import PrimaryButton from "./ui/PrimaryButton";
import ModalCloseButton from "./ui/ModalCloseButton";

/* Placeholder ranks until real rank data exists: moving up from Diamond V to Sapphire I */
const FROM = { label: "Diamond V", badge: "/vip/elixir/tier4.svg" };
const TO = { label: "Sapphire I", badge: "/vip/elixir/tier5.svg" };

interface LevelUpBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
  bonusAmount: number;
  onClaim: () => void;
}

export default function LevelUpBonusModal({ isOpen, onClose, bonusAmount, onClaim }: LevelUpBonusModalProps) {
  const [replayKey, setReplayKey] = useState(0);

  const handleClaim = () => {
    onClaim();
    onClose();
  };

  return (
    <ModalShell isOpen={isOpen} onClose={onClose} labelledBy="level-up-bonus-title" returnFocusTo=".vip-trigger">

      <div className="relative my-auto w-full max-w-lg shrink-0 pt-[144px] sm:pt-[198px]">
        {/* Transparent king animation overlaps the top edge of the card. */}
        <img
          src="/animations/king-peek-poster.png"
          alt=""
          aria-hidden="true"
          width={1280}
          height={694}
          className="pointer-events-none absolute left-1/2 top-0 z-10 hidden h-auto w-[280px] max-w-full -translate-x-1/2 sm:w-[380px] motion-reduce:block"
        />
        <video
          src="/animations/king-peek-coin.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          width={1280}
          height={694}
          className="pointer-events-none absolute left-1/2 top-0 z-10 h-auto w-[280px] max-w-full -translate-x-1/2 sm:w-[380px] motion-reduce:hidden"
        />

      {/* Modal */}
      <div className="ui-modal-panel relative w-full overflow-hidden" style={{ boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <h2 id="level-up-bonus-title" className="ui-modal-title">Level Up Bonus</h2>
          <ModalCloseButton onClick={onClose} label="Close level up bonus" />
        </div>

        {/* Content */}
        <div className="px-5 pb-6 sm:px-6">
          {/* Gradient panel: centered badge showcase above bubbling potion floor */}
          <div className="lu-gradient relative mb-4 min-h-[440px] w-full overflow-hidden rounded-xl pt-9 text-center">
            <DeepLiquidShader className="absolute inset-x-0 bottom-0 h-[52%] w-full" />
            <div className="relative z-10">
              <button
                type="button"
                key={replayKey}
                onClick={() => setReplayKey((k) => k + 1)}
                aria-label={`Replay ${TO.label} badge animation`}
                className="lu-badge-stage group relative mx-auto block w-fit cursor-pointer rounded-3xl p-2"
              >
                <div
                  aria-hidden="true"
                  className="lu-badge-halo pointer-events-none absolute inset-1 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.45)_0%,rgba(139,92,246,0.18)_48%,transparent_72%)] blur-xl"
                />
                <div className="lu-badge-lock relative flex justify-center">
                  <VipBadge src={TO.badge} alt={TO.label} level={1} sheen animated className="size-32 sm:size-36" />
                </div>
                <div className="lu-badge-shadow-wrap mx-auto -mt-1.5 flex justify-center">
                  <div
                    aria-hidden="true"
                    className="lu-badge-shadow h-3.5 w-28 rounded-full bg-black/80 blur-md"
                  />
                </div>
              </button>
              <h3 className="hero-headline relative mt-1 text-3xl uppercase text-white [text-shadow:none]">Rank up!</h3>
              <p className="ui-body relative mt-1 px-5">You moved from {FROM.label} to {TO.label}.</p>
            </div>
          </div>

          {/* Claim Button */}
          <PrimaryButton onClick={handleClaim} disabled={bonusAmount <= 0} className="w-full">
            {bonusAmount > 0 ? (
              <span className="inline-flex items-center gap-1.5">
                Claim {bonusAmount.toFixed(2)}
                <img src="/crypto/usdc.svg" alt="USDC" className="size-5" />
              </span>
            ) : 'No Bonus Available'}
          </PrimaryButton>
        </div>
      </div>
      </div>
    </ModalShell>
  );
}
