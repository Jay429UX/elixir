"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import VipBadge from "@/components/ui/VipBadge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import CoinJump from "@/components/ui/CoinJump";

const BRONZE = "/vip/elixir/tier1.svg";
const SILVER = "/vip/elixir/tier2.svg";
const AMOUNT = "245.13";

const Usdc = ({ size = 24 }: { size?: number }) => <img src="/crypto/usdc.svg" alt="USDC" width={size} height={size} />;

/* Modal chrome shared by every option, so only the changed parts differ */
function Shell({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="lu-shell">
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="ui-modal-title">{title}</h3>
        <span className="grid size-9 place-items-center rounded-lg bg-white/5 text-white/70" aria-hidden="true">×</span>
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}

const Claim = ({ children = `Claim ${AMOUNT}`, onClick }: { children?: ReactNode; onClick?: () => void }) => (
  <PrimaryButton className="w-full" onClick={onClick}>
    <span className="inline-flex items-center gap-1.5">{children}<Usdc size={20} /></span>
  </PrimaryButton>
);

/* A. Baseline: what ships today */
function Baseline() {
  return (
    <Shell title="Level Up Bonus">
      <div className="rounded-xl bg-black/20 py-6 text-center">
        <VipBadge src={BRONZE} className="mx-auto mb-4 size-20" />
        <h4 className="hero-headline text-3xl text-white">Congratulations!</h4>
        <p className="ui-body mt-2 px-5">You've reached a new level and earned a bonus!</p>
        <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2"><span className="gold-shimmer text-2xl font-black">{AMOUNT}</span><Usdc /></div>
      </div>
      <div className="mt-4"><Claim /></div>
    </Shell>
  );
}

/* 1. Hero badge: bigger, tier rays behind, shows the level change */
function HeroBadge() {
  return (
    <Shell title="Level up">
      <div className="relative overflow-hidden rounded-xl bg-black/20 py-7 text-center">
        <div aria-hidden="true" className="lu-rays" style={{ ["--ray" as string]: "#ff8a2a" }} />
        <div className="relative">
          <VipBadge src={BRONZE} className="lu-pop mx-auto size-36" />
          <p className="mt-2 text-xs font-semibold text-lime-300">New rank</p>
          <h4 className="hero-headline text-3xl text-white">Bronze I</h4>
          <p className="ui-body mt-1 px-5">Nice work. Your level up bonus is ready.</p>
          <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2"><span className="gold-shimmer text-2xl font-black">{AMOUNT}</span><Usdc /></div>
        </div>
      </div>
      <div className="mt-4"><Claim /></div>
    </Shell>
  );
}

/* 2. Coin spin: your coin beside the amount, leaps out on claim */
function CoinSpin() {
  const [n, setN] = useState(0);
  return (
    <Shell title="Level Up Bonus">
      <div className="rounded-xl bg-black/20 py-6 text-center">
        <VipBadge src={BRONZE} className="mx-auto mb-3 size-20" />
        <h4 className="hero-headline text-3xl text-white">Congratulations!</h4>
        <div className="mx-auto mt-4 flex items-center justify-center gap-1">
          <div className="size-14"><CoinLoop /></div>
          <span className="gold-shimmer text-4xl font-black tabular-nums">{AMOUNT}</span>
        </div>
        <p className="ui-caption mt-1">USDC bonus</p>
      </div>
      <div className="relative mt-4">
        <Claim onClick={() => setN((v) => v + 1)} />
        {n > 0 && <CoinJump key={n} rise={140} onDone={() => setN(0)} className="!bottom-4" />}
      </div>
    </Shell>
  );
}

function CoinLoop() {
  // plain looping coin, no jump
  return <CoinJump key="loop" className="lu-coin-static" />;
}

/* 4. King art behind the top of the card */
function KingArt() {
  return (
    <Shell title="Level Up Bonus">
      <div className="relative overflow-hidden rounded-xl">
        <img src="/promo-offer.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-[25%_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231a35] via-[#231a35]/70 to-[#231a35]/20" />
        <div className="relative flex flex-col items-center px-4 pb-5 pt-24 text-center">
          <VipBadge src={BRONZE} className="size-20" />
          <h4 className="hero-headline mt-2 text-3xl text-white">Congratulations!</h4>
          <p className="ui-body mt-1">You've reached a new level and earned a bonus!</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-black/40 px-5 py-2 backdrop-blur-sm"><span className="gold-shimmer text-2xl font-black">{AMOUNT}</span><Usdc /></div>
        </div>
      </div>
      <div className="mt-4"><Claim /></div>
    </Shell>
  );
}

/* 3. Celebration: badge scales in, sparkles burst once */
function Celebrate() {
  const sparks = Array.from({ length: 14 }, (_, i) => i);
  return (
    <Shell title="Level up">
      <div className="relative overflow-hidden rounded-xl bg-black/20 py-7 text-center">
        <div className="relative mx-auto size-28">
          {sparks.map((i) => {
            const a = (i / sparks.length) * Math.PI * 2;
            return <span key={i} aria-hidden="true" className="lu-spark" style={{ ["--x" as string]: `${Math.cos(a) * 92}px`, ["--y" as string]: `${Math.sin(a) * 92}px`, animationDelay: `${(i % 4) * 40}ms` }}>✦</span>;
          })}
          <VipBadge src={BRONZE} className="lu-pop size-28" />
        </div>
        <h4 className="hero-headline mt-3 text-3xl text-white">Congratulations!</h4>
        <p className="ui-body mt-1 px-5">You've reached a new level and earned a bonus!</p>
        <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2"><span className="gold-shimmer text-2xl font-black">{AMOUNT}</span><Usdc /></div>
      </div>
      <div className="mt-4"><Claim /></div>
    </Shell>
  );
}

/* 5. Next reward: level change plus progress to the next rank, tighter type */
function NextReward() {
  return (
    <Shell title={<span className="text-lime-300">Level up!</span>}>
      <div className="rounded-xl bg-black/20 p-5 text-center">
        <div className="flex items-center justify-center gap-4">
          <VipBadge src={BRONZE} className="size-16" />
          <span aria-hidden="true" className="text-xl text-white/40">→</span>
          <VipBadge src={SILVER} className="size-16 opacity-60" />
        </div>
        <h4 className="hero-headline mt-3 text-2xl text-white">You're now Bronze I</h4>
        <div className="mt-3 text-left">
          <div className="mb-1 flex justify-between text-[11px] text-white/60"><span>Next: Silver I</span><span>2,550 XP to go</span></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[22%] rounded-full bg-gradient-to-r from-cyan-400 to-lime-300" /></div>
        </div>
        <div className="mt-4 flex items-baseline justify-center gap-2"><span className="gold-shimmer text-4xl font-black">{AMOUNT}</span><span className="text-sm font-semibold text-white/60">USDC</span></div>
      </div>
      <div className="mt-4"><Claim /></div>
    </Shell>
  );
}

/* 6. Particles: potion bubbles and gold sparks drift up behind the badge, plus a pop of sparks on open.
   Values come from the index (no Math.random) so server and client render the same thing. */
function Particles() {
  const items = Array.from({ length: 22 }, (_, i) => {
    const bubble = i % 3 !== 0;
    return {
      i, bubble,
      left: 6 + ((i * 37) % 88),
      size: bubble ? 6 + ((i * 5) % 9) : 8 + ((i * 3) % 6),
      delay: -((i * 0.47) % 5),
      dur: 3.6 + ((i * 0.31) % 2.4),
      drift: ((i % 5) - 2) * 10,
    };
  });
  return (
    <Shell title="Level up">
      <div className="relative overflow-hidden rounded-xl bg-black/20 pb-6 pt-8 text-center">
        <div aria-hidden="true" className="absolute inset-0">
          {items.map((p) => (
            <span
              key={p.i}
              className={p.bubble ? "lu-particle lu-bubble" : "lu-particle lu-sparkle"}
              style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, ["--drift" as string]: `${p.drift}px` }}
            >{p.bubble ? "" : "✦"}</span>
          ))}
        </div>
        <div aria-hidden="true" className="lu-glow-orb" />
        <div className="relative">
          <VipBadge src={BRONZE} className="lu-pop mx-auto size-28" />
          <h4 className="hero-headline mt-3 text-3xl text-white">Congratulations!</h4>
          <p className="ui-body mt-1 px-5">You've reached a new level and earned a bonus!</p>
          <div className="mx-auto mt-3 inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2 backdrop-blur-sm"><span className="gold-shimmer text-2xl font-black">{AMOUNT}</span><Usdc /></div>
        </div>
      </div>
      <div className="mt-4"><Claim /></div>
    </Shell>
  );
}

