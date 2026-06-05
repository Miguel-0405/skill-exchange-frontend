"use client"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/Table";

import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import api from "@/lib/api"

export default function UsersPage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [search, setSearch] = useState("")
    const debounceRef = useRef(null)
    const router = useRouter()

    useEffect(() => {
        let active = true

        const loadUsers = async () => {
            setLoading(true)
            setError("")
            try {
                const params = search ? { search } : {}
                const { data } = await api.get("/users/", { params })
                if (!active) return
                setUsers(data.results ?? data ?? [])
            } catch (err) {
                console.error("Error cargando usuarios:", err)
                setError(err.response?.data?.detail || "No fue posible cargar usuarios")
                localStorage.removeItem("access_token")
                localStorage.removeItem("refresh_token")
                router.push("/login")
            } finally {
                if (active) setLoading(false)   
            }
        }

        clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(loadUsers, 300)

        return () => {
            active = false
            clearTimeout(debounceRef.current)
        }
    }, [search])

    if (loading) {
        return (
            <main className="p-6">Cargando...</main>
        )
    }

    if (error) {
        return (
            <main className="p-6">{error}</main>
        )
    }

    return (
        <main className="flex-1 p-6">
            <h1 className="text-2xl font-semibold mb-6">Usuarios</h1>

            <Input
                placeholder="Buscar por nombre o email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="border rounded-lg overflow-hidden m-4">
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow className="bg-gray-200 text-left">
                            <TableHead className="p-4">Usuario</TableHead>
                            <TableHead className="p-4">Email</TableHead>
                            <TableHead className="p-4">Fecha de ingreso</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="bg-white">
                        {users.map((user) => {
                            const initials = `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`

                            return (
                                <TableRow key={user.id} className="border-t">
                                    <TableCell className="p-4">
                                        <div className="flex gap-3 items-center">
                                            <div className="h-10 w-10 px-3 py-3 border rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shrink-0 ">
                                                {initials || "?"}
                                            </div>
                                            <span>
                                                {user.first_name} {user.last_name}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell className="p-4">{user.email}</TableCell>

                                    <TableCell className="p-4">
                                        {new Date(user.date_joined)
                                            .toLocaleDateString(
                                                "es-CO",
                                                {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric"
                                                }
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}