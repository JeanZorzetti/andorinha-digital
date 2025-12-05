"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Share2 } from "lucide-react";

interface SEOPreviewProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

export function SEOPreview({
  title,
  description,
  url,
  image,
}: SEOPreviewProps) {
  // Truncate title and description for Google SERP
  const truncatedTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;
  const truncatedDesc = description.length > 160 ? description.substring(0, 157) + "..." : description;

  // Get domain from URL
  const domain = url.replace(/^https?:\/\//, "").split("/")[0];

  return (
    <Card className="p-6">
      <Tabs defaultValue="serp">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="serp" className="gap-2">
            <Globe className="h-4 w-4" />
            Google SERP
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Share2 className="h-4 w-4" />
            Social Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="serp" className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Preview de como aparecerá no Google
            </p>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 text-xs">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-muted-foreground">{domain}</span>
                <span className="text-muted-foreground">›</span>
                <span className="text-muted-foreground">
                  {url.replace(/^https?:\/\/[^\/]+/, "")}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl text-blue-600 font-medium hover:underline cursor-pointer">
                {truncatedTitle}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {truncatedDesc}
              </p>
            </div>

            {/* Character count */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                Title: {title.length}/60{" "}
                {title.length > 60 && (
                  <span className="text-yellow-600">⚠ Muito longo</span>
                )}
              </span>
              <span>
                Description: {description.length}/160{" "}
                {description.length > 160 && (
                  <span className="text-yellow-600">⚠ Muito longa</span>
                )}
              </span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Preview de como aparecerá no Facebook, Twitter, LinkedIn
            </p>

            {/* Facebook/OG Preview */}
            <div className="border rounded-lg overflow-hidden">
              {image && (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4 bg-card space-y-1">
                <p className="text-xs text-muted-foreground uppercase">
                  {domain}
                </p>
                <h4 className="font-semibold text-base line-clamp-2">
                  {title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {description}
                </p>
              </div>
            </div>

            {/* Twitter Card Preview */}
            <div className="border rounded-lg overflow-hidden">
              <div className="flex gap-3 p-4">
                {image && (
                  <div className="w-32 h-32 bg-muted rounded flex-shrink-0">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-sm line-clamp-2">
                    {title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {domain}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
