import { useState, useEffect } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Sobre", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projetos", href: "#projects" },
];

export function Navbar() {
  const { data } = useSiteData();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const initials = `${data.personal.firstName.charAt(0)}${data.personal.lastName.charAt(0)}`;

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.3s ease",
          borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
          background: scrolled ? "hsl(var(--background) / 0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <span style={{
              width: 34, height: 34, borderRadius: 8,
              background: "hsl(var(--lime))", color: "hsl(var(--background))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 14,
              letterSpacing: "-0.02em",
            }}>
              {initials}
            </span>
            <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "hsl(var(--foreground))", letterSpacing: "-0.01em" }}>
              {data.personal.firstName}
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
            {NAV.map(({ label, href }) => (
              <a key={href} href={href} className="link-underline" style={{
                padding: "6px 16px", borderRadius: 6,
                fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500,
                color: "hsl(var(--muted-foreground))",
                textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "hsl(var(--foreground))")}
                onMouseLeave={e => (e.currentTarget.style.color = "hsl(var(--muted-foreground))")}
              >
                {label}
              </a>
            ))}
            <a href="#contact" style={{
              marginLeft: 8, padding: "8px 20px", borderRadius: 6,
              background: "hsl(var(--lime))", color: "hsl(var(--background))",
              fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 600,
              textDecoration: "none", transition: "opacity 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}
            >
              Contato
            </a>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "hsl(var(--foreground))", padding: 8 }}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 49,
          background: "hsl(var(--card))", borderBottom: "1px solid hsl(var(--border))",
          padding: "16px 32px 24px",
        }}>
          {[...NAV, { label: "Contato", href: "#contact" }].map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)} style={{
              display: "block", padding: "12px 0", fontSize: 15, fontWeight: 500,
              color: "hsl(var(--foreground))", textDecoration: "none",
              borderBottom: "1px solid hsl(var(--border))",
            }}>
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
