import { Loader2 } from "lucide-react";

export default function LoadingState({ message = "Cargando información..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-62.5 p-6 space-y-3">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm text-muted-foreground animate-pulse font-medium">
        {message}
      </p>
    </div>
  );
}