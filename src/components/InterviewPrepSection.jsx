import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Shuffle, Lightbulb, Target, AlertCircle } from "lucide-react";
import MotionSection from "./MotionSection";
import SectionHeading from "./SectionHeading";

export default function InterviewPrepSection({ data }) {
  const { categories, questions } = data;
  const initialCategory = categories.length > 0 ? categories[0] : "";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredQuestions, setFilteredQuestions] = useState(
    initialCategory ? questions.filter((q) => q.category === initialCategory) : questions
  );
  const [currentIndex, setCurrentIndex] = useState(0); // Starts at exactly 0 (Sequence #1)
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeFollowUp, setActiveFollowUp] = useState(null);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    const newFiltered = questions.filter((q) => q.category === category);
    setFilteredQuestions(newFiltered);
    setCurrentIndex(0); // Always resets to the first question in the sequence
    setIsRevealed(false);
    setActiveFollowUp(null);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredQuestions.length); // Moves sequentially
    setIsRevealed(false);
    setActiveFollowUp(null);
  };

  const handleRandom = () => {
    const currentQ = filteredQuestions[currentIndex];
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    } while (filteredQuestions[randomIndex].id === currentQ?.id && filteredQuestions.length > 1);
    
    setCurrentIndex(randomIndex); // Jumps randomly only when Surprise Me is clicked
    setIsRevealed(false);
    setActiveFollowUp(null);
  };

  const activeQuestion = filteredQuestions[currentIndex];

  if (!activeQuestion) return null;

  return (
    <MotionSection id="interview-prep" className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
      <SectionHeading
        eyebrow="Learning Center"
        title="Interview Prep Hub"
        description="A practical space to practice backend engineering interview questions. Simple explanations, real-world examples, and no unnecessary academic jargon."
      />

      {/* Categories */}
      <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
              activeCategory === category
                ? "bg-[color:var(--lux-gold)] text-[#16110c] shadow-glow"
                : "border border-[color:var(--lux-border-strong)] bg-transparent text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Flashcard Area */}
      <div className="mt-10">
        <div className="glass-panel relative flex min-h-[380px] flex-col overflow-hidden p-6 sm:p-10">
          <div className="flex items-center justify-between border-b border-[color:var(--lux-border)] pb-6">
            <span className="lux-chip-soft flex items-center gap-2">
              <Brain size={14} className="text-[color:var(--lux-gold)]" />
              {activeQuestion.category}
            </span>
            <span className="text-sm font-medium theme-muted">
              Question {currentIndex + 1} of {filteredQuestions.length}
            </span>
          </div>

          <div className="flex-1 py-8">
            <h3 className="font-display text-2xl font-bold leading-tight theme-text sm:text-3xl lg:max-w-4xl">
              {activeQuestion.id}. {activeQuestion.question}
            </h3>

            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.div
                  key="hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-12 flex justify-start"
                >
                  <button
                    onClick={() => setIsRevealed(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-[color:var(--lux-panel-strong)] px-6 py-3 text-sm font-semibold theme-text transition hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)] border border-[color:var(--lux-border)] hover:border-[color:var(--lux-gold)]"
                  >
                    Reveal Answer
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-8 space-y-8"
                >
                  <div className="rounded-2xl bg-[color:color-mix(in_srgb,var(--lux-gold)_4%,transparent)] border border-[color:var(--lux-gold)]/20 p-5 sm:p-6">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--lux-gold)] mb-3">Simple Answer</p>
                    <p className="text-base sm:text-lg leading-relaxed theme-text">{activeQuestion.simpleAnswer}</p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="lux-subpanel">
                      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[color:var(--lux-muted)] mb-3"><Lightbulb size={16} /> Explanation</p>
                      <p className="text-sm leading-relaxed theme-muted">{activeQuestion.explanation}</p>
                    </div>
                    <div className="lux-subpanel">
                      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[color:var(--lux-muted)] mb-3"><Target size={16} /> Real-world Example</p>
                      <p className="text-sm leading-relaxed theme-muted">{activeQuestion.example}</p>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[color:var(--lux-muted)] mb-3"><AlertCircle size={16} /> Common Follow-ups</p>
                      <ul className="space-y-3">
                        {activeQuestion.followUps.map((fu, idx) => (
                          <li key={idx} className="flex flex-col gap-2">
                            <button 
                              onClick={() => setActiveFollowUp(activeFollowUp === idx ? null : idx)}
                              className="group flex items-start gap-2 text-left text-sm leading-relaxed theme-muted transition hover:text-[color:var(--lux-gold)]"
                            >
                              <span className="mt-0.5 text-[color:var(--lux-gold)]">↳</span> 
                              <span>{fu.question}</span>
                            </button>
                            <AnimatePresence>
                              {activeFollowUp === idx && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-5 mt-1 rounded-xl border border-[color:var(--lux-border)] bg-[color:var(--lux-panel-strong)] p-3 text-sm theme-text shadow-sm">
                                    {fu.answer}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--lux-muted)] mb-3">Key Points</p>
                      <ul className="space-y-2">
                        {activeQuestion.keyPoints.map((kp, idx) => (
                          <li key={idx} className="text-sm leading-relaxed theme-muted flex items-start gap-2"><span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--lux-gold)]"></span> {kp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[color:var(--lux-border)] pt-6">
            <button onClick={handleNext} className="inline-flex items-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-5 py-2.5 text-sm font-semibold text-[#16110c] shadow-glow transition hover:-translate-y-0.5 hover:brightness-105">Next Question <ChevronRight size={16} /></button>
            <button onClick={handleRandom} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-5 py-2.5 text-sm font-semibold theme-text transition hover:border-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] hover:text-[color:var(--lux-gold)]"><Shuffle size={16} /> Surprise Me</button>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}