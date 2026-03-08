import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { MetricsSection } from "../components/MetricsSection";
import { AboutSection } from "../components/AboutSection";
import { TechStackSection } from "../components/TechStackSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { PhilosophySection } from "../components/PhilosophySection";
import { ContactSection } from "../components/ContactSection";

export function LandingPage() {
  return (
    <div
      style={{
        background: "#0F172A",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0F172A; }
        ::-webkit-scrollbar-thumb { background: rgba(0,194,255,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,194,255,0.5); }
        ::selection { background: rgba(0,194,255,0.25); color: #F9FAFB; }
      `}</style>
      <Navbar />
      <HeroSection />
      <MetricsSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <PhilosophySection />
      <ContactSection />
      <PortfolioPDF data={data} />
    </div>
  );
}
