import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Cpu, Target, BarChart3, Zap, Database, Star, Activity } from "lucide-react";
import type { Project } from "@/types/site";

const ICONS: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={18} />, Cpu: <Cpu size={18} />, Target: <Target size={18} />,
  BarChart3: <BarChart3 size={18} />, Zap: <Zap size={18} />, Database: <Database size={18} />,
  Star: <Star size={18} />, Activity: <Activity size={18} />,
};

const PROJ_COLORS = [
  { accent: "hsl(var(--lime))", dim: "hsl(var(--lime) / 0.08)", border: "hsl(var(--lime) / 0.25)" },
  { accent: "hsl(var(--violet))", dim: "hsl(var(--violet) / 0.08)", border: "hsl(var(--violet) / 0.25)" },
  { accent: "hsl(var(--coral))", dim: "hsl(var(--coral) / 0.08)", border: "hsl(var(--coral) / 0.25)" },
];

const PSR: Array<{ key: keyof Project; label: string; dot: string }> = [
  { key: "problem", label: "Problema", dot: "hsl(var(--coral))" },
  { key: "solution", label: "Solução", dot: "hsl(var(--lime))" },
  { key: "result", label: "Resultado", dot: "hsl(var(--sky))" },
];

interface Props { projects: Project[]; }

export function ProjectsSection({ projects }: Props) {
  const [active, setActive] = useState(0);
  const project = projects[active];
  if (!project) return null;
  const colors = PROJ_COLORS[active % PROJ_COLORS.length];

  return (
    <section id="projects" style={{ padding: "120px 0", background: "hsl(var(--background))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>Casos de sucesso</span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.03em", color: "hsl(var(--foreground))" }}>
            Projetos <span className="text-gradient">Estratégicos</span>
          </h2>
        </motion.div>

        {/* Tab nav */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {projects.map((p, i) => {
            const c = PROJ_COLORS[i % PROJ_COLORS.length];
            const isActive = i === active;
            const btnStyle: React.CSSProperties = {
              padding: "9px 18px", borderRadius: 8, cursor: "pointer",
              fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: isActive ? 600 : 500,
              background: isActive ? c.dim : "hsl(var(--card))",
              borderWidth: 1, borderStyle: "solid",
              borderColor: isActive ? c.border : "hsl(var(--border))",
              color: isActive ? c.accent : "hsl(var(--muted-foreground))",
              transition: "all 0.2s",
            };
            return (
              <button key={p.id} onClick={() => setActive(i)} style={btnStyle}>
                {p.title}
              </button>
            );
          })}
        </div>

        {/* Project detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
            style={{
              display: "grid", gridTemplateColumns: "1fr 360px", gap: 0,
              background: "hsl(var(--card))",
              borderWidth: 1, borderStyle: "solid", borderColor: colors.border,
              borderRadius: 20, overflow: "hidden",
            }}
            className="project-grid"
          >
            {/* Left content */}
            <div style={{ padding: "40px 36px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <span style={{
                  padding: "4px 12px", borderRadius: 6,
                  background: colors.dim,
                  borderWidth: 1, borderStyle: "solid", borderColor: colors.border,
                  fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: colors.accent,
                }}>
                  {project.tag}
                </span>
                <div style={{ color: colors.accent }}>{ICONS[project.icon] || <TrendingUp size={18} />}</div>
              </div>

              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, color: "hsl(var(--foreground))", letterSpacing: "-0.02em", marginBottom: 6 }}>
                {project.title}
              </h3>
              <p style={{ fontSize: 14, color: colors.accent, fontWeight: 500, marginBottom: 36 }}>{project.subtitle}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {PSR.map(({ key, label, dot }) => (
                  <div key={key} style={{ paddingLeft: 16, borderLeft: `2px solid ${dot.replace(")", " / 0.4)")}` }}>
                    <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: dot, marginBottom: 6 }}>{label}</p>
                    <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", lineHeight: 1.65 }}>{String(project[key])}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — metrics sidebar */}
            <div style={{
              background: colors.dim,
              borderLeft: `1px solid ${colors.border}`,
              padding: "40px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <div>
                <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: colors.accent, marginBottom: 28 }}>
                  Resultados
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  {project.metrics.map((m, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 38, color: "hsl(var(--foreground))", letterSpacing: "-0.03em", lineHeight: 1 }}>{m.value}</div>
                      <div style={{ fontSize: 13, color: "hsl(var(--muted-foreground))", marginTop: 4, lineHeight: 1.4 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: 6, marginTop: 32 }}>
                {projects.map((_, i) => (
                  <button key={i} onClick={() => setActive(i)} style={{
                    width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                    border: "none", cursor: "pointer", padding: 0,
                    background: i === active ? colors.accent : "hsl(var(--border))",
                    transition: "all 0.2s",
                  }} />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
