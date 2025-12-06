import { Suspense } from "react";
import { getSiteSettings } from "@/lib/actions/settings-actions";
import { Card } from "@/components/ui/card";
import { GeneralSettingsForm } from "@/components/admin/settings/GeneralSettingsForm";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Configurações Gerais | Admin",
  description: "Configurações gerais do site",
};

async function SettingsData() {
  const result = await getSiteSettings();

  if (!result.success || !result.data) {
    return (
      <Card className="p-6">
        <p className="text-center text-destructive">
          Erro ao carregar configurações: {result.error}
        </p>
      </Card>
    );
  }

  return <GeneralSettingsForm initialData={result.data} />;
}

export default function GeneralSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações Gerais</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie as configurações principais do site
        </p>
      </div>

      <Suspense
        fallback={
          <Card className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        }
      >
        <SettingsData />
      </Suspense>
    </div>
  );
}
