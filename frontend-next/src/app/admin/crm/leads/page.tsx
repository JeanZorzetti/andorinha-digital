import { Metadata } from "next";
import { getLeads, getLeadStats } from "@/lib/actions/lead-actions";
import { LeadsTable } from "@/components/admin/crm/LeadsTable";
import { LeadStats } from "@/components/admin/crm/LeadStats";

export const metadata: Metadata = {
  title: "Leads - CRM | Andorinha Digital",
  description: "Gerenciamento de leads e oportunidades",
};

export default async function LeadsPage() {
  const [leadsResult, statsResult] = await Promise.all([
    getLeads(),
    getLeadStats(),
  ]);

  const leads = leadsResult.success ? leadsResult.data : [];
  const stats = statsResult.success ? statsResult.data : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leads</h1>
        <p className="text-muted-foreground mt-2">
          Gerencie seus leads e oportunidades de negócio
        </p>
      </div>

      {stats && <LeadStats stats={stats} />}

      <LeadsTable leads={leads || []} />
    </div>
  );
}
