"use client";

import { useState, useEffect, useRef } from "react";
import VipBadge from "@/components/ui/VipBadge";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { cn } from "@/lib/utils";
import {
  BiSolidChat as ChatCircle,
  BiSolidSmile as Smiley,
  BiX as CloseIcon,
} from "react-icons/bi";

type VipTier = 1 | 2 | 3 | 4 | 5;

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  sticker?: string;
  vipLevel: number;
  tier: VipTier;
  timeLabel: string;
}

const stickers = [
  { id: "rocket", emoji: "🚀", label: "Rocket" },
  { id: "fire", emoji: "🔥", label: "Fire" },
  { id: "money", emoji: "💰", label: "Money Bag" },
  { id: "diamond", emoji: "💎", label: "Diamond" },
  { id: "crown", emoji: "👑", label: "Crown" },
  { id: "dice", emoji: "🎲", label: "Dice" },
  { id: "slot", emoji: "🎰", label: "Slot Machine" },
  { id: "trophy", emoji: "🏆", label: "Trophy" },
  { id: "clover", emoji: "🍀", label: "Lucky Clover" },
  { id: "star", emoji: "⭐", label: "Star" },
  { id: "heart", emoji: "❤️", label: "Heart" },
  { id: "thumbsup", emoji: "👍", label: "Thumbs Up" },
  { id: "clap", emoji: "👏", label: "Clap" },
  { id: "party", emoji: "🎉", label: "Party" },
  { id: "moon", emoji: "🌙", label: "Moon" },
  { id: "whale", emoji: "🐋", label: "Whale" },
];

interface LiveChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const vipBadges = [
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier1.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier2.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier3.svg",
  "/vip/elixir/tier4.svg",
  "/vip/elixir/tier4.svg",
  "/vip/elixir/tier4.svg",
  "/vip/elixir/tier5.svg",
  "/vip/elixir/tier5.svg",
];

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

const chatMessages = [
  "Just hit a big win! 🎰💰",
  "Let's go! 🚀🚀🚀",
  "Anyone playing Gates? ⚡",
  "Sweet Bonanza is fire today 🔥🔥",
  "Good luck everyone! 🍀✨",
  "This game is insane 🤯",
  "Who else is grinding? 💪",
  "Just deposited, wish me luck 🤞",
  "Nice hit! 💎",
  "What's the best slot rn? 🎲",
  "Love this site ❤️",
  "Cashout or keep going? 🤔",
  "GG 🏆",
  "Bonanza time! 🍬🍭",
  "Finally hit the bonus 🎁✨",
  "What multiplier did you get? 📈",
  "This is my game 👑",
  "Lets goooo 🔥🔥🔥",
  "Anyone else losing? lol 😅",
  "Just hit 100x! 💸💸💸",
  "HUGE WIN OMG 🤑🤑🤑",
  "Degen hours 🌙",
  "One more spin... 🎰",
  "Ez money 💵",
  "RIP bankroll 💀",
  "We're so back 📈📈",
  "It's over... 😭",
  "Trust the process 🙏",
  "Send it! 🚀",
  "Slot gods please 🙌",
  "LFG!!! 🔥💪",
  "This slot is rigged lmao 😂",
  "Cashing out while I'm up 🧠",
  "Just one more bonus... 🎁",
  "Feeling lucky tonight ✨🍀",
];

