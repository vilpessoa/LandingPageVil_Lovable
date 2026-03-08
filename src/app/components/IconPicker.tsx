import { useState, useRef } from "react";
import { icons } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Smile, Code, ImageIcon, Upload, Trash2, X } from "lucide-react";

type IconType = "emoji" | "lucide" | "png";

function detectType(value: string): IconType {
  if (value.startsWith("lucide:")) return "lucide";
  if (value.startsWith("png:")) return "png";
  return "emoji";
}

const POPULAR_LUCIDE = [
  "BarChart3", "Database", "Cpu", "Zap", "Target", "TrendingUp",
  "Code", "Globe", "Server", "Cloud", "Lock", "Settings",
  "Layers", "GitBranch", "Terminal", "Monitor", "Smartphone", "Puzzle",
  "Rocket", "LineChart", "PieChart", "Activity", "Box", "Workflow",
];

interface Props {
  value: string;
  onChange: (val: string) => void;
  color?: string;
}

export function IconPicker({ value, onChange, color = "#00C2FF" }: Props) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<IconType>(detectType(value));
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/png")) return;
    setUploading(true);
    try {
      const name = `icon_${Date.now()}.png`;
      // Delete old if exists
      if (value.startsWith("png:")) {
        const oldPath = value.replace("png:", "").split("/").pop();
        if (oldPath) await supabase.storage.from("profile").remove([`icons/${oldPath}`]);
      }
      const { error } = await supabase.storage.from("profile").upload(`icons/${name}`, file, { upsert: true });
      if (!error) {
        const { data: urlData } = supabase.storage.from("profile").getPublicUrl(`icons/${name}`);
        onChange(`png:${urlData.publicUrl}`);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDeletePng = async () => {
    if (value.startsWith("png:")) {
      const oldPath = value.replace("png:", "").split("/").pop();
      if (oldPath) await supabase.storage.from("profile").remove([`icons/${oldPath}`]);
    }
    onChange("🔧");
  };

  const filteredLucide = search
    ? Object.keys(icons).filter((k) => k.toLowerCase().includes(search.toLowerCase())).slice(0, 30)
    : POPULAR_LUCIDE;

  const tabStyle = (t: IconType): React.CSSProperties => ({
    flex: 1, padding: "6px 0", borderRadius: "6px", border: "none", cursor: "pointer",
    fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600,
    background: tab === t ? `${color}25` : "transparent",
    color: tab === t ? color : "#9CA3AF",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
  });

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", height: "42px", background: "rgba(255,255,255,0.04)",
          border: `1px solid ${open ? color : "rgba(255,255,255,0.1)"}`,
          borderRadius: "8px", cursor: "pointer", display: "flex",
          alignItems: "center", justifyContent: "center", transition: "border-color 0.2s",
        }}
      >
        <RenderIcon value={value} size={22} color={color} />
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "48px", left: 0, zIndex: 100,
          width: "280px", background: "#1E293B", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px", padding: "12px", boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", fontWeight: 600, color: "#F9FAFB" }}>Escolher Ícone</span>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#9CA3AF", cursor: "pointer" }}><X size={14} /></button>
          </div>

          <div style={{ display: "flex", gap: "4px", marginBottom: "10px", background: "rgba(255,255,255,0.04)", borderRadius: "8px", padding: "3px" }}>
            <button style={tabStyle("emoji")} onClick={() => setTab("emoji")}><Smile size={12} /> Emoji</button>
            <button style={tabStyle("lucide")} onClick={() => setTab("lucide")}><Code size={12} /> Lucide</button>
            <button style={tabStyle("png")} onClick={() => setTab("png")}><ImageIcon size={12} /> PNG</button>
          </div>

          {tab === "emoji" && (
            <div>
              <input
                style={{
                  width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px", padding: "8px 10px", color: "#F9FAFB", fontSize: "20px",
                  textAlign: "center", outline: "none",
                }}
                value={detectType(value) === "emoji" ? value : ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Cole um emoji"
              />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: "#6B7280", marginTop: "6px", textAlign: "center" }}>
                Cole ou digite um emoji diretamente
              </p>
            </div>
          )}

          {tab === "lucide" && (
            <div>
              <input
                style={{
                  width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px", padding: "7px 10px", color: "#F9FAFB", fontSize: "13px",
                  outline: "none", fontFamily: "'Inter', sans-serif", marginBottom: "8px",
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar ícone..."
              />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "4px", maxHeight: "160px", overflowY: "auto" }}>
                {filteredLucide.map((name) => {
                  const Icon = icons[name as keyof typeof icons];
                  if (!Icon) return null;
                  const selected = value === `lucide:${name}`;
                  return (
                    <button
                      key={name}
                      title={name}
                      onClick={() => { onChange(`lucide:${name}`); setOpen(false); }}
                      style={{
                        width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center",
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
            </div>
          )}

          {tab === "png" && (
            <div style={{ textAlign: "center" }}>
              {value.startsWith("png:") ? (
                <div>
                  <img
                    src={value.replace("png:", "")}
                    alt="icon"
                    style={{ width: "48px", height: "48px", objectFit: "contain", borderRadius: "8px", margin: "8px auto", display: "block" }}
                  />
                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    <button
                      onClick={() => fileRef.current?.click()}
                      style={{
                        padding: "6px 12px", borderRadius: "6px", border: `1px solid ${color}40`,
                        background: `${color}10`, color, cursor: "pointer",
                        fontFamily: "'Inter', sans-serif", fontSize: "12px",
                        display: "flex", alignItems: "center", gap: "4px",
                      }}
                    >
                      <Upload size={12} /> Trocar
                    </button>
                    <button
                      onClick={handleDeletePng}
                      style={{
                        padding: "6px 12px", borderRadius: "6px", border: "1px solid rgba(239,68,68,0.3)",
                        background: "rgba(239,68,68,0.1)", color: "#EF4444", cursor: "pointer",
                        fontFamily: "'Inter', sans-serif", fontSize: "12px",
                        display: "flex", alignItems: "center", gap: "4px",
                      }}
                    >
                      <Trash2 size={12} /> Remover
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  style={{
                    padding: "16px 24px", borderRadius: "10px", border: "2px dashed rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.03)", color: "#9CA3AF", cursor: "pointer",
                    fontFamily: "'Inter', sans-serif", fontSize: "13px", width: "100%",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                  }}
                >
                  <Upload size={20} />
                  {uploading ? "Enviando..." : "Upload PNG"}
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".png"
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleUpload(f);
                  e.target.value = "";
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Reusable renderer – import this anywhere you need to display the icon */
export function RenderIcon({ value, size = 20, color = "#00C2FF" }: { value: string; size?: number; color?: string }) {
  if (value.startsWith("lucide:")) {
    const name = value.replace("lucide:", "");
    const Icon = icons[name as keyof typeof icons];
    if (Icon) return <Icon size={size} color={color} />;
    return <span style={{ fontSize: size }}>{name}</span>;
  }
  if (value.startsWith("png:")) {
    const url = value.replace("png:", "");
    return <img src={url} alt="icon" style={{ width: size, height: size, objectFit: "contain" }} />;
  }
  return <span style={{ fontSize: size, lineHeight: 1 }}>{value}</span>;
}
