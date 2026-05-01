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
  const shared = "gap-2 text-sm";
  const variants = {
    primary: "lux-btn-primary",
    secondary: "lux-btn-secondary",
    subtle:
      "inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold transition duration-300 text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)]"
  };

  const iconNode = icon === "download" ? <Download size={16} /> : <ArrowUpRight size={16} />;

  if (disabled) {
    return (
      <span
        className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold cursor-not-allowed border border-dashed border-[color:var(--lux-border)] bg-[color:color-mix(in_srgb,var(--lux-panel-soft)_80%,transparent)] text-[color:var(--lux-muted)]`}
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
