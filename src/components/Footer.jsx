import { Github, Linkedin, Mail, Users } from "lucide-react";
import { useState, useEffect } from "react";

function VisitorCounter() {
  const [count, setCount] = useState("...");

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("visited");
    const url = alreadyCounted
      ? "https://api.counterapi.dev/v1/nikhilgadhwal-portfolio/visits"
      : "https://api.counterapi.dev/v1/nikhilgadhwal-portfolio/visits/up";

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.count) {
          setCount(data.count.toLocaleString());
          if (!alreadyCounted) sessionStorage.setItem("visited", "1");
        }
      })
      .catch(() => setCount(null));
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-2 text-xs theme-muted mt-3">
      <Users size={13} className="text-accent-500 shrink-0" />
      <span>
        <span className="font-bold text-accent-400">{count}</span> developers visited
      </span>
    </div>
  );
}

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
          <div className="mt-3">
            <VisitorCounter />
          </div>
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
