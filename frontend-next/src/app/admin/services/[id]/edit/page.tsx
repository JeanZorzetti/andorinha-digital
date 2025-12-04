import { ServiceForm } from "@/components/admin/services/ServiceForm";
import { getServiceById } from "@/lib/actions/service-actions";
import { notFound } from "next/navigation";

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;
  const result = await getServiceById(id);

  if (!result.success || !result.service) {
    notFound();
  }

  const service = result.service;

  return (
    <ServiceForm
      mode="edit"
      initialData={{
        id: service.id,
        title: service.title,
        slug: service.slug,
        description: service.description,
        content: service.content || undefined,
        image: service.image,
        gallery: service.gallery || undefined,
        category: service.category,
        tags: service.tags,
        pricing: service.pricing,
        process: service.process,
        deliveryTime: service.deliveryTime,
        includes: service.includes,
        excludes: service.excludes || undefined,
        requirements: service.requirements || undefined,
        status: service.status,
        featured: service.featured,
        metaTitle: service.metaTitle || undefined,
        metaDescription: service.metaDescription || undefined,
        metaKeywords: service.metaKeywords || undefined,
      }}
    />
  );
}

export const metadata = {
  title: "Editar Serviço | Admin",
};
