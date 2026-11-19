"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { Bell, CaretDown } from "@phosphor-icons/react";
import VipBadge from "@/components/ui/VipBadge";

/* Static mock-ups of the account bar. Same four parts in every direction:
   VIP rank with XP progress, balance, notifications, profile. */

const BADGE = "/vip/elixir/tier1.svg";

const Progress = ({ track = "bg-black/40", fill = "from-cyan-400 to-emerald-300", w = "w-24" }: { track?: string; fill?: string; w?: string }) => (
  <span className={`h-1.5 ${w} overflow-hidden rounded-full ${track}`}>
    <span className={`block h-full w-[45%] rounded-full bg-gradient-to-r ${fill}`} />
  </span>
);

const Caret = ({ className = "text-gray-400" }: { className?: string }) => <CaretDown weight="fill" className={`size-3 ${className}`} />;
const Usdc = ({ size = 28 }: { size?: number }) => <img src="/crypto/usdc.svg" alt="" width={size} height={size} style={{ width: size, height: size }} />;

const Dot = ({ children, className }: { children: ReactNode; className: string }) => (
  <span className={`absolute -right-1 -top-1 grid size-5 place-items-center rounded-full text-[11px] font-bold text-white ${className}`}>{children}</span>
);

type Parts = {
  bar: string; barStyle?: CSSProperties; inner?: string;
  pill: string; pillStyle?: CSSProperties;
  amount: string; amountStyle?: CSSProperties;
  vipDot: string; bellDot: string;
  sep?: boolean; progress?: { track?: string; fill?: string };
  caret?: string; icon?: string;
};

