import { ArrowUpRight, Download } from "lucide-react";

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  onClick,
  leadingIcon = null,
  disabled = false,
  download = false
}) {
  const shared =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-300";
  const variants = {
    primary:
      "bg-[color:var(--lux-gold)] text-[color:#16110c] shadow-glow hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--lux-gold)]",
    secondary:
      "border border-[color:var(--lux-border-strong)] bg-transparent text-[color:var(--lux-text)] backdrop-blur hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]",
    subtle:
      "text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)]"
  };

  const iconNode = icon === "download" ? <Download size={16} /> : <ArrowUpRight size={16} />;

  if (disabled) {
    return (
      <span
        className={`${shared} cursor-not-allowed border border-dashed border-[color:var(--lux-border)] bg-[color:color-mix(in_srgb,var(--lux-panel-soft)_80%,transparent)] text-[color:var(--lux-muted)]`}
      >
        {children}
      </span>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${shared} ${variants[variant]}`}
      >
        {leadingIcon}
        {children}
        {iconNode}
      </button>
    );
  }

  return (
    <a
      className={`${shared} ${variants[variant]}`}
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      download={download || undefined}
    >
      {leadingIcon}
      {children}
      {iconNode}
    </a>
  );
}
