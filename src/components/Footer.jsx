import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer({ personal }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="theme-text font-display text-xl font-bold">{personal.name}</p>
          <p className="theme-muted mt-2 text-sm">
            Java Backend Developer building scalable, secure, enterprise-grade systems.
          </p>
          <p className="mt-2 text-sm theme-muted">
            Copyright {year} {personal.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            className="lux-icon-button"
            aria-label="Email Nikhil Gadhwal"
          >
            <Mail size={18} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="lux-icon-button"
            aria-label="Visit LinkedIn profile"
          >
            <Linkedin size={18} />
          </a>
          {personal.github ? (
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="lux-icon-button"
              aria-label="Visit GitHub profile"
            >
              <Github size={18} />
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
