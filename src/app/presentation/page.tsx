import type { Metadata } from "next";
import PresentationDeck from "./PresentationDeck";

export const metadata: Metadata = {
  title: "Elixir — Product & UI Pitch Deck",
  description:
    "Interactive HTML pitch deck presenting Elixir's brand world, conversion UX, retention loops, and scalable design system.",
};

export default function PresentationPage() {
  return <PresentationDeck />;
}
