import type { Metadata } from "next";
import LevelUpGallery from "./LevelUpGallery";
import "./level-up-options.css";

export const metadata: Metadata = { title: "Elixir level up modal options" };
export default function LevelUpOptionsPage() { return <LevelUpGallery />; }
