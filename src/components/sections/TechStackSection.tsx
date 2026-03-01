import { motion } from "framer-motion";
import type { TechCategory } from "@/types/site";

const CAT_COLORS = [
  { text: "hsl(var(--lime))", bg: "hsl(var(--lime) / 0.08)", border: "hsl(var(--lime) / 0.2)", bar: "linear-gradient(90deg, hsl(var(--lime)), hsl(125 70% 60%))" },
  { text: "hsl(var(--violet))", bg: "hsl(var(--violet) / 0.08)", border: "hsl(var(--violet) / 0.2)", bar: "linear-gradient(90deg, hsl(var(--violet)), hsl(200 85% 62%))" },
  { text: "hsl(var(--coral))", bg: "hsl(var(--coral) / 0.08)", border: "hsl(var(--coral) / 0.2)", bar: "linear-gradient(90deg, hsl(var(--coral)), hsl(38 95% 62%))" },
];

interface Props { techStack: TechCategory[]; extraTechs: string[]; }

export function TechStackSection({ techStack, extraTechs }: Props) {
  return (
    <section id="stack" style={{ padding: "120px 0", background: "hsl(var(--muted))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>Arsenal técnico</span>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.03em", color: "hsl(var(--foreground))" }}>
              Stack <span className="text-gradient">Tecnológica</span>
            </h2>
          </div>
          <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", maxWidth: 320, lineHeight: 1.65 }}>
            Ferramentas e tecnologias que compõem meu ecossistema analítico.
          </p>
        </motion.div>

        {/* Category cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 40 }}>
          {techStack.map((cat, ci) => {
            const colors = CAT_COLORS[ci % CAT_COLORS.length];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: ci * 0.1 }}
                className="card-hover"
                style={{
                  background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
                  borderRadius: 16, padding: "28px 24px",
                }}
              >
                {/* Category header */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 8, fontSize: 18,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: colors.bg, border: `1px solid ${colors.border}`,
                  }}>
                    {cat.icon}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "hsl(var(--foreground))", marginBottom: 2 }}>{cat.title}</h3>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: colors.text, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {cat.techs.length} tecnologias
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {cat.techs.map((tech, ti) => (
                    <div key={tech.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "hsl(var(--foreground) / 0.85)" }}>{tech.name}</span>
                        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: colors.text, fontWeight: 600 }}>{tech.level}%</span>
                      </div>
                      <div style={{ height: 3, background: "hsl(var(--border))", borderRadius: 3, overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${tech.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: ci * 0.1 + ti * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          style={{ height: "100%", borderRadius: 3, background: colors.bar }}
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
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ padding: "24px 28px", background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 16 }}
          >
            <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>
              também utilizo
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {extraTechs.map((tech) => (
                <span key={tech} style={{
                  padding: "5px 12px", borderRadius: 6,
                  background: "hsl(var(--muted))", border: "1px solid hsl(var(--border))",
                  fontSize: 13, color: "hsl(var(--foreground) / 0.7)", fontWeight: 500,
                  transition: "all 0.2s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "hsl(var(--lime) / 0.4)"; e.currentTarget.style.color = "hsl(var(--foreground))"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.color = "hsl(var(--foreground) / 0.7)"; }}
                >
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
