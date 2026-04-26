import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

function ProjectModal({ project, onClose }) {
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

  if (!project) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/78 px-4 py-8 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="glass-panel max-h-[88vh] w-full max-w-4xl overflow-y-auto p-6 sm:p-8"
      >
          <div className="flex items-start justify-between gap-4">
            <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Expanded Details</p>
              <h3 className="theme-text mt-3 font-display text-3xl font-bold">{project.title}</h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="lux-icon-button"
            aria-label="Close details"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="lux-chip-soft"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="lux-subpanel border-[color:var(--lux-border)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Reason</p>
            <p className="theme-muted mt-3 text-sm leading-7">{project.reason}</p>
          </div>
          <div className="lux-subpanel border-[color:var(--lux-border)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Solution</p>
              <p className="theme-muted mt-3 text-base leading-8">{project.solution}</p>
            </div>
          </div>

        <div className="mt-5 rounded-[28px] border border-[color:var(--lux-border)] bg-[color:var(--lux-panel-strong)] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-gold)]">Benefits</p>
          <div className="mt-4 grid gap-3">
            {project.benefits.map((item) => (
                <div
                  key={item}
                className="lux-subpanel text-sm leading-7 theme-muted border-[color:var(--lux-border)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }) {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <MotionSection id="projects" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Technical execution and abstracted backend impact"
        description="A look into the structural challenges, technical solutions, and system improvements delivered across enterprise environments."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <article
            key={idx}
            className="glass-panel group flex min-h-[260px] flex-col justify-between p-6 sm:p-7 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--lux-gold)] hover:shadow-panel"
          >
            <div>
              <h3 className="theme-text font-display text-xl font-bold leading-tight">{project.title}</h3>
              <p className="theme-muted mt-4 text-sm leading-7">{project.brief}</p>
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-[color:var(--lux-border)] pt-4">
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 2).map((item) => (
                  <span key={item} className="text-xs font-medium text-[color:var(--lux-muted)]">
                    {item}
                  </span>
                ))}
                {project.stack.length > 2 && (
                  <span className="text-xs font-medium text-[color:var(--lux-muted)]">
                    +{project.stack.length - 2}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="rounded-full bg-[color:var(--lux-panel-strong)] p-2.5 text-[color:var(--lux-muted)] transition group-hover:bg-[color:var(--lux-gold)] group-hover:text-[#16110c]"
                aria-label="Expand project details"
              >
                <Plus size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <AnimatePresence>
        {activeProject ? (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </MotionSection>
  );
}
