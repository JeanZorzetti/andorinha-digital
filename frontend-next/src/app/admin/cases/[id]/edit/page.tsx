import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CaseForm } from "@/components/admin/cases/CaseForm";

interface EditCasePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getCaseStudy(id: string) {
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
  });

  if (!caseStudy) {
    notFound();
  }

  return caseStudy;
}

export default async function EditCasePage({ params }: EditCasePageProps) {
  const { id } = await params;
  const caseStudy = await getCaseStudy(id);

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
          <h1 className="text-3xl font-bold font-heading">Editar Case</h1>
          <p className="text-muted-foreground mt-1">{caseStudy.title}</p>
        </div>
      </div>

      {/* Form */}
      <CaseForm
        mode="edit"
        initialData={{
          id: caseStudy.id,
          title: caseStudy.title,
          slug: caseStudy.slug,
          description: caseStudy.description,
          content: caseStudy.content || "",
          client: caseStudy.client,
          industry: caseStudy.industry,
          challenge: caseStudy.challenge,
          solution: caseStudy.solution || undefined,
          results: caseStudy.results,
          image: caseStudy.image,
          gallery: caseStudy.gallery || [],
          tags: caseStudy.tags,
          status: caseStudy.status,
          featured: caseStudy.featured,
          technologies: caseStudy.technologies || [],
          metaTitle: caseStudy.metaTitle || "",
          metaDescription: caseStudy.metaDescription || "",
          metaKeywords: caseStudy.metaKeywords || [],
        }}
      />
    </div>
  );
}

export const metadata = {
  title: "Editar Case | Admin",
};
