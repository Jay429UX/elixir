import type { Metadata } from "next";
import "../kingdom-badge-options/kingdom-badge-animations.css";
import VipBadgeEditor from "./VipBadgeEditor";

export const metadata: Metadata = {
  title: "Elixir — VIP Badge Studio & Editor",
  description: "Inspect and customize all 5 Progressive Hex Ascension VIP badge tiers live.",
};

export default function VipBadgeEditorPage() {
  return <VipBadgeEditor />;
}
