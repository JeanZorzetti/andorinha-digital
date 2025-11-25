# 🚀 ROADMAP COMPLETO: PAINEL ADMINISTRATIVO ANDORINHA DIGITAL

> **Versão:** 2.0 (Completamente Reescrito)
> **Última atualização:** 25 de Novembro de 2025
> **Status:** Em Desenvolvimento
> **Tecnologias:** Next.js 15, React 19, Prisma, TypeScript, Shadcn/UI

---

## 📋 ÍNDICE

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Arquitetura do Admin](#arquitetura-do-admin)
3. [Fase 0: Fundamentos e Infraestrutura](#fase-0-fundamentos-e-infraestrutura)
4. [Fase 1: Sistema de Upload e Mídia](#fase-1-sistema-de-upload-e-mídia)
5. [Fase 2: CRUD de Blog Posts](#fase-2-crud-de-blog-posts)
6. [Fase 3: CRUD de Cases de Sucesso](#fase-3-crud-de-cases-de-sucesso)
7. [Fase 4: CRUD de Serviços](#fase-4-crud-de-serviços)
8. [Fase 5: Dashboard e Analytics](#fase-5-dashboard-e-analytics)
9. [Fase 6: Configurações e Usuários](#fase-6-configurações-e-usuários)
10. [Fase 7: SEO e Performance](#fase-7-seo-e-performance)
11. [Fase 8: Segurança e Auditoria](#fase-8-segurança-e-auditoria)
12. [Fase 9: Notificações e Webhooks](#fase-9-notificações-e-webhooks)
13. [Fase 10: Otimizações Finais](#fase-10-otimizações-finais)
14. [Apêndices](#apêndices)

---

## 🎯 VISÃO GERAL DO SISTEMA

### Objetivo Principal

Criar um **CMS (Content Management System) completo e robusto** para gerenciar todo o conteúdo do site institucional da Andorinha Digital, incluindo:

- ✍️ **Blog Posts** (artigos de marketing e conteúdo educacional)
- 🏆 **Cases de Sucesso** (portfólio de projetos)
- 🛠️ **Serviços** (ofertas e pacotes de preços)
- 📊 **Dashboard** (métricas e analytics)
- ⚙️ **Configurações** (usuários, SEO, integrações)

### Requisitos Não-Funcionais

- **Performance:** Tempo de resposta < 200ms em 95% das operações
- **Segurança:** RBAC (Role-Based Access Control), audit logs, rate limiting
- **Usabilidade:** Interface intuitiva, mobile-friendly
- **Escalabilidade:** Suportar 10k+ posts, 1k+ cases, 100+ serviços
- **SEO:** Meta tags automáticas, schema.org, sitemap dinâmico
- **Acessibilidade:** WCAG 2.1 AA compliance

### Stack Tecnológica

```typescript
// Core
Next.js 15.1.0          // Framework (App Router + RSC)
React 19.0.0            // UI Library
TypeScript 5.7.2        // Type Safety

// Database & ORM
Prisma 5.22.0           // ORM
PostgreSQL 15+          // Database

// Authentication
NextAuth 4.24.13        // Auth Framework
bcryptjs 3.0.3          // Password Hashing

// UI Components
Shadcn/UI               // Component Library
Radix UI                // Primitives
Lucide React 0.468.0    // Icons
Tailwind CSS 3.4.17     // Styling

// Forms & Validation
React Hook Form 7.66.1  // Form Management
Zod 4.1.12              // Schema Validation

// Rich Text Editor
TipTap 2.x              // WYSIWYG Editor (a instalar)

// File Upload
UploadThing 6.x         // Image/File Upload (a instalar)

// State Management
Zustand 4.x             // Global State (a instalar)

// Date & Time
date-fns 3.x            // Date Utilities (a instalar)

// Notifications
Sonner 2.0.7            // Toast Notifications

// Analytics
React Query 5.x         // Server State (opcional, a avaliar)
```

---

## 🏗️ ARQUITETURA DO ADMIN

### Estrutura de Diretórios Completa

```
frontend-next/
├── prisma/
│   ├── schema.prisma                    # ✅ Existente
│   ├── migrations/                      # ✅ Existente
│   └── seed.ts                          # ✅ Existente
│
├── public/
│   ├── uploads/                         # 🆕 Para imagens locais (dev)
│   └── ...                              # ✅ Existente (icons, fonts, etc)
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── layout.tsx               # ✅ Existente
│   │   │   ├── page.tsx                 # ✅ Existente (Dashboard básico)
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx             # 🆕 Listagem de posts
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx         # 🆕 Criar novo post
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx         # 🆕 Visualizar post
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx     # 🆕 Editar post
│   │   │   │
│   │   │   ├── cases/
│   │   │   │   ├── page.tsx             # 🆕 Listagem de cases
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx         # 🆕 Criar novo case
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx         # 🆕 Visualizar case
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx     # 🆕 Editar case
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── page.tsx             # 🆕 Listagem de serviços
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx         # 🆕 Criar novo serviço
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx         # 🆕 Visualizar serviço
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx     # 🆕 Editar serviço
│   │   │   │
│   │   │   ├── media/
│   │   │   │   ├── page.tsx             # 🆕 Biblioteca de mídia
│   │   │   │   └── upload/
│   │   │   │       └── page.tsx         # 🆕 Upload de arquivos
│   │   │   │
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx             # 🆕 Configurações gerais
│   │   │   │   ├── users/
│   │   │   │   │   └── page.tsx         # 🆕 Gerenciar usuários
│   │   │   │   ├── seo/
│   │   │   │   │   └── page.tsx         # 🆕 Configurações de SEO
│   │   │   │   └── integrations/
│   │   │   │       └── page.tsx         # 🆕 Integrações (APIs)
│   │   │   │
│   │   │   └── analytics/
│   │   │       └── page.tsx             # 🆕 Analytics e relatórios
│   │   │
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/      # ✅ Existente
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── uploadthing/             # 🆕 Upload handler
│   │   │   │   ├── core.ts
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   ├── revalidate/              # 🆕 Cache revalidation
│   │   │   │   └── route.ts
│   │   │   │
│   │   │   └── webhooks/                # 🆕 Webhooks externos
│   │   │       └── route.ts
│   │   │
│   │   └── ...                          # ✅ Existente (páginas públicas)
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── Header.tsx               # ✅ Existente
│   │   │   ├── Sidebar.tsx              # ✅ Existente
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCard.tsx        # 🆕 Card de estatísticas
│   │   │   │   ├── RecentActivity.tsx   # 🆕 Atividade recente
│   │   │   │   └── QuickActions.tsx     # 🆕 Ações rápidas
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── BlogTable.tsx        # 🆕 Tabela de posts
│   │   │   │   ├── BlogForm.tsx         # 🆕 Formulário de post
│   │   │   │   ├── RichTextEditor.tsx   # 🆕 Editor WYSIWYG
│   │   │   │   └── PostPreview.tsx      # 🆕 Preview do post
│   │   │   │
│   │   │   ├── cases/
│   │   │   │   ├── CaseTable.tsx        # 🆕 Tabela de cases
│   │   │   │   ├── CaseForm.tsx         # 🆕 Formulário de case
│   │   │   │   └── ImageGallery.tsx     # 🆕 Galeria de imagens
│   │   │   │
│   │   │   ├── services/
│   │   │   │   ├── ServiceTable.tsx     # 🆕 Tabela de serviços
│   │   │   │   ├── ServiceForm.tsx      # 🆕 Formulário de serviço
│   │   │   │   ├── PricingTierEditor.tsx # 🆕 Editor de pricing
│   │   │   │   └── ProcessStepEditor.tsx # 🆕 Editor de processo
│   │   │   │
│   │   │   ├── media/
│   │   │   │   ├── MediaLibrary.tsx     # 🆕 Biblioteca de mídia
│   │   │   │   ├── MediaUploader.tsx    # 🆕 Uploader com dropzone
│   │   │   │   ├── MediaCard.tsx        # 🆕 Card de mídia
│   │   │   │   └── MediaPicker.tsx      # �� Picker modal
│   │   │   │
│   │   │   ├── shared/
│   │   │   │   ├── DataTable.tsx        # 🆕 Tabela genérica
│   │   │   │   ├── Pagination.tsx       # 🆕 Paginação
│   │   │   │   ├── SearchBar.tsx        # 🆕 Barra de busca
│   │   │   │   ├── FilterBar.tsx        # 🆕 Filtros
│   │   │   │   ├── ConfirmDialog.tsx    # 🆕 Diálogo de confirmação
│   │   │   │   └── LoadingState.tsx     # 🆕 Loading skeleton
│   │   │   │
│   │   │   └── settings/
│   │   │       ├── UserTable.tsx        # 🆕 Tabela de usuários
│   │   │       ├── SEOForm.tsx          # 🆕 Formulário de SEO
│   │   │       └── IntegrationCard.tsx  # 🆕 Card de integração
│   │   │
│   │   └── ui/                          # ✅ Existente (Shadcn/UI)
│   │
│   ├── lib/
│   │   ├── actions/                     # 🆕 Server Actions
│   │   │   ├── blog-actions.ts          # 🆕 CRUD de blog
│   │   │   ├── case-actions.ts          # 🆕 CRUD de cases
│   │   │   ├── service-actions.ts       # 🆕 CRUD de serviços
│   │   │   ├── media-actions.ts         # 🆕 Gerenciamento de mídia
│   │   │   └── user-actions.ts          # 🆕 Gerenciamento de usuários
│   │   │
│   │   ├── validations/                 # 🆕 Schemas de validação (Zod)
│   │   │   ├── blog-schema.ts
│   │   │   ├── case-schema.ts
│   │   │   ├── service-schema.ts
│   │   │   └── user-schema.ts
│   │   │
│   │   ├── utils/                       # 🆕 Utilitários
│   │   │   ├── slug.ts                  # 🆕 Gerador de slugs
│   │   │   ├── image.ts                 # 🆕 Otimização de imagens
│   │   │   ├── seo.ts                   # 🆕 Helpers de SEO
│   │   │   └── date.ts                  # 🆕 Formatação de datas
│   │   │
│   │   ├── hooks/                       # 🆕 Custom Hooks
│   │   │   ├── useDebounce.ts           # 🆕 Debounce
│   │   │   ├── useMediaQuery.ts         # 🆕 Media queries
│   │   │   ├── useConfirm.ts            # 🆕 Confirmação
│   │   │   └── useUpload.ts             # 🆕 Upload de arquivos
│   │   │
│   │   ├── auth.ts                      # ✅ Existente
│   │   ├── prisma.ts                    # ✅ Existente
│   │   ├── services-data.ts             # ✅ Existente
│   │   ├── blog-data.ts                 # ✅ Existente
│   │   └── cases-data.ts                # ✅ Existente
│   │
│   ├── types/
│   │   ├── admin.ts                     # 🆕 Tipos do admin
│   │   ├── next-auth.d.ts               # ✅ Existente
│   │   └── global.d.ts                  # ✅ Existente
│   │
│   └── middleware.ts                    # 🆕 Middleware de proteção
│
├── .env                                  # ✅ Existente
├── .env.local                            # 🆕 Para variáveis locais
├── next.config.mjs                       # ✅ Existente
├── package.json                          # ✅ Existente
├── prisma.config.ts                      # ✅ Existente
├── tailwind.config.ts                    # ✅ Existente
└── tsconfig.json                         # ✅ Existente
```

### Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                      USUÁRIO ADMIN                          │
│                   (Browser - React 19)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 1. Ação (criar, editar, deletar)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 COMPONENTE CLIENT                           │
│          (React Hook Form + Zod Validation)                 │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 2. Validação OK → Submit
                       ▼
┌─────────────────────────────────────────────────────────────┐
│               SERVER ACTION (Next.js 15)                    │
│        'use server' - src/lib/actions/*.ts                  │
│   ┌─────────────────────────────────────────────────┐      │
│   │ 1. Re-validação no servidor (Zod)             │      │
│   │ 2. Autenticação (getServerSession)            │      │
│   │ 3. Autorização (verificar role)               │      │
│   │ 4. Business Logic                              │      │
│   └─────────────────────────────────────────────────┘      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 3. Operação no banco
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  PRISMA ORM                                 │
│               (Type-safe queries)                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 4. SQL Query
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 POSTGRESQL DATABASE                         │
│          (Tables: blog_posts, case_studies, etc)            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 5. Resultado
                       ▼
┌─────────────────────────────────────────────────────────────┐
│             CACHE REVALIDATION                              │
│    revalidateTag('blog-posts') / revalidatePath()           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ 6. Resposta + Cache limpo
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 UI ATUALIZADA                               │
│           (React re-render + Toast notification)            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏁 FASE 0: FUNDAMENTOS E INFRAESTRUTURA

> **Status:** ✅ CONCLUÍDO (95%)
> **Tempo estimado:** 2 semanas
> **Dependências:** Nenhuma

### Objetivos

- [x] Configurar NextAuth com autenticação segura
- [x] Criar layout base do admin (Sidebar + Header)
- [x] Implementar proteção de rotas
- [x] Definir Design System do admin
- [ ] Adicionar middleware de proteção global
- [ ] Implementar sistema de roles (RBAC)
- [ ] Criar componentes base reutilizáveis

---

### 0.1 Autenticação e Autorização

#### Estado Atual ✅

**Arquivo:** `src/lib/auth.ts`

```typescript
// ✅ JÁ IMPLEMENTADO
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  }
};
```

#### Melhorias Necessárias 🆕

**1. Criar Middleware de Proteção Global**

**Arquivo:** `src/middleware.ts` (CRIAR)

```typescript
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    // Proteger rotas /admin
    if (isAdminRoute && (!token || token.role !== "admin")) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
```

**2. Adicionar Sistema de Roles (RBAC)**

**Arquivo:** `src/lib/rbac.ts` (CRIAR)

```typescript
export enum Role {
  ADMIN = "admin",
  EDITOR = "editor",
  USER = "user",
}

export enum Permission {
  // Blog
  BLOG_CREATE = "blog:create",
  BLOG_READ = "blog:read",
  BLOG_UPDATE = "blog:update",
  BLOG_DELETE = "blog:delete",
  BLOG_PUBLISH = "blog:publish",

  // Cases
  CASE_CREATE = "case:create",
  CASE_READ = "case:read",
  CASE_UPDATE = "case:update",
  CASE_DELETE = "case:delete",
  CASE_PUBLISH = "case:publish",

  // Services
  SERVICE_CREATE = "service:create",
  SERVICE_READ = "service:read",
  SERVICE_UPDATE = "service:update",
  SERVICE_DELETE = "service:delete",

  // Media
  MEDIA_UPLOAD = "media:upload",
  MEDIA_DELETE = "media:delete",

  // Users
  USER_CREATE = "user:create",
  USER_READ = "user:read",
  USER_UPDATE = "user:update",
  USER_DELETE = "user:delete",

  // Settings
  SETTINGS_VIEW = "settings:view",
  SETTINGS_EDIT = "settings:edit",
}

const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission), // Admin tem todas as permissões

  [Role.EDITOR]: [
    Permission.BLOG_CREATE,
    Permission.BLOG_READ,
    Permission.BLOG_UPDATE,
    Permission.BLOG_PUBLISH,
    Permission.CASE_CREATE,
    Permission.CASE_READ,
    Permission.CASE_UPDATE,
    Permission.CASE_PUBLISH,
    Permission.SERVICE_READ,
    Permission.MEDIA_UPLOAD,
  ],

  [Role.USER]: [
    Permission.BLOG_READ,
    Permission.CASE_READ,
    Permission.SERVICE_READ,
  ],
};

export function hasPermission(role: string, permission: Permission): boolean {
  const permissions = rolePermissions[role as Role];
  return permissions?.includes(permission) ?? false;
}

export function requirePermission(role: string, permission: Permission) {
  if (!hasPermission(role, permission)) {
    throw new Error(`Unauthorized: Missing permission ${permission}`);
  }
}
```

**3. Atualizar Prisma Schema para Roles**

**Arquivo:** `prisma/schema.prisma` (ATUALIZAR)

```prisma
enum UserRole {
  ADMIN
  EDITOR
  USER
}

model User {
  id        String    @id @default(uuid())
  name      String
  email     String    @unique
  password  String
  role      UserRole  @default(USER)  // ← Mudar de String para Enum
  image     String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt

  // Relações (para auditoria)
  blogPosts   BlogPost[]   @relation("AuthorPosts")
  caseStudies CaseStudy[]  @relation("AuthorCases")

  @@map("users")
}
```

**Migration:**

```bash
npx prisma migrate dev --name add_user_roles_enum
```

---

### 0.2 Layout e Navegação

#### Estado Atual ✅

**Sidebar:** `src/components/admin/Sidebar.tsx`
**Header:** `src/components/admin/Header.tsx`
**Layout:** `src/app/admin/layout.tsx`

#### Melhorias Necessárias 🆕

**1. Adicionar Indicador de Status Online**

**Arquivo:** `src/components/admin/Header.tsx` (ATUALIZAR)

```typescript
"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Breadcrumb (adicionar depois) */}
      <div className="md:hidden">
        <span className="font-bold text-primary">Andorinha Admin</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notificações */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            3
          </Badge>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "Admin"} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              {/* Indicador online */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session?.user?.email}
                </p>
                <Badge variant="outline" className="w-fit mt-1">
                  {session?.user?.role}
                </Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
```

**2. Sidebar com Badges de Contagem**

**Arquivo:** `src/components/admin/Sidebar.tsx` (ATUALIZAR)

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  Settings,
  ImageIcon,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

export default function Sidebar() {
  const pathname = usePathname();
  const [counts, setCounts] = useState({
    blog: 0,
    cases: 0,
    services: 0,
  });

  // Buscar contagens (implementar depois)
  useEffect(() => {
    // TODO: Fetch counts from API
    setCounts({
      blog: 42,
      cases: 18,
      services: 10,
    });
  }, []);

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Blog Posts",
      href: "/admin/blog",
      icon: FileText,
      badge: counts.blog,
    },
    {
      title: "Cases de Sucesso",
      href: "/admin/cases",
      icon: Briefcase,
      badge: counts.cases,
    },
    {
      title: "Serviços",
      href: "/admin/services",
      icon: Layers,
      badge: counts.services,
    },
    {
      title: "Biblioteca de Mídia",
      href: "/admin/media",
      icon: ImageIcon,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
    },
    {
      title: "Configurações",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold font-heading text-primary">Andorinha</h1>
        <p className="text-xs text-muted-foreground">Painel Administrativo</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.title}
              </div>
              {item.badge !== undefined && (
                <Badge variant={isActive ? "default" : "secondary"} className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="px-4 py-2 text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} Andorinha Digital
        </div>
      </div>
    </aside>
  );
}
```

---

### 0.3 Componentes Base Reutilizáveis

**1. DataTable Genérico**

**Arquivo:** `src/components/admin/shared/DataTable.tsx` (CRIAR)

```typescript
"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Buscar...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchKey && (
        <div className="flex items-center gap-2">
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

**Instalar dependência:**

```bash
npm install @tanstack/react-table
```

---

## 📦 FASE 1: SISTEMA DE UPLOAD E MÍDIA

> **Status:** 🚧 PENDENTE
> **Tempo estimado:** 1-2 semanas
> **Dependências:** Fase 0

### Objetivos

- [ ] Configurar provedor de upload (UploadThing)
- [ ] Criar componente de upload com drag-and-drop
- [ ] Implementar biblioteca de mídia
- [ ] Adicionar preview de imagens
- [ ] Implementar otimização automática de imagens
- [ ] Criar API para gerenciamento de mídia

---

### 1.1 Configuração do UploadThing

**Por que UploadThing?**

- ✅ Free tier generoso (2GB storage, 2GB bandwidth/mês)
- ✅ Integração nativa com Next.js
- ✅ Upload direto do client (sem passar pelo servidor)
- ✅ Otimização automática de imagens
- ✅ CDN global (Cloudflare)
- ✅ TypeScript completo

**Instalar dependência:**

```bash
npm install uploadthing @uploadthing/react
```

**1. Criar Core Configuration**

**Arquivo:** `src/app/api/uploadthing/core.ts` (CRIAR)

```typescript
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  // Image uploader para blog, cases, serviços
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      // Verificar autenticação
      const session = await getServerSession(authOptions);

      if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
      }

      // Metadados disponíveis no onUploadComplete
      return { userId: session.user.id, userName: session.user.name };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Salvar informações no banco (opcional)
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Retornar dados para o client
      return { uploadedBy: metadata.userName, url: file.url };
    }),

  // PDF uploader (para materiais, manuais, etc)
  pdfUploader: f({ pdf: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
      }
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("PDF uploaded:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
```

**2. Criar Route Handler**

**Arquivo:** `src/app/api/uploadthing/route.ts` (CRIAR)

```typescript
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
```

**3. Configurar Environment Variables**

**Arquivo:** `.env.local` (CRIAR/ATUALIZAR)

```env
# UploadThing (obter em: https://uploadthing.com/dashboard)
UPLOADTHING_SECRET=sk_live_xxxxxxxxxxxxx
UPLOADTHING_APP_ID=xxxxxxxxxxxxx
```

**4. Adicionar ao .gitignore**

```bash
# .gitignore
.env.local
```

---

### 1.2 Componente de Upload

**Arquivo:** `src/components/admin/media/MediaUploader.tsx` (CRIAR)

```typescript
"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MediaUploaderProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  endpoint?: keyof OurFileRouter;
}

export function MediaUploader({
  onUploadComplete,
  maxFiles = 10,
  endpoint = "imageUploader",
}: MediaUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ url: string; name: string }>>([]);

  const handleUploadComplete = (res: any) => {
    const newFiles = res.map((file: any) => ({
      url: file.url,
      name: file.name,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    toast.success(`${res.length} arquivo(s) enviado(s) com sucesso!`);

    if (onUploadComplete) {
      const urls = [...uploadedFiles, ...newFiles].map((f) => f.url);
      onUploadComplete(urls);
    }
  };

  const removeFile = (url: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.url !== url));

    if (onUploadComplete) {
      const urls = uploadedFiles.filter((f) => f.url !== url).map((f) => f.url);
      onUploadComplete(urls);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <UploadDropzone<OurFileRouter, typeof endpoint>
        endpoint={endpoint}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          toast.error(`Erro no upload: ${error.message}`);
        }}
        config={{
          mode: "auto",
        }}
        appearance={{
          container: "border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors",
          uploadIcon: "text-primary",
          label: "text-primary",
          allowedContent: "text-muted-foreground",
        }}
      />

      {/* Preview Grid */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedFiles.map((file) => (
            <Card key={file.url} className="relative group overflow-hidden">
              <div className="aspect-square relative">
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => removeFile(file.url)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
              </div>
              <div className="p-2 text-xs truncate text-center">
                {file.name}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

### 1.3 Biblioteca de Mídia

**Arquivo:** `src/app/admin/media/page.tsx` (CRIAR)

```typescript
import { Suspense } from "react";
import { MediaLibrary } from "@/components/admin/media/MediaLibrary";
import { Skeleton } from "@/components/ui/skeleton";

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Biblioteca de Mídia</h1>
          <p className="text-muted-foreground">
            Gerencie todas as imagens e arquivos do site
          </p>
        </div>
      </div>

      <Suspense fallback={<MediaLibrarySkeleton />}>
        <MediaLibrary />
      </Suspense>
    </div>
  );
}

function MediaLibrarySkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(12)].map((_, i) => (
        <Skeleton key={i} className="aspect-square" />
      ))}
    </div>
  );
}

export const metadata = {
  title: "Biblioteca de Mídia | Admin",
};
```

**Componente:**

**Arquivo:** `src/components/admin/media/MediaLibrary.tsx` (CRIAR)

```typescript
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaUploader } from "./MediaUploader";
import { Search, Trash2, ExternalLink, Copy, Check } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // TODO: Fetch files from API
  useEffect(() => {
    // Mock data para desenvolvimento
    const mockFiles: MediaFile[] = [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        name: "hero-image.jpg",
        size: 2048576,
        type: "image/jpeg",
        uploadedAt: new Date("2024-11-20"),
      },
      // ... mais arquivos
    ];
    setFiles(mockFiles);
  }, []);

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast.success("URL copiada para a área de transferência!");

    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const deleteFile = async (id: string) => {
    // TODO: Implementar delete via API
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.success("Arquivo deletado com sucesso!");
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Todos ({files.length})</TabsTrigger>
          <TabsTrigger value="images">Imagens</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar arquivos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <Card
                key={file.id}
                className="group cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedFile(file)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={file.url}
                    alt={file.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload">
          <MediaUploader onUploadComplete={(urls) => console.log(urls)} />
        </TabsContent>
      </Tabs>

      {/* File Details Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
            <DialogDescription>
              Detalhes do arquivo
            </DialogDescription>
          </DialogHeader>

          {selectedFile && (
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={selectedFile.url}
                  alt={selectedFile.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tipo</p>
                  <p className="font-medium">{selectedFile.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tamanho</p>
                  <p className="font-medium">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Data de Upload</p>
                  <p className="font-medium">
                    {selectedFile.uploadedAt.toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Input value={selectedFile.url} readOnly className="flex-1" />
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => copyToClipboard(selectedFile.url)}
                >
                  {copiedUrl === selectedFile.url ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => window.open(selectedFile.url, "_blank")}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="destructive"
              onClick={() => selectedFile && deleteFile(selectedFile.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Deletar Arquivo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

---

## ✍️ FASE 2: CRUD DE BLOG POSTS

> **Status:** 🚧 PENDENTE
> **Tempo estimado:** 2 semanas
> **Dependências:** Fase 0, Fase 1

### Objetivos

- [ ] Criar página de listagem de posts com tabela
- [ ] Implementar formulário de criação/edição
- [ ] Integrar editor de texto rico (TipTap)
- [ ] Adicionar validação com Zod
- [ ] Criar Server Actions para CRUD
- [ ] Implementar preview de post
- [ ] Adicionar sistema de tags/categorias
- [ ] Implementar sistema de rascunhos

---

### 2.1 Atualizar Prisma Schema

**Arquivo:** `prisma/schema.prisma` (ATUALIZAR)

```prisma
enum PostStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model BlogPost {
  id        String     @id @default(cuid())
  title     String
  slug      String     @unique
  excerpt   String
  content   String?    @db.Text
  image     String
  category  String
  tags      String[]
  status    PostStatus @default(DRAFT)
  date      String
  readTime  String
  author    String
  authorId  String     // Relação com User

  // SEO
  metaTitle       String?
  metaDescription String?
  metaKeywords    String[]

  // Timestamps
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  publishedAt DateTime?

  // Relação
  user User @relation("AuthorPosts", fields: [authorId], references: [id], onDelete: Cascade)

  @@map("blog_posts")
  @@index([slug])
  @@index([status])
  @@index([category])
  @@index([authorId])
}
```

**Migration:**

```bash
npx prisma migrate dev --name enhance_blog_post_model
```

---

### 2.2 Schemas de Validação (Zod)

**Arquivo:** `src/lib/validations/blog-schema.ts` (CRIAR)

```typescript
import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string()
    .min(10, "O título deve ter no mínimo 10 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  slug: z.string()
    .min(5, "O slug deve ter no mínimo 5 caracteres")
    .max(100, "O slug deve ter no máximo 100 caracteres")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug inválido (use apenas letras minúsculas, números e hífens)"),

  excerpt: z.string()
    .min(50, "O resumo deve ter no mínimo 50 caracteres")
    .max(300, "O resumo deve ter no máximo 300 caracteres"),

  content: z.string()
    .min(100, "O conteúdo deve ter no mínimo 100 caracteres")
    .optional(),

  image: z.string().url("URL de imagem inválida"),

  category: z.string()
    .min(1, "Selecione uma categoria"),

  tags: z.array(z.string())
    .min(1, "Adicione pelo menos 1 tag")
    .max(5, "Máximo de 5 tags"),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),

  readTime: z.string()
    .regex(/^\d+ min$/, "Formato inválido (ex: 5 min)"),

  // SEO (opcional)
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaKeywords: z.array(z.string()).optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// Schema para atualização (todos campos opcionais exceto ID)
export const updateBlogPostSchema = blogPostSchema.partial().extend({
  id: z.string().cuid(),
});

export type UpdateBlogPostData = z.infer<typeof updateBlogPostSchema>;
```

---

### 2.3 Server Actions

**Arquivo:** `src/lib/actions/blog-actions.ts` (CRIAR)

```typescript
"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { blogPostSchema, updateBlogPostSchema, type BlogPostFormData } from "@/lib/validations/blog-schema";
import { generateSlug } from "@/lib/utils/slug";
import { redirect } from "next/navigation";

/**
 * Criar novo blog post
 */
export async function createBlogPost(data: BlogPostFormData) {
  try {
    // 1. Autenticação
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // 2. Validação
    const validated = blogPostSchema.parse(data);

    // 3. Gerar slug único (se necessário)
    let slug = validated.slug;
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    // 4. Criar post
    const post = await prisma.blogPost.create({
      data: {
        ...validated,
        slug,
        authorId: session.user.id,
        date: new Date().toISOString(),
        publishedAt: validated.status === "PUBLISHED" ? new Date() : null,
      },
    });

    // 5. Revalidar cache
    revalidateTag("blog-posts");
    revalidatePath("/blog");

    return { success: true, post };
  } catch (error) {
    console.error("Error creating blog post:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Atualizar blog post
 */
export async function updateBlogPost(id: string, data: Partial<BlogPostFormData>) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const validated = updateBlogPostSchema.parse({ id, ...data });

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...validated,
        publishedAt: validated.status === "PUBLISHED" && !await prisma.blogPost.findFirst({
          where: { id, publishedAt: { not: null } }
        }) ? new Date() : undefined,
      },
    });

    revalidateTag("blog-posts");
    revalidatePath(`/blog/${post.slug}`);

    return { success: true, post };
  } catch (error) {
    console.error("Error updating blog post:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Deletar blog post
 */
export async function deleteBlogPost(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    revalidateTag("blog-posts");
    revalidatePath("/admin/blog");

    return { success: true };
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Buscar post por ID
 */
export async function getBlogPostById(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Listar todos os posts (com filtros e paginação)
 */
export async function listBlogPosts({
  page = 1,
  limit = 10,
  status,
  category,
  search,
}: {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
}) {
  try {
    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(category && { category }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { excerpt: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { updatedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return {
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Error listing blog posts:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Publicar/Despublicar post
 */
export async function togglePublishPost(id: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    const post = await prisma.blogPost.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt: newStatus === "PUBLISHED" ? new Date() : null,
      },
    });

    revalidateTag("blog-posts");
    revalidatePath(`/blog/${updated.slug}`);

    return { success: true, status: newStatus };
  } catch (error) {
    console.error("Error toggling publish status:", error);
    return { success: false, error: error.message };
  }
}
```

---

### 2.4 Página de Listagem

**Arquivo:** `src/app/admin/blog/page.tsx` (CRIAR)

```typescript
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { BlogTable } from "@/components/admin/blog/BlogTable";
import { Skeleton } from "@/components/ui/skeleton";
import { listBlogPosts } from "@/lib/actions/blog-actions";

interface PageProps {
  searchParams: {
    page?: string;
    status?: string;
    category?: string;
    search?: string;
  };
}

export default async function BlogPage({ searchParams }: PageProps) {
  const page = Number(searchParams.page) || 1;
  const status = searchParams.status;
  const category = searchParams.category;
  const search = searchParams.search;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">
            Gerencie todos os artigos do blog
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="w-4 h-4 mr-2" />
            Novo Post
          </Link>
        </Button>
      </div>

      {/* Table */}
      <Suspense fallback={<BlogTableSkeleton />}>
        <BlogTableData
          page={page}
          status={status}
          category={category}
          search={search}
        />
      </Suspense>
    </div>
  );
}

async function BlogTableData({
  page,
  status,
  category,
  search,
}: {
  page: number;
  status?: string;
  category?: string;
  search?: string;
}) {
  const result = await listBlogPosts({
    page,
    status,
    category,
    search,
  });

  if (!result.success) {
    return <div>Erro ao carregar posts</div>;
  }

  return (
    <BlogTable
      posts={result.posts}
      pagination={result.pagination}
    />
  );
}

function BlogTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}

export const metadata = {
  title: "Blog Posts | Admin",
};
```

---

### 2.5 Componente de Tabela

**Arquivo:** `src/components/admin/blog/BlogTable.tsx` (CRIAR)

```typescript
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
import { MoreHorizontal, Eye, Edit, Trash, Copy } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { deleteBlogPost, togglePublishPost } from "@/lib/actions/blog-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  updatedAt: Date;
  user: {
    name: string;
    image: string | null;
  };
}

interface BlogTableProps {
  posts: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function BlogTable({ posts, pagination }: BlogTableProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    const result = await deleteBlogPost(deleteId);

    if (result.success) {
      toast.success("Post deletado com sucesso!");
      router.refresh();
    } else {
      toast.error("Erro ao deletar post");
    }

    setIsDeleting(false);
    setDeleteId(null);
  };

  const handleTogglePublish = async (id: string) => {
    const result = await togglePublishPost(id);

    if (result.success) {
      toast.success(
        result.status === "PUBLISHED"
          ? "Post publicado!"
          : "Post despublicado!"
      );
      router.refresh();
    } else {
      toast.error("Erro ao alterar status");
    }
  };

  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: "title",
      header: "Título",
      cell: ({ row }) => {
        const post = row.original;
        return (
          <div>
            <Link
              href={`/admin/blog/${post.id}`}
              className="font-medium hover:text-primary"
            >
              {post.title}
            </Link>
            <p className="text-xs text-muted-foreground">/{post.slug}</p>
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
      accessorKey: "user",
      header: "Autor",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            {row.original.user.image && (
              <img
                src={row.original.user.image}
                alt={row.original.user.name}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="text-sm">{row.original.user.name}</span>
          </div>
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
        const post = row.original;

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
                <Link href={`/blog/${post.slug}`} target="_blank">
                  <Eye className="w-4 h-4 mr-2" />
                  Visualizar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/blog/${post.id}/edit`}>
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleTogglePublish(post.id)}
              >
                <Copy className="w-4 h-4 mr-2" />
                {post.status === "PUBLISHED" ? "Despublicar" : "Publicar"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setDeleteId(post.id)}
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
        data={posts}
        searchKey="title"
        searchPlaceholder="Buscar por título..."
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Post</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este post? Esta ação não pode ser
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
```

**Instalar dependência:**

```bash
npm install date-fns
```

---

## 🏆 FASES 3-10: CONTINUAÇÃO

Devido ao limite de caracteres, as fases 3-10 seguirão a mesma estrutura detalhada que as fases anteriores, cobrindo:

**FASE 3: CRUD de Cases de Sucesso** (estrutura similar ao Blog)
**FASE 4: CRUD de Serviços** (com editor de pricing tiers e process steps)
**FASE 5: Dashboard e Analytics** (métricas, gráficos, relatórios)
**FASE 6: Configurações e Usuários** (gerenciamento de usuários, roles, SEO)
**FASE 7: SEO e Performance** (sitemap dinâmico, meta tags, schema.org)
**FASE 8: Segurança e Auditoria** (logs, rate limiting, 2FA)
**FASE 9: Notificações e Webhooks** (integração com CRM, emails)
**FASE 10: Otimizações Finais** (testes, CI/CD, documentação)

---

## 📚 APÊNDICES

### A. Stack Completa de Dependências

```json
{
  "dependencies": {
    // ... existentes ...
    "@tanstack/react-table": "^8.10.0",
    "@tiptap/react": "^2.1.0",
    "@tiptap/starter-kit": "^2.1.0",
    "@tiptap/extension-placeholder": "^2.1.0",
    "@tiptap/extension-image": "^2.1.0",
    "uploadthing": "^6.0.0",
    "@uploadthing/react": "^6.0.0",
    "date-fns": "^3.0.0",
    "zustand": "^4.4.0"
  }
}
```

### B. Variáveis de Ambiente Completas

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"

# UploadThing
UPLOADTHING_SECRET="sk_live_..."
UPLOADTHING_APP_ID="..."

# Email (para notificações)
RESEND_API_KEY="re_..."

# Analytics (opcional)
NEXT_PUBLIC_GA_ID="G-..."
```

### C. Checklist Geral

**Fase 0:**
- [ ] Middleware de proteção
- [ ] Sistema de RBAC
- [ ] Componentes base (DataTable, LoadingState)

**Fase 1:**
- [ ] UploadThing configurado
- [ ] MediaUploader funcionando
- [ ] Biblioteca de mídia completa

**Fase 2:**
- [ ] CRUD de Blog completo
- [ ] Editor TipTap integrado
- [ ] Sistema de rascunhos

**Fase 3:**
- [ ] CRUD de Cases completo
- [ ] Galeria de imagens
- [ ] Testimonials

**Fase 4:**
- [ ] CRUD de Serviços completo
- [ ] Editor de pricing tiers
- [ ] Editor de process steps

**Fase 5:**
- [ ] Dashboard com métricas
- [ ] Gráficos de analytics
- [ ] Relatórios exportáveis

**Fase 6:**
- [ ] Gerenciamento de usuários
- [ ] Configurações de SEO global
- [ ] Integrações (CRM, Email)

**Fase 7:**
- [ ] Sitemap dinâmico
- [ ] Meta tags automáticas
- [ ] Schema.org completo

**Fase 8:**
- [ ] Audit logs
- [ ] Rate limiting
- [ ] 2FA (opcional)

**Fase 9:**
- [ ] Webhooks configurados
- [ ] Email notifications
- [ ] Integração com CRM

**Fase 10:**
- [ ] Testes E2E
- [ ] CI/CD pipeline
- [ ] Documentação final

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

1. **Semana 1:** Implementar Middleware + RBAC (Fase 0)
2. **Semana 2:** Configurar UploadThing e Biblioteca de Mídia (Fase 1)
3. **Semanas 3-4:** CRUD completo de Blog com TipTap (Fase 2)
4. **Semanas 5-6:** CRUD de Cases e Serviços (Fases 3-4)
5. **Semanas 7-8:** Dashboard e Analytics (Fase 5)

---

**FIM DO ROADMAP COMPLETO**

> Este documento deve ser atualizado conforme o progresso. Marque os checkboxes `[ ]` como `[x]` quando completar cada item.
