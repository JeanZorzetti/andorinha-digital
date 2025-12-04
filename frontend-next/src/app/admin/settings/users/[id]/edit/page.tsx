import { UserForm } from "@/components/admin/settings/UserForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getUserById } from "@/lib/actions/user-actions";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getUserById(id);

  if (!result.success || !result.user) {
    notFound();
  }

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
            Editar Usuário
          </h1>
          <p className="text-muted-foreground mt-2">
            Atualize as informações do usuário
          </p>
        </div>
      </div>

      {/* Form */}
      <UserForm user={result.user} />
    </div>
  );
}

export const metadata = {
  title: "Editar Usuário | Admin",
};
