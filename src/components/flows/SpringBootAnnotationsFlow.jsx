import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Settings, Package, Layers, Globe, Database, Shield, Zap, CheckCircle, Tag, Lock } from "lucide-react";
import MermaidDiagram from "../MermaidDiagram";

const annotationsFlow = {
  id: "spring-boot-annotations",
  title: "Spring Boot Annotations Flow",
  description: "Every important Spring Boot annotation — organized by the sequence they are used, from app startup to request handling to data access.",
  color: "#6db33f",
  steps: [
    {
      id: 1,
      icon: Play,
      title: "Application Bootstrap",
      subtitle: "@SpringBootApplication · @EnableAutoConfiguration · @ComponentScan · @Configuration",
      visual: "🚀🌱⚙️",
      diagram: `flowchart LR
  A["@SpringBootApplication"] --> B["@Configuration\nMarks config class"]
  A --> C["@EnableAutoConfiguration\nAuto-wires classpath beans"]
  A --> D["@ComponentScan\nScans current package"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#3b82f6,color:#fff,stroke:#2563eb`,
      description: "@SpringBootApplication is a shortcut for three annotations combined. @Configuration tells Spring this class defines beans. @EnableAutoConfiguration tells Spring to auto-configure based on what's on the classpath. @ComponentScan tells Spring to scan the current package and sub-packages for components.",
      analogy: "🏗️ Like the master key to a building. One annotation unlocks everything — configuration, auto-setup, and component discovery all at once.",
      example: "@SpringBootApplication  // = @Configuration + @EnableAutoConfiguration + @ComponentScan\npublic class MyApp {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApp.class, args);\n    }\n}\n\n// Customize scan:\n@SpringBootApplication(scanBasePackages = \"com.myapp\")"
    },
    {
      id: 2,
      icon: Package,
      title: "Bean & Component Registration",
      subtitle: "@Component · @Service · @Repository · @Controller · @RestController · @Bean",
      visual: "📦🔵🟢🟡",
      diagram: `flowchart LR
  A["@Component\nGeneric bean"] --> E["Spring\nContainer"]
  B["@Service\nBusiness logic"] --> E
  C["@Repository\nData access"] --> E
  D["@Controller\nWeb layer"] --> E
  F["@RestController\n= @Controller\n+ @ResponseBody"] --> E
  G["@Bean\nMethod-level\nbean definition"] --> E
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#ef4444,color:#fff,stroke:#dc2626
  style F fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style G fill:#6db33f,color:#fff,stroke:#5a9e34
  style E fill:#1e293b,color:#94a3b8,stroke:#38bdf8`,
      description: "@Component is the generic stereotype. @Service, @Repository, @Controller are specializations — functionally the same but convey intent. @Repository also adds exception translation (converts DB exceptions to Spring's DataAccessException). @RestController = @Controller + @ResponseBody on every method. @Bean is used inside @Configuration classes to manually define beans.",
      analogy: "🏢 Like job titles in a company. Everyone is an Employee (@Component), but some are Engineers (@Service), some are DBAs (@Repository), some are Front Desk (@Controller). Same person, different role label.",
      example: "@Service\npublic class OrderService { }       // business logic\n\n@Repository\npublic class OrderRepository { }    // data access + exception translation\n\n@RestController\npublic class OrderController { }    // REST endpoints\n\n@Configuration\npublic class AppConfig {\n    @Bean\n    public RestTemplate restTemplate() {\n        return new RestTemplate();      // manual bean\n    }\n}"
    },
    {
      id: 3,
      icon: Settings,
      title: "Dependency Injection",
      subtitle: "@Autowired · @Qualifier · @Primary · @Lazy · @Scope",
      visual: "🔗💉🎯",
      diagram: `flowchart LR
  A["@Autowired - Inject by type"] --> B{Multiple beans?}
  B -->|Yes| C["@Qualifier - Inject by name"]
  B -->|One marked| D["@Primary - Preferred bean"]
  B -->|No| E["Inject directly"]
  F["@Scope\nprototype/singleton\nrequest/session"] --> G["Bean lifecycle"]
  H["@Lazy\nCreate only\nwhen needed"] --> G
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#3b82f6,color:#fff,stroke:#2563eb
  style E fill:#10b981,color:#fff,stroke:#059669
  style F fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style G fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style H fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "@Autowired injects a bean by type. If multiple beans of the same type exist, use @Qualifier('beanName') to pick one, or mark one with @Primary as the default. @Scope controls bean lifecycle: singleton (default, one per context), prototype (new instance each time), request/session (web scopes). @Lazy delays bean creation until first use.",
      analogy: "🔌 Like plugging in appliances. @Autowired finds the right socket. @Qualifier says 'use this specific socket'. @Primary marks the default socket. @Scope decides if you get a shared outlet or a personal one.",
      example: "@Autowired\nprivate PaymentService paymentService; // inject by type\n\n// Multiple implementations:\n@Autowired\n@Qualifier(\"stripePayment\")  // pick specific one\nprivate PaymentService paymentService;\n\n@Primary  // default when no @Qualifier\n@Service\npublic class StripePaymentService implements PaymentService {}\n\n@Scope(\"prototype\")  // new instance every time\n@Component\npublic class ReportGenerator {}"
    },
    {
      id: 4,
      icon: Tag,
      title: "Configuration & Properties",
      subtitle: "@Value · @ConfigurationProperties · @Profile · @Conditional · @PropertySource",
      visual: "⚙️📄🔧",
      diagram: `flowchart LR
  A["application.yml\napplication.properties"] --> B["@Value\nSingle property"]
  A --> C["@ConfigurationProperties\nGroup of properties"]
  D["@Profile\ndev/prod/test"] --> E["Active profile\nloads matching beans"]
  F["@Conditional\nConditionalOnClass\nConditionalOnProperty"] --> G["Bean created\nonly if condition met"]
  style A fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#6db33f,color:#fff,stroke:#5a9e34
  style D fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style E fill:#10b981,color:#fff,stroke:#059669
  style F fill:#3b82f6,color:#fff,stroke:#2563eb
  style G fill:#10b981,color:#fff,stroke:#059669`,
      description: "@Value injects a single property value. @ConfigurationProperties binds a whole group of properties to a POJO — much cleaner for related configs. @Profile activates beans only for specific environments (dev, prod, test). @Conditional and its variants (@ConditionalOnClass, @ConditionalOnProperty, @ConditionalOnMissingBean) create beans only when conditions are met — this is how auto-configuration works.",
      analogy: "📋 Like environment-specific settings. @Value is copy-pasting one line. @ConfigurationProperties is importing a whole settings file. @Profile is having separate config files for office vs home.",
      example: "// Single value:\n@Value(\"${app.timeout:5000}\")  // default 5000\nprivate int timeout;\n\n// Group of properties:\n@ConfigurationProperties(prefix = \"app.db\")\npublic class DbConfig {\n    private String host;\n    private int port;\n    private String name;\n}\n// maps: app.db.host, app.db.port, app.db.name\n\n// Profile-specific bean:\n@Profile(\"prod\")\n@Bean\npublic DataSource prodDataSource() { ... }\n\n@Profile(\"dev\")\n@Bean\npublic DataSource h2DataSource() { ... }"
    },
    {
      id: 5,
      icon: Globe,
      title: "REST Controller & Request Mapping",
      subtitle: "@RequestMapping · @GetMapping · @PostMapping · @PutMapping · @DeleteMapping · @PatchMapping",
      visual: "🌐🗺️📡",
      diagram: `flowchart LR
  A["@RequestMapping\nBase path on class"] --> B["All methods\ninherit base path"]
  B --> C["@GetMapping\nHTTP GET"]
  B --> D["@PostMapping\nHTTP POST"]
  B --> E["@PutMapping\nHTTP PUT"]
  B --> F["@DeleteMapping\nHTTP DELETE"]
  B --> G["@PatchMapping\nHTTP PATCH"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#3b82f6,color:#fff,stroke:#2563eb
  style E fill:#f59e0b,color:#1e293b,stroke:#d97706
  style F fill:#ef4444,color:#fff,stroke:#dc2626
  style G fill:#8b5cf6,color:#fff,stroke:#7c3aed`,
      description: "@RequestMapping on the class sets the base URL path. Method-level annotations (@GetMapping, @PostMapping, etc.) are shortcuts for @RequestMapping(method=GET/POST/...). They map HTTP methods to handler methods. All are composable — class-level path + method-level path combine automatically.",
      analogy: "🏢 Like a building directory. @RequestMapping is the building address (/api/orders). Each floor annotation (@GetMapping, @PostMapping) is a specific room in that building.",
      example: "@RestController\n@RequestMapping(\"/api/orders\")  // base path\npublic class OrderController {\n\n    @GetMapping            // GET /api/orders\n    public List<Order> getAll() { ... }\n\n    @GetMapping(\"/{id}\")   // GET /api/orders/123\n    public Order getById(@PathVariable Long id) { ... }\n\n    @PostMapping           // POST /api/orders\n    public Order create(@RequestBody Order order) { ... }\n\n    @PutMapping(\"/{id}\")   // PUT /api/orders/123\n    public Order update(@PathVariable Long id, @RequestBody Order order) { ... }\n\n    @DeleteMapping(\"/{id}\") // DELETE /api/orders/123\n    public void delete(@PathVariable Long id) { ... }\n}"
    },
    {
      id: 6,
      icon: Layers,
      title: "Request Data Extraction",
      subtitle: "@PathVariable · @RequestParam · @RequestBody · @RequestHeader · @CookieValue · @ModelAttribute",
      visual: "📥🔍📋",
      diagram: `flowchart LR
  A["HTTP Request"] --> B["@PathVariable\n/orders/{id}"]
  A --> C["@RequestParam\n?page=1&size=10"]
  A --> D["@RequestBody\nJSON body to Object"]
  A --> E["@RequestHeader\nAuthorization header"]
  A --> F["@CookieValue\nCookie value"]
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style E fill:#6db33f,color:#fff,stroke:#5a9e34
  style F fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "@PathVariable extracts values from the URL path. @RequestParam extracts query parameters. @RequestBody deserializes the JSON request body into a Java object (uses Jackson). @RequestHeader extracts a specific HTTP header value. @CookieValue extracts a cookie. All support required=false and defaultValue for optional parameters.",
      analogy: "📬 Like sorting incoming mail. @PathVariable reads the address on the envelope. @RequestParam reads sticky notes attached. @RequestBody opens the envelope and reads the letter inside. @RequestHeader reads the postmark.",
      example: "// GET /api/orders/123?page=1\n@GetMapping(\"/api/orders/{id}\")\npublic Order get(\n    @PathVariable Long id,              // from URL path\n    @RequestParam(defaultValue=\"0\") int page,  // from query string\n    @RequestHeader(\"Authorization\") String token  // from header\n) { ... }\n\n// POST /api/orders  {\"item\":\"book\",\"qty\":2}\n@PostMapping(\"/api/orders\")\npublic Order create(\n    @RequestBody OrderRequest request   // JSON body → object\n) { ... }"
    },
    {
      id: 7,
      icon: CheckCircle,
      title: "Response Handling",
      subtitle: "@ResponseBody · @ResponseStatus · ResponseEntity · @RestControllerAdvice · @ExceptionHandler",
      visual: "📤✅🔴",
      diagram: `flowchart LR
  A["Controller\nMethod"] --> B["@ResponseBody\nObject to JSON"]
  A --> C["@ResponseStatus\nSet HTTP status code"]
  A --> D["ResponseEntity\nFull control: status\n+ headers + body"]
  E["@RestControllerAdvice\nGlobal exception handler"] --> F["@ExceptionHandler\nHandle specific exception"]
  F --> G["Error Response\nJSON"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#3b82f6,color:#fff,stroke:#2563eb
  style E fill:#ef4444,color:#fff,stroke:#dc2626
  style F fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style G fill:#1e293b,color:#94a3b8,stroke:#38bdf8`,
      description: "@ResponseBody serializes the return value to JSON (included in @RestController). @ResponseStatus sets the HTTP status code on the response. ResponseEntity gives full control over status, headers, and body. @RestControllerAdvice + @ExceptionHandler handle exceptions globally across all controllers — the clean way to return error responses.",
      analogy: "📮 Like a post office. @ResponseBody puts your letter in an envelope. @ResponseStatus stamps it with priority/standard. ResponseEntity lets you choose the envelope, stamp, and add extra labels. @RestControllerAdvice is the returns department — handles all failed deliveries.",
      example: "// Simple response:\n@GetMapping(\"/orders/{id}\")\n@ResponseStatus(HttpStatus.OK)  // explicit 200\npublic Order getOrder(@PathVariable Long id) { ... }\n\n// Full control:\n@PostMapping(\"/orders\")\npublic ResponseEntity<Order> create(@RequestBody Order order) {\n    Order saved = service.save(order);\n    return ResponseEntity.status(201)\n        .header(\"Location\", \"/orders/\" + saved.getId())\n        .body(saved);\n}\n\n// Global error handler:\n@RestControllerAdvice\npublic class GlobalExceptionHandler {\n    @ExceptionHandler(OrderNotFoundException.class)\n    @ResponseStatus(HttpStatus.NOT_FOUND)\n    public ErrorResponse handleNotFound(OrderNotFoundException ex) {\n        return new ErrorResponse(ex.getMessage());\n    }\n}"
    },
    {
      id: 8,
      icon: Database,
      title: "Data Access & JPA",
      subtitle: "@Entity · @Table · @Id · @GeneratedValue · @Column · @OneToMany · @ManyToOne · @Transactional",
      visual: "🗄️📊🔑",
      diagram: `flowchart LR
  A["@Entity\nMaps class to DB table"] --> B["@Table\nCustom table name"]
  A --> C["@Id\nPrimary key"]
  C --> D["@GeneratedValue\nAuto-increment"]
  A --> E["@Column\nCustom column config"]
  A --> F["@OneToMany\n@ManyToOne\n@ManyToMany\nRelationships"]
  G["@Transactional\nWraps in DB transaction"] --> H["Commit on success\nRollback on exception"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#f59e0b,color:#1e293b,stroke:#d97706
  style E fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style F fill:#10b981,color:#fff,stroke:#059669
  style G fill:#ef4444,color:#fff,stroke:#dc2626
  style H fill:#1e293b,color:#94a3b8,stroke:#38bdf8`,
      description: "@Entity marks a class as a JPA entity (maps to a DB table). @Table customizes the table name. @Id marks the primary key. @GeneratedValue auto-generates the ID (IDENTITY, SEQUENCE, AUTO). @Column customizes column name, nullable, length. Relationship annotations (@OneToMany, @ManyToOne, @ManyToMany, @OneToOne) define foreign key relationships. @Transactional wraps the method in a DB transaction — commits on success, rolls back on RuntimeException.",
      analogy: "🗂️ Like a filing system. @Entity is the folder label. @Id is the unique file number. @Column is how each page is formatted. @OneToMany is a folder containing sub-folders. @Transactional is the 'save all or save nothing' rule.",
      example: "@Entity\n@Table(name = \"orders\")\npublic class Order {\n\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(name = \"order_date\", nullable = false)\n    private LocalDate orderDate;\n\n    @ManyToOne\n    @JoinColumn(name = \"customer_id\")\n    private Customer customer;\n\n    @OneToMany(mappedBy = \"order\", cascade = CascadeType.ALL)\n    private List<OrderItem> items;\n}\n\n@Service\npublic class OrderService {\n    @Transactional  // commit or rollback\n    public Order createOrder(Order order) {\n        return repository.save(order);\n    }\n}"
    },
    {
      id: 9,
      icon: Shield,
      title: "Security",
      subtitle: "@EnableWebSecurity · @PreAuthorize · @PostAuthorize · @Secured · @RolesAllowed",
      visual: "🔐🛡️👮",
      diagram: `flowchart LR
  A["@EnableWebSecurity\nActivate Spring Security"] --> B["SecurityFilterChain\nconfigured"]
  C["Incoming Request"] --> D["@PreAuthorize\nCheck BEFORE method runs"]
  D -->|Authorized| E["Method executes"]
  D -->|Denied| F["403 Forbidden"]
  E --> G["@PostAuthorize\nCheck AFTER method runs"]
  H["@Secured\nRole-based access"] --> E
  style A fill:#ef4444,color:#fff,stroke:#dc2626
  style B fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style E fill:#10b981,color:#fff,stroke:#059669
  style F fill:#ef4444,color:#fff,stroke:#dc2626
  style G fill:#f59e0b,color:#1e293b,stroke:#d97706
  style H fill:#6db33f,color:#fff,stroke:#5a9e34`,
      description: "@EnableWebSecurity activates Spring Security. @PreAuthorize checks authorization before the method runs — supports SpEL expressions like hasRole('ADMIN') or #userId == authentication.id. @PostAuthorize checks after the method runs (useful for checking returned data). @Secured is simpler — just role names. Enable method security with @EnableMethodSecurity on your config class.",
      analogy: "🏢 Like building security. @EnableWebSecurity installs the security system. @PreAuthorize is the door guard — checks your badge before you enter. @PostAuthorize is the exit check — verifies what you're taking out.",
      example: "@Configuration\n@EnableWebSecurity\n@EnableMethodSecurity  // enables @PreAuthorize\npublic class SecurityConfig { ... }\n\n// Method-level security:\n@PreAuthorize(\"hasRole('ADMIN')\")\npublic void deleteUser(Long id) { ... }\n\n@PreAuthorize(\"#userId == authentication.principal.id\")\npublic User getUser(Long userId) { ... }  // user can only get their own data\n\n@PostAuthorize(\"returnObject.owner == authentication.name\")\npublic Document getDocument(Long id) { ... }\n\n@Secured(\"ROLE_ADMIN\")  // simpler, role only\npublic void adminAction() { ... }"
    },
    {
      id: 10,
      icon: Zap,
      title: "Async, Scheduling & Caching",
      subtitle: "@Async · @Scheduled · @EnableAsync · @EnableScheduling · @Cacheable · @CacheEvict · @EnableCaching",
      visual: "⚡⏰💾",
      diagram: `flowchart LR
  A["@EnableAsync"] --> B["@Async\nRun in separate thread\nreturns Future"]
  C["@EnableScheduling"] --> D["@Scheduled\nfixedRate / cron\nfixedDelay"]
  E["@EnableCaching"] --> F["@Cacheable\nCache result"]
  E --> G["@CacheEvict\nRemove from cache"]
  E --> H["@CachePut\nUpdate cache"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#f59e0b,color:#1e293b,stroke:#d97706
  style E fill:#3b82f6,color:#fff,stroke:#2563eb
  style F fill:#10b981,color:#fff,stroke:#059669
  style G fill:#ef4444,color:#fff,stroke:#dc2626
  style H fill:#8b5cf6,color:#fff,stroke:#7c3aed`,
      description: "@Async runs a method in a background thread — must enable with @EnableAsync. Returns void or Future/CompletableFuture. @Scheduled runs methods on a schedule — fixedRate (every N ms), fixedDelay (N ms after last run), cron (cron expression). @Cacheable caches the return value — on next call with same args, returns cached result without executing the method. @CacheEvict removes entries from cache. @CachePut always executes and updates cache.",
      analogy: "⚡ @Async is like sending a letter instead of waiting on hold. @Scheduled is like a recurring calendar reminder. @Cacheable is like remembering an answer so you don't have to look it up again.",
      example: "// Async:\n@EnableAsync  // on @Configuration class\n\n@Async\npublic CompletableFuture<String> sendEmail(String to) {\n    // runs in background thread\n    emailClient.send(to);\n    return CompletableFuture.completedFuture(\"sent\");\n}\n\n// Scheduling:\n@EnableScheduling  // on @Configuration class\n\n@Scheduled(fixedRate = 60000)       // every 60s\n@Scheduled(cron = \"0 0 9 * * MON\") // every Monday 9am\npublic void generateReport() { ... }\n\n// Caching:\n@EnableCaching  // on @Configuration class\n\n@Cacheable(value = \"users\", key = \"#id\")\npublic User getUser(Long id) { ... }  // cached after first call\n\n@CacheEvict(value = \"users\", key = \"#id\")\npublic void deleteUser(Long id) { ... }  // removes from cache"
    },
    {
      id: 11,
      icon: Lock,
      title: "Validation",
      subtitle: "@Valid · @Validated · @NotNull · @NotBlank · @Size · @Min · @Max · @Email · @Pattern",
      visual: "✅❌🔍",
      diagram: `flowchart LR
  A["Request Body\nor Method Param"] --> B["@Valid or @Validated\nTrigger validation"]
  B --> C{Constraints pass?}
  C -->|All pass| D["Method executes"]
  C -->|Fails| E["MethodArgumentNotValidException\n400 Bad Request"]
  F["@NotNull @NotBlank\n@Size @Min @Max\n@Email @Pattern"] --> B
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#6db33f,color:#fff,stroke:#5a9e34
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626
  style F fill:#f59e0b,color:#1e293b,stroke:#d97706`,
      description: "@Valid and @Validated trigger Bean Validation on method parameters or request bodies. Constraint annotations define the rules: @NotNull (not null), @NotBlank (not null and not empty string), @Size (min/max length), @Min/@Max (numeric range), @Email (valid email format), @Pattern (regex). On failure, Spring throws MethodArgumentNotValidException which returns 400 Bad Request.",
      analogy: "🔍 Like a form validator. @Valid is the 'submit' button that triggers all checks. @NotBlank is the 'required field' marker. @Email is the format checker. If anything fails, the form is rejected before it reaches the server logic.",
      example: "// DTO with constraints:\npublic class CreateUserRequest {\n    @NotBlank(message = \"Name is required\")\n    @Size(min = 2, max = 50)\n    private String name;\n\n    @Email(message = \"Invalid email\")\n    @NotNull\n    private String email;\n\n    @Min(18) @Max(120)\n    private int age;\n\n    @Pattern(regexp = \"^\\\\+?[0-9]{10,13}$\")\n    private String phone;\n}\n\n// Controller:\n@PostMapping(\"/users\")\npublic User create(@Valid @RequestBody CreateUserRequest req) {\n    // only reaches here if all validations pass\n}"
    },
    {
      id: 12,
      icon: Tag,
      title: "Lifecycle & Advanced",
      subtitle: "@PostConstruct · @PreDestroy · @EventListener · @ConditionalOnProperty · @Import · @Lookup",
      visual: "🔄🎯📌",
      diagram: `flowchart LR
  A["Bean Created"] --> B["@PostConstruct\nRun after injection\nbefore use"]
  C["App Shutting Down"] --> D["@PreDestroy\nCleanup before\nbean destroyed"]
  E["Application Event\npublished"] --> F["@EventListener\nReact to events"]
  G["@ConditionalOnProperty\nfeature.enabled=true"] --> H["Bean created\nonly if property set"]
  style A fill:#6db33f,color:#fff,stroke:#5a9e34
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#ef4444,color:#fff,stroke:#dc2626
  style D fill:#ef4444,color:#fff,stroke:#dc2626
  style E fill:#3b82f6,color:#fff,stroke:#2563eb
  style F fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style G fill:#f59e0b,color:#1e293b,stroke:#d97706
  style H fill:#10b981,color:#fff,stroke:#059669`,
      description: "@PostConstruct runs once after the bean is created and all dependencies are injected — use for initialization logic. @PreDestroy runs just before the bean is destroyed — use for cleanup (close connections, flush buffers). @EventListener listens for application events (built-in like ApplicationReadyEvent or custom events). @ConditionalOnProperty creates a bean only if a specific property is set to a specific value — great for feature flags.",
      analogy: "🔄 @PostConstruct is like setting up your desk on the first day. @PreDestroy is clearing your desk on the last day. @EventListener is like a notification subscription — you react when something happens.",
      example: "@Service\npublic class CacheService {\n\n    @PostConstruct\n    public void init() {\n        // runs after bean created\n        loadCacheFromDB();\n    }\n\n    @PreDestroy\n    public void cleanup() {\n        // runs before bean destroyed\n        cache.clear();\n    }\n}\n\n// Event listener:\n@EventListener(ApplicationReadyEvent.class)\npublic void onAppReady() {\n    System.out.println(\"App is ready!\");\n}\n\n// Feature flag:\n@ConditionalOnProperty(name = \"feature.newUI\", havingValue = \"true\")\n@Bean\npublic NewUIService newUIService() { ... }"
    }
  ]
};

export default function SpringBootAnnotationsFlow({ onBack }) {
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
      const total = annotationsFlow.steps.length;
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
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">{annotationsFlow.title}</h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">{annotationsFlow.description}</p>
      </div>
      <div className="relative flex flex-col items-center">
        {annotationsFlow.steps.map((step, idx) => {
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
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className={`text-base sm:text-lg font-display font-bold transition-colors ${isExpanded ? "text-[color:var(--lux-gold)]" : "theme-text"}`}>{step.id}. {step.title}</h4>
                          <span className="text-lg sm:text-xl">{step.visual}</span>
                        </div>
                        <p className="text-xs text-[color:var(--lux-muted)] font-mono truncate">{step.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className={`shrink-0 ml-2 transition-all duration-300 ${isExpanded ? "rotate-90 text-[color:var(--lux-gold)]" : "text-[color:var(--lux-muted)]"}`} />
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-4 sm:px-6 pb-6 pt-4 border-t border-[color:var(--lux-border)] space-y-4">
                          {/* Annotation tags */}
                          <div className="flex flex-wrap gap-2">
                            {step.subtitle.split(" · ").map(tag => (
                              <span key={tag} className="px-2 py-1 rounded-md text-xs font-mono font-bold bg-[color:color-mix(in_srgb,var(--lux-gold)_12%,transparent)] text-[color:var(--lux-gold)] border border-[color:color-mix(in_srgb,var(--lux-gold)_30%,transparent)]">
                                {tag}
                              </span>
                            ))}
                          </div>
                          {step.diagram && (
                            <div className="rounded-xl overflow-hidden border border-[color:var(--lux-border)] bg-[#0f172a] p-4">
                              <p className="text-xs font-bold text-[color:var(--lux-gold)] uppercase tracking-wider mb-3">📊 Flow Diagram</p>
                              <MermaidDiagram chart={step.diagram} />
                            </div>
                          )}
                          {step.analogy && (
                            <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
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
              {idx < annotationsFlow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${annotationsFlow.color}88, ${annotationsFlow.color}22)` }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${annotationsFlow.color}88` }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 space-y-2">
        <p className="text-center text-xs text-[color:var(--lux-muted)] opacity-60">Click any group to expand • Use keyboard to navigate</p>
        <div className="flex flex-wrap justify-center gap-3 text-[10px] text-[color:var(--lux-muted)]">
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">↑ ↓</kbd> Navigate</span>
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">Space</kbd> Expand/Collapse</span>
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">Esc</kbd> Close All</span>
        </div>
      </div>
    </div>
  );
}
