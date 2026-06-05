"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

export default function HamburgerMenu({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    router.push("/login");
    setIsOpen(false);
  };

  return (
  <div>
    <button
      onClick={() => setIsOpen(true)}
      className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
      aria-label="Abrir menú"
    >
      <Menu className="h-6 w-6" />
    </button>

    {isOpen && (
      <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex justify-end">

        <div
          className="absolute inset-0"
          onClick={() => setIsOpen(false)}
        />

        <div className="relative w-full max-w-xs bg-white h-full p-6 shadow-2xl border-l border-slate-200 flex flex-col justify-between z-50">

          <div>
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <span className="font-bold text-lg">
                Skill Exchange
              </span>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex flex-col space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl ${
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>

        </div>
      </div>
    )}
  </div>
);
}