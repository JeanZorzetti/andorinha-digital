import { UserForm } from "@/components/admin/settings/UserForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/settings/users">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-heading text-primary-dark">
            Novo Usuário
          </h1>
          <p className="text-muted-foreground mt-2">
            Criar novo usuário no sistema
          </p>
        </div>
      </div>

      {/* Form */}
      <UserForm />
    </div>
  );
}

export const metadata = {
  title: "Novo Usuário | Admin",
};
