import type { SiteData } from "@/types/site";

interface AdminAboutProps {
  data: SiteData;
  onChange: (data: SiteData) => void;
  onSave: () => void;
}

export function AdminAbout({ data, onChange, onSave }: AdminAboutProps) {
  const a = data.about;
  const set = (field: string, value: string | string[]) =>
    onChange({ ...data, about: { ...a, [field]: value } });

  const setHighlight = (i: number, value: string) => {
    const h = [...a.highlights];
    h[i] = value;
    set("highlights", h);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Sobre Mim</h2>
      <p className="text-sm text-muted-foreground mb-6">Edite as informações abaixo — as alterações refletem imediatamente na landing page.</p>

      <div className="card-glass rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">Texto 1</label>
          <textarea value={a.text1} onChange={(e) => set("text1", e.target.value)} rows={4}
            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">Texto 2</label>
          <textarea value={a.text2} onChange={(e) => set("text2", e.target.value)} rows={4}
            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">Destaques</label>
          <div className="space-y-2">
            {a.highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input value={h} onChange={(e) => setHighlight(i, e.target.value)}
                  className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
                <button onClick={() => set("highlights", a.highlights.filter((_, idx) => idx !== i))}
                  className="px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10 text-xs border border-border">✕</button>
              </div>
            ))}
            <button onClick={() => set("highlights", [...a.highlights, ""])}
              className="px-4 py-1.5 rounded-lg text-sm border border-border text-foreground/80 hover:bg-muted transition-all">
              + Adicionar destaque
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">Título do Gráfico</label>
          <input value={a.chartTitle} onChange={(e) => set("chartTitle", e.target.value)}
            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none" />
        </div>
        <div className="flex justify-end pt-2">
          <button onClick={onSave}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm"
            style={{ background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(191 97% 40%))", color: "hsl(var(--background))" }}>
            💾 Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}
