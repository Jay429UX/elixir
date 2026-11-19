"use client";

import { useState } from "react";
import Link from "next/link";
import VipBadge from "@/components/ui/VipBadge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";
import {
  BiArrowBack,
  BiSolidSmile,
  BiSend,
  BiChevronDown,
  BiCheck,
  BiGift,
  BiTrophy,
  BiX,
} from "react-icons/bi";

type VipTier = 1 | 2 | 3 | 4 | 5;

interface DemoMessage {
  id: string;
  username: string;
  tier: VipTier;
  time: string;
  text?: string;
  sticker?: string;
  isSelf?: boolean;
  systemEvent?: {
    kind: "win" | "rain";
    headline: string;
    detail: string;
  };
  reactions?: { emoji: string; count: number }[];
}

const TIER_BADGE: Record<VipTier, string> = {
  1: "/vip/elixir/tier1.svg",
  2: "/vip/elixir/tier2.svg",
  3: "/vip/elixir/tier3.svg",
  4: "/vip/elixir/tier4.svg",
  5: "/vip/elixir/tier5.svg",
};

const TIER_NAME_COLOR: Record<VipTier, string> = {
  1: "text-amber-300/80",
  2: "text-slate-300",
  3: "text-yellow-300",
  4: "text-cyan-300",
  5: "text-blue-300",
};

const TIER_ACCENT_BORDER: Record<VipTier, string> = {
  1: "border-l-amber-500/40",
  2: "border-l-slate-400/35",
  3: "border-l-yellow-400/60",
  4: "border-l-cyan-400/65",
  5: "border-l-blue-400/90",
};

const QUICK_STICKERS = ["🚀", "🔥", "💰", "💎", "👑", "🎰", "🏆", "💀"];

const INITIAL_MESSAGES: DemoMessage[] = [
  { id: "m1", username: "GoldenWolf883", tier: 1, time: "21:38", text: "Nice hit! 💎" },
  { id: "m2", username: "EpicSpinner345", tier: 4, time: "21:38", text: "Who else is grinding? 💪" },
  { id: "m3", username: "MoonSpinner661", tier: 3, time: "21:39", text: "Just one more bonus... 🎁" },
  {
    id: "m-evt-win",
    username: "DiamondKing512",
    tier: 5,
    time: "21:39",
    systemEvent: {
      kind: "win",
      headline: "242.5x on Gates of Olympus",
      detail: "$2,425.00 USDC",
    },
  },
  { id: "m4", username: "BasedRoller786", tier: 2, time: "21:39", text: "Just hit 100x! 💸💸💸", reactions: [{ emoji: "🔥", count: 4 }, { emoji: "💎", count: 2 }] },
  { id: "m5", username: "ProWinner970", tier: 1, time: "21:40", sticker: "👍" },
  { id: "m6", username: "ProWhale903", tier: 3, time: "21:40", text: "RIP bankroll 💀", reactions: [{ emoji: "💀", count: 3 }] },
  { id: "m7", username: "DiamondKing512", tier: 5, time: "21:41", text: "GG 🏆", reactions: [{ emoji: "👑", count: 5 }] },
  { id: "m8", username: "You", tier: 4, time: "21:41", text: "Let's go! Anyone playing Gates? ⚡", isSelf: true },
  { id: "m9", username: "FastWolf448", tier: 5, time: "21:42", text: "Saving up for the hourly rain pot 🚀" },
];

type OptionId = "compact-stream" | "refined-cards" | "tavern-chronicle" | "minimal-terminal" | "social-bubbles";

interface ChatOptionMeta {
  id: OptionId;
  number: string;
  name: string;
  tag: string;
  recommended?: boolean;
  summary: string;
  highlights: string[];
}

