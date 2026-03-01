import { useState } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminProfile } from "@/components/admin/AdminProfile";
import { AdminMetrics } from "@/components/admin/AdminMetrics";
import { AdminAbout } from "@/components/admin/AdminAbout";
import { AdminStack } from "@/components/admin/AdminStack";
import { AdminProjects } from "@/components/admin/AdminProjects";
import { AdminPhilosophy } from "@/components/admin/AdminPhilosophy";
import { AdminSecurity } from "@/components/admin/AdminSecurity";
import { useSiteData } from "@/hooks/useSiteData";
import { defaultSiteData } from "@/data/defaultSiteData";

export default function AdminPage() {
  const { siteData, setSiteData, saveSiteData, loading } = useSiteData();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("admin_auth") === "true";
  });
  const [activeSection, setActiveSection] = useState("profile");
  const [saveMsg, setSaveMsg] = useState("");

  const handleLogin = (password: string): boolean => {
    if (password === siteData.admin.password) {
      sessionStorage.setItem("admin_auth", "true");
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsLoggedIn(false);
  };

  const handleSave = async () => {
    const ok = await saveSiteData(siteData);
    setSaveMsg(ok ? "✅ Salvo com sucesso!" : "❌ Erro ao salvar. (Sem backend ativo, dados ficam em memória)");
    setTimeout(() => setSaveMsg(""), 3000);
  };

  const handleReset = () => {
    if (confirm("Restaurar todos os dados padrão?")) {
      setSiteData(defaultSiteData);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-muted-foreground font-mono text-sm animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const sectionProps = { data: siteData, onChange: setSiteData, onSave: handleSave };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar
        active={activeSection}
        onNavigate={setActiveSection}
        onLogout={handleLogout}
        onReset={handleReset}
      />
      <main className="ml-56 flex-1 p-8 overflow-y-auto min-h-screen">
        {saveMsg && (
          <div className="fixed top-4 right-4 z-50 card-glass rounded-lg px-4 py-3 text-sm font-mono border border-border">
            {saveMsg}
          </div>
        )}
        {activeSection === "profile" && <AdminProfile {...sectionProps} />}
        {activeSection === "metrics" && <AdminMetrics {...sectionProps} />}
        {activeSection === "about" && <AdminAbout {...sectionProps} />}
        {activeSection === "stack" && <AdminStack {...sectionProps} />}
        {activeSection === "projects" && <AdminProjects {...sectionProps} />}
        {activeSection === "philosophy" && <AdminPhilosophy {...sectionProps} />}
        {activeSection === "security" && <AdminSecurity {...sectionProps} />}
      </main>
    </div>
  );
}
