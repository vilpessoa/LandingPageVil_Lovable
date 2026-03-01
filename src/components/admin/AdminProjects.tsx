import { Trash2 } from "lucide-react";
import type { SiteData, Project, ProjectMetric } from "@/types/site";
import { v4 as uuidv4 } from "uuid";

const COLOR_OPTIONS = ["cyan", "purple", "green", "orange"];
const colorHex: Record<string, string> = {
  cyan: "#00e5ff", purple: "#a855f7", green: "#34d399", orange: "#fbbf24"
};

interface AdminProjectsProps {
  data: SiteData;
  onChange: (data: SiteData) => void;
  onSave: () => void;
}

function ProjectCard({ project, onChange, onRemove }: {
  project: Project; onChange: (p: Project) => void; onRemove: () => void;
}) {
  const set = (field: string, value: unknown) => onChange({ ...project, [field]: value });

  const setMetric = (i: number, m: ProjectMetric) => {
    const metrics = [...project.metrics];
    metrics[i] = m;
    set("metrics", metrics);
  };

  return (
    <div className="card-glass rounded-xl p-5 border border-border space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex gap-2">
          {COLOR_OPTIONS.map((c) => (
            <button key={c} onClick={() => { set("color", c); set("tagColor", c); }}
              className={`w-5 h-5 rounded border-2 ${project.color === c ? "border-foreground" : "border-transparent"}`}
              style={{ background: colorHex[c] }} />
          ))}
        </div>
        <button onClick={onRemove} className="text-destructive hover:bg-destructive/10 p-1.5 rounded">
          <Trash2 size={14} />
        </button>
      </div>
      {(["tag", "title", "subtitle"] as const).map((field) => (
        <div key={field}>
          <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest capitalize">{field}</label>
          <input value={project[field]} onChange={(e) => set(field, e.target.value)}
            className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
        </div>
      ))}
      {(["problem", "solution", "result"] as const).map((field) => (
        <div key={field}>
          <label className="block text-[10px] font-mono text-muted-foreground mb-1 uppercase tracking-widest capitalize">{field}</label>
          <textarea value={project[field]} onChange={(e) => set(field, e.target.value)}
            rows={3} className="w-full bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none resize-none" />
        </div>
      ))}
      <div>
        <label className="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Métricas</label>
        <div className="space-y-2">
          {project.metrics.map((m, i) => (
            <div key={i} className="flex gap-2">
              <input value={m.value} onChange={(e) => setMetric(i, { ...m, value: e.target.value })}
                placeholder="Valor" className="w-24 bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
              <input value={m.label} onChange={(e) => setMetric(i, { ...m, label: e.target.value })}
                placeholder="Label" className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm text-foreground border border-border focus:outline-none" />
              <button onClick={() => set("metrics", project.metrics.filter((_, idx) => idx !== i))}
                className="text-destructive hover:bg-destructive/10 p-1.5 rounded"><Trash2 size={13} /></button>
            </div>
          ))}
          <button onClick={() => set("metrics", [...project.metrics, { value: "", label: "" }])}
            className="text-xs border border-dashed border-border px-3 py-1.5 rounded-lg text-muted-foreground">
            + Adicionar métrica
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminProjects({ data, onChange, onSave }: AdminProjectsProps) {
  const update = (i: number, p: Project) => {
    const projects = [...data.projects];
    projects[i] = p;
    onChange({ ...data, projects });
  };

  const add = () => {
    const p: Project = {
      id: uuidv4(), tag: "Tech", tagColor: "cyan", title: "Novo Projeto",
      subtitle: "Subtítulo", problem: "", solution: "", result: "",
      metrics: [], color: "cyan", icon: "TrendingUp"
    };
    onChange({ ...data, projects: [...data.projects, p] });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Projetos</h2>
      <p className="text-sm text-muted-foreground mb-6">Edite as informações abaixo — as alterações refletem imediatamente na landing page.</p>
      <div className="space-y-4 mb-4">
        {data.projects.map((p, i) => (
          <ProjectCard key={p.id} project={p}
            onChange={(updated) => update(i, updated)}
            onRemove={() => onChange({ ...data, projects: data.projects.filter((_, idx) => idx !== i) })}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <button onClick={add}
          className="px-4 py-2 rounded-lg text-sm border border-border text-foreground/80 hover:bg-muted">
          + Novo projeto
        </button>
        <button onClick={onSave}
          className="px-6 py-2.5 rounded-lg font-semibold text-sm"
          style={{ background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(191 97% 40%))", color: "hsl(var(--background))" }}>
          💾 Salvar alterações
        </button>
      </div>
    </div>
  );
}
