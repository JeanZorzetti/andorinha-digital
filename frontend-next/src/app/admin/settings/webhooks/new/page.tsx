import { WebhookForm } from "@/components/admin/settings/WebhookForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewWebhookPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/settings/webhooks">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary-dark">
            Novo Webhook
          </h1>
          <p className="text-muted-foreground mt-2">
            Configure uma nova integração via webhook
          </p>
        </div>
      </div>

      {/* Form */}
      <WebhookForm />
    </div>
  );
}

export const metadata = {
  title: "Novo Webhook | Admin",
  description: "Criar novo webhook",
};
