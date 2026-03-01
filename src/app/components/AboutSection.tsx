import { useEffect, useRef, useState } from "react";
import { XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from "recharts";
import { CheckCircle2 } from "lucide-react";
import { useSiteData } from "../context/DataContext";

const chartData = [
  { year: "2019", maturidade: 20, impacto: 15 },
  { year: "2020", maturidade: 35, impacto: 30 },
  { year: "2021", maturidade: 52, impacto: 48 },
  { year: "2022", maturidade: 65, impacto: 62 },
  { year: "2023", maturidade: 78, impacto: 75 },
  { year: "2024", maturidade: 88, impacto: 85 },
  { year: "2025", maturidade: 95, impacto: 94 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "#111827", border: "1px solid rgba(0,194,255,0.2)", borderRadius: "8px", padding: "10px 14px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9CA3AF", marginBottom: "4px" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: p.color, margin: "2px 0" }}>
            {p.name}: <strong>{p.value}%</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AboutSection() {
  const { data } = useSiteData();
  const { about } = data;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" style={{ background: "#111827", padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)" }} />
      <div
        ref={ref}
        style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "64px", alignItems: "center",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease",
        }}
      >
        {/* Left */}
        <div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#7C3AED", letterSpacing: "0.15em", textTransform: "uppercase" }}>// sobre mim</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, color: "#F9FAFB", letterSpacing: "-0.5px", marginTop: "12px", marginBottom: "24px", lineHeight: 1.2 }}>
            Mentalidade<br />
            <span style={{ background: "linear-gradient(90deg, #7C3AED, #00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Analítica</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#9CA3AF", lineHeight: 1.8, marginBottom: "24px" }}>{about.text1}</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#9CA3AF", lineHeight: 1.8, marginBottom: "36px" }}>{about.text2}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {about.highlights.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckCircle2 size={16} style={{ color: "#10B981", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#D1D5DB" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chart */}
        <div style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(17,24,39,0.95) 100%)", border: "1px solid rgba(0,194,255,0.12)", borderRadius: "16px", padding: "28px", boxShadow: "0 0 40px rgba(0,194,255,0.05)" }}>
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9CA3AF" }}>analytics.growth.chart</span>
              <div style={{ display: "flex", gap: "6px" }}>
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />)}
              </div>
            </div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: "#F9FAFB" }}>{about.chartTitle}</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorImp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="year" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="maturidade" name="Maturidade" stroke="#00C2FF" strokeWidth={2} fill="url(#colorMat)" dot={{ fill: "#00C2FF", r: 3, strokeWidth: 0 }} />
              <Area type="monotone" dataKey="impacto" name="Impacto" stroke="#7C3AED" strokeWidth={2} fill="url(#colorImp)" dot={{ fill: "#7C3AED", r: 3, strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: "20px", marginTop: "12px" }}>
            {[{ color: "#00C2FF", label: "Maturidade Técnica" }, { color: "#7C3AED", label: "Impacto no Negócio" }].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "20px", height: "2px", background: item.color, borderRadius: "1px" }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#9CA3AF" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
