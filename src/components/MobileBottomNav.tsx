"use client";

import { useState } from "react";
import {
  BiSolidBall,
  BiSolidDiamond,
  BiSolidDice5,
  BiSolidGift,
  BiSolidVideo,
} from "react-icons/bi";
import { useTab } from "@/context/TabContext";
import PickPotionModal from "./PickPotionModal";
import { cn } from "@/lib/utils";

export default function MobileBottomNav() {
  const { activeTab, setActiveTab } = useTab();
  const [isBonusOpen, setIsBonusOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveTab("casino");
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  const items = [
    {
      id: "casino",
      label: "Casino",
      icon: BiSolidDiamond,
      active: activeTab === "casino",
      onClick: () => {
        setActiveTab("casino");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      id: "originals",
      label: "Originals",
      icon: BiSolidDice5,
      active: false,
      onClick: () => scrollToSection("elixir-originals"),
    },
    {
      id: "sports",
      label: "Sports",
      icon: BiSolidBall,
      active: activeTab === "sports",
      onClick: () => {
        setActiveTab("sports");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      id: "live",
      label: "Live",
      icon: BiSolidVideo,
      active: false,
      onClick: () => scrollToSection("live-casino"),
    },
    {
      id: "bonuses",
      label: "Bonuses",
      icon: BiSolidGift,
      active: isBonusOpen,
      onClick: () => setIsBonusOpen(true),
    },
  ];

  return (
    <>
      <nav
        aria-label="Mobile bottom navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-purple-300/15 bg-[#181026]/95 backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-center px-1">
          {items.map(({ id, label, icon: Icon, active, onClick }) => (
            <button
              key={id}
              type="button"
              aria-current={active ? "page" : undefined}
              onClick={onClick}
              className={cn(
                "flex h-full select-none flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-semibold transition-colors",
                active ? "text-[#39ff14]" : "text-purple-200/70 active:text-white"
              )}
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <PickPotionModal isOpen={isBonusOpen} onClose={() => setIsBonusOpen(false)} />
    </>
  );
}
