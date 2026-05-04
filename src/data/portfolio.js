import { springBootInterview } from "./springBootInterview.js";
import { restApiInterview } from "./restApiInterview.js";
import { kafkaInterview } from "./kafkaInterview.js";
import { microservicesInterview } from "./microservicesInterview.js";
import { systemDesign } from "./systemDesign.js";
import { coding } from "./coding.js";
import { databaseInterview } from "./databaseInterview.js";
import { devopsSecurityInterview } from "./devopsSecurityInterview.js";
import { awsInterview } from "./awsInterview.js";

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
      else if (q.id <= 90) q.topic = "11. Advanced Concepts";
      else if (q.id >= 99 && q.id <= 103) q.topic = "7. Multithreading & Concurrency";
      else if (q.id >= 104 && q.id <= 105) q.topic = "6. Collections Framework";
      else if (q.id === 106) q.topic = "8. Exception Handling";
      else if (q.id === 107) q.topic = "11. Advanced Concepts";
      else if (q.id === 108) q.topic = "9. Java 8 Features";
      else if (q.id === 109) q.topic = "7. Multithreading & Concurrency";
      else if (q.id >= 110 && q.id <= 117) q.topic = "9. Java 8 Features";
      else if (q.id >= 118 && q.id <= 120) q.topic = "6. Collections Framework";
      else if (q.id >= 121 && q.id <= 132) q.topic = "7. Multithreading & Concurrency";
      else if (q.id === 133) q.topic = "6. Collections Framework";
      else if (q.id === 134) q.topic = "6. Collections Framework";
      else if (q.id === 135) q.topic = "6. Collections Framework";
      else if (q.id === 136) q.topic = "8. Exception Handling";
      else if (q.id === 137) q.topic = "8. Exception Handling";
      else if (q.id === 138) q.topic = "9. Java 8 Features";
      else if (q.id === 139) q.topic = "7. Multithreading & Concurrency";
      else if (q.id === 140) q.topic = "1. Core Java Basics";
      else if (q.id === 141) q.topic = "5. String & Immutable Concepts";
      else q.topic = "12. VS Questions";
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
      else if (q.id <= 85) q.topic = "12. Real-World / Practical Questions";
      else if (q.id <= 94) q.topic = "13. VS Questions";
      else if (q.id <= 100) q.topic = "14. Spring Batch";
      else q.topic = "7. Spring Data JPA";
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
    } else if (q.category === "AWS") {
      if (q.id <= 708) q.topic = "1. AWS Basics";
      else if (q.id <= 716) q.topic = "2. Identity & Access Management (IAM)";
      else if (q.id <= 724) q.topic = "3. Storage";
      else if (q.id <= 732) q.topic = "4. Databases";
      else if (q.id <= 740) q.topic = "5. Data Protection";
      else if (q.id <= 748) q.topic = "6. Compliance & Governance";
      else if (q.id <= 756) q.topic = "7. Threat Detection & Response";
      else if (q.id <= 769) q.topic = "8. Billing & Pricing";
      else q.topic = "9. AWS SQS Deep Dive";
    }
    return q;
  });
};

