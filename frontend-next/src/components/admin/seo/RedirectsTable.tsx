"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Redirect } from "@prisma/client";
import { deleteRedirect, updateRedirect } from "@/lib/actions/redirect-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Trash2, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface RedirectsTableProps {
  redirects: Redirect[];
}

export function RedirectsTable({ redirects }: RedirectsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    setDeletingId(id);
    await deleteRedirect(id);
    setDeletingId(null);
    router.refresh();
  }

  async function handleToggleActive(id: string, isActive: boolean) {
    await updateRedirect(id, { isActive });
    router.refresh();
  }

  if (redirects.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Nenhum redirect configurado
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Source</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Acessos</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criado</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {redirects.map((redirect) => (
            <TableRow key={redirect.id}>
              <TableCell className="font-mono text-sm">
                {redirect.source}
              </TableCell>
              <TableCell className="font-mono text-sm max-w-xs truncate">
                <a
                  href={redirect.destination}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  {redirect.destination}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </TableCell>
              <TableCell>
                <Badge variant={redirect.type === "PERMANENT_301" ? "default" : "secondary"}>
                  {redirect.type === "PERMANENT_301" ? "301" : "302"}
                </Badge>
              </TableCell>
              <TableCell>{redirect.hitCount}</TableCell>
              <TableCell>
                <Switch
                  checked={redirect.isActive}
                  onCheckedChange={(checked) =>
                    handleToggleActive(redirect.id, checked)
                  }
                />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {format(new Date(redirect.createdAt), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={deletingId === redirect.id}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Deletar Redirect?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. O redirect{" "}
                        <span className="font-mono">{redirect.source}</span> será
                        removido permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(redirect.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Deletar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
