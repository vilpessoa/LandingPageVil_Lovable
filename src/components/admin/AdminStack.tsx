import { Trash2 } from "lucide-react";
import type { SiteData, TechCategory, TechItem } from "@/types/site";
import { v4 as uuidv4 } from "uuid";

const COLOR_OPTIONS = ["cyan", "purple", "green", "orange"];
const ICON_OPTIONS = ["BarChart3", "Settings", "Bot", "Cpu", "Code2", "Layers"];

const colorHex: Record<string, string> = {
  cyan: "#00e5ff", purple: "#a855f7", green: "#34d399", orange: "#fbbf24"
};

interface AdminStackProps {
  data: SiteData;
  onChange: (data: SiteData) => void;
  onSave: () => void;
}

export function AdminStack({ data, onChange, onSave }: AdminStackProps) {
  const updateCat = (i: number, cat: TechCategory) => {
    const ts = [...data.techStack];
    ts[i] = cat;
    onChange({ ...data, techStack: ts });
  };
  const removeCat = (i: number) => onChange({ ...data, techStack: data.techStack.filter((_, idx) => idx !== i) });
  const addCat = () => {
    const newCat: TechCategory = { id: uuidv4(), title: "Nova Categoria", color: "cyan", icon: "BarChart3", techs: [] };
    onChange({ ...data, techStack: [...data.techStack, newCat] });
  };
  const updateTech = (ci: number, ti: number, tech: TechItem) => {
    const cat = { ...data.techStack[ci], techs: [...data.techStack[ci].techs] };
    cat.techs[ti] = tech;
    updateCat(ci, cat);
  };
  const removeTech = (ci: number, ti: number) => {
    const cat = { ...data.techStack[ci], techs: data.techStack[ci].techs.filter((_, idx) => idx !== ti) };
    updateCat(ci, cat);
  };
  const addTech = (ci: number) => {
    const cat = { ...data.techStack[ci], techs: [...data.techStack[ci].techs, { name: "Nova Tech", level: 80 }] };
    updateCat(ci, cat);
  };

  const setExtra = (i: number, v: string) => {
    const et = [...data.extraTechs];
    et[i] = v;
    onChange({ ...data, extraTechs: et });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Stack Tecnológica</h2>
      <p className="text-sm text-muted-foreground mb-6">Edite as informações abaixo — as alterações refletem imediatamente na landing page.</p>

      <div className="space-y-4 mb-6">
        {data.techStack.map((cat, ci) => (
          <div key={cat.id} className="card-glass rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-1">
                <input value={cat.title} onChange={(e) => updateCat(ci, { ...cat, title: e.target.value })}
                  className="bg-muted rounded-lg px-3 py-2 text-sm font-bold text-foreground border border-border focus:outline-none flex-1" />
                <select value={cat.icon} onChange={(e) => updateCat(ci, { ...cat, icon: e.target.value })}
                  className="bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none">
                  {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
                <div className="flex gap-1.5">
                  {COLOR_OPTIONS.map((c) => (
                    <button key={c} onClick={() => updateCat(ci, { ...cat, color: c })}
                      className={`w-5 h-5 rounded border-2 ${cat.color === c ? "border-foreground" : "border-transparent"}`}
                      style={{ background: colorHex[c] }} />
                  ))}
                </div>
              </div>
              <button onClick={() => removeCat(ci)} className="ml-3 text-destructive hover:bg-destructive/10 p-1.5 rounded">
                <Trash2 size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {cat.techs.map((tech, ti) => (
                <div key={ti} className="flex gap-2 items-center">
                  <input value={tech.name} onChange={(e) => updateTech(ci, ti, { ...tech, name: e.target.value })}
                    className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
                  <input type="number" min={0} max={100} value={tech.level}
                    onChange={(e) => updateTech(ci, ti, { ...tech, level: Number(e.target.value) })}
                    className="w-20 bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
                  <button onClick={() => removeTech(ci, ti)} className="text-destructive hover:bg-destructive/10 p-1.5 rounded">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button onClick={() => addTech(ci)}
                className="text-xs text-muted-foreground hover:text-foreground border border-dashed border-border px-3 py-1.5 rounded-lg">
                + Adicionar tecnologia
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={addCat}
        className="px-4 py-2 rounded-lg text-sm border border-border text-foreground/80 hover:bg-muted mb-6">
        + Nova categoria
      </button>

      {/* Extra techs */}
      <div className="card-glass rounded-xl p-5 mb-4">
        <h4 className="font-bold text-foreground mb-3">Também utilizo</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {data.extraTechs.map((et, i) => (
            <div key={i} className="flex items-center gap-1">
              <input value={et} onChange={(e) => setExtra(i, e.target.value)}
                className="bg-muted rounded-lg px-2 py-1 text-xs text-foreground border border-border focus:outline-none w-28" />
              <button onClick={() => onChange({ ...data, extraTechs: data.extraTechs.filter((_, idx) => idx !== i) })}
                className="text-destructive text-xs">✕</button>
            </div>
          ))}
        </div>
        <button onClick={() => onChange({ ...data, extraTechs: [...data.extraTechs, ""] })}
          className="text-xs border border-dashed border-border px-3 py-1.5 rounded-lg text-muted-foreground">
          + Adicionar
        </button>
      </div>

      <div className="flex justify-end">
        <button onClick={onSave}
          className="px-6 py-2.5 rounded-lg font-semibold text-sm"
          style={{ background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(191 97% 40%))", color: "hsl(var(--background))" }}>
          💾 Salvar alterações
        </button>
      </div>
    </div>
  );
}
