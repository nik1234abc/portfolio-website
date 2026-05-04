import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw, ChevronRight, Trophy, RotateCcw, Zap } from "lucide-react";
import { quizData, quizTopics } from "../data/quizData.js";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export default function QuizSection({ onBack, difficultyFilter = 3 }) {
  const [phase, setPhase] = useState("setup");
  const [focusedTopicIdx, setFocusedTopicIdx] = useState(0);
  const [focusedActionIdx, setFocusedActionIdx] = useState(0);

  // Push history entry so browser back button closes the quiz
  useEffect(() => {
    history.pushState({ quizSection: true }, "");
    const handlePopState = () => onBack();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Backspace key on setup screen returns to Knowledge Hub
  useEffect(() => {
    if (phase !== "setup") return;
    const handler = (e) => {
      if (e.key === "Backspace" && !e.target.matches("input, textarea")) onBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase]);
  const [selectedTopics, setSelectedTopics] = useState(new Set());
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0, retried: 0 });
  const [retryMode, setRetryMode] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  const inputRef = useRef(null);

  const allSelected = selectedTopics.size === quizTopics.length;

  const toggleAll = () => {
    if (allSelected) setSelectedTopics(new Set());
    else setSelectedTopics(new Set(quizTopics));
  };

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  };

  const startQuiz = () => {
    const pool = shuffle(
      quizData.filter((q) => selectedTopics.has(q.topic) && (!q.difficulty || q.difficulty <= difficultyFilter))
    );
    setQuestions(pool);
    setCurrentIdx(0);
    setScore({ correct: 0, wrong: 0, retried: 0 });
    setAnswers({});
    setSubmitted(false);
    setSelectedOption(null);
    setInputValue("");
    setIsCorrect(null);
    setRetryMode(false);
    setPhase("quiz");
  };

  const currentQ = questions[currentIdx];

  const checkAnswer = (answer) => {
    const correct = currentQ.answer.trim().toLowerCase().replace(/\s+/g, "");
    const given = answer.trim().toLowerCase().replace(/\s+/g, "");
    return given === correct;
  };

  const handleSubmit = () => {
    if (submitted) return;
    const answer = currentQ.type === "mcq" ? selectedOption : inputValue;
    if (!answer) return;
    const correct = checkAnswer(answer);
    setIsCorrect(correct);
    setSubmitted(true);
    setAnswers((prev) => ({ ...prev, [currentIdx]: { given: answer, correct } }));
    if (correct) {
      setScore((s) => ({ ...s, correct: s.correct + 1 }));
      if (currentQ.type === "mcq") {
        setTimeout(() => handleNext(), 800);
      }
    } else {
      if (!retryMode) setScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setSelectedOption(null);
    setInputValue("");
    setIsCorrect(null);
    setRetryMode(true);
    setScore((s) => ({ ...s, retried: s.retried + 1 }));
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setFocusedActionIdx(0);
      setPhase("summary");
      return;
    }
    const nextIdx = currentIdx + 1;
    const prevAnswer = answers[nextIdx];
    setCurrentIdx(nextIdx);
    setSubmitted(prevAnswer ? true : false);
    setSelectedOption(prevAnswer ? prevAnswer.given : null);
    setInputValue(prevAnswer ? prevAnswer.given : "");
    setIsCorrect(prevAnswer ? prevAnswer.correct : null);
    setRetryMode(false);
  };

  const handlePrev = () => {
    if (currentIdx === 0) return;
    const prevIdx = currentIdx - 1;
    const prevAnswer = answers[prevIdx];
    setCurrentIdx(prevIdx);
    setSubmitted(prevAnswer ? true : false);
    setSelectedOption(prevAnswer ? prevAnswer.given : null);
    setInputValue(prevAnswer ? prevAnswer.given : "");
    setIsCorrect(prevAnswer ? prevAnswer.correct : null);
    setRetryMode(false);
  };

  // Setup screen: arrow keys navigate topics, Enter toggles, Tab/Enter on start button
  useEffect(() => {
    if (phase !== "setup") return;
    const cols = window.innerWidth >= 640 ? 3 : 2;
    const total = quizTopics.length;
    const handler = (e) => {
      // Don't intercept when a button/input has native focus — let the browser handle it
      if (e.target.matches("input, textarea, button")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); setFocusedTopicIdx(i => (i + 1) % total); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setFocusedTopicIdx(i => (i - 1 + total) % total); }
      if (e.key === "ArrowDown")  { e.preventDefault(); setFocusedTopicIdx(i => Math.min(i + cols, total - 1)); }
      if (e.key === "ArrowUp")    { e.preventDefault(); setFocusedTopicIdx(i => Math.max(i - cols, 0)); }
      if (e.key === "Enter")      { toggleTopic(quizTopics[focusedTopicIdx]); }
      if (e.key === "a" || e.key === "A") { toggleAll(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, focusedTopicIdx, selectedTopics]);

  // Summary screen: arrow keys navigate action buttons, Enter activates
  useEffect(() => {
    if (phase !== "summary") return;
    const actions = [startQuiz, () => setPhase("setup"), onBack];
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setFocusedActionIdx(i => (i + 1) % actions.length); }
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   { e.preventDefault(); setFocusedActionIdx(i => (i - 1 + actions.length) % actions.length); }
      if (e.key === "Enter") { actions[focusedActionIdx](); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, focusedActionIdx, questions, selectedTopics]);
  useEffect(() => {
    if (phase !== "quiz" || submitted) return;
    const handler = (e) => {
      if (currentQ?.type === "mcq") {
        const idx = ["1", "2", "3", "4"].indexOf(e.key);
        if (idx !== -1 && currentQ.options[idx]) setSelectedOption(currentQ.options[idx]);
      }
      if (e.key === "Enter") handleSubmit();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, submitted, currentQ, selectedOption, inputValue]);

  // Keyboard: Enter goes to next after submitted
  useEffect(() => {
    if (phase !== "quiz" || !submitted) return;
    const handler = (e) => { if (e.key === "Enter") handleNext(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, submitted, currentIdx]);

  const accuracy = questions.length > 0
    ? Math.round((score.correct / Math.max(score.correct + score.wrong, 1)) * 100)
    : 0;

  // ── SETUP SCREEN ──────────────────────────────────────────────────────────
  if (phase === "setup") {
    const filteredPool = quizData.filter((q) => selectedTopics.has(q.topic) && (!q.difficulty || q.difficulty <= difficultyFilter));
    const count = filteredPool.length;
    const levelLabel = difficultyFilter === 1 ? "Beginner" : difficultyFilter === 2 ? "Intermediate" : "Advanced";
    const levelEmoji = difficultyFilter === 1 ? "🌱" : difficultyFilter === 2 ? "⚡" : "🔥";
    return (
      <div className="max-w-2xl mx-auto w-full pb-8 px-4">
        <button onClick={onBack} className="mb-8 flex items-center text-accent-400 hover:text-accent-300 font-medium transition-colors bg-panel px-5 py-2.5 rounded-lg border border-[color:var(--lux-border)] hover:border-accent-500/50 w-max">
          <span className="mr-3 text-xl leading-none">←</span>Back to Categories
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[color:color-mix(in_srgb,var(--lux-gold)_12%,transparent)] text-accent-400 mb-4">
            <Zap size={32} />
          </div>
          <h3 className="text-3xl font-display font-bold theme-text mb-2">Quick Quiz</h3>
          <p className="theme-muted text-sm mb-3">Select topics and test your knowledge with MCQ and one-word questions.</p>
          {/* Active study level badge */}
          <div className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold ${
            difficultyFilter === 1
              ? "border-emerald-500/40 bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 text-emerald-300"
              : difficultyFilter === 2
              ? "border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-300"
              : "border-rose-500/40 bg-gradient-to-r from-rose-500/20 to-rose-500/5 text-rose-300"
          }`}>
            <span className="text-base leading-none">{levelEmoji}</span>
            <span>{levelLabel} level questions only</span>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold uppercase tracking-widest text-accent-500">Select Topics</p>
            <button onClick={toggleAll} className="text-xs font-semibold text-accent-400 hover:text-accent-300 transition">
              {allSelected ? "Deselect All" : "Select All"} <span className="opacity-50">(A)</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quizTopics.map((topic, idx) => {
              const topicCount = quizData.filter(q => q.topic === topic && (!q.difficulty || q.difficulty <= difficultyFilter)).length;
              const isEmpty = topicCount === 0;
              return (
                <button
                  key={topic}
                  onClick={() => { if (isEmpty) return; setFocusedTopicIdx(idx); toggleTopic(topic); }}
                  onMouseEnter={() => !isEmpty && setFocusedTopicIdx(idx)}
                  disabled={isEmpty}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold border transition-all duration-200 text-left ${
                    isEmpty
                      ? "border-[color:var(--lux-border)] bg-panel text-[color:var(--lux-muted)] opacity-30 cursor-not-allowed"
                      : selectedTopics.has(topic)
                      ? "border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_15%,transparent)] text-[color:var(--lux-gold)] shadow-glow"
                      : "bg-panel border-[color:var(--lux-border)] theme-muted hover:border-accent-500"
                  } ${
                    !isEmpty && focusedTopicIdx === idx && !selectedTopics.has(topic)
                      ? "ring-2 ring-accent-500/60 border-accent-500"
                      : !isEmpty && focusedTopicIdx === idx
                      ? "ring-2 ring-[color:var(--lux-gold)]/60"
                      : ""
                  }`}
                >
                  <span className="block truncate">{topic}</span>
                  <span className="text-[10px] opacity-60 font-normal">{isEmpty ? "none at this level" : `${topicCount} questions`}</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs theme-muted mt-4 opacity-50">Arrow keys to navigate · Enter to toggle · A to select all</p>
        </div>

        <div className="flex items-center justify-between mb-6 px-1">
          <span className="theme-muted text-sm">{count} questions available</span>
          <span className="text-xs theme-muted">{selectedTopics.size} of {quizTopics.length} selected</span>
        </div>

        <button
          onClick={startQuiz}
          disabled={selectedTopics.size === 0 || count === 0}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-6 py-4 text-base font-bold text-[#16110c] shadow-glow transition hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {selectedTopics.size === 0 ? "Select at least 1 topic" : `Start Quiz (${count} questions)`} <ChevronRight size={18} />
        </button>
      </div>
    );
  }

  // ── SUMMARY SCREEN ────────────────────────────────────────────────────────
  if (phase === "summary") {
    const attemptedQuestions = questions.filter((_, idx) => answers[idx]);

    // Weighted scoring: L1=1pt, L2=2pts, L3=3pts
    const maxPoints = questions.reduce((sum, q) => sum + (q.difficulty || 1), 0);
    const earnedPoints = questions.reduce((sum, q, idx) => {
      const ans = answers[idx];
      return ans?.correct ? sum + (q.difficulty || 1) : sum;
    }, 0);

    // Level breakdown
    const levels = [1, 2, 3].map(lvl => {
      const qs = questions.filter(q => (q.difficulty || 1) === lvl);
      const correct = qs.filter((q, i) => {
        const origIdx = questions.indexOf(q);
        return answers[origIdx]?.correct;
      }).length;
      return { lvl, total: qs.length, correct };
    }).filter(l => l.total > 0);

    const levelLabel = { 1: "Beginner", 2: "Intermediate", 3: "Advanced" };
    const levelEmoji = { 1: "🌱", 2: "⚡", 3: "🔥" };

    return (
      <div className="max-w-xl mx-auto w-full pb-8 px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 text-center">

          {/* ── Action buttons — TOP ── */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button onClick={startQuiz} className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-5 py-3 text-sm font-bold text-[#16110c] shadow-glow hover:brightness-105 ${focusedActionIdx === 0 ? "ring-2 ring-white/40" : ""}` }>
              <RefreshCw size={16} /> Retry Same Topics
            </button>
            <button onClick={() => setPhase("setup")} className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold theme-text hover:border-accent-500 hover:text-accent-400 ${focusedActionIdx === 1 ? "border-accent-500 text-accent-400" : "border-[color:var(--lux-border-strong)]"}`}>
              <RotateCcw size={16} /> Change Topics
            </button>
            <button onClick={onBack} className={`flex-1 inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold theme-text hover:border-accent-500 hover:text-accent-400 ${focusedActionIdx === 2 ? "border-accent-500 text-accent-400" : "border-[color:var(--lux-border-strong)]"}`}>
              ← Back to Hub
            </button>
          </div>
          <p className="text-xs theme-muted mb-6 opacity-50">Arrow keys to navigate · Enter to select</p>

          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[color:color-mix(in_srgb,var(--lux-gold)_15%,transparent)] text-accent-400 mb-6">
            <Trophy size={40} />
          </div>
          <h3 className="text-3xl font-display font-bold theme-text mb-2">Quiz Complete!</h3>
          <p className="theme-muted text-sm mb-6">{attemptedQuestions.length} of {questions.length} questions attempted</p>

          {/* Weighted score */}
          <div className="rounded-2xl border border-[color:var(--lux-gold)]/30 bg-[color:color-mix(in_srgb,var(--lux-gold)_6%,transparent)] p-4 mb-6">
            <p className="text-4xl font-display font-bold text-[color:var(--lux-gold)] mb-1">{earnedPoints} <span className="text-xl opacity-60">/ {maxPoints} pts</span></p>
            <p className="text-xs text-[color:var(--lux-muted)]">Weighted Score · harder questions worth more</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="rounded-2xl bg-green-500/10 border border-green-500/30 p-4">
              <p className="text-2xl font-bold text-green-400">{score.correct}</p>
              <p className="text-xs theme-muted mt-1">Correct</p>
            </div>
            <div className="rounded-2xl bg-red-500/10 border border-red-500/30 p-4">
              <p className="text-2xl font-bold text-red-400">{score.wrong}</p>
              <p className="text-xs theme-muted mt-1">Wrong</p>
            </div>
            <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/30 p-4">
              <p className="text-2xl font-bold text-yellow-400">{score.retried}</p>
              <p className="text-xs theme-muted mt-1">Retried</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-5xl font-display font-bold text-accent-400 mb-1">{accuracy}%</p>
            <p className="theme-muted text-sm">Accuracy</p>
          </div>

          {/* Level breakdown */}
          {levels.length > 0 && (
            <div className="text-left mb-8 rounded-2xl border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-4">Level Breakdown</p>
              <div className="space-y-3">
                {levels.map(({ lvl, total, correct }) => {
                  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
                  return (
                    <div key={lvl}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-[color:var(--lux-text)]">
                          {levelEmoji[lvl]} {levelLabel[lvl]}
                        </span>
                        <span className="text-xs text-[color:var(--lux-muted)]">{correct}/{total} · {pct}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-[color:var(--lux-border)] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, delay: lvl * 0.1 }}
                          className={`h-full rounded-full ${pct === 100 ? "bg-green-400" : pct >= 70 ? "bg-[color:var(--lux-gold)]" : "bg-red-400"}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question review — attempted only */}
          {attemptedQuestions.length > 0 && (
            <div className="text-left mb-8 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-4">
                Question Review ({attemptedQuestions.length} attempted)
              </p>
              {questions.map((q, idx) => {
                const ans = answers[idx];
                if (!ans) return null;
                return (
                  <div key={idx} className={`rounded-xl border p-4 ${
                    ans.correct ? "border-green-500/40 bg-green-500/5" : "border-red-500/40 bg-red-500/5"
                  }`}>
                    <div className="flex items-start gap-3">
                      {ans.correct
                        ? <CheckCircle size={16} className="text-green-400 shrink-0 mt-0.5" />
                        : <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                      }
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm theme-text font-medium leading-snug">{q.question}</p>
                          {q.difficulty && (
                            <span className="shrink-0 text-[10px] opacity-50">{levelEmoji[q.difficulty]}</span>
                          )}
                        </div>
                        {!ans.correct && (
                          <p className="text-xs mt-1.5">
                            <span className="text-red-400">Your answer: {ans.given}</span>
                            <span className="mx-2 text-gray-600">·</span>
                            <span className="text-green-400">Correct: {q.answer}</span>
                          </p>
                        )}
                        {ans.correct && (
                          <p className="text-xs mt-1 text-green-400">{q.answer}</p>
                        )}
                        {q.explanation && (
                          <p className="text-xs theme-muted mt-1.5 opacity-70 leading-relaxed">{q.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </motion.div>
      </div>
    );
  }

  // ── QUIZ SCREEN ───────────────────────────────────────────────────────────
  const progress = (currentIdx / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto w-full pb-8 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setShowQuitDialog(true)} className="flex items-center text-red-400 hover:text-red-300 font-medium transition-colors bg-panel px-4 py-2 rounded-lg border border-red-500/30 hover:border-red-500/60 text-sm">
          <span className="mr-2 text-lg leading-none">✕</span>End Quiz
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-3 py-1.5 rounded-lg border border-[color:var(--lux-border)] text-sm theme-muted hover:border-accent-500 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >← Prev</button>
          <div className="flex items-center gap-3 text-sm font-semibold">
            <span className="text-green-400 flex items-center gap-1"><CheckCircle size={14} /> {score.correct}</span>
            <span className="text-red-400 flex items-center gap-1"><XCircle size={14} /> {score.wrong}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-panel rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-[color:var(--lux-gold)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-panel p-6 sm:p-8">
            {/* Question meta */}
            <div className="flex items-center justify-between mb-6">
              <span className="lux-chip-soft">{currentQ.topic}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full border ${currentQ.type === "mcq" ? "text-blue-400 border-blue-400/30 bg-blue-400/10" : "text-purple-400 border-purple-400/30 bg-purple-400/10"}`}>
                  {currentQ.type === "mcq" ? "MCQ" : "One Word"}
                </span>
                <span className="text-xs theme-muted">{currentIdx + 1}/{questions.length} · {questions.length - currentIdx - 1} left</span>
              </div>
            </div>

            {/* Question */}
            <h3 className="text-lg sm:text-xl font-display font-bold theme-text mb-6 leading-snug">
              {currentQ.question}
            </h3>

            {/* MCQ Options */}
            {currentQ.type === "mcq" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentQ.options.map((opt, optIdx) => {
                  let style = "border-[color:var(--lux-border)] bg-panel theme-muted hover:border-accent-500 hover:theme-text";
                  if (submitted) {
                    if (opt === currentQ.answer) style = "border-green-500 bg-green-500/10 text-green-400";
                    else if (opt === selectedOption && !isCorrect) style = "border-red-500 bg-red-500/10 text-red-400";
                    else style = "border-[color:var(--lux-border)] bg-panel theme-muted opacity-50";
                  } else if (opt === selectedOption) {
                    style = "border-accent-500 bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] text-accent-400";
                  }
                  return (
                    <button
                      key={opt}
                      onClick={() => !submitted && setSelectedOption(opt)}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all duration-200 ${style}`}
                    >
                      <span className="text-xs opacity-50 mr-2">{optIdx + 1}.</span>{opt}
                    </button>
                  );
                })}
              </div>
            )}

            {/* One-word input */}
            {currentQ.type === "oneword" && (
              <div className="mb-6">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => !submitted && setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !submitted && handleSubmit()}
                  placeholder="Type your answer..."
                  disabled={submitted}
                  aria-label="Your answer"
                  className={`w-full rounded-xl border px-5 py-3 text-sm font-medium bg-panel theme-text outline-none transition-all duration-200 placeholder:theme-muted ${
                    submitted
                      ? isCorrect
                        ? "border-green-500 bg-green-500/10"
                        : "border-red-500 bg-red-500/10"
                      : "border-[color:var(--lux-border)] focus:border-accent-500"
                  }`}
                />
                {!submitted && <p className="text-xs theme-muted mt-2 opacity-60">Press Enter to submit</p>}
              </div>
            )}

            {/* MCQ keyboard hint */}
            {currentQ.type === "mcq" && !submitted && (
              <p className="text-xs theme-muted mb-4 opacity-60">Press 1–4 to select · Enter to submit</p>
            )}

            {/* Feedback */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-xl border p-4 mb-6 flex items-start gap-3 ${
                    isCorrect ? "border-green-500/40 bg-green-500/10" : "border-red-500/40 bg-red-500/10"
                  }`}
                >
                  {isCorrect
                    ? <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                    : <XCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                  }
                  <div>
                    <p className={`text-sm font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm theme-muted mt-1">
                        Correct answer: <span className="font-bold text-accent-400">{currentQ.answer}</span>
                      </p>
                    )}
                    {currentQ.explanation && (
                      <p className="text-xs theme-muted mt-2 opacity-80 leading-relaxed">{currentQ.explanation}</p>
                    )}
                    {retryMode && <p className="text-xs theme-muted mt-1 opacity-70">Retry not counted in score.</p>}
                    {submitted && <p className="text-xs theme-muted mt-1 opacity-60">Press Enter for next</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={currentQ.type === "mcq" ? !selectedOption : !inputValue.trim()}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-5 py-3 text-sm font-bold text-[#16110c] shadow-glow hover:brightness-105 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <>
                  {!isCorrect && (
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 px-5 py-3 text-sm font-semibold text-yellow-400 hover:bg-yellow-500/20 transition"
                    >
                      <RefreshCw size={14} /> Retry
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-5 py-3 text-sm font-bold text-[#16110c] shadow-glow hover:brightness-105"
                  >
                    {currentIdx + 1 >= questions.length ? "See Results" : "Next Question"} <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── Quit confirmation dialog ── */}
      <AnimatePresence>
        {showQuitDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.18 }}
              className="glass-panel w-full max-w-sm p-6 text-center"
            >
              <p className="text-2xl mb-3">🤔</p>
              <h3 className="font-display text-lg font-bold theme-text mb-2">Quit the quiz?</h3>
              <p className="text-sm theme-muted mb-6">
                You're on question {currentIdx + 1} of {questions.length}. What would you like to do?
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => { setShowQuitDialog(false); setPhase("summary"); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-5 py-3 text-sm font-bold text-[#16110c] shadow-glow hover:brightness-105"
                >
                  <Trophy size={15} /> See my results
                </button>
                <button
                  onClick={() => { setShowQuitDialog(false); onBack(); }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--lux-border-strong)] px-5 py-3 text-sm font-semibold theme-text hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)] transition"
                >
                  ← Back to Knowledge Hub
                </button>
                <button
                  onClick={() => setShowQuitDialog(false)}
                  className="text-xs theme-muted hover:text-[color:var(--lux-text)] transition py-1"
                >
                  Continue quiz
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
