import type { Metadata } from "next";
import LiquidUses from "./LiquidUses";
import "./liquid-uses.css";

export const metadata: Metadata = { title: "Elixir liquid placements" };
export default function LiquidUsesPage() { return <LiquidUses />; }
