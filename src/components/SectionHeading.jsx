export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent-400">{eyebrow}</p>
      <h2 className="theme-text mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="theme-muted mt-4 text-base leading-7 sm:text-lg">{description}</p>
    </div>
  );
}
