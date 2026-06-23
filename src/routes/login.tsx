import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth, type Role } from "../hooks/use-auth";
import { GraduationCap, Users, Building2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar Sesión — Alex IA" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: Role) => {
    login(role);
    if (role === "student") navigate({ to: "/test" });
    if (role === "parent") navigate({ to: "/padres" });
    if (role === "school") navigate({ to: "/colegios" });
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-4xl flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">¿Quién eres?</h1>
        <p className="mt-3 text-muted-foreground">Selecciona tu perfil para ingresar a la plataforma.</p>
      </div>

      <div className="mt-10 grid w-full gap-6 sm:grid-cols-3">
        <button
          onClick={() => handleLogin("student")}
          className="group flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h3 className="mt-5 text-xl font-bold">Soy Estudiante</h3>
          <p className="mt-2 text-sm text-muted-foreground">Quiero descubrir mi carrera ideal y prepararme para el futuro.</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Ingresar <ArrowRight className="h-4 w-4" />
          </div>
        </button>

        <button
          onClick={() => handleLogin("parent")}
          className="group flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-xl"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
            <Users className="h-8 w-8" />
          </div>
          <h3 className="mt-5 text-xl font-bold">Soy Padre/Madre</h3>
          <p className="mt-2 text-sm text-muted-foreground">Quiero acompañar y entender el perfil vocacional de mi hijo/a.</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-secondary opacity-0 transition-opacity group-hover:opacity-100">
            Ingresar <ArrowRight className="h-4 w-4" />
          </div>
        </button>

        <button
          onClick={() => handleLogin("school")}
          className="group flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-accent hover:shadow-xl"
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <Building2 className="h-8 w-8" />
          </div>
          <h3 className="mt-5 text-xl font-bold">Soy Colegio</h3>
          <p className="mt-2 text-sm text-muted-foreground">Quiero ver el progreso vocacional agregado de mis estudiantes.</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            Ingresar <ArrowRight className="h-4 w-4" />
          </div>
        </button>
      </div>
      
      <p className="mt-12 text-sm text-muted-foreground">
        * Para fines de este prototipo, el login es simulado y no requiere contraseña.
      </p>
    </div>
  );
}
