import type { Metadata } from "next";
import BadgeGallery from "./BadgeGallery";

export const metadata: Metadata = { title: "Elixir VIP badge options" };
export default function VipBadgeOptionsPage() { return <BadgeGallery />; }
