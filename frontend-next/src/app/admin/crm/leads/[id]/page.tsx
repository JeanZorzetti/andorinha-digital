import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLead } from "@/lib/actions/lead-actions";
import { LeadDetailClient } from "@/components/admin/crm/LeadDetailClient";

interface LeadDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: LeadDetailPageProps): Promise<Metadata> {
  const result = await getLead(params.id);

  if (!result.success || !result.data) {
    return {
      title: "Lead não encontrado | CRM",
    };
  }

  return {
    title: `${result.data.name} | Lead | CRM`,
    description: `Detalhes do lead ${result.data.name}`,
  };
}

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const result = await getLead(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  return <LeadDetailClient lead={result.data} />;
}
