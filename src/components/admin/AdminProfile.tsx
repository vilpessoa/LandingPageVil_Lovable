import type { SiteData } from "@/types/site";

interface AdminProfileProps {
  data: SiteData;
  onChange: (data: SiteData) => void;
  onSave: () => void;
}

const Field = ({
  label, value, onChange, type = "text", multiline = false
}: {
  label: string;
  value: string | boolean;
  onChange: (v: string | boolean) => void;
  type?: string;
  multiline?: boolean;
}) => (
  <div>
    <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">
      {label}
    </label>
    {type === "checkbox" ? (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={value as boolean}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-cyan"
        />
        <span className="text-sm text-foreground">{value ? "Sim" : "Não"}</span>
      </label>
    ) : multiline ? (
      <textarea
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none focus:border-cyan/50 resize-none"
      />
    ) : (
      <input
        type={type}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none focus:border-cyan/50"
      />
    )}
  </div>
);

export function AdminProfile({ data, onChange, onSave }: AdminProfileProps) {
  const p = data.personal;
  const set = (field: string, value: string | boolean) =>
    onChange({ ...data, personal: { ...p, [field]: value } });

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Perfil & Hero</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Edite as informações abaixo — as alterações refletem imediatamente na landing page.
      </p>

      <div className="card-glass rounded-xl p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Primeiro Nome" value={p.firstName} onChange={(v) => set("firstName", v)} />
          <Field label="Sobrenome" value={p.lastName} onChange={(v) => set("lastName", v)} />
        </div>
        <Field label="Título" value={p.title} onChange={(v) => set("title", v)} />
        <Field label="Subtítulo" value={p.subtitle} onChange={(v) => set("subtitle", v)} multiline />
        <Field label="Headline" value={p.headline} onChange={(v) => set("headline", v)} multiline />
        <Field label="Disponível para projetos" value={p.available} onChange={(v) => set("available", v)} type="checkbox" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Email" value={p.email} onChange={(v) => set("email", v)} type="email" />
          <Field label="Localização" value={p.location} onChange={(v) => set("location", v)} />
        </div>
        <Field label="URL do CV" value={p.cvUrl} onChange={(v) => set("cvUrl", v)} />
        <Field label="LinkedIn URL" value={p.linkedinUrl} onChange={(v) => set("linkedinUrl", v)} />

        <div className="flex justify-end pt-2">
          <button
            onClick={onSave}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(191 97% 40%))",
              color: "hsl(var(--background))",
            }}
          >
            💾 Salvar alterações
          </button>
        </div>
      </div>
    </div>
  );
}
