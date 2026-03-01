import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import type { PersonalData } from "@/types/site";

interface Props { personal: PersonalData; }

const ROLES = ["Business Intelligence", "Automação de Processos", "Arquitetura Analítica", "Data Engineering"];

export function HeroSection({ personal }: Props) {
  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      overflow: "hidden",
      background: "hsl(var(--background))",
    }}>
      {/* Dot grid */}
      <div className="dot-grid" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />

      {/* Large ambient circle */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, hsl(var(--lime) / 0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", left: "-5%",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, hsl(var(--violet) / 0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Floating badge — top right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: "absolute", top: 100, right: 40,
          padding: "10px 16px", borderRadius: 12,
          background: "hsl(var(--card))", border: "1px solid hsl(var(--border))",
          display: "flex", alignItems: "center", gap: 8,
        }}
        className="hidden lg:flex"
      >
        <span style={{
          width: 8, height: 8, borderRadius: "50%",
          background: "hsl(var(--lime))",
        }} className="pulse-dot" />
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "hsl(var(--foreground) / 0.7)" }}>
          {personal.available ? "Disponível para projetos" : "Indisponível"}
        </span>
      </motion.div>

      {/* Stats sidebar — right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: "absolute", right: 40, bottom: 120,
          display: "flex", flexDirection: "column", gap: 20,
          alignItems: "flex-end",
        }}
        className="hidden xl:flex"
      >
        {[
          { n: "+30", label: "Dashboards" },
          { n: "+6", label: "Anos" },
          { n: "+15", label: "Automações" },
        ].map(({ n, label }) => (
          <div key={label} style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, color: "hsl(var(--lime))", lineHeight: 1 }}>{n}</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "hsl(var(--muted-foreground))", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
          </div>
        ))}
      </motion.div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", paddingTop: 80 }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 28 }}
        >
          <span className="eyebrow">Especialista em BI · {personal.location}</span>
        </motion.div>

        {/* Heading — large editorial */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(52px, 8vw, 112px)",
            lineHeight: 0.95, letterSpacing: "-0.03em",
            marginBottom: 0,
            color: "hsl(var(--foreground))",
          }}
        >
          {personal.firstName}
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Syne, sans-serif", fontWeight: 800,
            fontSize: "clamp(52px, 8vw, 112px)",
            lineHeight: 0.95, letterSpacing: "-0.03em",
            marginBottom: 32,
          }}
          className="text-gradient"
        >
          {personal.lastName.split(" ")[0]}
        </motion.h1>

        {/* Role + subtitle row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{ display: "flex", alignItems: "flex-start", gap: 40, flexWrap: "wrap", marginBottom: 48, maxWidth: 720 }}
        >
          <div style={{ flex: "0 0 auto" }}>
            <div style={{
              display: "inline-block", padding: "6px 14px", borderRadius: 6,
              background: "hsl(var(--lime) / 0.1)", border: "1px solid hsl(var(--lime) / 0.3)",
              fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 500,
              color: "hsl(var(--lime))",
            }}>
              {personal.title}
            </div>
          </div>
          <p style={{ flex: 1, fontSize: 16, color: "hsl(var(--muted-foreground))", lineHeight: 1.7, minWidth: 260 }}>
            {personal.headline}
          </p>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
        >
          <a href="#contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 8,
            background: "hsl(var(--lime))", color: "hsl(var(--background))",
            fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 14,
            textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--glow-lime)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            Fale comigo <ArrowUpRight size={16} />
          </a>
          <a href={personal.cvUrl} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "13px 28px", borderRadius: 8,
            background: "transparent", border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))",
            fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: 14,
            textDecoration: "none", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "hsl(var(--lime) / 0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "hsl(var(--border))"; e.currentTarget.style.transform = ""; }}
          >
            <Download size={15} /> Baixar CV
          </a>
        </motion.div>

        {/* Scrolling roles marquee */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ position: "absolute", bottom: 0, left: 0, right: 0, overflow: "hidden", borderTop: "1px solid hsl(var(--border))", padding: "14px 0" }}
        >
          <div className="marquee-track" style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}>
            {[...ROLES, ...ROLES, ...ROLES, ...ROLES].map((role, i) => (
              <span key={i} style={{
                fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 500,
                color: i % 2 === 0 ? "hsl(var(--muted-foreground))" : "hsl(var(--lime) / 0.6)",
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                {i % 2 === 0 ? "·" : "—"} {role}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
