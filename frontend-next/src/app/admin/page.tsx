import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { StatsCard } from "@/components/admin/dashboard/StatsCard";
import { RecentActivity } from "@/components/admin/dashboard/RecentActivity";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { FileText, Briefcase, Layers, Eye } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getDashboardStats() {
  const [
    totalPosts,
    publishedPosts,
    totalCases,
    publishedCases,
    totalServices,
    publishedServices,
    recentBlogPosts,
    recentCases,
    recentServices,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.caseStudy.count(),
    prisma.caseStudy.count({ where: { status: "PUBLISHED" } }),
    prisma.service.count(),
    prisma.service.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { user: true },
    }),
    prisma.caseStudy.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { user: true },
    }),
    prisma.service.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { user: true },
    }),
  ]);

  // Combinar e ordenar atividades recentes
  const activitiesWithDates = [
    ...recentBlogPosts.map((post) => ({
      id: post.id,
      type: "blog" as const,
      title: post.title,
      action: (post.publishedAt ? "published" : post.createdAt.getTime() === post.updatedAt.getTime() ? "created" : "updated") as "created" | "updated" | "published",
      author: post.user.name || "Unknown",
      timestamp: post.updatedAt,
      slug: post.slug,
    })),
    ...recentCases.map((caseStudy) => ({
      id: caseStudy.id,
      type: "case" as const,
      title: caseStudy.title,
      action: (caseStudy.publishedAt ? "published" : caseStudy.createdAt.getTime() === caseStudy.updatedAt.getTime() ? "created" : "updated") as "created" | "updated" | "published",
      author: caseStudy.user.name || "Unknown",
      timestamp: caseStudy.updatedAt,
      slug: caseStudy.slug,
    })),
    ...recentServices.map((service) => ({
      id: service.id,
      type: "service" as const,
      title: service.title,
      action: (service.publishedAt ? "published" : service.createdAt.getTime() === service.updatedAt.getTime() ? "created" : "updated") as "created" | "updated" | "published",
      author: service.user.name || "Unknown",
      timestamp: service.updatedAt,
      slug: service.slug,
    })),
  ]
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, 10);

  // Serializar datas para passar ao client component
  const activities = activitiesWithDates.map(activity => ({
    ...activity,
    timestamp: activity.timestamp.toISOString(),
  }));

  return {
    totalPosts,
    publishedPosts,
    totalCases,
    publishedCases,
    totalServices,
    publishedServices,
    activities,
  };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const stats = await getDashboardStats();

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-heading text-primary-dark">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo de volta, {session.user?.name}!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Posts do Blog"
          value={stats.totalPosts}
          description={`${stats.publishedPosts} publicados`}
          icon={FileText}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Cases de Sucesso"
          value={stats.totalCases}
          description={`${stats.publishedCases} publicados`}
          icon={Briefcase}
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Serviços"
          value={stats.totalServices}
          description={`${stats.publishedServices} publicados`}
          icon={Layers}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total de Conteúdo"
          value={stats.totalPosts + stats.totalCases + stats.totalServices}
          description="Itens cadastrados"
          icon={Eye}
          iconColor="text-orange-600"
        />
      </div>

      {/* Quick Actions and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickActions />
        <RecentActivity activities={stats.activities} />
      </div>
    </div>
  );
}
