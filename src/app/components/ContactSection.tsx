import { useEffect, useRef, useState } from "react";
import { Linkedin, Mail, MapPin, ArrowUpRight, Download, Loader2 } from "lucide-react";
import { useSiteData } from "../context/DataContext";
import { generatePDF } from "../utils/generatePDF";

function DownloadButton({ fileName }: { fileName?: string }) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    if (generating) return;
    setGenerating(true);
    try {
      await generatePDF(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={generating}
      style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 36px", borderRadius: "8px", background: "transparent", color: "#F9FAFB", fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 600, border: "1px solid rgba(255,255,255,0.12)", cursor: generating ? "wait" : "pointer", textDecoration: "none", transition: "all 0.25s ease", opacity: generating ? 0.8 : 1 }}
      onMouseEnter={(e) => { if (!generating) { e.currentTarget.style.borderColor = "rgba(0,194,255,0.3)"; e.currentTarget.style.color = "#00C2FF"; e.currentTarget.style.transform = "translateY(-2px)"; } }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#F9FAFB"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {generating ? <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Download size={18} />}
      {generating ? "Gerando..." : "Download"}
    </button>
  );
}

export function ContactSection() {
  const { data } = useSiteData();
  const { personal } = data;
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

  const contacts = [
    { icon: <Linkedin size={20} />, label: "LinkedIn", value: personal.linkedinUrl.replace("https://www.linkedin.com/in/", "/in/") || "/in/vilcimar-pessoa", href: personal.linkedinUrl, color: "#00C2FF", desc: "Conecte-se comigo" },
    { icon: <Mail size={20} />, label: "E-mail", value: personal.email, href: `mailto:${personal.email}`, color: "#7C3AED", desc: "Envie uma mensagem" },
    { icon: <MapPin size={20} />, label: "Localização", value: personal.location, href: null, color: "#10B981", desc: "Disponível remotamente" },
  ];

  return (
    <section id="contact" style={{ background: "#111827", padding: "100px 24px 60px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "200px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,194,255,0.4), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "350px", height: "350px", background: "radial-gradient(circle, rgba(0,194,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, right: 0, width: "350px", height: "350px", background: "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div ref={ref} style={{ maxWidth: "900px", margin: "0 auto", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.7s ease" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#00C2FF", letterSpacing: "0.15em", textTransform: "uppercase" }}>// vamos conversar</span>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#F9FAFB", letterSpacing: "-1px", marginTop: "16px", lineHeight: 1.1 }}>
            Pronto para transformar<br />
            <span style={{ background: "linear-gradient(90deg, #00C2FF, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>dados em decisões?</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#9CA3AF", marginTop: "20px", maxWidth: "480px", margin: "20px auto 0", lineHeight: 1.7 }}>
            Estou disponível para projetos de BI, automação e arquitetura analítica. Vamos criar algo com impacto real.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "48px" }}>
          {contacts.map((contact, i) => (
            <div
              key={i}
              style={{ padding: "28px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(17,24,39,0.95) 100%)", border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s ease", textAlign: "center", cursor: contact.href ? "pointer" : "default" }}
              onClick={() => contact.href && window.open(contact.href, "_blank")}
              onMouseEnter={(e) => { if (contact.href) { e.currentTarget.style.borderColor = `${contact.color}40`; e.currentTarget.style.boxShadow = `0 0 30px ${contact.color}12`; e.currentTarget.style.transform = "translateY(-4px)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ width: "52px", height: "52px", borderRadius: "12px", background: `${contact.color}15`, border: `1px solid ${contact.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: contact.color, margin: "0 auto 16px" }}>{contact.icon}</div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#9CA3AF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>{contact.label}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 600, color: "#F9FAFB", marginBottom: "6px" }}>{contact.value}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: contact.color }}>{contact.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "16px 36px", borderRadius: "8px", background: "linear-gradient(135deg, #00C2FF, #0099CC)", color: "#0F172A", fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 700, textDecoration: "none", transition: "all 0.25s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 40px rgba(0,194,255,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <Linkedin size={18} /> Conectar no LinkedIn <ArrowUpRight size={16} />
          </a>
          <DownloadButton fileName={personal.cvUrl} />
        </div>
      </div>

      <div style={{ maxWidth: "900px", margin: "60px auto 0", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#9CA3AF" }}>
          © {new Date().getFullYear()} <span style={{ color: "#00C2FF" }}>{personal.firstName} {personal.lastName}</span> · {personal.title}
        </p>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#4B5563" }}>Transformando dados em decisões estratégicas.</p>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
