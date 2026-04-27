import { Linkedin, Mail } from "lucide-react";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

export default function ContactSection({ personal }) {
  const contactItems = [
    { label: "Email", value: personal.email, href: `mailto:${personal.email}`, icon: <Mail size={18} /> },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: personal.linkedin, icon: <Linkedin size={18} /> }
  ];

  return (
    <MotionSection id="contact" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <div className="glass-panel p-6">
        <SectionHeading eyebrow="Contact" title="Let's connect" description={personal.availability} />
        <div className="mt-4 flex flex-wrap gap-3">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href?.startsWith("http") ? "_blank" : undefined}
              rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
              className="lux-subpanel flex items-center gap-3 transition hover:border-[color:var(--lux-gold)] hover:shadow-panel"
            >
              <div className="text-[color:var(--lux-gold)]">{item.icon}</div>
              <span className="theme-muted text-sm">{item.value}</span>
            </a>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
