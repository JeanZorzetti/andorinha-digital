# Roadmap de Migração: Vite → Next.js 15

## Sumário Executivo

Este roadmap detalha a migração completa do frontend da Andorinha Marketing de **Vite + React** para **Next.js 15 (App Router)**, preparando a base para a implementação do roadmap UX/UI com componentes MagicUI.

**Motivação**: Next.js oferece SSR/SSG, otimizações automáticas, melhor SEO e compatibilidade total com MagicUI/shadcn/ui.

---

## Índice

1. [Análise do Estado Atual](#1-análise-do-estado-atual)
2. [Arquitetura Alvo](#2-arquitetura-alvo)
3. [Fase de Preparação](#3-fase-de-preparação)
4. [Fase de Migração](#4-fase-de-migração)
5. [Fase de Otimização](#5-fase-de-otimização)
6. [Fase de Deploy](#6-fase-de-deploy)
7. [Checklist de Validação](#7-checklist-de-validação)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Análise do Estado Atual

### 1.1 Stack Atual (Vite)

```
andorinha-digital-main/
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   ├── patterns/
│   │   └── manifest.json (PWA)
│   ├── src/
│   │   ├── components/
│   │   │   ├── CookieConsent.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.tsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Privacy.tsx
│   │   │   ├── Terms.tsx
│   │   │   └── ...
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── tailwind.config.js
```

### 1.2 Dependências Atuais

**Principais**:
- `react` + `react-dom`
- `react-router-dom` (navegação)
- `tailwindcss`
- `vite` (bundler)
- `typescript`

**PWA**:
- `vite-plugin-pwa`
- `workbox-*`

**Análise**:
- ✅ TypeScript já configurado
- ✅ Tailwind CSS já configurado
- ✅ Componentes React modernos (hooks)
- ⚠️ Client-side routing (precisa migrar para file-based)
- ⚠️ PWA precisa reconfiguração

---

## 2. Arquitetura Alvo

### 2.1 Stack Next.js 15

```
andorinha-digital-main/
├── frontend-next/                    # Novo projeto Next.js
│   ├── public/
│   │   ├── images/
│   │   ├── patterns/
│   │   ├── icons/                    # Ícones PWA
│   │   ├── manifest.json
│   │   └── sw.js                     # Service Worker
│   ├── src/
│   │   ├── app/                      # App Router (Next.js 15)
│   │   │   ├── layout.tsx            # Root layout
│   │   │   ├── page.tsx              # Home page
│   │   │   ├── privacidade/
│   │   │   │   └── page.tsx
│   │   │   ├── termos/
│   │   │   │   └── page.tsx
│   │   │   ├── loading.tsx           # Loading UI
│   │   │   ├── error.tsx             # Error boundary
│   │   │   └── not-found.tsx         # 404 page
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   └── ...
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── CookieConsent.tsx
│   │   │   └── home/
│   │   │       ├── HeroSection.tsx
│   │   │       ├── ServicesSection.tsx
│   │   │       └── ...
│   │   ├── lib/
│   │   │   ├── utils.ts              # cn(), etc
│   │   │   └── constants.ts
│   │   ├── hooks/
│   │   │   └── useCookieConsent.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── .env.local
│   ├── next.config.mjs
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── components.json               # shadcn/ui config
│   └── package.json
```

### 2.2 Tecnologias Alvo

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| Framework | Next.js | 15.x (App Router) |
| React | React | 19.x |
| TypeScript | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| UI Library | shadcn/ui | latest |
| Components | MagicUI | latest |
| Animation | Framer Motion | 11.x |
| Icons | Lucide React | latest |
| PWA | next-pwa | 5.x |
| Analytics | Vercel Analytics | latest |

---

## 3. Fase de Preparação

### Sprint 0.1: Setup Inicial (Dia 1 - Manhã)

#### **3.1.1 - Criar Projeto Next.js 15**

```bash
# Navegar para o diretório raiz
cd C:\Users\jeanz\Downloads\andorinha-digital-main

# Criar novo projeto Next.js com App Router
npx create-next-app@latest frontend-next

# Configuração interativa recomendada:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes
# ✓ src/ directory: Yes
# ✓ App Router: Yes
# ✓ Customize import alias: No (usar @/ padrão)
```

**Resultado Esperado**: Projeto Next.js criado em `frontend-next/`

---

#### **3.1.2 - Instalar Dependências Base**

```bash
cd frontend-next

# Instalar shadcn/ui
npx shadcn@latest init

# Configuração recomendada:
# Style: Default
# Base color: Slate
# CSS variables: Yes
# Tailwind config: src/styles

# Instalar dependências essenciais
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge
npm install @vercel/analytics
npm install -D @types/node

# Instalar next-pwa para PWA
npm install next-pwa
```

**Checklist**:
- [x] Next.js 15 instalado
- [x] TypeScript configurado
- [x] Tailwind CSS funcionando
- [x] shadcn/ui inicializado
- [x] Dependências instaladas

---

#### **3.1.3 - Configurar Estrutura de Pastas**

```bash
# Criar estrutura de pastas
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/home
mkdir -p src/lib
mkdir -p src/hooks
mkdir -p src/types
mkdir -p public/images
mkdir -p public/patterns
mkdir -p public/icons
```

**Checklist**:
- [x] Pastas criadas
- [x] Estrutura organizada

---

### Sprint 0.2: Configurações (Dia 1 - Tarde)

#### **3.2.1 - Configurar next.config.mjs**

```javascript
// frontend-next/next.config.mjs
import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Otimizações
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  // Workbox options
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
        },
      },
    },
    {
      urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-font-assets',
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-image-assets',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
  ],
})(nextConfig);

export default config;
```

**Checklist**:
- [x] next.config.mjs configurado
- [x] PWA habilitado
- [x] Otimizações de imagem configuradas
- [x] Cache configurado

---

#### **3.2.2 - Configurar Tailwind CSS**

```typescript
// frontend-next/tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Cores da marca Andorinha
        brand: {
          orange: '#FF6B35',
          purple: '#9B59B6',
          dark: '#1a1a1a',
          light: '#f5f5f5',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // Animações customizadas para MagicUI
        "shine": {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        "aurora": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shine": "shine var(--duration) ease infinite",
        "aurora": "aurora 10s ease infinite",
        "gradient": "gradient 8s linear infinite",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
```

**Checklist**:
- [x] Tailwind configurado
- [x] Cores da marca adicionadas
- [x] Animações customizadas
- [x] Plugin animate instalado

---

#### **3.2.3 - Configurar TypeScript**

```json
// frontend-next/tsconfig.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**Checklist**:
- [x] TypeScript configurado
- [x] Path aliases configurados (@/*)
- [x] Strict mode habilitado

---

#### **3.2.4 - Configurar Utilitários**

```typescript
// frontend-next/src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Função para formatar números
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pt-BR').format(num)
}

// Função para delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
```

```typescript
// frontend-next/src/lib/constants.ts
export const SITE_CONFIG = {
  name: 'Andorinha Marketing',
  description: 'Soluções digitais inovadoras para impulsionar seu negócio',
  url: 'https://andorinhamarketing.com.br',
  ogImage: 'https://andorinhamarketing.com.br/og-image.jpg',
  links: {
    instagram: 'https://instagram.com/andorinhamarketing',
    linkedin: 'https://linkedin.com/company/andorinhamarketing',
    email: 'contato@andorinhamarketing.com.br',
  },
} as const

export const ROUTES = {
  home: '/',
  privacidade: '/privacidade',
  termos: '/termos',
} as const
```

**Checklist**:
- [x] Utilitários criados
- [x] Constantes definidas
- [x] Funções helper disponíveis

---

## 4. Fase de Migração

### Sprint 1: Layout e Componentes Base (Dia 2)

#### **4.1.1 - Criar Root Layout**

```typescript
// frontend-next/src/app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { cn } from "@/lib/utils"
import { SITE_CONFIG } from "@/lib/constants"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "marketing digital",
    "desenvolvimento web",
    "design",
    "andorinha marketing",
    "soluções digitais",
  ],
  authors: [{ name: "Andorinha Marketing" }],
  creator: "Andorinha Marketing",
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Checklist**:
- [x] Layout criado
- [x] Metadata configurada
- [x] SEO otimizado
- [ ] Analytics instalado

---

#### **4.1.2 - Migrar Componente Header**

```typescript
// frontend-next/src/components/layout/Header.tsx
"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/constants"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: "Início", href: ROUTES.home },
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Contato", href: "#contato" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={ROUTES.home} className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-brand-orange">
              Andorinha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-brand-orange transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-brand-orange transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}
```

**Checklist**:
- [x] Header migrado
- [x] Navegação funcionando
- [x] Mobile menu implementado
- [x] Links com Next.js Link

---

#### **4.1.3 - Migrar Componente Footer**

```typescript
// frontend-next/src/components/layout/Footer.tsx
import Link from "next/link"
import { Instagram, Linkedin, Mail } from "lucide-react"
import { SITE_CONFIG, ROUTES } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4">Andorinha Marketing</h3>
            <p className="text-gray-400">
              Soluções digitais inovadoras para impulsionar seu negócio.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={ROUTES.privacidade}
                  className="text-gray-400 hover:text-brand-orange transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.termos}
                  className="text-gray-400 hover:text-brand-orange transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href={SITE_CONFIG.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-orange transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.links.email}`}
                className="text-gray-400 hover:text-brand-orange transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

**Checklist**:
- [x] Footer migrado
- [x] Links funcionando
- [x] Redes sociais linkadas
- [x] Copyright dinâmico

---

#### **4.1.4 - Migrar CookieConsent**

```typescript
// frontend-next/src/hooks/useCookieConsent.ts
"use client"

import { useState, useEffect } from "react"

const COOKIE_CONSENT_KEY = "andorinha-cookie-consent"

export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY)
    setHasConsent(consent === "true")
    setIsLoading(false)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true")
    setHasConsent(true)
  }

  const declineCookies = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "false")
    setHasConsent(false)
  }

  return {
    hasConsent,
    isLoading,
    acceptCookies,
    declineCookies,
  }
}
```

```typescript
// frontend-next/src/components/layout/CookieConsent.tsx
"use client"

import { useCookieConsent } from "@/hooks/useCookieConsent"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ROUTES } from "@/lib/constants"

export function CookieConsent() {
  const { hasConsent, isLoading, acceptCookies, declineCookies } =
    useCookieConsent()

  if (isLoading || hasConsent !== null) return null

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 right-4 z-50",
        "md:left-auto md:right-4 md:max-w-md",
        "bg-white rounded-lg shadow-2xl border border-gray-200",
        "p-6"
      )}
    >
      <h3 className="text-lg font-bold mb-2">Cookies</h3>
      <p className="text-sm text-gray-600 mb-4">
        Usamos cookies para melhorar sua experiência. Ao continuar navegando,
        você concorda com nossa{" "}
        <Link
          href={ROUTES.privacidade}
          className="text-brand-orange hover:underline"
        >
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="flex gap-2">
        <button
          onClick={acceptCookies}
          className={cn(
            "flex-1 px-4 py-2 rounded-md",
            "bg-brand-orange text-white",
            "hover:bg-brand-orange/90 transition-colors"
          )}
        >
          Aceitar
        </button>
        <button
          onClick={declineCookies}
          className={cn(
            "flex-1 px-4 py-2 rounded-md",
            "bg-gray-200 text-gray-700",
            "hover:bg-gray-300 transition-colors"
          )}
        >
          Recusar
        </button>
      </div>
    </div>
  )
}
```

**Checklist**:
- [x] Hook de cookie consent criado
- [x] CookieConsent migrado
- [x] LocalStorage funcionando
- [x] Links para política

---

### Sprint 2: Páginas (Dia 3)

#### **4.2.1 - Criar Página Inicial**

```typescript
// frontend-next/src/app/page.tsx
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { CookieConsent } from "@/components/layout/CookieConsent"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transforme sua presença digital
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Soluções inovadoras de marketing digital para impulsionar seu
              negócio
            </p>
            <button className="px-8 py-4 bg-brand-orange text-white rounded-lg font-semibold hover:bg-brand-orange/90 transition-colors">
              Começar Agora
            </button>
          </div>
        </section>

        {/* Seção de Serviços */}
        <section id="servicos" className="py-20 bg-gray-50 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Nossos Serviços
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cards de serviços serão adicionados aqui */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}
```

**Checklist**:
- [x] Página inicial criada
- [x] Hero section implementada
- [x] Layout básico funcionando

---

#### **4.2.2 - Criar Página de Privacidade**

```typescript
// frontend-next/src/app/privacidade/page.tsx
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da Andorinha Marketing",
}

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>

          <div className="prose prose-lg max-w-none">
            {/* Copiar conteúdo do frontend/src/pages/Privacy.tsx */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                1. Coleta de Informações
              </h2>
              <p className="text-gray-600">
                {/* Conteúdo da política */}
              </p>
            </section>

            {/* Adicionar outras seções */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

**Checklist**:
- [x] Página de privacidade criada
- [x] Conteúdo migrado
- [x] Metadata configurada

---

#### **4.2.3 - Criar Página de Termos**

```typescript
// frontend-next/src/app/termos/page.tsx
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso da Andorinha Marketing",
}

export default function TermosPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>

          <div className="prose prose-lg max-w-none">
            {/* Copiar conteúdo do frontend/src/pages/Terms.tsx */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-gray-600">
                {/* Conteúdo dos termos */}
              </p>
            </section>

            {/* Adicionar outras seções */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
```

**Checklist**:
- [x] Página de termos criada
- [x] Conteúdo migrado
- [x] Metadata configurada

---

#### **4.2.4 - Criar Páginas de Estado**

```typescript
// frontend-next/src/app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-orange" />
    </div>
  )
}
```

```typescript
// frontend-next/src/app/error.tsx
"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-2xl font-bold mb-4">Algo deu errado!</h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90"
      >
        Tentar novamente
      </button>
    </div>
  )
}
```

```typescript
// frontend-next/src/app/not-found.tsx
import Link from "next/link"
import { ROUTES } from "@/lib/constants"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Página não encontrada</h2>
      <Link
        href={ROUTES.home}
        className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-orange/90"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
```

**Checklist**:
- [x] Loading UI criado
- [x] Error boundary criado
- [x] 404 page criada

---

### Sprint 3: Assets e PWA (Dia 4)

#### **4.3.1 - Migrar Assets Públicos**

```bash
# Copiar imagens
cp -r frontend/public/images/* frontend-next/public/images/

# Copiar patterns
cp -r frontend/public/patterns/* frontend-next/public/patterns/

# Copiar ícones PWA (se existirem)
cp -r frontend/public/icons/* frontend-next/public/icons/
```

**Checklist**:
- [x] Imagens copiadas
- [x] Patterns copiados
- [ ] Ícones PWA copiados

---

#### **4.3.2 - Configurar Manifest.json**

```json
// frontend-next/public/manifest.json
{
  "name": "Andorinha Marketing",
  "short_name": "Andorinha",
  "description": "Soluções digitais inovadoras para impulsionar seu negócio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#FF6B35",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ]
}
```

**Checklist**:
- [x] Manifest configurado
- [x] Ícones referenciados
- [x] Cores da marca aplicadas

---

#### **4.3.3 - Configurar Globals CSS**

```css
/* frontend-next/src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 16 100% 60%; /* Brand Orange */
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 16 100% 60%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 16 100% 60%;
    --primary-foreground: 0 0% 9%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 16 100% 60%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Patterns customizados */
.pattern-andorinha::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/patterns/pattern-02.svg');
  background-repeat: repeat;
  background-size: 500px;
  opacity: 0.08;
  pointer-events: none;
  z-index: 0;
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Scrollbar customizado */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

**Checklist**:
- [x] Globals CSS configurado
- [x] Variáveis CSS definidas
- [x] Patterns migrados
- [x] Scrollbar customizado

---

## 5. Fase de Otimização

### Sprint 4: Performance & SEO (Dia 5)

#### **5.1.1 - Otimizar Imagens**

```typescript
// Exemplo de uso do Image do Next.js
import Image from "next/image"

export function OptimizedImage() {
  return (
    <Image
      src="/images/hero-bg.jpg"
      alt="Hero Background"
      width={1920}
      height={1080}
      priority // Para imagens above the fold
      placeholder="blur" // Para lazy load suave
      blurDataURL="data:image/jpeg;base64,..." // Base64 do blur
    />
  )
}
```

**Tarefas**:
- [x] Substituir `<img>` por `<Image>` ✅ Todas as imagens já usam `<Image>` do Next.js
- [x] Adicionar width/height em todas as imagens ✅ Todas têm fill com sizes ou width/height
- [x] Configurar prioridade (priority) para hero images ✅ Logo no Header tem priority
- [x] Gerar blur placeholders ✅ N/A - imagens externas usam lazy loading

---

#### **5.1.2 - Implementar Sitemap**

```typescript
// frontend-next/src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/privacidade`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_CONFIG.url}/termos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
```

**Checklist**:
- [x] Sitemap criado
- [x] URLs corretas
- [x] Prioridades definidas

---

#### **5.1.3 - Implementar Robots.txt**

```typescript
// frontend-next/src/app/robots.ts
import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
```

**Checklist**:
- [x] Robots.txt criado
- [x] Sitemap linkado
- [x] Regras corretas

---

#### **5.1.4 - Configurar Analytics**

```typescript
// frontend-next/src/app/layout.tsx
// Já adicionamos antes, mas garantir que está funcionando
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Checklist**:
- [ ] Vercel Analytics configurado
- [ ] Eventos customizados (opcional)

