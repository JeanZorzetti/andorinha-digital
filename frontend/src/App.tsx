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

// Páginas de Serviços
import Branding from "./pages/servicos/Branding";
import Sites from "./pages/servicos/Sites";
import Video from "./pages/servicos/Video";
import Rebranding from "./pages/servicos/Rebranding";
import DesignGrafico from "./pages/servicos/DesignGrafico";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <WhatsAppButton />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contato" element={<Contato />} />

            {/* Páginas de Serviços */}
            <Route path="/servicos/branding" element={<Branding />} />
            <Route path="/servicos/sites" element={<Sites />} />
            <Route path="/servicos/video" element={<Video />} />
            <Route path="/servicos/rebranding" element={<Rebranding />} />
            <Route path="/servicos/design-grafico" element={<DesignGrafico />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
