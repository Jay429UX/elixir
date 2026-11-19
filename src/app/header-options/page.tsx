import type { Metadata } from "next";
import HeaderGallery from "./HeaderGallery";

export const metadata: Metadata = { title: "Elixir header options" };
export default function HeaderOptionsPage() { return <HeaderGallery />; }
