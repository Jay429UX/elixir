"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TabType = "casino" | "sports";

interface TabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>("casino");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, isSidebarCollapsed, setSidebarCollapsed, toggleSidebar }}>
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
