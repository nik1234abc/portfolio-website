import { motion } from "framer-motion";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

export default function SkillsSection({ skills }) {
  return (
    <MotionSection id="skills" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow="Skills"
        title="Core backend stack"
        description="A concise view of the technologies I use most across backend development, distributed services, cloud workflows, and delivery."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skills.map((group, index) => (
          <motion.article
            key={group.category}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            className="glass-panel p-6 sm:p-7"
          >
            <h3 className="theme-text font-display text-2xl font-bold">{group.category}</h3>
            <p className="theme-muted mt-2 text-sm leading-7">{group.description}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {group.items.map((skill) => (
                <span
                  key={skill.name}
                  className="lux-chip"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </MotionSection>
  );
}
