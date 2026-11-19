"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import DeepLiquidShader from "@/components/ui/DeepLiquidShader";

/* The liquid floor from the Level Up panel, shown in the same panel so the two can be compared directly. */

const Stage = ({ liquid }: { liquid: ReactNode }) => (
  <div className="lu-gradient relative min-h-[340px] w-full max-w-[440px] overflow-hidden rounded-xl pt-10 text-center">
    {liquid}
    <div className="relative z-10 px-6">
      <h3 className="hero-headline text-3xl text-white">Rank up!</h3>
      <p className="ui-body mt-1">You moved from Bronze I to Silver I.</p>
      <div className="mx-auto mt-4 w-[78%] text-left">
        <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-white/70"><span>Next: Gold I</span><span>4,200 XP to go</span></div>
        <div className="h-2 overflow-hidden rounded-full bg-black/35"><div className="h-full w-[46%] rounded-full bg-gradient-to-r from-cyan-400 to-lime-300" /></div>
      </div>
    </div>
  </div>
);

const variants = [
  { name: "Deep", note: "Colour darkens with depth. Bubbles are shaded spheres with a specular dot and glassy rim, in four layers: tiny dim ones at the back, big out-of-focus ones at the front. Caustics shimmer on the floor and the tank edges darken like glass.", liquid: <DeepLiquidShader className="absolute inset-x-0 bottom-0 h-[62%] w-full" /> },
  { name: "Deep with light shafts", note: "The same, plus soft shafts of light falling from the surface into the liquid, for a volumetric feel.", liquid: <DeepLiquidShader rays className="absolute inset-x-0 bottom-0 h-[62%] w-full" /> },
];

export default function LiquidGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#120a1f)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <p className="ui-eyebrow mb-3 mt-8">Elixir design lab · liquid floor</p>
        <h1 className="hero-headline text-4xl leading-tight sm:text-5xl">A deeper liquid floor</h1>
        <p className="ui-body mt-4 max-w-2xl">The deep liquid, with and without light shafts, in the Level Up panel it lives in. Watch them for a few seconds, since the bubbles move at different speeds on purpose.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {variants.map((v, i) => (
            <section key={v.name} className={`rounded-3xl border p-4 transition-colors ${selected === i ? "border-lime-300 bg-[#24123a]" : "border-white/10 bg-[#1b0f2c]"}`}>
              <div className="flex justify-center rounded-2xl bg-[#231738] p-3"><Stage liquid={v.liquid} /></div>
              <h2 className="mt-4 font-semibold">{v.name}</h2>
              <p className="ui-caption mt-1 text-[var(--text-secondary)]">{v.note}</p>
              <button onClick={() => setSelected(i)} className="mt-3 w-full rounded-xl bg-white/5 py-2 text-sm font-semibold hover:bg-white/10">
                {selected === i ? "Selected" : "Choose this one"}
              </button>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
