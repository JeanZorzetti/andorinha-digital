import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WebhookForm } from "@/components/admin/settings/WebhookForm";
import { getWebhook } from "@/lib/actions/webhook-actions";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditWebhookPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getWebhook(id);

  if (!result.success || !result.webhook) {
    redirect("/admin/settings/webhooks");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/admin/settings/webhooks/${id}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary-dark">
            Editar Webhook
          </h1>
          <p className="text-muted-foreground mt-2">
            Atualize as configurações do webhook
          </p>
        </div>
      </div>

      {/* Form */}
      <WebhookForm webhook={result.webhook} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const result = await getWebhook(id);

  return {
    title: result.success ? `Editar ${result.webhook?.name} | Webhooks` : "Editar Webhook | Admin",
    description: "Editar webhook",
  };
}
