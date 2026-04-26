import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

function ProjectModal({ project, onClose, projects, currentIndex, onNavigate }) {
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
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Case Study</p>
              <h3 className="theme-text mt-3 font-display text-3xl font-bold">{project.title}</h3>
              <p className="theme-muted mt-3 max-w-3xl text-base leading-8">{project.tagline}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="lux-icon-button"
              aria-label="Close case study"
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
            <div className="lux-subpanel">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Business Problem</p>
              <p className="theme-muted mt-3 text-base leading-8">{project.problem}</p>
            </div>
            <div className="lux-subpanel">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Technical Solution</p>
              <p className="theme-muted mt-3 text-base leading-8">{project.solution}</p>
            </div>
            <div className="lux-subpanel">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Scale</p>
              <p className="theme-muted mt-3 text-base leading-8">{project.scale}</p>
            </div>
            <div className="lux-subpanel">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Security Considerations</p>
              <p className="theme-muted mt-3 text-base leading-8">{project.security}</p>
            </div>
          </div>

          <div className="mt-5 rounded-[28px] border border-accent-500/16 bg-[linear-gradient(135deg,rgba(198,169,105,0.12),rgba(255,255,255,0.02))] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Business Impact</p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {project.impact.map((item) => (
                <div
                  key={item}
                  className="lux-subpanel text-sm leading-7 theme-muted"
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
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setCurrentProjectIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateProject = (newIndex) => {
    if (newIndex >= 0 && newIndex < projects.length) {
      setCurrentProjectIndex(newIndex);
    }
  };

  return (
    <MotionSection id="projects" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow="Featured Projects"
        title="Technical execution and measurable backend impact"
        description="Migration projects, automation initiatives, and regional enhancements with detailed architecture, technologies, and business outcomes."
      />

      <div className="mt-10 grid gap-5 xl:grid-cols-1">
        <article className="glass-panel p-6 sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Project Portfolio</p>
          <h3 className="theme-text mt-3 font-display text-3xl font-bold">Enterprise Backend Engineering</h3>
          <p className="theme-muted mt-4 text-base leading-8">
            Java 21 migration, invoice automation, APAC/EMEA regional workflows, and microservices modernization with measurable business impact.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Java 21", "Spring Boot", "AWS SQS", "Microservices", "PostgreSQL", "REST APIs", "Docker", "Jenkins"].map((item) => (
              <span
                key={item}
                className="lux-chip-soft"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="lux-subpanel">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Migration & Modernization</p>
              <p className="mt-3 text-sm leading-7 theme-muted">Java 8→21 migration across 9 production microservices</p>
            </div>
            <div className="lux-subpanel">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Automation Impact</p>
              <p className="mt-3 text-sm leading-7 theme-muted">50-70% efficiency gains in invoice and regional workflows</p>
            </div>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-5 py-3 text-sm font-semibold theme-text transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"
          >
            View Case Studies
            <ArrowUpRight size={16} />
          </button>
        </article>
      </div>

      <AnimatePresence>
        {isModalOpen && projects[currentProjectIndex] ? (
          <ProjectModal
            project={projects[currentProjectIndex]}
            projects={projects}
            currentIndex={currentProjectIndex}
            onClose={closeModal}
            onNavigate={navigateProject}
          />
        ) : null}
      </AnimatePresence>
    </MotionSection>
  );
}
