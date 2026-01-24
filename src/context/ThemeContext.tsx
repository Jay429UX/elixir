"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeType = "purple" | "green";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  hasSelectedTheme: boolean;
  setHasSelectedTheme: (selected: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("purple");
  const [hasSelectedTheme, setHasSelectedTheme] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Mark as hydrated on mount (no localStorage - theme resets each visit)
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Apply theme class to document
  useEffect(() => {
    if (isHydrated) {
      document.documentElement.classList.remove("theme-purple", "theme-green");
      document.documentElement.classList.add(`theme-${theme}`);
    }
  }, [theme, isHydrated]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
  };

  const handleSetHasSelectedTheme = (selected: boolean) => {
    setHasSelectedTheme(selected);
  };

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, hasSelectedTheme, setHasSelectedTheme: handleSetHasSelectedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
