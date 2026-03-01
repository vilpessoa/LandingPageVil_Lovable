import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Download, ArrowUpRight } from "lucide-react";
import type { PersonalData } from "@/types/site";

interface Props { personal: PersonalData; }

export function ContactSection({ personal }: Props) {
  return (
    <section id="contact" style={{ padding: "120px 0 80px", background: "hsl(var(--background))", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 300,
        background: "radial-gradient(ellipse, hsl(var(--lime) / 0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 72 }}
        >
          <span className="eyebrow" style={{ justifyContent: "center", marginBottom: 16, display: "flex" }}>Vamos conversar</span>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.03em",
            lineHeight: 1, marginBottom: 12,
            color: "hsl(var(--foreground))",
          }}>
            Pronto para transformar
          </h2>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(40px, 6vw, 72px)", letterSpacing: "-0.03em",
            lineHeight: 1, marginBottom: 24,
          }}
            className="text-gradient"
          >
            dados em decisões?
          </h2>
          <p style={{ fontSize: 16, color: "hsl(var(--muted-foreground))", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
            Disponível para projetos de BI, automação e arquitetura analítica. Vamos construir algo com impacto real.
          </p>
        </motion.div>

        {/* Contact options */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginBottom: 48 }}>
          {[
            { icon: <Linkedin size={20} />, label: "LinkedIn", value: personal.linkedinUrl.replace("https://", ""), link: personal.linkedinUrl, accent: "hsl(var(--lime))" },
            { icon: <Mail size={20} />, label: "E-mail", value: personal.email, link: `mailto:${personal.email}`, accent: "hsl(var(--violet))" },
            { icon: <MapPin size={20} />, label: "Localização", value: personal.location, link: null, accent: "hsl(var(--sky))" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="card-hover"
              style={{
                padding: "28px 24px", borderRadius: 16,
                background: "hsl(var(--card))",
                borderWidth: 1, borderStyle: "solid", borderColor: "hsl(var(--border))",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, marginBottom: 16,
                background: `${item.accent.replace(")", " / 0.1)")}`,
                borderWidth: 1, borderStyle: "solid",
                borderColor: item.accent.replace(")", " / 0.2)"),
                display: "flex", alignItems: "center", justifyContent: "center",
                color: item.accent,
              }}>
                {item.icon}
              </div>
              <p style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "hsl(var(--muted-foreground))", marginBottom: 6 }}>{item.label}</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.value}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 13, color: item.accent, textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Acessar <ArrowUpRight size={12} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 8,
            background: "hsl(var(--lime))", color: "hsl(var(--background))",
            fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 15,
            textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--glow-lime)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            <Linkedin size={16} /> Conectar no LinkedIn
          </a>
          <a href={personal.cvUrl} style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 8,
            background: "transparent",
            borderWidth: 1, borderStyle: "solid", borderColor: "hsl(var(--border))",
            color: "hsl(var(--foreground))",
            fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 15,
            textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "hsl(var(--lime) / 0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.transform = ""; }}
          >
            <Download size={15} /> Baixar CV
          </a>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid hsl(var(--border))", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 14, color: "hsl(var(--muted-foreground))" }}>
            © 2025 <span className="text-gradient" style={{ fontWeight: 600 }}>{personal.firstName} {personal.lastName}</span>
          </span>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "hsl(var(--muted-foreground))" }}>
            {personal.title}
          </span>
        </div>
      </div>
    </section>
  );
}
