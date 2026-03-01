import { useEffect, useRef, useState } from "react";
import { TrendingUp, Cpu, Target, BarChart3, Zap, Database, Star, Award } from "lucide-react";
import { useSiteData } from "../context/DataContext";

const ICON_MAP: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={20} />,
  Cpu: <Cpu size={20} />,
  Target: <Target size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Zap: <Zap size={20} />,
  Database: <Database size={20} />,
  Star: <Star size={20} />,
  Award: <Award size={20} />,
};

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const icon = ICON_MAP[project.icon] || <Target size={20} />;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(15,23,42,0.98) 100%)",
        border: `1px solid ${hovered ? project.color + "35" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "16px", padding: "36px",
        opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.65s ease ${index * 150}ms`,
        boxShadow: hovered ? `0 0 40px ${project.color}10, 0 20px 40px rgba(0,0,0,0.3)` : "0 4px 20px rgba(0,0,0,0.2)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: "200px", height: "200px", background: `radial-gradient(circle at top right, ${project.color}08 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: project.tagColor, background: `${project.tagColor}12`, border: `1px solid ${project.tagColor}25`, padding: "3px 10px", borderRadius: "4px", letterSpacing: "0.05em" }}>
              {project.tag}
            </span>
          </div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, color: "#F9FAFB", marginBottom: "4px", letterSpacing: "-0.3px" }}>{project.title}</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: project.color, fontWeight: 500 }}>{project.subtitle}</p>
        </div>
        <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${project.color}15`, border: `1px solid ${project.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: project.color, flexShrink: 0 }}>
          {icon}
        </div>
      </div>

      <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "24px" }} />

      <div style={{ display: "grid", gap: "16px", marginBottom: "28px" }}>
        {[
          { label: "PROBLEMA", content: project.problem, color: "#F59E0B" },
          { label: "SOLUÇÃO", content: project.solution, color: project.color },
          { label: "RESULTADO", content: project.result, color: "#10B981" },
        ].map((item, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div style={{ width: "3px", height: "12px", background: item.color, borderRadius: "2px" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: item.color, letterSpacing: "0.1em" }}>{item.label}</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#9CA3AF", lineHeight: 1.65, paddingLeft: "11px" }}>{item.content}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`, gap: "12px", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
        {project.metrics.map((metric: any, i: number) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: project.color, marginBottom: "4px" }}>{metric.value}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9CA3AF", lineHeight: 1.4 }}>{metric.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { data } = useSiteData();

  return (
    <section id="projects" style={{ background: "#111827", padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#7C3AED", letterSpacing: "0.15em", textTransform: "uppercase" }}>// casos de sucesso</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#F9FAFB", letterSpacing: "-0.5px", marginTop: "12px" }}>Projetos Estratégicos</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#9CA3AF", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0" }}>
            Soluções entregues com foco em impacto real e resultados mensuráveis.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "28px" }}>
          {data.projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
        </div>
      </div>
    </section>
  );
}
