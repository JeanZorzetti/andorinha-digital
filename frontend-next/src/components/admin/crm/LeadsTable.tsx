"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteLead } from "@/lib/actions/lead-actions";
import { toast } from "sonner";
import {
  MoreHorizontal,
  Plus,
  Search,
  Mail,
  Phone,
  Building2,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { NewLeadDialog } from "./NewLeadDialog";
import { useRouter } from "next/navigation";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  status: string;
  source: string;
  priority: string;
  score: number;
  assignee?: {
    name: string;
    email: string;
  } | null;
  _count?: {
    tasks: number;
    activities: number;
  };
  createdAt: Date;
}

interface LeadsTableProps {
  leads: Lead[];
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-purple-100 text-purple-800",
  QUALIFIED: "bg-green-100 text-green-800",
  PROPOSAL_SENT: "bg-yellow-100 text-yellow-800",
  NEGOTIATION: "bg-orange-100 text-orange-800",
  WON: "bg-emerald-100 text-emerald-800",
  LOST: "bg-red-100 text-red-800",
  ARCHIVED: "bg-gray-100 text-gray-800",
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-blue-100 text-blue-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
};

export function LeadsTable({ leads: initialLeads }: LeadsTableProps) {
  const router = useRouter();
  const [leads, setLeads] = useState(initialLeads);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [showNewLeadDialog, setShowNewLeadDialog] = useState(false);

  // Filter leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      search === "" ||
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.company?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    const matchesPriority =
      priorityFilter === "all" || lead.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este lead?")) {
      return;
    }

    const result = await deleteLead(id);

    if (result.success) {
      toast.success("Lead excluído com sucesso!");
      setLeads(leads.filter((l) => l.id !== id));
    } else {
      toast.error(result.error || "Erro ao excluir lead");
    }
  }

  function getScoreColor(score: number) {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-blue-600";
    if (score >= 30) return "text-orange-600";
    return "text-gray-600";
  }

  function handleNewLeadSuccess() {
    setShowNewLeadDialog(false);
    router.refresh();
  }

  return (
    <Card>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex-1 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="NEW">Novo</SelectItem>
                <SelectItem value="CONTACTED">Contatado</SelectItem>
                <SelectItem value="QUALIFIED">Qualificado</SelectItem>
                <SelectItem value="PROPOSAL_SENT">Proposta Enviada</SelectItem>
                <SelectItem value="NEGOTIATION">Negociação</SelectItem>
                <SelectItem value="WON">Ganho</SelectItem>
                <SelectItem value="LOST">Perdido</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="URGENT">Urgente</SelectItem>
                <SelectItem value="HIGH">Alta</SelectItem>
                <SelectItem value="MEDIUM">Média</SelectItem>
                <SelectItem value="LOW">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => setShowNewLeadDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Lead
          </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Prioridade</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Atividade</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    Nenhum lead encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{lead.email}</span>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">{lead.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.company ? (
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{lead.company}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[lead.status]}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={PRIORITY_COLORS[lead.priority]}>
                        {lead.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`h-4 w-4 ${getScoreColor(lead.score)}`} />
                        <span className={`font-semibold ${getScoreColor(lead.score)}`}>
                          {lead.score}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.assignee ? (
                        <span className="text-sm">{lead.assignee.name}</span>
                      ) : (
                        <span className="text-muted-foreground text-sm">Não atribuído</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{lead._count?.tasks || 0} tarefas</span>
                        <span>·</span>
                        <span>{lead._count?.activities || 0} atividades</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <Link href={`/admin/crm/leads/${lead.id}`}>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Ver detalhes
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/admin/crm/leads/${lead.id}/edit`}>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(lead.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Mostrando {filteredLeads.length} de {leads.length} leads
        </div>
      </div>

      {/* New Lead Dialog */}
      {showNewLeadDialog && (
        <NewLeadDialog
          onClose={() => setShowNewLeadDialog(false)}
          onSuccess={handleNewLeadSuccess}
        />
      )}
    </Card>
  );
}
