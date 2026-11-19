"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { BiCheck, BiLinkExternal, BiPlay, BiRefresh } from "react-icons/bi";
import { cn } from "@/lib/utils";
import {
  VIP_TIERS as TIERS,
  type HexTierPalette as TierPalette,
  type HexSpec,
  HexBadgeLayers,
  HexCoreClipShape,
  resolveProgressiveHexSpec,
} from "@/components/ui/ProgressiveHexBadge";

const ROMAN = ["I", "II", "III", "IV", "V"] as const;

type BadgeKind =
  | "flask"
  | "crown"
  | "castle"
  | "cauldron"
  | "chalice"
  | "progressive"
  | "scepter"
  | "seal"
  | "citadel"
  | "winged"
  | "banner"
  | "key"
  | "hex-bastion"
  | "hex-crystal"
  | "hex-sovereign"
  | "hex-citadel"
  | "hex-chalice"
  | "hex-progressive";
type BadgeSeries = "hex" | "rounded";
type AnimMode = "idle" | "entrance" | "static";
type SizeMode = "strip" | 24 | 36 | 64 | 104;

const BADGE_OPTIONS: Array<{
  id: BadgeKind;
  series: BadgeSeries;
  num: string;
  title: string;
  subtitle: string;
  notes: string;
}> = [
  {
    id: "hex-bastion",
    series: "hex",
    num: "13",
    title: "Bastion Crown Hex",
    subtitle: "3D chamfered hex frame + battlements + faceted crown & elixir crystal",
    notes: "Sharp 6-face light/shadow bevels and high-contrast corner chevrons hold razor clarity down to 20px.",
  },
  {
    id: "hex-crystal",
    series: "hex",
    num: "14",
    title: "Winged Elixir Heart",
    subtitle: "Tall cheek plates + 3-blade swept wings + living faceted elixir diamond",
    notes: "Swept metal wing blades and diagonal glass facet stripes blend classic RPG crests with living alchemy.",
  },
  {
    id: "hex-sovereign",
    series: "hex",
    num: "15",
    title: "Sovereign Crystal Sunburst",
    subtitle: "4-blade grand wings + 5-ray crown + radial 6-facet crystal elixir matrix",
    notes: "Full-bleed faceted crystal dome and sunburst crown spikes command instant top-tier prestige.",
  },
  {
    id: "hex-citadel",
    series: "hex",
    num: "16",
    title: "Armored Keep Hexagon",
    subtitle: "Chiseled castle tower + lancet elixir portal inside bastion corner armor",
    notes: "Translates medieval castle battlements into sharp chamfered geometry instead of soft rounded outlines.",
  },
  {
    id: "hex-chalice",
    series: "hex",
    num: "17",
    title: "Geometric Potion Vial Hex",
    subtitle: "Faceted hexagon alchemy bottle + crown stopper + swept corner wings",
    notes: "Keeps instant Elixir bottle recognition while upgrading the frame to crisp multi-plane metallic bevels.",
  },
  {
    id: "hex-progressive",
    series: "hex",
    num: "18",
    title: "Progressive Hex Ascension",
    subtitle: "Armor, wings & crystal evolve: Bastion → Vial → 2-Wing → 3-Wing → Sunburst",
    notes: "Channels the exact multi-tier shape progression — players unlock wings, crown rays, and crystal complexity per rank.",
  },
  {
    id: "flask",
    series: "rounded",
    num: "01",
    title: "Crowned Elixir Flask",
    subtitle: "Round alchemist bottle + bubbling brew + royal crown stopper",
    notes: "Reads effortlessly at 20px–24px thanks to the wide circular belly and high-contrast liquid meniscus.",
  },
  {
    id: "crown",
    series: "rounded",
    num: "02",
    title: "Sovereign King's Crown",
    subtitle: "3-peak royal crown over a dark crest with central Elixir drop",
    notes: "Bold 3-prong silhouette avoids thin filigree spikes so it stays razor-sharp in header pills.",
  },
  {
    id: "castle",
    series: "rounded",
    num: "03",
    title: "Castle Keep Crest",
    subtitle: "Crenellated 3-merlon battlement shield + glowing Elixir portal",
    notes: "Architectural silhouette creates instant kingdom recognition with an unmistakable glowing arched core.",
  },
  {
    id: "cauldron",
    series: "rounded",
    num: "04",
    title: "Alchemist's Royal Cauldron",
    subtitle: "Wide-lipped cauldron + neon brew meniscus + crown sigil",
    notes: "Heavy pot silhouette with side ring handles ties directly into the Alchemist King hero artwork.",
  },
  {
    id: "chalice",
    series: "rounded",
    num: "05",
    title: "The King's Chalice",
    subtitle: "Brimming royal goblet + floating crown + jeweled stem",
    notes: "Tall hourglass silhouette pairs naturally alongside tall rank numerals and trophy banners.",
  },
  {
    id: "progressive",
    series: "rounded",
    num: "06",
    title: "Progressive Kingdom Evolution",
    subtitle: "Silhouette evolves across ranks: Vial → Cauldron → Castle → Chalice → Crown",
    notes: "Players earn an entirely new kingdom artifact each tier rather than just a palette swap.",
  },
  {
    id: "scepter",
    series: "rounded",
    num: "07",
    title: "Royal Alchemist's Scepter",
    subtitle: "Crowned potion-orb staff head held by twin sculpted claw prongs",
    notes: "Direct nod to the Elixir King's wand — wide circular crystal core stays super bright even at 20px.",
  },
  {
    id: "seal",
    series: "rounded",
    num: "08",
    title: "Wax King's Seal",
    subtitle: "8-lobe royal decree medallion stamped with an elixir drop & crown",
    notes: "Chubby 8-scallop outline resists subpixel blur while framing a high-contrast dark inner stamp.",
  },
  {
    id: "citadel",
    series: "rounded",
    num: "09",
    title: "Twin-Tower Citadel Gate",
    subtitle: "Spired fortress keep flanking a glowing central elixir courtyard arch",
    notes: "Wider silhouette than the single keep tower; twin gold spires telegraph prestige rank in chat.",
  },
  {
    id: "winged",
    series: "rounded",
    num: "10",
    title: "Winged Elixir Shield",
    subtitle: "Heraldic kite shield with animated wings, faceted potion core & crown",
    notes: "Classic competitive crest silhouette with layered wing-spread entrance and subtle idle breathing.",
  },
  {
    id: "banner",
    series: "rounded",
    num: "11",
    title: "King's Royal Pennant",
    subtitle: "Gonfalon war banner suspended from a crowned spear crossbar",
    notes: "Unfurls vertically on rank-up and sways gently in idle — pairs naturally with profile headers.",
  },
  {
    id: "key",
    series: "rounded",
    num: "12",
    title: "The King's Vault Key",
    subtitle: "Crowned treasury key framing a living elixir orb + dual teeth",
    notes: "Bridges castle heraldry and high-roller VIP vault perks with an unmistakable key silhouette.",
  },
];

