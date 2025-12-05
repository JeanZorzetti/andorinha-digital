"use client";

import { useState } from "react";
import { SEOPreview } from "@/components/admin/seo/SEOPreview";
import { SchemaGenerator } from "@/components/admin/seo/SchemaGenerator";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SEOToolsPage() {
  const [previewData, setPreviewData] = useState({
    title: "Exemplo de Título SEO - Andorinha Audiovisual",
    description:
      "Esta é uma descrição de exemplo para demonstrar como seu conteúdo aparecerá nos resultados de busca do Google e nas redes sociais.",
    url: "https://andorinha.com/exemplo",
    image: "/images/og-default.jpg",
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Ferramentas de SEO
        </h1>
        <p className="text-muted-foreground mt-2">
          Preview de SERP, Schema.org e outras ferramentas de otimização
        </p>
      </div>

      <Tabs defaultValue="preview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="preview">SEO Preview</TabsTrigger>
          <TabsTrigger value="schema">Schema Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Dados para Preview
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Meta Title</Label>
                  <Input
                    id="title"
                    value={previewData.title}
                    onChange={(e) =>
                      setPreviewData({ ...previewData, title: e.target.value })
                    }
                    maxLength={70}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recomendado: 50-60 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea
                    id="description"
                    value={previewData.description}
                    onChange={(e) =>
                      setPreviewData({
                        ...previewData,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recomendado: 150-160 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={previewData.url}
                    onChange={(e) =>
                      setPreviewData({ ...previewData, url: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem (OG Image)</Label>
                  <Input
                    id="image"
                    value={previewData.image}
                    onChange={(e) =>
                      setPreviewData({ ...previewData, image: e.target.value })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Recomendado: 1200x630px para redes sociais
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-6">
              <SEOPreview
                title={previewData.title}
                description={previewData.description}
                url={previewData.url}
                image={previewData.image}
              />

              <Card className="p-6 bg-blue-50 dark:bg-blue-950">
                <h3 className="font-semibold mb-2">Dicas de SEO</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Mantenha o título entre 50-60 caracteres</li>
                  <li>• A descrição deve ter 150-160 caracteres</li>
                  <li>• Use palavras-chave relevantes no início</li>
                  <li>• Seja descritivo e atraente para aumentar CTR</li>
                  <li>• Teste diferentes versões com A/B testing</li>
                </ul>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schema">
          <SchemaGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
