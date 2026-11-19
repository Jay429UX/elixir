import type { Metadata } from "next";
import WinCardGallery from "./WinCardGallery";
import "./win-card-options.css";

export const metadata: Metadata = {
  title: "Elixir — High-Multiplier Win Card Options",
};

export default function WinCardOptionsPage() {
  return <WinCardGallery />;
}
