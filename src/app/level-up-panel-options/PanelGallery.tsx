"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowRight, GameController, Percent } from "@phosphor-icons/react";
import VipBadge from "@/components/ui/VipBadge";
import DeepLiquidShader from "@/components/ui/DeepLiquidShader";

const BRONZE = "/vip/elixir/tier1.svg";
const SILVER = "/vip/elixir/tier2.svg";

/* The grey-purple gradient panel of the Level Up modal, in different treatments.
   The real panel is `.lu-gradient` (globals.css); each variant adds layers on top of it. */

const fountain = Array.from({ length: 16 }, (_, i) => {
  const spread = (i / 15) * 2 - 1;
  return { i, x: spread * (44 + (i % 3) * 14), y: -(54 + ((i * 17) % 40)), size: 3 + (i % 3) * 2, delay: (i * 0.23) % 2.4, dur: 1.5 + ((i * 0.19) % 0.9), gold: i % 3 === 0 };
});

const Fountain = () => (
  <div aria-hidden="true" className="absolute left-1/2 top-2 size-0">
    {fountain.map((p) => (
      <span key={p.i} className={p.gold ? "lu-fountain lu-fountain-gold" : "lu-fountain"}
        style={{ width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px` }} />
    ))}
  </div>
);

const Copy = ({ title = "Congratulations!", sub = "You've reached a new level and earned a bonus!" }: { title?: string; sub?: string }) => (
  <>
    <h3 className="hero-headline relative mt-3 text-3xl text-white">{title}</h3>
    <p className="ui-body relative mt-1 px-5">{sub}</p>
  </>
);

const Panel = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`lu-gradient relative w-full max-w-[440px] overflow-hidden rounded-xl text-center ${className}`}>{children}</div>
);

const Xp = () => (
  <div className="relative mx-auto mt-4 w-[78%] text-left">
    <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-white/70"><span>Next: Silver I</span><span>2,550 XP to go</span></div>
    <div className="h-2 overflow-hidden rounded-full bg-black/35"><div className="lp-fill h-full rounded-full bg-gradient-to-r from-cyan-400 to-lime-300" /></div>
  </div>
);

const RankChange = () => (
  <div className="relative flex items-center justify-center gap-4">
    <VipBadge src={BRONZE} className="lp-old size-20" />
    <ArrowRight weight="bold" className="lp-arrow size-6 text-white/70" />
    <VipBadge src={SILVER} className="lp-flip size-32" />
  </div>
);

type Variant = { name: string; note: string; render: () => ReactNode };

const variants: Variant[] = [
  {
    name: "Today",
    note: "Gradient with a fountain of sparks. Everything sits in the middle, with empty space around it.",
    render: () => (
      <Panel className="pb-8 pt-20">
        <div className="relative mx-auto size-28"><Fountain /><VipBadge src={BRONZE} className="lu-pop size-28" /></div>
        <Copy />
      </Panel>
    ),
  },
  {
    name: "1. Liquid floor",
    note: "The neon bubbling potion fills the bottom of the panel. Bubbles rise out of it, float up past the badge and pop.",
    render: () => (
      <Panel className="min-h-[380px] pt-16">
        <DeepLiquidShader className="absolute inset-x-0 bottom-0 h-[62%] w-full" />
        <div className="relative z-10">
          <VipBadge src={BRONZE} className="lu-pop mx-auto size-28" />
          <Copy />
        </div>
      </Panel>
    ),
  },
  {
    name: "2. Rank change",
    note: "Bronze fades back and Silver flips in. It shows what actually happened instead of 'a new level'.",
    render: () => (
      <Panel className="pb-8 pt-12">
        <RankChange />
        <Copy title="Rank up!" sub="You moved from Bronze I to Silver I." />
      </Panel>
    ),
  },
  {
    name: "3. Rays and glow",
    note: "Slow light rays turn behind the badge, with a glow that pulses in the tier colour.",
    render: () => (
      <Panel className="pb-8 pt-16">
        <div className="lp-rays" />
        <div className="lp-glow" />
        <div className="relative mx-auto size-32"><VipBadge src={BRONZE} className="lu-pop size-32" /></div>
        <Copy />
      </Panel>
    ),
  },
  {
    name: "4. Coin shower",
    note: "Your spinning coin falls from the top in a loop while the badge pops in. Loud, in a good way.",
    render: () => (
      <Panel className="pb-8 pt-20">
        {[8, 22, 36, 52, 66, 80, 92].map((left, i) => (
          <div key={left} className="lp-coin" style={{ left: `${left}%`, animationDelay: `${(i * 0.37) % 2.2}s`, animationDuration: `${2.3 + (i % 3) * 0.4}s` }}>
            <DotLottieReact src="/animations/coin-spin.json" autoplay loop renderConfig={{ devicePixelRatio: 2 }} />
          </div>
        ))}
        <VipBadge src={BRONZE} className="lu-pop relative mx-auto size-28" />
        <Copy />
      </Panel>
    ),
  },
  {
    name: "5. XP bar to next rank",
    note: "A bar fills with an ease-out under the badge, so the reward feels like part of a journey.",
    render: () => (
      <Panel className="pb-8 pt-16">
        <div className="relative mx-auto size-28"><Fountain /><VipBadge src={BRONZE} className="lu-pop size-28" /></div>
        <Copy />
        <Xp />
      </Panel>
    ),
  },
  {
    name: "6. Reward tiles",
    note: "Three small tiles under the message turn the empty space into content: the bonus, a rakeback boost and free spins.",
    render: () => (
      <Panel className="pb-6 pt-16">
        <div className="relative mx-auto size-28"><Fountain /><VipBadge src={BRONZE} className="lu-pop size-28" /></div>
        <Copy />
        <div className="relative mx-auto mt-5 grid w-[88%] grid-cols-3 gap-2">
          {[
            { icon: <img src="/crypto/usdc.svg" alt="" className="size-6" />, big: "245.13", small: "USDC bonus" },
            { icon: <Percent weight="bold" className="size-6 text-lime-300" />, big: "+1.5%", small: "Rakeback" },
            { icon: <GameController weight="fill" className="size-6 text-lime-300" />, big: "5", small: "Free spins" },
          ].map((t, i) => (
            <div key={t.small} className="lp-tile rounded-xl bg-black/30 px-2 py-3 ring-1 ring-white/10" style={{ animationDelay: `${0.5 + i * 0.15}s` }}>
              <div className="grid place-items-center">{t.icon}</div>
              <p className="mt-1.5 text-lg font-black tabular-nums text-white">{t.big}</p>
              <p className="text-[11px] text-white/60">{t.small}</p>
            </div>
          ))}
        </div>
      </Panel>
    ),
  },
  {
    name: "Recommended: 1 + 2 + 5",
    note: "Rank change on top, XP bar to the next rank, and the bubbling liquid floor underneath.",
    render: () => (
      <Panel className="min-h-[580px] pt-10">
        <DeepLiquidShader className="absolute inset-x-0 bottom-0 h-[42%] w-full" />
        <div className="relative z-10">
          <RankChange />
          <Copy title="Rank up!" sub="You moved from Bronze I to Silver I." />
          <Xp />
        </div>
      </Panel>
    ),
  },
];

export default function PanelGallery() {
  const [replay, setReplay] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#120a1f)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <p className="ui-eyebrow mb-3 mt-8">Elixir design lab · Level up panel</p>
        <h1 className="hero-headline text-4xl leading-tight sm:text-5xl">Fill the level up panel</h1>
        <p className="ui-body mt-4 max-w-2xl">The gradient panel inside the Level Up modal, with different ideas for what lives in it. Press Replay to watch the entrance animations again. The rank, XP and reward numbers are placeholders.</p>
        <button onClick={() => setReplay((v) => v + 1)} className="mt-5 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15">Replay animations</button>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {variants.map((v, i) => (
            <section key={v.name} className={`rounded-3xl border p-5 transition-colors ${selected === i ? "border-lime-300 bg-[#24123a]" : "border-white/10 bg-[#1b0f2c]"}`}>
              <div key={replay} className="flex justify-center rounded-2xl bg-[#231738] p-4">{v.render()}</div>
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
