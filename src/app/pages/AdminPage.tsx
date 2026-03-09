import { useState, useRef, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router";
import {
  LogOut, Eye, User, BarChart3, Info, Layers, FolderKanban,
  Quote, Shield, ChevronRight, ChevronDown, Plus, Trash2, Save,
  RotateCcw, Lock, AlertTriangle, CheckCircle2,
} from "lucide-react";
import { icons } from "lucide-react";
import { useSiteData, MetricItem, TechCategory, Project, Principle } from "../context/DataContext";
import { IconPicker } from "../components/IconPicker";
import { supabase } from "@/integrations/supabase/client";

// ─── Shared UI ────────────────────────────────────────────────────────────────

const S = {
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#F9FAFB",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties,
  textarea: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#F9FAFB",
    fontFamily: "'Inter', sans-serif",
    fontSize: "14px",
    outline: "none",
    resize: "vertical" as const,
    minHeight: "90px",
    transition: "border-color 0.2s",
  } as React.CSSProperties,
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    color: "#9CA3AF",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: "6px",
  } as React.CSSProperties,
  card: {
    background: "rgba(17,24,39,0.8)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "24px",
    marginBottom: "16px",
  } as React.CSSProperties,
  sectionTitle: {
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "20px",
    fontWeight: 700,
    color: "#F9FAFB",
    marginBottom: "24px",
    letterSpacing: "-0.3px",
  } as React.CSSProperties,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={S.label}>{label}</label>
      {children}
    </div>
  );
}

function SaveBtn({ onClick, saved }: { onClick: () => void; saved: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "10px 22px", borderRadius: "8px",
        background: saved ? "#10B981" : "#00C2FF",
        color: "#0F172A", fontFamily: "'Inter', sans-serif",
        fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer",
        transition: "all 0.3s ease",
      }}
    >
      {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
      {saved ? "Salvo!" : "Salvar alterações"}
    </button>
  );
}

function useSaved() {
  const [saved, setSaved] = useState(false);
  const trigger = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  return { saved, trigger };
}

// ─── Collapsible Card ─────────────────────────────────────────────────────────

function CollapsibleCard({
  title,
  color,
  defaultOpen = false,
  onRemove,
  children,
}: {
  title: string;
  color?: string;
  defaultOpen?: boolean;
  onRemove?: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        ...S.card,
        borderColor: color ? `${color}25` : "rgba(255,255,255,0.06)",
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 16px",
          cursor: "pointer",
          userSelect: "none",
          background: open ? "rgba(255,255,255,0.02)" : "transparent",
          transition: "background 0.15s",
        }}
      >
        {color && (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "3px",
              background: color,
              flexShrink: 0,
            }}
          />
        )}
        <ChevronDown
          size={16}
          style={{
            color: "#9CA3AF",
            transition: "transform 0.2s",
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            color: "#F9FAFB",
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {title || "Sem título"}
        </span>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              borderRadius: "6px",
              color: "#EF4444",
              cursor: "pointer",
              padding: "4px 8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "12px",
              flexShrink: 0,
            }}
          >
            <Trash2 size={12} /> Remover
          </button>
        )}
      </div>
      {/* Body */}
      {open && (
        <div style={{ padding: "0 24px 24px" }}>{children}</div>
      )}
    </div>
  );
}

// ─── Lucide Icon Select ───────────────────────────────────────────────────────

const POPULAR_ICONS = [
  "BarChart3", "TrendingUp", "Database", "Cpu", "Zap", "Target",
  "Clock", "Users", "Star", "Award", "Globe", "Server",
  "Cloud", "Lock", "Settings", "Layers", "GitBranch", "Terminal",
  "Monitor", "Smartphone", "Puzzle", "Rocket", "LineChart", "PieChart",
  "Activity", "Box", "Workflow", "Code", "Eye", "Search",
  "Shield", "Heart", "Mail", "Calendar", "Bookmark", "Flag",
  "Briefcase", "FileText", "Image", "Video", "Music", "Mic",
  "Headphones", "Camera", "Download", "Upload", "Share2", "Link",
];

