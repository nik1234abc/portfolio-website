import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BadgeCheck, X } from "lucide-react";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

function CertificateModal({ certification, onClose }) {
  const [copied, setCopied] = useState(false);

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

  if (!certification) {
    return null;
  }

  const copyValidationId = async () => {
    try {
      await navigator.clipboard.writeText(certification.validationNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.warn("Clipboard copy failed", error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm"
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
        className="glass-panel max-h-[88vh] w-full max-w-4xl overflow-hidden bg-[color:var(--lux-bg-alt)] p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Certificate Preview</p>
            <h3 className="theme-text mt-3 font-display text-3xl font-bold">{certification.name}</h3>
            <p className="theme-muted mt-3 max-w-2xl text-base leading-8">{certification.note}</p>
          </div>

          <button type="button" onClick={onClose} className="lux-icon-button" aria-label="Close certificate preview">
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
          <div className="lux-subpanel border-[color:var(--lux-border)] bg-[color:var(--lux-panel-strong)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Certification Authority</p>
            <p className="theme-text mt-3 font-display text-xl font-bold">{certification.issuer}</p>
            <p className="theme-muted mt-3 text-sm">{certification.timeframe}</p>
          </div>
          <div className="lux-subpanel border-[color:var(--lux-border)] bg-[color:var(--lux-panel-strong)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Verification Details</p>
            <div className="mt-3 rounded-3xl border border-[color:var(--lux-border-strong)] bg-[color:var(--lux-bg)] p-4">
              <p className="theme-muted text-xs uppercase tracking-[0.3em]">Validation ID</p>
              <p className="theme-text mt-3 break-all font-mono text-sm leading-7">{certification.validationNumber}</p>
              <button
                type="button"
                onClick={copyValidationId}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-3 py-2 text-sm font-semibold transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"
              >
                {copied ? "Copied" : "Copy ID"}
              </button>
            </div>
            <a
              href={certification.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-5 py-3 text-sm font-semibold text-[color:var(--lux-text)] transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"
            >
              Verify Certification
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] border border-[color:var(--lux-border)] bg-[color:var(--lux-panel-strong)] p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Credential Proof</p>
              <p className="theme-text mt-2 text-sm">Embedded certificate preview for recruiter verification.</p>
            </div>
            <span className="rounded-full border border-[color:var(--lux-border-strong)] bg-[color:var(--lux-bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">
              AWS PDF
            </span>
          </div>
          <div className="mt-5 overflow-hidden rounded-[24px] border border-[color:var(--lux-border-strong)] bg-[color:var(--lux-bg)]">
            <object
              data={certification.file}
              type="application/pdf"
              className="h-[380px] w-full"
            >
              <div className="flex min-h-[380px] flex-col items-center justify-center gap-4 bg-[color:var(--lux-bg-alt)] p-6 text-center">
                <p className="text-sm theme-muted">Preview unavailable in this browser.</p>
                <a
                  href={certification.file}
                  download
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--lux-gold)] px-4 py-2 text-sm font-semibold text-slate-950"
                >
                  Download Certificate
                </a>
              </div>
            </object>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={certification.verificationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-5 py-3 text-sm font-semibold transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"
          >
            Verify Certification
          </a>
          {certification.file ? (
            <a
              href={certification.file}
              download
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--lux-gold)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--lux-gold-deep)]"
            >
              Download Certificate
            </a>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  );
}

function AchievementsModal({ achievements, onClose }) {
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
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
        className="glass-panel max-h-[88vh] w-full max-w-3xl overflow-y-auto p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Career highlights</p>
            <h3 className="theme-text mt-3 font-display text-3xl font-bold">Recognition and awards</h3>
            <p className="theme-muted mt-3 text-base leading-8">A quick view of recruiter-ready achievements that reinforce performance and team impact.</p>
          </div>

          <button type="button" onClick={onClose} className="lux-icon-button" aria-label="Close highlights modal">
            <X size={18} />
          </button>
        </div>

        <div className="mt-8 grid gap-4">
          {achievements.map((achievement) => (
            <div key={achievement} className="lux-subpanel p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Achievement</p>
              <p className="theme-muted mt-3 text-base leading-7">{achievement}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CredentialsSection({ certifications, achievements }) {
  const [activeCertification, setActiveCertification] = useState(null);
  const [showHighlights, setShowHighlights] = useState(false);

  return (
    <MotionSection id="credentials" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications and recognition"
        description="Formal certifications and achievements, surfaced in an executive format that stays concise on the homepage and expands into proof on demand."
      />

      <div className="mt-10 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel p-7">
          <div className="flex items-center gap-3">
            <BadgeCheck className="text-accent-500" size={22} />
            <h3 className="theme-text font-display text-2xl font-bold">Certification</h3>
          </div>
          <div className="mt-6 grid gap-4">
            {certifications.map((certification) => (
              <div key={certification.name} className="lux-subpanel">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="theme-text font-display text-xl font-bold">{certification.name}</h4>
                    <p className="theme-muted mt-2 text-sm">{certification.timeframe}</p>
                    <p className="theme-muted mt-3 text-sm">Trusted AWS certification with instant verification and premium credibility.</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveCertification(certification)}
                      className="rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-4 py-2 text-sm font-semibold transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"
                    >
                      View Certificate
                    </button>
                    <a
                      href={certification.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-4 py-2 text-sm font-semibold transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"
                    >
                      Verify Certification
                    </a>
                    {certification.file ? (
                      <a
                        href={certification.file}
                        download
                        className="inline-flex items-center justify-center rounded-full bg-[color:var(--lux-gold)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-[color:var(--lux-gold-deep)]"
                      >
                        Download Certificate
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-7">
          <div className="flex items-center gap-3">
            <Award className="text-accent-500" size={22} />
            <h3 className="theme-text font-display text-2xl font-bold">Achievements</h3>
          </div>
          <div className="mt-6 grid gap-4">
            <div className="lux-subpanel theme-muted text-sm leading-7">
              2 On-Spot Awards, Team of the Year recognition, and consecutive A Band performance—surfaced for recruiter confidence.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowHighlights(true)}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-4 py-2 text-sm font-semibold transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"
          >
            View Highlights
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeCertification ? (
          <CertificateModal certification={activeCertification} onClose={() => setActiveCertification(null)} />
        ) : null}
        {showHighlights ? (
          <AchievementsModal achievements={achievements} onClose={() => setShowHighlights(false)} />
        ) : null}
      </AnimatePresence>
    </MotionSection>
  );
}
