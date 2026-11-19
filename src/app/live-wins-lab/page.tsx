import type { Metadata } from "next";
import LiveWinsLab from "./LiveWinsLab";

export const metadata: Metadata = {
  title: "Elixir — Live Wins Component Lab",
};

export default function LiveWinsLabPage() {
  return <LiveWinsLab />;
}
