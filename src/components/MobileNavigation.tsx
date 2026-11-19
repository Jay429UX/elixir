"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BiMenu as List,
  BiX as X,
  BiSolidDiamond as Spade,
  BiSolidBall as SoccerBall,
  BiSolidChat as ChatCircle,
  BiChevronRight as CaretRight,
} from "react-icons/bi";
import { useTab } from "@/context/TabContext";
import ModalShell from "./ModalShell";
import ElixirLogo from "./ElixirLogo";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeTab, setActiveTab, setChatOpen } = useTab();
  const router = useRouter();
  const navigate = (tab: "casino" | "sports", hash = "") => {
    setActiveTab(tab);
    setIsOpen(false);
    router.push(`/${hash}`);
  };
  const openChat = () => {
    setIsOpen(false);
    setChatOpen(true);
  };

  return (
    <>
      <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
        <button type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={isOpen} onClick={() => setIsOpen(true)} className="flex size-10 items-center justify-center rounded-xl text-white">
          <List size={23} />
        </button>
        <a href="/" aria-label="Elixir home" className="hidden min-[480px]:flex items-center">
          <ElixirLogo iconClassName="w-6 h-6" textClassName="text-[17px]" gapClassName="gap-1" />
        </a>
      </div>
      <ModalShell isOpen={isOpen} onClose={() => setIsOpen(false)} labelledBy="mobile-navigation-title">
        <div className="my-auto w-full max-w-sm rounded-2xl bg-dicey-card p-5 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 id="mobile-navigation-title" className="text-lg font-semibold">Explore Elixir</h2>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close navigation" className="flex size-10 items-center justify-center rounded-xl bg-white/5"><X size={20} /></button>
          </div>
          <nav aria-label="Main navigation" className="space-y-2">
            <button type="button" aria-current={activeTab === "casino" ? "page" : undefined} onClick={() => navigate("casino")} className="flex min-h-14 w-full items-center gap-3 rounded-xl bg-dicey-border px-4 text-left font-semibold"><Spade size={22} /> Casino <CaretRight className="ml-auto" /></button>
            <button type="button" aria-current={activeTab === "sports" ? "page" : undefined} onClick={() => navigate("sports")} className="flex min-h-14 w-full items-center gap-3 rounded-xl bg-dicey-border px-4 text-left font-semibold"><SoccerBall size={22} /> Sports <CaretRight className="ml-auto" /></button>
            <div className="pt-3">
              {[["Elixir Originals", "elixir-originals"], ["New releases", "new-releases"], ["Popular games", "popular-games"], ["Live casino", "live-casino"]].map(([label, hash]) => (
                <button key={hash} type="button" onClick={() => navigate("casino", `#${hash}`)} className="flex min-h-12 w-full items-center justify-between rounded-lg px-4 text-left text-sm text-gray-300">{label}<CaretRight size={16} /></button>
              ))}
            </div>
            <div className="pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={openChat}
                className="flex min-h-12 w-full items-center gap-3 rounded-xl bg-white/5 px-4 text-left text-sm font-semibold text-white hover:bg-white/10"
              >
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-green-500" />
                </span>
                <ChatCircle size={18} className="text-purple-300" />
                <span>Live Chat</span>
                <span className="ml-auto text-xs font-normal text-gray-400 tabular-nums">1,234 online</span>
              </button>
            </div>
          </nav>
        </div>
      </ModalShell>
    </>
  );
}
