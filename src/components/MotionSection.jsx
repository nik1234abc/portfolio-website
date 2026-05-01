import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function MotionSection({ id, className = "", children }) {
  // Start visible if this section is the scroll target (coming from another page)
  const isTarget = typeof window !== "undefined" && sessionStorage.getItem("scrollTarget") === id;

  return (
    <motion.section
      id={id}
      className={className}
      variants={container}
      initial={isTarget ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
    >
      {children}
    </motion.section>
  );
}
