import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Pause, Clock, Lock, CheckCircle, XCircle, Zap } from "lucide-react";
import MermaidDiagram from "../MermaidDiagram";

const threadLifecycleFlow = {
  id: "thread-lifecycle",
  title: "Java Thread Lifecycle",
  description: "The 6 states a Java thread goes through — from creation to termination. Click each state to understand what triggers it and how to move to the next.",
  color: "#f59e0b",
  steps: [
    {
      id: 1,
      icon: Play,
      title: "NEW",
      subtitle: "Thread created but not started",
      visual: "🆕🧵",
      diagram: `flowchart LR
  A([👨‍💻 new Thread\\ncreated]) --> B([🆕 NEW State\\nThread object exists])
  B --> C{start called?}
  C -->|Yes| D([▶️ RUNNABLE])
  C -->|No| E([🗑️ Never runs\\nGC collects it])
  style A fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "When you write 'new Thread()', the thread object is created in memory but no OS thread exists yet. The thread is in the NEW state — it's just a Java object. Calling start() transitions it to RUNNABLE and creates the actual OS thread.",
      analogy: "🚗 Like a car sitting in a showroom. It exists, it's built, but the engine hasn't started. Calling start() is turning the key — the engine fires up and the car is ready to move.",
      example: "// Thread is in NEW state:\nThread t = new Thread(() -> System.out.println(\"Running\"));\n// t.getState() → NEW\n\n// Transition to RUNNABLE:\nt.start();\n// t.getState() → RUNNABLE\n\n// ❌ Never call run() directly:\nt.run(); // runs on current thread, no new thread created!"
    },
    {
      id: 2,
      icon: Zap,
      title: "RUNNABLE",
      subtitle: "Ready to run or actively running",
      visual: "▶️⚡🏃",
      diagram: `flowchart LR
  A([🆕 NEW]) -->|start| B([▶️ RUNNABLE])
  B --> C{OS Scheduler}
  C -->|CPU assigned| D([🏃 Running\non CPU])
  C -->|CPU taken away| E([⏳ Ready\nwaiting for CPU])
  D <-->|context switch| E
  D -->|synchronized block\nlocked| F([🔒 BLOCKED])
  D -->|wait / join| G([⏸️ WAITING])
  D -->|sleep / join timeout| H([⏰ TIMED_WAITING])
  D -->|run completes| I([✅ TERMINATED])
  style A fill:#f59e0b,color:#1e293b,stroke:#d97706
  style B fill:#10b981,color:#fff,stroke:#059669
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#3b82f6,color:#fff,stroke:#2563eb
  style F fill:#ef4444,color:#fff,stroke:#dc2626
  style G fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style H fill:#f59e0b,color:#1e293b,stroke:#d97706
  style I fill:#64748b,color:#fff,stroke:#475569`,
      description: "RUNNABLE means the thread is either actively running on a CPU core OR waiting in the ready queue for the OS scheduler to assign it CPU time. Java doesn't distinguish between these two sub-states — both are RUNNABLE. From here, the thread can transition to BLOCKED, WAITING, TIMED_WAITING, or TERMINATED.",
      analogy: "🏁 Like a runner at a race. They're either actively sprinting (on CPU) or standing at the starting line waiting for their turn (ready queue). Both are 'ready to run'. The race official (OS scheduler) decides who runs when.",
      example: "Thread t = new Thread(() -> {\n    // Thread is RUNNABLE here\n    // May be running or waiting for CPU\n    for (int i = 0; i < 1000; i++) {\n        doWork(); // actively running\n    }\n});\nt.start();\nSystem.out.println(t.getState()); // RUNNABLE"
    },
    {
      id: 3,
      icon: Lock,
      title: "BLOCKED",
      subtitle: "Waiting to acquire a lock",
      visual: "🔒⛔⏳",
      diagram: `flowchart LR
  A([▶️ RUNNABLE]) -->|tries to enter synchronized block| B([🔒 BLOCKED])
  B --> C{Lock released?}
  C -->|Yes, acquires lock| D([▶️ RUNNABLE])
  C -->|Still locked| E([⏳ Keep waiting])
  E --> C
  style A fill:#10b981,color:#fff,stroke:#059669
  style B fill:#ef4444,color:#fff,stroke:#dc2626
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "A thread enters BLOCKED state when it tries to enter a synchronized block or method that another thread currently holds. It stays BLOCKED until the lock is released. The OS automatically moves it back to RUNNABLE once the lock is available. BLOCKED is purely about waiting for a monitor lock.",
      analogy: "🚽 Like waiting for a bathroom that's occupied. You stand outside (BLOCKED), doing nothing, until the person inside finishes and unlocks the door. The moment the door unlocks, you rush in (back to RUNNABLE).",
      example: "Object lock = new Object();\n\n// Thread A holds the lock:\nThread A = new Thread(() -> {\n    synchronized(lock) {\n        Thread.sleep(5000); // holds lock for 5s\n    }\n});\n\n// Thread B tries to enter — gets BLOCKED:\nThread B = new Thread(() -> {\n    synchronized(lock) { // ← BLOCKED here\n        doWork();\n    }\n});\n\nA.start(); B.start();\nThread.sleep(100);\nSystem.out.println(B.getState()); // BLOCKED"
    },
    {
      id: 4,
      icon: Pause,
      title: "WAITING",
      subtitle: "Waiting indefinitely for notification",
      visual: "⏸️📢🔔",
      diagram: `flowchart LR
  A([▶️ RUNNABLE]) -->|wait| B([⏸️ WAITING])
  A -->|join with no timeout| B
  B --> C{notify or notifyAll called?}
  C -->|Yes| D([🔒 BLOCKED\nre-acquire lock])
  D --> E([▶️ RUNNABLE])
  C -->|No| F([⏳ Keep waiting\nindefinitely])
  F --> C
  style A fill:#10b981,color:#fff,stroke:#059669
  style B fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#ef4444,color:#fff,stroke:#dc2626
  style E fill:#10b981,color:#fff,stroke:#059669
  style F fill:#8b5cf6,color:#fff,stroke:#7c3aed`,
      description: "WAITING means the thread is paused indefinitely, waiting for another thread to explicitly wake it up. Caused by: object.wait() (releases lock, waits for notify), thread.join() with no timeout (waits for that thread to finish). Unlike BLOCKED, the thread voluntarily gives up the CPU and releases its lock.",
      analogy: "📞 Like waiting for a phone call with no idea when it'll come. You put your phone on the table (release lock) and just wait. You won't do anything until someone calls you (notify). No timeout — you'll wait forever if no one calls.",
      example: "// wait() — releases lock and waits:\nsynchronized(queue) {\n    while (queue.isEmpty()) {\n        queue.wait(); // → WAITING state, releases lock\n    }\n    process(queue.poll());\n}\n\n// Another thread wakes it up:\nsynchronized(queue) {\n    queue.add(item);\n    queue.notify(); // → wakes up WAITING thread\n}\n\n// join() with no timeout:\nworkerThread.join(); // → WAITING until worker finishes"
    },
    {
      id: 5,
      icon: Clock,
      title: "TIMED_WAITING",
      subtitle: "Waiting with a timeout",
      visual: "⏰⌛🕐",
      diagram: `flowchart LR
  A([▶️ RUNNABLE]) -->|sleep ms| B([⏰ TIMED_WAITING])
  A -->|wait ms| B
  A -->|join ms| B
  B --> C{Timeout or notify?}
  C -->|Timeout expires| D([▶️ RUNNABLE])
  C -->|notify called| E([🔒 BLOCKED\nre-acquire lock])
  E --> D
  style A fill:#10b981,color:#fff,stroke:#059669
  style B fill:#f59e0b,color:#1e293b,stroke:#d97706
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "TIMED_WAITING is like WAITING but with a built-in alarm clock. The thread wakes up automatically when the timeout expires, even if no one notifies it. Caused by: Thread.sleep(ms), object.wait(ms), thread.join(ms), LockSupport.parkNanos(). Key difference from WAITING: it always wakes up eventually.",
      analogy: "⏰ Like setting a nap alarm. You lie down (pause execution), set a timer (timeout), and either wake up when the alarm rings (timeout expires) or when someone taps you (notify). Either way, you'll wake up — you won't sleep forever.",
      example: "// sleep() — most common:\nThread.sleep(1000); // TIMED_WAITING for 1 second\n// Wakes up automatically after 1s\n\n// wait with timeout:\nsynchronized(lock) {\n    lock.wait(5000); // TIMED_WAITING, wakes after 5s\n                     // or earlier if notify() called\n}\n\n// join with timeout:\nworker.join(3000); // wait max 3s for worker\n// continues even if worker not done\n\nSystem.out.println(t.getState()); // TIMED_WAITING"
    },
    {
      id: 6,
      icon: CheckCircle,
      title: "TERMINATED",
      subtitle: "Thread has finished execution",
      visual: "✅🏁💀",
      diagram: `flowchart LR
  A([▶️ RUNNABLE]) -->|run method\ncompletes normally| B([✅ TERMINATED])
  A -->|uncaught exception\nthrown| B
  B --> C{Can restart?}
  C -->|No| D([🗑️ Cannot call\nstart again])
  D --> E([💡 Create new\nThread object])
  style A fill:#10b981,color:#fff,stroke:#059669
  style B fill:#64748b,color:#fff,stroke:#475569
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#ef4444,color:#fff,stroke:#dc2626
  style E fill:#f59e0b,color:#1e293b,stroke:#d97706`,
      description: "TERMINATED means the thread has finished — either its run() method completed normally, or an uncaught exception killed it. A terminated thread cannot be restarted. Calling start() on a terminated thread throws IllegalThreadStateException. The thread object still exists in memory until GC collects it, but it's done.",
      analogy: "🏁 Like a runner crossing the finish line. The race is over — they can't go back to the starting line and run again. If you want another race, you need a new runner (new Thread object).",
      example: "Thread t = new Thread(() -> {\n    System.out.println(\"Working...\");\n    // run() completes → TERMINATED\n});\nt.start();\nt.join(); // wait for it to finish\nSystem.out.println(t.getState()); // TERMINATED\n\n// ❌ Cannot restart:\ntry {\n    t.start(); // throws IllegalThreadStateException!\n} catch (IllegalThreadStateException e) {\n    System.out.println(\"Cannot restart a dead thread\");\n}\n\n// ✅ Create a new thread instead:\nThread t2 = new Thread(t.getRunnable());\nt2.start();"
    },
    {
      id: 7,
      icon: XCircle,
      title: "Full State Transition Map",
      subtitle: "All transitions at a glance",
      visual: "🗺️🔄📊",
      diagram: `flowchart TD
  NEW([🆕 NEW]) -->|start| RUNNABLE([▶️ RUNNABLE])
  RUNNABLE -->|synchronized lock taken| BLOCKED([🔒 BLOCKED])
  BLOCKED -->|lock released| RUNNABLE
  RUNNABLE -->|wait / join| WAITING([⏸️ WAITING])
  WAITING -->|notify / notifyAll| BLOCKED
  RUNNABLE -->|sleep / wait ms / join ms| TIMED([⏰ TIMED_WAITING])
  TIMED -->|timeout / notify| RUNNABLE
  RUNNABLE -->|run completes / exception| TERMINATED([✅ TERMINATED])
  style NEW fill:#f59e0b,color:#1e293b,stroke:#d97706
  style RUNNABLE fill:#10b981,color:#fff,stroke:#059669
  style BLOCKED fill:#ef4444,color:#fff,stroke:#dc2626
  style WAITING fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style TIMED fill:#f59e0b,color:#1e293b,stroke:#d97706
  style TERMINATED fill:#64748b,color:#fff,stroke:#475569`,
      description: "The complete picture: NEW → RUNNABLE (via start). RUNNABLE → BLOCKED (lock contention). RUNNABLE → WAITING (wait/join). RUNNABLE → TIMED_WAITING (sleep/wait-timeout/join-timeout). Any state → TERMINATED (run completes or exception). BLOCKED/WAITING/TIMED_WAITING all return to RUNNABLE, never directly to each other.",
      analogy: "🗺️ Like a city map with one-way streets. You can only enter the city from NEW via start(). Once inside (RUNNABLE), you can take detours (BLOCKED, WAITING, TIMED_WAITING) but always return to the main road (RUNNABLE). The city exit (TERMINATED) is one-way — no coming back.",
      example: "// Quick reference:\n// NEW          → new Thread()\n// RUNNABLE     → start() called\n// BLOCKED      → waiting for synchronized lock\n// WAITING      → wait() / join() — no timeout\n// TIMED_WAITING→ sleep(ms) / wait(ms) / join(ms)\n// TERMINATED   → run() done or exception\n\n// Check state anytime:\nThread.State state = thread.getState();\nswitch(state) {\n    case NEW          -> \"Not started yet\";\n    case RUNNABLE     -> \"Running or ready\";\n    case BLOCKED      -> \"Waiting for lock\";\n    case WAITING      -> \"Waiting for notify\";\n    case TIMED_WAITING-> \"Waiting with timeout\";\n    case TERMINATED   -> \"Done\";\n}"
    }
  ]
};

export default function ThreadLifecycleFlow({ onBack }) {
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
      const total = threadLifecycleFlow.steps.length;
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
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">{threadLifecycleFlow.title}</h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">{threadLifecycleFlow.description}</p>
      </div>
      <div className="relative flex flex-col items-center">
        {threadLifecycleFlow.steps.map((step, idx) => {
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
                            <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
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
              {idx < threadLifecycleFlow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${threadLifecycleFlow.color}88, ${threadLifecycleFlow.color}22)` }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${threadLifecycleFlow.color}88` }} />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 space-y-2">
        <p className="text-center text-xs text-[color:var(--lux-muted)] opacity-60">Click any state to expand • Use keyboard to navigate</p>
        <div className="flex flex-wrap justify-center gap-3 text-[10px] text-[color:var(--lux-muted)]">
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">↑ ↓</kbd> Navigate</span>
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">Space</kbd> Expand/Collapse</span>
          <span className="flex items-center gap-1.5"><kbd className="px-2 py-1 rounded bg-[color:var(--lux-panel-strong)] border border-[color:var(--lux-border)] font-mono">Esc</kbd> Close All</span>
        </div>
      </div>
    </div>
  );
}
