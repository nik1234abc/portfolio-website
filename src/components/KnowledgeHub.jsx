import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Shuffle, Lightbulb, Target, AlertCircle, ArrowUp, Tag } from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { coding } from "../data/coding.js";
import QuizSection from "./QuizSection.jsx";
import LifecycleFlowsHub from "./LifecycleFlowsHub.jsx";

// ── VS Comparison Table ───────────────────────────────────────────────────────
function parseVsComparison(question, explanation, keyPoints) {
  // Detect VS question by title
  const vsMatch = question?.match(/^(.+?)\s+vs\.?\s+(.+?)(?:\s+vs\.?\s+(.+?))?(?:\s*[—–-].*)?$/i);
  if (!vsMatch) return null;

  // Extract the option names from the question title
  const rawA = vsMatch[1]?.trim();
  const rawB = vsMatch[2]?.trim().replace(/[?—–].*$/, "").trim();
  const rawC = vsMatch[3]?.trim().replace(/[?—–].*$/, "").trim();

  // Must have at least 2 sides
  if (!rawA || !rawB) return null;

  const sides = rawC ? [rawA, rawB, rawC] : [rawA, rawB];
  const rows = [];
  const generalPoints = [];

  // Parse keyPoints — each point should start with "SideName: ..."
  if (keyPoints?.length) {
    // Group keyPoints by which side they belong to
    const grouped = {};
    sides.forEach(s => { grouped[s] = []; });

    keyPoints.forEach(kp => {
      const matched = sides.find(s => {
        const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return new RegExp(`^${escaped}[:\\s(]`, "i").test(kp);
      });

      if (matched) {
        // Strip the side name and optional colon/dash from the beginning
        const prefixRegex = new RegExp(`^${matched.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:\\s*\\([^)]*\\))?\\s*[:—–-]\\s*`, "i");
        let text = kp.replace(prefixRegex, "").trim();

        if (text) text = text.charAt(0).toUpperCase() + text.slice(1);
        grouped[matched].push(text || kp);
      } else {
        generalPoints.push(kp);
      }
    });

    // Build rows from grouped keyPoints
    const maxRows = Math.max(...sides.map(s => grouped[s].length));
    for (let i = 0; i < maxRows; i++) {
      const row = {};
      sides.forEach(s => { row[s] = grouped[s][i] || ""; });
      rows.push(row);
    }
  }

  // If we couldn't parse rows from keyPoints, fall back to null (render normally)
  if (rows.length === 0) return null;

  return { sides, rows, generalPoints };
}