const CHAT_OPTIONS: ChatOptionMeta[] = [
  {
    id: "compact-stream",
    number: "01",
    name: "Compact Stream",
    tag: "High-Density Pro",
    recommended: true,
    summary:
      "Drops heavy box-in-box cards for a crisp borderless Twitch/Stake-style stream. Reads 2× more messages at once with VIP-tinted names, hover timestamps, a slim symmetric Rain bar, and a unified composer.",
    highlights: [
      "Borderless inline flow — eliminates heavy card fatigue",
      "Tier-colored usernames + subtle hover timestamps",
      "Unified dark composer shell with neon-lime send action",
    ],
  },
  {
    id: "refined-cards",
    number: "02",
    name: "Layered Glass Cards",
    tag: "Refined Current",
    summary:
      "Keeps your familiar card-per-message rhythm, but dials back surface weight with hairline borders, VIP left-edge rank strips, sapphire spotlight cards, and a clean progress-tracked Potion Rain banner.",
    highlights: [
      "Low-contrast translucent cards instead of heavy purple slabs",
      "VIP rank left-accent bar + subtle timestamps",
      "Symmetric Potion Rain banner with live drop countdown bar",
    ],
  },
  {
    id: "tavern-chronicle",
    number: "03",
    name: "Alchemist Tavern",
    tag: "Brand Theme-Forward",
    summary:
      "Leans into Elixir's royal alchemist identity with deep cauldron-dark surfaces, subtle gilded hairlines, a potion-fill Rain Pot tracker, and a 1-tap quick-hype emoji dock right above the composer.",
    highlights: [
      "Warm gold accents & glowing emerald live presence",
      "Potion-meter Rain Pot card with participant counter",
      "1-tap quick-react bar (🔥 🚀 💎 💀) above the input",
    ],
  },
  {
    id: "minimal-terminal",
    number: "04",
    name: "Gutter Minimalist",
    tag: "Discord / Linear Clean",
    summary:
      "Maximum typographic clarity. Anchors VIP badges in a dedicated left gutter so every username and message aligns along one razor-sharp vertical reading axis, paired with a compact collapsible Rain ticker.",
    highlights: [
      "Dedicated 24px badge gutter for strict text alignment",
      "Compact 44px Rain ticker frees vertical chat space",
      "Zero decorative noise — crisp 1px hairlines only",
    ],
  },
  {
    id: "social-bubbles",
    number: "05",
    name: "Social Bubbles",
    tag: "Interactive & Mobile-First",
    summary:
      "Energetic social-casino feel with fit-content chat bubbles, right-aligned emerald self-messages, clickable inline emoji reaction pills, and a floating pill composer.",
    highlights: [
      "Fit-content bubbles prevent 2-word messages from feeling bulky",
      "Clickable inline reaction pills (🔥 💎 👑)",
      "Right-aligned emerald bubble for your own messages",
    ],
  },
];

function formatNow() {
  return "21:43";
}

