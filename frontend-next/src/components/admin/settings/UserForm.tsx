"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createUser, updateUser } from "@/lib/actions/user-actions";
import { createUserSchema, updateUserSchema, type CreateUserData, type UpdateUserData } from "@/lib/validations/user-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface UserFormProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string | null;
  };
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!user;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateUserData | UpdateUserData>({
    resolver: zodResolver(isEditing ? updateUserSchema : createUserSchema),
    defaultValues: isEditing
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role as "ADMIN" | "EDITOR" | "USER",
          image: user.image,
        }
      : {
          name: "",
          email: "",
          password: "",
          role: "USER",
          image: "",
        },
  });

  const role = watch("role");

  const onSubmit = async (data: CreateUserData | UpdateUserData) => {
    setIsSubmitting(true);

    try {
      const result = isEditing
        ? await updateUser(user.id, data as UpdateUserData)
        : await createUser(data as CreateUserData);

      if (result.success) {
        toast.success(
          isEditing
            ? "Usuário atualizado com sucesso!"
            : "Usuário criado com sucesso!"
        );
        router.push("/admin/settings/users");
        router.refresh();
      } else {
        toast.error(result.error || "Erro ao salvar usuário");
      }
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao salvar usuário"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
          <CardDescription>
            Preencha as informações do usuário
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Nome Completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="João Silva"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@exemplo.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Senha {!isEditing && <span className="text-destructive">*</span>}
            </Label>
            <Input
              id="password"
              type="password"
              placeholder={isEditing ? "Deixe em branco para não alterar" : "Mínimo 8 caracteres"}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
            {!isEditing && (
              <p className="text-xs text-muted-foreground">
                A senha deve conter letras maiúsculas, minúsculas e números
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">
              Nível de Acesso <span className="text-destructive">*</span>
            </Label>
            <Select
              value={role}
              onValueChange={(value) => setValue("role", value as "ADMIN" | "EDITOR" | "USER")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível de acesso" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">
                  <div>
                    <div className="font-medium">Administrador</div>
                    <div className="text-xs text-muted-foreground">
                      Acesso total ao sistema
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="EDITOR">
                  <div>
                    <div className="font-medium">Editor</div>
                    <div className="text-xs text-muted-foreground">
                      Pode criar e editar conteúdo
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="USER">
                  <div>
                    <div className="font-medium">Usuário</div>
                    <div className="text-xs text-muted-foreground">
                      Acesso apenas para visualização
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role.message}</p>
            )}
          </div>

          {/* Imagem */}
          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem de Perfil</Label>
            <Input
              id="image"
              type="url"
              placeholder="https://exemplo.com/imagem.jpg"
              {...register("image")}
            />
            {errors.image && (
              <p className="text-sm text-destructive">{errors.image.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Opcional: URL de uma imagem para o perfil do usuário
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : isEditing ? (
            "Atualizar"
          ) : (
            "Criar Usuário"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/settings/users")}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