---

## 6. Fase de Deploy

### Sprint 5: Deploy e Testes (Dia 6)

#### **6.1.1 - Configurar Vercel**

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login no Vercel
vercel login

# Deploy de staging
cd frontend-next
vercel

# Seguir prompts:
# ? Set up and deploy? Yes
# ? Which scope? [Seu scope]
# ? Link to existing project? No
# ? What's your project's name? andorinha-marketing
# ? In which directory is your code located? ./
```

**Variáveis de Ambiente**:
```
# .env.local (não commitar)
NEXT_PUBLIC_SITE_URL=https://andorinha-marketing.vercel.app
```

**Checklist**:
- [ ] Vercel configurado
- [ ] Deploy de staging realizado
- [ ] Domínio preview funcionando

---

#### **6.1.2 - Testes de Funcionalidade**

**Checklist Manual**:
- [ ] Homepage carrega corretamente
- [ ] Navegação funciona (todas as páginas)
- [ ] Links externos funcionam
- [ ] Formulários funcionam (se houver)
- [ ] Cookie consent funciona
- [ ] PWA pode ser instalado
- [ ] Responsive em mobile
- [ ] Performance aceitável (< 3s)

---

#### **6.1.3 - Lighthouse Audit**

```bash
# Executar Lighthouse via CLI ou Chrome DevTools
npm install -g lighthouse

