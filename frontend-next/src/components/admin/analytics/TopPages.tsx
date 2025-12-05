"use client";

import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface TopPage {
  path: string;
  views: number;
}

interface TopPagesProps {
  pages: TopPage[];
}

export function TopPages({ pages }: TopPagesProps) {
  if (!pages || pages.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Páginas Mais Visitadas</h3>
      <div className="space-y-3">
        {pages.map((page, index) => (
          <div
            key={page.path}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-muted-foreground w-6">
                {index + 1}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{page.path}</span>
                <a
                  href={page.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            <span className="text-sm font-semibold">
              {page.views.toLocaleString()} views
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
