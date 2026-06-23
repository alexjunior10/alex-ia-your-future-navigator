import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube, Sparkles, ArrowRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background relative overflow-hidden">
      {/* Motivador - Top Banner */}
      <div className="border-b border-border/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4 text-foreground">
            ¿Y si tu carrera ideal aún no la has descubierto?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Miles de estudiantes ya comenzaron a explorar su futuro con Alex IA.
          </p>
          <Link to="/test" className="inline-flex justify-center items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105">
            Realizar Test <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold mb-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Alex IA</span>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Transformando decisiones de vida con Inteligencia Artificial. No te diremos qué estudiar, te ayudaremos a descubrir quién puedes llegar a ser.
            </p>
            <div className="mt-6 flex gap-4 text-muted-foreground">
              <a href="#" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wider uppercase mb-6">Producto</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link to="/test" className="hover:text-primary transition-colors">Test Vocacional</Link></li>
              <li><Link to="/carreras" className="hover:text-primary transition-colors">Carreras</Link></li>
              <li><Link to="/coach" className="hover:text-primary transition-colors">Coach IA</Link></li>
              <li><Link to="/examen" className="hover:text-primary transition-colors">Simulador</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground tracking-wider uppercase mb-6">Compañía</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Nosotros</Link></li>
              <li><Link to="/padres" className="hover:text-primary transition-colors">Para Padres</Link></li>
              <li><Link to="/colegios" className="hover:text-primary transition-colors">Para Colegios</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">Privacidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-medium">© {new Date().getFullYear()} Alex IA · Hecho en Perú</p>
          <p className="text-[10px] text-muted-foreground/60 max-w-lg text-center md:text-right">
            Alex IA es una plataforma de autoconocimiento, no reemplaza la evaluación de un profesional certificado.
          </p>
        </div>
      </div>
    </footer>
  );
}