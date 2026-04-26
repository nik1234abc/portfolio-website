import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document === "undefined") {
      return "dark";
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark"))
  };
}
