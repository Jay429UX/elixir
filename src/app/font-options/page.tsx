import type { Metadata } from "next";
import localFont from "next/font/local";
import FontGallery from "./FontGallery";
import "./font-options.css";

const lilita = localFont({ src: "../../../public/fonts/LilitaOne-Regular.ttf", preload: false });
const fredoka = localFont({ src: "../../../public/fonts/Fredoka.ttf", weight: "300 700", preload: false });
const baloo = localFont({ src: "../../../public/fonts/Baloo2.ttf", weight: "400 800", preload: false });
const lucky = localFont({ src: "../../../public/fonts/LuckiestGuy-Regular.ttf", preload: false });
const bungee = localFont({ src: "../../../public/fonts/Bungee-Regular.ttf", preload: false });
const titan = localFont({ src: "../../../public/fonts/TitanOne-Regular.ttf", preload: false });
const bowlby = localFont({ src: "../../../public/fonts/BowlbyOneSC-Regular.ttf", preload: false });
const changa = localFont({ src: "../../../public/fonts/ChangaOne-Regular.ttf", preload: false });
const paytone = localFont({ src: "../../../public/fonts/PaytoneOne-Regular.ttf", preload: false });
const rowdies = localFont({ src: "../../../public/fonts/Rowdies-Bold.ttf", weight: "700", preload: false });

export const metadata: Metadata = { title: "Elixir — Choose your hero font" };

export default function FontOptionsPage() {
  return <FontGallery options={[
    { name: "Lilita One", className: lilita.className, weight: 400, character: "Chunky & friendly", note: "Soft corners with a strong, compact silhouette." },
    { name: "Fredoka", className: fredoka.className, weight: 700, character: "Round & bubbly", note: "The softest option. Rounded letters echo the potion bubbles." },
    { name: "Baloo 2", className: baloo.className, weight: 800, character: "Warm & bouncy", note: "A cheerful, flowing shape with a more relaxed rhythm." },
    { name: "Luckiest Guy", className: lucky.className, weight: 400, character: "Comic-book energy", note: "Irregular, lively lettering with a bold cartoon personality." },
    { name: "Bungee", className: bungee.className, weight: 400, character: "Arcade & blocky", note: "Square, structured lettering with a classic game-sign feel." },
    { name: "Titan One", className: titan.className, weight: 400, character: "Extra chunky", note: "Oversized, pillowy letters for a louder, character-led look." },
    { name: "Bowlby One SC", className: bowlby.className, weight: 400, character: "Big & punchy", note: "Heavy small caps with a broad, poster-like presence." },
    { name: "Changa One", className: changa.className, weight: 400, character: "Compact & spirited", note: "Tight, energetic lettering that keeps long headlines compact." },
    { name: "Paytone One", className: paytone.className, weight: 400, character: "Bold & polished", note: "A cleaner display style with just enough playful character." },
    { name: "Rowdies", className: rowdies.className, weight: 700, character: "Quirky & distinctive", note: "Unusual curves and cuts give the headlines a more individual voice." },
  ]} />;
}