function Bar({ p, balanceBig = false }: { p: Parts; balanceBig?: boolean }) {
  const Sep = () => (p.sep ? <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" /> : null);
  return (
    <div className={`flex items-center justify-center gap-3 ${p.bar}`} style={p.barStyle}>
      <div className={`flex items-center justify-center gap-3 ${p.inner ?? ""}`}>
      <div className={`relative flex items-center gap-3 px-4 py-2 ${p.pill}`} style={p.pillStyle}>
        <VipBadge src={BADGE} className="size-7" />
        <Progress {...p.progress} />
        <Caret className={p.caret} />
        <Dot className={p.vipDot}>1</Dot>
      </div>
      <Sep />
      <div className={`flex items-center gap-2.5 px-4 py-2 ${p.pill} ${balanceBig ? "scale-110" : ""}`} style={p.pillStyle}>
        <Usdc />
        <span className={`text-xl font-black tabular-nums ${p.amount}`} style={p.amountStyle}>$1,250.00</span>
        <Caret className={p.caret} />
      </div>
      <Sep />
      <div className={`relative grid size-11 place-items-center ${p.pill} !px-0`} style={p.pillStyle}>
        <Bell weight="fill" className={`size-5 ${p.icon ?? "text-gray-400"}`} />
        <Dot className={p.bellDot}>3</Dot>
      </div>
      <Sep />
      <div className={`flex items-center gap-2 px-2.5 py-2 ${p.pill}`} style={p.pillStyle}>
        <span className="grid size-8 place-items-center rounded-full bg-gray-200 text-xs font-bold text-black">JD</span>
        <Caret className={p.caret} />
      </div>
      </div>
    </div>
  );
}

const variants: { name: string; note: string; stage?: string; render: () => ReactNode }[] = [
  {
    name: "Today",
    note: "The current bar: a dark capsule with soft pills and fading dividers.",
    render: () => <Bar p={{ bar: "rounded-full bg-[#2b2142] px-4 py-2", pill: "rounded-full bg-[#3a2d57]", amount: "text-[#ffd84a]", vipDot: "bg-emerald-500", bellDot: "bg-red-500", sep: true }} />,
  },
  {
    name: "Frosted glass",
    note: "Translucent bar with a blurred backdrop, hairline white border and a soft top highlight.",
    stage: "bg-[radial-gradient(circle_at_30%_20%,#7b3fe4_0,transparent_45%),radial-gradient(circle_at_80%_60%,#16a34a_0,transparent_40%),#1b0f2c]",
    render: () => <Bar p={{ bar: "rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl", pill: "rounded-full bg-white/10", amount: "text-white", vipDot: "bg-emerald-400", bellDot: "bg-rose-500", caret: "text-white/70", icon: "text-white" }} />,
  },
  {
    name: "Neon outline",
    note: "Dark bar with thin lime outlines and a glow on the balance.",
    render: () => <Bar p={{ bar: "rounded-full border border-lime-300/60 bg-[#140a24] px-4 py-2 shadow-[0_0_24px_rgba(57,255,20,0.25)]", pill: "rounded-full border border-lime-300/35 bg-[#1c1030]", amount: "text-lime-300", amountStyle: { textShadow: "0 0 14px rgba(57,255,20,0.7)" }, vipDot: "bg-lime-400 !text-black", bellDot: "bg-fuchsia-500", caret: "text-lime-300/70", icon: "text-lime-300", progress: { fill: "from-lime-300 to-emerald-400" } }} />,
  },
  {
    name: "Floating pills",
    note: "No container. Four separate pills that float with soft shadows.",
    render: () => <Bar p={{ bar: "gap-4", pill: "rounded-2xl bg-[#34264f] shadow-[0_10px_24px_rgba(0,0,0,0.45)] ring-1 ring-white/10", amount: "text-[#ffd84a]", vipDot: "bg-emerald-500", bellDot: "bg-red-500" }} />,
  },
  {
    name: "Royal gold",
    note: "Gold-trimmed bar with a gold gradient edge and a gold balance, to match the crown badges.",
    render: () => <Bar p={{ bar: "rounded-full bg-gradient-to-b from-[#f6d779] to-[#a8661a] p-[2px]", inner: "rounded-full bg-[#1f1233] px-4 py-2", pill: "rounded-full bg-[#2a1b45]", amount: "text-[#ffe48a]", amountStyle: { textShadow: "0 1px 0 #7a4a10" }, vipDot: "bg-emerald-500", bellDot: "bg-red-500", caret: "text-[#f6d779]", icon: "text-[#f6d779]", progress: { fill: "from-[#f6d779] to-[#f2a21c]" } }} />,
  },
  {
    name: "Hard shadow",
    note: "Sharp corners, thick outlines and an offset block shadow. Loud and graphic.",
    render: () => <Bar p={{ bar: "rounded-md border-2 border-black bg-[#4c2a8c] px-3 py-2 shadow-[5px_5px_0_#39ff14]", pill: "rounded-md border-2 border-black bg-[#6b3fd1]", amount: "text-white", vipDot: "bg-lime-400 !text-black border-2 border-black", bellDot: "bg-red-500 border-2 border-black", caret: "text-white", icon: "text-white", progress: { track: "bg-black/60", fill: "from-lime-300 to-lime-400" } }} />,
  },
  {
    name: "Potion green",
    note: "A glossy green capsule like the bubbling panel, with darker green pills.",
    render: () => <Bar p={{ bar: "rounded-full bg-gradient-to-b from-[#2fa01f] to-[#145c12] px-4 py-2 shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_8px_22px_rgba(20,120,20,0.4)]", pill: "rounded-full bg-black/30", amount: "text-[#fff3c4]", vipDot: "bg-[#ffd84a] !text-black", bellDot: "bg-red-500", caret: "text-lime-200", icon: "text-lime-100", progress: { track: "bg-black/40", fill: "from-lime-200 to-yellow-200" } }} />,
  },
  {
    name: "Minimal",
    note: "No backgrounds at all. Just the content with hairline dividers.",
    render: () => <Bar p={{ bar: "gap-5 px-2", pill: "rounded-none bg-transparent !px-2", amount: "text-white", vipDot: "bg-emerald-500", bellDot: "bg-red-500", sep: true, progress: { track: "bg-white/15" } }} />,
  },
  {
    name: "Chunky 3D",
    note: "Raised buttons with a visible depth edge, like the green primary button.",
    render: () => <Bar p={{ bar: "rounded-2xl bg-[#1d1233] px-3 py-2.5", pill: "rounded-xl bg-[#4a3a72] shadow-[0_4px_0_#2a1d47,inset_0_2px_0_rgba(255,255,255,0.2)]", amount: "text-[#ffd84a]", vipDot: "bg-emerald-500", bellDot: "bg-red-500", caret: "text-gray-300", icon: "text-gray-200" }} />,
  },
  {
    name: "Balance hero",
    note: "The balance is the star: larger, glowing and gold-edged. The rest quietly step back.",
    render: () => <Bar balanceBig p={{ bar: "rounded-full bg-[#241838] px-5 py-2", pill: "rounded-full bg-[#33264d]", amount: "text-[#ffd84a]", amountStyle: { textShadow: "0 0 16px rgba(255,216,74,0.45)" }, vipDot: "bg-emerald-500", bellDot: "bg-red-500", sep: true }} />,
  },
];

export default function HeaderGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#120a1f)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">← Back to casino</Link>
        <p className="ui-eyebrow mb-3 mt-8">Elixir design lab · header</p>
        <h1 className="hero-headline text-4xl leading-tight sm:text-5xl">Ten header directions</h1>
        <p className="ui-body mt-4 max-w-xl">The same four parts in every direction: VIP rank with progress, balance, notifications and profile. Static previews, so only the look changes. Choose one and tell me its number.</p>

        <div className="mt-10 space-y-5">
          {variants.map((v, i) => (
            <section key={v.name} className={`rounded-3xl border p-5 transition-colors ${selected === i ? "border-lime-300 bg-[#24123a]" : "border-white/10 bg-[#1b0f2c]"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold"><span className="text-[var(--text-muted)]">{String(i + 1).padStart(2, "0")}</span> {v.name}</h2>
                <button onClick={() => setSelected(i)} className="rounded-xl bg-white/5 px-4 py-1.5 text-sm font-semibold hover:bg-white/10">
                  {selected === i ? "Selected" : `Choose option ${i + 1}`}
                </button>
              </div>
              <p className="ui-caption mt-1">{v.note}</p>
              <div className={`mt-4 flex justify-center overflow-x-auto rounded-2xl px-4 py-8 ${v.stage ?? "bg-[#1f1535]"}`}>
                {v.render()}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
