"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { Bell, CaretDown } from "@phosphor-icons/react";
import VipBadge from "@/components/ui/VipBadge";

/* The "Balance hero" bar, held in eight different container shapes.
   The bar hangs from the top of the page. What changes is how its corners are cut. */

const FILL = "#2a1d42"; // --dicey-card-elevated

const Content = () => (
  <div className="flex items-center gap-3 px-5">
    <div className="relative flex items-center gap-3 rounded-full bg-[#3a2d57] px-3.5 py-1.5">
      <VipBadge src="/vip/elixir/tier1.svg" className="size-7" />
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-black/40"><span className="block h-full w-[45%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300" /></span>
      <CaretDown weight="fill" className="size-3 text-gray-400" />
      <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">1</span>
    </div>
    <div className="flex items-center gap-2.5 rounded-full bg-[#33264d] px-4 py-1.5 shadow-[0_0_22px_rgba(255,216,74,0.12)]">
      <img src="/crypto/usdc.svg" alt="" className="size-7" />
      <span className="text-xl font-black tabular-nums text-[#ffd84a]" style={{ textShadow: "0 0 16px rgba(255,216,74,0.45)" }}>$1,250.00</span>
      <CaretDown weight="fill" className="size-3 text-gray-400" />
    </div>
    <div className="relative grid size-10 place-items-center rounded-full bg-[#3a2d57]">
      <Bell weight="fill" className="size-5 text-gray-400" />
      <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
    </div>
    <div className="flex items-center gap-2 rounded-full bg-[#3a2d57] px-2.5 py-1.5">
      <span className="grid size-7 place-items-center rounded-full bg-gray-200 text-[11px] font-bold text-black">JD</span>
      <CaretDown weight="fill" className="size-3 text-gray-400" />
    </div>
  </div>
);

/* Concave "shoulder" made from a radial gradient: a transparent quarter circle in a filled corner. No SVG. */
const Shoulder = ({ side, r }: { side: "left" | "right"; r: number }) => {
  const at = side === "left" ? "0 100%" : "100% 100%";
  const style: CSSProperties = {
    width: r,
    height: r,
    top: 0,
    [side]: -r,
    background: `radial-gradient(circle at ${at}, transparent ${r}px, ${FILL} ${r + 0.5}px)`,
  };
  return <span aria-hidden="true" className="absolute" style={style} />;
};

/* Concentric version: every pill is 44px tall (radius 22) and sits an equal 8px from the container edges,
   so the container's bottom corners use radius 22 + 8 = 30, sharing a centre with the end pills. */
const PILL = 44;
const GAP = 8;
const R = PILL / 2 + GAP; // 30

const ContentTight = () => (
  <div className="flex items-center" style={{ gap: GAP, padding: GAP }}>
    <div className="relative flex items-center gap-3 rounded-full bg-[#3a2d57] px-3.5" style={{ height: PILL }}>
      <VipBadge src="/vip/elixir/tier1.svg" className="size-7" />
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-black/40"><span className="block h-full w-[45%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300" /></span>
      <CaretDown weight="fill" className="size-3 text-gray-400" />
      <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">1</span>
    </div>
    <div className="flex items-center gap-2.5 rounded-full bg-[#33264d] px-4 shadow-[0_0_22px_rgba(255,216,74,0.12)]" style={{ height: PILL }}>
      <img src="/crypto/usdc.svg" alt="" className="size-7" />
      <span className="text-xl font-black tabular-nums text-[#ffd84a]" style={{ textShadow: "0 0 16px rgba(255,216,74,0.45)" }}>$1,250.00</span>
      <CaretDown weight="fill" className="size-3 text-gray-400" />
    </div>
    <div className="relative grid place-items-center rounded-full bg-[#3a2d57]" style={{ height: PILL, width: PILL }}>
      <Bell weight="fill" className="size-5 text-gray-400" />
      <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
    </div>
    <div className="flex items-center gap-2 rounded-full bg-[#3a2d57] px-2.5" style={{ height: PILL }}>
      <span className="grid size-8 place-items-center rounded-full bg-gray-200 text-[11px] font-bold text-black">JD</span>
      <CaretDown weight="fill" className="size-3 text-gray-400" />
    </div>
  </div>
);

/* Optional guide arcs: outer radius 30 and inner (pill) radius 22, drawn from the same centre at each end. */
function ConcentricBar({ shoulders }: { shoulders: boolean }) {
  const [guides, setGuides] = useState(true);
  const H = PILL + GAP * 2;
  return (
    <div className="relative">
      <div className="relative flex items-center" style={{ background: FILL, height: H, borderRadius: `0 0 ${R}px ${R}px` }}>
        {shoulders && (<><Shoulder side="left" r={R} /><Shoulder side="right" r={R} /></>)}
        <ContentTight />
        {guides && (
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {[0, 1].map((end) => {
              const cx = end === 0 ? R : "calc(100% - " + R + "px)";
              return (
                <g key={end} stroke="#a3e635" strokeWidth="1" fill="none" strokeDasharray="3 3">
                  <circle cx={cx} cy={H - R} r={R} opacity="0.9" />
                  <circle cx={cx} cy={H - R} r={PILL / 2} opacity="0.9" />
                  <circle cx={cx} cy={H - R} r="1.5" fill="#a3e635" stroke="none" />
                </g>
              );
            })}
          </svg>
        )}
      </div>
      <label className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-2 whitespace-nowrap text-[11px] text-gray-400">
        <input type="checkbox" checked={guides} onChange={(e) => setGuides(e.target.checked)} className="accent-lime-300" />
        Show concentric guides (outer {R}px, pill {PILL / 2}px, gap {GAP}px)
      </label>
    </div>
  );
}

const SVG_PATH = "M75.8535 102H71.8535C49.2098 102 30.8535 83.6437 30.8535 61V42C30.8535 22.2789 17.8785 5.59042 0 0H75.8535V102Z";

type Shape = { name: string; how: string; note: string; render: () => ReactNode };

const shapes: Shape[] = [
  {
    name: "Today: SVG shoulders",
    how: "Two SVG paths (76 by 102 viewBox), one mirrored, either side of a flat rectangle",
    note: "A single path draws both the concave top flare and the rounded bottom curve. Crisp, but the two end pieces are separate geometry to maintain, and the curve size is fixed by the viewBox scale.",
    render: () => (
      <div className="flex items-end" style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.25))" }}>
        <svg className="h-[52px] w-auto" viewBox="0 0 76 102" fill={FILL} style={{ marginRight: -1 }}><path d={SVG_PATH} /></svg>
        <div className="flex h-[52px] items-center" style={{ background: FILL, margin: "0 -1px" }}><Content /></div>
        <svg className="h-[52px] w-auto -scale-x-100" viewBox="0 0 76 102" fill={FILL} style={{ marginLeft: -1 }}><path d={SVG_PATH} /></svg>
      </div>
    ),
  },
  {
    name: "CSS inverted corners, 28px",
    how: "border-radius on the bar, plus two radial-gradient shoulder boxes. No SVG",
    note: "Looks almost the same as today, but the radius is one number you can change or animate, and it stays in step with the other rounded corners on the site.",
    render: () => (
      <div className="relative flex h-[52px] items-center rounded-b-[28px]" style={{ background: FILL }}>
        <Shoulder side="left" r={28} />
        <Shoulder side="right" r={28} />
        <Content />
      </div>
    ),
  },
  {
    name: "CSS inverted corners, tight 14px",
    how: "Same technique, smaller radius",
    note: "A smaller, more technical shoulder. Less drama at the top, so the bar reads as part of the page edge.",
    render: () => (
      <div className="relative flex h-[52px] items-center rounded-b-[16px]" style={{ background: FILL }}>
        <Shoulder side="left" r={14} />
        <Shoulder side="right" r={14} />
        <Content />
      </div>
    ),
  },
  {
    name: "Deep round, no shoulders",
    how: "One CSS rule: border-radius 0 0 44px 44px",
    note: "The bar drops straight from the top edge with big rounded bottom corners. The simplest possible build, and friendly like a pill.",
    render: () => (
      <div className="flex h-[56px] items-center rounded-b-[44px] px-4" style={{ background: FILL }}>
        <Content />
      </div>
    ),
  },
  {
    name: "Chamfered",
    how: "CSS clip-path polygon with 18px, 45 degree cuts",
    note: "Cut corners instead of curves for a sharper, arcade or sci-fi feel. clip-path also clips shadows, so any glow has to go on a wrapper.",
    render: () => (
      <div className="flex h-[52px] items-center px-4" style={{ background: FILL, clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 18px 100%, 0 calc(100% - 18px))" }}>
        <Content />
      </div>
    ),
  },
  {
    name: "Trapezoid",
    how: "CSS clip-path polygon, straight diagonal sides",
    note: "The bar narrows as it drops, like a hanging sign. Straight lines instead of curves, so it needs more side padding to avoid crowding.",
    render: () => (
      <div className="flex h-[54px] items-center px-8" style={{ background: FILL, clipPath: "polygon(0 0, 100% 0, calc(100% - 26px) 100%, 26px 100%)" }}>
        <Content />
      </div>
    ),
  },
  {
    name: "Balance pocket",
    how: "CSS shoulders, plus a small tab hanging under the centre with its own inverted corners",
    note: "A second, deeper tab under the balance makes it feel like it sits in a pocket. It pairs naturally with the Balance hero idea.",
    render: () => (
      <div className="relative">
        <div className="relative flex h-[52px] items-center rounded-b-[24px]" style={{ background: FILL }}>
          <Shoulder side="left" r={24} />
          <Shoulder side="right" r={24} />
          <Content />
        </div>
        <div className="absolute left-1/2 top-full h-5 w-56 -translate-x-1/2 rounded-b-[20px]" style={{ background: FILL }}>
          <Shoulder side="left" r={14} />
          <Shoulder side="right" r={14} />
        </div>
      </div>
    ),
  },
  {
    name: "Pill drop",
    how: "CSS: border-radius 0 0 999px 999px",
    note: "Straight sides and a fully round bottom, so the bar looks like half a capsule hanging from the top.",
    render: () => (
      <div className="flex h-[56px] items-center rounded-b-full px-8" style={{ background: FILL }}>
        <Content />
      </div>
    ),
  },
  {
    name: "Concentric to the pills",
    how: "CSS border-radius = pill radius + gap (22 + 8 = 30), every pill 44px tall and 8px from each edge",
    note: "The container's bottom corners now share a centre with the end pills, so the gap around the curved pill ends is even all the way round. The dashed guides show the two arcs from one centre. This is the rule for nesting rounded shapes.",
    render: () => <ConcentricBar shoulders={false} />,
  },
  {
    name: "Concentric with shoulders",
    how: "Same concentric radii, plus CSS shoulders at the same 30px so the flare matches the curve",
    note: "Keeps today's flared top, but the shoulder and the bottom curve are now one consistent radius, and the pills nest inside it evenly.",
    render: () => <ConcentricBar shoulders />,
  },
];

export default function ShapeGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#120a1f)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <p className="ui-eyebrow mb-3 mt-8">Elixir design lab · header container</p>
        <h1 className="hero-headline text-4xl leading-tight sm:text-5xl">How the header container is shaped</h1>
        <p className="ui-body mt-4 max-w-2xl">You're right: today the curved ends are two SVG paths either side of a flat rectangle. These are ten ways to cut the container's corners, all holding the Balance hero bar and all hanging from the top edge of the page. The last two are concentric to the pills.</p>

        <div className="mt-10 grid gap-5">
          {shapes.map((s, i) => (
            <section key={s.name} className={`rounded-3xl border p-5 transition-colors ${selected === i ? "border-lime-300 bg-[#24123a]" : "border-white/10 bg-[#1b0f2c]"}`}>
              <h2 className="font-semibold"><span className="text-[var(--text-muted)]">{String(i + 1).padStart(2, "0")}</span> {s.name}</h2>
              <div className="relative mt-4 flex min-h-[96px] justify-center pb-12 overflow-x-auto overflow-y-hidden rounded-2xl bg-[#140d24] px-12">
                <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-white/15" />
                <div className="shrink-0">{s.render()}</div>
              </div>
              <p className="mt-4 text-xs font-semibold text-lime-300">Built with: <span className="font-normal text-gray-300">{s.how}</span></p>
              <p className="ui-caption mt-2">{s.note}</p>
              <button onClick={() => setSelected(i)} className="mt-4 w-full rounded-xl bg-white/5 py-2 text-sm font-semibold hover:bg-white/10">
                {selected === i ? "Selected" : `Choose option ${i + 1}`}
              </button>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
