import { motion } from "framer-motion";
import type { PhilosophyData } from "@/types/site";

interface PhilosophySectionProps {
  philosophy: PhilosophyData;
}

export function PhilosophySection({ philosophy }: PhilosophySectionProps) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container max-w-4xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">// FILOSOFIA DE TRABALHO</p>
          <h2 className="text-4xl font-bold text-foreground">Data-Driven Thinking</h2>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="card-glass rounded-xl p-8 mb-10 relative"
        >
          <span className="absolute top-4 left-6 text-7xl font-serif text-cyan/30 leading-none select-none">
            "
          </span>
          <blockquote className="text-xl md:text-2xl font-semibold text-foreground text-center leading-relaxed mt-4 px-6">
            "{philosophy.quote}"
          </blockquote>
          <p className="text-center mt-4 font-mono text-sm text-muted-foreground">
            — {philosophy.author}
          </p>
        </motion.div>

        {/* Principles */}
        <div className="grid md:grid-cols-3 gap-5">
          {philosophy.principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-glass rounded-xl p-6"
            >
              <p className="text-4xl font-bold font-mono text-muted-foreground/30 mb-3">
                {p.number}
              </p>
              <h4 className="font-bold text-foreground mb-2">{p.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
