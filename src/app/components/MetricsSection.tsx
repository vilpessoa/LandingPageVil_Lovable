import { useEffect, useRef, useState } from "react";
import { BarChart3, Clock, Zap, Database, TrendingUp, Users, Star, Award } from "lucide-react";
import { useSiteData } from "../context/DataContext";

const ICON_MAP: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={20} />,
  Clock: <Clock size={20} />,
  Zap: <Zap size={20} />,
  Database: <Database size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  Users: <Users size={20} />,
  Star: <Star size={20} />,
  Award: <Award size={20} />,
};

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function MetricCard({ metric, delay }: { metric: any; delay: number }) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(metric.value.replace(/\D/g, ""), 10) || 0;
  const count = useCountUp(numericValue, 1800, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const icon = ICON_MAP[metric.icon] || <BarChart3 size={20} />;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1 1 220px",
        padding: "28px 24px",
        borderRadius: "12px",
        background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(15,23,42,0.95) 100%)",
        border: `1px solid ${hovered ? metric.color + "40" : "rgba(255,255,255,0.05)"}`,
        boxShadow: hovered ? `0 0 30px ${metric.color}15, 0 0 0 1px ${metric.color}30` : "0 0 0 1px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "all 0.35s ease",
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`, opacity: 0.6 }} />
      <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${metric.color}15`, border: `1px solid ${metric.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", color: metric.color }}>
        {icon}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "42px", fontWeight: 700, color: "#F9FAFB", lineHeight: 1, letterSpacing: "-1px", marginBottom: "8px" }}>
        <span style={{ color: metric.color }}>{metric.prefix}</span>
        {count}
        <span style={{ color: metric.color, fontSize: "28px" }}>{metric.suffix}</span>
      </div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 600, color: "#F9FAFB", marginBottom: "4px" }}>{metric.label}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9CA3AF", lineHeight: 1.5 }}>{metric.sublabel}</div>
    </div>
  );
}

export function MetricsSection() {
  const { data } = useSiteData();

  return (
    <section id="metrics" style={{ background: "#0F172A", padding: "80px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.4), transparent)" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00C2FF", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            // impacto mensurável
          </span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#F9FAFB", letterSpacing: "-0.5px", marginTop: "12px" }}>
            Impacto em Números
          </h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {data.metrics.map((metric, i) => (
            <MetricCard key={metric.id} metric={metric} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
