import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Shuffle, Lightbulb, Target, AlertCircle, ArrowUp, Smartphone, Shield, Server, Lock, Zap, Briefcase, Radio, Database, HardDrive, ArrowLeftRight, Plus, Minus, ArrowDown, Webhook, FileCheck, Activity, ChevronDown, ChevronUp, Tag } from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { coding } from "../data/coding.js";
import QuizSection from "./QuizSection.jsx";
import LifecycleDiagram from "./LifecycleDiagram.jsx";

const apiFlowSteps = [
  { id: 1, title: "1. Client Request", icon: Smartphone, desc: "User triggers an action. A REST HTTP request is dispatched over the network, establishing a TCP/TLS connection and transmitting a JSON payload with necessary HTTP headers.", example: "POST /api/orders\n{\n  \"itemId\": 123\n}" },
  { id: 2, title: "2. API Gateway & WAF", icon: Shield, desc: "Intercepts the request at the network edge. It performs SSL termination, enforces rate-limiting, applies WAF security rules against common exploits, and routes traffic internally.", example: "AWS API Gateway blocks the request if the user exceeds 100 requests/minute." },
  { id: 3, title: "3. Load Balancer", icon: Server, desc: "Distributes incoming traffic across healthy microservice instances using algorithms like Round Robin, utilizing continuous health checks to avoid routing to failing nodes.", example: "AWS ALB routes your request to Server B because Server A currently has high CPU usage." },
  { id: 4, title: "4. Auth & Security", icon: Lock, desc: "The request hits the Spring Security Filter Chain. The JWT token is intercepted, parsed, and cryptographically verified. Authorities are extracted into the SecurityContextHolder.", example: "Extracts 'Authorization: Bearer eyJhb...' and verifies the user has the 'ROLE_USER' authority." },
  { id: 5, title: "5. Controller", icon: Webhook, desc: "The DispatcherServlet maps the URL to a specific @RestController. Spring's HttpMessageConverter (Jackson) automatically deserializes the JSON payload into a Java DTO.", example: "@PostMapping(\"/orders\")\npublic ResponseEntity<Order> createOrder(@RequestBody OrderDTO dto) { ... }" },
  { id: 6, title: "6. Validation", icon: FileCheck, desc: "JSR-380 Bean Validation kicks in. If the DTO violates constraints, a MethodArgumentNotValidException is thrown, instantly returning a 400 Bad Request before wasting deeper resources.", example: "@NotNull on 'itemId' throws an exception immediately if the field is missing." },
  { id: 7, title: "7. Service Layer", icon: Briefcase, desc: "The core business logic executes inside a @Service component. A database transaction is started via @Transactional, ensuring all data mutations succeed or fail together as a single atomic unit.", example: "Calculates final price, applies discounts, and prepares the order object." },
  { id: 8, title: "8. Logging & Monitoring", icon: Activity, desc: "Trace IDs and Correlation IDs are added to the Mapped Diagnostic Context (MDC) for distributed tracing (ELK stack), while Actuator metrics track request latency.", example: "log.info(\"Processing order for user: {}\", userId);\nMetrics.counter(\"orders.created\").increment();" },
  { id: 9, title: "9. Cache", icon: Zap, desc: "Before querying the primary database, the service checks an in-memory cache (like Redis). A cache hit returns data instantly, drastically reducing database load.", example: "Checks Redis cache for product availability before querying the primary database." },
  { id: 10, title: "10. Kafka / Event Bus", icon: Radio, desc: "To keep the HTTP response fast, heavy secondary tasks (like sending emails or updating analytics) are pushed to an asynchronous message broker as fire-and-forget events.", example: "kafkaTemplate.send(\"order-events\", new OrderPlacedEvent(orderId));" },
  { id: 11, title: "11. Repository Layer", icon: Database, desc: "Spring Data JPA abstracts the database interaction. The EntityManager manages the entity lifecycle, converting Java method calls into optimized SQL queries utilizing a HikariCP connection pool.", example: "orderRepository.save(order);\n// translates to 'INSERT INTO orders ...'" },
  { id: 12, title: "12. Database Commit", icon: HardDrive, desc: "The database successfully writes data to disk. The ACID transaction commits, releasing row-level locks. If an unchecked exception occurred earlier, a rollback is triggered instead.", example: "PostgreSQL permanently writes the new order record to the disk." },
  { id: 13, title: "13. HTTP Response", icon: ArrowLeftRight, desc: "The backend constructs a Response DTO, serializes it back into JSON, and attaches the appropriate HTTP status code. The payload traverses back through the network layers to the client.", example: "HTTP 201 Created\n{\n  \"orderId\": 456,\n  \"status\": \"SUCCESS\"\n}" }
];

