"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateLeadSchema,
  type UpdateLeadInput,
} from "@/lib/validations/lead-schema";
import { updateLead } from "@/lib/actions/lead-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Save, X } from "lucide-react";

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
  budget?: number | null;
  timeline?: string | null;
  notes?: string | null;
  tags: string[];
}

interface EditLeadDialogProps {
  lead: Lead;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditLeadDialog({
  lead,
  onClose,
  onSuccess,
}: EditLeadDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(lead.tags || []);
  const [newTag, setNewTag] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateLeadInput>({
    resolver: zodResolver(updateLeadSchema),
    defaultValues: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone || "",
      company: lead.company || "",
      position: lead.position || "",
      website: lead.website || "",
      status: lead.status as any,
      source: lead.source as any,
      priority: lead.priority as any,
      budget: lead.budget || undefined,
      timeline: lead.timeline || "",
      notes: lead.notes || "",
      tags: lead.tags || [],
    },
  });

  const status = watch("status");
  const source = watch("source");
  const priority = watch("priority");

  async function onSubmit(data: UpdateLeadInput) {
    setIsSubmitting(true);

    try {
      const payload = {
        ...data,
        tags,
      };

      const result = await updateLead(lead.id, payload);

      if (result.success && result.data) {
        toast.success("Lead atualizado com sucesso!");
        onSuccess();
      } else {
        toast.error(result.error || "Erro ao atualizar lead");
      }
    } catch (error) {
      console.error("Error updating lead:", error);
      toast.error("Erro ao atualizar lead");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleAddTag() {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  }

  function handleRemoveTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  const commonTags = [
    "E-commerce",
    "SEO",
    "Design",
    "Marketing",
    "Desenvolvimento",
    "Consultoria",
    "Branding",
    "Urgent",
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
          <DialogDescription>
            Atualize as informações do lead
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Informações de Contato
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome *</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" {...register("phone")} />
              </div>

              <div>
                <Label htmlFor="company">Empresa</Label>
                <Input id="company" {...register("company")} />
              </div>

              <div>
                <Label htmlFor="position">Cargo</Label>
                <Input id="position" {...register("position")} />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" {...register("website")} />
                {errors.website && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.website.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Lead Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Detalhes do Lead
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={status}
                  onValueChange={(value) => setValue("status", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW">Novo</SelectItem>
                    <SelectItem value="CONTACTED">Contatado</SelectItem>
                    <SelectItem value="QUALIFIED">Qualificado</SelectItem>
                    <SelectItem value="PROPOSAL_SENT">
                      Proposta Enviada
                    </SelectItem>
                    <SelectItem value="NEGOTIATION">Negociação</SelectItem>
                    <SelectItem value="WON">Ganho</SelectItem>
                    <SelectItem value="LOST">Perdido</SelectItem>
                    <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="source">Origem</Label>
                <Select
                  value={source}
                  onValueChange={(value) => setValue("source", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WEBSITE">Website</SelectItem>
                    <SelectItem value="CONTACT_FORM">
                      Formulário de Contato
                    </SelectItem>
                    <SelectItem value="SOCIAL_MEDIA">Redes Sociais</SelectItem>
                    <SelectItem value="REFERRAL">Indicação</SelectItem>
                    <SelectItem value="PAID_ADS">Anúncios Pagos</SelectItem>
                    <SelectItem value="ORGANIC_SEARCH">
                      Busca Orgânica
                    </SelectItem>
                    <SelectItem value="EMAIL_CAMPAIGN">
                      Campanha de Email
                    </SelectItem>
                    <SelectItem value="EVENT">Evento</SelectItem>
                    <SelectItem value="COLD_OUTREACH">
                      Prospecção Ativa
                    </SelectItem>
                    <SelectItem value="OTHER">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select
                  value={priority}
                  onValueChange={(value) => setValue("priority", value as any)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Baixa</SelectItem>
                    <SelectItem value="MEDIUM">Média</SelectItem>
                    <SelectItem value="HIGH">Alta</SelectItem>
                    <SelectItem value="URGENT">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Informações de Negócio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget">Orçamento (R$)</Label>
                <Input
                  id="budget"
                  type="number"
                  step="0.01"
                  {...register("budget", { valueAsNumber: true })}
                />
              </div>

              <div>
                <Label htmlFor="timeline">Prazo/Timeline</Label>
                <Input id="timeline" {...register("timeline")} />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notas</Label>
              <Textarea id="notes" {...register("notes")} rows={4} />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-2">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Digite uma tag..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  Adicionar
                </Button>
              </div>

              <div className="p-3 bg-muted rounded">
                <p className="text-xs font-medium mb-2">Tags comuns:</p>
                <div className="flex flex-wrap gap-1">
                  {commonTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (!tags.includes(tag)) {
                          setTags([...tags, tag]);
                        }
                      }}
                      className="text-xs px-2 py-1 bg-background rounded hover:bg-accent"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Atualizando...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Atualizar Lead
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
