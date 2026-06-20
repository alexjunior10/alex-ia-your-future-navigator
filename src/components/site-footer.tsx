import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube, Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-lg">Alex IA</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Transformando decisiones de vida con Inteligencia Artificial.
            </p>
            <div className="mt-4 flex gap-3 text-muted-foreground">
              <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-5 w-5" /></a>
              <a href="#" aria-label="YouTube" className="hover:text-foreground"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Producto</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/test" className="hover:text-foreground transition-colors">Test Vocacional</Link></li>
              <li><Link to="/carreras" className="hover:text-foreground transition-colors">Carreras</Link></li>
              <li><Link to="/coach" className="hover:text-foreground transition-colors">Coach IA</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Compañía</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/padres" className="hover:text-foreground transition-colors">Para Padres</Link></li>
              <li><Link to="/colegios" className="hover:text-foreground transition-colors">Para Colegios</Link></li>
              <li><Link to="/privacidad" className="hover:text-foreground transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Aviso importante:</strong> Alex IA es una herramienta de orientación y autoconocimiento.
          No constituye un diagnóstico psicológico ni reemplaza la evaluación de un psicólogo u orientador vocacional certificado.
          Los porcentajes de afinidad son estimaciones referenciales basadas en tus respuestas, no mediciones exactas de habilidad o éxito futuro.
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Alex IA · Hecho en Perú</p>
      </div>
    </footer>
  );
}