"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type SurfaceId = "sidebar" | "darker" | "black" | "light";
type PlaybackSpeed = 1 | 0.5 | 0.25;
type EasterEggId =
  | "crown-slip"
  | "bubble-burp"
  | "glance-elixir"
  | "cheeky-wink"
  | "jelly-shiver"
  | "coin-catch"
  | "coin-flip";

interface EasterEgg {
  id: EasterEggId;
  number: string;
  name: string;
  durationMs: number;
  note: string;
}

const SURFACES: { id: SurfaceId; label: string; bg: string; border: string; light: boolean }[] = [
  { id: "sidebar", label: "Sidebar", bg: "#2a1d42", border: "rgba(196,181,253,0.18)", light: false },
  { id: "darker", label: "Canvas", bg: "#140d24", border: "rgba(196,181,253,0.14)", light: false },
  { id: "black", label: "Obsidian", bg: "#09090b", border: "rgba(255,255,255,0.10)", light: false },
  { id: "light", label: "Light", bg: "#f8fafc", border: "rgba(15,23,42,0.12)", light: true },
];

const EASTER_EGGS: EasterEgg[] = [
  {
    id: "crown-slip",
    number: "01",
    name: "Crown Slip & Catch",
    durationMs: 1150,
    note: "Crown tilts too far, slime flicks it back with a quick hop.",
  },
  {
    id: "bubble-burp",
    number: "02",
    name: "The Bubble Burp",
    durationMs: 1250,
    note: "Puffs slightly and lets out a tiny emerald bubble that pops.",
  },
  {
    id: "glance-elixir",
    number: "03",
    name: "Curious Glance",
    durationMs: 1200,
    note: "Eyes dart right to inspect ELIXIR with a curious 4-deg lean.",
  },
  {
    id: "cheeky-wink",
    number: "04",
    name: "The Cheeky Wink",
    durationMs: 950,
    note: "Crisp right-eye wink, subtle blush, and a golden sparkle ping.",
  },
  {
    id: "jelly-shiver",
    number: "05",
    name: "Jelly Shiver",
    durationMs: 680,
    note: "Quick potion-fizz wiggle that rattles the crown on top.",
  },
  {
    id: "coin-catch",
    number: "06",
    name: "Gold Coin Catch ($$)",
    durationMs: 1450,
    note: "Spinning gold coin drops in and his eyes pop into dollar signs.",
  },
  {
    id: "coin-flip",
    number: "07",
    name: "Coin Flip Cha-Ching ($$)",
    durationMs: 1550,
    note: "Flips a gold coin high into the air with excited dollar-sign eyes.",
  },
];

const SLIME_PATH =
  "M 32 18 C 46 18 55 29 55 43 C 55 52.5 48 56 32 56 C 16 56 9 52.5 9 43 C 9 29 18 18 32 18 Z";

