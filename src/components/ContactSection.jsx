import { Github, Linkedin, Mail, Phone } from "lucide-react";
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
      <div className="grid gap-6">
        <div className="glass-panel p-7 sm:p-8">
          <SectionHeading
            eyebrow="Contact"
            title="Let's connect"
            description={personal.availability}
          />

          <div className="mt-8 grid gap-4">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href?.startsWith("http") ? "_blank" : undefined}
                rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                className="lux-subpanel transition hover:border-[color:var(--lux-gold)] hover:shadow-panel"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] p-3 text-[color:var(--lux-gold)]">{item.icon}</div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">{item.label}</p>
                    <p className="theme-muted mt-2 text-base">{item.value}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
