import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

function ExperienceModal({ experience, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/78 px-4 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-panel max-h-[88vh] w-full max-w-5xl overflow-y-auto p-6 sm:p-8"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Experience overview</p>
            <h3 className="theme-text mt-3 font-display text-3xl font-bold">{experience.role} at {experience.company}</h3>
            <p className="theme-muted mt-4 max-w-3xl text-base leading-8">{experience.summary}</p>
          </div>

          <button type="button" onClick={onClose} className="lux-icon-button" aria-label="Close experience modal">
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {experience.highlights.map((highlight) => (
            <div key={highlight} className="lux-subpanel p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Key outcome</p>
              <p className="theme-muted mt-3 text-sm leading-7">{highlight}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div className="lux-subpanel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Tenure</p>
            <p className="theme-text mt-3 font-display text-2xl font-bold">{experience.duration}</p>
          </div>
          <div className="lux-subpanel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Focus</p>
            <p className="theme-muted mt-3 text-sm leading-7">Backend modernization, billing automation, regional enhancements, production support, and enterprise reliability.</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ExperienceSection({ experience }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <MotionSection id="experience" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel p-7 sm:p-8">
          <SectionHeading
            eyebrow="Experience"
            title={`${experience.role} at ${experience.company}`}
            description="4+ years building enterprise backend systems with strong delivery across billing automation, cloud modernization, and production reliability."
          />

          <div className="mt-8 lux-subpanel">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Tenure</p>
            <p className="theme-text mt-2 font-display text-2xl font-bold">{experience.duration}</p>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-5 py-3 text-sm font-semibold transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"
          >
            Explore Experience Details
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid gap-6">
          <div className="glass-panel p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Key Achievements</p>
            <div className="mt-6 grid gap-4">
              {experience.highlights.slice(0, 4).map((highlight) => (
                <div key={highlight} className="lux-subpanel theme-muted text-sm leading-7">
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded ? <ExperienceModal experience={experience} onClose={() => setIsExpanded(false)} /> : null}
      </AnimatePresence>
    </MotionSection>
  );
}
