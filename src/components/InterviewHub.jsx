import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Shuffle, Lightbulb, Target, AlertCircle, ArrowUp } from "lucide-react";
import { portfolio } from "../data/portfolio.js";

const InterviewHub = () => {
  const { categories, questions } = portfolio.interviewHub;
  
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeFollowUp, setActiveFollowUp] = useState(null);

  const topicsRef = useRef(null);
  const flashcardRef = useRef(null);

  // Navigation Handlers
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveTopic(null);
    setCurrentIndex(0);
    setIsRevealed(false);
    setActiveFollowUp(null);
  };

  const scrollToFlashcard = () => {
    setTimeout(() => {
      flashcardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  const scrollToTopics = () => {
    setTimeout(() => {
      topicsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleTopicClick = (topic) => {
    // If they click the same box again, it un-filters (selects null)
    setActiveTopic((prev) => (prev === topic ? null : topic));
    setCurrentIndex(0);
    setIsRevealed(false);
    setActiveFollowUp(null);
    scrollToFlashcard();
  };

  const handleAllTopicsClick = () => {
    setActiveTopic("ALL");
    setCurrentIndex(0);
    setIsRevealed(false);
    setActiveFollowUp(null);
    scrollToFlashcard();
  };

  const goBack = () => {
    // Go back from Category to the Main 2 Boxes
    setActiveCategory(null);
    setActiveTopic(null);
    setCurrentIndex(0);
    setIsRevealed(false);
    setActiveFollowUp(null);
    document.getElementById("interview-prep")?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset state back to the main categories when clicking the "Knowledge Hub" nav link
  useEffect(() => {
    const handleNavClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.getAttribute("href") === "#interview-prep" && target.classList.contains("theme-nav-link")) {
        setActiveCategory(null);
        setActiveTopic(null);
        setCurrentIndex(0);
        setIsRevealed(false);
        setActiveFollowUp(null);
      }
    };
    document.addEventListener("click", handleNavClick);
    return () => document.removeEventListener("click", handleNavClick);
  }, []);

  // Listen for direct category selections from the Hero dropdown
  useEffect(() => {
    const handleCategorySelect = (e) => {
      const category = e.detail;
      setActiveCategory(category);
      setActiveTopic(null);
      setCurrentIndex(0);
      setIsRevealed(false);
      setActiveFollowUp(null);
      document.getElementById("interview-prep")?.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("knowledgeHubCategorySelect", handleCategorySelect);
    return () => window.removeEventListener("knowledgeHubCategorySelect", handleCategorySelect);
  }, []);

  // Data Processing
  const categoryStats = useMemo(() => {
    return categories.map((cat) => ({
      name: cat,
      count: questions.filter((q) => q.category === cat).length,
    }));
  }, [categories, questions]);

  const topicsForCategory = useMemo(() => {
    if (!activeCategory) return [];
    const catQs = questions.filter((q) => q.category === activeCategory);
    // If a question doesn't have a topic yet (like Spring Boot), group it under "General Topics"
    const uniqueTopics = [...new Set(catQs.map((q) => q.topic || "General Topics"))];
    
    return uniqueTopics
      .sort((a, b) => {
        const numA = parseInt(a.match(/^\d+/)?.[0] || "0", 10);
        const numB = parseInt(b.match(/^\d+/)?.[0] || "0", 10);
        return numA - numB;
      })
      .map((topic) => ({
        name: topic,
        count: catQs.filter((q) => (q.topic || "General Topics") === topic).length,
      }));
  }, [activeCategory, questions]);

  const displayedQuestions = useMemo(() => {
    if (activeCategory) {
      let filtered = questions.filter((q) => q.category === activeCategory);
      if (activeTopic && activeTopic !== "ALL") {
        filtered = filtered.filter((q) => (q.topic || "General Topics") === activeTopic);
      }
      return filtered;
    }
    return [];
  }, [activeCategory, activeTopic, questions]);

  // Flashcard Actions
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayedQuestions.length);
    setIsRevealed(false);
    setActiveFollowUp(null);
    scrollToFlashcard();
  };

  const handleRandom = () => {
    if (displayedQuestions.length <= 1) return;
    const currentQ = displayedQuestions[currentIndex];
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * displayedQuestions.length);
    } while (displayedQuestions[randomIndex].id === currentQ?.id);
    
    setCurrentIndex(randomIndex);
    setIsRevealed(false);
    setActiveFollowUp(null);
    scrollToFlashcard();
  };

  const activeQuestion = displayedQuestions[currentIndex];

  return (
    <section id="interview-prep" className="scroll-mt-32 min-h-screen bg-surface py-16 px-4 sm:px-6 lg:px-8 font-body text-gray-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Knowledge <span className="text-accent-500">Hub</span>
          </h2>
        </div>

        {/* LEVEL 1: Category Boxes */}
        {!activeCategory && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {categoryStats.map((cat) => (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group cursor-pointer bg-panel border border-gray-800 rounded-2xl p-10 flex flex-col justify-center items-center text-center hover:border-accent-500 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-accent-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-sm font-medium text-gray-400 bg-ink border border-gray-800 px-5 py-2 rounded-full">
                  {cat.count} Deep-Dive Questions
                </span>
              </div>
            ))}
          </div>
        )}

        {/* LEVEL 2: Sub-Topics Filters & Questions List */}
        {activeCategory && (
          <div className="max-w-5xl mx-auto">
            
            {/* Back Button */}
            <button
              onClick={goBack}
              className="mb-8 flex items-center text-accent-400 hover:text-accent-300 font-medium transition-colors bg-panel px-5 py-2.5 rounded-lg border border-gray-800 hover:border-accent-500/50 w-max"
            >
              <span className="mr-3 text-xl leading-none">←</span>
              Back to Categories
            </button>

            {/* Sub-topics Filter Grid (Shows above questions) */}
            {topicsForCategory.length > 0 && (
              <div ref={topicsRef} className="mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 scroll-mt-32">
                {/* "All Topics" Filter Box */}
                <div
                  onClick={handleAllTopicsClick}
                  className={`cursor-pointer rounded-xl p-4 flex flex-col justify-center items-center text-center transition-all duration-300 border ${
                    activeTopic === "ALL"
                      ? "bg-accent-600 border-accent-500 shadow-glow text-white"
                      : "bg-panel border-gray-800 text-gray-400 hover:border-accent-500 hover:text-gray-200"
                  }`}
                >
                  <h3 className="text-sm font-display font-bold mb-1">All {activeCategory}</h3>
                  <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                    {questions.filter(q => q.category === activeCategory).length} Questions
                  </span>
                </div>

                {/* Specific Topic Filter Boxes */}
                {topicsForCategory.map((topic) => (
                  <div
                    key={topic.name}
                    onClick={() => handleTopicClick(topic.name)}
                    className={`cursor-pointer rounded-xl p-4 flex flex-col justify-center items-center text-center transition-all duration-300 border ${
                      activeTopic === topic.name
                        ? "bg-accent-600 border-accent-500 shadow-glow text-white"
                        : "bg-panel border-gray-800 text-gray-400 hover:border-accent-500 hover:text-gray-200"
                    }`}
                  >
                    <h3 className="text-sm font-display font-bold mb-1 leading-tight line-clamp-2">
                      {topic.name}
                    </h3>
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                      {topic.count} Questions
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Original Flashcard UI */}
            <div ref={flashcardRef} className="mt-8 scroll-mt-32">
              {!activeQuestion ? (
                <div className="text-center py-12 text-gray-500 bg-panel rounded-xl border border-gray-800">
                  No questions found.
                </div>
              ) : (
                <div className="glass-panel relative flex min-h-[380px] flex-col overflow-hidden p-6 sm:p-10">
                  <div className="flex flex-wrap items-center justify-between border-b border-[color:var(--lux-border)] pb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={scrollToTopics}
                        className="flex items-center gap-1.5 rounded-full bg-[color:var(--lux-panel-strong)] px-3 py-1.5 text-xs font-semibold text-[color:var(--lux-muted)] transition hover:text-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)]"
                        title="Go back to topics"
                      >
                        <ArrowUp size={14} /> Back
                      </button>
                      <span className="lux-chip-soft flex items-center gap-2">
                        <Brain size={14} className="text-[color:var(--lux-gold)]" />
                        {activeQuestion.category} {activeQuestion.topic ? `• ${activeQuestion.topic}` : ""}
                      </span>
                    </div>
                    <span className="text-sm font-medium theme-muted">
                      Question {currentIndex + 1} of {displayedQuestions.length}
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
                              <p className="text-sm leading-relaxed theme-muted whitespace-pre-wrap font-mono">{activeQuestion.example}</p>
                            </div>
                          </div>

                          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
                            {activeQuestion.followUps && activeQuestion.followUps.length > 0 && (
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
                            )}
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
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InterviewHub;