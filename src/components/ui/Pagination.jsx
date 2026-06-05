import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ count, page, pageSize, onPageChange }) {
  const totalPages = Math.ceil(count / pageSize);

  if (totalPages <= 1) return null;

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, count);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between p-4 bg-card border border-t-0 rounded-b-md shadow-sm">
      <p className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{startItem}-{endItem}</span> de{" "}
        <span className="font-medium text-foreground">{count}</span>
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="p-2 rounded-md border border-input bg-background hover:bg-muted disabled:opacity-40 disabled:hover:bg-background transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`h-8 w-8 text-sm font-medium rounded-md transition-colors ${num === page
                ? "bg-primary text-primary-foreground shadow"
                : "border border-input bg-background hover:bg-muted"
              }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 rounded-md border border-input bg-background hover:bg-muted disabled:opacity-40 disabled:hover:bg-background transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}