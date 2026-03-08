import { useEffect, useRef, useState } from "react";
import { useSiteData } from "../context/DataContext";
import { RenderIcon } from "./IconPicker";

function TechChip({ name, color }: { name: string; color: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        padding: "7px 14px", borderRadius: "6px",
        border: `1px solid ${hovered ? color + "60" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? `${color}10` : "rgba(255,255,255,0.03)",
        cursor: "default", transition: "all 0.2s ease",
        boxShadow: hovered ? `0 0 12px ${color}25` : "none",
      }}
    >
      <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: hovered ? color : "rgba(255,255,255,0.2)", transition: "background 0.2s ease" }} />
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: hovered ? color : "#D1D5DB", transition: "color 0.2s ease", whiteSpace: "nowrap" }}>
        {name}
      </span>
    </div>
  );
}

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setWidth(level), 200); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#D1D5DB" }}>{name}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color }}>{level}%</span>
      </div>
      <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${width}%`, borderRadius: "2px", background: `linear-gradient(90deg, ${color}99, ${color})`, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)", boxShadow: `0 0 8px ${color}60` }} />
      </div>
    </div>
  );
}

export function TechStackSection() {
  const { data } = useSiteData();
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stack" style={{ background: "#0F172A", padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.4), transparent)" }} />
      <div ref={ref} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00C2FF", letterSpacing: "0.15em", textTransform: "uppercase" }}>// competências técnicas</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 700, color: "#F9FAFB", letterSpacing: "-0.5px", marginTop: "12px" }}>Stack Tecnológica</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "#9CA3AF", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0" }}>
            Ferramentas e tecnologias que compõem meu arsenal analítico.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
          {data.techStack.map((cat, catIndex) => (
            <div
              key={cat.id}
              style={{
                background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(15,23,42,0.95) 100%)",
                border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px",
                opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.6s ease ${catIndex * 120}ms`, position: "relative", overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px", background: `radial-gradient(circle at top right, ${cat.color}15 0%, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: `${cat.color}15`, border: `1px solid ${cat.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{cat.icon}</div>
                <div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 700, color: "#F9FAFB", marginBottom: "2px" }}>{cat.title}</h3>
                  <div style={{ width: "24px", height: "2px", background: cat.color, borderRadius: "1px" }} />
                </div>
              </div>
              {cat.techs.map((tech, techIndex) => (
                <SkillBar key={techIndex} name={tech.name} level={tech.level} color={cat.color} />
              ))}
            </div>
          ))}
        </div>

        {data.extraTechs.length > 0 && (
          <div style={{ marginTop: "48px" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9CA3AF", letterSpacing: "0.1em", marginBottom: "16px", textAlign: "center" }}>TAMBÉM UTILIZO →</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {data.extraTechs.map((tech, i) => <TechChip key={i} name={tech} color="#00C2FF" />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
