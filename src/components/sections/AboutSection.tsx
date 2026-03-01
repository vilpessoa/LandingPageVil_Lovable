import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { AboutData } from "@/types/site";

const chartData = [
  { year: "2019", technical: 15, business: 10 },
  { year: "2020", technical: 30, business: 22 },
  { year: "2021", technical: 50, business: 40 },
  { year: "2022", technical: 65, business: 58 },
  { year: "2023", technical: 80, business: 74 },
  { year: "2024", technical: 92, business: 87 },
  { year: "2025", technical: 98, business: 95 },
];

interface Props { about: AboutData; }

export function AboutSection({ about }: Props) {
  return (
    <section id="about" style={{ padding: "120px 0", background: "hsl(var(--background))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Top label */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 64 }}>
          <span className="eyebrow">Sobre mim</span>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-cols-about">
          {/* Left — text */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{
              fontFamily: "Syne, sans-serif", fontWeight: 800,
              fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.05,
              letterSpacing: "-0.03em", marginBottom: 24,
              color: "hsl(var(--foreground))",
            }}>
              Mentalidade<br />
              <span className="text-gradient">Analítica</span>
            </h2>

            <p style={{ fontSize: 15, color: "hsl(var(--muted-foreground))", lineHeight: 1.75, marginBottom: 20 }}>
              {about.text1}
            </p>
            <p style={{ fontSize: 15, color: "hsl(var(--muted-foreground))", lineHeight: 1.75, marginBottom: 32 }}>
              {about.text2}
            </p>

            {/* Highlights */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {about.highlights.map((h, i) => (
                <motion.div
                  key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.1 * i }}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span style={{
                    width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                    background: "hsl(var(--lime) / 0.12)", border: "1px solid hsl(var(--lime) / 0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "hsl(var(--lime))",
                  }}>
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span style={{ fontSize: 14, color: "hsl(var(--foreground) / 0.8)", fontWeight: 500 }}>{h}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — chart card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
              borderRadius: 20, padding: 28, overflow: "hidden",
            }}
          >
            {/* Window chrome */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 6 }}>
                {["hsl(var(--coral))", "hsl(75 80% 70%)", "hsl(var(--lime))"].map((c, i) => (
                  <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "hsl(var(--muted-foreground))" }}>
                analytics.growth
              </span>
            </div>

            <p style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14, color: "hsl(var(--foreground))", marginBottom: 20 }}>
              {about.chartTitle}
            </p>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="2 4" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} domain={[0, 100]} />
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="technical" stroke="hsl(var(--lime))" strokeWidth={2} dot={{ fill: "hsl(var(--lime))", r: 3, strokeWidth: 0 }} name="Maturidade Técnica" />
                <Line type="monotone" dataKey="business" stroke="hsl(var(--violet))" strokeWidth={2} dot={{ fill: "hsl(var(--violet))", r: 3, strokeWidth: 0 }} name="Impacto no Negócio" />
              </LineChart>
            </ResponsiveContainer>

            <div style={{ display: "flex", gap: 24, marginTop: 16, justifyContent: "center" }}>
              {[["hsl(var(--lime))", "Maturidade Técnica"], ["hsl(var(--violet))", "Impacto no Negócio"]].map(([c, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 20, height: 2, background: c, borderRadius: 2 }} />
                  <span style={{ fontSize: 12, color: "hsl(var(--muted-foreground))" }}>{l}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .grid-cols-about { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
