import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, LogIn, Key, ShieldCheck, RefreshCw, UserCheck, Lock, Unlock, AlertTriangle } from "lucide-react";
import MermaidDiagram from "../MermaidDiagram";

const jwtAuthFlow = {
  id: "jwt-auth",
  title: "JWT Authentication Flow",
  description: "How JSON Web Tokens work — from login to every protected API call, token refresh, and logout.",
  color: "#f59e0b",
  steps: [
    {
      id: 1,
      icon: LogIn,
      title: "User Login",
      subtitle: "Send credentials",
      visual: "👤➡️🔑",
      diagram: `flowchart LR
  A([👤 User Enters Credentials]) --> B[📨 POST /auth/login\nemail + password]
  B --> C([🖥️ Auth Server\nReceives Request])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style C fill:#8b5cf6,color:#fff,stroke:#7c3aed`,
      description: "User submits their email and password. This is the only time the raw password travels over the network — always over HTTPS so it's encrypted in transit.",
      analogy: "🏦 Like walking into a bank: You show your ID and PIN at the counter. After that, they give you a wristband (token) — you don't show your ID again for every transaction.",
      example: "POST /auth/login\n{   \"email\": \"user@example.com\",   \"password\": \"secret123\" }"
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Verify Credentials",
      subtitle: "Check username & password",
      visual: "🔍✅❌",
      diagram: `flowchart LR
  A([📨 Login Request]) --> B[🔍 Load User from Database]
  B --> C{🔐 BCrypt Password Match?}
  C -->|✓ Match| D([✅ Credentials Valid\nGenerate Token])
  C -->|✗ No Match| E([❌ 401 Unauthorized\nWrong password])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "The server looks up the user in the database, then uses BCrypt to compare the submitted password against the stored hash. Passwords are never stored as plain text.",
      analogy: "🔐 Like a fingerprint scanner: It doesn't store your actual fingerprint, just a mathematical hash of it. It compares hashes, not the real thing.",
      example: "// BCrypt comparison\nbool match = BCrypt.checkpw(\n  submittedPassword,\n  storedHashFromDB\n);\n// Never store plain text passwords!"
    },
    {
      id: 3,
      icon: Key,
      title: "Generate JWT Token",
      subtitle: "Create signed token",
      visual: "🏭🔑📦",
      diagram: `flowchart LR
  A([✅ Valid User]) --> B[📦 Build Payload userId + roles + expiry]
  B --> C[✍️ Sign with\nSecret Key]
  C --> D([🎫 JWT Token\nheader.payload.signature])
  style A fill:#10b981,color:#fff,stroke:#059669
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#3b82f6,color:#fff,stroke:#2563eb`,
      description: "Server creates a JWT with 3 parts: Header (algorithm), Payload (user data + expiry), Signature (cryptographic proof it wasn't tampered with). Signed with a secret key only the server knows.",
      analogy: "🎫 Like a concert wristband: It has your name, seat number, and a hologram (signature) that proves it's real. Anyone can read it, but only the venue can create a valid one.",
      example: "// JWT Structure\nheader:  { alg: 'HS256', typ: 'JWT' }\npayload: { userId: 123, role: 'USER',            exp: 1735689600 }\nsignature: HMACSHA256(\n  base64(header) + '.' + base64(payload),\n  SECRET_KEY\n)"
    },
    {
      id: 4,
      icon: Unlock,
      title: "Token Returned to Client",
      subtitle: "Store it safely",
      visual: "📤💾🔒",
      diagram: `flowchart LR
  A([🖥️ Server]) --> B[📤 HTTP Response 200 OK]
  B --> C{💾 Client Stores Token}
  C -->|Recommended| D([🍪 HttpOnly Cookie\nXSS-safe])
  C -->|Common but risky| E([📦 localStorage\nXSS-vulnerable])
  style A fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "Server sends back the JWT. Client stores it — ideally in an HttpOnly cookie (JavaScript can't read it, safer against XSS attacks). Many apps use localStorage but that's less secure.",
      analogy: "💳 Like getting a hotel key card: You keep it in your wallet (cookie) not on a sticky note on your door (localStorage). Easier to steal if it's visible.",
      example: "// Response\n{   \"accessToken\": \"eyJhbGc...\",   \"refreshToken\": \"dGhpcyBp...\",   \"expiresIn\": 900 }\n\n// Best practice: HttpOnly cookie\nSet-Cookie: token=eyJ...; HttpOnly; Secure"
    },
    {
      id: 5,
      icon: UserCheck,
      title: "Authenticated Request",
      subtitle: "Use token for every API call",
      visual: "📨🎫✅",
      diagram: `flowchart LR
  A([📱 Client]) --> B[📨 API Request + Bearer Token in Header]
  B --> C[🔍 Extract Token\nfrom Authorization header]
  C --> D{✅ Verify Signature + Expiry}
  D -->|✓ Valid| E([🔓 Process Request\nReturn Data])
  D -->|✗ Expired/Invalid| F([❌ 401 Unauthorized])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#1e293b,color:#94a3b8,stroke:#38bdf8
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#f59e0b,color:#1e293b,stroke:#d97706
  style E fill:#10b981,color:#fff,stroke:#059669
  style F fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "For every protected API call, client sends the JWT in the Authorization header. Server verifies the signature and expiry — no database lookup needed! This is why JWT is fast and stateless.",
      analogy: "🎫 Like a concert wristband: Security just glances at it to verify the hologram. They don't call the box office to check if you bought a ticket — it's self-contained proof.",
      example: "// Every request includes:\nGET /api/orders\nAuthorization: Bearer eyJhbGciOiJIUzI1NiJ9...\n\n// Server verifies in milliseconds\n// No DB call needed!"
    },
    {
      id: 6,
      icon: RefreshCw,
      title: "Token Refresh",
      subtitle: "Get a new token without re-login",
      visual: "⏰🔄🎫",
      diagram: `flowchart LR
  A([⏰ Access Token Expired - 15min]) --> B[📨 POST /auth/refresh\nSend Refresh Token]
  B --> C{🔍 Verify Refresh Token}
  C -->|✓ Valid| D([🎫 New Access Token\nIssued])
  C -->|✗ Expired| E([🔒 Force Re-login\nSession ended])
  style A fill:#ef4444,color:#fff,stroke:#dc2626
  style B fill:#3b82f6,color:#fff,stroke:#2563eb
  style C fill:#f59e0b,color:#1e293b,stroke:#d97706
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#6366f1,color:#fff,stroke:#4f46e5`,
      description: "Access tokens expire quickly (15 min) for security. Refresh tokens last longer (7 days). When access token expires, client silently gets a new one using the refresh token — user never notices.",
      analogy: "🎟️ Like a day pass at a theme park: Your ride ticket (access token) expires after each ride, but your wristband (refresh token) lets you get a new ticket without going back to the entrance.",
      example: "// Token lifetimes\naccessToken:  expires in 15 minutes\nrefreshToken: expires in 7 days\n\n// Silent refresh\nPOST /auth/refresh\n{ \"refreshToken\": \"dGhpcyBp...\" }\n→ { \"accessToken\": \"new_token...\" }"
    },
    {
      id: 7,
      icon: AlertTriangle,
      title: "Token Revocation / Logout",
      subtitle: "Invalidate the token",
      visual: "🚪❌🔒",
      diagram: `flowchart LR
  A([👤 User Logout]) --> B[🗑️ Delete Token from Client]
  B --> C{🔴 Blacklist Refresh Token in DB}
  C --> D([✅ Logged Out\nToken unusable])
  A -.->|JWT is stateless| E([⚠️ Access Token\nStill valid until expiry])
  style A fill:#3b82f6,color:#fff,stroke:#2563eb
  style B fill:#ef4444,color:#fff,stroke:#dc2626
  style C fill:#6366f1,color:#fff,stroke:#4f46e5
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#f59e0b,color:#1e293b,stroke:#d97706`,
      description: "JWT's weakness: you can't truly 'invalidate' an access token since the server doesn't store them. Solution: keep access tokens short-lived (15 min) and blacklist refresh tokens in a DB or Redis on logout.",
      analogy: "🎫 Like a concert wristband: If you lose it, someone else can use it until the show ends. You can't 'cancel' it remotely — that's why you keep them short-lived.",
      example: "// On logout:\n1. Delete token from client storage\n2. Add refresh token to blacklist in Redis\n3. Access token still works for ~15 min\n   (acceptable tradeoff for statelessness)\n\n// Redis blacklist\nredis.set('blacklist:' + refreshToken, '1', 'EX', 604800);"
    },
    {
      id: 8,
      icon: Lock,
      title: "Role-Based Access Control",
      subtitle: "What you're allowed to do",
      visual: "👑🔐📋",
      diagram: `flowchart LR
  A([🎫 JWT Token roles: ADMIN]) --> B[🔍 Extract Roles\nfrom Payload]
  B --> C{🛡️ Check Required Role}
  C -->|✓ Has Role| D([✅ Access Granted\nProceed])
  C -->|✗ Missing Role| E([❌ 403 Forbidden\nNot authorized])
  style A fill:#f59e0b,color:#1e293b,stroke:#d97706
  style B fill:#6366f1,color:#fff,stroke:#4f46e5
  style C fill:#8b5cf6,color:#fff,stroke:#7c3aed
  style D fill:#10b981,color:#fff,stroke:#059669
  style E fill:#ef4444,color:#fff,stroke:#dc2626`,
      description: "The JWT payload contains the user's roles (ADMIN, USER, MODERATOR). Spring Security reads these and checks if the user has the required role for each endpoint. No extra DB call needed.",
      analogy: "🏢 Like a building access card: Your card has your clearance level encoded. Some doors open for everyone, some only for managers, some only for IT. The door reader checks your card level.",
      example: "@PreAuthorize(\"hasRole('ADMIN')\")\n@DeleteMapping(\"/users/{id}\")\npublic void deleteUser(@PathVariable Long id) {     // Only ADMIN can reach here     userService.delete(id); }\n\n// JWT payload contains:\n// { roles: ['ROLE_ADMIN', 'ROLE_USER'] }"
    }
  ]
};

export default function JwtAuthFlow({ onBack }) {
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
      const total = jwtAuthFlow.steps.length;
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
        <h3 className="text-3xl md:text-4xl font-display font-bold theme-text mb-4">{jwtAuthFlow.title}</h3>
        <p className="theme-muted max-w-2xl mx-auto text-sm sm:text-base">{jwtAuthFlow.description}</p>
      </div>
      <div className="relative flex flex-col items-center">
        {jwtAuthFlow.steps.map((step, idx) => {
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
              {idx < jwtAuthFlow.steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 rounded-full" style={{ background: `linear-gradient(to bottom, ${jwtAuthFlow.color}88, ${jwtAuthFlow.color}22)` }} />
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: `${jwtAuthFlow.color}88` }} />
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


