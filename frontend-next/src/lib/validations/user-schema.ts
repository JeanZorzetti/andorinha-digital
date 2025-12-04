import { z } from "zod";

export const userSchema = z.object({
  name: z.string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),

  email: z.string()
    .email("Email inválido")
    .toLowerCase(),

  password: z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "A senha deve conter letras maiúsculas, minúsculas e números"
    )
    .optional(),

  role: z.enum(["ADMIN", "EDITOR", "USER"], {
    message: "Selecione um role",
  }),

  image: z.string().url("URL inválida").optional().nullable(),
});

export type UserFormData = z.infer<typeof userSchema>;

// Schema para criação (password obrigatório)
export const createUserSchema = userSchema.extend({
  password: z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "A senha deve conter letras maiúsculas, minúsculas e números"
    ),
});

export type CreateUserData = z.infer<typeof createUserSchema>;

// Schema para atualização (todos campos opcionais exceto ID)
export const updateUserSchema = userSchema.partial().extend({
  id: z.string().cuid(),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;

// Schema para mudança de senha
export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Senha atual é obrigatória"),
  newPassword: z.string()
    .min(8, "A nova senha deve ter no mínimo 8 caracteres")
    .max(100, "A nova senha deve ter no máximo 100 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "A senha deve conter letras maiúsculas, minúsculas e números"
    ),
  confirmPassword: z.string().min(1, "Confirme a nova senha"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
