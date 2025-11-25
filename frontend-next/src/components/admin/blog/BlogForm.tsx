"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { blogPostSchema, type BlogPostFormData } from "@/lib/validations/blog-schema";
import { createBlogPost, updateBlogPost } from "@/lib/actions/blog-actions";
import { generateSlug, calculateReadTime } from "@/lib/utils/slug";
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
import { RichTextEditor } from "./RichTextEditor";
import { toast } from "sonner";
import { Loader2, Save, Eye } from "lucide-react";

interface BlogFormProps {
  initialData?: Partial<BlogPostFormData> & { id?: string };
  mode: "create" | "edit";
}

const categories = [
  "Marketing Digital",
  "Desenvolvimento Web",
  "Design",
  "SEO",
  "Redes Sociais",
  "E-commerce",
  "Tecnologia",
];

export function BlogForm({ initialData, mode }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      image: initialData?.image || "",
      category: initialData?.category || "",
      tags: initialData?.tags || [],
      status: initialData?.status || "DRAFT",
      readTime: initialData?.readTime || "5 min",
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

  // Auto-calcular tempo de leitura quando o conteúdo mudar
  const handleContentChange = (newContent: string) => {
    setValue("content", newContent);
    if (newContent) {
      const readTime = calculateReadTime(newContent);
      setValue("readTime", readTime);
    }
  };

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

  const onSubmit = async (data: BlogPostFormData) => {
    setIsSubmitting(true);

    try {
      let result;
      if (mode === "create") {
        result = await createBlogPost(data);
      } else if (initialData?.id) {
        result = await updateBlogPost({ id: initialData.id, ...data });
      }

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(
          mode === "create" ? "Post criado com sucesso!" : "Post atualizado com sucesso!"
        );
        router.push("/admin/blog");
        router.refresh();
      }
    } catch {
      toast.error("Erro ao salvar post");
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
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo do Post</CardTitle>
              <CardDescription>Informações principais do artigo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  onChange={handleTitleChange}
                  placeholder="Digite o título do post"
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input id="slug" {...register("slug")} placeholder="titulo-do-post" />
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="excerpt">Resumo *</Label>
                <Textarea
                  id="excerpt"
                  {...register("excerpt")}
                  placeholder="Breve resumo do post (50-300 caracteres)"
                  rows={3}
                />
                {errors.excerpt && (
                  <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>
                )}
              </div>

              <div>
                <Label>Conteúdo *</Label>
                <RichTextEditor
                  content={content || ""}
                  onChange={handleContentChange}
                  placeholder="Escreva o conteúdo do post aqui..."
                />
                {errors.content && (
                  <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO</CardTitle>
              <CardDescription>Otimização para motores de busca</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Título</Label>
                <Input
                  id="metaTitle"
                  {...register("metaTitle")}
                  placeholder="Título otimizado para SEO (máx. 60 caracteres)"
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Descrição</Label>
                <Textarea
                  id="metaDescription"
                  {...register("metaDescription")}
                  placeholder="Descrição para resultados de busca (máx. 160 caracteres)"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
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

          <Card>
            <CardHeader>
              <CardTitle>Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={watch("category")} onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
              )}
            </CardContent>
          </Card>

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
                  Adicionar
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

          <Card>
            <CardHeader>
              <CardTitle>Tempo de Leitura</CardTitle>
            </CardHeader>
            <CardContent>
              <Input {...register("readTime")} placeholder="5 min" />
              {errors.readTime && (
                <p className="text-sm text-destructive mt-1">{errors.readTime.message}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
