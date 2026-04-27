import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  BriefcaseBusiness,
  ChevronDown,
  Coffee,
  Download,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal,
  Layers
} from "lucide-react";
import ButtonLink from "./ButtonLink";

export default function Hero({ personal, quickStats, onViewResumeClick }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleCategorySelect = (e, category) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    window.dispatchEvent(new CustomEvent('knowledgeHubCategorySelect', { detail: category }));
  };

  const socialButtons = [
    { label: "View Resume", onClick: onViewResumeClick, icon: "arrow" },
    { label: "Contact Me", href: "#contact", icon: "arrow" },
    { label: "LinkedIn", href: personal.linkedin, icon: "arrow" }
  ];

  if (personal.github) {
    socialButtons.push({ label: "GitHub", href: personal.github, icon: "arrow" });
  }

  return (
    <section id="home" className="relative pt-8 sm:pt-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb-left" />
        <div className="hero-orb hero-orb-right" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-10 pt-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:pb-16 lg:pt-10">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="theme-badge inline-flex items-center gap-2"
          >
            <ShieldCheck size={16} />
            Open to global backend engineering opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="theme-text mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.14 }}
            className="mt-5 max-w-3xl text-xl font-semibold text-[color:var(--lux-gold)] sm:text-2xl"
          >
            {personal.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="theme-muted mt-6 max-w-3xl text-lg leading-8"
          >
            {personal.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="theme-muted mt-7 flex flex-wrap items-center gap-5 text-sm"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin size={16} />
              {personal.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail size={16} />
              {personal.email}
            </span>
            <span className="inline-flex items-center gap-2">
              <BriefcaseBusiness size={16} />
              Backend systems | enterprise finance | distributed services
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {socialButtons.map((button) => (
              <ButtonLink
                key={button.label}
                href={button.href}
                onClick={button.onClick}
                icon={button.icon}
                leadingIcon={
                  button.label === "LinkedIn" ? (
                    <Linkedin size={16} />
                  ) : button.label === "GitHub" ? (
                    <Github size={16} />
                  ) : null
                }
                download={button.download}
                variant={button.label === "View Resume" ? "primary" : "secondary"}
              >
                {button.label}
              </ButtonLink>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44 }}
            className="mt-8 max-w-2xl text-sm theme-muted"
          >
            Targeting senior backend engineering, microservices, platform, and cloud modernization roles where
            business impact, reliability, and architectural thinking matter.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col justify-center lg:-mt-32 lg:items-end"
        >
          <div className="glass-panel w-full max-w-md p-6 sm:p-8">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] p-3 text-[color:var(--lux-gold)]">
                <Brain size={28} />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-500">Learn & Practice</p>
                <h3 className="theme-text mt-1 font-display text-2xl font-bold">Knowledge Hub</h3>
              </div>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between rounded-xl border border-[color:var(--lux-border-strong)] bg-[color:var(--lux-panel-strong)] px-5 py-4 text-sm font-semibold theme-text transition hover:border-[color:var(--lux-gold)] focus:outline-none"
              >
                <span>Select a topic to explore...</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 top-full z-20 mt-3 overflow-hidden rounded-xl border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] shadow-panel"
                >
                  <a
                    href="#interview-prep"
                    onClick={(e) => handleCategorySelect(e, "Java")}
                    className="flex items-center gap-3 border-b border-[color:var(--lux-border)] px-5 py-4 text-sm font-medium theme-text transition-colors hover:bg-[color:var(--lux-panel-strong)]"
                  >
                    <Coffee size={18} className="text-[color:var(--lux-gold)]" />
                    <div>
                      <span className="block font-bold">Java Deep-Dive</span>
                      <span className="mt-0.5 block text-xs theme-muted">84 Core & Advanced Questions</span>
                    </div>
                  </a>
                  <a
                    href="#interview-prep"
                    onClick={(e) => handleCategorySelect(e, "Spring Boot")}
                    className="flex items-center gap-3 border-b border-[color:var(--lux-border)] px-5 py-4 text-sm font-medium theme-text transition-colors hover:bg-[color:var(--lux-panel-strong)]"
                  >
                    <Terminal size={18} className="text-[color:var(--lux-gold)]" />
                    <div>
                      <span className="block font-bold">Spring Boot Deep-Dive</span>
                      <span className="mt-0.5 block text-xs theme-muted">85 Architecture & Web Questions</span>
                    </div>
                  </a>
                  <a
                    href="#interview-prep"
                    onClick={(e) => handleCategorySelect(e, "Application Flow")}
                    className="flex items-center gap-3 px-5 py-4 text-sm font-medium theme-text transition-colors hover:bg-[color:var(--lux-panel-strong)]"
                  >
                    <Layers size={18} className="text-[color:var(--lux-gold)]" />
                    <div>
                      <span className="block font-bold">Application Architecture</span>
                      <span className="mt-0.5 block text-xs theme-muted">Interactive Request Lifecycle</span>
                    </div>
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
