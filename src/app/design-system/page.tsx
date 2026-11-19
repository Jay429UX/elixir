import type { Metadata } from "next";
import DesignSystem from "./DesignSystem";

export const metadata: Metadata = {
  title: "Elixir — Design System & Tokens",
  description:
    "Complete design system reference for Elixir: color tokens, typography scale, spacing, radii, component primitives, VIP badges, and icon library.",
};

export default function DesignSystemPage() {
  return <DesignSystem />;
}
