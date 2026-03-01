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
      <div className="min-h-screen bg-[#080d1a] flex items-center justify-center">
        <span className="font-['JetBrains_Mono'] text-[13px] text-white/30 animate-pulse">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#080d1a] min-h-screen overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #080d1a; }
        ::-webkit-scrollbar-thumb { background: rgba(0,194,255,0.25); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,194,255,0.45); }
        ::selection { background: rgba(0,194,255,0.2); color: #F1F5FB; }
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
