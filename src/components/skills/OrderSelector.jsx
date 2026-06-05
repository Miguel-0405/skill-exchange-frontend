import { ArrowUpDown } from "lucide-react";

export default function OrderSelector({ currentOrder, onOrderChange }) {
  return (
    <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-lg shadow-sm max-w-xs">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
      <select
        value={currentOrder}
        onChange={(e) => onOrderChange(e.target.value)}
        className="w-full bg-transparent text-sm font-medium text-foreground focus:outline-none cursor-pointer"
      >
        <option value="name">Nombre A-Z</option>
        <option value="-name">Nombre Z-A</option>
        <option value="created_at">Más recientes</option>
      </select>
    </div>
  );
}