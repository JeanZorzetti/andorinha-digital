import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BackupSettingsForm } from "@/components/admin/settings/BackupSettingsForm";
import { BackupsList } from "@/components/admin/settings/BackupsList";
import { getBackupSettings, getBackups } from "@/lib/actions/backup-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Database } from "lucide-react";

export const metadata = {
  title: "Backup & Restore | Admin",
  description: "Gerenciamento de backups e restauração",
};

async function BackupSettingsData() {
  const result = await getBackupSettings();

  if (!result.success || !result.data) {
    return (
      <Card className="p-6">
        <p className="text-center text-destructive">
          Erro ao carregar configurações de backup
        </p>
      </Card>
    );
  }

  return <BackupSettingsForm initialData={result.data} />;
}

async function BackupsData() {
  const result = await getBackups();

  if (!result.success || !result.data) {
    return (
      <Card className="p-6">
        <p className="text-center text-destructive">
          Erro ao carregar backups
        </p>
      </Card>
    );
  }

  return <BackupsList backups={result.data} />;
}

export default function BackupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Backup & Restore</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie backups automáticos e restauração do sistema
        </p>
      </div>

      <Tabs defaultValue="backups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="backups" className="gap-2">
            <Database className="h-4 w-4" />
            Backups
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="backups" className="space-y-4">
          <Suspense
            fallback={
              <Card className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </Card>
            }
          >
            <BackupsData />
          </Suspense>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Suspense
            fallback={
              <Card className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </Card>
            }
          >
            <BackupSettingsData />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
