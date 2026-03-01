import { useEffect, useRef, useState } from "react";
import { useSiteData } from "../context/DataContext";

export function PhilosophySection() {
  const { data } = useSiteData();
  const { philosophy } = data;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ background: "#0F172A", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "800px", height: "600px", background: "radial-gradient(ellipse, rgba(0,194,255,0.04) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.4), transparent)" }} />

      <div ref={ref} style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s ease" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00C2FF", letterSpacing: "0.15em", textTransform: "uppercase" }}>// filosofia de trabalho</span>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#F9FAFB", letterSpacing: "-0.5px", marginTop: "16px", marginBottom: "56px" }}>Data-Driven Thinking</h2>

        {/* Quote */}
        <div style={{ position: "relative", padding: "56px 48px", borderRadius: "20px", background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(15,23,42,0.98) 100%)", border: "1px solid rgba(0,194,255,0.12)", marginBottom: "64px", boxShadow: "0 0 60px rgba(0,194,255,0.05), 0 0 120px rgba(124,58,237,0.05)" }}>
          <div style={{ position: "absolute", top: "-20px", left: "48px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "100px", color: "#00C2FF", opacity: 0.15, lineHeight: 1, userSelect: "none" }}>"</div>
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, #00C2FF, #7C3AED, transparent)", opacity: 0.4 }} />
          <div style={{ position: "absolute", bottom: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, #7C3AED, #00C2FF, transparent)", opacity: 0.4 }} />
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 600, color: "#F9FAFB", lineHeight: 1.5, letterSpacing: "-0.3px", position: "relative", zIndex: 1 }}>
            "{philosophy.quote}"
          </p>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#9CA3AF", marginTop: "24px" }}>— {philosophy.author}</p>
        </div>

        {/* Principles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", textAlign: "left" }}>
          {philosophy.principles.map((p, i) => (
            <div
              key={i}
              style={{ padding: "24px", borderRadius: "12px", background: "rgba(17,24,39,0.6)", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.3s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(0,194,255,0.2)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,194,255,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "28px", fontWeight: 700, color: "rgba(0,194,255,0.15)", lineHeight: 1, marginBottom: "12px" }}>{p.number}</div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 700, color: "#F9FAFB", marginBottom: "8px" }}>{p.title}</h4>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#9CA3AF", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
