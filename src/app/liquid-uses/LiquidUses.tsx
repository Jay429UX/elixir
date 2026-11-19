"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import PrimaryButton from "@/components/ui/PrimaryButton";
import DeepLiquidShader from "@/components/ui/DeepLiquidShader";
import { originalGames } from "@/lib/originalGames";

/* Mock-ups of places the deep liquid could live. Each one is a static preview, not the real component.
   The liquid is one canvas; moving the canvas up and down changes the level without redrawing it. */

/* Only draw the (heavy) canvas while a preview is on screen */
function InView({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={className}>{on ? children : null}</div>;
}

/* h = height of the area in px. level = how full it is (0 to 1). from = optional starting level to animate from. */
function Liquid({ h, level, from, loop = false, rays = false, scale = 0.6 }: { h: number; level: number; from?: number; loop?: boolean; rays?: boolean; scale?: number }) {
  const H = Math.round(h * 1.7);
  const ty = (l: number) => Math.round(0.64 * H - l * h);
  const style: CSSProperties = from === undefined
    ? { height: H, transform: `translateY(${ty(level)}px)` }
    : ({ height: H, ["--y0" as string]: `${ty(from)}px`, ["--y1" as string]: `${ty(level)}px`, animation: loop ? "lq-rise 6s ease-in-out infinite alternate" : undefined, transform: `translateY(${ty(from)}px)` } as CSSProperties);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full" style={style}>
        <DeepLiquidShader className="h-full w-full" rays={rays} scale={scale} />
      </div>
    </div>
  );
}

const Frame = ({ children, className = "", h }: { children: ReactNode; className?: string; h?: number }) => (
  <div className={`relative isolate overflow-hidden ${className}`} style={h ? { height: h } : undefined}>{children}</div>
);

/* 1. Pick your potion modal: the flask sits above a pool, cards rest on its surface */
function PickPotion() {
  const games = originalGames.slice(0, 4);
  return (
    <div className="relative mt-24 w-full max-w-[520px]">
      <video src="/animations/flask-swish.webm" autoPlay loop muted playsInline aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 z-20 size-44 -translate-x-1/2 -translate-y-[58%] object-contain" />
      <Frame className="rounded-3xl border border-white/10 bg-[#231738] px-6 pb-7 pt-[96px] text-center" h={430}>
        <Liquid h={430} level={0.36} />
        <div className="relative z-10">
          <p className="ui-eyebrow">Elixir Originals</p>
          <h4 className="hero-headline mt-1 text-3xl leading-none text-white">Pick your potion</h4>
          <p className="ui-body mx-auto mt-2 max-w-xs text-sm">Every Elixir Original includes a bonus. Choose one to start playing.</p>
          <ul className="mt-6 grid grid-cols-4 gap-2.5">
            {games.map((g) => (
              <li key={g.id} className="overflow-hidden rounded-xl border border-white/10 bg-[#140a24]/80 shadow-[0_10px_20px_rgba(0,0,0,0.45)]">
                <img src={g.image} alt="" className="aspect-[3/4] w-full object-cover" />
              </li>
            ))}
          </ul>
        </div>
      </Frame>
    </div>
  );
}

/* 2. Welcome bonus: the offer is a potion that slowly brews up and settles */
function Welcome() {
  return (
    <Frame className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#231738] px-7 pb-8 pt-8" h={400}>
      <Liquid h={400} level={0.46} from={0.22} loop />
      <div className="relative z-10">
        <p className="ui-eyebrow">Your welcome bonus</p>
        <h4 className="hero-headline mt-2 text-4xl leading-none text-white">A little extra<br />for your first brew.</h4>
        <p className="hero-headline mt-4 text-2xl text-[#d6b3ff]">100% up to $1,000</p>
        <p className="ui-body mt-2 text-sm">Double your first deposit with a matching bonus.</p>
        <PrimaryButton className="mt-24 w-full">Explore games</PrimaryButton>
      </div>
    </Frame>
  );
}

