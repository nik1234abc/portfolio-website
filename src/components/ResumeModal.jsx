import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ResumeModal({ resumeFile, onClose }) {
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

  if (!resumeFile) {
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
        className="glass-panel flex h-full max-h-[90vh] w-full max-w-4xl flex-col bg-[color:var(--lux-bg-alt)] p-4 sm:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="theme-text font-display text-xl font-bold">Resume</h3>
          <button type="button" onClick={onClose} className="lux-icon-button" aria-label="Close resume preview">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden rounded-2xl border border-[color:var(--lux-border-strong)] bg-[color:var(--lux-bg)] shadow-sm">
          <object data={resumeFile} type="application/pdf" className="h-full w-full">
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 bg-[color:var(--lux-bg-alt)] p-6 text-center">
              <p className="text-sm theme-muted">PDF preview not available.</p>
              <a
                href={resumeFile}
                download
                className="inline-flex items-center justify-center rounded-full bg-[color:var(--lux-gold)] px-5 py-3 text-sm font-semibold text-[#16110c] transition hover:bg-[color:var(--lux-gold-deep)]"
              >
                Download Resume
              </a>
            </div>
          </object>
        </div>
      </motion.div>
    </motion.div>
  );
}