import type { Metadata } from "next";
import KingdomBadgeGallery from "./KingdomBadgeGallery";
import "./kingdom-badge-animations.css";

export const metadata: Metadata = {
  title: "Elixir — Kingdom & Alchemy SVG Badge Options",
  description:
    "Interactive exploration of compact, high-contrast castle, elixir, and royal crown SVG badges engineered for small UI sizes and layered animation.",
};

export default function KingdomBadgeOptionsPage() {
  return <KingdomBadgeGallery />;
}
