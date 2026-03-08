import { SiteData } from "../context/DataContext";

const PAGE_W = 595;
const PAGE_H = 842;
const PAD = 40;
const CONTENT_W = PAGE_W - PAD * 2;

const COLORS = {
  bg1: "#0F172A",
  bg2: "#111827",
  card: "rgba(17,24,39,0.95)",
  cyan: "#00C2FF",
  purple: "#7C3AED",
  green: "#10B981",
  amber: "#F59E0B",
  white: "#F9FAFB",
  gray: "#9CA3AF",
  lightGray: "#D1D5DB",
  darkBorder: "rgba(255,255,255,0.06)",
};

function PageWrapper({ children, bg = COLORS.bg1 }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      className="pdf-page"
      style={{
        width: `${PAGE_W}px`,
        height: `${PAGE_H}px`,
        background: bg,
        padding: `${PAD}px`,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        pageBreakAfter: "always",
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text, color = COLORS.cyan }: { text: string; color?: string }) {
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color, letterSpacing: "0.15em", textTransform: "uppercase" as const }}>
      {text}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: COLORS.white, letterSpacing: "-0.5px", marginTop: "6px", marginBottom: "16px" }}>
      {children}
    </h2>
  );
}

// Page 1: Hero
function HeroPage({ data }: { data: SiteData }) {
  const { personal } = data;
  return (
    <PageWrapper>
      <div style={{ position: "absolute", top: 0, right: 0, width: "250px", height: "250px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,194,255,0.08) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
        {personal.available && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "100px", border: "1px solid rgba(0,194,255,0.25)", background: "rgba(0,194,255,0.06)", marginBottom: "24px", alignSelf: "flex-start" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: COLORS.green }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: COLORS.cyan, letterSpacing: "0.05em" }}>
              Disponível para novos projetos
            </span>
          </div>
        )}

        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "52px", fontWeight: 700, color: COLORS.white, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "8px" }}>
          <span style={{ color: COLORS.cyan }}>{personal.firstName.charAt(0)}</span>
          {personal.firstName.slice(1)}
          <br />
          <span style={{ color: COLORS.purple }}>{personal.lastName}</span>
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{ width: "28px", height: "2px", background: COLORS.cyan }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 500, color: COLORS.gray }}>{personal.title}</span>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: COLORS.gray, maxWidth: "380px", lineHeight: 1.7, marginBottom: "32px" }}>
          {personal.subtitle}. {personal.headline}
        </p>

        <div style={{ display: "flex", gap: "16px", fontSize: "11px", fontFamily: "'Inter', sans-serif" }}>
          <span style={{ color: COLORS.lightGray }}>✉ {personal.email}</span>
          <span style={{ color: COLORS.lightGray }}>📍 {personal.location}</span>
        </div>

        {/* Decorative line chart */}
        <svg viewBox="0 0 515 200" style={{ position: "absolute", right: 0, bottom: "40px", width: "100%", height: "180px", opacity: 0.12 }}>
          <polyline points="0,180 80,160 160,140 240,120 320,100 400,80 515,40" fill="none" stroke={COLORS.cyan} strokeWidth="1.5" />
          <polyline points="0,190 100,170 200,145 300,120 400,95 515,70" fill="none" stroke={COLORS.purple} strokeWidth="1" />
        </svg>
      </div>
    </PageWrapper>
  );
}

// Page 2: Metrics
function MetricsPage({ data }: { data: SiteData }) {
  return (
    <PageWrapper bg={COLORS.bg1}>
      <SectionLabel text="// impacto mensurável" />
      <SectionTitle>Impacto em Números</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "12px" }}>
        {data.metrics.map((m) => (
          <div key={m.id} style={{ padding: "24px", borderRadius: "12px", background: COLORS.card, border: `1px solid ${COLORS.darkBorder}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${m.color}, transparent)`, opacity: 0.6 }} />
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "36px", fontWeight: 700, color: COLORS.white, lineHeight: 1, marginBottom: "8px" }}>
              <span style={{ color: m.color }}>{m.prefix}</span>{m.value}<span style={{ color: m.color, fontSize: "24px" }}>{m.suffix}</span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: COLORS.white, marginBottom: "4px" }}>{m.label}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: COLORS.gray }}>{m.sublabel}</div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

