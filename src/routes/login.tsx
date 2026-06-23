import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth, type Role } from "../hooks/use-auth";
import { useState } from "react";
import { GraduationCap, Users, LogIn, UserPlus } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar Sesión — Alex IA" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"student" | "parent">("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent, role: Role) => {
    e.preventDefault();
    // Simular un login (cualquier credencial es válida)
    login(role);
    if (role === "student") navigate({ to: "/test" });
    if (role === "parent") navigate({ to: "/padres" });
    if (role === "school") navigate({ to: "/colegios" });
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full rounded-3xl border border-border bg-card p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Iniciar Sesión</h1>
          <p className="mt-2 text-sm text-muted-foreground">Ingresa a tu cuenta para continuar.</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-muted p-1 mb-8">
          <button
            onClick={() => setActiveTab("student")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all ${
              activeTab === "student" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <GraduationCap className="h-4 w-4" /> Estudiante
          </button>
          <button
            onClick={() => setActiveTab("parent")}
            className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold transition-all ${
              activeTab === "parent" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="h-4 w-4" /> Padre/Madre
          </button>
        </div>

        {/* Formulario Simulado */}
        <form onSubmit={(e) => handleLogin(e, activeTab)} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              {activeTab === "student" ? "Usuario o Correo" : "Correo Electrónico"}
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={activeTab === "student" ? "ej. alex123" : "ej. padre@correo.com"}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
            >
              <LogIn className="h-5 w-5" /> Iniciar Sesión
            </button>

            <Link
              to={activeTab === "student" ? "/registro/estudiante" : "/registro/padre"}
              className="w-full flex justify-center items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <UserPlus className="h-5 w-5" /> Crear cuenta
            </Link>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={(e) => handleLogin(e, "school")}
          className="text-xs font-medium text-muted-foreground hover:text-foreground underline decoration-muted-foreground/30 underline-offset-4"
        >
          Acceso exclusivo para Colegios
        </button>
      </div>
      
      <p className="mt-6 text-xs text-muted-foreground/60 text-center max-w-sm">
        * Para fines del prototipo, ingresa cualquier usuario y contraseña. No se validan credenciales reales.
      </p>
    </div>
  );
}
