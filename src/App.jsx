import { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import CredentialsSection from "./components/CredentialsSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
import { portfolio } from "./data/portfolio";
import { useTheme } from "./hooks/useTheme";
import { Home } from "lucide-react";
import KnowledgeHubPage from "./pages/KnowledgeHubPage";

const ResumeModal = lazy(() => import("./components/ResumeModal"));

function App() {
  const { theme, toggleTheme } = useTheme();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    // Check if we were sent here from another page with a scroll target
    const scrollTo = sessionStorage.getItem("scrollTo");
    if (scrollTo) {
      sessionStorage.removeItem("scrollTo");
      setTimeout(() => {
        document.querySelector(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolio.personal.name,
    jobTitle: portfolio.personal.title,
    email: portfolio.personal.email,
    telephone: portfolio.personal.phone,
    url: portfolio.seo.siteUrl,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New Delhi",
      addressCountry: "IN"
    },
    worksFor: {
      "@type": "Organization",
      name: "Tata Consultancy Services"
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Bengal College of Engineering and Technology"
    },
    sameAs: [portfolio.personal.linkedin, portfolio.personal.github].filter(Boolean),
    knowsAbout: portfolio.seo.keywords
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/knowledge-hub" element={<KnowledgeHubPage />} />
        <Route path="*" element={<HomePage theme={theme} toggleTheme={toggleTheme} isResumeModalOpen={isResumeModalOpen} setIsResumeModalOpen={setIsResumeModalOpen} personSchema={personSchema} />} />
      </Routes>
    </BrowserRouter>
  );
}

function HomePage({ theme, toggleTheme, isResumeModalOpen, setIsResumeModalOpen, personSchema }) {
  // Enable Executive Arrow-Key Navigation across sections
  useEffect(() => {
    if (isResumeModalOpen) return;

    const sections = ['home', 'about', 'skills', 'projects', 'credentials', 'contact'];

    const handleKeyDown = (e) => {
      // Do not interfere if the user is typing inside the contact form
      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();

        let currentIdx = 0;
        let minDistance = Infinity;

        // Find the section currently closest to the top of the viewport
        sections.forEach((id, idx) => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Offset accounts for the sticky navbar when calculating the "active" section
            const distance = Math.abs(rect.top - 150);
            if (distance < minDistance) {
              minDistance = distance;
              currentIdx = idx;
            }
          }
        });

        if ((e.key === "ArrowDown" || e.key === "ArrowRight") && currentIdx < sections.length - 1) {
          document.getElementById(sections[currentIdx + 1])?.scrollIntoView({ behavior: "smooth" });
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          if (currentIdx === 1 || (currentIdx === 0 && window.scrollY > 0)) {
            // Snap to the absolute top of the page so the Navbar isn't cut off
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (currentIdx > 1) {
            document.getElementById(sections[currentIdx - 1])?.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResumeModalOpen]);

  return (
    <div className="page-shell">
      <Helmet>
        <html lang="en" />
        <title>{portfolio.seo.title}</title>
        <meta name="theme-color" content={theme === "dark" ? "#111827" : "#F8F7F4"} />
        <meta name="description" content={portfolio.seo.description} />
        <meta name="keywords" content={portfolio.seo.keywords.join(", ")} />
        <meta name="author" content={portfolio.personal.name} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={portfolio.seo.title} />
        <meta property="og:description" content={portfolio.seo.description} />
        <meta property="og:url" content={portfolio.seo.siteUrl} />
        <meta property="og:image" content={`${portfolio.seo.siteUrl}/og-cover.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={portfolio.seo.title} />
        <meta name="twitter:description" content={portfolio.seo.description} />
        <meta name="twitter:image" content={`${portfolio.seo.siteUrl}/og-cover.svg`} />
        <link rel="canonical" href={portfolio.seo.siteUrl} />
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      </Helmet>

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        resumeFile={portfolio.personal.resumeFile}
      />

      <main>
        <Hero 
          personal={portfolio.personal} 
          quickStats={portfolio.quickStats} 
          onViewResumeClick={() => setIsResumeModalOpen(true)}
        />
        <AboutSection personal={portfolio.personal} focusAreas={portfolio.focusAreas} />
        <SkillsSection skills={portfolio.skills} />
        <ProjectsSection projects={portfolio.projects} />
        <CredentialsSection
          certifications={portfolio.certifications}
          achievements={portfolio.achievements}
        />
        <ContactSection personal={portfolio.personal} />
      </main>

      <Footer personal={portfolio.personal} />

      {/* Floating Home / Back to Top Button */}
      <motion.button
        drag
        dragMomentum={false}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center !p-0 rounded-full lux-btn-primary focus:outline-none cursor-grab active:cursor-grabbing"
        aria-label="Back to top"
      >
        <Home size={20} />
      </motion.button>

      <AnimatePresence>
        {isResumeModalOpen && (
          <Suspense fallback={null}>
            <ResumeModal
              resumeFile={portfolio.personal.resumeFile}
              onClose={() => setIsResumeModalOpen(false)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
