"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRedirect } from "@/lib/actions/redirect-actions";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

export function RedirectForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    type: "PERMANENT_301" as "PERMANENT_301" | "TEMPORARY_302",
    description: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const result = await createRedirect(formData);

    if (result.success) {
      setSuccess(true);
      setFormData({
        source: "",
        destination: "",
        type: "PERMANENT_301",
        description: "",
      });
      router.refresh();
    } else {
      setError(result.error || "Erro ao criar redirect");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>Redirect criado com sucesso!</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="source">Source Path *</Label>
        <Input
          id="source"
          placeholder="/old-page"
          value={formData.source}
          onChange={(e) =>
            setFormData({ ...formData, source: e.target.value })
          }
          required
        />
        <p className="text-xs text-muted-foreground">
          Caminho antigo (deve começar com /)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Destination *</Label>
        <Input
          id="destination"
          placeholder="/new-page ou https://example.com"
          value={formData.destination}
          onChange={(e) =>
            setFormData({ ...formData, destination: e.target.value })
          }
          required
        />
        <p className="text-xs text-muted-foreground">
          Caminho novo ou URL completa
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Tipo de Redirect</Label>
        <Select
          value={formData.type}
          onValueChange={(value: "PERMANENT_301" | "TEMPORARY_302") =>
            setFormData({ ...formData, type: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PERMANENT_301">301 - Permanente</SelectItem>
            <SelectItem value="TEMPORARY_302">302 - Temporário</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Motivo do redirect..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Criando...
          </>
        ) : (
          "Criar Redirect"
        )}
      </Button>
    </form>
  );
}
