"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { ArrowLeft, Calendar, Tag, Layers, Hash } from "lucide-react";
import LoadingState from "@/components/ui/LoadingState";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function SkillDetailPage() {
    const { id } = useParams();
    const router = useRouter();

    const [skill, setSkill] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");

        api.get(`/skills/${id}/`)
            .then((response) => {
                setSkill(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("No se pudo obtener la información detallada de la habilidad seleccionada.");
                setLoading(false);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                router.push("/login");  
            });
    }, [id]);

    if (loading) return <LoadingState message="Cargando ficha técnica..." />;
    if (error) return <ErrorMessage message={error} />;
    if (!skill) return <ErrorMessage message="No se encontró el registro de la habilidad." />;

    const levelStyles = {
        beginner: "bg-green-50 text-green-700 border-green-200",
        intermediate: "bg-blue-50 text-blue-700 border-blue-200",
        advanced: "bg-orange-50 text-orange-700 border-orange-200",
        expert: "bg-purple-50 text-purple-700 border-purple-200",
    };
    const currentLevelStyle = levelStyles[skill.level?.toLowerCase()] || "bg-muted text-muted-foreground";

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <main className="flex-1 p-6 space-y-6 max-w-4xl mx-auto w-full animate-in fade-in duration-300">

            <button
                onClick={() => router.push("/dashboard/skills")}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
            >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
                Volver a Skills
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-xl border border-border bg-card shadow-sm">
                <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">{skill.name}</h1>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${currentLevelStyle} capitalize h-fit`}>
                            {skill.level}
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">
                        {skill.category?.replace("_", " ")}
                    </p>
                    <p className="text-base text-foreground/80 mt-4 pt-2 border-t border-border/50">
                        {skill.description || "Sin descripción disponible para esta habilidad académica."}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="p-5 rounded-xl border border-border bg-card space-y-4 shadow-sm">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                        Información del Registro
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                <Hash className="h-3.5 w-3.5" /> ID
                            </span>
                            <p className="font-semibold text-foreground text-base">#{skill.id}</p>
                        </div>

                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                <Layers className="h-3.5 w-3.5" /> Categoría
                            </span>
                            <p className="font-medium text-foreground capitalize">{skill.category?.replace("_", " ")}</p>
                        </div>
                    </div>
                </div>

                <div className="p-5 rounded-xl border border-border bg-card space-y-4 shadow-sm">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                        Trazabilidad Temporal
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                <Calendar className="h-3.5 w-3.5" /> Creada
                            </span>
                            <p className="font-medium text-foreground">{formatDate(skill.created_at)}</p>
                        </div>

                        <div className="space-y-1">
                            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                                <Calendar className="h-3.5 w-3.5" /> Actualizada
                            </span>
                            <p className="font-medium text-foreground">{formatDate(skill.updated_at || skill.created_at)}</p>
                        </div>
                    </div>
                </div>

            </div>

        </main>
    );
}