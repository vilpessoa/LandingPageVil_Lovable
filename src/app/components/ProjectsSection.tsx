import { useEffect, useRef, useState, useCallback } from "react";
import { TrendingUp, Cpu, Target, BarChart3, Zap, Database, Star, Award, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
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

function ProjectCard({ project }: { project: any }) {
  const icon = ICON_MAP[project.icon] || <Target size={20} />;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(15,23,42,0.98) 100%)",
        border: `1px solid rgba(255,255,255,0.06)`,
        borderRadius: "16px",
        padding: "36px",
        position: "relative",
        overflow: "hidden",
        maxWidth: "700px",
        margin: "0 auto",
        width: "100%",
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

      {/* Project Image */}
      {project.imageUrl && (
        <div style={{ marginTop: "20px", borderRadius: "10px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
          <img
            src={project.imageUrl}
            alt={project.title}
            style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
          />
        </div>
      )}

      {/* Project Link */}
      {project.projectUrl && (
        <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 24px",
              borderRadius: "8px",
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              color: project.color,
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${project.color}25`;
              e.currentTarget.style.boxShadow = `0 0 20px ${project.color}15`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `${project.color}15`;
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <ExternalLink size={16} />
            Acesse o projeto
          </a>
        </div>
      )}
    </div>
  );
}

export function ProjectsSection() {
  const { data } = useSiteData();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = data.projects.length;

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (paused || total <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, total]);

  if (total === 0) return null;

  return (
    <section
      id="projects"
      style={{ background: "#111827", padding: "100px 24px", position: "relative" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#7C3AED", letterSpacing: "0.15em", textTransform: "uppercase" }}>// casos de sucesso</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#F9FAFB", letterSpacing: "-0.5px", marginTop: "12px" }}>Projetos Estratégicos</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#9CA3AF", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0" }}>
            Soluções entregues com foco em impacto real e resultados mensuráveis.
          </p>
        </div>

        {/* Carousel */}
        <div style={{ position: "relative" }}>
          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Projeto anterior"
                style={{
                  position: "absolute", top: "50%", left: "-16px", transform: "translateY(-50%)",
                  zIndex: 10, width: "40px", height: "40px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F9FAFB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                aria-label="Próximo projeto"
                style={{
                  position: "absolute", top: "50%", right: "-16px", transform: "translateY(-50%)",
                  zIndex: 10, width: "40px", height: "40px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#F9FAFB", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Slide */}
          <div style={{ overflow: "hidden", padding: "0 8px" }}>
            <ProjectCard project={data.projects[current]} />
          </div>

          {/* Dot indicators */}
          {total > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
              {data.projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ir para projeto ${i + 1}`}
                  style={{
                    width: current === i ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: current === i ? data.projects[i].color : "rgba(255,255,255,0.15)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
