import { createFileRoute } from "@tanstack/react-router";
import { Heart, MessageCircle, Calendar, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/padres")({
  head: () => ({ meta: [{ title: "Portal para Padres — Alex IA" }, { name: "description", content: "Acompaña el futuro vocacional de tu hijo con Alex IA." }] }),
  component: PadresPage,
});

function PadresPage() {
  const tips = [
    { icon: Heart, title: "No presiones", text: "Acompaña sin imponer carreras o expectativas propias." },
    { icon: Lightbulb, title: "Explora extracurriculares", text: "Talleres y voluntariados ayudan a descubrir intereses reales." },
    { icon: MessageCircle, title: "Conversa sobre expectativas", text: "Habla del futuro con calma, escucha más de lo que opinas." },
    { icon: Calendar, title: "Valora el proceso", text: "Cambiar de idea es parte normal del descubrimiento." },
  ];
  const timeline = [
    { year: "3ro Secundaria", phase: "Exploración", text: "Descubrir intereses sin presión." },
    { year: "4to Secundaria", phase: "Profundización", text: "Probar áreas con cursos cortos y mentorías." },
    { year: "5to Secundaria", phase: "Decisión", text: "Decidir con información y autoconocimiento." },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="rounded-3xl bg-gradient-to-br from-secondary/30 to-primary/20 p-10">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Acompaña el futuro de tu hijo</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Conoce el perfil vocacional de tu hijo, sus fortalezas y áreas para acompañar mejor.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Resumen del perfil</h3>
          <p className="mt-2 text-sm text-muted-foreground">Carreras recomendadas (referenciales):</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex justify-between"><span>Ingeniería de Sistemas</span><span className="font-semibold text-primary">92%</span></li>
            <li className="flex justify-between"><span>Diseño Gráfico</span><span className="font-semibold text-primary">87%</span></li>
            <li className="flex justify-between"><span>Marketing</span><span className="font-semibold text-primary">81%</span></li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Fortalezas y áreas a desarrollar</h3>
          <p className="mt-2 text-sm text-muted-foreground">Lo que destaca: <strong className="text-foreground">creatividad</strong> y <strong className="text-foreground">comunicación</strong>.</p>
          <p className="mt-2 text-sm text-muted-foreground">A desarrollar: organización del tiempo y exposición a STEM.</p>
        </div>
      </div>

      <h2 className="mt-12 text-2xl font-bold">Consejos para acompañar</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {tips.map((t) => (
          <div key={t.title} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/30 text-accent-foreground">
              <t.icon className="h-5 w-5" />
            </div>
            <h4 className="mt-3 font-semibold">{t.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{t.text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold">Línea de tiempo de orientación</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {timeline.map((p, i) => (
          <div key={p.year} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="text-xs font-bold text-primary">Etapa {i + 1}</div>
            <h4 className="mt-1 font-semibold">{p.year}</h4>
            <div className="text-sm text-accent-foreground">{p.phase}</div>
            <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}