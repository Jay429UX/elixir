import type { Metadata } from "next";
import ShapeGallery from "./ShapeGallery";

export const metadata: Metadata = { title: "Elixir header container shapes" };
export default function HeaderShapesPage() { return <ShapeGallery />; }
