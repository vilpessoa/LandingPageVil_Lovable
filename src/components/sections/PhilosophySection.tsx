import { motion } from "framer-motion";
import type { PhilosophyData } from "@/types/site";

interface Props { philosophy: PhilosophyData; }

const NUM_COLORS = ["hsl(var(--lime))", "hsl(var(--violet))", "hsl(var(--coral))"];

export function PhilosophySection({ philosophy }: Props) {
  return (
    <section style={{ padding: "120px 0", background: "hsl(var(--muted))", position: "relative", overflow: "hidden" }}>
      {/* Large decorative quote mark */}
      <div style={{
        position: "absolute", top: -20, left: "5%",
        fontFamily: "Syne, sans-serif", fontSize: 320, fontWeight: 800,
        color: "hsl(var(--lime) / 0.04)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>
        "
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 56 }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>Filosofia de trabalho</span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.03em", color: "hsl(var(--foreground))" }}>
            Data-Driven <span className="text-gradient">Thinking</span>
          </h2>
        </motion.div>

        {/* Quote block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{
            padding: "48px 52px", marginBottom: 48,
            background: "hsl(var(--card))",
            borderWidth: 1, borderStyle: "solid", borderColor: "hsl(var(--lime) / 0.2)",
            borderRadius: 20, position: "relative",
          }}
        >
          {/* Left accent bar */}
          <div style={{
            position: "absolute", left: 0, top: "15%", bottom: "15%",
            width: 3, borderRadius: 3,
            background: "linear-gradient(to bottom, hsl(var(--lime)), hsl(125 70% 55%))",
          }} />

          <blockquote style={{
            fontFamily: "Syne, sans-serif", fontSize: "clamp(20px, 2.5vw, 28px)",
            fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.4,
            color: "hsl(var(--foreground))", margin: 0,
          }}>
            "{philosophy.quote}"
          </blockquote>
          <p style={{ marginTop: 20, fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "hsl(var(--muted-foreground))" }}>
            — {philosophy.author}
          </p>
        </motion.div>

        {/* Principles grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {philosophy.principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-hover"
              style={{
                padding: "28px 24px",
                background: "hsl(var(--card))",
                borderWidth: 1, borderStyle: "solid", borderColor: "hsl(var(--border))",
                borderRadius: 16,
              }}
            >
              <div style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 11,
                color: NUM_COLORS[i % NUM_COLORS.length], fontWeight: 600,
                letterSpacing: "0.1em", marginBottom: 16,
              }}>
                {p.number}
              </div>
              <h4 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, color: "hsl(var(--foreground))", marginBottom: 10, letterSpacing: "-0.01em" }}>
                {p.title}
              </h4>
              <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))", lineHeight: 1.65 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
