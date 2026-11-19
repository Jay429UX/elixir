"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  Bank as PhBank,
  Basketball as PhBasketball,
  Bomb as PhBomb,
  Cards as PhCards,
  CircleNotch as PhRoulette,
  Coin as PhCoin,
  DiamondsFour as PhSlots,
  DiceFive as PhDice,
  Football as PhNfl,
  GameController as PhEsports,
  Gift as PhGift,
  Hockey as PhHockey,
  Rocket as PhRocket,
  SoccerBall as PhSoccer,
  Spade as PhSpade,
  Stack as PhStack,
  TennisBall as PhTennis,
  VideoCamera as PhVideo,
} from "@phosphor-icons/react";
import {
  Bomb as LuBomb,
  CircleDot as LuRoulette,
  Coins as LuCoin,
  Dices as LuDice,
  Flame as LuSlots,
  Gamepad2 as LuEsports,
  Gift as LuGift,
  Landmark as LuBank,
  Layers as LuStack,
  Rocket as LuRocket,
  Spade as LuSpade,
  Swords as LuCards,
  Trophy as LuTrophy,
  Video as LuVideo,
} from "lucide-react";
import {
  FaBasketball,
  FaBomb,
  FaCoins,
  FaCompactDisc,
  FaDiceFive,
  FaFootball,
  FaGamepad,
  FaGem,
  FaGift,
  FaHockeyPuck,
  FaLandmark,
  FaLayerGroup,
  FaRocket,
  FaFutbol,
  FaSuitcase,
  FaTableTennisPaddleBall,
  FaVideo,
} from "react-icons/fa6";
import {
  RiBankFill,
  RiBasketballFill,
  RiCoinFill,
  RiCompass3Fill,
  RiDiceFill,
  RiFootballFill,
  RiGamepadFill,
  RiGiftFill,
  RiPlayCircleFill,
  RiRocketFill,
  RiStackFill,
  RiVipDiamondFill,
  RiVideoOnFill,
  RiFireFill,
  RiPingPongFill,
} from "react-icons/ri";
import {
  BiSolidBank,
  BiSolidBasketball,
  BiSolidBomb,
  BiSolidCoinStack,
  BiSolidDiamond,
  BiSolidDice5,
  BiSolidBall,
  BiSolidGame,
  BiSolidGift,
  BiSolidJoystick,
  BiSolidLayer,
  BiSolidRocket,
  BiSolidTennisBall,
  BiSolidVideo,
} from "react-icons/bi";
import {
  IoAmericanFootball,
  IoBasketball,
  IoBusiness,
  IoDiamond,
  IoDice,
  IoFlame,
  IoFootball,
  IoGameController,
  IoGift,
  IoLayers,
  IoDisc,
  IoRocket,
  IoTennisball,
  IoVideocam,
  IoCash,
} from "react-icons/io5";
import { cn } from "@/lib/utils";

type SlotKey =
  | "originals"
  | "dice"
  | "mines"
  | "limbo"
  | "coinflip"
  | "blackjack"
  | "casino"
  | "slots"
  | "live"
  | "roulette"
  | "football"
  | "basketball"
  | "tennis"
  | "hockey"
  | "nfl"
  | "esports"
  | "promotions"
  | "house";

const SLOTS: { key: SlotKey; label: string; group: string }[] = [
  { key: "originals", label: "Original Games", group: "Originals" },
  { key: "dice", label: "Dice", group: "Originals" },
  { key: "mines", label: "Mines", group: "Originals" },
  { key: "limbo", label: "Limbo", group: "Originals" },
  { key: "coinflip", label: "Coinflip", group: "Originals" },
  { key: "blackjack", label: "Blackjack", group: "Originals" },
  { key: "casino", label: "Casino", group: "Casino" },
  { key: "slots", label: "Slots", group: "Casino" },
  { key: "live", label: "Live Casino", group: "Casino" },
  { key: "roulette", label: "Roulette", group: "Casino" },
  { key: "football", label: "Football", group: "Sports" },
  { key: "basketball", label: "Basketball", group: "Sports" },
  { key: "tennis", label: "Tennis", group: "Sports" },
  { key: "hockey", label: "Ice Hockey", group: "Sports" },
  { key: "nfl", label: "American Football", group: "Sports" },
  { key: "esports", label: "Esports", group: "Sports" },
  { key: "promotions", label: "Promotions", group: "More" },
  { key: "house", label: "Be the House", group: "More" },
];

interface PackDef {
  id: string;
  name: string;
  license: string;
  packageName: string;
  note: string;
  render: (key: SlotKey, size: number, stroke: number) => ReactNode;
}

