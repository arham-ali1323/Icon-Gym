"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const COOKIE_NAME = "dashboard_color_theme";
const DEFAULT_COLOR_THEME = "orange";

function setColorThemeCookie(theme: string) {
  if (typeof window === "undefined") return;

  document.cookie = `${COOKIE_NAME}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${
    window.location.protocol === "https:" ? "Secure;" : ""
  }`;
}

export interface ColorTheme {
  name: string;
  value: string;
  primary: string;
  primaryLight: string;
  primaryBg: string;
  primaryBorder: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    name: "Orange",
    value: "orange",
    primary: "#ff4500",
    primaryLight: "#ffa500",
    primaryBg: "rgba(255, 69, 0, 0.1)",
    primaryBorder: "rgba(255, 69, 0, 0.1)",
  },
  {
    name: "Blue",
    value: "blue",
    primary: "#3b82f6",
    primaryLight: "#60a5fa",
    primaryBg: "rgba(59, 130, 246, 0.1)",
    primaryBorder: "rgba(59, 130, 246, 0.1)",
  },
  {
    name: "Green",
    value: "green",
    primary: "#10b981",
    primaryLight: "#34d399",
    primaryBg: "rgba(16, 185, 129, 0.1)",
    primaryBorder: "rgba(16, 185, 129, 0.1)",
  },
  {
    name: "Purple",
    value: "purple",
    primary: "#8b5cf6",
    primaryLight: "#a78bfa",
    primaryBg: "rgba(139, 92, 246, 0.1)",
    primaryBorder: "rgba(139, 92, 246, 0.1)",
  },
  {
    name: "Red",
    value: "red",
    primary: "#ef4444",
    primaryLight: "#f87171",
    primaryBg: "rgba(239, 68, 68, 0.1)",
    primaryBorder: "rgba(239, 68, 68, 0.1)",
  },
];

type DashboardThemeContextType = {
  activeColorTheme: ColorTheme;
  setActiveColorTheme: (theme: ColorTheme) => void;
  setCSSVariables: (theme: ColorTheme) => void;
};

const DashboardThemeContext = createContext<DashboardThemeContextType | undefined>(undefined);

export function DashboardThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: string;
}) {
  const [activeColorTheme, setActiveColorTheme] = useState<ColorTheme>(() => {
    const savedTheme = initialTheme || DEFAULT_COLOR_THEME;
    return COLOR_THEMES.find(theme => theme.value === savedTheme) || COLOR_THEMES[0];
  });

  const setCSSVariables = (theme: ColorTheme) => {
    if (typeof window === "undefined") return;
    
    const root = document.documentElement;
    root.style.setProperty('--dashboard-primary', theme.primary);
    root.style.setProperty('--dashboard-primary-light', theme.primaryLight);
    root.style.setProperty('--dashboard-primary-bg', theme.primaryBg);
    root.style.setProperty('--dashboard-primary-border', theme.primaryBorder);
  };

  useEffect(() => {
    setColorThemeCookie(activeColorTheme.value);
    setCSSVariables(activeColorTheme);
  }, [activeColorTheme]);

  return (
    <DashboardThemeContext.Provider value={{ 
      activeColorTheme, 
      setActiveColorTheme,
      setCSSVariables
    }}>
      {children}
    </DashboardThemeContext.Provider>
  );
}

export function useDashboardTheme() {
  const context = useContext(DashboardThemeContext);
  if (context === undefined) {
    throw new Error(
      "useDashboardTheme must be used within a DashboardThemeProvider"
    );
  }
  return context;
}
