import { useEffect } from "react";
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

function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
    sameAs: [portfolio.personal.linkedin, portfolio.personal.github].filter(Boolean),
    knowsAbout: portfolio.seo.keywords
  };

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

      <Navbar theme={theme} toggleTheme={toggleTheme} resumeFile={portfolio.personal.resumeFile} />

      <main>
        <Hero personal={portfolio.personal} quickStats={portfolio.quickStats} />
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
    </div>
  );
}

export default App;
