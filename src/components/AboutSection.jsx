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
            description="Java backend developer with 4+ years building secure APIs, cloud-native microservices, and enterprise financial workflows. Strong in production support, scalable design, and modernization initiatives for fintech and product teams."
          />
        </div>

        <div className="grid gap-6">
          <div className="glass-panel p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Current Role</p>
            <h3 className="theme-text mt-3 font-display text-2xl font-bold">
              Tata Consultancy Services (TCS)
            </h3>
            <p className="theme-muted mt-4 text-base leading-8">
              System Engineer / Java Developer with 4+ years of backend experience across financial workflows,
              production-critical services, and cloud-native modernization.
            </p>
          </div>

          <div className="glass-panel p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Core Strengths</p>
            <p className="theme-muted mt-4 text-base leading-8">
              Scalable microservices, secure REST APIs, production issue resolution, and clear engineering delivery
              across cross-functional enterprise teams.
            </p>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
