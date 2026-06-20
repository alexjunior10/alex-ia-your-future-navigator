import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const navItems = [
  { to: "/test", label: "Test Vocacional" },
  { to: "/carreras", label: "Carreras" },
  { to: "/coach", label: "Coach IA" },
  { to: "/padres", label: "Para Padres" },
  { to: "/colegios", label: "Para Colegios" },
] as const;

export function SiteHeader() {
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
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm bg-muted text-foreground font-semibold shadow-sm" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/test"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:scale-105 hover:shadow-lg hover:bg-primary/90"
          >
            Realizar Test
          </Link>
        </div>
      </div>
    </header>
  );
}