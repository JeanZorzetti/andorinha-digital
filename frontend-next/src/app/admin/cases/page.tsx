import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { CaseTable } from "@/components/admin/cases/CaseTable";
import prisma from "@/lib/prisma";

async function getCaseStudies() {
  const cases = await prisma.caseStudy.findMany({
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
  return cases;
}

export default async function CasesPage() {
  const cases = await getCaseStudies();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Cases de Sucesso</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o portfólio de projetos
          </p>
        </div>
        <Link href="/admin/cases/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Case
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cases.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cases.filter((c) => c.status === "PUBLISHED").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cases.filter((c) => c.status === "DRAFT").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Destaque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {cases.filter((c) => c.featured).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Todos os Cases ({cases.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <CaseTable data={cases} />
        </CardContent>
      </Card>
    </div>
  );
}

export const metadata = {
  title: "Cases de Sucesso | Admin",
};
