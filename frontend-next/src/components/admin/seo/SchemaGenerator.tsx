"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
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
import { Copy, Check } from "lucide-react";

type SchemaType =
  | "Article"
  | "BlogPosting"
  | "Organization"
  | "Person"
  | "Product"
  | "Service"
  | "LocalBusiness";

export function SchemaGenerator() {
  const [schemaType, setSchemaType] = useState<SchemaType>("Article");
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    image: "",
    author: "",
    datePublished: "",
    publisher: "",
  });

  function generateSchema(): string {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": schemaType,
    };

    let schema: Record<string, unknown> = { ...baseSchema };

    switch (schemaType) {
      case "Article":
      case "BlogPosting":
        schema = {
          ...schema,
          headline: formData.name,
          description: formData.description,
          url: formData.url,
          image: formData.image,
          datePublished: formData.datePublished,
          author: {
            "@type": "Person",
            name: formData.author,
          },
          publisher: {
            "@type": "Organization",
            name: formData.publisher,
            logo: {
              "@type": "ImageObject",
              url: formData.image,
            },
          },
        };
        break;

      case "Organization":
      case "LocalBusiness":
        schema = {
          ...schema,
          name: formData.name,
          description: formData.description,
          url: formData.url,
          logo: formData.image,
        };
        break;

      case "Person":
        schema = {
          ...schema,
          name: formData.name,
          description: formData.description,
          url: formData.url,
          image: formData.image,
        };
        break;

      case "Product":
      case "Service":
        schema = {
          ...schema,
          name: formData.name,
          description: formData.description,
          url: formData.url,
          image: formData.image,
          provider: {
            "@type": "Organization",
            name: formData.publisher,
          },
        };
        break;
    }

    // Remove empty fields
    Object.keys(schema).forEach((key) => {
      if (!schema[key]) delete schema[key];
    });

    return JSON.stringify(schema, null, 2);
  }

  const schemaMarkup = generateSchema();

  async function copyToClipboard() {
    await navigator.clipboard.writeText(schemaMarkup);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Gerador de Schema.org Markup
        </h3>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="schema-type">Tipo de Schema</Label>
            <Select
              value={schemaType}
              onValueChange={(value: SchemaType) => setSchemaType(value)}
            >
              <SelectTrigger id="schema-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="BlogPosting">Blog Posting</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
                <SelectItem value="Person">Person</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
                <SelectItem value="LocalBusiness">Local Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                {schemaType === "Person" ? "Nome" : "Título/Nome"}
              </Label>
              <Input
                id="name"
                placeholder="Nome ou título"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descrição do conteúdo"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <Input
              id="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>

          {(schemaType === "Article" || schemaType === "BlogPosting") && (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="author">Autor</Label>
                  <Input
                    id="author"
                    placeholder="Nome do autor"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Data de Publicação</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.datePublished}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        datePublished: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publisher">Publisher</Label>
                <Input
                  id="publisher"
                  placeholder="Nome da organização"
                  value={formData.publisher}
                  onChange={(e) =>
                    setFormData({ ...formData, publisher: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {(schemaType === "Product" || schemaType === "Service") && (
            <div className="space-y-2">
              <Label htmlFor="provider">Provedor</Label>
              <Input
                id="provider"
                placeholder="Nome da organização"
                value={formData.publisher}
                onChange={(e) =>
                  setFormData({ ...formData, publisher: e.target.value })
                }
              />
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">JSON-LD Gerado</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar
              </>
            )}
          </Button>
        </div>

        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
          <code>{schemaMarkup}</code>
        </pre>

        <p className="text-xs text-muted-foreground mt-4">
          Copie este código e adicione dentro da tag <code>&lt;head&gt;</code>{" "}
          da sua página usando um componente <code>&lt;script
          type=&quot;application/ld+json&quot;&gt;</code>
        </p>
      </Card>
    </div>
  );
}
