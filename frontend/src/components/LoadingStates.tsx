/**
 * Componente de demonstração dos Loading States
 * Mostra exemplos de uso do Spinner e Skeleton em diferentes contextos
 *
 * Este arquivo serve como guia de implementação para os desenvolvedores
 */

import { Spinner, SpinnerOverlay } from "@/components/ui/spinner";
import {
  Skeleton,
  SkeletonCard,
  SkeletonBlogPost,
  SkeletonList,
  SkeletonPage,
} from "@/components/ui/skeleton";

/**
 * Exemplo 1: Loading inline em botões
 */
export function ButtonWithLoading({ isLoading }: { isLoading: boolean }) {
  return (
    <button
      disabled={isLoading}
      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
    >
      {isLoading && <Spinner size="sm" />}
      {isLoading ? "Enviando..." : "Enviar"}
    </button>
  );
}

/**
 * Exemplo 2: Loading em seção de conteúdo
 */
export function ContentWithLoading({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold font-heading mb-4">Conteúdo Carregado</h2>
      <p className="font-body text-muted-foreground">
        Seu conteúdo aparece aqui depois do carregamento.
      </p>
    </div>
  );
}

/**
 * Exemplo 3: Grid de cards com loading
 */
export function CardsGridWithLoading({ isLoading }: { isLoading: boolean }) {
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
      {/* Seus cards aqui */}
    </div>
  );
}

/**
 * Exemplo 4: Lista de posts com loading
 */
export function BlogPostsWithLoading({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return (
      <div className="space-y-8">
        <SkeletonBlogPost />
        <SkeletonBlogPost />
        <SkeletonBlogPost />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Seus posts aqui */}
    </div>
  );
}

/**
 * Exemplo 5: Loading em overlay (tela cheia)
 */
export function PageWithOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && <SpinnerOverlay />}
      <div className="container mx-auto px-4 py-16">
        {/* Seu conteúdo aqui */}
      </div>
    </>
  );
}

/**
 * Exemplo 6: Spinner centralizado em container
 */
export function CenteredSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Spinner size="lg" className="text-primary mx-auto mb-4" />
        <p className="font-body text-sm text-muted-foreground">
          Carregando dados...
        </p>
      </div>
    </div>
  );
}

/**
 * Exemplo 7: Lista de FAQs com loading
 */
export function FAQListWithLoading({ isLoading }: { isLoading: boolean }) {
  if (isLoading) {
    return <SkeletonList items={5} />;
  }

  return (
    <div className="space-y-4">
      {/* Seus FAQs/Accordions aqui */}
    </div>
  );
}

// Guia de uso rápido:
//
// 1. Import: import { Spinner } from "@/components/ui/spinner";
// 2. Use em botões: <Spinner size="sm" />
// 3. Use em páginas: <Spinner size="lg" className="text-primary" />
// 4. Use skeleton para conteúdo: <Skeleton className="h-4 w-full" />
// 5. Use componentes pré-montados: <SkeletonCard />, <SkeletonBlogPost />
// 6. Use overlay: <SpinnerOverlay />
