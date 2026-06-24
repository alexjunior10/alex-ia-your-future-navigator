import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useAuth, type Role } from "../hooks/use-auth";
import { useState } from "react";
import { GraduationCap, Users, LogIn, UserPlus, Building2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Iniciar Sesión — Alex IA" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"student" | "parent" | "school">("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent, role: Role) => {
    e.preventDefault();
    login(role);
    if (role === "student") navigate({ to: "/bienvenida" });
    if (role === "parent") navigate({ to: "/padres" });
    if (role === "school") navigate({ to: "/colegios" });
  };

  const leftPanelContent = {
    student: {
      emoji: "🧭",
      title: '"No te diremos qué estudiar.\\nTe ayudaremos a descubrir quién puedes llegar a ser."',
      subtitle: "Únete a miles de estudiantes que ya están diseñando su futuro con propósito.",
      gradient: "from-primary to-secondary"
    },
    parent: {
      emoji: "🤝",
      title: '"El futuro de tus hijos comienza con las decisiones de hoy."',
      subtitle: "Acompáñalos en cada paso hacia su desarrollo profesional con herramientas de IA.",
      gradient: "from-secondary to-primary"
    },
    school: {
      emoji: "🏫",
      title: '"Transformamos la orientación vocacional de tu colegio."',
      subtitle: "Empodera a tus alumnos con datos y tecnología para que tomen las mejores decisiones.",
      gradient: "from-accent to-accent/80"
    }
  };

  const content = leftPanelContent[activeTab];

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-card border border-border shadow-2xl flex flex-col md:flex-row">
        
        {/* Panel Izquierdo - Ilustración y Emoción */}
        <div className={`relative md:w-5/12 bg-gradient-to-br ${content.gradient} p-10 text-primary-foreground flex flex-col justify-between overflow-hidden hidden sm:flex transition-colors duration-500`}>
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
          
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2 font-bold mb-12 hover:opacity-80 transition-opacity">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-primary shadow-sm">
                <Sparkles className="h-4 w-4" />
              </span>
              <span>Alex IA</span>
            </Link>
          </div>
          
          <div key={activeTab} className="relative z-10 flex-1 flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-6xl mb-6 filter drop-shadow-md">{content.emoji}</div>
            <h2 className="text-3xl font-extrabold leading-tight mb-4">
              {content.title.split('\\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className="text-primary-foreground/80 font-medium">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Panel Derecho - Formulario */}
        <div className="md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-background">
          <div className="text-center md:text-left mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight">Qué bueno verte nuevamente 👋</h1>
            <p className="mt-2 text-sm text-muted-foreground">Selecciona tu perfil y accede a tu cuenta.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row rounded-xl bg-muted p-1 mb-8">
            <button
              onClick={() => setActiveTab("student")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "student" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="h-4 w-4" /> Estudiante
            </button>
            <button
              onClick={() => setActiveTab("parent")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "parent" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-4 w-4" /> Padres
            </button>
            <button
              onClick={() => setActiveTab("school")}
              className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "school" ? "bg-background text-foreground shadow" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="h-4 w-4" /> Colegios
            </button>
          </div>

          {/* Formulario Estudiante o Padre */}
          {activeTab !== "school" && (
            <form onSubmit={(e) => handleLogin(e, activeTab)} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground shadow-md transition-transform hover:scale-[1.02]"
                >
                  <LogIn className="h-5 w-5" /> Ingresar
                </button>

                <Link
                  to={activeTab === "student" ? "/registro/estudiante" : "/registro/padre"}
                  className="flex-1 flex justify-center items-center gap-2 rounded-xl border border-border bg-background px-4 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <UserPlus className="h-5 w-5" /> Crear cuenta
                </Link>
              </div>
            </form>
          )}

          {/* Formulario Colegios */}
          {activeTab === "school" && (
            <form onSubmit={(e) => handleLogin(e, "school")} className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="rounded-2xl bg-accent/10 p-5 mb-6 text-center border border-accent/20">
                <Building2 className="h-8 w-8 text-accent mx-auto mb-3" />
                <p className="text-sm font-medium text-accent-foreground leading-relaxed">
                  Más de 50 colegios utilizan herramientas de orientación vocacional para acompañar mejor a sus estudiantes.
                </p>
              </div>
              
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Correo Institucional</label>
                <input
                  type="email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@colegio.edu.pe"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 rounded-xl bg-accent px-4 py-3 font-bold text-accent-foreground shadow-md transition-transform hover:scale-[1.02]"
                >
                  <LogIn className="h-5 w-5" /> Ingresar al Dashboard
                </button>
              </div>
            </form>
          )}

          <p className="mt-8 text-xs text-muted-foreground/60 text-center">
            * Prototipo: ingresa cualquier valor para simular el inicio de sesión.
          </p>
        </div>

      </div>
    </div>
  );
}
