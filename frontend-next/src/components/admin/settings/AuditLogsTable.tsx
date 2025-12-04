"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listAuditLogs } from "@/lib/actions/audit-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  User,
  FileText,
  Briefcase,
  Layers,
  Image as ImageIcon,
  Settings,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string | null;
  details: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: Date;
  user: {
    name: string;
    email: string;
    image: string | null;
    role: string;
  };
}

interface AuditLogsTableProps {
  page: number;
  action?: string;
  resource?: string;
  search?: string;
}

const actionColors: Record<string, "default" | "destructive" | "outline" | "secondary"> = {
  CREATE: "default",
  UPDATE: "secondary",
  DELETE: "destructive",
  LOGIN: "outline",
  LOGOUT: "outline",
  PASSWORD_CHANGE: "secondary",
  ROLE_CHANGE: "default",
  PUBLISH: "default",
  UNPUBLISH: "secondary",
};

const resourceIcons: Record<string, React.ElementType> = {
  USER: User,
  POST: FileText,
  CASE: Briefcase,
  SERVICE: Layers,
  MEDIA: ImageIcon,
  SETTINGS: Settings,
};

export function AuditLogsTable({ page, action, resource, search }: AuditLogsTableProps) {
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [filters, setFilters] = useState({
    action: action || "",
    resource: resource || "",
    search: search || "",
  });

  useEffect(() => {
    loadLogs();
  }, [page, action, resource, search]);

  const loadLogs = async () => {
    setLoading(true);
    const result = await listAuditLogs({
      page,
      action: filters.action || undefined,
      resource: filters.resource || undefined,
      search: filters.search || undefined,
    });

    if (result.success && result.logs && result.pagination) {
      setLogs(result.logs);
      setPagination(result.pagination);
    }
    setLoading(false);
  };

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    params.set("page", "1");
    if (filters.action) params.set("action", filters.action);
    if (filters.resource) params.set("resource", filters.resource);
    if (filters.search) params.set("search", filters.search);

    router.push(`/admin/settings/audit-logs?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    if (filters.action) params.set("action", filters.action);
    if (filters.resource) params.set("resource", filters.resource);
    if (filters.search) params.set("search", filters.search);

    router.push(`/admin/settings/audit-logs?${params.toString()}`);
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atividades</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por detalhes ou ID do recurso..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && handleFilterChange()}
                className="pl-10"
              />
            </div>
            <Select
              value={filters.action || "all"}
              onValueChange={(value) => setFilters({ ...filters, action: value === "all" ? "" : value })}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Todas as ações" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as ações</SelectItem>
                <SelectItem value="CREATE">Criar</SelectItem>
                <SelectItem value="UPDATE">Atualizar</SelectItem>
                <SelectItem value="DELETE">Deletar</SelectItem>
                <SelectItem value="LOGIN">Login</SelectItem>
                <SelectItem value="LOGOUT">Logout</SelectItem>
                <SelectItem value="PASSWORD_CHANGE">Trocar Senha</SelectItem>
                <SelectItem value="ROLE_CHANGE">Alterar Role</SelectItem>
                <SelectItem value="PUBLISH">Publicar</SelectItem>
                <SelectItem value="UNPUBLISH">Despublicar</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.resource || "all"}
              onValueChange={(value) => setFilters({ ...filters, resource: value === "all" ? "" : value })}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Todos os recursos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os recursos</SelectItem>
                <SelectItem value="USER">Usuários</SelectItem>
                <SelectItem value="POST">Posts</SelectItem>
                <SelectItem value="CASE">Cases</SelectItem>
                <SelectItem value="SERVICE">Serviços</SelectItem>
                <SelectItem value="MEDIA">Mídia</SelectItem>
                <SelectItem value="SETTINGS">Configurações</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleFilterChange}>Filtrar</Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Recurso</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>IP / User-Agent</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Nenhum log encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => {
                    const ResourceIcon = resourceIcons[log.resource] || FileText;
                    return (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={log.user.image || ""} alt={log.user.name} />
                              <AvatarFallback>
                                {log.user.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{log.user.name}</p>
                              <p className="text-xs text-muted-foreground">{log.user.role}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={actionColors[log.action] || "outline"}>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <ResourceIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{log.resource}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="text-sm truncate">{log.details || "-"}</p>
                          {log.resourceId && (
                            <p className="text-xs text-muted-foreground truncate">
                              ID: {log.resourceId}
                            </p>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[150px]">
                          <p className="text-xs truncate">{log.ipAddress || "-"}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {log.userAgent ? log.userAgent.split(" ")[0] : "-"}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(log.createdAt), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedLog(log)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {logs.length} de {pagination.total} registros
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Log</DialogTitle>
            <DialogDescription>Informações completas da ação registrada</DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Usuário</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={selectedLog.user.image || ""}
                        alt={selectedLog.user.name}
                      />
                      <AvatarFallback>
                        {selectedLog.user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{selectedLog.user.name}</p>
                      <p className="text-xs text-muted-foreground">{selectedLog.user.email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Ação</p>
                  <Badge variant={actionColors[selectedLog.action] || "outline"} className="mt-1">
                    {selectedLog.action}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium">Recurso</p>
                  <p className="text-sm text-muted-foreground mt-1">{selectedLog.resource}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">ID do Recurso</p>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">
                    {selectedLog.resourceId || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">IP Address</p>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">
                    {selectedLog.ipAddress || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Data</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(selectedLog.createdAt).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">User-Agent</p>
                <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
                  {selectedLog.userAgent || "-"}
                </p>
              </div>
              {selectedLog.details && (
                <div>
                  <p className="text-sm font-medium mb-2">Detalhes</p>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                    {selectedLog.details}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
