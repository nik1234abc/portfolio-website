import { springBootInterview } from "./springBootInterview.js";
import { restApiInterview } from "./restApiInterview.js";
import { kafkaInterview } from "./kafkaInterview.js";
import { microservicesInterview } from "./microservicesInterview.js";
import { systemDesign } from "./systemDesign.js";
import { coding } from "./coding.js";

const assignTopics = (questions) => {
  return questions.map(q => {
    if (q.category === "Java") {
      if (q.id <= 7) q.topic = "1. Core Java Basics";
      else if (q.id <= 15) q.topic = "2. OOP Concepts";
      else if (q.id <= 22) q.topic = "3. Object & Class Deep Understanding";
      else if (q.id <= 30) q.topic = "4. JVM & Memory";
      else if (q.id <= 35) q.topic = "5. String & Immutable Concepts";
      else if (q.id <= 47) q.topic = "6. Collections Framework";
      else if (q.id <= 58) q.topic = "7. Multithreading & Concurrency";
      else if (q.id <= 64) q.topic = "8. Exception Handling";
      else if (q.id <= 73) q.topic = "9. Java 8 Features";
      else if (q.id <= 78) q.topic = "10. Keywords & Important Concepts";
      else q.topic = "11. Advanced Concepts";
    } else if (q.category === "Spring Boot") {
      if (q.id <= 10) q.topic = "1. Spring Core Basics";
      else if (q.id <= 19) q.topic = "2. Annotations & Configuration";
      else if (q.id <= 27) q.topic = "3. Spring Boot Basics";
      else if (q.id <= 32) q.topic = "4. Spring Boot Configuration & Profiles";
      else if (q.id <= 45) q.topic = "5. Spring MVC / REST";
      else if (q.id <= 49) q.topic = "6. Exception Handling";
      else if (q.id <= 61) q.topic = "7. Spring Data JPA";
      else if (q.id <= 65) q.topic = "8. Transactions";
      else if (q.id <= 70) q.topic = "9. Spring Boot Advanced Concepts";
      else if (q.id <= 76) q.topic = "10. Microservices Basics";
      else if (q.id <= 79) q.topic = "11. Security Basics";
      else q.topic = "12. Real-World / Practical Questions";
    } else if (q.category === "REST APIs") {
      if (q.id <= 9) q.topic = "1. REST Fundamentals";
      else if (q.id <= 19) q.topic = "2. HTTP Basics";
      else if (q.id <= 29) q.topic = "3. API Design";
      else if (q.id <= 37) q.topic = "4. Request & Response Handling";
      else if (q.id <= 44) q.topic = "5. Status Codes Deep Dive";
      else if (q.id <= 53) q.topic = "6. Security";
      else if (q.id <= 57) q.topic = "7. Error Handling";
      else if (q.id <= 62) q.topic = "8. Performance & Scalability";
      else if (q.id <= 66) q.topic = "9. Idempotency & Reliability";
      else q.topic = "10. Real-World Scenarios";
    }
    return q;
  });
};

