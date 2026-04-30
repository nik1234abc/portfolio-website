export const springBootInterview = {
  categories: ["Spring Boot"],
  questions: [
    {
      id: 1,
      category: "Spring Boot",
      question: "What is Spring Framework?",
      simpleAnswer: "Spring Framework is a comprehensive Java framework that provides infrastructure support for developing Java applications, focusing on dependency injection, aspect-oriented programming, and enterprise features.",
      explanation: "Spring simplifies Java development by handling common infrastructure concerns like transaction management, security, and data access. It promotes loose coupling through dependency injection and provides a lightweight container for managing application components.",
      example: "Instead of manually creating database connections and managing transactions, Spring handles these automatically, letting you focus on business logic.",
      followUps: [
        {
          question: "What are the main modules of Spring Framework?",
          answer: "Core Container (IoC, DI), Data Access/Integration, Web (MVC, REST), AOP, Aspects, Instrumentation, Messaging, and Test."
        }
      ],
      keyPoints: ["Dependency Injection", "Aspect-Oriented Programming", "Enterprise Integration", "Lightweight Container"]
    },
    {
      id: 2,
      category: "Spring Boot",
      question: "What problem does Spring solve?",
      simpleAnswer: "Spring solves the complexity of enterprise Java development by providing a simplified way to configure and wire application components, manage dependencies, and handle cross-cutting concerns.",
      explanation: "Traditional Java EE was heavy and required extensive XML configuration. Spring introduced POJO-based development, annotation-driven configuration, and automatic dependency resolution, making enterprise applications easier to build and maintain.",
      example: "Before Spring, configuring a simple web application required hundreds of lines of XML. Spring Boot reduces this to just a few annotations.",
      followUps: [
        {
          question: "How does Spring compare to Java EE?",
          answer: "Spring is lighter, more flexible, and doesn't require an application server, while Java EE provides standardized APIs but with more complexity."
        }
      ],
      keyPoints: ["Reduces boilerplate code", "Simplifies configuration", "Enables POJO-based development", "Handles cross-cutting concerns"]
    },
    {
      id: 3,
      category: "Spring Boot",
      question: "What is Dependency Injection (DI)?",
      simpleAnswer: "Dependency Injection is a design pattern where Spring automatically provides objects with their dependencies instead of the objects creating them themselves.",
      explanation: "Instead of a class instantiating its dependencies with 'new', Spring injects them through constructors, setters, or fields. This promotes loose coupling and makes code more testable and maintainable.",
      example: "A UserService needs a UserRepository. Instead of UserService creating 'new UserRepository()', Spring injects it automatically.",
      followUps: [
        {
          question: "What are the benefits of DI?",
          answer: "Loose coupling, easier testing (mock dependencies), better maintainability, and cleaner code."
        }
      ],
      keyPoints: ["Automatic dependency provision", "Loose coupling", "Constructor/setter/field injection", "Testability"]
    },
    {
      id: 4,
      category: "Spring Boot",
      question: "Types of DI in Spring?",
      simpleAnswer: "Spring supports three types of dependency injection: Constructor Injection, Setter Injection, and Field Injection.",
      explanation: "Constructor injection passes dependencies through the constructor. Setter injection uses setter methods. Field injection directly injects into private fields using @Autowired. Constructor injection is generally preferred for required dependencies.",
      example: "Constructor: 'public UserService(UserRepository repo)'. Setter: 'public void setRepo(UserRepository repo)'. Field: '@Autowired private UserRepository repo'.",
      followUps: [
        {
          question: "Which injection type is recommended?",
          answer: "Constructor injection for required dependencies, as it ensures immutability and makes dependencies explicit."
        }
      ],
      keyPoints: ["Constructor Injection", "Setter Injection", "Field Injection", "Constructor preferred for required deps"]
    },
    {
      id: 5,
      category: "Spring Boot",
      question: "What is Inversion of Control (IoC)?",
      simpleAnswer: "IoC is a principle where the control of object creation and dependency management is inverted from the application code to the Spring container.",
      explanation: "Instead of your code controlling when and how objects are created, the Spring IoC container manages the lifecycle and dependencies. This is achieved through the ApplicationContext, which acts as the central registry for beans.",
      example: "Your code focuses on business logic while Spring handles creating UserService, injecting UserRepository, and managing their lifecycles.",
      followUps: [
        {
          question: "What's the difference between IoC and DI?",
          answer: "IoC is the broader principle, while DI is a specific implementation of IoC where dependencies are injected rather than created."
        }
      ],
      keyPoints: ["Control inversion to container", "Spring manages object lifecycle", "ApplicationContext as bean registry", "Focus on business logic"]
    },
    {
      id: 6,
      category: "Spring Boot",
      question: "What is ApplicationContext?",
      simpleAnswer: "ApplicationContext is the central interface in Spring that provides configuration information to the application and manages the lifecycle of beans.",
      explanation: "It's the Spring IoC container that instantiates, configures, and assembles beans. It extends BeanFactory with additional enterprise features like internationalization, event propagation, and resource loading.",
      example: "When you annotate a class with @Component, ApplicationContext creates an instance, injects dependencies, and makes it available throughout the application.",
      followUps: [
        {
          question: "How do you get beans from ApplicationContext?",
          answer: "Using context.getBean() method, though this is rarely needed in practice due to dependency injection."
        }
      ],
      keyPoints: ["Spring IoC container", "Bean lifecycle management", "Configuration and assembly", "Enterprise features"]
    },
    {
      id: 7,
      category: "Spring Boot",
      question: "Difference between BeanFactory and ApplicationContext?",
      simpleAnswer: "BeanFactory is the basic IoC container providing fundamental DI functionality, while ApplicationContext extends it with enterprise features and is more commonly used.",
      explanation: "BeanFactory creates beans lazily and provides basic dependency injection. ApplicationContext adds features like automatic bean post-processing, internationalization, event publishing, and resource loading from various sources.",
      example: "Use BeanFactory for simple scenarios with minimal memory footprint. Use ApplicationContext for web applications needing full Spring features.",
      followUps: [
        {
          question: "When would you use BeanFactory over ApplicationContext?",
          answer: "In resource-constrained environments or when you need lazy initialization and don't require enterprise features."
        }
      ],
      keyPoints: ["BeanFactory: Basic DI", "ApplicationContext: Enterprise features", "BeanFactory: Lazy loading", "ApplicationContext: Eager loading by default"]
    },
    {
      id: 8,
      category: "Spring Boot",
      question: "What is a Spring Bean?",
      simpleAnswer: "A Spring Bean is an object that is instantiated, assembled, and managed by the Spring IoC container.",
      explanation: "Beans are the backbone of Spring applications. They are created from classes annotated with @Component, @Service, etc., or defined in configuration classes. The container manages their lifecycle, dependencies, and scope.",
      example: "A class annotated with @Service becomes a bean that can be injected into other components using @Autowired.",
      followUps: [
        {
          question: "How are beans identified?",
          answer: "By their class type and an optional name/id. Spring uses the class name in camelCase as default bean name."
        }
      ],
      keyPoints: ["Managed by Spring container", "Lifecycle controlled by Spring", "Can be injected as dependencies", "Configured via annotations or XML"]
    },
    {
      id: 9,
      category: "Spring Boot",
      question: "Bean scopes in Spring?",
      simpleAnswer: "Spring provides several bean scopes: singleton (default), prototype, request, session, application, and websocket.",
      explanation: "Singleton creates one instance per container. Prototype creates new instances each time. Request/session scopes are for web applications, creating beans per HTTP request/session. Application scope shares beans across servlet context.",
      example: "Use singleton for stateless services. Use prototype for stateful objects. Use request scope for request-specific data like user context.",
      followUps: [
        {
          question: "What's the default scope?",
          answer: "Singleton - one instance per Spring container."
        }
      ],
      keyPoints: ["Singleton: One per container", "Prototype: New instance each time", "Request: Per HTTP request", "Session: Per HTTP session"]
    },
    {
      id: 10,
      category: "Spring Boot",
      question: "What is Bean Life Cycle?",
      simpleAnswer: "Bean lifecycle includes instantiation, dependency injection, initialization (post-construction), usage, and destruction.",
      explanation: "Spring creates bean instance, injects dependencies, calls initialization callbacks (@PostConstruct), bean is ready for use, and finally destroyed (@PreDestroy) when container shuts down. This can be customized with BeanPostProcessor.",
      example: "A database connection bean might initialize connections in @PostConstruct and close them in @PreDestroy.",
      followUps: [
        {
          question: "What are lifecycle callback methods?",
          answer: "@PostConstruct (after properties set), @PreDestroy (before destruction), and interfaces like InitializingBean/DisposableBean."
        }
      ],
      keyPoints: ["Instantiation", "Dependency injection", "Initialization callbacks", "Destruction callbacks"]
    },
    {
      id: 11,
      category: "Spring Boot",
      question: "What is @Component?",
      simpleAnswer: "@Component is a Spring stereotype annotation that marks a class as a Spring-managed bean.",
      explanation: "Any class annotated with @Component becomes a candidate for auto-detection by Spring's component scanning. The container will create an instance, manage its lifecycle, and make it available for dependency injection.",
      example: "Annotate a utility class with @Component, and Spring will automatically create and manage its instance.",
      followUps: [
        {
          question: "What's component scanning?",
          answer: "Spring automatically detects @Component annotated classes in specified packages and registers them as beans."
        }
      ],
      keyPoints: ["Stereotype annotation", "Enables component scanning", "Creates Spring-managed bean", "Generic component marker"]
    },
    {
      id: 12,
      category: "Spring Boot",
      question: "Difference between @Component, @Service, @Repository, @Controller?",
      simpleAnswer: "@Component is generic, @Service for business logic, @Repository for data access, @Controller for web controllers. They all create beans but provide semantic meaning.",
      explanation: "All are stereotypes that create beans, but they serve different purposes: @Service for service layer, @Repository enables exception translation, @Controller for MVC controllers. @Component is used when none of the others fit.",
      example: "Use @Service for UserService, @Repository for UserRepository, @Controller for UserController, @Component for utility classes.",
      followUps: [
        {
          question: "Do they behave differently?",
          answer: "Functionally identical for bean creation, but @Repository adds exception translation, and they provide better code organization."
        }
      ],
      keyPoints: ["@Component: Generic bean", "@Service: Business logic", "@Repository: Data access + exception translation", "@Controller: Web MVC"]
    },
    {
      id: 13,
      category: "Spring Boot",
      question: "What is @Autowired? How it works?",
      simpleAnswer: "@Autowired automatically injects dependencies by type, eliminating the need for manual wiring.",
      explanation: "Spring scans for beans matching the required type and injects them. It works by type by default, but can use @Qualifier for name-based resolution. Can be applied to constructors, setters, or fields.",
      example: "@Autowired private UserRepository userRepo; - Spring finds the UserRepository bean and injects it.",
      followUps: [
        {
          question: "What happens if multiple beans match?",
          answer: "Spring throws NoUniqueBeanDefinitionException. Use @Qualifier or @Primary to resolve ambiguity."
        }
      ],
      keyPoints: ["Automatic dependency injection", "Type-based by default", "Works on fields, constructors, setters", "Requires matching bean in container"]
    },
    {
      id: 14,
      category: "Spring Boot",
      question: "What is @Qualifier?",
      simpleAnswer: "@Qualifier specifies which bean to inject when multiple beans of the same type exist.",
      explanation: "When you have multiple implementations of an interface, @Qualifier with a bean name helps Spring choose the correct one. It's used alongside @Autowired to resolve ambiguity.",
      example: "@Autowired @Qualifier('userDaoImpl') private UserDao userDao; - injects the specific UserDaoImpl bean.",
      followUps: [
        {
          question: "Can @Qualifier be used alone?",
          answer: "No, it must be used with @Autowired or other injection annotations."
        }
      ],
      keyPoints: ["Resolves bean ambiguity", "Specifies bean by name", "Used with @Autowired", "Works with multiple implementations"]
    },
    {
      id: 15,
      category: "Spring Boot",
      question: "What is @Primary?",
      simpleAnswer: "@Primary marks a bean as the default choice when multiple beans of the same type exist.",
      explanation: "When Spring finds multiple candidates for injection, the @Primary annotated bean is chosen automatically. It's simpler than @Qualifier but less specific.",
      example: "If you have two UserService implementations, annotate the main one with @Primary for default injection.",
      followUps: [
        {
          question: "What's the difference between @Primary and @Qualifier?",
          answer: "@Primary sets a default automatically, while @Qualifier requires explicit naming at injection points."
        }
      ],
      keyPoints: ["Marks default bean", "Resolves ambiguity automatically", "Simpler than @Qualifier", "One primary per type"]
    },
    {
      id: 16,
      category: "Spring Boot",
      question: "What is @Value?",
      simpleAnswer: "@Value injects values from properties files or environment variables into Spring beans.",
      explanation: "It allows externalizing configuration values. Spring resolves ${property.name} placeholders from application.properties, environment variables, or system properties.",
      example: "@Value('${app.timeout:30}') private int timeout; - injects the app.timeout property with 30 as default.",
      followUps: [
        {
          question: "Can @Value inject complex objects?",
          answer: "No, it's for simple values like strings, numbers, and booleans. Use @ConfigurationProperties for complex objects."
        }
      ],
      keyPoints: ["Injects external values", "Supports property placeholders", "Works with defaults", "From properties files or environment"]
    },
    {
      id: 17,
      category: "Spring Boot",
      question: "What is @Configuration?",
      simpleAnswer: "@Configuration marks a class as a source of bean definitions, replacing XML configuration.",
      explanation: "Classes annotated with @Configuration contain @Bean methods that define Spring beans. Spring treats these classes specially, ensuring beans are created only once even with method calls.",
      example: "@Configuration class AppConfig { @Bean public UserService userService() { return new UserService(); } }",
      followUps: [
        {
          question: "What's the difference between @Configuration and @Component?",
          answer: "@Configuration is for defining beans via methods, while @Component is for classes that are themselves beans."
        }
      ],
      keyPoints: ["Source of bean definitions", "@Bean method container", "Replaces XML config", "Ensures singleton beans"]
    },
    {
      id: 18,
      category: "Spring Boot",
      question: "What is @Bean?",
      simpleAnswer: "@Bean is a method-level annotation that defines a Spring bean within a @Configuration class.",
      explanation: "Methods annotated with @Bean return objects that become Spring-managed beans. The method name becomes the bean name, and Spring handles the lifecycle.",
      example: "@Bean public DataSource dataSource() { return new HikariDataSource(); } - creates a DataSource bean.",
      followUps: [
        {
          question: "Can @Bean methods have parameters?",
          answer: "Yes, Spring will inject other beans as parameters, enabling dependency injection in configuration."
        }
      ],
      keyPoints: ["Defines bean via method", "Return value becomes bean", "Method name is bean name", "Supports dependency injection"]
    },
    {
      id: 19,
      category: "Spring Boot",
      question: "Difference between @Bean and @Component?",
      simpleAnswer: "@Component marks a class as a bean (class-level), while @Bean marks a method that returns a bean (method-level).",
      explanation: "@Component is for your own classes that you want Spring to manage. @Bean is for third-party classes or when you need programmatic bean creation with custom logic.",
      example: "Use @Component on your UserService class. Use @Bean when configuring a third-party library like ObjectMapper.",
      followUps: [
        {
          question: "When would you use @Bean over @Component?",
          answer: "For third-party classes, conditional bean creation, or when you need custom instantiation logic."
        }
      ],
      keyPoints: ["@Component: Class-level bean", "@Bean: Method-level bean", "@Component: Your classes", "@Bean: Third-party or custom logic"]
    },
    {
      id: 20,
      category: "Spring Boot",
      question: "What is Spring Boot?",
      simpleAnswer: "Spring Boot is a framework built on top of Spring Framework that simplifies the creation of production-ready applications with minimal configuration.",
      explanation: "It provides auto-configuration, embedded servers, and opinionated defaults. Instead of spending time on configuration, you focus on business logic. It includes starters for common dependencies and production-ready features.",
      example: "Add spring-boot-starter-web, and you get Tomcat, Spring MVC, Jackson, and validation automatically configured.",
      followUps: [
        {
          question: "What's the difference between Spring and Spring Boot?",
          answer: "Spring is the core framework. Spring Boot is a convenience layer that makes Spring easier to use with auto-configuration and starters."
        }
      ],
      keyPoints: ["Auto-configuration", "Embedded servers", "Starters", "Production-ready features"]
    },
    {
      id: 21,
      category: "Spring Boot",
      question: "Why Spring Boot is used?",
      simpleAnswer: "Spring Boot reduces development time by providing auto-configuration, embedded servers, and sensible defaults, allowing developers to focus on business logic.",
      explanation: "Traditional Spring required extensive XML/ Java configuration. Spring Boot eliminates this boilerplate, provides embedded Tomcat/Jetty, and includes production-ready features like health checks and metrics out of the box.",
      example: "Create a REST API in minutes instead of hours of configuration. Just add dependencies and write controllers.",
      followUps: [
        {
          question: "What problems does Spring Boot solve?",
          answer: "Configuration complexity, deployment hassles, and the need for separate application servers."
        }
      ],
      keyPoints: ["Reduces configuration", "Faster development", "Embedded servers", "Production-ready features"]
    },
    {
      id: 22,
      category: "Spring Boot",
      question: "What is auto-configuration?",
      simpleAnswer: "Auto-configuration automatically configures Spring applications based on the dependencies present in the classpath.",
      explanation: "Spring Boot scans the classpath and automatically configures beans for common scenarios. If you have H2 on classpath, it configures an in-memory database. If you have spring-web, it configures Tomcat and Spring MVC.",
      example: "Add spring-boot-starter-data-jpa, and Spring Boot automatically configures Hibernate, transaction manager, and data sources.",
      followUps: [
        {
          question: "Can you disable auto-configuration?",
          answer: "Yes, using @EnableAutoConfiguration(exclude = ...) or spring.autoconfigure.exclude properties."
        }
      ],
      keyPoints: ["Automatic bean configuration", "Classpath-based", "Reduces manual config", "Conditional on dependencies"]
    },
    {
      id: 23,
      category: "Spring Boot",
      question: "How Spring Boot auto-configuration works internally?",
      simpleAnswer: "Spring Boot uses @Conditional annotations on auto-configuration classes to determine when to apply configurations based on classpath and environment.",
      explanation: "Auto-configuration classes are annotated with @ConditionalOnClass, @ConditionalOnMissingBean, etc. Spring Boot evaluates these conditions at startup and applies configurations only when appropriate.",
      example: "DataSourceAutoConfiguration only runs if there's a DataSource class on classpath and no existing DataSource bean.",
      followUps: [
        {
          question: "What triggers auto-configuration?",
          answer: "@EnableAutoConfiguration on @SpringBootApplication, which imports AutoConfigurationImportSelector."
        }
      ],
      keyPoints: ["@Conditional annotations", "Classpath scanning", "Conditional bean creation", "Order-based execution"]
    },
    {
      id: 24,
      category: "Spring Boot",
      question: "What is @SpringBootApplication?",
      simpleAnswer: "@SpringBootApplication is a convenience annotation that combines @Configuration, @EnableAutoConfiguration, and @ComponentScan.",
      explanation: "It marks the main class of a Spring Boot application. @Configuration enables Java-based config, @EnableAutoConfiguration enables auto-config, and @ComponentScan enables component scanning.",
      example: "@SpringBootApplication public class MyApp { public static void main(String[] args) { SpringApplication.run(MyApp.class, args); } }",
      followUps: [
        {
          question: "Can you use the individual annotations instead?",
          answer: "Yes, but @SpringBootApplication is the standard and recommended way for Spring Boot applications."
        }
      ],
      keyPoints: ["Combines three annotations", "Enables auto-configuration", "Enables component scanning", "Marks main application class"]
    },
    {
      id: 25,
      category: "Spring Boot",
      question: "What is embedded server in Spring Boot?",
      simpleAnswer: "Embedded server is a web server (Tomcat, Jetty, or Undertow) that runs inside the application JAR, eliminating the need for a separate application server.",
      explanation: "Spring Boot packages the server with your application. When you run the JAR, it starts the embedded server automatically. This simplifies deployment and makes applications self-contained.",
      example: "java -jar myapp.jar starts both your application and Tomcat server on port 8080.",
      followUps: [
        {
          question: "What's the default embedded server?",
          answer: "Tomcat, but you can switch to Jetty or Undertow by excluding Tomcat and including the other."
        }
      ],
      keyPoints: ["Server inside JAR", "No separate deployment", "Self-contained applications", "Tomcat/Jetty/Undertow"]
    },
    {
      id: 26,
      category: "Spring Boot",
      question: "How to change default server (Tomcat)?",
      simpleAnswer: "Exclude spring-boot-starter-tomcat and add spring-boot-starter-jetty or spring-boot-starter-undertow.",
      explanation: "Spring Boot's web starter includes Tomcat by default. To use Jetty, exclude Tomcat dependency and add Jetty. Same for Undertow. This changes the embedded server without code changes.",
      example: "<dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-web</artifactId> <exclusions> <exclusion> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-tomcat</artifactId> </exclusion> </exclusions> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-jetty</artifactId> </dependency>",
      followUps: [
        {
          question: "Why would you change the server?",
          answer: "Performance reasons, specific features, or organizational preferences."
        }
      ],
      keyPoints: ["Exclude default Tomcat", "Add alternative starter", "Jetty or Undertow", "Same application code"]
    },
    {
      id: 27,
      category: "Spring Boot",
      question: "What is application.properties / application.yml?",
      simpleAnswer: "Configuration files where you externalize application settings like database URLs, ports, and custom properties.",
      explanation: "These files allow you to configure your application without changing code. Spring Boot loads them automatically and makes values available via @Value or @ConfigurationProperties.",
      example: "server.port=9090 in application.properties changes the default port from 8080 to 9090.",
      followUps: [
        {
          question: "Which format is better?",
          answer: "YAML is more readable for complex configurations, but properties files are simpler for basic settings."
        }
      ],
      keyPoints: ["External configuration", "Auto-loaded by Spring Boot", "Properties or YAML format", "Environment-specific configs"]
    },
    {
      id: 28,
      category: "Spring Boot",
      question: "What are profiles in Spring Boot?",
      simpleAnswer: "Profiles allow you to have different configurations for different environments (dev, test, prod) in the same application.",
      explanation: "You can define profile-specific properties in application-{profile}.properties files. Activate profiles via spring.profiles.active property or command line.",
      example: "application-dev.properties for development, application-prod.properties for production with different database URLs.",
      followUps: [
        {
          question: "How do you activate a profile?",
          answer: "--spring.profiles.active=prod when running the application."
        }
      ],
      keyPoints: ["Environment-specific configs", "application-{profile}.properties", "Profile activation", "Conditional bean creation"]
    },
    {
      id: 29,
      category: "Spring Boot",
      question: "How to use multiple environments (dev, prod)?",
      simpleAnswer: "Create profile-specific property files (application-dev.properties, application-prod.properties) and activate the desired profile.",
      explanation: "Spring Boot loads application.properties first, then merges profile-specific properties. Use @Profile annotation on beans for profile-specific components.",
      example: "Set spring.profiles.active=prod to load production database settings and disable dev-specific logging.",
      followUps: [
        {
          question: "Can you have multiple active profiles?",
          answer: "Yes, specify comma-separated profiles in spring.profiles.active."
        }
      ],
      keyPoints: ["Profile-specific properties", "spring.profiles.active", "@Profile annotation", "Property merging"]
    },
    {
      id: 30,
      category: "Spring Boot",
      question: "What is @ConfigurationProperties?",
      simpleAnswer: "@ConfigurationProperties binds external properties to a Java object, providing type-safe configuration.",
      explanation: "Instead of using multiple @Value annotations, you create a properties class with fields matching property names. Spring automatically binds and validates the values.",
      example: "@ConfigurationProperties(prefix = 'app') public class AppProperties { private String name; private int timeout; }",
      followUps: [
        {
          question: "What's the advantage over @Value?",
          answer: "Type safety, validation, and grouping related properties together."
        }
      ],
      keyPoints: ["Type-safe configuration", "Binds to POJO", "Supports validation", "Groups related properties"]
    },
    {
      id: 31,
      category: "Spring Boot",
      question: "Difference between @Value and @ConfigurationProperties?",
      simpleAnswer: "@Value injects individual values, while @ConfigurationProperties binds a group of related properties to an object.",
      explanation: "@Value is simple for single values with SpEL support. @ConfigurationProperties is better for complex configurations, provides validation, and is more maintainable for related settings.",
      example: "Use @Value for 'app.version'. Use @ConfigurationProperties for database settings with host, port, username, password.",
      followUps: [
        {
          question: "When would you use @Value over @ConfigurationProperties?",
          answer: "For simple values or when you need SpEL expressions."
        }
      ],
      keyPoints: ["@Value: Individual values", "@ConfigurationProperties: Grouped properties", "@Value: SpEL support", "@ConfigurationProperties: Validation"]
    },
    {
      id: 32,
      category: "Spring Boot",
      question: "What is externalized configuration?",
      simpleAnswer: "Externalized configuration allows you to manage application settings outside the code, in properties files, environment variables, or command-line arguments.",
      explanation: "Spring Boot supports multiple configuration sources with a specific order of precedence. This enables different settings for different environments without code changes.",
      example: "Database URL in environment variable overrides application.properties, allowing different databases for dev and prod.",
      followUps: [
        {
          question: "What's the precedence order?",
          answer: "Command line args > JNDI > System properties > Environment variables > Profile-specific properties > Application properties > Defaults."
        }
      ],
      keyPoints: ["Configuration outside code", "Multiple sources", "Precedence order", "Environment flexibility"]
    },
    {
      id: 33,
      category: "Spring Boot",
      question: "What is Spring MVC?",
      simpleAnswer: "Spring MVC is a web framework that implements the Model-View-Controller pattern for building web applications.",
      explanation: "It provides a clean separation between the model (data), view (presentation), and controller (logic). DispatcherServlet handles requests and routes them to appropriate controllers.",
      example: "A controller method handles /users request, gets data from service (model), and returns view name or JSON.",
      followUps: [
        {
          question: "What's the difference between Spring MVC and Spring Boot?",
          answer: "Spring MVC is the web framework. Spring Boot makes it easier to use with auto-configuration and embedded servers."
        }
      ],
      keyPoints: ["Model-View-Controller pattern", "Request handling", "Clean separation of concerns", "DispatcherServlet"]
    },
    {
      id: 34,
      category: "Spring Boot",
      question: "What is DispatcherServlet?",
      simpleAnswer: "DispatcherServlet is the front controller in Spring MVC that receives all HTTP requests and delegates them to appropriate handlers.",
      explanation: "It's the central servlet that handles incoming requests, determines which controller should process them, and manages the response. It's configured automatically in Spring Boot web applications.",
      example: "When you hit /api/users, DispatcherServlet routes it to the @RequestMapping('/api/users') method in your controller.",
      followUps: [
        {
          question: "How is DispatcherServlet configured?",
          answer: "Auto-configured by Spring Boot, but you can customize it by extending WebMvcConfigurer."
        }
      ],
      keyPoints: ["Front controller pattern", "Request routing", "Handler mapping", "Response management"]
    },
    {
      id: 35,
      category: "Spring Boot",
      question: "Flow of request in Spring Boot?",
      simpleAnswer: "Request → DispatcherServlet → HandlerMapping → Controller → Service/Model → ViewResolver → Response.",
      explanation: "Client sends request to DispatcherServlet. It uses HandlerMapping to find the controller method. Controller processes request, interacts with service/model, and returns ModelAndView or ResponseEntity. ViewResolver renders the view.",
      example: "GET /users → DispatcherServlet → UserController.getUsers() → UserService → returns JSON list of users.",
      followUps: [
        {
          question: "What happens in a REST API?",
          answer: "Same flow but returns ResponseEntity with JSON instead of ModelAndView."
        }
      ],
      keyPoints: ["DispatcherServlet entry point", "Handler mapping", "Controller processing", "View resolution"]
    },
    {
      id: 36,
      category: "Spring Boot",
      question: "What is @RestController?",
      simpleAnswer: "@RestController is a convenience annotation that combines @Controller and @ResponseBody for building REST APIs.",
      explanation: "It marks a class as a web controller where every method returns a domain object instead of a view. Spring automatically serializes the return value to JSON/XML.",
      example: "@RestController public class UserController { @GetMapping('/users') public List<User> getUsers() { return userService.getAll(); } }",
      followUps: [
        {
          question: "What's the difference from @Controller?",
          answer: "@Controller returns views, @RestController returns data (JSON/XML)."
        }
      ],
      keyPoints: ["REST API controller", "@Controller + @ResponseBody", "Returns JSON by default", "No view resolution"]
    },
    {
      id: 37,
      category: "Spring Boot",
      question: "Difference between @Controller and @RestController?",
      simpleAnswer: "@Controller returns views (JSP, Thymeleaf), while @RestController returns data (JSON/XML) directly.",
      explanation: "@Controller methods can return view names that ViewResolver renders. @RestController methods return objects that HttpMessageConverter serializes to response body.",
      example: "@Controller returns 'users/list' (view). @RestController returns List<User> (JSON).",
      followUps: [
        {
          question: "Can @Controller return JSON?",
          answer: "Yes, with @ResponseBody on methods, but @RestController does it automatically."
        }
      ],
      keyPoints: ["@Controller: Views", "@RestController: Data", "@Controller: ViewResolver", "@RestController: HttpMessageConverter"]
    },
    {
      id: 38,
      category: "Spring Boot",
      question: "What is @RequestMapping?",
      simpleAnswer: "@RequestMapping maps HTTP requests to handler methods based on URL pattern and HTTP method.",
      explanation: "It specifies which requests a method should handle. Can map by path, HTTP method, headers, parameters, etc. More specific annotations like @GetMapping extend it.",
      example: "@RequestMapping(value = '/users', method = RequestMethod.GET) is equivalent to @GetMapping('/users').",
      followUps: [
        {
          question: "What's the difference between @RequestMapping and @GetMapping?",
          answer: "@GetMapping is @RequestMapping(method = RequestMethod.GET) - more specific and readable."
        }
      ],
      keyPoints: ["URL mapping", "HTTP method specification", "Flexible mapping options", "Base for specific mappings"]
    },
    {
      id: 39,
      category: "Spring Boot",
      question: "Difference between GET, POST, PUT, DELETE?",
      simpleAnswer: "GET retrieves data, POST creates, PUT updates completely, DELETE removes resources.",
      explanation: "GET is safe and idempotent. POST creates resources (not idempotent). PUT updates/replaces entire resource (idempotent). DELETE removes resource (idempotent).",
      example: "GET /users - list users. POST /users - create user. PUT /users/1 - update user 1. DELETE /users/1 - delete user 1.",
      followUps: [
        {
          question: "What does idempotent mean?",
          answer: "Multiple identical requests have the same effect as one request."
        }
      ],
      keyPoints: ["GET: Retrieve", "POST: Create", "PUT: Update/Replace", "DELETE: Remove"]
    },
    {
      id: 40,
      category: "Spring Boot",
      question: "What is @PathVariable?",
      simpleAnswer: "@PathVariable extracts values from the URI path and binds them to method parameters.",
      explanation: "For RESTful URLs like /users/{id}, @PathVariable binds the {id} part to a method parameter. Essential for resource-based APIs.",
      example: "@GetMapping('/users/{id}') public User getUser(@PathVariable Long id) { return userService.getById(id); }",
      followUps: [
        {
          question: "What's the difference between @PathVariable and @RequestParam?",
          answer: "@PathVariable is from URL path (/users/123), @RequestParam is from query parameters (/users?id=123)."
        }
      ],
      keyPoints: ["URI path extraction", "Resource identification", "RESTful APIs", "Method parameter binding"]
    },
    {
      id: 41,
      category: "Spring Boot",
      question: "What is @RequestParam?",
      simpleAnswer: "@RequestParam binds request parameters (query parameters or form data) to method parameters.",
      explanation: "Extracts values from URL query string (?name=john) or form submissions. Optional parameters can have default values.",
      example: "@GetMapping('/search') public List<User> search(@RequestParam String name, @RequestParam(defaultValue = '10') int limit) { ... }",
      followUps: [
        {
          question: "Can @RequestParam be optional?",
          answer: "Yes, with required=false or by using Optional<T> or defaultValue."
        }
      ],
      keyPoints: ["Query parameter binding", "Form data binding", "Optional parameters", "Default values"]
    },
    {
      id: 42,
      category: "Spring Boot",
      question: "What is @RequestBody?",
      simpleAnswer: "@RequestBody binds the HTTP request body to a method parameter, typically for JSON/XML input.",
      explanation: "Spring uses HttpMessageConverter to deserialize the request body into a Java object. Commonly used in POST/PUT requests for creating/updating resources.",
      example: "@PostMapping('/users') public User createUser(@RequestBody User user) { return userService.save(user); }",
      followUps: [
        {
          question: "What content types does it support?",
          answer: "JSON (default), XML, and other formats with appropriate converters."
        }
      ],
      keyPoints: ["Request body deserialization", "JSON/XML input", "POST/PUT requests", "HttpMessageConverter"]
    },
    {
      id: 43,
      category: "Spring Boot",
      question: "What is @ResponseBody?",
      simpleAnswer: "@ResponseBody indicates that the return value should be serialized directly to the response body.",
      explanation: "Instead of returning a view name, the method return value is converted to JSON/XML and written to the response. @RestController applies this automatically to all methods.",
      example: "@GetMapping('/users') @ResponseBody public List<User> getUsers() { return userService.getAll(); }",
      followUps: [
        {
          question: "When do you need @ResponseBody?",
          answer: "On individual methods in @Controller classes. Not needed in @RestController."
        }
      ],
      keyPoints: ["Response serialization", "Direct data return", "JSON/XML output", "HttpMessageConverter"]
    },
    {
      id: 44,
      category: "Spring Boot",
      question: "What is ResponseEntity?",
      simpleAnswer: "ResponseEntity represents the entire HTTP response, allowing control over status code, headers, and body.",
      explanation: "It wraps the response body and provides methods to set HTTP status, headers, and body. Useful for custom responses, error handling, and REST APIs.",
      example: "return ResponseEntity.ok(user); or return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);",
      followUps: [
        {
          question: "When would you use ResponseEntity over returning the object directly?",
          answer: "When you need custom status codes, headers, or error responses."
        }
      ],
      keyPoints: ["Full HTTP response control", "Status code setting", "Header manipulation", "Flexible response handling"]
    },
    {
      id: 45,
      category: "Spring Boot",
      question: "What is content negotiation?",
      simpleAnswer: "Content negotiation allows clients to specify the response format (JSON/XML) they prefer via Accept header.",
      explanation: "Spring MVC checks the Accept header and uses the appropriate HttpMessageConverter to format the response. Clients can request JSON or XML for the same endpoint.",
      example: "Accept: application/json returns JSON, Accept: application/xml returns XML from the same controller method.",
      followUps: [
        {
          question: "How does Spring determine the format?",
          answer: "By checking Accept header against available message converters."
        }
      ],
      keyPoints: ["Response format negotiation", "Accept header", "Multiple formats", "HttpMessageConverter"]
    },
    {
      id: 46,
      category: "Spring Boot",
      question: "What is exception handling in Spring?",
      simpleAnswer: "Spring provides mechanisms to handle exceptions gracefully in web applications using @ExceptionHandler and @ControllerAdvice.",
      explanation: "Instead of returning stack traces, you can define methods that catch exceptions and return appropriate HTTP responses. This centralizes error handling and provides consistent error responses.",
      example: "@ExceptionHandler(UserNotFoundException.class) public ResponseEntity handleNotFound() { return ResponseEntity.notFound().build(); }",
      followUps: [
        {
          question: "What's the benefit of centralized exception handling?",
          answer: "Consistent error responses across the application and separation of error handling from business logic."
        }
      ],
      keyPoints: ["Graceful error handling", "@ExceptionHandler", "@ControllerAdvice", "Consistent responses"]
    },
    {
      id: 47,
      category: "Spring Boot",
      question: "What is @ControllerAdvice?",
      simpleAnswer: "@ControllerAdvice is a specialization of @Component that enables global exception handling and other cross-cutting concerns.",
      explanation: "Classes annotated with @ControllerAdvice can contain @ExceptionHandler, @InitBinder, and @ModelAttribute methods that apply to all controllers in the application or specific packages.",
      example: "@ControllerAdvice public class GlobalExceptionHandler { @ExceptionHandler(Exception.class) public ResponseEntity handleAll() { ... } }",
      followUps: [
        {
          question: "Can @ControllerAdvice be limited to specific controllers?",
          answer: "Yes, with basePackages or assignableTypes attributes."
        }
      ],
      keyPoints: ["Global exception handling", "Cross-cutting concerns", "Applies to all controllers", "Centralized logic"]
    },
    {
      id: 48,
      category: "Spring Boot",
      question: "What is @ExceptionHandler?",
      simpleAnswer: "@ExceptionHandler defines methods that handle specific exceptions thrown from controller methods.",
      explanation: "When an exception occurs in a controller, Spring looks for @ExceptionHandler methods that match the exception type. The method can return error responses or redirect to error pages.",
      example: "@ExceptionHandler(ValidationException.class) public ResponseEntity handleValidation(ValidationException e) { return ResponseEntity.badRequest().body(e.getMessage()); }",
      followUps: [
        {
          question: "What's the order of exception handler resolution?",
          answer: "First local @ExceptionHandler in the same controller, then global @ControllerAdvice handlers."
        }
      ],
      keyPoints: ["Exception-specific handling", "Controller methods", "Custom error responses", "Exception type matching"]
    },
    {
      id: 49,
      category: "Spring Boot",
      question: "Difference between global and local exception handling?",
      simpleAnswer: "Local handling uses @ExceptionHandler in the same controller, global uses @ControllerAdvice for application-wide handling.",
      explanation: "Local handlers only apply to that controller. Global handlers in @ControllerAdvice apply to all controllers. Global is preferred for consistency and DRY principle.",
      example: "Local: @ExceptionHandler in UserController. Global: @ControllerAdvice class handling exceptions from all controllers.",
      followUps: [
        {
          question: "Which takes precedence?",
          answer: "Local handlers take precedence over global ones for the same exception type."
        }
      ],
      keyPoints: ["Local: Controller-specific", "Global: Application-wide", "Local: Higher precedence", "Global: Better consistency"]
    },
    {
      id: 50,
      category: "Spring Boot",
      question: "What is Spring Data JPA?",
      simpleAnswer: "Spring Data JPA is a Spring module that simplifies data access by providing repository interfaces and automatic query generation.",
      explanation: "It eliminates boilerplate code for CRUD operations. You define repository interfaces extending JpaRepository, and Spring generates implementations automatically.",
      example: "public interface UserRepository extends JpaRepository<User, Long> {} - gives you save(), findById(), findAll(), delete() methods automatically.",
      followUps: [
        {
          question: "What's the relationship with JPA and Hibernate?",
          answer: "JPA is the specification, Hibernate is the implementation, Spring Data JPA provides the Spring integration."
        }
      ],
      keyPoints: ["Simplified data access", "Repository pattern", "Automatic query generation", "CRUD operations"]
    },
    {
      id: 51,
      category: "Spring Boot",
      question: "What is Hibernate?",
      simpleAnswer: "Hibernate is an ORM (Object-Relational Mapping) framework that maps Java objects to database tables.",
      explanation: "It handles the conversion between Java objects and database records, manages database connections, and provides HQL (Hibernate Query Language) for database operations.",
      example: "A User entity class gets mapped to a 'user' table, and Hibernate handles saving/loading User objects to/from the database.",
      followUps: [
        {
          question: "What's the difference between Hibernate and JDBC?",
          answer: "JDBC requires manual SQL and result set handling. Hibernate provides object-oriented database access."
        }
      ],
      keyPoints: ["ORM framework", "Object-relational mapping", "Database abstraction", "HQL queries"]
    },
    {
      id: 52,
      category: "Spring Boot",
      question: "What is ORM?",
      simpleAnswer: "ORM (Object-Relational Mapping) is a technique that maps object-oriented programming concepts to relational database concepts.",
      explanation: "It allows you to work with database records as if they were regular Java objects. No need to write SQL - just manipulate objects and the ORM handles the database operations.",
      example: "user.setName('John'); userRepository.save(user); - ORM converts this to UPDATE user SET name = 'John' WHERE id = ?",
      followUps: [
        {
          question: "What are the benefits of ORM?",
          answer: "Productivity, maintainability, database independence, and type safety."
        }
      ],
      keyPoints: ["Object to table mapping", "Automatic SQL generation", "Database abstraction", "Type safety"]
    },
    {
      id: 53,
      category: "Spring Boot",
      question: "What is Entity?",
      simpleAnswer: "An Entity is a Java class that represents a database table, with fields mapping to table columns.",
      explanation: "Annotated with @Entity, entities define the structure of database tables. JPA/Hibernate uses them to generate DDL and perform CRUD operations.",
      example: "@Entity public class User { @Id private Long id; private String name; } - maps to 'user' table with 'id' and 'name' columns.",
      followUps: [
        {
          question: "What's the difference between Entity and DTO?",
          answer: "Entity represents database table, DTO is for data transfer between layers."
        }
      ],
      keyPoints: ["Database table representation", "@Entity annotation", "Field to column mapping", "JPA managed"]
    },
    {
      id: 54,
      category: "Spring Boot",
      question: "What is @Entity annotation?",
      simpleAnswer: "@Entity marks a class as a JPA entity that should be mapped to a database table.",
      explanation: "It tells JPA that this class represents a database entity. The class name becomes the table name (or can be customized), and fields become columns.",
      example: "@Entity public class Product { ... } - creates a 'product' table in the database.",
      followUps: [
        {
          question: "Can you have entities without @Entity?",
          answer: "No, @Entity is required for JPA to recognize the class as an entity."
        }
      ],
      keyPoints: ["JPA entity marker", "Table mapping", "Automatic schema generation", "Persistence capable"]
    },
    {
      id: 55,
      category: "Spring Boot",
      question: "What is @Id?",
      simpleAnswer: "@Id marks a field as the primary key of the entity.",
      explanation: "Every JPA entity must have a field annotated with @Id. It uniquely identifies each record in the database table.",
      example: "@Entity public class User { @Id private Long id; ... } - 'id' column becomes the primary key.",
      followUps: [
        {
          question: "Can @Id be on multiple fields?",
          answer: "No, but you can use @EmbeddedId for composite primary keys."
        }
      ],
      keyPoints: ["Primary key marker", "Unique identifier", "Required for entities", "Database constraint"]
    },
    {
      id: 56,
      category: "Spring Boot",
      question: "What is @GeneratedValue?",
      simpleAnswer: "@GeneratedValue specifies how the primary key values should be generated automatically.",
      explanation: "It works with @Id to auto-generate primary key values. Strategies include AUTO, IDENTITY, SEQUENCE, and TABLE.",
      example: "@Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id; - database auto-increments the ID.",
      followUps: [
        {
          question: "What's the difference between IDENTITY and SEQUENCE?",
          answer: "IDENTITY is database-specific auto-increment, SEQUENCE uses database sequences (better for batch inserts)."
        }
      ],
      keyPoints: ["Auto primary key generation", "Generation strategies", "Database-specific", "No manual ID setting"]
    },
    {
      id: 57,
      category: "Spring Boot",
      question: "What is JpaRepository?",
      simpleAnswer: "JpaRepository is an interface that provides CRUD operations and query methods for JPA entities.",
      explanation: "Extending JpaRepository gives you methods like save(), findById(), findAll(), delete(), and query methods. Spring Data JPA generates the implementation automatically.",
      example: "public interface UserRepository extends JpaRepository<User, Long> { List<User> findByName(String name); }",
      followUps: [
        {
          question: "What methods does JpaRepository provide?",
          answer: "CRUD operations, pagination, sorting, and custom query methods."
        }
      ],
      keyPoints: ["CRUD operations", "Query methods", "Automatic implementation", "Pagination support"]
    },
    {
      id: 58,
      category: "Spring Boot",
      question: "Difference between CrudRepository and JpaRepository?",
      simpleAnswer: "CrudRepository provides basic CRUD operations, JpaRepository extends it with JPA-specific methods like flush(), saveAndFlush(), and pagination.",
      explanation: "CrudRepository has save(), findById(), findAll(), delete(). JpaRepository adds JPA features like batch operations, custom queries, and pagination support.",
      example: "Use CrudRepository for simple operations. Use JpaRepository for complex queries and pagination.",
      followUps: [
        {
          question: "When would you use CrudRepository over JpaRepository?",
          answer: "When you don't need JPA-specific features and want a lighter interface."
        }
      ],
      keyPoints: ["CrudRepository: Basic CRUD", "JpaRepository: JPA features", "JpaRepository: Pagination", "JpaRepository: Flush operations"]
    },
    {
      id: 59,
      category: "Spring Boot",
      question: "What is pagination and sorting?",
      simpleAnswer: "Pagination divides large result sets into pages, sorting orders results by specified criteria.",
      explanation: "Spring Data provides Pageable and Sort interfaces. findAll(Pageable) returns Page<T> with content, total elements, and navigation methods.",
      example: "Pageable pageable = PageRequest.of(0, 10, Sort.by('name')); Page<User> users = repository.findAll(pageable);",
      followUps: [
        {
          question: "What's the benefit of pagination?",
          answer: "Performance - loads only needed data, better user experience with page navigation."
        }
      ],
      keyPoints: ["Large dataset handling", "Page<T> return type", "Sort criteria", "Performance optimization"]
    },
    {
      id: 60,
      category: "Spring Boot",
      question: "What is lazy vs eager loading?",
      simpleAnswer: "Lazy loading loads related entities only when accessed, eager loading loads them immediately with the main entity.",
      explanation: "Lazy (@OneToMany(fetch = FetchType.LAZY)) improves performance by avoiding unnecessary data loading. Eager loads everything at once, potentially causing N+1 queries.",
      example: "User with lazy Orders - orders loaded only when user.getOrders() called. Eager - orders loaded with user query.",
      followUps: [
        {
          question: "What's the default fetch type?",
          answer: "@OneToOne and @ManyToOne are EAGER, @OneToMany and @ManyToMany are LAZY."
        }
      ],
      keyPoints: ["Lazy: On-demand loading", "Eager: Immediate loading", "Performance vs completeness", "N+1 query problem"]
    },
    {
      id: 61,
      category: "Spring Boot",
      question: "What is N+1 problem?",
      simpleAnswer: "N+1 problem occurs when fetching N entities triggers N+1 database queries instead of 1.",
      explanation: "Loading 10 users with lazy orders executes 1 query for users + 10 queries for orders each. Solutions: eager loading, @Query with JOIN, or entity graphs.",
      example: "SELECT * FROM user (1 query) then SELECT * FROM orders WHERE user_id = ? (10 queries) = 11 total.",
      followUps: [
        {
          question: "How to solve N+1 problem?",
          answer: "Use JOIN FETCH in JPQL, @EntityGraph, or change fetch type strategically."
        }
      ],
      keyPoints: ["Excessive queries", "Lazy loading issue", "Performance problem", "JOIN FETCH solution"]
    },
    {
      id: 62,
      category: "Spring Boot",
      question: "What is transaction?",
      simpleAnswer: "A transaction is a sequence of database operations that are treated as a single unit of work.",
      explanation: "All operations in a transaction succeed or fail together. If any operation fails, all are rolled back. Ensures data consistency and integrity.",
      example: "Transferring money: deduct from account A, add to account B. Both must succeed or both fail.",
      followUps: [
        {
          question: "What are ACID properties?",
          answer: "Atomicity, Consistency, Isolation, Durability."
        }
      ],
      keyPoints: ["Atomic unit of work", "All-or-nothing", "Data consistency", "Rollback capability"]
    },
    {
      id: 63,
      category: "Spring Boot",
      question: "What is @Transactional?",
      simpleAnswer: "@Transactional marks a method or class as transactional, managing database transactions automatically.",
      explanation: "Spring creates a transaction before the method executes and commits it after successful completion. On exception, it rolls back automatically.",
      example: "@Transactional public void transferMoney() { withdraw(amount); deposit(amount); } - both succeed or both rollback.",
      followUps: [
        {
          question: "Where should you place @Transactional?",
          answer: "On service methods that modify data, typically at the service layer."
        }
      ],
      keyPoints: ["Automatic transaction management", "Commit on success", "Rollback on exception", "Declarative transactions"]
    },
    {
      id: 64,
      category: "Spring Boot",
      question: "What is propagation?",
      simpleAnswer: "Transaction propagation defines how transactions behave when a transactional method calls another transactional method.",
      explanation: "REQUIRED (default) joins existing transaction or creates new. REQUIRES_NEW suspends current and starts new. NEVER throws exception if transaction exists.",
      example: "Method A calls method B. If A has transaction and B uses REQUIRED, B joins A's transaction.",
      followUps: [
        {
          question: "What's the most common propagation?",
          answer: "REQUIRED - joins existing transaction or creates new if none exists."
        }
      ],
      keyPoints: ["Transaction nesting behavior", "REQUIRED (default)", "REQUIRES_NEW", "Transaction context"]
    },
    {
      id: 65,
      category: "Spring Boot",
      question: "What is isolation level?",
      simpleAnswer: "Isolation level defines how transactions are isolated from each other to prevent concurrency issues.",
      explanation: "READ_UNCOMMITTED allows dirty reads. READ_COMMITTED prevents dirty reads. REPEATABLE_READ prevents non-repeatable reads. SERIALIZABLE prevents all concurrency issues but slowest.",
      example: "READ_COMMITTED: Transaction sees only committed changes from other transactions.",
      followUps: [
        {
          question: "What's the default isolation level?",
          answer: "READ_COMMITTED for most databases."
        }
      ],
      keyPoints: ["Concurrency control", "Dirty reads prevention", "Non-repeatable reads", "Performance vs consistency"]
    },
    {
      id: 66,
      category: "Spring Boot",
      question: "What is Actuator?",
      simpleAnswer: "Spring Boot Actuator provides production-ready features like health checks, metrics, and monitoring endpoints.",
      explanation: "It adds endpoints like /actuator/health, /actuator/metrics, /actuator/info for monitoring application health, performance, and configuration.",
      example: "/actuator/health shows application status, /actuator/metrics shows JVM memory usage and custom metrics.",
      followUps: [
        {
          question: "How to secure actuator endpoints?",
          answer: "Configure security properties or use Spring Security to protect sensitive endpoints."
        }
      ],
      keyPoints: ["Production monitoring", "Health checks", "Metrics collection", "Management endpoints"]
    },
    {
      id: 67,
      category: "Spring Boot",
      question: "What is Spring Boot Starter?",
      simpleAnswer: "Starters are dependency descriptors that include all necessary dependencies for a specific functionality.",
      explanation: "Instead of manually managing versions and dependencies, you add one starter that brings in the compatible set. spring-boot-starter-web brings Tomcat, Jackson, Spring MVC, etc.",
      example: "spring-boot-starter-data-jpa includes Hibernate, JPA API, Spring Data JPA, and connection pooling.",
      followUps: [
        {
          question: "Can you create custom starters?",
          answer: "Yes, for common dependencies in your organization."
        }
      ],
      keyPoints: ["Dependency management", "Version compatibility", "Reduced configuration", "Convention over configuration"]
    },
    {
      id: 68,
      category: "Spring Boot",
      question: "What is dependency management in Spring Boot?",
      simpleAnswer: "Spring Boot manages dependency versions through its parent POM, ensuring compatibility between libraries.",
      explanation: "The spring-boot-starter-parent defines versions for hundreds of dependencies. When you add a starter, you get tested, compatible versions automatically.",
      example: "Adding spring-boot-starter-web gives you compatible versions of Spring MVC, Tomcat, Jackson, without specifying versions.",
      followUps: [
        {
          question: "Can you override versions?",
          answer: "Yes, by specifying versions in your POM properties."
        }
      ],
      keyPoints: ["Version management", "Compatibility guarantee", "Parent POM", "Reduced version conflicts"]
    },
    {
      id: 69,
      category: "Spring Boot",
      question: "What is DevTools?",
      simpleAnswer: "Spring Boot DevTools provides development-time features like automatic restart, live reload, and remote debugging.",
      explanation: "It enhances the development experience with fast application restarts, browser live reload, and development-specific configurations that are disabled in production.",
      example: "Change a controller, save file, and the application restarts automatically. Browser refreshes automatically on changes.",
      followUps: [
        {
          question: "Does DevTools affect production?",
          answer: "No, it's automatically disabled when running packaged applications."
        }
      ],
      keyPoints: ["Development enhancement", "Automatic restart", "Live reload", "Development-only features"]
    },
    {
      id: 70,
      category: "Spring Boot",
      question: "What is Spring Boot CLI?",
      simpleAnswer: "Spring Boot CLI is a command-line tool for quickly creating and running Spring Boot applications using Groovy scripts.",
      explanation: "It allows writing Spring applications as Groovy scripts without compilation. Useful for prototyping, learning, and simple applications.",
      example: "@RestController class Hello { @RequestMapping('/') String home() { 'Hello World' } } - run with spring run app.groovy",
      followUps: [
        {
          question: "When would you use CLI over Maven/Gradle?",
          answer: "For quick prototyping, learning Spring Boot, or very simple applications."
        }
      ],
      keyPoints: ["Groovy-based development", "No compilation needed", "Rapid prototyping", "Command-line tool"]
    },
    {
      id: 71,
      category: "Spring Boot",
      question: "How microservices interact with each other?",
      simpleAnswer: "Microservices interact through HTTP APIs (REST), message queues, or event streaming.",
      explanation: "REST APIs for synchronous communication, message queues for asynchronous decoupling, events for loose coupling. API Gateway routes requests, service discovery finds services.",
      example: "Order service calls Payment service via REST API, publishes OrderPlaced event to message queue.",
      followUps: [
        {
          question: "What's synchronous vs asynchronous communication?",
          answer: "Synchronous waits for response (REST), asynchronous sends and continues (messages)."
        }
      ],
      keyPoints: ["REST APIs", "Message queues", "Event-driven", "API Gateway"]
    },
    {
      id: 72,
      category: "Spring Boot",
      question: "What is REST vs messaging?",
      simpleAnswer: "REST is synchronous request-response communication, messaging is asynchronous fire-and-forget.",
      explanation: "REST: Client waits for server response. Messaging: Producer sends message to queue/broker, consumer processes asynchronously. REST for immediate responses, messaging for decoupling.",
      example: "REST: User registration returns success/failure immediately. Messaging: Send welcome email asynchronously.",
      followUps: [
        {
          question: "When to use REST vs messaging?",
          answer: "REST for real-time responses, messaging for reliability, scalability, and decoupling."
        }
      ],
      keyPoints: ["REST: Synchronous", "Messaging: Asynchronous", "REST: Request-response", "Messaging: Fire-and-forget"]
    },
    {
      id: 73,
      category: "Spring Boot",
      question: "What is service discovery?",
      simpleAnswer: "Service discovery automatically finds and connects to microservice instances without hard-coded addresses.",
      explanation: "In dynamic environments, services register with a registry (Eureka, Consul). Clients query the registry to find service locations. Essential for scaling and resilience.",
      example: "Payment service registers with Eureka. Order service queries Eureka to find Payment service URL.",
      followUps: [
        {
          question: "What's client-side vs server-side discovery?",
          answer: "Client-side: Client queries registry directly. Server-side: Load balancer queries registry."
        }
      ],
      keyPoints: ["Dynamic service location", "Service registry", "Automatic discovery", "Scalability support"]
    },
    {
      id: 74,
      category: "Spring Boot",
      question: "What is API Gateway?",
      simpleAnswer: "API Gateway is a single entry point for all client requests to microservices, handling routing, authentication, and cross-cutting concerns.",
      explanation: "It routes requests to appropriate services, handles authentication, rate limiting, logging, and response transformation. Simplifies client integration.",
      example: "Client calls /api/orders, Gateway routes to Order service, adds authentication headers, aggregates responses.",
      followUps: [
        {
          question: "What's the difference between API Gateway and load balancer?",
          answer: "Load balancer distributes traffic, API Gateway adds application-level features like routing and authentication."
        }
      ],
      keyPoints: ["Single entry point", "Request routing", "Cross-cutting concerns", "Client simplification"]
    },
    {
      id: 75,
      category: "Spring Boot",
      question: "What is Feign Client?",
      simpleAnswer: "Feign Client is a declarative HTTP client that simplifies calling REST APIs with interface-based programming.",
      explanation: "Instead of RestTemplate code, you define an interface with annotated methods. Spring generates the implementation automatically.",
      example: "@FeignClient('user-service') interface UserClient { @GetMapping('/users/{id}') User getUser(@PathVariable Long id); }",
      followUps: [
        {
          question: "What's the advantage over RestTemplate?",
          answer: "Cleaner code, automatic integration with service discovery and load balancing."
        }
      ],
      keyPoints: ["Declarative HTTP client", "Interface-based", "Service discovery integration", "Load balancing"]
    },
    {
      id: 76,
      category: "Spring Boot",
      question: "What is circuit breaker?",
      simpleAnswer: "Circuit breaker prevents cascading failures by stopping calls to failing services and providing fallback responses.",
      explanation: "When a service fails repeatedly, circuit opens, returning fallback responses. After timeout, it tries again. Implemented with Hystrix or Resilience4j.",
      example: "Payment service down, circuit breaker returns 'Payment unavailable' instead of failing the entire order process.",
      followUps: [
        {
          question: "What are the circuit states?",
          answer: "Closed (normal), Open (failing, fast-fail), Half-Open (testing recovery)."
        }
      ],
      keyPoints: ["Failure prevention", "Fallback responses", "Service resilience", "Recovery mechanism"]
    },
    {
      id: 77,
      category: "Spring Boot",
      question: "What is Spring Security?",
      simpleAnswer: "Spring Security is a framework that provides authentication, authorization, and protection against common security vulnerabilities.",
      explanation: "It handles user authentication, access control, CSRF protection, session management, and integrates with various authentication providers.",
      example: "Configure HTTP Basic auth, JWT tokens, or OAuth2 authentication with simple annotations and configuration.",
      followUps: [
        {
          question: "What's the difference between authentication and authorization?",
          answer: "Authentication verifies identity (who you are), authorization determines permissions (what you can do)."
        }
      ],
      keyPoints: ["Authentication & authorization", "Security vulnerabilities protection", "Flexible configuration", "Enterprise security"]
    },
    {
      id: 78,
      category: "Spring Boot",
      question: "What is authentication vs authorization?",
      simpleAnswer: "Authentication verifies who you are, authorization determines what you can access.",
      explanation: "Authentication: Login process confirming identity. Authorization: Checking permissions after authentication to allow/deny resource access.",
      example: "Authentication: Username/password login. Authorization: Admin can delete users, regular user cannot.",
      followUps: [
        {
          question: "Can you have authorization without authentication?",
          answer: "No, authorization requires knowing the user's identity first."
        }
      ],
      keyPoints: ["Authentication: Identity verification", "Authorization: Permission checking", "Login process", "Access control"]
    },
    {
      id: 79,
      category: "Spring Boot",
      question: "What is JWT?",
      simpleAnswer: "JWT (JSON Web Token) is a compact, self-contained token format for securely transmitting information between parties.",
      explanation: "It contains claims (user info, permissions) signed by the server. Clients send JWT in Authorization header. Server verifies signature and extracts claims.",
      example: "Login returns JWT with user ID and roles. Subsequent requests include 'Authorization: Bearer <jwt>' header.",
      followUps: [
        {
          question: "What's the advantage over sessions?",
          answer: "Stateless, scalable, works across multiple servers, no server-side storage needed."
        }
      ],
      keyPoints: ["Self-contained tokens", "Stateless authentication", "Signed claims", "Cross-service authentication"]
    },
    {
      id: 80,
      category: "Spring Boot",
      question: "How do you handle large traffic in Spring Boot?",
      simpleAnswer: "Use load balancing, caching, database optimization, async processing, and horizontal scaling.",
      explanation: "Implement caching (Redis), optimize database queries, use async methods for non-blocking operations, deploy multiple instances behind load balancer.",
      example: "Cache frequently accessed data, use @Async for email sending, scale horizontally with Kubernetes.",
      followUps: [
        {
          question: "What's the difference between vertical and horizontal scaling?",
          answer: "Vertical: More powerful server. Horizontal: More servers with load balancing."
        }
      ],
      keyPoints: ["Load balancing", "Caching strategies", "Database optimization", "Horizontal scaling"]
    },
    {
      id: 81,
      category: "Spring Boot",
      question: "How do you optimize performance?",
      simpleAnswer: "Profile application, optimize database queries, implement caching, use connection pooling, and monitor performance metrics.",
      explanation: "Use Spring Boot Actuator metrics, database indexes, Redis caching, Hibernate query optimization, and JVM tuning.",
      example: "Add database indexes on frequently queried columns, cache static data, use pagination for large result sets.",
      followUps: [
        {
          question: "What tools help with performance monitoring?",
          answer: "Spring Boot Actuator, JMX, application performance monitoring tools like New Relic or DataDog."
        }
      ],
      keyPoints: ["Database optimization", "Caching implementation", "Query performance", "Resource monitoring"]
    },
    {
      id: 82,
      category: "Spring Boot",
      question: "How do you handle logging?",
      simpleAnswer: "Configure log levels, use structured logging, centralize logs, and implement appropriate log rotation.",
      explanation: "Use Spring Boot's logging framework (Logback), configure different levels (DEBUG, INFO, WARN, ERROR), use MDC for contextual logging, send to ELK stack.",
      example: "Configure application.yml for log levels, use SLF4J for logging, implement log aggregation with ELK.",
      followUps: [
        {
          question: "What's the difference between logging levels?",
          answer: "TRACE < DEBUG < INFO < WARN < ERROR - each level includes messages from higher levels."
        }
      ],
      keyPoints: ["Log levels configuration", "Structured logging", "Log aggregation", "Contextual information"]
    },
    {
      id: 83,
      category: "Spring Boot",
      question: "How do you design a scalable REST API?",
      simpleAnswer: "Use proper HTTP methods, implement versioning, design resource-oriented URLs, handle pagination, and include proper error responses.",
      explanation: "Follow REST principles: nouns for resources, HTTP verbs for actions, stateless operations, proper status codes, and consistent response formats.",
      example: "GET /api/v1/users?page=1&size=20 - paginated user list. POST /api/v1/users - create user with 201 status.",
      followUps: [
        {
          question: "How do you handle API versioning?",
          answer: "URL versioning (/v1/users), header versioning, or content negotiation."
        }
      ],
      keyPoints: ["REST principles", "Resource-oriented design", "Proper HTTP methods", "Consistent responses"]
    },
    {
      id: 84,
      category: "Spring Boot",
      question: "How do you handle validation?",
      simpleAnswer: "Use Bean Validation annotations (@Valid, @NotNull), custom validators, and global exception handling for validation errors.",
      explanation: "Annotate DTOs with validation annotations, use @Valid in controllers, handle ConstraintViolationException in @ControllerAdvice.",
      example: "@NotBlank @Size(min=2) private String name; - validates name field in request body.",
      followUps: [
        {
          question: "What's the difference between @Valid and @Validated?",
          answer: "@Valid is JSR-303 standard, @Validated is Spring's extension for validation groups."
        }
      ],
      keyPoints: ["Bean Validation", "@Valid annotation", "Custom validators", "Error handling"]
    },
    {
      id: 85,
      category: "Spring Boot",
      question: "How do you debug production issues?",
      simpleAnswer: "Use application logs, metrics, thread dumps, heap dumps, and remote debugging when necessary.",
      explanation: "Check application logs for errors, use Actuator endpoints for health/metrics, capture thread dumps for deadlocks, analyze heap dumps for memory issues.",
      example: "Check /actuator/health for service status, analyze logs for error patterns, use jstack for thread analysis.",
      followUps: [
        {
          question: "What tools help with production debugging?",
          answer: "Spring Boot Actuator, JVM tools (jstack, jmap), application performance monitoring, and log aggregation systems."
        }
      ],
      keyPoints: ["Log analysis", "Metrics monitoring", "Thread dumps", "Heap analysis"]
    },

    // ─── VS QUESTIONS ─────────────────────────────────────────────────────────
    {
      id: 86, category: "Spring Boot", topic: "13. VS Questions",
      question: "@RestController vs @Controller",
      simpleAnswer: "@RestController = @Controller + @ResponseBody. It automatically serializes return values to JSON. @Controller is for MVC views (returns view names).",
      explanation: "@Controller is the traditional MVC controller — methods return view names resolved by ViewResolver. @RestController is for REST APIs — every method's return value is written directly to the HTTP response body as JSON (via @ResponseBody). If you're building a REST API, always use @RestController.",
      example: "@Controller: return 'home'; → renders home.html. @RestController: return user; → writes {\"id\":1,\"name\":\"John\"} to response body.",
      followUps: [{ question: "Can you mix @Controller and @ResponseBody?", answer: "Yes — @Controller + @ResponseBody on a method is equivalent to @RestController. But @RestController is cleaner." }],
      keyPoints: ["@RestController = @Controller + @ResponseBody", "@Controller: returns view names", "@RestController: returns JSON directly", "Use @RestController for REST APIs"]
    },
    {
      id: 87, category: "Spring Boot", topic: "13. VS Questions",
      question: "@PathVariable vs @RequestParam",
      simpleAnswer: "@PathVariable extracts values from the URL path (/users/42). @RequestParam extracts values from query string (/users?id=42).",
      explanation: "@PathVariable is used when the value is part of the URL structure — RESTful resource identifiers. @RequestParam is for optional filters, pagination, or search parameters in the query string. Both can have default values and be optional.",
      example: "GET /users/42 → @PathVariable Long id = 42. GET /users?page=2&size=10 → @RequestParam int page = 2, @RequestParam int size = 10.",
      followUps: [{ question: "Can @RequestParam have a default value?", answer: "Yes: @RequestParam(defaultValue = '0') int page — returns 0 if the parameter is not provided." }],
      keyPoints: ["@PathVariable: from URL path /users/{id}", "@RequestParam: from query string ?key=value", "@PathVariable: required by default", "@RequestParam: can be optional with defaultValue"]
    },
    {
      id: 88, category: "Spring Boot", topic: "13. VS Questions",
      question: "EAGER vs LAZY loading in JPA",
      simpleAnswer: "EAGER loading fetches related entities immediately with the parent. LAZY loading fetches them only when accessed.",
      explanation: "EAGER: when you load an Order, all its OrderItems are loaded immediately in the same query (or a join). LAZY: OrderItems are loaded only when you call order.getItems() — a separate query fires at that point. LAZY is the default for @OneToMany and @ManyToMany. EAGER is default for @ManyToOne and @OneToOne.",
      example: "EAGER: SELECT * FROM orders JOIN order_items — always loads items. LAZY: SELECT * FROM orders — items loaded only when accessed. LAZY can cause N+1 problem if not handled with JOIN FETCH.",
      followUps: [{ question: "What is the N+1 problem?", answer: "Loading 100 orders with LAZY items fires 1 query for orders + 100 queries for items = 101 queries. Fix with JOIN FETCH or @EntityGraph." }],
      keyPoints: ["EAGER: loads immediately, more data upfront", "LAZY: loads on access, better performance", "@OneToMany default: LAZY", "@ManyToOne default: EAGER", "LAZY can cause N+1 — use JOIN FETCH"]
    },
    {
      id: 89, category: "Spring Boot", topic: "13. VS Questions",
      question: "save() vs saveAndFlush() in Spring Data JPA",
      simpleAnswer: "save() persists to the persistence context (may not hit DB immediately). saveAndFlush() immediately synchronizes with the database.",
      explanation: "save() adds the entity to the JPA persistence context. The actual SQL INSERT/UPDATE may be batched and sent to DB at transaction commit or when Hibernate decides to flush. saveAndFlush() forces an immediate flush — the SQL is sent to DB right away within the same transaction. Use saveAndFlush() when you need to see the effect immediately (e.g., for a subsequent query in the same transaction).",
      example: "save(): entity in memory, SQL at commit. saveAndFlush(): SQL fires immediately. Use saveAndFlush() when you need the generated ID or want to trigger DB constraints immediately.",
      followUps: [{ question: "When should you use saveAndFlush()?", answer: "When you need the generated ID immediately, when testing with in-memory DB, or when a subsequent query in the same transaction needs to see the saved data." }],
      keyPoints: ["save(): persists to context, SQL at flush/commit", "saveAndFlush(): immediate SQL to DB", "saveAndFlush() useful for immediate constraint checking", "save() is more efficient for batch operations"]
    },
    {
      id: 90, category: "Spring Boot", topic: "13. VS Questions",
      question: "PUT vs PATCH in REST APIs",
      simpleAnswer: "PUT replaces the entire resource. PATCH partially updates only the specified fields.",
      explanation: "PUT is idempotent — sending the same PUT request multiple times produces the same result. It replaces the full resource, so you must send all fields. PATCH updates only the fields you send — other fields remain unchanged. PATCH is more efficient for partial updates but requires careful implementation to be idempotent.",
      example: "PUT /users/1 with {name:'John', email:'j@j.com', age:30} — replaces all fields. PATCH /users/1 with {email:'new@j.com'} — only email changes, name and age unchanged.",
      followUps: [{ question: "Is PATCH idempotent?", answer: "Not necessarily. PUT is always idempotent. PATCH can be idempotent if implemented carefully, but it's not guaranteed by the HTTP spec." }],
      keyPoints: ["PUT: full replacement, all fields required", "PATCH: partial update, only changed fields", "PUT: always idempotent", "PATCH: more efficient for partial updates"]
    },
  ]
};