"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createLeadSchema,
  type CreateLeadInput,
} from "@/lib/validations/lead-schema";
import { createLead } from "@/lib/actions/lead-actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Loader2, Save, X } from "lucide-react";

interface NewLeadDialogProps {
  onClose: () => void;
  onSuccess: () => void;
}

const SKIP_WARNING_KEY = "skipLeadFieldsWarning";

export function NewLeadDialog({ onClose, onSuccess }: NewLeadDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [pendingData, setPendingData] = useState<CreateLeadInput | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateLeadInput>({
    resolver: zodResolver(createLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      website: "",
      status: "NEW",
      source: "WEBSITE",
      priority: "MEDIUM",
      notes: "",
      tags: [],
    },
  });

  const status = watch("status");
  const source = watch("source");
  const priority = watch("priority");

  // Verifica se deve pular o aviso
  const shouldSkipWarning = () => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(SKIP_WARNING_KEY) === "true";
  };

  async function checkMissingFields(data: CreateLeadInput) {
    const missing: string[] = [];

    if (!data.name || data.name.trim() === "") missing.push("Nome");
    if (!data.email || data.email.trim() === "") missing.push("Email");
    if (!data.phone || data.phone.trim() === "") missing.push("Telefone");
    if (!data.company || data.company.trim() === "") missing.push("Empresa");

    return missing;
  }

  async function onSubmit(data: CreateLeadInput) {
    const missing = await checkMissingFields(data);

    // Se tem campos faltando e não deve pular o aviso, mostra o dialog
    if (missing.length > 0 && !shouldSkipWarning()) {
      setMissingFields(missing);
      setPendingData({ ...data, tags });
      setShowConfirmDialog(true);
      return;
    }

    // Se não tem campos faltando ou usuário já escolheu pular, cria direto
    await submitLead({ ...data, tags });
  }

  async function submitLead(data: CreateLeadInput) {
    setIsSubmitting(true);

    try {
      const result = await createLead(data);

      if (result.success && result.data) {
        toast.success("Lead criado com sucesso!");
        onSuccess();
      } else {
        toast.error(result.error || "Erro ao criar lead");
      }
    } catch (error) {
      console.error("Error creating lead:", error);
      toast.error("Erro ao criar lead");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleConfirmCreate() {
    if (dontShowAgain) {
      localStorage.setItem(SKIP_WARNING_KEY, "true");
    }
    setShowConfirmDialog(false);
    if (pendingData) {
      submitLead(pendingData);
    }
  }

  function handleCancelCreate() {
    setShowConfirmDialog(false);
    setPendingData(null);
    setDontShowAgain(false);
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
    <>
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Lead</DialogTitle>
            <DialogDescription>
              Adicione um novo lead ao sistema CRM. Campos em branco serão salvos vazios.
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
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="João Silva"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="joao@empresa.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="(11) 98888-8888"
                  />
                </div>

                <div>
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    {...register("company")}
                    placeholder="Empresa ABC Ltda"
                  />
                </div>

                <div>
                  <Label htmlFor="position">Cargo</Label>
                  <Input
                    id="position"
                    {...register("position")}
                    placeholder="CEO, Gerente de Marketing..."
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    {...register("website")}
                    placeholder="https://empresa.com"
                  />
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
                    placeholder="10000.00"
                  />
                </div>

                <div>
                  <Label htmlFor="timeline">Prazo/Timeline</Label>
                  <Input
                    id="timeline"
                    {...register("timeline")}
                    placeholder="3 meses, Q1 2025..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  {...register("notes")}
                  placeholder="Adicione observações sobre este lead..."
                  rows={4}
                />
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
                    Criando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Criar Lead
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Campos não preenchidos</AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p>Os seguintes campos importantes não foram preenchidos:</p>
              <div className="flex flex-wrap gap-2">
                {missingFields.map((field) => (
                  <Badge key={field} variant="outline">
                    {field}
                  </Badge>
                ))}
              </div>
              <p className="text-sm">Deseja continuar mesmo assim?</p>

              <div className="flex items-center space-x-2 pt-3">
                <Checkbox
                  id="dontShowAgain"
                  checked={dontShowAgain}
                  onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
                />
                <label
                  htmlFor="dontShowAgain"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Não mostrar este aviso novamente
                </label>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelCreate}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCreate}>
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