function LucideIconSelect({ value, onChange, color = "#00C2FF" }: { value: string; onChange: (v: string) => void; color?: string }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const filtered = search
    ? Object.keys(icons).filter((k) => k.toLowerCase().includes(search.toLowerCase())).slice(0, 36)
    : POPULAR_ICONS;

  const SelectedIcon = icons[value as keyof typeof icons];

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          ...S.input,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          borderColor: open ? color : "rgba(255,255,255,0.1)",
        }}
      >
        {SelectedIcon ? <SelectedIcon size={16} color={color} /> : null}
        <span style={{ fontSize: "13px" }}>{value || "Selecionar"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "46px", left: 0, zIndex: 200,
          width: "300px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "12px", padding: "12px", boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        }}>
          <input
            style={{
              width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px", padding: "8px 10px", color: "#F9FAFB", fontSize: "13px",
              outline: "none", fontFamily: "'Inter', sans-serif", marginBottom: "10px",
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ícone..."
            autoFocus
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px", maxHeight: "200px", overflowY: "auto" }}>
            {filtered.map((name) => {
              const Icon = icons[name as keyof typeof icons];
              if (!Icon) return null;
              const selected = value === name;
              return (
                <button
                  key={name}
                  type="button"
                  title={name}
                  onClick={() => { onChange(name); setOpen(false); setSearch(""); }}
                  style={{
                    width: "42px", height: "42px", display: "flex", alignItems: "center", justifyContent: "center",
                    borderRadius: "6px", border: selected ? `2px solid ${color}` : "1px solid transparent",
                    background: selected ? `${color}15` : "rgba(255,255,255,0.03)",
                    cursor: "pointer", color: selected ? color : "#D1D5DB",
                    transition: "all 0.15s",
                  }}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <p style={{ color: "#6B7280", fontSize: "12px", textAlign: "center", padding: "12px 0" }}>
              Nenhum ícone encontrado
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────


function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const { data } = useSiteData();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const submit = () => {
    if (pw === data.admin.password) { onLogin(); }
    else { setError(true); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "400px", padding: "24px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#00C2FF" }}>
            <Lock size={24} />
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "24px", fontWeight: 700, color: "#F9FAFB", marginBottom: "8px" }}>Painel Admin</h1>
          <p style={{ fontSize: "14px", color: "#9CA3AF" }}>Digite a senha para acessar o painel</p>
        </div>

        <div style={{ background: "rgba(17,24,39,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px" }}>
          <label style={S.label}>Senha</label>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="••••••••"
            style={{ ...S.input, borderColor: error ? "#EF4444" : "rgba(255,255,255,0.1)", marginBottom: "16px" }}
            onFocus={(e) => (e.target.style.borderColor = "#00C2FF")}
            onBlur={(e) => (e.target.style.borderColor = error ? "#EF4444" : "rgba(255,255,255,0.1)")}
          />
          {error && (
            <p style={{ fontSize: "13px", color: "#EF4444", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
              <AlertTriangle size={14} /> Senha incorreta
            </p>
          )}
          <button
            onClick={submit}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#00C2FF", color: "#0F172A", fontFamily: "'Inter', sans-serif", fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer", transition: "all 0.2s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#33CEFF"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,194,255,0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#00C2FF"; e.currentTarget.style.boxShadow = "none"; }}
          >
            Entrar
          </button>
          <button
            onClick={() => navigate("/")}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "transparent", color: "#9CA3AF", fontFamily: "'Inter', sans-serif", fontSize: "14px", border: "none", cursor: "pointer", marginTop: "10px" }}
          >
            ← Voltar ao site
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

function PersonalEditor() {
  const { data, updatePersonal } = useSiteData();
  const [form, setForm] = useState({ ...data.personal });
  const { saved, trigger } = useSaved();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `profile-photo.${ext}`;
      const { error } = await supabase.storage.from("profile").upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("profile").getPublicUrl(fileName);
      const url = `${urlData.publicUrl}?t=${Date.now()}`;
      set("photoUrl", url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = async () => {
    try {
      await supabase.storage.from("profile").remove(["profile-photo.jpg", "profile-photo.png", "profile-photo.webp", "profile-photo.jpeg"]);
    } catch {}
    set("photoUrl", "");
  };

  return (
    <div>
      <h2 style={S.sectionTitle}>🧑 Perfil & Hero</h2>

      {/* Photo upload */}
      <Field label="Foto de Perfil">
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "8px" }}>
          {form.photoUrl ? (
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(0,194,255,0.4)", flexShrink: 0 }}>
              <img src={form.photoUrl} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ) : (
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px dashed rgba(0,194,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#9CA3AF", fontSize: "12px", flexShrink: 0 }}>
              Sem foto
            </div>
          )}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00C2FF", fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer" }}
            >
              {uploading ? "Enviando..." : "Upload foto"}
            </button>
            {form.photoUrl && (
              <button
                onClick={removePhoto}
                style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer" }}
              >
                Remover
              </button>
            )}
          </div>
        </div>
      </Field>

      {/* Photo adjustment sliders */}
      {form.photoUrl && (
        <div style={{ ...S.card, marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
            <span style={{ ...S.label, marginBottom: 0 }}>Ajuste da Imagem</span>
            <button
              onClick={() => { set("photoScale", 1); set("photoOffsetX", 0); set("photoOffsetY", 0); }}
              style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#9CA3AF", fontFamily: "'Inter', sans-serif", fontSize: "12px", cursor: "pointer" }}
            >
              Centralizar
            </button>
          </div>

          {/* Live preview */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(0,194,255,0.2)", position: "relative" }}>
              <img
                src={form.photoUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: `${50 + (form.photoOffsetX || 0)}% ${50 + (form.photoOffsetY || 0)}%`,
                  transform: `scale(${form.photoScale || 1})`,
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "linear-gradient(to top, #0F172A 0%, rgba(15,23,42,0.6) 35%, transparent 55%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>

          <Field label={`Zoom: ${(form.photoScale || 1).toFixed(1)}x`}>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={form.photoScale || 1}
              onChange={(e) => set("photoScale", parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "#00C2FF" }}
            />
          </Field>
          <Field label={`Posição X: ${form.photoOffsetX || 0}`}>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={form.photoOffsetX || 0}
              onChange={(e) => set("photoOffsetX", parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "#00C2FF" }}
            />
          </Field>
          <Field label={`Posição Y: ${form.photoOffsetY || 0}`}>
            <input
              type="range"
              min="-50"
              max="50"
              step="1"
              value={form.photoOffsetY || 0}
              onChange={(e) => set("photoOffsetY", parseInt(e.target.value))}
              style={{ width: "100%", accentColor: "#00C2FF" }}
            />
          </Field>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field label="Primeiro Nome"><input style={S.input} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
        <Field label="Sobrenome"><input style={S.input} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      </div>
      <Field label="Título Profissional"><input style={S.input} value={form.title} onChange={(e) => set("title", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      <Field label="Subtítulo (tagline)"><input style={S.input} value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      <Field label="Headline (frase de impacto)"><textarea style={S.textarea} value={form.headline} onChange={(e) => set("headline", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field label="URL do LinkedIn"><input style={S.input} value={form.linkedinUrl} onChange={(e) => set("linkedinUrl", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
        <Field label="E-mail"><input style={S.input} value={form.email} onChange={(e) => set("email", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <Field label="Localização"><input style={S.input} value={form.location} onChange={(e) => set("location", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
        <Field label="Nome do arquivo PDF ao baixar"><input style={S.input} value={form.cvUrl} onChange={(e) => set("cvUrl", e.target.value)} placeholder="Ex: Vilcimar_Portfolio.pdf" onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      </div>
      <Field label="Disponível para projetos">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => set("available", !form.available)}
            style={{ width: "44px", height: "24px", borderRadius: "12px", background: form.available ? "#10B981" : "rgba(255,255,255,0.1)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.3s" }}
          >
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#fff", position: "absolute", top: "3px", left: form.available ? "23px" : "3px", transition: "left 0.3s" }} />
          </button>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: form.available ? "#10B981" : "#9CA3AF" }}>
            {form.available ? "Disponível (badge verde no hero)" : "Não disponível (badge oculto)"}
          </span>
        </div>
      </Field>
      <SaveBtn onClick={() => { updatePersonal(form); trigger(); }} saved={saved} />
    </div>
  );
}

function MetricsEditor() {
  const { data, updateMetrics } = useSiteData();
  const [metrics, setMetrics] = useState<MetricItem[]>(data.metrics.map((m) => ({ ...m })));
  const { saved, trigger } = useSaved();

  const COLORS = ["#00C2FF", "#7C3AED", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];

  const update = (id: string, key: keyof MetricItem, val: any) =>
    setMetrics((prev) => prev.map((m) => (m.id === id ? { ...m, [key]: val } : m)));

  const addMetric = () =>
    setMetrics((prev) => [...prev, { id: `m${Date.now()}`, value: "0", prefix: "", suffix: "", label: "Novo Indicador", sublabel: "Descrição", color: "#00C2FF", icon: "BarChart3" }]);

  const removeMetric = (id: string) => setMetrics((prev) => prev.filter((m) => m.id !== id));

  return (
    <div>
      <h2 style={S.sectionTitle}>📊 Métricas de Impacto</h2>
      {metrics.map((metric) => (
        <CollapsibleCard key={metric.id} title={metric.label} color={metric.color} onRemove={() => removeMetric(metric.id)}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
            <Field label="Prefixo (ex: +)"><input style={S.input} value={metric.prefix} onChange={(e) => update(metric.id, "prefix", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
            <Field label="Valor (número)"><input style={S.input} value={metric.value} onChange={(e) => update(metric.id, "value", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
            <Field label="Sufixo (ex: %)"><input style={S.input} value={metric.suffix} onChange={(e) => update(metric.id, "suffix", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
          </div>
          <Field label="Título"><input style={S.input} value={metric.label} onChange={(e) => update(metric.id, "label", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
          <Field label="Subtítulo"><input style={S.input} value={metric.sublabel} onChange={(e) => update(metric.id, "sublabel", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Ícone">
              <select style={{ ...S.input }} value={metric.icon} onChange={(e) => update(metric.id, "icon", e.target.value)}>
                {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </Field>
            <Field label="Cor">
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "4px" }}>
                {COLORS.map((c) => (
                  <button key={c} onClick={() => update(metric.id, "color", c)}
                    style={{ width: "28px", height: "28px", borderRadius: "6px", background: c, border: metric.color === c ? "3px solid #fff" : "2px solid transparent", cursor: "pointer" }} />
                ))}
                <input type="color" value={metric.color} onChange={(e) => update(metric.id, "color", e.target.value)}
                  style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", padding: "0", background: "transparent" }} title="Cor personalizada" />
              </div>
            </Field>
          </div>
        </CollapsibleCard>
      ))}
      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
        <button onClick={addMetric} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00C2FF", fontFamily: "'Inter', sans-serif", fontSize: "14px", cursor: "pointer" }}>
          <Plus size={16} /> Adicionar métrica
        </button>
        <SaveBtn onClick={() => { updateMetrics(metrics); trigger(); }} saved={saved} />
      </div>
    </div>
  );
}

function AboutEditor() {
  const { data, updateAbout } = useSiteData();
  const [form, setForm] = useState({ ...data.about, highlights: [...data.about.highlights] });
  const { saved, trigger } = useSaved();
  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const updateHighlight = (i: number, v: string) => {
    const hl = [...form.highlights]; hl[i] = v; set("highlights", hl);
  };
  const addHighlight = () => set("highlights", [...form.highlights, "Nova habilidade"]);
  const removeHighlight = (i: number) => set("highlights", form.highlights.filter((_, idx) => idx !== i));

  return (
    <div>
      <h2 style={S.sectionTitle}>👤 Sobre Mim</h2>
      <Field label="Parágrafo 1"><textarea style={S.textarea} value={form.text1} onChange={(e) => set("text1", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      <Field label="Parágrafo 2"><textarea style={S.textarea} value={form.text2} onChange={(e) => set("text2", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      <Field label="Título do gráfico"><input style={S.input} value={form.chartTitle} onChange={(e) => set("chartTitle", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
      <Field label="Destaques (checkmarks verdes)">
        {form.highlights.map((hl, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <input style={{ ...S.input, flex: 1 }} value={hl} onChange={(e) => updateHighlight(i, e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            <button onClick={() => removeHighlight(i)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", color: "#EF4444", cursor: "pointer", padding: "0 12px" }}><Trash2 size={14} /></button>
          </div>
        ))}
        <button onClick={addHighlight} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px", background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00C2FF", fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer", marginTop: "4px" }}>
          <Plus size={14} /> Adicionar destaque
        </button>
      </Field>
      <SaveBtn onClick={() => { updateAbout(form); trigger(); }} saved={saved} />
    </div>
  );
}

function TechEditor() {
  const { data, updateTechStack, updateExtraTechs } = useSiteData();
  const [cats, setCats] = useState<TechCategory[]>(data.techStack.map((c) => ({ ...c, techs: c.techs.map((t) => ({ ...t })) })));
  const [extras, setExtras] = useState(data.extraTechs.join(", "));
  const { saved, trigger } = useSaved();
  const COLORS = ["#00C2FF", "#7C3AED", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];

  const updateCat = (id: string, key: keyof TechCategory, val: any) =>
    setCats((prev) => prev.map((c) => (c.id === id ? { ...c, [key]: val } : c)));

  const updateTech = (catId: string, idx: number, key: string, val: any) =>
    setCats((prev) => prev.map((c) => c.id !== catId ? c : { ...c, techs: c.techs.map((t, i) => i === idx ? { ...t, [key]: val } : t) }));

  const addTech = (catId: string) =>
    setCats((prev) => prev.map((c) => c.id !== catId ? c : { ...c, techs: [...c.techs, { name: "Nova Tecnologia", level: 80 }] }));

  const removeTech = (catId: string, idx: number) =>
    setCats((prev) => prev.map((c) => c.id !== catId ? c : { ...c, techs: c.techs.filter((_, i) => i !== idx) }));

  const addCat = () =>
    setCats((prev) => [...prev, { id: `ts${Date.now()}`, title: "Nova Categoria", color: "#00C2FF", icon: "🔧", techs: [] }]);

  const removeCat = (id: string) => setCats((prev) => prev.filter((c) => c.id !== id));

  return (
    <div>
      <h2 style={S.sectionTitle}>🛠 Stack Tecnológica</h2>
      {cats.map((cat) => (
        <CollapsibleCard key={cat.id} title={cat.title} color={cat.color} onRemove={() => removeCat(cat.id)}>
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            <div style={{ width: "80px" }}>
              <label style={S.label}>Ícone</label>
              <IconPicker value={cat.icon} onChange={(val) => updateCat(cat.id, "icon", val)} color={cat.color} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Título da Categoria</label>
              <input style={S.input} value={cat.title} onChange={(e) => updateCat(cat.id, "title", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={S.label}>Cor</label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <button key={c} onClick={() => updateCat(cat.id, "color", c)}
                  style={{ width: "28px", height: "28px", borderRadius: "6px", background: c, border: cat.color === c ? "3px solid #fff" : "2px solid transparent", cursor: "pointer" }} />
              ))}
              <input type="color" value={cat.color} onChange={(e) => updateCat(cat.id, "color", e.target.value)}
                style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", padding: "0" }} />
            </div>
          </div>

          <label style={S.label}>Tecnologias</label>
          {cat.techs.map((tech, idx) => (
            <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
              <input style={{ ...S.input, flex: 2 }} value={tech.name} onChange={(e) => updateTech(cat.id, idx, "name", e.target.value)} placeholder="Nome" onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                <input type="range" min={0} max={100} value={tech.level} onChange={(e) => updateTech(cat.id, idx, "level", Number(e.target.value))} style={{ flex: 1, accentColor: cat.color }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: cat.color, minWidth: "35px" }}>{tech.level}%</span>
              </div>
              <button onClick={() => removeTech(cat.id, idx)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", color: "#EF4444", cursor: "pointer", padding: "6px 10px" }}><Trash2 size={12} /></button>
            </div>
          ))}
          <button onClick={() => addTech(cat.id)} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "6px", background: `${cat.color}10`, border: `1px solid ${cat.color}25`, color: cat.color, fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer", marginTop: "4px" }}>
            <Plus size={13} /> Adicionar tecnologia
          </button>
        </CollapsibleCard>
      ))}

      <button onClick={addCat} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00C2FF", fontFamily: "'Inter', sans-serif", fontSize: "14px", cursor: "pointer", marginBottom: "20px" }}>
        <Plus size={16} /> Nova categoria
      </button>

      <div style={S.card}>
        <Field label="Outras tecnologias (separadas por vírgula)">
          <textarea style={{ ...S.textarea, minHeight: "70px" }} value={extras} onChange={(e) => setExtras(e.target.value)} placeholder="Excel Avançado, Git, Azure, ..." onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
        </Field>
      </div>

      <SaveBtn onClick={() => {
        updateTechStack(cats);
        updateExtraTechs(extras.split(",").map((s) => s.trim()).filter(Boolean));
        trigger();
      }} saved={saved} />
    </div>
  );
}

function ProjectsEditor() {
  const { data, updateProjects } = useSiteData();
  const [projects, setProjects] = useState<Project[]>(data.projects.map((p) => ({ ...p, metrics: p.metrics.map((m) => ({ ...m })) })));
  const { saved, trigger } = useSaved();
  const ICONS = ["TrendingUp", "Cpu", "Target", "BarChart3", "Zap", "Database", "Star", "Award"];
  const COLORS = ["#00C2FF", "#7C3AED", "#10B981", "#F59E0B", "#EF4444", "#EC4899"];
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [uploading, setUploading] = useState<string | null>(null);

  const updateProject = (id: string, key: keyof Project, val: any) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: val } : p)));

  const updateMetric = (pid: string, idx: number, key: string, val: string) =>
    setProjects((prev) => prev.map((p) => p.id !== pid ? p : { ...p, metrics: p.metrics.map((m, i) => i === idx ? { ...m, [key]: val } : m) }));

  const addMetric = (pid: string) =>
    setProjects((prev) => prev.map((p) => p.id !== pid ? p : { ...p, metrics: [...p.metrics, { value: "0%", label: "Impacto" }] }));

  const removeMetric = (pid: string, idx: number) =>
    setProjects((prev) => prev.map((p) => p.id !== pid ? p : { ...p, metrics: p.metrics.filter((_, i) => i !== idx) }));

  const addProject = () =>
    setProjects((prev) => [...prev, {
      id: `p${Date.now()}`, tag: "Stack", tagColor: "#00C2FF", title: "Novo Projeto",
      subtitle: "Subtítulo", problem: "Descreva o problema...", solution: "Descreva a solução...",
      result: "Descreva o resultado...", metrics: [{ value: "0%", label: "Impacto" }], color: "#00C2FF", icon: "Target",
      imageUrl: "", projectUrl: "",
    }]);

  const removeProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));

  const handleImageUpload = async (projectId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(projectId);
    try {
      const ext = file.name.split(".").pop();
      const fileName = `projects/${projectId}.${ext}`;
      const { error } = await supabase.storage.from("profile").upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("profile").getPublicUrl(fileName);
      const url = `${urlData.publicUrl}?t=${Date.now()}`;
      updateProject(projectId, "imageUrl", url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(null);
    }
  };

  const removeImage = async (projectId: string) => {
    try {
      const extensions = ["png", "jpg", "jpeg", "webp"];
      await supabase.storage.from("profile").remove(extensions.map((ext) => `projects/${projectId}.${ext}`));
    } catch {}
    updateProject(projectId, "imageUrl", "");
  };

  return (
    <div>
      <h2 style={S.sectionTitle}>🚀 Projetos Estratégicos</h2>
      {projects.map((proj) => (
        <CollapsibleCard key={proj.id} title={proj.title} color={proj.color} onRemove={() => removeProject(proj.id)}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Título"><input style={S.input} value={proj.title} onChange={(e) => updateProject(proj.id, "title", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
            <Field label="Subtítulo"><input style={S.input} value={proj.subtitle} onChange={(e) => updateProject(proj.id, "subtitle", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Tag (ex: Python + BI)"><input style={S.input} value={proj.tag} onChange={(e) => updateProject(proj.id, "tag", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
            <Field label="Ícone">
              <select style={S.input} value={proj.icon} onChange={(e) => updateProject(proj.id, "icon", e.target.value)}>
                {ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Cor do projeto">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {COLORS.map((c) => (
                <button key={c} onClick={() => { updateProject(proj.id, "color", c); updateProject(proj.id, "tagColor", c); }}
                  style={{ width: "28px", height: "28px", borderRadius: "6px", background: c, border: proj.color === c ? "3px solid #fff" : "2px solid transparent", cursor: "pointer" }} />
              ))}
              <input type="color" value={proj.color} onChange={(e) => { updateProject(proj.id, "color", e.target.value); updateProject(proj.id, "tagColor", e.target.value); }}
                style={{ width: "28px", height: "28px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", padding: "0" }} />
            </div>
          </Field>

          <Field label="Problema de negócio"><textarea style={S.textarea} value={proj.problem} onChange={(e) => updateProject(proj.id, "problem", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#F59E0B")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
          <Field label="Solução técnica"><textarea style={S.textarea} value={proj.solution} onChange={(e) => updateProject(proj.id, "solution", e.target.value)} onFocus={(e) => (e.target.style.borderColor = proj.color)} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
          <Field label="Resultado"><textarea style={S.textarea} value={proj.result} onChange={(e) => updateProject(proj.id, "result", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#10B981")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>

          <label style={S.label}>Métricas de resultado</label>
          {proj.metrics.map((metric, idx) => (
            <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <input style={{ ...S.input, flex: "0 0 120px" }} value={metric.value} onChange={(e) => updateMetric(proj.id, idx, "value", e.target.value)} placeholder="Valor (ex: 95%)" onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              <input style={{ ...S.input, flex: 1 }} value={metric.label} onChange={(e) => updateMetric(proj.id, idx, "label", e.target.value)} placeholder="Label" onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              <button onClick={() => removeMetric(proj.id, idx)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "6px", color: "#EF4444", cursor: "pointer", padding: "0 10px" }}><Trash2 size={12} /></button>
            </div>
          ))}
          <button onClick={() => addMetric(proj.id)} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 14px", borderRadius: "6px", background: `${proj.color}10`, border: `1px solid ${proj.color}25`, color: proj.color, fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer", marginTop: "4px", marginBottom: "16px" }}>
            <Plus size={13} /> Adicionar métrica
          </button>

          {/* Project Link */}
          <Field label="Link do projeto (URL externa)">
            <input style={S.input} value={proj.projectUrl || ""} onChange={(e) => updateProject(proj.id, "projectUrl", e.target.value)} placeholder="https://app.powerbi.com/..." onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </Field>

          {/* Project Image Upload */}
          <Field label="Imagem do projeto">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {proj.imageUrl ? (
                <div style={{ width: "160px", height: "90px", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
                  <img src={proj.imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ) : (
                <div style={{ width: "160px", height: "90px", borderRadius: "8px", border: "1px dashed rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6B7280", fontSize: "12px", flexShrink: 0 }}>
                  Sem imagem
                </div>
              )}
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  ref={(el) => { fileRefs.current[proj.id] = el; }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(proj.id, e)}
                  style={{ display: "none" }}
                />
                <button
                  onClick={() => fileRefs.current[proj.id]?.click()}
                  disabled={uploading === proj.id}
                  style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00C2FF", fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer" }}
                >
                  {uploading === proj.id ? "Enviando..." : "Upload"}
                </button>
                {proj.imageUrl && (
                  <button
                    onClick={() => removeImage(proj.id)}
                    style={{ padding: "8px 16px", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer" }}
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>
          </Field>
        </CollapsibleCard>
      ))}
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={addProject} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00C2FF", fontFamily: "'Inter', sans-serif", fontSize: "14px", cursor: "pointer" }}>
          <Plus size={16} /> Novo projeto
        </button>
        <SaveBtn onClick={() => { updateProjects(projects); trigger(); }} saved={saved} />
      </div>
    </div>
  );
}

function PhilosophyEditor() {
  const { data, updatePhilosophy } = useSiteData();
  const [form, setForm] = useState({ ...data.philosophy, principles: data.philosophy.principles.map((p) => ({ ...p })) });
  const { saved, trigger } = useSaved();
  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const updatePrinciple = (i: number, key: keyof Principle, v: string) => {
    const ps = [...form.principles]; ps[i] = { ...ps[i], [key]: v }; set("principles", ps);
  };
  const addPrinciple = () => set("principles", [...form.principles, { number: `0${form.principles.length + 1}`, title: "Novo Princípio", desc: "Descrição..." }]);
  const removePrinciple = (i: number) => set("principles", form.principles.filter((_, idx) => idx !== i));

  return (
    <div>
      <h2 style={S.sectionTitle}>💡 Filosofia & Citação</h2>
      <Field label="Citação principal">
        <textarea style={{ ...S.textarea, minHeight: "110px" }} value={form.quote} onChange={(e) => set("quote", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
      </Field>
      <Field label="Autor da citação">
        <input style={S.input} value={form.author} onChange={(e) => set("author", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
      </Field>

      <label style={{ ...S.label, marginTop: "8px" }}>Princípios</label>
      {form.principles.map((p, i) => (
        <CollapsibleCard key={i} title={p.title} onRemove={() => removePrinciple(i)}>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ width: "70px" }}>
              <label style={S.label}>Número</label>
              <input style={S.input} value={p.number} onChange={(e) => updatePrinciple(i, "number", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={S.label}>Título</label>
              <input style={S.input} value={p.title} onChange={(e) => updatePrinciple(i, "title", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
          </div>
          <div style={{ marginTop: "12px" }}>
            <label style={S.label}>Descrição</label>
            <input style={S.input} value={p.desc} onChange={(e) => updatePrinciple(i, "desc", e.target.value)} onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
        </CollapsibleCard>
      ))}
      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={addPrinciple} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 18px", borderRadius: "8px", background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.25)", color: "#00C2FF", fontFamily: "'Inter', sans-serif", fontSize: "14px", cursor: "pointer" }}>
          <Plus size={16} /> Novo princípio
        </button>
        <SaveBtn onClick={() => { updatePhilosophy(form); trigger(); }} saved={saved} />
      </div>
    </div>
  );
}

function SecurityEditor() {
  const { data, updateAdmin } = useSiteData();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const save = () => {
    if (!pw) { setMsg({ text: "Digite a nova senha", ok: false }); return; }
    if (pw !== confirm) { setMsg({ text: "As senhas não coincidem", ok: false }); return; }
    if (pw.length < 6) { setMsg({ text: "A senha deve ter ao menos 6 caracteres", ok: false }); return; }
    updateAdmin({ password: pw });
    setMsg({ text: "Senha alterada com sucesso!", ok: true });
    setPw(""); setConfirm("");
    setTimeout(() => setMsg(null), 3000);
  };

  return (
    <div>
      <h2 style={S.sectionTitle}>🔐 Segurança</h2>
      <div style={S.card}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#9CA3AF", marginBottom: "20px", lineHeight: 1.6 }}>
          Senha atual do painel Admin: <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#F59E0B" }}>{data.admin.password}</span>
          <br />Altere abaixo para uma senha mais segura.
        </p>
        <Field label="Nova senha"><input type="password" style={S.input} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
        <Field label="Confirmar nova senha"><input type="password" style={S.input} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" onFocus={(e) => (e.target.style.borderColor = "#00C2FF")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} /></Field>
        {msg && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: msg.ok ? "#10B981" : "#EF4444", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            {msg.ok ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />} {msg.text}
          </p>
        )}
        <button onClick={save} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "10px 22px", borderRadius: "8px", background: "#7C3AED", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 700, border: "none", cursor: "pointer" }}>
          <Shield size={16} /> Salvar nova senha
        </button>
      </div>
    </div>
  );
}

// ─── Main Admin ────────────────────────────────────────────────────────────────

const MENU = [
  { id: "personal", label: "Perfil & Hero", icon: <User size={16} /> },
  { id: "metrics", label: "Métricas", icon: <BarChart3 size={16} /> },
  { id: "about", label: "Sobre Mim", icon: <Info size={16} /> },
  { id: "tech", label: "Stack Tecnológica", icon: <Layers size={16} /> },
  { id: "projects", label: "Projetos", icon: <FolderKanban size={16} /> },
  { id: "philosophy", label: "Filosofia", icon: <Quote size={16} /> },
  { id: "security", label: "Segurança", icon: <Shield size={16} /> },
];

function AdminPanel({ onLogout }: { onLogout: () => void }) {
  const [active, setActive] = useState("personal");
  const { resetToDefaults } = useSiteData();
  const navigate = useNavigate();
  const [confirmReset, setConfirmReset] = useState(false);

  const content: Record<string, React.ReactNode> = {
    personal: <PersonalEditor />,
    metrics: <MetricsEditor />,
    about: <AboutEditor />,
    tech: <TechEditor />,
    projects: <ProjectsEditor />,
    philosophy: <PhilosophyEditor />,
    security: <SecurityEditor />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0F1E", display: "flex", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: "260px", flexShrink: 0, background: "rgba(15,23,42,0.95)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 700, color: "#F9FAFB", marginBottom: "2px" }}>
            <span style={{ color: "#00C2FF" }}>Admin</span> Panel
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#9CA3AF" }}>portfolio.config</div>
        </div>

        {/* Menu */}
        <nav style={{ padding: "12px", flex: 1 }}>
          {MENU.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "10px",
                padding: "10px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                background: active === item.id ? "rgba(0,194,255,0.1)" : "transparent",
                color: active === item.id ? "#00C2FF" : "#9CA3AF",
                fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: active === item.id ? 600 : 400,
                marginBottom: "2px", textAlign: "left", transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => { if (active !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
              onMouseLeave={(e) => { if (active !== item.id) e.currentTarget.style.background = "transparent"; }}
            >
              {item.icon}
              {item.label}
              {active === item.id && <ChevronRight size={14} style={{ marginLeft: "auto" }} />}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            onClick={() => navigate("/")}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "8px", background: "rgba(0,194,255,0.08)", border: "1px solid rgba(0,194,255,0.2)", color: "#00C2FF", fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer" }}
          >
            <Eye size={14} /> Ver landing page
          </button>
          {confirmReset ? (
            <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", padding: "10px 12px" }}>
              <p style={{ fontSize: "12px", color: "#EF4444", marginBottom: "8px" }}>Confirmar reset?</p>
              <div style={{ display: "flex", gap: "6px" }}>
                <button onClick={() => { resetToDefaults(); setConfirmReset(false); }} style={{ flex: 1, padding: "6px", borderRadius: "6px", background: "#EF4444", color: "#fff", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600 }}>Sim, resetar</button>
                <button onClick={() => setConfirmReset(false)} style={{ flex: 1, padding: "6px", borderRadius: "6px", background: "rgba(255,255,255,0.06)", color: "#9CA3AF", border: "none", cursor: "pointer", fontSize: "12px" }}>Cancelar</button>
              </div>
            </div>
          ) : (
            <button onClick={() => setConfirmReset(true)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF", fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer" }}>
              <RotateCcw size={14} /> Restaurar padrões
            </button>
          )}
          <button
            onClick={onLogout}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 12px", borderRadius: "8px", background: "transparent", border: "1px solid rgba(239,68,68,0.15)", color: "#EF4444", fontFamily: "'Inter', sans-serif", fontSize: "13px", cursor: "pointer" }}
          >
            <LogOut size={14} /> Sair do Admin
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "40px", maxHeight: "100vh" }}>
        <div style={{ maxWidth: "800px" }}>
          {/* Header */}
          <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              {MENU.find((m) => m.id === active)?.icon}
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "26px", fontWeight: 700, color: "#F9FAFB", letterSpacing: "-0.5px" }}>
                {MENU.find((m) => m.id === active)?.label}
              </h1>
            </div>
            <p style={{ fontSize: "13px", color: "#9CA3AF" }}>
              Edite as informações abaixo — as alterações refletem imediatamente na landing page.
            </p>
          </div>
          {content[active]}
        </div>
      </div>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export function AdminPage() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");

  const login = () => { sessionStorage.setItem("admin_auth", "1"); setAuthed(true); };
  const logout = () => { sessionStorage.removeItem("admin_auth"); setAuthed(false); };

  if (!authed) return <LoginScreen onLogin={login} />;
  return <AdminPanel onLogout={logout} />;
}