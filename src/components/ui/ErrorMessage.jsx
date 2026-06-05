import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message = "Ha ocurrido un error al conectar con el servidor." }) {
  return (
    <div className="flex items-center gap-3 p-4 border border-destructive/20 bg-destructive/10 text-destructive rounded-lg max-w-2xl mx-auto my-4 shadow-sm">
      <AlertTriangle className="h-5 w-5 shrink-0" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}