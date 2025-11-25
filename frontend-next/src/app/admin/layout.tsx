"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <div className="flex min-h-screen bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1 p-6 overflow-y-auto bg-muted/10">
                        {children}
                    </main>
                </div>
            </div>
        </SessionProvider>
    );
}
