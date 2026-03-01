import { useState, useEffect } from "react";
import { useSiteData } from "@/hooks/useSiteData";

const NAV_LINKS = [
  { label: "Sobre", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projetos", href: "#projects" },
  { label: "Contato", href: "#contact" },
];

export function Navbar() {
  const { data } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initial = data.personal.firstName.charAt(0);
  const lastInitial = data.personal.lastName.charAt(0);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 24px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(15,23,42,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "18px",
          fontWeight: 700,
          color: "#F9FAFB",
          textDecoration: "none",
          letterSpacing: "-0.5px",
        }}
      >
        <span style={{ color: "#00C2FF" }}>{initial}{lastInitial}</span>
        <span style={{ color: "#F9FAFB" }}>l.</span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {NAV_LINKS.slice(0, -1).map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setActive(link.href)}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: 500,
              color: active === link.href ? "#F9FAFB" : "#9CA3AF",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#F9FAFB"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = active === link.href ? "#F9FAFB" : "#9CA3AF"; }}
          >
            {link.label}
          </a>
        ))}
        {/* CTA button */}
        <a
          href="#contact"
          style={{
            padding: "8px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#0F172A",
            background: "#00C2FF",
            textDecoration: "none",
            transition: "all 0.2s ease",
            marginLeft: "4px",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#33CEFF"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,194,255,0.4)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#00C2FF"; e.currentTarget.style.boxShadow = "none"; }}
        >
          Contato
        </a>
      </div>
    </nav>
  );
}
