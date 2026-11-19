"use client";

import { useState } from "react";
import Link from "next/link";

type SurfaceId = "sidebar" | "darker" | "black" | "light";
type ColorMode = "brand" | "mono";

interface LogoVariant {
  id: string;
  number: string;
  name: string;
  fontLabel: string;
  principle: string;
  rationale: string;
  renderLockup: (opts: { mono: boolean; light: boolean }) => React.ReactNode;
  renderIcon: (opts: { mono: boolean; light: boolean }) => React.ReactNode;
}

const SURFACES: { id: SurfaceId; label: string; bg: string; border: string; light: boolean }[] = [
  { id: "sidebar", label: "Sidebar (#2a1d42)", bg: "#2a1d42", border: "rgba(196,181,253,0.18)", light: false },
  { id: "darker", label: "Canvas (#140d24)", bg: "#140d24", border: "rgba(196,181,253,0.14)", light: false },
  { id: "black", label: "Obsidian (#09090b)", bg: "#09090b", border: "rgba(255,255,255,0.10)", light: false },
  { id: "light", label: "Light (#f8fafc)", bg: "#f8fafc", border: "rgba(15,23,42,0.12)", light: true },
];

const GREEN = "#5ef439";
const GREEN_LIGHT_BG = "#16a34a";
const PURPLE = "#a855f7";

function getColors(mono: boolean, light: boolean) {
  const ink = light ? "#11101d" : "#f2f3f7";
  const accent = mono ? ink : light ? GREEN_LIGHT_BG : GREEN;
  const secondary = mono ? ink : PURPLE;
  const gold = mono ? ink : light ? "#d97706" : "#facc15";
  const cutout = light ? "#f8fafc" : "#140d24";
  return { ink, accent, secondary, gold, cutout };
}