const PACKS: PackDef[] = [
  {
    id: "phosphor-fill",
    name: "Phosphor Fill",
    license: "MIT · Current",
    packageName: "@phosphor-icons/react",
    note: "What the site uses right now. Clean, slightly lighter silhouette.",
    render: (key, size) => {
      const p = { weight: "fill" as const, size };
      switch (key) {
        case "originals": return <PhStack {...p} />;
        case "dice": return <PhDice {...p} />;
        case "mines": return <PhBomb {...p} />;
        case "limbo": return <PhRocket {...p} />;
        case "coinflip": return <PhCoin {...p} />;
        case "blackjack": return <PhCards {...p} />;
        case "casino": return <PhSpade {...p} />;
        case "slots": return <PhSlots {...p} />;
        case "live": return <PhVideo {...p} />;
        case "roulette": return <PhRoulette weight="bold" size={size} />;
        case "football": return <PhSoccer {...p} />;
        case "basketball": return <PhBasketball {...p} />;
        case "tennis": return <PhTennis {...p} />;
        case "hockey": return <PhHockey {...p} />;
        case "nfl": return <PhNfl {...p} />;
        case "esports": return <PhEsports {...p} />;
        case "promotions": return <PhGift {...p} />;
        case "house": return <PhBank {...p} />;
      }
    },
  },
  {
    id: "phosphor-duotone",
    name: "Phosphor Duotone",
    license: "MIT",
    packageName: "@phosphor-icons/react",
    note: "Same icons with a two-tone fill + crisp outline—adds depth without changing packs.",
    render: (key, size) => {
      const p = { weight: "duotone" as const, size };
      switch (key) {
        case "originals": return <PhStack {...p} />;
        case "dice": return <PhDice {...p} />;
        case "mines": return <PhBomb {...p} />;
        case "limbo": return <PhRocket {...p} />;
        case "coinflip": return <PhCoin {...p} />;
        case "blackjack": return <PhCards {...p} />;
        case "casino": return <PhSpade {...p} />;
        case "slots": return <PhSlots {...p} />;
        case "live": return <PhVideo {...p} />;
        case "roulette": return <PhRoulette {...p} />;
        case "football": return <PhSoccer {...p} />;
        case "basketball": return <PhBasketball {...p} />;
        case "tennis": return <PhTennis {...p} />;
        case "hockey": return <PhHockey {...p} />;
        case "nfl": return <PhNfl {...p} />;
        case "esports": return <PhEsports {...p} />;
        case "promotions": return <PhGift {...p} />;
        case "house": return <PhBank {...p} />;
      }
    },
  },
  {
    id: "fa6",
    name: "Font Awesome 6 Solid",
    license: "CC BY 4.0 / MIT",
    packageName: "react-icons/fa6",
    note: "Chunky, bold, high-contrast solid icons—great readability at 16–20px.",
    render: (key, size) => {
      switch (key) {
        case "originals": return <FaLayerGroup size={size} />;
        case "dice": return <FaDiceFive size={size} />;
        case "mines": return <FaBomb size={size} />;
        case "limbo": return <FaRocket size={size} />;
        case "coinflip": return <FaCoins size={size} />;
        case "blackjack": return <FaSuitcase size={size} />;
        case "casino": return <FaGem size={size} />;
        case "slots": return <FaGem size={size} />;
        case "live": return <FaVideo size={size} />;
        case "roulette": return <FaCompactDisc size={size} />;
        case "football": return <FaFutbol size={size} />;
        case "basketball": return <FaBasketball size={size} />;
        case "tennis": return <FaTableTennisPaddleBall size={size} />;
        case "hockey": return <FaHockeyPuck size={size} />;
        case "nfl": return <FaFootball size={size} />;
        case "esports": return <FaGamepad size={size} />;
        case "promotions": return <FaGift size={size} />;
        case "house": return <FaLandmark size={size} />;
      }
    },
  },
  {
    id: "remix",
    name: "Remix Icon Fill",
    license: "Apache 2.0",
    packageName: "react-icons/ri",
    note: "Thick, balanced geometric solids—very sturdy in dark sidebars.",
    render: (key, size) => {
      switch (key) {
        case "originals": return <RiStackFill size={size} />;
        case "dice": return <RiDiceFill size={size} />;
        case "mines": return <RiFireFill size={size} />;
        case "limbo": return <RiRocketFill size={size} />;
        case "coinflip": return <RiCoinFill size={size} />;
        case "blackjack": return <RiPlayCircleFill size={size} />;
        case "casino": return <RiVipDiamondFill size={size} />;
        case "slots": return <RiVipDiamondFill size={size} />;
        case "live": return <RiVideoOnFill size={size} />;
        case "roulette": return <RiCompass3Fill size={size} />;
        case "football": return <RiFootballFill size={size} />;
        case "basketball": return <RiBasketballFill size={size} />;
        case "tennis": return <RiPingPongFill size={size} />;
        case "hockey": return <RiCompass3Fill size={size} />;
        case "nfl": return <RiFootballFill size={size} />;
        case "esports": return <RiGamepadFill size={size} />;
        case "promotions": return <RiGiftFill size={size} />;
        case "house": return <RiBankFill size={size} />;
      }
    },
  },
  {
    id: "boxicons",
    name: "Boxicons Solid",
    license: "MIT",
    packageName: "react-icons/bi",
    note: "Heavy, rounded solid silhouettes with strong visual weight.",
    render: (key, size) => {
      switch (key) {
        case "originals": return <BiSolidLayer size={size} />;
        case "dice": return <BiSolidDice5 size={size} />;
        case "mines": return <BiSolidBomb size={size} />;
        case "limbo": return <BiSolidRocket size={size} />;
        case "coinflip": return <BiSolidCoinStack size={size} />;
        case "blackjack": return <BiSolidGame size={size} />;
        case "casino": return <BiSolidDiamond size={size} />;
        case "slots": return <BiSolidDiamond size={size} />;
        case "live": return <BiSolidVideo size={size} />;
        case "roulette": return <BiSolidGame size={size} />;
        case "football": return <BiSolidBall size={size} />;
        case "basketball": return <BiSolidBasketball size={size} />;
        case "tennis": return <BiSolidTennisBall size={size} />;
        case "hockey": return <BiSolidBall size={size} />;
        case "nfl": return <BiSolidBall size={size} />;
        case "esports": return <BiSolidJoystick size={size} />;
        case "promotions": return <BiSolidGift size={size} />;
        case "house": return <BiSolidBank size={size} />;
      }
    },
  },
  {
    id: "ionicons",
    name: "Ionicons 5 Solid",
    license: "MIT",
    packageName: "react-icons/io5",
    note: "Bold, smooth iOS-style filled icons with great contrast.",
    render: (key, size) => {
      switch (key) {
        case "originals": return <IoLayers size={size} />;
        case "dice": return <IoDice size={size} />;
        case "mines": return <IoFlame size={size} />;
        case "limbo": return <IoRocket size={size} />;
        case "coinflip": return <IoCash size={size} />;
        case "blackjack": return <IoDiamond size={size} />;
        case "casino": return <IoDiamond size={size} />;
        case "slots": return <IoDiamond size={size} />;
        case "live": return <IoVideocam size={size} />;
        case "roulette": return <IoDisc size={size} />;
        case "football": return <IoFootball size={size} />;
        case "basketball": return <IoBasketball size={size} />;
        case "tennis": return <IoTennisball size={size} />;
        case "hockey": return <IoDisc size={size} />;
        case "nfl": return <IoAmericanFootball size={size} />;
        case "esports": return <IoGameController size={size} />;
        case "promotions": return <IoGift size={size} />;
        case "house": return <IoBusiness size={size} />;
      }
    },
  },
  {
    id: "lucide",
    name: "Lucide (Adjustable Stroke)",
    license: "ISC",
    packageName: "lucide-react",
    note: "Crisp outline icons where you can crank up strokeWidth to 2.5px+.",
    render: (key, size, stroke) => {
      const p = { size, strokeWidth: stroke };
      switch (key) {
        case "originals": return <LuStack {...p} />;
        case "dice": return <LuDice {...p} />;
        case "mines": return <LuBomb {...p} />;
        case "limbo": return <LuRocket {...p} />;
        case "coinflip": return <LuCoin {...p} />;
        case "blackjack": return <LuCards {...p} />;
        case "casino": return <LuSpade {...p} />;
        case "slots": return <LuSlots {...p} />;
        case "live": return <LuVideo {...p} />;
        case "roulette": return <LuRoulette {...p} />;
        case "football": return <LuTrophy {...p} />;
        case "basketball": return <LuTrophy {...p} />;
        case "tennis": return <LuTrophy {...p} />;
        case "hockey": return <LuTrophy {...p} />;
        case "nfl": return <LuTrophy {...p} />;
        case "esports": return <LuEsports {...p} />;
        case "promotions": return <LuGift {...p} />;
        case "house": return <LuBank {...p} />;
      }
    },
  },
];

