import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Package, CheckCircle, FileText, Star } from "lucide-react";
import Link from "next/link";
import { ServiceTable } from "@/components/admin/services/ServiceTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

async function getServices() {
  const services = await prisma.service.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return services;
}

async function getStats() {
  const [total, published, drafts, featured] = await Promise.all([
    prisma.service.count(),
    prisma.service.count({ where: { status: "PUBLISHED" } }),
    prisma.service.count({ where: { status: "DRAFT" } }),
    prisma.service.count({ where: { featured: true } }),
  ]);

  return { total, published, drafts, featured };
}

export default async function ServicesPage() {
  const services = await getServices();
  const stats = await getStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Serviços</h1>
          <p className="text-muted-foreground">
            Gerencie todos os serviços oferecidos
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="w-4 h-4 mr-2" />
            Novo Serviço
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Serviços cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
            <p className="text-xs text-muted-foreground">
              Serviços ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
            <FileText className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.drafts}</div>
            <p className="text-xs text-muted-foreground">
              Em elaboração
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destaque</CardTitle>
            <Star className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featured}</div>
            <p className="text-xs text-muted-foreground">
              Serviços em destaque
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Suspense fallback={<ServiceTableSkeleton />}>
        <ServiceTable data={services} />
      </Suspense>
    </div>
  );
}

function ServiceTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export const metadata = {
  title: "Serviços | Admin",
};