/* Shared reusable marks for clean agency-grade consistency */
const SwissFlaskSvg = ({ accent, className = "w-full h-full" }: { accent: string; className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <rect x="20" y="6" width="24" height="6" rx="2.2" fill={accent} />
    <path
      fill={accent}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 14 H40 V25 L54 49 C56.2 52.8 53.5 58 49 58 H15 C10.5 58 7.8 52.8 10 49 L24 25 V14 Z M29 19 V26.5 L20.2 41.5 C25 43.2 31 41.8 36 39.2 C39.2 37.5 41.8 36.8 44 37.2 L35 26.5 V19 H29 Z M28 49.5 A3.5 3.5 0 1 0 28 42.5 A3.5 3.5 0 1 0 28 49.5 Z"
    />
    <circle cx="34.5" cy="31.5" r="2.6" fill={accent} />
  </svg>
);

const PureDropSvg = ({ accent, className = "w-full h-full" }: { accent: string; className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <path
      fill={accent}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 6 C32 6 52 27.5 52 40.5 C52 51.3 43 58 32 58 C21 58 12 51.3 12 40.5 C12 27.5 32 6 32 6 Z M26 46.5 A4.5 4.5 0 1 0 26 37.5 A4.5 4.5 0 1 0 26 46.5 Z M34.5 35.5 A2.5 2.5 0 1 0 34.5 30.5 A2.5 2.5 0 1 0 34.5 35.5 Z"
    />
  </svg>
);

const SlimeMascotSvg = ({
  accent,
  gold,
  eye,
  mono,
  className = "w-full h-full",
}: {
  accent: string;
  gold: string;
  eye: string;
  mono: boolean;
  className?: string;
}) => (
  <svg viewBox="0 0 64 64" className={className} fill="none">
    <g transform="rotate(-10 32 14)">
      <path fill={gold} d="M21 19 L19 9 L26.5 13.5 L32 6.5 L37.5 13.5 L45 9 L43 19 Z" />
      <circle cx="32" cy="5.8" r="1.8" fill={gold} />
    </g>
    <path fill={accent} d="M32 18 C46 18 55 29 55 43 C55 52.5 48 56 38 56 H26 C16 56 9 52.5 9 43 C9 29 18 18 32 18 Z" />
    <ellipse cx="21" cy="30" rx="4.2" ry="2.4" transform="rotate(-32 21 30)" fill="#ffffff" opacity={mono ? 0.25 : 0.45} />
    <circle cx="24.5" cy="37" r="3.4" fill={eye} />
    <circle cx="39.5" cy="37" r="3.4" fill={eye} />
    <circle cx="25.6" cy="35.8" r="1.2" fill="#ffffff" />
    <circle cx="40.6" cy="35.8" r="1.2" fill="#ffffff" />
    <path d="M26 44.5 Q32 50 38 44.5" stroke={eye} strokeWidth="3.2" strokeLinecap="round" fill="none" />
  </svg>
);

const VARIANTS: LogoVariant[] = [
  /* ===================== KEPT FAVORITES (01–10) ===================== */
  {
    id: "v1-traced-baseline",
    number: "01",
    name: "Flask & Drop Baseline",
    fontLabel: "Custom Geometric",
    principle: "Optical Weight Parity",
    rationale:
      "The exact traced flask-and-drop lockup. Balances a bold organic flask silhouette against heavy geometric ELIXIR caps with equal visual mass.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 248.2 248.2" className="w-full h-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M72.6 16.6 L118.1 16.3 Q163.5 16.0 165.5 16.1 L167.5 16.3 L168.5 17.5 L168.3 31.6 L163.4 32.1 Q158.5 32.5 157.7 33.1 L156.9 33.6 L156.7 72.6 L186.0 115.6 L171.6 144.1 Q157.3 172.6 154.3 180.1 Q151.3 187.6 150.5 191.1 Q149.7 194.6 149.5 199.1 Q149.3 203.6 150.3 208.6 Q151.3 213.6 153.3 218.1 Q155.3 222.6 158.2 226.6 L161.1 230.6 L160.5 231.9 L54.5 232.0 L49.0 224.7 Q43.5 217.4 39.5 209.5 Q35.5 201.6 33.5 195.9 Q31.5 190.1 30.4 182.9 Q29.2 175.6 29.4 168.6 Q29.6 161.6 31.6 154.5 Q33.5 147.4 37.5 140.0 Q41.5 132.5 62.8 102.6 L84.0 72.6 L84.1 34.6 L82.5 32.7 L72.6 31.6 Z M102.5 32.6 L101.7 34.1 Q100.8 35.6 100.7 57.5 L100.5 79.3 L79.9 108.0 Q59.2 136.6 58.7 138.1 L58.2 139.6 L59.8 140.7 Q61.5 141.7 70.5 143.6 Q79.5 145.6 88.0 144.8 Q96.5 144.0 105.5 140.9 Q114.5 137.8 128.5 131.2 Q142.4 124.6 150.0 122.8 Q157.5 120.9 163.0 120.3 L168.4 119.6 L140.1 78.6 L139.3 33.6 L138.4 33.1 Q137.5 32.5 120.0 32.5 L102.5 32.6 Z M120.5 115.7 L117.4 115.7 Q114.2 115.6 112.4 114.5 Q110.5 113.4 109.0 111.3 Q107.5 109.2 107.5 105.3 Q107.5 101.5 108.5 100.0 Q109.5 98.4 111.7 97.0 Q113.8 95.6 116.7 95.3 Q119.5 95.0 121.5 95.9 Q123.5 96.8 125.2 98.7 Q126.8 100.6 127.3 103.1 Q127.8 105.6 127.2 108.1 Q126.7 110.6 123.6 113.2 L120.5 115.7 Z M195.1 129.6 L196.5 129.5 L197.5 131.3 Q198.5 133.1 208.5 152.3 Q218.5 171.6 222.5 180.9 Q226.5 190.1 227.4 194.9 Q228.3 199.6 227.4 205.3 Q226.5 211.0 223.3 216.3 Q220.1 221.6 214.7 225.6 Q209.3 229.6 206.5 230.6 Q203.8 231.6 200.6 231.9 Q197.5 232.2 192.5 231.9 Q187.5 231.6 183.1 229.6 Q178.6 227.6 176.0 225.6 Q173.4 223.6 169.5 217.9 Q165.5 212.2 164.4 206.4 Q163.3 200.6 164.4 194.7 Q165.5 188.8 167.5 183.8 Q169.5 178.8 178.5 160.6 Q187.5 142.5 191.3 136.1 L195.1 129.6 Z M130.0 151.9 Q126.5 151.6 124.2 152.1 Q121.8 152.6 118.7 155.4 Q115.5 158.2 114.3 160.9 Q113.2 163.6 113.1 166.1 Q113.0 168.6 115.3 173.2 Q117.5 177.7 121.0 179.7 Q124.5 181.7 127.0 181.8 Q129.5 182.0 132.9 180.8 Q136.3 179.6 138.4 177.6 Q140.6 175.6 141.8 173.1 Q142.9 170.6 143.1 167.6 Q143.2 164.6 142.1 161.6 Q141.1 158.6 139.2 156.6 Q137.4 154.6 135.5 153.4 Q133.5 152.2 130.0 151.9 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 927.7 240.2" className="h-12 w-auto max-w-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M55.4 12.6 L100.9 12.3 Q146.3 12.0 148.3 12.1 L150.3 12.3 L151.3 13.5 L151.1 27.6 L146.2 28.1 Q141.3 28.5 140.5 29.1 L139.7 29.6 L139.5 68.6 L168.8 111.6 L154.4 140.1 Q140.1 168.6 137.1 176.1 Q134.1 183.6 133.3 187.1 Q132.5 190.6 132.3 195.1 Q132.1 199.6 133.1 204.6 Q134.1 209.6 136.1 214.1 Q138.1 218.6 141.0 222.6 L143.9 226.6 L143.3 227.9 L37.3 228.0 L31.8 220.7 Q26.3 213.4 22.3 205.5 Q18.3 197.6 16.3 191.9 Q14.3 186.1 13.2 178.9 Q12.0 171.6 12.2 164.6 Q12.4 157.6 14.4 150.5 Q16.3 143.4 20.3 136.0 Q24.3 128.5 45.6 98.6 L66.8 68.6 L66.9 30.6 L65.3 28.7 L55.4 27.6 Z M85.3 28.6 L84.5 30.1 Q83.6 31.6 83.5 53.5 L83.3 75.3 L62.7 104.0 Q42.0 132.6 41.5 134.1 L41.0 135.6 L42.6 136.7 Q44.3 137.7 53.3 139.6 Q62.3 141.6 70.8 140.8 Q79.3 140.0 88.3 136.9 Q97.3 133.8 111.3 127.2 Q125.2 120.6 132.8 118.8 Q140.3 116.9 145.8 116.3 L151.2 115.6 L122.9 74.6 L122.1 29.6 L121.2 29.1 Q120.3 28.5 102.8 28.5 L85.3 28.6 Z M103.3 111.7 L100.2 111.7 Q97.0 111.6 95.2 110.5 Q93.3 109.4 91.8 107.3 Q90.3 105.2 90.3 101.3 Q90.3 97.5 91.3 96.0 Q92.3 94.4 94.5 93.0 Q96.6 91.6 99.5 91.3 Q102.3 91.0 104.3 91.9 Q106.3 92.8 108.0 94.7 Q109.6 96.6 110.1 99.1 Q110.6 101.6 110.0 104.1 Q109.5 106.6 106.4 109.2 L103.3 111.7 Z M177.9 125.6 L179.3 125.5 L180.3 127.3 Q181.3 129.1 191.3 148.3 Q201.3 167.6 205.3 176.9 Q209.3 186.1 210.2 190.9 Q211.1 195.6 210.2 201.3 Q209.3 207.0 206.1 212.3 Q202.9 217.6 197.5 221.6 Q192.1 225.6 189.3 226.6 Q186.6 227.6 183.4 227.9 Q180.3 228.2 175.3 227.9 Q170.3 227.6 165.9 225.6 Q161.4 223.6 158.8 221.6 Q156.2 219.6 152.3 213.9 Q148.3 208.2 147.2 202.4 Q146.1 196.6 147.2 190.7 Q148.3 184.8 150.3 179.8 Q152.3 174.8 161.3 156.6 Q170.3 138.5 174.1 132.1 L177.9 125.6 Z M112.8 147.9 Q109.3 147.6 107.0 148.1 Q104.6 148.6 101.5 151.4 Q98.3 154.2 97.1 156.9 Q96.0 159.6 95.9 162.1 Q95.8 164.6 98.1 169.2 Q100.3 173.7 103.8 175.7 Q107.3 177.7 109.8 177.8 Q112.3 178.0 115.7 176.8 Q119.1 175.6 121.2 173.6 Q123.4 171.6 124.6 169.1 Q125.7 166.6 125.9 163.6 Q126.0 160.6 124.9 157.6 Q123.9 154.6 122.0 152.6 Q120.2 150.6 118.3 149.4 Q116.3 148.2 112.8 147.9 Z"
          />
          <path
            fill={ink}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M256.5 51.6 L257.3 50.9 L365.3 51.0 L365.3 81.3 L295.3 81.6 L294.9 103.6 L296.3 104.8 L356.3 104.7 L357.4 105.6 L357.2 133.6 L295.3 134.4 L295.0 157.6 L296.3 159.1 L367.3 159.1 L367.8 160.4 Q368.3 161.6 368.3 175.1 Q368.3 188.6 367.9 189.1 L367.5 189.6 L257.2 189.6 L256.8 189.1 Q256.4 188.6 256.4 120.1 L256.5 51.6 Z M387.5 51.6 L388.3 50.9 L406.8 50.9 Q425.3 50.9 426.0 51.3 L426.8 51.6 L427.0 157.6 L493.3 158.2 L493.3 189.3 L388.3 189.6 L387.9 189.1 Q387.5 188.6 387.5 120.1 L387.5 51.6 Z M509.3 50.9 L527.8 50.9 Q546.3 50.9 547.1 51.3 L547.8 51.6 L547.3 189.4 L509.3 189.6 L509.1 189.1 Q508.8 188.6 508.8 120.1 Q508.8 51.6 509.1 51.3 L509.3 50.9 Z M563.0 51.6 L563.3 50.9 L607.3 51.4 L620.2 70.5 Q633.1 89.6 634.2 90.6 L635.3 91.6 L663.3 51.1 L705.3 50.8 L706.3 51.6 L658.8 118.6 L708.6 188.6 L708.3 189.5 L664.3 189.4 L634.3 146.9 L605.3 189.1 L561.3 189.7 L561.0 188.6 L610.8 118.6 Z M722.6 51.6 L723.3 50.9 L741.8 50.9 Q760.3 50.9 761.0 51.3 L761.7 51.6 L761.7 188.6 L761.0 189.1 Q760.3 189.5 741.8 189.6 L723.3 189.7 L722.4 188.6 Z M786.9 51.6 L787.6 51.3 Q788.3 50.9 826.3 51.1 Q864.3 51.3 872.8 53.3 Q881.3 55.2 886.3 57.7 Q891.3 60.2 895.9 63.9 Q900.5 67.6 904.0 72.6 Q907.6 77.6 909.6 83.1 Q911.7 88.6 912.3 93.1 Q912.8 97.6 912.3 105.1 Q911.8 112.6 910.2 117.6 Q908.5 122.6 906.1 126.6 Q903.6 130.6 899.5 134.9 Q895.3 139.1 891.0 141.9 L886.6 144.6 L915.7 188.6 L915.3 189.6 L874.3 189.6 L848.3 151.3 L827.3 151.2 L826.0 152.6 L826.0 170.6 Q826.0 188.6 825.7 189.1 L825.3 189.6 L787.3 189.5 Z M827.3 81.4 L826.0 82.6 L826.3 120.7 L840.3 120.8 Q854.3 120.9 859.3 119.5 Q864.3 118.1 867.0 115.9 Q869.7 113.6 871.3 110.6 Q872.8 107.6 873.3 103.1 Q873.7 98.6 872.6 95.1 Q871.5 91.6 869.4 89.0 Q867.3 86.4 862.8 84.3 Q858.3 82.2 842.8 81.8 L827.3 81.4 Z"
          />
        </svg>
      );
    },
  },
  {
    id: "v2-swiss-precision",
    number: "02",
    name: "Swiss Grid Erlenmeyer",
    fontLabel: "Hero Geometric",
    principle: "Uniform Stroke & Grid",
    rationale:
      "Constructed on a strict 8-unit grid with uniform wall thickness and a crisp diagonal liquid horizon for razor-sharp UI scaling.",
    renderIcon: ({ mono, light }) => <SwissFlaskSvg accent={getColors(mono, light).accent} />,
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3.5">
          <SwissFlaskSvg accent={accent} className="h-11 w-11 shrink-0" />
          <span
            style={{ color: ink, fontFamily: "var(--font-hero), sans-serif" }}
            className="text-[32px] font-black tracking-[0.06em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v3-gestalt-badge",
    number: "03",
    name: "Negative-Space Squircle",
    fontLabel: "Hero Geometric",
    principle: "Gestalt Figure-Ground",
    rationale:
      "Carves the potion flask out of a solid electric-green app-icon squircle. Maximizes silhouette punch at 16px-24px favicons and collapsed sidebars.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 4 H48 C54.6 4 60 9.4 60 16 V48 C60 54.6 54.6 60 48 60 H16 C9.4 60 4 54.6 4 48 V16 C4 9.4 9.4 4 16 4 Z M24 14 H40 V19 H37 V27 L47.5 43.5 C49.3 46.3 47.3 50 44 50 H20 C16.7 50 14.7 46.3 16.5 43.5 L27 27 V19 H24 V14 Z"
          />
          <circle cx="30" cy="41.5" r="3.2" fill={accent} />
          <circle cx="35.5" cy="34.5" r="2" fill={accent} />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3.5">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 4 H48 C54.6 4 60 9.4 60 16 V48 C60 54.6 54.6 60 48 60 H16 C9.4 60 4 54.6 4 48 V16 C4 9.4 9.4 4 16 4 Z M24 14 H40 V19 H37 V27 L47.5 43.5 C49.3 46.3 47.3 50 44 50 H20 C16.7 50 14.7 46.3 16.5 43.5 L27 27 V19 H24 V14 Z"
            />
            <circle cx="30" cy="41.5" r="3.2" fill={accent} />
            <circle cx="35.5" cy="34.5" r="2" fill={accent} />
          </svg>
          <span
            style={{ color: ink, fontFamily: "var(--font-hero), sans-serif" }}
            className="text-[33px] font-black tracking-[-0.02em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v5-e-monogram",
    number: "04",
    name: "Alchemical E-Monogram",
    fontLabel: "Hero Geometric",
    principle: "Dual-Meaning Lettermark",
    rationale:
      "Fuses the initial E with a bubbling elixir vessel. Three horizontal bars evoke liquid tiers while a droplet anchors the middle stroke.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path fill={accent} d="M12 10 H50 L44 21 H23 V26.5 H38 L33 37.5 H23 V43 H52 L46 54 H18 C14.7 54 12 51.3 12 48 V10 Z" />
          <path fill={accent} d="M47 22 C47 22 54 30.2 54 34.5 C54 38.4 50.9 41.5 47 41.5 C43.1 41.5 40 38.4 40 34.5 C40 30.2 47 22 47 22 Z" />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3.5">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <path fill={accent} d="M12 10 H50 L44 21 H23 V26.5 H38 L33 37.5 H23 V43 H52 L46 54 H18 C14.7 54 12 51.3 12 48 V10 Z" />
            <path fill={accent} d="M47 22 C47 22 54 30.2 54 34.5 C54 38.4 50.9 41.5 47 41.5 C43.1 41.5 40 38.4 40 34.5 C40 30.2 47 22 47 22 Z" />
          </svg>
          <span
            style={{ color: ink, fontFamily: "var(--font-hero), sans-serif" }}
            className="text-[33px] font-black tracking-[0.03em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v9-pure-drop",
    number: "05",
    name: "Pure Drop Reduction",
    fontLabel: "Hero Geometric",
    principle: "Paul Rand Simplification",
    rationale:
      "Distills Elixir to a single unmistakable geometric drop with rising sparkle cutouts. Zero visual noise and maximum clarity at 16px.",
    renderIcon: ({ mono, light }) => <PureDropSvg accent={getColors(mono, light).accent} />,
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <PureDropSvg accent={accent} className="h-11 w-11 shrink-0" />
          <span
            style={{ color: ink, fontFamily: "var(--font-hero), sans-serif" }}
            className="text-[33px] font-black tracking-[0.05em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v15-slime-king",
    number: "06",
    name: "Crowned Slime Mascot",
    fontLabel: "Hero Geometric",
    principle: "Playful Kingdom Mascot",
    rationale:
      "Turns the King's joyful crowned slime companion into a crisp vector character mark with bold eyes, a tilted gold crown, and instant recall.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold, cutout } = getColors(mono, light);
      return <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} />;
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold, cutout } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} className="h-12 w-12 shrink-0" />
          <span
            style={{ color: ink, fontFamily: "var(--font-hero), sans-serif" }}
            className="text-[33px] font-black tracking-[0.04em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v19-lilita-drip",
    number: "07",
    name: "Playful Potion Drip",
    fontLabel: "Lilita One",
    principle: "Chunky Display + Drip",
    rationale:
      "Plump Lilita One lettering with a tilted gold crown perched on the E and a glowing green potion droplet hanging from the X.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <g transform="rotate(-12 24 14)">
            <path fill={gold} d="M13 18 L11 9 L19 13.5 L24 7 L29 13.5 L37 9 L35 18 Z" />
          </g>
          <path fill={accent} d="M18 22 H46 V30 H27 V36 H42 V44 H27 V50 H46 V58 H18 Z" />
          <path fill={accent} d="M41 56 C41 56 45 61 45 62.5 C45 64 43.2 64 41 64 C38.8 64 37 64 37 62.5 C37 61 41 56 41 56 Z" />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3 pt-2">
          <SwissFlaskSvg accent={accent} className="h-11 w-11 shrink-0" />
          <div className="relative flex items-baseline">
            <svg viewBox="0 0 36 22" className="pointer-events-none absolute -left-2 -top-3.5 h-5 w-7 -rotate-12" fill="none">
              <path fill={gold} d="M4 19 L2 6 L11.5 12 L18 3 L24.5 12 L34 6 L32 19 Z" />
            </svg>
            <span
              style={{
                color: ink,
                fontFamily: "'LogoLilitaOne', var(--font-hero), sans-serif",
                textShadow: light ? "none" : "0 3px 0 rgba(14, 7, 28, 0.9)",
              }}
              className="text-[38px] tracking-[0.04em] leading-none"
            >
              ELI
              <span className="relative inline-block" style={{ color: accent }}>
                X
                <svg viewBox="0 0 14 14" className="pointer-events-none absolute left-1/2 -bottom-2.5 h-3 w-3 -translate-x-1/2" fill="none">
                  <path fill={accent} d="M7 0 C7 0 12 6.2 12 9.2 C12 11.8 9.8 14 7 14 C4.2 14 2 11.8 2 9.2 C2 6.2 7 0 7 0 Z" />
                </svg>
              </span>
              IR
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "v20-titan-kingdom",
    number: "08",
    name: "Storybook Bubble Stamp",
    fontLabel: "Titan One",
    principle: "3D Extruded Kingdom Type",
    rationale:
      "Pairs Titan One's chunky storybook curves with a crisp 3D depth shadow and the Crowned Slime mascot for flagship game-studio warmth.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold, cutout } = getColors(mono, light);
      return <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} />;
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold, cutout } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} className="h-12 w-12 shrink-0" />
          <span
            style={{
              color: ink,
              fontFamily: "'LogoTitanOne', var(--font-hero), sans-serif",
              textShadow: light ? "0 2px 0 rgba(15,23,42,0.18)" : "0 4px 0 #140d24, 0 6px 14px rgba(0,0,0,0.5)",
            }}
            className="text-[35px] tracking-[0.03em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v22-fredoka-bubbles",
    number: "09",
    name: "Bubbly Lowercase Elixir",
    fontLabel: "Fredoka Bold",
    principle: "Soft Rounded + Potion Tittles",
    rationale:
      "Friendly Fredoka rounded lowercase wordmark where both dots of the i's become glowing emerald potion bubbles.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path fill={gold} d="M19 19 L17 9 L25 14 L32 6 L39 14 L47 9 L45 19 Z" />
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 21 H40 V29 L53.5 49.5 C55.6 52.8 53.2 58 48.8 58 H15.2 C10.8 58 8.4 52.8 10.5 49.5 L24 29 V21 Z M28.5 50.5 A3.5 3.5 0 1 0 28.5 43.5 A3.5 3.5 0 1 0 28.5 50.5 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <path fill={gold} d="M19 19 L17 9 L25 14 L32 6 L39 14 L47 9 L45 19 Z" />
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 21 H40 V29 L53.5 49.5 C55.6 52.8 53.2 58 48.8 58 H15.2 C10.8 58 8.4 52.8 10.5 49.5 L24 29 V21 Z M28.5 50.5 A3.5 3.5 0 1 0 28.5 43.5 A3.5 3.5 0 1 0 28.5 50.5 Z"
            />
          </svg>
          <span
            style={{ color: ink, fontFamily: "'LogoFredoka', var(--font-hero), sans-serif" }}
            className="text-[40px] font-bold tracking-[-0.01em] leading-none"
          >
            el
            <span className="relative inline-block">
              ı
              <span className="absolute left-1/2 top-[3px] size-2.5 -translate-x-1/2 rounded-full" style={{ backgroundColor: accent }} />
            </span>
            x
            <span className="relative inline-block">
              ı
              <span className="absolute left-1/2 top-[3px] size-2.5 -translate-x-1/2 rounded-full" style={{ backgroundColor: accent }} />
            </span>
            r
          </span>
        </div>
      );
    },
  },

  /* ===================== 10 NEW AGENCY TYPOGRAPHIC VARIATIONS (11–20) ===================== */
  {
    id: "v23-baloo-pill-flask",
    number: "10",
    name: "Soft Rounded Alchemist",
    fontLabel: "Baloo 2 ExtraBold",
    principle: "Matching Corner Radii",
    rationale:
      "Every terminal on the plump Baloo 2 wordmark mirrors the exact rounded radius of the soft-shouldered potion flask. Creates effortless optical harmony across UI and merch.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <rect x="21" y="7" width="22" height="7" rx="3.5" fill={accent} />
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25 16 H39 V25 C47.5 28.5 52 36 52 43.5 C52 52.5 44 58 32 58 C20 58 12 52.5 12 43.5 C12 36 16.5 28.5 25 25 V16 Z M27 48 A4.2 4.2 0 1 0 27 39.6 A4.2 4.2 0 1 0 27 48 Z M38 39 A2.6 2.6 0 1 0 38 33.8 A2.6 2.6 0 1 0 38 39 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <rect x="21" y="7" width="22" height="7" rx="3.5" fill={accent} />
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25 16 H39 V25 C47.5 28.5 52 36 52 43.5 C52 52.5 44 58 32 58 C20 58 12 52.5 12 43.5 C12 36 16.5 28.5 25 25 V16 Z M27 48 A4.2 4.2 0 1 0 27 39.6 A4.2 4.2 0 1 0 27 48 Z M38 39 A2.6 2.6 0 1 0 38 33.8 A2.6 2.6 0 1 0 38 39 Z"
            />
          </svg>
          <span
            style={{ color: ink, fontFamily: "'LogoBaloo2', sans-serif" }}
            className="text-[40px] font-extrabold tracking-[-0.02em] leading-none"
          >
            Elixir
          </span>
        </div>
      );
    },
  },
  {
    id: "v24-bowlby-seal",
    number: "11",
    name: "Heavy Small-Caps Seal",
    fontLabel: "Bowlby One SC",
    principle: "Monumental Silhouette Mass",
    rationale:
      "Bowlby One SC delivers unmistakable bold horizontal weight paired with a circular coin-drop seal. Built to dominate jersey sleeves, promo headers, and 16px favicons.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 4 A28 28 0 1 0 32 60 A28 28 0 1 0 32 4 Z M32 14 C32 14 45 29.5 45 38.2 C45 45.4 39.2 50.5 32 50.5 C24.8 50.5 19 45.4 19 38.2 C19 29.5 32 14 32 14 Z"
          />
          <circle cx="28.5" cy="39.5" r="3.4" fill={accent} />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3.5">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 4 A28 28 0 1 0 32 60 A28 28 0 1 0 32 4 Z M32 14 C32 14 45 29.5 45 38.2 C45 45.4 39.2 50.5 32 50.5 C24.8 50.5 19 45.4 19 38.2 C19 29.5 32 14 32 14 Z"
            />
            <circle cx="28.5" cy="39.5" r="3.4" fill={accent} />
          </svg>
          <span
            style={{ color: ink, fontFamily: "'LogoBowlby', sans-serif" }}
            className="text-[31px] tracking-[0.02em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v27-paytone-wave",
    number: "12",
    name: "Slanted Terminal Display",
    fontLabel: "Paytone One",
    principle: "Echoed Diagonal Energy",
    rationale:
      "Paytone One's signature subtle slanted stroke endings echo the tilted liquid horizon inside the flask. Warm, modern, and distinctly ownable without gimmicks.",
    renderIcon: ({ mono, light }) => <SwissFlaskSvg accent={getColors(mono, light).accent} />,
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3.5">
          <SwissFlaskSvg accent={accent} className="h-11 w-11 shrink-0" />
          <span
            style={{ color: ink, fontFamily: "'LogoPaytoneOne', sans-serif" }}
            className="text-[36px] tracking-[0.01em] leading-none"
          >
            Elixir
          </span>
        </div>
      );
    },
  },
  {
    id: "v30-bricolage-craft",
    number: "13",
    name: "Ink-Trap Modern Craft",
    fontLabel: "Bricolage Grotesque 800",
    principle: "Humanist Ink-Trap Tension",
    rationale:
      "Bricolage Grotesque blends playful organic character with razor-sharp product-design discipline. Paired with a clean pill-frame droplet mark that feels effortlessly contemporary.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 4 H48 C54.6 4 60 9.4 60 16 V48 C60 54.6 54.6 60 48 60 H16 C9.4 60 4 54.6 4 48 V16 C4 9.4 9.4 4 16 4 Z M32 14 C32 14 45 29.5 45 38.5 C45 45.8 39.2 51 32 51 C24.8 51 19 45.8 19 38.5 C19 29.5 32 14 32 14 Z"
          />
          <circle cx="29" cy="40" r="3" fill={accent} />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 4 H48 C54.6 4 60 9.4 60 16 V48 C60 54.6 54.6 60 48 60 H16 C9.4 60 4 54.6 4 48 V16 C4 9.4 9.4 4 16 4 Z M32 14 C32 14 45 29.5 45 38.5 C45 45.8 39.2 51 32 51 C24.8 51 19 45.8 19 38.5 C19 29.5 32 14 32 14 Z"
            />
            <circle cx="29" cy="40" r="3" fill={accent} />
          </svg>
          <span
            style={{ color: ink, fontFamily: "'Bricolage Grotesque', sans-serif" }}
            className="text-[38px] font-extrabold tracking-[-0.035em] leading-none"
          >
            Elixir
          </span>
        </div>
      );
    },
  },
  {
    id: "v31-unbounded-crypto",
    number: "14",
    name: "Hyper-Wide Crypto Power",
    fontLabel: "Unbounded ExtraBold",
    principle: "Wide Geometric Authority",
    rationale:
      "Unbounded ExtraBold's commanding wide letterforms broadcast next-gen crypto scale, anchored by a bold ring-and-drop monogram built for infinite scalability.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 6 A26 26 0 1 0 32 58 A26 26 0 1 0 32 6 Z M32 15 A17 17 0 1 0 32 49 A17 17 0 1 0 32 15 Z"
          />
          <path fill={accent} d="M32 21 C32 21 40 30.2 40 35.5 C40 39.9 36.4 43.5 32 43.5 C27.6 43.5 24 39.9 24 35.5 C24 30.2 32 21 32 21 Z" />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" fill="none">
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 6 A26 26 0 1 0 32 58 A26 26 0 1 0 32 6 Z M32 15 A17 17 0 1 0 32 49 A17 17 0 1 0 32 15 Z"
            />
            <path fill={accent} d="M32 21 C32 21 40 30.2 40 35.5 C40 39.9 36.4 43.5 32 43.5 C27.6 43.5 24 39.9 24 35.5 C24 30.2 32 21 32 21 Z" />
          </svg>
          <span
            style={{ color: ink, fontFamily: "'Unbounded', sans-serif" }}
            className="text-[26px] font-extrabold tracking-[0.04em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v35-archivo-coin",
    number: "15",
    name: "Royal Mint Octagon",
    fontLabel: "Archivo Black",
    principle: "Stamped Casino Authority",
    rationale:
      "Archivo Black delivers unapologetic heavyweight legibility for sportsbook and casino headers, anchored by a stamped octagonal royal mint coin with a crown cutout.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            fill={gold}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21 6 H43 L58 21 V43 L43 58 H21 L6 43 V21 L21 6 Z M18 39 L16 23 L25 29 L32 19 L39 29 L48 23 L46 39 H18 Z M21 43 H43 V47 H21 V43 Z"
          />
          <circle cx="32" cy="14" r="2.6" fill={accent} />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3.5">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <path
              fill={gold}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 6 H43 L58 21 V43 L43 58 H21 L6 43 V21 L21 6 Z M18 39 L16 23 L25 29 L32 19 L39 29 L48 23 L46 39 H18 Z M21 43 H43 V47 H21 V43 Z"
            />
            <circle cx="32" cy="14" r="2.6" fill={accent} />
          </svg>
          <span
            style={{ color: ink, fontFamily: "'Archivo Black', sans-serif" }}
            className="text-[36px] tracking-[0.02em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v41-dela-ampoule",
    number: "16",
    name: "High-Voltage Ampoule",
    fontLabel: "Dela Gothic One",
    principle: "Brutalist Streetwear Impact",
    rationale:
      "Dela Gothic One's ultra-wide, heavy strokes make an unforgettable streetwear-grade statement, balanced by a bold tilted booster ampoule with a crisp diagonal slash.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <g transform="rotate(35 32 32)">
            <rect x="24" y="5" width="16" height="7" rx="2.5" fill={accent} />
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21 15 H43 C46.3 15 49 17.7 49 21 V45 C49 52.7 42.7 59 35 59 H29 C21.3 59 15 52.7 15 45 V21 C15 17.7 17.7 15 21 15 Z M22 22 V35 L42 29 V22 H22 Z"
            />
          </g>
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <g transform="rotate(35 32 32)">
              <rect x="24" y="5" width="16" height="7" rx="2.5" fill={accent} />
              <path
                fill={accent}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 15 H43 C46.3 15 49 17.7 49 21 V45 C49 52.7 42.7 59 35 59 H29 C21.3 59 15 52.7 15 45 V21 C15 17.7 17.7 15 21 15 Z M22 22 V35 L42 29 V22 H22 Z"
              />
            </g>
          </svg>
          <span
            style={{ color: ink, fontFamily: "'Dela Gothic One', sans-serif" }}
            className="text-[28px] tracking-[0.02em] leading-none"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  /* ===================== MUGEN-INSPIRED ANGULAR WHITE TYPE (17-24) ===================== */
  {
    id: "v43-shonen-cut-custom",
    number: "17",
    name: "Shonen Cut Custom Vector",
    fontLabel: "Custom Angular SVG",
    principle: "Notched Comic Silhouette",
    rationale:
      "Hand-sculpted pure-white angular letterforms inspired by fighting-game title art: flared terminals, signature left-edge notches, and a tilted crown perched over the E.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <g transform="rotate(-14 26 12)">
            <path fill={gold} d="M14 17 L11 7 L20 12 L26 5 L32 12 L41 7 L38 17 Z" />
          </g>
          <path
            fill={accent}
            d="M15 21 L50 18 L47 29 L27 30 L26 36 L44 35 L42 45 L25 46 L24 52 L49 50 L47 60 L12 62 L16 42 L20 39 L13 37 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3 pt-1">
          <SwissFlaskSvg accent={accent} className="h-11 w-11 shrink-0" />
          <svg viewBox="0 0 338 92" className="h-14 w-auto max-w-[235px]" fill="none">
            <g transform="translate(8, -2) rotate(-14 26 14)">
              <path fill={gold} d="M13 20 L10 8 L20 14 L26 6 L32 14 L42 8 L39 20 Z" />
            </g>
            <g transform="translate(0, 10)">
              {/* E with left-edge notch */}
              <path
                fill={ink}
                d="M14 14 L62 10 L58 25 L31 27 L30 36 L53 34 L50 49 L29 51 L28 60 L60 57 L57 74 L10 78 L14 50 L20 45 L10 42 Z"
              />
              {/* L */}
              <path
                fill={ink}
                d="M72 16 L92 14 L87 57 L116 54 L112 73 L66 76 L71 47 L76 43 L69 40 Z"
              />
              {/* I */}
              <path
                fill={ink}
                d="M122 12 L149 10 L143 72 L120 73 L124 44 L129 40 L121 37 Z"
              />
              {/* X */}
              <path
                fill={ink}
                d="M154 12 L177 10 L187 30 L199 9 L221 11 L199 43 L218 75 L194 77 L184 55 L170 76 L148 74 L171 42 Z"
              />
              {/* I */}
              <path
                fill={ink}
                d="M225 14 L251 12 L245 73 L222 74 L226 45 L231 41 L224 38 Z"
              />
              {/* R */}
              <path
                fill={ink}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M258 12 L308 10 L322 22 L319 42 L305 51 L326 74 L301 76 L284 54 L276 54 L274 75 L254 76 L259 46 L264 42 L256 39 Z M278 26 L277 41 L296 40 L302 34 L301 27 Z"
              />
            </g>
          </svg>
        </div>
      );
    },
  },
  {
    id: "v44-shonen-tucked-slime",
    number: "18",
    name: "Crowned Kinetic Lockup",
    fontLabel: "Custom Angular SVG",
    principle: "Asymmetric Mascot Anchor",
    rationale:
      "Pure-white tilted shonen letterforms swept upward with a crown above the E and the Crowned Slime tucked directly beside the R for a tight arcade emblem silhouette.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold, cutout } = getColors(mono, light);
      return <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} />;
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold, cutout } = getColors(mono, light);
      return (
        <div className="flex items-end gap-0.5 pt-1">
          <svg viewBox="0 0 338 96" className="h-14 w-auto max-w-[230px]" fill="none">
            <g transform="rotate(-4 169 52)">
              <g transform="translate(8, 0) rotate(-14 26 14)">
                <path fill={gold} d="M13 20 L10 8 L20 14 L26 6 L32 14 L42 8 L39 20 Z" />
              </g>
              <g transform="translate(0, 14)">
                <path fill={ink} d="M14 14 L62 10 L58 25 L31 27 L30 36 L53 34 L50 49 L29 51 L28 60 L60 57 L57 74 L10 78 L14 50 L20 45 L10 42 Z" />
                <path fill={ink} d="M72 16 L92 14 L87 57 L116 54 L112 73 L66 76 L71 47 L76 43 L69 40 Z" />
                <path fill={ink} d="M122 12 L149 10 L143 72 L120 73 L124 44 L129 40 L121 37 Z" />
                <path fill={ink} d="M154 12 L177 10 L187 30 L199 9 L221 11 L199 43 L218 75 L194 77 L184 55 L170 76 L148 74 L171 42 Z" />
                <path fill={ink} d="M225 14 L251 12 L245 73 L222 74 L226 45 L231 41 L224 38 Z" />
                <path
                  fill={ink}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M258 12 L308 10 L322 22 L319 42 L305 51 L326 74 L301 76 L284 54 L276 54 L274 75 L254 76 L259 46 L264 42 L256 39 Z M278 26 L277 41 L296 40 L302 34 L301 27 Z"
                />
              </g>
            </g>
          </svg>
          <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} className="h-11 w-11 shrink-0 -ml-2 mb-0.5" />
        </div>
      );
    },
  },
  {
    id: "v45-bangers-comic",
    number: "19",
    name: "Comic Action Slant",
    fontLabel: "Bangers",
    principle: "High-Energy Hand Lettering",
    rationale:
      "Bangers delivers explosive tapered comic-book shapes in pure crisp white with tight dynamic kerning and a tilted royal crown riding the E.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <g transform="rotate(-14 28 12)">
            <path fill={gold} d="M16 17 L14 8 L22 12.5 L28 6 L34 12.5 L42 8 L40 17 Z" />
          </g>
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 20 H40 V28 L53 49 C55 52.5 52.6 58 48 58 H16 C11.4 58 9 52.5 11 49 L24 28 V20 Z M28 49.5 A3.5 3.5 0 1 0 28 42.5 A3.5 3.5 0 1 0 28 49.5 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3 pt-2">
          <SwissFlaskSvg accent={accent} className="h-11 w-11 shrink-0" />
          <div className="relative flex items-baseline -rotate-2">
            <svg viewBox="0 0 36 22" className="pointer-events-none absolute -left-2 -top-3.5 h-5 w-7 -rotate-12" fill="none">
              <path fill={gold} d="M4 19 L2 6 L11.5 12 L18 3 L24.5 12 L34 6 L32 19 Z" />
            </svg>
            <span
              style={{ color: ink, fontFamily: "'Bangers', cursive" }}
              className="text-[48px] tracking-[0.06em] leading-none"
            >
              ELIXIR
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "v46-fugaz-blade",
    number: "20",
    name: "Forward-Lean Velocity",
    fontLabel: "Fugaz One",
    principle: "Kinetic Italic Momentum",
    rationale:
      "Fugaz One's sharp, forward-charging strokes bring aggressive arcade-fighter speed in clean white, paired with a faceted lightning-drop emblem.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36 5 L53 31 C56 36 54 45 48 51 C42 57 31 59 23 55 C14 50 11 39 16 30 L36 5 Z M34 22 L24 37 H32 L29 48 L41 33 H33 L34 22 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M36 5 L53 31 C56 36 54 45 48 51 C42 57 31 59 23 55 C14 50 11 39 16 30 L36 5 Z M34 22 L24 37 H32 L29 48 L41 33 H33 L34 22 Z"
            />
          </svg>
          <span
            style={{ color: ink, fontFamily: "'Fugaz One', sans-serif" }}
            className="text-[38px] tracking-[0.02em] leading-none -rotate-2"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
  {
    id: "v47-carter-bounce",
    number: "21",
    name: "Bouncy Manga Brush",
    fontLabel: "Carter One",
    principle: "Rhythmic Baseline Bounce",
    rationale:
      "Carter One's chunky expressive curves are individually nudged along an energetic bouncing baseline in crisp white, topped with a tilted royal crown.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <g transform="rotate(-10 32 13)">
            <path fill={gold} d="M18 18 L16 8 L25 13 L32 6 L39 13 L48 8 L46 18 Z" />
          </g>
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 21 C32 21 50 35 50 44.5 C50 53 42 58 32 58 C22 58 14 53 14 44.5 C14 35 32 21 32 21 Z M27 48.5 A3.8 3.8 0 1 0 27 40.9 A3.8 3.8 0 1 0 27 48.5 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      const letters = [
        { ch: "E", cls: "-rotate-6 -translate-y-0.5" },
        { ch: "L", cls: "rotate-3 translate-y-1" },
        { ch: "I", cls: "-rotate-3 -translate-y-0.5" },
        { ch: "X", cls: "rotate-4 translate-y-0.5 scale-105" },
        { ch: "I", cls: "-rotate-2 -translate-y-0.5" },
        { ch: "R", cls: "rotate-3 translate-y-0.5" },
      ];
      return (
        <div className="flex items-center gap-3 pt-2">
          <PureDropSvg accent={accent} className="h-11 w-11 shrink-0" />
          <div className="relative flex items-baseline">
            <svg viewBox="0 0 36 22" className="pointer-events-none absolute -left-2 -top-4 h-5 w-7 -rotate-12" fill="none">
              <path fill={gold} d="M4 19 L2 6 L11.5 12 L18 3 L24.5 12 L34 6 L32 19 Z" />
            </svg>
            <span
              style={{ color: ink, fontFamily: "'Carter One', cursive" }}
              className="inline-flex items-baseline text-[38px] leading-none"
            >
              {letters.map((l, idx) => (
                <span key={idx} className={`inline-block ${l.cls} -mr-[1px]`}>
                  {l.ch}
                </span>
              ))}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "v48-razor-faceted",
    number: "22",
    name: "Razor Wedge Faceted",
    fontLabel: "Custom Faceted SVG",
    principle: "Zero-Curve Chiseled Blades",
    rationale:
      "A bespoke pure-white polygon wordmark cut strictly from sharp diagonal facets with bold side-edge notches, built to feel like an anime arena banner.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 6 L56 26 L44 58 H20 L8 26 L32 6 Z M32 19 L20 30 L26 47 H38 L44 30 L32 19 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" fill="none">
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 6 L56 26 L44 58 H20 L8 26 L32 6 Z M32 19 L20 30 L26 47 H38 L44 30 L32 19 Z"
            />
          </svg>
          <svg viewBox="0 0 342 74" className="h-11 w-auto max-w-[235px]" fill="none">
            {/* Faceted E */}
            <path fill={ink} d="M12 8 L64 4 L58 19 L29 21 L28 30 L52 28 L48 42 L26 44 L25 53 L60 50 L55 66 L6 68 L13 39 L19 36 L10 33 Z" />
            {/* Faceted L */}
            <path fill={ink} d="M72 7 L93 5 L86 50 L118 47 L113 65 L64 67 Z" />
            {/* Faceted I */}
            <path fill={ink} d="M126 6 L149 4 L141 66 L118 67 Z" />
            {/* Faceted X */}
            <path fill={ink} d="M156 6 L180 5 L189 24 L203 4 L226 6 L201 36 L221 66 L196 67 L186 46 L171 67 L147 65 L173 35 Z" />
            {/* Faceted I */}
            <path fill={ink} d="M232 6 L255 4 L247 66 L224 67 Z" />
            {/* Faceted R */}
            <path
              fill={ink}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M264 6 L318 4 L331 18 L325 38 L310 45 L332 66 L305 67 L289 47 L280 47 L277 66 L256 67 Z M284 19 L282 34 L303 33 L309 27 L307 19 Z"
            />
          </svg>
        </div>
      );
    },
  },
  {
    id: "v49-boogaloo-poster",
    number: "23",
    name: "Playful Shonen Poster",
    fontLabel: "Boogaloo",
    principle: "Exuberant Comic Rhythm",
    rationale:
      "Boogaloo brings bold, irregular hand-cut poster shapes in crisp white with subtle alternating letter tilt and the Crowned Slime tucked on the right flank.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold, cutout } = getColors(mono, light);
      return <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} />;
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold, cutout } = getColors(mono, light);
      const letters = [
        { ch: "E", cls: "-rotate-6" },
        { ch: "L", cls: "rotate-3 translate-y-0.5" },
        { ch: "I", cls: "-rotate-3 -translate-y-0.5" },
        { ch: "X", cls: "rotate-3 scale-105" },
        { ch: "I", cls: "-rotate-2" },
        { ch: "R", cls: "rotate-4 translate-y-0.5" },
      ];
      return (
        <div className="flex items-center gap-2 pt-2">
          <div className="relative flex items-baseline -rotate-2">
            <svg viewBox="0 0 36 22" className="pointer-events-none absolute -left-2 -top-3.5 h-5 w-7 -rotate-12" fill="none">
              <path fill={gold} d="M4 19 L2 6 L11.5 12 L18 3 L24.5 12 L34 6 L32 19 Z" />
            </svg>
            <span
              style={{ color: ink, fontFamily: "'Boogaloo', cursive" }}
              className="inline-flex items-baseline text-[48px] tracking-[0.02em] leading-none"
            >
              {letters.map((l, idx) => (
                <span key={idx} className={`inline-block ${l.cls}`}>
                  {l.ch}
                </span>
              ))}
            </span>
          </div>
          <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} className="h-11 w-11 shrink-0" />
        </div>
      );
    },
  },
  {
    id: "v50-racing-speedcut",
    number: "24",
    name: "Speed-Cut Arcade",
    fontLabel: "Racing Sans One",
    principle: "Slanted High-Contrast Wedge",
    rationale:
      "Racing Sans One combines steep dynamic slant with sculpted wedge-cut counters in pure white, paired with a tilted crown over the E and an emerald flask.",
    renderIcon: ({ mono, light }) => <SwissFlaskSvg accent={getColors(mono, light).accent} />,
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3 pt-1">
          <SwissFlaskSvg accent={accent} className="h-11 w-11 shrink-0" />
          <div className="relative flex items-baseline">
            <svg viewBox="0 0 36 22" className="pointer-events-none absolute -left-1 -top-3.5 h-4.5 w-6 -rotate-12" fill="none">
              <path fill={gold} d="M4 19 L2 6 L11.5 12 L18 3 L24.5 12 L34 6 L32 19 Z" />
            </svg>
            <span
              style={{ color: ink, fontFamily: "'Racing Sans One', sans-serif" }}
              className="text-[42px] tracking-[0.03em] leading-none"
            >
              ELIXIR
            </span>
          </div>
        </div>
      );
    },
  },
  /* ===================== ATLAS & SLOT-WEDGE WHITE TYPE SHAPES (25-30) ===================== */
  {
    id: "v51-atlas-chiseled",
    number: "25",
    name: "Atlas Chiseled Block",
    fontLabel: "Custom Atlas SVG",
    principle: "Oversized Hero E + Carved Notches",
    rationale:
      "Inspired by heavy chiseled street-comic lettering: an oversized forward-leaning hero E leads into tight blocky LIXIR stems with razor ink notches along a rising baseline.",
    renderIcon: ({ mono, light }) => {
      const { accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14 8 L54 6 L51 20 L28 21 L27 28 L47 27 L45 39 L26 40 L25 47 L52 45 L49 58 L8 60 L13 36 L18 33 L10 31 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3">
          <SwissFlaskSvg accent={accent} className="h-11 w-11 shrink-0" />
          <svg viewBox="0 0 340 84" className="h-12 w-auto max-w-[235px]" fill="none">
            <g transform="rotate(-2.5 170 42)">
              {/* Oversized hero E with Atlas notches */}
              <path
                fill={ink}
                d="M10 6 L72 4 L67 22 L34 23 L33 33 L60 32 L56 48 L31 49 L30 59 L66 57 L62 76 L4 79 L11 45 L18 41 L7 38 Z"
              />
              {/* Heavy blocky L with corner notch */}
              <path
                fill={ink}
                d="M78 14 L103 13 L98 56 L126 54 L123 73 L72 75 L76 46 L81 43 L74 40 Z"
              />
              {/* Blocky I */}
              <path
                fill={ink}
                d="M132 13 L158 12 L153 71 L127 72 L130 45 L135 42 L129 39 Z"
              />
              {/* Heavy chiseled X */}
              <path
                fill={ink}
                d="M164 12 L192 11 L200 29 L212 10 L238 11 L215 41 L234 70 L206 71 L197 52 L183 71 L157 72 L180 41 Z"
              />
              {/* Blocky I */}
              <path
                fill={ink}
                d="M242 12 L267 11 L262 69 L237 70 L240 44 L245 41 L239 38 Z"
              />
              {/* Heavy blocky R with angular counter */}
              <path
                fill={ink}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M273 11 L326 10 L335 21 L332 41 L319 47 L336 68 L308 69 L295 50 L289 50 L287 69 L266 70 Z M291 25 L290 37 L309 36 L313 31 L311 25 Z"
              />
            </g>
          </svg>
        </div>
      );
    },
  },
  {
    id: "v52-atlas-framed",
    number: "26",
    name: "Atlas Jagged Frame",
    fontLabel: "Custom Atlas SVG",
    principle: "Dynamic Outer Contour Frame",
    rationale:
      "Wraps the pure-white chiseled Atlas wordmark in an electric-green jagged angular border with micro ink-splatter dots, locking icon and type into one unified badge.",
    renderIcon: ({ mono, light }) => {
      const { accent, ink } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path
            d="M10 10 L56 7 L58 24 L53 27 L57 42 L51 56 L6 59 L9 39 L4 35 L11 26 Z"
            stroke={accent}
            strokeWidth="4.5"
            strokeLinejoin="miter"
            fill="none"
          />
          <path
            fill={mono ? accent : ink}
            d="M19 18 L46 16 L44 25 L29 26 L28 31 L41 30 L39 38 L27 39 L26 44 L45 43 L43 51 L16 52 L19 36 L23 34 L17 32 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent } = getColors(mono, light);
      return (
        <svg viewBox="0 0 364 106" className="h-16 w-auto max-w-[285px]" fill="none">
          {/* Jagged Atlas outer contour line */}
          <path
            d="M18 14 L92 10 L95 19 L344 16 L347 38 L340 42 L352 58 L338 82 L248 86 L243 79 L154 88 L149 82 L22 94 L12 66 L19 61 L8 50 L24 30 L16 26 Z"
            stroke={accent}
            strokeWidth="5"
            strokeLinejoin="miter"
            fill="none"
          />
          {/* Corner micro dots */}
          <circle cx="352" cy="14" r="2.8" fill={accent} />
          <circle cx="11" cy="92" r="2.8" fill={accent} />
          <circle cx="6" cy="40" r="2" fill={accent} />
          {/* Pure white Atlas letterforms */}
          <g transform="translate(12, 12) rotate(-2.2 170 42)">
            <path fill={ink} d="M10 6 L72 4 L67 22 L34 23 L33 33 L60 32 L56 48 L31 49 L30 59 L66 57 L62 76 L4 79 L11 45 L18 41 L7 38 Z" />
            <path fill={ink} d="M78 14 L103 13 L98 56 L126 54 L123 73 L72 75 L76 46 L81 43 L74 40 Z" />
            <path fill={ink} d="M132 13 L158 12 L153 71 L127 72 L130 45 L135 42 L129 39 Z" />
            <path fill={ink} d="M164 12 L192 11 L200 29 L212 10 L238 11 L215 41 L234 70 L206 71 L197 52 L183 71 L157 72 L180 41 Z" />
            <path fill={ink} d="M242 12 L267 11 L262 69 L237 70 L240 44 L245 41 L239 38 Z" />
            <path
              fill={ink}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M273 11 L326 10 L335 21 L332 41 L319 47 L336 68 L308 69 L295 50 L289 50 L287 69 L266 70 Z M291 25 L290 37 L309 36 L313 31 L311 25 Z"
            />
          </g>
        </svg>
      );
    },
  },
  {
    id: "v53-chilli-wedge-crown",
    number: "27",
    name: "Plump Wedge Game Display",
    fontLabel: "Custom Wedge SVG",
    principle: "Flared-Top Slot Interlock",
    rationale:
      "Inspired by flagship slot-game title art: plump, softly curved pure-white letters with wider flared tops, snug interlocking cadence, and a tilted crown perched on the E.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <g transform="rotate(-14 26 12)">
            <path fill={gold} d="M13 18 L10 7 L20 12.5 L26 5 L32 12.5 L42 7 L39 18 Z" />
          </g>
          <path
            fill={accent}
            d="M14 23 C14 20 17 18 22 18 H46 C50 18 51 21 50 25 L48 30 C47 32 45 33 42 33 H29 V36 H42 C45 36 46 38 45 41 L44 45 C43 47 41 48 38 48 H29 V50 H45 C48 50 49 52 48 55 L47 59 C46 61 44 62 41 62 H20 C16 62 14 59 14 55 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3 pt-1">
          <SwissFlaskSvg accent={accent} className="h-11 w-11 shrink-0" />
          <svg viewBox="0 0 332 94" className="h-14 w-auto max-w-[235px]" fill="none">
            {/* Tilted royal crown perched over oversized E */}
            <g transform="translate(5, -1) rotate(-15 28 14)">
              <path fill={gold} d="M11 21 L8 7 L19 14 L28 4 L37 14 L48 7 L45 21 Z" />
            </g>
            <g transform="translate(0, 12)">
              {/* Plump flared-top E */}
              <path
                fill={ink}
                d="M10 11 C9 7 12 4 17 4 L58 6 C62 6 64 9 63 14 L61 21 C60 24 58 26 54 26 L34 25 L34 33 L51 33 C55 33 57 35 56 39 L55 46 C54 49 52 51 48 51 L34 51 L34 58 L55 57 C59 57 61 60 60 64 L59 71 C58 75 55 77 51 77 L19 77 C14 77 11 74 11 69 Z"
              />
              {/* Plump flared L */}
              <path
                fill={ink}
                d="M68 15 C68 11 71 9 75 9 L91 10 C95 10 97 13 96 17 L92 58 L112 57 C116 57 118 59 118 63 L117 72 C117 75 114 78 110 78 L75 78 C71 78 68 75 68 71 Z"
              />
              {/* Plump tapered I */}
              <path
                fill={ink}
                d="M123 14 C123 10 126 8 130 8 L148 8 C152 8 155 11 154 15 L149 71 C149 75 146 77 142 77 L130 77 C126 77 123 74 123 70 Z"
              />
              {/* Plump curved-wedge X */}
              <path
                fill={ink}
                d="M159 12 C158 8 161 6 165 6 L183 7 C187 7 189 9 191 13 L197 27 L205 12 C207 9 209 7 213 7 L230 6 C234 6 237 9 235 13 L214 43 L233 70 C235 74 233 77 228 77 L210 77 C206 77 204 75 202 71 L195 57 L186 72 C184 75 182 77 178 77 L160 77 C156 77 154 74 156 70 L176 43 Z"
              />
              {/* Plump tapered I */}
              <path
                fill={ink}
                d="M238 14 C238 10 241 8 245 8 L263 8 C267 8 270 11 269 15 L264 71 C264 75 261 77 257 77 L245 77 C241 77 238 74 238 70 Z"
              />
              {/* Plump flared R */}
              <path
                fill={ink}
                fillRule="evenodd"
                clipRule="evenodd"
                d="M274 11 C274 7 277 5 282 5 L311 4 C324 4 331 12 330 25 C329 36 324 43 315 47 L328 69 C330 73 328 77 323 77 L305 77 C301 77 299 75 297 71 L290 54 L288 71 C288 75 285 77 281 77 L277 77 C273 77 270 74 270 70 Z M293 22 L292 36 L305 36 C309 36 312 33 312 29 C312 24 310 22 305 22 Z"
              />
            </g>
          </svg>
        </div>
      );
    },
  },
  {
    id: "v54-chilli-flank-slime",
    number: "28",
    name: "Flanked Mascot Wedge",
    fontLabel: "Custom Wedge SVG",
    principle: "Hero Type + Right-Flank Mascot",
    rationale:
      "Pairs the plump flared-wedge white wordmark with a gentle joyful tilt, crown on the E, and the Crowned Slime tucked against the right flank like classic arcade title art.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold, cutout } = getColors(mono, light);
      return <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} />;
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold, cutout } = getColors(mono, light);
      return (
        <div className="flex items-end gap-1 pt-1">
          <svg viewBox="0 0 334 96" className="h-14 w-auto max-w-[230px]" fill="none">
            <g transform="rotate(-3 167 48)">
              <g transform="translate(5, 0) rotate(-15 28 14)">
                <path fill={gold} d="M11 21 L8 7 L19 14 L28 4 L37 14 L48 7 L45 21 Z" />
              </g>
              <g transform="translate(0, 13)">
                <path fill={ink} d="M10 11 C9 7 12 4 17 4 L58 6 C62 6 64 9 63 14 L61 21 C60 24 58 26 54 26 L34 25 L34 33 L51 33 C55 33 57 35 56 39 L55 46 C54 49 52 51 48 51 L34 51 L34 58 L55 57 C59 57 61 60 60 64 L59 71 C58 75 55 77 51 77 L19 77 C14 77 11 74 11 69 Z" />
                <path fill={ink} d="M68 15 C68 11 71 9 75 9 L91 10 C95 10 97 13 96 17 L92 58 L112 57 C116 57 118 59 118 63 L117 72 C117 75 114 78 110 78 L75 78 C71 78 68 75 68 71 Z" />
                <path fill={ink} d="M123 14 C123 10 126 8 130 8 L148 8 C152 8 155 11 154 15 L149 71 C149 75 146 77 142 77 L130 77 C126 77 123 74 123 70 Z" />
                <path fill={ink} d="M159 12 C158 8 161 6 165 6 L183 7 C187 7 189 9 191 13 L197 27 L205 12 C207 9 209 7 213 7 L230 6 C234 6 237 9 235 13 L214 43 L233 70 C235 74 233 77 228 77 L210 77 C206 77 204 75 202 71 L195 57 L186 72 C184 75 182 77 178 77 L160 77 C156 77 154 74 156 70 L176 43 Z" />
                <path fill={ink} d="M238 14 C238 10 241 8 245 8 L263 8 C267 8 270 11 269 15 L264 71 C264 75 261 77 257 77 L245 77 C241 77 238 74 238 70 Z" />
                <path
                  fill={ink}
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M274 11 C274 7 277 5 282 5 L311 4 C324 4 331 12 330 25 C329 36 324 43 315 47 L328 69 C330 73 328 77 323 77 L305 77 C301 77 299 75 297 71 L290 54 L288 71 C288 75 285 77 281 77 L277 77 C273 77 270 74 270 70 Z M293 22 L292 36 L305 36 C309 36 312 33 312 29 C312 24 310 22 305 22 Z"
                />
              </g>
            </g>
          </svg>
          <SlimeMascotSvg accent={accent} gold={gold} eye={cutout} mono={mono} className="h-11 w-11 shrink-0 -ml-1 mb-0.5" />
        </div>
      );
    },
  },
  {
    id: "v55-sigmar-wave",
    number: "29",
    name: "Chunky Slot Wave",
    fontLabel: "Sigmar One",
    principle: "Oversized Cap + Gentle Arch",
    rationale:
      "Sigmar One's super-chunky tapered block shapes are arranged with an oversized hero E and subtle wave cadence in pure crisp white, echoing top casino title marks.",
    renderIcon: ({ mono, light }) => <PureDropSvg accent={getColors(mono, light).accent} />,
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      const letters = [
        { ch: "E", cls: "text-[42px] -rotate-6 -translate-y-0.5" },
        { ch: "L", cls: "text-[34px] rotate-2 translate-y-0.5" },
        { ch: "I", cls: "text-[34px] -rotate-2" },
        { ch: "X", cls: "text-[36px] rotate-3" },
        { ch: "I", cls: "text-[34px] -rotate-2" },
        { ch: "R", cls: "text-[38px] rotate-3 -translate-y-0.5" },
      ];
      return (
        <div className="flex items-center gap-3 pt-2">
          <PureDropSvg accent={accent} className="h-11 w-11 shrink-0" />
          <div className="relative flex items-baseline">
            <svg viewBox="0 0 36 22" className="pointer-events-none absolute -left-1.5 -top-4 h-5 w-7 -rotate-14" fill="none">
              <path fill={gold} d="M4 19 L2 6 L11.5 12 L18 3 L24.5 12 L34 6 L32 19 Z" />
            </svg>
            <span
              style={{ color: ink, fontFamily: "'Sigmar One', sans-serif" }}
              className="inline-flex items-baseline leading-none"
            >
              {letters.map((l, idx) => (
                <span key={idx} className={`inline-block ${l.cls} -mr-[2px]`}>
                  {l.ch}
                </span>
              ))}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    id: "v56-rammetto-crown",
    number: "30",
    name: "Flared-Slab Kingdom",
    fontLabel: "Rammetto One",
    principle: "Monumental Playful Flare",
    rationale:
      "Rammetto One pairs ultra-thick curved slabs with dramatic wedge flares in crisp white, giving Elixir unmistakable blockbuster-game presence alongside a crowned drop.",
    renderIcon: ({ mono, light }) => {
      const { accent, gold } = getColors(mono, light);
      return (
        <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
          <path fill={gold} d="M19 16 L17 7 L25.5 12 L32 5 L38.5 12 L47 7 L45 16 Z" />
          <path
            fill={accent}
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 19 C32 19 50 35 50 44.5 C50 53 42 58 32 58 C22 58 14 53 14 44.5 C14 35 32 19 32 19 Z M27 48.5 A3.8 3.8 0 1 0 27 40.9 A3.8 3.8 0 1 0 27 48.5 Z"
          />
        </svg>
      );
    },
    renderLockup: ({ mono, light }) => {
      const { ink, accent, gold } = getColors(mono, light);
      return (
        <div className="flex items-center gap-3 pt-1">
          <svg viewBox="0 0 64 64" className="h-11 w-11 shrink-0" fill="none">
            <path fill={gold} d="M19 16 L17 7 L25.5 12 L32 5 L38.5 12 L47 7 L45 16 Z" />
            <path
              fill={accent}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32 19 C32 19 50 35 50 44.5 C50 53 42 58 32 58 C22 58 14 53 14 44.5 C14 35 32 19 32 19 Z M27 48.5 A3.8 3.8 0 1 0 27 40.9 A3.8 3.8 0 1 0 27 48.5 Z"
            />
          </svg>
          <span
            style={{ color: ink, fontFamily: "'Rammetto One', sans-serif" }}
            className="text-[32px] tracking-[0.02em] leading-none -rotate-1"
          >
            ELIXIR
          </span>
        </div>
      );
    },
  },
];

