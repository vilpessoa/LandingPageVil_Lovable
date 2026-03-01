import { motion } from "framer-motion";
import { BarChart3, Clock, Zap, Database, TrendingUp, Star, Activity } from "lucide-react";
import type { MetricItem } from "@/types/site";

const iconMap: Record<string, React.ReactNode> = {
  BarChart3: <BarChart3 size={22} />,
  Clock: <Clock size={22} />,
  Zap: <Zap size={22} />,
  Database: <Database size={22} />,
  TrendingUp: <TrendingUp size={22} />,
  Star: <Star size={22} />,
  Activity: <Activity size={22} />,
};

const colorMap: Record<string, string> = {
  cyan: "hsl(var(--cyan))",
  purple: "hsl(var(--purple))",
  green: "hsl(var(--green))",
  orange: "hsl(var(--orange))",
};

interface MetricsSectionProps {
  metrics: MetricItem[];
}

export function MetricsSection({ metrics }: MetricsSectionProps) {
  return (
    <section id="sobre" className="py-24 bg-background">
      <div className="container max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="section-label mb-3">// IMPACTO MENSURÁVEL</p>
          <h2 className="text-4xl font-bold text-foreground">Impacto em Números</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((metric, i) => {
            const color = colorMap[metric.color] || colorMap.cyan;
            const icon = iconMap[metric.icon] || <BarChart3 size={22} />;

            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-glass rounded-xl p-6 relative overflow-hidden group"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${color}22`, color }}
                >
                  {icon}
                </div>

                {/* Value */}
                <div
                  className="text-5xl font-bold mb-2 font-mono"
                  style={{ color }}
                >
                  {metric.prefix}{metric.value}{metric.suffix}
                </div>

                {/* Label */}
                <div className="font-semibold text-foreground mb-1">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.sublabel}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
