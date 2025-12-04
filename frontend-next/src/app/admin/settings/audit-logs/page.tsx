import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AuditLogsTable } from "@/components/admin/settings/AuditLogsTable";
import { AuditLogsStats } from "@/components/admin/settings/AuditLogsStats";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    action?: string;
    resource?: string;
    search?: string;
  }>;
}

export const metadata = {
  title: "Audit Logs | Configurações | Admin",
  description: "Visualize o histórico de ações e atividades do sistema",
};

export default async function AuditLogsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/admin");
  }

  const params = await searchParams;
  const page = Number(params.page) || 1;
  const action = params.action;
  const resource = params.resource;
  const search = params.search;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">
            Histórico completo de ações e atividades do sistema
          </p>
        </div>
      </div>

      {/* Stats */}
      <Suspense fallback={<StatsSkeleton />}>
        <AuditLogsStats />
      </Suspense>

      {/* Table */}
      <Suspense fallback={<TableSkeleton />}>
        <AuditLogsTable
          page={page}
          action={action}
          resource={resource}
          search={search}
        />
      </Suspense>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-24" />
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
