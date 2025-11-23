import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram, Facebook, Mail, Phone, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Coluna 1 - Logo & Tagline */}
          <div>
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <Image
                src="/images/logo/logo-principal-branco.svg"
                alt="Andorinha Audiovisual"
                width={96}
                height={96}
                className="h-24 w-auto"
              />
            </Link>

            <p className="text-lg font-semibold text-background mb-3">
              Voe certo. Voe alto.
            </p>

            <p className="text-sm text-background/70 mb-6 leading-relaxed">
              Audiovisual estratégico através de projetos pontuais e transparentes para PMEs.
            </p>

            <div>
              <h4 className="font-semibold text-sm text-background mb-3">Redes Sociais</h4>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/company/andorinha-marketing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-background" />
                </a>
                <a
                  href="https://instagram.com/andorinhamarketing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-background" />
                </a>
                <a
                  href="https://facebook.com/andorinhamarketing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-background" />
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Serviços */}
          <div>
            <h3 className="font-semibold text-lg text-background mb-4">Serviços</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/servicos/branding" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Branding
                </Link>
              </li>
              <li>
                <Link href="/servicos/sites" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Sites & Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/servicos/video" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Vídeo Institucional
                </Link>
              </li>
              <li>
                <Link href="/servicos/rebranding" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Rebranding
                </Link>
              </li>
              <li>
                <Link href="/servicos/design-grafico" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Design Gráfico
                </Link>
              </li>
              <li className="pt-1">
                <Link href="/precos" className="text-sm text-primary hover:text-primary/80 font-semibold transition-colors inline-block">
                  Ver Todos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Empresa */}
          <div>
            <h3 className="font-semibold text-lg text-background mb-4">Empresa</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/sobre" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/processo" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Processo
                </Link>
              </li>
              <li>
                <Link href="/cases" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Cases
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/precos" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Preços
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-background/70 hover:text-primary transition-colors inline-block">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h3 className="font-semibold text-lg text-background mb-4">Contato</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="mailto:contato@andorinha.roilabs.com.br"
                  className="flex items-start gap-2 text-sm text-background/70 hover:text-primary transition-colors group"
                >
                  <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="break-all">contato@andorinha.roilabs.com.br</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-primary transition-colors group"
                >
                  <Phone className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>(11) 99999-9999</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm text-background/70">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>(11) 99999-9999</span>
                </div>
              </li>
            </ul>

            <p className="text-xs text-background/60">
              Seg-Sex: 9h às 18h<br />
              Sáb: 9h às 13h (WhatsApp)<br />
              Dom: Fechado
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/60 text-center md:text-left">
              © 2025 Andorinha Audiovisual. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
              <Link href="/privacidade" className="text-background/60 hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="text-background/60 hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <span className="text-background/60">
                Desenvolvido por Andorinha Audiovisual
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