/* 7. Simple gradient background, small particles spraying up from the top of the badge */
function GradientFountain() {
  const items = Array.from({ length: 16 }, (_, i) => {
    const spread = (i / 15) * 2 - 1; // -1 to 1 across the fan
    return {
      i,
      x: spread * (44 + (i % 3) * 14),
      y: -(54 + ((i * 17) % 40)),
      size: 3 + (i % 3) * 2,
      delay: (i * 0.23) % 2.4,
      dur: 1.5 + ((i * 0.19) % 0.9),
      gold: i % 3 === 0,
    };
  });
  return (
    <Shell title="Level up">
      <div className="lu-gradient relative overflow-hidden rounded-xl pb-6 pt-14 text-center">
        <div className="relative mx-auto size-28">
          <div aria-hidden="true" className="absolute left-1/2 top-2 size-0">
            {items.map((p) => (
              <span
                key={p.i}
                className={p.gold ? "lu-fountain lu-fountain-gold" : "lu-fountain"}
                style={{ width: p.size, height: p.size, animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px` }}
              />
            ))}
          </div>
          <VipBadge src={BRONZE} className="lu-pop size-28" />
        </div>
        <h4 className="hero-headline relative mt-3 text-3xl text-white">Congratulations!</h4>
        <p className="ui-body relative mt-1 px-5">You've reached a new level and earned a bonus!</p>
        <div className="relative mx-auto mt-3 inline-flex items-center gap-2 rounded-xl bg-black/25 px-5 py-2"><span className="gold-shimmer text-2xl font-black">{AMOUNT}</span><Usdc /></div>
      </div>
      <div className="mt-4"><Claim /></div>
    </Shell>
  );
}

/* Recommended combo: 1 + 2 + 4 */
function Combo() {
  const [n, setN] = useState(0);
  return (
    <Shell title="Level up">
      <div className="relative overflow-hidden rounded-xl">
        <img src="/promo-offer.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-[25%_center] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#231a35] via-[#231a35]/80 to-[#231a35]/30" />
        <div aria-hidden="true" className="lu-rays" style={{ ["--ray" as string]: "#ff8a2a" }} />
        <div className="relative px-4 pb-5 pt-8 text-center">
          <VipBadge src={BRONZE} className="lu-pop mx-auto size-32" />
          <p className="mt-2 text-xs font-semibold text-lime-300">New rank</p>
          <h4 className="hero-headline text-3xl text-white">Bronze I</h4>
          <div className="mx-auto mt-3 flex items-center justify-center gap-1">
            <div className="size-12"><CoinLoop /></div>
            <span className="gold-shimmer text-4xl font-black tabular-nums">{AMOUNT}</span>
          </div>
        </div>
      </div>
      <div className="relative mt-4">
        <Claim onClick={() => setN((v) => v + 1)} />
        {n > 0 && <CoinJump key={n} rise={150} onDone={() => setN(0)} className="!bottom-4" />}
      </div>
    </Shell>
  );
}

const options = [
  { id: "baseline", name: "Today", note: "The current modal, for comparison.", node: Baseline },
  { id: "hero", name: "1. Hero badge", note: "Badge about twice the size with tier rays behind it. Says the new rank instead of 'a new level'.", node: HeroBadge },
  { id: "coin", name: "2. Coin spin", note: "Your spinning coin beside a bigger amount. Press Claim to see the coin leap out.", node: CoinSpin },
  { id: "celebrate", name: "3. Celebration", note: "Badge scales in with a soft bounce and a one-time sparkle burst.", node: Celebrate },
  { id: "king", name: "4. King art", note: "The King image fades in behind the top, like the sidebar offer.", node: KingArt },
  { id: "next", name: "5. Next reward", note: "Shows Bronze to Silver, XP progress to the next rank, and tighter type.", node: NextReward },
  { id: "particles", name: "6. Particles", note: "Potion bubbles and gold sparks drift up behind the badge the whole time the modal is open.", node: Particles },
  { id: "gradient", name: "7. Gradient + fountain", note: "A plain gradient background, with small particles spraying up from the top of the badge.", node: GradientFountain },
  { id: "combo", name: "Recommended: 1 + 2 + 4", note: "Hero badge with rays, King art, spinning coin and the coin leap on Claim.", node: Combo },
];

export default function LevelUpGallery() {
  const [replay, setReplay] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#120a1f)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <p className="ui-eyebrow mb-3 mt-8">Elixir design lab · Level up modal</p>
        <h1 className="hero-headline text-4xl leading-tight sm:text-5xl">Upgrade the level up modal</h1>
        <p className="ui-body mt-4 max-w-xl">Each card is the same modal with one idea changed, so you can compare them side by side. Press Replay to watch the entrance animations again, and press Claim on options 2 and Recommended to see the coin.</p>
        <button onClick={() => setReplay((v) => v + 1)} className="mt-5 rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15">Replay animations</button>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {options.map((o) => {
            const Node = o.node;
            return (
              <section key={o.id} className={`rounded-3xl border p-4 transition-colors ${selected === o.id ? "border-lime-300 bg-[#24123a]" : "border-white/10 bg-[#1b0f2c]"}`}>
                <div key={replay} className="flex justify-center"><Node /></div>
                <h2 className="mt-4 font-semibold">{o.name}</h2>
                <p className="ui-caption mt-1 text-[var(--text-secondary)]">{o.note}</p>
                <button onClick={() => setSelected(o.id)} className="mt-3 w-full rounded-xl bg-white/5 py-2 text-sm font-semibold hover:bg-white/10">
                  {selected === o.id ? "Selected" : "Choose this one"}
                </button>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