export default function IconGallery() {
  const [size, setSize] = useState(18);
  const [stroke, setStroke] = useState(2.4);
  const [tone, setTone] = useState<"muted" | "white" | "purple">("muted");
  const [activePackId, setActivePackId] = useState("fa6");

  const activePack = PACKS.find((p) => p.id === activePackId) ?? PACKS[0];
  const toneClass =
    tone === "white"
      ? "text-white"
      : tone === "purple"
        ? "text-purple-300"
        : "text-gray-400";

  return (
    <main className="min-h-screen bg-[var(--dicey-darker,#140d24)] px-4 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white">
          ← Back to casino
        </Link>
        <p className="ui-eyebrow mt-6">Elixir design lab · open-source icon packs</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Sidebar Icon Pack Comparison
        </h1>
        <p className="ui-body mt-2 max-w-2xl">
          Compare thicker open-source icon packs against the current Phosphor Fill icons—both in a full grid and inside a live sidebar preview.
        </p>

        {/* Controls bar */}
        <section className="mt-6 flex flex-wrap items-center gap-6 rounded-2xl border border-white/10 bg-[#1b0f2c] p-4 sm:p-5">
          <label className="flex min-w-[180px] flex-1 flex-col gap-1.5 text-xs">
            <span className="flex justify-between font-medium text-purple-100">
              <span>Icon Size</span>
              <span className="font-mono text-purple-300">{size}px</span>
            </span>
            <input
              type="range"
              min={14}
              max={24}
              step={1}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#39ff14]"
            />
          </label>

          <label className="flex min-w-[180px] flex-1 flex-col gap-1.5 text-xs">
            <span className="flex justify-between font-medium text-purple-100">
              <span>Lucide Stroke Width</span>
              <span className="font-mono text-purple-300">{stroke.toFixed(1)}px</span>
            </span>
            <input
              type="range"
              min={1.5}
              max={3.0}
              step={0.1}
              value={stroke}
              onChange={(e) => setStroke(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#39ff14]"
            />
          </label>

          <div className="flex items-center gap-1.5 rounded-xl bg-dicey-dark p-1">
            {(
              [
                ["muted", "Muted Gray"],
                ["purple", "Purple"],
                ["white", "White"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTone(id)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                  tone === id ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Live Sidebar Preview + Pack Selector */}
        <section className="mt-8 grid items-start gap-6 lg:grid-cols-[270px_1fr]">
          <aside className="rounded-2xl border border-purple-300/15 bg-[#2a1d42] p-4 shadow-2xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-purple-300">
              Live Sidebar Preview · {activePack.name}
            </p>
            <div className="space-y-1">
              {SLOTS.slice(0, 10).map((slot) => (
                <div
                  key={slot.key}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-white/5 hover:text-white",
                    slot.key === "originals" || slot.key === "casino"
                      ? "mt-2 text-xs font-semibold uppercase tracking-wider text-gray-400"
                      : "text-gray-200"
                  )}
                >
                  <span className={toneClass}>{activePack.render(slot.key, size, stroke)}</span>
                  <span>{slot.label}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* All 7 Packs Comparison */}
          <div className="grid gap-5 md:grid-cols-2">
            {PACKS.map((pack) => {
              const isSelected = pack.id === activePackId;
              return (
                <article
                  key={pack.id}
                  onClick={() => setActivePackId(pack.id)}
                  className={cn(
                    "cursor-pointer rounded-3xl border p-5 transition-colors",
                    isSelected
                      ? "border-[#39ff14]/60 bg-[#1b0f2c]"
                      : "border-white/10 bg-[#0d0718]/70 hover:border-white/25"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold text-white">{pack.name}</h2>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-purple-200">
                          {pack.license}
                        </span>
                      </div>
                      <p className="mt-0.5 font-mono text-[11px] text-purple-300/70">
                        {pack.packageName}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-lg px-2.5 py-1 text-[11px] font-semibold",
                        isSelected
                          ? "bg-[#39ff14] text-[#071a04]"
                          : "bg-white/5 text-purple-200"
                      )}
                    >
                      {isSelected ? "Previewing" : "Preview"}
                    </span>
                  </div>

                  <p className="ui-caption mt-2">{pack.note}</p>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {SLOTS.map((slot) => (
                      <div
                        key={slot.key}
                        className="flex items-center gap-2 rounded-xl border border-white/5 bg-dicey-dark px-2.5 py-2"
                      >
                        <span className={cn("shrink-0", toneClass)}>
                          {pack.render(slot.key, size, stroke)}
                        </span>
                        <span className="truncate text-[11px] text-gray-200">{slot.label}</span>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