function LevelPips({ count, elixirBright, metalDark }: { count: number; elixirBright: string; metalDark: string }) {
  const total = 5;
  const startX = 20;
  const spacing = 6;
  return (
    <g className="kb-pips">
      <rect
        x="15"
        y="53"
        width="34"
        height="8"
        rx="4"
        fill="#120920"
        stroke={metalDark}
        strokeWidth="1.4"
      />
      {Array.from({ length: total }, (_, idx) => {
        const active = idx < count;
        return (
          <circle
            key={idx}
            cx={startX + idx * spacing}
            cy="57"
            r={active ? 2 : 1.5}
            fill={active ? elixirBright : "#3b2759"}
          />
        );
      })}
    </g>
  );
}

function resolveHexSpec(kind: BadgeKind, tierLevel: 1 | 2 | 3 | 4 | 5): HexSpec {
  switch (kind) {
    case "hex-bastion":
      return { wings: 0, armor: "bastion", top: "battlements", tails: false, core: "crown-drop", onProw: false };
    case "hex-crystal":
      return { wings: 3, armor: "cheek-prow", top: "crown", tails: false, core: "diamond", onProw: true };
    case "hex-sovereign":
      return { wings: 4, armor: "cheek-prow", top: "rays-5", tails: true, core: "radial-matrix", onProw: true };
    case "hex-citadel":
      return { wings: 2, armor: "bastion-cheek", top: "battlements", tails: false, core: "keep-arch", onProw: false };
    case "hex-chalice":
      return { wings: 2, armor: "cheek-prow", top: "crown", tails: false, core: "flask", onProw: true };
    case "hex-progressive":
    default:
      return resolveProgressiveHexSpec(tierLevel);
  }
}

