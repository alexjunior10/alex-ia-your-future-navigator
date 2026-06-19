import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const navItems = [
  { to: "/test", label: "Test" },
  { to: "/carreras", label: "Carreras" },
  { to: "/coach", label: "Alex Coach" },
  { to: "/padres", label: "Padres" },
  { to: "/colegios", label: "Colegios" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg tracking-tight">Alex IA</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "rounded-full px-3 py-1.5 text-sm bg-muted text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/test"
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-transform hover:scale-105"
        >
          Realizar test
        </Link>
      </div>
    </header>
  );
}