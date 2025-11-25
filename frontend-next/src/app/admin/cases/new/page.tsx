import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CaseForm } from "@/components/admin/cases/CaseForm";

export default function NewCasePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/cases">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold font-heading">Novo Case</h1>
          <p className="text-muted-foreground mt-1">Crie um novo case de sucesso</p>
        </div>
      </div>

      {/* Form */}
      <CaseForm mode="create" />
    </div>
  );
}

export const metadata = {
  title: "Novo Case | Admin",
};
