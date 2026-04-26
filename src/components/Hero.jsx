import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Download,
  Github,
  Globe2,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck
} from "lucide-react";
import ButtonLink from "./ButtonLink";

export default function Hero({ personal, quickStats }) {
  const socialButtons = [
    { label: "Download Resume", href: personal.resumeFile, icon: "download", download: true },
    { label: "Contact Me", href: "#contact", icon: "arrow" },
    { label: "LinkedIn", href: personal.linkedin, icon: "arrow" }
  ];

  if (personal.github) {
    socialButtons.push({ label: "GitHub", href: personal.github, icon: "arrow" });
  }

  return (
    <section id="home" className="relative overflow-hidden pt-6 sm:pt-8">
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />
      <div className="mx-auto grid max-w-7xl gap-8 px-6 pb-6 pt-4 lg:grid-cols-[1.35fr_0.65fr] lg:px-8 lg:pb-8 lg:pt-6">
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
            <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-2 hover:text-[color:var(--lux-gold)] transition">
              <Mail size={16} />
              {personal.email}
            </a>
            <span className="w-full inline-flex items-center gap-2">
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
                icon={button.icon}
                leadingIcon={
                  button.label === "LinkedIn" ? (
                    <Linkedin size={16} />
                  ) : button.label === "GitHub" ? (
                    <Github size={16} />
                  ) : null
                }
                download={button.download}
                variant={button.label === "Download Resume" ? "primary" : "secondary"}
              >
                {button.label}
              </ButtonLink>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          <div className="mx-auto max-w-[280px] sm:max-w-[230px] lg:max-w-[220px] overflow-hidden rounded-[28px] border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] p-2 sm:p-1.5 lg:p-1 shadow-panel">
            <img
              src={personal.profilePhoto}
              alt="Professional headshot of Nikhil Gadhwal"
              className="h-auto w-full rounded-[26px] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
