"use client";

import { useState } from "react";
import Link from "next/link";

/* Generated with GPT Image 2.6 (SVG output) on Higgsfield, gold tier. Files in /public/vip/options. */
/* Round 2: hex direction, bolder, nothing outside the hexagon. Round 1 files (opt1-10.svg) are kept. */
const badges = [
  { name: "Bold medallion", note: "Thick bevelled gold rim, purple centre, big glowing flask." },
  { name: "Faceted gem", note: "Six bright gold facets with a green flask on top." },
  { name: "Potion hex", note: "The hexagon itself is the bottle, filled with green liquid and a glow." },
  { name: "3D crowned hex", note: "Extruded gold sides, purple enamel face, flask and small crown." },
  { name: "Esports ring", note: "Gold hex, green inner ring, flat graphic flask. Maximum contrast." },
];

const sizes = [96, 48, 32, 24, 16];

export default function BadgeGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#120a1f)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <p className="ui-eyebrow mb-3 mt-8">Elixir design lab · VIP badge styles</p>
        <h1 className="hero-headline text-4xl leading-tight sm:text-5xl">Pick a badge style</h1>
        <p className="ui-body mt-4 max-w-xl">Five hexagon variations made with GPT Image 2.6, all in the gold tier. Each is shown at 96, 48, 32, 24 and 16px, plus beside a name in chat. Choose one, then tell me its number.</p>

        <section className="mt-10 rounded-3xl border border-lime-300/40 bg-[#1b0f2c] p-6">
          <h2 className="font-semibold">Bold medallion · all tiers</h2>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-5">
            {["bronze", "silver", "gold", "diamond", "sapphire"].map((t) => (
              <div key={t} className="flex flex-col items-center gap-3">
                <img src={`/vip/options/tier-${t}.svg`} width={96} height={96} alt={`${t} badge`} />
                <div className="flex items-end gap-3">
                  {[32, 24, 16].map((s) => <img key={s} src={`/vip/options/tier-${t}.svg`} width={s} height={s} alt="" />)}
                </div>
                <span className="text-sm capitalize text-[var(--text-secondary)]">{t}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b, i) => {
            const src = `/vip/options/hex${i + 1}.svg`;
            return (
              <section key={b.name} className={`rounded-3xl border p-5 transition-colors ${selected === i ? "border-lime-300 bg-[#24123a]" : "border-white/10 bg-[#1b0f2c]"}`}>
                <div className="flex items-end gap-4">
                  {sizes.map((s) => (
                    <img key={s} src={src} width={s} height={s} alt={s === 96 ? `${b.name} badge` : ""} />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-black/30 px-3 py-2 text-sm">
                  <img src={src} width={18} height={18} alt="" />
                  <span className="font-semibold text-purple-200">CryptoKing</span>
                  <span className="text-[var(--text-muted)]">gg nice hit</span>
                </div>
                <h2 className="mt-4 font-semibold"><span className="text-[var(--text-muted)]">{String(i + 1).padStart(2, "0")}</span> {b.name}</h2>
                <p className="ui-caption mt-1 text-[var(--text-secondary)]">{b.note}</p>
                <button onClick={() => setSelected(i)} className="mt-4 w-full rounded-xl bg-white/5 py-2 text-sm font-semibold hover:bg-white/10">
                  {selected === i ? "Selected" : `Choose option ${i + 1}`}
                </button>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
