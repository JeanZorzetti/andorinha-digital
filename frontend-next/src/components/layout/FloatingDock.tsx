"use client";

import React from "react";
import Link from "next/link";
import { Home, LayoutGrid, FolderOpen, Mail, MessageCircle } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function FloatingDock() {
    const items = [
        { href: "/", icon: Home, label: "Início" },
        { href: "/servicos", icon: LayoutGrid, label: "Serviços" },
        { href: "/cases", icon: FolderOpen, label: "Cases" },
        { href: "/contato", icon: Mail, label: "Contato" },
        { href: "https://wa.me/5511999999999", icon: MessageCircle, label: "WhatsApp", external: true },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-full max-w-md px-4 pointer-events-none">
            <div className="pointer-events-auto">
                <TooltipProvider>
                    <Dock direction="middle" className="bg-background/80 backdrop-blur-lg border border-border shadow-2xl rounded-full px-4">
                        {items.map((item) => (
                            <DockIcon key={item.label}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                buttonVariants({ variant: "ghost", size: "icon" }),
                                                "size-12 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                                            )}
                                            target={item.external ? "_blank" : undefined}
                                            rel={item.external ? "noopener noreferrer" : undefined}
                                            aria-label={item.label}
                                        >
                                            <item.icon className="size-6" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                        ))}
                    </Dock>
                </TooltipProvider>
            </div>
        </div>
    );
}
