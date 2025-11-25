"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { caseStudySchema, type CaseStudyFormData } from "@/lib/validations/case-schema";
import { createCaseStudy, updateCaseStudy } from "@/lib/actions/case-actions";
import { generateSlug } from "@/lib/utils/slug";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RichTextEditor } from "../blog/RichTextEditor";
import { toast } from "sonner";
import { Loader2, Save, Eye, Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface CaseFormProps {
  initialData?: Partial<CaseStudyFormData> & { id?: string };
  mode: "create" | "edit";
}

const industries = [
  "E-commerce",
  "Saúde",
  "Educação",
  "Tecnologia",
  "Serviços Financeiros",
  "Varejo",
  "Imobiliário",
  "Alimentação",
  "Turismo",
  "Outros",
];

export function CaseForm({ initialData, mode }: CaseFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [results, setResults] = useState<string[]>(initialData?.results || []);
  const [resultInput, setResultInput] = useState("");
  const [gallery, setGallery] = useState<string[]>(initialData?.gallery || []);
  const [galleryInput, setGalleryInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>(initialData?.technologies || []);
  const [techInput, setTechInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CaseStudyFormData>({
    resolver: zodResolver(caseStudySchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      client: initialData?.client || "",
      industry: initialData?.industry || "",
      category: initialData?.category || "",
      challenge: initialData?.challenge || "",
      solution: initialData?.solution || "",
      results: initialData?.results || [],
      image: initialData?.image || "",
      gallery: initialData?.gallery || [],
      tags: initialData?.tags || [],
      status: initialData?.status || "DRAFT",
      featured: initialData?.featured || false,
      technologies: initialData?.technologies || [],
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      metaKeywords: initialData?.metaKeywords || [],
    },
  });

  const content = watch("content");

  // Auto-gerar slug quando o título mudar
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue("title", newTitle);
    if (mode === "create") {
      const newSlug = generateSlug(newTitle);
      setValue("slug", newSlug);
    }
  };

  const handleContentChange = (newContent: string) => {
    setValue("content", newContent);
  };

  // Tags
  const addTag = () => {
    if (tagInput && tags.length < 5 && !tags.includes(tagInput)) {
      const newTags = [...tags, tagInput];
      setTags(newTags);
      setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  // Results
  const addResult = () => {
    if (resultInput && results.length < 10) {
      const newResults = [...results, resultInput];
      setResults(newResults);
      setValue("results", newResults);
      setResultInput("");
    }
  };

  const removeResult = (index: number) => {
    const newResults = results.filter((_, i) => i !== index);
    setResults(newResults);
    setValue("results", newResults);
  };

  // Gallery
  const addGalleryImage = () => {
    if (galleryInput && gallery.length < 10) {
      const newGallery = [...gallery, galleryInput];
      setGallery(newGallery);
      setValue("gallery", newGallery);
      setGalleryInput("");
    }
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setGallery(newGallery);
    setValue("gallery", newGallery);
  };

  // Technologies
  const addTechnology = () => {
    if (techInput && technologies.length < 15 && !technologies.includes(techInput)) {
      const newTech = [...technologies, techInput];
      setTechnologies(newTech);
      setValue("technologies", newTech);
      setTechInput("");
    }
  };

  const removeTechnology = (techToRemove: string) => {
    const newTech = technologies.filter((t) => t !== techToRemove);
    setTechnologies(newTech);
    setValue("technologies", newTech);
  };

  const onSubmit = async (data: CaseStudyFormData) => {
    setIsSubmitting(true);

    try {
      let result;
      if (mode === "create") {
        result = await createCaseStudy(data);
      } else if (initialData?.id) {
        result = await updateCaseStudy({ id: initialData.id, ...data });
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(
          mode === "create" ? "Case criado com sucesso!" : "Case atualizado com sucesso!"
        );
        router.push("/admin/cases");
        router.refresh();
      }
    } catch {
      toast.error("Erro ao salvar case");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    setValue("status", "DRAFT");
    handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    setValue("status", "PUBLISHED");
    handleSubmit(onSubmit)();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>Dados principais do case</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  onChange={handleTitleChange}
                  placeholder="Digite o título do case"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input id="slug" {...register("slug")} placeholder="titulo-do-case" />
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Breve descrição do case (50-500 caracteres)"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Cliente *</Label>
                  <Input
                    id="client"
                    {...register("client")}
                    placeholder="Nome do cliente"
                  />
                  {errors.client && (
                    <p className="text-sm text-destructive mt-1">{errors.client.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="industry">Setor *</Label>
                  <Select value={watch("industry")} onValueChange={(value) => setValue("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && (
                    <p className="text-sm text-destructive mt-1">{errors.industry.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input
                  id="category"
                  {...register("category")}
                  placeholder="Ex: Website, E-commerce, Landing Page"
                />
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Challenge & Solution */}
          <Card>
            <CardHeader>
              <CardTitle>Desafio e Solução</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="challenge">Desafio *</Label>
                <Textarea
                  id="challenge"
                  {...register("challenge")}
                  placeholder="Qual era o desafio do cliente?"
                  rows={4}
                />
                {errors.challenge && (
                  <p className="text-sm text-destructive mt-1">{errors.challenge.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="solution">Solução *</Label>
                <Textarea
                  id="solution"
                  {...register("solution")}
                  placeholder="Como você resolveu o problema?"
                  rows={4}
                />
                {errors.solution && (
                  <p className="text-sm text-destructive mt-1">{errors.solution.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Detailed Content */}
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo Detalhado</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Conteúdo Completo</Label>
              <RichTextEditor
                content={content || ""}
                onChange={handleContentChange}
                placeholder="Escreva o conteúdo detalhado do case..."
              />
              {errors.content && (
                <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Resultados *</CardTitle>
              <CardDescription>Adicione os resultados alcançados</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={resultInput}
                  onChange={(e) => setResultInput(e.target.value)}
                  placeholder="Ex: Aumento de 150% nas vendas"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addResult())}
                />
                <Button type="button" onClick={addResult} size="sm" disabled={results.length >= 10}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                    <span className="flex-1 text-sm">{result}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeResult(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {errors.results && (
                <p className="text-sm text-destructive">{errors.results.message}</p>
              )}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Título</Label>
                <Input
                  id="metaTitle"
                  {...register("metaTitle")}
                  placeholder="Título otimizado para SEO"
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Descrição</Label>
                <Textarea
                  id="metaDescription"
                  {...register("metaDescription")}
                  placeholder="Descrição para resultados de busca"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publication */}
          <Card>
            <CardHeader>
              <CardTitle>Publicação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={watch("status")}
                  onValueChange={(value) =>
                    setValue("status", value as "DRAFT" | "PUBLISHED" | "ARCHIVED")
                  }
                >
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={watch("featured")}
                  onCheckedChange={(checked) => setValue("featured", !!checked)}
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Destacar case
                </Label>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleSaveDraft}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Salvar Rascunho
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  onClick={handlePublish}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4 mr-2" />
                  )}
                  Publicar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Imagem Destacada</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="image">URL da Imagem *</Label>
                <Input
                  id="image"
                  {...register("image")}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
                {errors.image && (
                  <p className="text-sm text-destructive mt-1">{errors.image.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Galeria de Imagens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  placeholder="URL da imagem"
                />
                <Button type="button" onClick={addGalleryImage} size="sm" disabled={gallery.length >= 10}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {gallery.map((img, index) => (
                  <div key={index} className="relative group">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-24 object-cover rounded" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Adicionar tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} size="sm" disabled={tags.length >= 5}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/10 text-primary px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              {tags.length === 0 && errors.tags && (
                <p className="text-sm text-destructive">{errors.tags.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle>Tecnologias Utilizadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-2">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="Ex: React, Node.js"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology} size="sm" disabled={technologies.length >= 15}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
