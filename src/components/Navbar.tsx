import { useState, useEffect } from "react";
import { useSiteData } from "@/hooks/useSiteData";

export function Navbar() {
  const { data } = useSiteData();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const initials = data.personal.firstName.charAt(0) + data.personal.lastName.charAt(0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#080d1a]/90 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-1 no-underline">
          <span className="font-['Space_Grotesk'] text-lg font-bold text-[#00C2FF]">{initials}</span>
          <span className="font-['Space_Grotesk'] text-lg font-bold text-white/90">l.</span>
        </a>
        <nav className="flex items-center gap-1">
          {["Sobre", "Stack", "Projetos", "Contato"].map((item, i) => {
            const hrefs = ["#about", "#stack", "#projects", "#contact"];
            const isCta = i === 3;
            return isCta ? (
              <a key={item} href={hrefs[i]}
                className="ml-2 px-5 py-2 rounded-lg bg-[#00C2FF] text-[#080d1a] text-sm font-bold no-underline hover:bg-[#33CEFF] hover:shadow-[0_0_20px_rgba(0,194,255,0.4)] transition-all duration-200">
                {item}
              </a>
            ) : (
              <a key={item} href={hrefs[i]}
                className="px-4 py-2 rounded-lg text-sm text-white/60 font-medium no-underline hover:text-white/90 hover:bg-white/[0.04] transition-all duration-200">
                {item}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