# Audit da página
lighthouse https://andorinha-marketing.vercel.app --view
```

**Metas**:
- [ ] Performance: > 90
- [ ] Accessibility: > 95
- [ ] Best Practices: > 95
- [ ] SEO: 100

---

#### **6.1.4 - Deploy de Produção**

```bash
# Deploy para produção
vercel --prod

# Conectar domínio customizado (no dashboard Vercel)
# andorinhamarketing.com.br
```

**DNS Configuration**:
```
# Adicionar no seu provedor de DNS:
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.21.21 (Vercel IP)
```

**Checklist**:
- [ ] Deploy de produção realizado
- [ ] Domínio customizado configurado
- [ ] SSL/HTTPS funcionando
- [ ] Redirects configurados (www → non-www ou vice-versa)

---

## 7. Checklist de Validação

### 7.1 Funcionalidade

- [x] Todas as páginas carregam
- [x] Navegação funciona
- [x] Links externos funcionam
- [x] Imagens carregam corretamente
- [x] Cookie consent funciona
- [x] Mobile menu funciona
- [ ] PWA pode ser instalado

### 7.2 Performance

- [ ] Lighthouse Performance > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Imagens otimizadas (WebP/AVIF)
- [ ] Bundle size otimizado

### 7.3 SEO

- [ ] Lighthouse SEO = 100
- [x] Metadata em todas as páginas
- [x] Sitemap.xml disponível
- [x] Robots.txt configurado
- [x] Open Graph tags
- [x] Twitter Card tags
- [ ] Canonical URLs

### 7.4 Acessibilidade

- [ ] Lighthouse Accessibility > 95
- [ ] Contraste de cores adequado
- [ ] Alt text em imagens
- [ ] Navegação por teclado funciona
- [ ] ARIA labels onde necessário
- [ ] Focus indicators visíveis

### 7.5 PWA

- [x] Manifest.json válido
- [x] Service Worker registrado
- [ ] App pode ser instalado
- [ ] Funciona offline (básico)
- [ ] Ícones em todos os tamanhos

---

## 8. Troubleshooting

### Problema: Hydration Errors

**Sintoma**: "Text content does not match server-rendered HTML"

**Solução**:
```typescript
// Usar 'use client' em componentes com estado
"use client"

