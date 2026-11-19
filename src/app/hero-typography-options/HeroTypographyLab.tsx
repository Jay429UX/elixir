"use client";

import { useState } from "react";
import Link from "next/link";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";

type FontChoice = "montserrat" | "geist" | "space" | "archivo" | "anton";
type EyebrowStyle = "purple" | "lime" | "white" | "pill";
type ShadowStyle = "current" | "none" | "soft";

interface HeroTypoConfig {
  font: FontChoice;
  headlineSize: number;
  headlineWeight: number;
  headlineLineHeight: number;
  headlineTracking: number;
  headlineUppercase: boolean;
  headlineShadow: ShadowStyle;
  headlineMaxWidth: number;
  eyebrowSize: number;
  eyebrowWeight: number;
  eyebrowTracking: number;
  eyebrowUppercase: boolean;
  eyebrowStyle: EyebrowStyle;
  bodySize: number;
  bodyWeight: number;
  bodyLineHeight: number;
  bodyMaxWidth: number;
}

const PRESETS: Record<string, { label: string; config: HeroTypoConfig }> = {
  current: {
    label: "Saved (Current)",
    config: {
      font: "montserrat",
      headlineSize: 44,
      headlineWeight: 900,
      headlineLineHeight: 0.94,
      headlineTracking: -0.04,
      headlineUppercase: true,
      headlineShadow: "soft",
      headlineMaxWidth: 390,
      eyebrowSize: 16,
      eyebrowWeight: 800,
      eyebrowTracking: 0.04,
      eyebrowUppercase: true,
      eyebrowStyle: "purple",
      bodySize: 15,
      bodyWeight: 400,
      bodyLineHeight: 1.45,
      bodyMaxWidth: 360,
    },
  },
  punchy: {
    label: "Punchy Tight",
    config: {
      font: "montserrat",
      headlineSize: 44,
      headlineWeight: 900,
      headlineLineHeight: 0.94,
      headlineTracking: -0.04,
      headlineUppercase: true,
      headlineShadow: "soft",
      headlineMaxWidth: 340,
      eyebrowSize: 12,
      eyebrowWeight: 700,
      eyebrowTracking: 0.08,
      eyebrowUppercase: true,
      eyebrowStyle: "lime",
      bodySize: 14,
      bodyWeight: 500,
      bodyLineHeight: 1.5,
      bodyMaxWidth: 260,
    },
  },
  editorial: {
    label: "Clean Geist",
    config: {
      font: "geist",
      headlineSize: 36,
      headlineWeight: 700,
      headlineLineHeight: 1.05,
      headlineTracking: -0.03,
      headlineUppercase: false,
      headlineShadow: "none",
      headlineMaxWidth: 320,
      eyebrowSize: 11,
      eyebrowWeight: 600,
      eyebrowTracking: 0.08,
      eyebrowUppercase: true,
      eyebrowStyle: "pill",
      bodySize: 14,
      bodyWeight: 400,
      bodyLineHeight: 1.55,
      bodyMaxWidth: 250,
    },
  },
  poster: {
    label: "Condensed Poster",
    config: {
      font: "anton",
      headlineSize: 46,
      headlineWeight: 400,
      headlineLineHeight: 0.96,
      headlineTracking: 0.01,
      headlineUppercase: true,
      headlineShadow: "soft",
      headlineMaxWidth: 360,
      eyebrowSize: 12,
      eyebrowWeight: 700,
      eyebrowTracking: 0.1,
      eyebrowUppercase: true,
      eyebrowStyle: "purple",
      bodySize: 14,
      bodyWeight: 400,
      bodyLineHeight: 1.55,
      bodyMaxWidth: 240,
    },
  },
};

