import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar({ theme, toggleTheme, resumeFile }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="theme-navbar sticky top-0 z-50 backdrop-blur-xl transition-colors duration-500">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="brand-mark">NG</span>
          <div>
            <p className="font-display text-base font-bold theme-text">Nikhil Gadhwal</p>
            <p className="text-sm theme-muted">Java Backend Developer</p>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="theme-nav-link text-sm font-medium transition">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={resumeFile}
            className="inline-flex items-center rounded-full border border-[color:var(--lux-border)] bg-[color:color-mix(in_srgb,var(--lux-panel-soft)_82%,transparent)] px-4 py-2 text-sm font-semibold theme-text transition hover:border-[color:var(--lux-border-strong)] hover:text-[color:var(--lux-gold)]"
            download
          >
            Resume
          </a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((current) => !current)}
            className="lux-icon-button"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[color:var(--lux-border)] px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="theme-nav-link text-sm font-semibold"
              >
                {link.label}
              </a>
            ))}
            <a
              href={resumeFile}
              download
              className="inline-flex w-fit items-center rounded-full bg-[color:var(--lux-gold)] px-4 py-2 text-sm font-semibold text-[#16110c] shadow-glow"
            >
              Download Resume
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
