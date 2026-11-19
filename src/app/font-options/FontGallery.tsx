"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

interface FontOption {
  name: string;
  className: string;
  weight: number;
  character: string;
  note: string;
}

export default function FontGallery({ options }: { options: FontOption[] }) {
  const [selected, setSelected] = useState(7);
  const [headline, setHeadline] = useState("100% UP TO $1,000");
  const [size, setSize] = useState(40);
  const pickerRef = useRef<HTMLElement>(null);
  const highlightRef = useRef<HTMLSpanElement>(null);
  const chosen = options[selected];

  const choose = (index: number) => {
    setSelected(index);
    const url = new URL(window.location.href);
    url.searchParams.set("v", String(index + 1));
    window.history.replaceState(null, "", url);
  };

  useEffect(() => {
    const requested = Number(new URLSearchParams(window.location.search).get("v"));
    if (requested >= 1 && requested <= options.length) setSelected(requested - 1);
  }, [options.length]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "ArrowRight") { event.preventDefault(); choose((selected + 1) % options.length); }
      else if (event.key === "ArrowLeft") { event.preventDefault(); choose((selected - 1 + options.length) % options.length); }
      else if (/^[0-9]$/.test(event.key)) choose(event.key === "0" ? 9 : Number(event.key) - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, options.length]);

  useLayoutEffect(() => {
    const update = () => {
      const active = pickerRef.current?.querySelector<HTMLElement>("[data-active]");
      if (!active || !highlightRef.current) return;
      highlightRef.current.style.width = `${active.offsetWidth}px`;
      highlightRef.current.style.transform = `translateX(${active.offsetLeft}px)`;
    };
    update();
    window.addEventListener("resize", update);
    const frame = requestAnimationFrame(() => pickerRef.current?.setAttribute("data-ready", ""));
    return () => { window.removeEventListener("resize", update); cancelAnimationFrame(frame); };
  }, [selected]);

  return (
    <div className="min-h-screen pb-32">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" aria-label="Back to Elixir"><img src="/elixir-logo.png" alt="Elixir" width={2479} height={1520} className="h-auto w-24" /></Link>
          <Link href="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300">← Back to casino</Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 sm:pt-14">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-purple-300">Elixir · Type exploration</p>
          <h1 className="mb-3 text-3xl font-semibold tracking-tight sm:text-4xl">Find the right kind of playful.</h1>
          <p className="text-sm leading-relaxed text-gray-400 sm:text-base">Ten bold directions, in the same hero. Pick a font below to see it at full size. Tell me the name or number you prefer.</p>
        </div>

        <section id="font-stage" className="scroll-mt-6" aria-labelledby="font-preview-title">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1 text-xs text-gray-400">Full-size preview · homepage unchanged</p>
              <h2 id="font-preview-title" className="text-xl font-semibold tracking-tight" aria-live="polite">{String(selected + 1).padStart(2, "0")} / {chosen.name} <span className="ml-2 text-sm font-normal text-purple-300">{chosen.character}</span></h2>
            </div>
            <label className="flex items-center gap-3 text-xs text-gray-400">Headline size <input aria-label="Headline size" type="range" min="28" max="56" value={size} onChange={event => setSize(Number(event.target.value))} className="w-28 accent-purple-400" /><output className="w-9 tabular-nums text-gray-200">{size}px</output></label>
          </div>

          <div key={selected} className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[
              { label: "Welcome bonus", title: headline || "100% UP TO $1,000", description: "Start your journey with a massive welcome bonus on your first deposit", poster: "/videos/alchemist-midas-brew-poster.jpg", action: "Claim Bonus", left: "18%" },
              { label: "Elixir Originals", title: "PICK YOUR POTION", description: "Crash, Plinko, Mines and more. Eight exclusive ways to play.", poster: "/videos/alchemist-potion-wand-mini-poster.jpg", action: "Play Now", left: "0%" },
            ].map(hero => (
              <article key={hero.label} className="relative isolate min-h-[300px] overflow-hidden rounded-2xl bg-dicey-card p-6 sm:p-8">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-80" style={{ maskImage: "linear-gradient(to right, transparent 15%, rgba(0,0,0,0.12) 48%, black 95%)", WebkitMaskImage: "linear-gradient(to right, transparent 15%, rgba(0,0,0,0.12) 48%, black 95%)" }}><img src={hero.poster} alt="" className="absolute top-0 h-full w-full object-cover" style={{ left: hero.left }} /></div>
                <div className="flex h-full flex-col items-start">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-purple-200">{hero.label}</p>
                  <h3 className={`${chosen.className} mb-3 max-w-[95%] break-words leading-[1.05] text-white text-balance`} style={{ fontSize: `${size}px`, fontWeight: chosen.weight, letterSpacing: "0.005em", textShadow: "0 3px 0 rgba(20,13,36,.45)" }}>{hero.title}</h3>
                  <p className="mb-6 max-w-[15rem] text-sm leading-relaxed text-gray-200">{hero.description}</p>
                  <span className="mt-auto rounded-lg bg-gradient-to-b from-[#8aee4f] to-[#48a72b] px-5 py-3 text-sm font-semibold text-[#10260b] shadow-[0_4px_0_#28571e]">{hero.action}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3">
            <label htmlFor="font-headline" className="shrink-0 text-xs font-medium text-gray-400">Try your own headline</label>
            <input id="font-headline" value={headline} maxLength={80} onChange={event => setHeadline(event.target.value)} className="min-w-0 flex-1 bg-transparent py-1 text-sm text-white outline-none" />
          </div>
        </section>

        <section className="mt-12" aria-labelledby="all-font-options">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2"><h2 id="all-font-options" className="text-xl font-semibold tracking-tight">All 10 directions</h2><p className="text-xs text-gray-400">Use ← → or 1–9 and 0 to compare.</p></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {options.map((font, index) => (
              <button key={font.name} type="button" aria-label={`Select ${font.name}`} aria-pressed={selected === index} onClick={() => { choose(index); document.getElementById("font-stage")?.scrollIntoView({ block: "start" }); }} className={`group rounded-2xl border p-5 text-left sm:p-6 ${selected === index ? "border-purple-400 bg-purple-400/10" : "border-white/10 bg-white/[0.025] hover:bg-white/5"}`}>
                <div className="mb-5 flex items-center justify-between gap-3"><span className="flex items-center gap-3"><span className="text-xs tabular-nums text-gray-500">{String(index + 1).padStart(2, "0")}</span><span className="text-sm font-semibold">{font.name}</span>{font.name === "Changa One" && <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-gray-400">Current</span>}</span><span className="text-xs text-purple-300">{selected === index ? "Selected ✓" : "Preview ↗"}</span></div>
                <p className={`${font.className} mb-4 text-[28px] leading-[1.12] text-white`} style={{ fontWeight: font.weight }}>{headline || "100% UP TO $1,000"}</p>
                <p className="mb-1 text-xs font-medium text-purple-200">{font.character}</p><p className="text-xs leading-relaxed text-gray-400">{font.note}</p>
              </button>
            ))}
          </div>
        </section>
      </main>

      <nav ref={pickerRef} className="proto-picker" aria-label="Prototype variants">
        <span ref={highlightRef} className="proto-picker-highlight" aria-hidden="true" />
        {options.map((font, index) => <button key={font.name} className="proto-picker-item" data-active={selected === index ? "" : undefined} aria-current={selected === index ? "true" : undefined} aria-label={`Preview ${font.name}`} title={`${index + 1}. ${font.name}`} onClick={() => choose(index)}>{index + 1}</button>)}
      </nav>
    </div>
  );
}
