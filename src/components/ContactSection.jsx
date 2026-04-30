import { useState } from "react";
import { Linkedin, Mail, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

const FORMSPREE_URL = "https://formspree.io/f/mvzlorwd";

export default function ContactSection({ personal }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const contactLinks = [
    { label: "Email",    value: personal.email,        href: `mailto:${personal.email}`, icon: <Mail size={18} /> },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: personal.linkedin,          icon: <Linkedin size={18} /> },
  ];

  return (
    <MotionSection id="contact" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      <div className="glass-panel p-6 sm:p-8">
        <SectionHeading eyebrow="Contact" title="Let's connect" description={personal.availability} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">

          {/* ── Left: quick links ── */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--lux-muted)]">
              Reach me directly
            </p>
            {contactLinks.map((item) => (
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

          {/* ── Right: contact form ── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[color:var(--lux-muted)] mb-4">
              Send a message
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/5 p-8 text-center">
                <CheckCircle size={32} className="text-green-400" />
                <p className="font-semibold theme-text">Message sent!</p>
                <p className="text-sm text-[color:var(--lux-muted)]">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-xs text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange}
                    placeholder="Your name *"
                    className={`w-full rounded-xl border bg-[color:var(--lux-panel)] px-4 py-3 text-sm text-[color:var(--lux-text)] placeholder:text-[color:var(--lux-muted)] outline-none transition focus:border-[color:var(--lux-gold)] ${errors.name ? "border-red-500/60" : "border-[color:var(--lux-border)]"}`}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder="Your email *"
                    className={`w-full rounded-xl border bg-[color:var(--lux-panel)] px-4 py-3 text-sm text-[color:var(--lux-text)] placeholder:text-[color:var(--lux-muted)] outline-none transition focus:border-[color:var(--lux-gold)] ${errors.email ? "border-red-500/60" : "border-[color:var(--lux-border)]"}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Your message *" rows={4}
                    className={`w-full rounded-xl border bg-[color:var(--lux-panel)] px-4 py-3 text-sm text-[color:var(--lux-text)] placeholder:text-[color:var(--lux-muted)] outline-none transition focus:border-[color:var(--lux-gold)] resize-none ${errors.message ? "border-red-500/60" : "border-[color:var(--lux-border)]"}`}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                    <AlertCircle size={15} />
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                <button
                  type="submit" disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-6 py-3 text-sm font-semibold text-[#16110c] shadow-glow transition hover:brightness-105 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending"
                    ? <><Loader size={15} className="animate-spin" /> Sending…</>
                    : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
