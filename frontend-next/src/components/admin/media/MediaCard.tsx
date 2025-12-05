"use client";

import { Media } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { FileText, Image, Video, File } from "lucide-react";

interface MediaCardProps {
  media: Media & {
    uploadedBy: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export function MediaCard({ media }: MediaCardProps) {
  const getIcon = () => {
    switch (media.type) {
      case "IMAGE":
        return Image;
      case "PDF":
        return FileText;
      case "VIDEO":
        return Video;
      default:
        return File;
    }
  };

  const Icon = getIcon();

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center mb-3">
        {media.type === "IMAGE" ? (
          <img
            src={media.url}
            alt={media.alt || media.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <Icon className="h-12 w-12 text-muted-foreground" />
        )}
      </div>
      <p className="font-medium text-sm truncate">{media.name}</p>
      <p className="text-xs text-muted-foreground mt-1">
        {(media.size / 1024).toFixed(2)} KB
      </p>
    </Card>
  );
}
