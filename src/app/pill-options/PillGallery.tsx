"use client";

import { useState } from "react";
import Link from "next/link";

const options = [
  { name: "Liquid gold", style: "gold", icon: "✦", note: "A warm foil finish with a slow sweep of light." },
  { name: "Potion bubbles", style: "potion", icon: "⚗", note: "Tiny potion bubbles rise behind the label." },
  { name: "Royal seal", style: "royal", icon: "♛", note: "A purple enamel badge with a golden crown." },
  { name: "Prismatic", style: "prism", icon: "◆", note: "An iridescent edge shifts through jewel tones." },
  { name: "Starlight", style: "stars", icon: "✧", note: "Small stars softly twinkle around the lettering." },
  { name: "Alchemist’s orbit", style: "orbit", icon: "✦", note: "A golden spark traces a thin orbital ring." },
  { name: "Neon elixir", style: "neon", icon: "◈", note: "An electric purple outline with a gentle glow." },
  { name: "Lava lamp", style: "lava", icon: "●", note: "Soft pools of violet and pink drift under glass." },
  { name: "Royal ribbon", style: "ribbon", icon: "♛", note: "A folded gold ribbon with a passing glint." },
  { name: "Enchanted ink", style: "ink", icon: "✺", note: "A quiet dark finish with a moving gold underline." },
  { name: "Liquid green", style: "liquid-green", icon: "", note: "Glowing green liquid, a rolling surface and glossy bubbles that rise and pop." },
];

function Pill({ style, icon }: { style: string; icon: string }) {
  return <span className={`exclusive-pill ep-${style}`}><span aria-hidden="true" className="ep-decoration" />{style === "liquid-green" && <span aria-hidden="true" className="ep-liquid"><span className="ep-liquid-wave" />{[0,1,2,3,4].map(bubble => <span key={bubble} className={`ep-liquid-bubble ep-liquid-bubble-${bubble}`} />)}</span>}{icon && <span aria-hidden="true" className="ep-icon">{icon}</span>}<span className="ep-label">Exclusive</span><span aria-hidden="true" className="ep-spark">✦</span></span>;
}

export default function PillGallery() {
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main className={`pill-gallery ${paused ? "pills-paused" : ""}`}>
      <header className="pill-page-header">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div><p className="ui-eyebrow mb-3">Elixir design lab · {options.length} directions</p><h1 className="hero-headline text-4xl leading-tight sm:text-5xl">A little badge.<br />A little more magic.</h1><p className="ui-body mt-4 max-w-lg">Explore Exclusive pills at game-card size. Choose a favorite below, then tell me its number.</p><Link href="#liquid-green" className="mt-3 inline-block text-sm text-lime-300 underline underline-offset-4">New: Liquid green →</Link></div>
          <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="pill-control">{paused ? "Resume animations" : "Pause animations"}</button>
        </div>
      </header>
      <div className="pill-options-grid">
        {options.map((option, index) => <article id={option.style} key={option.style} className={`pill-option ${selected === index ? "pill-selected" : ""}`}>
          <div className="pill-demo-stage"><div className="pill-game-card">
            <img src="/games/originals/coinflip-thumb.webp" alt="Coinflip potion artwork" width={600} height={804} />
            <div className="pill-on-card"><Pill style={option.style} icon={option.icon} /></div>
            <div className="pill-game-title"><h2 className="hero-headline text-3xl leading-none">COINFLIP</h2><p>Elixir Originals</p></div>
          </div><div className="pill-isolated"><Pill style={option.style} icon={option.icon} /></div></div>
          <div className="pill-option-info"><div className="flex items-center gap-3"><span className="pill-number">{String(index + 1).padStart(2,"0")}</span><h3 className="text-base font-semibold">{option.name}</h3></div><p className="ui-body mt-3 min-h-[46px]">{option.note}</p><button type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className="pill-control mt-5 w-full">{selected === index ? `Selected · Option ${index + 1}` : `Choose option ${index + 1}`}</button></div>
        </article>)}
      </div>
      <p role="status" className="pill-choice-status">{selected === null ? "Pick a favorite to compare. The casino’s current pill stays unchanged." : `Your pick: ${selected + 1} — ${options[selected].name}. Tell me this number to apply it.`}</p>
    </main>
  );
}
