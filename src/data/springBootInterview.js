export const springBootInterview = {
  categories: ["Spring Boot"],
  questions: [
    {
      id: 1,
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "What is Spring Framework?",
      simpleAnswer: "Spring Framework is a comprehensive Java framework that provides infrastructure support for developing Java applications, focusing on dependency injection, aspect-oriented programming, and enterprise features.",
      explanation: "Spring simplifies Java development by handling common infrastructure concerns like transaction management, security, and data access. It promotes loose coupling through dependency injection and provides a lightweight container for managing application components.",
      analogy: "Think of Spring as a personal assistant for your Java app. Without it, you'd spend all day doing admin work — creating objects, connecting them, managing database connections, handling transactions. Spring takes all that off your plate so you only write the actual business logic.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "What problem does Spring solve?",
      simpleAnswer: "Spring solves the complexity of enterprise Java development by providing a simplified way to configure and wire application components, manage dependencies, and handle cross-cutting concerns.",
      explanation: "Traditional Java EE was heavy and required extensive XML configuration. Spring introduced POJO-based development, annotation-driven configuration, and automatic dependency resolution, making enterprise applications easier to build and maintain.",
      analogy: "Imagine building a house where you had to manually wire every single electrical connection yourself, following a 500-page manual. Spring is like hiring an electrician who already knows the standard wiring patterns — you just tell them what rooms you need, and they handle the rest.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "What is Dependency Injection (DI)?",
      simpleAnswer: "Dependency Injection is a design pattern where Spring automatically provides objects with their dependencies instead of the objects creating them themselves.",
      explanation: "Instead of a class instantiating its dependencies with 'new', Spring injects them through constructors, setters, or fields. This promotes loose coupling and makes code more testable and maintainable.",
      analogy: "Imagine a chef (UserService) who needs a knife (UserRepository). Without DI, the chef goes to the store, buys a knife, and keeps it forever. With DI, the restaurant manager (Spring) hands the chef a knife when they arrive. The chef doesn't care where it came from — they just use it. And if you want to swap the knife for a better one, you only change it in one place.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "Types of DI in Spring?",
      simpleAnswer: "Spring supports three types of dependency injection: Constructor Injection, Setter Injection, and Field Injection.",
      explanation: "Constructor injection passes dependencies through the constructor. Setter injection uses setter methods. Field injection directly injects into private fields using @Autowired. Constructor injection is generally preferred for required dependencies.",
      analogy: "Three ways to give a chef their tools — Constructor: hand them everything when they walk in the door (can't start without it). Setter: let them start work, then hand tools as needed. Field: just leave the tools on the counter and trust they'll pick them up. Constructor is safest — you know they have everything before they start.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "What is Inversion of Control (IoC)?",
      simpleAnswer: "IoC is a principle where the control of object creation and dependency management is inverted from the application code to the Spring container.",
      explanation: "Instead of your code controlling when and how objects are created, the Spring IoC container manages the lifecycle and dependencies. This is achieved through the ApplicationContext, which acts as the central registry for beans.",
      analogy: "Normally you call a taxi — you're in control. IoC is like Uber — you request a ride and the platform decides which driver comes to you. You gave up control of 'who drives me' to the platform, and in return you get a much simpler experience. Your code just says 'I need a UserRepository' and Spring decides how to provide it.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "What is ApplicationContext?",
      simpleAnswer: "ApplicationContext is the central interface in Spring that provides configuration information to the application and manages the lifecycle of beans.",
      explanation: "It's the Spring IoC container that instantiates, configures, and assembles beans. It extends BeanFactory with additional enterprise features like internationalization, event propagation, and resource loading.",
      analogy: "Imagine a factory floor manager. When your app starts, ApplicationContext reads all your @Component annotations, creates every object, figures out what each one needs, and wires them all together. After that, whenever any part of your code needs a UserService, it just asks the manager — it doesn't create one itself.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "Difference between BeanFactory and ApplicationContext?",
      simpleAnswer: "BeanFactory is the basic IoC container providing fundamental DI functionality, while ApplicationContext extends it with enterprise features and is more commonly used.",
      explanation: "BeanFactory creates beans lazily and provides basic dependency injection. ApplicationContext adds features like automatic bean post-processing, internationalization, event publishing, and resource loading from various sources.",
      analogy: "BeanFactory is a basic vending machine — put in a request, get a bean. ApplicationContext is a full-service cafeteria — it has everything the vending machine has, plus hot food, announcements, multiple languages, and it restocks itself automatically. For any real application, you want the cafeteria.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "What is a Spring Bean?",
      simpleAnswer: "A Spring Bean is an object that is instantiated, assembled, and managed by the Spring IoC container.",
      explanation: "Beans are the backbone of Spring applications. They are created from classes annotated with @Component, @Service, etc., or defined in configuration classes. The container manages their lifecycle, dependencies, and scope.",
      analogy: "A Spring Bean is like a company employee on the payroll. The company (Spring) hired them, gave them a desk, connected them with their team, and manages their schedule. You don't create employees yourself — HR (Spring) handles that. You just call the right department when you need something done.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "Bean scopes in Spring?",
      simpleAnswer: "Spring provides several bean scopes: singleton (default), prototype, request, session, application, and websocket.",
      explanation: "Singleton creates one instance per container. Prototype creates new instances each time. Request/session scopes are for web applications, creating beans per HTTP request/session. Application scope shares beans across servlet context.",
      analogy: "Singleton is like the office printer — one shared printer for everyone. Prototype is like a disposable coffee cup — every person gets their own fresh one. Request scope is like a waiter's notepad — created fresh for each customer's order and thrown away when they leave.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "What is Bean Life Cycle?",
      simpleAnswer: "Bean lifecycle includes instantiation, dependency injection, initialization (post-construction), usage, and destruction.",
      explanation: "Spring creates bean instance, injects dependencies, calls initialization callbacks (@PostConstruct), bean is ready for use, and finally destroyed (@PreDestroy) when container shuts down. This can be customized with BeanPostProcessor.",
      analogy: "Think of it like an employee's journey at a company: hired (instantiated) → given a laptop and access cards (dependencies injected) → attends onboarding (@PostConstruct) → does their job (in use) → hands back equipment and exits (@PreDestroy). Spring manages every stage of this lifecycle.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "What is @Component?",
      simpleAnswer: "@Component is a Spring stereotype annotation that marks a class as a Spring-managed bean.",
      explanation: "Any class annotated with @Component becomes a candidate for auto-detection by Spring's component scanning. The container will create an instance, manage its lifecycle, and make it available for dependency injection.",
      analogy: "Putting @Component on a class is like pinning a name badge on someone at a conference. Spring walks around the room (scans packages), spots everyone with a badge, and adds them to its contact list. From that point on, Spring knows they exist and can introduce them to others who need them.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "1. Spring Core",
      question: "Difference between @Component, @Service, @Repository, @Controller?",
      simpleAnswer: "@Component is generic, @Service for business logic, @Repository for data access, @Controller for web controllers. They all create beans but provide semantic meaning.",
      explanation: "All are stereotypes that create beans, but they serve different purposes: @Service for service layer, @Repository enables exception translation, @Controller for MVC controllers. @Component is used when none of the others fit.",
      analogy: "They're all 'employees' (@Component) but with different job titles. @Service is a Business Analyst, @Repository is a Database Admin, @Controller is a Customer Support Rep. The title tells you and your teammates what this person does — and @Repository gets a special bonus: it automatically translates database errors into a language the rest of the app understands.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "1. Spring Core",
      question: "What is @Autowired? How it works?",
      simpleAnswer: "@Autowired automatically injects dependencies by type, eliminating the need for manual wiring.",
      explanation: "Spring scans for beans matching the required type and injects them. It works by type by default, but can use @Qualifier for name-based resolution. Can be applied to constructors, setters, or fields.",
      analogy: "Imagine a new employee joins and needs a laptop. Instead of going to IT themselves, they just put a sticky note on their desk saying 'I need a laptop'. IT (Spring) sees the note, finds the right laptop in the inventory, and places it on the desk. @Autowired is that sticky note.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "1. Spring Core",
      question: "What is @Qualifier?",
      simpleAnswer: "@Qualifier specifies which bean to inject when multiple beans of the same type exist.",
      explanation: "When you have multiple implementations of an interface, @Qualifier with a bean name helps Spring choose the correct one. It's used alongside @Autowired to resolve ambiguity.",
      analogy: "You ask IT for 'a laptop' but there are MacBooks and ThinkPads in stock. IT doesn't know which one you want. @Qualifier is like saying 'I need a laptop — specifically a MacBook'. Now IT knows exactly what to bring.",
      example: "@Autowired @Qualifier(\"userDaoImpl\") private UserDao userDao; - injects the specific UserDaoImpl bean.",
      followUps: [
        {
          question: "Can @Qualifier be used alone?",
          answer: "Usually it is used on an injection point together with dependency injection. It can also appear on @Bean methods or parameters to help Spring choose a specific candidate."
        }
      ],
      keyPoints: ["Resolves bean ambiguity", "Specifies bean by name", "Used with @Autowired", "Works with multiple implementations"]
    },
    {
      id: 15,
      category: "Spring Boot", difficulty: 2,
      topic: "1. Spring Core",
      question: "What is @Primary?",
      simpleAnswer: "@Primary marks a bean as the default choice when multiple beans of the same type exist.",
      explanation: "When Spring finds multiple candidates for injection, the @Primary annotated bean is chosen automatically. It's simpler than @Qualifier but less specific.",
      analogy: "@Primary is like setting a default printer in your office. When anyone prints without specifying, it goes to the main printer. If someone specifically needs the colour printer, they choose it manually (@Qualifier). But for everyone else, the default just works.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "1. Spring Core",
      question: "What is @Value?",
      simpleAnswer: "@Value injects values from properties files or environment variables into Spring beans.",
      explanation: "It allows externalizing configuration values. Spring resolves ${property.name} placeholders from application.properties, environment variables, or system properties.",
      analogy: "Think of your app as a recipe. @Value is like leaving blank spaces in the recipe — 'bake at ___ degrees for ___ minutes'. The actual numbers come from a separate settings card (application.properties). You can change the settings card without rewriting the recipe — same code runs in dev (low heat) and prod (full heat).",
      example: "@Value('${app.timeout:30}') private int timeout; - injects the app.timeout property with 30 as default.",
      followUps: [
        {
          question: "Can @Value inject complex objects?",
          answer: "It is best for simple values or small expressions. While Spring can convert some collections and simple structures, @ConfigurationProperties is the better choice for grouped, typed configuration objects."
        }
      ],
      keyPoints: ["Injects external values", "Supports property placeholders", "Works with defaults", "From properties files or environment"]
    },
    {
      id: 17,
      category: "Spring Boot", difficulty: 2,
      topic: "1. Spring Core",
      question: "What is @Configuration?",
      simpleAnswer: "@Configuration marks a class as a source of bean definitions, replacing XML configuration.",
      explanation: "Classes annotated with @Configuration contain @Bean methods that define Spring beans. In the default 'full configuration' mode, Spring proxies these classes so calls between @Bean methods still return the managed singleton bean instead of creating a new object manually.",
      analogy: "A @Configuration class is like a blueprint document for a building. It doesn't build anything itself — it just describes what rooms (beans) exist and how they connect. Spring reads the blueprint and does the actual construction.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "1. Spring Core",
      question: "What is @Bean?",
      simpleAnswer: "@Bean is a method-level annotation that defines a Spring bean within a @Configuration class.",
      explanation: "Methods annotated with @Bean return objects that become Spring-managed beans. The method name becomes the bean name, and Spring handles the lifecycle.",
      analogy: "@Bean is like a factory order form. You write a method that says 'here is how to build a DataSource' and Spring files that form. Whenever anything in the app needs a DataSource, Spring runs your method once, keeps the result, and hands it out to everyone who asks.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "1. Spring Core",
      question: "Difference between @Bean and @Component?",
      simpleAnswer: "@Component marks a class as a bean (class-level), while @Bean marks a method that returns a bean (method-level).",
      explanation: "@Component is for your own classes that you want Spring to manage. @Bean is for third-party classes or when you need programmatic bean creation with custom logic.",
      analogy: "@Component is like hiring someone directly — they join the company and Spring manages them. @Bean is like hiring a contractor through an agency — you write a contract (the method) describing exactly how to bring them on board. You use @Bean when you can't put a name badge (@Component) on someone because they work for a different company (third-party library).",
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
      category: "Spring Boot", difficulty: 1,
      topic: "2. Spring Boot Basics",
      question: "What is Spring Boot?",
      simpleAnswer: "Spring Boot is a framework built on top of Spring Framework that simplifies the creation of production-ready applications with minimal configuration.",
      explanation: "It provides auto-configuration, embedded servers, and opinionated defaults. Instead of spending time on configuration, you focus on business logic. It includes starters for common dependencies and production-ready features.",
      analogy: "Spring is like buying all the parts to build a PC — powerful but you have to assemble everything yourself. Spring Boot is like buying a pre-built gaming PC — same components, already assembled, ready to use out of the box. You can still customise it, but you don't have to start from scratch.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
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
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
      question: "What is auto-configuration?",
      simpleAnswer: "Auto-configuration automatically configures Spring applications based on the dependencies present in the classpath.",
      explanation: "Spring Boot scans the classpath and automatically configures beans for common scenarios. If you have H2 on classpath, it configures an in-memory database. If you have spring-web, it configures Tomcat and Spring MVC.",
      analogy: "Auto-configuration is like a smart hotel room. When you check in, the room detects you brought a laptop and automatically sets up the desk lamp, power strip, and WiFi. You didn't ask for any of it — the room just noticed what you had and configured itself. If you brought a guitar instead, it would set up a music stand.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
      question: "How Spring Boot auto-configuration works internally?",
      simpleAnswer: "Spring Boot uses @Conditional annotations on auto-configuration classes to determine when to apply configurations based on classpath and environment.",
      explanation: "Auto-configuration classes are annotated with @ConditionalOnClass, @ConditionalOnMissingBean, etc. Spring Boot evaluates these conditions at startup and applies configurations only when appropriate.",
      analogy: "Think of it like a smart assistant with a checklist: 'Do you have a database driver? Yes → set up a DataSource. Do you already have a DataSource configured? Yes → skip mine, use yours. Do you have spring-web? Yes → set up Tomcat.' It only acts when the conditions are right and never overrides your own choices.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "2. Spring Boot Basics",
      question: "What is @SpringBootApplication?",
      simpleAnswer: "@SpringBootApplication is a convenience annotation that combines @Configuration, @EnableAutoConfiguration, and @ComponentScan.",
      explanation: "It marks the main class of a Spring Boot application. @Configuration enables Java-based config, @EnableAutoConfiguration enables auto-config, and @ComponentScan enables component scanning.",
      analogy: "@SpringBootApplication is like a master key that unlocks three doors at once: the configuration room (@Configuration), the auto-setup room (@EnableAutoConfiguration), and the component discovery room (@ComponentScan). Instead of using three separate keys, you use one.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "2. Spring Boot Basics",
      question: "What is embedded server in Spring Boot?",
      simpleAnswer: "Embedded server is a web server (Tomcat, Jetty, or Undertow) that runs inside the application JAR, eliminating the need for a separate application server.",
      explanation: "Spring Boot packages the server with your application. When you run the JAR, it starts the embedded server automatically. This simplifies deployment and makes applications self-contained.",
      analogy: "Traditional deployment is like a restaurant that needs a building (application server) before it can serve food. Embedded server is like a food truck — the kitchen is built into the vehicle. You drive it anywhere and start serving immediately. No building required.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
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
      category: "Spring Boot", difficulty: 1,
      topic: "3. Configuration",
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
      category: "Spring Boot", difficulty: 1,
      topic: "3. Configuration",
      question: "What are profiles in Spring Boot?",
      simpleAnswer: "Profiles allow you to have different configurations for different environments (dev, test, prod) in the same application.",
      explanation: "You can define profile-specific properties in application-{profile}.properties files. Activate profiles via spring.profiles.active property or command line.",
      analogy: "Profiles are like wardrobe presets. You have a 'work outfit' (prod — formal, strict, real database), a 'casual outfit' (dev — relaxed, local database, debug logging), and a 'gym outfit' (test — minimal, in-memory database). Same person, different settings for different situations.",
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
      category: "Spring Boot", difficulty: 1,
      topic: "3. Configuration",
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
      category: "Spring Boot", difficulty: 1,
      topic: "3. Configuration",
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
      category: "Spring Boot", difficulty: 2,
      topic: "3. Configuration",
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
      category: "Spring Boot", difficulty: 2,
      topic: "3. Configuration",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is Spring MVC?",
      simpleAnswer: "Spring MVC is a web framework that implements the Model-View-Controller pattern for building web applications.",
      explanation: "It provides a clean separation between the model (data), view (presentation), and controller (logic). DispatcherServlet handles requests and routes them to appropriate controllers.",
      analogy: "Think of a restaurant. The customer (browser) places an order. The waiter (Controller) takes it, goes to the kitchen (Service/Model) to get the food, and brings it back. Spring MVC is the restaurant's operating system — it manages how orders flow from the front door to the kitchen and back.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is DispatcherServlet?",
      simpleAnswer: "DispatcherServlet is the front controller in Spring MVC that receives all HTTP requests and delegates them to appropriate handlers.",
      explanation: "It's the central servlet that handles incoming requests, determines which controller should process them, and manages the response. It's configured automatically in Spring Boot web applications.",
      analogy: "DispatcherServlet is like the receptionist at a large office building. Every visitor (HTTP request) walks through the front door and the receptionist decides which department (controller) to send them to. No one gets past without going through the receptionist first.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is @RestController?",
      simpleAnswer: "@RestController is a convenience annotation that combines @Controller and @ResponseBody for building REST APIs.",
      explanation: "It marks a class as a web controller where every method returns a domain object instead of a view. Spring automatically serializes the return value to JSON/XML.",
      analogy: "@RestController is like a vending machine — you press a button (call an endpoint) and it directly gives you the product (JSON data). A regular @Controller is like a waiter who takes your order and brings you a full meal presentation (HTML page). For APIs, you just want the data, not the presentation.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is @RequestMapping?",
      simpleAnswer: "@RequestMapping maps HTTP requests to handler methods based on URL pattern and HTTP method.",
      explanation: "It specifies which requests a method should handle. Can map by path, HTTP method, headers, parameters, etc. More specific annotations like @GetMapping extend it.",
      analogy: "@RequestMapping is like a post office sorting rule — 'any letter addressed to /users with a GET stamp goes to this handler'. @GetMapping, @PostMapping etc. are pre-printed stamps for the most common cases, so you don't have to write the full rule every time.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is @PathVariable?",
      simpleAnswer: "@PathVariable extracts values from the URI path and binds them to method parameters.",
      explanation: "For RESTful URLs like /users/{id}, @PathVariable binds the {id} part to a method parameter. Essential for resource-based APIs.",
      analogy: "@PathVariable is like reading the house number off a street address. The URL /users/42 is like '42 Users Street'. @PathVariable pulls out the '42' and hands it to your method so you know exactly which user was requested.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is @RequestParam?",
      simpleAnswer: "@RequestParam binds request parameters (query parameters or form data) to method parameters.",
      explanation: "Extracts values from URL query string (?name=john) or form submissions. Optional parameters can have default values.",
      analogy: "@RequestParam is like reading the filters on a search form. When you search Google for 'java tutorial' with 10 results per page, the URL becomes ?q=java+tutorial&num=10. @RequestParam pulls out those filter values so your method knows what the user is searching for.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is @RequestBody?",
      simpleAnswer: "@RequestBody binds the HTTP request body to a method parameter, typically for JSON/XML input.",
      explanation: "Spring uses HttpMessageConverter to deserialize the request body into a Java object. Commonly used in POST/PUT requests for creating/updating resources.",
      analogy: "@RequestBody is like a parcel delivery. The client sends a package (JSON in the request body). @RequestBody is the instruction to 'open the package and hand me the contents as a Java object'. Without it, you'd just get the raw cardboard box (a String of JSON).",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is ResponseEntity?",
      simpleAnswer: "ResponseEntity represents the entire HTTP response, allowing control over status code, headers, and body.",
      explanation: "It wraps the response body and provides methods to set HTTP status, headers, and body. Useful for custom responses, error handling, and REST APIs.",
      analogy: "Returning a plain object from a controller is like handing someone a letter with no envelope. ResponseEntity is the full envelope — you control the letter inside (body), the stamp (status code), and any sticky notes on the outside (headers). Use it when you need to say more than just 'here's your data'.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is exception handling in Spring?",
      simpleAnswer: "Spring provides mechanisms to handle exceptions gracefully in web applications using @ExceptionHandler and @ControllerAdvice.",
      explanation: "Instead of returning stack traces, you can define methods that catch exceptions and return appropriate HTTP responses. This centralizes error handling and provides consistent error responses.",
      analogy: "Without exception handling, a crash in your app is like a restaurant kitchen fire that burns the whole building down — the customer sees chaos. With @ControllerAdvice, it's like having a fire suppression system — the kitchen problem is contained, and the customer just gets a polite 'sorry, that dish isn't available today' message.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is @ControllerAdvice?",
      simpleAnswer: "@ControllerAdvice is a specialization of @Component that enables global exception handling and other cross-cutting concerns.",
      explanation: "Classes annotated with @ControllerAdvice can contain @ExceptionHandler, @InitBinder, and @ModelAttribute methods that apply to all controllers in the application or specific packages.",
      analogy: "@ControllerAdvice is like a company-wide HR policy. Instead of each department (controller) writing its own rules for handling complaints (exceptions), HR (@ControllerAdvice) sets one policy that applies everywhere. Consistent, centralised, and you only write it once.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is @ExceptionHandler?",
      simpleAnswer: "@ExceptionHandler defines methods that handle specific exceptions thrown from controller methods.",
      explanation: "When an exception occurs in a controller, Spring looks for @ExceptionHandler methods that match the exception type. The method can return error responses or redirect to error pages.",
      analogy: "@ExceptionHandler is like a specialist doctor. When something goes wrong (exception thrown), instead of the whole hospital shutting down, the right specialist is called in. @ExceptionHandler(UserNotFoundException.class) is the 'missing user specialist' — only called when that specific problem occurs.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
      question: "What is Spring Data JPA?",
      simpleAnswer: "Spring Data JPA is a Spring module that simplifies data access by providing repository interfaces and automatic query generation.",
      explanation: "It eliminates boilerplate code for CRUD operations. You define repository interfaces extending JpaRepository, and Spring generates implementations automatically.",
      analogy: "Before Spring Data JPA, writing database code was like building furniture from scratch every time. Spring Data JPA is like IKEA — you pick the design (interface), and the implementation comes pre-built. You just declare what you need: 'findByEmail', 'findByAgeGreaterThan' — Spring figures out the SQL.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
      question: "What is Hibernate?",
      simpleAnswer: "Hibernate is an ORM (Object-Relational Mapping) framework that maps Java objects to database tables.",
      explanation: "It handles the conversion between Java objects and database records, manages database connections, and provides HQL (Hibernate Query Language) for database operations.",
      analogy: "Hibernate is like a universal translator between two different languages — Java objects and SQL tables. You speak Java (save a User object), Hibernate translates it into SQL (INSERT INTO user...), sends it to the database, and translates the result back into Java objects for you.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
      question: "What is Entity?",
      simpleAnswer: "An Entity is a Java class that represents a database table, with fields mapping to table columns.",
      explanation: "Annotated with @Entity, entities define the structure of database tables. JPA/Hibernate uses them to generate DDL and perform CRUD operations.",
      analogy: "An @Entity class is like a form template. The class is the blank form, each field is a box on the form, and each row in the database is a filled-out copy of that form. Hibernate is the filing system that stores and retrieves those filled forms.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
      question: "What is lazy vs eager loading?",
      simpleAnswer: "Lazy loading loads related entities only when accessed, eager loading loads them immediately with the main entity.",
      explanation: "Lazy (@OneToMany(fetch = FetchType.LAZY)) improves performance by avoiding unnecessary data loading. Eager loads everything at once, potentially causing N+1 queries.",
      analogy: "Lazy loading is like a restaurant menu — you only order what you want when you want it. Eager loading is like a buffet where every dish is brought to your table the moment you sit down, whether you'll eat it or not. For most cases, the menu (lazy) is more efficient.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
      question: "What is N+1 problem?",
      simpleAnswer: "N+1 problem occurs when fetching N entities triggers N+1 database queries instead of 1.",
      explanation: "Loading 10 users with lazy orders executes 1 query for users + 10 queries for orders each. Solutions: eager loading, @Query with JOIN, or entity graphs.",
      analogy: "Imagine you need to find the manager of each of 10 employees. The N+1 way: go to HR once to get the employee list (1 trip), then go back to HR 10 separate times to ask 'who is this person's manager?' (10 trips) = 11 trips total. The smart way: ask HR for all employees AND their managers in one trip.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "6. Transactions",
      question: "What is transaction?",
      simpleAnswer: "A transaction is a sequence of database operations that are treated as a single unit of work.",
      explanation: "All operations in a transaction succeed or fail together. If any operation fails, all are rolled back. Ensures data consistency and integrity.",
      analogy: "A transaction is like a bank transfer. You deduct ₹1000 from Account A and add ₹1000 to Account B. These two steps are one transaction — either both happen or neither does. If the power cuts out after the deduction but before the deposit, the whole thing rolls back. No money disappears into thin air.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "6. Transactions",
      question: "What is @Transactional?",
      simpleAnswer: "@Transactional marks a method or class as transactional, managing database transactions automatically.",
      explanation: "Spring creates a transaction before the method executes and commits it after successful completion. On exception, it rolls back automatically.",
      analogy: "@Transactional is like an undo button for your database. Spring wraps your method in a safety net — if everything goes well, it saves all changes at the end. If anything throws an exception, it hits undo and the database goes back to exactly how it was before the method started.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "6. Transactions",
      question: "What is propagation?",
      simpleAnswer: "Transaction propagation defines how transactions behave when a transactional method calls another transactional method.",
      explanation: "REQUIRED (default) joins an existing transaction or creates a new one. REQUIRES_NEW suspends the current transaction and starts a fresh one. NEVER means the method must run without a transaction and Spring throws an exception if one already exists.",
      analogy: "Imagine a meeting room booking. REQUIRED: if a meeting is already in progress, join it — otherwise book a new room. REQUIRES_NEW: always book a separate private room, even if a meeting is happening. MANDATORY: refuse to work unless you're already in a meeting. Each propagation type is a different policy for how to handle the 'am I already in a transaction?' question.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "6. Transactions",
      question: "What is isolation level?",
      simpleAnswer: "Isolation level defines how transactions are isolated from each other to prevent concurrency issues.",
      explanation: "READ_UNCOMMITTED allows dirty reads. READ_COMMITTED prevents dirty reads. REPEATABLE_READ prevents non-repeatable reads. SERIALIZABLE prevents all concurrency issues but slowest.",
      analogy: "Isolation levels are like noise-cancelling headphones with different settings. Read Uncommitted is no headphones — you hear everything, including unfinished conversations. Read Committed blocks out background noise. Repeatable Read keeps your current conversation stable. Serializable is a soundproof room — complete silence, but you have to wait for the room to be free.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "10. Monitoring & Production",
      question: "What is Actuator?",
      simpleAnswer: "Spring Boot Actuator provides production-ready features like health checks, metrics, and monitoring endpoints.",
      explanation: "It adds endpoints like /actuator/health, /actuator/metrics, /actuator/info for monitoring application health, performance, and configuration.",
      analogy: "Spring Boot Actuator is like the dashboard of a car. While the engine (your application) runs, the dashboard shows you speed (throughput), fuel level (memory), engine temperature (health), and warning lights (errors) — all in real time without stopping the car. You can check the car's vitals without opening the hood.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
      question: "What is Spring Boot Starter?",
      simpleAnswer: "Starters are dependency descriptors that include all necessary dependencies for a specific functionality.",
      explanation: "Instead of manually managing versions and dependencies, you add one starter that brings in the compatible set. spring-boot-starter-web brings Tomcat, Jackson, Spring MVC, etc.",
      analogy: "A Spring Boot Starter is like a meal kit delivery service. Instead of going to multiple stores to buy each ingredient separately (and worrying about whether they're compatible), you get one box with everything pre-selected and pre-measured. spring-boot-starter-web is the 'pasta dinner kit' — Tomcat, Jackson, Spring MVC, all in one compatible package.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
      question: "What is dependency management in Spring Boot?",
      simpleAnswer: "Spring Boot manages dependency versions through its parent POM, ensuring compatibility between libraries.",
      explanation: "The spring-boot-starter-parent defines versions for hundreds of dependencies. When you add a starter, you get tested, compatible versions automatically.",
      analogy: "Spring Boot's dependency management is like a curated playlist. Instead of manually picking songs that work well together (and worrying about clashing styles), someone has already assembled a playlist of compatible tracks. You just add the playlist to your library — all the versions are pre-tested to work together.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
      question: "What is DevTools?",
      simpleAnswer: "Spring Boot DevTools provides development-time features like automatic restart, live reload, and remote debugging.",
      explanation: "It enhances the development experience with fast application restarts, browser live reload, and development-specific configurations that are disabled in production.",
      analogy: "Spring Boot DevTools is like a live preview mode in a design tool. When you change a CSS file, the browser updates instantly without you manually refreshing. DevTools does the same for your Spring Boot app — save a file, and the app restarts automatically. It's a development convenience that disappears in production.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
      question: "What is Spring Boot CLI?",
      simpleAnswer: "Spring Boot CLI is a command-line tool for quickly creating and running Spring Boot applications using Groovy scripts.",
      explanation: "It allows writing Spring applications as Groovy scripts without compilation. Useful for prototyping, learning, and simple applications.",
      analogy: "Spring Boot CLI is like a food truck compared to a full restaurant. A full restaurant (Maven/Gradle project) has a kitchen, staff, and full setup — great for serious work. A food truck (CLI with Groovy scripts) is quick to set up and perfect for a quick meal (prototype or demo). You trade features for speed of setup.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "9. Microservices",
      question: "How microservices interact with each other?",
      simpleAnswer: "Microservices interact through HTTP APIs (REST), message queues, or event streaming.",
      explanation: "REST APIs for synchronous communication, message queues for asynchronous decoupling, events for loose coupling. API Gateway routes requests, service discovery finds services.",
      analogy: "Microservices communicating is like departments in a large company. The HR department (UserService) and Finance department (PaymentService) don't share an office — they communicate by phone (REST API) for urgent matters or by internal memo (message queue) for non-urgent tasks. An API Gateway is like the company receptionist who routes all incoming calls to the right department.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "9. Microservices",
      question: "What is REST vs messaging?",
      simpleAnswer: "REST is synchronous request-response communication, messaging is asynchronous fire-and-forget.",
      explanation: "REST: Client waits for server response. Messaging: Producer sends message to queue/broker, consumer processes asynchronously. REST for immediate responses, messaging for decoupling.",
      analogy: "REST vs messaging is like a phone call versus sending a letter. A phone call (REST) is synchronous — you wait on the line for an answer. A letter (messaging) is asynchronous — you send it and go about your day. The recipient reads it when they're ready and may send a reply later. Use a phone call when you need an immediate answer; use a letter when you don't.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "9. Microservices",
      question: "What is service discovery?",
      simpleAnswer: "Service discovery automatically finds and connects to microservice instances without hard-coded addresses.",
      explanation: "In dynamic environments, services register with a registry (Eureka, Consul). Clients query the registry to find service locations. Essential for scaling and resilience.",
      analogy: "Service discovery is like a phone directory for microservices. Instead of hardcoding a colleague's phone number (IP address) that might change when they move desks, you look them up by name in the directory (Eureka registry). The directory always has their current number. When they move, they update the directory — you don't need to update your contacts.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "9. Microservices",
      question: "What is API Gateway?",
      simpleAnswer: "API Gateway is a single entry point for all client requests to microservices, handling routing, authentication, and cross-cutting concerns.",
      explanation: "It routes requests to appropriate services, handles authentication, rate limiting, logging, and response transformation. Simplifies client integration.",
      analogy: "An API Gateway is like a hotel concierge. Guests (clients) don't go directly to housekeeping, room service, or the spa — they ask the concierge. The concierge routes requests to the right department, handles authentication (checking if you're a registered guest), and can even combine responses from multiple departments into one answer.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "9. Microservices",
      question: "What is Feign Client?",
      simpleAnswer: "Feign Client is a declarative HTTP client that simplifies calling REST APIs with interface-based programming.",
      explanation: "Instead of RestTemplate code, you define an interface with annotated methods. Spring generates the implementation automatically.",
      analogy: "Feign Client is like a travel agent for HTTP calls. Instead of booking each flight, hotel, and car rental yourself (writing RestTemplate code), you tell the travel agent what you need (define an interface), and they handle all the details. You just call the interface method — Feign handles the HTTP request, URL construction, and response parsing.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "9. Microservices",
      question: "What is circuit breaker?",
      simpleAnswer: "Circuit breaker prevents cascading failures by stopping calls to failing services and providing fallback responses.",
      explanation: "When a service fails repeatedly, circuit opens, returning fallback responses. After timeout, it tries again. Implemented with Hystrix or Resilience4j.",
      analogy: "A circuit breaker is like the electrical circuit breaker in your home. When there's a power surge (too many failures), the breaker trips (circuit opens) to protect the rest of the house (your application). You don't keep trying to use the faulty circuit — you wait for it to cool down, then carefully test it (half-open state) before restoring full power.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "8. Security",
      question: "What is Spring Security?",
      simpleAnswer: "Spring Security is a framework that provides authentication, authorization, and protection against common security vulnerabilities.",
      explanation: "It handles user authentication, access control, CSRF protection, session management, and integrates with various authentication providers.",
      analogy: "Spring Security is like a multi-layer security system for a building. The front door checks your ID (authentication). Different floors have different access cards (authorization). Security cameras log activity (audit). The system also protects against known attack patterns — like someone trying to tailgate through the door (CSRF protection).",
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
      category: "Spring Boot", difficulty: 2,
      topic: "8. Security",
      question: "What is authentication vs authorization?",
      simpleAnswer: "Authentication verifies who you are, authorization determines what you can access.",
      explanation: "Authentication: Login process confirming identity. Authorization: Checking permissions after authentication to allow/deny resource access.",
      analogy: "Authentication is like showing your passport at the airport — it proves who you are. Authorization is like having a boarding pass for a specific flight — it determines what you're allowed to do. You can be authenticated (valid passport) but not authorized (wrong flight). Both checks are needed, and authentication always comes first.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "8. Security",
      question: "What is JWT?",
      simpleAnswer: "JWT (JSON Web Token) is a compact, self-contained token format for securely transmitting information between parties.",
      explanation: "It contains claims (user info, permissions) signed by the server. Clients send JWT in Authorization header. Server verifies signature and extracts claims.",
      analogy: "A JWT is like a signed wristband at a festival. The organizer stamps it when you enter (login). At every ride or bar, you show your wristband — they can verify it's genuine without calling the organizer. The wristband has your access level printed on it. When it expires, you need a new one.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "10. Monitoring & Production",
      question: "How do you handle large traffic in Spring Boot?",
      simpleAnswer: "Use load balancing, caching, database optimization, async processing, and horizontal scaling.",
      explanation: "Implement caching (Redis), optimize database queries, use async methods for non-blocking operations, deploy multiple instances behind load balancer.",
      analogy: "Handling large traffic is like running a busy airport. You add more check-in counters (horizontal scaling), pre-print boarding passes for frequent flyers (caching), handle baggage separately from passengers (async processing), and have a fast lane for priority passengers (rate limiting tiers). No single bottleneck can shut down the whole airport.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "10. Monitoring & Production",
      question: "How do you optimize performance?",
      simpleAnswer: "Profile application, optimize database queries, implement caching, use connection pooling, and monitor performance metrics.",
      explanation: "Use Spring Boot Actuator metrics, database indexes, Redis caching, Hibernate query optimization, and JVM tuning.",
      analogy: "Performance optimization is like tuning a car engine. You don't replace the whole car — you identify the specific bottleneck (is it the fuel injection? the exhaust?), fix that part, and measure the improvement. Profiling tools are your diagnostic equipment. You fix the slowest part first, then measure again.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "10. Monitoring & Production",
      question: "How do you handle logging?",
      simpleAnswer: "Configure log levels, use structured logging, centralize logs, and implement appropriate log rotation.",
      explanation: "Use Spring Boot's logging framework (Logback), configure different levels (DEBUG, INFO, WARN, ERROR), use MDC for contextual logging, send to ELK stack.",
      analogy: "Logging is like a flight recorder on an airplane. It continuously records what's happening so that if something goes wrong, you can replay the events and understand exactly what happened and when. Different log levels are like different recording resolutions — DEBUG captures everything, INFO captures key events, ERROR captures only critical failures.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "10. Monitoring & Production",
      question: "How do you design a scalable REST API?",
      simpleAnswer: "Use proper HTTP methods, implement versioning, design resource-oriented URLs, handle pagination, and include proper error responses.",
      explanation: "Follow REST principles: nouns for resources, HTTP verbs for actions, stateless operations, proper status codes, and consistent response formats.",
      analogy: "Designing a scalable REST API is like designing a city's road system. You plan the major roads (resources), decide the traffic rules (HTTP methods), put up clear signs (status codes), build in room for future expansion (versioning), and design intersections that can handle rush hour (pagination and caching). A well-designed city is easy to navigate even for first-time visitors.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "10. Monitoring & Production",
      question: "How do you handle validation?",
      simpleAnswer: "Use Bean Validation annotations (@Valid, @NotNull), custom validators, and global exception handling for validation errors.",
      explanation: "Annotate DTOs with validation annotations, use @Valid in controllers, handle ConstraintViolationException in @ControllerAdvice.",
      analogy: "Input validation is like a bouncer at the door who checks IDs before anyone enters. Before any data reaches your business logic (the party inside), the bouncer checks that it's valid — not null, correct format, within allowed range. Bad data gets turned away at the door — it never reaches the inside of the club.",
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
      category: "Spring Boot", difficulty: 2,
      topic: "10. Monitoring & Production",
      question: "How do you debug production issues?",
      simpleAnswer: "Use application logs, metrics, thread dumps, heap dumps, and remote debugging when necessary.",
      explanation: "Check application logs for errors, use Actuator endpoints for health/metrics, capture thread dumps for deadlocks, analyze heap dumps for memory issues.",
      analogy: "Debugging production issues is like a detective investigating a crime scene. You start with the evidence (logs and metrics), trace the timeline (request flow), check for recent changes (deployments), and narrow down the suspect (the specific service or query that failed). You follow the clues rather than guessing.",
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
      id: 86, category: "Spring Boot", difficulty: 2, topic: "13. VS Questions",
      question: "@RestController vs @Controller",
      simpleAnswer: "@RestController = @Controller + @ResponseBody. It automatically serializes return values to JSON. @Controller is for MVC views (returns view names).",
      explanation: "@Controller is the traditional MVC controller — methods return view names resolved by ViewResolver. @RestController is for REST APIs — every method's return value is written directly to the HTTP response body as JSON (via @ResponseBody). If you're building a REST API, always use @RestController.",
      analogy: "@Controller is like a tour guide who gives you directions to a destination (returns a view name). @RestController is like a delivery driver who hands you the package directly (returns JSON data). The tour guide points you somewhere else; the delivery driver gives you the thing itself.",
      example: "@Controller: return 'home'; → renders home.html. @RestController: return user; → writes {\"id\":1,\"name\":\"John\"} to response body.",
      followUps: [{ question: "Can you mix @Controller and @ResponseBody?", answer: "Yes — @Controller + @ResponseBody on a method is equivalent to @RestController. But @RestController is cleaner." }],
        keyPoints: [
          "@RestController: Automatically serializes all returned objects directly into the HTTP response body as JSON or XML.",
          "@Controller: Primarily used for traditional MVC applications to return rendered HTML view names (like Thymeleaf or JSP).",
          "@RestController: Acts as a convenient shortcut combining the @Controller and @ResponseBody annotations.",
          "@Controller: Requires the explicit addition of the @ResponseBody annotation on methods to return JSON data."
        ]
    },
    {
      id: 87, category: "Spring Boot", difficulty: 2, topic: "13. VS Questions",
      question: "@PathVariable vs @RequestParam",
      simpleAnswer: "@PathVariable extracts values from the URL path (/users/42). @RequestParam extracts values from query string (/users?id=42).",
      explanation: "@PathVariable is used when the value is part of the URL structure — RESTful resource identifiers. @RequestParam is for optional filters, pagination, or search parameters in the query string. Both can have default values and be optional.",
      analogy: "@PathVariable is like a house address — it's part of the location itself and identifies exactly which resource you mean. @RequestParam is like instructions to the delivery driver — 'leave it at the back door, ring twice'. The address is required to find the house; the instructions are optional extras that modify how you interact with it.",
      example: "GET /users/42 → @PathVariable Long id = 42. GET /users?page=2&size=10 → @RequestParam int page = 2, @RequestParam int size = 10.",
      followUps: [{ question: "Can @RequestParam have a default value?", answer: "Yes: @RequestParam(defaultValue = '0') int page — returns 0 if the parameter is not provided." }],
        keyPoints: [
          "@PathVariable: Extracts values directly from the URL path segments, making it ideal for RESTful resource identification.",
          "@RequestParam: Extracts values from the URL query string or form data, making it ideal for filters, sorting, and pagination.",
          "@PathVariable: Values are required by default and define the actual route structure of the endpoint.",
          "@RequestParam: Values can be easily marked as optional and support default fallback values."
        ]
    },
    {
      id: 88, category: "Spring Boot", difficulty: 2, topic: "13. VS Questions",
        question: "EAGER loading vs LAZY loading",
      simpleAnswer: "EAGER loading fetches related entities immediately with the parent. LAZY loading fetches them only when accessed.",
      explanation: "EAGER: when you load an Order, all its OrderItems are loaded immediately in the same query (or a join). LAZY: OrderItems are loaded only when you call order.getItems() — a separate query fires at that point. LAZY is the default for @OneToMany and @ManyToMany. EAGER is default for @ManyToOne and @OneToOne.",
      analogy: "LAZY loading is like ordering food at a restaurant — you only order what you need right now, and if you want dessert later, you order it then. EAGER loading is like the waiter bringing every item on the menu the moment you sit down, whether you want it or not. LAZY is usually better for performance because you avoid loading data you never use.",
      example: "EAGER: SELECT * FROM orders JOIN order_items — always loads items. LAZY: SELECT * FROM orders — items loaded only when accessed. LAZY can cause N+1 problem if not handled with JOIN FETCH.",
      followUps: [{ question: "What is the N+1 problem?", answer: "Loading 100 orders with LAZY items fires 1 query for orders + 100 queries for items = 101 queries. Fix with JOIN FETCH or @EntityGraph." }],
        keyPoints: [
          "EAGER loading: Fetches all related child entities immediately alongside the parent entity in the initial database query.",
          "LAZY loading: Delays fetching related entities until the exact moment they are explicitly accessed in the code.",
          "EAGER loading: The default fetch strategy for @ManyToOne and @OneToOne relationships.",
          "LAZY loading: The default fetch strategy for @OneToMany and @ManyToMany collection relationships.",
          "General: Improper use of EAGER fetching often leads to massive performance bottlenecks and the infamous N+1 query problem."
        ]
    },
    {
      id: 89, category: "Spring Boot", difficulty: 2, topic: "13. VS Questions",
        question: "save() vs saveAndFlush()",
      simpleAnswer: "save() persists to the persistence context (may not hit DB immediately). saveAndFlush() immediately synchronizes with the database.",
      explanation: "save() adds the entity to the JPA persistence context. The actual SQL INSERT/UPDATE may be batched and sent to DB at transaction commit or when Hibernate decides to flush. saveAndFlush() forces an immediate flush — the SQL is sent to DB right away within the same transaction. Use saveAndFlush() when you need to see the effect immediately (e.g., for a subsequent query in the same transaction).",
      analogy: "save() is like writing notes on a whiteboard and erasing/rewriting at the end of the meeting — efficient, batched. saveAndFlush() is like immediately emailing your notes to everyone the moment you write them. Use saveAndFlush() when someone in the same meeting needs to read your notes right now, not at the end.",
      example: "save(): entity enters the persistence context, SQL may wait until flush/commit. saveAndFlush(): SQL fires immediately. Use saveAndFlush() when you want DB constraints, triggers, or a follow-up query in the same transaction to observe the flushed row immediately.",
      followUps: [{ question: "When should you use saveAndFlush()?", answer: "Use it when a subsequent operation in the same transaction depends on the SQL being flushed immediately, or when you want database constraints/triggers to execute right away. For normal batch writes, plain save() is usually better." }],
        keyPoints: [
          "save(): Persists the entity into the Hibernate persistence context, deferring the actual SQL execution until the transaction commits or flushes naturally.",
          "saveAndFlush(): Forces Hibernate to execute the SQL INSERT or UPDATE statement against the database immediately during the method call.",
          "save(): Highly efficient for bulk operations because it allows Hibernate to batch multiple statements together.",
          "saveAndFlush(): Useful when immediate database triggers, constraints, or subsequent native queries need to see the updated data in the same transaction."
        ]
    },
    {
      id: 90, category: "Spring Boot", difficulty: 2, topic: "13. VS Questions",
        question: "PUT vs PATCH",
      simpleAnswer: "PUT replaces the entire resource. PATCH partially updates only the specified fields.",
      explanation: "PUT is idempotent — sending the same PUT request multiple times produces the same result. It is commonly modeled as full resource replacement, so many APIs expect a complete representation. PATCH updates only the fields you send — other fields remain unchanged. PATCH is more efficient for partial updates but requires careful implementation to be idempotent.",
      analogy: "PUT is like replacing an entire form — you fill out every field from scratch and submit the whole thing. PATCH is like crossing out one line on an existing form and writing the correction — only the changed field is updated. If you only changed your email address, PATCH is far more efficient than resubmitting your entire profile.",
      example: "PUT /users/1 with {name:'John', email:'j@j.com', age:30} — replaces all fields. PATCH /users/1 with {email:'new@j.com'} — only email changes, name and age unchanged.",
      followUps: [{ question: "Is PATCH idempotent?", answer: "Not necessarily. PUT is always idempotent. PATCH can be idempotent if implemented carefully, but it's not guaranteed by the HTTP spec." }],
        keyPoints: [
          "PUT: Replaces the entire resource representation, requiring the client to send a complete payload including unmodified fields.",
          "PATCH: Applies partial updates to a resource, allowing the client to send only the specific fields that need modification.",
          "PUT: Guaranteed to be idempotent by HTTP semantics, meaning repeating the request produces the same end state.",
          "PATCH: Not strictly guaranteed to be idempotent by default, though well-designed APIs usually implement it to be safe for retries."
        ]
    },
    {
      id: 91, category: "Spring Boot", difficulty: 2, topic: "12. Real-World / Practical Questions", difficulty: "Core",
      question: "@SpringBootTest vs @WebMvcTest vs @DataJpaTest",
      simpleAnswer: "@SpringBootTest loads the full application context — use for end-to-end integration tests. @WebMvcTest loads only the web layer — use for controller tests with mocked services. @DataJpaTest loads only JPA components — use for repository and query tests.",
      explanation: "@SpringBootTest: starts the full Spring context including all beans, security, DB, Kafka, etc. Slowest but most realistic. Use when multiple layers must work together. @WebMvcTest: loads only controllers, filters, and MVC config — services and repositories are not loaded (mock them with @MockBean). Fast, focused on HTTP behavior. Use for validating request mapping, validation, status codes, and response bodies. @DataJpaTest: loads only JPA repositories, entity classes, and an in-memory DB (H2 by default). No web layer, no services. Use for testing custom JPQL queries, entity mappings, and transactions. Key rule: use the smallest slice that proves the behavior — smaller scope = faster tests = better feedback.",
      analogy: "@SpringBootTest is like a full dress rehearsal — every actor, every prop, every light cue. @WebMvcTest is like rehearsing only the actors on stage — the backstage crew is replaced by stand-ins (mocks). @DataJpaTest is like testing only the props department — just the database layer, nothing else.",
      example: "@WebMvcTest(OrderController.class) + MockMvc: validates request mapping, @Valid constraints, and HTTP status codes — services mocked with @MockBean. @DataJpaTest: verifies a custom JPQL query returns correct results. @SpringBootTest: verifies the full order creation flow from HTTP request through service to DB.",
      followUps: [{ question: "When should you prefer a slice test over @SpringBootTest?", answer: "Prefer a slice test when you only need to verify one layer. It starts faster, isolates failures better, and avoids unnecessary application bootstrapping. Use @SpringBootTest only when cross-layer integration is what you're testing." }],
        keyPoints: [
          "@SpringBootTest: Loads the complete application context including all beans, making it ideal for full end-to-end integration testing.",
          "@WebMvcTest: Loads only the web layer components (like controllers and filters) while ignoring services, providing fast HTTP endpoint testing.",
          "@DataJpaTest: Loads only JPA repositories and entity classes, typically spinning up an in-memory H2 database for fast persistence testing.",
          "General: Always prefer the smallest possible test slice to keep your test suite fast, isolated, and highly focused."
        ]
    },
    {
      id: 92, category: "Spring Boot", difficulty: 3, topic: "12. Real-World / Practical Questions", difficulty: "Core",
      question: "What is Testcontainers and why is it useful in Spring Boot testing?",
      simpleAnswer: "Testcontainers starts real dependencies like PostgreSQL, Kafka, or Redis in Docker during tests, giving you production-like integration tests without hand-managed local setup.",
      explanation: "Mocks are great for unit tests, but they can hide real integration issues like SQL dialect differences, transaction behavior, schema problems, or serialization mismatches. Testcontainers helps by running disposable real services during the test lifecycle. This gives much higher confidence than H2-for-everything style testing when your production stack uses PostgreSQL or Kafka.",
      analogy: "Testcontainers is like a pop-up test kitchen that appears during your tests and disappears when they're done. Instead of testing your recipe against a fake oven (H2 in-memory database), you test it against a real oven (actual PostgreSQL in Docker). The pop-up kitchen is temporary and disposable — but it behaves exactly like the real thing.",
      example: "A repository test using PostgreSQL Testcontainers catches a native SQL query that works in H2 but fails in PostgreSQL because of syntax differences. That bug would likely escape a fake in-memory setup.",
      followUps: [{ question: "When should you not use Testcontainers?", answer: "Avoid it for tiny unit tests that only need pure business logic validation. It is best for integration and repository tests where real infrastructure behavior matters." }],
      keyPoints: ["Runs real dependencies in Docker for tests", "Great for PostgreSQL, Kafka, Redis, Elasticsearch", "Catches environment-specific integration bugs", "Best for integration tests, not simple unit tests"]
    },
    {
      id: 93, category: "Spring Boot", difficulty: 3, topic: "7. Spring Data JPA", difficulty: "Core",
      question: "What is LazyInitializationException?",
      simpleAnswer: "LazyInitializationException happens when Hibernate tries to load a LAZY association after the persistence context/session is already closed.",
      explanation: "A common example is fetching an entity inside a transaction, returning it to the controller, and then trying to access a LAZY child collection after the transaction has ended. Hibernate no longer has an open session to fetch the missing data. The right fixes are usually fetch joins, DTO mapping inside the transaction, or carefully designed query boundaries — not blindly switching everything to EAGER.",
      analogy: "LazyInitializationException is like trying to read a book after the library has closed. You borrowed the book (loaded the entity) while the library was open (transaction active). You left without reading the appendix (lazy collection). Now the library is closed (transaction ended) and you try to read the appendix — but the library is locked. You needed to read it while you were still inside.",
      example: "OrderService returns an Order entity. In the controller or JSON serializer, code accesses order.getItems() after the transaction is over. Hibernate throws LazyInitializationException because items were never loaded and the session is closed.",
      followUps: [{ question: "Should you fix it by making everything EAGER?", answer: "Usually no. That often creates N+1 problems and over-fetching. Prefer DTO mapping, fetch joins, or @EntityGraph for the specific use case." }],
      keyPoints: ["Happens with LAZY associations outside an open session", "Common in controller/serialization boundaries", "Prefer DTO mapping or fetch joins", "Avoid solving it by making everything EAGER"]
    },
    {
      id: 94, category: "Spring Boot", difficulty: 3, topic: "5. Spring MVC / REST", difficulty: "Intermediate",
        question: "Filter vs Interceptor vs ControllerAdvice",
      simpleAnswer: "Filter runs at the servlet/container level before Spring MVC. Interceptor runs inside Spring MVC around handler execution. @ControllerAdvice handles exceptions and cross-cutting response logic at the controller layer.",
      explanation: "Filter (javax.servlet.Filter): runs before the request reaches Spring MVC — no access to Spring beans by default (though you can inject them). Use for: correlation IDs, raw request/response logging, CORS headers, security preprocessing. Runs for every request including static resources. Interceptor (HandlerInterceptor): runs inside Spring MVC, has access to the handler method and model. Use for: measuring controller execution time, checking user context before a specific controller, logging which endpoint was hit. Only runs for requests mapped to controllers. @ControllerAdvice: not a request interceptor — it handles exceptions thrown by controllers (@ExceptionHandler), applies model attributes globally, and binds request parameters. Use for: centralized exception handling, consistent error response format. Key difference: Filter is container-level (earliest), Interceptor is MVC-level (after routing), @ControllerAdvice is post-execution (exception handling).",
      analogy: "Think of a building's security layers. A Filter is the security guard at the building entrance — checks everyone before they enter, regardless of destination. An Interceptor is the receptionist on a specific floor — checks you before you enter a particular office. @ControllerAdvice is the HR department that handles complaints after they happen — centralized, consistent handling of problems.",
      example: "Filter: add X-Correlation-Id to MDC for all requests including static files. Interceptor: log which controller handled the request and how long it took — only for mapped endpoints. @ControllerAdvice: convert MethodArgumentNotValidException into a consistent {error, message, timestamp} 400 response body.",
      followUps: [{ question: "Where does Spring Security fit in this picture?", answer: "Spring Security is implemented as a servlet filter chain — it runs before your controllers and before MVC interceptors. This is why security checks happen even before Spring MVC routing." }],
        keyPoints: [
          "Filter: Operates at the raw servlet container level before requests even reach Spring MVC, making it ideal for logging or security preprocessing.",
          "Interceptor: Operates strictly inside the Spring MVC context with full access to handler methods, making it ideal for controller-specific pre-checks.",
          "ControllerAdvice: Operates globally at the controller layer to intercept thrown exceptions and enforce consistent error response formatting.",
          "General: The execution order flows from Filter (outermost) to Interceptor (routing) to ControllerAdvice (post-execution exception handling)."
        ]
    },

    // ─── SPRING BATCH ─────────────────────────────────────────────────────────
    {
      id: 95, category: "Spring Boot", difficulty: 1, topic: "14. Spring Batch",
      question: "What is Spring Batch?",
      simpleAnswer: "Spring Batch is a tool that helps you process a large amount of data in one go — like reading thousands of records from a file or database, doing something with each one, and saving the results.",
      explanation: "Think of it like a factory assembly line. You have a big pile of work (like 1 million rows in a database). Spring Batch picks up a chunk, processes it, saves it, then picks up the next chunk. It keeps doing this until all the work is done. It also remembers where it stopped, so if something crashes, it can restart from where it left off instead of starting over.",
      example: "Every night at midnight, a bank needs to calculate interest for all 500,000 accounts. Spring Batch reads 1,000 accounts at a time, calculates interest for each, and saves the updated balance. If the server crashes at account 300,000, it restarts from 300,001 — not from the beginning.",
      followUps: [{ question: "When should you use Spring Batch instead of a normal service?", answer: "Use Spring Batch when you need to process a very large number of records reliably — especially if it needs to run on a schedule, handle failures gracefully, and restart from where it stopped." }],
      keyPoints: ["Processes large amounts of data in chunks", "Runs on a schedule (nightly, weekly, etc.)", "Restarts from where it stopped if it crashes", "Used for reports, data migration, billing, and automation"]
    },
    {
      id: 96, category: "Spring Boot", difficulty: 1, topic: "14. Spring Batch",
      question: "What are the main building blocks of Spring Batch? (Job, Step, Reader, Processor, Writer)",
      simpleAnswer: "A Job is the whole task. A Step is one phase of that task. Each Step has a Reader (reads data), a Processor (transforms it), and a Writer (saves it).",
      explanation: "Imagine you are moving houses. The Job is 'move everything'. One Step might be 'move the kitchen'. Inside that step: the Reader picks up each item from the kitchen, the Processor wraps it in bubble wrap, and the Writer puts it in the moving truck. Spring Batch follows this exact pattern for data.",
      example: "Job: 'Process daily invoices'. Step 1: Read unpaid invoices from DB → calculate late fees → write updated invoices back to DB. Step 2: Read updated invoices → generate PDF → save to S3.",
      followUps: [{ question: "Can a Job have multiple Steps?", answer: "Yes. Steps can run one after another, or you can set up conditions — like 'only run Step 2 if Step 1 succeeded'." }],
      keyPoints: ["Job = the whole batch task", "Step = one phase of the job", "Reader → Processor → Writer is the standard flow", "Multiple steps can be chained together"]
    },
    {
      id: 97, category: "Spring Boot", difficulty: 1, topic: "14. Spring Batch",
      question: "What is chunk-oriented processing in Spring Batch?",
      simpleAnswer: "Instead of processing all records at once (which would crash your memory) or one by one (which is slow), Spring Batch reads and processes a small group (chunk) at a time, then saves that group before moving to the next.",
      explanation: "Imagine you have 1 million rows to process. If you load all 1 million into memory, your server will run out of RAM and crash. If you process one row at a time and save after each, it is very slow. Chunk processing is the middle ground — read 500 rows, process them, save them, then read the next 500. The chunk size is configurable.",
      example: "chunk(500): Read 500 invoices → process each one → write all 500 to DB in one batch insert → commit → read next 500. If the server crashes after writing chunk 3, it restarts from chunk 4.",
      followUps: [{ question: "What is a good chunk size?", answer: "It depends on your data size and memory. Common values are 100–1000. Too small = too many DB commits (slow). Too large = too much memory used. Test and tune for your use case." }],
      keyPoints: ["Reads and processes data in small groups (chunks)", "Saves the whole chunk in one DB transaction", "Prevents memory overflow on large datasets", "Chunk size is configurable — tune it for your needs"]
    },
    {
      id: 98, category: "Spring Boot", difficulty: 1, topic: "14. Spring Batch",
      question: "What is a JobRepository and JobLauncher in Spring Batch?",
      simpleAnswer: "JobRepository is Spring Batch's memory — it records every job run, what step it was on, and whether it passed or failed. JobLauncher is the trigger — it starts a job.",
      explanation: "JobRepository stores all job history in a database (Spring Batch creates its own tables for this). This is how it knows if a job already ran today, or where to restart from if it crashed. JobLauncher is the code that says 'start this job now'. You can trigger it from a scheduler, an API call, or a command line.",
      example: "Scheduler calls jobLauncher.run(dailyInvoiceJob, params) at midnight. JobLauncher starts the job. JobRepository records 'Job started at 00:00'. If it crashes at 00:30, JobRepository has a record of the last completed step. On restart, Spring Batch reads this and skips already-completed steps.",
      followUps: [{ question: "What database tables does Spring Batch create?", answer: "Tables like BATCH_JOB_INSTANCE, BATCH_JOB_EXECUTION, and BATCH_STEP_EXECUTION. These store the full history of every job run." }],
      keyPoints: ["JobRepository = stores job history in DB", "JobLauncher = starts a job", "Enables restart from failure point", "Spring Batch auto-creates its own tracking tables"]
    },
    {
      id: 99, category: "Spring Boot", difficulty: 2, topic: "14. Spring Batch",
      question: "How does Spring Batch handle failures and restarts?",
      simpleAnswer: "Spring Batch saves progress after every chunk. If the job fails, it can restart from the last successful chunk instead of starting over from the beginning.",
      explanation: "After each chunk is written successfully, Spring Batch records the progress in its JobRepository database. If the server crashes or an error occurs, the job is marked as FAILED. When you restart it, Spring Batch reads the saved progress and skips all the chunks that already completed. You can also configure it to skip bad records (instead of failing the whole job) or retry a failed record a few times before giving up.",
      example: "Job processes 10,000 records in chunks of 100. Chunks 1–50 complete fine. Chunk 51 fails because of a bad record. Job is marked FAILED. You fix the bad record and restart. Spring Batch skips chunks 1–50 and resumes from chunk 51.",
      followUps: [{ question: "What is the difference between skip and retry in Spring Batch?", answer: "Retry means 'try this record again a few times before giving up'. Skip means 'if this record keeps failing, just ignore it and move on to the next one'. Both are configurable." }],
      keyPoints: ["Progress saved after every chunk", "Restart picks up from last successful chunk", "Skip: ignore bad records and continue", "Retry: try a failed record multiple times before skipping"]
    },
    {
      id: 100, category: "Spring Boot", difficulty: 2, topic: "14. Spring Batch",
      question: "How do you schedule a Spring Batch job?",
      simpleAnswer: "Use @Scheduled on a method that calls jobLauncher.run(), or use a tool like Spring Scheduler, Quartz, or a cron job to trigger it at a set time.",
      explanation: "The simplest way is @Scheduled(cron = '0 0 * * * *') which runs the job every hour. For more complex scheduling (like 'run at midnight but skip weekends'), you can use Quartz Scheduler. In production at TCS, batch jobs are often triggered by Jenkins pipelines or AWS EventBridge on a schedule.",
      example: "@Scheduled(cron = '0 0 0 * * *') // runs at midnight every day\npublic void runDailyJob() {\n  jobLauncher.run(dailyInvoiceJob, new JobParameters());\n}",
      followUps: [{ question: "What if the job is already running when the scheduler triggers again?", answer: "You should add a check to skip the new trigger if the job is already running. Spring Batch will also throw a JobExecutionAlreadyRunningException if you try to start the same job twice." }],
      keyPoints: ["@Scheduled(cron) is the simplest way", "Quartz for complex scheduling needs", "JobParameters must be unique per run (add a timestamp)", "Guard against duplicate runs with a running-check"]
    },

    // ─── JPA / HIBERNATE ADVANCED ─────────────────────────────────────────────
    {
      id: 101, category: "Spring Boot", difficulty: 3, topic: "7. Spring Data JPA",
      question: "What is the N+1 problem in JPA/Hibernate?",
      simpleAnswer: "The N+1 problem is when your code runs 1 query to get a list of things, then accidentally runs 1 more query for EACH item in that list — so if you have 100 orders, you end up running 101 queries instead of 1.",
      explanation: "Imagine you ask the database for all orders (1 query). Then for each order, Hibernate automatically goes back to the database to fetch that order's items (1 query per order). If you have 100 orders, that is 1 + 100 = 101 database trips. This is very slow and is one of the most common performance problems in Java apps.",
      example: "List<Order> orders = orderRepo.findAll(); // 1 query\nfor (Order o : orders) {\n  System.out.println(o.getItems()); // 1 query per order!\n}\n// 100 orders = 101 total queries. Very slow!",
      followUps: [{ question: "How do you fix the N+1 problem?", answer: "Use a JOIN FETCH in your JPQL query to load everything in one query: 'SELECT o FROM Order o JOIN FETCH o.items'. Or use @EntityGraph on the repository method." }],
      keyPoints: ["1 query for the list + 1 query per item = N+1 queries", "Very common and very slow for large datasets", "Fix with JOIN FETCH or @EntityGraph", "Use EXPLAIN or Hibernate SQL logging to detect it"]
    },
    {
      id: 102, category: "Spring Boot", difficulty: 1, topic: "7. Spring Data JPA",
      question: "What is the difference between EAGER and LAZY loading in JPA?",
      simpleAnswer: "LAZY loading means 'only fetch the related data when I actually ask for it'. EAGER loading means 'always fetch the related data immediately, even if I never use it'.",
      explanation: "Think of it like ordering food. LAZY is like ordering only what you need right now — if you want dessert later, you order it then. EAGER is like the waiter bringing every item on the menu the moment you sit down, whether you want it or not. LAZY is usually better for performance because you avoid loading data you never use.",
      example: "Order has a list of Items. With LAZY (default for collections): fetching an Order does NOT load its Items. Items are only loaded when you call order.getItems(). With EAGER: fetching an Order ALWAYS loads all its Items, even if you only needed the order total.",
      followUps: [{ question: "What is the default loading type for @OneToMany and @ManyToOne?", answer: "@OneToMany (collections) defaults to LAZY. @ManyToOne (single object) defaults to EAGER. It is generally recommended to keep collections LAZY and fetch explicitly when needed." }],
      keyPoints: ["LAZY = load only when accessed (default for collections)", "EAGER = always load immediately", "LAZY is better for performance in most cases", "EAGER can cause over-fetching and slow queries"]
    },
    {
      id: 103, category: "Spring Boot", difficulty: 1, topic: "7. Spring Data JPA",
      question: "What is @EntityGraph in Spring Data JPA?",
      simpleAnswer: "@EntityGraph lets you tell Spring Data JPA 'for this specific query, also load these related objects' — without changing the default LAZY setting everywhere.",
      explanation: "Instead of making a relationship EAGER globally (which affects every query), @EntityGraph lets you say 'just for this one repository method, also fetch the items'. It is a clean way to solve the N+1 problem for specific use cases without over-fetching everywhere else.",
      example: "@EntityGraph(attributePaths = {\"items\"})\nList<Order> findByStatus(String status);\n// This query fetches orders AND their items in one SQL JOIN — no N+1.",
      followUps: [{ question: "What is the difference between @EntityGraph and JOIN FETCH?", answer: "Both solve N+1. @EntityGraph is cleaner for Spring Data repository methods. JOIN FETCH is used in custom JPQL queries. Both result in a SQL JOIN." }],
      keyPoints: ["Loads related data for a specific query only", "Does not change the global LAZY/EAGER setting", "Cleaner alternative to JOIN FETCH in repositories", "Prevents N+1 without over-fetching everywhere"]
    },
    {
      id: 104, category: "Spring Boot", difficulty: 1, topic: "7. Spring Data JPA",
      question: "What is the difference between save() and saveAndFlush() in Spring Data JPA?",
      simpleAnswer: "save() stores the entity in Hibernate's memory and sends it to the database later (at the end of the transaction). saveAndFlush() sends it to the database immediately.",
      explanation: "Hibernate batches up changes and sends them to the database all at once at the end of a transaction — this is called 'flushing'. save() uses this default behavior. saveAndFlush() forces an immediate flush. You need saveAndFlush() when you want to see the saved data in the same transaction right away — for example, if you save a record and then immediately run a native SQL query that needs to see it.",
      example: "orderRepo.save(order); // saved in Hibernate memory, sent to DB at end of transaction\norderRepo.saveAndFlush(order); // sent to DB immediately — useful if next line runs a native query that needs this data",
      followUps: [{ question: "Does save() always insert a new row?", answer: "No. If the entity has an ID that already exists in the database, save() will update it. If the ID is null or new, it will insert." }],
      keyPoints: ["save() = flush at end of transaction (default)", "saveAndFlush() = flush immediately", "Use saveAndFlush() when you need the data visible in the same transaction right away", "save() is more efficient for bulk operations"]
    },
    {
      id: 105,
      category: "Spring Boot", difficulty: 2,
      topic: "4. AOP & Advanced Features",
      question: "What is AOP (Aspect-Oriented Programming)?",
      simpleAnswer: "AOP lets you add common behavior (like logging, security, transactions) to multiple methods without changing their code.",
      explanation: "Instead of copy-pasting logging code in every method, you write it once in an Aspect and tell Spring where to apply it. Spring weaves it in automatically.",
      analogy: "AOP is like a security camera system. You don't modify each room to add surveillance — you install cameras (aspects) that monitor activity across the building without touching the rooms themselves.",
      example: "@Aspect @Component public class LoggingAspect { @Before('execution(* com.app.service.*.*(..))') public void logBefore() { System.out.println('Method called'); } }",
      followUps: [
        { question: "What are common AOP use cases?", answer: "Logging, security checks, transaction management, performance monitoring, and caching." }
      ],
      keyPoints: ["Separates cross-cutting concerns", "No code duplication", "Applied via annotations", "Spring uses proxy-based AOP"]
    },
    {
      id: 106,
      category: "Spring Boot", difficulty: 2,
      topic: "4. AOP & Advanced Features",
      question: "What are Aspect, Advice, Pointcut, and JoinPoint in AOP?",
      simpleAnswer: "Aspect = the class with cross-cutting logic. Advice = the actual code to run. Pointcut = where to run it. JoinPoint = the specific method being intercepted.",
      explanation: "Think of it as: Aspect is the security guard (the whole concern). Advice is what the guard does (check ID). Pointcut is the rule (check everyone entering the server room). JoinPoint is the actual person walking in right now.",
      example: "@Aspect class LogAspect { @Before('execution(* UserService.*(..))') void log(JoinPoint jp) { // jp gives you method name, args } }",
      followUps: [
        { question: "What is @Around advice?", answer: "@Around wraps the method — you control when it runs and can modify the return value or skip execution entirely." }
      ],
      keyPoints: ["Aspect: The AOP class", "Advice: Code to execute (@Before, @After, @Around)", "Pointcut: Expression defining where", "JoinPoint: The actual method call"]
    },
    {
      id: 107,
      category: "Spring Boot", difficulty: 2,
      topic: "4. AOP & Advanced Features",
      question: "What is @Async in Spring Boot?",
      simpleAnswer: "@Async makes a method run in a separate thread so the caller doesn't have to wait for it to finish.",
      explanation: "Add @EnableAsync on your config class, then @Async on any method. Spring runs it in a thread pool in the background. The method must return void or Future/CompletableFuture.",
      analogy: "Calling a normal method is like ordering food and standing at the counter waiting. @Async is like ordering and going back to your table — the food comes when it's ready, you don't block.",
      example: "@Async public void sendWelcomeEmail(String email) { // runs in background thread, caller continues immediately }",
      followUps: [
        { question: "What annotation enables @Async?", answer: "@EnableAsync on a @Configuration class." }
      ],
      keyPoints: ["Runs method in background thread", "Requires @EnableAsync", "Returns void or CompletableFuture", "Uses Spring's thread pool"]
    },
    {
      id: 108,
      category: "Spring Boot", difficulty: 2,
      topic: "4. AOP & Advanced Features",
      question: "What is caching in Spring Boot?",
      simpleAnswer: "Caching stores method results so repeated calls with the same input return the stored result instead of re-executing the method.",
      explanation: "Add @EnableCaching, then use @Cacheable on methods. First call executes the method and stores the result. Subsequent calls with the same arguments return the cached value directly.",
      analogy: "Caching is like a waiter remembering your regular order. First visit: they ask and write it down. Every visit after: they just bring it without asking. Saves time for both of you.",
      example: "@Cacheable('users') public User findById(Long id) { return db.findById(id); } // DB hit only on first call per id",
      followUps: [
        { question: "How do you clear the cache?", answer: "@CacheEvict on a method clears the cache when that method is called, like after an update." }
      ],
      keyPoints: ["@Cacheable: Cache method result", "@CacheEvict: Clear cache", "@CachePut: Update cache", "Requires @EnableCaching"]
    },
    {
      id: 109,
      category: "Spring Boot", difficulty: 2,
      topic: "4. AOP & Advanced Features",
      question: "What is @Scheduled in Spring Boot?",
      simpleAnswer: "@Scheduled runs a method automatically at fixed intervals or on a cron schedule.",
      explanation: "Add @EnableScheduling on your config, then @Scheduled on any void method. Use fixedRate, fixedDelay, or cron to control timing.",
      analogy: "@Scheduled is like setting an alarm. You define when it should ring (every 5 minutes, or every day at 9am), and Spring fires the method automatically — no manual trigger needed.",
      example: "@Scheduled(cron = '0 0 9 * * ?') public void sendDailyReport() { ... } // runs every day at 9 AM",
      followUps: [
        { question: "Difference between fixedRate and fixedDelay?", answer: "fixedRate runs every N ms from start of last execution. fixedDelay waits N ms after the last execution finishes." }
      ],
      keyPoints: ["Runs methods on a schedule", "Requires @EnableScheduling", "Supports cron, fixedRate, fixedDelay", "Method must return void"]
    },
    {
      id: 110,
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is Bean Validation (@Valid)?",
      simpleAnswer: "@Valid triggers validation on a method parameter using annotations like @NotNull, @Size, @Email on the object's fields.",
      explanation: "Add validation annotations to your DTO fields. Use @Valid in the controller method parameter. If validation fails, Spring throws MethodArgumentNotValidException automatically.",
      example: "public class UserDTO { @NotNull @Email private String email; @Size(min=3) private String name; }\n@PostMapping('/users') public User create(@Valid @RequestBody UserDTO dto) { ... }",
      followUps: [
        { question: "How do you return validation errors to the client?", answer: "Handle MethodArgumentNotValidException in @ControllerAdvice and return the field errors from BindingResult." }
      ],
      keyPoints: ["@Valid triggers validation", "@NotNull, @Size, @Email on fields", "Throws MethodArgumentNotValidException on failure", "Use @ControllerAdvice to handle errors"]
    },
    {
      id: 111,
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
      question: "What is @Query in Spring Data JPA?",
      simpleAnswer: "@Query lets you write custom JPQL or native SQL queries directly on repository methods.",
      explanation: "When Spring Data's method naming (findByName) isn't enough, use @Query to write the exact query you need. Use nativeQuery=true for raw SQL.",
      example: "@Query('SELECT u FROM User u WHERE u.email = :email') User findByEmail(@Param('email') String email);\n@Query(value = 'SELECT * FROM users WHERE status = ?1', nativeQuery = true) List<User> findByStatus(String status);",
      followUps: [
        { question: "When would you use @Query over method naming?", answer: "For complex queries with joins, aggregations, or when the method name would be too long and unreadable." }
      ],
      keyPoints: ["Custom JPQL or SQL queries", "nativeQuery=true for raw SQL", "@Param for named parameters", "More control than method naming"]
    },
    {
      id: 112,
      category: "Spring Boot", difficulty: 2,
      topic: "7. Spring Data JPA",
      question: "What are entity relationships in JPA?",
      simpleAnswer: "@OneToOne, @OneToMany, @ManyToOne, @ManyToMany map relationships between entity classes to foreign key relationships in the database.",
      explanation: "One User has many Orders (@OneToMany). Many Orders belong to one User (@ManyToOne). These annotations tell Hibernate how to join the tables.",
      example: "@Entity class User { @OneToMany(mappedBy='user') List<Order> orders; }\n@Entity class Order { @ManyToOne @JoinColumn(name='user_id') User user; }",
      followUps: [
        { question: "What is CascadeType?", answer: "CascadeType.ALL means operations (save, delete) on the parent automatically apply to children too." }
      ],
      keyPoints: ["@OneToMany: One parent, many children", "@ManyToOne: Many children, one parent", "@ManyToMany: Both sides have many", "mappedBy avoids duplicate join tables"]
    },
    {
      id: 113,
      category: "Spring Boot", difficulty: 2,
      topic: "11. Testing",
      question: "What is Spring Boot Testing? (@SpringBootTest)",
      simpleAnswer: "@SpringBootTest loads the full application context for integration tests. @WebMvcTest loads only the web layer. @DataJpaTest loads only the JPA layer.",
      explanation: "Use @SpringBootTest for end-to-end tests. Use @WebMvcTest with MockMvc to test controllers without starting a server. Use @DataJpaTest to test repositories with an in-memory database.",
      example: "@WebMvcTest(UserController.class) class UserControllerTest { @Autowired MockMvc mockMvc; @MockBean UserService service; }\n// mockMvc.perform(get('/users')).andExpect(status().isOk());",
      followUps: [
        { question: "What is @MockBean?", answer: "@MockBean creates a Mockito mock and registers it as a Spring bean, replacing the real bean in the context." }
      ],
      keyPoints: ["@SpringBootTest: Full context", "@WebMvcTest: Web layer only", "@DataJpaTest: JPA layer only", "@MockBean: Mock a Spring bean"]
    },
    {
      id: 114,
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "What is CORS and how to configure it?",
      simpleAnswer: "CORS (Cross-Origin Resource Sharing) is a browser security rule that blocks requests from a different domain. You configure it in Spring to allow specific origins.",
      explanation: "When your React frontend (localhost:3000) calls your Spring API (localhost:8080), the browser blocks it by default. You tell Spring which origins are allowed.",
      example: "@CrossOrigin(origins = 'http://localhost:3000') on a controller, or globally:\n@Bean public WebMvcConfigurer cors() { return new WebMvcConfigurer() { public void addCorsMappings(CorsRegistry r) { r.addMapping('/**').allowedOrigins('*'); } }; }",
      followUps: [
        { question: "What does the browser send for CORS?", answer: "A preflight OPTIONS request to check if the server allows the cross-origin call before sending the actual request." }
      ],
      keyPoints: ["Browser security for cross-origin requests", "@CrossOrigin on controller or method", "Global config via WebMvcConfigurer", "Specify allowed origins, methods, headers"]
    },
    {
      id: 115,
      category: "Spring Boot", difficulty: 2,
      topic: "5. Spring MVC / REST",
      question: "Difference between Filter, Interceptor, and AOP?",
      simpleAnswer: "Filter works at the servlet level (before Spring). Interceptor works at the Spring MVC level (before/after controller). AOP works at the method level (any Spring bean).",
      explanation: "Filter: raw HTTP request/response, no Spring context. Interceptor: has access to handler info, runs around controllers only. AOP: most powerful, can intercept any Spring bean method.",
      analogy: "Filter is the building security at the front door — checks everyone before they enter. Interceptor is the receptionist — checks visitors going to specific offices. AOP is a manager who can monitor any employee's work anywhere in the building.",
      example: "Filter: JWT token extraction. Interceptor: logging request time for controllers. AOP: logging all service method calls.",
      followUps: [
        { question: "Which is best for logging?", answer: "AOP for service-level logging, Interceptor for HTTP request logging, Filter for security token processing." }
      ],
      keyPoints: ["Filter: Servlet level, before Spring", "Interceptor: MVC level, controllers only", "AOP: Method level, any bean", "Filter → Interceptor → AOP (order of execution)"]
    },
    {
      id: 116,
      category: "Spring Boot", difficulty: 2,
      topic: "8. Security",
      question: "How does JWT authentication work in Spring Boot?",
      simpleAnswer: "Client logs in and gets a JWT token. On every request, client sends the token in the Authorization header. Spring validates the token and sets the security context.",
      explanation: "1. User sends username/password. 2. Server validates and returns a signed JWT. 3. Client stores the token and sends it as 'Bearer <token>' header. 4. A filter (OncePerRequestFilter) intercepts each request, validates the JWT, and sets Authentication in SecurityContextHolder.",
      example: "Filter extracts token from header → validates signature and expiry → calls userDetailsService.loadUserByUsername() → sets UsernamePasswordAuthenticationToken in SecurityContextHolder",
      followUps: [
        { question: "What is UserDetailsService?", answer: "An interface you implement to tell Spring how to load a user by username — usually from your database." }
      ],
      keyPoints: ["Stateless authentication", "Token sent in Authorization header", "OncePerRequestFilter validates token", "SecurityContextHolder holds the authenticated user"]
    },
    {
      id: 117,
      category: "Spring Boot", difficulty: 2,
      topic: "9. Microservices",
      question: "What is RestTemplate vs WebClient?",
      simpleAnswer: "RestTemplate is the older synchronous HTTP client. WebClient is the newer non-blocking reactive client. Prefer WebClient for new code.",
      explanation: "RestTemplate blocks the thread while waiting for a response. WebClient is non-blocking and works with reactive streams. RestTemplate is simpler but deprecated for new projects.",
      example: "RestTemplate: String result = restTemplate.getForObject('http://api/users', String.class); // blocks\nWebClient: webClient.get().uri('/users').retrieve().bodyToMono(String.class) // non-blocking",
      followUps: [
        { question: "Can WebClient be used in non-reactive apps?", answer: "Yes, you can use WebClient in a regular Spring MVC app — just call .block() to get the result synchronously." }
      ],
      keyPoints: ["RestTemplate: Synchronous, blocking", "WebClient: Async, non-blocking", "RestTemplate: Simpler but deprecated", "WebClient: Preferred for new code"]
    },
    {
      id: 118,
      category: "Spring Boot", difficulty: 2,
      topic: "13. VS Questions",
      question: "What is PATCH vs PUT?",
      simpleAnswer: "PUT replaces the entire resource. PATCH updates only the fields you send.",
      explanation: "PUT: you must send the full object — missing fields get set to null. PATCH: you send only the fields you want to change, the rest stay as they are.",
      example: "PUT /users/1 with { name: 'John' } → sets email to null if not included.\nPATCH /users/1 with { name: 'John' } → only updates name, email stays unchanged.",
      followUps: [
        { question: "Which is idempotent?", answer: "Both PUT and PATCH are idempotent in practice, but only PUT is guaranteed idempotent by the HTTP spec." }
      ],
      keyPoints: ["PUT: Full replacement", "PATCH: Partial update", "PUT: Send all fields", "PATCH: Send only changed fields"]
    },
    {
      id: 119,
      category: "Spring Boot", difficulty: 2,
      topic: "2. Spring Boot Basics",
      question: "What are @Conditional annotations?",
      simpleAnswer: "@Conditional annotations tell Spring to only create a bean if a certain condition is true — like a property being set or a class being on the classpath.",
      explanation: "These power Spring Boot's auto-configuration. @ConditionalOnProperty creates a bean only if a property exists. @ConditionalOnClass only if a class is on the classpath. @ConditionalOnMissingBean only if no bean of that type exists yet.",
      example: "@Bean @ConditionalOnProperty(name='feature.email', havingValue='true') public EmailService emailService() { return new EmailService(); } // only created if feature.email=true",
      followUps: [
        { question: "How does Spring Boot use these internally?", answer: "Every auto-configuration class uses @Conditional annotations to avoid overriding your own beans and to only configure what's needed." }
      ],
      keyPoints: ["@ConditionalOnProperty: Based on config value", "@ConditionalOnClass: Based on classpath", "@ConditionalOnMissingBean: Only if no existing bean", "Powers auto-configuration"]
    },
  ]
};