/* 3. Potion Rain banner in chat, same size as a chat card */
function Rain() {
  return (
    <Frame className="w-[287px] rounded-lg border border-white/10 bg-[#2a1d42]" h={71}>
      <Liquid h={71} level={0.34} />
      <div className="relative z-10 flex h-full items-center justify-between p-3">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold leading-[13px] text-lime-300">Potion Rain</p>
          <p className="hero-headline text-[17px] leading-[19px] text-white">1,000 USDC</p>
          <p className="text-[11px] leading-[13px] text-purple-200">Shared in chat every hour</p>
        </div>
        <PrimaryButton className="shrink-0 !px-0 !pt-0 [&_.ui-button-face]:px-4 [&_.ui-button-face]:py-2 [&_.ui-button-face]:text-xs">Join</PrimaryButton>
      </div>
    </Frame>
  );
}

/* 4. Sidebar offer card */
function Sidebar() {
  return (
    <Frame className="w-[216px] rounded-xl bg-gradient-to-b from-[#3a2166] to-[#241338]" h={170}>
      <Liquid h={170} level={0.3} />
      <div className="relative z-10 p-3 pt-6">
        <p className="text-[11px] font-semibold leading-[13px] text-lime-300">Weekend offer</p>
        <p className="hero-headline mt-1 text-xl leading-[22px] text-white">50 free spins</p>
        <p className="mt-1 text-[11px] leading-[14px] text-purple-200">On your next deposit of $20 or more</p>
        <PrimaryButton className="mt-5 w-full [&_.ui-button-face]:py-2 [&_.ui-button-face]:text-xs">Get offer</PrimaryButton>
      </div>
    </Frame>
  );
}

/* 5. Bonus cooldowns: a small flask that drains and refills as time passes */
function Cooldowns() {
  const rows = [
    { name: "Daily Bonus", time: "23:59:57", level: 0.08 },
    { name: "Rakeback", time: "00:59:57", level: 0.6 },
  ];
  return (
    <div className="w-full max-w-[320px] space-y-2 rounded-xl bg-[#2a1d42] p-2">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center justify-between rounded-xl bg-white/[0.06] p-3">
          <div className="flex items-center gap-3">
            <Frame className="size-11 rounded-full bg-black/30 ring-2 ring-white/15">
              <Liquid h={44} level={r.level} scale={0.5} />
            </Frame>
            <div>
              <span className="block text-sm text-white">{r.name}</span>
              <span className="text-xs text-gray-500">Resets in countdown</span>
            </div>
          </div>
          <span className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold tabular-nums text-gray-300">{r.time}</span>
        </div>
      ))}
    </div>
  );
}

/* 6. Loading screen: the potion fills, then the page appears */
function Loading() {
  return (
    <Frame className="grid w-full max-w-[420px] place-items-center rounded-3xl border border-white/10 bg-[#140a24]" h={300}>
      <div className="relative z-10 text-center">
        <div className="relative mx-auto size-32 overflow-hidden rounded-b-[64px] rounded-t-[18px] border-2 border-white/25 bg-black/30">
          <div className="lq-fill-loop absolute inset-0" style={{ ["--y0" as string]: "0px", ["--y1" as string]: "0px" } as CSSProperties} />
          <div className="absolute inset-0">
            <div className="lq-fill-loop absolute bottom-0 left-0 w-full" style={{ height: 218, ["--y0" as string]: `${Math.round(0.64 * 218)}px`, ["--y1" as string]: `${Math.round(0.64 * 218 - 0.85 * 128)}px` } as CSSProperties}>
              <DeepLiquidShader className="h-full w-full" scale={0.5} />
            </div>
          </div>
        </div>
        <p className="hero-headline mt-5 text-xl text-white">Brewing</p>
        <p className="ui-caption mt-1">Getting your tables ready</p>
      </div>
    </Frame>
  );
}

/* 7. Deposit success: the liquid rises to show the new balance */
function Deposit() {
  return (
    <Frame className="w-full max-w-[360px] rounded-3xl border border-white/10 bg-[#231738] px-7 pt-7 text-center" h={360}>
      <Liquid h={360} level={0.5} from={0.28} loop />
      <div className="relative z-10">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-lime-300/20 text-lime-300">✓</div>
        <h4 className="hero-headline mt-3 text-2xl text-white">Deposit received</h4>
        <p className="ui-body mt-1 text-sm">+500.00 USDC added to your balance</p>
        <p className="hero-headline mt-3 text-4xl text-[#fff3c4]" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>$1,750.00</p>
      </div>
    </Frame>
  );
}

