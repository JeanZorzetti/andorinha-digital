"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  createBackup,
  deleteBackup,
  restoreBackup,
  downloadBackup,
} from "@/lib/actions/backup-actions";
import { toast } from "sonner";
import {
  Database,
  Trash2,
  Plus,
  Download,
  RotateCcw,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  HardDrive,
  Image,
  Settings,
} from "lucide-react";

interface Backup {
  id: string;
  filename: string;
  filepath: string;
  size: number;
  type: "MANUAL" | "SCHEDULED" | "ON_DEMAND";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  includesDatabase: boolean;
  includesMedia: boolean;
  includesConfig: boolean;
  startedAt: Date | null;
  completedAt: Date | null;
  error: string | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    email: string;
  };
}

interface BackupsListProps {
  backups: Backup[];
}

export function BackupsList({ backups: initialBackups }: BackupsListProps) {
  const [backups, setBackups] = useState(initialBackups);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [restoreId, setRestoreId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createOptions, setCreateOptions] = useState({
    includesDatabase: true,
    includesMedia: true,
    includesConfig: true,
  });

  async function handleDelete(id: string) {
    const result = await deleteBackup(id);

    if (result.success) {
      toast.success("Backup excluído com sucesso!");
      setBackups(backups.filter((b) => b.id !== id));
    } else {
      toast.error(result.error || "Erro ao excluir backup");
    }

    setDeleteId(null);
  }

  async function handleRestore(id: string) {
    const result = await restoreBackup(id);

    if (result.success) {
      toast.success(result.message || "Backup restaurado com sucesso!");
    } else {
      toast.error(result.error || "Erro ao restaurar backup");
    }

    setRestoreId(null);
  }

  async function handleDownload(id: string) {
    const result = await downloadBackup(id);

    if (result.success && result.data) {
      toast.info("Download não implementado. Arquivo: " + result.data.filename);
      // TODO: Implement actual file download
    } else {
      toast.error(result.error || "Erro ao baixar backup");
    }
  }

  async function handleCreate() {
    setIsCreating(true);

    try {
      const result = await createBackup(createOptions);

      if (result.success && result.data) {
        toast.success(result.message || "Backup criado com sucesso!");
        // Reload the page to get updated backups list with user data
        window.location.reload();
      } else {
        toast.error(result.error || "Erro ao criar backup");
      }
    } catch (error) {
      console.error("Error creating backup:", error);
      toast.error("Erro ao criar backup");
    } finally {
      setIsCreating(false);
    }
  }

  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  }

  function formatDate(date: Date | null) {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("pt-BR");
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "FAILED":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "IN_PROGRESS":
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  }

  function getStatusVariant(status: string) {
    switch (status) {
      case "COMPLETED":
        return "default";
      case "FAILED":
        return "destructive";
      case "IN_PROGRESS":
        return "secondary";
      default:
        return "outline";
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Backups Disponíveis</h3>
          <p className="text-sm text-muted-foreground">
            Gerencie e restaure backups do sistema
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Criar Backup
        </Button>
      </div>

      {backups.length === 0 ? (
        <Card className="p-8 text-center">
          <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Nenhum backup encontrado</h3>
          <p className="text-muted-foreground mb-4">
            Crie seu primeiro backup para proteger seus dados
          </p>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Backup
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {backups.map((backup) => (
            <Card key={backup.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(backup.status)}
                    <h4 className="text-lg font-semibold">{backup.filename}</h4>
                    <Badge variant={getStatusVariant(backup.status)}>
                      {backup.status}
                    </Badge>
                    <Badge variant="outline">{backup.type}</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Tamanho: </span>
                      <span className="font-medium">{formatBytes(backup.size)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Criado: </span>
                      <span className="font-medium">
                        {formatDate(backup.createdAt)}
                      </span>
                    </div>
                    {backup.completedAt && (
                      <div className="text-sm">
                        <span className="text-muted-foreground">Concluído: </span>
                        <span className="font-medium">
                          {formatDate(backup.completedAt)}
                        </span>
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="text-muted-foreground">Por: </span>
                      <span className="font-medium">{backup.user.name}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {backup.includesDatabase && (
                      <Badge variant="secondary" className="gap-1">
                        <HardDrive className="h-3 w-3" />
                        Database
                      </Badge>
                    )}
                    {backup.includesMedia && (
                      <Badge variant="secondary" className="gap-1">
                        <Image className="h-3 w-3" />
                        Media
                      </Badge>
                    )}
                    {backup.includesConfig && (
                      <Badge variant="secondary" className="gap-1">
                        <Settings className="h-3 w-3" />
                        Config
                      </Badge>
                    )}
                  </div>

                  {backup.error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                      <strong>Erro:</strong> {backup.error}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  {backup.status === "COMPLETED" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(backup.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setRestoreId(backup.id)}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDeleteId(backup.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este backup? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={!!restoreId} onOpenChange={() => setRestoreId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Restauração</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja restaurar este backup? Esta ação irá substituir
              todos os dados atuais. Recomenda-se criar um backup antes de
              restaurar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => restoreId && handleRestore(restoreId)}
              className="bg-orange-600 text-white hover:bg-orange-700"
            >
              Restaurar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Backup Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Backup</DialogTitle>
            <DialogDescription>
              Selecione o que deseja incluir no backup
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="database"
                checked={createOptions.includesDatabase}
                onCheckedChange={(checked) =>
                  setCreateOptions({
                    ...createOptions,
                    includesDatabase: checked as boolean,
                  })
                }
              />
              <Label htmlFor="database" className="flex items-center gap-2">
                <HardDrive className="h-4 w-4" />
                Banco de Dados
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="media"
                checked={createOptions.includesMedia}
                onCheckedChange={(checked) =>
                  setCreateOptions({
                    ...createOptions,
                    includesMedia: checked as boolean,
                  })
                }
              />
              <Label htmlFor="media" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Arquivos de Mídia
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="config"
                checked={createOptions.includesConfig}
                onCheckedChange={(checked) =>
                  setCreateOptions({
                    ...createOptions,
                    includesConfig: checked as boolean,
                  })
                }
              />
              <Label htmlFor="config" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Arquivos de Configuração
              </Label>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Nota:</strong> O backup pode levar alguns minutos dependendo
                do tamanho dos dados.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Criar Backup
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
