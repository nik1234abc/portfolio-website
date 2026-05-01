import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Linkedin,
  Mail,
  MapPin,
  ShieldCheck,
  Network,
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

      <div className="mx-auto max-w-7xl px-6 pb-4 pt-6 lg:px-8 lg:pb-8 lg:pt-10">
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:items-center">
          
          {/* Left Side: Content */}
          <div className="max-w-2xl lg:pr-4 lg:-translate-y-4">
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
              className="text-[color:var(--lux-gold)] mt-6 max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
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
                <BriefcaseBusiness size={16} />
                {personal.company || "Tata Consultancy Services"}
              </span>
              <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-[color:var(--lux-gold)]">
                <Mail size={16} />
                {personal.email}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="mt-8 flex flex-wrap gap-4"
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
          </div>

          {/* Right Side: Quick Stats & Tech Stack */}
          <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 lg:-translate-y-6 mt-6 lg:mt-0">
            
            {/* Quick Stats Grid */}
            {quickStats && quickStats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 gap-3 sm:gap-5 relative"
              >
                <div className="absolute -inset-10 bg-gradient-to-tr from-[color:var(--lux-gold)] to-transparent opacity-[0.08] blur-3xl rounded-full pointer-events-none" />
                {quickStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`lux-subpanel flex flex-col justify-center bg-[color:var(--lux-panel-strong)] ${idx % 2 !== 0 ? 'lg:translate-y-8' : ''}`}
                  >
                    <p className="text-3xl sm:text-4xl font-display font-bold text-[color:var(--lux-gold)] drop-shadow-sm">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs font-semibold theme-muted mt-3 uppercase tracking-widest leading-relaxed">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tech Stack Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lux-subpanel relative z-10 mt-2 overflow-hidden"
            >
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[color:var(--lux-glow-primary)] opacity-[0.08] blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[color:var(--lux-gold)]"></div>
                <p className="text-[10px] sm:text-xs font-bold text-[color:var(--lux-text)] uppercase tracking-widest opacity-90">Core Architecture Stack</p>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[color:var(--lux-border-strong)]"></div>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
                {[
                  { name: "Java", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
                  { name: "Spring Boot", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg" },
                  { name: "AWS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", darkInvert: true },
                  { name: "Kafka", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg", darkInvert: true },
                  { name: "PostgreSQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
                  { name: "Microservices", icon: Network }
                ].map((tech) => (
                  <div key={tech.name} className="group relative z-10 flex items-center gap-2.5 rounded-xl border border-[color:var(--lux-border-strong)] bg-[color:var(--lux-bg)] px-3.5 py-2 shadow-sm transition-all duration-300 hover:border-[color:var(--lux-gold)] hover:-translate-y-1 hover:shadow-glow-sm">
                    {tech.src ? (
                      <img src={tech.src} alt={tech.name} className={`h-4 w-4 sm:h-5 sm:w-5 object-contain grayscale-[30%] opacity-80 transition-transform duration-300 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100 ${tech.darkInvert ? 'dark:invert' : ''}`} />
                    ) : (
                      <tech.icon className="h-4 w-4 sm:h-5 sm:w-5 text-[color:var(--lux-text)] opacity-80 transition-all duration-300 group-hover:scale-110 group-hover:text-[color:var(--lux-gold)] group-hover:opacity-100" />
                    )}
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-wide text-[color:var(--lux-text)] opacity-80 transition-colors duration-300 group-hover:text-[color:var(--lux-gold-deep)] group-hover:opacity-100">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
