import type { Metadata } from "next";
import GuaranteeHudGallery from "./GuaranteeHudGallery";

export const metadata: Metadata = {
  title: "Elixir — Guarantee HUD Options",
  description: "Explore non-intrusive HUD placements for the active Alchemist's Guarantee.",
};

export default function GuaranteeHudOptionsPage() {
  return <GuaranteeHudGallery />;
}
