"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BiCheck,
  BiCopy,
  BiDownload,
  BiGrid,
  BiLinkExternal,
  BiPlay,
  BiReset,
  BiSave,
} from "react-icons/bi";
import { cn } from "@/lib/utils";
import {
  VIP_TIERS,
  type HexArmorStyle,
  type HexCoreKind,
  type HexSpec,
  type HexTierPalette,
  type HexTopStyle,
  ProgressiveHexBadgeSvg,
  resolveProgressiveHexSpec,
} from "@/components/ui/ProgressiveHexBadge";

type AnimMode = "idle" | "entrance" | "static";
type BackdropMode = "dark" | "modal" | "card";
type PipSetting = 0 | 1 | 2 | 3 | 4 | 5;

const ROMAN = ["I", "II", "III", "IV", "V"] as const;

const WING_OPTIONS: Array<{ value: 0 | 2 | 3 | 4; label: string }> = [
  { value: 0, label: "None (0)" },
  { value: 2, label: "2 Blades" },
  { value: 3, label: "3 Blades" },
  { value: 4, label: "4 Blades" },
];

const ARMOR_OPTIONS: Array<{ value: HexArmorStyle; label: string }> = [
  { value: "bastion", label: "Bastion Chevrons" },
  { value: "cheek-prow", label: "Cheek Plates + Prow" },
  { value: "bastion-cheek", label: "Bastion + Cheeks" },
];

const TOP_OPTIONS: Array<{ value: HexTopStyle; label: string }> = [
  { value: "cap", label: "Armor Cap" },
  { value: "battlements", label: "Castle Battlements" },
  { value: "crown", label: "Royal Crown" },
  { value: "rays-3", label: "3-Ray Sunburst" },
  { value: "rays-5", label: "5-Ray Sunburst" },
];

const CORE_OPTIONS: Array<{ value: HexCoreKind; label: string }> = [
  { value: "crown-drop", label: "Crown + Elixir Drop" },
  { value: "flask", label: "Potion Vial" },
  { value: "diamond", label: "Elixir Diamond" },
  { value: "radial-matrix", label: "6-Facet Crystal" },
  { value: "keep-arch", label: "Castle Keep Arch" },
];

function buildInitialTiers(): HexTierPalette[] {
  return VIP_TIERS.map((t) => ({ ...t }));
}

function buildInitialSpecs(): HexSpec[] {
  return VIP_TIERS.map((t) => ({ ...resolveProgressiveHexSpec(t.level) }));
}

function parseRgba(input: string): { hex: string; alpha: number } {
  const m = input.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (!m) return { hex: "#e879f9", alpha: 0.55 };
  const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");
  return {
    hex: `#${toHex(Number(m[1]))}${toHex(Number(m[2]))}${toHex(Number(m[3]))}`,
    alpha: m[4] !== undefined ? Number(m[4]) : 1,
  };
}

function toRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean.padEnd(6, "0").slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
}

function backdropClass(mode: BackdropMode): string {
  if (mode === "modal") return "lu-gradient";
  if (mode === "card") return "bg-dicey-card-elevated";
  return "bg-dicey-darker";
}

