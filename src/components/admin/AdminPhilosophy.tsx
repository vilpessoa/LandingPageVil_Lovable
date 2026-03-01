import { Trash2 } from "lucide-react";
import type { SiteData } from "@/types/site";

interface AdminPhilosophyProps {
  data: SiteData;
  onChange: (data: SiteData) => void;
  onSave: () => void;
}

export function AdminPhilosophy({ data, onChange, onSave }: AdminPhilosophyProps) {
  const ph = data.philosophy;
  const set = (field: string, value: unknown) =>
    onChange({ ...data, philosophy: { ...ph, [field]: value } });

  const updatePrinciple = (i: number, field: string, value: string) => {
    const principles = [...ph.principles];
    principles[i] = { ...principles[i], [field]: value };
    set("principles", principles);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Filosofia</h2>
      <p className="text-sm text-muted-foreground mb-6">Edite as informações abaixo — as alterações refletem imediatamente na landing page.</p>

      <div className="card-glass rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-4">
          <span>💡</span>
          <h3 className="font-bold text-foreground">Filosofia & Citação</h3>
        </div>

        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">Citação Principal</label>
          <textarea value={ph.quote} onChange={(e) => set("quote", e.target.value)} rows={4}
            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none resize-none" />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">Autor da Citação</label>
          <input value={ph.author} onChange={(e) => set("author", e.target.value)}
            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none" />
        </div>

        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">Princípios</label>
          <div className="space-y-4">
            {ph.principles.map((p, i) => (
              <div key={i} className="border border-border rounded-xl p-4 space-y-3">
                <div className="flex gap-3 items-center">
                  <div>
                    <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Número</label>
                    <input value={p.number} onChange={(e) => updatePrinciple(i, "number", e.target.value)}
                      className="w-16 bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Título</label>
                    <input value={p.title} onChange={(e) => updatePrinciple(i, "title", e.target.value)}
                      className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
                  </div>
                  <button onClick={() => set("principles", ph.principles.filter((_, idx) => idx !== i))}
                    className="mt-5 text-destructive hover:bg-destructive/10 p-1.5 rounded">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest">Descrição</label>
                  <textarea value={p.desc} onChange={(e) => updatePrinciple(i, "desc", e.target.value)} rows={2}
                    className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none resize-none" />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => set("principles", [...ph.principles, { number: `0${ph.principles.length + 1}`, title: "", desc: "" }])}
            className="mt-3 px-4 py-2 rounded-lg text-sm border border-border text-foreground/80 hover:bg-muted">
            + Novo princípio
          </button>
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
