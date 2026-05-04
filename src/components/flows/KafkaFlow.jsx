import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Radio, Send, Layers, Users, GitBranch, RotateCcw, AlertTriangle, Zap } from "lucide-react";
import MermaidDiagram from "../MermaidDiagram";

const kafkaFlow = {
  id: "kafka",
  title: "Kafka Message Flow",
  description: "How Apache Kafka moves messages from producers to consumers — topics, partitions, consumer groups, and fault tolerance.",
  color: "#10b981",
  steps: [
    {
      id: 1,
      icon: Send,
      title: "Producer Sends Message",
      subtitle: "Publish to a topic",
      visual: "📤➡️📬",
      diagram: `flowchart LR
  A([☕ Java App Producer]) --> B[📦 Serialize Message\nJSON / Avro]
  B --> C[🔑 Choose Partition\nby key hash]
  C --> D([📬 Kafka Topic\norder-events])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#10b981,color:#fff,stroke:#059669`,
      description: "Your Java app (producer) sends a message to a Kafka topic. Kafka serializes it and routes it to a specific partition based on the message key. Same key always goes to same partition — guaranteeing order.",
      analogy: "📮 Like a post office sorting room: Letters (messages) come in, get sorted by zip code (key), and placed in the right mailbag (partition). Same zip code always goes to the same bag.",
      example: "// Spring Kafka Producer\nkafkaTemplate.send(\"order-events\", \n    order.getId().toString(), // key → partition\n    orderEvent               // value\n);\n\n// Message goes to:\n// Topic: order-events\n// Partition: hash(orderId) % numPartitions"
    },
    {
      id: 2,
      icon: Layers,
      title: "Topics & Partitions",
      subtitle: "How Kafka stores messages",
      visual: "📂🗂️📋",
      diagram: `flowchart LR
  A([📬 Topic order-events]) --> B([📂 Partition 0\noffset 0,1,2...])
  A --> C([📂 Partition 1\noffset 0,1,2...])
  A --> D([📂 Partition 2\noffset 0,1,2...])
  B --> E([💾 Broker 1\nLeader])
  C --> F([💾 Broker 2\nLeader])
  D --> G([💾 Broker 3\nLeader])
  style A fill:#f59e0b,color:#1e293b,stroke:#d97706
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#3b82f6,color:#fff,stroke:#2563eb
  style E fill:#6366f1,color:#fff,stroke:#4f46e5
  style F fill:#6366f1,color:#fff,stroke:#4f46e5
  style G fill:#6366f1,color:#fff,stroke:#4f46e5`,
      description: "A topic is split into partitions — each is an ordered, immutable log. Messages are appended with an offset number. Partitions are distributed across brokers for parallelism and fault tolerance.",
      analogy: "📚 Like a library with multiple shelves: The topic is the subject (History). Partitions are individual shelves. Each book (message) gets a shelf number (offset). You can read from multiple shelves at once.",
      example: "// Topic: order-events\n// 3 partitions, replication factor 2\n\nPartition 0: [msg@0, msg@1, msg@2, ...]\nPartition 1: [msg@0, msg@1, msg@2, ...]\nPartition 2: [msg@0, msg@1, msg@2, ...]\n\n// Messages are IMMUTABLE once written\n// Retention: 7 days by default"
    },
    {
      id: 3,
      icon: Radio,
      title: "Replication",
      subtitle: "No data loss guarantee",
      visual: "🔄💾💾",
      diagram: `flowchart LR
  A([📨 New Message]) --> B([💾 Leader Broker 1])
  B -->|Replicate| C([💾 Follower\nBroker 2])
  B -->|Replicate| D([💾 Follower\nBroker 3])
  C -->|ACK| B
  D -->|ACK| B
  B -->|All ACKs received| E([✅ Message\nCommitted])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#6366f1,color:#fff,stroke:#4f46e5
  style E fill:#f59e0b,color:#1e293b,stroke:#d97706`,
      description: "Each partition has one leader and multiple followers. The leader receives writes, followers replicate. Message is only 'committed' when all in-sync replicas acknowledge it. If a broker dies, a follower becomes the new leader.",
      analogy: "📋 Like signing an important document: The original goes to the main office (leader), copies go to two branch offices (followers). Only confirmed 'received' when all branches acknowledge — then it's official.",
      example: "// Producer config for durability\nprops.put(\"acks\", \"all\"); // Wait for all replicas\nprops.put(\"retries\", 3);\nprops.put(\"min.insync.replicas\", 2);\n\n// acks=all → strongest guarantee\n// acks=1   → only leader confirms\n// acks=0   → fire and forget"
    },
    {
      id: 4,
      icon: Users,
      title: "Consumer Groups",
      subtitle: "Parallel processing",
      visual: "👥⚡📊",
      diagram: `flowchart LR
  A([📂 Partition 0]) --> B([👤 Consumer 1])
  C([📂 Partition 1]) --> D([👤 Consumer 2])
  E([📂 Partition 2]) --> F([👤 Consumer 3])
  B & D & F --> G([🏷️ Consumer Group email-service])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style E fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#10b981,color:#fff,stroke:#059669
  style D fill:#10b981,color:#fff,stroke:#059669
  style F fill:#10b981,color:#fff,stroke:#059669
  style G fill:#8b5cf6,color:#fff,stroke:#7c3aed`,
      description: "Consumers in the same group share the work — each partition is assigned to exactly one consumer. 3 partitions + 3 consumers = perfect parallelism. Add more consumers to scale up processing speed.",
      analogy: "🏭 Like an assembly line: 3 conveyor belts (partitions), 3 workers (consumers). Each worker handles one belt. Add more workers to process faster — but you can't have more workers than belts.",
      example: "// Consumer Group\n@KafkaListener(\n  topics = \"order-events\",\n  groupId = \"email-service\"\n)\npublic void handleOrder(OrderEvent event) {\n    emailService.sendConfirmation(event);\n}\n\n// Scale: 3 partitions = max 3 consumers\n// in same group process in parallel"
    },
    {
      id: 5,
      icon: GitBranch,
      title: "Multiple Consumer Groups",
      subtitle: "Same message, different services",
      visual: "📬👥👥",
      diagram: `flowchart LR
  A([📬 Topic order-events]) --> B([🏷️ Group: email-service\nConsumer 1,2,3])
  A --> C([🏷️ Group: analytics-service\nConsumer 1,2])
  A --> D([🏷️ Group: inventory-service\nConsumer 1])
  style A fill:#f59e0b,color:#1e293b,stroke:#d97706
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#3b82f6,color:#fff,stroke:#2563eb
  style D fill:#8b5cf6,color:#fff,stroke:#7c3aed`,
      description: "Multiple consumer groups can read the same topic independently — each group gets ALL messages. Email service, analytics service, and inventory service all react to the same order event without knowing about each other.",
      analogy: "📺 Like a TV broadcast: One signal (topic), many TVs (consumer groups) all receive the full broadcast independently. Turning off one TV doesn't affect others.",
      example: "// Same topic, 3 independent services\norder-events topic\n  → email-service group    (sends confirmation)\n  → analytics-service group (updates dashboard)\n  → inventory-service group (reduces stock)\n\n// Each group tracks its own offset\n// Completely independent processing"
    },
    {
      id: 6,
      icon: RotateCcw,
      title: "Offset Management",
      subtitle: "Track what you've processed",
      visual: "📍✅🔄",
      diagram: `flowchart LR
  A([📂 Partition offset 0..100]) --> B[👤 Consumer\nreads offset 47]
  B --> C[⚙️ Process\nMessage]
  C -->|✓ Success| D([✅ Commit Offset 47\nto __consumer_offsets])
  C -->|✗ Failure| E([🔄 Retry\nRe-read offset 47])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "Consumers track their position using offsets. After processing a message, they 'commit' the offset to Kafka. If a consumer crashes and restarts, it resumes from the last committed offset — no messages lost.",
      analogy: "📖 Like a bookmark in a book: You read page 47, put your bookmark there. If you fall asleep (crash), you restart from page 47 — not from the beginning, not from page 100.",
      example: "// Auto commit (simple but risky)\nprops.put(\"enable.auto.commit\", \"true\");\n\n// Manual commit (recommended)\n@KafkaListener(topics = \"order-events\")\npublic void handle(OrderEvent event,\n    Acknowledgment ack) {\n    processOrder(event); // process first\n    ack.acknowledge();   // then commit\n    // If crash before ack → reprocessed ✓\n}"
    },
    {
      id: 7,
      icon: AlertTriangle,
      title: "Dead Letter Queue",
      subtitle: "Handle poison messages",
      visual: "☠️📬🔍",
      diagram: `flowchart LR
  A([📨 Message]) --> B[⚙️ Consumer Process]
  B -->|✓ Success| C([✅ Commit Offset])
  B -->|✗ Fail retry 1| D[🔄 Retry]
  D -->|✗ Fail retry 2| E[🔄 Retry]
  E -->|✗ Fail retry 3| F([☠️ Dead Letter Topic\norder-events.DLT])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#10b981,color:#fff,stroke:#059669
  style D fill:#f59e0b,color:#1e293b,stroke:#d97706
  style E fill:#f59e0b,color:#1e293b,stroke:#d97706
  style F fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "If a message keeps failing (poison pill), it gets moved to a Dead Letter Topic after max retries. This prevents one bad message from blocking the entire partition. Engineers can inspect and replay DLT messages later.",
      analogy: "📮 Like a returns department: If a package can't be delivered 3 times, it goes to the returns shelf (DLT). It doesn't block all other deliveries. Someone reviews it later.",
      example: "// Spring Kafka DLT config\n@RetryableTopic(\n  attempts = \"3\",\n  backoff = @Backoff(delay = 1000),\n  dltTopicSuffix = \".DLT\"\n)\n@KafkaListener(topics = \"order-events\")\npublic void handle(OrderEvent event) {\n    // After 3 failures →\n    // message goes to order-events.DLT\n}"
    },
    {
      id: 8,
      icon: Zap,
      title: "Why Kafka is Fast",
      subtitle: "Sequential I/O + zero copy",
      visual: "⚡💾🚀",
      diagram: `flowchart LR
  A([📨 Message]) --> B[📝 Append to Log File - Sequential]
  B --> C[🔄 Zero-Copy\nOS sendfile]
  C --> D([📤 Consumer\nReceives])
  A -.->|Traditional DB| E([🐌 Random I/O\nIndex lookup\n10x slower])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "Kafka is fast because: 1) Sequential disk writes (append-only log) are 10x faster than random writes. 2) Zero-copy transfer — OS sends data directly from disk to network without copying to application memory.",
      analogy: "📼 Like a cassette tape vs a filing cabinet: Writing to tape (sequential) is fast — just append to the end. A filing cabinet (random I/O) requires finding the right drawer, folder, and slot every time.",
      example: "// Kafka throughput benchmarks\n// Single broker, commodity hardware:\n\nWrite: ~800MB/s (sequential disk)\nRead:  ~1GB/s  (zero-copy)\n\n// vs traditional message queues:\n// RabbitMQ: ~20-50MB/s\n// ActiveMQ: ~10-30MB/s\n\n// Kafka handles millions of msgs/sec"
    }
  ]
};

export default function KafkaFlow({ onBack }) {
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
      const total = kafkaFlow.steps.length;
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
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">{kafkaFlow.title}</h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">{kafkaFlow.description}</p>
      </div>
      <div className="relative flex flex-col items-center">
        {kafkaFlow.steps.map((step, idx) => {
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
              {idx < kafkaFlow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${kafkaFlow.color}88, ${kafkaFlow.color}22)` }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${kafkaFlow.color}88` }} />
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

