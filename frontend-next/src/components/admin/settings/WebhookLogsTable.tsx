"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle2, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WebhookLog {
  id: string;
  event: string;
  success: boolean;
  statusCode?: number | null;
  error?: string | null;
  payload: string;
  response?: string | null;
  retriesCount: number;
  createdAt: Date;
}

interface WebhookLogsTableProps {
  logs: WebhookLog[];
}

export function WebhookLogsTable({ logs }: WebhookLogsTableProps) {
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const viewDetails = (log: WebhookLog) => {
    setSelectedLog(log);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Código HTTP</TableHead>
              <TableHead>Tentativas</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>
                  <Badge variant="outline">{log.event}</Badge>
                </TableCell>
                <TableCell>
                  {log.success ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm">Sucesso</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <XCircle className="w-4 h-4" />
                      <span className="text-sm">Falha</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {log.statusCode ? (
                    <Badge
                      variant={log.statusCode >= 200 && log.statusCode < 300 ? "default" : "destructive"}
                      className="font-mono"
                    >
                      {log.statusCode}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {log.retriesCount + 1}x
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(log.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => viewDetails(log)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Log Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Entrega</DialogTitle>
            <DialogDescription>
              {selectedLog && (
                <span>
                  {selectedLog.event} -{" "}
                  {formatDistanceToNow(new Date(selectedLog.createdAt), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              {/* Status */}
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <div className="flex items-center gap-4">
                  {selectedLog.success ? (
                    <Badge variant="default" className="bg-green-600">
                      Sucesso
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Falha</Badge>
                  )}
                  {selectedLog.statusCode && (
                    <Badge variant="outline">HTTP {selectedLog.statusCode}</Badge>
                  )}
                  <Badge variant="secondary">{selectedLog.retriesCount + 1} tentativa(s)</Badge>
                </div>
              </div>

              {/* Error */}
              {selectedLog.error && (
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Erro</h4>
                  <code className="block p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    {selectedLog.error}
                  </code>
                </div>
              )}

              {/* Payload */}
              <div>
                <h4 className="font-medium mb-2">Payload Enviado</h4>
                <pre className="p-3 bg-muted rounded text-xs overflow-x-auto">
                  {JSON.stringify(JSON.parse(selectedLog.payload), null, 2)}
                </pre>
              </div>

              {/* Response */}
              {selectedLog.response && (
                <div>
                  <h4 className="font-medium mb-2">Resposta do Servidor</h4>
                  <pre className="p-3 bg-muted rounded text-xs overflow-x-auto">
                    {selectedLog.response}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
