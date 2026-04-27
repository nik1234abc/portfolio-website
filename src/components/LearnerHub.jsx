import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Zap, ChevronDown, ChevronUp, BookOpen, Tag } from "lucide-react";
import { coding } from "../data/coding.js";

const categoryIcons = {
  "coding-patterns": Code2,
  "java8-streams": Zap,
};

export default function LearnerHub() {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [expandedTopicId, setExpandedTopicId] = useState(null);

  const activeCategory = coding.categories.find((c) => c.id === activeCategoryId);

  const handleCategoryClick = (id) => {
    setActiveCategoryId(id);
    setExpandedTopicId(null);
  };

  const handleBack = () => {
    setActiveCategoryId(null);
    setExpandedTopicId(null);
    document.getElementById("learner-hub")?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTopic = (id) => {
    setExpandedTopicId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="learner-hub" className="scroll-mt-32 bg-surface py-16 px-4 sm:px-6 lg:px-8 font-body text-gray-300">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Learner <span className="text-accent-500">Hub</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Coding patterns and Java 8 stream techniques — structured for interview prep and real-world use.
          </p>
        </div>

        {/* LEVEL 1: Category Cards */}
        {!activeCategoryId && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {coding.categories.map((cat) => {
              const Icon = categoryIcons[cat.id] || BookOpen;
              return (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -4 }}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="group cursor-pointer bg-panel border border-gray-800 rounded-2xl p-10 flex flex-col justify-center items-center text-center hover:border-accent-500 hover:shadow-glow transition-all duration-300"
                >
                  <div className="h-14 w-14 rounded-2xl bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] text-accent-400 flex items-center justify-center mb-5">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-accent-500 font-semibold uppercase tracking-wider mb-3">{cat.subtitle}</p>
                  <p className="text-sm text-gray-400 mb-5">{cat.description}</p>
                  <span className="text-sm font-medium text-gray-400 bg-ink border border-gray-800 px-5 py-2 rounded-full">
                    {cat.topics.length} Topics
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* LEVEL 2: Topics List */}
        {activeCategoryId && activeCategory && (
          <div className="max-w-4xl mx-auto">

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="mb-8 flex items-center text-accent-400 hover:text-accent-300 font-medium transition-colors bg-panel px-5 py-2.5 rounded-lg border border-gray-800 hover:border-accent-500/50 w-max"
            >
              <span className="mr-3 text-xl leading-none">←</span>
              Back to Categories
            </button>

            {/* Category Header */}
            <div className="mb-8">
              <h3 className="text-3xl font-display font-bold text-white mb-1">{activeCategory.title}</h3>
              <p className="text-gray-400 text-sm">{activeCategory.description}</p>
            </div>

            {/* Topics Accordion */}
            <div className="space-y-3">
              {activeCategory.topics.map((topic, idx) => {
                const isOpen = expandedTopicId === topic.id;
                const hasCode = !!topic.codeExample;
                const hasQuestions = topic.questions && topic.questions.length > 0;

                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.3) }}
                    className={`bg-panel border rounded-xl transition-all duration-300 ${
                      isOpen ? "border-accent-500 shadow-glow" : "border-gray-800 hover:border-gray-600"
                    }`}
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleTopic(topic.id)}
                      className="w-full flex items-center justify-between p-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-accent-500 bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] px-2.5 py-1 rounded-full shrink-0">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="text-base font-display font-bold text-white leading-tight">
                            {topic.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <span className="flex items-center gap-1 text-xs text-accent-400 font-semibold">
                              <Tag size={10} /> {topic.badge}
                            </span>
                            <span className="text-gray-600 text-xs">•</span>
                            <span className="text-xs text-gray-500">{topic.usedIn}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`shrink-0 ml-4 transition-colors ${isOpen ? "text-accent-400" : "text-gray-500"}`}>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                          <div className="px-5 pb-6 pt-1 border-t border-gray-800/60 space-y-5">

                            {/* Covers */}
                            {topic.covers && topic.covers.length > 0 && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Covers</p>
                                <div className="flex flex-wrap gap-2">
                                  {topic.covers.map((item, i) => (
                                    <span
                                      key={i}
                                      className="text-xs bg-ink border border-gray-800 text-gray-300 px-3 py-1 rounded-full"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Code Example (Streams) */}
                            {hasCode && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">Code Pattern</p>
                                <div className="bg-ink/70 border border-gray-800 rounded-lg p-4">
                                  <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                                    {topic.codeExample}
                                  </pre>
                                </div>
                                {topic.useCase && (
                                  <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                                    <Zap size={11} className="text-accent-500" />
                                    <span className="text-gray-400">{topic.useCase}</span>
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Practice Questions (Coding Patterns) */}
                            {hasQuestions && (
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                                  Key Questions
                                </p>
                                <ul className="space-y-2">
                                  {topic.questions.map((q) => (
                                    <li
                                      key={q.id}
                                      className="flex items-start gap-3 text-sm text-gray-300"
                                    >
                                      <span className="mt-0.5 shrink-0 h-5 w-5 rounded-full bg-[color:color-mix(in_srgb,var(--lux-gold)_12%,transparent)] text-accent-400 text-xs font-bold flex items-center justify-center">
                                        {q.id}
                                      </span>
                                      {q.title}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                          </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
