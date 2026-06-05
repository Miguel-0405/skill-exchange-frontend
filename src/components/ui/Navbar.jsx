"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, GraduationCap } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
    
    const pathname = usePathname();
    const router = useRouter();

    const navLinks = [
        { href: "/dashboard", label: "Inicio" },
        { href: "/dashboard/skills", label: "Skills" },
        { href: "/dashboard/users", label: "Usuarios" },
        { href: "/dashboard/goals", label: "Metas" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_email");
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="flex h-16 items-center justify-between px-6">

                <div className="flex items-center gap-2">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                    <Link href="/dashboard" className="font-bold text-lg tracking-tight text-slate-950">
                        Skill Exchange
                    </Link>
                </div>

                <nav className="hidden lg:flex items-center space-x-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${isActive
                                    ? "bg-slate-100 text-slate-900"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden lg:flex items-center">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Cerrar sesión
                    </button>
                </div>

               {/*  <div className="hidden">
                    <HamburgerMenu links={navLinks} />
                </div> */}

            </div>
        </header>
    );
}