import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Globe, Map, Shield, GitBranch, AlertTriangle, Activity, Database, RefreshCw } from "lucide-react";
import MermaidDiagram from "../MermaidDiagram";

const microservicesFlow = {
  id: "microservices",
  title: "Microservices Request Flow",
  description: "How a single user request travels through an API Gateway, service discovery, inter-service calls, circuit breakers, and distributed tracing.",
  color: "#8b5cf6",
  steps: [
    {
      id: 1,
      icon: Globe,
      title: "API Gateway",
      subtitle: "Single entry point",
      visual: "🌐🚪🔀",
      diagram: `flowchart LR
  A([📱 Client Mobile / Web]) --> B[🌐 API Gateway\nSpring Cloud Gateway]
  B --> C[🔐 Auth Check\nJWT Verify]
  B --> D[🚦 Rate Limit\nper user/IP]
  B --> E[🔀 Route\nto Service]
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#ef4444,color:#fff,stroke:#dc2626
  style E fill:#10b981,color:#fff,stroke:#059669`,
      description: "The API Gateway is the single front door for all clients. It handles cross-cutting concerns: authentication, rate limiting, SSL termination, and routing — so individual services don't have to.",
      analogy: "🏢 Like a building reception desk: Every visitor (request) goes through reception first. They check your ID (auth), log your visit (rate limit), and direct you to the right floor (routing). Individual offices don't deal with security.",
      example: "// Spring Cloud Gateway route\nspring:\n  cloud:\n    gateway:\n      routes:\n        - id: order-service\n          uri: lb://ORDER-SERVICE\n          predicates:\n            - Path=/api/orders/**\n          filters:\n            - AuthFilter\n            - RateLimiter"
    },
    {
      id: 2,
      icon: Map,
      title: "Service Discovery",
      subtitle: "Find where services live",
      visual: "🗺️🔍🖥️",
      diagram: `flowchart LR
  A([🌐 API Gateway needs Order Service]) --> B[📋 Eureka Server\nService Registry]
  B -->|Returns| C([🖥️ order-service\n192.168.1.10:8081\n192.168.1.11:8081])
  A --> D[⚖️ Load Balance\nRound Robin]
  D --> E([🖥️ Instance 1\nSelected])
  style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#6366f1,color:#fff,stroke:#4f46e5
  style E fill:#10b981,color:#fff,stroke:#059669`,
      description: "Services register themselves with Eureka on startup. When the gateway needs to call Order Service, it asks Eureka for the current IP/port. Services can scale up/down and the registry always has the latest addresses.",
      analogy: "📞 Like a phone directory that updates itself: Instead of hardcoding phone numbers, you look up 'Pizza Place' and get the current number. If they move, the directory updates automatically.",
      example: "// Service registers itself\n@SpringBootApplication\n@EnableEurekaClient\npublic class OrderServiceApp {}\n\n// application.yml\neureka:\n  client:\n    serviceUrl:\n      defaultZone: http://eureka:8761/eureka\n\n// Gateway uses service name, not IP\nuri: lb://ORDER-SERVICE  // lb = load balanced"
    },
    {
      id: 3,
      icon: GitBranch,
      title: "Inter-Service Communication",
      subtitle: "Services calling each other",
      visual: "🔗📡🔗",
      diagram: `flowchart LR
  A([🛒 Order Service]) -->|Sync REST| B([📦 Inventory Service Check stock])
  A -->|Sync REST| C([💳 Payment Service\nCharge card])
  A -.->|Async Kafka| D([📧 Email Service\nSend confirmation])
  A -.->|Async Kafka| E([📊 Analytics Service\nTrack order])
  style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#10b981,color:#fff,stroke:#059669`,
      description: "Services communicate two ways: Synchronous (REST/gRPC) when you need an immediate answer — like checking stock before confirming an order. Asynchronous (Kafka) for things that can happen later — like sending emails.",
      analogy: "📞 Sync is like a phone call: You wait on the line for an answer. Async is like sending a text: You send it and continue your day — they reply when ready.",
      example: "// Sync call with Feign Client\n@FeignClient(name = \"inventory-service\")\npublic interface InventoryClient {\n    @GetMapping(\"/stock/{itemId}\")\n    StockResponse checkStock(@PathVariable Long itemId);\n}\n\n// Async via Kafka\nkafkaTemplate.send(\"order-created\", event);\n// Email service picks it up independently"
    },
    {
      id: 4,
      icon: AlertTriangle,
      title: "Circuit Breaker",
      subtitle: "Stop cascading failures",
      visual: "⚡🔴🛡️",
      diagram: `flowchart LR
  A([🛒 Order Service]) --> B{⚡ Circuit Breaker Resilient4j}
  B -->|CLOSED - normal| C([📦 Inventory Service\nResponding OK])
  B -->|OPEN - failing| D([🔄 Fallback\nReturn cached/default])
  B -->|HALF-OPEN - testing| E{🧪 Test Request Did it succeed?}
  E -->|✓ Yes| B
  E -->|✗ No| B
  style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#ef4444,color:#fff,stroke:#dc2626
  style E fill:#6366f1,color:#fff,stroke:#4f46e5`,
      description: "If Inventory Service is down, without a circuit breaker, Order Service would keep trying and eventually crash too (cascading failure). Circuit breaker detects failures and immediately returns a fallback — protecting the whole system.",
      analogy: "💡 Like an electrical circuit breaker: If there's a power surge (service failure), the breaker trips (OPEN) to protect the whole house. After a while it tries again (HALF-OPEN). If safe, it resets (CLOSED).",
      example: "// Resilience4j Circuit Breaker\n@CircuitBreaker(\n  name = \"inventory\",\n  fallbackMethod = \"fallbackStock\"\n)\npublic StockResponse checkStock(Long itemId) {     return inventoryClient.checkStock(itemId);\n}\n\n// Fallback when circuit is OPEN\npublic StockResponse fallbackStock(Long itemId, Exception e) {     return StockResponse.assume(true); // optimistic\n}"
    },
    {
      id: 5,
      icon: Shield,
      title: "Distributed Security",
      subtitle: "JWT across services",
      visual: "🔐🔗🔐",
      diagram: `flowchart LR
  A([🌐 API Gateway Verifies JWT]) --> B([🛒 Order Service\nTrusts Gateway])
  B -->|Passes token| C([📦 Inventory Service])
  B -->|Passes token| D([💳 Payment Service])
  C & D --> E[🔍 Verify JWT\nExtract userId + roles]
  style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#3b82f6,color:#fff,stroke:#2563eb
  style E fill:#f59e0b,color:#1e293b,stroke:#d97706`,
      description: "The API Gateway verifies the JWT once. It then passes the token (or extracted user info) to downstream services. Each service can verify the token independently without calling a central auth server — stateless and fast.",
      analogy: "🏢 Like a building with multiple departments: Reception checks your ID badge once. Inside, each department can read your badge to know your clearance level — they don't call reception every time.",
      example: "// Gateway adds user info to headers\nfilters:\n  - AddRequestHeader=X-User-Id, #{userId}\n  - AddRequestHeader=X-User-Role, #{role}\n\n// Downstream service reads headers\n@GetMapping(\"/orders\")\npublic List<Order> getOrders(\n    @RequestHeader(\"X-User-Id\") Long userId) {     return orderService.findByUser(userId);\n}"
    },
    {
      id: 6,
      icon: Activity,
      title: "Distributed Tracing",
      subtitle: "Track a request across services",
      visual: "🔍📊🗺️",
      diagram: `flowchart LR
  A([📱 Client Request]) --> B([🌐 Gateway\ntraceId: abc123])
  B --> C([🛒 Order Service\nspanId: span1])
  C --> D([📦 Inventory\nspanId: span2])
  C --> E([💳 Payment\nspanId: span3])
  B & C & D & E --> F([📊 Zipkin / Jaeger\nFull trace timeline])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#10b981,color:#fff,stroke:#059669
  style F fill:#f59e0b,color:#1e293b,stroke:#d97706`,
      description: "A single request touches 4+ services. Distributed tracing assigns a unique traceId to the request and a spanId to each service hop. You can see the full journey in Zipkin — which service was slow, where errors happened.",
      analogy: "📦 Like a package tracking number: One number (traceId) tracks your parcel through warehouse → truck → local depot → delivery. You see every step and how long each took.",
      example: "// Micrometer Tracing (Spring Boot 3)\n// Auto-propagates traceId via headers\n\n// Logs automatically include:\n[traceId=abc123 spanId=span1] Order created\n[traceId=abc123 spanId=span2] Stock checked\n[traceId=abc123 spanId=span3] Payment charged\n\n// View in Zipkin UI:\n// GET http://zipkin:9411"
    },
    {
      id: 7,
      icon: Database,
      title: "Database Per Service",
      subtitle: "No shared databases",
      visual: "🗄️🔒🗄️",
      diagram: `flowchart LR
  A([🛒 Order Service]) --> B([🗄️ Orders DB PostgreSQL])
  C([📦 Inventory Service]) --> D([🗄️ Inventory DB\nPostgreSQL])
  E([👤 User Service]) --> F([🗄️ Users DB\nMongoDB])
  G([💳 Payment Service]) --> H([🗄️ Payments DB\nPostgreSQL])
  style A fill:#6366f1,color:#fff,stroke:#4f46e5
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#3b82f6,color:#fff,stroke:#2563eb
  style E fill:#6366f1,color:#fff,stroke:#4f46e5
  style F fill:#10b981,color:#fff,stroke:#059669
  style G fill:#6366f1,color:#fff,stroke:#4f46e5
  style H fill:#3b82f6,color:#fff,stroke:#2563eb`,
      description: "Each microservice owns its own database — no sharing. This means services are truly independent: different teams, different deployment schedules, even different database technologies. The tradeoff is no cross-service joins.",
      analogy: "🏠 Like separate apartments: Each tenant (service) has their own kitchen (database). They can't walk into each other's kitchen. If they need something, they ask (API call) — they don't share a fridge.",
      example: "// ❌ Wrong: Shared database\nOrder Service → shared_db.orders\nInventory Service → shared_db.inventory\n// Tight coupling, can't deploy independently\n\n// ✓ Correct: Database per service\nOrder Service → orders_db\nInventory Service → inventory_db\n// Independent, can use different DB types"
    },
    {
      id: 8,
      icon: RefreshCw,
      title: "Saga Pattern",
      subtitle: "Distributed transactions",
      visual: "🔄✅↩️",
      diagram: `flowchart LR
  A([🛒 Create Order]) --> B([📦 Reserve Stock Inventory Service])
  B -->|✓ Reserved| C([💳 Charge Payment\nPayment Service])
  C -->|✓ Charged| D([✅ Order Confirmed])
  C -->|✗ Failed| E([↩️ Release Stock\nCompensation])
  B -->|✗ Out of stock| F([❌ Order Failed\nNo compensation needed])
  style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626
  style F fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "No distributed transactions (no 2PC) in microservices. Instead, use Sagas: a sequence of local transactions. If one step fails, run compensating transactions to undo previous steps. Eventual consistency instead of ACID.",
      analogy: "✈️ Like booking a trip: Book flight → book hotel → book car. If car rental fails, cancel the hotel and flight (compensating transactions). Each booking is independent but coordinated.",
      example: "// Choreography Saga via Kafka\n1. Order Service: creates order → publishes OrderCreated\n2. Inventory Service: reserves stock → publishes StockReserved\n3. Payment Service: charges card → publishes PaymentDone\n4. Order Service: confirms order\n\n// On failure:\nPaymentFailed event → Inventory releases stock\n→ Order marked as FAILED"
    }
  ]
};

export default function MicroservicesFlow({ onBack }) {
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
      const total = microservicesFlow.steps.length;
      switch (e.key) {
        case "ArrowDown": case "ArrowRight":
          e.preventDefault();
          setFocusedId(prev => { const n = prev < total ? prev + 1 : prev; setTimeout(() => stepRefs.current[n]?.scrollIntoView({ behavior: "smooth", block: "center" }), 50); return n; });
          break;
        case "ArrowUp": case "ArrowLeft":
          e.preventDefault();
          setFocusedId(prev => { const n = prev > 1 ? prev - 1 : prev; setTimeout(() => stepRefs.current[n]?.scrollIntoView({ behavior: "smooth", block: "center" }), 50); return n; });
          break;
        case " ": case "Enter": e.preventDefault(); toggleExpand(focusedId); break;
        case "Escape": e.preventDefault(); setExpandedId(null); break;
        default: break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedId]);

  return (
    <div className="max-w-4xl mx-auto w-full pb-8 px-4 sm:px-6">
      <button onClick={onBack} className="mb-8 flex items-center gap-2 text-sm font-semibold text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition-colors bg-panel px-4 py-2 rounded-full border border-[color:var(--lux-border)] hover:border-[color:var(--lux-gold)] w-max">
        ← All Categories
      </button>
      <div className="text-center mb-10">
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">{microservicesFlow.title}</h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">{microservicesFlow.description}</p>
      </div>
      <div className="relative flex flex-col items-center">
        {microservicesFlow.steps.map((step, idx) => {
          const isExpanded = expandedId === step.id;
          const isFocused = focusedId === step.id;
          const StepIcon = step.icon;
          return (
            <div key={step.id} className="w-full" ref={el => stepRefs.current[step.id] = el}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: Math.min(idx * 0.08, 0.4) }} className="w-full">
                <div className={`glass-panel border transition-all duration-300 relative overflow-hidden ${isExpanded ? "border-[color:var(--lux-gold)] shadow-glow" : isFocused ? "border-[color:var(--lux-gold)] shadow-[0_0_0_2px_rgba(198,169,105,0.2)]" : "border-[color:var(--lux-border)]"}`}>
                  <div onClick={() => { setFocusedId(step.id); toggleExpand(step.id); }} className="p-4 sm:p-6 flex items-center justify-between cursor-pointer hover:bg-[color:var(--lux-panel-strong)] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isExpanded ? "bg-[color:var(--lux-gold)] text-[#16110c]" : "bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] text-[color:var(--lux-gold)]"}`}>
                        <StepIcon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className={`text-base sm:text-lg font-display font-bold transition-colors ${isExpanded ? "text-[color:var(--lux-gold)]" : "theme-text"}`}>{step.id}. {step.title}</h4>
                          <span className="text-lg sm:text-xl">{step.visual}</span>
                        </div>
                        <p className="text-xs text-[color:var(--lux-muted)] font-mono">{step.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className={`shrink-0 transition-all duration-300 ${isExpanded ? "rotate-90 text-[color:var(--lux-gold)]" : "text-[color:var(--lux-muted)]"}`} />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-4 sm:px-6 pb-6 pt-4 border-t border-[color:var(--lux-border)] space-y-4">
                          {step.diagram && (
                            <div className="rounded-xl overflow-hidden border border-[color:var(--lux-border)] bg-[#0f172a] p-4">
                              <p className="text-xs font-bold text-[color:var(--lux-gold)] uppercase tracking-wider mb-3">📊 Flow Diagram</p>
                              <MermaidDiagram chart={step.diagram} />
                            </div>
                          )}
                          {step.analogy && (
                            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                              <p className="text-sm text-[color:var(--lux-text)] leading-relaxed italic">{step.analogy}</p>
                            </div>
                          )}
                          <p className="text-sm text-[color:var(--lux-text)] leading-relaxed">{step.description}</p>
                          {step.example && (
                            <div className="bg-[color:var(--lux-panel-strong)] p-4 rounded-lg border border-[color:var(--lux-border)]">
                              <span className="text-xs font-bold text-[color:var(--lux-gold)] uppercase tracking-wider mb-2 block">💡 Example</span>
                              <pre className="text-xs sm:text-sm text-[color:var(--lux-muted)] font-mono whitespace-pre-wrap leading-relaxed">{step.example}</pre>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
              {idx < microservicesFlow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${microservicesFlow.color}88, ${microservicesFlow.color}22)` }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${microservicesFlow.color}88` }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 space-y-2">
        <p className="text-center text-xs text-[color:var(--lux-muted)] opacity-60">Click any step to expand • Use keyboard to navigate</p>
        <div className="flex flex-wrap justify-center gap-3 text-[10px] text-[color:var(--lux-muted)]">
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">↑ ↓</kbd> Navigate</span>
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">Space</kbd> Expand/Collapse</span>
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">Esc</kbd> Close All</span>
        </div>
      </div>
    </div>
  );
}

