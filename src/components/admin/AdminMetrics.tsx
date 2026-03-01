import { Trash2 } from "lucide-react";
import type { SiteData, MetricItem } from "@/types/site";
import { v4 as uuidv4 } from "uuid";

const COLOR_OPTIONS = ["cyan", "purple", "green", "orange", "red", "pink", "blue"];
const ICON_OPTIONS = ["BarChart3", "Clock", "Zap", "Database", "TrendingUp", "Star", "Activity"];

const colorHex: Record<string, string> = {
  cyan: "#00e5ff",
  purple: "#a855f7",
  green: "#34d399",
  orange: "#fbbf24",
  red: "#f87171",
  pink: "#ec4899",
  blue: "#60a5fa",
};

interface AdminMetricsProps {
  data: SiteData;
  onChange: (data: SiteData) => void;
  onSave: () => void;
}

function MetricCard({
  metric, onChange, onRemove
}: {
  metric: MetricItem;
  onChange: (m: MetricItem) => void;
  onRemove: () => void;
}) {
  const set = (field: string, value: string) => onChange({ ...metric, [field]: value });

  return (
    <div className="card-glass rounded-xl p-5 border border-border">
      <div className="flex justify-end mb-3">
        <button
          onClick={onRemove}
          className="flex items-center gap-1 text-xs text-destructive hover:bg-destructive/10 px-2 py-1 rounded"
        >
          <Trash2 size={12} /> Remover
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Prefixo (ex: +)</label>
          <input value={metric.prefix} onChange={(e) => set("prefix", e.target.value)}
            className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Valor (número)</label>
          <input value={metric.value} onChange={(e) => set("value", e.target.value)}
            className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Sufixo (ex: %)</label>
          <input value={metric.suffix} onChange={(e) => set("suffix", e.target.value)}
            className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
        </div>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Título</label>
          <input value={metric.label} onChange={(e) => set("label", e.target.value)}
            className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Subtítulo</label>
          <input value={metric.sublabel} onChange={(e) => set("sublabel", e.target.value)}
            className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Ícone</label>
            <select value={metric.icon} onChange={(e) => set("icon", e.target.value)}
              className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none">
              {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Cor</label>
            <div className="flex gap-1.5 flex-wrap">
              {COLOR_OPTIONS.map((c) => (
                <button key={c} onClick={() => set("color", c)}
                  className={`w-6 h-6 rounded-md border-2 transition-all ${metric.color === c ? "border-foreground scale-110" : "border-transparent"}`}
                  style={{ background: colorHex[c] }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminMetrics({ data, onChange, onSave }: AdminMetricsProps) {
  const addMetric = () => {
    const newMetric: MetricItem = {
      id: uuidv4(), prefix: "+", value: "0", suffix: "",
      label: "Nova Métrica", sublabel: "Descrição", color: "cyan", icon: "BarChart3"
    };
    onChange({ ...data, metrics: [...data.metrics, newMetric] });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Métricas</h2>
      <p className="text-sm text-muted-foreground mb-6">Edite as informações abaixo — as alterações refletem imediatamente na landing page.</p>

      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">📊</span>
        <h3 className="font-bold text-foreground">Métricas de Impacto</h3>
      </div>

      <div className="space-y-4 mb-4">
        {data.metrics.map((metric, i) => (
          <MetricCard key={metric.id} metric={metric}
            onChange={(m) => {
              const metrics = [...data.metrics];
              metrics[i] = m;
              onChange({ ...data, metrics });
            }}
            onRemove={() => onChange({ ...data, metrics: data.metrics.filter((_, idx) => idx !== i) })}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={addMetric}
          className="px-4 py-2 rounded-lg text-sm border border-border text-foreground/80 hover:bg-muted transition-all">
          + Nova métrica
        </button>
        <button onClick={onSave}
          className="px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2"
          style={{ background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(191 97% 40%))", color: "hsl(var(--background))" }}>
          💾 Salvar alterações
        </button>
      </div>
    </div>
  );
}
