"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/admin/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { MoreHorizontal, Eye, Edit, Trash, Star, StarOff, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  deleteService,
  togglePublishService,
  toggleFeaturedService,
} from "@/lib/actions/service-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Service {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: {
    name: string;
    email: string;
  };
}

interface ServiceTableProps {
  data: Service[];
}

export function ServiceTable({ data }: ServiceTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const result = await deleteService(deleteId);

    if (result.success) {
      toast.success("Serviço deletado com sucesso!");
      router.refresh();
    } else {
      toast.error(result.error || "Erro ao deletar serviço");
    }

    setIsDeleting(false);
    setDeleteId(null);
  };

  const handleTogglePublish = async (id: string) => {
    const result = await togglePublishService(id);

    if (result.success) {
      toast.success(
        result.status === "PUBLISHED"
          ? "Serviço publicado!"
          : "Serviço despublicado!"
      );
      router.refresh();
    } else {
      toast.error(result.error || "Erro ao alterar status");
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const result = await toggleFeaturedService(id);

    if (result.success) {
      toast.success(
        result.featured
          ? "Serviço adicionado aos destaques!"
          : "Serviço removido dos destaques!"
      );
      router.refresh();
    } else {
      toast.error(result.error || "Erro ao alterar destaque");
    }
  };

  const columns: ColumnDef<Service>[] = [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        const service = row.original;
        return (
          <div>
            <Link
              href={`/admin/services/${service.id}/edit`}
              className="font-medium hover:text-primary flex items-center gap-2"
            >
              {service.featured && <Star className="w-3 h-3 text-primary fill-primary" />}
              {service.title}
            </Link>
            <p className="text-xs text-muted-foreground">/{service.slug}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const variant =
          status === "PUBLISHED"
            ? "default"
            : status === "DRAFT"
            ? "secondary"
            : "outline";

        return <Badge variant={variant}>{status}</Badge>;
      },
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => {
        return <Badge variant="outline">{row.original.category}</Badge>;
      },
    },
    {
      accessorKey: "featured",
      header: "Destaque",
      cell: ({ row }) => {
        const featured = row.original.featured;
        return featured ? (
          <Star className="w-4 h-4 text-primary fill-primary" />
        ) : (
          <Star className="w-4 h-4 text-muted-foreground" />
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Atualizado",
      cell: ({ row }) => {
        return (
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(row.original.updatedAt), {
              addSuffix: true,
              locale: ptBR,
            })}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const service = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/servicos/${service.slug}`} target="_blank">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/services/${service.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleTogglePublish(service.id)}>
                {service.status === "PUBLISHED" ? (
                  <>
                    <XCircle className="w-4 h-4 mr-2" />
                    Despublicar
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Publicar
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleToggleFeatured(service.id)}>
                {service.featured ? (
                  <>
                    <StarOff className="w-4 h-4 mr-2" />
                    Remover Destaque
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Adicionar Destaque
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteId(service.id)}
                className="text-destructive"
              >
                <Trash className="w-4 h-4 mr-2" />
                Deletar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={data} searchKey="title" searchPlaceholder="Buscar serviços..." />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Serviço</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este serviço? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isDeleting ? "Deletando..." : "Deletar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
