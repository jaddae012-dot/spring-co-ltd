"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const STORAGE_KEY = "spring-theme";

function resolveSystemTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  root.classList.remove("theme-dark", "theme-light");
  root.classList.add(theme === "light" ? "theme-light" : "theme-dark");
  root.setAttribute("data-theme", theme);
}

interface ThemeToggleProps {
  compact?: boolean;
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    const initialTheme = saved === "light" || saved === "dark" ? saved : resolveSystemTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="h-10 w-10 rounded-lg border border-white/10 bg-white/5"
      >
        🌓
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to daylight mode" : "Switch to night mode"}
      title={theme === "dark" ? "Daylight mode" : "Night mode"}
      className={`inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 text-gray-200 hover:bg-white/10 transition-colors ${
        compact ? "h-8 px-2 text-xs" : "h-10 px-3 text-sm"
      }`}
    >
      <span aria-hidden="true">{theme === "dark" ? "🌞" : "🌙"}</span>
    </button>
  );
}
