"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  Building2,
  Globe,
  Calendar,
  DollarSign,
  TrendingUp,
  User,
  Tag,
  ArrowLeft,
  Edit,
  Trash2,
  Clock,
} from "lucide-react";
import { deleteLead } from "@/lib/actions/lead-actions";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { EditLeadDialog } from "./EditLeadDialog";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  position?: string | null;
  website?: string | null;
  status: string;
  source: string;
  priority: string;
  score: number;
  budget?: number | null;
  timeline?: string | null;
  notes?: string | null;
  tags: string[];
  assignee?: {
    id: string;
    name: string;
    email: string;
  } | null;
  _count?: {
    tasks: number;
    activities: number;
  };
  lastContactedAt?: Date | null;
  convertedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface LeadDetailClientProps {
  lead: Lead;
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

const STATUS_LABELS: Record<string, string> = {
  NEW: "Novo",
  CONTACTED: "Contatado",
  QUALIFIED: "Qualificado",
  PROPOSAL_SENT: "Proposta Enviada",
  NEGOTIATION: "Negociação",
  WON: "Ganho",
  LOST: "Perdido",
  ARCHIVED: "Arquivado",
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-blue-100 text-blue-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800",
};

const PRIORITY_LABELS: Record<string, string> = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  URGENT: "Urgente",
};

const SOURCE_LABELS: Record<string, string> = {
  WEBSITE: "Website",
  CONTACT_FORM: "Formulário de Contato",
  SOCIAL_MEDIA: "Redes Sociais",
  REFERRAL: "Indicação",
  PAID_ADS: "Anúncios Pagos",
  ORGANIC_SEARCH: "Busca Orgânica",
  EMAIL_CAMPAIGN: "Campanha de Email",
  EVENT: "Evento",
  COLD_OUTREACH: "Prospecção Ativa",
  OTHER: "Outro",
};

export function LeadDetailClient({ lead }: LeadDetailClientProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  async function handleDelete() {
    if (
      !confirm(
        `Tem certeza que deseja excluir o lead "${lead.name}"? Esta ação não pode ser desfeita.`
      )
    ) {
      return;
    }

    setIsDeleting(true);

    const result = await deleteLead(lead.id);

    if (result.success) {
      toast.success("Lead excluído com sucesso!");
      router.push("/admin/crm/leads");
    } else {
      toast.error(result.error || "Erro ao excluir lead");
      setIsDeleting(false);
    }
  }

  function getScoreColor(score: number) {
    if (score >= 80) return "text-green-600";
    if (score >= 50) return "text-blue-600";
    if (score >= 30) return "text-orange-600";
    return "text-gray-600";
  }

  function handleEditSuccess() {
    setShowEditDialog(false);
    router.refresh();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/crm/leads">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{lead.name}</h1>
            <p className="text-muted-foreground mt-1">
              {lead.company && `${lead.company} • `}
              {lead.position || "Lead"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEditDialog(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </div>
      </div>

      {/* Status and Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className={STATUS_COLORS[lead.status]}>
              {STATUS_LABELS[lead.status]}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Prioridade</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge className={PRIORITY_COLORS[lead.priority]}>
              {PRIORITY_LABELS[lead.priority]}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className={`h-5 w-5 ${getScoreColor(lead.score)}`} />
              <span className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                {lead.score}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Origem</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium">{SOURCE_LABELS[lead.source]}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {lead.email}
                  </a>
                </div>
              </div>

              {lead.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-sm font-medium hover:underline"
                    >
                      {lead.phone}
                    </a>
                  </div>
                </div>
              )}

              {lead.company && (
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Empresa</p>
                    <p className="text-sm font-medium">{lead.company}</p>
                  </div>
                </div>
              )}

              {lead.position && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cargo</p>
                    <p className="text-sm font-medium">{lead.position}</p>
                  </div>
                </div>
              )}

              {lead.website && (
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      {lead.website}
                    </a>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Negócio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lead.budget && (
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Orçamento</p>
                    <p className="text-sm font-medium">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(lead.budget)}
                    </p>
                  </div>
                </div>
              )}

              {lead.timeline && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Timeline</p>
                    <p className="text-sm font-medium">{lead.timeline}</p>
                  </div>
                </div>
              )}

              {lead.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Notas</p>
                    <p className="text-sm whitespace-pre-wrap">{lead.notes}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          {lead.tags && lead.tags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment */}
          <Card>
            <CardHeader>
              <CardTitle>Responsável</CardTitle>
            </CardHeader>
            <CardContent>
              {lead.assignee ? (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{lead.assignee.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {lead.assignee.email}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Não atribuído</p>
              )}
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Tarefas</span>
                <span className="text-sm font-medium">
                  {lead._count?.tasks || 0}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Atividades</span>
                <span className="text-sm font-medium">
                  {lead._count?.activities || 0}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Datas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Criado em</p>
                <p className="text-sm font-medium">
                  {format(new Date(lead.createdAt), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              {lead.lastContactedAt && (
                <div>
                  <p className="text-xs text-muted-foreground">
                    Último contato
                  </p>
                  <p className="text-sm font-medium">
                    {format(
                      new Date(lead.lastContactedAt),
                      "dd 'de' MMMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              )}

              {lead.convertedAt && (
                <div>
                  <p className="text-xs text-muted-foreground">Convertido em</p>
                  <p className="text-sm font-medium">
                    {format(
                      new Date(lead.convertedAt),
                      "dd 'de' MMMM 'de' yyyy",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Dialog */}
      {showEditDialog && (
        <EditLeadDialog
          lead={lead}
          onClose={() => setShowEditDialog(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
