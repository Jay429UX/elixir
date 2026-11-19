"use client";

import { useState } from "react";
import Link from "next/link";
import { BiLinkExternal } from "react-icons/bi";
import Toast, { ToastCard } from "@/components/ui/Toast";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";

type VariantId = "guarantee" | "partial" | "maxed";

const PRESETS: Record<
  VariantId,
  {
    label: string;
    title: string;
    message: string;
    usedAmount: number;
    maxAmount: number;
    secondsLeft: number;
  }
> = {
  guarantee: {
    label: "Just Activated ($0)",
    title: "Alchemist's Guarantee",
    message: "Your first bet is backed by the King — 100% refunded in bonus funds if it misses.",
    usedAmount: 0,
    maxAmount: 100,
    secondsLeft: 24 * 3600,
  },
  partial: {
    label: "Partially Used ($35)",
    title: "Alchemist's Guarantee",
    message: "Your first bet is backed by the King — 100% refunded in bonus funds if it misses.",
    usedAmount: 35,
    maxAmount: 100,
    secondsLeft: 4 * 3600 + 28 * 60 + 15,
  },
  maxed: {
    label: "Fully Backed ($100)",
    title: "Alchemist's Guarantee",
    message: "Your first bet is backed by the King — 100% refunded in bonus funds if it misses.",
    usedAmount: 100,
    maxAmount: 100,
    secondsLeft: 18 * 60 + 42,
  },
};

export default function ToastLab() {
  const [preset, setPreset] = useState<VariantId>("partial");
  const [liveOpen, setLiveOpen] = useState(false);
  const [title, setTitle] = useState<string>(PRESETS.partial.title);
  const [message, setMessage] = useState<string>(PRESETS.partial.message);
  const [usedAmount, setUsedAmount] = useState<number>(PRESETS.partial.usedAmount);
  const [secondsLeft, setSecondsLeft] = useState<number>(PRESETS.partial.secondsLeft);

  const selectPreset = (id: VariantId) => {
    setPreset(id);
    setTitle(PRESETS[id].title);
    setMessage(PRESETS[id].message);
    setUsedAmount(PRESETS[id].usedAmount);
    setSecondsLeft(PRESETS[id].secondsLeft);
  };

  return (
    <div className="min-h-screen bg-dicey-darker px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="ui-eyebrow uppercase tracking-[0.08em]">COMPONENT WORKBENCH</p>
            <h1 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-white">
              Alchemist&apos;s Guarantee Toast Lab
            </h1>
            <p className="ui-body mt-1">
              Test live coverage progress, countdown timer, and visual polish for the guarantee toast.
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

        {/* Controls + Preview */}
        <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-5 rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-300/80">
                State Preset
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(PRESETS) as VariantId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectPreset(id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-left text-xs font-semibold transition-colors",
                      preset === id
                        ? "border-[#39ff14]/65 bg-[#39ff14]/10 text-white"
                        : "border-white/10 bg-dicey-dark text-gray-300 hover:border-white/25 hover:text-white"
                    )}
                  >
                    {PRESETS[id].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 rounded-xl border border-white/10 bg-dicey-dark p-4">
              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#ded5eb]">Coverage Used</span>
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

              <div>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#ded5eb]">Time Left to Bet</span>
                  <span className="font-mono font-semibold text-[#d8b4fe]">
                    {Math.floor(secondsLeft / 3600)}h {Math.floor((secondsLeft % 3600) / 60)}m
                  </span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={24 * 3600}
                  step={300}
                  value={secondsLeft}
                  onChange={(e) => setSecondsLeft(Number(e.target.value))}
                  className="w-full accent-[#a855f7]"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-[#ded5eb]">Title</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dicey-dark px-3.5 py-2.5 text-sm text-white outline-none focus:border-lime-300/60"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-[#ded5eb]">Message</span>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-dicey-dark px-3.5 py-2.5 text-sm text-white outline-none focus:border-lime-300/60"
                />
              </label>
            </div>

            <PrimaryButton onClick={() => setLiveOpen(true)} className="w-full">
              Show Live HUD
            </PrimaryButton>
          </div>

          {/* Static Inline Preview */}
          <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-dicey-card p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300/80">
                Live Component Preview
              </p>
              <p className="mt-1 text-xs text-[#b7a9ca]">
                Ticking countdown + dynamic protection meter rendered from{" "}
                <code className="font-mono text-white">ToastCard</code>.
              </p>
            </div>

            <div className="my-8 flex justify-center">
              <ToastCard
                title={title}
                message={message}
                onClose={() => {}}
                coverage={{
                  usedAmount,
                  maxAmount: 100,
                  initialSecondsLeft: secondsLeft,
                }}
              />
            </div>

            <p className="text-[11px] text-[#b7a9ca]">
              Component: <code className="font-mono text-white">src/components/ui/Toast.tsx</code>
            </p>
          </div>
        </div>
      </div>

      <Toast
        isOpen={liveOpen}
        onClose={() => setLiveOpen(false)}
        title={title}
        message={message}
        coverage={{
          usedAmount,
          maxAmount: 100,
          initialSecondsLeft: secondsLeft,
        }}
      />
    </div>
  );
}
