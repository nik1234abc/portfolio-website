import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import ButtonLink from "./ButtonLink";

export default function Hero({ personal, quickStats, onViewResumeClick }) {
  const socialButtons = [
    { label: "View Resume", onClick: onViewResumeClick, icon: "arrow" },
    { label: "Contact Me", href: "#contact", icon: "arrow" },
    { label: "LinkedIn", href: personal.linkedin, icon: "arrow" },
  ];

  return (
    <section id="home" className="relative pt-8 sm:pt-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb-left" />
        <div className="hero-orb hero-orb-right" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-10 pt-6 lg:px-8 lg:pb-16 lg:pt-10">
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
                  button.label === "LinkedIn" ? <Linkedin size={16} /> : null
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
      </div>
    </section>
  );
}
