"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export function MediaUploadButton() {
  return (
    <Button className="gap-2">
      <Upload className="h-4 w-4" />
      Upload Arquivos
    </Button>
  );
}
