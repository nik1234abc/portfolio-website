import { useState } from "react";
import LifecycleDiagram from "./LifecycleDiagram";
import JwtAuthFlow from "./flows/JwtAuthFlow";
import KafkaFlow from "./flows/KafkaFlow";
import MicroservicesFlow from "./flows/MicroservicesFlow";
import SpringBootStartupFlow from "./flows/SpringBootStartupFlow";
import CiCdFlow from "./flows/CiCdFlow";
import ThreadLifecycleFlow from "./flows/ThreadLifecycleFlow";
import SpringBootAnnotationsFlow from "./flows/SpringBootAnnotationsFlow";

const flows = [
  { id: "http",         label: "HTTP Request Flow",          icon: "🔄", component: LifecycleDiagram },
  { id: "jwt",          label: "JWT Auth Flow",               icon: "🔐", component: JwtAuthFlow },
  { id: "kafka",        label: "Kafka Message Flow",          icon: "📨", component: KafkaFlow },
  { id: "microservice", label: "Microservices Flow",          icon: "🔗", component: MicroservicesFlow },
  { id: "springboot",   label: "Spring Boot Startup Flow",    icon: "🌱", component: SpringBootStartupFlow },
  { id: "annotations",  label: "Spring Boot Annotations",     icon: "🏷️", component: SpringBootAnnotationsFlow },
  { id: "cicd",         label: "CI/CD Pipeline Flow",         icon: "🚀", component: CiCdFlow },
  { id: "thread",       label: "Thread Lifecycle",            icon: "🧵", component: ThreadLifecycleFlow },
];

export default function LifecycleFlowsHub({ onBack }) {
  const [activeFlow, setActiveFlow] = useState("http");

  const ActiveComponent = flows.find(f => f.id === activeFlow)?.component;

  return (
    <div className="w-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-sm font-semibold text-[color:var(--lux-muted)] hover:text-[color:var(--lux-gold)] transition-colors bg-panel px-4 py-2 rounded-full border border-[color:var(--lux-border)] hover:border-[color:var(--lux-gold)] w-max mx-4 sm:mx-6"
      >
        ← All Categories
      </button>

      {/* Header */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold theme-text mb-3">
          Lifecycle Diagrams
        </h2>
        <p className="text-sm text-[color:var(--lux-muted)] max-w-xl mx-auto">
          Step-by-step visual flows. Click any step for a detailed explanation.
        </p>
      </div>

      {/* Flow Selector Pills */}
      <div className="flex flex-wrap justify-center gap-2 px-4 mb-10">
        {flows.map((flow) => (
          <button
            key={flow.id}
            onClick={() => setActiveFlow(flow.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
              activeFlow === flow.id
                ? "border-[color:var(--lux-gold)] text-[color:var(--lux-gold)] bg-[color:color-mix(in_srgb,var(--lux-gold)_10%,transparent)] shadow-glow"
                : "border-[color:var(--lux-border)] text-[color:var(--lux-muted)] hover:border-[color:var(--lux-gold)] hover:text-[color:var(--lux-gold)] bg-panel"
            }`}
          >
            <span>{flow.icon}</span>
            <span>{flow.label}</span>
          </button>
        ))}
      </div>

      {/* Active Flow — pass a no-op onBack since back is handled above */}
      {ActiveComponent && (
        <ActiveComponent onBack={() => {}} />
      )}
    </div>
  );
}