function VsComparisonTable({ question, explanation, keyPoints }) {
  const parsed = parseVsComparison(question, explanation, keyPoints);
  if (!parsed) return null;

  const { sides, rows, generalPoints } = parsed;
  const colCount = sides.length;

  // Color palette per column
  const colors = [
    {
      header: "text-sky-300",
      headerBg: "bg-sky-500/10",
      dot: "bg-sky-400",
    },
    {
      header: "text-amber-300",
      headerBg: "bg-amber-500/10",
      dot: "bg-amber-400",
    },
    {
      header: "text-emerald-300",
      headerBg: "bg-emerald-500/10",
      dot: "bg-emerald-400",
    },
  ];

      const gridColsClass = colCount === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";

  return (
    <div className="mt-4 space-y-4">
      <div className={`grid grid-cols-1 ${gridColsClass} gap-4`}>
        {sides.map((side, si) => {
          const c = colors[si % colors.length];
          const sideRows = rows.map(r => r[side]).filter(Boolean);
          return (
            <div key={side} className="flex flex-col rounded-2xl border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] overflow-hidden transition-colors hover:border-[color:var(--lux-border-strong)]">
              <div className={`px-5 py-3 border-b border-[color:var(--lux-border)] ${c.headerBg}`}>
                <span className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${c.header}`}>
                  <span className={`h-2 w-2 rounded-full ${c.dot} shrink-0`} />
                  {side}
                </span>
              </div>
              <div className="p-5 flex-1 bg-[color:color-mix(in_srgb,var(--lux-panel-strong)_20%,transparent)]">
                <ul className="space-y-4">
                  {sideRows.map((point, pi) => (
                    <li key={pi} className="flex items-start gap-3 text-sm text-[color:var(--lux-text)] leading-relaxed">
                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${c.dot}`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {generalPoints && generalPoints.length > 0 && (
        <div className="rounded-2xl border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] p-5">
          <ul className="space-y-3">
            {generalPoints.map((point, pi) => (
              <li key={pi} className="flex items-start gap-3 text-sm text-[color:var(--lux-text)] leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--lux-gold)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Lightweight code syntax highlighter ──────────────────────────────────────
function CodeBlock({ code }) {
  if (!code) return null;
  const lines = code.split("\n");
  const keywords = /\b(public|private|protected|class|interface|extends|implements|new|return|void|static|final|abstract|import|package|if|else|for|while|try|catch|finally|throw|throws|this|super|null|true|false|var|let|const|function|async|await)\b/g;
  const annotations = /(@\w+)/g;
  const strings = /(".*?"|'.*?')/g;
  const comments = /(\/\/.*$)/;
  const types = /\b(String|int|long|boolean|double|float|List|Map|Set|Optional|void|Object|Integer|Long|Boolean|ResponseEntity|Order|User|Payment)\b/g;

  return (
    <div className="rounded-lg border border-[color:var(--lux-border)] bg-[color:var(--lux-code-bg)] p-4 overflow-x-auto max-w-full">
      <pre className="text-xs leading-relaxed font-mono whitespace-pre-wrap break-words">
        {lines.map((line, i) => {
          // comment line
          if (comments.test(line)) {
            return <div key={i}><span style={{ color: "#6b7280" }}>{line}</span></div>;
          }
          // tokenize
          const parts = [];
          let remaining = line;
          let key = 0;
          // simple sequential replacement — good enough for examples
          const tokenize = (str) => {
            return str
              .replace(annotations, '<ANN>$1</ANN>')
              .replace(strings, '<STR>$1</STR>')
              .replace(keywords, '<KW>$1</KW>')
              .replace(types, '<TY>$1</TY>');
          };
          const tokenized = tokenize(remaining);
          const segments = tokenized.split(/(<ANN>.*?<\/ANN>|<STR>.*?<\/STR>|<KW>.*?<\/KW>|<TY>.*?<\/TY>)/);
          return (
            <div key={i}>
              {segments.map((seg, j) => {
                if (seg.startsWith('<ANN>')) return <span key={j} style={{ color: "#c6a969" }}>{seg.replace(/<\/?ANN>/g, '')}</span>;
                if (seg.startsWith('<STR>')) return <span key={j} style={{ color: "#86efac" }}>{seg.replace(/<\/?STR>/g, '')}</span>;
                if (seg.startsWith('<KW>'))  return <span key={j} style={{ color: "#93c5fd" }}>{seg.replace(/<\/?KW>/g, '')}</span>;
                if (seg.startsWith('<TY>'))  return <span key={j} style={{ color: "#6ee7b7" }}>{seg.replace(/<\/?TY>/g, '')}</span>;
                return <span key={j} style={{ color: "var(--lux-code-text)" }}>{seg}</span>;
              })}
            </div>
          );
        })}
      </pre>
    </div>
  );
}

// ── Global search across all questions ───────────────────────────────────────
function GlobalSearch({ allQuestions, onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen]   = useState(false);
  const inputRef          = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return allQuestions
      .filter(x => x.question?.toLowerCase().includes(q) || x.simpleAnswer?.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query, allQuestions]);

  const handleSelect = (q) => {
    setQuery("");
    setOpen(false);
    onSelect(q, q.category);
  };

  return (
    <div className="relative max-w-xl mx-auto mb-10">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--lux-muted)] text-sm">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search across all questions…"
          className="w-full rounded-2xl border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] pl-10 pr-10 py-3 text-sm text-[color:var(--lux-text)] placeholder:text-[color:var(--lux-muted)] outline-none focus:border-[color:var(--lux-gold)] transition"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] text-xs"
          >✕</button>
        )}
      </div>

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <div className="absolute z-30 mt-2 w-full rounded-2xl border border-[color:var(--lux-border)] bg-[color:var(--lux-panel-strong)] shadow-[var(--lux-shadow-strong)] overflow-hidden">
          {results.map((q, i) => (
            <button
              key={getQuestionUid(q)}
              onMouseDown={() => handleSelect(q)}
              className={`w-full text-left px-4 py-3 flex items-start gap-3 transition hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_6%,transparent)] ${i > 0 ? "border-t border-[color:var(--lux-border)]" : ""}`}
            >
              <span className="shrink-0 mt-0.5 rounded-full border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] px-2 py-0.5 text-[10px] font-bold text-[color:var(--lux-gold)] whitespace-nowrap">
                {q.category}
              </span>
              <span className="text-sm text-[color:var(--lux-text)] leading-snug line-clamp-2">{q.question}</span>
            </button>
          ))}
          {query.trim().length >= 2 && results.length === 0 && (
            <p className="px-4 py-3 text-sm text-[color:var(--lux-muted)]">No questions found for "{query}"</p>
          )}
        </div>
      )}

      {query.trim().length >= 2 && results.length === 0 && !open && (
        <p className="mt-2 text-center text-xs text-[color:var(--lux-muted)]">No results for "{query}"</p>
      )}
    </div>
  );
}

const getQuestionUid = (question) => question?.uid || `${question?.category}-${question?.id}`;

const KnowledgeHub = () => {
  const { categories, questions } = portfolio.interviewHub;

  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTopic, setActiveTopic]       = useState(null);
  const [currentIndex, setCurrentIndex]     = useState(0);
  const [isRevealed, setIsRevealed]         = useState(false);
  const [activeFollowUp, setActiveFollowUp] = useState(null);
  const [searchQuery, setSearchQuery]       = useState("");
  const [focusedCardIdx, setFocusedCardIdx] = useState(0);
  const [bookmarks, setBookmarks]           = useState(() => {
    try { return JSON.parse(localStorage.getItem("kh_bookmarks") || "[]"); } catch { return []; }
  });
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [showAllBookmarks, setShowAllBookmarks]     = useState(false);
  const [seenIds, setSeenIds]   = useState(new Set());
  const [copied, setCopied]     = useState(false);

  // ── Global difficulty filter ───────────────────────────────────────────────
  const [difficultyFilter, setDifficultyFilter] = useState(() => {
    try { return parseInt(localStorage.getItem("kh_difficulty") || "3", 10); } catch { return 3; }
  });
  const setDifficulty = (level) => {
    setDifficultyFilter(level);
    localStorage.setItem("kh_difficulty", String(level));
    setCurrentIndex(0);
    setIsRevealed(false);
    setActiveFollowUp(null);
  };
  const [streak]                = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem("kh_streak") || "{}");
      const today = new Date().toDateString();
      if (s.lastDate === today) return s.count || 1;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const count = s.lastDate === yesterday ? (s.count || 0) + 1 : 1;
      localStorage.setItem("kh_streak", JSON.stringify({ lastDate: today, count }));
      return count;
    } catch { return 1; }
  });

  const topicsRef    = useRef(null);
  const flashcardRef = useRef(null);
  const searchRef    = useRef(null);
  const cardRefs     = useRef([]);

  // Persist bookmarks
  useEffect(() => { localStorage.setItem("kh_bookmarks", JSON.stringify(bookmarks)); }, [bookmarks]);

  // Prune stale UIDs once on mount (after allQuestions is ready)
  useEffect(() => {
    if (!allQuestions.length) return;
    const validUids = new Set(allQuestions.map(q => getQuestionUid(q)));
    setBookmarks(prev => {
      const pruned = prev.filter(uid => validUids.has(uid));
      return pruned.length === prev.length ? prev : pruned;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally run once on mount

  const toggleBookmark = (id) =>
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);

  const copyCard = (q) => {
    navigator.clipboard.writeText(`Q: ${q.question}\n\nA: ${q.simpleAnswer}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  // Navigation Handlers
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveTopic(null);
    setCurrentIndex(0);
    setIsRevealed(false);
    setActiveFollowUp(null);
    setSearchQuery("");
    setShowBookmarkedOnly(false);
    setSeenIds(new Set());
    setShowAllBookmarks(false);
    // Push a history entry so browser back closes the box instead of leaving the page
    history.pushState({ knowledgeHubCategory: category }, "");
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
    setActiveCategory(null);
    setActiveTopic(null);
    setCurrentIndex(0);
    setIsRevealed(false);
    setActiveFollowUp(null);
    setFocusedCardIdx(0);
    setShowAllBookmarks(false);
    document.getElementById("interview-prep")?.scrollIntoView({ behavior: "smooth" });
  };

  // Browser back button — close the open category instead of leaving the page
  useEffect(() => {
    const handlePopState = (e) => {
      if (activeCategory) {
        // There's an open category — close it and stay on the page
        setActiveCategory(null);
        setActiveTopic(null);
        setCurrentIndex(0);
        setIsRevealed(false);
        setActiveFollowUp(null);
        document.getElementById("interview-prep")?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeCategory]);

  // Listen for direct category selections from the Hero dropdown
  useEffect(() => {
    const handleCategorySelect = (e) => {
      const category = e.detail;
      if (!category) {
        // Plain Knowledge Hub link clicked — reset to main page
        setActiveCategory(null);
        setActiveTopic(null);
        setCurrentIndex(0);
        setIsRevealed(false);
        setActiveFollowUp(null);
        return;
      }
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

  // Reset when any #interview-prep anchor is clicked (e.g. Hero title link or Navbar)
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest("a");
      if (target && target.getAttribute("href") === "#interview-prep") {
        // Only reset if it's NOT a dropdown item (those dispatch knowledgeHubCategorySelect)
        if (!target.dataset.category) {
          setActiveCategory(null);
          setActiveTopic(null);
          setCurrentIndex(0);
          setIsRevealed(false);
          setActiveFollowUp(null);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  // Data Processing
  const allQuestions = useMemo(() => {
    const combined = questions.map((q) => ({ ...q, uid: getQuestionUid(q) }));
    coding?.questions?.forEach((q) => combined.push({ ...q, uid: getQuestionUid(q) }));
    return combined;
  }, [questions]);

  const categoryStats = useMemo(() => {
    const qaCategories = categories.filter(c => c !== "Coding Patterns");
    const learnerCategories = [...new Set(coding?.questions?.map(q => q.category) || [])];
    const allCategoryNames = [...qaCategories, ...learnerCategories];

    return allCategoryNames.map((cat) => ({
      name: cat,
      count: allQuestions.filter((q) => q.category === cat && (!q.difficulty || q.difficulty <= difficultyFilter)).length,
    }));
  }, [categories, allQuestions, difficultyFilter]);

  const topicsForCategory = useMemo(() => {
    if (!activeCategory) return [];
    const catQs = allQuestions.filter((q) => q.category === activeCategory && (!q.difficulty || q.difficulty <= difficultyFilter));
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
  }, [activeCategory, allQuestions, difficultyFilter]);

  const displayedQuestions = useMemo(() => {
    if (activeCategory) {
      let filtered = allQuestions.filter((q) => q.category === activeCategory);
      if (activeTopic && activeTopic !== "ALL") {
        filtered = filtered.filter((q) => (q.topic || "General Topics") === activeTopic);
      }
      // Apply global difficulty filter (cumulative: level N shows 1..N)
      filtered = filtered.filter((q) => !q.difficulty || q.difficulty <= difficultyFilter);
      if (showBookmarkedOnly) filtered = filtered.filter(q => bookmarks.includes(getQuestionUid(q)));
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(q2 =>
          q2.question.toLowerCase().includes(q) ||
          q2.simpleAnswer?.toLowerCase().includes(q)
        );
      }
      return filtered;
    }
    return [];
  }, [activeCategory, activeTopic, allQuestions, showBookmarkedOnly, bookmarks, searchQuery, difficultyFilter]);

  // Count bookmarks relevant to the current category + topic + difficulty (ignores search)
  const visibleBookmarkCount = useMemo(() => {
    if (!activeCategory) return 0;
    return allQuestions.filter(q =>
      q.category === activeCategory &&
      (!q.difficulty || q.difficulty <= difficultyFilter) &&
      (activeTopic && activeTopic !== "ALL" ? (q.topic || "General Topics") === activeTopic : true) &&
      bookmarks.includes(getQuestionUid(q))
    ).length;
  }, [activeCategory, activeTopic, allQuestions, difficultyFilter, bookmarks]);

  // All bookmarked questions across every category (for main-page bookmark view)
  const allBookmarkedQuestions = useMemo(() =>
    allQuestions.filter(q => bookmarks.includes(getQuestionUid(q))),
  [allQuestions, bookmarks]);

  // Flashcard Actions
  const goToIndex = (idx) => {
    setCurrentIndex(idx);
    setIsRevealed(false);
    setActiveFollowUp(null);
    scrollToFlashcard();
  };

  const handleNext = () => {
    setSeenIds(prev => new Set([...prev, getQuestionUid(displayedQuestions[currentIndex])]));
    goToIndex((currentIndex + 1) % displayedQuestions.length);
  };

  const handlePrev = () => {
    goToIndex((currentIndex - 1 + displayedQuestions.length) % displayedQuestions.length);
  };

  const handleRandom = () => {
    if (displayedQuestions.length <= 1) return;
    const currentQ = displayedQuestions[currentIndex];
    let randomIndex;
    do { randomIndex = Math.floor(Math.random() * displayedQuestions.length); }
    while (getQuestionUid(displayedQuestions[randomIndex]) === getQuestionUid(currentQ));
    goToIndex(randomIndex);
  };

  const activeQuestion = displayedQuestions[currentIndex];
  const seenCount = seenIds.size + (activeQuestion ? 1 : 0);

  // Scroll focused card into view when navigating with arrow keys
  useEffect(() => {
    if (activeCategory) return;
    cardRefs.current[focusedCardIdx]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [focusedCardIdx, activeCategory]);
  useEffect(() => {
    if (activeCategory) return;
    const allCards = [
      ...categoryStats.map(c => c.name),
      "Quick Quiz",
      "Lifecycle Flows",
    ];
    let cols = 2;
    if (window.innerWidth >= 1024) cols = 4;
    else if (window.innerWidth >= 640) cols = 3;
    const total = allCards.length;
    const handler = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") { e.preventDefault(); setFocusedCardIdx(i => (i + 1) % total); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); setFocusedCardIdx(i => (i - 1 + total) % total); }
      if (e.key === "ArrowDown")  { e.preventDefault(); setFocusedCardIdx(i => Math.min(i + cols, total - 1)); }
      if (e.key === "ArrowUp")    { e.preventDefault(); setFocusedCardIdx(i => Math.max(i - cols, 0)); }
      if (e.key === "Enter")      { handleCategoryClick(allCards[focusedCardIdx]); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeCategory, focusedCardIdx, categoryStats]);

  // Flashcard keyboard shortcuts
  useEffect(() => {
    if (!activeCategory || activeCategory === "Quick Quiz" || activeCategory === "Lifecycle Flows") return;
    const handler = (e) => {
      if (["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft")  handlePrev();
      if (e.key === " ") { e.preventDefault(); setIsRevealed(r => !r); }
      if (e.key === "b" || e.key === "B") { if (activeQuestion) toggleBookmark(getQuestionUid(activeQuestion)); }
      if (e.key === "f" || e.key === "F") { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === "Backspace") goBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeCategory, currentIndex, displayedQuestions, activeQuestion]);

  // Backspace → back to hub from any special view (Lifecycle Flows, Quick Quiz)
  useEffect(() => {
    if (activeCategory !== "Lifecycle Flows" && activeCategory !== "Quick Quiz") return;
    const handler = (e) => {
      if (["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)) return;
      if (e.key === "Backspace") goBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeCategory]);



  // Related questions (same topic, different question)
  const relatedQuestions = useMemo(() => {
    if (!activeQuestion) return [];
    return allQuestions
      .filter(q => q.category === activeQuestion.category &&
                   q.topic === activeQuestion.topic &&
                   getQuestionUid(q) !== getQuestionUid(activeQuestion))
      .slice(0, 3);
  }, [activeQuestion, allQuestions]);

  // ── Swipe gesture on flashcard (mobile) ───────────────────────────────────
  const swipeStartX = useRef(null);
  const handleTouchStart = (e) => { swipeStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (swipeStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) < 50) return; // ignore tiny swipes
    if (dx < 0) handleNext(); // swipe left → next
    else         handlePrev(); // swipe right → prev
  };

  return (
    <section id="interview-prep" className="scroll-mt-20 min-h-screen bg-surface py-10 px-4 sm:px-6 lg:px-8 font-body text-gray-300">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold theme-text mb-3">
            Knowledge <span className="text-accent-500">Hub</span>
          </h2>

          {/* ── Study Level selector ── */}
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--lux-muted)] mb-2">Select Study Level</p>
            <div className="inline-flex items-stretch gap-2">
              {[
                {
                  level: 1,
                  label: "Beginner",
                  icon: "🌱",
                  sub: "Definitions & basics",
                  color: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/40 text-emerald-400",
                  activeColor: "from-emerald-500/30 to-emerald-500/10 border-emerald-400 text-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.25)]",
                },
                {
                  level: 2,
                  label: "Intermediate",
                  icon: "⚡",
                  sub: "How things work",
                  color: "from-amber-500/20 to-amber-500/5 border-amber-500/40 text-amber-400",
                  activeColor: "from-amber-500/30 to-amber-500/10 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.25)]",
                },
                {
                  level: 3,
                  label: "Advanced",
                  icon: "🔥",
                  sub: "Edge cases & gotchas",
                  color: "from-rose-500/20 to-rose-500/5 border-rose-500/40 text-rose-400",
                  activeColor: "from-rose-500/30 to-rose-500/10 border-rose-400 text-rose-300 shadow-[0_0_12px_rgba(251,113,133,0.25)]",
                },
              ].map(({ level, label, icon, sub, color, activeColor }) => {
                const isActive = difficultyFilter === level;
                return (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`relative flex flex-col items-center gap-0.5 rounded-xl border bg-gradient-to-b px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5 ${
                      isActive ? activeColor : `${color} opacity-60 hover:opacity-90`
                    }`}
                  >
                    <span className="text-base leading-none">{icon}</span>
                    <span className="text-xs font-bold leading-tight">{label}</span>
                    <span className="hidden sm:block text-[9px] opacity-70 leading-tight whitespace-nowrap">{sub}</span>
                    {isActive && (
                      <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-current opacity-80" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Streak */}
          {streak > 1 && (
            <div className="inline-flex items-center gap-1.5">
              <span className="text-xs font-semibold text-[color:var(--lux-gold)]">🔥 {streak} day streak</span>
            </div>
          )}
        </div>

        {/* ── LEVEL 1: Category Grid ── */}
        {!activeCategory && !showAllBookmarks && (
          <>
            {/* Global search */}
            <GlobalSearch allQuestions={allQuestions} onSelect={(q, cat) => {
              handleCategoryClick(cat);
              // after state settles, jump to the question index
              setTimeout(() => {
                const idx = allQuestions.filter(x => x.category === cat).findIndex(x => getQuestionUid(x) === getQuestionUid(q));
                if (idx >= 0) goToIndex(idx);
              }, 50);
            }} />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              ...categoryStats.map(cat => ({ ...cat, isSpecial: false })),
              { name: "Quick Quiz",       count: null, sub: "MCQ + One Word",              icon: "⚡", isSpecial: true },
              { name: "Lifecycle Flows",  count: null, sub: "6 Visual Step-by-Step Flows", icon: "🗺️", isSpecial: true },
            ].map((cat, idx) => {
              const icons = {
                "Java": "☕", "Spring Boot": "🍃", "REST APIs": "🔗",
                "Kafka": "📨", "Microservices": "🧩", "System Design": "🏗️",
                "Coding Patterns": "💡", "SQL": "🗄️", "Infra & Cloud": "☁️",
                "Quick Quiz": "⚡", "Lifecycle Flows": "🗺️",
              };
              const icon = icons[cat.name] || "📚";
              const isFocused = focusedCardIdx === idx;
              return (
                <div
                  key={cat.name}
                  ref={el => cardRefs.current[idx] = el}
                  onClick={() => { setFocusedCardIdx(idx); handleCategoryClick(cat.name); }}
                  onMouseEnter={() => setFocusedCardIdx(idx)}
                  className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-panel p-4 flex flex-col justify-between gap-3 hover:border-[color:var(--lux-gold)] hover:shadow-glow transition-all duration-300 hover:-translate-y-1 ${
                    isFocused
                      ? "border-[color:var(--lux-gold)] shadow-glow -translate-y-1"
                      : "border-[color:var(--lux-border)]"
                  }`}
                >
                  <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[color:var(--lux-gold)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-10" />
                  <div className="flex items-start justify-between gap-2">
                    <motion.span
                      className="text-2xl leading-none inline-block"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, -6, 6, 0], transition: { duration: 0.4 } }}
                    >{icon}</motion.span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[color:var(--lux-muted)] opacity-60 mt-0.5">
                      {cat.isSpecial ? "Special" : "Q&A"}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-display text-sm sm:text-base font-bold transition-colors leading-tight mb-0.5 truncate ${cat.isSpecial ? "text-[color:var(--lux-gold)]" : "theme-text group-hover:text-[color:var(--lux-gold)]"}`}>
                      {cat.name}
                    </h3>
                    <span className="text-[10px] text-[color:var(--lux-muted)] line-clamp-1">
                      {cat.isSpecial ? cat.sub : `${cat.count} questions`}
                    </span>
                    {cat.isSpecial && (
                      <p className="text-[10px] font-semibold text-[color:var(--lux-gold)] mt-2">Open →</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs theme-muted mt-6 opacity-40">Arrow keys to navigate · Enter to open</p>

            {/* ── All Bookmarks shortcut ── */}
            {bookmarks.length > 0 && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setShowAllBookmarks(true)}
                  className="flex items-center gap-2 rounded-full border border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_8%,transparent)] px-5 py-2 text-xs font-semibold text-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_16%,transparent)] transition-all"
                >
                  ★ All Bookmarks ({bookmarks.length})
                </button>
              </div>
            )}
          </>
        )}

        {/* ── All Bookmarks View ── */}
        {!activeCategory && showAllBookmarks && (
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setShowAllBookmarks(false)}
                className="flex items-center justify-center h-9 w-9 rounded-full border border-[color:var(--lux-border)] bg-panel text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)] transition-colors"
                aria-label="Back to categories"
              >←</button>
              <h3 className="font-display text-lg font-bold theme-text">
                ★ Bookmarks <span className="text-[color:var(--lux-muted)] text-sm font-normal">({allBookmarkedQuestions.length})</span>
              </h3>
            </div>

            {allBookmarkedQuestions.length === 0 ? (
              <p className="text-center text-sm text-[color:var(--lux-muted)] py-16">No bookmarks yet. Press <kbd className="px-1.5 py-0.5 rounded border border-[color:var(--lux-border)] text-xs">B</kbd> on any flashcard to bookmark it.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {allBookmarkedQuestions.map((q) => {
                  const uid = getQuestionUid(q);
                  return (
                    <div key={uid} className="rounded-xl border border-[color:var(--lux-border)] bg-panel p-4 hover:border-[color:var(--lux-gold)] transition-colors">
                      {/* Category + topic badge */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-[color:var(--lux-border)] text-[color:var(--lux-muted)]">
                            {q.category}
                          </span>
                          {q.topic && (
                            <span className="text-[10px] text-[color:var(--lux-muted)] opacity-60">{q.topic}</span>
                          )}
                        </div>
                        <button
                          onClick={() => toggleBookmark(uid)}
                          title="Remove bookmark"
                          className="text-[color:var(--lux-gold)] hover:opacity-60 transition text-sm leading-none"
                        >★</button>
                      </div>
                      {/* Question */}
                      <p className="text-sm font-semibold theme-text mb-2 leading-snug">{q.question}</p>
                      {/* Answer */}
                      {q.simpleAnswer && (
                        <p className="text-xs text-[color:var(--lux-muted)] leading-relaxed line-clamp-3">{q.simpleAnswer}</p>
                      )}
                      {/* Jump to category */}
                      <button
                        onClick={() => handleCategoryClick(q.category)}
                        className="mt-3 text-[10px] font-semibold text-[color:var(--lux-gold)] hover:underline transition"
                      >
                        Open in {q.category} →
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* LEVEL 2: Content Rendering */}
        {activeCategory === "Quick Quiz" && (
          <QuizSection onBack={goBack} difficultyFilter={difficultyFilter} />
        )}

        {activeCategory === "Lifecycle Flows" && (
          <LifecycleFlowsHub onBack={goBack} />
        )}

        {activeCategory && activeCategory !== "Quick Quiz" && activeCategory !== "Lifecycle Flows" && (
          <div className="max-w-5xl mx-auto">
            
            {/* Back Button */}
            <button
              onClick={goBack}
              className="mb-8 flex items-center justify-center h-9 w-9 rounded-full border border-[color:var(--lux-border)] bg-panel text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)] transition-colors"
              aria-label="Back to categories"
            >
              ←
            </button>

            {/* ── Toolbar: row 1 — topic + search ── */}
            <div className="mb-3 flex flex-wrap items-center gap-3">
              {/* Topic dropdown */}
              {topicsForCategory.length > 0 && (
                <div ref={topicsRef} className="flex items-center gap-2 scroll-mt-32">
                  <select
                    value={activeTopic ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "ALL") handleAllTopicsClick();
                      else handleTopicClick(val);
                      e.target.blur();
                    }}
                    className="rounded-full border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] px-4 py-2 text-xs font-semibold text-[color:var(--lux-text)] outline-none cursor-pointer transition hover:border-[color:var(--lux-gold)] focus:border-[color:var(--lux-gold)]"
                  >
                    <option value="ALL">All · {allQuestions.filter(q => q.category === activeCategory && (!q.difficulty || q.difficulty <= difficultyFilter)).length}</option>
                    {topicsForCategory.map((topic) => (
                      <option key={topic.name} value={topic.name}>{topic.name} · {topic.count}</option>
                    ))}
                  </select>
                  {activeTopic && activeTopic !== "ALL" && (
                    <button onClick={handleAllTopicsClick} className="text-xs text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition">✕</button>
                  )}
                </div>
              )}

              {/* Search */}
              <div className="relative flex-1 min-w-[160px] max-w-xs">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setCurrentIndex(0); }}
                  placeholder="Search… (F)"
                  className="w-full rounded-full border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] pl-8 pr-7 py-2 text-xs text-[color:var(--lux-text)] placeholder:text-[color:var(--lux-muted)] outline-none focus:border-[color:var(--lux-gold)] transition"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--lux-muted)] text-xs pointer-events-none">🔍</span>
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] text-xs">✕</button>
                )}
              </div>
            </div>

            {/* ── Toolbar: row 2 — bookmarks + progress + streak + kbd hints ── */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              {/* Bookmark filter */}
              <button
                onClick={() => { setShowBookmarkedOnly(p => !p); setCurrentIndex(0); }}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  showBookmarkedOnly
                    ? "border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_12%,transparent)] text-[color:var(--lux-gold)]"
                    : "border-[color:var(--lux-border)] bg-panel text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)]"
                }`}
              >
                {showBookmarkedOnly ? "★" : "☆"} {visibleBookmarkCount > 0 ? `Bookmarks (${visibleBookmarkCount})` : "Bookmarks"}
              </button>

              {/* Progress */}
              <span className="text-xs text-[color:var(--lux-muted)]">👁 {seenCount} / {displayedQuestions.length}</span>

              {/* Keyboard hints — desktop only, pushed right */}
              <div className="ml-auto hidden sm:flex items-center gap-2">
                {[
                  { key: "Space", label: "Reveal" },
                  { key: "← →",  label: "Navigate" },
                  { key: "B",     label: "Bookmark" },
                  { key: "F",     label: "Search" },
                ].map(({ key, label }) => (
                  <span key={key} className="inline-flex items-center gap-1 rounded-md border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] px-2 py-1 text-[10px] text-[color:var(--lux-muted)]">
                    <kbd className="rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border-strong)] px-1 py-0.5 font-mono text-[10px] text-[color:var(--lux-text)]">{key}</kbd>
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Flashcard UI */}
            <div ref={flashcardRef} className="mt-6 scroll-mt-32">
              {!activeQuestion ? (
                <div className="text-center py-12 theme-muted bg-panel rounded-xl border border-[color:var(--lux-border)]">
                  No questions found.
                </div>
              ) : (
                <div
                  className="glass-panel relative flex flex-col overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >

                  {/* ── Progress bar ── */}
                  <div className="h-1 w-full bg-[color:var(--lux-border)] rounded-t-2xl overflow-hidden">
                    <motion.div
                      className="h-full bg-[color:var(--lux-gold)] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentIndex + 1) / displayedQuestions.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <div className="p-6 sm:p-10">
                    {/* ── Card header ── */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={scrollToTopics}
                          className="flex items-center gap-1.5 rounded-full bg-[color:var(--lux-panel-strong)] px-3 py-1.5 text-xs font-semibold text-[color:var(--lux-muted)] transition hover:text-[color:var(--lux-gold)] hover:bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)]"
                        >
                          <ArrowUp size={13} /> Topics
                        </button>
                        <span className="lux-chip-soft flex items-center gap-1.5 text-xs truncate max-w-[200px] sm:max-w-none">
                          <Brain size={12} className="text-[color:var(--lux-gold)] shrink-0" />
                          {activeQuestion.category}{activeQuestion.topic ? ` · ${activeQuestion.topic}` : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Bookmark */}
                        <button
                          onClick={() => toggleBookmark(getQuestionUid(activeQuestion))}
                          title="Bookmark (B)"
                          className={`rounded-full px-2.5 py-1.5 text-sm transition border ${
                            bookmarks.includes(getQuestionUid(activeQuestion))
                              ? "border-[color:var(--lux-gold)] text-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)]"
                              : "border-[color:var(--lux-border)] text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)]"
                          }`}
                        >
                          {bookmarks.includes(getQuestionUid(activeQuestion)) ? "★" : "☆"}
                        </button>
                        {/* Copy */}
                        <button
                          onClick={() => copyCard(activeQuestion)}
                          title="Copy Q&A"
                          className="rounded-full border border-[color:var(--lux-border)] px-2.5 py-1.5 text-xs text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)] transition"
                        >
                          {copied ? "✓ Copied" : "⎘ Copy"}
                        </button>
                        <span className="text-xs font-semibold tabular-nums text-[color:var(--lux-muted)]">
                          {currentIndex + 1} <span className="opacity-40">/</span> {displayedQuestions.length}
                        </span>
                      </div>
                    </div>

                    {/* ── Question ── */}
                    <motion.h3
                      key={getQuestionUid(activeQuestion)}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-xl font-bold leading-snug theme-text sm:text-2xl lg:text-3xl lg:max-w-4xl"
                    >
                      {activeQuestion.question}
                    </motion.h3>

                    {activeQuestion.difficulty && (
                      <div className="mt-4">
                        <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                          activeQuestion.difficulty === "Core"
                            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                            : activeQuestion.difficulty === "Stretch"
                            ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                            : "border-sky-500/40 bg-sky-500/10 text-sky-300"
                        }`}>
                          <Tag size={11} />
                          {activeQuestion.difficulty}
                        </span>
                      </div>
                    )}

                    <AnimatePresence mode="wait">
                      {!isRevealed ? (
                        <motion.div
                          key="hidden"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="mt-10 flex flex-wrap items-center gap-3"
                        >
                          <button
                            onClick={() => setIsRevealed(true)}
                            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-6 py-3 text-sm font-bold text-[#16110c] shadow-glow transition hover:brightness-105 hover:-translate-y-0.5"
                          >
                            <Lightbulb size={15} /> Reveal Answer
                          </button>
                          <span className="text-xs text-[color:var(--lux-muted)] opacity-60">Think about it first 🤔</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="revealed"
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35 }}
                          className="mt-7 space-y-5 min-w-0 overflow-hidden"
                        >
                          {/* Simple Answer — hero block */}
                          <div className="rounded-2xl border border-[color:var(--lux-gold)]/25 bg-[color:color-mix(in_srgb,var(--lux-gold)_5%,transparent)] p-5">
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-gold)] mb-2">✦ Simple Answer</p>
                            <p className="text-base sm:text-lg leading-relaxed font-medium theme-text break-words">{activeQuestion.simpleAnswer}</p>
                            {/* VS quick-glance badges */}
                            {/\bvs\.?\b/i.test(activeQuestion.question) && (() => {
                              const vsMatch = activeQuestion.question.match(/^(.+?)\s+vs\.?\s+(.+?)(?:\s+vs\.?\s+(.+?))?(?:\s*[—–?-].*)?$/i);
                              if (!vsMatch) return null;
                              const sides = [vsMatch[1], vsMatch[2], vsMatch[3]].filter(Boolean).map(s => s.trim().replace(/[?—–].*$/, "").trim());
                              const dotColors = ["bg-sky-400", "bg-amber-400", "bg-emerald-400"];
                              const textColors = ["text-sky-300", "text-amber-300", "text-emerald-300"];
                              const borderColors = ["border-sky-500/40 bg-sky-500/10", "border-amber-500/40 bg-amber-500/10", "border-emerald-500/40 bg-emerald-500/10"];
                              return (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {sides.map((s, i) => (
                                    <span key={s} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${borderColors[i % 3]} ${textColors[i % 3]}`}>
                                      <span className={`h-2 w-2 rounded-full ${dotColors[i % 3]}`} />
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>

                          {/* Explanation + Analogy + Example */}
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="lux-subpanel min-w-0">
                              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-muted)] mb-3">
                                <Lightbulb size={13} /> Explanation
                              </p>
                              {/* Split explanation into sentences — first sentence gets emphasis */}
                              {(() => {
                                const text = activeQuestion.explanation || "";
                                const firstDot = text.search(/[.!?]\s/);
                                const first = firstDot > 0 ? text.slice(0, firstDot + 1) : text;
                                const rest  = firstDot > 0 ? text.slice(firstDot + 1).trim() : "";
                                return (
                                  <div className="text-sm leading-relaxed break-words whitespace-pre-wrap space-y-2">
                                    <p className="text-[color:var(--lux-text)] font-medium">{first}</p>
                                    {rest && <p className="theme-muted">{rest}</p>}
                                  </div>
                                );
                              })()}
                            </div>
                            <div className="lux-subpanel flex flex-col min-w-0 overflow-hidden">
                              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-muted)] mb-3 shrink-0">
                                <Target size={13} /> Real-world Example
                              </p>
                              {/* Smart renderer: use CodeBlock only if example looks like code */}
                              {(() => {
                                const ex = activeQuestion.example || "";
                                const looksLikeCode = /[{};@\n]|\/\/|=>|->|\bpublic\b|\bprivate\b|\bclass\b|\bimport\b|\bHTTP\s\d/.test(ex);
                                return looksLikeCode
                                  ? <CodeBlock code={ex} />
                                  : <p className="text-sm leading-relaxed theme-muted break-words">{ex}</p>;
                              })()}
                            </div>
                          </div>

                          {/* Analogy block — only shown when present */}
                          {activeQuestion.analogy && (
                            <div className="rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-500/8 to-purple-500/3 p-5">
                              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-purple-400 mb-3">
                                <span>💡</span> Think of it like this
                              </p>
                              <p className="text-sm leading-relaxed text-[color:var(--lux-text)] italic">
                                {activeQuestion.analogy}
                              </p>
                            </div>
                          )}

                          {/* Follow-ups + Key Points */}
                          <div className={`grid gap-4 ${
                            activeQuestion.followUps?.length > 0 && activeQuestion.keyPoints?.length > 0 && /\bvs\.?\b/i.test(activeQuestion.question)
                              ? "grid-cols-1"
                              : "md:grid-cols-[1.2fr_0.8fr]"
                          }`}>
                            {activeQuestion.followUps?.length > 0 && (
                              <div className="lux-subpanel">
                                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-muted)] mb-3">
                                  <AlertCircle size={13} /> Common Follow-ups
                                </p>
                                <ul className="space-y-2">
                                  {activeQuestion.followUps.map((fu, idx) => (
                                    <li key={idx}>
                                      <button
                                        onClick={() => setActiveFollowUp(activeFollowUp === idx ? null : idx)}
                                        className="flex items-start gap-2 text-left text-sm leading-relaxed theme-muted transition hover:text-[color:var(--lux-gold)] w-full"
                                      >
                                        <span className="mt-0.5 shrink-0 text-[color:var(--lux-gold)]">
                                          {activeFollowUp === idx ? "▾" : "▸"}
                                        </span>
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
                                            <div className="ml-5 mt-2 rounded-xl border border-[color:var(--lux-border)] bg-[color:var(--lux-panel-strong)] p-3 text-sm theme-text">
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

                            {activeQuestion.keyPoints?.length > 0 && (
                              <div className="lux-subpanel">
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-muted)] mb-3">
                                  🔑 Key Points
                                </p>
                                {/* VS comparison table — shown when question is a VS question */}
                                {(() => {
                                  const isVs = /\bvs\.?\b/i.test(activeQuestion.question);
                                  if (isVs) {
                                    const parsed = parseVsComparison(
                                      activeQuestion.question,
                                      activeQuestion.explanation,
                                      activeQuestion.keyPoints
                                    );
                                    if (parsed) {
                                      return (
                                        <VsComparisonTable
                                          question={activeQuestion.question}
                                          explanation={activeQuestion.explanation}
                                          keyPoints={activeQuestion.keyPoints}
                                        />
                                      );
                                    }
                                  }
                                  // Fallback: bullet list
                                  return (
                                    <ul className="space-y-2">
                                      {activeQuestion.keyPoints.map((kp, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed theme-muted">
                                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--lux-gold)]" />
                                          {kp}
                                        </li>
                                      ))}
                                    </ul>
                                  );
                                })()}
                              </div>
                            )}
                          </div>

                          {/* ── Self-rating row removed ── */}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* ── Footer actions ── */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[color:var(--lux-border)] pt-5">
                      <button
                        onClick={handlePrev}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-4 py-2.5 text-sm font-semibold theme-text transition hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)]"
                      >
                        ← Prev
                      </button>
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 rounded-full bg-[color:var(--lux-gold)] px-5 py-2.5 text-sm font-semibold text-[#16110c] shadow-glow transition hover:-translate-y-0.5 hover:brightness-105"
                      >
                        Next <ChevronRight size={15} />
                      </button>
                      <button
                        onClick={handleRandom}
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--lux-border-strong)] bg-transparent px-4 py-2.5 text-sm font-semibold theme-text transition hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)]"
                      >
                        <Shuffle size={14} /> Random
                      </button>
                      {isRevealed && (
                        <button
                          onClick={() => { setIsRevealed(false); setActiveFollowUp(null); }}
                          className="ml-auto text-xs text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition"
                        >
                          ↺ Hide answer
                        </button>
                      )}
                    </div>
                    {/* Swipe hint — mobile only */}
                    <p className="mt-3 text-center text-[10px] text-[color:var(--lux-muted)] opacity-40 sm:hidden">
                      ← swipe to navigate →
                    </p>

                    {/* ── Related questions ── */}
                    {isRevealed && relatedQuestions.length > 0 && (
                      <div className="mt-4 border-t border-[color:var(--lux-border)] pt-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-muted)] mb-3">
                          Related in this topic
                        </p>
                        <div className="flex flex-col gap-2">
                          {relatedQuestions.map((rq, i) => (
                            <button
                                key={getQuestionUid(rq)}
                                onClick={() => goToIndex(displayedQuestions.findIndex(q => getQuestionUid(q) === getQuestionUid(rq)))}
                              className="text-left text-xs text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition flex items-start gap-2"
                            >
                              <span className="shrink-0 text-[color:var(--lux-gold)] opacity-60">→</span>
                              {rq.question}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
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

export default KnowledgeHub;
