import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Download } from "lucide-react";
import type { PersonalData } from "@/types/site";

interface ContactSectionProps {
  personal: PersonalData;
}

export function ContactSection({ personal }: ContactSectionProps) {
  return (
    <section id="contato" className="py-24 bg-background">
      <div className="container max-w-4xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">// VAMOS CONVERSAR</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Pronto para transformar
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-gradient-cyan">dados </span>
            <span className="text-foreground">em </span>
            <span className="text-gradient-purple">decisões?</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-md mx-auto">
            Estou disponível para projetos de BI, automação e arquitetura analítica. Vamos criar algo com impacto real.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            {
              icon: <Linkedin size={24} />,
              label: "LINKEDIN",
              value: "/in/",
              link: personal.linkedinUrl,
              action: "Conecte-se comigo",
              color: "cyan",
            },
            {
              icon: <Mail size={24} />,
              label: "E-MAIL",
              value: personal.email,
              link: `mailto:${personal.email}`,
              action: "Envie uma mensagem",
              color: "purple",
            },
            {
              icon: <MapPin size={24} />,
              label: "LOCALIZAÇÃO",
              value: personal.location,
              link: null,
              action: "Disponível remotamente",
              color: "green",
            },
          ].map((item, i) => {
            const colorVar =
              item.color === "cyan"
                ? "hsl(var(--cyan))"
                : item.color === "purple"
                ? "hsl(var(--purple))"
                : "hsl(var(--green))";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-xl p-6 text-center"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${colorVar}22`, color: colorVar }}
                >
                  {item.icon}
                </div>
                <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-2">
                  {item.label}
                </p>
                <p className="font-bold text-foreground mb-1">{item.value}</p>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-sm"
                    style={{ color: colorVar }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.action}
                  </a>
                ) : (
                  <span className="text-sm" style={{ color: colorVar }}>
                    {item.action}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-medium transition-all"
            style={{
              background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(191 97% 40%))",
              color: "hsl(var(--background))",
            }}
          >
            <Linkedin size={16} />
            Conectar no LinkedIn ↗
          </a>
          <a
            href={personal.cvUrl}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-md border border-foreground/30 text-foreground/80 hover:bg-foreground/10 font-medium transition-all"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
          <div>
            © 2025{" "}
            <span className="text-gradient-cyan font-semibold">
              {personal.firstName} {personal.lastName}
            </span>{" "}
            · {personal.title}
          </div>
          <div>Transformando dados em decisões estratégicas.</div>
        </div>
      </div>
    </section>
  );
}
