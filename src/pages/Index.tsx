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
      <div style={{ minHeight: "100vh", background: "hsl(var(--background))", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "hsl(var(--muted-foreground))", animation: "pulse 1.5s ease-in-out infinite" }}>
          Carregando...
        </span>
      </div>
    );
  }

  return (
    <div style={{ background: "hsl(var(--background))", minHeight: "100vh", overflowX: "hidden" }}>
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
