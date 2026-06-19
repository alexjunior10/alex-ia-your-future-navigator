import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Briefcase, Clock, TrendingUp } from "lucide-react";
import { careers } from "../lib/mock-data";

export const Route = createFileRoute("/carreras")({
  head: () => ({ meta: [{ title: "Explorar Carreras — Alex IA" }, { name: "description", content: "Explora carreras universitarias, salarios, demanda y mallas curriculares." }] }),
  component: CareersPage,
});

const areas = ["Todas", "Ingeniería", "Salud", "Negocios", "Arte", "Ciencias Sociales", "Tecnología"];

function CareersPage() {
  const [area, setArea] = useState("Todas");
  const [q, setQ] = useState("");
  const filtered = careers.filter(
    (c) => (area === "Todas" || c.area === area) && c.name.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Explora carreras</h1>
      <p className="mt-2 text-muted-foreground">Filtra por área y descubre qué carreras se ajustan a ti.</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar carrera..."
            className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {areas.map((a) => (
          <button
            key={a}
            onClick={() => setArea(a)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${area === a ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"}`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link key={c.slug} to="/carreras/$slug" params={{ slug: c.slug }} className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{c.area}</span>
              <span className="text-sm font-bold text-primary">{c.affinity}% afinidad</span>
            </div>
            <h3 className="mt-3 text-lg font-semibold">{c.name}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" /> {c.employability}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.duration}</span>
              <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Tendencia ↑</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}