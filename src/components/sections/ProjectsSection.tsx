import { motion } from "framer-motion";
import {
  TrendingUp, Settings2, Target, BarChart3,
  Zap, Database, Star, Activity
} from "lucide-react";
import type { Project } from "@/types/site";

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={20} />,
  Settings2: <Settings2 size={20} />,
  Target: <Target size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Zap: <Zap size={20} />,
  Database: <Database size={20} />,
  Star: <Star size={20} />,
  Activity: <Activity size={20} />,
};

const colorMap: Record<string, string> = {
  cyan: "hsl(var(--cyan))",
  purple: "hsl(var(--purple))",
  green: "hsl(var(--green))",
  orange: "hsl(var(--orange))",
};

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projetos" className="py-24 bg-background">
      <div className="container max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">// CASOS DE SUCESSO</p>
          <h2 className="text-4xl font-bold text-foreground mb-3">Projetos Estratégicos</h2>
          <p className="text-muted-foreground">
            Soluções entregues com foco em impacto real e resultados mensuráveis.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const color = colorMap[project.color] || colorMap.cyan;
            const tagColor = colorMap[project.tagColor] || colorMap.cyan;
            const icon = iconMap[project.icon] || <TrendingUp size={20} />;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-xl p-6 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span
                    className="px-2.5 py-1 rounded text-xs font-mono font-semibold"
                    style={{ background: `${tagColor}22`, color: tagColor }}
                  >
                    {project.tag}
                  </span>
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}22`, color }}
                  >
                    {icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-1">{project.title}</h3>
                <p className="text-sm mb-4" style={{ color }}>{project.subtitle}</p>

                <div
                  className="h-px mb-4 w-full"
                  style={{ background: `hsl(var(--border))` }}
                />

                {/* P/S/R */}
                <div className="space-y-3 flex-1">
                  {[
                    { label: "PROBLEMA", text: project.problem, color: "hsl(var(--orange))" },
                    { label: "SOLUÇÃO", text: project.solution, color: "hsl(var(--cyan))" },
                    { label: "RESULTADO", text: project.result, color: "hsl(var(--green))" },
                  ].map(({ label, text, color: lc }) => (
                    <div key={label}>
                      <p
                        className="text-[10px] font-mono font-bold tracking-widest mb-1"
                        style={{ color: lc }}
                      >
                        {label}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>

                {/* Metrics */}
                <div
                  className="mt-4 pt-4 border-t border-border grid"
                  style={{ gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)` }}
                >
                  {project.metrics.map((m, mi) => (
                    <div key={mi} className="text-center">
                      <div
                        className="text-xl font-bold font-mono"
                        style={{ color }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
