import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

interface AdminLoginProps {
  onLogin: (password: string) => boolean;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(password);
    if (!ok) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center">
      <div className="card-glass rounded-2xl p-8 w-full max-w-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan/20 text-cyan">
            <Lock size={20} />
          </div>
          <div>
            <p className="font-bold text-foreground">Admin Panel</p>
            <p className="text-xs font-mono text-muted-foreground">portfolio.config</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-muted-foreground mb-1 uppercase tracking-widest">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm text-foreground border border-border focus:outline-none focus:border-cyan/50 pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-xs text-destructive font-mono">Senha incorreta.</p>
          )}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={{
              background: "linear-gradient(135deg, hsl(var(--cyan)), hsl(191 97% 40%))",
              color: "hsl(var(--background))",
            }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