const addQuestionUids = (questions) =>
  questions.map((q) => ({
    ...q,
    uid: q.uid || `${q.category}-${q.id}`,
  }));

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
    title: "Senior Java Backend Engineer",
    location: "New Delhi, India",
    email: "gadhwalnikhil@gmail.com",
    linkedin: "https://www.linkedin.com/in/nikhil-gadhwal-1b8688138/",
    github: "https://github.com/nik1234abc",
    summary:
      "I design and build scalable, secure, and resilient backend systems that power enterprise applications. Experienced in architecture, cloud-native modernization, and automation with a strong focus on performance, reliability, and business impact.",
    expandedSummary:
      "I build reliable backend platforms for enterprise and financial workflows, with strong depth in distributed systems, production support, secure service delivery, and cloud modernization. My work is centered on improving data consistency, reducing operational friction, and keeping high-volume systems resilient in production.",
    availability:
      "Feel free to connect for backend engineering, cloud architecture, technology discussions, or simply to explore the work I’m building.",
    resumeFile: "/Nikhil_Gadhwal_Java_Backend_Developer.pdf"
  },
  quickStats: [
    { label: "Years in Production", value: "4+", note: "Enterprise backend @ TCS" },
    { label: "Microservices Modernized", value: "9", note: "Java 8 → Java 21 migration" },
    { label: "Operational Efficiency", value: "50–70%", note: "Invoicing & regional automation" },
    { label: "AWS Certified", value: "CCP", note: "Valid Dec 2025 – Dec 2028" }
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
  interviewHub: {
    categories: ["Java", "Spring Boot", "REST APIs", "Kafka", "Microservices", "System Design", "Database", "DevOps & Security", "AWS"],
    learnerCategories: [],
    questions: addQuestionUids(assignTopics([
      {
        id: 1,
        category: "Java",
        difficulty: 1,
        question: "What are the main features of Java?",
        simpleAnswer: "Java is an object-oriented, platform-independent, secure, and strongly-typed language designed for building robust enterprise applications.",
        explanation: "Java was built to be 'Write Once, Run Anywhere' (WORA). It enforces object-oriented design, manages memory automatically via Garbage Collection, and prioritizes security by running inside a virtual machine rather than directly on the host OS.",
        analogy: "Java is like a universal power adapter for code. You write your program once, and it runs on Windows, Mac, Linux, or any device that has a JVM installed — just like a universal adapter works in any country's power socket without rewiring your device.",
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
        difficulty: 1,
        question: "Why is Java platform independent? Explain the JVM role.",
        simpleAnswer: "Java code is compiled into an intermediate 'bytecode' instead of machine code. The JVM (Java Virtual Machine) then translates this bytecode into specific machine instructions for the underlying operating system.",
        explanation: "When you write C++, it compiles directly to Windows or Mac instructions. Java compiles to .class files (bytecode). You can take that exact same .class file to any OS, as long as that OS has a JVM installed. The JVM acts as a translator between the bytecode and the actual hardware.",
        analogy: "Imagine writing a recipe in a universal cooking language that no kitchen understands directly. The JVM is like a personal chef in every kitchen — they read your universal recipe and translate it into the specific steps that work in their kitchen (Windows, Mac, Linux). Same recipe, different kitchens, same dish.",
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
        difficulty: 1,
        question: "What is the difference between JDK, JRE, and JVM?",
        simpleAnswer: "JDK is the developer toolkit, JVM is the runtime engine that executes bytecode, and JRE is the runtime bundle concept that includes the JVM plus core libraries.",
        explanation: "JDK (Java Development Kit) includes tools like `javac`, `javadoc`, and the runtime needed to run Java programs. JVM (Java Virtual Machine) is the engine that executes bytecode. Historically, JRE (Java Runtime Environment) meant JVM + standard libraries for running apps without development tools. In modern Java distributions, you usually install a JDK and use its bundled runtime rather than a separate JRE download.",
        analogy: "JVM is the engine of a car. JRE is the car with the engine and basic parts needed to drive. JDK is the full mechanic's workshop — the car plus all the tools to build and repair it. As a developer, you need the workshop (JDK). End users just need the car (JRE/JVM).",
        example: "If you want to compile and run your own Java app, install a JDK. The JVM inside that runtime executes the compiled `.class` files.",
        followUps: [
          {
            question: "Does the JDK contain the JRE?",
            answer: "Conceptually yes: the runtime sits inside the full development kit. In older Java releases this was packaged as a separate JRE; in modern Java you typically just install the JDK, which includes the runtime."
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
        difficulty: 1,
        question: "What is bytecode?",
        simpleAnswer: "Bytecode is a highly optimized set of instructions generated by the Java compiler that the JVM understands and executes.",
        explanation: "It's the middle-ground between human-readable Java code and machine-readable binary code. It is saved in `.class` files and is the exact reason Java is able to achieve its platform independence.",
        analogy: "Bytecode is like sheet music. A musician (JVM) can read sheet music and play it on any instrument (OS). The composer (you) writes the music once. The sheet music isn't the actual sound — it's an intermediate format that any trained musician can interpret and perform.",
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
        difficulty: 1,
        question: "What is a Classloader and how does it work?",
        simpleAnswer: "A Classloader is a part of the JRE that dynamically loads Java classes into the JVM memory only when they are actually needed.",
        explanation: "Java doesn't load all your code into memory when the program starts. Instead, when your code says `new User()`, the Classloader finds the `User.class` file, reads the bytecode, and loads it into the JVM's RAM.",
        analogy: "A Classloader is like a librarian. The library (classpath) has thousands of books (classes). The librarian doesn't bring every book to your desk when you walk in — they only fetch a book when you specifically ask for it. This saves space and time.",
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
        difficulty: 1,
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
        difficulty: 2,
        question: "What is the JIT (Just-In-Time) compiler?",
        simpleAnswer: "It's a part of the JVM that speeds up Java applications by taking frequently used bytecode and compiling it directly into lightning-fast machine code while the program runs.",
        explanation: "Java normally interprets bytecode line-by-line, which is slightly slow. The JIT compiler watches the program run and looks for 'hotspots' (loops or methods executed thousands of times). It translates those specific hotspots into hardware-level code so they run as fast as C++.",
        analogy: "Imagine a translator at a conference who interprets every sentence one by one (slow). After hearing the same phrase 100 times, they memorise it and can say it instantly without translating (fast). JIT does the same — it spots the code you run most often and pre-translates it so it runs at native speed.",
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
        difficulty: 1,
        question: "What are the core OOP principles?",
        simpleAnswer: "The four pillars of Object-Oriented Programming are Encapsulation, Abstraction, Inheritance, and Polymorphism.",
        explanation: "Encapsulation hides data. Abstraction hides complexity. Inheritance allows code reuse. Polymorphism allows one interface to be used for different underlying data types.",
        analogy: "Think of a car. Encapsulation: the engine is locked under the hood — you can't accidentally touch the internals. Abstraction: the steering wheel hides how the wheels turn — you just steer. Inheritance: a SportsCar is a Car — it gets all car features plus extras. Polymorphism: you drive a Car the same way whether it's a Toyota or a BMW.",
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
        difficulty: 1,
        question: "What is the difference between Abstraction and Encapsulation?",
        simpleAnswer: "Abstraction is hiding the complex implementation details (showing WHAT it does). Encapsulation is hiding and protecting the internal state/data (controlling HOW it's accessed).",
        explanation: "Think of a car. Abstraction is the steering wheel—you don't need to know how the engine turns to drive. Encapsulation is the hood over the engine—it physically protects the engine parts from being tampered with by the driver.",
        analogy: "Abstraction is like a TV remote — you press 'Volume Up' without knowing the electronics inside. Encapsulation is the plastic casing around those electronics — it protects the circuits from being touched or broken. Abstraction says 'here's what you can do'. Encapsulation says 'here's what you can't touch'.",
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
        difficulty: 1,
        question: "What is Inheritance and what are its types in Java?",
        simpleAnswer: "Inheritance is when a child class acquires the properties and methods of a parent class. Java supports Single, Multilevel, and Hierarchical inheritance.",
        explanation: "It promotes code reuse. Instead of rewriting common logic, you put it in a base class. Single: A extends B. Multilevel: A extends B, B extends C. Hierarchical: A extends B, C extends B.",
        analogy: "Inheritance is like a family trait. A child inherits eye colour, height tendencies, and personality traits from their parents — without the parents having to 'give' them explicitly. In Java, a SportsCar inherits startEngine() and accelerate() from Vehicle automatically. The child can also add its own traits (turboBoost()) or override inherited ones.",
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
        difficulty: 1,
        question: "Why is multiple inheritance not supported in Java (with classes)?",
        simpleAnswer: "To prevent the 'Diamond Problem,' where a child class inherits from two parent classes that have a method with the exact same name.",
        explanation: "If Class B and Class C both inherit from Class A and override `doWork()`, and then Class D tries to inherit from both B and C, which `doWork()` does D get? Java avoids this ambiguity entirely by only allowing you to `extend` one class.",
        analogy: "Imagine you have two parents who both have a rule called 'bedtime'. Dad says 9pm, Mum says 11pm. If you inherit from both, whose rule do you follow? Java avoids this confusion entirely by saying 'you can only have one parent class'. But you can follow multiple sets of guidelines (interfaces) as long as they don't conflict.",
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
        difficulty: 2,
        question: "What is polymorphism? (Compile-time vs Runtime)",
        simpleAnswer: "Polymorphism means 'many forms'. Compile-time polymorphism is achieved through Method Overloading, and Runtime polymorphism is achieved through Method Overriding.",
        explanation: "Polymorphism lets you write flexible code. Instead of writing separate methods for every specific object type, you can write one method that accepts a parent class or interface, and Java will figure out which specific child class implementation to run at execution time.",
        analogy: "A payment terminal is polymorphic. You can tap a credit card, debit card, or phone — the terminal runs the same 'processPayment()' action but the actual behaviour differs based on what you tapped. The terminal doesn't need to know in advance which type you'll use.",
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
        difficulty: 2,
        question: "What is the difference between Method Overloading and Method Overriding?",
        simpleAnswer: "Overloading happens in the same class when methods share a name but have different parameters. Overriding happens in a child class when it rewrites a method already defined in its parent class.",
        explanation: "Overloading is about convenience—you might want a `print(String)` method and a `print(int)` method. The compiler decides which one to call. Overriding is about changing behavior—a subclass doing something more specific than its parent. The JVM decides which one to call at runtime based on the actual object type.",
        analogy: "Overloading is like a restaurant having multiple dishes called 'pasta' — pasta with chicken, pasta with vegetables, pasta with seafood. Same name, different ingredients (parameters). Overriding is like a franchise restaurant changing the recipe — the parent company has a burger recipe, but the local branch makes it spicier. Same name, same signature, different execution.",
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
        difficulty: 2,
        question: "What is dynamic method dispatch?",
        simpleAnswer: "It is the mechanism by which a call to an overridden method is resolved at runtime, rather than compile time.",
        explanation: "When an overridden method is called through a parent class reference, Java determines which version of that method to execute based on the actual object type being referred to at the time the call occurs. This is the core of runtime polymorphism.",
        analogy: "Imagine you have a variable called 'driver' of type Person. At runtime, the actual person behind the wheel could be a Formula1Driver or a TaxiDriver. When you call driver.drive(), Java looks at who is actually sitting there — not just the label on the seat — and runs that person's specific driving style.",
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
        difficulty: 2,
        question: "What is the difference between composition and inheritance?",
        simpleAnswer: "Inheritance represents an 'IS-A' relationship, while composition represents a 'HAS-A' relationship.",
        explanation: "Inheritance is when a class inherits another class's properties and behaviors. Composition is when a class contains an instance of another class to reuse its functionality. Composition is generally preferred over inheritance because it's more flexible and doesn't break encapsulation.",
        analogy: "Inheritance: a Dog IS-A Animal — it makes sense for Dog to extend Animal. Composition: a Car HAS-A Engine — it doesn't make sense for Car to extend Engine. The car contains an engine. Prefer composition when the relationship is 'has a' rather than 'is a' — it's more flexible because you can swap the engine without changing the car.",
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
        difficulty: 2,
        question: "What happens when an object is created in Java?",
        simpleAnswer: "When you use the `new` keyword, the JVM allocates memory on the Heap for the object, initializes its variables, and executes its constructor.",
        explanation: "First, the JVM checks if the class is loaded. If not, it loads it. Then, it allocates a block of memory on the Heap. It sets all instance variables to their default values (e.g., 0, false, null). Finally, it calls the constructor to initialize the object with your specific values, and returns a reference to that memory location.",
        analogy: "Creating an object is like booking a hotel room. The hotel (JVM) finds an available room (allocates Heap memory), sets it up with standard furniture (default values), then the guest arrives and personalises it (constructor runs). You get a room key (reference) to find your room later.",
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
        difficulty: 2,
        question: "Where are objects stored in memory?",
        simpleAnswer: "The actual objects are stored in the Heap memory, while the reference variables that point to them are stored in the Stack memory.",
        explanation: "The Heap is a large pool of memory shared across all threads in your application. Whenever you type `new`, memory is carved out from the Heap. The Stack is thread-specific and stores local variables and method execution frames. It only holds the 'remote control' (reference) to the object in the Heap.",
        analogy: "The Heap is like a city's storage warehouse — all the actual furniture (objects) lives there. The Stack is like your pocket — it only holds the locker key (reference) that tells you where your furniture is stored. You don't carry the sofa in your pocket; you carry the key to find it.",
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
        difficulty: 2,
        question: "What is a constructor? What are its types?",
        simpleAnswer: "A constructor is a special block of code called automatically when an object is created. Its main purpose is to initialize the object's state.",
        explanation: "Constructors have the exact same name as the class and do not have a return type (not even `void`). There are three types: Default (provided by Java if you write none), No-Argument (written by you, takes no parameters), and Parameterized (takes arguments to set specific initial values).",
        analogy: "A constructor is like the setup checklist when you move into a new house. The moment you get the keys (create the object), the checklist runs automatically — turn on the electricity, set the thermostat, stock the fridge. You can have a basic checklist (no-arg) or a detailed one that takes your preferences (parameterized).",
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 2,
        question: "Explain the JVM memory structure.",
        simpleAnswer: "The JVM primarily divides memory into the Heap (for objects), the Stack (for thread execution), and the Metaspace (for class metadata).",
        explanation: "The Heap is where all your instances live and is shared across all threads. The Stack is where local variables and method calls live, and every single thread gets its own private Stack. Metaspace stores the actual blueprint structures of your classes and methods.",
        analogy: "Think of a busy office building. The Heap is the shared storage room — everyone's files (objects) go there. Each employee's desk (Stack) is private — they keep their own notes and current tasks there. The building's blueprint archive (Metaspace) stores the floor plans (class definitions) that describe how everything is structured.",
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
        difficulty: 2,
        question: "What is the difference between Stack and Heap memory?",
        simpleAnswer: "Heap is used for dynamic memory allocation (Objects). Stack is used for execution threads (method calls and local primitive variables).",
        explanation: "Whenever you use the 'new' keyword, the actual object is created in the Heap, which is shared. The Stack is unique to each thread. It keeps track of the methods being executed and holds local primitives and the *references* (pointers) to the actual objects in the Heap.",
        analogy: "Stack is like your work desk — small, fast, organised in a neat pile (LIFO). When you finish a task (method), you clear it off the desk. Heap is like a large warehouse — big, shared, slower to navigate. Your desk only holds a sticky note (reference) with the warehouse shelf number where the actual item (object) lives.",
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
        difficulty: 2,
        question: "What is Garbage Collection (GC)?",
        simpleAnswer: "Garbage Collection is an automatic memory management process that finds and deletes objects in the Heap that are no longer being used by your application.",
        explanation: "In languages like C++, you have to manually free up memory when you're done with it. If you forget, your app eventually crashes. In Java, the JVM runs a background daemon thread that safely destroys objects once there are no active references pointing to them.",
        analogy: "Garbage Collection is like a hotel housekeeper. When a guest checks out (object loses its reference), the housekeeper eventually comes to clean the room (free the memory) so the next guest can use it. You don't have to clean the room yourself — the housekeeper handles it automatically.",
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
        difficulty: 2,
        question: "How does Garbage Collection work internally?",
        simpleAnswer: "It uses a 'Mark and Sweep' algorithm. It marks active objects as 'alive' starting from GC Roots, and then sweeps away everything else.",
        explanation: "The GC traces a tree starting from 'GC Roots' (like active local variables on the Stack and static class variables). Any object it can reach is marked as alive. Afterwards, the 'Sweep' phase deletes all objects in the Heap that were NOT marked, freeing up that memory.",
        analogy: "Imagine a city doing a census. Officials start from known addresses (GC Roots) and visit every house they can reach, marking it as 'occupied'. Any house they couldn't reach is assumed abandoned and demolished (swept). The GC does the same — traces all reachable objects, then clears everything else.",
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
        difficulty: 3,
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
        difficulty: 3,
        question: "What is a 'Stop-the-World' event?",
        simpleAnswer: "It is a moment when the JVM completely pauses all application threads to safely perform Garbage Collection tasks.",
        explanation: "When the GC is moving objects around in memory or figuring out what to delete, it can't have your application threads creating or changing objects at the exact same time. So, it freezes your app entirely for a fraction of a second.",
        analogy: "Stop-the-World is like a fire drill in an office. Everyone has to stop what they're doing and stand still while the safety check happens. The office (JVM) can't have people running around while the fire marshal (GC) is counting heads. Once the drill is done, everyone goes back to work.",
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
        difficulty: 2,
        question: "What are memory leaks in Java?",
        simpleAnswer: "A memory leak happens when you accidentally keep references to objects you no longer need, preventing the Garbage Collector from deleting them.",
        explanation: "Since the GC only deletes 'unreachable' objects, if you put temporary data into a static `HashMap` and forget to `.remove()` it when you're done, the GC thinks you still need it. Over time, this list grows until it consumes the entire Heap.",
        analogy: "A memory leak is like a hotel that never checks guests out. New guests keep arriving and getting rooms, but old guests are never removed from the system. Eventually the hotel is 'full' even though most rooms are actually empty — the system just thinks they're still occupied.",
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
        difficulty: 2,
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
        difficulty: 2,
        question: "Why is String immutable in Java?",
        simpleAnswer: "Strings cannot be changed once created. If you try to modify one, a new String object is created instead.",
        explanation: "Immutability provides security (e.g., passing passwords/URLs), thread safety (multiple threads can share a String without synchronization), and memory efficiency (allows the String Pool to exist because shared strings won't be unexpectedly changed).",
        analogy: "A String is like a printed book. Once it's printed, you can't change the words inside. If you want a different version, you print a new book. This means multiple people can safely read the same book at the same time without worrying that someone else is changing the words while they read.",
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
        difficulty: 2,
        question: "What is the String Pool in Java?",
        simpleAnswer: "The String Pool is a special memory area in the Heap that caches String literals to save memory and improve performance.",
        explanation: "Because Strings are so commonly used, Java caches them. If you create `String a = \"hello\"` and `String b = \"hello\"`, both point to the exact same object in the String Pool instead of creating two separate objects.",
        analogy: "The String Pool is like a shared whiteboard in an office. If someone writes 'hello' on it, the next person who needs 'hello' just points to the whiteboard instead of writing it again on a new piece of paper. Everyone shares the same copy, saving paper (memory).",
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
        difficulty: 2,
        question: "What is the difference between the == operator and the .equals() method?",
        simpleAnswer: "== checks if two variables point to the exact same location in memory. .equals() checks if the actual data inside those objects is logically the same.",
        explanation: "If two people are wearing the exact same brand of blue shirt, `.equals()` is true because the shirts look identical. But `==` is false, because they are physically two different shirts on two different people.",
        analogy: "== is like checking if two people are the same person (same ID card). .equals() is like checking if two people have the same name. Two different people can have the same name (.equals() = true) but they're not the same person (== = false).",
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
        difficulty: 2,
        question: "What is the difference between StringBuilder and StringBuffer?",
        simpleAnswer: "Both modify text without creating new objects. StringBuffer is thread-safe but slower. StringBuilder is not thread-safe but much faster.",
        explanation: "If you build a long string inside a loop using `str += 'a'`, it creates a brand new String object in memory every loop. A builder modifies a single array instead. StringBuffer synchronizes every method so multiple threads can safely use it. StringBuilder skips that overhead, making it the best choice for almost all standard cases.",
        analogy: "StringBuilder is like a personal notepad — fast to write on because only you use it. StringBuffer is like a shared whiteboard with a lock — anyone can write on it safely, but you have to wait for the lock each time, which slows things down. If you're working alone, use the notepad.",
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
        difficulty: 2,
        question: "Why is String used as a key in HashMap?",
        simpleAnswer: "Because String is immutable and has a properly overridden `hashCode()` and `equals()` method.",
        explanation: "In a HashMap, the key's hash code is used to determine exactly where to store the value. If the key's data could change after it was inserted (mutable), its hash code would change, and the HashMap would never be able to find it again. String's immutability guarantees the hash code will never change.",
        analogy: "Using a mutable object as a HashMap key is like labelling a storage box with a sticky note that someone can change. You put your item in box '42', but someone changes the label to '99'. Now you can never find your item. String is like a permanent engraved label — it never changes, so you can always find what you stored.",
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
        difficulty: 1,
        question: "What is the Collection framework hierarchy?",
        simpleAnswer: "The framework is rooted in the `Iterable` interface, followed by `Collection`, which splits into `List`, `Set`, and `Queue`. `Map` is part of the framework but does not inherit from `Collection`.",
        explanation: "Lists are ordered and allow duplicates (ArrayList, LinkedList). Sets are unordered and reject duplicates (HashSet, TreeSet). Queues are for processing items in order like FIFO (PriorityQueue). Maps handle key-value pairs (HashMap, TreeMap).",
        analogy: "Think of it like a family tree. The grandparent is Iterable. The parent is Collection. The children are List (ordered, allows duplicates), Set (unique items only), and Queue (process in order). Map is like a cousin — related to the family but not a direct descendant.",
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
        difficulty: 2,
        question: "What is the difference between List, Set, and Map?",
        simpleAnswer: "List is an ordered collection that allows duplicates. Set is an unordered collection that guarantees no duplicates. Map stores key-value pairs where keys must be unique.",
        explanation: "Use a List when you care about the order of items and might have repeats. Use a Set when you just need to know if an item exists and want to filter out duplicates. Use a Map when you need to look up a specific value using a unique identifier.",
        analogy: "List is like a playlist — songs in order, same song can appear twice. Set is like a guest list — each person appears only once, order doesn't matter. Map is like a phone book — you look up a name (key) to find a number (value), and each name is unique.",
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
        difficulty: 2,
        question: "What is the difference between ArrayList and LinkedList?",
        simpleAnswer: "ArrayList uses a dynamic array under the hood. LinkedList uses a doubly-linked list with nodes pointing to each other.",
        explanation: "ArrayList is extremely fast for retrieving data (O(1)) because it acts like an index. However, adding/removing data in the middle is slow because it has to shift all subsequent elements. LinkedList is the opposite: finding data is slow because it has to traverse the nodes, but adding/removing in the middle is very fast since it just changes pointer references.",
        analogy: "ArrayList is like a numbered shelf in a library — you can jump straight to shelf 42 instantly (fast lookup), but inserting a new book in the middle means shifting every book after it (slow insert). LinkedList is like a treasure hunt chain — each clue points to the next (slow lookup), but adding a new clue anywhere just means updating two pointers (fast insert).",
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
        difficulty: 2,
        question: "What is the difference between HashMap and Hashtable?",
        simpleAnswer: "HashMap is not thread-safe and allows one null key. Hashtable is thread-safe (synchronized) but legacy, and does not allow null keys.",
        explanation: "Hashtable is a legacy class from Java 1.0. It synchronizes every single method, which creates a major bottleneck if multiple threads try to access it. HashMap is the modern standard for single-threaded scenarios. If you need thread safety today, you usually use `ConcurrentHashMap` instead of Hashtable.",
        analogy: "Hashtable is like an old bank with one teller window — thread-safe because only one person is served at a time, but everyone else waits in a long queue. HashMap is like a self-service ATM — fast, but only safe for one person at a time. ConcurrentHashMap is like a modern bank with many tellers — multiple people served simultaneously, safely.",
        example: "If you are storing user sessions in a single-threaded web request, use HashMap. If multiple threads access the map concurrently, use ConcurrentHashMap.",
        followUps: [
          {
            question: "Why does ConcurrentHashMap perform better than Hashtable?",
            answer: "Hashtable synchronizes the whole map for each operation. ConcurrentHashMap uses much finer-grained coordination, allowing many reads and many independent updates to proceed concurrently instead of serializing the entire map."
          }
        ],
        keyPoints: [
          "HashMap = Not thread-safe, allows nulls, fast",
          "Hashtable = Thread-safe, no nulls, legacy",
          "Use ConcurrentHashMap for thread safety instead"
        ]
      },
      {
        id: 40,
        category: "Java",
        difficulty: 2,
        question: "How does a HashMap work internally in Java?",
        simpleAnswer: "It stores key-value pairs in an array of 'buckets'. It uses the key's hashCode() to find the right bucket, and equals() to find the exact pair if multiple keys land in the same bucket.",
        explanation: "When you call put(key, value), Java calculates a hash for the key, which acts as an index for an array. If that index is empty, it puts the value there. If another key is already there (a collision), it stores them in a LinkedList (or a balanced tree in Java 8+) at that same index.",
        analogy: "A HashMap is like a post office with numbered PO boxes. When you send a letter (put a value), the post office hashes the recipient's name to find their box number (bucket). If two people share a box (collision), letters are stacked inside. When you collect mail (get), you go to the right box and look through the stack for your letter (equals check).",
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
        difficulty: 2,
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
        difficulty: 2,
        question: "What is a hash collision and how is it handled?",
        simpleAnswer: "A collision happens when two completely different objects generate the exact same hash code, meaning they both need to be stored in the same bucket of a HashMap.",
        explanation: "Since both objects need to go to the same array index, Java stores them there in a LinkedList (Chaining). When you try to look them up later, Java goes to that bucket and uses the `.equals()` method to check each item in the list until it finds the right one.",
        analogy: "A collision is like two people being assigned the same locker number at a gym. The gym handles it by putting a small shelf inside the locker so both people's stuff fits. When you come to get your things, you look through the shelf until you find yours.",
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
        difficulty: 2,
        question: "What is a load factor in a HashMap?",
        simpleAnswer: "The load factor is a measure of how full a hash-based collection is allowed to get before its internal capacity is automatically increased.",
        explanation: "By default, a HashMap's load factor is 0.75 (75%). If you have a map with 16 buckets, once 12 of them are filled (16 * 0.75), the HashMap creates a brand new array that is twice as big (32 buckets) and redistributes all the existing items into it. This process is called 'rehashing'.",
        analogy: "The load factor is like a restaurant's seating policy. When 75% of tables are full, the manager opens a second dining room (doubles capacity) and redistributes guests. Waiting until 100% full would cause chaos — too many collisions, too slow to find a seat.",
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
        difficulty: 3,
        question: "What is fail-fast vs fail-safe?",
        simpleAnswer: "Fail-fast iterators detect structural modification and usually throw `ConcurrentModificationException`. 'Fail-safe' is an informal term for iterators that continue safely by iterating over a snapshot or a weakly consistent view.",
        explanation: "Fail-fast helps you catch bugs quickly by throwing when a collection is structurally modified during iteration. The term 'fail-safe' is not an official Java specification term. In practice it usually refers to iterators like `CopyOnWriteArrayList` snapshot iterators or `ConcurrentHashMap` weakly consistent iterators, which do not throw `ConcurrentModificationException` just because the collection changes.",
        example: "Standard `ArrayList` iterators are fail-fast. `CopyOnWriteArrayList` uses snapshot iteration, and `ConcurrentHashMap` provides weakly consistent iterators.",
        followUps: [
          {
            question: "How does fail-fast actually detect the modification?",
            answer: "It checks an internal `modCount` variable. If the collection is modified, the modCount changes, and the iterator throws a `ConcurrentModificationException`."
          }
        ],
        keyPoints: [
          "Fail-fast often throws ConcurrentModificationException",
          "'Fail-safe' is informal Java interview terminology",
          "Snapshot or weakly consistent iterators can continue during concurrent modification"
        ]
      },
      {
        id: 45,
        category: "Java",
        difficulty: 3,
        question: "What is the difference between Comparable and Comparator?",
        simpleAnswer: "Comparable defines the 'default' natural sorting order inside the class itself. Comparator is an external rule you can create to sort objects in different custom ways.",
        explanation: "If you have an `Employee` class, you might want them to sort by ID by default. You make `Employee implements Comparable`. But if HR suddenly wants to sort them by Salary, you wouldn't rewrite the class. You create a separate `SalaryComparator` and pass it to `Collections.sort()`.",
        analogy: "Comparable is like a person's default way of introducing themselves — by name. Comparator is like a custom sorting rule imposed from outside — 'for this event, sort guests by age'. The person didn't change; the sorting rule did. You can have many Comparators for the same class without touching the class itself.",
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
        difficulty: 2,
        question: "What is the difference between TreeMap and HashMap?",
        simpleAnswer: "HashMap stores items randomly but is extremely fast. TreeMap automatically sorts its keys as you add them, but is slightly slower.",
        explanation: "HashMap uses a hashing array, so it guarantees O(1) constant time for finding items, but the keys have no predictable order. TreeMap uses a Red-Black tree under the hood. Every time you insert a key, it places it in a sorted position, which takes O(log n) time.",
        analogy: "HashMap is like a messy desk — you can find anything instantly because you remember exactly where you threw it (hash). TreeMap is like a filing cabinet with alphabetical tabs — everything is neatly sorted, but inserting a new file takes a moment to find the right slot.",
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
        difficulty: 2,
        question: "How does ConcurrentHashMap work?",
        simpleAnswer: "It is a highly optimized, thread-safe version of HashMap designed for systems where multiple threads need to read and write at the exact same time.",
        explanation: "Standard HashMap breaks if multiple threads write to it concurrently. Older solutions like `Hashtable` locked the *entire* map for every single read/write, causing massive slowdowns. `ConcurrentHashMap` uses fine-grained locking plus CAS-based coordination internally, so multiple threads can read concurrently and many updates can proceed without locking the whole map.",
        example: "It's like a bank with multiple tellers. Instead of locking the whole bank when one customer deposits money (`Hashtable`), you allow many tellers to serve different customers concurrently (`ConcurrentHashMap`).",
        followUps: [
          {
            question: "Does ConcurrentHashMap allow null keys or values?",
            answer: "No. Unlike a normal HashMap, ConcurrentHashMap strictly forbids null keys and null values to prevent ambiguity in multithreaded environments."
          }
        ],
        keyPoints: [
          "Thread-safe and highly concurrent",
          "Uses fine-grained coordination instead of whole-map locking",
          "Does not allow nulls"
        ]
      },
      {
        id: 48,
        category: "Java",
        difficulty: 1,
        question: "What is a Thread in Java?",
        simpleAnswer: "A thread is the smallest unit of execution within a program. It is an independent path of code execution.",
        explanation: "When you run a Java application, the JVM creates one 'Main' thread that runs your `main()` method. But if you need to do two things at once—like downloading a file while also keeping the UI responsive—you can spawn a second thread to handle the download in the background simultaneously.",
        analogy: "A thread is like a worker on an assembly line. One worker (main thread) can only do one task at a time. Add more workers (threads) and multiple tasks happen simultaneously. A web server creates a new worker for every customer request so no one has to wait for someone else's order to finish.",
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 2,
        question: "What is synchronization?",
        simpleAnswer: "Synchronization is a mechanism that ensures only one thread can access a shared resource or block of code at a time.",
        explanation: "In a multithreaded environment, if multiple threads try to read and write to the same variable simultaneously, data corruption occurs. Synchronization locks the resource so that when one thread enters, all other threads must wait outside until the first thread finishes and releases the lock.",
        analogy: "Synchronization is like a single-occupancy bathroom with a lock. Only one person can be inside at a time. Everyone else queues outside. When the person inside finishes and unlocks the door, the next person enters. Without the lock, two people could walk in simultaneously and chaos ensues.",
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
        difficulty: 3,
        question: "What is deadlock?",
        simpleAnswer: "A deadlock happens when two or more threads are waiting forever for locks held by each other, causing the application to completely freeze.",
        explanation: "Imagine Thread A locks Resource 1 and needs Resource 2 to finish. Meanwhile, Thread B locks Resource 2 and needs Resource 1 to finish. Neither thread will release their lock until they get the other one, meaning they both wait infinitely.",
        analogy: "Two cars at a narrow one-lane bridge from opposite sides. Car A won't reverse until Car B moves. Car B won't reverse until Car A moves. Neither moves. Traffic stops forever. The solution: establish a rule that one direction always has priority (consistent lock ordering).",
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
        difficulty: 3,
        question: "What is a race condition?",
        simpleAnswer: "A race condition is a concurrency bug where the output of a program depends on the unpredictable timing of how threads execute.",
        explanation: "It happens when multiple threads access shared data and try to change it at the same time. Because thread scheduling is controlled by the OS, one thread might read a value, pause, and before it writes the updated value back, another thread jumps in and modifies it, causing the first thread's calculations to be wrong.",
        analogy: "Two people editing the same Google Doc simultaneously without seeing each other's changes. Person A reads the balance as £150, Person B also reads £150. Both subtract £100. Both write back £50. The actual balance should be -£50 but both see £50 — the second write overwrote the first.",
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
        difficulty: 3,
        question: "What is the volatile keyword?",
        simpleAnswer: "It ensures that the value of a variable is always read directly from main memory, bypassing thread-local CPU caches.",
        explanation: "In multithreading, CPUs often cache variables for speed. If Thread A changes a variable, Thread B might not see the change because it's reading its own stale cached copy. Marking the variable as volatile forces all threads to see the most up-to-date value.",
        analogy: "Volatile is like a shared notice board in an office. Without it, each employee has their own personal copy of the memo (CPU cache) and might be working from outdated information. With volatile, everyone reads from the central notice board — always the latest version.",
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
        difficulty: 3,
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
        difficulty: 3,
        question: "What is an ExecutorService?",
        simpleAnswer: "ExecutorService is a framework that manages a pool of reusable threads, saving you from the massive performance cost of creating and destroying threads manually.",
        explanation: "Creating a `new Thread()` in Java is extremely expensive because the OS has to allocate memory. If you have 10,000 user requests and make 10,000 threads, your server will crash. ExecutorService creates a fixed 'pool' of threads. When a task finishes, the thread doesn't die; it grabs the next task from the queue.",
        analogy: "ExecutorService is like a taxi company. Instead of buying a new car for every passenger (creating a new thread for every task), the company maintains a fleet of 10 taxis (thread pool). When a taxi finishes a trip, it doesn't get scrapped — it picks up the next passenger. Much more efficient.",
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
        difficulty: 3,
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
        difficulty: 2,
        question: "What is the difference between Future and CompletableFuture?",
        simpleAnswer: "Future is a placeholder for a result, but it blocks your thread if you try to get the result before it's ready. CompletableFuture allows you to attach non-blocking callbacks.",
        explanation: "Before Java 8, if you used a Future, you had to call `.get()` which stopped everything until the task finished. CompletableFuture uses `.thenApply()` or `.thenAccept()` to say 'whenever this finishes, go do this next step,' keeping your application completely asynchronous.",
        analogy: "Future is like ordering food at a counter and standing there blocking the queue until your order is ready. CompletableFuture is like getting a buzzer — you go sit down, do other things, and the buzzer alerts you when your food is ready. Same result, but you're not blocking anyone.",
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
        difficulty: 1,
        question: "What is an exception in Java?",
        simpleAnswer: "An exception is an unwanted or unexpected event that occurs during the execution of a program, disrupting the normal flow of instructions.",
        explanation: "When something goes wrong—like trying to open a file that doesn't exist, or dividing a number by zero—Java creates an Exception object containing details about the error and 'throws' it. If your code doesn't 'catch' it, the program will crash.",
        analogy: "An exception is like a fire alarm in a building. When something goes wrong (fire = error), the alarm (exception) is triggered. If someone handles it (fire brigade = catch block), the situation is resolved. If nobody handles it, the building evacuates (program crashes).",
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
        difficulty: 1,
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 1,
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
        difficulty: 2,
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
        difficulty: 2,
        question: "What is functional interface?",
        simpleAnswer: "A Functional Interface is an interface that contains exactly one abstract method. It acts as the target type for lambda expressions.",
        explanation: "While it can only have one abstract method, it can have multiple default or static methods. They are usually annotated with `@FunctionalInterface` so the compiler enforces this rule.",
        analogy: "A functional interface is like a job description with exactly one core responsibility. A 'Driver' interface has one job: drive(). You can hand a lambda (an anonymous driver) to anything that needs a Driver. If you add a second core responsibility, it's no longer a simple driver — it's a different role entirely.",
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
        difficulty: 2,
        question: "What is Stream API?",
        simpleAnswer: "The Stream API is a declarative way to process collections of objects using operations like filter, map, and reduce.",
        explanation: "It allows you to perform complex bulk data operations efficiently and readably. Streams don't store data; they just pull from a source, pass it through a pipeline of operations, and collect the result.",
        analogy: "Stream API is like a factory assembly line. Raw materials (your list) enter at one end. Each station (filter, map, sort) does one transformation. The finished product (result) comes out the other end. The assembly line doesn't store anything — it just processes and passes along.",
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 2,
        question: "What is Optional class?",
        simpleAnswer: "Optional is a container object that may or may not contain a non-null value, designed to prevent NullPointerExceptions.",
        explanation: "Instead of returning null when an object isn't found, methods return `Optional<T>`. This forces the caller to actively check if the value is present and handle the empty case gracefully.",
        analogy: "Optional is like a gift box that may or may not have something inside. Instead of handing someone nothing (null) and watching them crash when they try to open it, you hand them a box. They can check if it's empty before opening. No surprises, no crashes.",
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
        difficulty: 2,
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
        difficulty: 2,
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
        difficulty: 1,
        question: "What is final keyword? (class, method, variable)",
        simpleAnswer: "The `final` keyword restricts modification. A final variable is a constant. A final method cannot be overridden. A final class cannot be inherited.",
        explanation: "Final variables must be initialized once and can never be reassigned. Final methods protect critical behavior from being changed by child classes. Final classes (like `String`) prevent subclassing completely for security and immutability.",
        analogy: "Final is like a 'sealed' stamp. A final variable is a sealed envelope — once you write the value, it's sealed forever. A final method is a sealed recipe — no one can alter it. A final class is a sealed product — no one can create a modified version of it.",
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
        difficulty: 1,
        question: "What is static keyword?",
        simpleAnswer: "The `static` keyword means a member belongs to the class itself, rather than to specific object instances.",
        explanation: "Static variables are shared across all instances of a class. Static methods can be called directly using the class name without needing to use `new` to create an object. They cannot access non-static (instance) variables.",
        analogy: "Static is like a company-wide policy vs a personal preference. A static variable is the company's WiFi password — shared by everyone, same for all employees. An instance variable is each employee's personal desk password — unique to each person. You don't need to hire a specific employee to read the company WiFi password.",
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
        difficulty: 2,
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
        difficulty: 2,
        question: "What is singleton class?",
        simpleAnswer: "A Singleton is a design pattern that ensures a class has exactly one instance in the entire application, and provides a global access point to it.",
        explanation: "It is created by making the constructor `private` to prevent others from using `new`, creating a `private static` instance inside the class, and returning it via a `public static getInstance()` method.",
        analogy: "A Singleton is like the President of a country — there can only be one at a time. The private constructor is like the rule that you can't just declare yourself President. The getInstance() method is the official election process — it either returns the current President or starts the process to elect one.",
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
        difficulty: 2,
        question: "What is serialization & deserialization?",
        simpleAnswer: "Serialization converts a Java object into a stream of bytes. Deserialization reconstructs the object back into memory from that byte stream.",
        explanation: "This is crucial for saving object state to a database/file or sending objects across a network between microservices. A class must implement the `Serializable` marker interface to allow this.",
        analogy: "Serialization is like packing a piece of furniture into a flat-pack box (IKEA style) to ship it. The furniture (object) is disassembled into parts (bytes) for transport. Deserialization is the assembly instructions — you follow them to reconstruct the exact same furniture on the other end.",
        example: "Sending a `Session` object across a network connection requires serialization into bytes, and deserialization on the receiving server.",
        followUps: [
          {
            question: "What is a serialVersionUID?",
            answer: "It's a version identifier for a Serializable class. If you declare it explicitly, you control compatibility across versions. If you do not declare it, Java generates one from the class structure, and structural changes can then break deserialization with `InvalidClassException`."
          }
        ],
        keyPoints: ["Object -> Bytes -> Object", "Requires Serializable interface", "transient fields are skipped"]
      },
      {
        id: 79,
        category: "Java",
        difficulty: 2,
        question: "What is reflection?",
        simpleAnswer: "Reflection is an API that allows Java code to inspect and modify the internal structure (classes, methods, fields) of itself at runtime.",
        explanation: "Even if fields or methods are `private`, Reflection can bypass access checks to read or execute them. It is heavily used by frameworks like Spring and Hibernate to auto-configure classes and inject dependencies without knowing them at compile time.",
        analogy: "Reflection is like a master key that opens every room in a building, even the ones marked 'private — staff only'. Normally guests can only enter public rooms. But the building manager (Spring/Hibernate) uses the master key to peek inside private rooms and set things up automatically.",
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
        difficulty: 2,
        question: "What is annotation?",
        simpleAnswer: "Annotations are metadata tags (like `@Override`) attached to code that provide information to the compiler or to runtime frameworks.",
        explanation: "They don't execute any code directly themselves. Instead, frameworks (like Spring) scan your code at startup, look for specific annotations (like `@RestController`), and automatically configure the behavior of your classes.",
        analogy: "Annotations are like sticky notes on a document. The note itself doesn't change the document's content, but when the right person (the framework) reads it, they know exactly what to do — 'handle this as a REST endpoint', 'map this to a database table', 'don't use this method anymore'.",
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
        difficulty: 3,
        question: "What is marker interface?",
        simpleAnswer: "A Marker Interface is an empty interface (it has no fields or methods). It acts purely as a tag for the JVM or frameworks.",
        explanation: "By implementing a marker interface, you signal to Java that the class has a specific property or requires special handling. The JVM checks if a class `instanceof` the interface before doing an action.",
        analogy: "A marker interface is like a 'Fragile' sticker on a package. The sticker has no instructions inside it — it's just a label. But when the delivery driver (JVM) sees it, they know to handle the package with extra care. The sticker itself does nothing; the meaning comes from whoever reads it.",
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
        difficulty: 3,
        question: "What is immutable class?",
        simpleAnswer: "An immutable class is a class whose state (data) cannot be changed after the object is created.",
        explanation: "To build one: mark the class `final` so it can't be extended, make all fields `private final`, do not provide setters, and perform deep copies on any mutable fields returned by getters. They are inherently thread-safe.",
        analogy: "An immutable object is like a printed book. Once it's published, the words inside never change. If you want a different version, you print a brand new book — you don't erase and rewrite the original. Multiple people can read the same book at the same time without any conflict.",
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
        difficulty: 3,
        question: "What is cloning? shallow vs deep copy?",
        simpleAnswer: "Cloning creates a copy of an object. A shallow copy shares internal object references with the original, while a deep copy duplicates everything completely.",
        explanation: "If you shallow copy a `Car` object that holds an `Engine` object, both Cars will point to the exact same Engine. If one Car modifies the Engine, it affects the other. A deep copy creates a brand new Engine for the new Car.",
        analogy: "Shallow copy is like photocopying a document that contains a sticky note with a phone number written on it. The photocopy has the same sticky note pointing to the same phone number — change the number on one and both change. Deep copy is like retyping the entire document from scratch, including writing a fresh sticky note — now they're completely independent.",
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
        difficulty: 3,
        question: "What is equals() and hashCode() contract?",
        simpleAnswer: "If two objects are logically equal (via `equals()`), they MUST return the exact same `hashCode()`. However, two objects with the same `hashCode()` do not have to be equal.",
        explanation: "This contract is strictly required for collections like `HashMap` and `HashSet`. The HashMap uses the hash code to quickly find the 'bucket', and then uses `equals()` to find the exact object in that bucket. If you override `equals()` but forget to override `hashCode()`, identical objects will get lost in the map.",
        analogy: "Think of a library with numbered shelves (hash codes) and books (objects). To find a book, you first go to the right shelf number (hashCode), then scan that shelf to find the exact title (equals). If two identical books are shelved under different numbers, you'll never find the second one — even though it exists. That's what happens when you break the contract.",
        example: "If two `User` objects have ID 5, they should have the same hash code so HashMap knows to put them in the exact same array index.",
        followUps: [
          {
            question: "What happens if you break the contract?",
            answer: "Hash-based collections will fail. You might insert an item into a HashSet, and later `.contains()` will return false because it looks in the wrong bucket."
          }
        ],
        keyPoints: ["Equal objects MUST have equal hash codes", "Unequal objects can share a hash code (Collision)", "Always override both together"]
      },

      // ─── 12. VS QUESTIONS ─────────────────────────────────────────────────
      {
        id: 91, category: "Java",
        question: "ArrayList vs LinkedList — when to use which?",
        simpleAnswer: "Use ArrayList for frequent reads (O(1) get), LinkedList for frequent insertions/deletions in the middle (O(1) add/remove with iterator).",
        explanation: "ArrayList is backed by a dynamic array — random access is O(1) but inserting/removing in the middle is O(n) due to shifting. LinkedList is a doubly-linked list — random access is O(n) but add/remove at a known position is O(1). In practice, ArrayList is preferred for most use cases because of better cache locality.",
        example: "ArrayList: userList.get(50) is instant. LinkedList: inserting at position 50 requires traversal. Use LinkedList only if you're doing many insertions/deletions at arbitrary positions.",
        followUps: [{ question: "Which is faster for iteration?", answer: "ArrayList — contiguous memory means better CPU cache performance. LinkedList nodes are scattered in memory." }],
        keyPoints: [
          "ArrayList: Provides O(1) fast random access but O(n) slow insertions and deletions in the middle.",
          "LinkedList: Provides O(1) fast insertions and deletions at known nodes but O(n) slow sequential access.",
          "ArrayList: Best suited for read-heavy scenarios and is the recommended default list.",
          "LinkedList: Best suited for implementing queues, deques, or handling frequent middle insertions."
        ]
      },
      {
        id: 92, category: "Java",
        question: "HashMap vs ConcurrentHashMap vs Hashtable",
        simpleAnswer: "HashMap is not thread-safe — use in single-threaded code. ConcurrentHashMap is thread-safe with high concurrency — use in multi-threaded code. Hashtable is thread-safe but fully synchronized and legacy — avoid in new code.",
        explanation: "HashMap: no synchronization, allows one null key and multiple null values, fastest in single-threaded use. Not safe for concurrent reads/writes — can cause infinite loops or data corruption. ConcurrentHashMap: thread-safe without locking the entire map. Java 8+ uses CAS (Compare-And-Swap) and fine-grained locks per bucket — multiple threads can read and write concurrently with minimal contention. No null keys or values allowed (null is ambiguous in concurrent contexts). Hashtable: synchronizes every method with a single lock — only one thread can access the map at a time. Thread-safe but very slow under contention. Legacy class from Java 1.0. Never use in new code. Key rule: single-threaded → HashMap. Multi-threaded → ConcurrentHashMap. Hashtable → never.",
        example: "Single-threaded service method: HashMap<String, User> cache = new HashMap<>(). Multi-threaded shared cache: ConcurrentHashMap<String, User> cache = new ConcurrentHashMap<>(). Never: new Hashtable<>() — replace with ConcurrentHashMap.",
        followUps: [{ question: "Can ConcurrentHashMap have null keys?", answer: "No — neither keys nor values can be null in ConcurrentHashMap. This is intentional: in a concurrent context, a null return from get() is ambiguous — it could mean the key doesn't exist or the value is null. HashMap allows one null key." }],
        keyPoints: [
          "HashMap: Not thread-safe, allows one null key and multiple null values, and is the fastest for single-threaded use.",
          "ConcurrentHashMap: Highly thread-safe using fine-grained locks and CAS, but strictly forbids null keys or values.",
          "Hashtable: Legacy thread-safe map that uses a single global lock, making it extremely slow under high concurrency.",
          "General: Always use HashMap for single-threaded code, ConcurrentHashMap for multithreading, and completely avoid Hashtable."
        ]
      },
      {
        id: 93, category: "Java",
        question: "Abstract class vs Interface — when to use which?",
        simpleAnswer: "Use abstract class when classes share common state/behavior (IS-A). Use interface to define a contract/capability that unrelated classes can implement (CAN-DO).",
        explanation: "Abstract class can have state (fields), constructors, and concrete methods. A class can extend only one abstract class. Interface defines a contract — no state (before Java 8), multiple interfaces can be implemented. Java 8 added default/static methods to interfaces. Java 9 added private methods.",
        example: "Abstract class: Vehicle (has speed, fuel fields). Interface: Flyable, Swimmable (capabilities). A FlyingCar can implement both Flyable and Drivable but can only extend one class.",
        followUps: [{ question: "Can an interface have a constructor?", answer: "No. Interfaces cannot have constructors because they cannot be instantiated directly." }],
        keyPoints: [
          "Abstract class: Allows sharing of state (instance variables) and establishes a strong IS-A relationship.",
          "Interface: Defines a strict contract and represents a CAN-DO capability without holding state.",
          "Abstract class: A class can only extend exactly one abstract class due to single inheritance rules.",
          "Interface: A class can implement an unlimited number of interfaces to combine multiple capabilities."
        ]
      },
      {
        id: 94, category: "Java",
        question: "Checked vs Unchecked Exceptions",
        simpleAnswer: "Checked exceptions must be declared or caught at compile time (IOException). Unchecked exceptions (RuntimeException) don't need to be declared.",
        explanation: "Checked exceptions extend Exception (not RuntimeException) — the compiler forces you to handle them. They represent recoverable conditions (file not found, network error). Unchecked exceptions extend RuntimeException — they represent programming errors (null pointer, array index out of bounds) that shouldn't be caught in normal flow.",
        example: "Checked: FileNotFoundException when reading a file — you must catch it or declare throws. Unchecked: NullPointerException — indicates a bug, not a recoverable condition.",
        followUps: [{ question: "Should you catch RuntimeException?", answer: "Generally no — they indicate bugs. Fix the root cause instead of catching them. Exception: top-level handlers for logging." }],
        keyPoints: [
          "Checked: Enforced by the compiler at compile-time and used for anticipated, recoverable conditions like network errors.",
          "Unchecked Exceptions: Occur at runtime and typically indicate logical programming bugs like null pointer access.",
          "Checked: Classes that inherit directly from the Exception class (excluding RuntimeException).",
          "Unchecked Exceptions: Classes that inherit directly from the RuntimeException class."
        ]
      },
      {
        id: 95, category: "Java",
        question: "String vs StringBuilder vs StringBuffer",
        simpleAnswer: "String is immutable — every operation creates a new object. StringBuilder is mutable and fast but not thread-safe. StringBuffer is mutable and thread-safe but slower due to synchronization.",
        explanation: "String: immutable — every concatenation creates a new String object in the heap. Stored in the String Pool for literals. Thread-safe by nature (immutable). Expensive in loops. StringBuilder: mutable char array — append() modifies the same object in place. No synchronization — not thread-safe. Fastest for string building in single-threaded code. Use in loops and method-local string construction. StringBuffer: identical API to StringBuilder but every method is synchronized — thread-safe. Slower than StringBuilder due to lock overhead. Use only when multiple threads share the same builder instance (rare in practice). Key rule: String for constants and short operations. StringBuilder for building strings in loops. StringBuffer only when shared across threads.",
        example: "Bad: String s = ''; for(int i=0; i<1000; i++) s += i; // creates 1000 String objects. Good: StringBuilder sb = new StringBuilder(); for(int i=0; i<1000; i++) sb.append(i); // one object, O(n) total. StringBuffer: only if sb is shared between threads.",
        followUps: [{ question: "Is String really immutable?", answer: "Yes — the internal char array is final and private. Even reflection-based modification breaks the String Pool contract and causes undefined behavior. Treat String as truly immutable." }],
        keyPoints: [
          "String: Completely immutable and inherently thread-safe; modifying it creates new objects, making it expensive inside loops.",
          "StringBuilder: Mutable and extremely fast for string manipulation, but not safe for use across multiple concurrent threads.",
          "StringBuffer: Mutable and thread-safe via synchronized methods, but suffers from performance overhead due to locking.",
          "General: Use String for constants, StringBuilder for active text manipulation, and StringBuffer only when multiple threads share the same builder."
        ]
      },
      {
        id: 96, category: "Java",
        question: "== vs equals()",
        simpleAnswer: "== compares object references (memory address). equals() compares object content (logical equality).",
        explanation: "For primitives, == compares values. For objects, == checks if both variables point to the same memory location. equals() is overridden in String, Integer, etc. to compare content. If you don't override equals(), it defaults to == behavior.",
        example: "String a = new String('hello'); String b = new String('hello'); a == b → false (different objects). a.equals(b) → true (same content). String literals: 'hello' == 'hello' → true (String Pool reuse).",
        followUps: [{ question: "What happens if you don't override equals()?", answer: "The default Object.equals() uses == — two different objects are never equal even if they have the same data." }],
        keyPoints: [
          "==: Checks for strict reference equality, meaning it verifies if both variables point to the exact same memory address.",
          "equals(): Checks for logical content equality, provided the method has been properly overridden by the class.",
          "General: Always override the hashCode() method whenever you override equals() to maintain collection contracts.",
          "General: While == might occasionally work for String literals due to the String Pool, you should always use equals() for object comparisons."
        ]
      },
      {
        id: 97, category: "Java",
        question: "Comparable vs Comparator",
        simpleAnswer: "Comparable defines natural ordering inside the class (compareTo). Comparator defines external custom ordering (compare) without modifying the class.",
        explanation: "Comparable is implemented by the class itself — one natural order. Comparator is a separate class/lambda — multiple orderings possible. Collections.sort() uses Comparable by default. You pass a Comparator for custom sorting.",
        example: "Employee implements Comparable<Employee> { compareTo by salary }. Separate Comparator: Comparator.comparing(Employee::getName) for name-based sort.",
        followUps: [{ question: "Can you have multiple sort orders with Comparable?", answer: "No — Comparable defines one natural order. Use Comparator for multiple orderings." }],
        keyPoints: [
          "Comparable: Defines the default, natural sorting order directly inside the class using the compareTo() method.",
          "Comparator: Defines custom, external sorting rules using the compare() method without modifying the target class.",
          "Comparable: A class can only have one natural ordering rule.",
          "Comparator: You can create an unlimited number of custom comparators for different sorting scenarios."
        ]
      },
      {
        id: 98, category: "Java",
        question: "Stack vs Heap memory",
        simpleAnswer: "Stack stores method call frames and local variables (thread-specific, fast, LIFO). Heap stores all objects and class instances (shared across threads, GC managed).",
        explanation: "Each thread has its own stack — when a method is called, a frame is pushed; when it returns, the frame is popped. Stack memory is automatically freed. Heap is shared — all objects live here and are managed by the Garbage Collector. Stack is much faster but limited in size (StackOverflowError on deep recursion).",
        example: "int x = 5; → x lives on stack. User user = new User(); → user reference on stack, User object on heap. When method returns, x is gone. User object stays until GC collects it.",
        followUps: [{ question: "What is StackOverflowError?", answer: "Thrown when the call stack exceeds its limit — usually caused by infinite recursion." }],
        keyPoints: [
          "Stack: Thread-local, LIFO-based memory that is incredibly fast and automatically freed when methods finish executing.",
          "Heap memory: Globally shared memory space where all object instances live, requiring Garbage Collection for cleanup.",
          "Stack: Stores method call frames, local primitive variables, and references (pointers) to objects.",
          "Heap memory: Stores the actual physical data of all objects and class instances."
        ]
      },

      // ─── 13. COLLECTIONS ADDITIONS ───────────────────────────────────────
      {
        id: 104, category: "Java", difficulty: 2,
        topic: "5. Collections Framework",
        question: "What is BlockingQueue and when do you use it?",
        simpleAnswer: "BlockingQueue is a thread-safe queue where the producer waits if it's full and the consumer waits if it's empty. It's the go-to tool for producer-consumer problems.",
        explanation: "A normal queue just throws an error or returns null when it's full or empty. BlockingQueue is smarter — put() automatically waits if the queue is full, and take() automatically waits if it's empty. No manual signaling needed. Java's own thread pool (ThreadPoolExecutor) uses a BlockingQueue internally to hold tasks waiting to be picked up by worker threads.",
        analogy: "Like a restaurant kitchen pass-through window. If no food is ready, the waiter just waits at the window — they don't keep running back to check. If the window is full of plates, the cook waits before adding more. Everything flows naturally without anyone managing it.",
        example: "BlockingQueue<String> queue = new LinkedBlockingQueue<>(10);\n\n// Producer thread:\nqueue.put(\"task\"); // waits automatically if queue is full\n\n// Consumer thread:\nString task = queue.take(); // waits automatically if queue is empty\n\n// Non-blocking versions (return immediately):\nqueue.offer(\"task\"); // returns false if full\nqueue.poll();        // returns null if empty",
        followUps: [{ question: "What is the difference between LinkedBlockingQueue and ArrayBlockingQueue?", answer: "LinkedBlockingQueue has no fixed size by default (unbounded) and uses separate locks for adding and removing — so it's faster. ArrayBlockingQueue has a fixed size and uses one lock for everything — simpler and more predictable memory usage." }],
        keyPoints: ["put() waits when full, take() waits when empty", "Used inside Java's own ThreadPoolExecutor", "LinkedBlockingQueue (no fixed size) vs ArrayBlockingQueue (fixed size)", "PriorityBlockingQueue processes highest-priority items first"]
      },
      {
        id: 105, category: "Java", difficulty: 2,
        topic: "5. Collections Framework",
        question: "What is LinkedHashMap?",
        simpleAnswer: "LinkedHashMap is a HashMap that remembers the order you inserted items. It gives you the speed of a HashMap but with predictable, ordered iteration.",
        explanation: "A regular HashMap stores items in a random order — you never know what order you'll get when you loop through it. LinkedHashMap fixes this by keeping a hidden linked list that tracks the insertion order. Every time you add an item, it gets added to the end of this list. So when you loop through it, items come out in the same order you put them in. You can also switch it to 'access order' mode where the most recently used item moves to the end — which is exactly how an LRU cache works.",
        analogy: "Imagine a HashMap as a messy drawer — you can find anything instantly but there's no order. LinkedHashMap is the same drawer but with numbered tags on each item showing when you added it. Same speed, but now you know the order.",
        example: "// Insertion order (default):\nLinkedHashMap<String, Integer> map = new LinkedHashMap<>();\nmap.put(\"banana\", 2);\nmap.put(\"apple\", 1);\nmap.put(\"cherry\", 3);\nSystem.out.println(map.keySet()); // [banana, apple, cherry]\n\n// LRU Cache using access order:\nLinkedHashMap<String, String> lru =\n    new LinkedHashMap<>(16, 0.75f, true) {\n        protected boolean removeEldestEntry(Map.Entry e) {\n            return size() > 100; // auto-remove oldest when over 100\n        }\n    };",
        followUps: [{ question: "What is the time complexity of LinkedHashMap?", answer: "Same as HashMap — O(1) for get and put. The linked list adds a tiny constant overhead but doesn't change the Big O." }],
        keyPoints: ["Remembers insertion order — items come out in the order you added them", "Access order mode makes it a ready-made LRU cache", "Same O(1) speed as HashMap", "Uses slightly more memory than HashMap to store the linked list"]
      },
      {
        id: 106, category: "Java", difficulty: 1,
        topic: "10. Exception Handling",
        question: "What is try-with-resources?",
        simpleAnswer: "try-with-resources automatically closes things like files and database connections when you're done — even if an error happens. You don't need to write a finally block.",
        explanation: "Before Java 7, if you opened a file or database connection, you had to manually close it in a finally block. This was messy and easy to forget. try-with-resources does it for you automatically. Any class that implements AutoCloseable (like files, streams, DB connections) can be used. Just declare it inside the try() parentheses and Java will call close() on it when the block finishes — whether it finished normally or crashed with an exception.",
        analogy: "Like a hotel room with a key card that automatically checks you out when you leave. You don't need to go to reception — the system handles it. Even if you leave in a hurry (exception), the room is still properly checked out.",
        example: "// Old way — easy to forget close():\nConnection conn = null;\ntry {\n    conn = getConnection();\n    // do work\n} finally {\n    if (conn != null) conn.close();\n}\n\n// try-with-resources — clean and automatic:\ntry (Connection conn = getConnection();\n     PreparedStatement ps = conn.prepareStatement(sql)) {\n    // do work\n} // conn and ps are automatically closed here",
        followUps: [{ question: "What is AutoCloseable?", answer: "AutoCloseable is a simple interface with one method: close(). Any class that implements it can be used in try-with-resources. Most Java I/O and database classes already implement it." }],
        keyPoints: ["Automatically calls close() when the block ends", "Works with any class that implements AutoCloseable", "Multiple resources can be declared — they close in reverse order", "Replaces the need for a finally block for cleanup"]
      },
      {
        id: 107, category: "Java", difficulty: 3,
        topic: "11. Generics",
        question: "What are Generics and what is type erasure?",
        simpleAnswer: "Generics let you write code that works safely with any type. Type erasure means Java removes the type information at runtime — so List<String> and List<Integer> look identical to the JVM.",
        explanation: "Before Java 5, collections stored everything as Object. You'd add a String, get back an Object, and have to cast it — and if you got it wrong, your app crashed at runtime. Generics fix this by catching type mistakes at compile time. But here's the catch: Java removes all generic type info when compiling. This is called type erasure. At runtime, List<String> is just List. The JVM has no idea what type was inside. This is why you can't write new T() or check instanceof T — T simply doesn't exist at runtime.",
        analogy: "Imagine a shipping label that says 'Box of Books'. The label (generic type) helps the warehouse workers (compiler) make sure only books go in. But once the box is sealed and shipped (runtime), the label is removed — the delivery truck just sees 'a box'. It can't tell what's inside anymore.",
        example: "// Generics catch errors at compile time:\nList<String> names = new ArrayList<>();\nnames.add(\"Alice\");\nnames.add(123); // compile error — caught early!\n\n// Bounded wildcards:\nvoid printNumbers(List<? extends Number> list) {} // accepts Integer, Double, etc.\nvoid addIntegers(List<? super Integer> list) {}   // accepts Integer, Number, Object\n\n// Type erasure — both are just ArrayList at runtime:\nList<String> strings = new ArrayList<>();\nList<Integer> ints = new ArrayList<>();\nstrings.getClass() == ints.getClass(); // true!",
        followUps: [{ question: "What is the difference between List<?>, List<Object>, and List<T>?", answer: "List<?> accepts any List but you can only read from it (wildcard). List<Object> only accepts exactly List<Object>. List<T> is a type parameter — T gets resolved to a specific type at compile time." }],
        keyPoints: ["Generics catch type errors at compile time instead of runtime", "Type erasure: generic info is removed — JVM only sees raw types", "? extends T — can read but not write (upper bound)", "? super T — can write but reading gives Object (lower bound)"]
      },
      {
        id: 108, category: "Java", difficulty: 1,
        topic: "12. Java 8+ Features",
        question: "What is the new Date/Time API in Java 8?",
        simpleAnswer: "Java 8 added a new java.time package with LocalDate, LocalDateTime, and ZonedDateTime — clean, immutable, and thread-safe replacements for the old buggy Date and Calendar classes.",
        explanation: "The old java.util.Date had serious problems: it was mutable (any code could change it), not thread-safe, months were 0-based (January = 0, which caused endless bugs), and it mixed date and time together. Java 8 fixed all of this. LocalDate is just a date (no time, no timezone). LocalDateTime is date plus time. ZonedDateTime adds timezone support. All of them are immutable — when you do 'add 7 days', you get a new object back, the original is unchanged.",
        analogy: "The old Date class is like a shared whiteboard — anyone can walk up and erase it. LocalDate is like a printed calendar page — it never changes. If you want next week's date, you print a new page.",
        example: "// Today's date:\nLocalDate today = LocalDate.now();\nLocalDate birthday = LocalDate.of(1995, 6, 15); // June 15 (month is 1-based!)\nlong age = ChronoUnit.YEARS.between(birthday, today);\n\n// Date + time:\nLocalDateTime meeting = LocalDateTime.of(2024, 6, 15, 10, 30);\nLocalDateTime nextWeek = meeting.plusWeeks(1); // original unchanged\n\n// With timezone (for IST):\nZonedDateTime ist = ZonedDateTime.now(ZoneId.of(\"Asia/Kolkata\"));\n\n// Format to string:\nString formatted = today.format(DateTimeFormatter.ofPattern(\"dd-MM-yyyy\"));",
        followUps: [{ question: "How do you convert old Date to LocalDate?", answer: "date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate() — go through Instant as a bridge between old and new APIs." }],
        keyPoints: ["Immutable — operations return new objects, original unchanged", "LocalDate (date only), LocalDateTime (date + time), ZonedDateTime (with timezone)", "Months are 1-based — January = 1, not 0", "Use DateTimeFormatter to convert to/from String"]
      },

      // ─── 13. CONCURRENCY ADDITIONS ────────────────────────────────────────
      {
        id: 99, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is ReentrantLock and how is it different from synchronized?",
        simpleAnswer: "ReentrantLock is an explicit lock from java.util.concurrent that gives you more control than synchronized — you can try to acquire it, time out, or interrupt a waiting thread.",
        explanation: "synchronized is simple but rigid — you can't give up waiting, you can't check if the lock is available, and you can't make it fair. ReentrantLock solves all of this. It's 'reentrant' meaning the same thread can acquire it multiple times without deadlocking itself (same as synchronized). You must always release it in a finally block.",
        analogy: "synchronized is like a bathroom with a simple lock — you wait outside with no choice. ReentrantLock is like a smart lock — you can knock and walk away if no one answers (tryLock), set a timer (tryLock with timeout), or be interrupted while waiting.",
        example: "ReentrantLock lock = new ReentrantLock();\ntry {\n    if (lock.tryLock(500, TimeUnit.MILLISECONDS)) {\n        // critical section\n    }\n} finally {\n    lock.unlock(); // ALWAYS in finally\n}",
        followUps: [{ question: "What is a fair lock?", answer: "ReentrantLock(true) creates a fair lock — threads acquire it in the order they requested it (FIFO). Prevents starvation but reduces throughput." }],
        keyPoints: ["tryLock() — non-blocking attempt", "lockInterruptibly() — can be interrupted while waiting", "Fair mode prevents starvation", "Must unlock() in finally block"]
      },
      {
        id: 100, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is CountDownLatch?",
        simpleAnswer: "CountDownLatch makes one or more threads wait until a set of operations in other threads completes. You set a count, other threads count it down, and waiting threads proceed when it hits zero.",
        explanation: "Think of it as a gate that opens only after N events happen. You initialize it with a count. Worker threads call countDown() when done. The main thread calls await() and blocks until the count reaches zero. Once it hits zero, it can never be reset — it's a one-time gate.",
        analogy: "Like a rocket launch countdown: the launch (main thread) waits until all N pre-launch checks (worker threads) are complete. Once all checks are done (count = 0), the rocket launches. You can't reuse the same countdown.",
        example: "CountDownLatch latch = new CountDownLatch(3);\n// 3 worker threads each call:\nlatch.countDown(); // after finishing work\n\n// Main thread waits:\nlatch.await(); // blocks until count = 0\nSystem.out.println(\"All workers done!\");",
        followUps: [{ question: "Can you reset a CountDownLatch?", answer: "No — once it reaches zero it stays zero. Use CyclicBarrier if you need a reusable barrier." }],
        keyPoints: ["One-time use — cannot be reset", "countDown() decrements, await() blocks", "Used for: wait for N threads to finish before proceeding", "Count can never go back up"]
      },
      {
        id: 101, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is CyclicBarrier and how is it different from CountDownLatch?",
        simpleAnswer: "CyclicBarrier makes N threads wait for each other at a barrier point, then all proceed together. Unlike CountDownLatch, it can be reused (cyclic).",
        explanation: "All N threads call await() on the barrier. Each one blocks until all N have arrived. Once all arrive, they all proceed simultaneously. Optionally, a barrier action runs first. Because it resets automatically, you can use it in loops — e.g., each round of a simulation waits for all threads to finish before starting the next round.",
        analogy: "Like a group hike where everyone waits at each checkpoint before moving to the next. No one moves forward until the whole group arrives. Then everyone moves together. The checkpoint resets for the next leg of the hike.",
        example: "CyclicBarrier barrier = new CyclicBarrier(3, () -> System.out.println(\"All ready!\"));\n// Each of 3 threads calls:\nbarrier.await(); // waits until all 3 arrive\n// All 3 proceed together after barrier action runs",
        followUps: [{ question: "CountDownLatch vs CyclicBarrier — key difference?", answer: "CountDownLatch: one thread waits for N others to finish (one-time). CyclicBarrier: N threads wait for each other (reusable, mutual wait)." }],
        keyPoints: ["Reusable — resets after each cycle", "All N threads wait for each other", "Optional barrier action runs when all arrive", "Used for: parallel algorithms with synchronization points"]
      },
      {
        id: 102, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is ThreadLocal?",
        simpleAnswer: "ThreadLocal gives each thread its own isolated copy of a variable. One ThreadLocal object, but each thread sees its own value — completely independent of other threads.",
        explanation: "Normally, objects on the heap are shared between threads. ThreadLocal breaks this — each thread has its own private slot for the variable. When thread A sets a value, thread B cannot see it. Spring uses this heavily: SecurityContextHolder stores the current user's authentication in a ThreadLocal so each request thread has its own security context without interference.",
        analogy: "Like a locker room with personal lockers. The locker room (ThreadLocal) is shared, but each person (thread) has their own locker (value). You can only open your own locker — you can't see what's in someone else's.",
        example: "ThreadLocal<String> currentUser = new ThreadLocal<>();\n\n// Thread 1:\ncurrentUser.set(\"Alice\");\nSystem.out.println(currentUser.get()); // Alice\n\n// Thread 2 (simultaneously):\ncurrentUser.set(\"Bob\");\nSystem.out.println(currentUser.get()); // Bob\n\n// Always clean up:\ncurrentUser.remove(); // prevent memory leaks in thread pools",
        followUps: [{ question: "Why must you call remove() on ThreadLocal?", answer: "Thread pools reuse threads. If you don't remove(), the old value leaks into the next request handled by that thread — a serious security/data bug." }],
        keyPoints: ["Per-thread isolated variable", "Used in Spring SecurityContextHolder, transaction context", "Always call remove() in thread pools to prevent leaks", "InheritableThreadLocal passes value to child threads"]
      },
      {
        id: 103, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is AtomicInteger and when should you use it?",
        simpleAnswer: "AtomicInteger is a thread-safe integer that supports atomic operations like increment, decrement, and compare-and-set — without using synchronized.",
        explanation: "The problem: int count++ is not atomic — it's read, increment, write (3 steps). Two threads can both read the same value and both write the same incremented value, losing one increment. AtomicInteger uses CPU-level CAS (Compare-And-Swap) instructions to do this atomically in one step — no locks needed, much faster than synchronized.",
        analogy: "Like a ticket machine at a deli counter. Instead of a person managing the counter (synchronized lock), the machine itself atomically dispenses the next number — no two people ever get the same number, and no manager is needed.",
        example: "AtomicInteger counter = new AtomicInteger(0);\n\n// Thread-safe increment:\ncounter.incrementAndGet(); // returns new value\ncounter.getAndIncrement(); // returns old value\n\n// Compare-and-swap:\ncounter.compareAndSet(5, 10); // sets to 10 only if current value is 5\n\n// vs broken non-atomic:\nint count = 0;\ncount++; // NOT thread-safe!",
        followUps: [{ question: "What is CAS (Compare-And-Swap)?", answer: "CAS is a CPU instruction: 'set value to new only if current value equals expected'. If another thread changed it first, CAS fails and retries. This is lock-free synchronization." }],
        keyPoints: ["Lock-free thread safety using CPU CAS instructions", "AtomicLong, AtomicBoolean, AtomicReference also available", "Faster than synchronized for simple counters", "compareAndSet() is the key operation"]
      },
      {
        id: 109, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is Semaphore?",
        simpleAnswer: "Semaphore controls how many threads can access a resource at the same time. It's like a parking lot with N spots — only N cars can park at once.",
        explanation: "You create a Semaphore with N permits. Each thread calls acquire() to take a permit (blocks if none available). When done, it calls release() to return the permit. This limits concurrent access to exactly N threads. Use it to control access to limited resources like database connections or API rate limits.",
        analogy: "A parking lot with 5 spots. The 6th car waits at the entrance until someone leaves. The parking attendant (Semaphore) tracks how many spots are free and lets cars in one at a time as spots open up.",
        example: "Semaphore semaphore = new Semaphore(3); // max 3 threads\n\ntry {\n    semaphore.acquire(); // get permit (blocks if none available)\n    // access limited resource\n} finally {\n    semaphore.release(); // return permit\n}\n\n// Non-blocking:\nif (semaphore.tryAcquire()) {\n    // got permit\n}",
        followUps: [{ question: "What's the difference between Semaphore(1) and ReentrantLock?", answer: "Semaphore(1) acts like a lock but any thread can release it. ReentrantLock must be released by the same thread that acquired it — safer for mutual exclusion." }],
        keyPoints: ["Controls N concurrent accesses", "acquire() takes permit, release() returns it", "Fair mode available: new Semaphore(N, true)", "Used for: connection pools, rate limiting, resource throttling"]
      },
      {
        id: 121, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What are wait() and notify()/notifyAll()?",
        simpleAnswer: "wait() makes a thread release its lock and sleep until another thread calls notify() or notifyAll() on the same object. Used for inter-thread communication.",
        explanation: "These methods must be called inside a synchronized block. wait() releases the lock and puts the thread in WAITING state. notify() wakes up one waiting thread. notifyAll() wakes up all waiting threads. The awakened thread must re-acquire the lock before continuing.",
        analogy: "Like a restaurant kitchen. The waiter (thread) checks if food is ready (condition). If not, they wait() at the counter (release lock, sleep). When the chef finishes cooking, they notify() the waiter to wake up and serve the food.",
        example: "synchronized(sharedObject) {\n    while (!condition) {\n        sharedObject.wait(); // release lock and wait\n    }\n    // condition met, do work\n}\n\n// Another thread:\nsynchronized(sharedObject) {\n    condition = true;\n    sharedObject.notify(); // wake up one waiting thread\n}",
        followUps: [{ question: "Why use notifyAll() instead of notify()?", answer: "notify() wakes only one random thread — if you wake the wrong one, others stay stuck. notifyAll() wakes all threads and lets them compete for the lock — safer but slightly less efficient." }],
        keyPoints: ["Must be called inside synchronized block", "wait() releases lock and sleeps", "notify() wakes one thread, notifyAll() wakes all", "Always use while loop, not if, to check condition"]
      },
      {
        id: 122, category: "Java", difficulty: 1,
        topic: "9. Concurrency & Multithreading",
        question: "What is Thread.join()?",
        simpleAnswer: "join() makes the current thread wait until another thread finishes. It's like saying 'don't continue until this other thread is done'.",
        explanation: "When you call thread.join(), the current thread pauses and waits for 'thread' to complete its execution. This is useful when you need results from another thread before continuing. You can also specify a timeout: join(1000) waits max 1 second.",
        analogy: "Like waiting for a friend before going to a movie. You arrive first and call friend.join() — you wait at the entrance until your friend arrives. Only then do you both enter together.",
        example: "Thread worker = new Thread(() -> {\n    // do heavy work\n    System.out.println(\"Work done\");\n});\nworker.start();\n\n// Main thread waits for worker to finish:\nworker.join(); // blocks here until worker completes\nSystem.out.println(\"Worker finished, continuing...\");",
        followUps: [{ question: "What happens if you don't call join()?", answer: "The main thread continues immediately without waiting. If main finishes before worker threads, the JVM may terminate the app before workers complete (unless they're daemon threads)." }],
        keyPoints: ["Makes current thread wait for another thread to finish", "join(timeout) waits with a time limit", "Throws InterruptedException if interrupted while waiting", "Used when you need results from another thread"]
      },
      {
        id: 123, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is Thread.interrupt() and how does it work?",
        simpleAnswer: "interrupt() sets a flag asking a thread to stop what it's doing. The thread must check this flag and decide how to respond — it's a polite request, not a force stop.",
        explanation: "Calling thread.interrupt() doesn't kill the thread. It sets an 'interrupted' flag. If the thread is sleeping or waiting, it immediately throws InterruptedException. If it's running, it must check Thread.interrupted() or isInterrupted() and handle it gracefully. You cannot force-stop a thread in Java — it must cooperate.",
        analogy: "Like tapping someone on the shoulder to get their attention. They can choose to stop what they're doing or ignore you. You can't physically force them to stop — they have to cooperate.",
        example: "// Worker thread:\nwhile (!Thread.interrupted()) {\n    // do work\n    if (Thread.interrupted()) {\n        System.out.println(\"Interrupted, cleaning up...\");\n        break;\n    }\n}\n\n// Main thread:\nThread worker = new Thread(...);\nworker.start();\nThread.sleep(1000);\nworker.interrupt(); // ask worker to stop",
        followUps: [{ question: "What's the difference between interrupted() and isInterrupted()?", answer: "interrupted() is static, checks current thread, and clears the flag. isInterrupted() is instance method, checks specific thread, and doesn't clear the flag." }],
        keyPoints: ["Sets interrupted flag — doesn't force stop", "Throws InterruptedException if thread is sleeping/waiting", "Thread must check flag and handle gracefully", "Cannot force-kill a thread in Java"]
      },
      {
        id: 124, category: "Java", difficulty: 1,
        topic: "9. Concurrency & Multithreading",
        question: "What are daemon threads?",
        simpleAnswer: "Daemon threads are background threads that automatically die when all user threads finish. The JVM doesn't wait for daemon threads to complete before exiting.",
        explanation: "By default, threads are user threads — the JVM waits for them to finish before shutting down. Daemon threads are marked with setDaemon(true) and run in the background (like garbage collection). When all user threads finish, the JVM exits immediately, killing all daemon threads mid-execution.",
        analogy: "Like background music at a party. When all guests (user threads) leave, the music (daemon thread) stops automatically — you don't wait for the song to finish before closing the venue.",
        example: "Thread daemon = new Thread(() -> {\n    while (true) {\n        System.out.println(\"Background work...\");\n        Thread.sleep(1000);\n    }\n});\ndaemon.setDaemon(true); // mark as daemon BEFORE start()\ndaemon.start();\n\n// When main thread finishes, daemon dies automatically",
        followUps: [{ question: "Can you convert a running thread to daemon?", answer: "No — you must call setDaemon(true) before calling start(). Calling it on a running thread throws IllegalThreadStateException." }],
        keyPoints: ["Background threads that die when all user threads finish", "JVM doesn't wait for daemon threads before exit", "Must call setDaemon(true) before start()", "Examples: Garbage Collector, JIT compiler threads"]
      },
      {
        id: 125, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is the difference between synchronized block and synchronized method?",
        simpleAnswer: "synchronized method locks the entire object (this). synchronized block lets you lock only a specific object or a smaller section of code — more flexible and efficient.",
        explanation: "synchronized method is shorthand for wrapping the entire method body in synchronized(this). This locks the whole object. synchronized block lets you choose what to lock and how much code to lock — you can lock just a few lines instead of the whole method, reducing contention.",
        analogy: "synchronized method is like closing the entire store when one customer needs help. synchronized block is like having a small private consultation room — only that room is locked, the rest of the store stays open.",
        example: "// synchronized method — locks entire object:\npublic synchronized void updateBalance() {\n    // entire method locked\n}\n\n// synchronized block — locks only critical section:\npublic void updateBalance() {\n    // non-critical code here (not locked)\n    synchronized(this) {\n        // only critical section locked\n        balance += amount;\n    }\n    // more non-critical code (not locked)\n}\n\n// Lock different object:\nsynchronized(lockObject) {\n    // lock specific object, not 'this'\n}",
        followUps: [{ question: "Can two synchronized methods run at the same time on the same object?", answer: "No — both lock 'this', so only one can run at a time. But if they lock different objects in synchronized blocks, they can run simultaneously." }],
        keyPoints: ["synchronized method locks entire object (this)", "synchronized block locks specific object and specific code section", "Block is more flexible — choose what to lock and how much", "Reduces lock contention — better performance"]
      },
      {
        id: 126, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What are the different types of thread pools?",
        simpleAnswer: "Java provides FixedThreadPool (fixed size), CachedThreadPool (grows as needed), ScheduledThreadPool (runs tasks with delay), and SingleThreadExecutor (one thread only).",
        explanation: "FixedThreadPool: fixed number of threads, tasks wait in queue if all busy. CachedThreadPool: creates new threads as needed, reuses idle ones, kills threads idle for 60s. ScheduledThreadPool: schedules tasks to run after delay or periodically. SingleThreadExecutor: guarantees tasks run sequentially in order.",
        analogy: "FixedThreadPool is a taxi company with 10 taxis — passengers wait if all busy. CachedThreadPool is Uber — creates drivers as needed, removes idle ones. ScheduledThreadPool is an alarm clock — runs tasks at scheduled times. SingleThreadExecutor is a single-lane road — cars go one at a time in order.",
        example: "// Fixed pool — 5 threads max:\nExecutorService fixed = Executors.newFixedThreadPool(5);\n\n// Cached pool — grows as needed:\nExecutorService cached = Executors.newCachedThreadPool();\n\n// Scheduled pool — run with delay:\nScheduledExecutorService scheduled = Executors.newScheduledThreadPool(2);\nscheduled.schedule(() -> task(), 5, TimeUnit.SECONDS); // run after 5s\nscheduled.scheduleAtFixedRate(() -> task(), 0, 1, TimeUnit.SECONDS); // every 1s\n\n// Single thread — sequential execution:\nExecutorService single = Executors.newSingleThreadExecutor();",
        followUps: [{ question: "When should you use CachedThreadPool?", answer: "For many short-lived tasks. It creates threads on demand and reuses them. Don't use for long-running tasks — it can create too many threads and crash." }],
        keyPoints: ["FixedThreadPool: fixed size, tasks queue when full", "CachedThreadPool: grows as needed, good for short tasks", "ScheduledThreadPool: delayed/periodic execution", "SingleThreadExecutor: sequential, one task at a time"]
      },
      {
        id: 127, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What is ReadWriteLock / ReentrantReadWriteLock?",
        simpleAnswer: "ReadWriteLock allows multiple threads to read simultaneously, but only one thread can write (and blocks all readers). Perfect when reads are frequent and writes are rare.",
        explanation: "Regular locks (synchronized, ReentrantLock) allow only one thread at a time — even if they're all just reading. ReadWriteLock is smarter: unlimited readers can read together, but when a writer needs the lock, it waits for readers to finish, then gets exclusive access. This dramatically improves performance for read-heavy workloads.",
        analogy: "Like a library. Multiple people can read books at the same time (read lock). But when someone needs to reorganize the shelves (write lock), everyone must leave, they do their work alone, then readers can return.",
        example: "ReadWriteLock rwLock = new ReentrantReadWriteLock();\n\n// Multiple threads can read simultaneously:\nrwLock.readLock().lock();\ntry {\n    // read data — many threads can do this together\n} finally {\n    rwLock.readLock().unlock();\n}\n\n// Only one thread can write (blocks all readers):\nrwLock.writeLock().lock();\ntry {\n    // write data — exclusive access\n} finally {\n    rwLock.writeLock().unlock();\n}",
        followUps: [{ question: "What happens if a writer is waiting while readers are active?", answer: "New readers are blocked — they wait for the writer to finish. This prevents writer starvation (writer waiting forever because readers keep coming)." }],
        keyPoints: ["Multiple readers can read simultaneously", "Only one writer, blocks all readers", "Perfect for read-heavy workloads (caches, configs)", "ReentrantReadWriteLock is the implementation"]
      },
      {
        id: 128, category: "Java", difficulty: 3,
        topic: "9. Concurrency & Multithreading",
        question: "What is ForkJoinPool and work-stealing?",
        simpleAnswer: "ForkJoinPool is a thread pool designed for divide-and-conquer tasks. It uses work-stealing — idle threads steal tasks from busy threads' queues, keeping all CPUs busy.",
        explanation: "Regular thread pools give each thread tasks from a shared queue. ForkJoinPool gives each thread its own queue. When a task is too big, it 'forks' into smaller subtasks. When a thread finishes its queue, it 'steals' work from other threads' queues. This keeps all cores busy. Java's parallel streams use ForkJoinPool internally.",
        analogy: "Like a restaurant kitchen with multiple chefs. Each chef has their own prep station (queue). If one chef finishes early, they don't sit idle — they help other busy chefs by taking tasks from their stations (work-stealing).",
        example: "// ForkJoinPool for parallel tasks:\nForkJoinPool pool = new ForkJoinPool();\n\n// Parallel stream uses ForkJoinPool internally:\nlist.parallelStream()\n    .map(item -> process(item))\n    .collect(Collectors.toList());\n\n// Custom RecursiveTask:\nclass SumTask extends RecursiveTask<Long> {\n    protected Long compute() {\n        if (small enough) return directSum();\n        // Fork into subtasks:\n        SumTask left = new SumTask(leftHalf);\n        SumTask right = new SumTask(rightHalf);\n        left.fork(); // async\n        return right.compute() + left.join(); // wait and combine\n    }\n}",
        followUps: [{ question: "When should you use ForkJoinPool vs regular ExecutorService?", answer: "Use ForkJoinPool for recursive divide-and-conquer tasks (sorting, tree traversal). Use ExecutorService for independent tasks that don't split into subtasks." }],
        keyPoints: ["Designed for divide-and-conquer parallel tasks", "Work-stealing: idle threads steal from busy threads", "Each thread has its own queue", "Used by parallel streams internally"]
      },
      {
        id: 129, category: "Java", difficulty: 3,
        topic: "9. Concurrency & Multithreading",
        question: "What is StampedLock?",
        simpleAnswer: "StampedLock (Java 8) is an advanced lock with optimistic reading — you read without locking, then validate if data changed. Much faster than ReadWriteLock for read-heavy workloads.",
        explanation: "ReadWriteLock always locks for reads. StampedLock has three modes: write (exclusive), read (shared), and optimistic read (no lock). Optimistic read returns a stamp, you read data, then validate the stamp. If valid, you got consistent data without ever locking. If invalid, upgrade to a real read lock. This is extremely fast when writes are rare.",
        analogy: "Like reading a Wikipedia article. You read it without locking (optimistic). At the end, you check the version number. If it hasn't changed, you read consistent data. If it changed, you re-read with a lock to be safe.",
        example: "StampedLock lock = new StampedLock();\n\n// Optimistic read (no lock):\nlong stamp = lock.tryOptimisticRead();\nint value = data; // read without locking\nif (!lock.validate(stamp)) {\n    // data changed, upgrade to read lock:\n    stamp = lock.readLock();\n    try {\n        value = data; // re-read with lock\n    } finally {\n        lock.unlockRead(stamp);\n    }\n}\n\n// Write lock:\nlong stamp = lock.writeLock();\ntry {\n    data = newValue;\n} finally {\n    lock.unlockWrite(stamp);\n}",
        followUps: [{ question: "When should you use StampedLock over ReadWriteLock?", answer: "When reads vastly outnumber writes and you need maximum performance. But it's more complex and not reentrant — use ReadWriteLock for simpler cases." }],
        keyPoints: ["Optimistic read: read without locking, validate after", "Much faster than ReadWriteLock for read-heavy loads", "Not reentrant — same thread can't acquire twice", "More complex API — use carefully"]
      },
      {
        id: 130, category: "Java", difficulty: 2,
        topic: "9. Concurrency & Multithreading",
        question: "What makes code thread-safe?",
        simpleAnswer: "Code is thread-safe when multiple threads can use it simultaneously without causing incorrect results or data corruption. Achieved through immutability, synchronization, or atomic operations.",
        explanation: "Thread-safe code guarantees correct behavior even when accessed by multiple threads concurrently. Ways to achieve it: 1) Immutability (String, Integer — can't change). 2) Synchronization (locks). 3) Atomic classes (AtomicInteger). 4) ThreadLocal (each thread gets its own copy). 5) No shared state (stateless methods).",
        analogy: "Like a vending machine. It's thread-safe because it handles one transaction at a time (synchronized). Even if 10 people press buttons simultaneously, it processes them one by one without mixing up orders or giving wrong change.",
        example: "// NOT thread-safe:\nclass Counter {\n    private int count = 0;\n    public void increment() { count++; } // race condition!\n}\n\n// Thread-safe with synchronized:\nclass Counter {\n    private int count = 0;\n    public synchronized void increment() { count++; }\n}\n\n// Thread-safe with AtomicInteger:\nclass Counter {\n    private AtomicInteger count = new AtomicInteger(0);\n    public void increment() { count.incrementAndGet(); }\n}\n\n// Thread-safe via immutability:\nfinal class ImmutablePerson {\n    private final String name; // can never change\n}",
        followUps: [{ question: "Are all synchronized methods thread-safe?", answer: "Not always — if the method accesses external mutable objects or static fields without proper synchronization, it can still have race conditions." }],
        keyPoints: ["Multiple threads can use it without corruption", "Achieved via: immutability, synchronization, atomic ops, ThreadLocal", "Stateless methods are inherently thread-safe", "Collections.synchronizedList() wraps collections for thread safety"]
      },
      {
        id: 131, category: "Java", difficulty: 3,
        topic: "9. Concurrency & Multithreading",
        question: "What is thread starvation?",
        simpleAnswer: "Thread starvation happens when a thread never gets CPU time because other threads keep hogging resources. The starved thread waits forever, making no progress.",
        explanation: "Starvation occurs when high-priority threads or greedy threads constantly grab the CPU, leaving low-priority threads waiting indefinitely. Unlike deadlock (threads waiting for each other), starved threads are runnable but never get scheduled. Causes: unfair locks, poor thread priorities, or too many threads competing for limited resources.",
        analogy: "Like a busy restaurant where VIP customers keep cutting in line. Regular customers (low-priority threads) wait forever because VIPs (high-priority threads) keep arriving and getting served first. The regular customers never starve to death, but they never get served either.",
        example: "// Unfair lock can cause starvation:\nReentrantLock unfairLock = new ReentrantLock(false); // unfair\n// Some threads may wait forever\n\n// Fair lock prevents starvation:\nReentrantLock fairLock = new ReentrantLock(true); // fair (FIFO)\n// All threads eventually get their turn\n\n// Thread priority starvation:\nThread lowPriority = new Thread(task);\nlowPriority.setPriority(Thread.MIN_PRIORITY);\n// May never run if high-priority threads keep coming",
        followUps: [{ question: "How do you prevent thread starvation?", answer: "Use fair locks (ReentrantLock(true)), avoid extreme thread priorities, limit thread pool size, and use timeouts (tryLock with timeout) so threads don't wait forever." }],
        keyPoints: ["Thread never gets CPU time — waits forever", "Caused by: unfair locks, priority issues, too many threads", "Different from deadlock — thread is runnable, just never scheduled", "Fix: use fair locks, balanced priorities, timeouts"]
      },
      {
        id: 132, category: "Java", difficulty: 3,
        topic: "9. Concurrency & Multithreading",
        question: "What is livelock?",
        simpleAnswer: "Livelock is when threads keep changing state in response to each other but make no progress. Unlike deadlock (frozen), threads are active but stuck in a loop.",
        explanation: "In deadlock, threads are blocked waiting. In livelock, threads are actively running but keep reacting to each other in a way that prevents progress. Like two people trying to pass each other in a hallway — both step left, both step right, both step left again, forever. They're moving but getting nowhere.",
        analogy: "Two people meet in a narrow hallway. Both try to be polite and step aside. Person A steps left, Person B steps left (now blocking each other again). Person A steps right, Person B steps right (still blocking). They keep moving but never pass each other — that's livelock.",
        example: "// Livelock example:\nclass Spoon {\n    private Diner owner;\n    public synchronized void use(Diner diner) {\n        while (owner != diner) {\n            // Politely give spoon to other diner:\n            if (owner != null) {\n                owner.giveSpoon(this);\n            }\n            owner = diner;\n        }\n    }\n}\n// Both diners keep giving the spoon back and forth\n// Both are active but neither eats (no progress)",
        followUps: [{ question: "How do you fix livelock?", answer: "Add randomness or delays so threads don't react in perfect sync. Or use a coordinator (like a traffic light) to control who goes first." }],
        keyPoints: ["Threads active but make no progress", "Keep reacting to each other in a loop", "Different from deadlock — threads are running, not blocked", "Fix: add randomness, delays, or use a coordinator"]
      },
      {
        id: 110, category: "Java", difficulty: 2,
        topic: "12. Java 8+ Features",
        question: "What are Predicate, Function, Consumer, and Supplier?",
        simpleAnswer: "These are built-in functional interfaces in Java 8. Predicate tests (returns boolean), Function transforms (takes input, returns output), Consumer consumes (takes input, returns nothing), Supplier supplies (no input, returns output).",
        explanation: "Predicate<T>: takes T, returns boolean — used in filter(). Function<T,R>: takes T, returns R — used in map(). Consumer<T>: takes T, returns void — used in forEach(). Supplier<T>: takes nothing, returns T — used in lazy evaluation. These are the building blocks of the Stream API and lambda expressions.",
        analogy: "Predicate is a bouncer — checks if you can enter (true/false). Function is a vending machine — you put in money, get out a snack (transform). Consumer is a trash can — you put something in, nothing comes out. Supplier is a faucet — turn it on, water comes out (no input needed).",
        example: "// Predicate — test\nPredicate<Integer> isEven = n -> n % 2 == 0;\nlist.stream().filter(isEven); // keep only even numbers\n\n// Function — transform\nFunction<String, Integer> length = s -> s.length();\nlist.stream().map(length); // convert strings to their lengths\n\n// Consumer — consume\nConsumer<String> print = s -> System.out.println(s);\nlist.forEach(print); // print each item\n\n// Supplier — supply\nSupplier<Double> random = () -> Math.random();\nDouble value = random.get(); // get a random number",
        followUps: [{ question: "What is BiFunction and BiConsumer?", answer: "BiFunction takes 2 inputs, returns 1 output. BiConsumer takes 2 inputs, returns nothing. Used when you need to work with pairs — like Map.forEach((key, value) -> ...)." }],
        keyPoints: ["Predicate<T>: T → boolean (test)", "Function<T,R>: T → R (transform)", "Consumer<T>: T → void (consume)", "Supplier<T>: () → T (supply)"]
      },
      {
        id: 111, category: "Java", difficulty: 2,
        topic: "12. Java 8+ Features",
        question: "What is Collectors.groupingBy() and partitioningBy()?",
        simpleAnswer: "groupingBy() groups items by a key into a Map. partitioningBy() splits items into two groups (true/false) based on a condition.",
        explanation: "groupingBy() is like SQL's GROUP BY — it takes a classifier function and returns a Map where each key has a list of items. partitioningBy() is a special case that always returns exactly 2 groups: one for true, one for false. It's more efficient than groupingBy when you only need a binary split.",
        analogy: "groupingBy is like sorting mail into mailboxes by street name — each street gets its own box. partitioningBy is like sorting mail into just 2 piles: local vs out-of-town.",
        example: "List<Person> people = ...;\n\n// Group by age:\nMap<Integer, List<Person>> byAge =\n    people.stream().collect(Collectors.groupingBy(Person::getAge));\n// Result: {25=[Alice, Bob], 30=[Charlie], ...}\n\n// Partition by adult/minor:\nMap<Boolean, List<Person>> byAdult =\n    people.stream().collect(Collectors.partitioningBy(p -> p.getAge() >= 18));\n// Result: {true=[adults...], false=[minors...]}\n\n// Group and count:\nMap<String, Long> countByCity =\n    people.stream().collect(Collectors.groupingBy(\n        Person::getCity,\n        Collectors.counting()\n    ));",
        followUps: [{ question: "Can you nest groupingBy?", answer: "Yes! Collectors.groupingBy(Person::getCity, Collectors.groupingBy(Person::getAge)) gives you Map<String, Map<Integer, List<Person>>> — grouped by city, then by age." }],
        keyPoints: ["groupingBy: group by any key → Map<K, List<V>>", "partitioningBy: split by boolean → Map<Boolean, List<V>>", "Can combine with counting(), summingInt(), averagingInt()", "Nested grouping creates multi-level Maps"]
      },
      {
        id: 112, category: "Java", difficulty: 2,
        topic: "12. Java 8+ Features",
        question: "What is Comparator.comparing() and how do you chain comparisons?",
        simpleAnswer: "Comparator.comparing() creates a comparator from a key extractor function. You can chain multiple comparisons with thenComparing() for multi-level sorting.",
        explanation: "Instead of writing a full comparator with compare() method, you just tell Java which field to compare. For multi-level sorting (like SQL ORDER BY name, age), chain with thenComparing(). You can also reverse any comparator with reversed().",
        analogy: "Like sorting a deck of cards. First by suit (hearts, diamonds...), then by rank (A, K, Q...). Comparator.comparing() picks the first rule, thenComparing() adds the tiebreaker rules.",
        example: "List<Person> people = ...;\n\n// Sort by age:\npeople.sort(Comparator.comparing(Person::getAge));\n\n// Sort by name, then age (if names match):\npeople.sort(Comparator.comparing(Person::getName)\n                      .thenComparing(Person::getAge));\n\n// Reverse order:\npeople.sort(Comparator.comparing(Person::getAge).reversed());\n\n// Null-safe:\npeople.sort(Comparator.comparing(Person::getName,\n                                  Comparator.nullsLast(String::compareTo)));",
        followUps: [{ question: "What's the difference between comparing() and comparingInt()?", answer: "comparingInt/Long/Double are optimized for primitives — they avoid boxing overhead. Use them when comparing numbers." }],
        keyPoints: ["comparing(keyExtractor) — simple one-field sort", "thenComparing() — chain for multi-level sort", "reversed() — flip the order", "nullsFirst() / nullsLast() — handle nulls safely"]
      },
      {
        id: 113, category: "Java", difficulty: 1,
        topic: "12. Java 8+ Features",
        question: "What is the var keyword in Java?",
        simpleAnswer: "var (Java 10+) lets the compiler figure out the type from the right side of the assignment. It's just shorthand — the variable is still strongly typed.",
        explanation: "Instead of writing 'Map<String, List<Integer>> map = new HashMap<>();', you write 'var map = new HashMap<String, List<Integer>>();'. The compiler infers the type. It's NOT dynamic typing like JavaScript — once set, the type never changes. You can only use var for local variables, not fields or method parameters.",
        analogy: "Like saying 'give me one of those' while pointing at a cake instead of saying 'give me one chocolate cake with vanilla frosting'. The waiter (compiler) knows exactly what you mean from context.",
        example: "// Before:\nMap<String, List<Integer>> map = new HashMap<>();\n\n// With var:\nvar map = new HashMap<String, List<Integer>>();\n// Compiler knows it's Map<String, List<Integer>>\n\n// Works with streams:\nvar names = people.stream()\n                  .map(Person::getName)\n                  .collect(Collectors.toList());\n\n// Cannot use for:\nvar x; // error — no initializer\nvar y = null; // error — can't infer from null\npublic var field; // error — only for local variables",
        followUps: [{ question: "Does var make Java dynamically typed?", answer: "No! The type is still determined at compile time and never changes. It's just type inference, not dynamic typing." }],
        keyPoints: ["Local variable type inference (Java 10+)", "Type is inferred at compile time — still strongly typed", "Only for local variables — not fields, parameters, or return types", "Must have an initializer — var x; is invalid"]
      },
      {
        id: 114, category: "Java", difficulty: 2,
        topic: "12. Java 8+ Features",
        question: "What are Records in Java?",
        simpleAnswer: "Records (Java 16+) are a quick way to create immutable data classes. Java auto-generates constructor, getters, equals(), hashCode(), and toString().",
        explanation: "Before records, creating a simple data holder required writing a class with private fields, constructor, getters, equals, hashCode, and toString — tons of boilerplate. Records do all of this in one line. They're immutable by default (all fields are final). Perfect for DTOs, API responses, and value objects.",
        analogy: "Like a pre-printed form where you just fill in the blanks. Instead of drawing the whole form from scratch (traditional class), you get a template with all the standard fields already there (record).",
        example: "// Traditional class — 30+ lines:\npublic class Person {\n    private final String name;\n    private final int age;\n    // constructor, getters, equals, hashCode, toString...\n}\n\n// Record — 1 line:\npublic record Person(String name, int age) {}\n\n// Usage:\nvar person = new Person(\"Alice\", 25);\nString name = person.name(); // auto-generated getter\nSystem.out.println(person); // auto toString: Person[name=Alice, age=25]\n\n// Can add custom methods:\npublic record Person(String name, int age) {\n    public boolean isAdult() {\n        return age >= 18;\n    }\n}",
        followUps: [{ question: "Can you modify a record's fields?", answer: "No — all fields are final. Records are immutable. To 'change' a field, create a new record with the updated value." }],
        keyPoints: ["Immutable data classes (Java 16+)", "Auto-generates: constructor, getters, equals, hashCode, toString", "All fields are final — cannot be changed", "Perfect for DTOs, value objects, API responses"]
      },
      {
        id: 115, category: "Java", difficulty: 2,
        topic: "12. Java 8+ Features",
        question: "What are Sealed Classes in Java?",
        simpleAnswer: "Sealed classes (Java 17+) let you control which classes can extend or implement them. You explicitly list the allowed subclasses.",
        explanation: "Normally, any class can extend your class (unless it's final). Sealed classes sit in the middle — they're not final, but only specific classes you permit can extend them. This is useful for modeling closed hierarchies like payment types (CreditCard, DebitCard, UPI — nothing else). The compiler can then check exhaustiveness in switch statements.",
        analogy: "Like a VIP club with a guest list. A public class is open to everyone. A final class is closed to everyone. A sealed class has a bouncer with a list — only people on the list can enter.",
        example: "// Define sealed hierarchy:\npublic sealed class Payment\n    permits CreditCard, DebitCard, UPI {}\n\npublic final class CreditCard extends Payment {}\npublic final class DebitCard extends Payment {}\npublic non-sealed class UPI extends Payment {} // allows further extension\n\n// Exhaustive switch (compiler checks all cases):\nString process(Payment payment) {\n    return switch(payment) {\n        case CreditCard c -> \"Processing credit card\";\n        case DebitCard d -> \"Processing debit card\";\n        case UPI u -> \"Processing UPI\";\n        // No default needed — compiler knows these are all cases\n    };\n}",
        followUps: [{ question: "What's the difference between sealed, final, and non-sealed?", answer: "final: no one can extend. sealed: only listed classes can extend. non-sealed: reopens the hierarchy — anyone can extend this subclass." }],
        keyPoints: ["Control which classes can extend/implement (Java 17+)", "permits keyword lists allowed subclasses", "Enables exhaustive switch statements", "Subclasses must be final, sealed, or non-sealed"]
      },
      {
        id: 116, category: "Java", difficulty: 1,
        topic: "12. Java 8+ Features",
        question: "What are Text Blocks in Java?",
        simpleAnswer: "Text blocks (Java 15+) let you write multi-line strings without escape characters. Use triple quotes \"\"\" to start and end.",
        explanation: "Before text blocks, multi-line strings required \\n for newlines and \\\" for quotes — messy and hard to read. Text blocks preserve formatting exactly as written. Perfect for JSON, SQL, HTML, or any multi-line text. Indentation is automatically stripped based on the closing \"\"\".",
        analogy: "Like the difference between typing a poem on one line with \\n everywhere vs writing it naturally across multiple lines. Text blocks let you write it naturally.",
        example: "// Old way — ugly:\nString json = \"{\\n\" +\n              \"  \\\"name\\\": \\\"Alice\\\",\\n\" +\n              \"  \\\"age\\\": 25\\n\" +\n              \"}\";\n\n// Text block — clean:\nString json = \"\"\"\n    {\n      \"name\": \"Alice\",\n      \"age\": 25\n    }\n    \"\"\";\n\n// SQL query:\nString sql = \"\"\"\n    SELECT id, name, email\n    FROM users\n    WHERE age > 18\n    ORDER BY name\n    \"\"\";\n\n// Indentation is auto-stripped based on closing \"\"\" position",
        followUps: [{ question: "How does indentation work in text blocks?", answer: "Java strips common leading whitespace based on the position of the closing \"\"\". Move the closing \"\"\" left to keep more indentation, right to strip more." }],
        keyPoints: ["Multi-line strings without escape characters (Java 15+)", "Use triple quotes: \"\"\" ... \"\"\"", "Preserves formatting — newlines, quotes, indentation", "Auto-strips common leading whitespace"]
      },
      {
        id: 117, category: "Java", difficulty: 2,
        topic: "12. Java 8+ Features",
        question: "What is Pattern Matching for instanceof?",
        simpleAnswer: "Pattern matching (Java 16+) lets you test and cast in one step. Instead of 'if (obj instanceof String) { String s = (String) obj; }', you write 'if (obj instanceof String s)'.",
        explanation: "The old way required checking the type, then casting to a new variable — two steps. Pattern matching combines them. The variable is automatically in scope only where it's safe to use (inside the if block). This eliminates the redundant cast and makes code cleaner.",
        analogy: "Like a security checkpoint that not only checks your ID but also hands you a visitor badge in one step — instead of checking ID at one desk, then walking to another desk to get the badge.",
        example: "// Old way:\nif (obj instanceof String) {\n    String s = (String) obj; // redundant cast\n    System.out.println(s.toUpperCase());\n}\n\n// Pattern matching:\nif (obj instanceof String s) {\n    System.out.println(s.toUpperCase()); // s is already cast\n}\n\n// Works with negation:\nif (!(obj instanceof String s)) {\n    return; // s not in scope here\n}\nSystem.out.println(s); // s is in scope here\n\n// In switch (Java 21 preview):\nString result = switch(obj) {\n    case String s -> s.toUpperCase();\n    case Integer i -> i.toString();\n    default -> \"unknown\";\n};",
        followUps: [{ question: "What is the scope of the pattern variable?", answer: "It's only in scope where the compiler knows the type is safe — inside the if block, or after a negated check that returns/throws." }],
        keyPoints: ["Test and cast in one step (Java 16+)", "Eliminates redundant cast", "Pattern variable scoped to where it's safe", "Works with if, switch, and negation"]
      },
      {
        id: 118, category: "Java", difficulty: 2,
        topic: "5. Collections Framework",
        question: "What is ArrayDeque and why prefer it over Stack?",
        simpleAnswer: "ArrayDeque is a resizable array-based double-ended queue. It's faster than Stack (which is legacy and synchronized) and more flexible — works as both stack and queue.",
        explanation: "Stack is old (Java 1.0) and extends Vector, so it's synchronized on every operation — slow. ArrayDeque is modern, not synchronized, and much faster. It can add/remove from both ends efficiently. Use it as a stack (push/pop), queue (offer/poll), or deque (both ends).",
        analogy: "Stack is like an old elevator with a manual operator — slow because only one person can use it at a time. ArrayDeque is a modern elevator — fast, no operator needed, and you can enter from either side.",
        example: "// As a stack:\nDeque<String> stack = new ArrayDeque<>();\nstack.push(\"A\");\nstack.push(\"B\");\nString top = stack.pop(); // \"B\"\n\n// As a queue:\nDeque<String> queue = new ArrayDeque<>();\nqueue.offer(\"A\");\nqueue.offer(\"B\");\nString first = queue.poll(); // \"A\"\n\n// As a deque (both ends):\nqueue.offerFirst(\"X\"); // add to front\nqueue.offerLast(\"Y\");  // add to back\nqueue.pollFirst();     // remove from front\nqueue.pollLast();      // remove from back",
        followUps: [{ question: "Why is Stack considered legacy?", answer: "Stack extends Vector (synchronized, slow). It violates design principles — a stack shouldn't expose Vector's random access methods. Use ArrayDeque instead." }],
        keyPoints: ["Faster than Stack — not synchronized", "Works as stack, queue, or deque", "O(1) add/remove from both ends", "Resizable — grows as needed"]
      },
      {
        id: 119, category: "Java", difficulty: 2,
        topic: "5. Collections Framework",
        question: "What is PriorityQueue and how does it work?",
        simpleAnswer: "PriorityQueue is a heap-based queue where elements are ordered by priority (natural order or custom comparator), not insertion order. The highest priority element is always at the front.",
        explanation: "Unlike a normal queue (FIFO), PriorityQueue always gives you the smallest (or largest with custom comparator) element first. It uses a binary heap internally — O(log n) to add, O(log n) to remove, O(1) to peek. Perfect for algorithms like Dijkstra's shortest path or task scheduling by priority.",
        analogy: "Like an emergency room — patients aren't treated in arrival order. The most critical patient (highest priority) is treated first, even if they arrived last.",
        example: "// Natural order (min-heap):\nPriorityQueue<Integer> pq = new PriorityQueue<>();\npq.offer(5);\npq.offer(1);\npq.offer(3);\nSystem.out.println(pq.poll()); // 1 (smallest)\nSystem.out.println(pq.poll()); // 3\nSystem.out.println(pq.poll()); // 5\n\n// Custom comparator (max-heap):\nPriorityQueue<Integer> maxHeap =\n    new PriorityQueue<>(Comparator.reverseOrder());\nmaxHeap.offer(5);\nmaxHeap.offer(1);\nmaxHeap.offer(3);\nSystem.out.println(maxHeap.poll()); // 5 (largest)\n\n// Custom objects:\nPriorityQueue<Task> tasks =\n    new PriorityQueue<>(Comparator.comparing(Task::getPriority));",
        followUps: [{ question: "Is PriorityQueue thread-safe?", answer: "No. Use PriorityBlockingQueue for thread-safe priority queue with blocking operations." }],
        keyPoints: ["Heap-based — elements ordered by priority, not insertion", "O(log n) add/remove, O(1) peek", "Default is min-heap — smallest element first", "Use Comparator.reverseOrder() for max-heap"]
      },
      {
        id: 120, category: "Java", difficulty: 2,
        topic: "5. Collections Framework",
        question: "What are EnumSet and EnumMap?",
        simpleAnswer: "EnumSet and EnumMap are specialized collections optimized for enum keys. They're extremely fast and memory-efficient because enums have a fixed, small set of values.",
        explanation: "EnumSet stores a set of enum values using a bit vector internally — each enum is just a bit (0 or 1). This makes it incredibly fast and compact. EnumMap is a Map with enum keys, stored as an array indexed by enum ordinal. Both are much faster than HashSet/HashMap for enums because there's no hashing — just direct array access.",
        analogy: "Like a checklist with checkboxes for each enum value. Instead of a complex filing system (HashMap), you just have a simple list where you check off items. Much faster to check and update.",
        example: "enum Day { MON, TUE, WED, THU, FRI, SAT, SUN }\n\n// EnumSet — fast set of enums:\nEnumSet<Day> weekend = EnumSet.of(Day.SAT, Day.SUN);\nEnumSet<Day> weekdays = EnumSet.range(Day.MON, Day.FRI);\nEnumSet<Day> allDays = EnumSet.allOf(Day.class);\n\nif (weekend.contains(Day.SAT)) { ... }\n\n// EnumMap — fast map with enum keys:\nEnumMap<Day, String> schedule = new EnumMap<>(Day.class);\nschedule.put(Day.MON, \"Meeting at 9am\");\nschedule.put(Day.FRI, \"Team lunch\");\n\nString monday = schedule.get(Day.MON);",
        followUps: [{ question: "Why are EnumSet and EnumMap faster than HashSet and HashMap?", answer: "No hashing needed — enums have ordinal values (0, 1, 2...) so they use direct array indexing. EnumSet uses a bit vector — each enum is just one bit." }],
        keyPoints: ["EnumSet: bit vector — extremely fast and compact", "EnumMap: array-based — O(1) with no hashing overhead", "Only work with enum types", "Much faster than HashSet/HashMap for enums"]
      },
      {
        id: 133, category: "Java", difficulty: 2,
        topic: "5. Collections Framework",
        question: "What is CopyOnWriteArrayList and when should you use it?",
        simpleAnswer: "CopyOnWriteArrayList is a thread-safe List that creates a fresh copy of the underlying array on every write operation, so reads are always lock-free and safe.",
        explanation: "Every time you add, remove, or update an element, CopyOnWriteArrayList makes a full copy of the internal array, applies the change to the copy, then replaces the original. This means any thread currently iterating over the old array sees a consistent snapshot and never throws ConcurrentModificationException. The tradeoff is that writes are expensive (O(n) copy), so it is only a good fit when reads vastly outnumber writes.",
        analogy: "Imagine a shared whiteboard in an office. Instead of locking the board every time someone reads it, you take a photo of it before making any change. Readers always look at the latest photo — they are never blocked. Writers pay the cost of reprinting the photo each time.",
        example: "Perfect for a list of event listeners or a read-heavy configuration list that rarely changes:\n\nList<String> listeners = new CopyOnWriteArrayList<>();\nlisteners.add(\"listenerA\");\n\n// Safe to iterate without locking\nfor (String l : listeners) {\n    notify(l); // no ConcurrentModificationException\n}",
        followUps: [
          { question: "What is the main disadvantage of CopyOnWriteArrayList?", answer: "Writes are O(n) because the entire array is copied. Memory usage also doubles temporarily during a write. It is a poor choice when writes are frequent." },
          { question: "Does CopyOnWriteArrayList allow null values?", answer: "Yes, unlike ConcurrentHashMap, CopyOnWriteArrayList does allow null elements." }
        ],
        keyPoints: ["Thread-safe List — no locking needed for reads", "Creates a full array copy on every write (expensive writes, cheap reads)", "Iterator works on a snapshot — never throws ConcurrentModificationException", "Best for read-heavy, write-rare scenarios like listener lists"]
      },

      // ─── MISSING MUST-HAVE QUESTIONS ─────────────────────────────────────
      {
        id: 134, category: "Java", difficulty: 2,
        topic: "6. Collections Framework",
        question: "What is WeakHashMap?",
        simpleAnswer: "WeakHashMap is a Map where keys are held as weak references. If a key has no other references, the GC automatically removes that entry — perfect for caches.",
        explanation: "In a regular HashMap, keys are held strongly — the GC can never remove them as long as the map exists. WeakHashMap holds keys weakly. When the key object has no other strong references in your code, the GC removes it and the map entry disappears automatically. This prevents memory leaks in cache scenarios.",
        analogy: "Like a sticky note on a file. As long as someone is holding the file (strong reference), the note stays. The moment no one holds the file anymore, the note disappears on its own. You don't need to manually clean up.",
        example: "WeakHashMap<Object, String> cache = new WeakHashMap<>();\n\nObject key = new Object();\ncache.put(key, \"cached value\");\nSystem.out.println(cache.size()); // 1\n\nkey = null; // remove strong reference\nSystem.gc();  // GC can now collect the key\n\n// After GC runs:\nSystem.out.println(cache.size()); // 0 — entry auto-removed!",
        followUps: [{ question: "When should you use WeakHashMap over HashMap?", answer: "Use WeakHashMap for caches where entries should expire when the key is no longer used elsewhere. Don't use it for permanent data — entries can disappear unexpectedly." }],
        keyPoints: ["Keys held as weak references — GC can remove them", "Entry auto-removed when key has no strong references", "Perfect for memory-sensitive caches", "Don't use for permanent data — entries disappear unpredictably"]
      },
      {
        id: 135, category: "Java", difficulty: 2,
        topic: "6. Collections Framework",
        question: "What is the difference between HashMap, LinkedHashMap, and TreeMap?",
        simpleAnswer: "HashMap: no order, fastest. LinkedHashMap: insertion order, slightly slower. TreeMap: sorted by key, slowest but ordered.",
        explanation: "HashMap stores entries in random order using hashing — O(1) get/put. LinkedHashMap extends HashMap but maintains a linked list to remember insertion order — same O(1) speed with a tiny memory overhead. TreeMap uses a Red-Black tree to keep keys sorted — O(log n) get/put but you can iterate in sorted order or do range queries.",
        analogy: "HashMap is a messy drawer — fast to throw things in and find them, but no order. LinkedHashMap is a drawer with numbered slots — same speed but you remember what order you added things. TreeMap is an alphabetically sorted filing cabinet — slower to file and find, but everything is always in order.",
        example: "// HashMap — random order:\nMap<String, Integer> hashMap = new HashMap<>();\nhashMap.put(\"banana\", 2); hashMap.put(\"apple\", 1);\n// iteration order: unpredictable\n\n// LinkedHashMap — insertion order:\nMap<String, Integer> linked = new LinkedHashMap<>();\nlinked.put(\"banana\", 2); linked.put(\"apple\", 1);\n// iteration order: banana, apple (insertion order)\n\n// TreeMap — sorted by key:\nMap<String, Integer> tree = new TreeMap<>();\ntree.put(\"banana\", 2); tree.put(\"apple\", 1);\n// iteration order: apple, banana (alphabetical)\ntree.firstKey(); // apple\ntree.subMap(\"a\", \"c\"); // range query",
        followUps: [{ question: "Which one should you use by default?", answer: "HashMap — it's the fastest. Use LinkedHashMap when order matters (like LRU cache). Use TreeMap when you need sorted keys or range queries." }],
        keyPoints: ["HashMap: O(1), no order", "LinkedHashMap: O(1), insertion order", "TreeMap: O(log n), sorted by key", "TreeMap supports range queries: firstKey(), lastKey(), subMap()"]
      },
      {
        id: 136, category: "Java", difficulty: 2,
        topic: "8. Exception Handling",
        question: "How do you create a custom exception?",
        simpleAnswer: "Extend Exception for checked or RuntimeException for unchecked. Add a message constructor and optionally a cause constructor.",
        explanation: "Custom exceptions make your code more readable and let callers handle specific error cases. Extend RuntimeException if callers shouldn't be forced to catch it (most common in Spring apps). Extend Exception if callers must handle it. Always provide a constructor that accepts a message and one that accepts a cause for exception chaining.",
        analogy: "Like creating a custom error code in your app. Instead of throwing a generic 'something went wrong', you throw InsufficientFundsException — the caller knows exactly what happened and can handle it specifically.",
        example: "// Unchecked custom exception (most common):\npublic class InsufficientFundsException extends RuntimeException {\n    private final double amount;\n\n    public InsufficientFundsException(double amount) {\n        super(\"Insufficient funds: need \" + amount + \" more\");\n        this.amount = amount;\n    }\n\n    // For exception chaining:\n    public InsufficientFundsException(String message, Throwable cause) {\n        super(message, cause);\n    }\n\n    public double getAmount() { return amount; }\n}\n\n// Usage:\nthrow new InsufficientFundsException(500.0);",
        followUps: [{ question: "When should you use checked vs unchecked custom exceptions?", answer: "Use unchecked (RuntimeException) for programming errors or business rule violations — callers usually can't recover. Use checked (Exception) for recoverable conditions where callers must handle it, like file not found." }],
        keyPoints: ["Extend RuntimeException for unchecked, Exception for checked", "Always provide message constructor", "Add cause constructor for exception chaining", "Add custom fields for extra context (like amount, userId)"]
      },
      {
        id: 137, category: "Java", difficulty: 2,
        topic: "8. Exception Handling",
        question: "What is exception chaining?",
        simpleAnswer: "Exception chaining wraps one exception inside another. You catch a low-level exception and throw a higher-level one with the original as the cause — so you don't lose the root cause.",
        explanation: "When you catch a SQLException and throw a ServiceException, you should pass the original exception as the cause. This preserves the full stack trace. Without chaining, you lose the root cause and debugging becomes very hard. Use the constructor that accepts Throwable cause, or call initCause().",
        analogy: "Like a chain of blame. The database crashed (root cause) → the repository failed → the service failed → the API returned 500. Each layer wraps the previous error. When debugging, you can trace back through the chain to find the real problem.",
        example: "// Without chaining — root cause LOST:\ntry {\n    db.query(sql);\n} catch (SQLException e) {\n    throw new ServiceException(\"DB failed\"); // original error gone!\n}\n\n// With chaining — root cause PRESERVED:\ntry {\n    db.query(sql);\n} catch (SQLException e) {\n    throw new ServiceException(\"DB failed\", e); // e is the cause\n}\n\n// Reading the chain:\ncatch (ServiceException e) {\n    e.getCause();    // returns the original SQLException\n    e.printStackTrace(); // prints full chain\n}",
        followUps: [{ question: "What is initCause()?", answer: "initCause(Throwable) sets the cause after construction — used when you can't pass cause in the constructor. But prefer the constructor approach — it's cleaner." }],
        keyPoints: ["Pass original exception as cause: new MyException(msg, cause)", "getCause() retrieves the wrapped exception", "Preserves full stack trace for debugging", "Never swallow exceptions — always chain or log them"]
      },
      {
        id: 138, category: "Java", difficulty: 2,
        topic: "9. Java 8 Features",
        question: "What is reduce() in streams?",
        simpleAnswer: "reduce() combines all stream elements into a single result by repeatedly applying a function. Like summing all numbers, finding max, or concatenating strings.",
        explanation: "reduce() takes an identity value (starting point) and a BinaryOperator (function that combines two elements). It starts with the identity, applies the function to combine it with the first element, then combines that result with the second element, and so on until one value remains.",
        analogy: "Like a snowball rolling down a hill. It starts small (identity value), picks up snow (each element) as it rolls, and gets bigger with each roll (accumulator function). At the bottom, you have one big snowball (final result).",
        example: "List<Integer> numbers = List.of(1, 2, 3, 4, 5);\n\n// Sum:\nint sum = numbers.stream()\n    .reduce(0, (a, b) -> a + b); // 15\n// or:\nint sum2 = numbers.stream()\n    .reduce(0, Integer::sum);\n\n// Max:\nOptional<Integer> max = numbers.stream()\n    .reduce((a, b) -> a > b ? a : b); // 5\n\n// String concatenation:\nList<String> words = List.of(\"Hello\", \" \", \"World\");\nString result = words.stream()\n    .reduce(\"\", String::concat); // \"Hello World\"",
        followUps: [{ question: "What's the difference between reduce() with and without identity?", answer: "With identity: always returns the type directly (safe, returns identity if stream is empty). Without identity: returns Optional<T> because the stream might be empty." }],
        keyPoints: ["Combines all elements into one result", "reduce(identity, accumulator) — safe, returns value directly", "reduce(accumulator) — returns Optional (stream may be empty)", "Use collect() for complex aggregations, reduce() for simple ones"]
      },
      {
        id: 139, category: "Java", difficulty: 2,
        topic: "7. Multithreading & Concurrency",
        question: "What is the difference between sleep() and wait()?",
        simpleAnswer: "sleep() pauses the thread for a fixed time but keeps its lock. wait() releases the lock and waits until another thread calls notify() — used for thread coordination.",
        explanation: "Thread.sleep(ms) just pauses execution for a set time — the thread still holds any locks it has. Object.wait() must be called inside a synchronized block, releases the lock so other threads can proceed, and waits until notify() wakes it up. sleep() is for timing/delays. wait() is for inter-thread communication.",
        analogy: "sleep() is like taking a nap with your office key in your pocket — you're resting but no one else can enter your office. wait() is like leaving your key at reception while you wait for a call — others can use the office while you wait.",
        example: "// sleep() — keeps lock, fixed duration:\nsynchronized(lock) {\n    Thread.sleep(1000); // holds lock for 1 second!\n}\n\n// wait() — releases lock, waits for notify:\nsynchronized(lock) {\n    while (!conditionMet) {\n        lock.wait(); // releases lock, waits\n    }\n}\n\n// Another thread:\nsynchronized(lock) {\n    conditionMet = true;\n    lock.notify(); // wakes up waiting thread\n}",
        followUps: [{ question: "Which class do sleep() and wait() belong to?", answer: "sleep() is a static method of Thread class. wait() is an instance method of Object class — every object in Java has it." }],
        keyPoints: ["sleep(): Thread class, keeps lock, fixed time pause", "wait(): Object class, releases lock, waits for notify()", "wait() must be inside synchronized block", "sleep() is for delays, wait() is for coordination"]
      },
      {
        id: 140, category: "Java", difficulty: 2,
        topic: "1. Core Java Basics",
        question: "What is enum in Java and what can it do?",
        simpleAnswer: "enum is a special class for a fixed set of constants. It can have fields, constructors, and methods — much more powerful than just a list of constants.",
        explanation: "enum is not just a list of names. Each enum constant is actually an instance of the enum class. You can add fields to store data, constructors to initialize them, and methods to add behavior. You can even have abstract methods that each constant implements differently. Enums are implicitly final, extend java.lang.Enum, and are thread-safe singletons.",
        analogy: "Like a set of playing card suits. Each suit (HEARTS, DIAMONDS, CLUBS, SPADES) is a constant, but each can also carry its own color (red/black) and symbol. The suit is fixed — you can't add a 5th suit — but each one has its own data and behavior.",
        example: "// Basic enum:\nenum Day { MON, TUE, WED, THU, FRI, SAT, SUN }\n\n// Enum with fields and constructor:\nenum Planet {\n    MERCURY(3.303e+23, 2.4397e6),\n    EARTH(5.976e+24, 6.37814e6);\n\n    private final double mass;\n    private final double radius;\n\n    Planet(double mass, double radius) {\n        this.mass = mass;\n        this.radius = radius;\n    }\n\n    double surfaceGravity() {\n        return 6.67300E-11 * mass / (radius * radius);\n    }\n}\n\n// Enum with abstract method:\nenum Operation {\n    ADD { public int apply(int a, int b) { return a + b; } },\n    MUL { public int apply(int a, int b) { return a * b; } };\n    public abstract int apply(int a, int b);\n}",
        followUps: [{ question: "Can enum implement an interface?", answer: "Yes! enum can implement interfaces. This is useful for giving all enum constants a common contract. enum cannot extend a class (it already extends java.lang.Enum)." }],
        keyPoints: ["Each constant is an instance of the enum class", "Can have fields, constructors, and methods", "Can implement interfaces but cannot extend classes", "values() returns all constants, ordinal() returns position, name() returns name"]
      },
      {
        id: 141, category: "Java", difficulty: 2,
        topic: "5. String & Immutable Concepts",
        question: "What is String interning and how does the String Pool work?",
        simpleAnswer: "The String Pool is a special memory area where Java stores string literals. intern() forces a string to be added to the pool so identical strings share the same object instead of creating duplicates.",
        explanation: "When you write String s = \"hello\", Java checks the String Pool first. If \"hello\" already exists there, it reuses the same object. If not, it creates one and adds it. When you use new String(\"hello\"), it always creates a new object on the heap, bypassing the pool. intern() manually adds a string to the pool and returns the pooled reference.",
        analogy: "The String Pool is like a shared library. If 100 people need the same book (\"hello\"), the library keeps one copy and everyone borrows the same one. new String() is like buying your own personal copy — wasteful if everyone needs the same content.",
        example: "String a = \"hello\";        // goes to String Pool\nString b = \"hello\";        // reuses same pool object\nString c = new String(\"hello\"); // new heap object, bypasses pool\n\na == b;  // true  — same pool object\na == c;  // false — different objects\na.equals(c); // true  — same content\n\n// intern() — force into pool:\nString d = c.intern(); // returns pool reference\na == d;  // true — now same pool object\n\n// Java 7+: String Pool moved from PermGen to Heap\n// So pool strings are also GC-eligible",
        followUps: [{ question: "Why was the String Pool moved to the Heap in Java 7?", answer: "In Java 6 and earlier, the pool was in PermGen which had a fixed size — too many interned strings caused OutOfMemoryError. Moving it to the Heap allows it to grow dynamically and be garbage collected." }],
        keyPoints: ["String literals automatically go to the pool", "new String() bypasses the pool — creates heap object", "intern() forces a string into the pool", "== compares references, equals() compares content — always use equals() for strings"]
      },

    ].concat(springBootInterview.questions).concat(restApiInterview.questions).concat(kafkaInterview.questions).concat(microservicesInterview.questions).concat(systemDesign.questions).concat(databaseInterview.questions).concat(devopsSecurityInterview.questions).concat(awsInterview.questions)))
  }
};
