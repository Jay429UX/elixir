import type { Metadata } from "next";
import AnimationGallery from "./AnimationGallery";
import "./badge-animations.css";

export const metadata: Metadata = {
  title: "Elixir — VIP Badge SVG Motion Lab",
  description: "Interactive independent-element SVG animation studies for Elixir's 5-tier VIP badges at hero and small UI sizes.",
};
export default function VipBadgeAnimationsPage() { return <AnimationGallery />; }
