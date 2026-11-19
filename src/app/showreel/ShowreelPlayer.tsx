"use client";

import { useEffect, useRef, useState, useCallback, type CSSProperties } from "react";
import Link from "next/link";
import VipBadge from "@/components/ui/VipBadge";
import DeepLiquidShader from "@/components/ui/DeepLiquidShader";
import GooFrameShader from "@/components/ui/GooFrameShader";
import AlphaVideo from "@/components/ui/AlphaVideo";
import PrimaryButton from "@/components/ui/PrimaryButton";
import ElixirLogo from "@/components/ElixirLogo";
import { cn } from "@/lib/utils";
import {
  BiArrowBack,
  BiPlay,
  BiPause,
  BiRevision,
  BiFullscreen,
  BiRepeat,
} from "react-icons/bi";

interface ActDef {
  id: number;
  code: string;
  label: string;
  principle: string;
  start: number;
  duration: number;
}

const ACTS: readonly ActDef[] = [
  { id: 0, code: "01", label: "The Spark", principle: "Anticipation + Squash & Stretch", start: 0, duration: 5.0 },
  { id: 1, code: "02", label: "Brand Mark", principle: "Geometric Construction Grid + Living Mascot States", start: 5.0, duration: 4.8 },
  { id: 2, code: "03", label: "3D Pipeline", principle: "Wireframe Laser Scan → Clay Wipe → Prop Lookdev", start: 9.8, duration: 5.0 },
  { id: 3, code: "04", label: "Living Cinema", principle: "3D Arcs + Diagonal Gloss Sweep", start: 14.8, duration: 4.2 },
  { id: 4, code: "05", label: "Key Art", principle: "Cinema-Scope Slide + 3-Beat Showcase", start: 19.0, duration: 5.6 },
  { id: 5, code: "06", label: "8 Originals", principle: "Croupier Arc Deal + Overlapping Follow-Through", start: 24.6, duration: 4.0 },
  { id: 6, code: "07", label: "Clockwork VIP", principle: "14-Layer SVG Rig + All Animated SVG", start: 28.6, duration: 4.6 },
  { id: 7, code: "08", label: "UI Delight", principle: "Live Micro-Interactions, Shaders & Tactile Feedback", start: 33.2, duration: 4.6 },
  { id: 8, code: "09", label: "Live Systems", principle: "Opposing Perspective Staging + Rhythmic Stagger", start: 37.8, duration: 4.2 },
  { id: 9, code: "10", label: "Portfolio Lockup", principle: "Elastic Convergence + Clean Credit Hold", start: 42.0, duration: 15.0 },
] as const;

const TOTAL_DURATION = 57.0;

const PROP_SHEETS = [
  { name: "Potion Wand", src: "/showreel/prop-wand-sheet.jpg", bg: "#ABA9AA", rot: "-6deg", delay: 1120 },
  { name: "Arcade Cabinet", src: "/showreel/prop-arcade-sheet.jpg", bg: "#ACACAC", rot: "0deg", delay: 1240 },
  { name: "Elixir Coins", src: "/showreel/prop-coins-sheet.jpg", bg: "#A9A8A6", rot: "6deg", delay: 1360 },
] as const;

const ORIGINALS = [
  { name: "Crash", img: "/games/originals/crash-thumb.webp", exclusive: false, dx: "90px", dy: "65px", rot: "-10deg" },
  { name: "Limbo", img: "/games/originals/limbo-thumb.webp", exclusive: true, dx: "75px", dy: "75px", rot: "-6deg" },
  { name: "Blackjack", img: "/games/originals/blackjack-thumb.webp", exclusive: false, dx: "60px", dy: "80px", rot: "6deg" },
  { name: "Coinflip", img: "/games/originals/coinflip-thumb.webp", exclusive: false, dx: "95px", dy: "70px", rot: "10deg" },
  { name: "Mines", img: "/games/originals/mines-thumb.webp", exclusive: false, dx: "90px", dy: "55px", rot: "-9deg" },
  { name: "Plinko", img: "/games/originals/plinko-thumb.webp", exclusive: true, dx: "75px", dy: "65px", rot: "-5deg" },
  { name: "Dice", img: "/games/originals/dice-thumb.webp", exclusive: false, dx: "60px", dy: "70px", rot: "5deg" },
  { name: "Keno", img: "/games/originals/keno-thumb.webp", exclusive: true, dx: "95px", dy: "60px", rot: "9deg" },
] as const;

const STUDIO_MOTES = [
  { left: "10%", top: "74%", size: 3, color: "#a3e635", op: 0.42, dx: "12px", dur: "8.5s", delay: "-1.2s" },
  { left: "18%", top: "38%", size: 2, color: "#e9d5ff", op: 0.3, dx: "-10px", dur: "11s", delay: "-4.6s" },
  { left: "26%", top: "82%", size: 2.5, color: "#fde68a", op: 0.34, dx: "16px", dur: "9.8s", delay: "-2.4s" },
  { left: "34%", top: "28%", size: 2, color: "#c4b5fd", op: 0.28, dx: "8px", dur: "12.2s", delay: "-6.1s" },
  { left: "44%", top: "88%", size: 3, color: "#a3e635", op: 0.36, dx: "-14px", dur: "10.4s", delay: "-0.8s" },
  { left: "54%", top: "24%", size: 2, color: "#fde68a", op: 0.26, dx: "10px", dur: "11.5s", delay: "-5.3s" },
  { left: "63%", top: "78%", size: 2.5, color: "#c4b5fd", op: 0.32, dx: "-12px", dur: "9.2s", delay: "-3.5s" },
  { left: "72%", top: "36%", size: 3, color: "#a3e635", op: 0.38, dx: "14px", dur: "8.9s", delay: "-7.0s" },
  { left: "81%", top: "70%", size: 2, color: "#fde68a", op: 0.35, dx: "-16px", dur: "10.8s", delay: "-1.9s" },
  { left: "89%", top: "44%", size: 2.5, color: "#e9d5ff", op: 0.28, dx: "9px", dur: "12.6s", delay: "-4.1s" },
] as const;

type BackdropMode = "alchemy" | "obsidian" | "arcane";

function getActIndex(t: number): number {
  for (let i = ACTS.length - 1; i >= 0; i--) {
    if (t >= ACTS[i].start) return i;
  }
  return 0;
}

/**
 * iOS-safe autoplay video helper: sets defaultMuted/muted/playsInline directly
 * on the DOM node and triggers play() on mount & canPlay so Safari/WKWebView
 * reliably starts each act's clip without popping fullscreen or pausing.
 */
function ReelVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "true");
    el.play().catch(() => {});
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      onCanPlay={(e) => {
        const el = e.currentTarget;
        el.muted = true;
        if (el.paused) el.play().catch(() => {});
      }}
      className={className}
    />
  );
}

