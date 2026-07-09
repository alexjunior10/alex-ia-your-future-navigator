import { Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, LogOut, UserCircle, X, CheckCircle2 } from "lucide-react";
import { useAuth } from "../hooks/use-auth";

import { Role } from "../hooks/use-auth";

const allItems = [
  { to: "/test", label: "Test Vocacional", isProtected: true, roles: ["student"] as Role[] },
  { to: "/carreras", label: "Carreras", isProtected: false, roles: ["student", "parent", "school"] as Role[] },
  { to: "/coach", label: "Coach IA", isProtected: false, roles: ["student", "parent", "school"] as Role[] },
  { to: "/examen", label: "Simulador", isProtected: true, roles: ["student"] as Role[] },
  { to: "/padres", label: "Para Padres", isProtected: true, roles: ["parent"] as Role[] },
  { to: "/colegios", label: "Para Colegios", isProtected: true, roles: ["school"] as Role[] },
];

export function SiteHeader() {
  const { role, logout, showAuthModal, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent, item: typeof allItems[0]) => {
    if (item.isProtected && !role) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105 group-hover:-rotate-3">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Alex IA
          </span>
        </Link>
        
        <nav className="hidden items-center gap-1 lg:flex">
          {allItems.filter(item => !role || item.roles.includes(role)).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={(e) => handleLinkClick(e, item)}
              className="rounded-full px-3 py-2 text-[13px] font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              activeProps={{ className: "rounded-full px-3 py-2 text-[13px] bg-muted text-foreground font-bold shadow-sm" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {!role ? (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:scale-105 hover:shadow-lg hover:bg-primary/90"
            >
              <UserCircle className="h-4 w-4" /> Ingresar
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-muted-foreground capitalize hidden sm:inline-block">Perfil: {role === "student" ? "Estudiante" : role === "parent" ? "Padre" : "Colegio"}</span>
              <button
                onClick={logout}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 text-muted-foreground shadow-sm transition-all hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                title="Cerrar sesión"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}