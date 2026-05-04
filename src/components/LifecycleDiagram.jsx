import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Smartphone, Shield, Server, Lock, Webhook, FileCheck, Briefcase, Activity, Zap, Radio, Database, HardDrive, ArrowLeftRight } from "lucide-react";
import MermaidDiagram from "./MermaidDiagram";

const httpRequestFlow = {
  id: "http-request",
  title: "HTTP Request Lifecycle",
  description: "End-to-end journey of an HTTP request — from client through API Gateway, Load Balancer, Spring Boot, to database and back.",
  color: "#38bdf8",
  steps: [
    {
      id: 1,
      icon: Smartphone,
      title: "Client Request",
      subtitle: "User clicks a button",
      visual: "📱➡️📮",
      diagram: `flowchart LR
  A([📱 User Tap]) --> B[📦 Create Packet\nJSON + Headers]
  B --> C([🚀 Send Request\nOver Internet])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style C fill:#10b981,color:#fff,stroke:#059669`,
      description: "You click 'Place Order' on your phone. Your app sends a message over the internet to the server, like mailing a letter with your order details inside.",
      analogy: "🏠 Like writing a letter: You put your order details in an envelope (JSON), add your address (headers), and drop it in the mailbox (send HTTP request).",
      example: "POST /api/orders\n{\n  \"itemId\": 123,\n  \"quantity\": 2\n}"
    },
    {
      id: 2,
      icon: Shield,
      title: "WAF (Web Application Firewall)",
      subtitle: "Security bouncer",
      visual: "🚪🛡️👮",
      diagram: `flowchart LR
  A([📨 Request]) --> B{👮 WAF Guard Check}
  B -->|✓ Allowed| C([✅ Continue\nto Server])
  B -->|✗ Blocked| D([❌ 403 Forbidden\nStop])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "Before your request enters the building, a Web Application Firewall (WAF) checks if you're allowed in and if you're not sending too many requests (rate limiting). Blocks hackers and spam.",
      analogy: "🚪 Like a nightclub bouncer: Checks your ID, makes sure you're not drunk (malicious), and limits how many times you can enter per hour.",
      example: "✅ Allowed if:\n• Valid API key\n• Normal request rate\n• No suspicious patterns\n\n❌ Blocked if:\n• Too many requests (spam)\n• Suspicious patterns (hacker)\n• No valid ticket (API key)"
    },
    {
      id: 3,
      icon: Server,
      title: "Load Balancer",
      subtitle: "Traffic cop",
      visual: "🚦🏢🏢🏢",
      diagram: `flowchart LR
  A([📨 Request]) --> B[🚦 Load Balancer\nPicks least busy]
  B --> C([🖥️ Server 1\n85% busy])
  B -->|✓ Selected| D([🖥️ Server 2\n45% busy])
  B --> E([🖥️ Server 3\n60% busy])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#1e293b,color:#64748b,stroke:#475569
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#1e293b,color:#64748b,stroke:#475569`,
      description: "Directs your request to the least busy server. If Server A is overloaded, it sends you to Server B instead. Keeps things fast and balanced.",
      analogy: "🚦 Like a traffic cop at a toll booth: Directs cars to the shortest line so no one booth gets overwhelmed.",
      example: "Routes to Server B because:\n• Server A is 85% busy\n• Server B has capacity\n• Keeps response time fast"
    },
    {
      id: 4,
      icon: Lock,
      title: "Security Check",
      subtitle: "Verify your ticket",
      visual: "🎫✅🔐",
      diagram: `flowchart LR
  A([🎫 JWT Token]) --> B{🔍 Verify Signature + Expiry}
  B -->|✓ Valid| C([🔓 Access Granted\nProceed])
  B -->|✗ Invalid| D([🔒 Access Denied\n401 Unauthorized])
  style A fill:#f59e0b,color:#1e293b,stroke:#d97706
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "Checks your login token (JWT) to make sure you're really you and not an imposter. Verifies your permissions — are you allowed to place orders?",
      analogy: "🎫 Like airport security: They scan your boarding pass (JWT token), check your ID matches, and verify you're allowed to board this flight.",
      example: "1. Read your token\n2. Verify it's real (not fake)\n3. Check expiration date\n4. Confirm you have permission\n5. Let you through"
    },
    {
      id: 5,
      icon: Webhook,
      title: "Controller",
      subtitle: "Receptionist",
      visual: "📋👔🔔",
      diagram: `flowchart LR
  A([📨 HTTP Request\nPOST /api/orders]) --> B[⚙️ Controller\nRoute Matching]
  B -->|POST /orders| C([📋 createOrder\nMethod])
  B -->|GET /products| D([📄 getProducts\nMethod])
  B -->|GET /users| E([👤 getUsers\nMethod])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#1e293b,color:#64748b,stroke:#475569
  style E fill:#1e293b,color:#64748b,stroke:#475569`,
      description: "The receptionist reads your request and directs it to the right department. Converts your JSON message into a format the backend understands.",
      analogy: "📋 Like a hotel receptionist: Takes your check-in form (JSON), reads it, and calls the right department to handle your request.",
      example: "@PostMapping(\"/orders\")\npublic Order createOrder(\n    @RequestBody OrderDTO dto\n) {\n    return service.create(dto);\n}"
    },
    {
      id: 6,
      icon: FileCheck,
      title: "Validation",
      subtitle: "Quality check",
      visual: "✅❌📝",
      diagram: `flowchart LR
  A([📝 Input Data itemId qty userId]) --> B{✅ Validate All Fields}
  B -->|✓ All Valid| C([✅ Continue\nto Business Logic])
  B -->|✗ Errors Found| D([❌ 400 Bad Request\nError Response])
  style A fill:#f59e0b,color:#1e293b,stroke:#d97706
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "Checks if your order makes sense. Did you forget the item ID? Is quantity negative? If something's wrong, it rejects the order immediately before wasting time.",
      analogy: "✅ Like a form checker: Before processing your application, they check if you filled all required fields. Missing info? Application rejected on the spot.",
      example: "✅ Valid:\n• Item ID exists ✓\n• Quantity > 0 ✓\n• Valid format ✓\n→ Continue processing\n\n❌ Invalid:\n• Missing item ID ✗\n→ 400 Bad Request"
    },
    {
      id: 7,
      icon: Briefcase,
      title: "Business Logic",
      subtitle: "The actual work",
      visual: "💼⚙️🧮",
      diagram: `flowchart LR
  A([📥 Validated Data]) --> B[⚙️ Business Logic\nCalculate + Check Stock]
  B --> C[💾 Create Order\nReduce Inventory]
  C --> D([📤 Order Result\nID + Status])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669`,
      description: "This is where the real work happens — calculate price, check if item is in stock, create the order. Everything here happens in a 'transaction' — if anything fails, everything gets undone (like Ctrl+Z).",
      analogy: "🏦 Like a bank transfer: Either the money leaves your account AND enters theirs, or nothing happens at all. No half-done transfers.",
      example: "@Transactional\npublic Order create(OrderDTO dto) {\n    // Calculate total price\n    // Check stock\n    // Create order\n    // Reduce inventory\n    return order;\n}"
    },
    {
      id: 8,
      icon: Activity,
      title: "Logging",
      subtitle: "Leave a trail",
      visual: "📝📊🔍",
      diagram: `flowchart LR
  A([📨 Request]) --> B[⚙️ System\nProcessing]
  B --> C([✅ Response\nReturns])
  B -.->|async side-write| D([📝 Log Store\nTimestamp + Duration])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#f59e0b,color:#1e293b,stroke:#d97706`,
      description: "Writes down what happened in a logbook. If something breaks later, developers can trace back and see exactly what went wrong. Also tracks how long things take.",
      analogy: "📝 Like a ship's logbook: Captain writes down every event — 'Order #456 created at 3:45 PM, took 120ms'. If the ship sinks, investigators can read the log.",
      example: "log.info(\"Order created: {}\", orderId);\n\n// Also tracks metrics:\n• How many orders/second\n• Average response time\n• Error rate"
    },
    {
      id: 9,
      icon: Zap,
      title: "Cache Check",
      subtitle: "Quick memory",
      visual: "🧠⚡💨",
      diagram: `flowchart LR
  A([📨 Request]) --> B{🧠 Cache Redis Lookup}
  B -->|✓ HIT| C([⚡ Return Data\n0.5ms — Fast!])
  B -->|✗ MISS| D([💾 Query Database\n50ms — Slow])
  D --> E([📥 Store in Cache\nfor next time])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#ef4444,color:#fff,stroke:#dc2626
  style E fill:#6366f1,color:#fff,stroke:#4f46e5`,
      description: "Before asking the slow database, checks a super-fast memory (cache) first. If the answer is already there, returns it instantly. Like checking your notes before googling.",
      analogy: "🧠 Like your brain's short-term memory: You remember your friend's phone number without checking your contacts. Way faster than looking it up every time.",
      example: "⚡ Cache Hit:\n• Data found in Redis\n• Return instantly (0.5ms)\n• Skip database\n\n💾 Cache Miss:\n• Data not in cache\n• Query database (50ms)\n• Store in cache for next time"
    },
    {
      id: 10,
      icon: Radio,
      title: "Background Tasks",
      subtitle: "Fire and forget",
      visual: "📮✉️🚀",
      diagram: `flowchart LR
  A([📨 Request\nProcessed]) --> B([✅ Response\nReturns NOW])
  A -.->|async fire & forget| C[📮 Task Queue\nKafka]
  C --> D([🚀 Background Worker\nSend Email + Analytics])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#8b5cf6,color:#fff,stroke:#7c3aed`,
      description: "Sends heavy tasks (like sending confirmation emails) to a background worker. Your response comes back immediately — the email gets sent later. You don't wait.",
      analogy: "📮 Like dropping a letter in a mailbox: You drop it and walk away immediately. The postal service delivers it later. You don't stand there waiting.",
      example: "// Send event to Kafka\nkafka.send(\"order-created\", order);\n\n// Response returns NOW\n// Email worker picks it up LATER"
    },
    {
      id: 11,
      icon: Database,
      title: "Database Query",
      subtitle: "Save to disk",
      visual: "💾📀🗄️",
      diagram: `flowchart LR
  A([☕ Java Code\nrepository.save]) --> B[🔄 JPA\nGenerate SQL]
  B --> C[🗄️ Database\nINSERT INTO orders]
  C -->|Return Result| D([✅ Saved\nOrder ID: 456])
  style A fill:#f59e0b,color:#1e293b,stroke:#d97706
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#10b981,color:#fff,stroke:#059669`,
      description: "Writes your order to the database. Converts your Java code into SQL commands that the database understands. Uses a connection pool to reuse connections (faster than creating new ones).",
      analogy: "💾 Like saving a Word document: You click Save, Word translates your document into a file format, and writes it to your hard drive.",
      example: "Java code:\norderRepository.save(order);\n\nBecomes SQL:\nINSERT INTO orders\nVALUES (456, 'PENDING', 99.99);"
    },
    {
      id: 12,
      icon: HardDrive,
      title: "Commit",
      subtitle: "Make it permanent",
      visual: "✍️✅🔒",
      diagram: `flowchart LR
  A([📝 Pending Changes Insert + Update]) --> B{✅ COMMIT Transaction}
  B -->|✓ Success| C([🔒 Saved Permanently\nAll changes locked])
  B -->|✗ Any Error| D([↩️ ROLLBACK\nUndo everything])
  style A fill:#f59e0b,color:#1e293b,stroke:#d97706
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "The database says 'OK, I've saved everything to disk. It's permanent now.' If there was an error earlier, it would undo everything instead (rollback).",
      analogy: "✍️ Like signing a contract: Once both parties sign, the deal is done. If someone refuses to sign, the whole deal is cancelled — no half-deals.",
      example: "Success path:\n1. Start transaction\n2. Insert order\n3. Update inventory\n4. COMMIT ✓ (permanent)\n\nError path:\n4. ROLLBACK ✗ (undo all)"
    },
    {
      id: 13,
      icon: ArrowLeftRight,
      title: "Send Response",
      subtitle: "Reply back",
      visual: "📬✅🎉",
      diagram: `flowchart LR
  A([📦 Order Data\nJava Object]) --> B[🔄 Serialize\nJava to JSON]
  B --> C[📨 HTTP Response\n201 Created]
  C --> D([📱 Client\nReceives Response])
  style A fill:#6366f1,color:#fff,stroke:#4f46e5
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#10b981,color:#fff,stroke:#059669`,
      description: "Packages up the result (order ID, status, total) into JSON and sends it back to your phone. Travels back through all the same layers (Load Balancer, Security Gate) to reach you.",
      analogy: "📬 Like getting a receipt: The store hands you a receipt with your order number. You can now track your order using that number.",
      example: "HTTP 201 Created\n{\n  \"orderId\": 456,\n  \"status\": \"SUCCESS\",\n  \"total\": 99.99\n}"
    }
  ]
};

