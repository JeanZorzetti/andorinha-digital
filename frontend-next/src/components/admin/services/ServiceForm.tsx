"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { serviceSchema, type ServiceFormData, type UpdateServiceData } from "@/lib/validations/service-schema";
import { createService, updateService } from "@/lib/actions/service-actions";

interface ServiceFormProps {
  mode: "create" | "edit";
  initialData?: Partial<ServiceFormData> & { id?: string };
}

export function ServiceForm({ mode, initialData }: ServiceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      image: initialData?.image || "",
      gallery: initialData?.gallery || [],
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      pricing: initialData?.pricing || [{ name: "", price: "", features: [], highlighted: false }],
      process: initialData?.process || [{ title: "", description: "" }],
      deliveryTime: initialData?.deliveryTime || "",
      includes: initialData?.includes || [],
      excludes: initialData?.excludes || [],
      requirements: initialData?.requirements || [],
      status: initialData?.status || "DRAFT",
      featured: initialData?.featured || false,
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      metaKeywords: initialData?.metaKeywords || [],
    },
  });

  // Field Arrays
  const { fields: pricingFields, append: appendPricing, remove: removePricing } = useFieldArray({
    control,
    name: "pricing",
  });

  const { fields: processFields, append: appendProcess, remove: removeProcess } = useFieldArray({
    control,
    name: "process",
  });

  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({
    control,
    name: "gallery",
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue("title", newTitle);

    if (mode === "create") {
      const newSlug = generateSlug(newTitle);
      setValue("slug", newSlug);
    }
  };

  const onSubmit = async (data: ServiceFormData) => {
    setIsSubmitting(true);

    try {
      let result;

      if (mode === "create") {
        result = await createService(data);
      } else if (initialData?.id) {
        result = await updateService({ id: initialData.id, ...data } as UpdateServiceData);
      }

      if (result?.success) {
        toast.success(mode === "create" ? "Serviço criado com sucesso!" : "Serviço atualizado com sucesso!");
        router.push("/admin/services");
        router.refresh();
      } else {
        toast.error(result?.error || "Erro ao salvar serviço");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao salvar serviço");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Audiovisual",
    "Branding",
    "Sites",
    "Social Media",
    "Tráfego Pago",
    "Consultoria",
    "Outros",
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" size="icon" asChild>
            <Link href="/admin/services">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {mode === "create" ? "Novo Serviço" : "Editar Serviço"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "create" ? "Adicione um novo serviço" : "Atualize as informações do serviço"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" asChild>
            <Link href="/admin/services">Cancelar</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Básico</TabsTrigger>
          <TabsTrigger value="pricing">Preços</TabsTrigger>
          <TabsTrigger value="process">Processo</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        {/* Tab: Basic */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Dados principais do serviço</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Título*</Label>
                <Input
                  id="title"
                  {...register("title")}
                  onChange={handleTitleChange}
                  placeholder="Ex: Criação de Sites Profissionais"
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <Label htmlFor="slug">Slug* (URL amigável)</Label>
                <Input id="slug" {...register("slug")} placeholder="criacao-de-sites-profissionais" />
                {errors.slug && <p className="text-sm text-destructive">{errors.slug.message}</p>}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descrição Curta*</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Breve descrição do serviço (50-500 caracteres)"
                  rows={3}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
              </div>

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo Detalhado</Label>
                <Textarea
                  id="content"
                  {...register("content")}
                  placeholder="Descrição completa do serviço"
                  rows={10}
                />
                {errors.content && <p className="text-sm text-destructive">{errors.content.message}</p>}
              </div>

              {/* Image */}
              <div className="space-y-2">
                <Label htmlFor="image">URL da Imagem Principal*</Label>
                <Input
                  id="image"
                  {...register("image")}
                  placeholder="https://exemplo.com/imagem.jpg"
                  type="url"
                />
                {errors.image && <p className="text-sm text-destructive">{errors.image.message}</p>}
              </div>

              {/* Gallery */}
              <div className="space-y-2">
                <Label>Galeria de Imagens (opcional)</Label>
                {galleryFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`gallery.${index}` as const)}
                      placeholder="https://exemplo.com/imagem.jpg"
                      type="url"
                    />
                    <Button type="button" variant="outline" size="icon" onClick={() => removeGallery(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendGallery("")}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Imagem
                </Button>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoria*</Label>
                <Select value={watch("category")} onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status*</Label>
                <Select value={watch("status")} onValueChange={(value) => setValue("status", value as "DRAFT" | "PUBLISHED" | "ARCHIVED")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Rascunho</SelectItem>
                    <SelectItem value="PUBLISHED">Publicado</SelectItem>
                    <SelectItem value="ARCHIVED">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Featured */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={watch("featured")}
                  onCheckedChange={(checked) => setValue("featured", checked === true)}
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Destacar este serviço na página inicial
                </Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Pricing */}
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Planos e Preços</CardTitle>
              <CardDescription>Configure os planos de preço do serviço</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pricingFields.map((field, index) => (
                <Card key={field.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Plano {index + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removePricing(index)}
                        disabled={pricingFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome do Plano*</Label>
                        <Input {...register(`pricing.${index}.name`)} placeholder="Ex: Básico" />
                      </div>
                      <div className="space-y-2">
                        <Label>Preço*</Label>
                        <Input {...register(`pricing.${index}.price`)} placeholder="Ex: R$ 2.500" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Período (opcional)</Label>
                      <Input {...register(`pricing.${index}.period`)} placeholder="Ex: por mês, único" />
                    </div>

                    <div className="space-y-2">
                      <Label>CTA (opcional)</Label>
                      <Input {...register(`pricing.${index}.cta`)} placeholder="Ex: Solicitar Proposta" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`highlighted-${index}`}
                        checked={watch(`pricing.${index}.highlighted`)}
                        onCheckedChange={(checked) => setValue(`pricing.${index}.highlighted`, checked === true)}
                      />
                      <Label htmlFor={`highlighted-${index}`} className="cursor-pointer">
                        Destacar este plano
                      </Label>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label>Features Incluídas*</Label>
                      {(watch(`pricing.${index}.features`) || []).map((_, fIndex) => (
                        <div key={fIndex} className="flex gap-2">
                          <Input
                            {...register(`pricing.${index}.features.${fIndex}`)}
                            placeholder="Ex: Design responsivo"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const currentFeatures = watch(`pricing.${index}.features`) || [];
                              setValue(
                                `pricing.${index}.features`,
                                currentFeatures.filter((_, i) => i !== fIndex)
                              );
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const currentFeatures = watch(`pricing.${index}.features`) || [];
                          setValue(`pricing.${index}.features`, [...currentFeatures, ""]);
                        }}
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Feature
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  appendPricing({ name: "", price: "", features: [], highlighted: false })
                }
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Plano
              </Button>

              {errors.pricing && <p className="text-sm text-destructive">{errors.pricing.message}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Process */}
        <TabsContent value="process" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processo de Trabalho</CardTitle>
              <CardDescription>Defina as etapas do processo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {processFields.map((field, index) => (
                <Card key={field.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Etapa {index + 1}</CardTitle>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeProcess(index)}
                        disabled={processFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Título*</Label>
                      <Input {...register(`process.${index}.title`)} placeholder="Ex: Briefing" />
                    </div>

                    <div className="space-y-2">
                      <Label>Descrição*</Label>
                      <Textarea
                        {...register(`process.${index}.description`)}
                        placeholder="Descreva esta etapa"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Ícone (opcional)</Label>
                        <Input {...register(`process.${index}.icon`)} placeholder="Ex: Briefcase" />
                      </div>
                      <div className="space-y-2">
                        <Label>Duração (opcional)</Label>
                        <Input {...register(`process.${index}.duration`)} placeholder="Ex: 2-3 dias" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => appendProcess({ title: "", description: "" })}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Etapa
              </Button>

              {errors.process && <p className="text-sm text-destructive">{errors.process.message}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Details */}
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Serviço</CardTitle>
              <CardDescription>Informações adicionais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Prazo de Entrega*</Label>
                <Input
                  id="deliveryTime"
                  {...register("deliveryTime")}
                  placeholder="Ex: 15-30 dias"
                />
                {errors.deliveryTime && <p className="text-sm text-destructive">{errors.deliveryTime.message}</p>}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>O que está incluído*</Label>
                {(watch("includes") || []).map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <Input {...register(`includes.${index}`)} placeholder="Ex: Design responsivo" />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const current = watch("includes") || [];
                        setValue(
                          "includes",
                          current.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const current = watch("includes") || [];
                    setValue("includes", [...current, ""]);
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Item Incluído
                </Button>
              </div>

              <div className="space-y-2">
                <Label>O que NÃO está incluído (opcional)</Label>
                {(watch("excludes") || []).map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <Input {...register(`excludes.${index}`)} placeholder="Ex: Hospedagem" />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const current = watch("excludes") || [];
                        setValue(
                          "excludes",
                          current.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const current = watch("excludes") || [];
                    setValue("excludes", [...current, ""]);
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Item Excluído
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Requisitos (opcional)</Label>
                {(watch("requirements") || []).map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <Input {...register(`requirements.${index}`)} placeholder="Ex: Briefing completo" />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const current = watch("requirements") || [];
                        setValue(
                          "requirements",
                          current.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const current = watch("requirements") || [];
                    setValue("requirements", [...current, ""]);
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Requisito
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Tags*</Label>
                {(watch("tags") || []).map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <Input {...register(`tags.${index}`)} placeholder="Ex: sites" />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const current = watch("tags") || [];
                        setValue(
                          "tags",
                          current.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const current = watch("tags") || [];
                    setValue("tags", [...current, ""]);
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Tag
                </Button>
                {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: SEO */}
        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Otimização SEO</CardTitle>
              <CardDescription>Melhore o ranqueamento nos buscadores</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Título (opcional)</Label>
                <Input
                  id="metaTitle"
                  {...register("metaTitle")}
                  placeholder="Máximo 60 caracteres"
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground">
                  {watch("metaTitle")?.length || 0}/60 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Descrição (opcional)</Label>
                <Textarea
                  id="metaDescription"
                  {...register("metaDescription")}
                  placeholder="Máximo 160 caracteres"
                  maxLength={160}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {watch("metaDescription")?.length || 0}/160 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label>Palavras-chave (opcional)</Label>
                {(watch("metaKeywords") || []).map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      {...register(`metaKeywords.${index}`)}
                      placeholder="palavra-chave"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const current = watch("metaKeywords") || [];
                        setValue(
                          "metaKeywords",
                          current.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const current = watch("metaKeywords") || [];
                    setValue("metaKeywords", [...current, ""]);
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Palavra-chave
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
