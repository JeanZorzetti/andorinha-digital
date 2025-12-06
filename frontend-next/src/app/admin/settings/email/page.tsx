import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmailSettingsForm } from "@/components/admin/settings/EmailSettingsForm";
import { EmailTemplatesList } from "@/components/admin/settings/EmailTemplatesList";
import { getEmailSettings, getEmailTemplates } from "@/lib/actions/email-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Mail } from "lucide-react";

export const metadata = {
  title: "Configurações de Email | Admin",
  description: "Configurações de SMTP e templates de email",
};

async function EmailSettingsData() {
  const result = await getEmailSettings();

  if (!result.success || !result.data) {
    return (
      <Card className="p-6">
        <p className="text-center text-destructive">
          Erro ao carregar configurações de email
        </p>
      </Card>
    );
  }

  return <EmailSettingsForm initialData={result.data} />;
}

async function EmailTemplatesData() {
  const result = await getEmailTemplates();

  if (!result.success || !result.data) {
    return (
      <Card className="p-6">
        <p className="text-center text-destructive">
          Erro ao carregar templates de email
        </p>
      </Card>
    );
  }

  return <EmailTemplatesList templates={result.data} />;
}

export default function EmailSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações de Email</h1>
        <p className="text-muted-foreground mt-2">
          Configure SMTP e gerencie templates de email
        </p>
      </div>

      <Tabs defaultValue="smtp" className="space-y-4">
        <TabsList>
          <TabsTrigger value="smtp" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações SMTP
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Mail className="h-4 w-4" />
            Templates de Email
          </TabsTrigger>
        </TabsList>

        <TabsContent value="smtp" className="space-y-4">
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
            <EmailSettingsData />
          </Suspense>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
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
            <EmailTemplatesData />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
