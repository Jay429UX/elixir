"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { BiShield, BiTimeFive, BiX } from "react-icons/bi";
import { cn } from "@/lib/utils";

export interface ToastCoverageProps {
  usedAmount: number;
  maxAmount: number;
  initialSecondsLeft: number;
}

export interface ToastCardProps {
  title: string;
  message: string;
  onClose?: () => void;
  coverage?: ToastCoverageProps;
  mediaSrc?: string;
  className?: string;
}

function formatTimeLeft(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

export function ToastCard({
  title,
  message,
  onClose,
  coverage,
  mediaSrc,
  className,
}: ToastCardProps) {
  const [secondsLeft, setSecondsLeft] = useState(coverage?.initialSecondsLeft ?? 0);

  useEffect(() => {
    setSecondsLeft(coverage?.initialSecondsLeft ?? 0);
  }, [coverage?.initialSecondsLeft]);

  useEffect(() => {
    if (!coverage) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [coverage]);

  const max = coverage?.maxAmount ?? 100;
  const used = Math.min(max, Math.max(0, coverage?.usedAmount ?? 0));
  const remaining = Math.max(0, max - used);
  const pct = max > 0 ? Math.min(100, (used / max) * 100) : 0;

  const visualSrc = mediaSrc ?? (coverage ? "/videos/alchemist-midas-brew-poster.jpg" : undefined);

  return (
    <div
      className={cn(
        "relative w-full max-w-[400px] overflow-hidden rounded-2xl border border-[#39ff14]/40 bg-dicey-card px-3.5 py-3 shadow-[0_18px_50px_rgba(8,4,16,0.85)]",
        className
      )}
    >
      {/* Atmospheric Alchemist artwork backdrop */}
      {visualSrc && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-44 opacity-25"
          style={{
            backgroundImage: `url(${visualSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "75% 25%",
            maskImage: "linear-gradient(to left, black 10%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to left, black 10%, transparent 95%)",
          }}
        />
      )}

      {/* Subtle top-left neon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-8 -top-8 size-24 rounded-full opacity-25 blur-2xl"
        style={{ background: "radial-gradient(circle, #39ff14 0%, transparent 70%)" }}
      />

      <div className="relative space-y-2.5">
        {/* Compact Header Row */}
        <div className="flex items-center gap-3">
          {/* Shield Icon */}
          <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-[#39ff14]/35 bg-[#39ff14]/15 text-[#39ff14] shadow-[0_0_14px_rgba(57,255,20,0.18)]">
            <BiShield className="size-5" />
          </div>

          {/* Title + 1-line compact subtitle */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="relative flex size-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#39ff14] opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#39ff14]" />
              </span>
              <p className="truncate text-sm font-bold tracking-tight text-white">{title}</p>
            </div>
            <p className="text-[11px] leading-snug text-[#b7a9ca]">{message}</p>
          </div>

          {/* Live Countdown + Close */}
          <div className="flex shrink-0 items-center gap-1">
            {coverage && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-dicey-darker px-2 py-1 font-mono text-[11px] font-semibold tabular-nums text-[#d8b4fe]">
                <BiTimeFive className="size-3 text-[#39ff14]" />
                {formatTimeLeft(secondsLeft)}
              </span>
            )}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Dismiss notification"
                className="grid size-6 place-items-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <BiX className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Linear Visual Meter */}
        {coverage && (
          <div className="space-y-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-dicey-darker">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.max(pct, used > 0 ? 4 : 0)}%`,
                  background: "linear-gradient(90deg, #32cd32 0%, #39ff14 100%)",
                  boxShadow: "0 0 10px rgba(57, 255, 20, 0.55)",
                }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] tabular-nums">
              <span className="font-semibold text-[#39ff14]">
                ${used.toFixed(0)}{" "}
                <span className="font-normal text-[#b7a9ca]">/ ${max.toFixed(0)} used</span>
              </span>
              <span className="font-medium text-[#ded5eb]">${remaining.toFixed(0)} left to back</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface ToastProps extends ToastCardProps {
  isOpen: boolean;
  onClose: () => void;
  durationMs?: number;
}

export default function Toast({
  isOpen,
  title,
  message,
  onClose,
  coverage,
  durationMs,
}: ToastProps) {
  useEffect(() => {
    if (!isOpen || !durationMs || durationMs <= 0) return;
    const timer = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timer);
  }, [isOpen, durationMs, onClose]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      className="fixed right-4 top-20 z-[90] w-[calc(100vw-2rem)] max-w-[400px] sm:right-6"
    >
      <div className="animate-drop-in">
        <ToastCard
          title={title}
          message={message}
          onClose={onClose}
          coverage={coverage}
        />
      </div>
    </div>,
    document.body
  );
}
