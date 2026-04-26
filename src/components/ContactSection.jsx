import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import ButtonLink from "./ButtonLink";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

export default function ContactSection({ personal }) {
  const contactItems = [
    { label: "Email", value: personal.email, href: `mailto:${personal.email}`, icon: <Mail size={18} /> },
    { label: "Phone", value: personal.phone, href: `tel:${personal.phone.replace(/\s+/g, "")}`, icon: <Phone size={18} /> },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: personal.linkedin, icon: <Linkedin size={18} /> }
  ];

  if (personal.github) {
    contactItems.push({
      label: "GitHub",
      value: "View GitHub profile",
      href: personal.github,
      icon: <Github size={18} />
    });
  }

  return (
    <MotionSection id="contact" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="glass-panel p-7 sm:p-8">
          <SectionHeading
            eyebrow="Contact"
            title="Open to backend and cloud opportunities"
            description={personal.availability}
          />

          <div className="mt-8 grid gap-4">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                className="lux-subpanel transition hover:border-accent-400 hover:shadow-panel"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-accent-500/10 p-3 text-accent-400">{item.icon}</div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">{item.label}</p>
                    <p className="theme-muted mt-2 text-base">{item.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="glass-panel p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Next Step</p>
          <h3 className="theme-text mt-3 font-display text-3xl font-bold">Resume, LinkedIn, and direct contact</h3>
          <p className="theme-muted mt-4 max-w-2xl text-base leading-8">
            If there is a strong fit for backend, microservices, or cloud engineering work, I am happy to continue the
            conversation over email or LinkedIn.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={personal.resumeFile} variant="primary" icon="download" leadingIcon={<Download size={16} />} download>
              Download Resume
            </ButtonLink>
            <ButtonLink href={`mailto:${personal.email}`} variant="secondary" leadingIcon={<Mail size={16} />}>
              Contact Me
            </ButtonLink>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