function ColorSwatchField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commitIfValid = (raw: string) => {
    const trimmed = raw.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
      onChange(trimmed.toLowerCase());
      return true;
    }
    if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
      const expanded = `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toLowerCase();
      setDraft(expanded);
      onChange(expanded);
      return true;
    }
    return false;
  };

  return (
    <label className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-dicey-darker px-3 py-2 text-xs">
      <span className="truncate font-medium text-[#ded5eb]">{label}</span>
      <span className="flex shrink-0 items-center gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => {
            const v = e.target.value;
            if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
              setDraft(v);
              if (/^#[0-9a-fA-F]{6}$/.test(v)) {
                onChange(v.toLowerCase());
              }
            }
          }}
          onBlur={() => {
            if (!commitIfValid(draft)) setDraft(value);
          }}
          className="w-[70px] rounded border border-white/10 bg-dicey-dark px-1.5 py-0.5 font-mono text-[11px] text-white outline-none focus:border-[#39ff14]/60"
        />
        <input
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#ffffff"}
          onChange={(e) => onChange(e.target.value.toLowerCase())}
          className="h-6 w-7 cursor-pointer rounded border border-white/15 bg-transparent p-0"
        />
      </span>
    </label>
  );
}

export default function VipBadgeEditor() {
  const [savedTiers, setSavedTiers] = useState<HexTierPalette[]>(buildInitialTiers);
  const [savedSpecs, setSavedSpecs] = useState<HexSpec[]>(buildInitialSpecs);
  const [tiers, setTiers] = useState<HexTierPalette[]>(buildInitialTiers);
  const [specs, setSpecs] = useState<HexSpec[]>(buildInitialSpecs);
  const [selectedIdx, setSelectedIdx] = useState<number>(4);
  const [animMode, setAnimMode] = useState<AnimMode>("idle");
  const [replayKey, setReplayKey] = useState<number>(0);
  const [pips, setPips] = useState<PipSetting>(1);
  const [backdrop, setBackdrop] = useState<BackdropMode>("dark");
  const [showGuides, setShowGuides] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<null | "svg" | "json">(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  const heroStageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/vip-badges")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data?.tiers || !data?.specs) return;
        const nextTiers = (data.tiers as HexTierPalette[]).map((t) => ({ ...t }));
        const nextSpecs = nextTiers.map((t) => ({
          ...(data.specs[String(t.level)] as HexSpec),
        }));
        setSavedTiers(nextTiers.map((t) => ({ ...t })));
        setSavedSpecs(nextSpecs.map((s) => ({ ...s })));
        setTiers(nextTiers);
        setSpecs(nextSpecs);
      })
      .catch(() => {
        /* ignore if route unavailable */
      });
    return () => {
      active = false;
    };
  }, []);

  const selectedTier = tiers[selectedIdx];
  const selectedSpec = specs[selectedIdx];
  const resolvedLevel = pips === 0 ? undefined : (pips as 1 | 2 | 3 | 4 | 5);

  const animClass =
    animMode === "idle" ? "kb-mode-idle" : animMode === "entrance" ? "kb-mode-entrance" : "";

  const triggerEntrance = () => {
    setAnimMode("entrance");
    setReplayKey((k) => k + 1);
  };

  const updateTierColor = (field: keyof HexTierPalette, val: string) => {
    setSaveState("idle");
    setSaveError(null);
    setTiers((prev) => prev.map((t, i) => (i === selectedIdx ? { ...t, [field]: val } : t)));
  };

  const updateSpec = <K extends keyof HexSpec>(field: K, val: HexSpec[K]) => {
    setSaveState("idle");
    setSaveError(null);
    setSpecs((prev) => prev.map((s, i) => (i === selectedIdx ? { ...s, [field]: val } : s)));
  };

  const resetTier = (idx: number) => {
    setSaveState("idle");
    setSaveError(null);
    setTiers((prev) => prev.map((t, i) => (i === idx ? { ...savedTiers[idx] } : t)));
    setSpecs((prev) => prev.map((s, i) => (i === idx ? { ...savedSpecs[idx] } : s)));
  };

  const resetAll = () => {
    setSaveState("idle");
    setSaveError(null);
    setTiers(savedTiers.map((t) => ({ ...t })));
    setSpecs(savedSpecs.map((s) => ({ ...s })));
  };

  const isTierModified = (idx: number) =>
    JSON.stringify(tiers[idx]) !== JSON.stringify(savedTiers[idx]) ||
    JSON.stringify(specs[idx]) !== JSON.stringify(savedSpecs[idx]);

  const modifiedCount = tiers.filter((_, idx) => isTierModified(idx)).length;
  const hasUnsavedChanges = modifiedCount > 0;

  const handleSaveChanges = async () => {
    setSaveState("saving");
    setSaveError(null);
    const specsRecord: Record<string, HexSpec> = {};
    tiers.forEach((t, idx) => {
      specsRecord[String(t.level)] = specs[idx];
    });

    try {
      const res = await fetch("/api/vip-badges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tiers, specs: specsRecord }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSaveState("error");
        setSaveError(json?.error ?? "Unable to save badge changes.");
        return;
      }

      setSavedTiers(tiers.map((t) => ({ ...t })));
      setSavedSpecs(specs.map((s) => ({ ...s })));
      setSaveState("saved");
      setTimeout(() => setSaveState((curr) => (curr === "saved" ? "idle" : curr)), 2400);
    } catch {
      setSaveState("error");
      setSaveError("Network error while saving changes.");
    }
  };

  const getCleanSvgMarkup = (): string | null => {
    const svg = heroStageRef.current?.querySelector("svg");
    if (!svg) return null;
    const clone = svg.cloneNode(true) as SVGSVGElement;
    clone.setAttribute("width", "128");
    clone.setAttribute("height", "128");
    clone.removeAttribute("class");
    return clone.outerHTML;
  };

  const copyText = async (text: string, which: "svg" | "json") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(which);
      setTimeout(() => setCopiedKey((c) => (c === which ? null : c)), 1800);
    } catch {
      /* ignore clipboard refusal */
    }
  };

  const handleDownloadSvg = () => {
    const markup = getCleanSvgMarkup();
    if (!markup) return;
    const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `elixir-${selectedTier.name.toLowerCase()}-vip-badge.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const glowParsed = parseRgba(selectedTier.glow);

  return (
    <div className="min-h-screen bg-dicey-darker px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl space-y-7">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="ui-eyebrow uppercase tracking-[0.08em]">VIP BADGE WORKBENCH</p>
            <h1 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-white">
              Progressive Hex Ascension — Editor &amp; Showcase
            </h1>
            <p className="ui-body mt-1 max-w-2xl">
              Inspect all 5 tiers side-by-side at real UI scales, tweak geometry or palette colors live, and save changes directly to the live site.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={saveState === "saving" || (!hasUnsavedChanges && saveState !== "error")}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all",
                saveState === "saved"
                  ? "border border-[#39ff14]/60 bg-[#39ff14]/20 text-[#39ff14]"
                  : hasUnsavedChanges
                    ? "bg-[#39ff14] text-[#071a04] shadow-[0_0_20px_rgba(57,255,20,0.35)] hover:brightness-110"
                    : "cursor-not-allowed border border-white/10 bg-dicey-card text-gray-500"
              )}
            >
              {saveState === "saved" ? (
                <>
                  <BiCheck className="size-4" /> Saved to Site
                </>
              ) : saveState === "saving" ? (
                <>
                  <BiSave className="size-3.5 animate-pulse" /> Saving...
                </>
              ) : (
                <>
                  <BiSave className="size-3.5" /> Save Changes
                  {hasUnsavedChanges ? ` (${modifiedCount})` : ""}
                </>
              )}
            </button>
            <Link
              href="/vip-badge-animations"
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#39ff14]/35 bg-[#39ff14]/10 px-3.5 py-2 text-xs font-semibold text-[#9bff8a] transition-colors hover:border-[#39ff14]/65 hover:bg-[#39ff14]/20"
            >
              Motion Lab <BiLinkExternal className="size-3.5" />
            </Link>
            <Link
              href="/kingdom-badge-options"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-[#d8b4fe] transition-colors hover:border-white/25 hover:text-white"
            >
              Concept Gallery <BiLinkExternal className="size-3.5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-dicey-card-elevated"
            >
              Back to Casino <BiLinkExternal className="size-3.5" />
            </Link>
          </div>
        </div>

        {saveError && (
          <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-xs font-medium text-red-200">
            {saveError}
          </div>
        )}

        {/* Global Stage Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-dicey-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#b7a9ca]">Motion:</span>
            <div className="inline-flex rounded-xl bg-dicey-dark p-1">
              {(
                [
                  ["idle", "Idle Loop"],
                  ["entrance", "Rank-Up Entrance"],
                  ["static", "Static"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setAnimMode(id);
                    if (id === "entrance") setReplayKey((k) => k + 1);
                  }}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    animMode === id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={triggerEntrance}
              className="inline-flex items-center gap-1 rounded-xl border border-[#39ff14]/45 bg-[#39ff14]/15 px-3 py-1.5 text-xs font-bold text-[#39ff14] transition-colors hover:bg-[#39ff14] hover:text-[#071a04]"
            >
              <BiPlay className="size-4" /> Replay
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#b7a9ca]">Pips:</span>
            <div className="inline-flex rounded-xl bg-dicey-dark p-1">
              {([0, 1, 2, 3, 4, 5] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setPips(lvl)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                    pips === lvl ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {lvl === 0 ? "Off" : ROMAN[lvl - 1]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#b7a9ca]">Surface:</span>
            <div className="inline-flex rounded-xl bg-dicey-dark p-1">
              {(
                [
                  ["dark", "Dark UI"],
                  ["modal", "Modal Purple"],
                  ["card", "Card Surface"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setBackdrop(id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                    backdrop === id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowGuides((g) => !g)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-colors",
                showGuides
                  ? "border-[#39ff14]/50 bg-[#39ff14]/15 text-[#39ff14]"
                  : "border-white/10 bg-dicey-dark text-gray-300 hover:text-white"
              )}
            >
              <BiGrid className="size-3.5" /> Guides
            </button>

            <button
              type="button"
              onClick={resetAll}
              disabled={!hasUnsavedChanges}
              className={cn(
                "inline-flex items-center gap-1 rounded-xl border border-white/10 bg-dicey-dark px-3 py-1.5 text-xs font-semibold transition-colors",
                hasUnsavedChanges
                  ? "text-gray-300 hover:border-white/25 hover:text-white"
                  : "cursor-not-allowed text-gray-500"
              )}
            >
              <BiReset className="size-3.5" /> Revert Unsaved
            </button>
          </div>
        </div>

        {/* All 5 Tiers Overview Grid */}
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-bold uppercase tracking-[0.08em] text-[#b7a9ca]">
              All 5 Active VIP Tiers — Click Any Card to Edit Below
            </h2>
            <span className="text-xs text-[#b7a9ca]">Displayed at 104px + 44px, 28px, 22px, 18px</span>
          </div>

          <div
            key={`row-${replayKey}`}
            className={cn("kb-stage grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5", animClass)}
          >
            {tiers.map((tier, idx) => {
              const active = selectedIdx === idx;
              const modified = isTierModified(idx);
              return (
                <div
                  key={tier.name}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedIdx(idx);
                    }
                  }}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all outline-none",
                    active
                      ? "border-[#39ff14]/70 bg-dicey-card shadow-[0_0_0_1px_rgba(57,255,20,0.18)]"
                      : "border-white/10 bg-dicey-card hover:border-white/25"
                  )}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-[#39ff14]">0{idx + 1}</span>
                      <span className="text-sm font-bold text-white">{tier.name}</span>
                    </div>
                    {modified ? (
                      <span className="rounded-full bg-[#39ff14]/15 px-2 py-0.5 text-[10px] font-bold text-[#39ff14]">
                        Unsaved
                      </span>
                    ) : active ? (
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white">
                        Editing
                      </span>
                    ) : null}
                  </div>

                  {/* Hero + Multi-size Strip */}
                  <div
                    className={cn(
                      "flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 py-4",
                      backdropClass(backdrop)
                    )}
                  >
                    <ProgressiveHexBadgeSvg
                      tierIndex={idx}
                      tierOverride={tier}
                      specOverride={specs[idx]}
                      level={resolvedLevel}
                      alt={`${tier.name} hero`}
                      width={104}
                      height={104}
                      className="overflow-visible"
                    />
                    <div className="flex items-end gap-2">
                      {([44, 28, 22, 18] as const).map((sz) => (
                        <ProgressiveHexBadgeSvg
                          key={sz}
                          tierIndex={idx}
                          tierOverride={tier}
                          specOverride={specs[idx]}
                          level={resolvedLevel}
                          alt={`${tier.name} ${sz}px`}
                          width={sz}
                          height={sz}
                          className="overflow-visible"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Interactive Inspector + Live Tweaker */}
        <section className="grid gap-6 lg:grid-cols-[440px_1fr]">
          {/* Left: Macro Zoom + App Context Previews + Export */}
          <div className="min-w-0 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-dicey-card p-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  <p className="ui-eyebrow uppercase tracking-[0.08em]">ZOOMED INSPECTOR</p>
                  <h2 className="text-lg font-bold text-white">
                    {selectedTier.name} {resolvedLevel ? ROMAN[resolvedLevel - 1] : ""}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => resetTier(selectedIdx)}
                  className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-dicey-dark px-2.5 py-1.5 text-xs font-semibold text-gray-300 transition-colors hover:border-white/25 hover:text-white"
                >
                  <BiReset className="size-3.5" /> Reset {selectedTier.name}
                </button>
              </div>

              {/* Large Zoom Canvas */}
              <div
                ref={heroStageRef}
                key={`zoom-${selectedIdx}-${replayKey}`}
                className={cn(
                  "kb-stage relative flex h-60 items-center justify-center overflow-hidden rounded-xl border border-white/10",
                  backdropClass(backdrop),
                  animClass
                )}
              >
                {showGuides && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative size-[176px] border border-dashed border-[#39ff14]/45">
                      <div className="absolute inset-x-0 top-1/2 h-px bg-[#39ff14]/35" />
                      <div className="absolute inset-y-0 left-1/2 w-px bg-[#39ff14]/35" />
                      <div className="absolute inset-[22%] rounded-full border border-dotted border-white/25" />
                    </div>
                  </div>
                )}

                <ProgressiveHexBadgeSvg
                  tierIndex={selectedIdx}
                  tierOverride={selectedTier}
                  specOverride={selectedSpec}
                  level={resolvedLevel}
                  alt={`${selectedTier.name} zoomed preview`}
                  width={176}
                  height={176}
                  className="overflow-visible"
                />
              </div>

              {/* Export Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const markup = getCleanSvgMarkup();
                    if (markup) copyText(markup, "svg");
                  }}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-dicey-dark px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-dicey-card-elevated"
                >
                  {copiedKey === "svg" ? (
                    <>
                      <BiCheck className="size-4 text-[#39ff14]" /> Copied SVG
                    </>
                  ) : (
                    <>
                      <BiCopy className="size-3.5" /> Copy SVG
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-dicey-dark px-3 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-dicey-card-elevated"
                >
                  <BiDownload className="size-3.5" /> Download .svg
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copyText(JSON.stringify({ tiers, specs }, null, 2), "json")
                  }
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#39ff14]/40 bg-[#39ff14]/10 px-3 py-2 text-xs font-bold text-[#39ff14] transition-colors hover:bg-[#39ff14] hover:text-[#071a04]"
                >
                  {copiedKey === "json" ? (
                    <>
                      <BiCheck className="size-4" /> Copied Config
                    </>
                  ) : (
                    <>
                      <BiCopy className="size-3.5" /> Copy JSON Spec
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* In-Context UI Check for Selected Tier */}
            <div className="rounded-2xl border border-white/10 bg-dicey-card p-5 space-y-3">
              <p className="ui-eyebrow uppercase tracking-[0.08em]">LIVE IN-CONTEXT CHECK</p>

              {/* Header Pill */}
              <div
                key={`ctx-${selectedIdx}-${replayKey}`}
                className={cn("kb-stage space-y-3", animClass)}
              >
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-dicey-darker px-4 py-3">
                  <span className="text-[11px] font-semibold text-[#b7a9ca]">Header Pill (24px)</span>
                  <div className="inline-flex items-center gap-2 rounded-full bg-dicey-card-elevated px-3 py-1.5">
                    <ProgressiveHexBadgeSvg
                      tierIndex={selectedIdx}
                      tierOverride={selectedTier}
                      specOverride={selectedSpec}
                      level={resolvedLevel}
                      alt="Header pill badge"
                      width={24}
                      height={24}
                      className="overflow-visible"
                    />
                    <div className="h-1.5 w-14 overflow-hidden rounded-full bg-dicey-dark">
                      <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                    </div>
                  </div>
                </div>

                {/* Live Chat & Live Bets line */}
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-dicey-darker px-4 py-3">
                  <span className="text-[11px] font-semibold text-[#b7a9ca]">Chat / Bets (20px)</span>
                  <div className="flex items-center gap-1.5 rounded-lg bg-dicey-border px-2.5 py-1 text-xs">
                    <ProgressiveHexBadgeSvg
                      tierIndex={selectedIdx}
                      tierOverride={selectedTier}
                      specOverride={selectedSpec}
                      level={resolvedLevel}
                      alt="Chat badge"
                      width={20}
                      height={20}
                      className="overflow-visible"
                    />
                    <span className="font-semibold text-white">AlchemistKing</span>
                    <span className="font-bold text-[#ffd35a]">142.0x</span>
                  </div>
                </div>

                {/* Level Up Bonus Panel */}
                <div className="lu-gradient flex items-center gap-4 rounded-xl px-4 py-3.5">
                  <ProgressiveHexBadgeSvg
                    tierIndex={selectedIdx}
                    tierOverride={selectedTier}
                    specOverride={selectedSpec}
                    level={resolvedLevel}
                    alt="Modal preview"
                    width={72}
                    height={72}
                    className="shrink-0 overflow-visible"
                  />
                  <div>
                    <p className="font-[family-name:var(--font-hero)] text-base font-black uppercase text-white">
                      RANK UP!
                    </p>
                    <p className="text-xs text-[#ded5eb]">
                      Unlocked {selectedTier.name} {resolvedLevel ? ROMAN[resolvedLevel - 1] : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Structure + Palette Tweaker */}
          <div className="min-w-0 space-y-5 rounded-2xl border border-white/10 bg-dicey-card p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <p className="ui-eyebrow uppercase tracking-[0.08em]">SHAPE &amp; PALETTE CONTROLS</p>
                <h2 className="text-lg font-bold text-white">Editing Tier: {selectedTier.name}</h2>
              </div>
              <div className="flex w-full flex-wrap gap-1 rounded-xl bg-dicey-dark p-1 sm:w-auto sm:flex-nowrap">
                {tiers.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setSelectedIdx(i)}
                    className={cn(
                      "flex-1 sm:flex-initial whitespace-nowrap rounded-lg px-2.5 py-1 text-center text-xs font-semibold transition-colors",
                      selectedIdx === i ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Geometry Selectors */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#b7a9ca]">Wing Blades</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {WING_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateSpec("wings", opt.value)}
                      className={cn(
                        "rounded-xl border px-2.5 py-2 text-xs font-semibold transition-colors",
                        selectedSpec.wings === opt.value
                          ? "border-[#39ff14]/60 bg-[#39ff14]/15 text-[#39ff14]"
                          : "border-white/10 bg-dicey-darker text-gray-300 hover:border-white/25 hover:text-white"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#b7a9ca]">Top Apex / Crown / Sunburst</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {TOP_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateSpec("top", opt.value)}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
                        selectedSpec.top === opt.value
                          ? "border-[#39ff14]/60 bg-[#39ff14]/15 text-[#39ff14]"
                          : "border-white/10 bg-dicey-darker text-gray-300 hover:border-white/25 hover:text-white"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-[#b7a9ca]">Center Emblem Core</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CORE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => updateSpec("core", opt.value)}
                      className={cn(
                        "rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
                        selectedSpec.core === opt.value
                          ? "border-[#39ff14]/60 bg-[#39ff14]/15 text-[#39ff14]"
                          : "border-white/10 bg-dicey-darker text-gray-300 hover:border-white/25 hover:text-white"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#b7a9ca]">Frame Armor Plates</span>
                  <div className="grid gap-1.5">
                    {ARMOR_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateSpec("armor", opt.value)}
                        className={cn(
                          "rounded-xl border px-3 py-1.5 text-left text-xs font-semibold transition-colors",
                          selectedSpec.armor === opt.value
                            ? "border-[#39ff14]/60 bg-[#39ff14]/15 text-[#39ff14]"
                            : "border-white/10 bg-dicey-darker text-gray-300 hover:border-white/25 hover:text-white"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#b7a9ca]">Accents &amp; Pip Position</span>
                  <div className="grid gap-1.5">
                    <button
                      type="button"
                      onClick={() => updateSpec("tails", !selectedSpec.tails)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
                        selectedSpec.tails
                          ? "border-[#39ff14]/60 bg-[#39ff14]/15 text-[#39ff14]"
                          : "border-white/10 bg-dicey-darker text-gray-300 hover:border-white/25 hover:text-white"
                      )}
                    >
                      <span>Bottom Tail Fins</span>
                      <span>{selectedSpec.tails ? "On" : "Off"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateSpec("onProw", !selectedSpec.onProw)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold transition-colors",
                        selectedSpec.onProw
                          ? "border-[#39ff14]/60 bg-[#39ff14]/15 text-[#39ff14]"
                          : "border-white/10 bg-dicey-darker text-gray-300 hover:border-white/25 hover:text-white"
                      )}
                    >
                      <span>Pip Anchor</span>
                      <span>{selectedSpec.onProw ? "On Bottom Prow" : "On Hex Bevel"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Palette Controls */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.06em] text-[#b7a9ca]">
                  {selectedTier.name} Palette Colors
                </span>
                <span className="text-[11px] text-[#b7a9ca]">Changes update SVG live</span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <ColorSwatchField
                  label="Metal Light"
                  value={selectedTier.metalLight}
                  onChange={(v) => updateTierColor("metalLight", v)}
                />
                <ColorSwatchField
                  label="Metal Mid"
                  value={selectedTier.metalMid}
                  onChange={(v) => updateTierColor("metalMid", v)}
                />
                <ColorSwatchField
                  label="Metal Dark"
                  value={selectedTier.metalDark}
                  onChange={(v) => updateTierColor("metalDark", v)}
                />
                <ColorSwatchField
                  label="Inner Well Top"
                  value={selectedTier.wellLight}
                  onChange={(v) => updateTierColor("wellLight", v)}
                />
                <ColorSwatchField
                  label="Inner Well Bottom"
                  value={selectedTier.wellDark}
                  onChange={(v) => updateTierColor("wellDark", v)}
                />
                <ColorSwatchField
                  label="Elixir / Gem Bright"
                  value={selectedTier.elixirBright}
                  onChange={(v) => updateTierColor("elixirBright", v)}
                />
                <ColorSwatchField
                  label="Elixir / Gem Mid"
                  value={selectedTier.elixirMid}
                  onChange={(v) => updateTierColor("elixirMid", v)}
                />
                <ColorSwatchField
                  label="Elixir / Gem Deep"
                  value={selectedTier.elixirDeep}
                  onChange={(v) => updateTierColor("elixirDeep", v)}
                />
                <ColorSwatchField
                  label="Crown / Ray Light"
                  value={selectedTier.crownLight}
                  onChange={(v) => updateTierColor("crownLight", v)}
                />
                <ColorSwatchField
                  label="Crown / Ray Dark"
                  value={selectedTier.crownDark}
                  onChange={(v) => updateTierColor("crownDark", v)}
                />
              </div>

              {/* Glow Color + Opacity */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-dicey-darker px-3 py-2.5 text-xs">
                <span className="font-medium text-[#ded5eb]">Outer Aura Glow</span>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="color"
                    value={glowParsed.hex}
                    onChange={(e) => updateTierColor("glow", toRgba(e.target.value, glowParsed.alpha))}
                    className="h-6 w-7 cursor-pointer rounded border border-white/15 bg-transparent p-0"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#b7a9ca]">Strength</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={glowParsed.alpha}
                      onChange={(e) =>
                        updateTierColor("glow", toRgba(glowParsed.hex, Number(e.target.value)))
                      }
                      className="w-24 accent-[#39ff14]"
                    />
                    <span className="w-9 font-mono text-[11px] text-white">
                      {Math.round(glowParsed.alpha * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