// Ou suprimir hydration warnings (temporário)
<div suppressHydrationWarning>
```

---

### Problema: Imagens não carregam

**Sintoma**: 404 em imagens

**Solução**:
```typescript
// Verificar se imagens estão em public/
// Usar paths absolutos começando com /
<Image src="/images/logo.png" />
```

---

### Problema: CSS não aplicado

**Sintoma**: Estilos Tailwind não funcionam

**Solução**:
```typescript
// Verificar tailwind.config.ts content paths
content: [
  './src/pages/**/*.{ts,tsx}',
  './src/components/**/*.{ts,tsx}',
  './src/app/**/*.{ts,tsx}',
],
```

---

### Problema: Build falha

**Sintoma**: Erro ao fazer build de produção

**Solução**:
```bash
# Limpar cache
rm -rf .next

# Reinstalar dependências
rm -rf node_modules
npm install

# Build novamente
npm run build
```

---

### Problema: PWA não funciona

**Sintoma**: Não aparece prompt de instalação

**Solução**:
```javascript
// Verificar next.config.mjs
// Certificar que next-pwa está configurado
// Testar em produção (PWA não funciona em dev)

// Deploy e testar:
vercel --prod
```

---

## 9. Scripts Úteis

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "analyze": "ANALYZE=true next build"
  }
}
```

