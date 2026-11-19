import type { Metadata } from "next";
import ChatOptionsGallery from "./ChatOptionsGallery";

export const metadata: Metadata = {
  title: "Elixir — Live Chat Styling Options",
  description:
    "Five interactive styling directions for Elixir's Live Chat sidebar — from high-density borderless streams to refined glass cards and alchemist tavern themes.",
};

export default function ChatOptionsPage() {
  return <ChatOptionsGallery />;
}