function ThemedBadgeSvg({
  kind,
  tier,
  level,
  size = 64,
}: {
  kind: BadgeKind;
  tier: TierPalette;
  level: 1 | 2 | 3 | 4 | 5;
  size?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const isHex = kind.startsWith("hex-");
  const hexSpec = isHex ? resolveHexSpec(kind, tier.level) : null;

  const effectiveKind: Exclude<BadgeKind, "progressive"> =
    kind === "progressive"
      ? (["flask", "cauldron", "castle", "chalice", "crown"] as const)[tier.level - 1]
      : kind;

  const gradMetal = `m-${uid}`;
  const gradBevelLight = `bl-${uid}`;
  const gradBevelDark = `bd-${uid}`;
  const gradWell = `w-${uid}`;
  const gradElixir = `e-${uid}`;
  const gradCrown = `c-${uid}`;
  const clipLiquid = `cl-${uid}`;
  const clipHexWell = `chw-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${tier.name} ${ROMAN[level - 1]} ${effectiveKind} badge`}
      style={{ filter: `drop-shadow(0 4px 10px ${tier.glow})` }}
    >
      <defs>
        <linearGradient id={gradMetal} x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalLight} />
          <stop offset="50%" stopColor={tier.metalMid} />
          <stop offset="100%" stopColor={tier.metalDark} />
        </linearGradient>
        <linearGradient id={gradBevelLight} x1="14" y1="12" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalLight} />
          <stop offset="100%" stopColor={tier.metalMid} />
        </linearGradient>
        <linearGradient id={gradBevelDark} x1="18" y1="18" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.metalMid} />
          <stop offset="100%" stopColor={tier.metalDark} />
        </linearGradient>
        <linearGradient id={gradWell} x1="32" y1="16" x2="32" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.wellLight} />
          <stop offset="100%" stopColor={tier.wellDark} />
        </linearGradient>
        <linearGradient id={gradElixir} x1="25" y1="24" x2="39" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.elixirBright} />
          <stop offset="50%" stopColor={tier.elixirMid} />
          <stop offset="100%" stopColor={tier.elixirDeep} />
        </linearGradient>
        <linearGradient id={gradCrown} x1="20" y1="4" x2="44" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tier.crownLight} />
          <stop offset="100%" stopColor={tier.crownDark} />
        </linearGradient>
        <clipPath id={clipHexWell}>
          <polygon points="32,16 45.8,24 45.8,40 32,48 18.2,40 18.2,24" />
        </clipPath>
        <clipPath id={clipLiquid}>
          {effectiveKind === "flask" && <circle cx="32" cy="36" r="14.5" />}
          {effectiveKind === "castle" && <path d="M25 50 V35 A7 7 0 0 1 39 35 V50 Z" />}
          {effectiveKind === "cauldron" && <path d="M16 28 H48 C49 41 42 50 32 50 C22 50 15 41 16 28 Z" />}
          {effectiveKind === "chalice" && <path d="M18 16 H46 C46 28 39 36 32 36 C25 36 18 28 18 16 Z" />}
          {effectiveKind === "crown" && <path d="M32 27 C32 27 38 35 38 40 A6 6 0 1 1 26 40 C26 35 32 27 32 27 Z" />}
          {effectiveKind === "scepter" && <circle cx="32" cy="28" r="11.5" />}
          {effectiveKind === "seal" && <path d="M32 18.5 C32 18.5 40 27 40 32.5 A8 8 0 1 1 24 32.5 C24 27 32 18.5 32 18.5 Z" />}
          {effectiveKind === "citadel" && <path d="M24.5 51 V36 A7.5 7.5 0 0 1 39.5 36 V51 Z" />}
          {effectiveKind === "winged" && <path d="M23 18 H41 V31.5 C41 39 32 46 32 46 C32 46 23 39 23 31.5 Z" />}
          {effectiveKind === "banner" && <path d="M32 20.5 C32 20.5 40 29 40 35 A8 8 0 1 1 24 35 C24 29 32 20.5 32 20.5 Z" />}
          {effectiveKind === "key" && <circle cx="30" cy="22" r="7.5" />}
          {hexSpec && <HexCoreClipShape core={hexSpec.core} />}
        </clipPath>
      </defs>

      {hexSpec && (
        <HexBadgeLayers
          spec={hexSpec}
          tier={tier}
          level={level}
          gradBevelLight={gradBevelLight}
          gradBevelDark={gradBevelDark}
          gradWell={gradWell}
          gradElixir={gradElixir}
          gradCrown={gradCrown}
          clipLiquid={clipLiquid}
          clipHexWell={clipHexWell}
        />
      )}

      {/* ==================== 01: CROWNED ELIXIR FLASK ==================== */}
      {effectiveKind === "flask" && (
        <>
          <g className="kb-frame">
            {/* Neck & Flask Outer Rim */}
            <path
              d="M26 16 H38 V21.5 C45 24 49 30 49 36.5 A17 17 0 1 1 15 36.5 C15 30 19 24 26 21.5 Z"
              fill="#190e2b"
              stroke="#120920"
              strokeWidth="4"
            />
            <path
              d="M26 16 H38 V21.5 C45 24 49 30 49 36.5 A17 17 0 1 1 15 36.5 C15 30 19 24 26 21.5 Z"
              fill="#190e2b"
              stroke={`url(#${gradMetal})`}
              strokeWidth="2.8"
            />
            <rect x="24" y="14" width="16" height="4.5" rx="2.2" fill={`url(#${gradMetal})`} stroke="#120920" strokeWidth="1.5" />
          </g>

          <g clipPath={`url(#${clipLiquid})`} className="kb-core">
            <rect className="kb-liquid" x="12" y="32" width="40" height="24" rx="4" fill={`url(#${gradElixir})`} />
            <ellipse className="kb-liquid" cx="32" cy="32.5" rx="14" ry="2.6" fill={tier.elixirBright} opacity="0.85" />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="26" cy="41" r="2.2" fill="#ffffff" opacity="0.75" />
              <circle className="kb-b2" cx="35" cy="43" r="1.8" fill="#ffffff" opacity="0.8" />
              <circle className="kb-b3" cx="31" cy="36" r="1.4" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          {/* Specular glass reflection */}
          <path d="M22 30 A11 11 0 0 1 28 24" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />

          {/* Royal Crown Stopper */}
          <g className="kb-crown">
            <path
              d="M22 14 L20 6 L27 10 L32 4 L37 10 L44 6 L42 14 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="10.5" r="2" fill={tier.elixirBright} />
          </g>

          <rect className="kb-glint" x="24" y="16" width="8" height="36" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 02: SOVEREIGN KING'S CROWN ==================== */}
      {effectiveKind === "crown" && (
        <>
          <g className="kb-frame">
            <path
              d="M12 18 L52 18 L50 42 C49 48 40 53 32 55 C24 53 15 48 14 42 Z"
              fill="#190e2b"
              stroke="#120920"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M12 18 L52 18 L50 42 C49 48 40 53 32 55 C24 53 15 48 14 42 Z"
              fill="#190e2b"
              stroke={`url(#${gradMetal})`}
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
          </g>

          {/* Crown Top Peaks */}
          <g className="kb-crown">
            <path
              d="M11 22 L10 9 L22 16 L32 5 L42 16 L54 9 L53 22 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <circle cx="10" cy="8.5" r="2.2" fill={tier.crownLight} stroke="#120920" strokeWidth="1.2" />
            <circle cx="32" cy="4.5" r="2.6" fill={tier.elixirBright} stroke="#120920" strokeWidth="1.2" />
            <circle cx="54" cy="8.5" r="2.2" fill={tier.crownLight} stroke="#120920" strokeWidth="1.2" />
          </g>

          {/* Glowing Central Elixir Drop */}
          <g className="kb-core">
            <path
              d="M32 25 C32 25 40 34 40 40.5 A8 8 0 1 1 24 40.5 C24 34 32 25 32 25 Z"
              fill={`url(#${gradElixir})`}
              stroke="#120920"
              strokeWidth="2"
            />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="30" cy="41" r="1.6" fill="#ffffff" opacity="0.7" />
              <circle className="kb-b2" cx="34" cy="38" r="1.2" fill="#ffffff" opacity="0.85" />
            </g>
            <path d="M29 36 C28 38 28 41 29.5 42.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
          </g>

          {/* Side Crown Studs */}
          <circle cx="19" cy="34" r="2.4" fill={`url(#${gradMetal})`} />
          <circle cx="45" cy="34" r="2.4" fill={`url(#${gradMetal})`} />

          <rect className="kb-glint" x="24" y="12" width="8" height="40" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 03: CASTLE KEEP CREST ==================== */}
      {effectiveKind === "castle" && (
        <>
          <g className="kb-frame">
            <path
              d="M15 21 H49 V40 C49 48 41 53 32 55 C23 53 15 48 15 40 Z"
              fill="#190e2b"
              stroke="#120920"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M15 21 H49 V40 C49 48 41 53 32 55 C23 53 15 48 15 40 Z"
              fill="#190e2b"
              stroke={`url(#${gradMetal})`}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
          </g>

          {/* 3-Merlon Crenellated Battlements */}
          <g className="kb-top">
            <path
              d="M12 22 V10 H20 V15 H27 V8 H37 V15 H44 V10 H52 V22 Z"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            {/* Royal banner jewel in center spire */}
            <circle cx="32" cy="14" r="2.3" fill={tier.elixirBright} stroke="#120920" strokeWidth="1.2" />
          </g>

          {/* Glowing Arched Elixir Portal Gate */}
          <g className="kb-core">
            <path
              d="M24 50 V35 A8 8 0 0 1 40 35 V50 Z"
              fill="#120920"
              stroke={tier.metalLight}
              strokeWidth="1.8"
            />
            <g clipPath={`url(#${clipLiquid})`}>
              <rect className="kb-liquid" x="22" y="29" width="20" height="23" fill={`url(#${gradElixir})`} />
              <g className="kb-bubbles">
                <circle className="kb-b1" cx="29" cy="43" r="1.7" fill="#ffffff" opacity="0.75" />
                <circle className="kb-b2" cx="35" cy="40" r="1.4" fill="#ffffff" opacity="0.85" />
                <circle className="kb-b3" cx="32" cy="35" r="1.2" fill="#ffffff" opacity="0.9" />
              </g>
            </g>
          </g>

          <rect className="kb-glint" x="24" y="14" width="8" height="38" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 04: ALCHEMIST'S ROYAL CAULDRON ==================== */}
      {effectiveKind === "cauldron" && (
        <>
          <g className="kb-frame">
            {/* Side Handles */}
            <circle cx="13.5" cy="32" r="4" stroke={`url(#${gradMetal})`} strokeWidth="2.8" fill="none" />
            <circle cx="50.5" cy="32" r="4" stroke={`url(#${gradMetal})`} strokeWidth="2.8" fill="none" />
            {/* Cauldron Belly */}
            <path
              d="M15 24 H49 C50 40 43 51 32 52 C21 51 14 40 15 24 Z"
              fill="#190e2b"
              stroke="#120920"
              strokeWidth="4"
            />
            <path
              d="M15 24 H49 C50 40 43 51 32 52 C21 51 14 40 15 24 Z"
              fill="#190e2b"
              stroke={`url(#${gradMetal})`}
              strokeWidth="2.6"
            />
            {/* Rim */}
            <rect x="12" y="21" width="40" height="6" rx="3" fill={`url(#${gradMetal})`} stroke="#120920" strokeWidth="2.2" />
          </g>

          {/* Neon Brew Meniscus & Rising Bubbles */}
          <g className="kb-core">
            <ellipse className="kb-liquid" cx="32" cy="23.5" rx="15" ry="3.2" fill={tier.elixirMid} />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="25" cy="17" r="2.4" fill={tier.elixirBright} stroke="#120920" strokeWidth="1.2" />
              <circle className="kb-b2" cx="33" cy="13" r="3" fill={tier.elixirMid} stroke="#120920" strokeWidth="1.2" />
              <circle className="kb-b3" cx="40" cy="18" r="2" fill={tier.elixirBright} stroke="#120920" strokeWidth="1.2" />
            </g>
          </g>

          {/* Crown Sigil on Cauldron Belly */}
          <g className="kb-crown">
            <path
              d="M24 42 L22.5 34 L28 37.5 L32 32 L36 37.5 L41.5 34 L40 42 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="39" r="1.6" fill={tier.elixirBright} />
          </g>

          <rect className="kb-glint" x="24" y="22" width="8" height="28" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 05: THE KING'S CHALICE ==================== */}
      {effectiveKind === "chalice" && (
        <>
          <g className="kb-frame">
            {/* Base & Stem */}
            <path
              d="M21 52 H43 L36 45 V36 H28 V45 Z"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            {/* Cup Body */}
            <path
              d="M15 17 H49 C49 30 41 38 32 38 C23 38 15 30 15 17 Z"
              fill="#190e2b"
              stroke="#120920"
              strokeWidth="4"
            />
            <path
              d="M15 17 H49 C49 30 41 38 32 38 C23 38 15 30 15 17 Z"
              fill="#190e2b"
              stroke={`url(#${gradMetal})`}
              strokeWidth="2.6"
            />
            <rect x="13" y="15" width="38" height="4.5" rx="2.2" fill={`url(#${gradMetal})`} stroke="#120920" strokeWidth="1.8" />
          </g>

          {/* Elixir Fill inside Cup */}
          <g clipPath={`url(#${clipLiquid})`} className="kb-core">
            <rect className="kb-liquid" x="14" y="21" width="36" height="18" fill={`url(#${gradElixir})`} />
            <ellipse className="kb-liquid" cx="32" cy="21" rx="14" ry="2.2" fill={tier.elixirBright} />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="27" cy="27" r="1.8" fill="#ffffff" opacity="0.8" />
              <circle className="kb-b2" cx="36" cy="29" r="1.5" fill="#ffffff" opacity="0.85" />
              <circle className="kb-b3" cx="32" cy="24" r="1.2" fill="#ffffff" opacity="0.95" />
            </g>
          </g>

          {/* Stem Gem */}
          <circle cx="32" cy="42" r="2.6" fill={tier.elixirBright} stroke="#120920" strokeWidth="1.3" />

          {/* Floating Mini Crown */}
          <g className="kb-crown">
            <path
              d="M23 13 L21.5 6 L27.5 9.5 L32 4 L36.5 9.5 L42.5 6 L41 13 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>

          <rect className="kb-glint" x="24" y="14" width="8" height="24" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 07: ROYAL ALCHEMIST'S SCEPTER ==================== */}
      {effectiveKind === "scepter" && (
        <>
          <g className="kb-frame">
            <rect
              x="28"
              y="39"
              width="8"
              height="14"
              rx="2.5"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.4"
            />
            <rect
              x="21"
              y="37"
              width="22"
              height="5"
              rx="2.5"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.2"
            />
            <path
              d="M22 38 C16 33 17 22 23 19 L25 22.5 C21 25 21 31 25 36 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M42 38 C48 33 47 22 41 19 L39 22.5 C43 25 43 31 39 36 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="28" r="13.5" fill="#190e2b" stroke="#120920" strokeWidth="4" />
            <circle cx="32" cy="28" r="13.5" fill="#190e2b" stroke={`url(#${gradMetal})`} strokeWidth="2.4" />
          </g>

          <g clipPath={`url(#${clipLiquid})`} className="kb-core">
            <circle cx="32" cy="28" r="11.5" fill={tier.elixirDeep} opacity="0.45" />
            <rect className="kb-liquid" x="18" y="23" width="28" height="20" rx="3" fill={`url(#${gradElixir})`} />
            <ellipse className="kb-liquid" cx="32" cy="23.5" rx="11.5" ry="2.2" fill={tier.elixirBright} opacity="0.9" />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="28" cy="31" r="2" fill="#ffffff" opacity="0.8" />
              <circle className="kb-b2" cx="35" cy="33" r="1.6" fill="#ffffff" opacity="0.85" />
              <circle className="kb-b3" cx="32" cy="27" r="1.3" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          <path d="M24 23 A8.5 8.5 0 0 1 30 18.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

          <g className="kb-crown">
            <path
              d="M24 15.5 L22.5 8.5 L27.5 11.5 L32 5 L36.5 11.5 L41.5 8.5 L40 15.5 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="12" r="1.8" fill={tier.elixirBright} />
          </g>

          <rect className="kb-glint" x="24" y="15" width="8" height="28" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 08: WAX KING'S SEAL ==================== */}
      {effectiveKind === "seal" && (
        <>
          <g className="kb-frame">
            <path
              d="M24.7 10.4 Q32 3.5 39.3 10.4 Q49.3 10.7 49.6 20.7 Q56.5 28 49.6 35.3 Q49.3 45.3 39.3 45.6 Q32 52.5 24.7 45.6 Q14.7 45.3 14.4 35.3 Q7.5 28 14.4 20.7 Q14.7 10.7 24.7 10.4 Z"
              fill="#190e2b"
              stroke="#120920"
              strokeWidth="4.2"
            />
            <path
              d="M24.7 10.4 Q32 3.5 39.3 10.4 Q49.3 10.7 49.6 20.7 Q56.5 28 49.6 35.3 Q49.3 45.3 39.3 45.6 Q32 52.5 24.7 45.6 Q14.7 45.3 14.4 35.3 Q7.5 28 14.4 20.7 Q14.7 10.7 24.7 10.4 Z"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2"
            />
            <circle cx="32" cy="28" r="15.5" fill="#120920" stroke={tier.metalDark} strokeWidth="1.6" />
            <circle cx="32" cy="28" r="13.5" fill="#190e2b" stroke={tier.metalLight} strokeWidth="1" opacity="0.55" />
          </g>

          <g className="kb-core">
            <path
              d="M32 18.5 C32 18.5 40 27 40 32.5 A8 8 0 1 1 24 32.5 C24 27 32 18.5 32 18.5 Z"
              fill={tier.elixirDeep}
              stroke="#120920"
              strokeWidth="2.4"
            />
            <g clipPath={`url(#${clipLiquid})`}>
              <rect className="kb-liquid" x="21" y="25" width="22" height="19" fill={`url(#${gradElixir})`} />
              <ellipse className="kb-liquid" cx="32" cy="25.5" rx="7.5" ry="1.8" fill={tier.elixirBright} opacity="0.9" />
              <g className="kb-bubbles">
                <circle className="kb-b1" cx="29" cy="34" r="1.8" fill="#ffffff" opacity="0.8" />
                <circle className="kb-b2" cx="34" cy="35" r="1.4" fill="#ffffff" opacity="0.85" />
                <circle className="kb-b3" cx="32" cy="30" r="1.2" fill="#ffffff" opacity="0.9" />
              </g>
            </g>
            <path d="M27 32 A4.5 4.5 0 0 1 30 27" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
          </g>

          <g className="kb-crown">
            <path
              d="M26 18.5 L25 13.5 L28.5 15.2 L32 12 L35.5 15.2 L39 13.5 L38 18.5 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </g>

          <rect className="kb-glint" x="24" y="10" width="8" height="36" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 09: TWIN-TOWER CITADEL GATE ==================== */}
      {effectiveKind === "citadel" && (
        <>
          <g className="kb-frame">
            <path
              d="M21 24 H25 V21 H30 V24 H34 V21 H39 V24 H43 V51 H21 Z"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.6"
              strokeLinejoin="round"
            />
            <rect
              x="10"
              y="21"
              width="12"
              height="30"
              rx="1.5"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.8"
            />
            <rect
              x="42"
              y="21"
              width="12"
              height="30"
              rx="1.5"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.8"
            />
            <rect x="14.5" y="28" width="3" height="8" rx="1.5" fill={tier.elixirBright} stroke="#120920" strokeWidth="1.2" />
            <rect x="46.5" y="28" width="3" height="8" rx="1.5" fill={tier.elixirBright} stroke="#120920" strokeWidth="1.2" />
            <path d="M23.5 51 V36 A8.5 8.5 0 0 1 40.5 36 V51 Z" fill="#120920" stroke="#120920" strokeWidth="2.4" />
          </g>

          <g className="kb-top">
            <path
              d="M8.5 22 L16 8 L23.5 22 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <path
              d="M40.5 22 L48 8 L55.5 22 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
          </g>

          <g className="kb-crown">
            <path
              d="M26 17 L25 11 L29.5 13.5 L32 9 L34.5 13.5 L39 11 L38 17 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>

          <g clipPath={`url(#${clipLiquid})`} className="kb-core">
            <rect x="24" y="27" width="16" height="25" fill={tier.elixirDeep} opacity="0.55" />
            <rect className="kb-liquid" x="20" y="34" width="24" height="20" fill={`url(#${gradElixir})`} />
            <ellipse className="kb-liquid" cx="32" cy="34.5" rx="8" ry="2" fill={tier.elixirBright} opacity="0.9" />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="29" cy="43" r="1.8" fill="#ffffff" opacity="0.8" />
              <circle className="kb-b2" cx="35" cy="45" r="1.5" fill="#ffffff" opacity="0.85" />
              <circle className="kb-b3" cx="32" cy="39" r="1.3" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          <path d="M27 36 A5 5 0 0 1 32 31" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
          <rect className="kb-glint" x="24" y="24" width="8" height="26" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 10: WINGED ELIXIR SHIELD ==================== */}
      {effectiveKind === "winged" && (
        <>
          <g className="kb-wings">
            <path
              d="M22 22 L4 13 L8 21 L14 23 L7 26 L11 32 L17 32 L12 36 L18 40 L23 36 Z"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M42 22 L60 13 L56 21 L50 23 L57 26 L53 32 L47 32 L52 36 L46 40 L41 36 Z"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>

          <g className="kb-frame">
            <path
              d="M20 15 H44 V32 C44 42 32 50 32 50 C32 50 20 42 20 32 Z"
              fill="#190e2b"
              stroke="#120920"
              strokeWidth="4"
            />
            <path
              d="M20 15 H44 V32 C44 42 32 50 32 50 C32 50 20 42 20 32 Z"
              fill="#190e2b"
              stroke={`url(#${gradMetal})`}
              strokeWidth="2.6"
            />
          </g>

          <g clipPath={`url(#${clipLiquid})`} className="kb-core">
            <path
              d="M23 18 H41 V31.5 C41 39 32 46 32 46 C32 46 23 39 23 31.5 Z"
              fill={tier.elixirDeep}
              opacity="0.55"
            />
            <rect className="kb-liquid" x="18" y="25" width="28" height="24" rx="2" fill={`url(#${gradElixir})`} />
            <ellipse className="kb-liquid" cx="32" cy="25.5" rx="10" ry="2.2" fill={tier.elixirBright} opacity="0.9" />
            <path d="M32 21 L37 29 L32 37 L27 29 Z" fill="#ffffff" opacity="0.18" />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="28" cy="35" r="2" fill="#ffffff" opacity="0.8" />
              <circle className="kb-b2" cx="35" cy="37" r="1.6" fill="#ffffff" opacity="0.85" />
              <circle className="kb-b3" cx="32" cy="30" r="1.3" fill="#ffffff" opacity="0.9" />
            </g>
          </g>

          <g className="kb-crown">
            <path
              d="M24 15 L23 8 L28 11 L32 5 L36 11 L41 8 L40 15 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </g>

          <rect className="kb-glint" x="24" y="16" width="8" height="32" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* ==================== 11: KING'S ROYAL PENNANT ==================== */}
      {effectiveKind === "banner" && (
        <>
          <g className="kb-banner">
            <path
              d="M17 15 H47 V39 C47 45 39 48.5 32 51.5 C25 48.5 17 45 17 39 Z"
              fill="#190e2b"
              stroke="#120920"
              strokeWidth="4"
            />
            <path
              d="M17 15 H47 V39 C47 45 39 48.5 32 51.5 C25 48.5 17 45 17 39 Z"
              fill="#190e2b"
              stroke={`url(#${gradMetal})`}
              strokeWidth="2.6"
            />

            <g className="kb-core">
              <path
                d="M32 20.5 C32 20.5 40 29 40 35 A8 8 0 1 1 24 35 C24 29 32 20.5 32 20.5 Z"
                fill={tier.elixirDeep}
                stroke="#120920"
                strokeWidth="2.2"
              />
              <g clipPath={`url(#${clipLiquid})`}>
                <rect className="kb-liquid" x="21" y="27" width="22" height="19" fill={`url(#${gradElixir})`} />
                <ellipse className="kb-liquid" cx="32" cy="27.5" rx="7.5" ry="1.8" fill={tier.elixirBright} opacity="0.9" />
                <g className="kb-bubbles">
                  <circle className="kb-b1" cx="29" cy="36" r="1.8" fill="#ffffff" opacity="0.8" />
                  <circle className="kb-b2" cx="34" cy="38" r="1.4" fill="#ffffff" opacity="0.85" />
                  <circle className="kb-b3" cx="32" cy="32" r="1.2" fill="#ffffff" opacity="0.9" />
                </g>
              </g>
              <path d="M27.5 32.5 A4.5 4.5 0 0 1 30 27.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />
            </g>

            <rect className="kb-glint" x="24" y="18" width="8" height="30" fill="#ffffff" opacity="0" />
          </g>

          <g className="kb-frame">
            <rect
              x="13"
              y="12.5"
              width="38"
              height="4.5"
              rx="2.2"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.2"
            />
            <circle cx="13" cy="14.8" r="3.4" fill={`url(#${gradCrown})`} stroke="#120920" strokeWidth="2" />
            <circle cx="51" cy="14.8" r="3.4" fill={`url(#${gradCrown})`} stroke="#120920" strokeWidth="2" />
          </g>

          <g className="kb-crown">
            <path
              d="M25.5 13 L24 6.5 L28.5 9.5 L32 4 L35.5 9.5 L40 6.5 L38.5 13 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </g>
        </>
      )}

      {/* ==================== 12: THE KING'S VAULT KEY ==================== */}
      {effectiveKind === "key" && (
        <>
          <g className="kb-frame">
            <rect
              x="26"
              y="34"
              width="8"
              height="17"
              rx="2"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.4"
            />
            <rect
              x="33"
              y="38.5"
              width="10"
              height="4.5"
              rx="1.4"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.2"
            />
            <rect
              x="33"
              y="45"
              width="13"
              height="4.8"
              rx="1.4"
              fill={`url(#${gradMetal})`}
              stroke="#120920"
              strokeWidth="2.2"
            />
            <rect
              x="23.5"
              y="32"
              width="13"
              height="4.5"
              rx="2"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2"
            />
            <circle cx="30" cy="22" r="12" fill="#190e2b" stroke="#120920" strokeWidth="4" />
            <circle cx="30" cy="22" r="12" fill="#190e2b" stroke={`url(#${gradMetal})`} strokeWidth="2.6" />
            <circle cx="30" cy="22" r="8" fill="#120920" />
          </g>

          <g clipPath={`url(#${clipLiquid})`} className="kb-core">
            <circle cx="30" cy="22" r="7.5" fill={tier.elixirDeep} opacity="0.55" />
            <rect className="kb-liquid" x="20" y="19" width="20" height="14" fill={`url(#${gradElixir})`} />
            <ellipse className="kb-liquid" cx="30" cy="19.5" rx="7" ry="1.8" fill={tier.elixirBright} opacity="0.9" />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="28" cy="24" r="1.6" fill="#ffffff" opacity="0.8" />
              <circle className="kb-b2" cx="32" cy="23" r="1.3" fill="#ffffff" opacity="0.88" />
            </g>
          </g>

          <path d="M25 19.5 A5.5 5.5 0 0 1 29.5 16" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

          <g className="kb-crown">
            <path
              d="M23 11.5 L21.5 5.5 L26.5 8 L30 3.5 L33.5 8 L38.5 5.5 L37 11.5 Z"
              fill={`url(#${gradCrown})`}
              stroke="#120920"
              strokeWidth="2.1"
              strokeLinejoin="round"
            />
          </g>

          <rect className="kb-glint" x="23" y="13" width="7" height="36" fill="#ffffff" opacity="0" />
        </>
      )}

      {/* Sub-level Pips (rounded series; hex series integrates diamond pips on the bevel/prow) */}
      {!isHex && <LevelPips count={level} elixirBright={tier.elixirBright} metalDark={tier.metalDark} />}
    </svg>
  );
}

export default function KingdomBadgeGallery() {
  const [animMode, setAnimMode] = useState<AnimMode>("idle");
  const [replayKey, setReplayKey] = useState(0);
  const [level, setLevel] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [sizeMode, setSizeMode] = useState<SizeMode>("strip");
  const [selectedOption, setSelectedOption] = useState<BadgeKind>("hex-progressive");
  const [previewTierIdx, setPreviewTierIdx] = useState(4);

  const animClass =
    animMode === "idle"
      ? "kb-mode-idle"
      : animMode === "entrance"
        ? "kb-mode-entrance"
        : "";

  const triggerEntrance = () => {
    setAnimMode("entrance");
    setReplayKey((k) => k + 1);
  };

  const activeTier = TIERS[previewTierIdx];

  return (
    <div className="min-h-screen bg-dicey-darker px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Page Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="ui-eyebrow uppercase tracking-[0.08em]">SVG BADGE EXPLORATION</p>
            <h1 className="mt-1 text-2xl font-bold tracking-[-0.02em] text-white">
              Kingdom &amp; Elixir Badge Concepts
            </h1>
            <p className="ui-body mt-1 max-w-2xl">
              High-contrast castle, elixir, and royal crown SVG badges engineered for small UI legibility (`20px–36px`) and layered entrance/idle animation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/vip-badge-svg-options"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-[#d8b4fe] transition-colors hover:border-white/25 hover:text-white"
            >
              Prev Gem Set <BiLinkExternal className="size-3.5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-dicey-card px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:border-white/25 hover:bg-dicey-card-elevated"
            >
              Back to Casino <BiLinkExternal className="size-3.5" />
            </Link>
          </div>
        </div>

        {/* Interactive Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-dicey-card p-4">
          {/* Animation Mode */}
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
              <BiPlay className="size-4" /> Replay Entrance
            </button>
          </div>

          {/* Sub-level Pips */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#b7a9ca]">Pips:</span>
            <div className="inline-flex rounded-xl bg-dicey-dark p-1">
              {([1, 2, 3, 4, 5] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                    level === lvl ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {ROMAN[lvl - 1]}
                </button>
              ))}
            </div>
          </div>

          {/* Size Stress-Test */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#b7a9ca]">Size:</span>
            <div className="inline-flex rounded-xl bg-dicey-dark p-1">
              {(
                [
                  ["strip", "All (24/36/64)"],
                  [24, "24px"],
                  [36, "36px"],
                  [64, "64px"],
                  [104, "104px"],
                ] as const
              ).map(([sz, label]) => (
                <button
                  key={String(sz)}
                  type="button"
                  onClick={() => setSizeMode(sz)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                    sizeMode === sz ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section 1: Chiseled Hex-Bevel Series (Inspired Shapes) */}
        {(
          [
            {
              key: "hex",
              eyebrow: "NEW — INSPIRED BY CHAMFERED HEX GEOMETRY",
              title: "Chiseled Hex-Bevel Kingdom Series (13–18)",
              items: BADGE_OPTIONS.filter((o) => o.series === "hex"),
            },
            {
              key: "rounded",
              eyebrow: "EARLIER EXPLORATION",
              title: "Classic Rounded Crest Series (01–12)",
              items: BADGE_OPTIONS.filter((o) => o.series === "rounded"),
            },
          ] as const
        ).map((group) => (
          <section key={group.key} className="space-y-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-2.5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#39ff14]">{group.eyebrow}</p>
                <h2 className="mt-0.5 text-lg font-bold text-white">{group.title}</h2>
              </div>
              <span className="text-xs text-[#b7a9ca]">{group.items.length} concepts</span>
            </div>

            <div key={`${group.key}-${replayKey}`} className={cn("kb-stage grid gap-5 lg:grid-cols-2", animClass)}>
              {group.items.map((opt) => {
                const isSelected = selectedOption === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedOption(opt.id)}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-5 transition-colors",
                      isSelected
                        ? "border-[#39ff14]/65 bg-dicey-card shadow-[0_0_0_1px_rgba(57,255,20,0.16)]"
                        : "border-white/10 bg-dicey-card hover:border-white/25"
                    )}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[#39ff14]">{opt.num}</span>
                          <h3 className="text-base font-bold text-white">{opt.title}</h3>
                        </div>
                        <p className="mt-0.5 text-xs text-[#d8b4fe]">{opt.subtitle}</p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                          isSelected
                            ? "bg-[#39ff14]/15 text-[#39ff14] border border-[#39ff14]/40"
                            : "bg-dicey-dark text-[#b7a9ca] border border-white/10"
                        )}
                      >
                        {isSelected && <BiCheck className="size-3.5" />}
                        {isSelected ? "Previewing Below" : "Click to Preview"}
                      </span>
                    </div>

                    {/* 5 Tiers Row */}
                    <div className="grid grid-cols-5 gap-2 rounded-xl border border-white/10 bg-dicey-darker p-3">
                      {TIERS.map((tier) => (
                        <div key={tier.name} className="flex flex-col items-center justify-center gap-2 py-2 text-center">
                          {sizeMode === "strip" ? (
                            <div className="flex flex-col items-center gap-2">
                              <ThemedBadgeSvg kind={opt.id} tier={tier} level={level} size={60} />
                              <div className="flex items-center gap-1.5">
                                <ThemedBadgeSvg kind={opt.id} tier={tier} level={level} size={36} />
                                <ThemedBadgeSvg kind={opt.id} tier={tier} level={level} size={24} />
                              </div>
                            </div>
                          ) : (
                            <ThemedBadgeSvg kind={opt.id} tier={tier} level={level} size={sizeMode} />
                          )}
                          <div>
                            <p className="text-[11px] font-bold text-white">{tier.name}</p>
                            <p className="text-[10px] text-[#b7a9ca]">{ROMAN[level - 1]}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-3 text-xs text-[#b7a9ca]">{opt.notes}</p>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* In-Context UI Legibility Preview */}
        <section className="rounded-2xl border border-white/10 bg-dicey-card p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="ui-eyebrow uppercase tracking-[0.08em]">IN-CONTEXT STRESS TEST</p>
              <h2 className="mt-1 text-lg font-bold text-white">
                Real-Size Preview:{" "}
                <span className="text-[#39ff14]">
                  {BADGE_OPTIONS.find((o) => o.id === selectedOption)?.title}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-1.5 rounded-xl bg-dicey-dark p-1">
              {TIERS.map((t, idx) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setPreviewTierIdx(idx)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors",
                    previewTierIdx === idx ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                  )}
                >
                  {t.name}
                </button>
              ))}
              <button
                type="button"
                onClick={triggerEntrance}
                title="Replay entrance animation"
                className="ml-1 grid size-7 place-items-center rounded-lg bg-[#39ff14]/15 text-[#39ff14] hover:bg-[#39ff14] hover:text-[#071a04]"
              >
                <BiRefresh className="size-4" />
              </button>
            </div>
          </div>

          <div key={`ctx-${replayKey}`} className={cn("kb-stage grid gap-4 md:grid-cols-3", animClass)}>
            {/* 1. Header VIP Pill (28px) */}
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-dicey-darker p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#b7a9ca]">
                1. Header Pill (28px)
              </p>
              <div className="my-4 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-dicey-card-elevated px-3.5 py-1.5">
                  <ThemedBadgeSvg kind={selectedOption} tier={activeTier} level={level} size={28} />
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight text-white">
                      {activeTier.name} {ROMAN[level - 1]}
                    </p>
                    <p className="text-[10px] text-[#b7a9ca]">2,450 XP</p>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-[#b7a9ca]">Tests silhouette recognition beside header controls.</p>
            </div>

            {/* 2. Live Chat Tag (20px) */}
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-dicey-darker p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#b7a9ca]">
                2. Chat Username Tag (20px)
              </p>
              <div className="my-4 space-y-2 rounded-xl bg-dicey-card p-3">
                <div className="flex items-center gap-1.5 text-xs">
                  <ThemedBadgeSvg kind={selectedOption} tier={activeTier} level={level} size={20} />
                  <span className="font-bold text-white">AlchemistKing</span>
                  <span className="text-[#b7a9ca]">hit 140x on Limbo!</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <ThemedBadgeSvg kind={selectedOption} tier={TIERS[1]} level={level} size={20} />
                  <span className="font-bold text-white">BrewMaster</span>
                  <span className="text-[#b7a9ca]">gg nice multi 🔥</span>
                </div>
              </div>
              <p className="text-[11px] text-[#b7a9ca]">Smallest real-world size inside scrolling chat lines.</p>
            </div>

            {/* 3. Rank-Up Modal Card (96px) */}
            <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-dicey-darker p-4 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#b7a9ca]">
                3. Rank-Up Reveal (96px)
              </p>
              <div className="my-3 flex flex-col items-center">
                <ThemedBadgeSvg kind={selectedOption} tier={activeTier} level={level} size={96} />
                <p className="mt-2 font-[family-name:var(--font-hero)] text-lg font-black uppercase text-white">
                  RANK UP!
                </p>
                <p className="text-xs text-[#ded5eb]">
                  Unlocked {activeTier.name} {ROMAN[level - 1]}
                </p>
              </div>
              <p className="text-[11px] text-[#b7a9ca]">Hero showcase for layered entrance choreography.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