/* 8. Crash: the multiplier is the liquid level climbing */
function Crash() {
  const [m, setM] = useState(1);
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const t = ((performance.now() - start) / 1000) % 8;
      setM(t < 6.5 ? 1 + Math.pow(t / 6.5, 1.6) * 9 : 10);
    }, 60);
    return () => clearInterval(id);
  }, []);
  const level = Math.min(0.95, 0.06 + ((m - 1) / 9) * 0.9);
  return (
    <Frame className="w-full max-w-[360px] rounded-3xl border border-white/10 bg-[#231738] text-center" h={360}>
      <div className="absolute inset-0 transition-transform duration-100 ease-linear" style={{ transform: "translateY(0)" }}>
        <Liquid h={360} level={level} scale={0.5} />
      </div>
      <div className="relative z-10 pt-10">
        <p className="ui-eyebrow">Crash</p>
        <p className="hero-headline mt-2 text-6xl tabular-nums text-white" style={{ textShadow: "0 3px 16px rgba(0,0,0,0.65)" }}>{m.toFixed(2)}x</p>
        <p className="ui-caption mt-2">The level is the multiplier</p>
      </div>
    </Frame>
  );
}

/* 9. Empty state */
function Empty() {
  return (
    <Frame className="w-full max-w-[300px] rounded-xl bg-[#2a1d42] text-center" h={190}>
      <Liquid h={190} level={0.16} scale={0.5} />
      <div className="relative z-10 pt-9">
        <p className="text-sm font-semibold text-white">No notifications yet</p>
        <p className="ui-caption mt-1">We'll let you know when something is brewing.</p>
      </div>
    </Frame>
  );
}

const uses = [
  { name: "1. Pick your potion modal", note: "The flask sits above a pool, and the game cards rest on its surface like they're floating in it.", node: <PickPotion /> },
  { name: "2. Welcome bonus", note: "The offer is a potion that slowly brews up and settles behind the text.", node: <Welcome /> },
  { name: "3. Potion Rain banner", note: "A thin layer along the bottom of the chat promo. The name already says liquid.", node: <Rain /> },
  { name: "4. Sidebar offer card", note: "A pool along the bottom edge of the 50 free spins card, behind the button.", node: <Sidebar /> },
  { name: "5. Bonus cooldowns", note: "Each bonus has a small flask that drains and refills as the timer runs, so the time left is visible at a glance.", node: <Cooldowns /> },
  { name: "6. Loading screen", note: "A potion fills up inside a flask while the page loads, then the page appears.", node: <Loading /> },
  { name: "7. Deposit success", note: "After a deposit, the liquid rises to show the balance going up.", node: <Deposit /> },
  { name: "8. Crash game", note: "The multiplier is the liquid level. It climbs with the number, which is something only this brand can do.", node: <Crash /> },
  { name: "9. Empty state", note: "A low pool and a single lazy bubble make an empty screen feel alive.", node: <Empty /> },
];

export default function LiquidUses() {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setSelected((s) => { const n = new Set(s); if (n.has(i)) n.delete(i); else n.add(i); return n; });
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#120a1f)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <p className="ui-eyebrow mb-3 mt-8">Elixir design lab · liquid placements</p>
        <h1 className="hero-headline text-4xl leading-tight sm:text-5xl">Where the liquid could live</h1>
        <p className="ui-body mt-4 max-w-2xl">Nine places for the deep liquid, drawn as static mock-ups with the real shader. The liquid only draws while a card is on screen. Tick the ones you want and tell me.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {uses.map((u, i) => (
            <section key={u.name} className={`rounded-3xl border p-5 transition-colors ${selected.has(i) ? "border-lime-300 bg-[#24123a]" : "border-white/10 bg-[#1b0f2c]"}`}>
              <h2 className="font-semibold">{u.name}</h2>
              <p className="ui-caption mt-1 text-[var(--text-secondary)]">{u.note}</p>
              <InView className="mt-4 flex min-h-[200px] justify-center rounded-2xl bg-[#140d24] p-5">{u.node}</InView>
              <button onClick={() => toggle(i)} className="mt-4 w-full rounded-xl bg-white/5 py-2 text-sm font-semibold hover:bg-white/10">
                {selected.has(i) ? "Selected" : "Use this one"}
              </button>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
