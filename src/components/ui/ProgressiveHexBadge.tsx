"use client";

import { useId } from "react";
import vipBadgeConfig from "./vip-badge-config.json";

export interface HexTierPalette {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  metalLight: string;
  metalMid: string;
  metalDark: string;
  wellLight: string;
  wellDark: string;
  elixirBright: string;
  elixirMid: string;
  elixirDeep: string;
  crownLight: string;
  crownDark: string;
  glow: string;
}

export const VIP_TIERS = vipBadgeConfig.tiers as unknown as readonly HexTierPalette[];

export type HexCoreKind = "crown-drop" | "diamond" | "radial-matrix" | "keep-arch" | "flask";
export type HexTopStyle = "cap" | "crown" | "rays-3" | "rays-5" | "battlements";
export type HexArmorStyle = "bastion" | "cheek-prow" | "bastion-cheek";

export interface HexSpec {
  wings: 0 | 2 | 3 | 4;
  armor: HexArmorStyle;
  top: HexTopStyle;
  tails: boolean;
  core: HexCoreKind;
  onProw: boolean;
}

const PROGRESSIVE_SPECS = vipBadgeConfig.specs as unknown as Record<string, HexSpec>;

export function resolveProgressiveHexSpec(tierLevel: 1 | 2 | 3 | 4 | 5): HexSpec {
  return PROGRESSIVE_SPECS[String(tierLevel)] ?? PROGRESSIVE_SPECS["1"];
}

/* Chunky, vertically compact beveled wing slats anchored cleanly inside the hex/cheek perimeter. */
const WING_BLADES_2 = [
  { upper: "20,21 3,18.5 18,24.8", lower: "18,24.8 3,18.5 5.2,24 17.5,28.8", hx: 18.5, hy: 24.8 },
  { upper: "17.5,30.4 5,25.8 17.5,33.4", lower: "17.5,33.4 5,25.8 7.2,30.8 17.5,36.4", hx: 17.5, hy: 33.4 },
];

const WING_BLADES_4 = [
  { upper: "25,16.5 2.5,15.5 19,20.5", lower: "19,20.5 2.5,15.5 5,20.5 18,24", hx: 19, hy: 20.5 },
  { upper: "17,25.5 3.8,22 17,28.1", lower: "17,28.1 3.8,22 6,26.8 17,30.8", hx: 17, hy: 28.1 },
  { upper: "17,32.2 5.4,28.2 17,34.6", lower: "17,34.6 5.4,28.2 7.4,32.6 17,37", hx: 17, hy: 34.6 },
  { upper: "17,38.5 7.2,34.2 17,40.6", lower: "17,40.6 7.2,34.2 9.2,38.2 17.5,42.8", hx: 17, hy: 40.6 },
];

