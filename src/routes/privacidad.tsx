import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidad")({
  head: () => ({ meta: [{ title: "Política de Privacidad — Alex IA" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-extrabold">Política de Privacidad</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Alex IA respeta y protege la información de sus usuarios, especialmente de menores de edad. Este es un contenido de ejemplo para el prototipo; la versión legal final se redactará por separado.
      </p>
      <div className="mt-6 space-y-4 text-sm text-muted-foreground">
        <p>Recopilamos únicamente la información necesaria para ofrecerte recomendaciones vocacionales referenciales.</p>
        <p>No compartimos datos personales con terceros sin consentimiento.</p>
        <p>Para consultas: privacidad@alexia.pe</p>
      </div>
    </div>
  ),
});
