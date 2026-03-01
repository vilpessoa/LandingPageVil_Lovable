import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Download, Linkedin, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Sobre", href: "#about" },
    { label: "Stack", href: "#stack" },
    { label: "Projetos", href: "#projects" },
    { label: "Contato", href: "#contact" },
  ];

  const logoName = "Vil";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(15, 23, 42, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0, 194, 255, 0.1)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo — click to go to admin */}
        <button
          onClick={() => navigate("/admin")}
          title="Acessar painel Admin"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            color: "#F9FAFB",
            fontSize: "18px",
            letterSpacing: "-0.5px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px 8px",
            borderRadius: "6px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,194,255,0.08)";
            e.currentTarget.style.boxShadow = "0 0 12px rgba(0,194,255,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span style={{ color: "#00C2FF" }}>{logoName.charAt(0)}</span>
          {logoName.slice(1)}
          <span style={{ color: "#00C2FF" }}>.</span>
        </button>

        {/* Desktop Links */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "32px" }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#9CA3AF",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00C2FF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#0F172A",
              background: "#00C2FF",
              padding: "8px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#33CEFF";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0,194,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#00C2FF";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Contato
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "#F9FAFB",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(15, 23, 42, 0.98)",
            borderTop: "1px solid rgba(0,194,255,0.1)",
            padding: "16px 24px 24px",
          }}
          className="flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "#9CA3AF",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
