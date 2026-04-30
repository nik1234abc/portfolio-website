import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

// ── Lifecycle data ────────────────────────────────────────────────────────────
const lifecycles = [
  {
    id: "spring-bean",
    label: "Spring Bean Lifecycle",
    icon: "🍃",
    color: "#4ade80",
    description: "How Spring creates, configures, and destroys a bean from instantiation to shutdown.",
    steps: [
      { icon: "🏗️", title: "Instantiation", subtitle: "new BeanClass()", desc: "Spring calls the constructor (or factory method) to create the raw bean instance. No dependencies are injected yet — it's just an empty object in memory." },
      { icon: "💉", title: "Dependency Injection", subtitle: "@Autowired / constructor", desc: "Spring injects all dependencies — constructor args, setter methods, or @Autowired fields. The bean now has all its collaborators." },
      { icon: "🏷️", title: "BeanNameAware", subtitle: "setBeanName(name)", desc: "If the bean implements BeanNameAware, Spring calls setBeanName() with the bean's ID. Useful when a bean needs to know its own name in the container." },
      { icon: "📦", title: "BeanFactoryAware", subtitle: "setBeanFactory(factory)", desc: "If the bean implements BeanFactoryAware, Spring injects the BeanFactory. Rarely needed — only when a bean needs to look up other beans programmatically." },
      { icon: "🔧", title: "BeanPostProcessor (before)", subtitle: "postProcessBeforeInitialization()", desc: "All registered BeanPostProcessors get a chance to modify the bean before initialization. This is how AOP proxies, @Async, and @Transactional are applied." },
      { icon: "⚡", title: "@PostConstruct / afterPropertiesSet()", subtitle: "Initialization callback", desc: "Your custom initialization logic runs here. @PostConstruct method is called after all dependencies are injected. Use it to validate config, open connections, or warm up caches." },
      { icon: "🔧", title: "BeanPostProcessor (after)", subtitle: "postProcessAfterInitialization()", desc: "BeanPostProcessors run again after initialization. The final proxy wrapping (for AOP) typically happens here — the bean you get from the container may be a proxy, not the original object." },
      { icon: "✅", title: "Bean Ready", subtitle: "In ApplicationContext", desc: "The bean is fully initialized and registered in the ApplicationContext. It can now be injected into other beans and used by the application." },
      { icon: "🔴", title: "@PreDestroy / destroy()", subtitle: "Shutdown callback", desc: "When the ApplicationContext closes (app shutdown), Spring calls @PreDestroy methods. Use it to close connections, flush caches, or release resources cleanly." },
    ]
  },
  {
    id: "jvm",
    label: "JVM Startup Lifecycle",
    icon: "☕",
    color: "#f59e0b",
    description: "What happens from running 'java -jar app.jar' to your main() method executing.",
    steps: [
      { icon: "🚀", title: "JVM Launch", subtitle: "java -jar app.jar", desc: "The OS starts the JVM process. JVM allocates memory regions: Heap (objects), Stack (method frames), Metaspace (class metadata), Code Cache (JIT compiled code)." },
      { icon: "📥", title: "Bootstrap ClassLoader", subtitle: "Loads core Java classes", desc: "The Bootstrap ClassLoader (written in C++) loads the core Java classes from rt.jar / java.base module — String, Object, System, etc. These are the foundation everything else depends on." },
      { icon: "📦", title: "Extension / Platform ClassLoader", subtitle: "Loads JDK extensions", desc: "Loads classes from the JDK extension directories — security providers, XML parsers, etc. In Java 9+, this is the Platform ClassLoader loading named modules." },
      { icon: "🗂️", title: "Application ClassLoader", subtitle: "Loads your app classes", desc: "Loads your application's .class files from the classpath. This is where Spring Boot's fat JAR loader takes over — it loads classes from nested JARs inside the fat JAR." },
      { icon: "🔗", title: "Linking (Verify → Prepare → Resolve)", subtitle: "Bytecode verification", desc: "Verify: checks bytecode is valid and safe. Prepare: allocates memory for static variables and sets defaults. Resolve: replaces symbolic references with direct memory references." },
      { icon: "⚙️", title: "Initialization", subtitle: "Static blocks & fields", desc: "Static initializers and static field assignments run in order. This is when Spring's @SpringBootApplication class is initialized and the static main() method becomes callable." },
      { icon: "▶️", title: "main() Executes", subtitle: "SpringApplication.run()", desc: "Your main() method runs. For Spring Boot, SpringApplication.run() starts the ApplicationContext, triggers component scanning, auto-configuration, and starts the embedded Tomcat server." },
      { icon: "🔥", title: "JIT Compilation", subtitle: "HotSpot optimization", desc: "The JVM starts interpreting bytecode. The JIT compiler monitors 'hot' methods (called frequently) and compiles them to native machine code. After warmup, performance approaches native C++ speed." },
      { icon: "🗑️", title: "Garbage Collection", subtitle: "Ongoing memory management", desc: "GC runs continuously in background threads. G1GC (default Java 11+) divides heap into regions, collects garbage incrementally to minimize pause times. ZGC/Shenandoah offer sub-millisecond pauses." },
    ]
  },
  {
    id: "kafka-consumer",
    label: "Kafka Consumer Lifecycle",
    icon: "📨",
    color: "#c6a969",
    description: "How a Kafka consumer starts, joins a group, processes messages, and handles failures.",
    steps: [
      { icon: "⚙️", title: "Consumer Configuration", subtitle: "bootstrap.servers, group.id", desc: "Consumer is configured with broker addresses, group ID, deserializers, and offset reset policy. group.id determines which consumer group this consumer belongs to." },
      { icon: "🤝", title: "Join Group", subtitle: "GroupCoordinator handshake", desc: "Consumer sends a JoinGroup request to the Group Coordinator broker. The coordinator collects all members and triggers a rebalance to assign partitions." },
      { icon: "🔄", title: "Rebalance / Partition Assignment", subtitle: "Partitions distributed", desc: "The group leader (first consumer to join) runs the partition assignment algorithm. Each consumer receives its assigned partitions. All consumers pause during eager rebalance." },
      { icon: "📍", title: "Offset Fetch", subtitle: "Resume from last committed", desc: "Consumer fetches the last committed offset for each assigned partition from __consumer_offsets topic. If no committed offset exists, uses auto.offset.reset (earliest or latest)." },
      { icon: "📥", title: "Poll Loop", subtitle: "consumer.poll(duration)", desc: "Consumer enters the poll loop — continuously calls poll() to fetch batches of messages from assigned partitions. poll() also sends heartbeats to the coordinator to signal the consumer is alive." },
      { icon: "⚡", title: "Process Messages", subtitle: "Business logic executes", desc: "Your @KafkaListener method (or manual poll loop) processes each record. This is where your business logic runs — deserialize, validate, persist, publish events." },
      { icon: "💾", title: "Commit Offset", subtitle: "Mark progress", desc: "After successful processing, consumer commits the offset to __consumer_offsets. commitSync() blocks until confirmed. commitAsync() is non-blocking. This marks the message as processed." },
      { icon: "💓", title: "Heartbeat", subtitle: "session.timeout.ms", desc: "Consumer sends heartbeats every heartbeat.interval.ms (default 3s). If the coordinator doesn't receive a heartbeat within session.timeout.ms (default 10s), it marks the consumer as dead and triggers rebalance." },
      { icon: "❌", title: "Consumer Failure / Rebalance", subtitle: "Partition reassignment", desc: "If a consumer dies or leaves, the coordinator detects missed heartbeats and triggers rebalance. Surviving consumers take over the failed consumer's partitions, resuming from the last committed offset." },
    ]
  },
  {
    id: "http-request",
    label: "Spring Boot Request Lifecycle",
    icon: "🔗",
    color: "#818cf8",
    description: "What happens inside Spring Boot from the moment an HTTP request arrives to the response being sent.",
    steps: [
      { icon: "🌐", title: "HTTP Request Arrives", subtitle: "Embedded Tomcat", desc: "The HTTP request hits the embedded Tomcat server. Tomcat accepts the TCP connection, reads the HTTP headers and body, and creates a HttpServletRequest object." },
      { icon: "🔒", title: "Filter Chain", subtitle: "Spring Security", desc: "The request passes through the servlet filter chain. Spring Security's filters run here — JWT extraction, authentication, CORS handling, CSRF protection. If auth fails, 401 is returned immediately." },
      { icon: "📬", title: "DispatcherServlet", subtitle: "Front Controller", desc: "Spring's DispatcherServlet receives the request. It uses HandlerMapping to find the correct @RestController method based on URL and HTTP method." },
      { icon: "🔍", title: "Handler Interceptors", subtitle: "preHandle()", desc: "Registered HandlerInterceptors run preHandle() — used for logging, adding MDC correlation IDs for distributed tracing, and request timing." },
      { icon: "✅", title: "@Valid / Bean Validation", subtitle: "JSR-380", desc: "If the controller method has @Valid on a @RequestBody parameter, Spring validates the DTO against its constraints (@NotNull, @Size, etc.). Validation failure throws MethodArgumentNotValidException → 400." },
      { icon: "🎯", title: "@RestController Method", subtitle: "Business logic entry", desc: "Jackson deserializes the JSON request body into a Java DTO. The controller method executes — typically delegates to a @Service." },
      { icon: "💼", title: "@Service + @Transactional", subtitle: "Business logic", desc: "Business logic runs. @Transactional starts a DB transaction. All DB operations within this method are part of the same transaction — commit on success, rollback on unchecked exception." },
      { icon: "🗄️", title: "@Repository / JPA", subtitle: "Database access", desc: "Spring Data JPA translates method calls to SQL. HikariCP provides a connection from the pool. SQL executes against the database. Results are mapped back to entities." },
      { icon: "📤", title: "HTTP Response", subtitle: "Jackson serialization", desc: "The return value is serialized to JSON by Jackson. Spring sets the appropriate HTTP status code and headers. Tomcat sends the response back to the client." },
    ]
  },
  {
    id: "rest-api-flow",
    label: "REST API Full Flow",
    icon: "🌐",
    color: "#38bdf8",
    description: "End-to-end journey of an HTTP request — from the client through API Gateway, Load Balancer, Spring Boot internals, all the way to the database and back.",
    steps: [
      { icon: "📱", title: "Client Request", subtitle: "HTTP over TCP/TLS", desc: "User triggers an action. A REST HTTP request is dispatched over the network, establishing a TCP/TLS connection and transmitting a JSON payload with necessary HTTP headers.\n\nExample: POST /api/orders\n{ \"itemId\": 123 }" },
      { icon: "🛡️", title: "API Gateway & WAF", subtitle: "Edge security + routing", desc: "Intercepts the request at the network edge. Performs SSL termination, enforces rate-limiting, applies WAF security rules against common exploits (OWASP Top 10), and routes traffic internally.\n\nExample: AWS API Gateway blocks the request if the user exceeds 100 requests/minute." },
      { icon: "⚖️", title: "Load Balancer", subtitle: "Round Robin / health checks", desc: "Distributes incoming traffic across healthy microservice instances using algorithms like Round Robin, utilizing continuous health checks to avoid routing to failing nodes.\n\nExample: AWS ALB routes your request to Server B because Server A currently has high CPU usage." },
      { icon: "🔐", title: "Auth & Security", subtitle: "JWT validation + SecurityContext", desc: "The request hits the Spring Security Filter Chain. The JWT token is intercepted, parsed, and cryptographically verified. Authorities are extracted into the SecurityContextHolder.\n\nExample: Extracts 'Authorization: Bearer eyJhb...' and verifies the user has the 'ROLE_USER' authority." },
      { icon: "🎯", title: "Controller", subtitle: "DispatcherServlet + Jackson", desc: "The DispatcherServlet maps the URL to a specific @RestController. Spring's HttpMessageConverter (Jackson) automatically deserializes the JSON payload into a Java DTO.\n\nExample: @PostMapping(\"/orders\") public ResponseEntity<Order> createOrder(@RequestBody OrderDTO dto)" },
      { icon: "✅", title: "Validation", subtitle: "JSR-380 Bean Validation", desc: "JSR-380 Bean Validation kicks in. If the DTO violates constraints, a MethodArgumentNotValidException is thrown, instantly returning a 400 Bad Request before wasting deeper resources.\n\nExample: @NotNull on 'itemId' throws an exception immediately if the field is missing." },
      { icon: "💼", title: "Service Layer", subtitle: "@Service + @Transactional", desc: "The core business logic executes inside a @Service component. A database transaction is started via @Transactional, ensuring all data mutations succeed or fail together as a single atomic unit." },
      { icon: "📊", title: "Logging & Monitoring", subtitle: "MDC + Actuator metrics", desc: "Trace IDs and Correlation IDs are added to the Mapped Diagnostic Context (MDC) for distributed tracing (ELK stack), while Actuator metrics track request latency.\n\nExample: log.info(\"Processing order for user: {}\", userId);" },
      { icon: "⚡", title: "Cache", subtitle: "Redis cache check", desc: "Before querying the primary database, the service checks an in-memory cache (like Redis). A cache hit returns data instantly, drastically reducing database load." },
      { icon: "📨", title: "Kafka / Event Bus", subtitle: "Async fire-and-forget", desc: "To keep the HTTP response fast, heavy secondary tasks (like sending emails or updating analytics) are pushed to an asynchronous message broker as fire-and-forget events.\n\nExample: kafkaTemplate.send(\"order-events\", new OrderPlacedEvent(orderId));" },
      { icon: "🗄️", title: "Repository Layer", subtitle: "Spring Data JPA + HikariCP", desc: "Spring Data JPA abstracts the database interaction. The EntityManager manages the entity lifecycle, converting Java method calls into optimized SQL queries utilizing a HikariCP connection pool.\n\nExample: orderRepository.save(order); // translates to 'INSERT INTO orders ...'" },
      { icon: "💾", title: "Database Commit", subtitle: "ACID transaction commit", desc: "The database successfully writes data to disk. The ACID transaction commits, releasing row-level locks. If an unchecked exception occurred earlier, a rollback is triggered instead.\n\nExample: PostgreSQL permanently writes the new order record to the disk." },
      { icon: "📤", title: "HTTP Response", subtitle: "JSON serialization + status code", desc: "The backend constructs a Response DTO, serializes it back into JSON, and attaches the appropriate HTTP status code. The payload traverses back through the network layers to the client.\n\nExample: HTTP 201 Created\n{ \"orderId\": 456, \"status\": \"SUCCESS\" }" },
    ]
  },
  {
    id: "spring-annotations",
    label: "Spring Boot Annotations",
    icon: "🏷️",
    color: "#fb923c",
    description: "Every major Spring Boot annotation in the order it comes into play — from startup to shutdown.",
    steps: [
      {
        icon: "🚀", title: "@SpringBootApplication", subtitle: "App entry point",
        desc: "The one annotation that starts everything.\n\nIt does 3 things at once:\n→ Scans your package for beans\n→ Enables auto-configuration\n→ Marks this class as config\n\n📌 Put it on your main class. That's it."
      },
      {
        icon: "⚙️", title: "@Configuration + @Bean", subtitle: "Define beans manually",
        desc: "@Configuration = this class creates beans.\n@Bean = this method's return value is a bean.\n\nUse when you need to create a 3rd-party object (like ObjectMapper, RestTemplate) that you can't annotate yourself.\n\n📌 Example:\n@Bean\npublic ObjectMapper mapper() {\n  return new ObjectMapper();\n}"
      },
      {
        icon: "📦", title: "@Component / @Service / @Repository", subtitle: "Auto-detected beans",
        desc: "These tell Spring: 'manage this class as a bean.'\n\n@Component → generic (utility classes)\n@Service → business logic\n@Repository → database access (also converts SQL errors to Spring errors)\n\n📌 All 3 do the same thing. The name just tells other devs what the class is for."
      },
      {
        icon: "🌐", title: "@RestController", subtitle: "Handle HTTP requests",
        desc: "Marks a class as a REST API controller.\n\nShortcut for @Controller + @ResponseBody.\nEvery method automatically returns JSON — no extra annotation needed.\n\n📌 Use @Controller only if you're returning HTML views.\nUse @RestController for all REST APIs."
      },
      {
        icon: "💉", title: "@Autowired / @Qualifier / @Primary", subtitle: "Inject dependencies",
        desc: "@Autowired → Spring finds the matching bean and injects it.\n@Qualifier(\"name\") → when 2 beans of same type exist, pick this one.\n@Primary → when 2 beans of same type exist, use this one by default.\n\n📌 Prefer constructor injection over @Autowired on fields — easier to test."
      },
      {
        icon: "🌍", title: "@Value / @ConfigurationProperties", subtitle: "Read config values",
        desc: "@Value(\"${app.name}\") → inject one property from application.properties.\n@ConfigurationProperties(prefix=\"app\") → inject a whole group of properties into a class.\n\n📌 Use @Value for 1-2 values.\nUse @ConfigurationProperties when you have 5+ related settings."
      },
      {
        icon: "🗺️", title: "@GetMapping / @PostMapping / @PutMapping...", subtitle: "Map URLs to methods",
        desc: "These map HTTP requests to your methods.\n\n@GetMapping(\"/users\") → handles GET /users\n@PostMapping(\"/users\") → handles POST /users\n@PutMapping(\"/users/{id}\") → handles PUT /users/42\n@DeleteMapping(\"/users/{id}\") → handles DELETE /users/42\n@PatchMapping → partial update\n\n📌 @RequestMapping is the parent — the others are shortcuts."
      },
      {
        icon: "📥", title: "@PathVariable / @RequestParam / @RequestBody", subtitle: "Get data from the request",
        desc: "@PathVariable → from the URL: /users/{id} → id=42\n@RequestParam → from query string: /users?page=2 → page=2\n@RequestBody → from JSON body → maps to a Java object\n\n📌 Quick rule:\nURL path → @PathVariable\nQuery string → @RequestParam\nJSON body → @RequestBody"
      },
      {
        icon: "✅", title: "@Valid / @NotNull / @Size", subtitle: "Validate input",
        desc: "@Valid on a @RequestBody triggers validation.\nAnnotations on the DTO fields define the rules:\n\n@NotNull → field must not be null\n@NotBlank → string must not be empty\n@Size(min=2, max=50) → string length\n@Min / @Max → number range\n@Email → valid email format\n\n📌 If validation fails, Spring auto-returns 400 Bad Request. No if-checks needed."
      },
      {
        icon: "🔒", title: "@EnableWebSecurity / @PreAuthorize", subtitle: "Security",
        desc: "@EnableWebSecurity → turns on Spring Security.\n@PreAuthorize(\"hasRole('ADMIN')\") → only admins can call this method.\n@Secured({\"ROLE_USER\"}) → simpler version of @PreAuthorize.\n\n📌 @PreAuthorize is more flexible — supports SpEL expressions.\nNeeds @EnableMethodSecurity on your config class."
      },
      {
        icon: "🔄", title: "@Transactional", subtitle: "Database transactions",
        desc: "Wraps a method in a DB transaction.\n→ If method succeeds → commit\n→ If RuntimeException → rollback\n\nKey options:\nreadOnly=true → faster reads, no writes\nrollbackFor=Exception.class → also rollback on checked exceptions\npropagation=REQUIRES_NEW → always start a fresh transaction\n\n📌 Put it on service methods, not repository methods."
      },
      {
        icon: "⚡", title: "@Cacheable / @CacheEvict / @CachePut", subtitle: "Caching",
        desc: "@Cacheable(\"products\") → first call hits DB, result stored in cache. Next calls return from cache.\n@CacheEvict(\"products\") → remove from cache (call on update/delete).\n@CachePut → always run method AND update cache.\n\n📌 Add @EnableCaching to your main class to activate.\nWorks with Redis, Caffeine, etc."
      },
      {
        icon: "📅", title: "@Scheduled / @Async", subtitle: "Background tasks",
        desc: "@Scheduled(fixedRate=5000) → run every 5 seconds.\n@Scheduled(cron=\"0 9 * * MON-FRI\") → run at 9AM weekdays.\n@Async → run this method in a background thread.\n\n📌 Add @EnableScheduling for @Scheduled.\nAdd @EnableAsync for @Async.\nReturn CompletableFuture<T> from @Async methods."
      },
      {
        icon: "🧪", title: "@SpringBootTest / @MockBean / @WebMvcTest", subtitle: "Testing",
        desc: "@SpringBootTest → loads full app context. Use for integration tests.\n@WebMvcTest → loads only the web layer. Fast controller tests.\n@DataJpaTest → loads only JPA. Fast repo tests.\n@MockBean → replace a real bean with a mock in tests.\n\n📌 Use @WebMvcTest + @MockBean for controller unit tests.\nUse @SpringBootTest for end-to-end tests."
      },
      {
        icon: "🔴", title: "@PostConstruct / @PreDestroy", subtitle: "Init & cleanup",
        desc: "@PostConstruct → runs after the bean is created and all dependencies are injected. Use to set up connections, load data.\n\n@PreDestroy → runs just before the bean is destroyed (app shutdown). Use to close connections, flush caches.\n\n📌 These are the right place for setup/teardown logic — not constructors."
      },
    ]
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function LifecycleDiagram({ onBack }) {
  const [active, setActive]         = useState(lifecycles[0]);
  const [activeStep, setActiveStep] = useState(null);
  const [autoPlay, setAutoPlay]     = useState(false);
  const [playIdx, setPlayIdx]       = useState(0);

  // Auto-play: advance one step every 1.8s
  useState(() => {
    if (!autoPlay) return;
    const t = setInterval(() => {
      setPlayIdx(i => {
        const next = i + 1;
        if (next >= active.steps.length) { setAutoPlay(false); return i; }
        setActiveStep(active.steps[next]);
        return next;
      });
    }, 1800);
    return () => clearInterval(t);
  });

  const startAutoPlay = () => {
    setActiveStep(active.steps[0]);
    setPlayIdx(0);
    setAutoPlay(true);
  };

  return (
    <div className="max-w-5xl mx-auto w-full pb-8 px-4 sm:px-6">
      {/* Back */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm font-semibold text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition-colors bg-panel px-4 py-2 rounded-full border border-[color:var(--lux-border)] hover:border-[color:var(--lux-gold)] w-max"
      >
        ← All Categories
      </button>

      {/* Title */}
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-2">
          Lifecycle Diagrams
        </h3>
        <p className="theme-muted text-sm">
          Step-by-step visual flows. Click any step for a detailed explanation.
        </p>
      </div>

      {/* Lifecycle tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {lifecycles.map(lc => (
          <button
            key={lc.id}
            onClick={() => { setActive(lc); setActiveStep(null); setAutoPlay(false); }}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
              active.id === lc.id
                ? "border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_12%,transparent)] text-[color:var(--lux-gold)]"
                : "border-[color:var(--lux-border)] bg-panel text-[color:var(--lux-muted)] hover:border-[color:var(--lux-border-strong)]"
            }`}
          >
            <span>{lc.icon}</span> {lc.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p className="text-xs text-[color:var(--lux-muted)] mb-6">{active.description}</p>

      {/* Steps flow */}
      <div className="flex flex-col gap-0">
        {active.steps.map((step, i) => {
          const isActive = activeStep?.title === step.title;
          return (
            <div key={step.title} className="flex gap-4">
              {/* Left: connector line + number */}
              <div className="flex flex-col items-center">
                <motion.div
                  onClick={() => setActiveStep(isActive ? null : step)}
                  whileHover={{ scale: 1.1 }}
                  className={`flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-base transition-all duration-200 ${
                    isActive
                      ? "border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_15%,transparent)] shadow-glow"
                      : "border-[color:var(--lux-border)] bg-panel hover:border-[color:var(--lux-gold)]"
                  }`}
                >
                  {step.icon}
                </motion.div>
                {i < active.steps.length - 1 && (
                  <div className="w-0.5 flex-1 my-1" style={{ background: `linear-gradient(to bottom, ${active.color}55, ${active.color}11)` }} />
                )}
              </div>

              {/* Right: content */}
              <div className="flex-1 pb-4">
                <button
                  onClick={() => setActiveStep(isActive ? null : step)}
                  className="w-full text-left"
                >
                  <div className={`rounded-xl border p-4 transition-all duration-200 ${
                    isActive
                      ? "border-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_5%,transparent)]"
                      : "border-[color:var(--lux-border)] bg-panel hover:border-[color:var(--lux-border-strong)]"
                  }`}>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className={`text-sm font-bold ${isActive ? "text-[color:var(--lux-gold)]" : "theme-text"}`}>
                          {i + 1}. {step.title}
                        </p>
                        <p className="text-xs text-[color:var(--lux-muted)] mt-0.5 font-mono">{step.subtitle}</p>
                      </div>
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform duration-200 text-[color:var(--lux-muted)] ${isActive ? "rotate-90 text-[color:var(--lux-gold)]" : ""}`}
                      />
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-sm leading-relaxed text-[color:var(--lux-muted)] border-t border-[color:var(--lux-border)] pt-3">
                            {step.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <p className="mt-4 text-center text-xs text-[color:var(--lux-muted)] opacity-60">
        Click any step to expand · Use "Walk through" to animate the full flow
      </p>
    </div>
  );
}
