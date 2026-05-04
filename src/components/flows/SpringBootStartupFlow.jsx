import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Settings, Package, Layers, Globe, Database, Shield, Zap, CheckCircle } from "lucide-react";
import MermaidDiagram from "../MermaidDiagram";

const springBootStartupFlow = {
  id: "spring-boot-startup",
  title: "Spring Boot App Startup Flow",
  description: "What happens from the moment you run 'java -jar app.jar' to the server being ready — step by step, simply explained.",
  color: "#6db33f",
  steps: [
    {
      id: 1,
      icon: Play,
      title: "main() Method",
      subtitle: "Entry point",
      visual: "▶️☕",
      diagram: `flowchart LR
  A["java -jar app.jar"] --> B["JVM starts"]
  B --> C["SpringApplication.run()"]
  C --> D["Spring context begins"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669`,
      description: "Everything starts from the main() method. SpringApplication.run() bootstraps the entire Spring context. It detects the application type (Servlet, Reactive, or None) and prepares accordingly.",
      analogy: "🏗️ Like a construction foreman arriving on site: They read the blueprints (annotations), figure out what kind of building to construct (app type), and start organizing the crew (beans).",
      example: "@SpringBootApplication\npublic class OrderServiceApp {\n    public static void main(String[] args) {\n        SpringApplication.run(\n            OrderServiceApp.class, args\n        );\n    }\n}\n// This one line triggers the entire\n// startup sequence below"
    },
    {
      id: 2,
      icon: Settings,
      title: "Load Application Properties",
      subtitle: "Read all configuration",
      visual: "📄⚙️🔧",
      diagram: `flowchart LR
  A["CMD args\nhighest priority"] --> E["Final Config"]
  B["Env variables"] --> E
  C["application.yml"] --> E
  D["Defaults\nlowest priority"] --> E
  style A fill:#10b981,color:#fff,stroke:#059669
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#1e293b,color:#64748b,stroke:#475569
  style E fill:#6db33f,color:#fff,stroke:#5a9e34`,
      description: "Spring Boot loads configuration from multiple sources in strict priority order. Command-line args override everything. Environment variables override files. application.yml overrides defaults. Active profiles (dev/prod) load profile-specific files too.",
      analogy: "📋 Like a recipe with substitutions: The base recipe (defaults) can be overridden by your notes (application.yml), which can be overridden by your chef's instructions (env vars), which can be overridden by last-minute changes (command-line args).",
      example: "// Priority (highest → lowest):\n1. java -jar app.jar --server.port=9090\n2. export SERVER_PORT=9090\n3. application.yml: server.port: 8080\n4. Default: 8080\n\n// Profile-specific:\napplication-dev.yml  (active with -Dspring.profiles.active=dev)\napplication-prod.yml"
    },
    {
      id: 3,
      icon: Package,
      title: "Component Scanning",
      subtitle: "Find all beans",
      visual: "🔍📦🗂️",
      diagram: `flowchart LR
  A["Scan packages"] --> B{Annotation found?}
  B -->|Yes - @Service @Repository @Controller| C["Register as Bean Definition"]
  B -->|No annotation| D["Skip class"]
  C --> E["Bean Registry"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#1e293b,color:#64748b,stroke:#475569
  style E fill:#6366f1,color:#fff,stroke:#4f46e5`,
      description: "@SpringBootApplication includes @ComponentScan which scans the current package and all sub-packages. Every class annotated with @Component, @Service, @Repository, @Controller, or @Configuration gets registered as a bean definition.",
      analogy: "🏢 Like HR scanning resumes: They go through every folder (package), find anyone with the right qualifications (annotations), and add them to the employee list (bean registry). Not hired yet — just registered.",
      example: "// @SpringBootApplication includes:\n@ComponentScan(basePackages = \"com.example\")\n\n// These get registered as beans:\n@Service    OrderService\n@Repository OrderRepository\n@Controller OrderController\n@Component  EmailHelper\n\n// NOT scanned (different package):\ncom.other.SomeClass  ← missed!"
    },
    {
      id: 4,
      icon: Zap,
      title: "Auto-Configuration",
      subtitle: "Magic behind the scenes",
      visual: "✨🔮⚙️",
      diagram: `flowchart LR
  A["Classpath dependencies"] --> B{Condition met?}
  B -->|Yes| C["Auto-configure the bean"]
  B -->|No| D["Skip it"]
  C --> E["Bean ready without your code"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#1e293b,color:#64748b,stroke:#475569
  style E fill:#6366f1,color:#fff,stroke:#4f46e5`,
      description: "This is Spring Boot's superpower. It reads META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports, checks conditions (@ConditionalOnClass, @ConditionalOnMissingBean), and auto-configures beans only when needed. Add HikariCP to classpath → DataSource appears automatically.",
      analogy: "🏠 Like a smart home: When you move in, it detects what appliances you have (classpath) and automatically sets up the right settings. Has a dishwasher? Auto-configures water supply. No dishwasher? Skips that setup.",
      example: "// You add to pom.xml:\n<dependency>spring-boot-starter-data-jpa</dependency>\n\n// Spring Boot auto-configures:\n✓ DataSource (HikariCP pool)\n✓ EntityManagerFactory\n✓ TransactionManager\n✓ JpaRepositories\n\n// You wrote ZERO config for this!\n// @ConditionalOnClass(DataSource.class)\n// @ConditionalOnMissingBean(DataSource.class)"
    },
    {
      id: 5,
      icon: Layers,
      title: "Bean Creation & Dependency Injection",
      subtitle: "Wire everything together",
      visual: "🔗🧩✅",
      diagram: `flowchart LR
  A["Repository\nno dependencies"] --> B["Service\nneeds Repository"]
  B --> C["Controller\nneeds Service"]
  C --> D["All beans\nwired and ready"]
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#6db33f,color:#fff,stroke:#5a9e34`,
      description: "Spring resolves the dependency graph and creates beans in the right order. Repository first (no dependencies), then Service (needs Repository), then Controller (needs Service). Constructor injection is preferred — dependencies are explicit and the class is easier to test.",
      analogy: "🏭 Like an assembly line: You can't assemble a car before the engine is built. Spring figures out the right order automatically — engine first, then chassis, then body, then interior.",
      example: "// Constructor injection (preferred)\n@Service\npublic class OrderService {\n    private final OrderRepository repo;\n    private final EmailService email;\n\n    // Spring injects both automatically\n    public OrderService(\n        OrderRepository repo,\n        EmailService email\n    ) {\n        this.repo = repo;\n        this.email = email;\n    }\n}"
    },
    {
      id: 6,
      icon: Database,
      title: "Database Initialization",
      subtitle: "Connect & migrate schema",
      visual: "🗄️🔌✅",
      diagram: `flowchart LR
  A["DataSource bean ready"] --> B["HikariCP connection pool"]
  B --> C{Flyway or Liquibase?}
  C -->|Yes| D["Run pending migrations"]
  C -->|No| E["Skip"]
  D --> F["DB ready"]
  E --> F
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#6366f1,color:#fff,stroke:#4f46e5
  style E fill:#1e293b,color:#64748b,stroke:#475569
  style F fill:#10b981,color:#fff,stroke:#059669`,
      description: "HikariCP creates a connection pool (default 10 connections). If Flyway or Liquibase is on the classpath, Spring runs pending database migrations automatically before the app accepts traffic. Schema is always in sync with code.",
      analogy: "🏗️ Like renovating before opening a restaurant: Before customers arrive, you run all the renovation work (migrations). Each renovation is numbered (V1, V2, V3) so you never redo completed work.",
      example: "// HikariCP pool config\nspring.datasource.hikari.maximum-pool-size=10\nspring.datasource.hikari.connection-timeout=30000\n\n// Flyway migrations (auto-run on startup)\nsrc/main/resources/db/migration/\n  V1__create_orders_table.sql\n  V2__add_status_column.sql\n  V3__create_users_table.sql\n\n// Flyway tracks what's been run\n// in schema_version table"
    },
    {
      id: 7,
      icon: Shield,
      title: "Security Filter Chain",
      subtitle: "Set up authentication",
      visual: "🔐🛡️⛓️",
      diagram: `flowchart LR
  A["Request arrives"] --> B["JWT Filter\nextract token"]
  B --> C["Auth Filter\nverify identity"]
  C --> D["Authz Filter\ncheck permissions"]
  D --> E["DispatcherServlet\nhandle request"]
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style D fill:#ef4444,color:#fff,stroke:#dc2626
  style E fill:#10b981,color:#fff,stroke:#059669`,
      description: "Spring Security builds a chain of servlet filters that every request passes through before reaching your controllers. Filters run in a specific order: CORS → CSRF → Authentication → Authorization. Your custom JWT filter plugs into this chain.",
      analogy: "🏢 Like building security layers: Visitor enters → reception checks ID (authentication filter) → security checks clearance (authorization filter) → escorted to the right floor (dispatcher). Every visitor goes through every layer.",
      example: "@Configuration\npublic class SecurityConfig {\n    @Bean\n    public SecurityFilterChain filterChain(\n        HttpSecurity http\n    ) throws Exception {\n        return http\n            .addFilterBefore(jwtFilter,\n                UsernamePasswordAuthenticationFilter.class)\n            .authorizeHttpRequests(auth -> auth\n                .requestMatchers(\"/auth/**\").permitAll()\n                .anyRequest().authenticated()\n            ).build();\n    }\n}"
    },
    {
      id: 8,
      icon: Globe,
      title: "Embedded Tomcat Starts",
      subtitle: "Server ready for traffic",
      visual: "🌐🚀✅",
      diagram: `flowchart LR
  A["All beans ready"] --> B["Tomcat starts"]
  B --> C["Bind to port 8080"]
  C --> D["Register DispatcherServlet"]
  D --> E["Server is UP"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#6366f1,color:#fff,stroke:#4f46e5
  style E fill:#10b981,color:#fff,stroke:#059669`,
      description: "After all beans are ready, the embedded Tomcat server starts, binds to the configured port, and registers the DispatcherServlet as the entry point for all HTTP requests. The app logs 'Started in X seconds' and Actuator /health returns UP.",
      analogy: "🏪 Like a shop opening for business: All staff are in position (beans ready), the door is unlocked (port bound), the receptionist is at the desk (DispatcherServlet registered), and the 'OPEN' sign is turned on (server ready).",
      example: "// Startup log output:\nStarted OrderServiceApp in 3.421 seconds\nTomcat started on port(s): 8080 (http)\n\n// Actuator health check:\nGET /actuator/health\n→ { \"status\": \"UP\",\n    \"components\": {\n      \"db\": { \"status\": \"UP\" },\n      \"diskSpace\": { \"status\": \"UP\" }\n    }\n  }"
    },
    {
      id: 9,
      icon: CheckCircle,
      title: "DispatcherServlet — Request Handling",
      subtitle: "How requests are routed",
      visual: "📨🗺️🎯",
      diagram: `flowchart LR
  A["HTTP Request"] --> B["DispatcherServlet"]
  B --> C["HandlerMapping\nfind controller method"]
  C --> D["Controller method\nexecutes"]
  D --> E["Jackson\nObject to JSON"]
  E --> F["HTTP Response"]
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#6db33f,color:#fff,stroke:#5a9e34
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style E fill:#6366f1,color:#fff,stroke:#4f46e5
  style F fill:#10b981,color:#fff,stroke:#059669`,
      description: "Every request hits DispatcherServlet first (Front Controller pattern). It asks HandlerMapping 'which method handles this URL?', then HandlerAdapter calls that method, and finally MessageConverter (Jackson) serializes the return value to JSON.",
      analogy: "🏨 Like a hotel concierge: Every guest (request) goes to the concierge (DispatcherServlet). Concierge checks the directory (HandlerMapping), calls the right department (Controller method), and delivers the response back to the guest.",
      example: "// Request: GET /api/orders/123\n\n// 1. DispatcherServlet receives it\n// 2. HandlerMapping finds:\n@GetMapping(\"/api/orders/{id}\")\npublic Order getOrder(@PathVariable Long id)\n\n// 3. HandlerAdapter calls the method\n// 4. Jackson converts Order → JSON\n// 5. Response: 200 OK { \"id\": 123, ... }"
    }
  ]
};

export default function SpringBootStartupFlow({ onBack }) {
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
      const total = springBootStartupFlow.steps.length;
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
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">{springBootStartupFlow.title}</h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">{springBootStartupFlow.description}</p>
      </div>
      <div className="relative flex flex-col items-center">
        {springBootStartupFlow.steps.map((step, idx) => {
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
              {idx < springBootStartupFlow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${springBootStartupFlow.color}88, ${springBootStartupFlow.color}22)` }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${springBootStartupFlow.color}88` }} />
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
