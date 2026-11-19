"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/elixir-logo.css";

export type ElixirEasterEggId =
  | "crown-slip"
  | "bubble-burp"
  | "glance-elixir"
  | "cheeky-wink"
  | "jelly-shiver"
  | "coin-catch"
  | "coin-flip";

type EasterEggId = ElixirEasterEggId;

const EASTER_EGGS: { id: EasterEggId; durationMs: number }[] = [
  { id: "crown-slip", durationMs: 1150 },
  { id: "bubble-burp", durationMs: 1250 },
  { id: "glance-elixir", durationMs: 1200 },
  { id: "cheeky-wink", durationMs: 950 },
  { id: "jelly-shiver", durationMs: 680 },
  { id: "coin-catch", durationMs: 1450 },
  { id: "coin-flip", durationMs: 1550 },
];

const SLIME_PATH =
  "M 32 18 C 46 18 55 29 55 43 C 55 52.5 48 56 32 56 C 16 56 9 52.5 9 43 C 9 29 18 18 32 18 Z";

export interface ElixirLogoProps {
  variant?: "lockup" | "icon";
  iconClassName?: string;
  textClassName?: string;
  gapClassName?: string;
  className?: string;
  playEntrance?: boolean;
  enableEasterEggs?: boolean;
  forcedEgg?: ElixirEasterEggId | null;
  loopForcedEgg?: boolean;
  light?: boolean;
}

