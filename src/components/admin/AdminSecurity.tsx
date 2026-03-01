import { useState } from "react";
import type { SiteData } from "@/types/site";

interface AdminSecurityProps {
  data: SiteData;
  onChange: (data: SiteData) => void;
  onSave: () => void;
}

export function AdminSecurity({ data, onChange, onSave }: AdminSecurityProps) {
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleSave = () => {
    if (!newPass) { setMsg("Digite uma nova senha."); return; }
    if (newPass !== confirm) { setMsg("As senhas não conferem."); return; }
    onChange({ ...data, admin: { ...data.admin, password: newPass } });
    setMsg("✅ Senha atualizada! Clique em Salvar alterações.");
    setNewPass(""); setConfirm("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-1">Segurança</h2>
      <p className="text-sm text-muted-foreground mb-6">Gerencie a senha de acesso ao painel admin.</p>
      <div className="card-glass rounded-xl p-6 space-y-4 max-w-md">
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">Nova Senha</label>
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)}
            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none" />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">Confirmar Senha</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none" />
        </div>
        {msg && <p className="text-xs text-cyan font-mono">{msg}</p>}
        <div className="flex gap-3">
          <button onClick={handleSave}
            className="px-4 py-2 rounded-lg text-sm border border-border text-foreground/80 hover:bg-muted">
            Atualizar senha
          </button>
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