// Page 3: About + Highlights
function AboutPage({ data }: { data: SiteData }) {
  const { about } = data;
  const chartData = [
    { year: "2019", mat: 20, imp: 15 },
    { year: "2020", mat: 35, imp: 30 },
    { year: "2021", mat: 52, imp: 48 },
    { year: "2022", mat: 65, imp: 62 },
    { year: "2023", mat: 78, imp: 75 },
    { year: "2024", mat: 88, imp: 85 },
    { year: "2025", mat: 95, imp: 94 },
  ];
  const maxVal = 100;
  const chartW = CONTENT_W;
  const chartH = 160;
  const padL = 30;
  const padB = 20;
  const plotW = chartW - padL;
  const plotH = chartH - padB;

  const toX = (i: number) => padL + (i / (chartData.length - 1)) * plotW;
  const toY = (v: number) => plotH - (v / maxVal) * plotH;

  const matPoints = chartData.map((d, i) => `${toX(i)},${toY(d.mat)}`).join(" ");
  const impPoints = chartData.map((d, i) => `${toX(i)},${toY(d.imp)}`).join(" ");

  return (
    <PageWrapper bg={COLORS.bg2}>
      <SectionLabel text="// sobre mim" color={COLORS.purple} />
      <SectionTitle>Mentalidade Analítica</SectionTitle>

      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: COLORS.gray, lineHeight: 1.7, marginBottom: "12px" }}>{about.text1}</p>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: COLORS.gray, lineHeight: 1.7, marginBottom: "20px" }}>{about.text2}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
        {about.highlights.map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: `${COLORS.green}20`, border: `1px solid ${COLORS.green}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", color: COLORS.green, flexShrink: 0 }}>✓</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: COLORS.lightGray }}>{h}</span>
          </div>
        ))}
      </div>

      {/* Static chart */}
      <div style={{ padding: "20px", borderRadius: "12px", background: COLORS.card, border: `1px solid rgba(0,194,255,0.12)` }}>
        <div style={{ marginBottom: "8px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: COLORS.gray }}>analytics.growth.chart</span>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 600, color: COLORS.white, marginTop: "2px" }}>{about.chartTitle}</h3>
        </div>
        <svg width={chartW} height={chartH} viewBox={`0 0 ${chartW} ${chartH}`}>
          <defs>
            <linearGradient id="pdfAreaCyan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.cyan} stopOpacity="0.2" />
              <stop offset="100%" stopColor={COLORS.cyan} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((v) => (
            <line key={v} x1={padL} y1={toY(v)} x2={chartW} y2={toY(v)} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          ))}
          {/* Area fill */}
          <polygon points={`${matPoints} ${toX(chartData.length - 1)},${plotH} ${padL},${plotH}`} fill="url(#pdfAreaCyan)" />
          {/* Lines */}
          <polyline points={matPoints} fill="none" stroke={COLORS.cyan} strokeWidth="1.5" />
          <polyline points={impPoints} fill="none" stroke={COLORS.purple} strokeWidth="1.5" />
          {/* Dots */}
          {chartData.map((d, i) => (
            <g key={i}>
              <circle cx={toX(i)} cy={toY(d.mat)} r="2.5" fill={COLORS.cyan} />
              <circle cx={toX(i)} cy={toY(d.imp)} r="2" fill={COLORS.purple} />
            </g>
          ))}
          {/* X labels */}
          {chartData.map((d, i) => (
            <text key={i} x={toX(i)} y={chartH - 2} textAnchor="middle" fill={COLORS.gray} fontSize="8" fontFamily="'JetBrains Mono', monospace">{d.year}</text>
          ))}
          {/* Y labels */}
          {[0, 50, 100].map((v) => (
            <text key={v} x={padL - 4} y={toY(v) + 3} textAnchor="end" fill={COLORS.gray} fontSize="7" fontFamily="'JetBrains Mono', monospace">{v}%</text>
          ))}
        </svg>
        <div style={{ display: "flex", gap: "16px", marginTop: "6px" }}>
          {[{ color: COLORS.cyan, label: "Maturidade Técnica" }, { color: COLORS.purple, label: "Impacto no Negócio" }].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: "14px", height: "2px", background: item.color, borderRadius: "1px" }} />
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "8px", color: COLORS.gray }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

// Page 4: Tech Stack
function StackPage({ data }: { data: SiteData }) {
  return (
    <PageWrapper bg={COLORS.bg1}>
      <SectionLabel text="// competências técnicas" />
      <SectionTitle>Stack Tecnológica</SectionTitle>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
        {data.techStack.map((cat) => (
          <div key={cat.id} style={{ padding: "16px", borderRadius: "10px", background: COLORS.card, border: `1px solid ${COLORS.darkBorder}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <span style={{ fontSize: "16px" }}>{cat.icon}</span>
              <div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, color: COLORS.white }}>{cat.title}</h3>
                <div style={{ width: "16px", height: "1.5px", background: cat.color, borderRadius: "1px", marginTop: "2px" }} />
              </div>
            </div>
            {cat.techs.map((tech, ti) => (
              <div key={ti} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: COLORS.lightGray }}>{tech.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: cat.color }}>{tech.level}%</span>
                </div>
                <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${tech.level}%`, borderRadius: "2px", background: `linear-gradient(90deg, ${cat.color}99, ${cat.color})` }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {data.extraTechs.length > 0 && (
        <div>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: COLORS.gray, letterSpacing: "0.1em", marginBottom: "8px" }}>TAMBÉM UTILIZO →</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {data.extraTechs.map((tech, i) => (
              <span key={i} style={{ padding: "4px 10px", borderRadius: "4px", border: `1px solid ${COLORS.darkBorder}`, background: "rgba(255,255,255,0.03)", fontFamily: "'Inter', sans-serif", fontSize: "9px", color: COLORS.lightGray }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </PageWrapper>
  );
}

// Page 5+: Projects (2 per page)
function ProjectsPage({ projects }: { projects: SiteData["projects"] }) {
  return (
    <PageWrapper bg={COLORS.bg2}>
      <SectionLabel text="// casos de sucesso" color={COLORS.purple} />
      <SectionTitle>Projetos Estratégicos</SectionTitle>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {projects.map((p) => (
          <div key={p.id} style={{ padding: "18px", borderRadius: "10px", background: COLORS.card, border: `1px solid ${COLORS.darkBorder}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "100px", height: "100px", background: `radial-gradient(circle at top right, ${p.color}10 0%, transparent 70%)` }} />

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <div>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: p.tagColor, background: `${p.tagColor}12`, border: `1px solid ${p.tagColor}25`, padding: "2px 6px", borderRadius: "3px" }}>{p.tag}</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 700, color: COLORS.white, marginTop: "4px" }}>{p.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: p.color, fontWeight: 500 }}>{p.subtitle}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "10px" }}>
              {[
                { label: "PROBLEMA", content: p.problem, color: COLORS.amber },
                { label: "SOLUÇÃO", content: p.solution, color: p.color },
                { label: "RESULTADO", content: p.result, color: COLORS.green },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "3px" }}>
                    <div style={{ width: "2px", height: "8px", background: item.color, borderRadius: "1px" }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "7px", color: item.color, letterSpacing: "0.08em" }}>{item.label}</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "8px", color: COLORS.gray, lineHeight: 1.5 }}>{item.content}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${p.metrics.length}, 1fr)`, gap: "8px", padding: "10px", background: "rgba(0,0,0,0.2)", borderRadius: "6px" }}>
              {p.metrics.map((metric, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 700, color: p.color }}>{metric.value}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "7px", color: COLORS.gray }}>{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

// Page 6: Philosophy + Contact
function PhilosophyContactPage({ data }: { data: SiteData }) {
  const { philosophy, personal } = data;
  return (
    <PageWrapper bg={COLORS.bg1}>
      <SectionLabel text="// filosofia de trabalho" />
      <SectionTitle>Data-Driven Thinking</SectionTitle>

      {/* Quote */}
      <div style={{ padding: "28px 24px", borderRadius: "14px", background: COLORS.card, border: "1px solid rgba(0,194,255,0.12)", marginBottom: "24px", position: "relative" }}>
        <div style={{ position: "absolute", top: "-12px", left: "24px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "60px", color: COLORS.cyan, opacity: 0.15, lineHeight: 1 }}>"</div>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 600, color: COLORS.white, lineHeight: 1.5, position: "relative", zIndex: 1 }}>
          "{philosophy.quote}"
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: COLORS.gray, marginTop: "12px" }}>— {philosophy.author}</p>
      </div>

      {/* Principles */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "40px" }}>
        {philosophy.principles.map((p, i) => (
          <div key={i} style={{ padding: "16px", borderRadius: "10px", background: "rgba(17,24,39,0.6)", border: `1px solid ${COLORS.darkBorder}` }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", fontWeight: 700, color: "rgba(0,194,255,0.15)", marginBottom: "6px" }}>{p.number}</div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, color: COLORS.white, marginBottom: "4px" }}>{p.title}</h4>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: COLORS.gray, lineHeight: 1.5 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div style={{ borderTop: `1px solid ${COLORS.darkBorder}`, paddingTop: "24px" }}>
        <SectionLabel text="// vamos conversar" />
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, color: COLORS.white, marginTop: "6px", marginBottom: "16px" }}>
          Pronto para transformar dados em decisões?
        </h3>
        <div style={{ display: "flex", gap: "24px", fontFamily: "'Inter', sans-serif", fontSize: "11px" }}>
          <div>
            <span style={{ color: COLORS.gray }}>E-mail</span>
            <p style={{ color: COLORS.white, fontWeight: 600, marginTop: "2px" }}>{personal.email}</p>
          </div>
          <div>
            <span style={{ color: COLORS.gray }}>LinkedIn</span>
            <p style={{ color: COLORS.cyan, fontWeight: 600, marginTop: "2px" }}>{personal.linkedinUrl}</p>
          </div>
          <div>
            <span style={{ color: COLORS.gray }}>Localização</span>
            <p style={{ color: COLORS.white, fontWeight: 600, marginTop: "2px" }}>{personal.location}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ position: "absolute", bottom: `${PAD}px`, left: `${PAD}px`, right: `${PAD}px` }}>
        <div style={{ borderTop: `1px solid ${COLORS.darkBorder}`, paddingTop: "12px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color: COLORS.gray }}>
            © 2025 <span style={{ color: COLORS.cyan }}>{personal.firstName} {personal.lastName}</span> · {personal.title}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: "#4B5563" }}>Transformando dados em decisões estratégicas.</span>
        </div>
      </div>
    </PageWrapper>
  );
}

// Main component that renders all pages
export function PortfolioPDF({ data }: { data: SiteData }) {
  // Split projects into chunks of 2 per page
  const projectChunks: SiteData["projects"][] = [];
  for (let i = 0; i < data.projects.length; i += 2) {
    projectChunks.push(data.projects.slice(i, i + 2));
  }

  return (
    <div id="portfolio-pdf-root" style={{ position: "absolute", left: "-9999px", top: 0 }}>
      <HeroPage data={data} />
      <MetricsPage data={data} />
      <AboutPage data={data} />
      <StackPage data={data} />
      {projectChunks.map((chunk, i) => (
        <ProjectsPage key={i} projects={chunk} />
      ))}
      <PhilosophyContactPage data={data} />
    </div>
  );
}
