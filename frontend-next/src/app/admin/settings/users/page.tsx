import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { UserTable } from "@/components/admin/settings/UserTable";
import { Skeleton } from "@/components/ui/skeleton";
import { listUsers } from "@/lib/actions/user-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    role?: string;
    search?: string;
  }>;
}

async function getStats() {
  const [total, admins, editors, users] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "EDITOR" } }),
    prisma.user.count({ where: { role: "USER" } }),
  ]);

  return { total, admins, editors, users };
}

export default async function UsersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const role = params.role;
  const search = params.search;

  const stats = await getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary-dark">
            Gerenciar Usuários
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie todos os usuários do sistema
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/settings/users/new">
            <Plus className="w-4 h-4 mr-2" />
            Novo Usuário
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Usuários
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administradores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.admins}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Editores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.editors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Usuários Comuns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Suspense fallback={<UserTableSkeleton />}>
        <UserTableData page={page} role={role} search={search} />
      </Suspense>
    </div>
  );
}

async function UserTableData({
  page,
  role,
  search,
}: {
  page: number;
  role?: string;
  search?: string;
}) {
  const result = await listUsers({
    page,
    role,
    search,
  });

  if (!result.success || !result.users) {
    return <div>Erro ao carregar usuários</div>;
  }

  return <UserTable users={result.users} />;
}

function UserTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export const metadata = {
  title: "Gerenciar Usuários | Admin",
  description: "Gerencie todos os usuários do sistema",
};
