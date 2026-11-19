"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TabType = "casino" | "sports";

interface TabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeSport: string | null;
  setActiveSport: (sport: string | null) => void;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  toggleChat: () => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>("casino");
  const [activeSport, setActiveSport] = useState<string | null>(null);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((prev) => !prev);
  const toggleChat = () => setChatOpen((prev) => !prev);

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeSport,
        setActiveSport,
        isSidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        isChatOpen,
        setChatOpen,
        toggleChat,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
}
