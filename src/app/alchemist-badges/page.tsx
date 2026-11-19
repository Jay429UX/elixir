import type { Metadata } from "next";
import AlchemistBadgeShowcase from "./AlchemistBadgeShowcase";
import "./alchemist-badges.css";

export const metadata: Metadata = {
  title: "Elixir — Alchemist Relic VIP Badges",
  description:
    "Five bespoke Alchemist-themed VIP progression badges (Copper Vial, Moonlit Cauldron, Solar Alembic, Celestial Astrolabe, Philosopher's Crown) with independent SVG element animations.",
};

export default function AlchemistBadgesPage() {
  return <AlchemistBadgeShowcase />;
}
