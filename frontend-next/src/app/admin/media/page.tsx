import { Suspense } from "react";
import { getMediaStats, getFolders } from "@/lib/actions/media-actions";
import { MediaGrid } from "@/components/admin/media/MediaGrid";
import { MediaUploadButton } from "@/components/admin/media/MediaUploadButton";
import { MediaFilters } from "@/components/admin/media/MediaFilters";
import { Card } from "@/components/ui/card";
import { Image, FileText, File, HardDrive } from "lucide-react";

export const metadata = {
  title: "Media Library | Admin",
  description: "Gerenciar arquivos e mídias",
};

async function MediaStats() {
  const result = await getMediaStats();

  if (!result.success || !result.stats) {
    return null;
  }

  const { stats } = result;

  const statCards = [
    {
      label: "Total de Arquivos",
      value: stats.total,
      icon: File,
      color: "text-blue-600",
    },
    {
      label: "Imagens",
      value: stats.byType.IMAGE || 0,
      icon: Image,
      color: "text-green-600",
    },
    {
      label: "PDFs",
      value: stats.byType.PDF || 0,
      icon: FileText,
      color: "text-red-600",
    },
    {
      label: "Espaço Usado",
      value: `${stats.totalSizeMB} MB`,
      icon: HardDrive,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4 mb-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default async function MediaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const foldersResult = await getFolders();
  const folders = foldersResult.success ? foldersResult.folders : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie imagens, documentos e outros arquivos
          </p>
        </div>

        <MediaUploadButton />
      </div>

      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-20 bg-muted rounded" />
              </Card>
            ))}
          </div>
        }
      >
        <MediaStats />
      </Suspense>

      <MediaFilters folders={folders || []} />

      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(12)].map((_, i) => (
              <Card key={i} className="aspect-square animate-pulse">
                <div className="h-full bg-muted rounded" />
              </Card>
            ))}
          </div>
        }
      >
        <MediaGrid searchParams={params} />
      </Suspense>
    </div>
  );
}
