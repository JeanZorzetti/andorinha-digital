"use client";

import { Card } from "@/components/ui/card";

interface MediaFiltersProps {
  folders: string[];
}

export function MediaFilters({ folders }: MediaFiltersProps) {
  return (
    <Card className="p-4">
      <p className="text-sm text-muted-foreground">
        Filtros: {folders.length} pastas disponíveis
      </p>
    </Card>
  );
}
