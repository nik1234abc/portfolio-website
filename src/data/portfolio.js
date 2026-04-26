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
      "Cloud Native Java Engineer"
    ]
  },
  personal: {
    name: "Nikhil Gadhwal",
    title: "Java Backend Developer | Spring Boot | Microservices | AWS",
    location: "New Delhi, India",
    email: "gadhwalnikhil@gmail.com",
    phone: "+91 8340674865",
    linkedin: "https://www.linkedin.com/in/nikhil-gadhwal-1b8688138/",
    github: "",
    summary:
      "Java Backend Developer with 4+ years of experience building scalable enterprise microservices, secure REST APIs, cloud-native applications, and financial systems.",
    expandedSummary:
      "I build reliable backend platforms for enterprise and financial workflows, with strong depth in distributed systems, production support, secure service delivery, and cloud modernization. My work is centered on improving data consistency, reducing operational friction, and keeping high-volume systems resilient in production.",
    availability:
      "Open to Senior Java Backend, Microservices, Platform Engineering, and Cloud Engineering opportunities across India, global product teams, relocation-friendly roles, and remote-first environments.",
    resumeFile: "/Nikhil_Gadhwal_Java_Backend_Developer.pdf",
    profilePhoto: "/profile-photo.jpg"
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
        { name: "Hibernate", level: 82 },
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
    role: "System Engineer / Java Developer",
    duration: "Dec 2021 - Present",
    summary:
      "Delivering backend engineering across secure billing systems, region-specific automation, production support, and microservices modernization for enterprise-scale financial operations.",
    highlights: [
      "Migrated 9 production microservices from Java 8 to Java 21, improving long-term maintainability, security posture, and performance stability.",
      "Built invoice transfer functionality that reduced manual adjustment work by 50-60% and improved invoice-level data consistency.",
      "Implemented EMEA regional enhancements with customer care stakeholders, improving operational efficiency by 60-70%.",
      "Designed APAC No-Show automation using AWS SQS and batch-driven processing for asynchronous financial correction flows.",
      "Built secure backend services supporting global billing workflows and cross-region service communication.",
      "Owned production issue resolution, root cause analysis, and service reliability improvements for critical backend flows.",
      "Contributed to architecture-level backend decisions, solution design, testing strategy, and release readiness."
    ],
    milestones: [
      {
        id: "2021",
        label: "Joined TCS",
        heading: "Built core ownership in enterprise backend delivery",
        detail:
          "Started owning Java service delivery, requirement breakdowns, and testing support in a production-sensitive enterprise environment."
      },
      {
        id: "2023",
        label: "Automation",
        heading: "Expanded into region-specific financial workflow automation",
        detail:
          "Delivered invoice adjustments, batch-driven correction flows, and operational improvements across APAC and EMEA business processes."
      },
      {
        id: "2025",
        label: "Modernization",
        heading: "Drove modernization and higher-stakes architecture work",
        detail:
          "Led Java 21 migrations, resolved token compatibility challenges, and helped shape resilient service-level implementation decisions."
      }
    ]
  },
  projects: [
    {
      title: "Enterprise Invoice Adjustment Platform",
      tagline: "Enterprise microservice for financial correction workflows and stronger data consistency.",
      shortSummary:
        "Built an enterprise-grade Spring Boot microservice for secure financial adjustment and transfer workflows at enterprise scale.",
      problem:
        "Billing teams needed a secure and reliable way to adjust invoice-level financial records across regions without repeated manual intervention.",
      solution:
        "Built and extended a Spring Boot microservice that orchestrated invoice adjustment and transfer workflows through validated REST APIs, service orchestration, and region-aware business logic.",
      stack: ["Java", "Spring Boot", "REST APIs", "PostgreSQL", "JWT", "Jenkins"],
      impact: [
        "Reduced manual invoice operations by 50-60%",
        "Improved adjustment traceability and consistency across invoices",
        "Created a reusable service foundation for future regional flows"
      ],
      impactLine: "Reduced manual effort by 50-60% while improving invoice consistency.",
      scale:
        "Handled enterprise billing workflows spanning global invoice operations, multi-team dependencies, and region-aware business rules.",
      security:
        "Designed secure API interactions, backend validation, and controlled financial state transitions for audit-sensitive workflows.",
      architecture: ["Billing Request", "Adjustment API", "Business Rules Engine", "Invoice Ledger Update", "Operations Reporting"]
    },
    {
      title: "Regional Financial Workflow Automation",
      tagline: "Asynchronous batch and queue-based automation for financial correction workflows.",
      shortSummary:
        "Designed an async batch workflow for regional financial correction handling with queue-based resilience and lower manual effort.",
      problem:
        "APAC no-show corrections were operationally heavy, time-sensitive, and difficult to process reliably with manual handling alone.",
      solution:
        "Designed a Spring Batch and AWS SQS-backed asynchronous workflow to process correction events, decouple batch execution, and improve operational resilience.",
      stack: ["Java", "Spring Batch", "AWS SQS", "Microservices", "PostgreSQL"],
      impact: [
        "Reduced manual financial correction effort",
        "Improved batch reliability and asynchronous fault isolation",
        "Enabled cleaner event-driven handling for region-specific correction logic"
      ],
      impactLine: "Improved processing reliability and reduced manual correction effort.",
      scale:
        "Built for high-volume batch correction scenarios across regional finance workflows with resilient queue-driven processing.",
      security:
        "Protected message-driven processing through controlled consumers, validation layers, and safer failure handling around financial state updates.",
      architecture: ["No-Show Trigger", "Batch Scheduler", "SQS Queue", "Correction Processor", "Billing Reconciliation"]
    },
    {
      title: "Java 21 Migration Program",
      tagline: "Legacy-to-modernization initiative across 9 production microservices.",
      shortSummary:
        "Migrated 9 production microservices from Java 8 to Java 21 to improve supportability, security, and long-term platform readiness.",
      problem:
        "Critical production services on Java 8 needed modernization to stay supportable, secure, and compatible with future platform requirements.",
      solution:
        "Migrated 9 production microservices from Java 8 to Java 21, updated deprecated patterns, resolved token compatibility issues, and improved environment readiness for long-term LTS support.",
      stack: ["Java 21", "Spring Boot", "Docker", "Jenkins", "CI/CD"],
      impact: [
        "Improved maintainability and long-term platform support",
        "Strengthened security posture with newer runtime support",
        "Reduced legacy risk across critical backend services"
      ],
      impactLine: "Modernized 9 production services with stronger security and maintainability.",
      scale:
        "Spanned 9 production services with cross-service dependencies, deployment coordination, and release validation requirements.",
      security:
        "Addressed runtime compatibility and token-related issues carefully to preserve secure authentication behavior during migration.",
      architecture: ["Legacy Service", "Dependency Audit", "Code Refactor", "Compatibility Validation", "Production Rollout"]
    },
    {
      title: "Regional Business Rule Automation Enhancement",
      tagline: "Business-rule automation for region-specific financial and operational workflows.",
      shortSummary:
        "Delivered backend enhancements for region-specific workflows with cleaner business rule handling and lower operational friction.",
      problem:
        "EMEA operations required backend changes tailored to regional rules and support workflows, with a strong need to reduce repetitive manual work.",
      solution:
        "Collaborated with regional stakeholders to design and deliver targeted backend enhancements supporting region-aware rules, automated flow handling, and more dependable processing.",
      stack: ["Java", "Spring Boot", "Microservices", "PostgreSQL", "Jira"],
      impact: [
        "Improved operational efficiency by 60-70%",
        "Reduced turnaround friction for EMEA support scenarios",
        "Improved alignment between business rules and service behavior"
      ],
      impactLine: "Improved operational efficiency by 60-70% in region-specific workflows.",
      scale:
        "Supported enterprise regional operations with cross-team inputs, custom rules, and production-ready backend delivery.",
      security:
        "Kept regional rule handling consistent and safe with controlled backend validations and production-ready release processes.",
      architecture: ["Regional Request", "Rule Mapper", "EMEA Service Layer", "Validation + Tax Logic", "Ops Output"]
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
    "2 On-Spot Awards at TCS for innovation and delivery contributions",
    "Team of the Year recognition for high-impact collaboration",
    "A Band performer for two consecutive years"
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
};
