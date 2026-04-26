import { MoonStar, SunMedium } from "lucide-react";

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className="theme-toggle"
    >
      <span className={`theme-toggle-thumb ${isDark ? "dark" : ""}`} />
      <span className={`theme-toggle-icon ml-1 ${!isDark ? "active" : ""}`}>
        <SunMedium size={16} />
      </span>
      <span className={`theme-toggle-icon ml-auto mr-1 ${isDark ? "active" : ""}`}>
        <MoonStar size={16} />
      </span>
    </button>
  );
}
