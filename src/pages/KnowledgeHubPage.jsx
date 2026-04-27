import { Suspense, lazy } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { portfolio } from "../data/portfolio";
import { useTheme } from "../hooks/useTheme";

const KnowledgeHub = lazy(() => import("../components/KnowledgeHub"));

export default function KnowledgeHubPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page-shell">
      <Navbar theme={theme} toggleTheme={toggleTheme} resumeFile={portfolio.personal.resumeFile} />
      <main>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium theme-muted hover:text-[color:var(--lux-gold)] transition-colors"
          >
            <span>←</span> Back to Portfolio
          </a>
        </div>
        <Suspense fallback={<div className="min-h-screen bg-surface" />}>
          <KnowledgeHub />
        </Suspense>
      </main>
      <Footer personal={portfolio.personal} />
    </div>
  );
}
