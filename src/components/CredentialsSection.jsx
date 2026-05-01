import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, BadgeCheck, X } from "lucide-react";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

function CertificateModal({ certification, onClose }) {
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
        className="glass-panel max-h-[88vh] w-full max-w-4xl overflow-y-auto bg-[color:var(--lux-bg-alt)] p-6 sm:p-8"
      >
        <div className="mb-6 flex justify-end">
          <button type="button" onClick={onClose} className="lux-icon-button" aria-label="Close certificate preview">
            <X size={18} />
          </button>
        </div>

        {certification.file ? (
          <div className="overflow-hidden rounded-[24px] border border-[color:var(--lux-border-strong)] bg-[color:var(--lux-bg)] shadow-sm">
            <object
              data={certification.file}
              type="application/pdf"
              className="h-[400px] w-full md:h-[540px]"
            >
              <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 bg-[color:var(--lux-bg-alt)] p-6 text-center md:min-h-[540px]">
                <p className="text-sm theme-muted">Preview unavailable in this browser.</p>
                <a
                  href={certification.file}
                  download
                  className="inline-flex items-center justify-center rounded-full bg-[color:var(--lux-gold)] px-5 py-3 text-sm font-semibold text-[#16110c] transition hover:bg-[color:var(--lux-gold-deep)]"
                >
                  Download Certificate
                </a>
              </div>
            </object>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

export default function CredentialsSection({ certifications, achievements }) {
  const [activeCertification, setActiveCertification] = useState(null);

  return (
    <MotionSection id="credentials" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow="Credentials"
        title={<span className="text-[color:var(--lux-gold)]">Certifications and recognition</span>}
        description="Formal certifications and achievements, surfaced in an executive format that stays concise on the homepage and expands into proof on demand."
      />

      <div className="mt-10 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel p-7">
          <div className="flex items-center gap-3">
            <BadgeCheck className="text-[color:var(--lux-gold)]" size={22} />
            <h3 className="text-[color:var(--lux-gold)] font-display text-2xl font-bold">Certification</h3>
          </div>
          <div className="mt-6 grid gap-4">
            {certifications.map((certification) => (
              <div key={certification.name} className="lux-subpanel">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-[color:var(--lux-gold)] font-display text-xl font-bold">{certification.name}</h4>
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
            <Award className="text-[color:var(--lux-gold)]" size={22} />
            <h3 className="text-[color:var(--lux-gold)] font-display text-2xl font-bold">Achievements</h3>
          </div>
          <div className="mt-6 grid gap-4">
            {achievements.map((achievement, idx) => (
              <div key={idx} className="lux-subpanel theme-muted text-sm leading-7">
                {achievement}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeCertification ? (
          <CertificateModal certification={activeCertification} onClose={() => setActiveCertification(null)} />
        ) : null}
      </AnimatePresence>
    </MotionSection>
  );
}
