import Link from "next/link";

export default function SkillCard({ skill }) {
  const levelStyles = {
    beginner: "bg-green-50 text-green-700 border-green-200",
    intermediate: "bg-blue-50 text-blue-700 border-blue-200",
    advanced: "bg-orange-50 text-orange-700 border-orange-200",
    expert: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const currentLevelStyle = levelStyles[skill.level?.toLowerCase()] || "bg-muted text-muted-foreground";

  return (
    <Link href={`/dashboard/skills/${skill.id}`}>
      <div className="flex flex-col justify-between h-36 p-4 rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/40 transition-all cursor-pointer">
        <div>
          <h3 className="font-semibold text-base text-foreground line-clamp-1">
            {skill.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1 capitalize">
            {skill.category?.replace("_", " ")}
          </p>
        </div>

        <div className="flex justify-end">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${currentLevelStyle} capitalize`}>
            {skill.level}
          </span>
        </div>
      </div>
    </Link>
  );
}