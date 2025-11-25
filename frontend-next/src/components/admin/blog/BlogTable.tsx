"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { MoreHorizontal, Edit, Trash2, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import { deleteBlogPost, togglePublishPost } from "@/lib/actions/blog-actions";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  readTime: string;
  createdAt: Date;
  publishedAt: Date | null;
  user: {
    name: string | null;
    email: string | null;
  };
}

interface BlogTableProps {
  data: BlogPost[];
}

export function BlogTable({ data }: BlogTableProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!postToDelete) return;

    setIsDeleting(true);
    const result = await deleteBlogPost(postToDelete);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Post deletado com sucesso!");
      router.refresh();
    }

    setIsDeleting(false);
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleTogglePublish = async (id: string) => {
    const result = await togglePublishPost(id);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(
        result.post?.status === "PUBLISHED"
          ? "Post publicado!"
          : "Post despublicado!"
      );
      router.refresh();
    }
  };

  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => (
        <div className="max-w-md">
          <div className="font-medium">{row.original.title}</div>
          <div className="text-sm text-muted-foreground">/{row.original.slug}</div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Categoria",
      cell: ({ row }) => (
        <Badge variant="outline">{row.original.category}</Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge
            variant={
              status === "PUBLISHED"
                ? "default"
                : status === "DRAFT"
                ? "secondary"
                : "destructive"
            }
          >
            {status === "PUBLISHED"
              ? "Publicado"
              : status === "DRAFT"
              ? "Rascunho"
              : "Arquivado"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "user.name",
      header: "Autor",
      cell: ({ row }) => row.original.user.name || row.original.user.email,
    },
    {
      accessorKey: "readTime",
      header: "Leitura",
    },
    {
      accessorKey: "createdAt",
      header: "Criado em",
      cell: ({ row }) =>
        format(new Date(row.original.createdAt), "dd/MM/yyyy", {
          locale: ptBR,
        }),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original;

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/admin/blog/${post.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    Visualizar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/admin/blog/${post.id}/edit`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleTogglePublish(post.id)}>
                  <FileText className="mr-2 h-4 w-4" />
                  {post.status === "PUBLISHED" ? "Despublicar" : "Publicar"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    setPostToDelete(post.id);
                    setDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog
              open={deleteDialogOpen && postToDelete === post.id}
              onOpenChange={setDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja deletar este post? Esta ação não pode
                    ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? "Deletando..." : "Deletar"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} searchKey="title" />;
}
