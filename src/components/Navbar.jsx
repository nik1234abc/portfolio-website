import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const portfolioLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Certifications", href: "/#credentials" },
  { label: "Contact", href: "/#contact" },
  { label: "Knowledge Hub", href: "/knowledge-hub" },
];

const hubLinks = [
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export default function Navbar({ theme, toggleTheme, resumeFile }) {
  const location = useLocation();
  const links = location.pathname === "/knowledge-hub" ? hubLinks : portfolioLinks;
  const [open, setOpen] = useState(false);

  const handleHashLink = (e, href) => {
    if (href.startsWith("/#")) {
      const hash = href.slice(1); // e.g. "#contact"
      if (location.pathname === "/") {
        e.preventDefault();
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      } else {
        // Store the target hash so the homepage can scroll to it after mount
        sessionStorage.setItem("scrollTo", hash);
      }
    }
  };

  return (
    <header className="theme-navbar sticky top-0 z-50 backdrop-blur-xl transition-colors duration-500">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a 
          href="/"
          className="flex items-center gap-3"
        >
          <span className="brand-mark">NG</span>
          <div>
            <p className="font-display text-base font-bold text-[color:var(--lux-gold)]">Nikhil Gadhwal</p>
            <p className="text-sm theme-muted">Java Backend Developer</p>
          </div>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleHashLink(e, link.href)} className="theme-nav-link text-sm font-medium transition">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={resumeFile}
            download
            className="lux-btn-secondary !px-5 !py-2.5 text-sm"
          >
            Download Resume
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
                onClick={(e) => { handleHashLink(e, link.href); setOpen(false); }}
                className="theme-nav-link text-sm font-semibold"
              >
                {link.label}
              </a>
            ))}
            <a
              href={resumeFile}
              download
              onClick={() => {
                setOpen(false);
              }}
              className="mt-2 lux-btn-secondary w-fit !px-5 !py-2.5 text-sm"
            >
              Download Resume
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
