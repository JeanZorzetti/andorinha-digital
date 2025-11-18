import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";
import Analytics from "./components/Analytics";

// Páginas de Serviços
import Branding from "./pages/servicos/Branding";
import Sites from "./pages/servicos/Sites";
import Video from "./pages/servicos/Video";
import Rebranding from "./pages/servicos/Rebranding";
import DesignGrafico from "./pages/servicos/DesignGrafico";

// Outras Páginas
import Precos from "./pages/Precos";
import Processo from "./pages/Processo";
import Sobre from "./pages/Sobre";
import Cases from "./pages/Cases";
import CaseDetail from "./pages/CaseDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <WhatsAppButton />
        <BrowserRouter>
          <Analytics />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
