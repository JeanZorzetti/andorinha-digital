import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path
                  d="M12 3C8 3 5 6 5 10c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"
                  fill="white"
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">Andorinha</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium">
                Serviços
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-lg border border-border py-2 animate-fade-in">
                  <Link
                    to="/servicos/branding"
                    className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                  >
                    <div className="font-medium text-foreground">Branding</div>
                    <div className="text-sm text-muted-foreground">Identidade visual completa</div>
                  </Link>
                  <Link
                    to="/servicos/sites"
                    className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                  >
                    <div className="font-medium text-foreground">Sites & Landing Pages</div>
                    <div className="text-sm text-muted-foreground">Presença digital profissional</div>
                  </Link>
                  <Link
                    to="/servicos/video"
                    className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                  >
                    <div className="font-medium text-foreground">Vídeo Institucional</div>
                    <div className="text-sm text-muted-foreground">Conte sua história</div>
                  </Link>
                  <Link
                    to="/servicos/rebranding"
                    className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                  >
                    <div className="font-medium text-foreground">Rebranding</div>
                    <div className="text-sm text-muted-foreground">Renovação completa</div>
                  </Link>
                  <Link
                    to="/servicos/design-grafico"
                    className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                  >
                    <div className="font-medium text-foreground">Design Gráfico</div>
                    <div className="text-sm text-muted-foreground">Materiais de comunicação</div>
                  </Link>
                </div>
              )}
            </div>

            <Link to="/precos" className="text-foreground hover:text-primary transition-colors font-medium">
              Preços
            </Link>
            <Link to="/processo" className="text-foreground hover:text-primary transition-colors font-medium">
              Processo
            </Link>
            <Link to="/cases" className="text-foreground hover:text-primary transition-colors font-medium">
              Cases
            </Link>
            <Link to="/sobre" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre
            </Link>
            <Link to="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link to="/contato">Diagnóstico Gratuito 🎯</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <div className="border-b border-border pb-4">
                <div className="font-semibold text-foreground mb-2">Serviços</div>
                <div className="pl-4 space-y-2">
                  <Link
                    to="/servicos/branding"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Branding
                  </Link>
                  <Link
                    to="/servicos/sites"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sites & Landing Pages
                  </Link>
                  <Link
                    to="/servicos/video"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vídeo Institucional
                  </Link>
                  <Link
                    to="/servicos/rebranding"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Rebranding
                  </Link>
                  <Link
                    to="/servicos/design-grafico"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Design Gráfico
                  </Link>
                </div>
              </div>
              
              <Link
                to="/precos"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Preços
              </Link>
              <Link
                to="/processo"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Processo
              </Link>
              <Link
                to="/cases"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cases
              </Link>
              <Link
                to="/sobre"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                to="/blog"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full">
                <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                  Diagnóstico Gratuito 🎯
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
