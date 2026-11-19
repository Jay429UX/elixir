import type { Metadata } from "next";
import VipBadgeSvgGallery from "./VipBadgeSvgGallery";
import "./badge-svg-animations.css";

export const metadata: Metadata = {
  title: "Elixir — 3D Faceted Gem Crest VIP Badges (11 Variations)",
};

export default function VipBadgeSvgOptionsPage() {
  return <VipBadgeSvgGallery />;
}