function ChatPrototype({
  option,
  showEvents,
}: {
  option: OptionId;
  showEvents: boolean;
}) {
  const [messages, setMessages] = useState<DemoMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [joinedRain, setJoinedRain] = useState(false);
  const [room, setRoom] = useState<"Global" | "High Rollers">("Global");
  const [rainDismissed, setRainDismissed] = useState(false);

  const visibleMessages = showEvents
    ? messages
    : messages.filter((m) => !m.systemEvent);

  const sendMessage = (textOverride?: string, sticker?: string) => {
    const clean = (textOverride ?? draft).trim();
    if (!clean && !sticker) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}-${Math.random()}`,
        username: "You",
        tier: 5,
        time: formatNow(),
        text: sticker ? undefined : clean,
        sticker,
        isSelf: true,
      },
    ]);
    if (!textOverride && !sticker) setDraft("");
    setPickerOpen(false);
  };

  const bumpReaction = (msgId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId) return m;
        const list = m.reactions ?? [];
        const exists = list.find((r) => r.emoji === emoji);
        return {
          ...m,
          reactions: exists
            ? list.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r))
            : [...list, { emoji, count: 1 }],
        };
      })
    );
  };

  /* ------------------------------------------------------------------------
     01 · COMPACT STREAM (High-Density Borderless Pro)
     ------------------------------------------------------------------------ */
  if (option === "compact-stream") {
    return (
      <div className="flex h-[640px] w-full max-w-[336px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1b122b] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime-400" />
            </span>
            <span className="text-sm font-semibold text-white">Live Chat</span>
            <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[11px] font-medium text-purple-200/80 tabular-nums">
              1,234
            </span>
          </div>
          <button
            type="button"
            onClick={() => setRoom(room === "Global" ? "High Rollers" : "Global")}
            className="inline-flex items-center gap-1 rounded-lg bg-white/[0.05] px-2 py-1 text-[11px] font-medium text-purple-100 hover:bg-white/[0.1] transition-colors"
          >
            {room}
            <BiChevronDown className="size-3.5 text-purple-300/70" />
          </button>
        </div>

        {/* Slim Symmetric Potion Rain Bar */}
        <div className="px-3 pt-2.5 pb-2">
          <div className="relative overflow-hidden rounded-xl border border-lime-400/25 bg-[#140d24]">
            <video
              src="/videos/promo-chest.mp4"
              poster="/videos/promo-chest-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full object-cover object-right opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#140d24] via-[#140d24]/90 to-[#140d24]/30" />
            <div className="relative flex items-center justify-between gap-2.5 px-3 py-2.5">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-semibold text-lime-300">Potion Rain</span>
                  <span className="text-[10px] text-purple-200/65 tabular-nums">14:22</span>
                </div>
                <p className="hero-headline text-base leading-tight text-white">1,000 USDC</p>
              </div>
              <button
                type="button"
                onClick={() => setJoinedRain(!joinedRain)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                  joinedRain
                    ? "bg-lime-400/15 text-lime-300 border border-lime-400/35"
                    : "bg-lime-400 text-[#0a1d06] hover:bg-lime-300"
                )}
              >
                {joinedRain ? (
                  <span className="inline-flex items-center gap-1">
                    <BiCheck className="size-4" /> Joined
                  </span>
                ) : (
                  "Join"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="relative flex-1 overflow-y-auto px-1.5 py-1">
          <div className="flex flex-col">
            {visibleMessages.map((msg) =>
              msg.systemEvent ? (
                <div
                  key={msg.id}
                  className="mx-1.5 my-1 flex items-center justify-between gap-2 rounded-lg border border-lime-400/20 bg-lime-400/[0.07] px-2.5 py-1.5"
                >
                  <div className="flex min-w-0 items-center gap-1.5">
                    <BiTrophy className="size-3.5 shrink-0 text-lime-300" />
                    <span className="truncate text-xs text-purple-100">
                      <strong className="font-semibold text-white">{msg.username}</strong> hit{" "}
                      <span className="font-semibold text-lime-300">{msg.systemEvent.headline}</span>
                    </span>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-lime-300 tabular-nums">
                    {msg.systemEvent.detail}
                  </span>
                </div>
              ) : (
                <div
                  key={msg.id}
                  className={cn(
                    "group flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/[0.04]",
                    msg.isSelf && "bg-lime-400/[0.05]"
                  )}
                >
                  <div className="min-w-0 flex-1 text-[13px] leading-snug text-purple-50/95">
                    <span className="mr-1.5 inline-flex translate-y-[3px] align-baseline">
                      <VipBadge src={TIER_BADGE[msg.tier]} alt="" className="size-[18px]" />
                    </span>
                    <span className={cn("mr-1.5 font-semibold", msg.isSelf ? "text-lime-300" : TIER_NAME_COLOR[msg.tier])}>
                      {msg.username}:
                    </span>
                    {msg.sticker ? (
                      <span className="inline-block align-middle text-2xl leading-none">{msg.sticker}</span>
                    ) : (
                      <span className="break-words text-white/90">{msg.text}</span>
                    )}
                  </div>
                  <span className="mt-0.5 shrink-0 text-[10px] text-purple-300/35 opacity-0 transition-opacity group-hover:opacity-100 tabular-nums">
                    {msg.time}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Unified Composer */}
        <div className="border-t border-white/[0.06] bg-[#160e26] p-2.5">
          {pickerOpen && (
            <div className="mb-2 grid grid-cols-8 gap-1 rounded-lg border border-white/[0.08] bg-[#211635] p-1.5">
              {QUICK_STICKERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(undefined, s)}
                  aria-label={`Send ${s}`}
                  className="rounded-md py-1 text-lg hover:bg-white/10 transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#110a1f] px-2 py-1.5 focus-within:border-lime-400/50 transition-colors">
            <button
              type="button"
              aria-label="Toggle stickers"
              onClick={() => setPickerOpen(!pickerOpen)}
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                pickerOpen ? "bg-lime-400/20 text-lime-300" : "text-purple-300/60 hover:text-white"
              )}
            >
              <BiSolidSmile className="size-4" />
            </button>
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Message chat..."
              className="min-w-0 flex-1 bg-transparent text-[13px] text-white placeholder:text-purple-300/40 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Send message"
              onClick={() => sendMessage()}
              className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-lime-400 text-[#0a1d06] hover:bg-lime-300 transition-colors"
            >
              <BiSend className="size-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------
     02 · LAYERED GLASS CARDS (Refined Current)
     ------------------------------------------------------------------------ */
  if (option === "refined-cards") {
    return (
      <div className="flex h-[640px] w-full max-w-[336px] flex-col overflow-hidden rounded-2xl border border-purple-300/15 bg-[#1e1530] shadow-2xl">
        {/* Header with Segmented Tabs */}
        <div className="border-b border-white/[0.06] px-3.5 pt-3 pb-2.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-semibold text-white">Live Chat</span>
            </div>
            <span className="text-xs text-purple-200/60 tabular-nums">1,234 online</span>
          </div>
          <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#140d24] p-0.5">
            {(["Global", "High Rollers"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRoom(tab)}
                className={cn(
                  "rounded-md py-1 text-[11px] font-semibold transition-colors",
                  room === tab ? "bg-white/10 text-white" : "text-purple-200/50 hover:text-purple-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Symmetric Video Banner with Progress Bar */}
        <div className="px-3 pt-2.5 pb-1">
          <div className="relative overflow-hidden rounded-xl border border-lime-300/25">
            <video
              src="/videos/promo-chest.mp4"
              poster="/videos/promo-chest-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 size-full object-cover object-right opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#180929] via-[#180929]/85 to-transparent" />
            <div className="relative flex items-center justify-between gap-3 px-3 py-2.5">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-lime-300">Potion Rain</p>
                <p className="hero-headline text-[17px] leading-tight text-white">1,000 USDC</p>
                <p className="text-[11px] text-purple-200/80">Drops in 14:22</p>
              </div>
              <PrimaryButton
                onClick={() => setJoinedRain(!joinedRain)}
                className="shrink-0 !px-0 !pt-0 [&_.ui-button-face]:px-3.5 [&_.ui-button-face]:py-1.5 [&_.ui-button-face]:text-xs"
              >
                {joinedRain ? "Joined" : "Join"}
              </PrimaryButton>
            </div>
            <div className="relative h-1 w-full bg-black/40">
              <div className="h-full w-[72%] bg-lime-400" />
            </div>
          </div>
        </div>

        {/* Refined Cards Feed */}
        <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-1.5">
          {visibleMessages.map((msg) =>
            msg.systemEvent ? (
              <div
                key={msg.id}
                className="rounded-xl border border-lime-400/25 bg-lime-400/[0.08] px-3 py-2"
              >
                <div className="flex items-center justify-between text-[11px] text-lime-300 font-semibold">
                  <span>Big Win Shared</span>
                  <span className="tabular-nums">{msg.systemEvent.detail}</span>
                </div>
                <p className="mt-0.5 text-xs text-white">
                  {msg.username} · <span className="text-purple-200">{msg.systemEvent.headline}</span>
                </p>
              </div>
            ) : (
              <div
                key={msg.id}
                className={cn(
                  "rounded-xl border border-white/[0.05] border-l-2 px-3 py-2 transition-colors hover:bg-white/[0.05]",
                  TIER_ACCENT_BORDER[msg.tier],
                  msg.tier === 5 ? "bg-blue-500/[0.07]" : "bg-white/[0.03]"
                )}
              >
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <VipBadge src={TIER_BADGE[msg.tier]} alt="" className="size-5 shrink-0" />
                    <span className={cn("truncate text-xs font-semibold", TIER_NAME_COLOR[msg.tier])}>
                      {msg.username}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] text-purple-300/40 tabular-nums">{msg.time}</span>
                </div>
                {msg.sticker ? (
                  <span className="block pt-0.5 text-3xl leading-none">{msg.sticker}</span>
                ) : (
                  <p className="text-[13px] leading-snug text-white/90 text-pretty">{msg.text}</p>
                )}
              </div>
            )
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-white/[0.06] p-3">
          {pickerOpen && (
            <div className="mb-2 grid grid-cols-8 gap-1 rounded-xl bg-[#140d24] p-1.5 border border-white/[0.06]">
              {QUICK_STICKERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(undefined, s)}
                  aria-label={`Send ${s}`}
                  className="rounded-lg py-1 text-lg hover:bg-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="flex flex-1 min-w-0 items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#140d24] px-2.5 py-2 focus-within:border-purple-400/50">
              <button
                type="button"
                aria-label="Toggle stickers"
                onClick={() => setPickerOpen(!pickerOpen)}
                className="text-purple-300/60 hover:text-white transition-colors"
              >
                <BiSolidSmile className="size-4" />
              </button>
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="min-w-0 flex-1 bg-transparent text-xs text-white placeholder:text-purple-300/40 focus:outline-none"
              />
            </div>
            <PrimaryButton
              onClick={() => sendMessage()}
              className="shrink-0 !px-0 !pt-0 [&_.ui-button-face]:px-3.5 [&_.ui-button-face]:py-2 [&_.ui-button-face]:text-xs"
            >
              Send
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------
     03 · ALCHEMIST TAVERN (Brand Theme-Forward)
     ------------------------------------------------------------------------ */
  if (option === "tavern-chronicle") {
    return (
      <div className="flex h-[640px] w-full max-w-[336px] flex-col overflow-hidden rounded-2xl border border-amber-300/20 bg-[#170f26] shadow-2xl">
        {/* Gilded Header */}
        <div className="flex items-center justify-between border-b border-amber-300/15 bg-[#1e1432] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14]" />
            <span className="text-sm font-bold text-amber-50">Tavern Chat</span>
          </div>
          <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-2 py-0.5 text-[11px] font-semibold text-amber-200 tabular-nums">
            1,234 brewing
          </span>
        </div>

        {/* Potion Pot Card */}
        <div className="px-3 pt-3 pb-2">
          <div className="rounded-xl border border-lime-400/30 bg-[#120a20] p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-lime-400/15 text-lime-300">
                  <BiGift className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-lime-300">Hourly Potion Rain</p>
                  <p className="hero-headline text-base leading-tight text-white">1,000 USDC</p>
                </div>
              </div>
              <PrimaryButton
                onClick={() => setJoinedRain(!joinedRain)}
                className="shrink-0 !px-0 !pt-0 [&_.ui-button-face]:px-3.5 [&_.ui-button-face]:py-1.5 [&_.ui-button-face]:text-xs"
              >
                {joinedRain ? "In Pot" : "Join"}
              </PrimaryButton>
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[10px] text-purple-200/70 tabular-nums">
              <span>142 players in pot</span>
              <span className="text-lime-300 font-semibold">14:22 left</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full w-[76%] rounded-full bg-lime-400" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-1 flex flex-col gap-1.5">
          {visibleMessages.map((msg) =>
            msg.systemEvent ? (
              <div
                key={msg.id}
                className="rounded-xl border border-amber-300/30 bg-amber-400/[0.08] px-3 py-2"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200">
                  <BiTrophy className="size-3.5 text-amber-300" />
                  <span>{msg.username} struck gold!</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between text-xs">
                  <span className="text-purple-100">{msg.systemEvent.headline}</span>
                  <span className="font-bold text-lime-300 tabular-nums">{msg.systemEvent.detail}</span>
                </div>
              </div>
            ) : (
              <div
                key={msg.id}
                className={cn(
                  "rounded-lg px-2.5 py-2 border transition-colors",
                  msg.tier >= 4
                    ? "border-amber-300/15 bg-[#221738]"
                    : "border-white/[0.04] bg-[#1c132e]"
                )}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <VipBadge src={TIER_BADGE[msg.tier]} alt="" className="size-5 shrink-0" />
                  <span className={cn("text-xs font-semibold truncate", TIER_NAME_COLOR[msg.tier])}>
                    {msg.username}
                  </span>
                  {msg.tier === 5 && (
                    <span className="rounded bg-blue-500/20 px-1 py-px text-[9px] font-bold text-blue-200 uppercase">
                      VIP
                    </span>
                  )}
                </div>
                {msg.sticker ? (
                  <span className="text-3xl leading-none">{msg.sticker}</span>
                ) : (
                  <p className="text-[13px] leading-snug text-amber-50/90 text-pretty">{msg.text}</p>
                )}
              </div>
            )
          )}
        </div>

        {/* Quick-Hype Bar + Composer */}
        <div className="border-t border-amber-300/15 bg-[#120a20] p-2.5">
          <div className="mb-2 flex items-center gap-1">
            <span className="mr-1 text-[10px] font-medium text-purple-300/50">Hype:</span>
            {["🔥", "🚀", "💎", "💀", "👑"].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => sendMessage(undefined, emoji)}
                aria-label={`Quick send ${emoji}`}
                className="flex-1 rounded-md bg-white/[0.05] py-1 text-sm hover:bg-white/[0.12] transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-amber-300/20 bg-[#1c132e] px-2.5 py-1.5 focus-within:border-lime-400/50">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Speak in the tavern..."
              className="min-w-0 flex-1 bg-transparent text-[13px] text-white placeholder:text-purple-300/40 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Send message"
              onClick={() => sendMessage()}
              className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-lime-400 text-[#0a1d06] hover:bg-lime-300 transition-colors"
            >
              <BiSend className="size-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------
     04 · GUTTER MINIMALIST (Discord / Linear Clean)
     ------------------------------------------------------------------------ */
  if (option === "minimal-terminal") {
    return (
      <div className="flex h-[640px] w-full max-w-[336px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#161024] shadow-2xl">
        {/* Flat Header */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-white">Live Chat</span>
          </div>
          <span className="text-[11px] text-gray-400 tabular-nums">1,234 online</span>
        </div>

        {/* Collapsible 44px Rain Ticker */}
        {!rainDismissed && (
          <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] bg-white/[0.025] px-3.5 py-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-semibold text-lime-300">Rain</span>
                <span className="font-semibold text-white tabular-nums">1,000 USDC</span>
                <span className="text-[11px] text-gray-400 tabular-nums">· 14:22</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setJoinedRain(!joinedRain)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors",
                  joinedRain
                    ? "bg-lime-400/15 text-lime-300"
                    : "bg-white text-[#120b20] hover:bg-gray-200"
                )}
              >
                {joinedRain ? "Joined" : "Join"}
              </button>
              <button
                type="button"
                aria-label="Hide rain ticker"
                onClick={() => setRainDismissed(true)}
                className="flex size-6 items-center justify-center rounded-md text-gray-500 hover:bg-white/5 hover:text-gray-300"
              >
                <BiX className="size-4" />
              </button>
            </div>
          </div>
        )}

        {/* Left-Gutter Feed */}
        <div className="flex-1 overflow-y-auto px-3 py-2 flex flex-col gap-0.5">
          {visibleMessages.map((msg) =>
            msg.systemEvent ? (
              <div
                key={msg.id}
                className="my-1.5 border-l-2 border-lime-400 bg-white/[0.03] pl-2.5 pr-2 py-1.5 text-xs"
              >
                <span className="font-semibold text-white">{msg.username}</span>{" "}
                <span className="text-gray-400">won</span>{" "}
                <span className="font-semibold text-lime-300 tabular-nums">{msg.systemEvent.detail}</span>{" "}
                <span className="text-gray-400">({msg.systemEvent.headline})</span>
              </div>
            ) : (
              <div
                key={msg.id}
                className="grid grid-cols-[24px_minmax(0,1fr)] items-start gap-2.5 rounded-lg px-1.5 py-1.5 hover:bg-white/[0.03] transition-colors"
              >
                <VipBadge src={TIER_BADGE[msg.tier]} alt="" className="mt-0.5 size-6" />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className={cn("truncate text-xs font-semibold", TIER_NAME_COLOR[msg.tier])}>
                      {msg.username}
                    </span>
                    <span className="text-[10px] text-gray-500 tabular-nums">{msg.time}</span>
                  </div>
                  {msg.sticker ? (
                    <span className="mt-0.5 block text-2xl leading-none">{msg.sticker}</span>
                  ) : (
                    <p className="text-[13px] leading-snug text-gray-100 text-pretty">{msg.text}</p>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* Minimal Flat Composer */}
        <div className="border-t border-white/[0.07] p-3">
          {pickerOpen && (
            <div className="mb-2 grid grid-cols-8 gap-1 rounded-lg border border-white/[0.08] bg-[#1e1631] p-1">
              {QUICK_STICKERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(undefined, s)}
                  aria-label={`Send ${s}`}
                  className="rounded py-1 text-base hover:bg-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 rounded-lg border border-white/[0.09] bg-[#110c1c] px-2.5 py-2 focus-within:border-white/25">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Write a message..."
              className="min-w-0 flex-1 bg-transparent text-xs text-white placeholder:text-gray-500 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Toggle stickers"
              onClick={() => setPickerOpen(!pickerOpen)}
              className="text-gray-500 hover:text-gray-200 transition-colors"
            >
              <BiSolidSmile className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Send message"
              onClick={() => sendMessage()}
              className="text-xs font-semibold text-lime-300 hover:text-lime-200 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------------------
     05 · SOCIAL BUBBLES (Interactive & Mobile-First)
     ------------------------------------------------------------------------ */
  return (
    <div className="flex h-[640px] w-full max-w-[336px] flex-col overflow-hidden rounded-2xl border border-purple-300/15 bg-[#1b122d] shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-lime-400" />
          <span className="text-sm font-semibold text-white">Live Chat</span>
        </div>
        <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium text-purple-200 tabular-nums">
          1,234 online
        </span>
      </div>

      {/* Floating Pill Rain Card */}
      <div className="px-3 pt-2.5 pb-1">
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-lime-400/25 bg-[#24193d] px-3 py-2">
          <div className="min-w-0">
            <span className="block text-[10px] font-semibold uppercase text-lime-300">Potion Rain · 14:22</span>
            <span className="text-sm font-bold text-white tabular-nums">1,000 USDC Pool</span>
          </div>
          <button
            type="button"
            onClick={() => setJoinedRain(!joinedRain)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors",
              joinedRain
                ? "bg-lime-400/20 text-lime-300"
                : "bg-lime-400 text-[#0a1d06] hover:bg-lime-300"
            )}
          >
            {joinedRain ? "Joined ✓" : "Join"}
          </button>
        </div>
      </div>

      {/* Bubbles Feed */}
      <div className="flex-1 overflow-y-auto px-3 py-2.5 flex flex-col gap-2.5">
        {visibleMessages.map((msg) =>
          msg.systemEvent ? (
            <div
              key={msg.id}
              className="mx-auto w-full rounded-full border border-lime-400/25 bg-lime-400/10 px-3 py-1.5 text-center text-[11px] text-lime-200"
            >
              🏆 <strong className="text-white">{msg.username}</strong> won{" "}
              <strong className="text-lime-300 tabular-nums">{msg.systemEvent.detail}</strong>
            </div>
          ) : (
            <div
              key={msg.id}
              className={cn("flex flex-col", msg.isSelf ? "items-end" : "items-start")}
            >
              {!msg.isSelf && (
                <div className="mb-1 flex items-center gap-1.5 pl-1">
                  <VipBadge src={TIER_BADGE[msg.tier]} alt="" className="size-4 shrink-0" />
                  <span className={cn("text-[11px] font-semibold", TIER_NAME_COLOR[msg.tier])}>
                    {msg.username}
                  </span>
                  <span className="text-[10px] text-purple-300/40 tabular-nums">{msg.time}</span>
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug",
                  msg.isSelf
                    ? "rounded-br-sm bg-lime-400/15 border border-lime-400/30 text-lime-50"
                    : "rounded-tl-sm bg-white/[0.06] border border-white/[0.06] text-white"
                )}
              >
                {msg.sticker ? (
                  <span className="block text-3xl leading-none">{msg.sticker}</span>
                ) : (
                  <p className="text-pretty">{msg.text}</p>
                )}
              </div>
              {msg.reactions && msg.reactions.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1 pl-1">
                  {msg.reactions.map((r) => (
                    <button
                      key={r.emoji}
                      type="button"
                      onClick={() => bumpReaction(msg.id, r.emoji)}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[11px] text-purple-100 hover:bg-white/10 transition-colors tabular-nums"
                    >
                      <span>{r.emoji}</span>
                      <span>{r.count}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>

      {/* Rounded-Full Pill Composer */}
      <div className="border-t border-white/[0.06] p-3">
        {pickerOpen && (
          <div className="mb-2 grid grid-cols-8 gap-1 rounded-2xl bg-[#130c22] p-1.5 border border-white/[0.08]">
            {QUICK_STICKERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendMessage(undefined, s)}
                aria-label={`Send ${s}`}
                className="rounded-full py-1 text-lg hover:bg-white/10"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#130c22] pl-2 pr-1.5 py-1.5 focus-within:border-lime-400/50">
          <button
            type="button"
            aria-label="Toggle stickers"
            onClick={() => setPickerOpen(!pickerOpen)}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-purple-300/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <BiSolidSmile className="size-4" />
          </button>
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Say something..."
            className="min-w-0 flex-1 bg-transparent text-[13px] text-white placeholder:text-purple-300/40 focus:outline-none"
          />
          <button
            type="button"
            aria-label="Send message"
            onClick={() => sendMessage()}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime-400 text-[#0a1d06] hover:bg-lime-300 transition-colors"
          >
            <BiSend className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChatOptionsGallery() {
  const [showEvents, setShowEvents] = useState(true);
  const [selectedId, setSelectedId] = useState<OptionId | "all">("all");

  const visibleOptions =
    selectedId === "all"
      ? CHAT_OPTIONS
      : CHAT_OPTIONS.filter((o) => o.id === selectedId);

  return (
    <div className="min-h-dvh bg-dicey-darker text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-white/[0.08] bg-dicey-darker/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-purple-100 hover:bg-white/[0.08] transition-colors"
            >
              <BiArrowBack className="size-4" />
              Back to Elixir
            </Link>
            <div>
              <h1 className="text-base font-bold text-white text-balance sm:text-lg">
                Live Chat — Styling Options
              </h1>
              <p className="text-xs text-purple-200/65">
                5 interactive sidebar concepts — type, send stickers, or click Join inside any card
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowEvents(!showEvents)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
                showEvents
                  ? "border-lime-400/40 bg-lime-400/15 text-lime-200"
                  : "border-white/10 bg-white/[0.04] text-purple-200/70 hover:text-white"
              )}
            >
              Big Win Events: {showEvents ? "On" : "Off"}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Filter Pills */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedId("all")}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
              selectedId === "all"
                ? "bg-white text-[#140d24]"
                : "bg-dicey-card text-purple-200/80 hover:bg-dicey-border hover:text-white"
            )}
          >
            All 5 Options
          </button>
          {CHAT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedId(opt.id)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
                selectedId === opt.id
                  ? "bg-lime-400 text-[#0a1d06]"
                  : "bg-dicey-card text-purple-200/80 hover:bg-dicey-border hover:text-white"
              )}
            >
              {opt.number} · {opt.name}
            </button>
          ))}
        </div>

        {/* Options Grid */}
        <div
          className={cn(
            "grid gap-6",
            selectedId === "all"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1 max-w-3xl"
          )}
        >
          {visibleOptions.map((opt) => (
            <article
              key={opt.id}
              className="flex flex-col rounded-2xl border border-white/[0.07] bg-dicey-card/70 p-4 sm:p-5"
            >
              {/* Option Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase text-purple-300/70 tabular-nums">
                    Option {opt.number} · {opt.tag}
                  </span>
                  {opt.recommended && (
                    <span className="rounded-full bg-lime-400/15 border border-lime-400/35 px-2 py-0.5 text-[10px] font-bold text-lime-300">
                      Recommended
                    </span>
                  )}
                </div>
                <h2 className="mt-1 text-lg font-bold text-white text-balance">{opt.name}</h2>
                <p className="mt-1 text-xs leading-relaxed text-purple-200/75 text-pretty">
                  {opt.summary}
                </p>
              </div>

              {/* Live Interactive Chat Mock */}
              <div className="flex justify-center">
                <ChatPrototype option={opt.id} showEvents={showEvents} />
              </div>

              {/* Key Improvements */}
              <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-3.5">
                {opt.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-purple-100/80">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lime-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
