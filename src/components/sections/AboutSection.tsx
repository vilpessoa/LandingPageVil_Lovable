import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { AboutData } from "@/types/site";

const chartData = [
  { year: "2019", technical: 15, business: 10 },
  { year: "2020", technical: 28, business: 20 },
  { year: "2021", technical: 48, business: 38 },
  { year: "2022", technical: 62, business: 55 },
  { year: "2023", technical: 78, business: 72 },
  { year: "2024", technical: 90, business: 85 },
  { year: "2025", technical: 98, business: 95 },
];

interface AboutSectionProps {
  about: AboutData;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-label mb-3">// SOBRE MIM</p>
            <h2 className="text-4xl font-bold mb-2 text-foreground">
              Mentalidade
            </h2>
            <h2 className="text-4xl font-bold text-gradient-cyan mb-8">
              Analítica
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{about.text1}</p>
            <p className="text-muted-foreground leading-relaxed mb-8">{about.text2}</p>
            <div className="space-y-3">
              {about.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-foreground/80">
                  <CheckCircle2 size={16} className="text-vi-green flex-shrink-0" />
                  <span className="text-sm">{h}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-glass rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="font-mono text-xs text-muted-foreground">analytics.growth.chart</p>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-vi-green" />
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground mb-6">{about.chartTitle}</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    color: "hsl(var(--foreground))",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="technical"
                  stroke="hsl(var(--cyan))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--cyan))", r: 4 }}
                  name="Maturidade Técnica"
                />
                <Line
                  type="monotone"
                  dataKey="business"
                  stroke="hsl(var(--purple))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--purple))", r: 4 }}
                  name="Impacto no Negócio"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-6 h-0.5 inline-block" style={{ background: "hsl(var(--cyan))" }} />
                Maturidade Técnica
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-6 h-0.5 inline-block" style={{ background: "hsl(var(--purple))" }} />
                Impacto no Negócio
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
