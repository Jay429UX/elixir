import type { Metadata } from "next";
import LevelUpModalGallery from "./LevelUpModalGallery";
import "./badge-modal-animations.css";

export const metadata: Metadata = {
  title: "Elixir — Level Up Modal Badge Animations (10 Options)",
};

export default function LevelUpModalOptionsPage() {
  return <LevelUpModalGallery />;
}
