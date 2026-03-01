import { useSiteData } from "@/hooks/useSiteData";
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
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-muted-foreground font-mono text-sm animate-pulse">
          Carregando...
        </div>
      </div>
    );
  }

  return (
    <main>
      <HeroSection personal={siteData.personal} />
      <MetricsSection metrics={siteData.metrics} />
      <AboutSection about={siteData.about} />
      <TechStackSection techStack={siteData.techStack} extraTechs={siteData.extraTechs} />
      <ProjectsSection projects={siteData.projects} />
      <PhilosophySection philosophy={siteData.philosophy} />
      <ContactSection personal={siteData.personal} />
    </main>
  );
}