export default function ElixirLogo({
  variant = "lockup",
  iconClassName = "w-9 h-9",
  textClassName = "text-[26px]",
  gapClassName = "gap-1.5",
  className = "",
  playEntrance = true,
  enableEasterEggs = true,
  forcedEgg = null,
  loopForcedEgg = false,
  light = false,
}: ElixirLogoProps) {
  const [phase, setPhase] = useState<"entrance" | "idle">(
    forcedEgg ? "idle" : playEntrance ? "entrance" : "idle"
  );
  const [activeEgg, setActiveEgg] = useState<EasterEggId | null>(forcedEgg);
  const [eggKey, setEggKey] = useState(0);

  const lastEggRef = useRef<EasterEggId | null>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Settle from one-shot 2.2s entrance into calm idle blink
  useEffect(() => {
    if (forcedEgg || phase !== "entrance") return;
    const t = setTimeout(() => setPhase("idle"), 2250);
    return () => clearTimeout(t);
  }, [phase, forcedEgg]);

  // Forced showcase egg (optional continuous loop for Showreel cards)
  useEffect(() => {
    if (!forcedEgg) return;
    setPhase("idle");
    setActiveEgg(forcedEgg);
    setEggKey((k) => k + 1);

    if (!loopForcedEgg) return;
    const def = EASTER_EGGS.find((e) => e.id === forcedEgg);
    const cycleMs = (def?.durationMs ?? 1200) + 900;
    const interval = setInterval(() => {
      setEggKey((k) => k + 1);
    }, cycleMs);
    return () => clearInterval(interval);
  }, [forcedEgg, loopForcedEgg]);

  // Random subtle idle easter eggs every 12-20 seconds
  useEffect(() => {
    if (forcedEgg || !enableEasterEggs || phase !== "idle") return;

    let scheduleTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleNext = () => {
      const delayMs = 12000 + Math.floor(Math.random() * 8000);
      scheduleTimer = setTimeout(() => {
        const pool = EASTER_EGGS.filter((e) => e.id !== lastEggRef.current);
        const pick = pool[Math.floor(Math.random() * pool.length)] ?? EASTER_EGGS[0];
        lastEggRef.current = pick.id;
        setActiveEgg(pick.id);
        setEggKey((k) => k + 1);

        endTimerRef.current = setTimeout(() => {
          setActiveEgg(null);
          scheduleNext();
        }, pick.durationMs + 80);
      }, delayMs);
    };

    scheduleNext();

    return () => {
      if (scheduleTimer) clearTimeout(scheduleTimer);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
    };
  }, [enableEasterEggs, phase]);

  const accent = light ? "#16a34a" : "#5ef439";
  const gold = light ? "#d97706" : "#facc15";
  const eye = light ? "#11101d" : "#140d24";
  const ink = light ? "#11101d" : "#f2f3f7";
  const shadowColor = light ? "rgba(15, 23, 42, 0.22)" : "rgba(0, 0, 0, 0.45)";

  const stateClass =
    phase === "entrance"
      ? "elx-phase-entrance"
      : activeEgg
      ? `elx-phase-idle elx-egg-${activeEgg}`
      : "elx-phase-idle";

  const svgMark = (
    <svg
      key={activeEgg ? `egg-${activeEgg}-${eggKey}` : phase}
      viewBox="0 0 64 64"
      className={`elixir-logo-svg ${iconClassName} overflow-visible shrink-0 ${stateClass}`}
      fill="none"
      aria-hidden="true"
    >
      <ellipse className="slime-shadow" cx="32" cy="58.5" rx="18" ry="3.2" fill={shadowColor} />

      {phase === "entrance" && (
        <g className="alch-fx">
          <circle className="alch-drop-1" cx="24" cy="50" r="2.8" fill={accent} />
          <circle className="alch-drop-2" cx="40" cy="50" r="2.5" fill={accent} />
          <circle className="alch-drop-3" cx="20" cy="52" r="1.9" fill={accent} />
          <circle className="alch-drop-4" cx="44" cy="52" r="2.1" fill={accent} />
          <circle className="alch-drop-5" cx="32" cy="46" r="2.2" fill={accent} />
          <path
            className="alch-spark-1"
            fill={gold}
            d="M12 12 L13.4 15.6 L17 17 L13.4 18.4 L12 22 L10.6 18.4 L7 17 L10.6 15.6 Z"
          />
          <path
            className="alch-spark-2"
            fill={gold}
            d="M52 10 L53.2 13 L56 14 L53.2 15 L52 18 L50.8 15 L48 14 L50.8 13 Z"
          />
        </g>
      )}

      {activeEgg === "bubble-burp" && (
        <g className="egg-burp-bubble">
          <circle cx="38" cy="26" r="3.4" fill={accent} />
          <circle cx="37" cy="24.8" r="1.1" fill="#ffffff" opacity={0.75} />
        </g>
      )}

      {activeEgg === "cheeky-wink" && (
        <path
          className="egg-wink-spark"
          fill={gold}
          d="M50 11 L51.5 14.5 L55 16 L51.5 17.5 L50 21 L48.5 17.5 L45 16 L48.5 14.5 Z"
        />
      )}

      {(activeEgg === "coin-catch" || activeEgg === "coin-flip") && (
        <g className="egg-coin-fx">
          <g className="egg-coin-wrap">
            <g className="egg-coin-spin">
              <circle
                cx="32"
                cy="14"
                r="6.8"
                fill={gold}
                stroke={light ? "#b45309" : "#fef08a"}
                strokeWidth="1.2"
              />
              <circle cx="32" cy="14" r="4.5" stroke={eye} strokeWidth="0.9" opacity={0.35} />
              <path
                d="M32 10.6 V17.4 M33.5 12 C33.5 11.1 30.5 11.1 30.5 12.4 C30.5 13.7 33.6 13.4 33.6 14.8 C33.6 16.1 30.4 16.1 30.4 15"
                stroke={eye}
                strokeWidth="1.25"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          </g>
          <path
            className="egg-coin-spark-1"
            fill={gold}
            d="M11 16 L12.4 19.2 L15.6 20.6 L12.4 22 L11 25.2 L9.6 22 L6.4 20.6 L9.6 19.2 Z"
          />
          <path
            className="egg-coin-spark-2"
            fill={gold}
            d="M53 14 L54.2 16.8 L57 18 L54.2 19.2 L53 22 L51.8 19.2 L49 18 L51.8 16.8 Z"
          />
        </g>
      )}

      <g className="slime-crown">
        <g transform="rotate(-10 32 14)">
          <path fill={gold} d="M21 19 L19 9 L26.5 13.5 L32 6.5 L37.5 13.5 L45 9 L43 19 Z" />
          <circle cx="32" cy="5.8" r="1.8" fill={gold} />
        </g>
      </g>

      <g className="slime-body">
        <path className="slime-shape" fill={accent} d={SLIME_PATH} />
        <ellipse
          cx="21"
          cy="30"
          rx="4.2"
          ry="2.4"
          transform="rotate(-32 21 30)"
          fill="#ffffff"
          opacity={0.45}
        />

        {activeEgg === "cheeky-wink" && (
          <g className="egg-wink-blush">
            <ellipse cx="17.5" cy="42" rx="3.1" ry="1.6" fill="#ff7ab6" />
            <ellipse cx="46.5" cy="42" rx="3.1" ry="1.6" fill="#ff7ab6" />
          </g>
        )}

        <g className="slime-face">
          <g className="slime-eyes-wrap">
            <g className="eye-left">
              <circle cx="24.5" cy="37" r="3.4" fill={eye} />
              <circle cx="25.6" cy="35.8" r="1.2" fill="#ffffff" />
            </g>
            <g className="eye-right">
              <circle cx="39.5" cy="37" r="3.4" fill={eye} />
              <circle cx="40.6" cy="35.8" r="1.2" fill="#ffffff" />
            </g>

            {(activeEgg === "coin-catch" || activeEgg === "coin-flip") && (
              <g className="egg-dollar-eyes">
                <g transform="translate(24.5, 37)">
                  <path
                    d="M0 -4.8 V4.8 M2.4 -2.2 C2.4 -3.6 -2.4 -3.6 -2.4 -1.6 C-2.4 0.3 2.5 -0.2 2.5 1.8 C2.5 3.7 -2.4 3.7 -2.4 2.1"
                    stroke={eye}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
                <g transform="translate(39.5, 37)">
                  <path
                    d="M0 -4.8 V4.8 M2.4 -2.2 C2.4 -3.6 -2.4 -3.6 -2.4 -1.6 C-2.4 0.3 2.5 -0.2 2.5 1.8 C2.5 3.7 -2.4 3.7 -2.4 2.1"
                    stroke={eye}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              </g>
            )}
          </g>
          <path
            className="slime-smile"
            d="M26 44.5 Q32 50 38 44.5"
            stroke={eye}
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );

  if (variant === "icon") {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} role="img" aria-label="Elixir">
        {svgMark}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center ${gapClassName} ${className}`}>
      {svgMark}
      <span
        style={{ color: ink, fontFamily: "var(--font-hero), sans-serif" }}
        className={`font-black tracking-[0.04em] leading-none select-none ${textClassName}`}
      >
        ELIXIR
      </span>
    </span>
  );
}
