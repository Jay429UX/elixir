import type { Metadata } from "next";
import PanelGallery from "./PanelGallery";
import "./level-up-panel.css";

export const metadata: Metadata = { title: "Elixir level up panel options" };
export default function LevelUpPanelOptionsPage() { return <PanelGallery />; }