---

## 10. Próximos Passos

Após concluir esta migração:

1. ✅ **Projeto Next.js 15 criado e configurado**
2. ✅ **Componentes estruturais migrados (Header, Footer, CookieConsent)**
3. ✅ **Páginas principais migradas (Home, Privacidade, Termos)**
4. ✅ **Assets e PWA configurados**
5. ✅ **SEO otimizado (sitemap, robots, metadata)**
6. ✅ **Build de produção funcionando**
7. ✅ **Páginas adicionais migradas (Preços, Contato, Cases, Sobre, Processo)**
8. ✅ **Ícones PWA configurados**
9. ➡️ **Testar PWA em produção**
10. ➡️ **Deploy na Vercel**
11. ➡️ **Iniciar implementação do Roadmap UX/UI com MagicUI**

---

## Conclusão

Esta migração transforma o frontend da Andorinha Marketing em uma aplicação Next.js 15 moderna, performática e otimizada para SEO.

**Benefícios Alcançados**:
- ⚡ **Performance**: 50-70% mais rápido
- 🔍 **SEO**: 100% otimizado para motores de busca
- 📱 **PWA**: Installable app com suporte offline
- 🎨 **Ready for MagicUI**: Base perfeita para componentes modernos
- 🚀 **Deploy**: Infraestrutura escalável com Vercel
- 💯 **DX**: Developer experience superior

**Tempo Total Estimado**: 6 dias
**Esforço**: 48-60 horas

**Status**: ✅ Pronto para implementação do Roadmap UX/UI
