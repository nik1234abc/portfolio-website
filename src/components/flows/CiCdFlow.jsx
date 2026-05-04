import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, GitBranch, Code, TestTube, Package, Container, Shield, Upload, CheckCircle, Activity } from "lucide-react";
import MermaidDiagram from "../MermaidDiagram";

const ciCdFlow = {
  id: "ci-cd",
  title: "CI/CD Pipeline Flow",
  description: "From a git push to production deployment — how code travels through build, test, Docker, and automated deployment with zero downtime.",
  color: "#f97316",
  steps: [
    {
      id: 1,
      icon: GitBranch,
      title: "Code Push & PR",
      subtitle: "Trigger the pipeline",
      visual: "💻➡️🔀",
      diagram: `flowchart LR
  A([👨‍💻 Developer\ngit push]) --> B[🔀 Pull Request\nto main branch]
  B --> C{👥 Code Review Approved?}
  C -->|✓ Approved| D([🔀 Merge to main\nPipeline triggered])
  C -->|✗ Changes needed| E([📝 Request Changes\nBack to developer])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "A developer pushes code and opens a Pull Request. Teammates review the code for quality, security, and correctness. Once approved and merged to main, the CI/CD pipeline triggers automatically via a webhook from GitHub/GitLab.",
      analogy: "📬 Like submitting a document for approval: You write it (code), submit for review (PR), colleagues check it (code review), and once signed off, it goes to the next stage (pipeline). No one deploys alone.",
      example: "// GitHub Actions trigger\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\n// Or GitLab CI trigger\nonly:\n  - main\n  - merge_requests"
    },
    {
      id: 2,
      icon: Code,
      title: "Build Stage",
      subtitle: "Compile and package",
      visual: "⚙️📦✅",
      diagram: `flowchart LR
  A([📥 Source Code\nChecked out]) --> B[📦 Maven / Gradle\nmvn clean package]
  B --> C{✅ Build Successful?}
  C -->|✓ Success| D([📦 JAR File\ntarget/app.jar])
  C -->|✗ Compile Error| E([❌ Pipeline Fails\nNotify developer])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#f97316,color:#fff,stroke:#ea580c
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "The CI server checks out the code and runs the build tool (Maven/Gradle). It compiles all Java files, resolves dependencies from Maven Central, and packages everything into a JAR. If compilation fails, the pipeline stops immediately and notifies the developer.",
      analogy: "🏭 Like a factory assembly line: Raw materials (source code) go in, machines (compiler) process them, and a finished product (JAR) comes out. If a machine breaks (compile error), the line stops — no defective products move forward.",
      example: "# GitHub Actions build step\n- name: Build with Maven\n  run: mvn clean package -DskipTests\n\n# What mvn package does:\n1. Compile .java → .class files\n2. Run unit tests (unless skipped)\n3. Package into target/app-1.0.jar\n4. Include all dependencies"
    },
    {
      id: 3,
      icon: TestTube,
      title: "Automated Testing",
      subtitle: "Unit, integration & coverage",
      visual: "🧪✅📊",
      diagram: `flowchart LR
  A([📦 JAR Built]) --> B[🧪 Unit Tests\nJUnit + Mockito]
  B --> C[🔗 Integration Tests\nTestcontainers]
  C --> D[📊 Code Coverage\nJaCoCo check]
  D --> E{✅ All Pass + Coverage > 80%?}
  E -->|✓ Pass| F([✅ Tests Passed\nProceed])
  E -->|✗ Fail| G([❌ Pipeline Fails\nFix tests first])
  style A fill:#f97316,color:#fff,stroke:#ea580c
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style D fill:#3b82f6,color:#fff,stroke:#2563eb
  style E fill:#f59e0b,color:#1e293b,stroke:#d97706
  style F fill:#10b981,color:#fff,stroke:#059669
  style G fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "Three layers of testing run automatically. Unit tests (fast, isolated, mock dependencies). Integration tests with Testcontainers (spin up real PostgreSQL/Redis in Docker for realistic tests). JaCoCo checks code coverage — pipeline fails if below threshold.",
      analogy: "🚗 Like a car safety inspection: First check individual parts (unit tests), then test the whole car on a track (integration tests), then verify it meets safety standards (coverage threshold). Fail any check — car doesn't leave the factory.",
      example: "// Unit test (fast, mocked)\n@Test\nvoid createOrder_shouldReturnOrderId() {     when(repo.save(any())).thenReturn(order);     Order result = service.create(dto);     assertEquals(456L, result.getId()); }\n\n// Integration test (real DB)\n@SpringBootTest\n@Testcontainers\nclass OrderIntegrationTest {     @Container     PostgreSQLContainer<?> postgres =         new PostgreSQLContainer<>(\"postgres:15\"); }"
    },
    {
      id: 4,
      icon: Shield,
      title: "Security & Quality Scan",
      subtitle: "Find vulnerabilities early",
      visual: "🔍🛡️📋",
      diagram: `flowchart LR
  A([✅ Tests Passed]) --> B[🔍 SAST\nSonarQube scan]
  B --> C[🛡️ Dependency Check\nOWASP / Snyk]
  C --> D{⚠️ Critical Issues Found?}
  D -->|✓ Clean| E([✅ Security OK\nProceed])
  D -->|✗ Critical CVE| F([❌ Block Deploy\nFix vulnerability])
  style A fill:#10b981,color:#fff,stroke:#059669
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style D fill:#f59e0b,color:#1e293b,stroke:#d97706
  style E fill:#10b981,color:#fff,stroke:#059669
  style F fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "SonarQube scans for code smells, bugs, and security hotspots (SAST — Static Application Security Testing). OWASP Dependency Check or Snyk scans all Maven dependencies for known CVEs. Critical vulnerabilities block the deployment.",
      analogy: "🏥 Like a health check before surgery: Doctor checks your vitals (code quality), reviews your medical history (dependency vulnerabilities). If you have a critical condition (CVE), surgery is postponed until it's treated.",
      example: "# SonarQube scan\n- name: SonarQube Analysis\n  run: mvn sonar:sonar\n    -Dsonar.projectKey=order-service\n    -Dsonar.host.url=$SONAR_URL\n\n# OWASP dependency check\n- name: Security Scan\n  run: mvn dependency-check:check\n    -DfailBuildOnCVSS=7\n    # Fail if CVSS score >= 7 (High)"
    },
    {
      id: 5,
      icon: Container,
      title: "Docker Image Build",
      subtitle: "Package into container",
      visual: "🐳📦🏷️",
      diagram: `flowchart LR
  A([📦 app.jar\n+ Dockerfile]) --> B[🐳 docker build\nCreate image]
  B --> C[🏷️ Tag Image\napp:1.0.0-abc123]
  C --> D[🔍 Scan Image\nTrivy / Snyk]
  D --> E([📤 Push to Registry\nECR / DockerHub])
  style A fill:#f97316,color:#fff,stroke:#ea580c
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#f59e0b,color:#1e293b,stroke:#d97706
  style E fill:#10b981,color:#fff,stroke:#059669`,
      description: "The JAR is packaged into a Docker image using a Dockerfile. The image is tagged with the version and git commit hash for traceability. Trivy scans the image for OS-level vulnerabilities. The clean image is pushed to a container registry (AWS ECR, DockerHub).",
      analogy: "📦 Like packaging a product for shipping: You put the product (JAR) in a standardized box (Docker image), label it with a tracking number (tag), inspect it for damage (security scan), and send it to the warehouse (registry).",
      example: "# Dockerfile (multi-stage build)\nFROM eclipse-temurin:21-jre AS runtime\nWORKDIR /app\nCOPY target/app.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]\n\n# Tag format: name:version-gitsha\norder-service:1.0.0-abc1234\n\n# Push to AWS ECR\ndocker push 123456.ecr.aws/order-service:1.0.0-abc1234"
    },
    {
      id: 6,
      icon: Upload,
      title: "Deploy to Staging",
      subtitle: "Test in production-like env",
      visual: "🚀🧪🌍",
      diagram: `flowchart LR
  A([📤 Image in Registry]) --> B[🚀 Deploy to Staging\nKubernetes / ECS]
  B --> C[⏳ Wait for\nHealth Check]
  C --> D{✅ App Healthy /actuator/health?}
  D -->|✓ UP| E[🧪 Run Smoke Tests\nBasic API checks]
  E --> F{✅ Smoke Tests Pass?}
  F -->|✓ Pass| G([✅ Staging OK\nReady for prod])
  D -->|✗ DOWN| H([❌ Rollback\nPrevious version])
  F -->|✗ Fail| H
  style A fill:#f97316,color:#fff,stroke:#ea580c
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#f59e0b,color:#1e293b,stroke:#d97706
  style E fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style F fill:#f59e0b,color:#1e293b,stroke:#d97706
  style G fill:#10b981,color:#fff,stroke:#059669
  style H fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "The new image deploys to a staging environment (identical to production). The pipeline waits for the health check to return UP. Then smoke tests run — basic API calls to verify critical paths work. Any failure triggers automatic rollback to the previous version.",
      analogy: "🎭 Like a dress rehearsal before opening night: Full performance with real costumes and sets (staging = prod-like). If the lead actor forgets lines (smoke test fails), you cancel the show and go back to the previous script (rollback).",
      example: "# Kubernetes rolling deploy\nkubectl set image deployment/order-service \\\n  order-service=order-service:1.0.0-abc1234\n\n# Wait for rollout\nkubectl rollout status deployment/order-service\n\n# Smoke test\ncurl https://staging.api.com/actuator/health\ncurl https://staging.api.com/api/orders\n\n# Auto rollback on failure\nkubectl rollout undo deployment/order-service"
    },
    {
      id: 7,
      icon: CheckCircle,
      title: "Production Deployment",
      subtitle: "Zero-downtime release",
      visual: "🌐✅🚀",
      diagram: `flowchart LR
  A([✅ Staging Passed]) --> B{🔐 Manual Approval Required?}
  B -->|✓ Approved| C[🔄 Rolling Update\nKubernetes]
  B -->|Auto deploy| C
  C --> D[🟢 New Pod starts\nOld Pod still running]
  D --> E[✅ New Pod healthy\nTraffic shifted]
  E --> F([🗑️ Old Pod terminated\nZero downtime])
  style A fill:#10b981,color:#fff,stroke:#059669
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#6366f1,color:#fff,stroke:#4f46e5
  style E fill:#10b981,color:#fff,stroke:#059669
  style F fill:#10b981,color:#fff,stroke:#059669`,
      description: "Production deployment uses Kubernetes Rolling Update: new pods start alongside old ones, traffic gradually shifts to new pods, old pods terminate only after new ones are healthy. Zero downtime — users never see an outage. Critical apps may require manual approval before this step.",
      analogy: "🚢 Like replacing a ship's engine while sailing: You install the new engine while the old one keeps running. Once the new engine is confirmed working, you switch over and shut down the old one. The ship never stops.",
      example: "# Kubernetes rolling update strategy\nspec:\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1        # 1 extra pod during update\n      maxUnavailable: 0  # 0 pods down at any time\n\n# Timeline:\n# t=0: 3 old pods running\n# t=30s: 1 new pod starts, 3 old running\n# t=60s: new pod healthy, 1 old removed\n# t=90s: 3 new pods, 0 old pods"
    },
    {
      id: 8,
      icon: Activity,
      title: "Post-Deploy Monitoring",
      subtitle: "Watch for issues",
      visual: "📊🔔🛡️",
      diagram: `flowchart LR
  A([🚀 Deployed to Prod]) --> B[📊 Metrics\nPrometheus scrapes]
  B --> C[📈 Dashboards\nGrafana]
  A --> D[📝 Logs\nELK Stack]
  A --> E[🔍 Traces\nZipkin / Jaeger]
  C & D & E --> F{🚨 Alert Triggered?}
  F -->|✓ All good| G([✅ Deployment\nSuccessful])
  F -->|✗ Error spike| H([🔔 PagerDuty Alert\nOn-call notified])
  style A fill:#f97316,color:#fff,stroke:#ea580c
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style E fill:#f59e0b,color:#1e293b,stroke:#d97706
  style F fill:#f59e0b,color:#1e293b,stroke:#d97706
  style G fill:#10b981,color:#fff,stroke:#059669
  style H fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "After deployment, the observability stack kicks in. Prometheus scrapes metrics (error rate, latency, CPU). Grafana shows dashboards. ELK Stack aggregates logs. Zipkin traces requests. Alerts fire if error rate spikes above threshold — on-call engineer gets paged.",
      analogy: "🏥 Like post-surgery monitoring: Patient (app) is in recovery, nurses (monitoring tools) check vitals every few minutes. If heart rate spikes (error rate), the doctor (on-call engineer) is paged immediately.",
      example: "# Grafana alert rule\nIF error_rate > 5% for 5 minutes\nTHEN alert: PagerDuty\n\n# Key metrics to watch post-deploy:\n• HTTP 5xx error rate (< 1%)\n• P99 response time (< 500ms)\n• JVM heap usage (< 80%)\n• DB connection pool usage\n\n# Auto-rollback trigger:\nIF error_rate > 10% for 2 minutes\nTHEN kubectl rollout undo"
    }
  ]
};

export default function CiCdFlow({ onBack }) {
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
      const total = ciCdFlow.steps.length;
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
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">{ciCdFlow.title}</h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">{ciCdFlow.description}</p>
      </div>
      <div className="relative flex flex-col items-center">
        {ciCdFlow.steps.map((step, idx) => {
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
              {idx < ciCdFlow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${ciCdFlow.color}88, ${ciCdFlow.color}22)` }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${ciCdFlow.color}88` }} />
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