const BANNERS = [
  {
    id: "1",
    eyebrow: "Welcome bonus",
    headline: "100% up to $1,000",
    description: "Start your journey with a massive welcome bonus on your first deposit",
    cta: "Claim Bonus",
    video: "/videos/alchemist-midas-brew.mp4",
    poster: "/videos/alchemist-midas-brew-poster.jpg",
  },
  {
    id: "2",
    eyebrow: "Elixir Originals",
    headline: "Pick your potion",
    description: "Crash, Plinko, Mines and more. Eight exclusive ways to play.",
    cta: "Play Now",
    video: "/videos/alchemist-potion-wand-mini.mp4",
    poster: "/videos/alchemist-potion-wand-mini-poster.jpg",
  },
];

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-medium text-purple-100">{label}</span>
        <span className="font-mono tabular-nums text-purple-300">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#39ff14]"
      />
    </label>
  );
}

export default function HeroTypographyLab() {
  const [config, setConfig] = useState<HeroTypoConfig>(PRESETS.current.config);
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof HeroTypoConfig>(key: K, value: HeroTypoConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const fontMap: Record<FontChoice, string> = {
    montserrat: "var(--font-hero), sans-serif",
    geist: "var(--font-geist-sans), sans-serif",
    space: "var(--font-lab-space), sans-serif",
    archivo: "var(--font-lab-archivo), sans-serif",
    anton: "var(--font-lab-anton), sans-serif",
  };

  const shadowMap: Record<ShadowStyle, string> = {
    current: "0 3px 0 rgba(20, 13, 36, 0.45)",
    none: "none",
    soft: "0 4px 16px rgba(10, 2, 20, 0.65)",
  };

  const cssOutput = `/* Eyebrow */
font-size: ${config.eyebrowSize}px;
font-weight: ${config.eyebrowWeight};
letter-spacing: ${config.eyebrowTracking}em;${config.eyebrowUppercase ? "\ntext-transform: uppercase;" : ""}

/* Headline */
font-family: ${fontMap[config.font]};
font-size: ${config.headlineSize}px;
font-weight: ${config.headlineWeight};
line-height: ${config.headlineLineHeight};
letter-spacing: ${config.headlineTracking}em;${config.headlineUppercase ? "\ntext-transform: uppercase;" : ""}
text-shadow: ${shadowMap[config.headlineShadow]};
max-width: ${config.headlineMaxWidth}px;

/* Description */
font-size: ${config.bodySize}px;
font-weight: ${config.bodyWeight};
line-height: ${config.bodyLineHeight};
max-width: ${config.bodyMaxWidth}px;`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard unavailable */
    }
  };

  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
          ← Back to casino
        </Link>
        <p className="ui-eyebrow mt-5">Elixir design lab · hero banners</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Hero Banners Typography Lab
        </h1>
        <p className="ui-body mt-2 max-w-2xl">
          Edit font family, size, thickness, spacing, case, shadow, and wrap width across both hero banners in real time. Hover either banner to preview the video.
        </p>

        {/* Live Hero Pair Preview */}
        <section className="mt-7 grid gap-4 xl:grid-cols-2">
          {BANNERS.map((banner) => (
            <div
              key={banner.id}
              onPointerEnter={(event) => {
                if (event.pointerType === "touch") return;
                const card = event.currentTarget;
                const video = card.querySelector("video");
                video?.play().then(() => {
                  if (!card.matches(":hover")) video.pause();
                }).catch(() => {});
              }}
              onPointerLeave={(event) => {
                event.currentTarget.querySelector("video")?.pause();
              }}
              className="relative min-h-[240px] overflow-hidden rounded-2xl bg-dicey-card"
            >
              <div className="relative z-10 flex h-full flex-col items-start px-6 py-7 sm:p-8">
                <p
                  className={cn(
                    "mb-3",
                    config.eyebrowUppercase && "uppercase",
                    config.eyebrowStyle === "purple" && "text-purple-300",
                    config.eyebrowStyle === "lime" && "text-[#39ff14]",
                    config.eyebrowStyle === "white" && "text-white/80",
                    config.eyebrowStyle === "pill" &&
                      "rounded-full border border-purple-300/25 bg-purple-400/15 px-2.5 py-0.5 text-purple-200"
                  )}
                  style={{
                    fontSize: `${config.eyebrowSize}px`,
                    fontWeight: config.eyebrowWeight,
                    letterSpacing: `${config.eyebrowTracking}em`,
                  }}
                >
                  {banner.eyebrow}
                </p>

                <h2
                  className={cn("mb-3 text-white text-balance", config.headlineUppercase && "uppercase")}
                  style={{
                    fontFamily: fontMap[config.font],
                    fontSize: `${config.headlineSize}px`,
                    fontWeight: config.headlineWeight,
                    lineHeight: config.headlineLineHeight,
                    letterSpacing: `${config.headlineTracking}em`,
                    textShadow: shadowMap[config.headlineShadow],
                    maxWidth: `${config.headlineMaxWidth}px`,
                  }}
                >
                  {banner.headline}
                </h2>

                <p
                  className="mb-5 text-[var(--text-secondary)] text-pretty"
                  style={{
                    fontSize: `${config.bodySize}px`,
                    fontWeight: config.bodyWeight,
                    lineHeight: config.bodyLineHeight,
                    maxWidth: `${config.bodyMaxWidth}px`,
                  }}
                >
                  {banner.description}
                </p>

                <div className="mt-auto">
                  <PrimaryButton>{banner.cta}</PrimaryButton>
                </div>
              </div>

              <div
                className="pointer-events-none absolute inset-0 z-[1] opacity-80"
                aria-hidden="true"
                style={{
                  maskImage: "linear-gradient(to right, transparent 15%, rgba(0, 0, 0, 0.12) 48%, black 95%)",
                  WebkitMaskImage: "linear-gradient(to right, transparent 15%, rgba(0, 0, 0, 0.12) 48%, black 95%)",
                }}
              >
                <img
                  src={banner.poster}
                  alt=""
                  className="hidden h-full w-full object-cover object-right motion-reduce:block"
                />
                <video
                  src={banner.video}
                  poster={banner.poster}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover object-right motion-reduce:hidden"
                />
              </div>
            </div>
          ))}
        </section>

        {/* Controls Grid */}
        <section className="mt-7 grid gap-6 lg:grid-cols-4">
          {/* Presets & Font */}
          <div className="space-y-4 rounded-3xl border border-white/10 bg-[#1b0f2c] p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">Presets</p>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {Object.entries(PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setConfig(preset.config)}
                    className="rounded-xl border border-white/10 bg-dicey-dark px-3 py-2 text-left text-xs font-medium text-purple-100 transition-colors hover:border-purple-400/50 hover:bg-white/5"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-300">Headline Font</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(
                  [
                    ["montserrat", "Montserrat"],
                    ["geist", "Geist Sans"],
                    ["space", "Space Grotesk"],
                    ["archivo", "Archivo Black"],
                    ["anton", "Anton"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => update("font", id)}
                    className={cn(
                      "rounded-xl border px-2.5 py-2 text-xs font-semibold transition-colors",
                      config.font === id
                        ? "border-[#39ff14]/60 bg-[#39ff14]/10 text-white"
                        : "border-white/10 bg-dicey-dark text-gray-300 hover:border-white/25"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Headline Sliders */}
          <div className="space-y-3.5 rounded-3xl border border-white/10 bg-[#1b0f2c] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">Headline</p>
              <label className="flex cursor-pointer items-center gap-1.5 text-xs text-purple-200">
                <input
                  type="checkbox"
                  checked={config.headlineUppercase}
                  onChange={(e) => update("headlineUppercase", e.target.checked)}
                  className="accent-[#39ff14]"
                />
                ALL CAPS
              </label>
            </div>
            <Slider label="Size" value={config.headlineSize} display={`${config.headlineSize}px`} min={24} max={56} step={1} onChange={(v) => update("headlineSize", v)} />
            <Slider label="Thickness (Weight)" value={config.headlineWeight} display={`${config.headlineWeight}`} min={300} max={900} step={50} onChange={(v) => update("headlineWeight", v)} />
            <Slider label="Line Height" value={config.headlineLineHeight} display={config.headlineLineHeight.toFixed(2)} min={0.88} max={1.3} step={0.02} onChange={(v) => update("headlineLineHeight", v)} />
            <Slider label="Letter Spacing" value={config.headlineTracking} display={`${config.headlineTracking.toFixed(3)}em`} min={-0.06} max={0.06} step={0.005} onChange={(v) => update("headlineTracking", v)} />
            <Slider label="Max Width" value={config.headlineMaxWidth} display={`${config.headlineMaxWidth}px`} min={200} max={460} step={10} onChange={(v) => update("headlineMaxWidth", v)} />
            <div>
              <p className="mb-1.5 text-xs font-medium text-purple-100">Shadow</p>
              <div className="grid grid-cols-3 gap-1.5">
                {(
                  [
                    ["current", "Hard"],
                    ["soft", "Soft"],
                    ["none", "None"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => update("headlineShadow", id)}
                    className={cn(
                      "rounded-lg border py-1.5 text-xs font-semibold",
                      config.headlineShadow === id
                        ? "border-[#39ff14]/60 bg-[#39ff14]/10 text-white"
                        : "border-white/10 bg-dicey-dark text-gray-300"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Eyebrow & Description */}
          <div className="space-y-3.5 rounded-3xl border border-white/10 bg-[#1b0f2c] p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">Eyebrow</p>
              <label className="flex cursor-pointer items-center gap-1.5 text-xs text-purple-200">
                <input
                  type="checkbox"
                  checked={config.eyebrowUppercase}
                  onChange={(e) => update("eyebrowUppercase", e.target.checked)}
                  className="accent-[#39ff14]"
                />
                CAPS
              </label>
            </div>
            <Slider label="Eyebrow Size" value={config.eyebrowSize} display={`${config.eyebrowSize}px`} min={10} max={16} step={1} onChange={(v) => update("eyebrowSize", v)} />
            <Slider label="Eyebrow Weight" value={config.eyebrowWeight} display={`${config.eyebrowWeight}`} min={400} max={800} step={100} onChange={(v) => update("eyebrowWeight", v)} />
            <Slider label="Eyebrow Tracking" value={config.eyebrowTracking} display={`${config.eyebrowTracking.toFixed(2)}em`} min={0} max={0.14} step={0.01} onChange={(v) => update("eyebrowTracking", v)} />
            <div className="grid grid-cols-4 gap-1.5">
              {(
                [
                  ["purple", "Purple"],
                  ["lime", "Lime"],
                  ["white", "White"],
                  ["pill", "Pill"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => update("eyebrowStyle", id)}
                  className={cn(
                    "rounded-lg border py-1 text-[11px] font-semibold",
                    config.eyebrowStyle === id
                      ? "border-[#39ff14]/60 bg-[#39ff14]/10 text-white"
                      : "border-white/10 bg-dicey-dark text-gray-300"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="h-px bg-white/10" />

            <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">Description</p>
            <Slider label="Body Size" value={config.bodySize} display={`${config.bodySize}px`} min={12} max={18} step={1} onChange={(v) => update("bodySize", v)} />
            <Slider label="Body Weight" value={config.bodyWeight} display={`${config.bodyWeight}`} min={300} max={600} step={100} onChange={(v) => update("bodyWeight", v)} />
            <Slider label="Body Line Height" value={config.bodyLineHeight} display={config.bodyLineHeight.toFixed(2)} min={1.25} max={1.85} step={0.05} onChange={(v) => update("bodyLineHeight", v)} />
            <Slider label="Body Max Width" value={config.bodyMaxWidth} display={`${config.bodyMaxWidth}px`} min={180} max={360} step={10} onChange={(v) => update("bodyMaxWidth", v)} />
          </div>

          {/* CSS Export */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#1b0f2c] p-5">
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">CSS Output</p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white hover:bg-white/20"
                >
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-xl bg-dicey-dark p-3 font-mono text-[11px] leading-relaxed text-purple-200">
                {cssOutput}
              </pre>
            </div>
            <p className="mt-4 text-xs text-purple-300/70">
              Dial in the look you like, click <strong>Copy CSS</strong>, and paste it here when you&apos;re ready to save it to the homepage heroes.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
