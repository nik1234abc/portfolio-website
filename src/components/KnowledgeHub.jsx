import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Shuffle, Lightbulb, Target, AlertCircle, ArrowUp, Smartphone, Shield, Server, Lock, Zap, Briefcase, Radio, Database, HardDrive, ArrowLeftRight, Plus, Minus, ArrowDown, Webhook, FileCheck, Activity, ChevronDown, ChevronUp, Tag } from "lucide-react";
import { portfolio } from "../data/portfolio.js";
import { coding } from "../data/coding.js";
import QuizSection from "./QuizSection.jsx";

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
        className="mb-8 flex items-center text-accent-400 hover:text-accent-300 font-medium transition-colors bg-panel px-5 py-2.5 rounded-lg border border-[color:var(--lux-border)] hover:border-accent-500/50 w-max"
      >
        <span className="mr-3 text-xl leading-none">←</span>
        Back to Categories
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

const KnowledgeHub = () => {
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
      return filtered;
    }
    return [];
  }, [activeCategory, activeTopic, allQuestions]);

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
    <section id="interview-prep" className="scroll-mt-20 min-h-screen bg-surface py-10 px-4 sm:px-6 lg:px-8 font-body text-gray-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold theme-text mb-6">
            Knowledge <span className="text-accent-500">Hub</span>
          </h2>
        </div>

        {/* LEVEL 1: Category Boxes */}
        {!activeCategory && (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {categoryStats.map((cat) => (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group cursor-pointer bg-panel border border-[color:var(--lux-border)] rounded-2xl p-5 sm:p-8 flex flex-col justify-center items-center text-center hover:border-accent-500 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-bold theme-text mb-3 group-hover:text-accent-400 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs sm:text-sm font-medium theme-muted bg-ink border border-[color:var(--lux-border)] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full">
                  {cat.count} Questions
                </span>
              </div>
            ))}
            {/* Quick Quiz Box */}
            <div
              onClick={() => handleCategoryClick("Quick Quiz")}
              className="group cursor-pointer bg-panel border border-[color:var(--lux-border)] rounded-2xl p-5 sm:p-8 flex flex-col justify-center items-center text-center hover:border-accent-500 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-bold theme-text mb-3 group-hover:text-accent-400 transition-colors">
                Quick Quiz
              </h3>
              <span className="text-xs sm:text-sm font-medium theme-muted bg-ink border border-[color:var(--lux-border)] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full">
                MCQ + One Word
              </span>
            </div>
            {/* Application Flow Box */}
            <div
              onClick={() => handleCategoryClick("Application Flow")}
              className="group cursor-pointer bg-panel border border-[color:var(--lux-border)] rounded-2xl p-5 sm:p-8 flex flex-col justify-center items-center text-center hover:border-accent-500 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-lg sm:text-2xl md:text-3xl font-display font-bold theme-text mb-3 group-hover:text-accent-400 transition-colors">
                Application Flow
              </h3>
              <span className="text-xs sm:text-sm font-medium theme-muted bg-ink border border-[color:var(--lux-border)] px-3 sm:px-5 py-1.5 sm:py-2 rounded-full">
                Interactive Architecture
              </span>
            </div>
          </div>
        )}

        {/* LEVEL 2: Content Rendering */}
        {activeCategory === "Quick Quiz" && (
          <QuizSection onBack={goBack} />
        )}

        {activeCategory === "Application Flow" && (
          <RestApiFlow goBack={goBack} />
        )}

        {activeCategory && activeCategory !== "Application Flow" && activeCategory !== "Quick Quiz" && (
          <div className="max-w-5xl mx-auto">
            
            {/* Back Button */}
            <button
              onClick={goBack}
              className="mb-8 flex items-center text-accent-400 hover:text-accent-300 font-medium transition-colors bg-panel px-5 py-2.5 rounded-lg border border-[color:var(--lux-border)] hover:border-accent-500/50 w-max"
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
                      ? "border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_15%,transparent)] text-[color:var(--lux-gold)] shadow-glow"
                      : "bg-panel border-[color:var(--lux-border)] theme-muted hover:border-accent-500"
                  }`}
                >
                  <h3 className="text-sm font-display font-bold mb-1">All {activeCategory}</h3>
                  <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                    {allQuestions.filter(q => q.category === activeCategory).length} Questions
                  </span>
                </div>

                {/* Specific Topic Filter Boxes */}
                {topicsForCategory.map((topic) => (
                  <div
                    key={topic.name}
                    onClick={() => handleTopicClick(topic.name)}
                    className={`cursor-pointer rounded-xl p-4 flex flex-col justify-center items-center text-center transition-all duration-300 border ${
                      activeTopic === topic.name
                        ? "border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_15%,transparent)] text-[color:var(--lux-gold)] shadow-glow"
                        : "bg-panel border-[color:var(--lux-border)] theme-muted hover:border-accent-500"
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
                <div className="text-center py-12 theme-muted bg-panel rounded-xl border border-[color:var(--lux-border)]">
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
                    <span className="lux-chip-soft flex items-center gap-2 text-xs sm:text-sm max-w-[180px] sm:max-w-none truncate">
                        <Brain size={14} className="text-[color:var(--lux-gold)]" />
                        {activeQuestion.category} {activeQuestion.topic ? `• ${activeQuestion.topic}` : ""}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-medium theme-muted whitespace-nowrap">
                      Question {currentIndex + 1} of {displayedQuestions.length}
                    </span>
                  </div>

                  <div className="flex-1 py-8">
                    <h3 className="font-display text-xl font-bold leading-tight theme-text sm:text-2xl lg:text-3xl lg:max-w-4xl">
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

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="lux-subpanel">
                              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[color:var(--lux-muted)] mb-3"><Lightbulb size={16} /> Explanation</p>
                              <p className="text-sm leading-relaxed theme-muted whitespace-pre-wrap">{activeQuestion.explanation}</p>
                            </div>
                            <div className="lux-subpanel flex flex-col">
                              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[color:var(--lux-muted)] mb-3 shrink-0"><Target size={16} /> Real-world Example</p>
                              <div className="bg-ink/60 border border-[color:var(--lux-border)] rounded-lg p-4 overflow-x-auto flex-1">
                                <pre className="text-sm leading-relaxed theme-muted font-mono whitespace-pre-wrap">{activeQuestion.example}</pre>
                              </div>
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
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
                          {activeQuestion.keyPoints && activeQuestion.keyPoints.length > 0 && (
                            <div>
                              <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--lux-muted)] mb-3">Key Points</p>
                              <ul className="space-y-2">
                                {activeQuestion.keyPoints.map((kp, idx) => (
                                  <li key={idx} className="text-sm leading-relaxed theme-muted flex items-start gap-2"><span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--lux-gold)]"></span> {kp}</li>
                                ))}
                              </ul>
                            </div>
                          )}
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

export default KnowledgeHub;
