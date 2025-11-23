'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo/simbolo.svg"
              alt="Andorinha Audiovisual"
              width={96}
              height={96}
              className="h-24 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link
                href="/servicos"
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors font-medium"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Serviços
                <ChevronDown className="w-4 h-4" aria-hidden="true" />
              </Link>

              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2 w-64 animate-fade-in">
                  <div className="bg-card rounded-lg shadow-lg border border-border py-2">
                    <Link
                      href="/servicos/branding"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Branding</div>
                      <div className="text-sm text-muted-foreground">Identidade visual completa</div>
                    </Link>
                    <Link
                      href="/servicos/sites"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Sites & Landing Pages</div>
                      <div className="text-sm text-muted-foreground">Presença digital profissional</div>
                    </Link>
                    <Link
                      href="/servicos/video"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Vídeo Institucional</div>
                      <div className="text-sm text-muted-foreground">Conte sua história</div>
                    </Link>
                    <Link
                      href="/servicos/rebranding"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Rebranding</div>
                      <div className="text-sm text-muted-foreground">Renovação completa</div>
                    </Link>
                    <Link
                      href="/servicos/design-grafico"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Design Gráfico</div>
                      <div className="text-sm text-muted-foreground">Materiais de comunicação</div>
                    </Link>
                    <Link
                      href="/servicos/fotografia"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Fotografia Corporativa</div>
                      <div className="text-sm text-muted-foreground">Imagem profissional</div>
                    </Link>
                    <Link
                      href="/servicos/captacao-conteudo"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Captação de Conteúdo</div>
                      <div className="text-sm text-muted-foreground">10 vídeos em 1 dia</div>
                    </Link>
                    <Link
                      href="/servicos/cobertura-eventos"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Cobertura de Eventos</div>
                      <div className="text-sm text-muted-foreground">Aftermovie em 24h</div>
                    </Link>
                    <Link
                      href="/servicos/storymaker"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">StoryMaker</div>
                      <div className="text-sm text-muted-foreground">Stories em tempo real</div>
                    </Link>
                    <Link
                      href="/servicos/video-institucional-express"
                      className="block px-4 py-2 hover:bg-accent/10 transition-colors"
                    >
                      <div className="font-medium text-foreground">Vídeo Express</div>
                      <div className="text-sm text-muted-foreground">Institucional acessível</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/precos" className="text-foreground hover:text-primary transition-colors font-medium">
              Preços
            </Link>
            <Link href="/processo" className="text-foreground hover:text-primary transition-colors font-medium">
              Processo
            </Link>
            <Link href="/cases" className="text-foreground hover:text-primary transition-colors font-medium">
              Cases
            </Link>
            <Link href="/founder" className="text-foreground hover:text-primary transition-colors font-medium">
              Founder
            </Link>
            <Link href="/sobre" className="text-foreground hover:text-primary transition-colors font-medium">
              Sobre
            </Link>
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              <Link
                href="/contato"
                onClick={() => trackEvent({
                  action: 'click',
                  category: 'cta',
                  label: 'header_diagnostico_gratuito'
                })}
              >
                Diagnóstico Gratuito
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 animate-fade-in">
            <nav className="flex flex-col gap-4">
              <div className="border-b border-border pb-4">
                <Link href="/servicos" className="font-semibold text-foreground mb-2 block" onClick={() => setIsMenuOpen(false)}>Serviços</Link>
                <div className="pl-4 space-y-2">
                  <Link
                    href="/servicos/branding"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Branding
                  </Link>
                  <Link
                    href="/servicos/sites"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sites & Landing Pages
                  </Link>
                  <Link
                    href="/servicos/video"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vídeo Institucional
                  </Link>
                  <Link
                    href="/servicos/rebranding"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Rebranding
                  </Link>
                  <Link
                    href="/servicos/design-grafico"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Design Gráfico
                  </Link>
                  <Link
                    href="/servicos/fotografia"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Fotografia Corporativa
                  </Link>
                  <Link
                    href="/servicos/captacao-conteudo"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Captação de Conteúdo
                  </Link>
                  <Link
                    href="/servicos/cobertura-eventos"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cobertura de Eventos
                  </Link>
                  <Link
                    href="/servicos/storymaker"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    StoryMaker
                  </Link>
                  <Link
                    href="/servicos/video-institucional-express"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vídeo Express
                  </Link>
                </div>
              </div>

              <Link
                href="/precos"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Preços
              </Link>
              <Link
                href="/processo"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Processo
              </Link>
              <Link
                href="/cases"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cases
              </Link>
              <Link
                href="/founder"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Founder
              </Link>
              <Link
                href="/sobre"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="/blog"
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold w-full">
                <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
                  Diagnóstico Gratuito
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
