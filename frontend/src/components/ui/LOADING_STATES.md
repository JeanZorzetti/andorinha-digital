# Loading States - Guia de Uso

Componentes de loading states padronizados conforme Manual da Marca Andorinha.

## 🎯 Componentes Disponíveis

### 1. Spinner

Spinner animado com design personalizado.

**Imports:**
```tsx
import { Spinner, SpinnerOverlay } from "@/components/ui/spinner";
```

**Tamanhos disponíveis:**
- `sm` - 24px (botões, badges)
- `md` - 40px (padrão, seções)
- `lg` - 64px (páginas, centralizados)
- `xl` - 96px (telas inteiras)

**Exemplos:**

```tsx
// Spinner básico
<Spinner size="md" />

// Spinner com cor personalizada
<Spinner size="lg" className="text-primary" />

// Spinner em botão
<button disabled>
  <Spinner size="sm" className="mr-2" />
  Carregando...
</button>

// Overlay em tela cheia
<SpinnerOverlay />
```

---

### 2. Skeleton

Placeholder animado com cores neutras (bg-muted).

**Imports:**
```tsx
import {
  Skeleton,
  SkeletonCard,
  SkeletonBlogPost,
  SkeletonList,
  SkeletonPage,
} from "@/components/ui/skeleton";
```

**Skeleton Básico:**
```tsx
// Linha de texto
<Skeleton className="h-4 w-full" />

// Título
<Skeleton className="h-8 w-2/3" />

// Círculo (avatar)
<Skeleton className="h-12 w-12 rounded-full" />

// Imagem
<Skeleton className="h-48 w-full" />
```

**Componentes Pré-montados:**

```tsx
// Card de case/serviço
<SkeletonCard />

// Post de blog
<SkeletonBlogPost />

// Lista de itens (FAQ, processo)
<SkeletonList items={5} />

// Página completa
<SkeletonPage />
```

---

## 📋 Padrões de Implementação

### Loading em Grid de Cards

```tsx
function CasesGrid() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {cases.map(case => <CaseCard key={case.id} {...case} />)}
    </div>
  );
}
```

### Loading em Conteúdo de Texto

```tsx
function Article() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" /> {/* Título */}
        <Skeleton className="h-4 w-full" />  {/* Parágrafo */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    );
  }

  return <div>{/* Conteúdo real */}</div>;
}
```

### Loading em Botões

```tsx
function SubmitButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <button
      disabled={isSubmitting}
      className="inline-flex items-center gap-2"
    >
      {isSubmitting && <Spinner size="sm" />}
      {isSubmitting ? "Enviando..." : "Enviar"}
    </button>
  );
}
```

### Loading em Página Inteira

```tsx
function Page() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SkeletonPage />;
  }

  return (
    <>
      <Header />
      <main>{/* Conteúdo */}</main>
      <Footer />
    </>
  );
}
```

### Loading com Overlay

```tsx
function Dashboard() {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <>
      {isSaving && <SpinnerOverlay />}
      <div className="container">
        {/* Conteúdo da página */}
      </div>
    </>
  );
}
```

---

## 🎨 Cores do Manual da Marca

Os componentes já seguem as cores oficiais:

- **Skeleton**: `bg-muted` (cinza neutro #E9ECEF)
- **Spinner**: Usa `currentColor`, aplicar `text-primary` para laranja (#FF6B35)
- **Overlay**: `bg-background/80` com backdrop blur

---

## ✅ Checklist de Implementação

Ao adicionar loading states em uma página:

- [ ] Identificar pontos de carregamento (fetch de dados, submit de forms)
- [ ] Escolher componente apropriado (Spinner vs Skeleton)
- [ ] Usar tamanho correto do spinner
- [ ] Manter hierarquia do skeleton similar ao conteúdo real
- [ ] Adicionar `aria-label` ou `role="status"` para acessibilidade
- [ ] Testar em diferentes resoluções
- [ ] Garantir que loading não bloqueia a UI desnecessariamente

---

## 📚 Exemplos Completos

Veja o arquivo `frontend/src/components/LoadingStates.tsx` para exemplos práticos de implementação em diferentes contextos.

---

## 🔄 Animações

**Spinner**: Rotação contínua com `animate-spin`
**Skeleton**: Pulse suave com `animate-pulse`

Ambas as animações são otimizadas para performance e já estão configuradas no Tailwind CSS.
