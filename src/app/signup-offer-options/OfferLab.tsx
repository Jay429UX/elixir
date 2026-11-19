"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FontChoice = "montserrat" | "geist";

interface OfferConfig {
  font: FontChoice;
  headlineSize: number;
  headlineWeight: number;
  headlineLineHeight: number;
  headlineTracking: number;
  eyebrowSize: number;
  eyebrowWeight: number;
  eyebrowUppercase: boolean;
  subtitleSize: number;
  subtitleWeight: number;
  scrimOpacity: number;
}

const PRESETS: Record<string, { label: string; config: OfferConfig }> = {
  refined: {
    label: "Saved (Current)",
    config: {
      font: "montserrat",
      headlineSize: 48,
      headlineWeight: 900,
      headlineLineHeight: 0.96,
      headlineTracking: -0.045,
      eyebrowSize: 13,
      eyebrowWeight: 700,
      eyebrowUppercase: false,
      subtitleSize: 16,
      subtitleWeight: 500,
      scrimOpacity: 95,
    },
  },
  original: {
    label: "Original",
    config: {
      font: "montserrat",
      headlineSize: 36,
      headlineWeight: 900,
      headlineLineHeight: 1.0,
      headlineTracking: -0.015,
      eyebrowSize: 11,
      eyebrowWeight: 600,
      eyebrowUppercase: false,
      subtitleSize: 14,
      subtitleWeight: 400,
      scrimOpacity: 95,
    },
  },
  editorial: {
    label: "Clean & Crisp",
    config: {
      font: "geist",
      headlineSize: 30,
      headlineWeight: 700,
      headlineLineHeight: 1.1,
      headlineTracking: -0.025,
      eyebrowSize: 12,
      eyebrowWeight: 600,
      eyebrowUppercase: true,
      subtitleSize: 14,
      subtitleWeight: 400,
      scrimOpacity: 90,
    },
  },
  poster: {
    label: "Heavy Poster",
    config: {
      font: "montserrat",
      headlineSize: 38,
      headlineWeight: 900,
      headlineLineHeight: 1.02,
      headlineTracking: -0.03,
      eyebrowSize: 12,
      eyebrowWeight: 700,
      eyebrowUppercase: true,
      subtitleSize: 15,
      subtitleWeight: 500,
      scrimOpacity: 100,
    },
  },
};