const RestApiFlow = ({ goBack }) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-3xl mx-auto w-full pb-8 px-4 sm:px-6">
      <button
        onClick={goBack}
        className="mb-8 flex items-center gap-2 text-sm font-semibold text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition-colors bg-panel px-4 py-2 rounded-full border border-[color:var(--lux-border)] hover:border-[color:var(--lux-gold)] w-max"
      >
        ← All Categories
      </button>

      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">REST API Lifecycle</h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">
          A top-to-bottom architectural flow of an HTTP request. Click on any step to expand and see practical examples.
        </p>
      </div>

      <div className="relative flex flex-col items-center">
        {apiFlowSteps.map((step, idx) => (
          <React.Fragment key={step.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.1, 0.4) }}
              className="w-full"
            >
              <div
                onClick={() => toggleExpand(step.id)}
                className={`glass-panel cursor-pointer border transition-all duration-300 relative z-10 flex flex-col overflow-hidden ${
                  expandedId === step.id ? "border-accent-500 shadow-glow" : "border-[color:var(--lux-border)] hover:border-[color:var(--lux-border-strong)] hover:-translate-y-1"
                }`}
              >
                {/* Collapsed Header */}
                <div className="p-4 sm:p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] text-accent-400 flex items-center justify-center shrink-0">
                      <step.icon size={24} className="sm:w-6 sm:h-6" />
                    </div>
                    <h4 className="text-base sm:text-lg font-display font-bold theme-text">{step.title}</h4>
                  </div>
                  <div className={`shrink-0 transition-transform duration-300 ${expandedId === step.id ? 'text-accent-400 rotate-180' : 'text-gray-500'}`}>
                    {expandedId === step.id ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedId === step.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-[color:var(--lux-border)] mt-2">
                        <p className="text-sm text-gray-300 leading-relaxed mb-4">
                          {step.desc}
                        </p>
                        {step.example && (
                          <div className="bg-ink/60 p-4 rounded-lg border border-[color:var(--lux-border)]">
                            <span className="text-xs font-bold text-accent-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                              <Lightbulb size={12} /> Example
                            </span>
                            <code className="text-sm theme-muted font-mono whitespace-pre-wrap">{step.example}</code>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Vertical Arrow Connector */}
            {idx < apiFlowSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center py-1 z-0"
              >
                <div className="w-0.5 h-8 bg-gradient-to-b from-gray-700 to-accent-500/50 rounded-full"></div>
                <ArrowDown size={18} className="text-accent-500/80 -mt-1.5" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

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
              key={q.id}
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
  const [seenIds, setSeenIds]   = useState(new Set());
  const [copied, setCopied]     = useState(false);
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

  // ── Last visited memory (opt-in) ──────────────────────────────────────────
  const [rememberEnabled, setRememberEnabled] = useState(() => {
    try { return localStorage.getItem("kh_remember") === "true"; } catch { return false; }
  });

  // Restore last visited on mount if enabled
  useEffect(() => {
    if (!rememberEnabled) return;
    try {
      const saved = JSON.parse(localStorage.getItem("kh_last") || "{}");
      if (saved.category) {
        setActiveCategory(saved.category);
        if (saved.topic) setActiveTopic(saved.topic);
        if (saved.index) setCurrentIndex(saved.index);
      }
    } catch {}
  }, []); // eslint-disable-line

  // Save current position whenever it changes
  useEffect(() => {
    if (!rememberEnabled || !activeCategory) return;
    try {
      localStorage.setItem("kh_last", JSON.stringify({
        category: activeCategory,
        topic: activeTopic,
        index: currentIndex,
      }));
    } catch {}
  }, [rememberEnabled, activeCategory, activeTopic, currentIndex]);

  const toggleRemember = () => {
    const next = !rememberEnabled;
    setRememberEnabled(next);
    localStorage.setItem("kh_remember", String(next));
    if (!next) {
      localStorage.removeItem("kh_last");
    }
  };

  const topicsRef    = useRef(null);
  const flashcardRef = useRef(null);
  const searchRef    = useRef(null);
  const cardRefs     = useRef([]);

  // Persist bookmarks
  useEffect(() => { localStorage.setItem("kh_bookmarks", JSON.stringify(bookmarks)); }, [bookmarks]);

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
    const combined = [...questions];
    let fallbackId = 1000;
    
    coding?.questions?.forEach((q) => combined.push(q));
    return combined;
  }, [questions]);

  const categoryStats = useMemo(() => {
    const qaCategories = categories.filter(c => c !== "Coding Patterns");
    const learnerCategories = [...new Set(coding?.questions?.map(q => q.category) || [])];
    const allCategoryNames = [...qaCategories, ...learnerCategories];

    return allCategoryNames.map((cat) => ({
      name: cat,
      count: allQuestions.filter((q) => q.category === cat).length,
    }));
  }, [categories, allQuestions]);

  const topicsForCategory = useMemo(() => {
    if (!activeCategory) return [];
    const catQs = allQuestions.filter((q) => q.category === activeCategory);
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
  }, [activeCategory, allQuestions]);

  const displayedQuestions = useMemo(() => {
    if (activeCategory) {
      let filtered = allQuestions.filter((q) => q.category === activeCategory);
      if (activeTopic && activeTopic !== "ALL") {
        filtered = filtered.filter((q) => (q.topic || "General Topics") === activeTopic);
      }
      if (showBookmarkedOnly) filtered = filtered.filter(q => bookmarks.includes(q.id));
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
  }, [activeCategory, activeTopic, allQuestions, showBookmarkedOnly, bookmarks, searchQuery]);

  // Flashcard Actions
  const goToIndex = (idx) => {
    setCurrentIndex(idx);
    setIsRevealed(false);
    setActiveFollowUp(null);
    scrollToFlashcard();
  };

  const handleNext = () => {
    setSeenIds(prev => new Set([...prev, displayedQuestions[currentIndex]?.id]));
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
    while (displayedQuestions[randomIndex].id === currentQ?.id);
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
    const cols = window.innerWidth >= 768 ? 3 : 2;
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
    if (!activeCategory || activeCategory === "Quick Quiz" || activeCategory === "Application Flow") return;
    const handler = (e) => {
      if (["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft")  handlePrev();
      if (e.key === " ") { e.preventDefault(); setIsRevealed(r => !r); }
      if (e.key === "b" || e.key === "B") { if (activeQuestion) toggleBookmark(activeQuestion.id); }
      if (e.key === "f" || e.key === "F") { e.preventDefault(); searchRef.current?.focus(); }
      if (e.key === "Backspace") goBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeCategory, currentIndex, displayedQuestions, activeQuestion]);

  // Backspace for special views (Lifecycle Flows)
  useEffect(() => {
    if (activeCategory !== "Lifecycle Flows") return;
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
                   q.id !== activeQuestion.id)
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--lux-gold)] mb-5">
            ✦ Interview Preparation
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold theme-text mb-4">
            Knowledge <span className="text-accent-500">Hub</span>
          </h2>
          <p className="theme-muted text-sm max-w-xl mx-auto leading-relaxed">
            Flashcards, quizzes, and architecture flows — everything you need to ace your next backend interview.
          </p>
          {/* Remember toggle + streak */}
          <div className="mt-4 inline-flex items-center gap-3">
            <button
              onClick={toggleRemember}
              title={rememberEnabled ? "Session saved — click to turn off and clear" : "Save your current position"}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                rememberEnabled
                  ? "border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_12%,transparent)] text-[color:var(--lux-gold)]"
                  : "border-[color:var(--lux-border)] bg-panel text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)]"
              }`}
            >
              <span>{rememberEnabled ? "🔖" : "📌"}</span>
              {rememberEnabled ? "Session Saved" : "Save Session"}
            </button>
            {streak > 1 && (
              <span className="text-xs font-semibold text-[color:var(--lux-gold)]">🔥 {streak} day streak</span>
            )}
          </div>
        </div>

        {/* ── LEVEL 1: Category Grid ── */}
        {!activeCategory && (
          <>
            {/* Global search */}
            <GlobalSearch allQuestions={allQuestions} onSelect={(q, cat) => {
              handleCategoryClick(cat);
              // after state settles, jump to the question index
              setTimeout(() => {
                const idx = allQuestions.filter(x => x.category === cat).findIndex(x => x.id === q.id);
                if (idx >= 0) goToIndex(idx);
              }, 50);
            }} />

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              ...categoryStats.map(cat => ({ ...cat, isSpecial: false })),
              { name: "Quick Quiz",       count: null, sub: "MCQ + One Word",            icon: "⚡", isSpecial: true },
              { name: "Lifecycle Flows",  count: null, sub: "6 Visual Step-by-Step Flows", icon: "🔄", isSpecial: true },
            ].map((cat, idx) => {
              const icons = {
                "Java": "☕", "Spring Boot": "🍃", "REST APIs": "🔗",
                "Kafka": "📨", "Microservices": "🧩", "System Design": "🏗️",
                "Coding Patterns": "💡", "SQL": "🗄️", "Infra & Cloud": "☁️",
                "Quick Quiz": "⚡", "Application Flow": "🔀",
              };
              const icon = icons[cat.name] || "📚";
              const isFocused = focusedCardIdx === idx;
              return (
                <div
                  key={cat.name}
                  ref={el => cardRefs.current[idx] = el}
                  onClick={() => { setFocusedCardIdx(idx); handleCategoryClick(cat.name); }}
                  onMouseEnter={() => setFocusedCardIdx(idx)}
                  className={`group relative cursor-pointer overflow-hidden rounded-2xl border bg-panel p-5 sm:p-7 flex flex-col justify-between gap-4 hover:border-[color:var(--lux-gold)] hover:shadow-glow transition-all duration-300 hover:-translate-y-1 ${
                    isFocused
                      ? "border-[color:var(--lux-gold)] shadow-glow -translate-y-1"
                      : "border-[color:var(--lux-border)]"
                  }`}
                >
                  {/* subtle gradient top-right accent */}
                  <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[color:var(--lux-gold)] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-10" />

                  <div className="flex items-start justify-between gap-2">
                    <motion.span
                      className="text-3xl leading-none inline-block"
                      whileHover={{ scale: 1.3, rotate: [0, -10, 10, -6, 6, 0], transition: { duration: 0.4 } }}
                    >{icon}</motion.span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--lux-muted)] opacity-60 mt-1">
                      {cat.isSpecial ? "Special" : "Q&A"}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold theme-text group-hover:text-[color:var(--lux-gold)] transition-colors leading-tight mb-1">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-[color:var(--lux-muted)]">
                      {cat.isSpecial ? cat.sub : `${cat.count} questions`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-semibold text-[color:var(--lux-gold)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Open <span className="text-base leading-none">→</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xs theme-muted mt-6 opacity-40">Arrow keys to navigate · Enter to open</p>
          </>
        )}

        {/* LEVEL 2: Content Rendering */}
        {activeCategory === "Quick Quiz" && (
          <QuizSection onBack={goBack} />
        )}

        {activeCategory === "Lifecycle Flows" && (
          <LifecycleDiagram onBack={goBack} />
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
                    }}
                    className="rounded-full border border-[color:var(--lux-border)] bg-[color:var(--lux-panel)] px-4 py-2 text-xs font-semibold text-[color:var(--lux-text)] outline-none cursor-pointer transition hover:border-[color:var(--lux-gold)] focus:border-[color:var(--lux-gold)]"
                  >
                    <option value="ALL">All · {allQuestions.filter(q => q.category === activeCategory).length}</option>
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
                {showBookmarkedOnly ? "★" : "☆"} {bookmarks.length > 0 ? `Bookmarks (${bookmarks.length})` : "Bookmarks"}
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
                          onClick={() => toggleBookmark(activeQuestion.id)}
                          title="Bookmark (B)"
                          className={`rounded-full px-2.5 py-1.5 text-sm transition border ${
                            bookmarks.includes(activeQuestion.id)
                              ? "border-[color:var(--lux-gold)] text-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)]"
                              : "border-[color:var(--lux-border)] text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)]"
                          }`}
                        >
                          {bookmarks.includes(activeQuestion.id) ? "★" : "☆"}
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
                      key={activeQuestion.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-xl font-bold leading-snug theme-text sm:text-2xl lg:text-3xl lg:max-w-4xl"
                    >
                      {activeQuestion.question}
                    </motion.h3>

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
                          </div>

                          {/* Explanation + Example side by side */}
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="lux-subpanel min-w-0">
                              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-muted)] mb-3">
                                <Lightbulb size={13} /> Explanation
                              </p>
                              <p className="text-sm leading-relaxed theme-muted break-words whitespace-pre-wrap">{activeQuestion.explanation}</p>
                            </div>
                            <div className="lux-subpanel flex flex-col min-w-0 overflow-hidden">
                              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-muted)] mb-3 shrink-0">
                                <Target size={13} /> Real-world Example
                              </p>
                              <CodeBlock code={activeQuestion.example} />
                            </div>
                          </div>

                          {/* Follow-ups + Key Points */}
                          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
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
                                <ul className="space-y-2">
                                  {activeQuestion.keyPoints.map((kp, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed theme-muted">
                                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--lux-gold)]" />
                                      {kp}
                                    </li>
                                  ))}
                                </ul>
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
                      <div className="mt-6 border-t border-[color:var(--lux-border)] pt-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--lux-muted)] mb-3">
                          Related in this topic
                        </p>
                        <div className="flex flex-col gap-2">
                          {relatedQuestions.map((rq, i) => (
                            <button
                              key={rq.id}
                              onClick={() => goToIndex(displayedQuestions.findIndex(q => q.id === rq.id))}
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
