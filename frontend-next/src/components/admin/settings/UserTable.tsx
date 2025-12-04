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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { MoreHorizontal, Edit, Trash, Shield, User as UserIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { deleteUser, changeUserRole } from "@/lib/actions/user-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    blogPosts: number;
    caseStudies: number;
    services: number;
  };
}

interface UserTableProps {
  users: User[];
}

const roleColors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-800",
  EDITOR: "bg-blue-100 text-blue-800",
  USER: "bg-gray-100 text-gray-800",
};

const roleLabels: Record<string, string> = {
  ADMIN: "Administrador",
  EDITOR: "Editor",
  USER: "Usuário",
};

export function UserTable({ users }: UserTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const result = await deleteUser(deleteId);

    if (result.success) {
      toast.success("Usuário deletado com sucesso!");
      router.refresh();
    } else {
      toast.error(result.error || "Erro ao deletar usuário");
    }

    setIsDeleting(false);
    setDeleteId(null);
  };

  const handleChangeRole = async (id: string, newRole: "ADMIN" | "EDITOR" | "USER") => {
    const result = await changeUserRole(id, newRole);

    if (result.success) {
      toast.success(`Role alterado para ${roleLabels[newRole]}!`);
      router.refresh();
    } else {
      toast.error(result.error || "Erro ao alterar role");
    }
  };

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Usuário",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image || ""} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                <UserIcon className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <Link
                href={`/admin/settings/users/${user.id}`}
                className="font-medium hover:text-primary"
              >
                {user.name}
              </Link>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.original.role;
        return (
          <Badge variant="outline" className={roleColors[role]}>
            {roleLabels[role]}
          </Badge>
        );
      },
    },
    {
      id: "content",
      header: "Conteúdo",
      cell: ({ row }) => {
        const counts = row.original._count;
        const total = counts.blogPosts + counts.caseStudies + counts.services;

        return (
          <div className="text-sm">
            <span className="font-medium">{total}</span>
            <span className="text-muted-foreground ml-1">
              ({counts.blogPosts} posts, {counts.caseStudies} cases, {counts.services} serviços)
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Criado em",
      cell: ({ row }) => {
        return (
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(row.original.createdAt), {
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
        const user = row.original;

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
                <Link href={`/admin/settings/users/${user.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Shield className="w-4 h-4 mr-2" />
                  Alterar Role
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => handleChangeRole(user.id, "ADMIN")}
                    disabled={user.role === "ADMIN"}
                  >
                    Administrador
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleChangeRole(user.id, "EDITOR")}
                    disabled={user.role === "EDITOR"}
                  >
                    Editor
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleChangeRole(user.id, "USER")}
                    disabled={user.role === "USER"}
                  >
                    Usuário
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteId(user.id)}
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
      <DataTable
        columns={columns}
        data={users}
        searchKey="name"
        searchPlaceholder="Buscar por nome ou email..."
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este usuário? Todo o conteúdo criado
              por ele será deletado permanentemente. Esta ação não pode ser
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