function HexWings({ count, tier }: { count: 0 | 2 | 3 | 4; tier: HexTierPalette }) {
  if (count === 0) return null;
  const blades = count === 2 ? WING_BLADES_2 : WING_BLADES_4.slice(0, count);
  return (
    <g className="kb-wings">
      {[false, true].map((mirrored) => (
        <g
          key={mirrored ? "r" : "l"}
          className={mirrored ? "kb-wing-side kb-wing-r" : "kb-wing-side kb-wing-l"}
          transform={mirrored ? "translate(64, 0) scale(-1, 1)" : undefined}
        >
          {blades.map((b, i) => (
            <g
              key={i}
              className={`kb-blade kb-blade-${i}`}
              style={{ transformOrigin: `${b.hx}px ${b.hy}px` }}
            >
              <polygon className="kb-blade-upper" points={b.upper} fill={tier.metalLight} />
              <polygon className="kb-blade-lower" points={b.lower} fill={tier.metalDark} />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

function HexTopOverlay({
  top,
  tier,
  gradCrown,
}: {
  top: HexTopStyle;
  tier: HexTierPalette;
  gradCrown: string;
}) {
  if (top === "cap") {
    return (
      <g className="kb-crown kb-cap" style={{ transformOrigin: "32px 13px" }}>
        <polygon className="kb-cap-l" points="24,15.5 24,11.5 32,7.2 32,12" fill={tier.metalLight} />
        <polygon className="kb-cap-r" points="32,7.2 40,11.5 40,15.5 32,12" fill={tier.metalDark} />
        <polygon
          points="24,15.5 24,11.5 32,7.2 40,11.5 40,15.5 32,12"
          fill="none"
          stroke={tier.metalDark}
          strokeWidth="0.7"
          strokeOpacity="0.65"
          strokeLinejoin="round"
        />
      </g>
    );
  }
  if (top === "battlements") {
    return (
      <g className="kb-crown kb-battlements" style={{ transformOrigin: "32px 13px" }}>
        <polygon
          className="kb-merlon-l"
          points="20,18 20,12 24,10 24,15.5"
          fill={tier.metalLight}
          stroke={tier.metalDark}
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <polygon
          className="kb-merlon-r"
          points="44,18 44,12 40,10 40,15.5"
          fill={tier.metalDark}
          stroke="#120720"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
        <g className="kb-merlon-c" style={{ transformOrigin: "32px 11.8px" }}>
          <polygon points="28.5,13 28.5,7 32,5.8 32,11.8" fill={tier.crownLight} />
          <polygon points="32,5.8 35.5,7 35.5,13 32,11.8" fill={tier.crownDark} />
        </g>
      </g>
    );
  }
  if (top === "crown") {
    return (
      <g className="kb-crown" style={{ transformOrigin: "32px 13.5px" }}>
        <polygon className="kb-crown-l" points="25,15.5 23.5,9.5 28.5,12 32,6.5 32,13" fill={tier.crownLight} />
        <polygon className="kb-crown-r" points="39,15.5 40.5,9.5 35.5,12 32,6.5 32,13" fill={tier.crownDark} />
        <polygon
          className="kb-crown-gem"
          points="32,9 33.8,11.3 32,13.6 30.2,11.3"
          fill={tier.elixirBright}
          style={{ transformOrigin: "32px 11.3px" }}
        />
      </g>
    );
  }

  /* Geometric 2-facet sunburst rays behind/above upper hex edges */
  const outerRays = top === "rays-5";
  return (
    <g className="kb-rays">
      {outerRays && (
        <>
          <g className="kb-ray kb-ray-ol" style={{ transformOrigin: "18.5px 17.5px" }}>
            <polygon points="15.5,20.5 12,8.5 18.5,17.5" fill={tier.crownLight} />
            <polygon points="18.5,17.5 12,8.5 20.5,16.5" fill={tier.crownDark} />
          </g>
          <g className="kb-ray kb-ray-or" style={{ transformOrigin: "45.5px 17.5px" }}>
            <polygon points="48.5,20.5 52,8.5 45.5,17.5" fill={tier.crownDark} />
            <polygon points="45.5,17.5 52,8.5 43.5,16.5" fill={tier.crownLight} />
          </g>
        </>
      )}
      <g className="kb-ray kb-ray-il" style={{ transformOrigin: "24px 14.5px" }}>
        <polygon points="20.5,17.5 21.5,5.5 24,14.5" fill={tier.crownLight} />
        <polygon points="24,14.5 21.5,5.5 26.5,14" fill={tier.crownDark} />
      </g>
      <g className="kb-ray kb-ray-ir" style={{ transformOrigin: "40px 14.5px" }}>
        <polygon points="43.5,17.5 42.5,5.5 40,14.5" fill={tier.crownDark} />
        <polygon points="40,14.5 42.5,5.5 37.5,14" fill={tier.crownLight} />
      </g>
      <g className="kb-ray kb-ray-c" style={{ transformOrigin: "32px 13px" }}>
        <polygon points="28.5,14 32,2.5 32,12" fill={tier.crownLight} />
        <polygon points="35.5,14 32,2.5 32,12" fill={`url(#${gradCrown})`} />
      </g>
    </g>
  );
}

/**
 * Renders only active level gems (`1..count`) centered symmetrically along the prow or lower bevel
 * so low sub-levels (e.g. Level I) never render noisy dark sockets.
 */
function HexDiamondPips({
  count,
  tier,
  onProw,
}: {
  count: number;
  tier: HexTierPalette;
  onProw: boolean;
}) {
  const clamped = Math.max(1, Math.min(5, count));
  const yCenter = onProw ? 53.5 : 50.2;
  const spacing = 4.6;
  const pts = Array.from({ length: clamped }, (_, i) => {
    const offset = i - (clamped - 1) / 2;
    const cx = 32 + offset * spacing;
    const cy = yCenter - Math.abs(offset) * 1.15;
    return [cx, cy] as const;
  });

  return (
    <g className="kb-pips">
      {pts.map(([cx, cy], idx) => (
        <polygon
          key={idx}
          className={`kb-pip kb-pip-${idx}`}
          points={`${cx},${cy - 1.9} ${cx + 1.9},${cy} ${cx},${cy + 1.9} ${cx - 1.9},${cy}`}
          fill={tier.elixirBright}
          stroke="#140724"
          strokeWidth="0.65"
          strokeLinejoin="round"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
    </g>
  );
}

/**
 * Shared layered SVG geometry for Option 18 ("Progressive Hex Ascension")
 * and the Chiseled Hex-Bevel variants inside viewBox `0 0 64 64`.
 */
export function HexBadgeLayers({
  spec,
  tier,
  level,
  gradBevelLight,
  gradBevelDark,
  gradWell,
  gradElixir,
  gradCrown,
  clipLiquid,
  clipHexWell,
}: {
  spec: HexSpec;
  tier: HexTierPalette;
  level?: 1 | 2 | 3 | 4 | 5;
  gradBevelLight: string;
  gradBevelDark: string;
  gradWell: string;
  gradElixir: string;
  gradCrown: string;
  clipLiquid: string;
  clipHexWell: string;
}) {
  return (
    <>
      <HexWings count={spec.wings} tier={tier} />
      {(spec.top === "rays-3" || spec.top === "rays-5") && (
        <HexTopOverlay top={spec.top} tier={tier} gradCrown={gradCrown} />
      )}

      <g className="kb-frame">
        {spec.tails && (
          <g className="kb-tails">
            <g className="kb-tail kb-tail-l" style={{ transformOrigin: "24.5px 52px" }}>
              <polygon points="24,49 17.5,60 24.5,53.5" fill={tier.crownLight} />
              <polygon points="24.5,53.5 17.5,60 27.5,54.5" fill={tier.crownDark} />
            </g>
            <g className="kb-tail kb-tail-r" style={{ transformOrigin: "39.5px 52px" }}>
              <polygon points="40,49 46.5,60 39.5,53.5" fill={tier.crownDark} />
              <polygon points="39.5,53.5 46.5,60 36.5,54.5" fill={tier.crownLight} />
            </g>
          </g>
        )}

        {/* Base Hexagon Frame & 6 Chamfered Bevel Trapezoids (clockwise from top-left) */}
        <polygon
          className="kb-hex-base"
          points="32,11.5 49.5,21.5 49.5,42.5 32,52.5 14.5,42.5 14.5,21.5"
          fill={tier.metalDark}
          stroke="#120720"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        <polygon className="kb-bevel kb-bevel-0" points="32,11.5 14.5,21.5 18.2,24 32,16" fill={tier.metalLight} />
        <polygon className="kb-bevel kb-bevel-1" points="32,11.5 49.5,21.5 45.8,24 32,16" fill={`url(#${gradBevelLight})`} />
        <polygon className="kb-bevel kb-bevel-2" points="49.5,21.5 49.5,42.5 45.8,40 45.8,24" fill={`url(#${gradBevelDark})`} />
        <polygon className="kb-bevel kb-bevel-3" points="49.5,42.5 32,52.5 32,48 45.8,40" fill={tier.metalDark} />
        <polygon className="kb-bevel kb-bevel-4" points="14.5,42.5 32,52.5 32,48 18.2,40" fill={`url(#${gradBevelDark})`} />
        <polygon className="kb-bevel kb-bevel-5" points="14.5,21.5 14.5,42.5 18.2,40 18.2,24" fill={`url(#${gradBevelLight})`} />

        {/* Subtle Inner Lip + Recessed Enamel Field */}
        <polygon
          className="kb-well"
          points="32,16 45.8,24 45.8,40 32,48 18.2,40 18.2,24"
          fill={`url(#${gradWell})`}
          stroke={tier.metalLight}
          strokeWidth="0.85"
          strokeOpacity="0.85"
          strokeLinejoin="round"
        />

        {/* Dormant perimeter specular beam along the chamfered hex ridge (opacity 0 unless animated) */}
        <polygon
          className="kb-bevel-trace"
          points="32,13.8 47.6,22.8 47.6,41.2 32,50.2 16.4,41.2 16.4,22.8"
          pathLength={1}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0"
        />

        {/* Tall Vertical Cheek Plates */}
        {(spec.armor === "cheek-prow" || spec.armor === "bastion-cheek") &&
          [false, true].map((mirrored) => (
            <g
              key={mirrored ? "cr" : "cl"}
              transform={mirrored ? "translate(64, 0) scale(-1, 1)" : undefined}
            >
              <g className={mirrored ? "kb-cheek kb-cheek-r" : "kb-cheek kb-cheek-l"}>
                <polygon points="11.8,23.5 14.2,21.8 14.2,41.5 11.8,43.2" fill={tier.metalLight} />
                <polygon points="14.2,21.8 16.5,20 16.5,40 14.2,41.5" fill={tier.metalMid} />
                <polyline
                  className="kb-cheek-rim"
                  pathLength={1}
                  points="11.8,43.2 11.8,23.5 16.5,20"
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity="0.35"
                  strokeWidth="0.6"
                />
              </g>
            </g>
          ))}

        {/* Corner Chevron Armor */}
        {(spec.armor === "bastion" || spec.armor === "bastion-cheek") &&
          [false, true].map((mirrored) => (
            <g
              key={mirrored ? "br" : "bl"}
              transform={mirrored ? "translate(64, 0) scale(-1, 1)" : undefined}
            >
              <g className={mirrored ? "kb-bastion kb-bastion-r" : "kb-bastion kb-bastion-l"}>
                <polygon points="12.2,33.5 15.8,35.5 15.8,42 23.5,46.8 21.8,50.5 12.2,44.5" fill={tier.metalMid} />
                <polygon points="12.2,33.5 15.8,35.5 15.8,42 12.2,44.5" fill={tier.metalLight} opacity="0.85" />
              </g>
            </g>
          ))}

        {/* Bottom Armored V-Prow */}
        {spec.armor === "cheek-prow" && (
          <g className="kb-prow" style={{ transformOrigin: "32px 51px" }}>
            <polygon points="21.8,46 32,51.2 32,57.5 21.8,51.5" fill={tier.metalMid} />
            <polygon points="21.8,46 32,51.2 32,53.8 21.8,48.8" fill={tier.metalLight} />
            <polygon points="42.2,46 32,51.2 32,57.5 42.2,51.5" fill={tier.metalDark} />
            <polyline
              points="21.8,51.5 32,57.5 42.2,51.5"
              fill="none"
              stroke="#120720"
              strokeWidth="0.7"
              strokeOpacity="0.65"
            />
          </g>
        )}
      </g>

      {(spec.top === "cap" || spec.top === "battlements" || spec.top === "crown") && (
        <HexTopOverlay top={spec.top} tier={tier} gradCrown={gradCrown} />
      )}

      {/* ==================== CORE EMBLEMS ==================== */}
      {spec.core === "crown-drop" && (
        <>
          <g className="kb-crown" style={{ transformOrigin: "32px 26px" }}>
            <polygon className="kb-crown-l" points="23.5,28 22.2,21 27.5,24 32,19 32,28" fill={tier.crownLight} />
            <polygon className="kb-crown-r" points="40.5,28 41.8,21 36.5,24 32,19 32,28" fill={tier.crownDark} />
          </g>
          <g className="kb-core">
            <polygon points="32,29.5 39,37 32,45 25,37" fill={tier.elixirDeep} />
            <g clipPath={`url(#${clipLiquid})`}>
              <g className="kb-liquid">
                <rect x="23" y="33.5" width="18" height="14" fill={`url(#${gradElixir})`} />
                <ellipse
                  cx="32"
                  cy="33.8"
                  rx="6.2"
                  ry="1.5"
                  fill={tier.elixirBright}
                  opacity="0.9"
                />
              </g>
              <g className="kb-bubbles">
                <circle className="kb-b1" cx="29.5" cy="39" r="1.2" fill="#ffffff" opacity="0.85" />
                <circle className="kb-b2" cx="34" cy="40.5" r="1" fill="#ffffff" opacity="0.9" />
              </g>
            </g>
            <polygon className="kb-table-flash" points="32,29.5 25,37 29.2,37 32,33.2" fill="#ffffff" opacity="0.32" />
          </g>
        </>
      )}

      {spec.core === "diamond" && (
        <g className="kb-core">
          {/* Dark outer halo separating the gem cleanly from the inner well & frame */}
          <polygon
            points="32,16.5 44.5,32 32,47.5 19.5,32"
            fill={`url(#${gradElixir})`}
            stroke="#060d1c"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <g clipPath={`url(#${clipLiquid})`}>
            {/* 4 Full-Span Outer Cut Bevel Facets (clockwise from top-left) */}
            <polygon className="kb-facet kb-facet-0" points="32,16.5 19.5,32 25.5,32 32,23" fill={tier.elixirBright} opacity="0.88" />
            <polygon className="kb-facet kb-facet-1" points="32,16.5 44.5,32 38.5,32 32,23" fill={tier.elixirMid} opacity="0.72" />
            <polygon className="kb-facet kb-facet-2" points="44.5,32 32,47.5 32,41 38.5,32" fill="#060d1c" opacity="0.52" />
            <polygon className="kb-facet kb-facet-3" points="19.5,32 32,47.5 32,41 25.5,32" fill={tier.elixirDeep} opacity="0.68" />

            {/* Subtle living liquid sheen clipped inside gem without clipping the upper tip dark */}
            <g className="kb-liquid">
              <rect x="18" y="30" width="28" height="20" fill={tier.elixirBright} opacity="0.16" />
              <ellipse cx="32" cy="30.2" rx="10.5" ry="1.8" fill="#ffffff" opacity="0.22" />
            </g>
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="29" cy="35" r="1.4" fill="#ffffff" opacity="0.75" />
              <circle className="kb-b2" cx="34.5" cy="36.5" r="1.1" fill="#ffffff" opacity="0.82" />
            </g>
          </g>

          {/* Raised Luminous Center Diamond Table & Cut Crease Ribs */}
          <g className="kb-gem-table" style={{ transformOrigin: "32px 32px" }}>
            <polygon
              points="32,23 38.5,32 32,41 25.5,32"
              fill={`url(#${gradElixir})`}
              stroke="#ffffff"
              strokeOpacity="0.65"
              strokeWidth="0.95"
              strokeLinejoin="round"
            />
            <polygon className="kb-table-flash" points="32,23 25.5,32 32,32 35.2,27.5" fill="#ffffff" opacity="0.35" />
          </g>
          <path
            className="kb-gem-ribs"
            pathLength={1}
            d="M32 16.5 V23 M44.5 32 H38.5 M32 47.5 V41 M19.5 32 H25.5"
            stroke="#ffffff"
            strokeOpacity="0.5"
            strokeWidth="0.85"
          />
          <polyline
            className="kb-gem-rim"
            pathLength={1}
            points="21.5,31.2 32,18 37.5,24.8"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
          />
        </g>
      )}

      {spec.core === "radial-matrix" && (
        <g className="kb-core">
          <g clipPath={`url(#${clipLiquid})`}>
            {/* 6 Radial Faceted Crystal Matrix Planes (clockwise from top-left) */}
            <polygon className="kb-facet kb-facet-0" points="32,16 18.2,24 25.5,28.2 32,24.5" fill={tier.elixirBright} />
            <polygon className="kb-facet kb-facet-1" points="32,16 45.8,24 38.5,28.2 32,24.5" fill={tier.elixirMid} />
            <polygon className="kb-facet kb-facet-2" points="45.8,24 45.8,40 38.5,35.8 38.5,28.2" fill={tier.elixirDeep} />
            <polygon className="kb-facet kb-facet-3" points="45.8,40 32,48 32,39.5 38.5,35.8" fill={tier.wellDark} />
            <polygon className="kb-facet kb-facet-4" points="18.2,40 32,48 32,39.5 25.5,35.8" fill={tier.elixirDeep} />
            <polygon className="kb-facet kb-facet-5" points="18.2,24 18.2,40 25.5,35.8 25.5,28.2" fill={tier.elixirMid} />

            {/* Subtle diagonal facet split lines matching reference crystal */}
            <path
              className="kb-gem-ribs"
              pathLength={1}
              d="M32 16 V24.5 M45.8 24 L38.5 28.2 M45.8 40 L38.5 35.8 M32 48 V39.5 M18.2 40 L25.5 35.8 M18.2 24 L25.5 28.2"
              stroke="#ffffff"
              strokeOpacity="0.22"
              strokeWidth="0.7"
            />
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="29.2" cy="34" r="1.2" fill="#ffffff" opacity="0.65" />
              <circle className="kb-b2" cx="34.8" cy="31.5" r="1.1" fill="#ffffff" opacity="0.72" />
            </g>
          </g>

          {/* Center Raised Crystal Table */}
          <g className="kb-gem-table" style={{ transformOrigin: "32px 32px" }}>
            <polygon
              points="32,24.5 38.5,28.2 38.5,35.8 32,39.5 25.5,35.8 25.5,28.2"
              fill={`url(#${gradElixir})`}
              stroke="#ffffff"
              strokeOpacity="0.4"
              strokeWidth="0.8"
            />
          </g>
          <polyline
            className="kb-gem-rim"
            pathLength={1}
            points="25.5,34.5 25.5,28.2 32,24.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.92"
          />
        </g>
      )}

      {spec.core === "keep-arch" && (
        <>
          <polygon
            points="23.5,45 23.5,27 26.5,27 26.5,23 30,23 30,25.5 34,25.5 34,23 37.5,23 37.5,27 40.5,27 40.5,45"
            fill={tier.metalMid}
          />
          <polygon points="23.5,45 23.5,27 26.5,27 26.5,23 30,23 30,45" fill={tier.metalLight} opacity="0.6" />
          <polygon points="34,45 34,25.5 37.5,23 37.5,27 40.5,27 40.5,45" fill={tier.metalDark} opacity="0.55" />

          <g className="kb-core">
            <polygon points="27.2,45 27.2,34.5 32,29.5 36.8,34.5 36.8,45" fill={tier.elixirDeep} />
            <g clipPath={`url(#${clipLiquid})`}>
              <g className="kb-liquid">
                <rect x="24" y="34.5" width="16" height="12" fill={`url(#${gradElixir})`} />
                <ellipse
                  cx="32"
                  cy="34.8"
                  rx="5"
                  ry="1.3"
                  fill={tier.elixirBright}
                  opacity="0.9"
                />
              </g>
              <g className="kb-bubbles">
                <circle className="kb-b1" cx="30.5" cy="40.5" r="1.2" fill="#ffffff" opacity="0.82" />
                <circle className="kb-b2" cx="33.8" cy="42" r="1" fill="#ffffff" opacity="0.88" />
              </g>
            </g>
            <line
              className="kb-gem-rim"
              pathLength={1}
              x1="29"
              y1="40.5"
              x2="29"
              y2="35"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>
        </>
      )}

      {spec.core === "flask" && (
        <g className="kb-core">
          <polygon
            className="kb-flask-body"
            points="29,21.5 35,21.5 35,26 40.5,32.5 37.5,43.5 26.5,43.5 23.5,32.5 29,26"
            fill={tier.elixirDeep}
            stroke={tier.metalLight}
            strokeWidth="0.95"
            strokeLinejoin="round"
          />
          <g clipPath={`url(#${clipLiquid})`}>
            <g className="kb-liquid">
              <rect x="21" y="31" width="22" height="15" fill={`url(#${gradElixir})`} />
              <ellipse
                cx="32"
                cy="31.3"
                rx="8"
                ry="1.7"
                fill={tier.elixirBright}
                opacity="0.92"
              />
            </g>
            <g className="kb-bubbles">
              <circle className="kb-b1" cx="29.5" cy="36.5" r="1.4" fill="#ffffff" opacity="0.82" />
              <circle className="kb-b2" cx="34.2" cy="38.5" r="1.2" fill="#ffffff" opacity="0.85" />
              <circle className="kb-b3" cx="31.5" cy="34" r="0.95" fill="#ffffff" opacity="0.92" />
            </g>
          </g>
          <rect
            className="kb-cork"
            x="27.8"
            y="19.2"
            width="8.4"
            height="2.8"
            rx="0.9"
            fill={`url(#${gradCrown})`}
            style={{ transformOrigin: "28.5px 22px" }}
          />
          <polyline
            className="kb-gem-rim"
            pathLength={1}
            points="26,32.2 29.8,26.5"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>
      )}

      {level !== undefined && <HexDiamondPips count={level} tier={tier} onProw={spec.onProw} />}

      <g clipPath={`url(#${clipHexWell})`}>
        <rect className="kb-glint" x="24" y="16" width="8" height="32" fill="#ffffff" opacity="0" />
      </g>

      {/* Dormant diamond pinpoint sparkles (opacity 0 unless animated by motion study) */}
      <g className="kb-sparks" aria-hidden="true">
        <path
          className="kb-spark kb-spark-0"
          d="M24.5 18.2 L25.3 20.7 L27.8 21.5 L25.3 22.3 L24.5 24.8 L23.7 22.3 L21.2 21.5 L23.7 20.7 Z"
          fill="#ffffff"
          opacity="0"
          style={{ transformOrigin: "24.5px 21.5px" }}
        />
        <path
          className="kb-spark kb-spark-1"
          d="M40.5 19.2 L41.1 21.1 L43 21.7 L41.1 22.3 L40.5 24.2 L39.9 22.3 L38 21.7 L39.9 21.1 Z"
          fill={tier.elixirBright}
          opacity="0"
          style={{ transformOrigin: "40.5px 21.7px" }}
        />
      </g>
    </>
  );
}

/**
 * Shared <clipPath> shape definitions matched to the active HexCoreKind inside viewBox `0 0 64 64`.
 */
export function HexCoreClipShape({ core }: { core: HexCoreKind }) {
  switch (core) {
    case "crown-drop":
      return <polygon points="32,29.5 39,37 32,45 25,37" />;
    case "diamond":
      return <polygon points="32,16.5 44.5,32 32,47.5 19.5,32" />;
    case "radial-matrix":
      return <polygon points="32,16 45.8,24 45.8,40 32,48 18.2,40 18.2,24" />;
    case "keep-arch":
      return <polygon points="27.2,45 27.2,34.5 32,29.5 36.8,34.5 36.8,45" />;
    case "flask":
      return <polygon points="29,21.5 35,21.5 35,26 40.5,32.5 37.5,43.5 26.5,43.5 23.5,32.5 29,26" />;
  }
}

/**
 * Standalone Progressive Hex Ascension SVG badge used across production UI (`VipBadge`).
 */
export function ProgressiveHexBadgeSvg({
  tierIndex,
  level,
  alt,
  className = "block size-full overflow-visible",
  tierOverride,
  specOverride,
  width,
  height,
}: {
  tierIndex: number;
  level?: 1 | 2 | 3 | 4 | 5;
  alt: string;
  className?: string;
  tierOverride?: HexTierPalette;
  specOverride?: HexSpec;
  width?: number;
  height?: number;
}) {
  const uid = useId().replace(/:/g, "");
  const tier = tierOverride ?? VIP_TIERS[Math.max(0, Math.min(VIP_TIERS.length - 1, tierIndex))];
  const spec = specOverride ?? resolveProgressiveHexSpec(tier.level);

  const gradBevelLight = `bl-${uid}`;
  const gradBevelDark = `bd-${uid}`;
  const gradWell = `w-${uid}`;
  const gradElixir = `e-${uid}`;
  const gradCrown = `c-${uid}`;
  const clipLiquid = `cl-${uid}`;
  const clipHexWell = `chw-${uid}`;

  const hasGlow = Boolean(
    tier.glow &&
      tier.glow !== "transparent" &&
      !/,\s*0(?:\.0+)?\s*\)$/.test(tier.glow)
  );

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
        filter: hasGlow
          ? `drop-shadow(0 5px 10px rgba(3, 1, 10, 0.78)) drop-shadow(0 0 7px ${tier.glow})`
          : "drop-shadow(0 5px 10px rgba(3, 1, 10, 0.78))",
      }}
    >
      <defs>
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
          <HexCoreClipShape core={spec.core} />
        </clipPath>
      </defs>

      <HexBadgeLayers
        spec={spec}
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
    </svg>
  );
}
