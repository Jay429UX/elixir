import type { Metadata } from "next";
import { Montserrat, Archivo_Black, Anton } from "next/font/google";
import Link from "next/link";

export const metadata: Metadata = { title: "Elixir hero font comparison" };

const montserrat = Montserrat({ weight: "900", subsets: ["latin"], display: "swap" });
const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], display: "swap" });
const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

const fonts = [
  { id: "montserrat", name: "Montserrat Black", note: "Weight 900. Wide, geometric, the one on the site now.", cls: montserrat.className, tracking: "-0.015em", upper: false },
  { id: "archivo", name: "Archivo Black", note: "Single heavy weight. Wide and blocky with a slightly squarer feel.", cls: archivo.className, tracking: "-0.01em", upper: false },
  { id: "anton", name: "Anton", note: "Tall and condensed. Fits more text per line, reads like a poster.", cls: anton.className, tracking: "0.01em", upper: false },
];

const cards = ["Crash", "Limbo", "Blackjack", "Coinflip", "Plinko", "Dice", "Keno", "Mines"];

export default function HeroFontCompare() {
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#120a1f)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <p className="ui-eyebrow mb-3 mt-8">Elixir design lab · display font</p>
        <h1 className="text-4xl font-black leading-tight sm:text-5xl">Hero font comparison</h1>
        <p className="ui-body mt-4 max-w-xl">The same real headings from the site, set in three heavy fonts. Body text stays Geist in all three.</p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {fonts.map((f) => (
            <section key={f.id} className="rounded-3xl border border-white/10 bg-[#1b0f2c] p-6">
              <h2 className="text-sm font-semibold">{f.name}</h2>
              <p className="ui-caption mt-1">{f.note}</p>

              <div className={`${f.cls} mt-6`} style={{ letterSpacing: f.tracking, textShadow: "0 3px 0 rgba(20, 13, 36, 0.45)" }}>
                <p className="text-[2.1rem] leading-[1.02]">100% UP TO $1,000</p>
                <p className="mt-3 text-[2.1rem] leading-[1.02]">PICK YOUR POTION</p>
                <p className="mt-6 text-4xl leading-none">Pick your potion</p>
                <p className="mt-3 text-3xl leading-none text-[#fff3c4]">26,599.99</p>
                <p className="mt-3 text-2xl leading-none">Congratulations!</p>
              </div>

              <p className="ui-caption mt-6">Elixir Originals card names, 20px</p>
              <div className={`${f.cls} mt-2 grid grid-cols-2 gap-2 text-xl uppercase leading-none`} style={{ letterSpacing: f.tracking }}>
                {cards.map((c) => (
                  <span key={c} className="rounded-lg bg-gradient-to-t from-[#1b052b] to-[#3a1a5c] px-2 py-3 text-center">{c}</span>
                ))}
              </div>

              <p className="ui-caption mt-6">Small caption, 12px</p>
              <p className={`${f.cls} mt-2 text-xs uppercase`} style={{ letterSpacing: f.tracking }}>Weekend offer · 50 free spins</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
