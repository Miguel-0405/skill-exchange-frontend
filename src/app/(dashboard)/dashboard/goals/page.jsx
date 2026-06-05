"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Target, CheckCircle2 } from "lucide-react";

import LoadingState from "@/components/ui/LoadingState";
import ErrorMessage from "@/components/ui/ErrorMessage";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import { useRouter } from "next/navigation";

export default function GoalsPage() {
    const [goalsData, setGoalsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [processingId, setProcessingId] = useState(null);
    const router = useRouter();

    const PAGE_SIZE = 10;

    const fetchGoals = (silent = false) => {
        if (!silent) setLoading(true);
        setError("");

        api.get("/goals/", {
            params: { page: page }
        })
            .then((response) => {
                setGoalsData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error al recuperar tus objetivos de aprendizaje actuales.");
                setLoading(false);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                router.push("/login"); 
            });
    };

    useEffect(() => {
        fetchGoals(false);
    }, [page]);

    const handleAchieveGoal = (id) => {
        setProcessingId(id);

        api.post(`/goals/${id}/achieve/`, {})
            .then(() => {
                fetchGoals(true);
            })
            .catch((err) => {
                console.error("Error al procesar el logro:", err);
                alert("No se pudo actualizar el estado de la meta seleccionada.");
            })
            .finally(() => {
                setProcessingId(null);
            });
    };

    return (
        <main className="flex-1 p-6 space-y-6 max-w-5xl mx-auto w-full animate-in fade-in duration-300">

            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Metas de Aprendizaje</h1>
                <p className="text-muted-foreground mt-1">
                    Establece objetivos de estudio, mide tu progreso y alcanza tus metas académicas.
                </p>
            </div>

            <div className="pt-2">
                {loading && <LoadingState message="Sincronizando tus metas académicas..." />}

                {error && <ErrorMessage message={error} />}

                {!loading && !error && goalsData?.results?.length === 0 && (
                    <EmptyState
                        title="Sin metas activas"
                        message="Actualmente no registras objetivos vinculados a ninguna habilidad técnica."
                    />
                )}

                {!loading && !error && goalsData?.results?.length > 0 && (
                    <div className="space-y-4">

                        <div className="grid grid-cols-1 gap-4">
                            {goalsData.results.map((goal) => {
                                const isAchieved = goal.status === "achieved";

                                const current = parseFloat(goal.current_value ?? 0);
                                const target = parseFloat(goal.target_value ?? 1);

                                const percentage = target > 0 ? Math.min(Math.round((current / target) * 100), 100) : 0;

                                return (
                                    <div
                                        key={goal.id}
                                        className={`p-5 rounded-xl border transition-all bg-card shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 ${isAchieved ? "border-green-200/60 bg-green-50/10" : "border-border"
                                            }`}
                                    >
                                        <div className="flex-1 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isAchieved ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                                                    }`}>
                                                    <Target className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-base text-foreground tracking-tight">
                                                        {goal.title || "Objetivo Académico"}
                                                    </h3>
                                                    <p className="text-xs font-medium text-muted-foreground mt-0.5">
                                                        Skill vinculada: <span className="text-foreground capitalize">{goal.skill?.name || "General"}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-1.5 max-w-xl">
                                                <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                                    <span>Progreso: {current.toFixed(2)}/{target.toFixed(2)}</span>
                                                    <span className={isAchieved ? "text-green-600 font-bold" : ""}>{percentage}%</span>
                                                </div>
                                                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden border border-border/10">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${isAchieved ? "bg-green-600" : "bg-primary"
                                                            }`}
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="shrink-0 flex items-center md:justify-end">
                                            {isAchieved ? (
                                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 border border-green-200 text-xs font-semibold shadow-sm">
                                                    <CheckCircle2 className="h-4 w-4" />
                                                    Alcanzada
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleAchieveGoal(goal.id)}
                                                    disabled={processingId !== null}
                                                    className="w-full md:w-auto px-4 py-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground rounded-lg transition-all shadow-sm disabled:opacity-50"
                                                >
                                                    {processingId === goal.id ? "Procesando..." : "Alcanzar"}
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-2">
                            <Pagination
                                count={goalsData.count}
                                page={page}
                                pageSize={PAGE_SIZE}
                                onPageChange={(newPage) => setPage(newPage)}
                            />
                        </div>

                    </div>
                )}
            </div>

        </main>
    );
}