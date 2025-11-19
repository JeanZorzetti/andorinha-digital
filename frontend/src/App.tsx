import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WhatsAppButton from "./components/WhatsAppButton";
import Analytics from "./components/Analytics";
import { SchemaOrganization } from "./components/SchemaOrg";
import { Spinner } from "@/components/ui/spinner";

// Lazy loading de todas as páginas para code splitting
const Home = lazy(() => import("./pages/Home"));
const Contato = lazy(() => import("./pages/Contato"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Páginas de Serviços
const Branding = lazy(() => import("./pages/servicos/Branding"));
const Sites = lazy(() => import("./pages/servicos/Sites"));
const Video = lazy(() => import("./pages/servicos/Video"));
const Rebranding = lazy(() => import("./pages/servicos/Rebranding"));
const DesignGrafico = lazy(() => import("./pages/servicos/DesignGrafico"));

// Outras Páginas
const Precos = lazy(() => import("./pages/Precos"));
const Processo = lazy(() => import("./pages/Processo"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Cases = lazy(() => import("./pages/Cases"));
const CaseDetail = lazy(() => import("./pages/CaseDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

// Componente de loading para Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <Spinner size="lg" className="text-primary mx-auto mb-4" />
      <p className="text-sm text-muted-foreground">Carregando...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <WhatsAppButton />
        <SchemaOrganization />
        <BrowserRouter>
          <Analytics />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/precos" element={<Precos />} />
              <Route path="/processo" element={<Processo />} />
              <Route path="/sobre" element={<Sobre />} />

              {/* Páginas de Serviços */}
              <Route path="/servicos/branding" element={<Branding />} />
              <Route path="/servicos/sites" element={<Sites />} />
              <Route path="/servicos/video" element={<Video />} />
              <Route path="/servicos/rebranding" element={<Rebranding />} />
              <Route path="/servicos/design-grafico" element={<DesignGrafico />} />

              {/* Cases */}
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases/:id" element={<CaseDetail />} />

              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
