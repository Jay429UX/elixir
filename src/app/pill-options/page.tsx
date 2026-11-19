import type { Metadata } from "next";
import PillGallery from "./PillGallery";
import "./pill-options.css";

export const metadata: Metadata = { title: "Elixir — Exclusive pill options" };
export default function PillOptionsPage() { return <PillGallery />; }
