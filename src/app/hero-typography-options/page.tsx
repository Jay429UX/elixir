import type { Metadata } from "next";
import { Archivo_Black, Anton, Space_Grotesk } from "next/font/google";
import HeroTypographyLab from "./HeroTypographyLab";

const archivoBlack = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-lab-archivo", display: "swap" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-lab-anton", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-lab-space", display: "swap" });

export const metadata: Metadata = {
  title: "Elixir — Hero Banners Typography Lab",
};

export default function HeroTypographyOptionsPage() {
  return (
    <div className={`${archivoBlack.variable} ${anton.variable} ${spaceGrotesk.variable}`}>
      <HeroTypographyLab />
    </div>
  );
}
