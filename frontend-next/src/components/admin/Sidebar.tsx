"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Layers,
    Settings,
    ImageIcon,
    BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
}

export default function Sidebar() {
    const pathname = usePathname();
    const [counts, setCounts] = useState({
        blog: 0,
        cases: 0,
        services: 0,
    });

    // Buscar contagens (implementar depois com API)
    useEffect(() => {
        // TODO: Fetch counts from API
        // Por enquanto, valores mockados para demonstração
        setCounts({
            blog: 42,
            cases: 18,
            services: 10,
        });
    }, []);

    const navItems: NavItem[] = [
        {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            title: "Blog Posts",
            href: "/admin/blog",
            icon: FileText,
            badge: counts.blog,
        },
        {
            title: "Cases de Sucesso",
            href: "/admin/cases",
            icon: Briefcase,
            badge: counts.cases,
        },
        {
            title: "Serviços",
            href: "/admin/services",
            icon: Layers,
            badge: counts.services,
        },
        {
            title: "Biblioteca de Mídia",
            href: "/admin/media",
            icon: ImageIcon,
        },
        {
            title: "Analytics",
            href: "/admin/analytics",
            icon: BarChart3,
        },
        {
            title: "Configurações",
            href: "/admin/settings",
            icon: Settings,
        },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
            <div className="p-6 border-b border-border">
                <h1 className="text-2xl font-bold font-heading text-primary">Andorinha</h1>
                <p className="text-xs text-muted-foreground">Painel Administrativo</p>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-5 h-5" />
                                {item.title}
                            </div>
                            {item.badge !== undefined && (
                                <Badge variant={isActive ? "default" : "secondary"} className="ml-auto">
                                    {item.badge}
                                </Badge>
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <div className="px-4 py-2 text-xs text-muted-foreground text-center">
                    &copy; {new Date().getFullYear()} Andorinha Digital
                </div>
            </div>
        </aside>
    );
}