export default function ShowreelPlayer() {
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<0.5 | 1 | 1.25>(1);
  const [loopActOnly, setLoopActOnly] = useState(false);
  const [cleanMode, setCleanMode] = useState(true);
  const [backdrop, setBackdrop] = useState<BackdropMode>("alchemy");
  const [replayNonce, setReplayNonce] = useState(0);
  const stageFrameRef = useRef<HTMLDivElement>(null);
  const [stageScale, setStageScale] = useState(1);

  useEffect(() => {
    const el = stageFrameRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w > 0) setStageScale(w / 1280);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const actIndex = getActIndex(elapsed);
  const currentAct = ACTS[actIndex];

  const elapsedRef = useRef(0);
  const lastFrameRef = useRef<number | null>(null);

  // Director rAF clock
  useEffect(() => {
    if (!isPlaying) {
      lastFrameRef.current = null;
      return;
    }

    let rafId = 0;
    const tick = (now: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = now;
      }
      const dt = Math.min(0.05, (now - lastFrameRef.current) / 1000) * speed;
      lastFrameRef.current = now;

      let next = elapsedRef.current + dt;
      if (loopActOnly) {
        const active = ACTS[getActIndex(elapsedRef.current)];
        const actEnd = active.start + active.duration;
        if (next >= actEnd) {
          next = active.start;
          setReplayNonce((n) => n + 1);
        }
      } else if (next >= TOTAL_DURATION) {
        next = 0;
        setReplayNonce((n) => n + 1);
      }

      elapsedRef.current = next;
      setElapsed(next);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, speed, loopActOnly]);

  const jumpToAct = useCallback((idx: number) => {
    const target = ACTS[Math.max(0, Math.min(ACTS.length - 1, idx))];
    elapsedRef.current = target.start;
    setElapsed(target.start);
    setReplayNonce((n) => n + 1);
  }, []);

  const restartReel = useCallback(() => {
    elapsedRef.current = 0;
    setElapsed(0);
    setReplayNonce((n) => n + 1);
    setIsPlaying(true);
  }, []);

  // Keyboard shortcuts for portfolio recording workflow
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === "r" || e.key === "R") {
        restartReel();
      } else if (e.key >= "1" && e.key <= "9") {
        jumpToAct(Number(e.key) - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [jumpToAct, restartReel]);

  const speedStyle = { "--sr-speed": speed } as CSSProperties;

  return (
    <div
      className={cn(
        "sr-root min-h-dvh bg-[#090512] text-white flex flex-col",
        !isPlaying && "sr-paused"
      )}
      style={speedStyle}
    >
      {/* Top Studio Header (hidden in Clean Record Mode) */}
      {!cleanMode && (
        <header className="border-b border-white/[0.07] bg-[#0e081a]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-purple-100 hover:bg-white/[0.08] transition-colors"
              >
                <BiArrowBack className="size-4" />
                Elixir App
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm font-bold text-white sm:text-base">
                    Elixir Portfolio Motion Showreel
                  </h1>
                  <span className="hidden sm:inline-flex rounded-full border border-lime-400/35 bg-lime-400/10 px-2 py-0.5 text-[10px] font-bold text-lime-300">
                    39.2s · 9 Acts
                  </span>
                </div>
                <p className="text-[11px] text-purple-200/60">
                  3D wireframe-to-cinema pipeline, WebGL shaders, 8 Originals & Clockwork Forge SVG rig
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCleanMode(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-lime-400 px-3 py-1.5 text-xs font-bold text-[#0a1d06] hover:bg-lime-300 transition-colors"
              >
                <BiFullscreen className="size-4" />
                Clean Record Mode
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Cinema Stage Container */}
      <main
        className={cn(
          "flex-1 flex flex-col items-center justify-center w-full",
          cleanMode ? "p-2 sm:p-6" : "px-3 py-5 sm:px-6 sm:py-7"
        )}
      >
        <div
          className="w-full"
          style={{
            maxWidth: cleanMode ? "min(1340px, calc((100dvh - 24px) * 16 / 9))" : "1100px",
          }}
        >
          {/* 16:9 Cinema Frame (proportionally scales fixed 1280x720 virtual stage on all viewports) */}
          <div
            ref={stageFrameRef}
            className="relative aspect-video w-full overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.1] bg-[#0c0618] shadow-[0_32px_90px_rgba(0,0,0,0.85)] select-none"
          >
            <div
              className="absolute left-0 top-0 h-[720px] w-[1280px] origin-top-left overflow-hidden"
              style={{ transform: `scale(${stageScale})` }}
            >
            {/* Curated Studio Backdrops (no grid lines, zero overlay HUD chrome) */}
            {backdrop === "alchemy" && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 85% 68% at 50% 42%, #1d1038 0%, #110821 58%, #080411 100%)",
                  }}
                />
                {/* Seamless Full-Bleed Drifting Studio Light Pools (zero box-edge clipping) */}
                <div
                  aria-hidden="true"
                  className="sr-orb-a pointer-events-none absolute inset-[-25%] opacity-60"
                  style={{
                    background:
                      "radial-gradient(closest-side at 28% 30%, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.08) 48%, transparent 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="sr-orb-b pointer-events-none absolute inset-[-25%] opacity-50"
                  style={{
                    background:
                      "radial-gradient(closest-side at 76% 74%, rgba(57, 255, 20, 0.18) 0%, rgba(16, 185, 129, 0.05) 46%, transparent 100%)",
                  }}
                />
                {/* Lazy Rising Bokeh Dust Motes */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                  {STUDIO_MOTES.map((m, idx) => (
                    <span
                      key={idx}
                      className="sr-mote absolute rounded-full"
                      style={
                        {
                          left: m.left,
                          top: m.top,
                          width: `${m.size}px`,
                          height: `${m.size}px`,
                          backgroundColor: m.color,
                          boxShadow: `0 0 10px ${m.color}`,
                          "--mote-op": m.op,
                          "--mote-dx": m.dx,
                          "--mote-dur": m.dur,
                          "--mote-delay": m.delay,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>
              </>
            )}

            {backdrop === "obsidian" && (
              <>
                {/* Ultra-Clean Apple Keynote Dark Studio Cyclorama */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 72% 52% at 50% 24%, rgba(167, 139, 250, 0.16) 0%, rgba(20, 12, 36, 0.92) 56%, #07040e 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-[-10%] bottom-[-24%] h-[46%] rounded-[50%] border-t border-white/[0.06]"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(196, 181, 253, 0.08) 0%, transparent 70%)",
                  }}
                />
              </>
            )}

            {backdrop === "arcane" && (
              <>
                {/* Subtle Rotating Alchemist Astrolabe Rings on Deep Plum */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 65% at 50% 50%, #1b0f33 0%, #0e071d 64%, #070310 100%)",
                  }}
                />
                <svg
                  aria-hidden="true"
                  viewBox="0 0 1200 675"
                  fill="none"
                  className="pointer-events-none absolute inset-0 size-full opacity-[0.14]"
                >
                  <g className="sr-arcane-outer" style={{ transformOrigin: "600px 337.5px" }}>
                    <circle cx="600" cy="337.5" r="290" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="6 10" />
                    <circle cx="600" cy="337.5" r="264" stroke="#a3e635" strokeWidth="0.75" strokeOpacity="0.6" />
                    <polygon points="600,48 850,482 350,482" stroke="#fde68a" strokeWidth="0.75" strokeOpacity="0.45" />
                  </g>
                  <g className="sr-arcane-inner" style={{ transformOrigin: "600px 337.5px" }}>
                    <circle cx="600" cy="337.5" r="195" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="2 12" />
                    <circle cx="600" cy="337.5" r="172" stroke="#c4b5fd" strokeWidth="0.6" strokeOpacity="0.5" />
                  </g>
                </svg>
              </>
            )}

            {/* Soft Edge Vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 92% 90% at 50% 50%, transparent 58%, rgba(5, 2, 12, 0.72) 100%)",
              }}
            />

            {/* Continuous Real-Time WebGL Viscous Green Goo Perimeter Frame (All Acts) */}
            <GooFrameShader className="pointer-events-none absolute inset-0 z-30 size-full mix-blend-overlay" />

            {/* Act 07 King Foreground Layer (Above GooFrameShader so blend mode never affects him) */}
            {actIndex === 6 && (
              <AlphaVideo
                key={`act-6-king-${replayNonce}`}
                webmSrc="/animations/king-peek-coin.webm"
                webpSrc="/animations/king-peek-coin.webp"
                poster="/animations/king-peek-poster.png"
                className="sr-king-peek-in pointer-events-none absolute bottom-0 right-3 z-40 block w-[380px] drop-shadow-[0_24px_40px_rgba(0,0,0,0.65)]"
              />
            )}

            {/* ==============================================================
                ACT 01 · THE SPARK (0.0s - 3.6s)
               ============================================================== */}
            {actIndex === 0 && (
              <div
                key={`act-0-${replayNonce}`}
                className="sr-act1-wrap relative z-10 flex size-full flex-col items-center justify-center overflow-hidden px-6 text-center"
              >
                {/* Volumetric Breathing Emerald & Royal Violet Energy Halo */}
                <div
                  aria-hidden="true"
                  className="sr-energy-pulse pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[700px] rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(94,244,57,0.22) 0%, rgba(168,85,247,0.22) 48%, transparent 100%)",
                  }}
                />

                {/* Rising Ambient Alchemy Embers */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                  {[
                    { left: "16%", top: "72%", size: 5, color: "#5ef439", dur: "3.2s", delay: "-0.4s" },
                    { left: "28%", top: "78%", size: 4, color: "#facc15", dur: "3.8s", delay: "-1.5s" },
                    { left: "42%", top: "82%", size: 3.5, color: "#c084fc", dur: "3.4s", delay: "-2.1s" },
                    { left: "58%", top: "80%", size: 4.5, color: "#5ef439", dur: "3.1s", delay: "-0.9s" },
                    { left: "73%", top: "76%", size: 5, color: "#facc15", dur: "3.7s", delay: "-2.4s" },
                    { left: "84%", top: "70%", size: 4, color: "#5ef439", dur: "3.5s", delay: "-1.2s" },
                  ].map((m, idx) => (
                    <span
                      key={idx}
                      className="sr-ember absolute rounded-full"
                      style={
                        {
                          left: m.left,
                          top: m.top,
                          width: m.size,
                          height: m.size,
                          backgroundColor: m.color,
                          boxShadow: `0 0 12px ${m.color}`,
                          "--dur": m.dur,
                          "--delay": m.delay,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>

                {/* 5 Balanced, Staggered, Independently Phased & Rotated 3D Gold Coins */}
                {[
                  {
                    wrapCls: "sr-prop-left left-[3%] top-[10%] w-[21%] max-w-[235px]",
                    vidCls: "-rotate-[28deg] drop-shadow-[0_26px_42px_rgba(250,204,21,0.40)]",
                    startOffset: 0.0,
                    rate: 0.86,
                    delay: "0ms",
                  },
                  {
                    wrapCls: "sr-prop-right right-[3%] top-[12%] w-[23%] max-w-[255px]",
                    vidCls: "rotate-[22deg] -scale-x-100 drop-shadow-[0_26px_42px_rgba(250,204,21,0.42)]",
                    startOffset: 0.68,
                    rate: 1.12,
                    delay: "110ms",
                  },
                  {
                    wrapCls: "sr-prop-left left-[9%] bottom-[8%] w-[15%] max-w-[165px]",
                    vidCls: "rotate-[38deg] -scale-x-100 drop-shadow-[0_20px_32px_rgba(250,204,21,0.34)]",
                    startOffset: 1.32,
                    rate: 0.96,
                    delay: "210ms",
                  },
                  {
                    wrapCls: "sr-prop-right right-[10%] bottom-[8%] w-[17%] max-w-[185px]",
                    vidCls: "-rotate-[36deg] drop-shadow-[0_22px_34px_rgba(250,204,21,0.36)]",
                    startOffset: 1.94,
                    rate: 1.22,
                    delay: "300ms",
                  },
                  {
                    wrapCls: "sr-prop-left left-[24%] top-[6%] block w-[11%] max-w-[115px]",
                    vidCls: "rotate-[14deg] opacity-85 drop-shadow-[0_14px_24px_rgba(250,204,21,0.28)]",
                    startOffset: 2.48,
                    rate: 0.78,
                    delay: "380ms",
                  },
                ].map((coin, idx) => (
                  <div
                    key={idx}
                    style={{ animationDelay: coin.delay }}
                    className={`pointer-events-none absolute ${coin.wrapCls}`}
                  >
                    <AlphaVideo
                      webmSrc="/animations/coin-spin-3d.webm"
                      webpSrc="/animations/coin-spin-3d.webp"
                      poster="/animations/coin-spin-3d-poster.png"
                      onLoadedMetadata={(e) => {
                        const v = e.currentTarget;
                        v.playbackRate = coin.rate;
                        if (Number.isFinite(v.duration) && v.duration > 0) {
                          v.currentTime = coin.startOffset % v.duration;
                        }
                      }}
                      className={`size-full object-contain ${coin.vidCls}`}
                    />
                  </div>
                ))}

                {/* Undisputed Hero: Oversized Elixir Animated Crowned Slime Logo */}
                <div className="relative z-10 flex flex-col items-center">
                  <ElixirLogo
                    iconClassName="w-28 h-28"
                    textClassName="text-[84px]"
                    gapClassName="gap-3"
                    className="sr-logo-hero drop-shadow-[0_24px_48px_rgba(0,0,0,0.75)]"
                  />

                  {/* Refined Subordinate Tagline (frames the logo instead of competing with it) */}
                  <div
                    className="sr-eyebrow mt-5 flex items-center gap-3"
                    style={{ "--delay": "540ms" } as CSSProperties}
                  >
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-lime-400/70" />
                    <span className="text-xs font-bold uppercase tracking-[0.28em] text-lime-300/95">
                      CRAFTED TO FEEL ALIVE
                    </span>
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-lime-400/70" />
                  </div>

                  <p
                    className="sr-eyebrow mt-2 max-w-md text-xs text-purple-200/75"
                    style={{ "--delay": "720ms" } as CSSProperties}
                  >
                    Next-gen crypto casino design system with custom 3D motion, WebGL shaders &amp; hand-rigged SVG craft.
                  </p>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 02 · BRAND MARK & LOGO MOTION (3.6s - 8.4s)
                Geometric Construction Grid + Live Animated Mascot States
               ============================================================== */}
            {actIndex === 1 && (
              <div
                key={`act-logo-${replayNonce}`}
                className="relative z-10 flex size-full flex-col items-center justify-center px-7 pt-10 pb-5"
              >
                <div className="grid w-full max-w-[97%] flex-1 min-h-0 grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] gap-3.5">
                  {/* Left: Pure Full-Bleed Logo Construction Blueprint Stage */}
                  <div
                    className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-lime-400/30 bg-[#140d24]/95 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(196,181,253,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(196,181,253,0.06) 1px, transparent 1px)",
                      backgroundSize: "18px 18px",
                    }}
                  >
                    {/* Center Construction Diagram */}
                    <div className="relative flex w-full items-center justify-center">
                      <svg
                        viewBox="0 0 380 148"
                        className="h-auto w-full max-w-[490px] overflow-visible"
                        fill="none"
                        role="img"
                        aria-label="Elixir Crowned Slime logo geometric construction grid"
                      >
                        <rect x="44" y="14" width="292" height="108" stroke="rgba(196,181,253,0.20)" strokeWidth="0.75" strokeDasharray="3 3" />

                        <line x1="22" y1="31.4" x2="358" y2="31.4" stroke="rgba(250,204,21,0.32)" strokeWidth="0.7" strokeDasharray="2 3" />
                        <line x1="22" y1="50.3" x2="134" y2="50.3" stroke="rgba(94,244,57,0.38)" strokeWidth="0.75" strokeDasharray="3 3" />
                        <line x1="134" y1="56" x2="358" y2="56" stroke="rgba(94,244,57,0.38)" strokeWidth="0.75" strokeDasharray="3 3" />
                        <line x1="22" y1="75.95" x2="358" y2="75.95" stroke="rgba(196,181,253,0.18)" strokeWidth="0.7" strokeDasharray="2 4" />
                        <line x1="22" y1="99" x2="358" y2="99" stroke="rgba(94,244,57,0.42)" strokeWidth="0.75" strokeDasharray="3 3" />
                        <line x1="56" y1="101.6" x2="134" y2="101.6" stroke="rgba(250,204,21,0.45)" strokeWidth="0.7" strokeDasharray="2 2" />

                        <line x1="64.15" y1="10" x2="64.15" y2="130" stroke="rgba(94,244,57,0.30)" strokeWidth="0.75" strokeDasharray="3 3" />
                        <line x1="95.2" y1="14" x2="95.2" y2="122" stroke="rgba(196,181,253,0.22)" strokeWidth="0.7" strokeDasharray="2 4" />
                        <line x1="126.25" y1="10" x2="126.25" y2="130" stroke="rgba(94,244,57,0.30)" strokeWidth="0.75" strokeDasharray="3 3" />
                        <line x1="140" y1="10" x2="140" y2="130" stroke="rgba(250,204,21,0.40)" strokeWidth="0.75" strokeDasharray="2 2" />
                        <line x1="316" y1="10" x2="316" y2="130" stroke="rgba(196,181,253,0.24)" strokeWidth="0.75" strokeDasharray="3 3" />

                        <rect x="126.25" y="56" width="13.75" height="43" fill="rgba(250,204,21,0.08)" />

                        <circle cx="95.2" cy="81.35" r="31.05" stroke="rgba(94,244,57,0.52)" strokeWidth="0.85" strokeDasharray="3 3" />
                        <circle cx="85.08" cy="75.95" r="7.5" stroke="rgba(196,181,253,0.28)" strokeWidth="0.65" strokeDasharray="2 2" />
                        <circle cx="105.33" cy="75.95" r="7.5" stroke="rgba(196,181,253,0.28)" strokeWidth="0.65" strokeDasharray="2 2" />
                        <line x1="91.0" y1="21.0" x2="99.4" y2="68.8" stroke="rgba(250,204,21,0.65)" strokeWidth="0.85" strokeDasharray="2 2" />
                        <circle cx="95.2" cy="44.9" r="2.2" stroke="rgba(250,204,21,0.85)" strokeWidth="0.8" />

                        <g transform="translate(52, 26) scale(1.35)">
                          <g transform="rotate(-10 32 14)">
                            <path fill="#facc15" d="M21 19 L19 9 L26.5 13.5 L32 6.5 L37.5 13.5 L45 9 L43 19 Z" />
                            <circle cx="32" cy="5.8" r="1.8" fill="#facc15" />
                          </g>
                          <path
                            fill="#5ef439"
                            d="M 32 18 C 46 18 55 29 55 43 C 55 52.5 48 56 32 56 C 16 56 9 52.5 9 43 C 9 29 18 18 32 18 Z"
                          />
                          <ellipse
                            cx="21"
                            cy="30"
                            rx="4.2"
                            ry="2.4"
                            transform="rotate(-32 21 30)"
                            fill="#ffffff"
                            opacity={0.45}
                          />
                          <circle cx="24.5" cy="37" r="3.4" fill="#140d24" />
                          <circle cx="39.5" cy="37" r="3.4" fill="#140d24" />
                          <circle cx="25.6" cy="35.8" r="1.2" fill="#ffffff" />
                          <circle cx="40.6" cy="35.8" r="1.2" fill="#ffffff" />
                          <path
                            d="M26 44.5 Q32 50 38 44.5"
                            stroke="#140d24"
                            strokeWidth="3.2"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </g>

                        <text
                          x="140"
                          y="99"
                          fill="#f2f3f7"
                          fontSize="58"
                          fontWeight="900"
                          letterSpacing="2.2"
                          style={{ fontFamily: "var(--font-hero), sans-serif" }}
                        >
                          ELIXIR
                        </text>

                        <circle cx="64.15" cy="81.35" r="1.6" fill="#5ef439" />
                        <circle cx="126.25" cy="81.35" r="1.6" fill="#5ef439" />
                        <circle cx="95.2" cy="50.3" r="1.6" fill="#5ef439" />

                        <line x1="64.15" y1="8" x2="126.25" y2="8" stroke="rgba(94,244,57,0.65)" strokeWidth="0.8" />
                        <line x1="126.25" y1="8" x2="140" y2="8" stroke="rgba(250,204,21,0.8)" strokeWidth="0.8" />
                        <line x1="140" y1="8" x2="316" y2="8" stroke="rgba(196,181,253,0.55)" strokeWidth="0.8" />

                        <text x="95.2" y="5" textAnchor="middle" fill="rgba(94,244,57,0.85)" fontSize="6.5" fontFamily="monospace">1.0x MARK</text>
                        <text x="133.1" y="5" textAnchor="middle" fill="rgba(250,204,21,0.9)" fontSize="6" fontFamily="monospace">¼x</text>
                        <text x="228" y="5" textAnchor="middle" fill="rgba(196,181,253,0.78)" fontSize="6.5" fontFamily="monospace">2.8x WORDMARK</text>

                        <text x="22" y="29" fill="rgba(250,204,21,0.8)" fontSize="6.2" fontFamily="monospace">ASC</text>
                        <text x="22" y="54" fill="rgba(94,244,57,0.8)" fontSize="6.2" fontFamily="monospace">CAP</text>
                        <text x="22" y="74" fill="rgba(196,181,253,0.65)" fontSize="6.2" fontFamily="monospace">EYE</text>
                        <text x="22" y="97" fill="rgba(94,244,57,0.8)" fontSize="6.2" fontFamily="monospace">BASE</text>

                        <text x="64.15" y="138" fill="rgba(94,244,57,0.82)" fontSize="6.5" fontFamily="monospace">R23 DOME · 2.6u OVERSHOOT</text>
                        <text x="206" y="138" fill="rgba(250,204,21,0.85)" fontSize="6.5" fontFamily="monospace">-10° CROWN AXIS · CLEARSPACE x</text>
                      </svg>
                    </div>
                  </div>

                  {/* Right: 2x2 Text-Free Animated Mascot State Cards */}
                  <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
                    <div className="flex items-center justify-center rounded-2xl border border-white/12 bg-[#2a1d42]/80 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.55)]">
                      <ElixirLogo variant="icon" iconClassName="w-20 h-20" playEntrance={true} enableEasterEggs={false} />
                    </div>

                    <div className="flex items-center justify-center rounded-2xl border border-amber-300/25 bg-[#2a1d42]/80 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.55)]">
                      <ElixirLogo variant="icon" iconClassName="w-20 h-20" forcedEgg="coin-catch" loopForcedEgg={true} />
                    </div>

                    <div className="flex items-center justify-center rounded-2xl border border-white/12 bg-[#2a1d42]/80 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.55)]">
                      <ElixirLogo variant="icon" iconClassName="w-20 h-20" forcedEgg="crown-slip" loopForcedEgg={true} />
                    </div>

                    <div className="flex items-center justify-center rounded-2xl border border-white/12 bg-[#2a1d42]/80 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.55)]">
                      <ElixirLogo variant="icon" iconClassName="w-20 h-20" forcedEgg="cheeky-wink" loopForcedEgg={true} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 03 · 3D CRAFT & PIPELINE (8.4s - 13.4s)
                Wireframe Mesh → Clay Turnaround Wipe → Textured 3D Props
               ============================================================== */}
            {actIndex === 2 && (
              <div
                key={`act-1-${replayNonce}`}
                className="sr-pipeline-stage relative z-10 flex size-full flex-col items-center justify-center px-7 pt-10 pb-5"
              >
                {/* Bento 3D Breakdown Grid */}
                <div className="grid w-full max-w-[97%] flex-1 min-h-0 grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] gap-3.5">
                  {/* Left: Blender Quad Wireframe Viewport (Live Video) */}
                  <div className="sr-wire-card relative overflow-hidden rounded-2xl border border-lime-400/35 bg-[#262629] shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
                    <ReelVideo
                      src="/showreel/king-wireframe.mp4"
                      poster="/showreel/king-wireframe.jpg"
                      className="size-full object-cover object-center"
                    />
                    {/* Vertical Emerald Topology Laser Scan */}
                    <div
                      aria-hidden="true"
                      className="sr-scan-beam-v pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-lime-400/45 to-transparent"
                    >
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-lime-300 shadow-[0_0_16px_#39ff14]" />
                    </div>
                    {/* Official Two-Tone Blender Viewport Badge */}
                    <div className="pointer-events-none absolute left-3.5 top-3.5 z-20 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-[#16141d]/80 px-2.5 py-1.5 backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.55)]">
                      <svg viewBox="0 0 64 64" className="size-5 shrink-0" fill="none" aria-hidden="true">
                        {/* Blender Orange Outer Ring & 3 Rays */}
                        <path
                          fill="#EA7600"
                          d="M36.5 22.5 L26.2 13.8 C24.6 12.5 22.2 12.7 20.9 14.3 C19.6 15.9 19.8 18.3 21.4 19.6 L27.8 24.8 H13.5 C11.4 24.8 9.8 26.5 9.8 28.5 C9.8 30.5 11.4 32.2 13.5 32.2 H25.2 L12.2 43.2 C10.6 44.5 10.4 46.9 11.7 48.5 C13 50.1 15.4 50.3 17 49 L27.6 40.1 C29.3 46.5 35.1 51.2 42 51.2 C50.3 51.2 57 44.5 57 36.2 C57 28.6 51.3 22.4 44 21.4 L36.5 22.5 Z M42 44.8 C37.2 44.8 33.4 41 33.4 36.2 C33.4 31.4 37.2 27.6 42 27.6 C46.8 27.6 50.6 31.4 50.6 36.2 C50.6 41 46.8 44.8 42 44.8 Z"
                        />
                        {/* Blender Blue Center Pupil */}
                        <circle cx="42" cy="36.2" r="5.2" fill="#265787" />
                      </svg>
                      <span className="text-[11px] font-bold tracking-wide text-white">
                        Blender
                      </span>
                    </div>

                    {/* Subtle Viewport Corner Reticles */}
                    <span aria-hidden="true" className="pointer-events-none absolute left-2.5 top-2.5 size-3 border-l-2 border-t-2 border-lime-400/70" />
                    <span aria-hidden="true" className="pointer-events-none absolute right-2.5 top-2.5 size-3 border-r-2 border-t-2 border-lime-400/70" />
                    <span aria-hidden="true" className="pointer-events-none absolute left-2.5 bottom-2.5 size-3 border-l-2 border-b-2 border-lime-400/70" />
                    <span aria-hidden="true" className="pointer-events-none absolute right-2.5 bottom-2.5 size-3 border-r-2 border-b-2 border-lime-400/70" />
                  </div>

                  {/* Right Column: Clay Turnaround (Top) + 3 Textured Prop Lookdev Sheets (Bottom) */}
                  <div className="flex min-h-0 flex-col gap-3">
                    {/* Top Wide Card: 4-Angle Clay Sculpt Turnaround with Laser Wipe */}
                    <div
                      className="relative flex-[1.2] min-h-0 overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.75)]"
                      style={{ backgroundColor: "#8C8A8B" }}
                    >
                      <div className="sr-clay-card size-full">
                        <img
                          src="/showreel/king-clay-turnaround.jpg"
                          alt="Alchemist King 3D clay sculpt turnaround"
                          className="size-full object-contain object-center scale-[1.28]"
                        />
                      </div>
                      <div
                        aria-hidden="true"
                        className="sr-scan-beam-h pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-transparent via-lime-400/50 to-transparent"
                      >
                        <div className="absolute inset-y-0 right-0 w-[2px] bg-lime-300 shadow-[0_0_18px_#39ff14]" />
                      </div>
                    </div>

                    {/* Bottom 3-Up Row: Textured 3D Prop Asset Sheets (exact seamless studio gray, zero crop) */}
                    <div className="grid flex-[0.88] min-h-0 grid-cols-3 gap-3">
                      {PROP_SHEETS.map((prop, i) => (
                        <div
                          key={prop.name}
                          className="sr-prop-card relative overflow-hidden rounded-xl border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.75)]"
                          style={
                            {
                              backgroundColor: prop.bg,
                              "--delay": `${prop.delay}ms`,
                              "--prop-rot": prop.rot,
                            } as CSSProperties
                          }
                        >
                          <img
                            src={prop.src}
                            alt={prop.name}
                            className="size-full object-contain object-center"
                          />
                          <div
                            className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            style={{ "--gloss-delay": `${1.9 + i * 0.16}s` } as CSSProperties}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lower-Third Kinetic Typography */}
                <div className="mt-3.5 text-center">
                  <div className="overflow-hidden">
                    <h2
                      className="sr-type-line hero-headline text-3xl uppercase text-white"
                      style={{ "--delay": "420ms" } as CSSProperties}
                    >
                      FROM WIREFRAME TO WORLD
                    </h2>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2">
                    {["Fully Quad Topology Mesh", "Custom 3D Props & Lookdev"].map((pill, i) => (
                      <span
                        key={pill}
                        className="sr-pill-pop rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-purple-100"
                        style={{ "--delay": `${920 + i * 95}ms` } as CSSProperties}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 03 · LIVING CINEMA (8.6s – 12.8s)
               ============================================================== */}
            {actIndex === 3 && (
              <div
                key={`act-3-${replayNonce}`}
                className="sr-act2-stage relative z-10 flex size-full flex-col items-center justify-center px-6 pt-10 pb-6"
              >
                {/* Large Unobstructed 3D Perspective Video Triptych — King Stirring Cauldron Centered */}
                <div className="relative flex w-full max-w-[98%] items-center justify-center">
                  {/* 4 Staggered, Independently Rotating & Phased Foreground 3D Coins */}
                  {[
                    {
                      wrapCls: "sr-prop-left -top-[16%] -left-[5%] w-[250px]",
                      vidCls: "-rotate-[24deg] drop-shadow-[0_28px_44px_rgba(250,204,21,0.44)]",
                      startOffset: 0.0,
                      rate: 0.84,
                      delay: "0ms",
                    },
                    {
                      wrapCls: "sr-prop-right -bottom-[18%] -right-[4%] w-[205px]",
                      vidCls: "rotate-[34deg] -scale-x-100 drop-shadow-[0_26px_40px_rgba(250,204,21,0.40)]",
                      startOffset: 0.72,
                      rate: 1.16,
                      delay: "140ms",
                    },
                    {
                      wrapCls: "sr-prop-right -top-[14%] right-[2%] w-[160px]",
                      vidCls: "rotate-[16deg] drop-shadow-[0_22px_32px_rgba(250,204,21,0.34)]",
                      startOffset: 1.35,
                      rate: 0.96,
                      delay: "260ms",
                    },
                    {
                      wrapCls: "sr-prop-left -bottom-[16%] left-[2%] w-[180px]",
                      vidCls: "-rotate-[42deg] -scale-x-100 drop-shadow-[0_24px_36px_rgba(250,204,21,0.36)]",
                      startOffset: 1.95,
                      rate: 1.26,
                      delay: "360ms",
                    },
                  ].map((coin, idx) => (
                    <div
                      key={idx}
                      style={{ animationDelay: coin.delay }}
                      className={`pointer-events-none absolute z-30 block${coin.wrapCls}`}
                    >
                      <AlphaVideo
                        webmSrc="/animations/coin-spin-3d.webm"
                        webpSrc="/animations/coin-spin-3d.webp"
                        poster="/animations/coin-spin-3d-poster.png"
                        onLoadedMetadata={(e) => {
                          const v = e.currentTarget;
                          v.playbackRate = coin.rate;
                          if (Number.isFinite(v.duration) && v.duration > 0) {
                            v.currentTime = coin.startOffset % v.duration;
                          }
                        }}
                        className={`size-full object-contain ${coin.vidCls}`}
                      />
                    </div>
                  ))}

                  {/* Left Wing Card — Midas Brew */}
                  <div className="sr-trip-left relative z-10 -mr-5 block aspect-[16/11] w-[35%] overflow-hidden rounded-2xl border border-white/15 bg-[#1a102d] shadow-[0_22px_50px_rgba(0,0,0,0.8)]">
                    <ReelVideo
                      src="/videos/alchemist-midas-brew.mp4"
                      poster="/videos/alchemist-midas-brew-poster.jpg"
                      className="size-full object-cover"
                    />
                    <div
                      className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ "--gloss-delay": "1.1s" } as CSSProperties}
                    />
                  </div>

                  {/* Center Lead Hero Card — King Stirring the Cauldron */}
                  <div className="sr-trip-center relative z-20 aspect-[4/4.1] w-[37%] overflow-hidden rounded-2xl border border-white/15 bg-[#1a102d] shadow-[0_28px_72px_rgba(0,0,0,0.92)]">
                    <ReelVideo
                      src="/videos/signup-cauldron-loop.mp4"
                      poster="/videos/signup-cauldron-poster.jpg"
                      className="size-full object-cover object-[50%_30%]"
                    />
                    <div
                      className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                      style={{ "--gloss-delay": "0.95s" } as CSSProperties}
                    />
                  </div>

                  {/* Right Wing Card — Potion Wand */}
                  <div className="sr-trip-right relative z-10 -ml-5 block aspect-[16/11] w-[35%] overflow-hidden rounded-2xl border border-white/15 bg-[#1a102d] shadow-[0_22px_50px_rgba(0,0,0,0.8)]">
                    <ReelVideo
                      src="/videos/alchemist-potion-wand.mp4"
                      poster="/videos/alchemist-potion-wand-poster.jpg"
                      className="size-full object-cover"
                    />
                    <div
                      className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ "--gloss-delay": "1.25s" } as CSSProperties}
                    />
                  </div>
                </div>

                {/* Kinetic Lower-Third Typography + Staggered Craft Pills */}
                <div className="mt-4 text-center">
                  <div className="overflow-hidden">
                    <h2
                      className="sr-type-line hero-headline text-3xl uppercase text-white"
                      style={{ "--delay": "460ms" } as CSSProperties}
                    >
                      LIVING 3D ART DIRECTION
                    </h2>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                    {["Custom High Quality Loops", "Real Emotion & Visual Delight", "Zero Generic Templates"].map((pill, i) => (
                      <span
                        key={pill}
                        className="sr-pill-pop rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-semibold text-purple-100"
                        style={{ "--delay": `${680 + i * 95}ms` } as CSSProperties}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 04 · KEY ART & WORLD (12.8s – 17.6s)
                3-Row Storyboard Wall showcasing all 7 bespoke Elixir key arts
               ============================================================== */}
            {actIndex === 4 && (
              <div
                key={`act-4-${replayNonce}`}
                className="sr-keyart-stage relative z-10 flex size-full flex-col justify-center gap-3 px-6 py-5"
              >
                {/* Row 1: Two Cinema-Scope Slime Action Banners (2.35:1) */}
                <div className="grid flex-[0.88] min-h-0 grid-cols-2 gap-3">
                  <div className="sr-banner-left relative overflow-hidden rounded-xl border border-white/15 bg-[#160b2b] shadow-[0_18px_40px_rgba(0,0,0,0.75)]">
                    <img
                      src="/showreel/art-slime-rocket.jpg"
                      alt="Slime riding potion rocket key art"
                      className="sr-art-img size-full object-cover object-center"
                    />
                    <div
                      className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ "--gloss-delay": "0.95s" } as CSSProperties}
                    />
                  </div>
                  <div className="sr-banner-right relative overflow-hidden rounded-xl border border-white/15 bg-[#160b2b] shadow-[0_18px_40px_rgba(0,0,0,0.75)]">
                    <img
                      src="/showreel/art-slime-plinko.jpg"
                      alt="Slime diving through golden Plinko pegs key art"
                      className="sr-art-img size-full object-cover object-center"
                    />
                    <div
                      className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      style={{ "--gloss-delay": "1.1s" } as CSSProperties}
                    />
                  </div>
                </div>

                {/* Row 2: Three 16:9 Hero King Scenes */}
                <div className="grid flex-1 min-h-0 grid-cols-3 gap-3">
                  {[
                    { src: "/showreel/art-king-workshop.jpg", alt: "King holding glowing potion wand in workshop", delay: 220, lead: false },
                    { src: "/showreel/art-coin-fountain.jpg", alt: "King celebrating explosive gold coin fountain", delay: 300, lead: true },
                    { src: "/showreel/art-treasure-chest.jpg", alt: "King and slime celebrating glowing treasure chest", delay: 380, lead: false },
                  ].map((item, i) => (
                    <div
                      key={item.src}
                      className={cn(
                        "sr-art-card relative overflow-hidden rounded-xl border bg-[#160b2b] shadow-[0_20px_48px_rgba(0,0,0,0.8)]",
                        item.lead
                          ? "border-lime-400/45 shadow-[0_22px_52px_rgba(0,0,0,0.88),0_0_24px_rgba(57,255,20,0.16)]"
                          : "border-white/15"
                      )}
                      style={{ "--delay": `${item.delay}ms` } as CSSProperties}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="sr-art-img size-full object-cover object-center"
                      />
                      <div
                        className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{ "--gloss-delay": `${1.25 + i * 0.14}s` } as CSSProperties}
                      />
                    </div>
                  ))}
                </div>

                {/* Row 3: Two Flanking 16:9 Key Arts Framing Centered Title Lockup */}
                <div className="grid flex-1 min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)_minmax(0,1fr)] gap-3">
                  <div
                    className="sr-art-card relative block overflow-hidden rounded-xl border border-white/15 bg-[#160b2b] shadow-[0_18px_40px_rgba(0,0,0,0.75)]"
                    style={{ "--delay": "460ms" } as CSSProperties}
                  >
                    <img
                      src="/showreel/art-king-wand-brew.jpg"
                      alt="King brewing with glowing wand over cauldron"
                      className="sr-art-img size-full object-cover object-center"
                    />
                  </div>

                  {/* Center Editorial Title Cell (no pills) */}
                  <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-[#140a26]/85 px-3 py-2 text-center backdrop-blur-sm">
                    <div className="overflow-hidden">
                      <h2
                        className="sr-type-line hero-headline text-3xl uppercase leading-none text-white"
                        style={{ "--delay": "420ms" } as CSSProperties}
                      >
                        WORLD OF ELIXIR
                      </h2>
                    </div>
                  </div>

                  <div
                    className="sr-art-card relative block overflow-hidden rounded-xl border border-white/15 bg-[#160b2b] shadow-[0_18px_40px_rgba(0,0,0,0.75)]"
                    style={{ "--delay": "540ms" } as CSSProperties}
                  >
                    <img
                      src="/showreel/art-arcade-hall.jpg"
                      alt="King and slime holding elixir bottle inside arcade hall"
                      className="sr-art-img size-full object-cover object-center"
                    />
                  </div>
                </div>

                {/* Framed 30%-Smaller Key Art Zoom Overlays (Storyboard remains visible around them) */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
                  <div className="sr-keyart-full-1 h-[68%] w-[68%] overflow-hidden rounded-2xl border border-lime-400/50 bg-[#0d061a] shadow-[0_32px_90px_rgba(0,0,0,0.95)]">
                    <img
                      src="/showreel/art-slime-rocket.jpg"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </div>
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
                  <div className="sr-keyart-full-2 h-[68%] w-[68%] overflow-hidden rounded-2xl border border-lime-400/50 bg-[#0d061a] shadow-[0_32px_90px_rgba(0,0,0,0.95)]">
                    <img
                      src="/showreel/art-king-wand-brew.jpg"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </div>
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
                  <div className="sr-keyart-full-3 h-[68%] w-[68%] overflow-hidden rounded-2xl border border-lime-400/50 bg-[#0d061a] shadow-[0_32px_90px_rgba(0,0,0,0.95)]">
                    <img
                      src="/showreel/art-coin-fountain.jpg"
                      alt=""
                      className="size-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 05 · 8 BESPOKE ELIXIR ORIGINALS (17.6s – 21.6s)
                True 3:4 Portrait GameCard Styling matching production site
               ============================================================== */}
            {actIndex === 5 && (
              <div
                key={`act-5-${replayNonce}`}
                className="sr-act3-stage relative z-10 flex size-full items-center justify-center px-8 py-6"
              >
                <div className="grid w-full max-w-[98%] items-center gap-7 grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
                  {/* Left Editorial Column */}
                  <div className="flex flex-col items-start text-left">
                    <AlphaVideo
                      webmSrc="/animations/flask-swish.webm"
                      webpSrc="/animations/flask-swish.webp"
                      poster="/animations/flask-swish-poster.png"
                      className="sr-pill-pop -ml-3 mb-1 size-32 object-contain drop-shadow-[0_18px_32px_rgba(57,255,20,0.38)]"
                      style={{ "--delay": "60ms" } as CSSProperties}
                    />
                    <div className="overflow-hidden">
                      <h2
                        className="sr-type-line hero-headline text-4xl uppercase leading-[1.02] text-white"
                        style={{ "--delay": "180ms" } as CSSProperties}
                      >
                        8 ELIXIR
                        <br />
                        ORIGINALS
                      </h2>
                    </div>
                    <p
                      className="sr-eyebrow mt-2.5 text-xs leading-relaxed text-purple-200/80"
                      style={{ "--delay": "340ms" } as CSSProperties}
                    >
                      Unique portrait artwork to fit the universe.
                    </p>
                    <div
                      className="sr-pill-pop mt-4 origin-left scale-125"
                      style={{ "--delay": "520ms" } as CSSProperties}
                    >
                      <span className="exclusive-pill ep-liquid-green !h-7 !px-3.5 !text-xs">
                        <span aria-hidden="true" className="ep-liquid">
                          <span className="ep-liquid-wave" />
                          {[0, 1, 2, 3, 4].map((b) => (
                            <span key={b} className={`ep-liquid-bubble ep-liquid-bubble-${b}`} />
                          ))}
                        </span>
                        <span className="ep-label">Exclusive</span>
                      </span>
                    </div>
                  </div>

                  {/* Right 4x2 True 3:4 Portrait GameCard Deck */}
                  <div className="mx-auto grid w-full max-w-[660px] grid-cols-4 gap-3">
                    {ORIGINALS.map((game, i) => (
                      <div
                        key={game.name}
                        className="sr-orig-card relative aspect-[3/4] overflow-hidden rounded-xl border border-purple-300/15 bg-dicey-card shadow-[0_18px_36px_rgba(0,0,0,0.7)]"
                        style={
                          {
                            "--delay": `${120 + i * 58}ms`,
                            "--deal-x": game.dx,
                            "--deal-y": game.dy,
                            "--deal-rot": game.rot,
                          } as CSSProperties
                        }
                      >
                        <img
                          src={game.img}
                          alt={game.name}
                          className="absolute inset-0 size-full object-cover"
                        />

                        {/* Production GameCard bottom title lockup */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b052b]/95 via-[#1b052b]/55 to-transparent px-2 pb-3 pt-9 text-center">
                          <h3 className="hero-headline text-base uppercase leading-none text-white">
                            {game.name}
                          </h3>
                          <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-purple-200">
                            Elixir Originals
                          </p>
                        </div>

                        {/* Authentic liquid-green Exclusive pill on Limbo, Plinko & Keno */}
                        {game.exclusive && (
                          <div className="absolute left-1.5 top-1.5 block">
                            <span className="exclusive-pill ep-liquid-green !h-[18px] !px-2 !text-[9px]">
                              <span aria-hidden="true" className="ep-liquid">
                                <span className="ep-liquid-wave" />
                                {[0, 1, 2].map((b) => (
                                  <span key={b} className={`ep-liquid-bubble ep-liquid-bubble-${b}`} />
                                ))}
                              </span>
                              <span className="ep-label">Exclusive</span>
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 06 · CLOCKWORK FORGE VIP SYSTEM (21.6s – 26.2s)
               ============================================================== */}
            {actIndex === 6 && (
              <div
                key={`act-6-${replayNonce}`}
                className="relative z-10 flex size-full flex-col items-center justify-center gap-7 overflow-hidden px-8 py-7"
              >
                {/* Top Headline */}
                <div className="relative z-20 text-center">
                  <div className="overflow-hidden">
                    <h2
                      className="sr-type-line hero-headline text-4xl uppercase text-white"
                      style={{ "--delay": "140ms" } as CSSProperties}
                    >
                      5-TIER VIP ASCENSION
                    </h2>
                  </div>
                </div>

                {/* Center Stage: 5 Tiers with Center Animated Sapphire */}
                <div className="relative z-20 flex w-full max-w-3xl items-center justify-center gap-7">
                  {/* Tier 1 Bronze */}
                  <div
                    className="sr-tier-satellite flex flex-col items-center gap-1"
                    style={{ "--delay": "220ms", "--wing-x": "60px" } as CSSProperties}
                  >
                    <VipBadge src="/vip/elixir/tier1.svg" alt="Bronze" level={1} className="size-16" />
                    <span className="text-[11px] font-semibold text-amber-200/80">Bronze</span>
                  </div>

                  {/* Tier 2 Silver */}
                  <div
                    className="sr-tier-satellite flex flex-col items-center gap-1"
                    style={{ "--delay": "300ms", "--wing-x": "35px" } as CSSProperties}
                  >
                    <VipBadge src="/vip/elixir/tier2.svg" alt="Silver" level={2} className="size-[74px]" />
                    <span className="text-[11px] font-semibold text-slate-200/85">Silver</span>
                  </div>

                  {/* Tier 5 SAPPHIRE HERO — LIVE CLOCKWORK FORGE ANIMATION */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.48)_0%,rgba(139,92,246,0.18)_48%,transparent_72%)] blur-xl"
                    />
                    <VipBadge
                      src="/vip/elixir/tier5.svg"
                      alt="Sapphire VIP"
                      level={5}
                      sheen
                      animated
                      className="relative size-40"
                    />
                    <span className="mt-1 rounded-full border border-blue-400/40 bg-blue-500/20 px-2.5 py-0.5 text-xs font-bold text-blue-200">
                      Sapphire V
                    </span>
                  </div>

                  {/* Tier 3 Gold */}
                  <div
                    className="sr-tier-satellite flex flex-col items-center gap-1"
                    style={{ "--delay": "300ms", "--wing-x": "-35px" } as CSSProperties}
                  >
                    <VipBadge src="/vip/elixir/tier3.svg" alt="Gold" level={3} className="size-[74px]" />
                    <span className="text-[11px] font-semibold text-yellow-200/90">Gold</span>
                  </div>

                  {/* Tier 4 Diamond */}
                  <div
                    className="sr-tier-satellite flex flex-col items-center gap-1"
                    style={{ "--delay": "220ms", "--wing-x": "-60px" } as CSSProperties}
                  >
                    <VipBadge src="/vip/elixir/tier4.svg" alt="Diamond" level={4} className="size-16" />
                    <span className="text-[11px] font-semibold text-cyan-200/90">Diamond</span>
                  </div>
                </div>

                {/* Editorial Craft Caption: All Animated SVG */}
                <div
                  className="sr-eyebrow relative z-20 flex flex-col items-center gap-1 text-center"
                  style={{ "--delay": "460ms" } as CSSProperties}
                >
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-white/20" />
                    <span className="text-xs font-bold uppercase tracking-[0.26em] text-white/90">
                      All Animated SVG
                    </span>
                    <span className="h-px w-8 bg-white/20" />
                  </div>
                  <span className="text-xs text-purple-200/65">
                    Hand-rigged 14-layer vector crests
                  </span>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 07 · UI DELIGHT — LIVE MICRO-ANIMATIONS BENTO (27.0s – 31.6s)
               ============================================================== */}
            {actIndex === 7 && (
              <div
                key={`act-7-${replayNonce}`}
                className="sr-act5-stage relative z-10 flex size-full flex-col items-center justify-center overflow-hidden px-9 py-6"
              >
                {/* 4x2 Live Micro-Interaction Bento Grid */}
                <div className="relative z-10 grid w-full max-w-[94%] flex-1 min-h-0 grid-cols-4 gap-3 pt-3">
                  {/* Tile 1: 3D Spinning Coin & Bubbling Flask */}
                  <div
                    className="sr-art-card flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#170e28]/90 p-3 shadow-xl"
                    style={{ "--delay": "100ms" } as CSSProperties}
                  >
                    <div className="flex flex-1 items-center justify-center gap-3">
                      <AlphaVideo
                        webmSrc="/animations/coin-spin-3d.webm"
                        webpSrc="/animations/coin-spin-3d.webp"
                        poster="/animations/coin-spin-3d-poster.png"
                        className="size-20 object-contain drop-shadow-[0_10px_18px_rgba(250,204,21,0.3)]"
                      />
                      <AlphaVideo
                        webmSrc="/animations/flask-swish.webm"
                        webpSrc="/animations/flask-swish.webp"
                        poster="/animations/flask-swish-poster.png"
                        className="size-20 object-contain drop-shadow-[0_10px_18px_rgba(57,255,20,0.28)]"
                      />
                    </div>
                    <span className="text-xs font-semibold text-purple-200/80">
                      3D Reward Coins & Flasks
                    </span>
                  </div>

                  {/* Tile 2: Animated Liquid-Green Exclusive Pill */}
                  <div
                    className="sr-art-card flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#170e28]/90 p-3 shadow-xl"
                    style={{ "--delay": "180ms" } as CSSProperties}
                  >
                    <div className="flex flex-1 items-center justify-center">
                      <div className="scale-[1.7] scale-[2.1]">
                        <span className="exclusive-pill ep-liquid-green">
                          <span aria-hidden="true" className="ep-liquid">
                            <span className="ep-liquid-wave" />
                            {[0, 1, 2, 3, 4].map((b) => (
                              <span key={b} className={`ep-liquid-bubble ep-liquid-bubble-${b}`} />
                            ))}
                          </span>
                          <span className="ep-label">Exclusive</span>
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-purple-200/80">
                      Sloshing Liquid Pill
                    </span>
                  </div>

                  {/* Tile 3: 100x+ Fizzy Green Win Border */}
                  <div
                    className="sr-art-card flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#170e28]/90 p-3 shadow-xl"
                    style={{ "--delay": "260ms" } as CSSProperties}
                  >
                    <div className="flex flex-1 w-full items-center justify-center">
                      <div className="win-card-fizzy relative w-full max-w-[215px] rounded-xl p-[2px]">
                        <span className="win-fizz-dot left-[14%] -top-1 size-2" style={{ animationDelay: "0s" }} />
                        <span className="win-fizz-dot left-[52%] -top-1.5 size-1.5" style={{ animationDelay: "0.45s" }} />
                        <span className="win-fizz-dot right-[18%] -top-1 size-2" style={{ animationDelay: "0.9s" }} />
                        <div className="flex items-center justify-between gap-2 rounded-[10px] bg-[#1a112d] px-2.5 py-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <VipBadge src="/vip/elixir/tier5.svg" alt="" className="size-5 shrink-0" />
                            <div className="min-w-0">
                              <span className="block truncate text-[10px] font-semibold text-white">DiamondKing</span>
                              <span className="block text-[9px] text-lime-300 font-bold tabular-nums">384.0x</span>
                            </div>
                          </div>
                          <span className="flex items-center gap-1 text-[11px] font-bold text-white tabular-nums">
                            $1,920
                            <img src="/crypto/usdc.svg" alt="" className="size-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-purple-200/80">
                      100x+ Fizzy Win Border
                    </span>
                  </div>

                  {/* Tile 4: VIP Progress Bar with Electric Sparks */}
                  <div
                    className="sr-art-card flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#170e28]/90 p-3 shadow-xl"
                    style={{ "--delay": "340ms" } as CSSProperties}
                  >
                    <div className="flex flex-1 w-full items-center justify-center px-2">
                      <div className="flex w-full max-w-[210px] items-center gap-2.5 rounded-full border border-white/10 bg-[#271b3f] px-3 py-2">
                        <VipBadge src="/vip/elixir/tier5.svg" alt="" className="size-6 shrink-0" />
                        <div className="relative h-2 flex-1">
                          <div className="size-full overflow-hidden rounded-full bg-[#140d24]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-emerald-400"
                              style={{ width: "68%" }}
                            />
                          </div>
                          <div className="absolute top-1/2 -translate-y-1/2" style={{ left: "calc(68% - 4px)" }}>
                            <span className="spark-particle spark-1" style={{ top: "-1px", left: "0px" }} />
                            <span className="spark-particle spark-2" style={{ top: "0px", left: "1px" }} />
                            <span className="spark-particle spark-3" style={{ top: "-2px", left: "-1px" }} />
                            <span className="spark-particle spark-4" style={{ top: "1px", left: "0px" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-purple-200/80">
                      Electric XP Progress Sparks
                    </span>
                  </div>

                  {/* Tile 5: Tactile 3D Button with Potion Bubbles */}
                  <div
                    className="sr-art-card flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#170e28]/90 p-3 shadow-xl"
                    style={{ "--delay": "420ms" } as CSSProperties}
                  >
                    <div className="flex flex-1 items-center justify-center">
                      <PrimaryButton className="[&_.ui-button-face]:px-6 [&_.ui-button-face]:py-2.5 [&_.ui-button-face]:text-sm [&_.ui-button-bubble-one]:animate-[bubble-1_1.8s_ease-out_infinite] [&_.ui-button-bubble-two]:animate-[bubble-2_2s_ease-out_0.2s_infinite] [&_.ui-button-bubble-three]:animate-[bubble-3_1.6s_ease-out_0.4s_infinite]">
                        Claim Bonus
                      </PrimaryButton>
                    </div>
                    <span className="text-xs font-semibold text-purple-200/80">
                      Tactile 3D Bubbling CTA
                    </span>
                  </div>

                  {/* Tile 6: Multi-Layer Clockwork Forge SVG Crest */}
                  <div
                    className="sr-art-card flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#170e28]/90 p-3 shadow-xl"
                    style={{ "--delay": "500ms" } as CSSProperties}
                  >
                    <div className="flex flex-1 items-center justify-center">
                      <VipBadge
                        src="/vip/elixir/tier5.svg"
                        alt="Sapphire VIP"
                        level={5}
                        sheen
                        animated
                        className="size-24"
                      />
                    </div>
                    <span className="text-xs font-semibold text-purple-200/80">
                      Hand-Rigged SVG Badges
                    </span>
                  </div>

                  {/* Tile 7: Layered Glass Live Chat Card */}
                  <div
                    className="sr-art-card flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#170e28]/90 p-3 shadow-xl"
                    style={{ "--delay": "560ms" } as CSSProperties}
                  >
                    <div className="flex flex-1 w-full items-center justify-center">
                      <div className="w-full max-w-[195px] rounded-xl border border-white/15 bg-white/[0.06] p-2.5 backdrop-blur-md shadow-[0_10px_24px_rgba(0,0,0,0.4)]">
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <VipBadge src="/vip/elixir/tier4.svg" alt="" className="size-4 shrink-0" />
                            <span className="truncate text-[10px] font-bold text-cyan-300">PotionKing</span>
                          </div>
                          <span className="flex items-center gap-1 text-[8px] font-mono text-lime-300">
                            <span className="size-1.5 rounded-full bg-lime-400 animate-pulse" />
                            LIVE
                          </span>
                        </div>
                        <p className="text-[10px] leading-snug text-purple-100/90">
                          Just hit 384x on Crash!
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-purple-200/80">
                      Layered Glass Live Chat
                    </span>
                  </div>

                  {/* Tile 8: Real Live WebGL Bubbling Potion Shader */}
                  <div
                    className="sr-art-card flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#170e28]/90 p-3 shadow-xl"
                    style={{ "--delay": "620ms" } as CSSProperties}
                  >
                    <div className="flex flex-1 w-full items-center justify-center">
                      <div className="relative h-20 w-full max-w-[195px] overflow-hidden rounded-xl border border-lime-400/25 bg-[#120922] shadow-inner">
                        <DeepLiquidShader className="size-full" />
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-purple-200/80">
                      Live WebGL Potion Shader
                    </span>
                  </div>
                </div>

                {/* Compact Lower-Third Title */}
                <div className="mt-3 text-center">
                  <div className="overflow-hidden">
                    <h2
                      className="sr-type-line hero-headline text-2xl uppercase text-white"
                      style={{ "--delay": "360ms" } as CSSProperties}
                    >
                      MICRO-ANIMATIONS & UI DELIGHT
                    </h2>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 08 · LIVE SYSTEMS (DESKTOP & MOBILE)
               ============================================================== */}
            {actIndex === 8 && (
              <div
                key={`act-8-${replayNonce}`}
                className="sr-act5-stage relative z-10 flex size-full flex-col items-center justify-center px-8 py-5"
              >
                {/* Desktop macOS Window + Titanium iPhone Frame Side-by-Side */}
                <div className="relative flex w-full max-w-[96%] flex-1 min-h-0 items-center justify-center gap-6">
                  <div className="sr-ui-left relative z-10 w-[72%] overflow-hidden rounded-2xl border border-white/20 bg-[#140d24] ring-1 ring-white/10 shadow-[0_28px_72px_rgba(0,0,0,0.9)]">
                    {/* Sleek macOS Safari Browser Chrome */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#1c1330] px-3 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="size-2.5 rounded-full bg-[#febc2e]" />
                        <span className="size-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="rounded-md bg-black/35 px-3.5 py-0.5 text-[9px] font-medium text-purple-200/75">
                        elixir.gg
                      </span>
                      <div className="w-10" />
                    </div>

                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src="/showreel/desktop-home-clean.png"
                        alt="Elixir desktop lobby with Live Chat closed"
                        className="size-full object-cover object-top"
                      />

                      {/* Live Playing Hero Banner Video seamlessly masked onto the Pick Your Potion card */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute overflow-hidden rounded-[1.5%]"
                        style={{
                          left: "59.38%",
                          top: "10.47%",
                          width: "37.99%",
                          height: "32.19%",
                          maskImage:
                            "linear-gradient(to right, transparent 48%, rgba(0, 0, 0, 0.45) 62%, black 78%)",
                          WebkitMaskImage:
                            "linear-gradient(to right, transparent 48%, rgba(0, 0, 0, 0.45) 62%, black 78%)",
                        }}
                      >
                        <ReelVideo
                          src="/videos/alchemist-potion-wand-mini.mp4"
                          poster="/videos/alchemist-potion-wand-mini-poster.jpg"
                          className="absolute inset-0 size-full object-cover object-center opacity-85"
                        />
                      </div>

                      <div
                        className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        style={{ "--gloss-delay": "0.9s" } as CSSProperties}
                      />
                    </div>
                  </div>

                  {/* Titanium iPhone 16 Pro Style Frame Next to Desktop */}
                  <div className="sr-ui-right relative z-20 block w-[21%] max-w-[215px] rounded-[34px] border-[4px] border-[#3d3749] bg-[#0b0712] p-[5px] ring-1 ring-white/25 shadow-[0_28px_68px_rgba(0,0,0,0.95)]">
                    {/* Side Hardware Buttons */}
                    <span aria-hidden="true" className="pointer-events-none absolute -left-[6px] top-[20%] h-6 w-[2px] rounded-l bg-[#524a61]" />
                    <span aria-hidden="true" className="pointer-events-none absolute -left-[6px] top-[31%] h-8 w-[2px] rounded-l bg-[#524a61]" />
                    <span aria-hidden="true" className="pointer-events-none absolute -right-[6px] top-[26%] h-10 w-[2px] rounded-r bg-[#524a61]" />

                    <div className="relative flex aspect-[9/19.5] w-full flex-col overflow-hidden rounded-[26px] bg-[#140d24]">
                      {/* iOS Status Bar + Dynamic Island Safe Area (keeps app header unobstructed) */}
                      <div className="relative z-20 flex h-5 shrink-0 items-center justify-between bg-[#140d24] px-3 pt-0.5 text-[7px] font-semibold text-white/80">
                        <span className="tabular-nums">9:41</span>
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-1 h-3 w-12 -translate-x-1/2 rounded-full bg-black ring-1 ring-white/10"
                        />
                        <span className="inline-flex items-center gap-0.5">
                          <span className="h-1.5 w-2.5 rounded-[2px] border border-white/60 p-[1px]">
                            <span className="block size-full rounded-[1px] bg-white/85" />
                          </span>
                        </span>
                      </div>

                      <div className="relative flex-1 min-h-0 w-full overflow-hidden">
                        <img
                          src="/showreel/mobile-home.png"
                          alt="Elixir mobile app experience"
                          className="size-full object-cover object-top"
                        />
                        <div
                          className="sr-gloss pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                          style={{ "--gloss-delay": "1.15s" } as CSSProperties}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Lower-Third Title (no bulky pills) */}
                <div className="mt-2.5 text-center">
                  <div className="overflow-hidden">
                    <h2
                      className="sr-type-line hero-headline text-2xl uppercase text-white"
                      style={{ "--delay": "340ms" } as CSSProperties}
                    >
                      DESKTOP & MOBILE EXPERIENCE
                    </h2>
                  </div>
                </div>
              </div>
            )}

            {/* ==============================================================
                ACT 09 · PORTFOLIO FINALE & CREDIT LOCKUP (35.8s – 39.2s)
               ============================================================== */}
            {actIndex === 9 && (
              <div
                key={`act-9-${replayNonce}`}
                className="relative z-10 flex size-full flex-col items-center justify-center px-6 text-center"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(57,255,20,0.16)_0%,rgba(168,85,247,0.16)_45%,transparent_72%)] blur-2xl"
                />

                <div className="sr-act6-lockup relative flex flex-col items-center">
                  <ElixirLogo
                    iconClassName="w-16 h-16"
                    textClassName="text-[48px]"
                    gapClassName="gap-2"
                    className="drop-shadow-[0_18px_36px_rgba(0,0,0,0.75)]"
                  />
                  <div className="mt-4 overflow-hidden">
                    <h2
                      className="sr-type-line hero-headline text-4xl uppercase text-white"
                      style={{ "--delay": "240ms" } as CSSProperties}
                    >
                      DESIGNED & ENGINEERED END-TO-END
                    </h2>
                  </div>
                  <p
                    className="sr-eyebrow mt-1.5 text-sm text-purple-200/75"
                    style={{ "--delay": "420ms" } as CSSProperties}
                  >
                    Blender 3D · Next.js · Tailwind CSS · WebGL Shaders · Multi-Layer SVG Motion
                  </p>

                  <div
                    className="sr-pill-pop mt-6"
                    style={{ "--delay": "540ms" } as CSSProperties}
                  >
                    <Link href="/" className="inline-block">
                      <PrimaryButton className="[&_.ui-button-face]:px-10 [&_.ui-button-face]:py-4 [&_.ui-button-face]:text-base [&_.ui-button-face]:font-extrabold">
                        Click Here to View Live Prototype
                      </PrimaryButton>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            </div>
          </div>

          {/* Subtle portrait mobile hint */}
          {cleanMode && (
            <p className="mt-3 text-center text-[11px] font-medium tracking-wide text-purple-200/45 sm:hidden landscape:hidden">
              Rotate your phone for full screen
            </p>
          )}

          {/* ================================================================
              DIRECTOR SCRUBBER & CHAPTER CONTROLS (hidden in Clean Mode)
             ================================================================ */}
          {!cleanMode && (
            <div className="mt-4 rounded-2xl border border-white/[0.08] bg-[#140c24] p-3.5 sm:p-4">
              {/* Segmented Chapter Timeline */}
              <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5 lg:grid-cols-10 sm:gap-2">
                {ACTS.map((act, idx) => {
                  const isActive = idx === actIndex;
                  const pct =
                    elapsed < act.start
                      ? 0
                      : elapsed >= act.start + act.duration
                        ? 100
                        : ((elapsed - act.start) / act.duration) * 100;

                  return (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => jumpToAct(idx)}
                      className={cn(
                        "group flex flex-col items-start rounded-xl border px-2.5 py-2 text-left transition-colors",
                        isActive
                          ? "border-lime-400/45 bg-lime-400/[0.08]"
                          : "border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="flex w-full items-center justify-between text-[10px] font-bold">
                        <span className={isActive ? "text-lime-300" : "text-purple-300/60"}>
                          {act.code}
                        </span>
                        <span className="text-purple-300/40 tabular-nums">{act.duration.toFixed(1)}s</span>
                      </div>
                      <span className="mt-0.5 truncate w-full text-[11px] font-semibold text-white">
                        {act.label}
                      </span>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            isActive ? "bg-lime-400" : "bg-purple-400/50"
                          )}
                          style={{ width: `${pct.toFixed(1)}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Transport Controls + Active Animation Principle Readout */}
              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#120822] hover:bg-gray-200 transition-colors"
                  >
                    {isPlaying ? <BiPause className="size-4" /> : <BiPlay className="size-4" />}
                    {isPlaying ? "Pause" : "Play"}
                  </button>
                  <button
                    type="button"
                    onClick={restartReel}
                    aria-label="Restart showreel"
                    className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-semibold text-purple-100 hover:bg-white/[0.09] transition-colors"
                  >
                    <BiRevision className="size-4" />
                    Restart
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoopActOnly((l) => !l)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors",
                      loopActOnly
                        ? "border-lime-400/45 bg-lime-400/15 text-lime-200"
                        : "border-white/10 bg-white/[0.04] text-purple-200/70 hover:text-white"
                    )}
                  >
                    <BiRepeat className="size-4" />
                    Loop Act
                  </button>

                  {/* Speed Picker */}
                  <div className="flex items-center rounded-lg border border-white/10 bg-[#0d0718] p-0.5">
                    {([0.5, 1, 1.25] as const).map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSpeed(s)}
                        className={cn(
                          "rounded-md px-2 py-1 text-[11px] font-bold tabular-nums transition-colors",
                          speed === s
                            ? "bg-white/15 text-white"
                            : "text-purple-300/55 hover:text-white"
                        )}
                      >
                        {s}×
                      </button>
                    ))}
                  </div>
                  {/* Backdrop Switcher */}
                  <div className="flex items-center rounded-lg border border-white/10 bg-[#0d0718] p-0.5">
                    {(
                      [
                        { id: "alchemy", label: "Alchemy Bokeh" },
                        { id: "obsidian", label: "Obsidian Studio" },
                        { id: "arcane", label: "Arcane Rings" },
                      ] as const
                    ).map((bg) => (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => setBackdrop(bg.id)}
                        className={cn(
                          "rounded-md px-2 py-1 text-[11px] font-semibold transition-colors",
                          backdrop === bg.id
                            ? "bg-lime-400/20 text-lime-200"
                            : "text-purple-300/55 hover:text-white"
                        )}
                      >
                        {bg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Principle Callout */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-purple-300/55">Active Craft:</span>
                  <span className="font-semibold text-lime-300">{currentAct.principle}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