function RoyalAlchemistSvg({
  light,
  phase,
  activeEgg,
  eggKey,
  className = "w-20 h-20",
}: {
  light: boolean;
  phase: "entrance" | "idle";
  activeEgg: EasterEggId | null;
  eggKey: number;
  className?: string;
}) {
  const accent = light ? "#16a34a" : "#5ef439";
  const gold = light ? "#d97706" : "#facc15";
  const eye = light ? "#11101d" : "#140d24";
  const shadowColor = light ? "rgba(15, 23, 42, 0.22)" : "rgba(0, 0, 0, 0.45)";

  const stateClass =
    phase === "entrance"
      ? "slime-phase-entrance"
      : activeEgg
      ? `slime-phase-idle slime-egg-${activeEgg}`
      : "slime-phase-idle";

  return (
    <svg
      key={activeEgg ? `egg-${activeEgg}-${eggKey}` : phase}
      viewBox="0 0 64 64"
      className={`${className} overflow-visible shrink-0 ${stateClass}`}
      fill="none"
      aria-hidden="true"
    >
      {/* Dynamic ground contact shadow */}
      <ellipse className="slime-shadow" cx="32" cy="58.5" rx="18" ry="3.2" fill={shadowColor} />

      {/* Entrance-only splash droplets + sparkles */}
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

      {/* Easter-egg prop: Bubble Burp */}
      {activeEgg === "bubble-burp" && (
        <g className="egg-burp-bubble">
          <circle cx="38" cy="26" r="3.4" fill={accent} />
          <circle cx="37" cy="24.8" r="1.1" fill="#ffffff" opacity={0.75} />
        </g>
      )}

      {/* Easter-egg prop: Cheeky Wink Sparkle */}
      {activeEgg === "cheeky-wink" && (
        <path
          className="egg-wink-spark"
          fill={gold}
          d="M50 11 L51.5 14.5 L55 16 L51.5 17.5 L50 21 L48.5 17.5 L45 16 L48.5 14.5 Z"
        />
      )}

      {/* Easter-egg prop: Spinning Gold Coin + Sparkles */}
      {(activeEgg === "coin-catch" || activeEgg === "coin-flip") && (
        <g className="egg-coin-fx">
          <g className="egg-coin-wrap">
            <g className="egg-coin-spin">
              <circle cx="32" cy="14" r="6.8" fill={gold} stroke={light ? "#b45309" : "#fef08a"} strokeWidth="1.2" />
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

      {/* Gold Crown */}
      <g className="slime-crown">
        <g transform="rotate(-10 32 14)">
          <path fill={gold} d="M21 19 L19 9 L26.5 13.5 L32 6.5 L37.5 13.5 L45 9 L43 19 Z" />
          <circle cx="32" cy="5.8" r="1.8" fill={gold} />
        </g>
      </g>

      {/* Morphable Body + Expressive Face */}
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

        {/* Rosy blush (only visible on cheeky-wink) */}
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

            {/* Crisp vector $ dollar-sign eyes for coin easter eggs */}
            {(activeEgg === "coin-catch" || activeEgg === "coin-flip") && (
              <g className="egg-dollar-eyes">
                <g className="dollar-eye-left" transform="translate(24.5, 37)">
                  <path
                    d="M0 -4.8 V4.8 M2.4 -2.2 C2.4 -3.6 -2.4 -3.6 -2.4 -1.6 C-2.4 0.3 2.5 -0.2 2.5 1.8 C2.5 3.7 -2.4 3.7 -2.4 2.1"
                    stroke={eye}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
                <g className="dollar-eye-right" transform="translate(39.5, 37)">
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
}

function RoyalAlchemistLockup({
  light,
  phase,
  activeEgg,
  eggKey,
  size = "hero",
}: {
  light: boolean;
  phase: "entrance" | "idle";
  activeEgg: EasterEggId | null;
  eggKey: number;
  size?: "hero" | "sidebar";
}) {
  const ink = light ? "#11101d" : "#f2f3f7";
  const isHero = size === "hero";

  return (
    <div className={`inline-flex items-center ${isHero ? "gap-2" : "gap-1"}`}>
      <RoyalAlchemistSvg
        light={light}
        phase={phase}
        activeEgg={activeEgg}
        eggKey={eggKey}
        className={isHero ? "w-20 h-20" : "w-7 h-7"}
      />
      <span
        style={{ color: ink, fontFamily: "var(--font-hero), sans-serif" }}
        className={`font-black tracking-[0.04em] leading-none ${
          isHero ? "text-[52px]" : "text-[19px]"
        }`}
      >
        ELIXIR
      </span>
    </div>
  );
}

export default function LogoAnimatePage() {
  const [surfaceId, setSurfaceId] = useState<SurfaceId>("sidebar");
  const [speed, setSpeed] = useState<PlaybackSpeed>(1);
  const [phase, setPhase] = useState<"entrance" | "idle">("entrance");
  const [entranceKey, setEntranceKey] = useState(0);
  const [activeEgg, setActiveEgg] = useState<EasterEggId | null>(null);
  const [eggKey, setEggKey] = useState(0);
  const [autoRandom, setAutoRandom] = useState(false);

  const eggTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastEggRef = useRef<EasterEggId | null>(null);

  const surface = SURFACES.find((s) => s.id === surfaceId) ?? SURFACES[0];
  const speedMultiplier = 1 / speed;

  // Transition from one-shot entrance -> calm idle blink after 2.2s * speedMultiplier
  useEffect(() => {
    if (phase !== "entrance") return;
    const t = setTimeout(() => {
      setPhase("idle");
    }, Math.round(2250 * speedMultiplier));
    return () => clearTimeout(t);
  }, [phase, entranceKey, speedMultiplier]);

  const replayEntrance = () => {
    if (eggTimerRef.current) clearTimeout(eggTimerRef.current);
    setActiveEgg(null);
    setPhase("entrance");
    setEntranceKey((k) => k + 1);
  };

  const triggerEgg = (id: EasterEggId) => {
    const egg = EASTER_EGGS.find((e) => e.id === id);
    if (!egg) return;
    if (eggTimerRef.current) clearTimeout(eggTimerRef.current);
    setPhase("idle");
    setActiveEgg(id);
    setEggKey((k) => k + 1);
    lastEggRef.current = id;
    eggTimerRef.current = setTimeout(() => {
      setActiveEgg(null);
    }, Math.round(egg.durationMs * speedMultiplier) + 60);
  };

  const triggerRandomEgg = () => {
    const pool = EASTER_EGGS.filter((e) => e.id !== lastEggRef.current);
    const pick = pool[Math.floor(Math.random() * pool.length)] ?? EASTER_EGGS[0];
    triggerEgg(pick.id);
  };

  // Optional demo auto-randomizer (fires a random easter egg every 4.5s while idle)
  useEffect(() => {
    if (!autoRandom || phase !== "idle") return;
    const interval = setInterval(() => {
      triggerRandomEgg();
    }, Math.round(4500 * speedMultiplier));
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoRandom, phase, speedMultiplier]);

  useEffect(() => {
    return () => {
      if (eggTimerRef.current) clearTimeout(eggTimerRef.current);
    };
  }, []);

  const statusLabel =
    phase === "entrance"
      ? "Playing Entrance (2.2s)"
      : activeEgg
      ? `Playing: ${EASTER_EGGS.find((e) => e.id === activeEgg)?.name}`
      : "Idle (Periodic Eye Blink)";

  return (
    <div
      className="min-h-dvh px-4 py-8 sm:px-8 lg:px-12 max-w-[1120px] mx-auto"
      style={{ "--speed-mult": speedMultiplier } as React.CSSProperties}
    >
      <style>{`
        :root {
          --ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1);
          --ease-in-out-strong: cubic-bezier(0.77, 0, 0.175, 1);
        }

        .slime-body {
          transform-box: fill-box;
          transform-origin: 50% 100%;
        }
        .slime-crown {
          transform-box: fill-box;
          transform-origin: 50% 90%;
        }
        .slime-shadow,
        .slime-eyes-wrap,
        .eye-left,
        .eye-right,
        .slime-face,
        .slime-smile,
        .alch-drop-1,
        .alch-drop-2,
        .alch-drop-3,
        .alch-drop-4,
        .alch-drop-5,
        .alch-spark-1,
        .alch-spark-2,
        .egg-burp-bubble,
        .egg-wink-spark,
        .egg-wink-blush,
        .egg-coin-wrap,
        .egg-coin-spin,
        .egg-coin-spark-1,
        .egg-coin-spark-2,
        .egg-dollar-eyes {
          transform-box: fill-box;
          transform-origin: 50% 50%;
        }

        /* =====================================================================
           ONE-SHOT ENTRANCE (2.2s · 24 Physics Keyframes)
           ===================================================================== */
        @keyframes alchShape {
          0%, 14% {
            d: path("M 32 8 C 32 8 50 28 50 41 C 50 51 42 56 32 56 C 22 56 14 51 14 41 C 14 28 32 8 32 8 Z");
            animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          17% {
            d: path("M 32 28 C 44 28 54 38 55 47 C 56 54 47 56 32 56 C 17 56 8 54 9 47 C 10 38 20 28 32 28 Z");
            animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          21%, 28% {
            d: path("M 32 44 C 49 44 58 46.5 58 51 C 58 55 48 56 32 56 C 16 56 6 55 6 51 C 6 46.5 15 44 32 44 Z");
            animation-timing-function: ease-in-out;
          }
          35% {
            d: path("M 32 32 C 45 32 54 39 54 47 C 54 54 46 56 32 56 C 18 56 10 54 10 47 C 10 39 19 32 32 32 Z");
            animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          }
          45%, 100% {
            d: path("M 32 18 C 46 18 55 29 55 43 C 55 52.5 48 56 32 56 C 16 56 9 52.5 9 43 C 9 29 18 18 32 18 Z");
          }
        }
        @keyframes alchBody {
          0%   { opacity: 0; transform: translateY(-34px) scaleX(0.68) scaleY(1.38); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          4%   { opacity: 1; transform: translateY(-29px) scaleX(0.66) scaleY(1.42); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          10%  { opacity: 1; transform: translateY(-16px) scaleX(0.64) scaleY(1.48); animation-timing-function: linear; }
          15%  { opacity: 1; transform: translateY(-2px) scaleX(0.74) scaleY(1.34); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          18%  { transform: translateY(2.5px) scaleX(1.30) scaleY(0.64); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          22%  { transform: translateY(3.5px) scaleX(1.42) scaleY(0.54); animation-timing-function: ease-in-out; }
          27%  { transform: translateY(2.2px) scaleX(1.26) scaleY(0.72); animation-timing-function: ease-in-out; }
          31%  { transform: translateY(1.5px) scaleX(1.12) scaleY(0.86); animation-timing-function: ease-in-out; }
          35%  { transform: translateY(3px) scaleX(1.22) scaleY(0.76); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          41%  { transform: translateY(-9px) scaleX(0.82) scaleY(1.22) rotate(-4deg); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); }
          47%  { transform: translateY(-16px) scaleX(0.86) scaleY(1.15) rotate(-5deg); animation-timing-function: ease-in-out; }
          51%  { transform: translateY(-17.5px) scaleX(0.92) scaleY(1.08) rotate(-2.5deg); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          57%  { transform: translateY(-5px) scaleX(0.86) scaleY(1.16) rotate(1deg); animation-timing-function: linear; }
          60%  { transform: translateY(3px) scaleX(1.22) scaleY(0.78) rotate(2deg); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          66%  { transform: translateY(-3.5px) scaleX(0.92) scaleY(1.09) rotate(-1deg); animation-timing-function: ease-in-out; }
          72%  { transform: translateY(2.2px) scaleX(1.12) scaleY(0.88) rotate(0.5deg); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          79%  { transform: translateY(-1.5px) scaleX(0.96) scaleY(1.04) rotate(-0.5deg); animation-timing-function: ease-in-out; }
          86%  { transform: translateY(0.6px) scaleX(1.03) scaleY(0.97) rotate(0deg); animation-timing-function: ease-in-out; }
          93%  { transform: translateY(-0.3px) scaleX(0.99) scaleY(1.01) rotate(0deg); animation-timing-function: ease-out; }
          100% { opacity: 1; transform: translateY(0) scaleX(1) scaleY(1) rotate(0deg); }
        }
        @keyframes alchShadow {
          0%   { opacity: 0; transform: scaleX(0.25); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          15%  { opacity: 0.7; transform: scaleX(0.85); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          22%  { opacity: 0.95; transform: scaleX(1.44); animation-timing-function: ease-in-out; }
          35%  { opacity: 0.85; transform: scaleX(1.18); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          51%  { opacity: 0.32; transform: scaleX(0.52); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          60%  { opacity: 0.95; transform: scaleX(1.24); animation-timing-function: ease-in-out; }
          72%  { opacity: 0.85; transform: scaleX(1.12); animation-timing-function: ease-in-out; }
          100% { opacity: 0.65; transform: scaleX(1); }
        }
        @keyframes alchCrown {
          0%, 40% { opacity: 0; transform: translateY(-18px) scale(0.72) rotate(-26deg); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          50%  { opacity: 1; transform: translateY(-25px) scale(1.08) rotate(18deg); animation-timing-function: ease-in-out; }
          58%  { opacity: 1; transform: translateY(-18px) scale(1.03) rotate(6deg); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          70%  { opacity: 1; transform: translateY(3px) scaleX(1.1) scaleY(0.88) rotate(7deg); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          80%  { opacity: 1; transform: translateY(-2.5px) scale(1) rotate(-3deg); animation-timing-function: ease-in-out; }
          90%  { opacity: 1; transform: translateY(0.6px) scale(1) rotate(1deg); animation-timing-function: ease-out; }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
        }
        @keyframes alchDrop1 {
          0%, 15% { opacity: 0; transform: translate(6px, 2px) scale(0.45); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          19%  { opacity: 1; transform: translate(-5px, -11px) scale(1.08); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); }
          25%  { opacity: 1; transform: translate(-13px, -15px) scale(0.96); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          32%  { opacity: 0.7; transform: translate(-18px, -6px) scale(0.7); animation-timing-function: linear; }
          38%, 100% { opacity: 0; transform: translate(-22px, 6px) scale(0.3); }
        }
        @keyframes alchDrop2 {
          0%, 15% { opacity: 0; transform: translate(-6px, 2px) scale(0.45); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          20%  { opacity: 1; transform: translate(6px, -13px) scale(1.06); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); }
          26%  { opacity: 1; transform: translate(14px, -17px) scale(0.94); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          33%  { opacity: 0.7; transform: translate(19px, -7px) scale(0.68); animation-timing-function: linear; }
          39%, 100% { opacity: 0; transform: translate(23px, 6px) scale(0.3); }
        }
        @keyframes alchDrop3 {
          0%, 16% { opacity: 0; transform: translate(8px, 1px) scale(0.45); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          22%  { opacity: 1; transform: translate(-12px, -8px) scale(1); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          33%, 100% { opacity: 0; transform: translate(-24px, 5px) scale(0.3); }
        }
        @keyframes alchDrop4 {
          0%, 16% { opacity: 0; transform: translate(-8px, 1px) scale(0.45); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          22%  { opacity: 1; transform: translate(13px, -9px) scale(1); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          34%, 100% { opacity: 0; transform: translate(25px, 5px) scale(0.3); }
        }
        @keyframes alchDrop5 {
          0%, 15% { opacity: 0; transform: translate(0, 4px) scale(0.45); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          22%  { opacity: 1; transform: translate(1.5px, -19px) scale(1.05); animation-timing-function: ease-in-out; }
          27%  { opacity: 1; transform: translate(2.5px, -21px) scale(0.92); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          36%, 100% { opacity: 0; transform: translate(4px, -8px) scale(0.3); }
        }
        @keyframes alchSpark {
          0%, 46% { opacity: 0; transform: scale(0.2) rotate(0deg); }
          58%  { opacity: 1; transform: scale(1.15) rotate(45deg); }
          76%, 100% { opacity: 0; transform: scale(0.3) rotate(90deg); }
        }
        @keyframes alchFace {
          0%, 44% { opacity: 0; transform: scale(0.75) translateY(4px); }
          56%  { opacity: 1; transform: scale(1.06) translateY(-2px); }
          70%, 100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes alchEyesLook {
          0%, 56% { transform: translate(0, 0); }
          66%  { transform: translate(0, -2.5px); }
          84%, 100% { transform: translate(0, 0); }
        }

        .slime-phase-entrance .slime-shape { animation: alchShape calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .slime-body { animation: alchBody calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .slime-shadow { animation: alchShadow calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .slime-crown { animation: alchCrown calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .alch-drop-1 { animation: alchDrop1 calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .alch-drop-2 { animation: alchDrop2 calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .alch-drop-3 { animation: alchDrop3 calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .alch-drop-4 { animation: alchDrop4 calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .alch-drop-5 { animation: alchDrop5 calc(2200ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-phase-entrance .alch-spark-1,
        .slime-phase-entrance .alch-spark-2 { animation: alchSpark calc(2200ms * var(--speed-mult, 1)) var(--ease-out-strong) 1 forwards; }
        .slime-phase-entrance .slime-face { animation: alchFace calc(2200ms * var(--speed-mult, 1)) var(--ease-out-strong) 1 forwards; }
        .slime-phase-entrance .slime-eyes-wrap { animation: alchEyesLook calc(2200ms * var(--speed-mult, 1)) var(--ease-in-out-strong) 1 forwards; }

        /* Settled idle shadow */
        .slime-phase-idle .slime-shadow {
          opacity: 0.65;
        }

        /* =====================================================================
           DEFAULT IDLE BLINK (Every 4.6s when no easter egg is active)
           ===================================================================== */
        @keyframes slimeIdleBlink {
          0%, 44%, 49%, 100% { transform: scaleY(1); }
          46.5% { transform: scaleY(0.10); }
        }
        .slime-phase-idle:not([class*="slime-egg-"]) .eye-left,
        .slime-phase-idle:not([class*="slime-egg-"]) .eye-right {
          animation: slimeIdleBlink calc(4600ms * var(--speed-mult, 1)) ease infinite;
        }

        /* =====================================================================
           EASTER EGG 01: CROWN SLIP & CATCH (1150ms)
           ===================================================================== */
        @keyframes eggSlipCrown {
          0%   { transform: translate(0, 0) rotate(0deg); animation-timing-function: ease-in; }
          32%  { transform: translate(6px, 3px) rotate(28deg); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          52%  { transform: translate(2px, -9px) rotate(-14deg); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          74%  { transform: translate(0, 2px) rotate(5deg); animation-timing-function: ease-out; }
          88%  { transform: translate(0, -1px) rotate(-2deg); animation-timing-function: ease-out; }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes eggSlipBody {
          0%, 22% { transform: translateY(0) scaleX(1) scaleY(1); animation-timing-function: ease-in-out; }
          36%  { transform: translateY(2px) scaleX(1.12) scaleY(0.88) rotate(3deg); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          52%  { transform: translateY(-5px) scaleX(0.92) scaleY(1.09) rotate(-4deg); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          72%  { transform: translateY(1.5px) scaleX(1.07) scaleY(0.93) rotate(1deg); animation-timing-function: ease-out; }
          100% { transform: translateY(0) scaleX(1) scaleY(1) rotate(0deg); }
        }
        @keyframes eggSlipEyes {
          0%, 10% { transform: translate(0, 0); }
          30%, 56% { transform: translate(2.5px, -2.5px); }
          80%, 100% { transform: translate(0, 0); }
        }
        .slime-egg-crown-slip .slime-crown { animation: eggSlipCrown calc(1150ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-crown-slip .slime-body { animation: eggSlipBody calc(1150ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-crown-slip .slime-eyes-wrap { animation: eggSlipEyes calc(1150ms * var(--speed-mult, 1)) ease-in-out 1 forwards; }

        /* =====================================================================
           EASTER EGG 02: THE BUBBLE BURP (1250ms)
           ===================================================================== */
        @keyframes eggBurpBody {
          0%   { transform: scaleX(1) scaleY(1); animation-timing-function: ease-in-out; }
          26%  { transform: scaleX(1.10) scaleY(0.92); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          44%  { transform: scaleX(0.95) scaleY(1.06); animation-timing-function: ease-in-out; }
          64%  { transform: scaleX(1.03) scaleY(0.97); animation-timing-function: ease-out; }
          100% { transform: scaleX(1) scaleY(1); }
        }
        @keyframes eggBurpCrown {
          0%, 22% { transform: translateY(0) rotate(0deg); }
          32%  { transform: translateY(1.5px) rotate(-3deg); }
          46%  { transform: translateY(-3px) rotate(4deg); }
          70%, 100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes eggBurpBubble {
          0%, 26% { opacity: 0; transform: translate(-4px, 16px) scale(0.35); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          46%  { opacity: 1; transform: translate(2px, 0px) scale(0.95); animation-timing-function: ease-out; }
          76%  { opacity: 1; transform: translate(6px, -15px) scale(1.18); animation-timing-function: ease-in; }
          84%  { opacity: 0; transform: translate(7px, -19px) scale(1.45); }
          100% { opacity: 0; }
        }
        @keyframes eggBurpBlink {
          0%, 62%, 78%, 100% { transform: scaleY(1); }
          70% { transform: scaleY(0.12); }
        }
        .slime-egg-bubble-burp .slime-body { animation: eggBurpBody calc(1250ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-bubble-burp .slime-crown { animation: eggBurpCrown calc(1250ms * var(--speed-mult, 1)) ease-in-out 1 forwards; }
        .slime-egg-bubble-burp .egg-burp-bubble { animation: eggBurpBubble calc(1250ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-bubble-burp .eye-left,
        .slime-egg-bubble-burp .eye-right { animation: eggBurpBlink calc(1250ms * var(--speed-mult, 1)) ease 1 forwards; }

        /* =====================================================================
           EASTER EGG 03: CURIOUS GLANCE AT ELIXIR (1200ms)
           ===================================================================== */
        @keyframes eggGlanceBody {
          0%   { transform: rotate(0deg) scaleX(1) scaleY(1); }
          25%, 68% { transform: rotate(5deg) translateX(2px) scaleX(1.03) scaleY(0.97); }
          88%  { transform: rotate(-1.5deg) scaleX(0.99) scaleY(1.01); }
          100% { transform: rotate(0deg) scaleX(1) scaleY(1); }
        }
        @keyframes eggGlanceCrown {
          0%   { transform: translate(0, 0) rotate(0deg); }
          28%, 70% { transform: translate(2.5px, 0.5px) rotate(9deg); }
          90%  { transform: translate(-0.5px, 0) rotate(-2deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes eggGlanceEyes {
          0%   { transform: translate(0, 0); }
          18%, 74% { transform: translate(3.5px, -0.5px); }
          100% { transform: translate(0, 0); }
        }
        .slime-egg-glance-elixir .slime-body { animation: eggGlanceBody calc(1200ms * var(--speed-mult, 1)) var(--ease-in-out-strong) 1 forwards; }
        .slime-egg-glance-elixir .slime-crown { animation: eggGlanceCrown calc(1200ms * var(--speed-mult, 1)) var(--ease-in-out-strong) 1 forwards; }
        .slime-egg-glance-elixir .slime-eyes-wrap { animation: eggGlanceEyes calc(1200ms * var(--speed-mult, 1)) var(--ease-out-strong) 1 forwards; }

        /* =====================================================================
           EASTER EGG 04: THE CHEEKY WINK (950ms)
           ===================================================================== */
        @keyframes eggWinkBody {
          0%   { transform: rotate(0deg) scaleX(1) scaleY(1); }
          28%, 62% { transform: rotate(-3.5deg) scaleX(1.04) scaleY(0.97); }
          100% { transform: rotate(0deg) scaleX(1) scaleY(1); }
        }
        @keyframes eggWinkCrown {
          0%   { transform: rotate(0deg) translateY(0); }
          32%, 64% { transform: rotate(-8deg) translateY(-1.5px); }
          100% { transform: rotate(0deg) translateY(0); }
        }
        @keyframes eggWinkEye {
          0%, 16%, 72%, 100% { transform: scaleY(1); }
          28%, 60% { transform: scaleY(0.14); }
        }
        @keyframes eggWinkSpark {
          0%, 18% { opacity: 0; transform: scale(0.2) rotate(0deg); }
          44%  { opacity: 1; transform: scale(1.15) rotate(45deg); }
          80%, 100% { opacity: 0; transform: scale(0.25) rotate(95deg); }
        }
        @keyframes eggWinkBlush {
          0%, 14% { opacity: 0; }
          32%, 68% { opacity: 0.65; }
          100% { opacity: 0; }
        }
        .slime-egg-cheeky-wink .slime-body { animation: eggWinkBody calc(950ms * var(--speed-mult, 1)) var(--ease-out-strong) 1 forwards; }
        .slime-egg-cheeky-wink .slime-crown { animation: eggWinkCrown calc(950ms * var(--speed-mult, 1)) var(--ease-out-strong) 1 forwards; }
        .slime-egg-cheeky-wink .eye-right { animation: eggWinkEye calc(950ms * var(--speed-mult, 1)) ease 1 forwards; }
        .slime-egg-cheeky-wink .egg-wink-spark { animation: eggWinkSpark calc(950ms * var(--speed-mult, 1)) var(--ease-out-strong) 1 forwards; }
        .slime-egg-cheeky-wink .egg-wink-blush { animation: eggWinkBlush calc(950ms * var(--speed-mult, 1)) ease 1 forwards; }

        /* =====================================================================
           EASTER EGG 05: JELLY SHIVER (680ms)
           ===================================================================== */
        @keyframes eggShiverBody {
          0%   { transform: skewX(0deg) scaleX(1) scaleY(1); }
          15%  { transform: skewX(-7deg) scaleX(1.06) scaleY(0.95); }
          32%  { transform: skewX(7deg) scaleX(0.96) scaleY(1.04); }
          49%  { transform: skewX(-5deg) scaleX(1.04) scaleY(0.96); }
          66%  { transform: skewX(4deg) scaleX(0.98) scaleY(1.02); }
          82%  { transform: skewX(-2deg) scaleX(1.01) scaleY(0.99); }
          100% { transform: skewX(0deg) scaleX(1) scaleY(1); }
        }
        @keyframes eggShiverCrown {
          0%   { transform: translateY(0) rotate(0deg); }
          20%  { transform: translateY(-2.5px) rotate(-10deg); }
          38%  { transform: translateY(-2px) rotate(11deg); }
          56%  { transform: translateY(-1.5px) rotate(-7deg); }
          74%  { transform: translateY(-0.5px) rotate(5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .slime-egg-jelly-shiver .slime-body { animation: eggShiverBody calc(680ms * var(--speed-mult, 1)) ease-in-out 1 forwards; }
        .slime-egg-jelly-shiver .slime-crown { animation: eggShiverCrown calc(680ms * var(--speed-mult, 1)) ease-in-out 1 forwards; }

        /* =====================================================================
           EASTER EGG 06: GOLD COIN CATCH + $$ EYES (1450ms)
           Spinning coin arcs in from above -> eyes pop into $ signs -> happy catch hop
           ===================================================================== */
        @keyframes eggCoinCatchDrop {
          0%   { opacity: 0; transform: translate(18px, -24px) scale(0.75); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          18%  { opacity: 1; transform: translate(6px, -12px) scale(1.06); animation-timing-function: ease-in-out; }
          44%  { opacity: 1; transform: translate(0, -10px) scale(1); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          62%  { opacity: 1; transform: translate(0, 6px) scale(0.85); animation-timing-function: ease-out; }
          70%, 100% { opacity: 0; transform: translate(0, 12px) scale(0.3); }
        }
        @keyframes eggCoinAxisSpin {
          0%   { transform: scaleX(1); }
          20%  { transform: scaleX(0.12); }
          40%  { transform: scaleX(1); }
          60%  { transform: scaleX(0.12); }
          80%  { transform: scaleX(1); }
          100% { transform: scaleX(0.12); }
        }
        @keyframes eggCoinNormalEyesOut {
          0%, 12% { opacity: 1; transform: scale(1); }
          18%, 78% { opacity: 0; transform: scale(0.35); }
          88%, 100% { opacity: 1; transform: scale(1); }
        }
        @keyframes eggCoinDollarEyesIn {
          0%, 14% { opacity: 0; transform: scale(0.35); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          24%  { opacity: 1; transform: scale(1.24); animation-timing-function: ease-out; }
          34%, 74% { opacity: 1; transform: scale(1); animation-timing-function: ease-in; }
          84%, 100% { opacity: 0; transform: scale(0.35); }
        }
        @keyframes eggCoinCatchBody {
          0%, 14% { transform: translateY(0) scaleX(1) scaleY(1); }
          26%  { transform: translateY(2px) scaleX(1.10) scaleY(0.90); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          42%  { transform: translateY(-5px) scaleX(0.93) scaleY(1.08); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          60%  { transform: translateY(2.5px) scaleX(1.14) scaleY(0.86); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          74%  { transform: translateY(-2px) scaleX(0.96) scaleY(1.04); animation-timing-function: ease-out; }
          100% { transform: translateY(0) scaleX(1) scaleY(1); }
        }
        @keyframes eggCoinCatchCrown {
          0%, 16% { transform: translateY(0) rotate(0deg); }
          45%  { transform: translateY(-9px) rotate(10deg); }
          64%  { transform: translateY(2px) rotate(-5deg); }
          80%  { transform: translateY(-1.5px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes eggCoinSpark {
          0%, 20% { opacity: 0; transform: scale(0.2) rotate(0deg); }
          34%  { opacity: 1; transform: scale(1.12) rotate(45deg); }
          54%  { opacity: 0.2; transform: scale(0.5) rotate(80deg); }
          66%  { opacity: 1; transform: scale(1.18) rotate(125deg); }
          86%, 100% { opacity: 0; transform: scale(0.2) rotate(180deg); }
        }
        .slime-egg-coin-catch .egg-coin-wrap { animation: eggCoinCatchDrop calc(1450ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-coin-catch .egg-coin-spin { animation: eggCoinAxisSpin calc(700ms * var(--speed-mult, 1)) linear infinite; }
        .slime-egg-coin-catch .eye-left,
        .slime-egg-coin-catch .eye-right { animation: eggCoinNormalEyesOut calc(1450ms * var(--speed-mult, 1)) ease 1 forwards; }
        .slime-egg-coin-catch .egg-dollar-eyes { animation: eggCoinDollarEyesIn calc(1450ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-coin-catch .slime-body { animation: eggCoinCatchBody calc(1450ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-coin-catch .slime-crown { animation: eggCoinCatchCrown calc(1450ms * var(--speed-mult, 1)) ease-in-out 1 forwards; }
        .slime-egg-coin-catch .egg-coin-spark-1,
        .slime-egg-coin-catch .egg-coin-spark-2 { animation: eggCoinSpark calc(1450ms * var(--speed-mult, 1)) ease-out 1 forwards; }

        /* =====================================================================
           EASTER EGG 07: COIN FLIP CHA-CHING + $$ EYES (1550ms)
           Flips a gold coin high into the air -> watches it spin -> $$ eyes pop!
           ===================================================================== */
        @keyframes eggCoinFlipArc {
          0%, 10% { opacity: 0; transform: translate(16px, 24px) scale(0.65); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          18%  { opacity: 1; transform: translate(18px, 4px) scale(0.95); animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1); }
          42%  { opacity: 1; transform: translate(14px, -21px) scale(1.08); animation-timing-function: ease-in-out; }
          52%  { opacity: 1; transform: translate(12px, -22px) scale(1.06); animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45); }
          74%  { opacity: 1; transform: translate(16px, 16px) scale(0.88); animation-timing-function: linear; }
          82%, 100% { opacity: 0; transform: translate(16px, 26px) scale(0.4); }
        }
        @keyframes eggCoinFlipBody {
          0%   { transform: translateY(0) scaleX(1) scaleY(1) rotate(0deg); }
          14%  { transform: translateY(2px) scaleX(1.12) scaleY(0.88) rotate(-4deg); animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
          28%  { transform: translateY(-4px) scaleX(0.93) scaleY(1.08) rotate(5deg); animation-timing-function: ease-in-out; }
          52%  { transform: translateY(-2px) scaleX(0.97) scaleY(1.03) rotate(3deg); animation-timing-function: ease-in-out; }
          74%  { transform: translateY(2.5px) scaleX(1.11) scaleY(0.89) rotate(-2deg); animation-timing-function: ease-out; }
          88%  { transform: translateY(-1px) scaleX(0.98) scaleY(1.02) rotate(0deg); }
          100% { transform: translateY(0) scaleX(1) scaleY(1) rotate(0deg); }
        }
        @keyframes eggCoinFlipEyesTrack {
          0%, 10% { transform: translate(0, 0); }
          26%, 56% { transform: translate(2.5px, -2.5px); }
          74%  { transform: translate(2.5px, 0.5px); }
          90%, 100% { transform: translate(0, 0); }
        }
        .slime-egg-coin-flip .egg-coin-wrap { animation: eggCoinFlipArc calc(1550ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-coin-flip .egg-coin-spin { animation: eggCoinAxisSpin calc(420ms * var(--speed-mult, 1)) linear infinite; }
        .slime-egg-coin-flip .eye-left,
        .slime-egg-coin-flip .eye-right { animation: eggCoinNormalEyesOut calc(1550ms * var(--speed-mult, 1)) ease 1 forwards; }
        .slime-egg-coin-flip .egg-dollar-eyes { animation: eggCoinDollarEyesIn calc(1550ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-coin-flip .slime-body { animation: eggCoinFlipBody calc(1550ms * var(--speed-mult, 1)) linear 1 forwards; }
        .slime-egg-coin-flip .slime-crown { animation: eggCoinCatchCrown calc(1550ms * var(--speed-mult, 1)) ease-in-out 1 forwards; }
        .slime-egg-coin-flip .slime-eyes-wrap { animation: eggCoinFlipEyesTrack calc(1550ms * var(--speed-mult, 1)) ease-in-out 1 forwards; }
        .slime-egg-coin-flip .egg-coin-spark-1,
        .slime-egg-coin-flip .egg-coin-spark-2 { animation: eggCoinSpark calc(1550ms * var(--speed-mult, 1)) ease-out 1 forwards; }

        @media (prefers-reduced-motion: reduce) {
          .slime-shape,
          .slime-body,
          .slime-crown,
          .slime-shadow,
          .slime-eyes-wrap,
          .eye-left,
          .eye-right,
          .slime-face,
          .alch-drop-1,
          .alch-drop-2,
          .alch-drop-3,
          .alch-drop-4,
          .alch-drop-5,
          .alch-spark-1,
          .alch-spark-2,
          .egg-burp-bubble,
          .egg-wink-spark,
          .egg-wink-blush,
          .egg-coin-wrap,
          .egg-coin-spin,
          .egg-coin-spark-1,
          .egg-coin-spark-2,
          .egg-dollar-eyes {
            animation: none !important;
          }
          .alch-fx,
          .egg-burp-bubble,
          .egg-wink-spark,
          .egg-wink-blush,
          .egg-coin-fx,
          .egg-dollar-eyes {
            display: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-8">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <Link
              href="/logo-options"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#d8b4fe] hover:text-white transition-colors"
            >
              ← Back to Logo Options
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#b7a9ca]/70 hover:text-white transition-colors"
            >
              Main Site
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            The Royal Alchemist · Entrance + Idle Easter Eggs
          </h1>
          <p className="text-sm text-[#b7a9ca] mt-1.5 max-w-xl">
            Plays the 24-keyframe drop entrance once, settles into a calm periodic eye blink, and lets you test all 7 subtle idle easter eggs on demand or with Auto-Random.
          </p>
        </div>

        {/* Studio Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1a1229] border border-[#362452]">
            {SURFACES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSurfaceId(s.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  surfaceId === s.id ? "bg-[#362452] text-white" : "text-[#b7a9ca] hover:text-white"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1a1229] border border-[#362452]">
            {([1, 0.5, 0.25] as PlaybackSpeed[]).map((sp) => (
              <button
                key={sp}
                onClick={() => setSpeed(sp)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  speed === sp ? "bg-[#362452] text-white" : "text-[#b7a9ca] hover:text-white"
                }`}
              >
                {sp === 1 ? "1×" : sp === 0.5 ? "0.5×" : "0.25×"}
              </button>
            ))}
          </div>

          <button
            onClick={replayEntrance}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#5ef439]/15 text-[#5ef439] border border-[#5ef439]/35 hover:bg-[#5ef439]/25 transition-colors"
          >
            Replay Entrance
          </button>
        </div>
      </div>

      {/* Main Hero Workbench Card */}
      <div className="rounded-3xl border border-[#4c3473] bg-[#1a1229] overflow-hidden shadow-2xl">
        {/* Oversized Specimen Stage */}
        <div
          onClick={replayEntrance}
          style={{ backgroundColor: surface.bg, borderBottom: `1px solid ${surface.border}` }}
          className="relative h-72 sm:h-80 px-6 flex items-center justify-center transition-colors cursor-pointer"
        >
          <span
            className={`absolute top-4 left-5 text-[11px] font-mono font-semibold tracking-wider ${
              surface.light ? "text-slate-400" : "text-[#b7a9ca]/60"
            }`}
          >
            {statusLabel.toUpperCase()}
          </span>

          <span
            className={`absolute top-4 right-5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
              surface.light ? "bg-slate-200/80 text-slate-700" : "bg-white/5 text-[#d8b4fe]"
            }`}
          >
            Click Stage to Replay Entrance
          </span>

          <div key={entranceKey} className="flex items-center justify-center">
            <RoyalAlchemistLockup
              light={surface.light}
              phase={phase}
              activeEgg={activeEgg}
              eggKey={eggKey}
              size="hero"
            />
          </div>
        </div>

        {/* Real-World Context Strip */}
        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-6 border-b border-[#362452]/70">
          <div className="flex items-center gap-4">
            <span className="text-[11px] uppercase tracking-wider text-[#b7a9ca]/70 font-semibold">
              Scale Previews
            </span>
            <div
              key={`icon40-${entranceKey}`}
              title="40px collapsed sidebar icon"
              style={{ backgroundColor: surface.bg, borderColor: surface.border }}
              className="w-11 h-11 rounded-xl border p-1.5 flex items-center justify-center"
            >
              <RoyalAlchemistSvg
                light={surface.light}
                phase={phase}
                activeEgg={activeEgg}
                eggKey={eggKey}
                className="w-8 h-8"
              />
            </div>
            <div
              key={`icon24-${entranceKey}`}
              title="24px UI icon"
              style={{ backgroundColor: surface.bg, borderColor: surface.border }}
              className="w-8 h-8 rounded-lg border p-1 flex items-center justify-center"
            >
              <RoyalAlchemistSvg
                light={surface.light}
                phase={phase}
                activeEgg={activeEgg}
                eggKey={eggKey}
                className="w-5 h-5"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#b7a9ca]/70 font-semibold">
              Live Sidebar Lockup
            </span>
            <div
              key={`sidebar-${entranceKey}`}
              style={{ backgroundColor: surface.bg, borderColor: surface.border }}
              className="h-11 px-4 rounded-xl border flex items-center justify-center"
            >
              <RoyalAlchemistLockup
                light={surface.light}
                phase={phase}
                activeEgg={activeEgg}
                eggKey={eggKey}
                size="sidebar"
              />
            </div>
          </div>
        </div>

        {/* Interactive Idle Easter Egg Soundboard */}
        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#5ef439]">
                Idle Easter Egg Triggers (Press Any Button to Preview)
              </h2>
              <p className="text-xs text-[#b7a9ca] mt-0.5">
                Each animation plays once on the settled logo (including 40px, 24px, and Sidebar previews) then returns to calm periodic blinking.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={triggerRandomEgg}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2a1d42] text-white border border-[#4c3473] hover:border-[#d8b4fe] transition-colors"
              >
                Play Random
              </button>
              <button
                onClick={() => setAutoRandom((v) => !v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  autoRandom
                    ? "bg-[#5ef439]/20 text-[#5ef439] border-[#5ef439]/50"
                    : "bg-[#140d24] text-[#b7a9ca] border-[#362452] hover:text-white"
                }`}
              >
                {autoRandom ? "Auto Random: ON (4.5s)" : "Auto Random: OFF"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {EASTER_EGGS.map((egg) => {
              const isPlaying = activeEgg === egg.id;
              return (
                <button
                  key={egg.id}
                  onClick={() => triggerEgg(egg.id)}
                  className={`text-left rounded-xl p-3.5 border transition-colors flex flex-col gap-1 cursor-pointer ${
                    isPlaying
                      ? "bg-[#2a1d42] border-[#5ef439] ring-1 ring-[#5ef439]/40"
                      : "bg-[#140d24]/80 border-[#362452] hover:border-[#7c5cb3] hover:bg-[#1e1533]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <span className="text-[10px] font-mono font-semibold text-[#5ef439]">
                      {egg.number} · {egg.durationMs}ms
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#d8b4fe]">
                      {isPlaying ? "Playing" : "Play"}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-white">{egg.name}</span>
                  <span className="text-[11px] text-[#b7a9ca] leading-snug">{egg.note}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
