import {
  Code, Palette, MessageSquare, Users,
  Briefcase, Heart, HelpCircle, Layers
} from "lucide-react";

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  const categories = [
    { id: "technical", label: "Technical", icon: Code },
    { id: "creative", label: "Creative", icon: Palette },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "leadership", label: "Leadership", icon: Users },
    { id: "business", label: "Business", icon: Briefcase },
    { id: "personal_development", label: "Personal development", icon: Heart },
    { id: "other", label: "Other", icon: HelpCircle },
  ];

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Categorías
        </span>
        {activeCategory && (
          <button
            onClick={() => onCategoryChange("")}
            className="text-xs font-medium text-primary hover:underline"
          >
            Limpiar filtro
          </button>
        )}
      </div>

      <div className="flex grid-cols-2 sm:flex sm:flex-wrap gap-6">
        <button
          onClick={() => onCategoryChange("")}
          className={`flex items-center gap-4  px-4 py-3 text-sm font-medium rounded-lg border transition-all ${!activeCategory
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-card text-foreground border-border hover:bg-muted"
            }`}
        >
          <Layers className="h-4 w-4" />
          Todas
        </button>

        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-all ${isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-foreground border-border hover:bg-muted"
                }`}
            >
              <IconComponent className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}