export const portfolio = {
  seo: {
    title: "Java Backend Developer | Spring Boot | Microservices | AWS | Nikhil Gadhwal",
    description:
      "Nikhil Gadhwal is a Java Backend Developer with 4+ years of experience building scalable enterprise microservices, secure REST APIs, cloud-native applications, and financial systems.",
    siteUrl: "https://nikhilgadhwal.in",
    keywords: [
      "Java Developer",
      "Java Backend Developer",
      "Spring Boot",
      "Spring Boot Developer",
      "Microservices",
      "Microservices Engineer",
      "AWS Developer",
      "Backend Engineer Portfolio",
      "Software Engineer India",
      "Java Developer Portfolio",
      "Backend Developer Portfolio",
      "Fintech Backend Engineer",
      "Cloud Native Java Engineer",
      "Kafka",
      "PostgreSQL",
      "Spring Batch"
    ]
  },
  personal: {
    name: "Nikhil Gadhwal",
    title: "Java Backend Developer | Spring Boot | Microservices | AWS",
    location: "New Delhi, India",
    email: "gadhwalnikhil@gmail.com",
    phone: "+91 8340674865",
    linkedin: "https://www.linkedin.com/in/nikhil-gadhwal-1b8688138/",
    github: "https://github.com/nik1234abc",
    summary:
      "Building scalable enterprise backend systems with strong experience across modernization, automation, and cloud-native engineering.",
    expandedSummary:
      "I build reliable backend platforms for enterprise and financial workflows, with strong depth in distributed systems, production support, secure service delivery, and cloud modernization. My work is centered on improving data consistency, reducing operational friction, and keeping high-volume systems resilient in production.",
    availability:
      "Feel free to connect for backend engineering, cloud architecture, technology discussions, or simply to explore the work I’m building.",
    resumeFile: "/Nikhil_Gadhwal_Java_Backend_Developer.pdf"
  },
  heroHighlights: [
    "4+ years in enterprise backend engineering",
    "Microservices, APIs, cloud modernization",
    "Open to relocation and remote opportunities"
  ],
  quickStats: [
    { label: "Experience", value: "4+ years", note: "Enterprise backend engineering" },
    { label: "Microservices modernized", value: "9", note: "Java 8 to Java 21 migration" },
    { label: "Efficiency gains", value: "50-70%", note: "Across invoicing and regional automation" },
    { label: "Domain", value: "Billing + finance", note: "Secure, multi-region workflows" }
  ],
  recruiterCards: [
    {
      title: "Who is he?",
      text: "A backend engineer trusted with enterprise financial systems, modernization work, and production-critical service ownership."
    },
    {
      title: "What impact has he delivered?",
      text: "Reduced manual billing effort, automated regional correction flows, and improved operational efficiency by up to 70%."
    },
    {
      title: "Why trust him with scale?",
      text: "Experience across microservices architecture, batch processing, async messaging, production incidents, and cloud-native delivery."
    },
    {
      title: "Is he globally mobile?",
      text: "Open to relocation and remote opportunities, with communication and delivery language suited to India, US, UK, and global engineering teams."
    }
  ],
  focusAreas: [
    "Scalable systems",
    "Distributed services",
    "Financial platforms",
    "Production resiliency",
    "Cloud modernization",
    "Architecture-led delivery"
  ],
  skills: [
    {
      category: "Backend",
      description: "Core API, service, and domain engineering for enterprise workflows.",
      items: [
        { name: "Java", level: 95 },
        { name: "Spring Boot", level: 93 },
        { name: "REST APIs", level: 92 },
        { name: "Microservices", level: 90 },
        { name: "JWT Security", level: 84 }
      ]
    },
    {
      category: "Cloud / DevOps",
      description: "Cloud-native deployment, environment support, and release reliability.",
      items: [
        { name: "AWS EC2", level: 82 },
        { name: "AWS S3", level: 76 },
        { name: "AWS SQS", level: 83 },
        { name: "Jenkins", level: 88 },
        { name: "Docker", level: 78 },
        { name: "CI/CD", level: 88 }
      ]
    },
    {
      category: "Messaging",
      description: "Event-driven and asynchronous patterns for resilient processing.",
      items: [
        { name: "Kafka", level: 86 },
        { name: "SQS", level: 83 }
      ]
    },
    {
      category: "Database",
      description: "Relational persistence, query correctness, and consistency safeguards.",
      items: [
        { name: "PostgreSQL", level: 88 },
        { name: "SQL", level: 85 }
      ]
    },
    {
      category: "Tools",
      description: "Delivery tooling for quality, collaboration, and issue resolution.",
      items: [
        { name: "Git", level: 86 },
        { name: "Jira", level: 84 },
        { name: "Postman", level: 89 },
        { name: "JUnit", level: 88 }
      ]
    }
  ],
  experience: {
    company: "Tata Consultancy Services (TCS)",
    role: "System Engineer",
    duration: "Dec 2021 - Present",
    summary:
      "Delivering backend engineering across secure billing systems, region-specific automation, production support, and microservices modernization for enterprise-scale financial operations.",
    highlights: [
      "Enterprise financial systems",
      "Production-critical backend ownership",
      "Regional workflow engineering",
      "Modernization initiatives"
    ]
  },
  projects: [
    {
      title: "Enabled Transfer Functionality",
      brief: "Built invoice-to-invoice transfer capability to streamline financial correction workflows while ensuring transactional consistency.",
      reason:
        "Manual correction required multiple disconnected operations, increasing operational effort and risk of partial failures.",
      solution:
        "Designed unified transfer processing within existing adjustment architecture, enabling debit and credit actions in a single transactional flow with rollback protection.",
      benefits: [
        "Reduced manual operational effort by 50–60%",
        "Improved financial data consistency",
        "Eliminated partial update failures",
        "Enhanced maintainability through logic reuse"
      ],
      stack: ["Java", "Spring Boot", "PostgreSQL", "REST APIs", "Microservices"]
    },
    {
      title: "Automated No-Show Adjustment",
      brief: "Automated reservation no-show financial adjustment workflows using asynchronous batch and queue-based processing.",
      reason:
        "Manual no-show correction processes were resource-intensive and lacked scalability.",
      solution:
        "Developed daily batch processing integrated with asynchronous queue architecture to identify eligible records, trigger adjustments, and ensure retry-safe distributed processing.",
      benefits: [
        "Reduced manual intervention significantly",
        "Improved scalability for regional workloads",
        "Increased processing reliability",
        "Enabled fault-tolerant automation"
      ],
      stack: ["Java", "Spring Batch", "AWS SQS", "PostgreSQL", "Microservices"]
    },
    {
      title: "Java 21 Migration Program",
      brief: "Large-scale migration of production microservices to modern Java LTS.",
      reason:
        "Legacy services required modernization for performance, security, and long-term maintainability.",
      solution:
        "Led staged migration of production services, resolving dependency conflicts, backward compatibility issues, security upgrades, and cross-version interoperability challenges.",
      benefits: [
        "Improved system stability",
        "Enhanced security posture",
        "Better performance and memory efficiency",
        "Future-ready architecture"
      ],
      stack: ["Java 21", "Spring Boot", "JWT", "Jenkins", "Docker"]
    },
    {
      title: "Regional Enhancement Implementation",
      brief: "Implemented modular regional business rule architecture to support scalable multi-region financial operations.",
      reason:
        "Expanding regional requirements increased complexity in business validations and tax/revenue rules.",
      solution:
        "Separated region-specific logic into configurable modules while preserving centralized shared services for validations and posting.",
      benefits: [
        "Improved maintainability",
        "Faster onboarding for new regions",
        "Reduced complexity",
        "Increased delivery speed for business changes"
      ],
      stack: ["Java", "Spring Boot", "Rule Modules", "PostgreSQL", "REST APIs"]
    },
    {
      title: "Production Support & System Reliability Engineering",
      brief: "Maintained and optimized critical enterprise financial systems through issue resolution, monitoring, and continuous operational improvements.",
      reason:
        "Production-critical services required high reliability, rapid incident resolution, and operational continuity.",
      solution:
        "Handled root cause analysis, deployment stability, issue remediation, and reliability improvements across distributed services.",
      benefits: [
        "Improved uptime",
        "Faster issue resolution",
        "Strengthened system resilience",
        "Enhanced enterprise trust"
      ],
      stack: ["Java", "SQL", "Jenkins", "Monitoring", "Microservices"]
    }
  ],
  certifications: [
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      timeframe: "Valid Dec 2025 - Dec 2028",
      note: "Demonstrates cloud fluency for modern backend and platform engineering environments.",
      validationNumber: "b4bcc06e493f48dca429257e40c3f570",
      verificationUrl: "https://aws.amazon.com/verification",
      file: "/AWS_Certified_Cloud_Practitioner.pdf"
    }
  ],
  achievements: [
    "Received 2 On-Spot Awards at Tata Consultancy Services for innovative solutions and project contributions.",
    "Recognized as part of a Team of the Year award for exceptional team performance and successful delivery of key initiatives.",
    "Received A Band performance ratings for three consecutive years at Tata Consultancy Services."
  ],
  targetRoles: [
    "Senior Java Backend Developer",
    "Spring Boot / Microservices Engineer",
    "Cloud and Platform Engineering roles",
    "Fintech and enterprise product backend opportunities"
  ],
  insights: [
    {
      title: "Java 21 Migration Lessons from Production Microservices",
      summary:
        "A practical engineering breakdown of upgrading enterprise services, validating compatibility, and reducing legacy platform risk without disrupting production.",
      tags: ["Java 21", "Modernization", "Production Engineering"]
    },
    {
      title: "Spring Boot Best Practices for Enterprise Financial Services",
      summary:
        "Patterns for structuring service boundaries, validations, observability, and secure API behavior in audit-sensitive backend systems.",
      tags: ["Spring Boot", "Architecture", "Secure APIs"]
    },
    {
      title: "Kafka and Async Processing Notes for Backend Interviews",
      summary:
        "A high-signal perspective on event-driven workflows, fault isolation, consumer behavior, and scaling asynchronous financial operations.",
      tags: ["Kafka", "Distributed Systems", "Interview Prep"]
    }
  ]
  ,
  interviewHub: {
    categories: ["Java", "Spring Boot", "REST APIs", "Kafka", "Microservices", "System Design"],
    learnerCategories: [],
    questions: assignTopics([
      {
        id: 1,
        category: "Java",
        question: "What are the main features of Java?",
        simpleAnswer: "Java is an object-oriented, platform-independent, secure, and strongly-typed language designed for building robust enterprise applications.",
        explanation: "Java was built to be 'Write Once, Run Anywhere' (WORA). It enforces object-oriented design, manages memory automatically via Garbage Collection, and prioritizes security by running inside a virtual machine rather than directly on the host OS.",
        example: "Because it's platform-independent, a Java backend compiled on a Mac developer laptop will run identically on an AWS Linux server without changing the code.",
        followUps: [
          {
            question: "Is Java 100% Object-Oriented?",
            answer: "No, because it still supports primitive data types like int, char, and boolean for performance reasons."
          }
        ],
        keyPoints: ["Object-Oriented", "Platform Independent (WORA)", "Automatic Memory Management (GC)", "Secure and Robust"]
      },
      {
        id: 2,
        category: "Java",
        question: "Why is Java platform independent? Explain the JVM role.",
        simpleAnswer: "Java code is compiled into an intermediate 'bytecode' instead of machine code. The JVM (Java Virtual Machine) then translates this bytecode into specific machine instructions for the underlying operating system.",
        explanation: "When you write C++, it compiles directly to Windows or Mac instructions. Java compiles to .class files (bytecode). You can take that exact same .class file to any OS, as long as that OS has a JVM installed. The JVM acts as a translator between the bytecode and the actual hardware.",
        example: "Write once, run anywhere: You compile App.java on a Mac, take the App.class file, and run it on a Linux server without recompiling.",
        followUps: [
          {
            question: "Is the JVM itself platform-independent?",
            answer: "No, the JVM is platform-dependent. You need a specific JVM downloaded for Windows, a different one for Linux, etc. to translate the universal bytecode into OS-specific instructions."
          }
        ],
        keyPoints: [
          "Write Once, Run Anywhere (WORA)",
          "Compiler generates universal bytecode (.class)",
          "JVM translates bytecode to hardware-specific machine code"
        ]
      },
      {
        id: 3,
        category: "Java",
        question: "What is the difference between JDK, JRE, and JVM?",
        simpleAnswer: "JDK is for developers (contains tools to write and compile). JRE is for users (contains libraries to run apps). JVM is the engine (actually executes the code).",
        explanation: "JDK (Java Development Kit) includes the compiler (`javac`). JRE (Java Runtime Environment) includes standard core libraries. JVM (Java Virtual Machine) is the core process that runs inside the JRE to execute bytecode line-by-line.",
        example: "If you just want to run Minecraft (a Java game), you only need the JRE installed. If you want to code your own Minecraft mod, you need to download the JDK.",
        followUps: [
          {
            question: "Does the JDK contain the JRE?",
            answer: "Yes, they are nested. The JDK contains the JRE, and the JRE contains the JVM."
          }
        ],
        keyPoints: [
          "JDK = Development Tools + JRE",
          "JRE = Core Libraries + JVM",
          "JVM = Execution Engine"
        ]
      },
      {
        id: 4,
        category: "Java",
        question: "What is bytecode?",
        simpleAnswer: "Bytecode is a highly optimized set of instructions generated by the Java compiler that the JVM understands and executes.",
        explanation: "It's the middle-ground between human-readable Java code and machine-readable binary code. It is saved in `.class` files and is the exact reason Java is able to achieve its platform independence.",
        example: "When you run `javac MyClass.java`, the output is `MyClass.class`. If you open that file in a text editor it looks like gibberish to humans, but makes perfect sense to the JVM.",
        followUps: [
          {
            question: "Can any other languages compile to Java bytecode?",
            answer: "Yes! Languages like Kotlin, Scala, and Groovy also compile down to Java bytecode and run natively on the JVM."
          }
        ],
        keyPoints: ["Intermediate code generated by compiler", "Stored in .class files", "Executed by the JVM"]
      },
      {
        id: 5,
        category: "Java",
        question: "What is a Classloader and how does it work?",
        simpleAnswer: "A Classloader is a part of the JRE that dynamically loads Java classes into the JVM memory only when they are actually needed.",
        explanation: "Java doesn't load all your code into memory when the program starts. Instead, when your code says `new User()`, the Classloader finds the `User.class` file, reads the bytecode, and loads it into the JVM's RAM.",
        example: "If your application has a `PDFGenerator` class but the user never clicks 'Download PDF', the Classloader will never waste memory loading that class.",
        followUps: [
          {
            question: "What principle does the Java Classloader follow?",
            answer: "The Delegation Principle. It always delegates the request to its parent classloader first before trying to load the class itself."
          }
        ],
        keyPoints: ["Loads classes into memory dynamically", "Only loads classes when referenced (Lazy Loading)", "Follows the Delegation Principle"]
      },
      {
        id: 6,
        category: "Java",
        question: "What are the types of Classloaders in Java?",
        simpleAnswer: "There are three main types: Bootstrap (loads core Java classes), Extension (loads standard extensions), and Application/System (loads your custom application code).",
        explanation: "The Bootstrap classloader loads trusted core classes like `java.lang.String`. The Extension classloader loads additional APIs. The Application classloader is the one that loads the actual code you wrote (from your classpath).",
        example: "When you use `String`, Bootstrap loads it. When you use `MyCustomController`, the Application classloader loads it.",
        followUps: [
          {
            question: "Can you create your own custom Classloader?",
            answer: "Yes, you can extend `java.lang.ClassLoader` to load classes from unusual places, like directly from a network stream or an encrypted file."
          }
        ],
        keyPoints: ["Bootstrap = Core Java API", "Extension/Platform = Security and extension libraries", "Application = Your project's classpath"]
      },
      {
        id: 7,
        category: "Java",
        question: "What is the JIT (Just-In-Time) compiler?",
        simpleAnswer: "It's a part of the JVM that speeds up Java applications by taking frequently used bytecode and compiling it directly into lightning-fast machine code while the program runs.",
        explanation: "Java normally interprets bytecode line-by-line, which is slightly slow. The JIT compiler watches the program run and looks for 'hotspots' (loops or methods executed thousands of times). It translates those specific hotspots into hardware-level code so they run as fast as C++.",
        example: "A method that calculates tax on millions of transactions will start slow, but after a few seconds, the JIT compiler will optimize it, making the remaining transactions process instantly.",
        followUps: [
          {
            question: "What is the difference between AOT and JIT?",
            answer: "Ahead-of-Time (AOT) compiles everything before the program runs. Just-In-Time (JIT) compiles while the program is actively running, allowing it to optimize based on actual live behavior."
          }
        ],
        keyPoints: [
          "Improves runtime performance",
          "Optimizes frequently used 'hotspots'",
          "Translates bytecode to native machine code"
        ]
      },
      {
        id: 8,
        category: "Java",
        question: "What are the core OOP principles?",
        simpleAnswer: "The four pillars of Object-Oriented Programming are Encapsulation, Abstraction, Inheritance, and Polymorphism.",
        explanation: "Encapsulation hides data. Abstraction hides complexity. Inheritance allows code reuse. Polymorphism allows one interface to be used for different underlying data types.",
        example: "Encapsulation: private variables. Abstraction: interfaces. Inheritance: `class Dog extends Animal`. Polymorphism: `Animal a = new Dog(); a.speak();`",
        followUps: [
          {
            question: "Why is OOP preferred over procedural programming?",
            answer: "OOP makes it easier to model real-world problems, promotes code reuse, and makes large enterprise codebases much easier to maintain and scale."
          }
        ],
        keyPoints: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"]
      },
      {
        id: 9,
        category: "Java",
        question: "What is the difference between Abstraction and Encapsulation?",
        simpleAnswer: "Abstraction is hiding the complex implementation details (showing WHAT it does). Encapsulation is hiding and protecting the internal state/data (controlling HOW it's accessed).",
        explanation: "Think of a car. Abstraction is the steering wheel—you don't need to know how the engine turns to drive. Encapsulation is the hood over the engine—it physically protects the engine parts from being tampered with by the driver.",
        example: "Abstraction: An interface with `processPayment()`. Encapsulation: A class with a `private double balance` and a `public void deposit()` method.",
        followUps: [
          {
            question: "Can encapsulation exist without abstraction?",
            answer: "Yes, you can use private variables to protect data without ever creating an interface to generalize the behavior."
          }
        ],
        keyPoints: [
          "Abstraction = Hiding complexity",
          "Encapsulation = Hiding and protecting data",
          "Abstraction uses Interfaces/Abstract classes",
          "Encapsulation uses private modifiers"
        ]
      },
      {
        id: 10,
        category: "Java",
        question: "What is Inheritance and what are its types in Java?",
        simpleAnswer: "Inheritance is when a child class acquires the properties and methods of a parent class. Java supports Single, Multilevel, and Hierarchical inheritance.",
        explanation: "It promotes code reuse. Instead of rewriting common logic, you put it in a base class. Single: A extends B. Multilevel: A extends B, B extends C. Hierarchical: A extends B, C extends B.",
        example: "A `Vehicle` base class has a `startEngine()` method. Both `Car` and `Truck` extend `Vehicle`, so they get `startEngine()` automatically without rewriting it.",
        followUps: [
          {
            question: "Does Java support Multiple Inheritance?",
            answer: "Not with classes (to avoid the Diamond Problem). However, a single class can implement multiple interfaces."
          }
        ],
        keyPoints: [
          "Promotes code reusability",
          "Uses the 'extends' keyword",
          "Child class gets parent's non-private fields/methods"
        ]
      },
      {
        id: 11,
        category: "Java",
        question: "Why is multiple inheritance not supported in Java (with classes)?",
        simpleAnswer: "To prevent the 'Diamond Problem,' where a child class inherits from two parent classes that have a method with the exact same name.",
        explanation: "If Class B and Class C both inherit from Class A and override `doWork()`, and then Class D tries to inherit from both B and C, which `doWork()` does D get? Java avoids this ambiguity entirely by only allowing you to `extend` one class.",
        example: "You cannot declare `class FlyingCar extends Car, Airplane`. You can only extend one parent class.",
        followUps: [
          {
            question: "How does Java handle multiple inheritance then?",
            answer: "Through interfaces. A class can implement multiple interfaces (e.g., `class FlyingCar implements Drivable, Flyable`)."
          }
        ],
        keyPoints: [
          "Prevents the Diamond Problem",
          "Classes extend exactly one class",
          "Can implement infinite interfaces"
        ]
      },
      {
        id: 12,
        category: "Java",
        question: "What is polymorphism? (Compile-time vs Runtime)",
        simpleAnswer: "Polymorphism means 'many forms'. Compile-time polymorphism is achieved through Method Overloading, and Runtime polymorphism is achieved through Method Overriding.",
        explanation: "Polymorphism lets you write flexible code. Instead of writing separate methods for every specific object type, you can write one method that accepts a parent class or interface, and Java will figure out which specific child class implementation to run at execution time.",
        example: "A `Payment` interface has a `pay()` method. Both `CreditCardPayment` and `PayPalPayment` implement it differently. You can call `payment.pay()` without knowing which specific type it is, and the correct logic will run.",
        followUps: [
          {
            question: "Can you achieve runtime polymorphism with data members (variables)?",
            answer: "No, runtime polymorphism only applies to overridden methods, not variables. Variables are bound at compile-time."
          }
        ],
        keyPoints: [
          "Compile-time = Method Overloading",
          "Runtime = Method Overriding",
          "Allows objects to be treated as instances of their parent class"
        ]
      },
      {
        id: 13,
        category: "Java",
        question: "What is the difference between Method Overloading and Method Overriding?",
        simpleAnswer: "Overloading happens in the same class when methods share a name but have different parameters. Overriding happens in a child class when it rewrites a method already defined in its parent class.",
        explanation: "Overloading is about convenience—you might want a `print(String)` method and a `print(int)` method. The compiler decides which one to call. Overriding is about changing behavior—a subclass doing something more specific than its parent. The JVM decides which one to call at runtime based on the actual object type.",
        example: "Overloading: `Math.max(int a, int b)` vs `Math.max(double a, double b)`. Overriding: A `Dog` class overriding the `makeSound()` method of an `Animal` class to say 'Bark'.",
        followUps: [
          {
            question: "Can you override a static method?",
            answer: "No, static methods belong to the class, not the instance. If a subclass defines a static method with the same signature, it's called 'method hiding', not overriding."
          }
        ],
        keyPoints: [
          "Overloading = Same method name, different parameters, same class",
          "Overriding = Same method name, same parameters, child class",
          "Overloading is compile-time, Overriding is runtime"
        ]
      },
      {
        id: 14,
        category: "Java",
        question: "What is dynamic method dispatch?",
        simpleAnswer: "It is the mechanism by which a call to an overridden method is resolved at runtime, rather than compile time.",
        explanation: "When an overridden method is called through a parent class reference, Java determines which version of that method to execute based on the actual object type being referred to at the time the call occurs. This is the core of runtime polymorphism.",
        example: "If you have `Animal myPet = new Dog();` and call `myPet.makeSound()`, dynamic method dispatch ensures the `Dog`'s version of `makeSound()` is called, even though the variable type is `Animal`.",
        followUps: [
          {
            question: "Does dynamic method dispatch apply to variables?",
            answer: "No, it only applies to overridden instance methods. Variables are resolved based on the reference type at compile time."
          }
        ],
        keyPoints: [
          "Resolves overridden methods at runtime",
          "Depends on the actual object type (not the reference type)",
          "Core to runtime polymorphism"
        ]
      },
      {
        id: 15,
        category: "Java",
        question: "What is the difference between composition and inheritance?",
        simpleAnswer: "Inheritance represents an 'IS-A' relationship, while composition represents a 'HAS-A' relationship.",
        explanation: "Inheritance is when a class inherits another class's properties and behaviors. Composition is when a class contains an instance of another class to reuse its functionality. Composition is generally preferred over inheritance because it's more flexible and doesn't break encapsulation.",
        example: "Inheritance: `class Car extends Vehicle`. Composition: `class Car { Engine engine = new Engine(); }`.",
        followUps: [
          {
            question: "Why is 'Favor composition over inheritance' a common design principle?",
            answer: "Inheritance tightly couples classes and exposes parent internals to children. Composition is loosely coupled and allows changing behaviors at runtime by swapping components."
          }
        ],
        keyPoints: [
          "Inheritance = IS-A",
          "Composition = HAS-A",
          "Composition is more flexible and loosely coupled"
        ]
      },
      {
        id: 16,
        category: "Java",
        question: "What happens when an object is created in Java?",
        simpleAnswer: "When you use the `new` keyword, the JVM allocates memory on the Heap for the object, initializes its variables, and executes its constructor.",
        explanation: "First, the JVM checks if the class is loaded. If not, it loads it. Then, it allocates a block of memory on the Heap. It sets all instance variables to their default values (e.g., 0, false, null). Finally, it calls the constructor to initialize the object with your specific values, and returns a reference to that memory location.",
        example: "`User user = new User(\"Alice\");` allocates Heap memory for a User object, sets its name to \"Alice\", and stores the memory address in the `user` variable on the Stack.",
        followUps: [
          {
            question: "What happens if there isn't enough memory on the Heap?",
            answer: "The JVM throws an `OutOfMemoryError`."
          }
        ],
        keyPoints: [
          "Memory is allocated on the Heap",
          "Variables get default values first",
          "Constructor runs last",
          "Returns a reference"
        ]
      },
      {
        id: 17,
        category: "Java",
        question: "Where are objects stored in memory?",
        simpleAnswer: "The actual objects are stored in the Heap memory, while the reference variables that point to them are stored in the Stack memory.",
        explanation: "The Heap is a large pool of memory shared across all threads in your application. Whenever you type `new`, memory is carved out from the Heap. The Stack is thread-specific and stores local variables and method execution frames. It only holds the 'remote control' (reference) to the object in the Heap.",
        example: "In `public void test() { String name = new String(\"Bob\"); }`, the reference variable `name` is on the Stack, but the actual \"Bob\" object is on the Heap.",
        followUps: [
          {
            question: "Who cleans up objects from the Heap?",
            answer: "The Garbage Collector automatically removes objects that no longer have any active references pointing to them."
          }
        ],
        keyPoints: [
          "Objects live in the Heap",
          "References live in the Stack",
          "Heap is shared, Stack is per-thread"
        ]
      },
      {
        id: 18,
        category: "Java",
        question: "What is a constructor? What are its types?",
        simpleAnswer: "A constructor is a special block of code called automatically when an object is created. Its main purpose is to initialize the object's state.",
        explanation: "Constructors have the exact same name as the class and do not have a return type (not even `void`). There are three types: Default (provided by Java if you write none), No-Argument (written by you, takes no parameters), and Parameterized (takes arguments to set specific initial values).",
        example: "`public class Car { public Car(String color) { this.color = color; } }` is a parameterized constructor.",
        followUps: [
          {
            question: "What happens if I write a parameterized constructor but don't write a no-argument constructor?",
            answer: "Java will NOT provide a default constructor. If you try to say `new Car()`, it will cause a compile error."
          }
        ],
        keyPoints: [
          "Same name as class",
          "No return type",
          "Initializes object state",
          "Types: Default, No-Arg, Parameterized"
        ]
      },
      {
        id: 19,
        category: "Java",
        question: "Can a constructor be overridden?",
        simpleAnswer: "No, constructors cannot be overridden in Java.",
        explanation: "Overriding happens when a child class provides a specific implementation for a method inherited from its parent. Since constructors are not inherited by child classes (they belong specifically to the class they are declared in), they cannot be overridden. They can, however, be overloaded.",
        example: "If `Animal` has `public Animal() {}`, a `Dog` class does not inherit it. `Dog` has its own `public Dog() {}` constructor, which can internally call `super()` to trigger the parent's constructor.",
        followUps: [
          {
            question: "Can a constructor be overloaded?",
            answer: "Yes. You can have multiple constructors in the same class with different parameters."
          }
        ],
        keyPoints: [
          "Cannot be overridden",
          "Are not inherited",
          "Can be overloaded",
          "Use `super()` to call parent constructors"
        ]
      },
      {
        id: 20,
        category: "Java",
        question: "Can we make a constructor private?",
        simpleAnswer: "Yes, making a constructor private prevents other classes from creating instances of that class using the `new` keyword.",
        explanation: "Private constructors are heavily used in the Singleton design pattern (where you only want one instance of a class to ever exist) or in utility classes (like `java.lang.Math`) that only contain static methods and shouldn't be instantiated at all.",
        example: "`public class DatabaseConnection { private DatabaseConnection() {} public static DatabaseConnection getInstance() { ... } }`",
        followUps: [
          {
            question: "How do you create an object if the constructor is private?",
            answer: "You provide a `public static` method inside the same class that calls the private constructor and returns the object (often caching it)."
          }
        ],
        keyPoints: [
          "Prevents external instantiation",
          "Used in Singleton pattern",
          "Used in Utility classes"
        ]
      },
      {
        id: 21,
        category: "Java",
        question: "What is the 'this' keyword?",
        simpleAnswer: "The 'this' keyword is a reference variable in Java that refers to the current object instance executing the method or constructor.",
        explanation: "When a local variable (like a method parameter) has the exact same name as an instance variable, the local variable 'shadows' or hides the instance variable. You use `this.variableName` to explicitly tell Java that you want to modify the instance variable belonging to the object, not the local parameter.",
        example: "`public User(String name) { this.name = name; }` ensures the object's name gets updated by the parameter.",
        followUps: [
          {
            question: "Can you use the 'this' keyword inside a static method?",
            answer: "No. Static methods belong to the class itself, not to any specific object instance, so there is no 'current object' for 'this' to refer to."
          }
        ],
        keyPoints: [
          "Refers to the current instance",
          "Resolves variable name shadowing",
          "Can be used to call other constructors in the same class via `this()`"
        ]
      },
      {
        id: 22,
        category: "Java",
        question: "What is the 'super' keyword?",
        simpleAnswer: "The 'super' keyword is a reference variable used to refer to the immediate parent class object.",
        explanation: "If a child class overrides a method from its parent, but still needs to access the original parent version of that method, it uses `super`. It is also heavily used in child class constructors to manually trigger the parent class's constructor.",
        example: "`public Dog() { super(); }` triggers the `Animal` class constructor before finishing the `Dog` setup.",
        followUps: [
          {
            question: "What happens if you don't write super() in a child class constructor?",
            answer: "Java automatically inserts a hidden `super()` call to the parent's default (no-argument) constructor on the very first line."
          }
        ],
        keyPoints: [
          "Refers to the immediate parent class",
          "Accesses overridden parent methods or hidden fields",
          "Triggers parent constructors"
        ]
      },
      {
        id: 23,
        category: "Java",
        question: "Explain the JVM memory structure.",
        simpleAnswer: "The JVM primarily divides memory into the Heap (for objects), the Stack (for thread execution), and the Metaspace (for class metadata).",
        explanation: "The Heap is where all your instances live and is shared across all threads. The Stack is where local variables and method calls live, and every single thread gets its own private Stack. Metaspace stores the actual blueprint structures of your classes and methods.",
        example: "When you type `new Car()`, the `Car` object goes to the Heap, but the reference variable pointing to it goes to your current thread's Stack.",
        followUps: [
          {
            question: "What replaced the PermGen space in Java 8?",
            answer: "Metaspace replaced PermGen. Unlike PermGen which lived inside the JVM heap, Metaspace uses native OS memory, drastically reducing OutOfMemoryErrors caused by class loading."
          }
        ],
        keyPoints: [
          "Heap = Shared memory for objects",
          "Stack = Per-thread memory for method frames and local variables",
          "Metaspace = Class metadata and static variables"
        ]
      },
      {
        id: 24,
        category: "Java",
        question: "What is the difference between Stack and Heap memory?",
        simpleAnswer: "Heap is used for dynamic memory allocation (Objects). Stack is used for execution threads (method calls and local primitive variables).",
        explanation: "Whenever you use the 'new' keyword, the actual object is created in the Heap, which is shared. The Stack is unique to each thread. It keeps track of the methods being executed and holds local primitives and the *references* (pointers) to the actual objects in the Heap.",
        example: "In `void doWork() { String name = new String(\"Alice\"); }`, the reference variable `name` is on the Stack, but the actual string object \"Alice\" is on the Heap.",
        followUps: [
          {
            question: "Which memory is faster to access?",
            answer: "Stack memory is much faster to allocate and access compared to Heap memory because of its simple Last-In-First-Out (LIFO) structure."
          }
        ],
        keyPoints: [
          "Heap = Objects and instances (Shared across threads)",
          "Stack = Method frames, local primitives, object references (Per-Thread)",
          "Heap is cleaned by GC, Stack pops off automatically when methods return"
        ]
      },
      {
        id: 25,
        category: "Java",
        question: "What is Garbage Collection (GC)?",
        simpleAnswer: "Garbage Collection is an automatic memory management process that finds and deletes objects in the Heap that are no longer being used by your application.",
        explanation: "In languages like C++, you have to manually free up memory when you're done with it. If you forget, your app eventually crashes. In Java, the JVM runs a background daemon thread that safely destroys objects once there are no active references pointing to them.",
        example: "If a method creates a temporary `Order` object, once that method finishes executing, the object loses its reference and the GC eventually deletes it to free up RAM.",
        followUps: [
          {
            question: "Can you force Garbage Collection to run?",
            answer: "You can request it using `System.gc()`, but the JVM ignores this request if it feels it isn't necessary. You cannot absolutely force it to run."
          }
        ],
        keyPoints: [
          "Automatic memory management",
          "Prevents memory leaks",
          "Unpredictable exact execution time"
        ]
      },
      {
        id: 26,
        category: "Java",
        question: "How does Garbage Collection work internally?",
        simpleAnswer: "It uses a 'Mark and Sweep' algorithm. It marks active objects as 'alive' starting from GC Roots, and then sweeps away everything else.",
        explanation: "The GC traces a tree starting from 'GC Roots' (like active local variables on the Stack and static class variables). Any object it can reach is marked as alive. Afterwards, the 'Sweep' phase deletes all objects in the Heap that were NOT marked, freeing up that memory.",
        example: "Imagine painting a tree starting from the trunk. Any leaf you can't reach with your paintbrush falls off.",
        followUps: [
          {
            question: "What is the Generational GC hypothesis?",
            answer: "It assumes that most objects die young (like temporary variables). So the Heap is split into 'Young' and 'Old' generations to make sweeping short-lived objects much faster without scanning the entire heap."
          }
        ],
        keyPoints: [
          "Uses Mark and Sweep algorithm",
          "GC Roots are the starting point for tracing",
          "Heap is generational (Young vs Old generation)"
        ]
      },
      {
        id: 27,
        category: "Java",
        question: "What are the types of Garbage Collectors in Java?",
        simpleAnswer: "Java has several GC algorithms, most notably Serial GC, Parallel GC, G1 GC, and ZGC.",
        explanation: "'Serial' uses one thread (good for tiny apps). 'Parallel' uses multiple threads for high throughput. 'G1 GC' splits the heap into regions to balance throughput and pause times. 'ZGC' is a modern, ultra-low latency collector for massive heaps.",
        example: "If you are building a high-frequency trading app where a 1-second pause would lose millions of dollars, you would configure Java to use ZGC.",
        followUps: [
          {
            question: "Which Garbage Collector is the default in Java 11 and later?",
            answer: "G1 GC (Garbage-First Garbage Collector) is the default."
          }
        ],
        keyPoints: [
          "G1 GC is the modern default",
          "ZGC targets ultra-low latency",
          "Choice depends on app requirements (throughput vs pause times)"
        ]
      },
      {
        id: 28,
        category: "Java",
        question: "What is a 'Stop-the-World' event?",
        simpleAnswer: "It is a moment when the JVM completely pauses all application threads to safely perform Garbage Collection tasks.",
        explanation: "When the GC is moving objects around in memory or figuring out what to delete, it can't have your application threads creating or changing objects at the exact same time. So, it freezes your app entirely for a fraction of a second.",
        example: "If a user clicks a checkout button exactly during a Stop-the-World pause, the app will briefly freeze and process the click a few milliseconds later.",
        followUps: [
          {
            question: "How do you minimize Stop-the-World pauses?",
            answer: "By tuning your JVM arguments, picking the right collector (like ZGC), and avoiding the creation of unnecessary short-lived objects in your code."
          }
        ],
        keyPoints: [
          "Pauses all application threads",
          "Essential for safe memory management",
          "Long pauses cause noticeable lag"
        ]
      },
      {
        id: 29,
        category: "Java",
        question: "What are memory leaks in Java?",
        simpleAnswer: "A memory leak happens when you accidentally keep references to objects you no longer need, preventing the Garbage Collector from deleting them.",
        explanation: "Since the GC only deletes 'unreachable' objects, if you put temporary data into a static `HashMap` and forget to `.remove()` it when you're done, the GC thinks you still need it. Over time, this list grows until it consumes the entire Heap.",
        example: "An active `List<User>` stored statically that keeps growing every time someone logs in, but never removes them when they log out.",
        followUps: [
          {
            question: "How do you find a memory leak in production?",
            answer: "You generate a Heap Dump and analyze it using tools like Eclipse MAT or VisualVM to find which objects are holding onto memory."
          }
        ],
        keyPoints: [
          "Caused by unintentional lingering references",
          "GC cannot clear reachable objects",
          "Eventually leads to OutOfMemoryError crashes"
        ]
      },
      {
        id: 30,
        category: "Java",
        question: "What is an OutOfMemoryError (OOM) and how do you fix it?",
        simpleAnswer: "An OOM error happens when the JVM completely runs out of space in the Heap memory to create new objects.",
        explanation: "This usually happens for two reasons: a severe memory leak, or poor system design where you try to load too much data into RAM at exactly the same time (like loading a 5GB file into memory all at once instead of streaming it).",
        example: "Querying a database for `SELECT * FROM transactions` on a table with 10 million rows will try to create 10 million objects simultaneously, causing an instant OOM.",
        followUps: [
          {
            question: "Can you catch an OutOfMemoryError using try-catch?",
            answer: "You can, because it inherits from Throwable, but you shouldn't. An Error indicates a fatal JVM state that an app shouldn't try to recover from programmatically."
          }
        ],
        keyPoints: [
          "Happens when Heap is full",
          "Caused by memory leaks or bad data loading practices",
          "Fixed by streaming data or increasing heap size (-Xmx)"
        ]
      },
      {
        id: 31,
        category: "Java",
        question: "Why is String immutable in Java?",
        simpleAnswer: "Strings cannot be changed once created. If you try to modify one, a new String object is created instead.",
        explanation: "Immutability provides security (e.g., passing passwords/URLs), thread safety (multiple threads can share a String without synchronization), and memory efficiency (allows the String Pool to exist because shared strings won't be unexpectedly changed).",
        example: "If you do `String s = \"Hi\"; s = s + \" there\";`, you aren't changing the original 'Hi' object. You are creating a brand new 'Hi there' object in memory.",
        followUps: [
          {
            question: "Can we make our own custom immutable class?",
            answer: "Yes, by making the class final, all fields private and final, and not providing any setter methods."
          }
        ],
        keyPoints: [
          "Security and Thread Safety",
          "Enables the String Pool",
          "Modification creates a new object"
        ]
      },
      {
        id: 32,
        category: "Java",
        question: "What is the String Pool in Java?",
        simpleAnswer: "The String Pool is a special memory area in the Heap that caches String literals to save memory and improve performance.",
        explanation: "Because Strings are so commonly used, Java caches them. If you create `String a = \"hello\"` and `String b = \"hello\"`, both point to the exact same object in the String Pool instead of creating two separate objects.",
        example: "`String s1 = \"Java\"; String s2 = \"Java\";` -> Here, s1 == s2 is true because they share the same memory reference.",
        followUps: [
          {
            question: "What happens if you use new String(\"test\")?",
            answer: "It bypasses the String Pool entirely and creates a brand new object in the normal Heap memory."
          }
        ],
        keyPoints: [
          "Special cache area in the Heap",
          "Reuses identical string literals",
          "Saves memory"
        ]
      },
      {
        id: 33,
        category: "Java",
        question: "What is the difference between the == operator and the .equals() method?",
        simpleAnswer: "== checks if two variables point to the exact same location in memory. .equals() checks if the actual data inside those objects is logically the same.",
        explanation: "If two people are wearing the exact same brand of blue shirt, `.equals()` is true because the shirts look identical. But `==` is false, because they are physically two different shirts on two different people.",
        example: "`new String(\"A\") == new String(\"A\")` is false (different memory addresses). `new String(\"A\").equals(new String(\"A\"))` is true (same letters).",
        followUps: [
          {
            question: "Does .equals() always check logical equality?",
            answer: "No. By default, the Object class's .equals() method behaves exactly like ==. You must explicitly override .equals() in your custom classes to make it check the actual data."
          }
        ],
        keyPoints: [
          "== compares memory references",
          ".equals() compares value",
          "Override .equals() for custom object comparison"
        ]
      },
      {
        id: 34,
        category: "Java",
        question: "What is the difference between StringBuilder and StringBuffer?",
        simpleAnswer: "Both modify text without creating new objects. StringBuffer is thread-safe but slower. StringBuilder is not thread-safe but much faster.",
        explanation: "If you build a long string inside a loop using `str += 'a'`, it creates a brand new String object in memory every loop. A builder modifies a single array instead. StringBuffer synchronizes every method so multiple threads can safely use it. StringBuilder skips that overhead, making it the best choice for almost all standard cases.",
        example: "Generating a large JSON payload or SQL query inside a single method where no other threads are involved—always use StringBuilder.",
        followUps: [
          {
            question: "If Strings are immutable, how do these classes change the text?",
            answer: "They use a mutable character array (char[]) under the hood, expanding it as needed, and only create a final immutable String when you call .toString()."
          }
        ],
        keyPoints: [
          "Both are mutable alternatives to String",
          "StringBuffer is synchronized (slower)",
          "StringBuilder is non-synchronized (faster)"
        ]
      },
      {
        id: 35,
        category: "Java",
        question: "Why is String used as a key in HashMap?",
        simpleAnswer: "Because String is immutable and has a properly overridden `hashCode()` and `equals()` method.",
        explanation: "In a HashMap, the key's hash code is used to determine exactly where to store the value. If the key's data could change after it was inserted (mutable), its hash code would change, and the HashMap would never be able to find it again. String's immutability guarantees the hash code will never change.",
        example: "If you used a mutable `User` object as a key, and then changed the user's name, `map.get(user)` would suddenly return null!",
        followUps: [
          {
            question: "Does String cache its hash code?",
            answer: "Yes. Because a String never changes, it calculates its hash code once and caches it, making future HashMap lookups extremely fast."
          }
        ],
        keyPoints: [
          "Immutability prevents hash code changes",
          "Built-in caching for fast lookups",
          "Overrides equals() and hashCode() correctly"
        ]
      },
      {
        id: 36,
        category: "Java",
        question: "What is the Collection framework hierarchy?",
        simpleAnswer: "The framework is rooted in the `Iterable` interface, followed by `Collection`, which splits into `List`, `Set`, and `Queue`. `Map` is part of the framework but does not inherit from `Collection`.",
        explanation: "Lists are ordered and allow duplicates (ArrayList, LinkedList). Sets are unordered and reject duplicates (HashSet, TreeSet). Queues are for processing items in order like FIFO (PriorityQueue). Maps handle key-value pairs (HashMap, TreeMap).",
        example: "When you need a simple list of items, you use `List<String> list = new ArrayList<>();`. When you need unique elements, `Set<String> set = new HashSet<>();`.",
        followUps: [
          {
            question: "Why doesn't Map extend the Collection interface?",
            answer: "Because a Collection is a single sequence of elements, while a Map is a pairing of keys and values. Their data structures and access patterns are fundamentally different."
          }
        ],
        keyPoints: [
          "Root is Iterable -> Collection",
          "Main branches: List, Set, Queue",
          "Map stands alone as key-value pairs"
        ]
      },
      {
        id: 37,
        category: "Java",
        question: "What is the difference between List, Set, and Map?",
        simpleAnswer: "List is an ordered collection that allows duplicates. Set is an unordered collection that guarantees no duplicates. Map stores key-value pairs where keys must be unique.",
        explanation: "Use a List when you care about the order of items and might have repeats. Use a Set when you just need to know if an item exists and want to filter out duplicates. Use a Map when you need to look up a specific value using a unique identifier.",
        example: "List = A playlist of songs. Set = A collection of unique user IDs. Map = A dictionary mapping a UserID (key) to a UserObject (value).",
        followUps: [
          {
            question: "Does a Set ever maintain insertion order?",
            answer: "HashSet does not. However, LinkedHashSet maintains insertion order, and TreeSet sorts elements naturally."
          }
        ],
        keyPoints: [
          "List = Ordered, allows duplicates",
          "Set = Unordered (usually), no duplicates",
          "Map = Key-value pairs, unique keys"
        ]
      },
      {
        id: 38,
        category: "Java",
        question: "What is the difference between ArrayList and LinkedList?",
        simpleAnswer: "ArrayList uses a dynamic array under the hood. LinkedList uses a doubly-linked list with nodes pointing to each other.",
        explanation: "ArrayList is extremely fast for retrieving data (O(1)) because it acts like an index. However, adding/removing data in the middle is slow because it has to shift all subsequent elements. LinkedList is the opposite: finding data is slow because it has to traverse the nodes, but adding/removing in the middle is very fast since it just changes pointer references.",
        example: "Use ArrayList for a catalog of products you read often but rarely change. Use LinkedList for a queue of tasks where you constantly add to the end and remove from the front.",
        followUps: [
          {
            question: "Which one uses more memory?",
            answer: "LinkedList uses more memory because every element has to store additional pointers (references) to the next and previous elements."
          }
        ],
        keyPoints: [
          "ArrayList = Fast lookups, slow middle insertions",
          "LinkedList = Slow lookups, fast insertions/deletions",
          "ArrayList is better for almost all default use cases"
        ]
      },
      {
        id: 39,
        category: "Java",
        question: "What is the difference between HashMap and HashTable?",
        simpleAnswer: "HashMap is not thread-safe and allows one null key. HashTable is thread-safe (synchronized) but very slow, and does not allow null keys.",
        explanation: "HashTable is a legacy class from Java 1.0. It synchronizes every single method, which creates a massive bottleneck if multiple threads try to access it. HashMap is the modern standard for single-threaded scenarios. If you need thread safety today, you use `ConcurrentHashMap` instead of HashTable.",
        example: "If you are storing user sessions in a single-threaded web request, use HashMap. If multiple threads access the map concurrently, use ConcurrentHashMap.",
        followUps: [
          {
            question: "Why does ConcurrentHashMap perform better than HashTable?",
            answer: "HashTable locks the entire map during an update. ConcurrentHashMap divides the map into segments and only locks the specific bucket being updated, allowing other threads to read/write elsewhere."
          }
        ],
        keyPoints: [
          "HashMap = Not thread-safe, allows nulls, fast",
          "HashTable = Thread-safe, no nulls, very slow (Legacy)",
          "Use ConcurrentHashMap for thread safety instead"
        ]
      },
      {
        id: 40,
        category: "Java",
        question: "How does a HashMap work internally in Java?",
        simpleAnswer: "It stores key-value pairs in an array of 'buckets'. It uses the key's hashCode() to find the right bucket, and equals() to find the exact pair if multiple keys land in the same bucket.",
        explanation: "When you call put(key, value), Java calculates a hash for the key, which acts as an index for an array. If that index is empty, it puts the value there. If another key is already there (a collision), it stores them in a LinkedList (or a balanced tree in Java 8+) at that same index.",
        example: "Putting (\"Alice\", 95) and (\"Bob\", 80). If both hash to index 4, bucket 4 will contain a linked list: [Alice: 95] -> [Bob: 80].",
        followUps: [
          {
            question: "What happens when the HashMap gets too full?",
            answer: "It triggers a 'rehash'. When it reaches its load factor (default 0.75), it doubles the array size and redistributes all elements to maintain fast lookups."
          },
          {
            question: "Why did Java 8 introduce Trees in HashMaps?",
            answer: "To improve worst-case performance. If many keys collide in one bucket, the LinkedList degrades to O(n) search time. A Red-Black Tree improves this to O(log n)."
          }
        ],
        keyPoints: [
          "Uses an array of Nodes/Buckets",
          "Handles collisions with LinkedLists or Red-Black Trees",
          "Default load factor is 0.75"
        ]
      },
      {
        id: 41,
        category: "Java",
        question: "What is hashing?",
        simpleAnswer: "Hashing is the process of converting an object into an integer value (a hash code) using a mathematical algorithm.",
        explanation: "In Java, the `hashCode()` method does this. It maps data of arbitrary size to fixed-size values. Hash-based collections like HashMap use this integer to quickly figure out exactly which 'bucket' (array index) to store the object in, allowing for near-instant lookups.",
        example: "If you have a User object, hashing it might produce `48291`. The HashMap uses that number to jump straight to index `48291` instead of searching through every user.",
        followUps: [
          {
            question: "Does a hash code have to be unique for every different object?",
            answer: "No. Because the number of possible objects is infinite but the number of integers is limited (32-bit), two different objects can occasionally generate the same hash code (a collision)."
          }
        ],
        keyPoints: [
          "Converts objects to integers",
          "Used heavily by HashMap and HashSet",
          "Done via the Object.hashCode() method"
        ]
      },
      {
        id: 42,
        category: "Java",
        question: "What is a hash collision and how is it handled?",
        simpleAnswer: "A collision happens when two completely different objects generate the exact same hash code, meaning they both need to be stored in the same bucket of a HashMap.",
        explanation: "Since both objects need to go to the same array index, Java stores them there in a LinkedList (Chaining). When you try to look them up later, Java goes to that bucket and uses the `.equals()` method to check each item in the list until it finds the right one.",
        example: "The strings 'Aa' and 'BB' might both hash to bucket 5. Bucket 5 will hold them together: `[\"Aa\"] -> [\"BB\"]`.",
        followUps: [
          {
            question: "How did Java 8 improve collision handling?",
            answer: "If a bucket gets too many collisions (8 or more elements), Java 8 automatically converts the LinkedList into a Balanced Tree (Red-Black Tree) to keep search times incredibly fast."
          }
        ],
        keyPoints: [
          "Two objects, same hash code",
          "Handled primarily using Chaining (LinkedLists)",
          "Java 8 upgrades severe collisions to Balanced Trees"
        ]
      },
      {
        id: 43,
        category: "Java",
        question: "What is a load factor in a HashMap?",
        simpleAnswer: "The load factor is a measure of how full a hash-based collection is allowed to get before its internal capacity is automatically increased.",
        explanation: "By default, a HashMap's load factor is 0.75 (75%). If you have a map with 16 buckets, once 12 of them are filled (16 * 0.75), the HashMap creates a brand new array that is twice as big (32 buckets) and redistributes all the existing items into it. This process is called 'rehashing'.",
        example: "It is like moving your business to a bigger warehouse when your current warehouse gets 75% full, so things don't get too cluttered and hard to find.",
        followUps: [
          {
            question: "Why not wait until the HashMap is 100% full?",
            answer: "Because as a HashMap gets close to 100% full, the chance of severe collisions goes way up, which drastically slows down performance."
          }
        ],
        keyPoints: [
          "Default value is 0.75",
          "Triggers a 'rehash' to double the capacity",
          "Balances memory usage and lookup speed"
        ]
      },
      {
        id: 44,
        category: "Java",
        question: "What is fail-fast vs fail-safe?",
        simpleAnswer: "Fail-fast immediately throws an error if a collection is modified while you are looping through it. Fail-safe works on a hidden copy of the data, so it avoids crashing.",
        explanation: "Fail-fast helps you catch concurrency bugs quickly by stopping the program the moment it notices someone else modifying the collection you are reading. Fail-safe prioritizes keeping the system running by creating a clone of the collection, which takes up more memory but guarantees it won't crash.",
        example: "Standard `ArrayList` iterators are fail-fast. `CopyOnWriteArrayList` iterators are fail-safe.",
        followUps: [
          {
            question: "How does fail-fast actually detect the modification?",
            answer: "It checks an internal `modCount` variable. If the collection is modified, the modCount changes, and the iterator throws a `ConcurrentModificationException`."
          }
        ],
        keyPoints: [
          "Fail-fast throws ConcurrentModificationException",
          "Fail-safe operates on a clone of the underlying array",
          "Fail-safe uses more memory but is thread-safe"
        ]
      },
      {
        id: 45,
        category: "Java",
        question: "What is the difference between Comparable and Comparator?",
        simpleAnswer: "Comparable defines the 'default' natural sorting order inside the class itself. Comparator is an external rule you can create to sort objects in different custom ways.",
        explanation: "If you have an `Employee` class, you might want them to sort by ID by default. You make `Employee implements Comparable`. But if HR suddenly wants to sort them by Salary, you wouldn't rewrite the class. You create a separate `SalaryComparator` and pass it to `Collections.sort()`.",
        example: "Comparable: Sorting Strings alphabetically (built-in). Comparator: Sorting Strings by their length (custom external logic).",
        followUps: [
          {
            question: "Can you use a Lambda for a Comparator?",
            answer: "Yes! In Java 8, `Comparator.comparing(Employee::getSalary)` is a very common, clean way to generate a Comparator instantly."
          }
        ],
        keyPoints: [
          "Comparable = Natural order (inside class)",
          "Comparator = Custom order (outside class)",
          "Comparator overrides Comparable"
        ]
      },
      {
        id: 46,
        category: "Java",
        question: "What is the difference between TreeMap and HashMap?",
        simpleAnswer: "HashMap stores items randomly but is extremely fast. TreeMap automatically sorts its keys as you add them, but is slightly slower.",
        explanation: "HashMap uses a hashing array, so it guarantees O(1) constant time for finding items, but the keys have no predictable order. TreeMap uses a Red-Black tree under the hood. Every time you insert a key, it places it in a sorted position, which takes O(log n) time.",
        example: "If you need a fast cache of user sessions, use HashMap. If you need to display a leaderboard of top scores, use TreeMap so the scores stay sorted automatically.",
        followUps: [
          {
            question: "Does TreeMap allow null keys?",
            answer: "No, TreeMap cannot have a null key because it needs to compare keys to sort them, and comparing against null throws a NullPointerException."
          }
        ],
        keyPoints: [
          "HashMap = Unordered, O(1) speed",
          "TreeMap = Sorted naturally, O(log n) speed",
          "TreeMap does not allow null keys"
        ]
      },
      {
        id: 47,
        category: "Java",
        question: "How does ConcurrentHashMap work?",
        simpleAnswer: "It is a highly optimized, thread-safe version of HashMap designed for systems where multiple threads need to read and write at the exact same time.",
        explanation: "Standard HashMap breaks if multiple threads write to it concurrently. Older solutions like `HashTable` locked the *entire* map for every single read/write, causing massive slowdowns. `ConcurrentHashMap` divides the map into segments (or buckets) and only locks the specific bucket being updated, allowing other threads to operate on different buckets freely.",
        example: "It's like a bank with multiple tellers. Instead of locking the whole bank when one customer deposits money (HashTable), you only lock the specific teller they are talking to (ConcurrentHashMap).",
        followUps: [
          {
            question: "Does ConcurrentHashMap allow null keys or values?",
            answer: "No. Unlike a normal HashMap, ConcurrentHashMap strictly forbids null keys and null values to prevent ambiguity in multithreaded environments."
          }
        ],
        keyPoints: [
          "Thread-safe and highly concurrent",
          "Locks at the bucket level, not the whole map",
          "Does not allow nulls"
        ]
      },
      {
        id: 48,
        category: "Java",
        question: "What is a Thread in Java?",
        simpleAnswer: "A thread is the smallest unit of execution within a program. It is an independent path of code execution.",
        explanation: "When you run a Java application, the JVM creates one 'Main' thread that runs your `main()` method. But if you need to do two things at once—like downloading a file while also keeping the UI responsive—you can spawn a second thread to handle the download in the background simultaneously.",
        example: "A Tomcat web server creates a new thread for every incoming HTTP request so that one slow user doesn't block the website for everyone else.",
        followUps: [
          {
            question: "Do threads share memory?",
            answer: "Yes. All threads within the same process share the same Heap memory (where objects live), but each thread has its own private Stack memory (for local variables)."
          }
        ],
        keyPoints: [
          "Smallest unit of execution",
          "Enables multitasking and concurrent processing",
          "Share Heap memory but have private Stacks"
        ]
      },
      {
        id: 49,
        category: "Java",
        question: "What is the difference between a Process and a Thread?",
        simpleAnswer: "A process is a heavy, independent program running on your OS. A thread is a lightweight worker living *inside* that process.",
        explanation: "Opening Chrome and opening Spotify creates two separate processes. They do not share memory; if Spotify crashes, Chrome is fine. But within Chrome, downloading a file and playing a video are two threads living inside the same process. They share the same memory resources.",
        example: "Process = The factory building itself. Thread = The individual workers inside the factory sharing the same tools.",
        followUps: [
          {
            question: "Is context switching faster between processes or threads?",
            answer: "Context switching between threads is vastly faster because they already share the same memory space, whereas switching processes requires OS-level memory reallocation."
          }
        ],
        keyPoints: [
          "Process = Independent program, isolated memory",
          "Thread = Lightweight worker inside a process, shared memory",
          "Threads are faster to create and switch"
        ]
      },
      {
        id: 50,
        category: "Java",
        question: "What are the ways to create a Thread in Java?",
        simpleAnswer: "The two main ways are extending the `Thread` class or implementing the `Runnable` interface.",
        explanation: "Since Java doesn't support multiple inheritance, implementing the `Runnable` interface is almost always preferred, because it leaves your class free to extend a different parent class if needed. Also, `Runnable` clearly separates the task (the code you want to run) from the runner (the thread itself).",
        example: "`Thread t1 = new Thread(() -> System.out.println(\"Running!\")); t1.start();` (Using a Runnable lambda).",
        followUps: [
          {
            question: "What happens if you call run() directly instead of start()?",
            answer: "Calling `run()` directly just executes the method synchronously on the current thread. It does NOT spawn a new, separate background thread."
          }
        ],
        keyPoints: [
          "Extend Thread class",
          "Implement Runnable interface (Preferred)",
          "Always call .start() to begin execution"
        ]
      },
      {
        id: 51,
        category: "Java",
        question: "What is synchronization?",
        simpleAnswer: "Synchronization is a mechanism that ensures only one thread can access a shared resource or block of code at a time.",
        explanation: "In a multithreaded environment, if multiple threads try to read and write to the same variable simultaneously, data corruption occurs. Synchronization locks the resource so that when one thread enters, all other threads must wait outside until the first thread finishes and releases the lock.",
        example: "Like a fitting room in a store. Only one person can use it at a time. Anyone else must wait for the door to unlock.",
        followUps: [
          {
            question: "Can we synchronize a variable in Java?",
            answer: "No, you can only synchronize methods or specific blocks of code. To make variables thread-safe, you use the `volatile` keyword or atomic classes like `AtomicInteger`."
          }
        ],
        keyPoints: [
          "Prevents thread interference and data corruption",
          "Uses monitor locks (intrinsic locks) on objects",
          "Can be applied to methods or code blocks"
        ]
      },
      {
        id: 52,
        category: "Java",
        question: "What is deadlock?",
        simpleAnswer: "A deadlock happens when two or more threads are waiting forever for locks held by each other, causing the application to completely freeze.",
        explanation: "Imagine Thread A locks Resource 1 and needs Resource 2 to finish. Meanwhile, Thread B locks Resource 2 and needs Resource 1 to finish. Neither thread will release their lock until they get the other one, meaning they both wait infinitely.",
        example: "Two people trying to draw a picture. Person A grabs the paper and waits for the pencil. Person B grabs the pencil and waits for the paper. Neither can start.",
        followUps: [
          {
            question: "How do you avoid deadlocks in Java code?",
            answer: "The most common way is to ensure all threads acquire locks in the exact same order. Alternatively, you can use `tryLock()` with a timeout to give up if the lock isn't available."
          }
        ],
        keyPoints: [
          "Occurs when threads hold locks and wait for each other",
          "Causes application freezes",
          "Prevented by ordering locks or using timeouts"
        ]
      },
      {
        id: 53,
        category: "Java",
        question: "What is a race condition?",
        simpleAnswer: "A race condition is a concurrency bug where the output of a program depends on the unpredictable timing of how threads execute.",
        explanation: "It happens when multiple threads access shared data and try to change it at the same time. Because thread scheduling is controlled by the OS, one thread might read a value, pause, and before it writes the updated value back, another thread jumps in and modifies it, causing the first thread's calculations to be wrong.",
        example: "Two people withdrawing $100 from a $150 bank account at the exact same millisecond. Both see $150, both withdraw $100, and the balance drops to -$50 instead of blocking the second transaction.",
        followUps: [
          {
            question: "How do you fix a race condition?",
            answer: "By using synchronization, `ReentrantLock`, or thread-safe atomic variables (like `AtomicInteger`) to ensure only one thread modifies the data at a time."
          }
        ],
        keyPoints: [
          "Timing-dependent concurrency bugs",
          "Occurs with shared mutable state",
          "Fixed via synchronization or atomic classes"
        ]
      },
      {
        id: 54,
        category: "Java",
        question: "What is the volatile keyword?",
        simpleAnswer: "It ensures that the value of a variable is always read directly from main memory, bypassing thread-local CPU caches.",
        explanation: "In multithreading, CPUs often cache variables for speed. If Thread A changes a variable, Thread B might not see the change because it's reading its own stale cached copy. Marking the variable as volatile forces all threads to see the most up-to-date value.",
        example: "A boolean `isRunning = true` flag used to stop a while-loop in another thread should be volatile. Otherwise, the loop might run forever even after `isRunning` is set to false.",
        followUps: [
          {
            question: "Does volatile guarantee thread safety for operations like count++?",
            answer: "No. It only guarantees visibility. `count++` is a read-modify-write operation, so you still need `synchronized` or `AtomicInteger` to prevent race conditions."
          }
        ],
        keyPoints: [
          "Guarantees visibility across threads",
          "Reads/writes go straight to main memory",
          "Does NOT guarantee atomicity"
        ]
      },
      {
        id: 55,
        category: "Java",
        question: "What is the thread lifecycle?",
        simpleAnswer: "A thread goes through several states during its life: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, and TERMINATED.",
        explanation: "When you say `new Thread()`, it is NEW. When you call `.start()`, it becomes RUNNABLE. If it tries to enter a `synchronized` block that another thread is using, it becomes BLOCKED. If it waits for a signal it is WAITING, and once it finishes its code, it is TERMINATED.",
        example: "A thread processing a user's upload is RUNNABLE. If it has to wait for a database lock held by another process, it transitions to BLOCKED.",
        followUps: [
          {
            question: "What is the difference between WAITING and TIMED_WAITING?",
            answer: "WAITING requires another thread to explicitly wake it up (like calling `notify()`). TIMED_WAITING wakes up automatically after a set amount of time (like calling `Thread.sleep(1000)`)."
          }
        ],
        keyPoints: [
          "Transitions based on execution, locks, and sleep timers",
          "BLOCKED means waiting for a monitor lock",
          "A TERMINATED thread can never be restarted"
        ]
      },
      {
        id: 56,
        category: "Java",
        question: "What is an ExecutorService?",
        simpleAnswer: "ExecutorService is a framework that manages a pool of reusable threads, saving you from the massive performance cost of creating and destroying threads manually.",
        explanation: "Creating a `new Thread()` in Java is extremely expensive because the OS has to allocate memory. If you have 10,000 user requests and make 10,000 threads, your server will crash. ExecutorService creates a fixed 'pool' of threads. When a task finishes, the thread doesn't die; it grabs the next task from the queue.",
        example: "`ExecutorService pool = Executors.newFixedThreadPool(10); pool.submit(() -> sendEmail());`",
        followUps: [
          {
            question: "How do you gracefully shut down an ExecutorService?",
            answer: "Call `.shutdown()` to stop accepting new tasks and let existing ones finish, or `.shutdownNow()` to forcefully stop everything immediately."
          }
        ],
        keyPoints: [
          "Manages Thread Pools",
          "Reuses threads instead of destroying them",
          "Prevents resource exhaustion"
        ]
      },
      {
        id: 57,
        category: "Java",
        question: "What is the difference between Callable vs Runnable?",
        simpleAnswer: "Runnable executes a task in a separate thread but cannot return a result or throw a checked exception. Callable can return a result and throw checked exceptions.",
        explanation: "When you submit a Runnable to a thread pool, it just goes off and does its work blindly. When you submit a Callable, the thread pool gives you back a Future object. You can use this Future to check if the task is done, and ultimately retrieve the calculated value.",
        example: "Use Runnable to write logs to a file in the background. Use Callable to fetch user data from a slow third-party API where you actually need the response data back in the main thread.",
        followUps: [
          {
            question: "How do you extract the result from a Callable?",
            answer: "By calling `.get()` on the returned Future object, which will block the current thread until the result is ready."
          }
        ],
        keyPoints: [
          "Runnable = No return value, no checked exceptions",
          "Callable = Returns a Future<T>, can throw checked exceptions",
          "Both are functional interfaces used in multithreading"
        ]
      },
      {
        id: 58,
        category: "Java",
        question: "What is the difference between Future and CompletableFuture?",
        simpleAnswer: "Future is a placeholder for a result, but it blocks your thread if you try to get the result before it's ready. CompletableFuture allows you to attach non-blocking callbacks.",
        explanation: "Before Java 8, if you used a Future, you had to call `.get()` which stopped everything until the task finished. CompletableFuture uses `.thenApply()` or `.thenAccept()` to say 'whenever this finishes, go do this next step,' keeping your application completely asynchronous.",
        example: "Fetching user data. With Future, your main thread waits. With CompletableFuture, your main thread moves on, and the callback updates the UI whenever the data actually arrives.",
        followUps: [
          {
            question: "Can you combine multiple CompletableFutures?",
            answer: "Yes, you can run multiple futures in parallel and combine their results using methods like `.thenCombine()` or `.allOf()`."
          }
        ],
        keyPoints: [
          "Future blocks on .get()",
          "CompletableFuture uses non-blocking callbacks",
          "Chains asynchronous tasks easily"
        ]
      },
      {
        id: 59,
        category: "Java",
        question: "What is an exception in Java?",
        simpleAnswer: "An exception is an unwanted or unexpected event that occurs during the execution of a program, disrupting the normal flow of instructions.",
        explanation: "When something goes wrong—like trying to open a file that doesn't exist, or dividing a number by zero—Java creates an Exception object containing details about the error and 'throws' it. If your code doesn't 'catch' it, the program will crash.",
        example: "If you expect user input to be a number but they type 'Hello', `Integer.parseInt()` will throw a `NumberFormatException`.",
        followUps: [
          {
            question: "What is the base class for all exceptions in Java?",
            answer: "The `java.lang.Throwable` class, which is inherited by both `Error` and `Exception`."
          }
        ],
        keyPoints: [
          "Disrupts normal execution flow",
          "Object containing error details",
          "Can be caught and handled to prevent crashes"
        ]
      },
      {
        id: 60,
        category: "Java",
        question: "What is the difference between Checked vs Unchecked exceptions?",
        simpleAnswer: "Checked exceptions are checked by the compiler at compile-time (you are forced to handle them). Unchecked exceptions happen at runtime (usually due to bad logic).",
        explanation: "If an error is somewhat expected and outside your control (like reading a file that might have been deleted), Java forces you to write a try-catch block; this is a Checked Exception. If the error is a programming mistake (like trying to access an array index that doesn't exist), it's an Unchecked Exception.",
        example: "`IOException` or `SQLException` are Checked. `NullPointerException` or `ArrayIndexOutOfBoundsException` are Unchecked.",
        followUps: [
          {
            question: "Which class do Checked and Unchecked exceptions inherit from?",
            answer: "Unchecked inherit from `RuntimeException`. Checked inherit directly from `Exception` (excluding RuntimeException)."
          }
        ],
        keyPoints: [
          "Checked = Compile-time, forced to handle",
          "Unchecked = Runtime, usually programming logic errors",
          "Unchecked extend RuntimeException"
        ]
      },
      {
        id: 61,
        category: "Java",
        question: "What is try-catch-finally?",
        simpleAnswer: "try-catch-finally is a block used for exception handling. Try contains risky code, catch handles specific errors, and finally executes guaranteed cleanup code.",
        explanation: "When an exception is thrown in the try block, execution jumps to the matching catch block. The finally block runs after both complete, making it perfect for closing files or releasing database connections regardless of success or failure.",
        example: "try { openFile(); } catch (IOException e) { handleError(); } finally { closeFile(); }",
        followUps: [
          {
            question: "Does finally always execute?",
            answer: "Almost always. It won't run if you call System.exit() or if the JVM crashes/loses power."
          }
        ],
        keyPoints: ["Try = risky code", "Catch = error handling", "Finally = guaranteed cleanup"]
      },
      {
        id: 62,
        category: "Java",
        question: "What is throw vs throws?",
        simpleAnswer: "throw is used to explicitly trigger an exception inside a method. throws is used in the method signature to declare that the method might throw exceptions.",
        explanation: "You use 'throw new Exception()' when you detect a business logic error and want to stop execution. You use 'throws Exception' on the method declaration to warn the caller that they must handle this potential error.",
        example: "public void checkAge(int age) throws Exception { if(age < 18) throw new Exception(\"Too young\"); }",
        followUps: [
          {
            question: "Can you throw multiple exceptions at once?",
            answer: "No, you can only 'throw' one exception at a time, but you can declare multiple exceptions in a 'throws' clause."
          }
        ],
        keyPoints: ["throw = action (inside method)", "throws = declaration (in signature)", "throws forces caller to handle"]
      },
      {
        id: 63,
        category: "Java",
        question: "Can we have multiple catch blocks?",
        simpleAnswer: "Yes, you can have multiple catch blocks to handle different exceptions differently. However, they must be ordered from most specific to most general.",
        explanation: "If you have a FileNotFoundException, it should be caught before a general Exception. If you put the general Exception first, the compiler will throw an error because the specific catch blocks below it would become unreachable.",
        example: "try { ... } catch(FileNotFoundException e) { ... } catch(IOException e) { ... } catch(Exception e) { ... }",
        followUps: [
          {
            question: "What is a multi-catch block?",
            answer: "Introduced in Java 7, you can catch multiple exceptions in a single block using a pipe: catch(IOException | SQLException e)."
          }
        ],
        keyPoints: ["Multiple blocks allowed", "Specific exceptions first", "General exceptions last"]
      },
      {
        id: 64,
        category: "Java",
        question: "What happens if exception is not handled?",
        simpleAnswer: "If an exception is not caught, it propagates up the call stack. If no method catches it, the JVM's Default Exception Handler takes over, prints the stack trace, and crashes the thread.",
        explanation: "Uncaught exceptions bubble up to the method that called them. If it reaches the main() method and is still unhandled, the application (or that specific thread) terminates abruptly.",
        example: "If method A calls method B, and B throws an unhandled exception, B stops and passes it to A. If A doesn't handle it, the program crashes.",
        followUps: [
          {
            question: "Does an unhandled exception crash the entire application?",
            answer: "It crashes the specific thread it occurred in. In a web server like Tomcat, only that specific user's request thread fails, not the entire server."
          }
        ],
        keyPoints: ["Bubbles up the call stack", "JVM Default Exception Handler", "Terminates the thread"]
      },
      {
        id: 65,
        category: "Java",
        question: "What are Java 8 features?",
        simpleAnswer: "Java 8 introduced functional programming. Key features include Lambda Expressions, Stream API, Functional Interfaces, Default/Static methods in Interfaces, and the Optional class.",
        explanation: "It revolutionized Java by reducing boilerplate code. Lambdas allowed passing behavior as arguments. Streams allowed declarative data processing. Optional eliminated NullPointerExceptions.",
        example: "Instead of writing an anonymous inner class for a Runnable, you can just write `() -> System.out.println(\"Running\")`.",
        followUps: [
          {
            question: "Why were default methods added to interfaces in Java 8?",
            answer: "To allow adding new methods to existing interfaces (like Collection) without breaking backward compatibility for old classes that implemented them."
          }
        ],
        keyPoints: ["Lambdas", "Stream API", "Optional", "Default Methods"]
      },
      {
        id: 66,
        category: "Java",
        question: "What is Lambda expression?",
        simpleAnswer: "A Lambda expression is a concise way to write an anonymous function (a method without a name) that implements a Functional Interface.",
        explanation: "It eliminates the need for bulky anonymous inner classes. It takes parameters, an arrow token, and a body. It enables you to pass functionality directly as an argument to a method.",
        example: "`(a, b) -> a + b;` is a lambda that takes two numbers and returns their sum.",
        followUps: [
          {
            question: "Do you always have to specify parameter types in a lambda?",
            answer: "No, Java uses Type Inference to figure out the parameter types based on the Functional Interface."
          }
        ],
        keyPoints: ["Anonymous function", "Implements functional interfaces", "Syntax: (params) -> body"]
      },
      {
        id: 67,
        category: "Java",
        question: "What is functional interface?",
        simpleAnswer: "A Functional Interface is an interface that contains exactly one abstract method. It acts as the target type for lambda expressions.",
        explanation: "While it can only have one abstract method, it can have multiple default or static methods. They are usually annotated with `@FunctionalInterface` so the compiler enforces this rule.",
        example: "`Runnable`, `Callable`, `Comparator`, `Predicate`, and `Function` are all built-in functional interfaces.",
        followUps: [
          {
            question: "What happens if you add a second abstract method to an interface annotated with @FunctionalInterface?",
            answer: "The compiler will throw an error immediately."
          }
        ],
        keyPoints: ["Exactly one abstract method", "Target for lambdas", "@FunctionalInterface annotation"]
      },
      {
        id: 68,
        category: "Java",
        question: "What is Stream API?",
        simpleAnswer: "The Stream API is a declarative way to process collections of objects using operations like filter, map, and reduce.",
        explanation: "It allows you to perform complex bulk data operations efficiently and readably. Streams don't store data; they just pull from a source, pass it through a pipeline of operations, and collect the result.",
        example: "`users.stream().filter(u -> u.getAge() > 18).map(User::getName).collect(Collectors.toList());`",
        followUps: [
          {
            question: "Are stream operations executed immediately?",
            answer: "No, intermediate operations (like filter/map) are evaluated lazily. They only execute when a terminal operation (like collect/count) is called."
          }
        ],
        keyPoints: ["Declarative collection processing", "Lazy evaluation", "Does not modify original data"]
      },
      {
        id: 69,
        category: "Java",
        question: "Difference between stream and collection?",
        simpleAnswer: "A Collection is a data structure that stores elements in memory. A Stream is a computational pipeline that processes elements but stores nothing.",
        explanation: "Collections are about data storage. You can add, remove, and update items. Streams are about data processing. You cannot modify a Stream, you can only consume it once to produce a result.",
        example: "Collection is a DVD (stores the movie). Stream is the DVD Player (processes the movie to your screen).",
        followUps: [
          {
            question: "Can you reuse a Stream?",
            answer: "No. Once a Stream has been consumed by a terminal operation, it is closed. Trying to use it again throws an IllegalStateException."
          }
        ],
        keyPoints: ["Collection = Storage", "Stream = Processing pipeline", "Streams are single-use"]
      },
      {
        id: 70,
        category: "Java",
        question: "What is map vs flatMap?",
        simpleAnswer: "`map` transforms each element into exactly one new element (1-to-1). `flatMap` transforms each element into a stream of multiple elements, flattening them into a single stream (1-to-Many).",
        explanation: "If you use `map` on a list of sentences to get their words, you get a Stream of String arrays (Stream<String[]>). If you use `flatMap`, it extracts every individual word into one flat Stream of Strings (Stream<String>).",
        example: "`map(User::getPhoneNumber)` returns 1 phone number. `flatMap(User::getAllPhoneNumbers)` flattens their multiple numbers into a single master stream.",
        followUps: [
          {
            question: "When should I definitively use flatMap?",
            answer: "Whenever your transformation function returns a Collection or a Stream, and you want to process the individual items rather than the collections."
          }
        ],
        keyPoints: ["map = 1-to-1 transformation", "flatMap = 1-to-Many transformation", "flatMap flattens nested structures"]
      },
      {
        id: 71,
        category: "Java",
        question: "What is Optional class?",
        simpleAnswer: "Optional is a container object that may or may not contain a non-null value, designed to prevent NullPointerExceptions.",
        explanation: "Instead of returning null when an object isn't found, methods return `Optional<T>`. This forces the caller to actively check if the value is present and handle the empty case gracefully.",
        example: "`Optional<User> user = userRepository.findById(1); return user.orElseThrow(() -> new NotFoundException());`",
        followUps: [
          {
            question: "Should you pass Optional as a method parameter?",
            answer: "No, it's considered bad practice. Optional is designed primarily as a return type to indicate missing data cleanly."
          }
        ],
        keyPoints: ["Prevents NullPointerExceptions", "Container for nullable values", "Expressive handling via orElse()"]
      },
      {
        id: 72,
        category: "Java",
        question: "What is method reference?",
        simpleAnswer: "A Method Reference (`::`) is a compact shorthand syntax for a lambda expression that simply calls an existing method.",
        explanation: "If a lambda does nothing but pass its parameters directly into an existing method, you can replace it with a method reference for cleaner code.",
        example: "Instead of `str -> System.out.println(str)`, you use `System.out::println`.",
        followUps: [
          {
            question: "Can you use method references for constructors?",
            answer: "Yes, constructor references look like `ClassName::new`."
          }
        ],
        keyPoints: ["Shorthand for lambda", "Uses double colon `::` syntax", "Improves readability"]
      },
      {
        id: 73,
        category: "Java",
        question: "What is default method in interface?",
        simpleAnswer: "A default method is a method defined inside an interface with an actual implementation, using the `default` keyword.",
        explanation: "Introduced in Java 8, it allows developers to add new methods to existing interfaces without forcing every single class that implements the interface to rewrite their code (preserving backward compatibility).",
        example: "`public interface Animal { void eat(); default void breathe() { System.out.println(\"Breathing\"); } }`",
        followUps: [
          {
            question: "What happens if a class implements two interfaces with the exact same default method?",
            answer: "The compiler throws an error (Diamond Problem). The class MUST override the method to manually resolve the ambiguity."
          }
        ],
        keyPoints: ["Allows method bodies in interfaces", "Ensures backward compatibility", "Uses `default` keyword"]
      },
      {
        id: 74,
        category: "Java",
        question: "What is final keyword? (class, method, variable)",
        simpleAnswer: "The `final` keyword restricts modification. A final variable is a constant. A final method cannot be overridden. A final class cannot be inherited.",
        explanation: "Final variables must be initialized once and can never be reassigned. Final methods protect critical behavior from being changed by child classes. Final classes (like `String`) prevent subclassing completely for security and immutability.",
        example: "`final double PI = 3.14;` (Cannot be changed). `public final class String {}` (Cannot be extended).",
        followUps: [
          {
            question: "Can a final variable be initialized in a constructor?",
            answer: "Yes, if it wasn't initialized at declaration, it's called a 'blank final variable' and MUST be initialized in all constructors."
          }
        ],
        keyPoints: ["Variable = Constant", "Method = Cannot override", "Class = Cannot extend"]
      },
      {
        id: 75,
        category: "Java",
        question: "What is static keyword?",
        simpleAnswer: "The `static` keyword means a member belongs to the class itself, rather than to specific object instances.",
        explanation: "Static variables are shared across all instances of a class. Static methods can be called directly using the class name without needing to use `new` to create an object. They cannot access non-static (instance) variables.",
        example: "`Math.max(1, 2)` calls a static method. `public static int userCount = 0;` shares the counter across all User objects.",
        followUps: [
          {
            question: "Can a static method be overridden?",
            answer: "No. If a subclass writes the same static method, it merely 'hides' the parent's method, it doesn't override it (because method calls are resolved at compile time)."
          }
        ],
        keyPoints: ["Belongs to class, not instance", "Called via ClassName", "Cannot access 'this' or instance variables"]
      },
      {
        id: 76,
        category: "Java",
        question: "What is transient keyword?",
        simpleAnswer: "The `transient` keyword is used on instance variables to prevent them from being serialized.",
        explanation: "When you serialize an object (convert it to bytes to save to a file or send over a network), any field marked as `transient` is ignored. When the object is deserialized later, that field will be initialized to its default value (like null or 0).",
        example: "`private transient String password;` prevents the password from being written to a file when the User object is saved.",
        followUps: [
          {
            question: "Can a static variable be transient?",
            answer: "Static variables are ignored by serialization anyway because they belong to the class, not the object. Adding transient to a static variable has no effect."
          }
        ],
        keyPoints: ["Blocks serialization", "Defaults to null/0 on deserialization", "Used for sensitive or temporary data"]
      },
      {
        id: 77,
        category: "Java",
        question: "What is singleton class?",
        simpleAnswer: "A Singleton is a design pattern that ensures a class has exactly one instance in the entire application, and provides a global access point to it.",
        explanation: "It is created by making the constructor `private` to prevent others from using `new`, creating a `private static` instance inside the class, and returning it via a `public static getInstance()` method.",
        example: "Database connection pools or Application Configuration managers are usually Singletons.",
        followUps: [
          {
            question: "How do you make a Singleton thread-safe?",
            answer: "By using the 'Double-Checked Locking' technique inside the getInstance() method, or by simply using an Enum to define the Singleton."
          }
        ],
        keyPoints: ["Only one instance allowed", "Private constructor", "Public static getter"]
      },
      {
        id: 78,
        category: "Java",
        question: "What is serialization & deserialization?",
        simpleAnswer: "Serialization converts a Java object into a stream of bytes. Deserialization reconstructs the object back into memory from that byte stream.",
        explanation: "This is crucial for saving object state to a database/file or sending objects across a network between microservices. A class must implement the `Serializable` marker interface to allow this.",
        example: "Sending a `Session` object across a network connection requires serialization into bytes, and deserialization on the receiving server.",
        followUps: [
          {
            question: "What is a serialVersionUID?",
            answer: "It's a unique version identifier for a Serializable class. If the class changes (e.g., you add a field), the ID changes, preventing you from accidentally deserializing an outdated byte stream."
          }
        ],
        keyPoints: ["Object -> Bytes -> Object", "Requires Serializable interface", "transient fields are skipped"]
      },
      {
        id: 79,
        category: "Java",
        question: "What is reflection?",
        simpleAnswer: "Reflection is an API that allows Java code to inspect and modify the internal structure (classes, methods, fields) of itself at runtime.",
        explanation: "Even if fields or methods are `private`, Reflection can bypass access checks to read or execute them. It is heavily used by frameworks like Spring and Hibernate to auto-configure classes and inject dependencies without knowing them at compile time.",
        example: "`Field f = user.getClass().getDeclaredField(\"password\"); f.setAccessible(true);` allows you to read a private password field.",
        followUps: [
          {
            question: "What are the drawbacks of using Reflection?",
            answer: "It breaks encapsulation (exposes private fields) and is significantly slower than regular method calls because the JVM cannot optimize it."
          }
        ],
        keyPoints: ["Inspect/modify classes at runtime", "Bypasses access modifiers (private)", "Heavily used by Spring/Hibernate"]
      },
      {
        id: 80,
        category: "Java",
        question: "What is annotation?",
        simpleAnswer: "Annotations are metadata tags (like `@Override`) attached to code that provide information to the compiler or to runtime frameworks.",
        explanation: "They don't execute any code directly themselves. Instead, frameworks (like Spring) scan your code at startup, look for specific annotations (like `@RestController`), and automatically configure the behavior of your classes.",
        example: "`@Deprecated` tells the compiler to warn users not to use a method. `@Entity` tells Hibernate to map a class to a database table.",
        followUps: [
          {
            question: "Can you create custom annotations?",
            answer: "Yes, using `@interface`. You can define whether they are retained at compile-time or runtime using the `@Retention` meta-annotation."
          }
        ],
        keyPoints: ["Code metadata", "Processed by compiler or frameworks", "Uses `@` syntax"]
      },
      {
        id: 81,
        category: "Java",
        question: "What is marker interface?",
        simpleAnswer: "A Marker Interface is an empty interface (it has no fields or methods). It acts purely as a tag for the JVM or frameworks.",
        explanation: "By implementing a marker interface, you signal to Java that the class has a specific property or requires special handling. The JVM checks if a class `instanceof` the interface before doing an action.",
        example: "`Serializable` and `Cloneable` are marker interfaces. If you try to serialize an object that doesn't implement `Serializable`, Java throws an error.",
        followUps: [
          {
            question: "Are marker interfaces still relevant in modern Java?",
            answer: "They are largely being replaced by Annotations, which are more flexible and can hold metadata."
          }
        ],
        keyPoints: ["Empty interface", "Acts as a tag/flag", "Examples: Serializable, Cloneable"]
      },
      {
        id: 82,
        category: "Java",
        question: "What is immutable class?",
        simpleAnswer: "An immutable class is a class whose state (data) cannot be changed after the object is created.",
        explanation: "To build one: mark the class `final` so it can't be extended, make all fields `private final`, do not provide setters, and perform deep copies on any mutable fields returned by getters. They are inherently thread-safe.",
        example: "`String` and `Integer` are immutable classes. If you need to change a String, a completely new one is created.",
        followUps: [
          {
            question: "Why is immutability good for multithreading?",
            answer: "Because if data can never change, multiple threads can safely read it simultaneously without ever needing synchronization locks."
          }
        ],
        keyPoints: ["State cannot change", "Inherently thread-safe", "String is the classic example"]
      },
      {
        id: 83,
        category: "Java",
        question: "What is cloning? shallow vs deep copy?",
        simpleAnswer: "Cloning creates a copy of an object. A shallow copy shares internal object references with the original, while a deep copy duplicates everything completely.",
        explanation: "If you shallow copy a `Car` object that holds an `Engine` object, both Cars will point to the exact same Engine. If one Car modifies the Engine, it affects the other. A deep copy creates a brand new Engine for the new Car.",
        example: "`Object.clone()` performs a shallow copy by default.",
        followUps: [
          {
            question: "How do you perform a deep copy?",
            answer: "You must override the `clone()` method to manually clone the internal mutable objects as well, or use Serialization to write the object to bytes and read it back as a totally new instance."
          }
        ],
        keyPoints: ["Shallow = Copies references of inner objects", "Deep = Recursively copies inner objects", "Object.clone() is shallow"]
      },
      {
        id: 84,
        category: "Java",
        question: "What is equals() and hashCode() contract?",
        simpleAnswer: "If two objects are logically equal (via `equals()`), they MUST return the exact same `hashCode()`. However, two objects with the same `hashCode()` do not have to be equal.",
        explanation: "This contract is strictly required for collections like `HashMap` and `HashSet`. The HashMap uses the hash code to quickly find the 'bucket', and then uses `equals()` to find the exact object in that bucket. If you override `equals()` but forget to override `hashCode()`, identical objects will get lost in the map.",
        example: "If two `User` objects have ID 5, they should have the same hash code so HashMap knows to put them in the exact same array index.",
        followUps: [
          {
            question: "What happens if you break the contract?",
            answer: "Hash-based collections will fail. You might insert an item into a HashSet, and later `.contains()` will return false because it looks in the wrong bucket."
          }
        ],
        keyPoints: ["Equal objects MUST have equal hash codes", "Unequal objects can share a hash code (Collision)", "Always override both together"]
      }
    ].concat(springBootInterview.questions).concat(restApiInterview.questions).concat(kafkaInterview.questions).concat(microservicesInterview.questions).concat(systemDesign.questions))
  }
};
