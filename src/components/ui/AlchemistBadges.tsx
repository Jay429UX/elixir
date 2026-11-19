"use client";

import { useId } from "react";

export interface AlchemistPartSpec {
  part: string;
  selector: string;
  role: "Lead" | "Support" | "Light" | "Accent";
  motion: string;
}

export interface AlchemistTierMeta {
  id: string;
  level: 1 | 2 | 3 | 4 | 5;
  rank: string;
  artifact: string;
  tagline: string;
  accent: string;
  glow: string;
  pivots: Array<{ x: number; y: number; color: string; label: string }>;
  parts: AlchemistPartSpec[];
}

export const ALCHEMIST_TIERS: readonly AlchemistTierMeta[] = [
  {
    id: "apprentice",
    level: 1,
    rank: "Apprentice",
    artifact: "Copper Elixir Vial",
    tagline: "Full-square copper hex shield housing a pressurized emerald potion flask.",
    accent: "#39ff14",
    glow: "rgba(57, 255, 20, 0.36)",
    pivots: [
      { x: 25, y: 15, color: "#facc15", label: "Cork hinge" },
      { x: 32, y: 39, color: "#39ff14", label: "Elixir core" },
      { x: 32, y: 18, color: "#22d3ee", label: "Copper collar" },
    ],
    parts: [
      { part: "Wide Wooden Cork", selector: ".alch-cork", role: "Lead", motion: "Pressure pop (-3.4px, -14°) with elastic re-seat" },
      { part: "Emerald Elixir Fill", selector: ".alch-liquid", role: "Support", motion: "Continuous ±6.5° meniscus slosh clipped inside glass" },
      { part: "Chunky Bubbles (×3)", selector: ".alch-b0..2", role: "Accent", motion: "High-contrast bubbles ascending cleanly even at 18px" },
      { part: "Glass Catchlight", selector: ".alch-rim", role: "Light", motion: "Bold vector stroke-dashoffset sweep along flask belly" },
      { part: "Copper Shield & Collar", selector: ".alch-collar / .alch-beam", role: "Support", motion: "Collar recoil + perimeter light beam on hex shield" },
    ],
  },
  {
    id: "herbalist",
    level: 2,
    rank: "Herbalist",
    artifact: "Moonlit Cauldron",
    tagline: "Bold faceted silver kettle with heavy swinging handles & glowing cyan tonic.",
    accent: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.4)",
    pivots: [
      { x: 11, y: 31, color: "#22d3ee", label: "Left ring rivet" },
      { x: 53, y: 31, color: "#22d3ee", label: "Right ring rivet" },
      { x: 32, y: 21, color: "#39ff14", label: "Brew dome" },
      { x: 32, y: 40, color: "#f472b6", label: "Belly sigil" },
    ],
    parts: [
      { part: "Heavy Ring Handles", selector: ".alch-handle-l / -r", role: "Support", motion: "Bilateral pendulum swing (±11°) from thick silver rivets" },
      { part: "Simmering Tonic Dome", selector: ".alch-brew", role: "Lead", motion: "Rhythmic cyan brew swell & foam crest" },
      { part: "Luminous Brew Orbs (×3)", selector: ".alch-wisp-0..2", role: "Accent", motion: "Chunky turquoise bubbles lifting cleanly above rim" },
      { part: "Glowing Belly Sigil", selector: ".alch-rune", role: "Light", motion: "Bold water-triangle emblem breathing with simmer beat" },
      { part: "Kettle Rim Glint", selector: ".alch-rim / .alch-beam", role: "Light", motion: "Crisp horizontal silver rim trace across wide mouth" },
    ],
  },
  {
    id: "transmuter",
    level: 3,
    rank: "Transmuter",
    artifact: "Solar Crucible",
    tagline: "Golden winged distillation furnace with blazing flame, solar core & falling drop.",
    accent: "#facc15",
    glow: "rgba(250, 204, 21, 0.44)",
    pivots: [
      { x: 32, y: 58, color: "#fb923c", label: "Crucible flame base" },
      { x: 18, y: 28, color: "#22d3ee", label: "Left condenser hinge" },
      { x: 46, y: 28, color: "#22d3ee", label: "Right condenser hinge" },
      { x: 52, y: 39, color: "#facc15", label: "Distillate drop" },
    ],
    parts: [
      { part: "Roaring Crucible Flame", selector: ".alch-flame-o / -i", role: "Lead", motion: "Chunky dual-layer counter-flicker from hearth base" },
      { part: "Beveled Condenser Wings", selector: ".alch-coil-l / -r", role: "Support", motion: "Solid gold side brackets flex symmetrically on surge" },
      { part: "Molten Gold Drop", selector: ".alch-drop", role: "Accent", motion: "Bold golden droplet forms at spout & drops cleanly" },
      { part: "Solar Core Vessel", selector: ".alch-core", role: "Support", motion: "Radiant sun-triangle vessel pulsing with burner heat" },
      { part: "Alembic Hood Catchlight", selector: ".alch-rim / .alch-beam", role: "Light", motion: "Vector catchlight tracing dome & orbiting core ring" },
    ],
  },
  {
    id: "arcanist",
    level: 4,
    rank: "Arcanist",
    artifact: "Celestial Astrolabe",
    tagline: "Heavy beveled brass astrolabe framing a huge levitating amethyst orb & dual moons.",
    accent: "#e879f9",
    glow: "rgba(232, 121, 249, 0.45)",
    pivots: [
      { x: 32, y: 33, color: "#39ff14", label: "Orbital axis" },
      { x: 32, y: 10, color: "#facc15", label: "Lunar crest" },
      { x: 9, y: 33, color: "#22d3ee", label: "West spire" },
      { x: 55, y: 33, color: "#22d3ee", label: "East spire" },
    ],
    parts: [
      { part: "Beveled Brass Astrolabe", selector: ".alch-ring-outer", role: "Lead", motion: "Thick studded gold ring rotating clockwise 360°" },
      { part: "Orbiting Moon Track", selector: ".alch-ring-inner", role: "Support", motion: "Counter-rotating twin moons orbiting the amethyst orb" },
      { part: "Amethyst Elixir Orb", selector: ".alch-orb", role: "Support", motion: "Large glowing purple sphere with zero-G phase-lag float" },
      { part: "Gilded Crescent Apex", selector: ".alch-moon", role: "Accent", motion: "Chunky lunar crown rocking gently above north bezel" },
      { part: "Compass Spires + Stars", selector: ".alch-spire / .alch-star", role: "Light", motion: "Bilateral spire pulses + crisp pinpoint stars" },
    ],
  },
  {
    id: "grand-alchemist",
    level: 5,
    rank: "Grand Alchemist",
    artifact: "Philosopher's Crown",
    tagline: "Sovereign winged Philosopher's Stone enclosing the King's blazing nuclear-green heart.",
    accent: "#39ff14",
    glow: "rgba(57, 255, 20, 0.46)",
    pivots: [
      { x: 32, y: 34, color: "#39ff14", label: "Philosopher's heart" },
      { x: 32, y: 12, color: "#facc15", label: "Royal crown" },
      { x: 18, y: 23, color: "#22d3ee", label: "Upper wing hinge" },
      { x: 46, y: 23, color: "#22d3ee", label: "Upper wing hinge (R)" },
    ],
    parts: [
      { part: "Articulated Gold Wings (×3)", selector: ".alch-wing-0..2", role: "Lead", motion: "Hinged 3-feather cascade (0→55→105ms) from hex roots" },
      { part: "Philosopher's Seal Triangle", selector: ".alch-seal", role: "Support", motion: "Bold golden transmutation seal breathes around heart" },
      { part: "Immortal Elixir Heart", selector: ".alch-heart", role: "Lead", motion: "Blazing nuclear-green core pulse + specular ridge draw" },
      { part: "King's 3-Spire Crown", selector: ".alch-crown / -gem", role: "Accent", motion: "Independent sovereign hover + emerald centerpiece flash" },
      { part: "Sovereign Hex Beam", selector: ".alch-beam", role: "Light", motion: "Continuous perimeter light chase + rising arcane sparks" },
    ],
  },
] as const;

