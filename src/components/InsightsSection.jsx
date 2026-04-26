import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

export default function InsightsSection({ insights }) {
  return (
    <MotionSection id="insights" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow="Currently Building"
        title="Insights and ongoing learning"
        description="A space for technical experiments, architecture breakdowns, and continuous professional growth."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight) => (
          <article key={insight.title} className="glass-panel flex flex-col p-6 sm:p-7 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--lux-gold)] hover:shadow-panel">
            <div className="flex-1">
              <h3 className="theme-text font-display text-xl font-bold leading-tight">{insight.title}</h3>
              <p className="theme-muted mt-4 text-sm leading-7">{insight.summary}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {insight.tags.map((tag) => (
                <span key={tag} className="lux-chip-soft text-xs">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </MotionSection>
  );
}