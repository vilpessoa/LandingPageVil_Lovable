import { useSiteData } from "@/hooks/useSiteData";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TechStackSection } from "@/components/sections/TechStackSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Index() {
  const { siteData, loading } = useSiteData();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", color: "#9CA3AF" }}>Carregando...</span>
      </div>
    );
  }

  return (
    <div style={{ background: "#0F172A", minHeight: "100vh", overflowX: "hidden" }}>
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
      <HeroSection personal={siteData.personal} />
      <MetricsSection metrics={siteData.metrics} />
      <AboutSection about={siteData.about} />
      <TechStackSection techStack={siteData.techStack} extraTechs={siteData.extraTechs} />
      <ProjectsSection projects={siteData.projects} />
      <PhilosophySection philosophy={siteData.philosophy} />
      <ContactSection personal={siteData.personal} />
    </div>
  );
}
