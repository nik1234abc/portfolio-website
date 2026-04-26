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
      "Building scalable enterprise backend systems with strong experience across modernization, automation, and cloud-native engineering.",
    expandedSummary:
      "I build reliable backend platforms for enterprise and financial workflows, with strong depth in distributed systems, production support, secure service delivery, and cloud modernization. My work is centered on improving data consistency, reducing operational friction, and keeping high-volume systems resilient in production.",
    availability:
      "Feel free to connect for backend engineering, cloud architecture, technology discussions, or simply to explore the work I’m building.",
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
};
