import type { Metadata } from "next";
import ShowreelPlayer from "./ShowreelPlayer";
import "./showreel.css";

export const metadata: Metadata = {
  title: "Elixir Portfolio Motion Graphic Showreel",
  description:
    "A 9-act, Disney-principled interactive motion graphic showcasing Elixir's 3D wireframe-to-cinema pipeline, custom key art, 8 bespoke Originals, Clockwork Forge SVG VIP rig, micro-interactions, and real-time casino UI.",
};

export default function ShowreelPage() {
  return <ShowreelPlayer />;
}
