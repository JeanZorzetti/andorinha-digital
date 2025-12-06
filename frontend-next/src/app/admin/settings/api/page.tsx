import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiSettingsForm } from "@/components/admin/settings/ApiSettingsForm";
import { ApiKeysList } from "@/components/admin/settings/ApiKeysList";
import { getApiSettings, getApiKeys } from "@/lib/actions/api-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Key } from "lucide-react";

export const metadata = {
  title: "Configurações de API | Admin",
  description: "Configurações de API, rate limiting e CORS",
};

async function ApiSettingsData() {
  const result = await getApiSettings();

  if (!result.success || !result.data) {
    return (
      <Card className="p-6">
        <p className="text-center text-destructive">
          Erro ao carregar configurações de API
        </p>
      </Card>
    );
  }

  return <ApiSettingsForm initialData={result.data} />;
}

async function ApiKeysData() {
  const result = await getApiKeys();

  if (!result.success || !result.data) {
    return (
      <Card className="p-6">
        <p className="text-center text-destructive">
          Erro ao carregar API keys
        </p>
      </Card>
    );
  }

  return <ApiKeysList apiKeys={result.data} />;
}

export default function ApiSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações de API</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie API keys, rate limiting e configurações de CORS
        </p>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="keys" className="gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
        </TabsList>

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
            <ApiSettingsData />
          </Suspense>
        </TabsContent>

        <TabsContent value="keys" className="space-y-4">
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
            <ApiKeysData />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
