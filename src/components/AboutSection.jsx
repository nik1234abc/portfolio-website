import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

export default function AboutSection({ personal, focusAreas }) {
  return (
    <MotionSection id="about" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass-panel p-7 sm:p-8">
          <SectionHeading
            eyebrow="About Me"
            title="Backend engineering with enterprise accountability"
            description="Java backend developer building secure APIs, cloud-native microservices, and enterprise financial workflows. Strong in production support, scalable design, and modernization initiatives for fintech and product teams."
          />
          <div className="mt-6 border-t border-[color:var(--lux-border)] pt-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Education</p>
            <h3 className="theme-text mt-3 font-display text-xl font-bold">Bengal College of Engineering and Technology</h3>
            <p className="theme-muted mt-1 text-sm">B.Tech in Information Technology &middot; Jun 2021 &middot; GPA: 8.33 / 10</p>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="glass-panel p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--lux-muted)]">Current Role</p>
            <h3 className="theme-text mt-3 font-display text-2xl font-bold">Tata Consultancy Services (TCS)</h3>
            <p className="theme-muted mt-1 text-sm">System Engineer · Dec 2021 – Present</p>
            <ul className="mt-5 space-y-3">
              {[
                "Modernized 9 production microservices from Java 8 to Java 21",
                "Automated no-show billing workflows using Spring Batch and AWS SQS",
                "Built invoice transfer functionality reducing manual effort by 50–60%",
                "Delivered multi-region financial rule architecture for scalable operations",
                "Owned production support across distributed enterprise financial services"
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm theme-muted leading-7">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--lux-gold)]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
