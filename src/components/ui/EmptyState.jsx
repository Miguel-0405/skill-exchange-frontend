import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "No se encontraron resultados",
  message = "Prueba cambiando los filtros o realizando una nueva búsqueda."
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-dashed border-border rounded-xl bg-card max-w-md mx-auto my-8 space-y-3">
      <div className="p-3 bg-muted rounded-full">
        <Inbox className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}