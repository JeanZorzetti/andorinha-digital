"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash, Eye, Star } from "lucide-react";
import { toast } from "sonner";

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
import { DataTable } from "../shared/DataTable";
import { deleteCaseStudy, togglePublishCaseStudy, toggleFeaturedCaseStudy } from "@/lib/actions/case-actions";

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  status: string;
  featured: boolean;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
}

interface CaseTableProps {
  data: CaseStudy[];
}

export function CaseTable({ data }: CaseTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const result = await deleteCaseStudy(deleteId);

    if (result.success) {
      toast.success("Case deletado com sucesso!");
      router.refresh();
    } else {
      toast.error(result.error || "Erro ao deletar case");
    }

    setIsDeleting(false);
    setDeleteId(null);
  };

  const handleTogglePublish = async (id: string) => {
    const result = await togglePublishCaseStudy(id);

    if (result.success) {
      toast.success(
        result.caseStudy?.status === "PUBLISHED"
          ? "Case publicado!"
          : "Case despublicado!"
      );
      router.refresh();
    } else {
      toast.error(result.error || "Erro ao alterar status");
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const result = await toggleFeaturedCaseStudy(id);

    if (result.success) {
      toast.success(
        result.featured
          ? "Case adicionado aos destaques!"
          : "Case removido dos destaques!"
      );
      router.refresh();
    } else {
      toast.error(result.error || "Erro ao alterar destaque");
    }
  };

  const columns: ColumnDef<CaseStudy>[] = [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        const caseStudy = row.original;
        return (
          <div className="max-w-md">
            <Link
              href={`/admin/cases/${caseStudy.id}`}
              className="font-medium hover:text-primary"
            >
              {caseStudy.title}
            </Link>
            <p className="text-xs text-muted-foreground">/{caseStudy.slug}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "client",
      header: "Cliente",
      cell: ({ row }) => {
        return (
          <div>
            <p className="font-medium">{row.original.client}</p>
            <p className="text-xs text-muted-foreground">{row.original.industry}</p>
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
      accessorKey: "featured",
      header: "Destaque",
      cell: ({ row }) => {
        return row.original.featured ? (
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ) : (
          <Star className="w-4 h-4 text-muted-foreground" />
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const caseStudy = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href={`/cases/${caseStudy.slug}`} target="_blank">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/cases/${caseStudy.id}/edit`}>
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTogglePublish(caseStudy.id)}>
                  {caseStudy.status === "PUBLISHED" ? "Despublicar" : "Publicar"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleToggleFeatured(caseStudy.id)}>
                  <Star className="w-4 h-4 mr-2" />
                  {caseStudy.featured ? "Remover Destaque" : "Destacar"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteId(caseStudy.id)}
                  className="text-destructive"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        searchKey="title"
        searchPlaceholder="Buscar por título..."
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Case</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este case? Esta ação não pode ser
              desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancelar
            </AlertDialogCancel>
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
