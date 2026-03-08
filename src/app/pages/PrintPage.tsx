import { useSiteData } from "../context/DataContext";
import { XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";

const chartData = [
  { year: "2019", maturidade: 20, impacto: 15 },
  { year: "2020", maturidade: 35, impacto: 30 },
  { year: "2021", maturidade: 52, impacto: 48 },
  { year: "2022", maturidade: 65, impacto: 62 },
  { year: "2023", maturidade: 78, impacto: 75 },
  { year: "2024", maturidade: 88, impacto: 85 },
  { year: "2025", maturidade: 95, impacto: 94 },
];

export function PrintPage({ embedded }: { embedded?: boolean }) {
  const { data } = useSiteData();
  const { personal, metrics, about, techStack, extraTechs, projects, philosophy } = data;

  return (
    <>
      <style>{`
        @page { size: A4; margin: 0; }
        @media print {
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          .landing-content { display: none !important; }
          .print-content { display: block !important; }
        }
        .print-page {
          width: 794px;
          margin: 0 auto;
          background: #0F172A;
          color: #F9FAFB;
          font-family: 'Inter', sans-serif;
        }
        .section-block {
          width: 794px;
          padding: 48px 48px;
          position: relative;
          overflow: hidden;
          page-break-inside: avoid;
        }
        .page-break {
          page-break-after: always;
        }
        .page-dark { background: #0F172A; }
        .page-alt { background: #111827; }
        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.15;
          margin-bottom: 24px;
        }
        .gradient-text {
          background: linear-gradient(90deg, #00C2FF, #7C3AED);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="print-page">

        {/* Hero + Metrics — Page 1 */}
        <div className="section-block page-dark page-break" style={{ paddingTop: "56px", paddingBottom: "40px" }}>
          <div style={{ position: "absolute", top: "10%", right: "10%", width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,194,255,0.06) 0%, transparent 70%)" }} />

          {personal.available && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "5px 14px", borderRadius: "100px", border: "1px solid rgba(0,194,255,0.25)", background: "rgba(0,194,255,0.06)", marginBottom: "24px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#00C2FF", letterSpacing: "0.05em" }}>Disponível para novos projetos</span>
            </div>
          )}

          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "48px", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "10px" }}>
            <span style={{ color: "#00C2FF" }}>{personal.firstName.charAt(0)}</span>{personal.firstName.slice(1)}
            <br />
            <span className="gradient-text">{personal.lastName}</span>
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "32px", height: "2px", background: "#00C2FF" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 500, color: "#9CA3AF" }}>{personal.title}</span>
          </div>

          <p style={{ fontSize: "13px", color: "#9CA3AF", maxWidth: "480px", lineHeight: 1.7, marginBottom: "10px" }}>
            {personal.subtitle}. {personal.headline}
          </p>

          <div style={{ display: "flex", gap: "20px", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace", color: "#9CA3AF", marginBottom: "36px" }}>
            <span>✉ {personal.email}</span>
            <span>📍 {personal.location}</span>
            <span>🔗 {personal.linkedinUrl.replace("https://www.linkedin.com/in/", "linkedin.com/in/")}</span>
          </div>

          {/* Metrics inline */}
          <div style={{ width: "120px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.4), transparent)", margin: "0 auto 24px" }} />
          <div className="section-label" style={{ color: "#00C2FF", textAlign: "center" }}>// impacto mensurável</div>
          <h2 className="section-title" style={{ fontSize: "24px", color: "#F9FAFB", textAlign: "center", marginBottom: "20px" }}>Impacto em Números</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {metrics.map((m) => (
              <div key={m.id} style={{ padding: "20px 18px", borderRadius: "10px", background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(15,23,42,0.95) 100%)", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`, opacity: 0.6 }} />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "30px", fontWeight: 700, color: "#F9FAFB", lineHeight: 1, marginBottom: "6px" }}>
                  <span style={{ color: m.color }}>{m.prefix}</span>{m.value}<span style={{ color: m.color, fontSize: "20px" }}>{m.suffix}</span>
                </div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#F9FAFB", marginBottom: "2px" }}>{m.label}</div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", lineHeight: 1.4 }}>{m.sublabel}</div>
              </div>
            ))}
          </div>
        </div>

        {/* About — Page 2 */}
        <div className="section-block page-alt page-break" style={{ paddingTop: "48px" }}>
          <div className="section-label" style={{ color: "#7C3AED" }}>// sobre mim</div>
          <h2 className="section-title" style={{ fontSize: "28px", color: "#F9FAFB" }}>
            Mentalidade <span className="gradient-text">Analítica</span>
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "36px" }}>
            <div>
              <p style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: 1.8, marginBottom: "16px" }}>{about.text1}</p>
              <p style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: 1.8, marginBottom: "24px" }}>{about.text2}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {about.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#10B981", fontSize: "13px" }}>✓</span>
                    <span style={{ fontSize: "12px", color: "#D1D5DB" }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(17,24,39,0.95) 100%)", border: "1px solid rgba(0,194,255,0.12)", borderRadius: "14px", padding: "20px" }}>
              <div style={{ marginBottom: "10px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#9CA3AF" }}>analytics.growth.chart</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 600, color: "#F9FAFB", marginTop: "4px" }}>{about.chartTitle}</h3>
              </div>
              <AreaChart width={310} height={200} data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="printColorMat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C2FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00C2FF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="printColorImp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="year" tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
                <Area type="monotone" dataKey="maturidade" name="Maturidade" stroke="#00C2FF" strokeWidth={2} fill="url(#printColorMat)" dot={{ fill: "#00C2FF", r: 2, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="impacto" name="Impacto" stroke="#7C3AED" strokeWidth={2} fill="url(#printColorImp)" dot={{ fill: "#7C3AED", r: 2, strokeWidth: 0 }} />
              </AreaChart>
              <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
                {[{ color: "#00C2FF", label: "Maturidade Técnica" }, { color: "#7C3AED", label: "Impacto no Negócio" }].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "16px", height: "2px", background: item.color, borderRadius: "1px" }} />
                    <span style={{ fontSize: "9px", color: "#9CA3AF" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack — Page 3 */}
        <div className="section-block page-dark page-break">
          <div className="section-label" style={{ color: "#00C2FF", textAlign: "center" }}>// competências técnicas</div>
          <h2 className="section-title" style={{ fontSize: "28px", color: "#F9FAFB", textAlign: "center" }}>Stack Tecnológica</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "18px" }}>
            {techStack.map((cat) => (
              <div key={cat.id} style={{ background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(15,23,42,0.95) 100%)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${cat.color}15`, border: `1px solid ${cat.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>{cat.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: "#F9FAFB" }}>{cat.title}</h3>
                    <div style={{ width: "20px", height: "2px", background: cat.color, borderRadius: "1px", marginTop: "2px" }} />
                  </div>
                </div>
                {cat.techs.map((tech, ti) => (
                  <div key={ti} style={{ marginBottom: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                      <span style={{ fontSize: "11px", color: "#D1D5DB" }}>{tech.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: cat.color }}>{tech.level}%</span>
                    </div>
                    <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${tech.level}%`, borderRadius: "2px", background: `linear-gradient(90deg, ${cat.color}99, ${cat.color})` }} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {extraTechs.length > 0 && (
            <div style={{ marginTop: "28px", textAlign: "center" }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: "#9CA3AF", letterSpacing: "0.1em", marginBottom: "10px" }}>TAMBÉM UTILIZO →</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                {extraTechs.map((t, i) => (
                  <span key={i} style={{ padding: "4px 10px", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", fontSize: "10px", color: "#D1D5DB" }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects — 2 per page */}
        <div className="section-block page-alt" style={{ paddingBottom: "24px" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div className="section-label" style={{ color: "#7C3AED" }}>// casos de sucesso</div>
            <h2 className="section-title" style={{ fontSize: "28px", color: "#F9FAFB" }}>Projetos Estratégicos</h2>
          </div>
        </div>

        {projects.map((project, pi) => (
          <div key={project.id} className={`section-block ${pi % 2 === 0 ? "page-alt" : "page-dark"}`} style={{ paddingTop: pi === 0 ? "0" : "24px", paddingBottom: "24px" }}>
            <div style={{ background: "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(15,23,42,0.98) 100%)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "14px", padding: "28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: "120px", height: "120px", background: `radial-gradient(circle at top right, ${project.color}08 0%, transparent 70%)` }} />

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: project.tagColor, background: `${project.tagColor}12`, border: `1px solid ${project.tagColor}25`, padding: "2px 8px", borderRadius: "4px", letterSpacing: "0.05em" }}>{project.tag}</span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 700, color: "#F9FAFB", marginTop: "8px", marginBottom: "3px", letterSpacing: "-0.3px" }}>{project.title}</h3>
                  <p style={{ fontSize: "12px", color: project.color, fontWeight: 500 }}>{project.subtitle}</p>
                </div>
              </div>

              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "16px" }} />

              <div style={{ display: "grid", gap: "12px", marginBottom: "20px" }}>
                {[
                  { label: "PROBLEMA", content: project.problem, color: "#F59E0B" },
                  { label: "SOLUÇÃO", content: project.solution, color: project.color },
                  { label: "RESULTADO", content: project.result, color: "#10B981" },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <div style={{ width: "3px", height: "10px", background: item.color, borderRadius: "2px" }} />
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: item.color, letterSpacing: "0.1em" }}>{item.label}</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: 1.6, paddingLeft: "9px" }}>{item.content}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`, gap: "10px", padding: "16px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)" }}>
                {project.metrics.map((metric, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "17px", fontWeight: 700, color: project.color, marginBottom: "3px" }}>{metric.value}</div>
                    <div style={{ fontSize: "9px", color: "#9CA3AF", lineHeight: 1.4 }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Philosophy + Contact — Last page */}
        <div className="section-block page-dark" style={{ paddingTop: "48px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div className="section-label" style={{ color: "#00C2FF" }}>// filosofia de trabalho</div>
            <h2 className="section-title" style={{ fontSize: "26px", color: "#F9FAFB" }}>Data-Driven Thinking</h2>
          </div>

          <div style={{ padding: "32px 28px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(15,23,42,0.98) 100%)", border: "1px solid rgba(0,194,255,0.12)", marginBottom: "32px", textAlign: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, #00C2FF, #7C3AED, transparent)", opacity: 0.4 }} />
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 600, color: "#F9FAFB", lineHeight: 1.5, letterSpacing: "-0.3px" }}>
              "{philosophy.quote}"
            </p>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9CA3AF", marginTop: "12px" }}>— {philosophy.author}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "40px" }}>
            {philosophy.principles.map((p, i) => (
              <div key={i} style={{ padding: "16px", borderRadius: "10px", background: "rgba(17,24,39,0.6)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "22px", fontWeight: 700, color: "rgba(0,194,255,0.15)", lineHeight: 1, marginBottom: "8px" }}>{p.number}</div>
                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, color: "#F9FAFB", marginBottom: "5px" }}>{p.title}</h4>
                <p style={{ fontSize: "10px", color: "#9CA3AF", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 700, color: "#F9FAFB" }}>{personal.firstName} {personal.lastName}</p>
              <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "3px" }}>{personal.title}</p>
            </div>
            <div style={{ textAlign: "right", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "#9CA3AF", lineHeight: 1.8 }}>
              <div>{personal.email}</div>
              <div>{personal.location}</div>
              <div>{personal.linkedinUrl.replace("https://www.", "")}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