export default function LifecycleDiagram({ onBack }) {
  const [expandedId, setExpandedId] = useState(null);
  const [focusedId, setFocusedId] = useState(1);
  const stepRefs = useRef({});

  const toggleExpand = (id) => {
    setExpandedId(prev => {
      const next = prev === id ? null : id;
      if (next !== null) {
        setTimeout(() => stepRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" }), 320);
      }
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      const totalSteps = httpRequestFlow.steps.length;
      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          setFocusedId(prev => {
            const next = prev < totalSteps ? prev + 1 : prev;
            setTimeout(() => stepRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
            return next;
          });
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          setFocusedId(prev => {
            const next = prev > 1 ? prev - 1 : prev;
            setTimeout(() => stepRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
            return next;
          });
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          toggleExpand(focusedId);
          break;
        case "Escape":
          e.preventDefault();
          setExpandedId(null);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedId]);

  return (
    <div className="max-w-4xl mx-auto w-full pb-8 px-4 sm:px-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm font-semibold text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition-colors bg-panel px-4 py-2 rounded-full border border-[color:var(--lux-border)] hover:border-[color:var(--lux-gold)] w-max"
      >
        ← All Categories
      </button>

      {/* Title */}
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">
          {httpRequestFlow.title}
        </h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">
          {httpRequestFlow.description}
        </p>
      </div>

      {/* Flow Steps */}
      <div className="relative flex flex-col items-center">
        {httpRequestFlow.steps.map((step, idx) => {
          const isExpanded = expandedId === step.id;
          const isFocused = focusedId === step.id;
          const StepIcon = step.icon;

          return (
            <div
              key={step.id}
              className="w-full"
              ref={el => stepRefs.current[step.id] = el}
            >
              {/* Step Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.08, 0.4) }}
                className="w-full"
              >
                <div className={`glass-panel border transition-all duration-300 relative overflow-hidden ${
                  isExpanded
                    ? "border-[color:var(--lux-gold)] shadow-glow"
                    : isFocused
                    ? "border-[color:var(--lux-gold)] shadow-[0_0_0_2px_rgba(198,169,105,0.2)]"
                    : "border-[color:var(--lux-border)]"
                }`}>

                  {/* Header — clickable only */}
                  <div
                    onClick={() => { setFocusedId(step.id); toggleExpand(step.id); }}
                    className="p-4 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-[color:var(--lux-panel-strong)] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isExpanded
                          ? "bg-[color:var(--lux-gold)] text-[#16110c]"
                          : "bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] text-[color:var(--lux-gold)]"
                      }`}>
                        <StepIcon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className={`text-base sm:text-lg font-display font-bold transition-colors ${
                            isExpanded ? "text-[color:var(--lux-gold)]" : "theme-text"
                          }`}>
                            {step.id}. {step.title}
                          </h4>
                          <span className="text-lg sm:text-xl">{step.visual}</span>
                        </div>
                        <p className="text-xs text-[color:var(--lux-muted)] font-mono">{step.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className={`shrink-0 transition-all duration-300 ${
                        isExpanded ? "rotate-90 text-[color:var(--lux-gold)]" : "text-[color:var(--lux-muted)]"
                      }`}
                    />
                  </div>

                  {/* Expanded Content — NOT clickable, fully selectable */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 pb-6 pt-4 border-t border-[color:var(--lux-border)] space-y-4">

                          {/* Mermaid Flow Diagram */}
                          {step.diagram && (
                            <div className="rounded-xl overflow-hidden border border-[color:var(--lux-border)] bg-[#0f172a] p-4">
                              <p className="text-xs font-bold text-[color:var(--lux-gold)] uppercase tracking-wider mb-3">
                                📊 Flow Diagram
                              </p>
                              <MermaidDiagram chart={step.diagram} />
                            </div>
                          )}

                          {/* Analogy */}
                          {step.analogy && (
                            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                              <p className="text-sm text-[color:var(--lux-text)] leading-relaxed italic">
                                {step.analogy}
                              </p>
                            </div>
                          )}

                          {/* Description */}
                          <p className="text-sm text-[color:var(--lux-text)] leading-relaxed">
                            {step.description}
                          </p>

                          {/* Example */}
                          {step.example && (
                            <div className="bg-[color:var(--lux-panel-strong)] p-4 rounded-lg border border-[color:var(--lux-border)]">
                              <span className="text-xs font-bold text-[color:var(--lux-gold)] uppercase tracking-wider mb-2 block">
                                💡 Example
                              </span>
                              <pre className="text-xs sm:text-sm text-[color:var(--lux-muted)] font-mono whitespace-pre-wrap leading-relaxed">
                                {step.example}
                              </pre>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Connector */}
              {idx < httpRequestFlow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${httpRequestFlow.color}88, ${httpRequestFlow.color}22)` }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${httpRequestFlow.color}88` }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 space-y-2">
        <p className="text-center text-xs text-[color:var(--lux-muted)] opacity-60">
          Click any step to expand • Use keyboard to navigate
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-[10px] text-[color:var(--lux-muted)]">
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">↑ ↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">Space</kbd>
            Expand/Collapse
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">Esc</kbd>
            Close All
          </span>
        </div>
      </div>
    </div>
  );
}