const SOVEREIGN_WINGS = [
  { upper: "20,21 4.5,16 17.5,25", lower: "17.5,25 4.5,16 6.8,22.2 17,28.5", hx: 18.5, hy: 23.5 },
  { upper: "17,29.5 6,25.5 17,33", lower: "17,33 6,25.5 8.2,30.6 17,36.2", hx: 17, hy: 31.8 },
  { upper: "17.5,37.2 8.5,34 18,40.4", lower: "18,40.4 8.5,34 10.8,38.4 18.5,43", hx: 17.8, hy: 39.2 },
];

export function AlchemistBadgeSvg({
  tierIndex,
  alt,
  width,
  height,
  className = "block size-full overflow-visible",
}: {
  tierIndex: number;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const idx = Math.max(0, Math.min(ALCHEMIST_TIERS.length - 1, tierIndex));
  const meta = ALCHEMIST_TIERS[idx];

  const g1 = `a1-${uid}`;
  const g2 = `a2-${uid}`;
  const g3 = `a3-${uid}`;
  const g4 = `a4-${uid}`;
  const c1 = `c1-${uid}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt}
      className={className}
      style={{
        filter: `drop-shadow(0 5px 10px rgba(3, 1, 12, 0.82)) drop-shadow(0 2px 7px ${meta.glow})`,
      }}
    >
      {/* ===================== TIER 1: APPRENTICE (FULL-SQUARE COPPER ELIXIR VIAL) ===================== */}
      {/* Optical footprint: x: 6..58 (52u), y: 5..58 (53u) */}
      {idx === 0 && (
        <>
          <defs>
            <linearGradient id={g1} x1="8" y1="12" x2="56" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffd1a3" />
              <stop offset="48%" stopColor="#d47a3e" />
              <stop offset="100%" stopColor="#6c3110" />
            </linearGradient>
            <linearGradient id={g2} x1="16" y1="30" x2="48" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c8ff8c" />
              <stop offset="38%" stopColor="#39ff14" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id={g3} x1="22" y1="5" x2="42" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <clipPath id={c1}>
              <path d="M25.5,21 H38.5 V26.5 L49.5,37 C52,40 51.2,48 46.5,51.8 C42,55.2 22,55.2 17.5,51.8 C12.8,48 12,40 14.5,37 L25.5,26.5 Z" />
            </clipPath>
          </defs>

          {/* Heavy Full-Square Copper Shield Backing + Side Rivet Lugs */}
          <g className="alch-frame">
            {/* Side copper lugs matching square optical width (x: 6..58) */}
            <polygon points="6,27 11,23 11,45 6,41" fill="#d47a3e" stroke="#160804" strokeWidth="1.2" strokeLinejoin="round" />
            <polygon points="58,27 53,23 53,45 58,41" fill="#7c3a14" stroke="#160804" strokeWidth="1.2" strokeLinejoin="round" />

            {/* Outer beveled copper hex shield (x: 9..55, y: 12..58) */}
            <polygon
              points="32,12 55,23 55,46 32,58 9,46 9,23"
              fill="#30150b"
              stroke={`url(#${g1})`}
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <polygon
              points="32,12 55,23 55,46 32,58 9,46 9,23"
              fill="none"
              stroke="#12060a"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            <polygon
              className="alch-beam"
              pathLength={1}
              points="32,12 55,23 55,46 32,58 9,46 9,23"
              fill="none"
              stroke="#fff3d6"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0"
            />
          </g>

          {/* Chunky Wide Cork Stopper (y: 5..16) */}
          <g className="alch-cork" style={{ transformOrigin: "25px 15px" }}>
            <polygon
              points="23.5,5.5 40.5,5.5 38.5,16 25.5,16"
              fill={`url(#${g3})`}
              stroke="#2a1105"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <polygon points="24.2,6.2 32,6.2 31.5,15.2 26,15.2" fill="#fef9c3" opacity="0.4" />
          </g>

          {/* Large Chunky Potion Flask Belly */}
          <g className="alch-core" style={{ transformOrigin: "32px 39px" }}>
            <path
              d="M25.5,21 H38.5 V26.5 L49.5,37 C52,40 51.2,48 46.5,51.8 C42,55.2 22,55.2 17.5,51.8 C12.8,48 12,40 14.5,37 L25.5,26.5 Z"
              fill="#0a2415"
              stroke="#ffd1a3"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <g clipPath={`url(#${c1})`}>
              <g className="alch-liquid">
                <rect x="8" y="34" width="48" height="24" fill={`url(#${g2})`} />
                <ellipse cx="32" cy="34.5" rx="18" ry="3.4" fill="#dfffab" opacity="0.95" />
              </g>
              <g className="alch-bubbles">
                <circle className="alch-b0" cx="25.5" cy="43.5" r="3" fill="#ffffff" opacity="0.92" />
                <circle className="alch-b1" cx="37" cy="45" r="2.3" fill="#eaffc7" opacity="0.95" />
                <circle className="alch-b2" cx="31.5" cy="38.5" r="2" fill="#ffffff" opacity="0.92" />
              </g>
            </g>
            {/* Bold Curved Glass Catchlight (readable at 18px!) */}
            <path
              className="alch-rim"
              pathLength={1}
              d="M20.5,47.5 C17.2,44.2 17.8,39.5 21,36 L27.5,29"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.95"
            />
          </g>

          {/* Heavy Copper Neck Collar */}
          <g className="alch-collar" style={{ transformOrigin: "32px 18.5px" }}>
            <rect
              x="21.5"
              y="15"
              width="21"
              height="6.2"
              rx="2.6"
              fill={`url(#${g1})`}
              stroke="#1c0a04"
              strokeWidth="1.3"
            />
            <line x1="24.5" y1="17.2" x2="35" y2="17.2" stroke="#fff7ed" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
          </g>

          <path
            className="alch-spark alch-star-0"
            d="M47 23 L48.2 26 L51.2 27.2 L48.2 28.4 L47 31.4 L45.8 28.4 L42.8 27.2 L45.8 26 Z"
            fill="#eaffb0"
            opacity="0"
            style={{ transformOrigin: "47px 27.2px" }}
          />
        </>
      )}

      {/* ===================== TIER 2: HERBALIST (FULL-SQUARE MOONLIT CAULDRON) ===================== */}
      {/* Optical footprint: x: 5..59 (54u), y: 6..58 (52u) */}
      {idx === 1 && (
        <>
          <defs>
            <linearGradient id={g1} x1="8" y1="18" x2="56" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="45%" stopColor="#8ba9c7" />
              <stop offset="100%" stopColor="#263852" />
            </linearGradient>
            <linearGradient id={g2} x1="16" y1="12" x2="48" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ecfeff" />
              <stop offset="45%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id={g3} x1="16" y1="24" x2="48" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3c5473" />
              <stop offset="55%" stopColor="#1b2940" />
              <stop offset="100%" stopColor="#0c1526" />
            </linearGradient>
          </defs>

          {/* Chunky Luminous Rising Brew Orbs (y: 6..18 — big enough to read at 18px!) */}
          <g className="alch-wisps">
            <circle className="alch-wisp-0" cx="22.5" cy="14" r="4" fill="#a5f3fc" stroke="#083344" strokeWidth="1" style={{ transformOrigin: "22.5px 14px" }} />
            <circle className="alch-wisp-1" cx="32.5" cy="10.2" r="4.8" fill="#67e8f9" stroke="#083344" strokeWidth="1" style={{ transformOrigin: "32.5px 10.2px" }} />
            <circle className="alch-wisp-2" cx="42.5" cy="14.5" r="3.4" fill="#ecfeff" stroke="#083344" strokeWidth="0.9" style={{ transformOrigin: "42.5px 14.5px" }} />
          </g>

          {/* Thick Solid-Beveled Swinging Ring Handles (x: 5..59) */}
          <g className="alch-handle-l" style={{ transformOrigin: "12px 31px" }}>
            <circle cx="9.8" cy="35.5" r="5.5" fill="none" stroke="#0f172a" strokeWidth="6" />
            <circle cx="9.8" cy="35.5" r="5.5" fill="none" stroke={`url(#${g1})`} strokeWidth="3.8" />
          </g>
          <g className="alch-handle-r" style={{ transformOrigin: "52px 31px" }}>
            <circle cx="54.2" cy="35.5" r="5.5" fill="none" stroke="#0f172a" strokeWidth="6" />
            <circle cx="54.2" cy="35.5" r="5.5" fill="none" stroke={`url(#${g1})`} strokeWidth="3.8" />
          </g>

          {/* Bright Overflowing Cyan Tonic Dome */}
          <g className="alch-brew" style={{ transformOrigin: "32px 23px" }}>
            <ellipse cx="32" cy="22" rx="19" ry="6.8" fill={`url(#${g2})`} stroke="#082f49" strokeWidth="1.2" />
            <ellipse cx="27" cy="20.2" rx="7.5" ry="2.4" fill="#ffffff" opacity="0.72" />
            <circle cx="40.5" cy="19.5" r="3.2" fill="#cffafe" />
          </g>

          {/* Heavy Faceted Cauldron Body & Sturdy Feet (y: 22..58) */}
          <g className="alch-frame">
            <path d="M17.5,51 L14.5,58 H22.5 L24,52.5 Z" fill="#647d9c" stroke="#0b1220" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M46.5,51 L49.5,58 H41.5 L40,52.5 Z" fill="#2c3e59" stroke="#0b1220" strokeWidth="1.3" strokeLinejoin="round" />
            <path
              d="M11.5,25.5 H52.5 C55.5,35.5 53,48.5 44.5,53.2 C38.5,56.5 25.5,56.5 19.5,53.2 C11,48.5 8.5,35.5 11.5,25.5 Z"
              fill={`url(#${g3})`}
              stroke={`url(#${g1})`}
              strokeWidth="2.8"
              strokeLinejoin="round"
            />
            {/* Bold left kettle reflection */}
            <path
              d="M15.8,31.5 C14.6,39 16.5,46 21.5,50"
              stroke="#bae6fd"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.55"
            />
            {/* Thick Silver Rivets */}
            <circle cx="11.5" cy="31" r="2.6" fill="#f0f9ff" stroke="#0f172a" strokeWidth="1.1" />
            <circle cx="52.5" cy="31" r="2.6" fill="#94a3b8" stroke="#0f172a" strokeWidth="1.1" />
            {/* Chunky Wide Flared Kettle Lip */}
            <rect
              x="9"
              y="21.5"
              width="46"
              height="6.8"
              rx="3.4"
              fill={`url(#${g1})`}
              stroke="#0f172a"
              strokeWidth="1.3"
            />
            <line
              className="alch-rim"
              pathLength={1}
              x1="13.5"
              y1="23.8"
              x2="49.5"
              y2="23.8"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.92"
            />
            <rect
              className="alch-beam"
              pathLength={1}
              x="9"
              y="21.5"
              width="46"
              height="6.8"
              rx="3.4"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
              opacity="0"
            />
          </g>

          {/* Large High-Contrast Glowing Belly Rune (readable down to 18px!) */}
          <g className="alch-rune" style={{ transformOrigin: "32px 41px" }}>
            <polygon
              points="23,34.5 41,34.5 32,49"
              fill="#082f49"
              stroke="#67e8f9"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="39.8" r="3.2" fill="#ecfeff" />
          </g>
        </>
      )}

      {/* ===================== TIER 3: TRANSMUTER (FULL-SQUARE SOLAR CRUCIBLE) ===================== */}
      {/* Optical footprint: x: 6..58 (52u), y: 5..59 (54u) */}
      {idx === 2 && (
        <>
          <defs>
            <linearGradient id={g1} x1="8" y1="8" x2="56" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef9c3" />
              <stop offset="45%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#854d0e" />
            </linearGradient>
            <linearGradient id={g2} x1="32" y1="42" x2="32" y2="59" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id={g3} x1="18" y1="20" x2="46" y2="46" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="45%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>

          {/* Heavy Solid-Beveled Condenser Wing Brackets (x: 6..58) */}
          <g className="alch-coil-l" style={{ transformOrigin: "18px 28px" }}>
            <polygon
              points="19,21 6,24 6,36 14,42 19,38 12,33 12,27 19,26"
              fill={`url(#${g1})`}
              stroke="#2a1104"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <polygon points="19,21 6,24 12,27 19,26" fill="#fef9c3" opacity="0.55" />
          </g>
          <g className="alch-coil-r" style={{ transformOrigin: "46px 28px" }}>
            <polygon
              points="45,21 58,24 58,36 52,39 46,35 52,32 52,27 45,26"
              fill={`url(#${g1})`}
              stroke="#2a1104"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <polygon points="45,21 58,24 52,27 45,26" fill="#fef9c3" opacity="0.45" />
          </g>

          {/* Chunky Molten Gold Droplet falling from right spout */}
          <path
            className="alch-drop"
            d="M52,39 C52,39 56.2,44.2 56.2,46.8 C56.2,49.2 54.3,51 52,51 C49.7,51 47.8,49.2 47.8,46.8 C47.8,44.2 52,39 52,39 Z"
            fill="#fef08a"
            stroke="#78350f"
            strokeWidth="1.1"
            style={{ transformOrigin: "52px 42px" }}
          />

          {/* Bold Two-Layer Roaring Crucible Flame (y: 41..59 — super crisp at 18px!) */}
          <g className="alch-flame-o" style={{ transformOrigin: "32px 58px" }}>
            <path
              d="M32,41 C40.5,46 43.5,52.5 39,57.5 C36.5,59.5 27.5,59.5 25,57.5 C20.5,52.5 23.5,46 32,41 Z"
              fill={`url(#${g2})`}
              stroke="#431407"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </g>
          <g className="alch-flame-i" style={{ transformOrigin: "32px 57px" }}>
            <path
              d="M32,46.5 C36,49.8 37,54 34.8,56.8 C33.5,58 30.5,58 29.2,56.8 C27,54 28,49.8 32,46.5 Z"
              fill="#fef9c3"
            />
          </g>

          {/* Heavy Golden Hearth Cradle Frame */}
          <g className="alch-frame">
            <path
              d="M14,42 H50 L46,48.5 H38.5 L32,45 L25.5,48.5 H18 Z"
              fill={`url(#${g1})`}
              stroke="#2a1104"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <polygon points="18,48.5 13.5,57 19.5,57 24,48.5" fill="#d97706" stroke="#2a1104" strokeWidth="1.1" strokeLinejoin="round" />
            <polygon points="46,48.5 50.5,57 44.5,57 40,48.5" fill="#78350f" stroke="#2a1104" strokeWidth="1.1" strokeLinejoin="round" />
          </g>

          {/* Large Glowing Molten Solar Vessel & Bold Alembic Dome */}
          <g className="alch-core" style={{ transformOrigin: "32px 30px" }}>
            {/* Thick Golden Dome Hood (y: 8..24) */}
            <path
              d="M19,24.5 C19,14 25,8.5 32,7 C39,8.5 45,14 45,24.5 Z"
              fill={`url(#${g1})`}
              stroke="#2a1104"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            {/* Top Solar Diamond Finial */}
            <polygon points="32,4 36.2,9 32,12 27.8,9" fill="#fef9c3" stroke="#78350f" strokeWidth="1.1" strokeLinejoin="round" />

            {/* Giant Molten Solar Core Circle (r=14.5) */}
            <circle
              cx="32"
              cy="32"
              r="14.2"
              fill="#3f1a04"
              stroke={`url(#${g1})`}
              strokeWidth="3.2"
            />
            <circle cx="32" cy="32" r="10.4" fill={`url(#${g3})`} />
            {/* Bold Alchemical Fire Triangle Core */}
            <polygon
              points="32,24.8 39,37 25,37"
              fill="#fffbeb"
              stroke="#92400e"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />

            {/* Bold Hood Catchlight */}
            <path
              className="alch-rim"
              pathLength={1}
              d="M23.2,21 C23.8,15.5 26.8,12 31.5,10.5"
              stroke="#ffffff"
              strokeWidth="2.3"
              strokeLinecap="round"
              opacity="0.95"
            />
            <circle
              className="alch-beam"
              pathLength={1}
              cx="32"
              cy="32"
              r="14.2"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0"
            />
          </g>
        </>
      )}

      {/* ===================== TIER 4: ARCANIST (FULL-SQUARE CELESTIAL ASTROLABE) ===================== */}
      {/* Optical footprint: x: 5..59 (54u), y: 5..58 (53u) */}
      {idx === 3 && (
        <>
          <defs>
            <linearGradient id={g1} x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff8d6" />
              <stop offset="48%" stopColor="#e5b142" />
              <stop offset="100%" stopColor="#7c470e" />
            </linearGradient>
            <radialGradient id={g2} cx="36%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="28%" stopColor="#f0abfc" />
              <stop offset="68%" stopColor="#a21caf" />
              <stop offset="100%" stopColor="#3b0764" />
            </radialGradient>
            <clipPath id={c1}>
              <circle cx="32" cy="33" r="13.5" />
            </clipPath>
          </defs>

          {/* Heavy Dark Royal Medallion Backing (guarantees 20px silhouette mass!) */}
          <g className="alch-frame">
            <circle cx="32" cy="33" r="24.5" fill="#1d0936" stroke="#0d041a" strokeWidth="1.4" />
          </g>

          {/* Chunky Left & Right Brass Compass Spires (x: 4..60) */}
          <g className="alch-spire-l" style={{ transformOrigin: "10px 33px" }}>
            <polygon points="12,28.5 4,33 12,37.5 10,33" fill={`url(#${g1})`} stroke="#1d0936" strokeWidth="1.1" strokeLinejoin="round" />
          </g>
          <g className="alch-spire-r" style={{ transformOrigin: "54px 33px" }}>
            <polygon points="52,28.5 60,33 52,37.5 54,33" fill={`url(#${g1})`} stroke="#1d0936" strokeWidth="1.1" strokeLinejoin="round" />
          </g>

          {/* Thick Solid-Beveled Rotating Brass Astrolabe Ring + 4 Large Cardinal Studs */}
          <g className="alch-ring-outer" style={{ transformOrigin: "32px 33px" }}>
            <circle cx="32" cy="33" r="22.2" fill="none" stroke={`url(#${g1})`} strokeWidth="5.2" />
            <circle cx="32" cy="33" r="22.2" fill="none" stroke="#fffbeb" strokeWidth="1.4" strokeDasharray="3.5 6.2" opacity="0.85" />
            <polygon points="32,7.2 35.4,10.6 32,14 28.6,10.6" fill="#fffbeb" stroke="#3b0764" strokeWidth="1" />
            <polygon points="57.8,33 54.4,36.4 51,33 54.4,29.6" fill="#fffbeb" stroke="#3b0764" strokeWidth="1" />
            <polygon points="32,58.8 35.4,55.4 32,52 28.6,55.4" fill="#fffbeb" stroke="#3b0764" strokeWidth="1" />
            <polygon points="6.2,33 9.6,36.4 13,33 9.6,29.6" fill="#fffbeb" stroke="#3b0764" strokeWidth="1" />
          </g>

          {/* Bold Counter-Rotating Inner Orbit Ring with Twin Bright Satellites */}
          <g className="alch-ring-inner" style={{ transformOrigin: "32px 33px" }}>
            <circle cx="32" cy="33" r="17.2" fill="none" stroke="#f5d0fe" strokeWidth="2.4" strokeDasharray="16 10" opacity="0.92" />
            <circle cx="49.2" cy="33" r="3.4" fill="#ffffff" stroke="#581c87" strokeWidth="1" />
            <circle cx="14.8" cy="33" r="2.8" fill="#e879f9" stroke="#2e1065" strokeWidth="1" />
          </g>

          {/* Bold Gilded Crescent Moon Finial at North Apex (y: 4..16) */}
          <g className="alch-moon" style={{ transformOrigin: "32px 10px" }}>
            <path
              d="M22.5,5.5 C22.5,11.5 26.8,15.2 32,15.2 C37.2,15.2 41.5,11.5 41.5,5.5 C39,9.6 35.8,11.2 32,11.2 C28.2,11.2 25,9.6 22.5,5.5 Z"
              fill={`url(#${g1})`}
              stroke="#2e1065"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <polygon points="32,3.5 34.2,7 32,10.5 29.8,7" fill="#fdf4ff" stroke="#581c87" strokeWidth="0.8" />
          </g>

          {/* Giant Levitating Amethyst Elixir Orb (27u diameter — pops cleanly at 18px!) */}
          <g className="alch-orb" style={{ transformOrigin: "32px 33px" }}>
            <circle cx="32" cy="33" r="13.5" fill={`url(#${g2})`} stroke="#fef3c7" strokeWidth="2" />
            <g clipPath={`url(#${c1})`}>
              <g className="alch-liquid">
                <ellipse cx="32" cy="39" rx="15" ry="7.2" fill="#4a044e" opacity="0.58" />
                <ellipse cx="32" cy="33.5" rx="10.5" ry="2.4" fill="#fdf4ff" opacity="0.62" />
              </g>
              <circle className="alch-b0" cx="28" cy="37" r="2.2" fill="#ffffff" opacity="0.9" />
              <circle className="alch-b1" cx="36" cy="34.5" r="1.7" fill="#fdf4ff" opacity="0.92" />
            </g>
            {/* Thick Curved Specular Catchlight */}
            <path
              className="alch-rim"
              pathLength={1}
              d="M23,30.5 C24.2,25.5 28,22.8 33,22.6"
              stroke="#ffffff"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.96"
            />
            <circle
              className="alch-beam"
              pathLength={1}
              cx="32"
              cy="33"
              r="13.5"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0"
            />
          </g>

          {/* Twin Crisp Pinpoint Stars */}
          <path
            className="alch-spark alch-star-0"
            d="M14.5 14 L15.5 16.8 L18.3 17.8 L15.5 18.8 L14.5 21.6 L13.5 18.8 L10.7 17.8 L13.5 16.8 Z"
            fill="#ffffff"
            opacity="0"
            style={{ transformOrigin: "14.5px 17.8px" }}
          />
          <path
            className="alch-spark alch-star-1"
            d="M49.5 45 L50.4 47.4 L52.8 48.3 L50.4 49.2 L49.5 51.6 L48.6 49.2 L46.2 48.3 L48.6 47.4 Z"
            fill="#f5d0fe"
            opacity="0"
            style={{ transformOrigin: "49.5px 48.3px" }}
          />
        </>
      )}

      {/* ===================== TIER 5: GRAND ALCHEMIST (FULL-SQUARE PHILOSOPHER'S CROWN) ===================== */}
      {/* Optical footprint: x: 5..59 (54u), y: 5..59 (54u) */}
      {idx === 4 && (
        <>
          <defs>
            <linearGradient id={g1} x1="12" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff8c5" />
              <stop offset="48%" stopColor="#f5b027" />
              <stop offset="100%" stopColor="#8a4b08" />
            </linearGradient>
            <linearGradient id={g2} x1="18" y1="20" x2="46" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#eaffb0" />
              <stop offset="38%" stopColor="#39ff14" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <linearGradient id={g3} x1="32" y1="17" x2="32" y2="49" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4c1d95" />
              <stop offset="100%" stopColor="#1b0836" />
            </linearGradient>
            <linearGradient id={g4} x1="20" y1="4" x2="44" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff8c5" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Articulated 3-Blade Sovereign Wings (mirrored L/R, x: 4.5..59.5) */}
          <g className="alch-wings">
            {[false, true].map((mirrored) => (
              <g
                key={mirrored ? "r" : "l"}
                transform={mirrored ? "translate(64, 0) scale(-1, 1)" : undefined}
              >
                {SOVEREIGN_WINGS.map((w, i) => (
                  <g
                    key={i}
                    className={`alch-wing alch-wing-${i}`}
                    style={{ transformOrigin: `${w.hx}px ${w.hy}px` }}
                  >
                    <polygon points={w.upper} fill="#fff3b0" />
                    <polygon points={w.lower} fill="#9a5508" />
                  </g>
                ))}
              </g>
            ))}
          </g>

          {/* Sovereign Gold Hex Frame & Bottom Elixir Prow */}
          <g className="alch-frame">
            <polygon
              points="32,13 49.5,23 49.5,43.5 32,53.5 14.5,43.5 14.5,23"
              fill="#78350f"
              stroke="#1a092e"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <polygon
              points="32,13 49.5,23 49.5,43.5 32,53.5 14.5,43.5 14.5,23"
              fill="none"
              stroke={`url(#${g1})`}
              strokeWidth="3.4"
              strokeLinejoin="round"
            />
            <polygon
              points="32,17.5 45.5,25.2 45.5,41.6 32,49.4 18.5,41.6 18.5,25.2"
              fill={`url(#${g3})`}
              stroke="#fff3b0"
              strokeWidth="1.1"
              strokeOpacity="0.85"
            />
            {/* Bottom Armored Gold Prow + Emerald Gem */}
            <g className="alch-prow" style={{ transformOrigin: "32px 52px" }}>
              <polygon points="22.5,49 32,54 32,60 22.5,54.2" fill="#f5b027" />
              <polygon points="41.5,49 32,54 32,60 41.5,54.2" fill="#92400e" />
              <polygon points="32,52 34.8,54.8 32,57.6 29.2,54.8" fill="#39ff14" stroke="#0c2617" strokeWidth="0.9" />
            </g>

            {/* Orbiting Perimeter Light Beam */}
            <polygon
              className="alch-beam"
              pathLength={1}
              points="32,13 49.5,23 49.5,43.5 32,53.5 14.5,43.5 14.5,23"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0"
            />
          </g>

          {/* Philosopher's Stone Seal (Bold Alchemy Circle + Transmutation Triangle) */}
          <g className="alch-seal" style={{ transformOrigin: "32px 33.5px" }}>
            <circle cx="32" cy="33.5" r="11.6" fill="none" stroke={`url(#${g1})`} strokeWidth="1.8" opacity="0.95" />
            <polygon
              points="32,19.8 44,40.8 20,40.8"
              fill="none"
              stroke="#fff3b0"
              strokeWidth="1.9"
              strokeLinejoin="round"
            />
          </g>

          {/* Blazing Nuclear-Green Philosopher's Heart (expanded for 18px punch!) */}
          <g className="alch-heart" style={{ transformOrigin: "32px 33.5px" }}>
            <polygon
              points="32,24.2 40.2,33.5 32,42.8 23.8,33.5"
              fill={`url(#${g2})`}
              stroke="#052e16"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <polygon points="32,24.2 23.8,33.5 32,33.5" fill="#ffffff" opacity="0.45" />
            <polygon points="32,28.2 36.2,33.5 32,38.8 27.8,33.5" fill="#d9ff9e" opacity="0.8" />
            <polyline
              className="alch-rim"
              pathLength={1}
              points="25.5,33 32,25.8 36.4,30.8"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.96"
            />
          </g>

          {/* King Alchemist's 3-Spire Royal Crown */}
          <g className="alch-crown" style={{ transformOrigin: "32px 13px" }}>
            <polygon
              points="22,16 19.8,7.4 27,11.2 32,4.4 32,14"
              fill="#fff3b0"
              stroke="#78350f"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <polygon
              points="42,16 44.2,7.4 37,11.2 32,4.4 32,14"
              fill={`url(#${g4})`}
              stroke="#78350f"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <polygon
              className="alch-crown-gem"
              points="32,8 34.4,11 32,14 29.6,11"
              fill="#39ff14"
              stroke="#052e16"
              strokeWidth="0.7"
              style={{ transformOrigin: "32px 11px" }}
            />
          </g>

          {/* Sovereign Pinpoint Sparks */}
          <path
            className="alch-spark alch-star-0"
            d="M20 18.5 L20.9 21.1 L23.5 22 L20.9 22.9 L20 25.5 L19.1 22.9 L16.5 22 L19.1 21.1 Z"
            fill="#ffffff"
            opacity="0"
            style={{ transformOrigin: "20px 22px" }}
          />
          <path
            className="alch-spark alch-star-1"
            d="M44.5 43 L45.3 45.3 L47.6 46.1 L45.3 46.9 L44.5 49.2 L43.7 46.9 L41.4 46.1 L43.7 45.3 Z"
            fill="#b7ff7a"
            opacity="0"
            style={{ transformOrigin: "44.5px 46.1px" }}
          />
        </>
      )}
    </svg>
  );
}
