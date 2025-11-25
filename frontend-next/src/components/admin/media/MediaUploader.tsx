"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MediaUploaderProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  endpoint?: keyof OurFileRouter;
}

export function MediaUploader({
  onUploadComplete,
  maxFiles = 10,
  endpoint = "imageUploader",
}: MediaUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string; name: string }>>([]);

  const handleUploadComplete = (res: any) => {
    const newFiles = res.map((file: any) => ({
      url: file.url,
      name: file.name,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    toast.success(`${res.length} arquivo(s) enviado(s) com sucesso!`);

    if (onUploadComplete) {
      const urls = [...uploadedFiles, ...newFiles].map((f) => f.url);
      onUploadComplete(urls);
    }
  };

  const removeFile = (url: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.url !== url));

    if (onUploadComplete) {
      const urls = uploadedFiles.filter((f) => f.url !== url).map((f) => f.url);
      onUploadComplete(urls);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <UploadDropzone<OurFileRouter, typeof endpoint>
        endpoint={endpoint}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          toast.error(`Erro no upload: ${error.message}`);
        }}
        config={{
          mode: "auto",
        }}
        appearance={{
          container: "border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors",
          uploadIcon: "text-primary",
          label: "text-primary",
          allowedContent: "text-muted-foreground",
        }}
      />

      {/* Preview Grid */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedFiles.map((file) => (
            <Card key={file.url} className="relative group overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
                {/* Success indicator */}
                <div className="absolute top-2 left-2 bg-green-500 rounded-full p-1">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                {/* Remove button */}
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(file.url)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-2 text-xs text-center truncate">{file.name}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
