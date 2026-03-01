import { useState } from "react";
import {
  User, BarChart3, Info, Layers, FolderOpen, Lightbulb,
  Shield, Eye, RotateCcw, LogOut, ChevronRight
} from "lucide-react";

const navItems = [
  { id: "profile", label: "Perfil & Hero", icon: User },
  { id: "metrics", label: "Métricas", icon: BarChart3 },
  { id: "about", label: "Sobre Mim", icon: Info },
  { id: "stack", label: "Stack Tecnológica", icon: Layers },
  { id: "projects", label: "Projetos", icon: FolderOpen },
  { id: "philosophy", label: "Filosofia", icon: Lightbulb },
  { id: "security", label: "Segurança", icon: Shield },
];

interface AdminSidebarProps {
  active: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
  onReset: () => void;
}

export function AdminSidebar({ active, onNavigate, onLogout, onReset }: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-56 flex flex-col border-r border-sidebar-border"
      style={{ background: "hsl(var(--sidebar-background))" }}>
      {/* Header */}
      <div className="p-5 border-b border-sidebar-border">
        <p className="font-bold text-foreground">
          <span className="text-gradient-cyan">Admin</span> Panel
        </p>
        <p className="text-xs font-mono text-muted-foreground mt-0.5">portfolio.config</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
              active === id
                ? "text-foreground font-medium"
                : "text-sidebar-foreground hover:text-foreground"
            }`}
            style={
              active === id
                ? { background: "hsl(var(--sidebar-accent))" }
                : {}
            }
          >
            <div className="flex items-center gap-3">
              <Icon size={15} style={active === id ? { color: "hsl(var(--cyan))" } : {}} />
              {label}
            </div>
            {active === id && <ChevronRight size={14} style={{ color: "hsl(var(--cyan))" }} />}
          </button>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-cyan hover:bg-sidebar-accent transition-all"
        >
          <Eye size={14} />
          Ver landing page
        </a>
        <button
          onClick={onReset}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent transition-all"
        >
          <RotateCcw size={14} />
          Restaurar padrões
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut size={14} />
          Sair do Admin
        </button>
      </div>
    </aside>
  );
}
