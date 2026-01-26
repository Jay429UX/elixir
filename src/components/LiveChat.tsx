"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChatCircle, CaretDown, Smiley, PaperPlaneTilt } from "@phosphor-icons/react";
import { useTheme } from "@/context/ThemeContext";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  sticker?: string;
  vipLevel: number;
  timestamp: Date;
}

// Stickers available in chat
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
  "/vip/Icon%202%20(iron)-BWRwb8a7.png",
  "/vip/Icon%201%20(gold)-9sMBN4Vh.png",
  "/vip/Icon%202%20(platinum)-DPA4FuH1.png",
  "/vip/Icon%201%20(diamant)-_4mW1oBJ.png",
  "/vip/Icon%204%20(gold)-B969YQB8.png",
  "/vip/Icon%204%20(platinum)-28ZBS5o7.png",
  "/vip/Icon%205%20(gold)-T356dNZq.png",
  "/vip/Icon%205%20(platinum)-BAlv4mS-.png",
  "/vip/Icon%202%20(diamant)-BcCwr7BA.png",
];

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

const generateUsername = () => {
  const adjectives = ["Lucky", "Big", "Cool", "Fast", "Pro", "Epic", "Wild", "Crypto", "Diamond", "Golden", "Degen", "Based", "Chad", "Rich", "Moon"];
  const nouns = ["Player", "Winner", "Gamer", "Star", "King", "Wolf", "Tiger", "Shark", "Ace", "Boss", "Whale", "Ape", "Punter", "Roller", "Spinner"];
  const num = Math.floor(Math.random() * 999);
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${num}`;
};

const generateMessage = (id: number): ChatMessage => {
  // 15% chance of sending a sticker instead of text
  const isSticker = Math.random() < 0.15;

  if (isSticker) {
    const randomSticker = stickers[Math.floor(Math.random() * stickers.length)];
    return {
      id: `msg-${id}-${Date.now()}`,
      username: generateUsername(),
      message: "",
      sticker: randomSticker.emoji,
      vipLevel: Math.floor(Math.random() * vipBadges.length),
      timestamp: new Date(),
    };
  }

  return {
    id: `msg-${id}-${Date.now()}`,
    username: generateUsername(),
    message: chatMessages[Math.floor(Math.random() * chatMessages.length)],
    vipLevel: Math.floor(Math.random() * vipBadges.length),
    timestamp: new Date(),
  };
};

// Generate initial messages
const createInitialMessages = (): ChatMessage[] =>
  Array.from({ length: 50 }, (_, i) => generateMessage(i));

export default function LiveChat({ isOpen, onToggle }: LiveChatProps) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isStickerPickerOpen, setIsStickerPickerOpen] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize messages only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setMessages(createInitialMessages());
  }, []);

  // Keep scroll at top when new messages arrive (since we're using flex-col-reverse)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages]);

  // Simulate incoming messages
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessages = [...prev, generateMessage(prev.length)];
        // Keep only last 100 messages
        return newMessages.slice(-100);
      });
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [isClient]);

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-user-${Date.now()}`,
          username: "You",
          message: inputValue.trim(),
          vipLevel: 3, // Diamond badge for user
          timestamp: new Date(),
        },
      ]);
      setInputValue("");
    }
  };

  const handleSendSticker = (emoji: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-user-${Date.now()}`,
        username: "You",
        message: "",
        sticker: emoji,
        vipLevel: 3, // Diamond badge for user
        timestamp: new Date(),
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

  return (
    <>
      {/* Collapsed Tab - hidden on mobile */}
      <button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={onToggle}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 z-50 items-center gap-2 px-3 py-4 bg-dicey-card-elevated rounded-l-lg hover:bg-dicey-border transition-all duration-200 hidden lg:flex",
          isOpen ? "right-80" : "right-0"
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <ChatCircle weight="fill" className="size-5 text-white" />
          <span className="relative flex size-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
          </span>
          {/* Collapse/Expand Arrow */}
          <CaretDown
            weight="fill"
            className={cn("size-3 text-gray-400 transition-transform duration-200", isOpen ? "rotate-90" : "-rotate-90")}
          />
        </div>
      </button>

      {/* Sliding Panel - hidden on mobile */}
      <div
        className={cn(
          "fixed top-0 bottom-0 w-80 bg-dicey-card-elevated flex-col z-40 transition-transform duration-200 ease-out hidden lg:flex",
          isOpen ? "right-0 translate-x-0" : "right-0 translate-x-full"
        )}
      >
        {/* Header */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
            </span>
            <h2 className="text-sm font-semibold text-white">Live Chat</h2>
            <span className="text-xs text-gray-500 tabular-nums">1,234 online</span>
          </div>
        </div>

        {/* Separator with inner glow */}
        <div className="mx-4">
          <div
            className="h-px rounded-full"
            style={{
              background: theme === "green"
                ? 'linear-gradient(to right, transparent, rgba(110, 231, 183, 0.5), transparent)'
                : 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.5), transparent)',
              boxShadow: theme === "green"
                ? '0 0 8px rgba(110, 231, 183, 0.3)'
                : '0 0 8px rgba(196, 181, 253, 0.3)',
            }}
          />
        </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 flex flex-col-reverse gap-2"
      >
        {[...messages].reverse().map((msg, index) => (
          <div
            key={msg.id}
            className={`bg-dicey-border rounded-lg p-2.5 ${
              index === 0 ? 'animate-drop-in' : ''
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <img
                src={vipBadges[msg.vipLevel]}
                alt="VIP"
                className="size-4 flex-shrink-0"
              />
              <span className="text-xs font-medium text-gray-400 truncate">
                {msg.username}
              </span>
            </div>
            {msg.sticker ? (
              <span className="text-4xl">{msg.sticker}</span>
            ) : (
              <p className="text-sm text-white leading-relaxed">{msg.message}</p>
            )}
          </div>
        ))}
      </div>

      {/* Separator with inner glow */}
      <div className="mx-4">
        <div
          className="h-px rounded-full"
          style={{
            background: theme === "green"
              ? 'linear-gradient(to right, transparent, rgba(110, 231, 183, 0.5), transparent)'
              : 'linear-gradient(to right, transparent, rgba(196, 181, 253, 0.5), transparent)',
            boxShadow: theme === "green"
              ? '0 0 8px rgba(110, 231, 183, 0.3)'
              : '0 0 8px rgba(196, 181, 253, 0.3)',
          }}
        />
      </div>

      {/* Input */}
      <div className="p-3 pb-4">
        {/* Sticker Picker */}
        {isStickerPickerOpen && (
          <div className="mb-3 p-2 bg-dicey-dark rounded-lg">
            <div className="grid grid-cols-8 gap-1">
              {stickers.map((sticker) => (
                <button
                  key={sticker.id}
                  onClick={() => handleSendSticker(sticker.emoji)}
                  className="p-2 text-2xl hover:bg-dicey-border rounded-lg transition-colors"
                  title={sticker.label}
                >
                  {sticker.emoji}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2 items-center">
          {/* Sticker Button */}
          <button
            onClick={() => setIsStickerPickerOpen(!isStickerPickerOpen)}
            className={cn(
              "p-2 rounded-lg transition-colors duration-200 flex-shrink-0",
              isStickerPickerOpen
                ? "bg-white text-black"
                : "bg-dicey-dark text-gray-400 hover:text-white"
            )}
            title="Stickers"
          >
            <Smiley weight="fill" className="size-5" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 min-w-0 bg-dicey-dark rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="px-3 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex-shrink-0"
          >
            Send
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
