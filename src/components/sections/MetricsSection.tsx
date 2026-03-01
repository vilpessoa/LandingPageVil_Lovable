import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock, Zap, Database, TrendingUp, Star, Activity } from "lucide-react";
import type { MetricItem } from "@/types/site";

const ICONS: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={18} />,
  Clock: <Clock size={18} />,
  Zap: <Zap size={18} />,
  Database: <Database size={18} />,
  TrendingUp: <TrendingUp size={18} />,
  Star: <Star size={18} />,
  Activity: <Activity size={18} />,
};

const ACCENT = ["hsl(var(--lime))", "hsl(var(--coral))", "hsl(var(--sky))", "hsl(var(--violet))"];

function CountUp({ target, started }: { target: number; started: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!started) return;
    let t0: number | null = null;
    const dur = 1400;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(e * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target]);
  return <>{n}</>;
}

interface Props { metrics: MetricItem[]; }

export function MetricsSection({ metrics }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ padding: "100px 0", background: "hsl(var(--muted))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} style={{ marginBottom: 56 }}
        >
          <span className="eyebrow" style={{ marginBottom: 12, display: "block" }}>Impacto Mensurável</span>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>
            Resultados em números
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {metrics.map((m, i) => {
            const accent = ACCENT[i % ACCENT.length];
            const icon = ICONS[m.icon] || <BarChart3 size={18} />;
            const num = parseInt(m.value) || 0;
            const isYear = m.value.length === 4 && !isNaN(Number(m.value));

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card-hover"
                style={{
                  background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
                  borderRadius: 16, padding: "32px 28px", position: "relative", overflow: "hidden",
                }}
              >
                {/* Corner accent */}
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: 80, height: 80,
                  background: `radial-gradient(circle at top right, ${accent.replace(")", " / 0.12)")}, transparent 70%)`,
                  pointerEvents: "none",
                }} />

                {/* Icon */}
                <div style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  width: 36, height: 36, borderRadius: 8, marginBottom: 20,
                  background: `${accent.replace(")", " / 0.1)")}`,
                  color: accent, border: `1px solid ${accent.replace(")", " / 0.2)")}`,
                }}>
                  {icon}
                </div>

                {/* Value */}
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, marginBottom: 4 }}>
                  {m.prefix && <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 28, color: accent }}>{m.prefix}</span>}
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 52, lineHeight: 1, color: "hsl(var(--foreground))", letterSpacing: "-0.03em" }}>
                    {isYear ? m.value : <CountUp target={num} started={started} />}
                  </span>
                  {m.suffix && <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 24, color: accent }}>{m.suffix}</span>}
                </div>

                {/* Label */}
                <div style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15, color: "hsl(var(--foreground))", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "hsl(var(--muted-foreground))", lineHeight: 1.5 }}>{m.sublabel}</div>

                {/* Bottom accent line */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent.replace(")", " / 0.6)")}, transparent)` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
