import { Download, Linkedin, ChevronDown } from "lucide-react";
import { useSiteData } from "../context/DataContext";
import { downloadFile } from "../utils/downloadFile";

function AnimatedGridLines() {
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }}
    >
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00C2FF" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function LineChartDecor() {
  const points = [[0,320],[80,290],[160,260],[240,230],[320,200],[400,170],[480,140],[560,110],[640,80],[720,60],[800,40],[900,20]];
  const polyline = points.map((p) => p.join(",")).join(" ");
  const points2 = [[0,380],[100,350],[200,310],[300,270],[400,230],[500,200],[600,170],[700,150],[800,120],[900,95]];
  const polyline2 = points2.map((p) => p.join(",")).join(" ");
  const points3 = [[0,420],[80,400],[180,370],[260,330],[360,300],[460,265],[560,235],[680,200],[780,175],[900,145]];
  const polyline3 = points3.map((p) => p.join(",")).join(" ");

  return (
    <svg viewBox="0 0 900 440" preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", right: 0, bottom: 0, width: "65%", height: "70%", opacity: 0.18, pointerEvents: "none" }}>
      <defs>
        <linearGradient id="lineGrad1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00C2FF" stopOpacity="0" />
          <stop offset="40%" stopColor="#00C2FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="lineGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0" />
          <stop offset="40%" stopColor="#7C3AED" stopOpacity="1" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="lineGrad3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
          <stop offset="40%" stopColor="#10B981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="areaGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00C2FF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${polyline} 900,440 0,440`} fill="url(#areaGrad1)" />
      <polyline points={polyline} fill="none" stroke="url(#lineGrad1)" strokeWidth="2" />
      <polyline points={polyline2} fill="none" stroke="url(#lineGrad2)" strokeWidth="1.5" />
      <polyline points={polyline3} fill="none" stroke="url(#lineGrad3)" strokeWidth="1.5" />
      {points.filter((_, i) => i % 3 === 0).map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="#00C2FF" opacity="0.8" />
      ))}
    </svg>
  );
}

export function HeroSection() {
  const { data } = useSiteData();
  const { personal } = data;

  const handleDownload = () => {
    downloadFile("/Vilcimar_Portfolio.pdf", "Vilcimar_Portfolio.pdf");
  };
  const firstLetter = personal.firstName.charAt(0);
  const restFirst = personal.firstName.slice(1);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", background: "linear-gradient(135deg, #0F172A 0%, #111827 50%, #0F172A 100%)", display: "flex", alignItems: "center", overflow: "hidden" }}>
      <AnimatedGridLines />
      <LineChartDecor />
      <div style={{ position: "absolute", top: "20%", right: "15%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,194,255,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        {personal.available && (
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "100px", border: "1px solid rgba(0,194,255,0.25)", background: "rgba(0,194,255,0.06)", marginBottom: "32px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", animation: "pulse 2s ease-in-out infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00C2FF", letterSpacing: "0.05em" }}>
              Disponível para novos projetos
            </span>
          </div>
        )}

        {/* Name */}
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 700, color: "#F9FAFB", lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "12px" }}>
          <span style={{ color: "#00C2FF" }}>{firstLetter}</span>{restFirst}
          <br />
          <span style={{ background: "linear-gradient(90deg, #00C2FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {personal.lastName}
          </span>
        </h1>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div style={{ width: "32px", height: "2px", background: "#00C2FF" }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(16px, 2vw, 22px)", fontWeight: 500, color: "#9CA3AF", letterSpacing: "0.02em" }}>
            {personal.title}
          </span>
        </div>

        {/* Headline */}
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)", color: "#9CA3AF", maxWidth: "520px", lineHeight: 1.7, marginBottom: "48px" }}>
          {personal.subtitle}. {personal.headline}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button
            onClick={handleDownload}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: "#00C2FF", color: "#0F172A", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer", textDecoration: "none", transition: "all 0.25s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#33CEFF"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,194,255,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#00C2FF"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Download size={16} />
            Download
          </button>
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "8px", background: "transparent", color: "#F9FAFB", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(249,250,251,0.15)", transition: "all 0.25s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00C2FF"; e.currentTarget.style.color = "#00C2FF"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,194,255,0.15)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(249,250,251,0.15)"; e.currentTarget.style.color = "#F9FAFB"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>

        <div style={{ position: "absolute", bottom: "-40px", left: "0", display: "flex", alignItems: "center", gap: "8px", color: "#9CA3AF", animation: "bounce 2s ease-in-out infinite" }}>
          <ChevronDown size={18} style={{ color: "#00C2FF" }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", letterSpacing: "0.1em" }}>SCROLL</span>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}