function SliderRow({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (next: number) => void;
}) {
  return (
    <label className="block">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="font-medium text-purple-100">{label}</span>
        <span className="font-mono tabular-nums text-purple-300">{displayValue}</span>
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

export default function OfferLab() {
  const [config, setConfig] = useState<OfferConfig>(PRESETS.refined.config);
  const [viewMode, setViewMode] = useState<"modal" | "card">("modal");
  const [copied, setCopied] = useState(false);

  const update = <K extends keyof OfferConfig>(key: K, value: OfferConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const fontFamilyValue =
    config.font === "montserrat"
      ? "var(--font-hero), var(--font-geist-sans), sans-serif"
      : "var(--font-geist-sans), sans-serif";

  const cssSnippet = `/* Headline */
font-family: ${config.font === "montserrat" ? "var(--font-hero)" : "var(--font-geist-sans)"};
font-size: ${config.headlineSize}px;
font-weight: ${config.headlineWeight};
line-height: ${config.headlineLineHeight};
letter-spacing: ${config.headlineTracking}em;

/* Eyebrow */
font-size: ${config.eyebrowSize}px;
font-weight: ${config.eyebrowWeight};${config.eyebrowUppercase ? "\ntext-transform: uppercase;" : ""}

/* Subtitle */
font-size: ${config.subtitleSize}px;
font-weight: ${config.subtitleWeight};`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard unavailable */
    }
  };

  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
              ← Back to casino
            </Link>
            <p className="ui-eyebrow mt-5">Elixir design lab · sign-up offer</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Offer Message Size &amp; Thickness Lab
            </h1>
          </div>

          <div className="inline-flex rounded-xl border border-white/10 bg-dicey-dark p-1">
            {(
              [
                ["modal", "Full modal"],
                ["card", "Offer panel only"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setViewMode(id)}
                className={cn(
                  "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  viewMode === id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.2fr_380px]">
          {/* Live Preview */}
          <section className="rounded-3xl border border-white/10 bg-[#0d0718]/70 p-4 sm:p-6">
            <div
              className={cn(
                "ui-modal-panel mx-auto overflow-hidden",
                viewMode === "modal"
                  ? "grid w-full max-w-3xl md:grid-cols-[1fr_1.05fr]"
                  : "w-full max-w-sm"
              )}
            >
              {/* Left offer video panel */}
              <div className="relative h-56 overflow-hidden md:h-auto md:min-h-[500px]">
                <img
                  src="/videos/signup-new-poster.jpg"
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 hidden h-full w-full object-cover object-center motion-reduce:block"
                />
                <video
                  src="/videos/signup-new.mp4"
                  poster="/videos/signup-new-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(22, 4, 36, ${config.scrimOpacity / 100}) 0%, rgba(22, 4, 36, ${(config.scrimOpacity / 100) * 0.35}) 48%, transparent 100%)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <p
                    className={cn(
                      "text-purple-300",
                      config.eyebrowUppercase && "uppercase tracking-[0.08em]"
                    )}
                    style={{
                      fontSize: `${config.eyebrowSize}px`,
                      fontWeight: config.eyebrowWeight,
                    }}
                  >
                    Welcome bonus
                  </p>
                  <p
                    className="mt-1.5 text-white"
                    style={{
                      fontFamily: fontFamilyValue,
                      fontSize: `${config.headlineSize}px`,
                      fontWeight: config.headlineWeight,
                      lineHeight: config.headlineLineHeight,
                      letterSpacing: `${config.headlineTracking}em`,
                      textShadow: "0 2px 12px rgba(10, 2, 20, 0.55)",
                    }}
                  >
                    100% UP TO $1,000
                  </p>
                  <p
                    className="mt-2 text-purple-200/85"
                    style={{
                      fontSize: `${config.subtitleSize}px`,
                      fontWeight: config.subtitleWeight,
                    }}
                  >
                    On your first deposit.
                  </p>
                </div>
              </div>

              {/* Right form skeleton for context */}
              {viewMode === "modal" && (
                <div className="flex flex-col justify-between px-6 py-7 sm:px-8">
                  <div>
                    <div className="mb-6 inline-flex rounded-xl bg-dicey-dark p-1">
                      <span className="rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                        Sign up
                      </span>
                      <span className="px-4 py-2 text-sm font-semibold text-gray-400">
                        Sign in
                      </span>
                    </div>
                    <h2 className="hero-headline text-4xl leading-none text-white">Join Elixir</h2>
                    <p className="ui-body mt-3">Create your account to claim your welcome bonus.</p>
                    <div className="mt-6 space-y-3">
                      <div className="rounded-xl border border-white/10 bg-dicey-dark px-4 py-3 text-sm text-gray-500">
                        Email
                      </div>
                      <div className="rounded-xl border border-white/10 bg-dicey-dark px-4 py-3 text-sm text-gray-500">
                        Username
                      </div>
                      <div className="rounded-xl border border-white/10 bg-dicey-dark px-4 py-3 text-sm text-gray-500">
                        Password
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 rounded-xl bg-[#32cd32] py-3 text-center text-sm font-bold text-[#071a04]">
                    Create account
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Controls */}
          <aside className="space-y-5 rounded-3xl border border-white/10 bg-[#1b0f2c] p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Presets
              </p>
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {Object.entries(PRESETS).map(([id, preset]) => (
                  <button
                    key={id}
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
              <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-purple-300">
                Font Family
              </p>
              <div className="grid grid-cols-2 gap-2">
                {(
                  [
                    ["montserrat", "Montserrat"],
                    ["geist", "Geist Sans"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => update("font", id)}
                    className={cn(
                      "rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
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

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Headline (&ldquo;100% up to $1,000&rdquo;)
              </p>
              <SliderRow
                label="Size"
                value={config.headlineSize}
                displayValue={`${config.headlineSize}px`}
                min={20}
                max={48}
                step={1}
                onChange={(v) => update("headlineSize", v)}
              />
              <SliderRow
                label="Thickness (Weight)"
                value={config.headlineWeight}
                displayValue={`${config.headlineWeight}`}
                min={300}
                max={900}
                step={50}
                onChange={(v) => update("headlineWeight", v)}
              />
              <SliderRow
                label="Line Height"
                value={config.headlineLineHeight}
                displayValue={config.headlineLineHeight.toFixed(2)}
                min={0.92}
                max={1.4}
                step={0.02}
                onChange={(v) => update("headlineLineHeight", v)}
              />
              <SliderRow
                label="Letter Spacing"
                value={config.headlineTracking}
                displayValue={`${config.headlineTracking.toFixed(3)}em`}
                min={-0.05}
                max={0.05}
                step={0.005}
                onChange={(v) => update("headlineTracking", v)}
              />
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                  Eyebrow (&ldquo;Welcome bonus&rdquo;)
                </p>
                <label className="flex cursor-pointer items-center gap-1.5 text-xs text-purple-200">
                  <input
                    type="checkbox"
                    checked={config.eyebrowUppercase}
                    onChange={(e) => update("eyebrowUppercase", e.target.checked)}
                    className="accent-[#39ff14]"
                  />
                  Uppercase
                </label>
              </div>
              <SliderRow
                label="Size"
                value={config.eyebrowSize}
                displayValue={`${config.eyebrowSize}px`}
                min={10}
                max={18}
                step={1}
                onChange={(v) => update("eyebrowSize", v)}
              />
              <SliderRow
                label="Thickness (Weight)"
                value={config.eyebrowWeight}
                displayValue={`${config.eyebrowWeight}`}
                min={400}
                max={800}
                step={100}
                onChange={(v) => update("eyebrowWeight", v)}
              />
            </div>

            <div className="h-px bg-white/10" />

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                Subtitle &amp; Contrast
              </p>
              <SliderRow
                label="Subtitle Size"
                value={config.subtitleSize}
                displayValue={`${config.subtitleSize}px`}
                min={12}
                max={20}
                step={1}
                onChange={(v) => update("subtitleSize", v)}
              />
              <SliderRow
                label="Subtitle Thickness"
                value={config.subtitleWeight}
                displayValue={`${config.subtitleWeight}`}
                min={300}
                max={700}
                step={100}
                onChange={(v) => update("subtitleWeight", v)}
              />
              <SliderRow
                label="Bottom Scrim Opacity"
                value={config.scrimOpacity}
                displayValue={`${config.scrimOpacity}%`}
                min={30}
                max={100}
                step={5}
                onChange={(v) => update("scrimOpacity", v)}
              />
            </div>

            <div className="h-px bg-white/10" />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-purple-300">
                  CSS Output
                </p>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white hover:bg-white/20"
                >
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-xl bg-dicey-dark p-3 font-mono text-[11px] leading-relaxed text-purple-200">
                {cssSnippet}
              </pre>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
