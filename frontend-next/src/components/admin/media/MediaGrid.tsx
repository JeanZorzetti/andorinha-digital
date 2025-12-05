"use client";

import { useEffect, useState } from "react";
import { listMedia } from "@/lib/actions/media-actions";
import { MediaCard } from "./MediaCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export function MediaGrid({ searchParams }: { searchParams: any }) {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMedia() {
      const result = await listMedia({
        page: 1,
        limit: 24,
        type: searchParams.type,
        folder: searchParams.folder,
        search: searchParams.search,
      });
      
      if (result.success && result.media) {
        setMedia(result.media);
      }
      setLoading(false);
    }
    loadMedia();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (media.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          Nenhuma mídia encontrada. Faça upload de arquivos para começar.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {media.map((item) => (
        <MediaCard key={item.id} media={item} />
      ))}
    </div>
  );
}