const parseTier = (src: string): VipTier => {
  const n = Number(src.match(/tier(\d)/)?.[1] ?? 1);
  return Math.max(1, Math.min(5, n)) as VipTier;
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

const generateUsername = () => {
  const adjectives = ["Lucky", "Big", "Cool", "Fast", "Pro", "Epic", "Wild", "Crypto", "Diamond", "Golden", "Degen", "Based", "Chad", "Rich", "Moon"];
  const nouns = ["Player", "Winner", "Gamer", "Star", "King", "Wolf", "Tiger", "Shark", "Ace", "Boss", "Whale", "Ape", "Punter", "Roller", "Spinner"];
  const num = Math.floor(Math.random() * 999);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${num}`;
};

const generateMessage = (id: number, date = new Date()): ChatMessage => {
  const isSticker = Math.random() < 0.15;
  const vipLevel = Math.floor(Math.random() * vipBadges.length);
  const tier = parseTier(vipBadges[vipLevel]);

  if (isSticker) {
    const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
    return {
      id: `msg-${id}`,
      username: generateUsername(),
      message: "",
      sticker: randomSticker.emoji,
      vipLevel,
      tier,
      timeLabel: formatTime(date),
    };
  }

  return {
    id: `msg-${id}`,
    username: generateUsername(),
    message: chatMessages[Math.floor(Math.random() * chatMessages.length)],
    vipLevel,
    tier,
    timeLabel: formatTime(date),
  };
};

const createInitialMessages = (): ChatMessage[] => {
  const now = Date.now();
  return Array.from({ length: 50 }, (_, i) => {
    const offsetMs = (50 - i) * 18_000;
    return generateMessage(i, new Date(now - offsetMs));
  });
};

export default function LiveChat({ isOpen, onToggle }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isStickerPickerOpen, setIsStickerPickerOpen] = useState(false);
  const [room, setRoom] = useState<"Global" | "High Rollers">("Global");
  const [joinedRain, setJoinedRain] = useState(false);
  const [rainSecondsLeft, setRainSecondsLeft] = useState(14 * 60 + 22);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const nextMsgIdRef = useRef(50);

  useEffect(() => {
    setIsClient(true);
    nextMsgIdRef.current = 50;
    setMessages(createInitialMessages());
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages, room]);

  // Simulate incoming messages with guaranteed unique monotonic IDs
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      const nextId = nextMsgIdRef.current++;
      setMessages((prev) => {
        const newMessages = [...prev, generateMessage(nextId)];
        return newMessages.slice(-100);
      });
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [isClient]);

  // Live Potion Rain hourly countdown
  useEffect(() => {
    if (!isClient) return;
    const timer = setInterval(() => {
      setRainSecondsLeft((s) => (s > 1 ? s - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, [isClient]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const nextId = nextMsgIdRef.current++;
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-user-${nextId}`,
          username: "You",
          message: inputValue.trim(),
          vipLevel: vipBadges.length - 1, // Sapphire badge for user
          tier: 5,
          timeLabel: formatTime(new Date()),
        },
      ]);
      setInputValue("");
    }
  };

  const handleSendSticker = (emoji: string) => {
    const nextId = nextMsgIdRef.current++;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-user-${nextId}`,
        username: "You",
        message: "",
        sticker: emoji,
        vipLevel: vipBadges.length - 1,
        tier: 5,
        timeLabel: formatTime(new Date()),
      },
    ]);
    setIsStickerPickerOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const rainMins = Math.floor(rainSecondsLeft / 60);
  const rainSecs = rainSecondsLeft % 60;
  const rainCountdown = `${String(rainMins).padStart(2, "0")}:${String(rainSecs).padStart(2, "0")}`;
  const rainProgressPct = Math.max(4, Math.min(100, ((3600 - rainSecondsLeft) / 3600) * 100));

  const visibleMessages =
    room === "High Rollers"
      ? messages.filter((m) => m.tier >= 3)
      : messages;

  return (
    <>
      {/* Collapsed Tab - hidden on mobile */}
      <button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={onToggle}
        className={cn(
          "fixed top-4 z-50 items-center gap-2 px-3 py-4 rounded-l-lg hover:bg-dicey-border transition-[transform,opacity,background-color,box-shadow] duration-200 hidden lg:flex",
          isOpen ? "right-[calc(320px+16px)]" : "right-0"
        )}
        style={{
          background: "#1e1530",
          borderTop: "1px solid rgba(196, 181, 253, 0.15)",
          borderLeft: "1px solid rgba(196, 181, 253, 0.15)",
          borderBottom: "1px solid rgba(196, 181, 253, 0.15)",
        }}
      >
        <div className="relative">
          <ChatCircle className="size-5 text-white" />
          <span className="absolute -top-0.5 -right-0.5 flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-emerald-400"></span>
          </span>
        </div>
      </button>

      {/* Sliding Panel - Layered Glass Cards */}
      <div
        role={isOpen ? "dialog" : undefined}
        aria-label={isOpen ? "Live Chat" : undefined}
        className={cn(
          "fixed inset-0 z-50 flex-col border border-purple-300/15 bg-[#1e1530] shadow-2xl transition-transform duration-200 ease-out overflow-hidden pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] lg:inset-auto lg:top-4 lg:bottom-4 lg:right-4 lg:w-80 lg:rounded-tr-2xl lg:rounded-b-2xl lg:z-40 lg:pt-0 lg:pb-0 lg:flex",
          isOpen ? "flex translate-x-0" : "hidden lg:flex lg:translate-x-[calc(100%+16px)]"
        )}
      >
        {/* Header with Segmented Tabs */}
        <div className="border-b border-white/[0.06] px-3.5 pt-3 pb-2.5">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full size-2 bg-emerald-400"></span>
              </span>
              <h2 className="text-sm font-semibold text-white">Live Chat</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-200/60 tabular-nums">1,234 online</span>
              <button
                type="button"
                onClick={onToggle}
                aria-label="Close live chat"
                className="flex size-8 items-center justify-center rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white lg:hidden"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#140d24] p-0.5">
            {(["Global", "High Rollers"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setRoom(tab)}
                className={cn(
                  "rounded-md py-1 text-[11px] font-semibold transition-colors",
                  room === tab
                    ? "bg-white/10 text-white"
                    : "text-purple-200/50 hover:text-purple-100"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Symmetric Potion Rain Video Banner with Live Countdown Progress Bar */}
        <div className="px-3 pt-2.5 pb-1">
          <div className="relative overflow-hidden rounded-xl border border-lime-300/25 shadow-[0_10px_18px_-8px_rgba(10,4,20,0.75)]">
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
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold leading-tight text-lime-300">Potion Rain</p>
                <p className="hero-headline text-[17px] leading-tight text-white">1,000 USDC</p>
                <p className="text-[11px] leading-tight text-purple-200/80 tabular-nums">
                  Drops in {rainCountdown}
                </p>
              </div>
              <PrimaryButton
                onClick={() => setJoinedRain((prev) => !prev)}
                className="shrink-0 !px-0 !pt-0 [&_.ui-button-face]:px-3.5 [&_.ui-button-face]:py-1.5 [&_.ui-button-face]:text-xs"
              >
                {joinedRain ? "Joined" : "Join"}
              </PrimaryButton>
            </div>
            <div className="relative h-1 w-full bg-black/40">
              <div
                className="h-full bg-lime-400 transition-[width] duration-500 ease-out"
                style={{ width: `${rainProgressPct.toFixed(1)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Messages Feed - Layered Glass Cards */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto overscroll-contain px-3 py-2 flex flex-col-reverse gap-1.5"
        >
          {[...visibleMessages].reverse().map((msg) => (
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
                  <VipBadge
                    src={vipBadges[msg.vipLevel]}
                    alt="VIP"
                    className="size-5 shrink-0"
                  />
                  <span className={cn("truncate text-xs font-semibold", TIER_NAME_COLOR[msg.tier])}>
                    {msg.username}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] text-purple-300/40 tabular-nums">
                  {msg.timeLabel}
                </span>
              </div>
              {msg.sticker ? (
                <span className="block pt-0.5 text-3xl leading-none">{msg.sticker}</span>
              ) : (
                <p className="text-[13px] leading-snug text-white/90 text-pretty break-words">
                  {msg.message}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Unified Composer */}
        <div className="border-t border-white/[0.06] p-3">
          {isStickerPickerOpen && (
            <div className="mb-2.5 rounded-xl border border-white/[0.06] bg-[#140d24] p-2">
              <div className="grid grid-cols-8 gap-1">
                {stickers.map((sticker) => (
                  <button
                    key={sticker.id}
                    type="button"
                    aria-label={`Send ${sticker.label}`}
                    onClick={() => handleSendSticker(sticker.emoji)}
                    className="rounded-lg p-1.5 text-xl hover:bg-white/10 transition-colors"
                    title={sticker.label}
                  >
                    {sticker.emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="flex flex-1 min-w-0 items-center gap-1.5 rounded-xl border border-white/[0.08] bg-[#140d24] px-2.5 py-2 focus-within:border-purple-400/50 transition-colors">
              <button
                type="button"
                aria-label="Toggle stickers"
                onClick={() => setIsStickerPickerOpen((open) => !open)}
                className={cn(
                  "shrink-0 transition-colors",
                  isStickerPickerOpen
                    ? "text-lime-300"
                    : "text-purple-300/60 hover:text-white"
                )}
                title="Stickers"
              >
                <Smiley className="size-4" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                enterKeyHint="send"
                placeholder="Type a message..."
                className="min-w-0 flex-1 bg-transparent text-base sm:text-xs text-white placeholder:text-purple-300/40 focus:outline-none"
              />
            </div>
            <PrimaryButton
              onClick={handleSend}
              className="shrink-0 !px-0 !pt-0 [&_.ui-button-face]:px-3.5 [&_.ui-button-face]:py-2 [&_.ui-button-face]:text-xs"
            >
              Send
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
}
