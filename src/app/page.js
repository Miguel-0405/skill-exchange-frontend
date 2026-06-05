import Link from "next/link";
import {
  ArrowRight,
  Layers,
  BookOpen,
  Users,
  GraduationCap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50/40 text-foreground flex flex-col">
      <header className="w-full border-b border-border bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-lg tracking-tight text-slate-900">
              Skill Exchange
            </span>
          </div>
          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-4 py-2 rounded-lg transition-colors border border-slate-200"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 text-xs font-semibold shadow-sm">
          🔹 Plataforma académica • Open API
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Descubre y comparte <br />
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            habilidades
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Skills Exchange es la plataforma donde el conocimiento se convierte en
          conexión. Explora cientos de habilidades, filtra por categoría y
          encuentra lo que necesitas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4 w-full sm:w-auto">
          <Link
            href="/login"
            className=" sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-all text-sm group"
          >
            Empezar ahora
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/dashboard/skills"
            className="my-4 sm:w-auto flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl border border-slate-200 shadow-sm transition-all text-sm"
          >
            Ver skills
          </Link>
        </div>

        <div className="w-full pt-16 border-t border-slate-200/60">
          <h2 className=" text-sm font-semibold tracking-wider text-slate-400 uppercase">
            Todo lo que necesitas en un solo lugar
          </h2>
        </div>

        <div className="flex grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl text-left pt-4">
          <div className="p-5 rounded-2xl border border-slate-200 bg-card shadow-sm space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit border border-blue-100">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-800 tracking-tight">
              Categorías organizadas
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Filtra de manera instantánea entre competencias técnicas,
              creativas, de liderazgo y más.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-card shadow-sm space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit border border-blue-100">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-800 tracking-tight">
              Detalle de cada skill
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Consulta fichas técnicas estructuradas que muestran el nivel
              idóneo y la trazabilidad temporal.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-card shadow-sm space-y-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit border border-blue-100">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-800 tracking-tight">
              Comunidad activa
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Explora un directorio completo de estudiantes y mide tus metas
              mediante barras de progreso.
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full border-t border-border bg-card py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Skills Exchange. Actividad Académica
        de Consumo Frontend.
      </footer>
    </div>
  );
}