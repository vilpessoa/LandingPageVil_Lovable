import { motion } from "framer-motion";
import { BarChart3, Settings, Bot, Cpu, Code2, Layers } from "lucide-react";
import type { TechCategory } from "@/types/site";

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={20} />,
  Settings: <Settings size={20} />,
  Bot: <Bot size={20} />,
  Cpu: <Cpu size={20} />,
  Code2: <Code2 size={20} />,
  Layers: <Layers size={20} />,
};

const colorMap: Record<string, string> = {
  cyan: "hsl(var(--cyan))",
  purple: "hsl(var(--purple))",
  green: "hsl(var(--green))",
  orange: "hsl(var(--orange))",
};

const barClassMap: Record<string, string> = {
  cyan: "progress-bar-cyan",
  purple: "progress-bar-purple",
  green: "progress-bar-green",
};

interface TechStackSectionProps {
  techStack: TechCategory[];
  extraTechs: string[];
}

export function TechStackSection({ techStack, extraTechs }: TechStackSectionProps) {
  return (
    <section id="stack" className="py-24 bg-muted/30">
      <div className="container max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">// COMPETÊNCIAS TÉCNICAS</p>
          <h2 className="text-4xl font-bold text-foreground mb-3">Stack Tecnológica</h2>
          <p className="text-muted-foreground">
            Ferramentas e tecnologias que compõem meu arsenal analítico.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {techStack.map((cat, ci) => {
            const color = colorMap[cat.color] || colorMap.cyan;
            const barClass = barClassMap[cat.color] || "progress-bar-cyan";
            const icon = iconMap[cat.icon] || <BarChart3 size={20} />;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.1 }}
                className="card-glass rounded-xl p-6"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${color}22`, color }}
                  >
                    {icon}
                  </div>
                  <h3 className="font-bold text-foreground">{cat.title}</h3>
                </div>
                <div
                  className="h-0.5 mb-5 w-full"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />
                <div className="space-y-4">
                  {cat.techs.map((tech) => (
                    <div key={tech.name}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span className="text-foreground/80">{tech.name}</span>
                        <span style={{ color }} className="font-mono font-semibold">
                          {tech.level}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className={`h-full rounded-full ${barClass}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra techs */}
        {extraTechs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="font-mono text-xs text-muted-foreground mb-4 uppercase tracking-widest">
              TAMBÉM UTILIZO →
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {extraTechs.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full border border-border text-sm text-muted-foreground"
                >
                  <span className="mr-1.5 text-muted-foreground/50">•</span>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
