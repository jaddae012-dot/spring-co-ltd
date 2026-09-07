"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { recordSecretaryEntry } from "@/lib/company-secretary";

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
  secretGestureHref?: string;
}

export default function ThemeToggle({ compact = false, secretGestureHref }: ThemeToggleProps) {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const lastTapRef = useRef<number>(0);
  const gestureTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    recordSecretaryEntry({
      category: "system",
      title: "Theme changed",
      detail: `The interface was switched to ${nextTheme} mode.`,
      path: window.location.pathname,
    });
  }

  function handleClick() {
    toggleTheme();

    if (!secretGestureHref) {
      return;
    }

    const now = Date.now();
    const isDoubleTap = now - lastTapRef.current < 325;

    if (gestureTimerRef.current) {
      clearTimeout(gestureTimerRef.current);
      gestureTimerRef.current = null;
    }

    if (isDoubleTap) {
      lastTapRef.current = 0;
      recordSecretaryEntry({
        category: "navigation",
        title: "Secret gateway used",
        detail: `A double tap on the theme control opened ${secretGestureHref}.`,
        path: secretGestureHref,
      });
      router.push(secretGestureHref);
      return;
    }

    lastTapRef.current = now;
    gestureTimerRef.current = setTimeout(() => {
      lastTapRef.current = 0;
      gestureTimerRef.current = null;
    }, 350);
  }

  useEffect(() => {
    return () => {
      if (gestureTimerRef.current) {
        clearTimeout(gestureTimerRef.current);
      }
    };
  }, []);

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
      onClick={handleClick}
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
