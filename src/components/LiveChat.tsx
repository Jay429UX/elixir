"use client";

import { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  vipLevel: number;
  timestamp: Date;
}

interface LiveChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

const vipBadges = [
  "/vip/Icon 2 (iron)-BWRwb8a7.png",
  "/vip/Icon 1 (gold)-9sMBN4Vh.png",
  "/vip/Icon 2 (platinum)-DPA4FuH1.png",
  "/vip/Icon 1 (diamant)-_4mW1oBJ.png",
  "/vip/Icon 4 (gold)-B969YQB8.png",
  "/vip/Icon 4 (platinum)-28ZBS5o7.png",
  "/vip/Icon 5 (gold)-T356dNZq.png",
  "/vip/Icon 5 (platinum)-BAlv4mS-.png",
  "/vip/Icon 2 (diamant)-BcCwr7BA.png",
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
  return {
    id: `msg-${id}-${Date.now()}`,
    username: generateUsername(),
    message: chatMessages[Math.floor(Math.random() * chatMessages.length)],
    vipLevel: Math.floor(Math.random() * vipBadges.length),
    timestamp: new Date(),
  };
};

// Generate initial messages
const initialMessages: ChatMessage[] = Array.from({ length: 50 }, (_, i) => generateMessage(i));

export default function LiveChat({ isOpen, onToggle }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Keep scroll at top when new messages arrive (since we're using flex-col-reverse)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0;
    }
  }, [messages]);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((prev) => {
        const newMessages = [...prev, generateMessage(prev.length)];
        // Keep only last 100 messages
        return newMessages.slice(-100);
      });
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, []);

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Collapsed Tab */}
      <button
        onClick={onToggle}
        className={`fixed top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 px-3 py-4 bg-dicey-card border border-dicey-border rounded-l-lg hover:bg-dicey-border transition-all duration-300 ${
          isOpen ? 'right-80' : 'right-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          {/* Collapse/Expand Arrow */}
          <svg
            className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : '-rotate-90'}`}
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path d="M6 9L1 4h10L6 9z" />
          </svg>
        </div>
      </button>

      {/* Sliding Panel */}
      <div
        className={`fixed top-16 bottom-0 w-80 bg-dicey-card border-l border-dicey-border flex flex-col z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'right-0 translate-x-0' : 'right-0 translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-dicey-border">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <h2 className="text-sm font-semibold text-white">Live Chat</h2>
            <span className="text-xs text-gray-500">1,234 online</span>
          </div>
        </div>

      {/* Messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 flex flex-col-reverse gap-2"
      >
        {[...messages].reverse().map((msg, index) => (
          <div
            key={msg.id}
            className={`bg-dicey-dark border border-dicey-border rounded-lg p-2.5 transition-all duration-300 ease-out hover:bg-dicey-card/50 cursor-pointer ${
              index === 0 ? 'animate-drop-in' : ''
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <img
                src={vipBadges[msg.vipLevel]}
                alt="VIP"
                className="w-4 h-4 flex-shrink-0"
              />
              <span className="text-xs font-medium text-gray-400 truncate">
                {msg.username}
              </span>
            </div>
            <p className="text-sm text-white leading-relaxed">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-dicey-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-dicey-dark border border-dicey-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
