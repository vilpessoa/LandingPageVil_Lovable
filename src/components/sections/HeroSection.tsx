import { motion } from "framer-motion";
import { Download, Linkedin, ChevronDown } from "lucide-react";
import type { PersonalData } from "@/types/site";

interface HeroSectionProps {
  personal: PersonalData;
}

export function HeroSection({ personal }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center hero-bg diagonal-lines overflow-hidden"
    >
      {/* Decorative diagonal lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-px h-[400px] opacity-20"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(var(--cyan)), transparent)",
            transform: "rotate(30deg)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-px h-[300px] opacity-10"
          style={{
            background: "linear-gradient(to bottom, transparent, hsl(var(--purple)), transparent)",
            transform: "rotate(30deg)",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md border-b border-border/50">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono font-bold text-xl"
        >
          <span className="text-gradient-cyan">Vi</span>
          <span className="text-foreground">l.</span>
        </motion.span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {["Sobre", "Stack", "Projetos", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-foreground transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#contato"
            className="px-4 py-1.5 rounded-md border border-foreground/30 text-foreground hover:bg-foreground/10 transition-colors text-sm"
          >
            Contato
          </a>
        </div>
      </nav>

      {/* Hero content */}
      <div className="container max-w-5xl px-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Available badge */}
          {personal.available && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-foreground/20 text-sm text-foreground/80 mb-8 font-mono">
              <span className="w-2 h-2 rounded-full bg-vi-green animate-pulse-glow" />
              Disponível para novos projetos
            </div>
          )}

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold leading-none mb-2"
          >
            <span className="text-gradient-cyan">{personal.firstName.charAt(0)}</span>
            <span className="text-foreground">{personal.firstName.slice(1)}</span>
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold leading-none mb-6"
          >
            <span className="text-gradient-cyan">{personal.lastName.split(" ")[0]}</span>{" "}
            <span className="text-gradient-purple">{personal.lastName.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="text-muted-foreground text-2xl">—</span>
            <span className="text-xl text-foreground/90 font-medium">{personal.title}</span>
          </motion.div>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-foreground/70 max-w-lg text-base leading-relaxed mb-10"
          >
            {personal.subtitle}
            <br />
            {personal.headline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href={personal.cvUrl}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-sm transition-all"
              style={{
                background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(191 97% 40%))",
                color: "hsl(var(--background))",
              }}
            >
              <Download size={16} />
              Download CV
            </a>
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-foreground/30 text-foreground/80 hover:bg-foreground/10 font-medium text-sm transition-all"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-8 flex items-center gap-2 text-muted-foreground text-xs font-mono tracking-widest uppercase"
      >
        <ChevronDown size={14} className="animate-bounce" />
        SCROLL
      </motion.div>
    </section>
  );
}