export default function LogoOptionsPage() {
  const [surfaceId, setSurfaceId] = useState<SurfaceId>("sidebar");
  const [colorMode, setColorMode] = useState<ColorMode>("brand");
  const [selectedId, setSelectedId] = useState<string>("v1-traced-baseline");

  const surface = SURFACES.find((s) => s.id === surfaceId) ?? SURFACES[0];
  const mono = colorMode === "mono";

  return (
    <div className="min-h-dvh px-4 py-8 sm:px-8 lg:px-12 max-w-[1400px] mx-auto">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Bangers&family=Boogaloo&family=Bricolage+Grotesque:opsz,wght@12..96,800&family=Carter+One&family=Dela+Gothic+One&family=Fugaz+One&family=Racing+Sans+One&family=Rammetto+One&family=Sigmar+One&family=Unbounded:wght@800&display=swap');

        @font-face {
          font-family: 'LogoLilitaOne';
          src: url('/fonts/LilitaOne-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoTitanOne';
          src: url('/fonts/TitanOne-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoLuckiestGuy';
          src: url('/fonts/LuckiestGuy-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoFredoka';
          src: url('/fonts/Fredoka.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoBaloo2';
          src: url('/fonts/Baloo2.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoBowlby';
          src: url('/fonts/BowlbyOneSC-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoBungee';
          src: url('/fonts/Bungee-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoChangaOne';
          src: url('/fonts/ChangaOne-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoPaytoneOne';
          src: url('/fonts/PaytoneOne-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'LogoRowdies';
          src: url('/fonts/Rowdies-Bold.ttf') format('truetype');
          font-display: swap;
        }
      `}</style>

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#d8b4fe] hover:text-white transition-colors mb-3"
          >
            ← Back to Elixir
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Elixir Logo Exploration · {VARIANTS.length} Variations
          </h1>
          <p className="text-sm text-[#b7a9ca] mt-1.5 max-w-2xl">
            16 curated favorites plus 14 pure-white custom angular shonen, chiseled street-block, and plump flared-wedge game-studio type shapes. Every lockup is stress-tested at 16px, 24px, 40px, and 128px in both brand color and 1-color mono.
          </p>
        </div>

        {/* Interactive Stress-Test Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Surface Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1a1229] border border-[#362452]">
            {SURFACES.map((s) => (
              <button
                key={s.id}
                onClick={() => setSurfaceId(s.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  surfaceId === s.id
                    ? "bg-[#362452] text-white"
                    : "text-[#b7a9ca] hover:text-white"
                }`}
              >
                {s.label.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Color / Monochrome Test */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1a1229] border border-[#362452]">
            <button
              onClick={() => setColorMode("brand")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                colorMode === "brand" ? "bg-[#362452] text-white" : "text-[#b7a9ca] hover:text-white"
              }`}
            >
              Brand Color
            </button>
            <button
              onClick={() => setColorMode("mono")}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                colorMode === "mono" ? "bg-[#362452] text-white" : "text-[#b7a9ca] hover:text-white"
              }`}
            >
              1-Color Test
            </button>
          </div>
        </div>
      </div>

      {/* 20-Variation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {VARIANTS.map((v) => {
          const isSelected = selectedId === v.id;
          return (
            <div
              key={v.id}
              onClick={() => setSelectedId(v.id)}
              className={`group rounded-2xl border transition-all cursor-pointer overflow-hidden bg-[#1a1229] ${
                isSelected
                  ? "border-[#5ef439] ring-1 ring-[#5ef439]/40"
                  : "border-[#362452] hover:border-[#5b3f8a]"
              }`}
            >
              {/* Main Specimen Stage */}
              <div
                style={{ backgroundColor: surface.bg, borderBottom: `1px solid ${surface.border}` }}
                className="relative h-44 px-6 flex items-center justify-center transition-colors"
              >
                <span
                  className={`absolute top-3.5 left-4 text-[11px] font-mono font-semibold tracking-wider ${
                    surface.light ? "text-slate-400" : "text-[#b7a9ca]/60"
                  }`}
                >
                  {v.number} · {v.fontLabel}
                </span>
                <span
                  className={`absolute top-3.5 right-4 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    surface.light
                      ? "bg-slate-200/80 text-slate-700"
                      : "bg-white/5 text-[#d8b4fe]"
                  }`}
                >
                  {v.principle}
                </span>

                <div className="flex items-center justify-center">
                  {v.renderLockup({ mono, light: surface.light })}
                </div>
              </div>

              {/* Meta + Real-World Scale Stress Tests */}
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base font-semibold text-white">{v.name}</h2>
                    <p className="text-xs text-[#b7a9ca] mt-1 leading-relaxed">{v.rationale}</p>
                  </div>
                  {isSelected && (
                    <span className="shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#5ef439]/15 text-[#5ef439] border border-[#5ef439]/30">
                      Selected
                    </span>
                  )}
                </div>

                {/* Scalability Strip: Sidebar (128px), Collapsed (40px), Favicon (16px) */}
                <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#362452]/70">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#b7a9ca]/70 font-medium">
                      Scale Tests
                    </span>
                    <div
                      title="40px collapsed sidebar icon"
                      style={{ backgroundColor: surface.bg, borderColor: surface.border }}
                      className="w-10 h-10 rounded-[10px] border p-1.5 flex items-center justify-center"
                    >
                      {v.renderIcon({ mono, light: surface.light })}
                    </div>
                    <div
                      title="24px UI icon"
                      style={{ backgroundColor: surface.bg, borderColor: surface.border }}
                      className="w-7 h-7 rounded-md border p-1 flex items-center justify-center"
                    >
                      {v.renderIcon({ mono, light: surface.light })}
                    </div>
                    <div
                      title="16px favicon test"
                      style={{ backgroundColor: surface.bg, borderColor: surface.border }}
                      className="w-5 h-5 rounded border p-0.5 flex items-center justify-center"
                    >
                      {v.renderIcon({ mono, light: surface.light })}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#b7a9ca]/70 font-medium hidden sm:inline">
                      Sidebar (128px)
                    </span>
                    <div
                      style={{ backgroundColor: surface.bg, borderColor: surface.border }}
                      className="h-9 px-3 rounded-lg border flex items-center justify-center"
                    >
                      <div className="scale-[0.52] origin-center flex items-center justify-center">
                        {v.renderLockup({ mono, light: surface.light })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
