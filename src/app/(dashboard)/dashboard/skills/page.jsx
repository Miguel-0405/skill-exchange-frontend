"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Search } from "lucide-react";

import LoadingState from "@/components/ui/LoadingState";
import ErrorMessage from "@/components/ui/ErrorMessage";
import EmptyState from "@/components/ui/EmptyState";
import Pagination from "@/components/ui/Pagination";
import SkillCard from "@/components/skills/SkillCard";
import CategoryFilter from "@/components/skills/CategoryFilter";
import OrderSelector from "@/components/skills/OrderSelector";

export default function SkillsPage() {
    const [skillsData, setSkillsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("");
    const [ordering, setOrdering] = useState("name");
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const PAGE_SIZE = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);

        return () => clearTimeout(handler);
    }, [search]);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        setError("");

        api.get("/skills/", {
            params: {
                page: page,
                category: category || undefined,
                ordering: ordering || undefined,
                search: debouncedSearch || undefined,
            },
        })
            .then((response) => {
                if (isMounted) {
                    setSkillsData(response.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError("Error al cargar las habilidades de la plataforma. Por favor, inténtalo de nuevo.");
                    setLoading(false);
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    router.push("/login");
                }
            });

        return () => {
            isMounted = false;
        };
    }, [page, category, ordering, debouncedSearch]);

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setPage(1);
    };

    return (
        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Skills</h1>
                <p className="text-muted-foreground mt-1">
                    Explora cientos de habilidades, filtra por categoría y encuentra lo que necesitas.
                </p>
            </div>
            <div className="flex sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-2">
            <CategoryFilter
                activeCategory={category}
                onCategoryChange={handleCategoryChange}
            />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-2">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por término (ej: python, react)..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>

                <OrderSelector
                    currentOrder={ordering}
                    onOrderChange={(val) => { setOrdering(val); setPage(1); }}
                />
            </div>

            <div className="pt-2">
                {loading && <LoadingState message="Buscando competencias en el servidor..." />}

                {error && <ErrorMessage message={error} />}

                {!loading && !error && skillsData?.results?.length === 0 && (
                    <EmptyState
                        title="No se encontraron habilidades"
                        message="No hay registros que coincidan con los criterios de búsqueda establecidos actualmente."
                    />
                )}

                {!loading && !error && skillsData?.results?.length > 0 && (
                    <div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {skillsData.results.map((skill) => (
                                <SkillCard key={skill.id} skill={skill} />
                            ))}
                        </div>

                        <div className="mt-4">
                            <Pagination
                                count={skillsData.count}
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