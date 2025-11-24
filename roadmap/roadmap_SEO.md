# Roadmap de SEO: Andorinha Audiovisual

Este roadmap foca em consolidar o rebranding de "Marketing" para "Audiovisual", garantir a indexação correta pelo Google e otimizar a performance técnica do site Next.js.

## Fase 1: Auditoria Pós-Rebranding (Imediato)
**Objetivo:** Garantir que a mudança de nome não prejudique o tráfego atual e que o Google entenda a nova identidade.

- [x] **Auditoria de Links Internos**: Verificar se restou algum link quebrado ou texto âncora antigo ("Marketing").
- [x] **Sitemap.xml**: Gerar e validar o sitemap atualizado com todas as rotas.
- [x] **Robots.txt**: Garantir que não estamos bloqueando páginas importantes.
- [ ] **Google Search Console**:
    - [ ] Verificar propriedade do domínio.
    - [ ] Enviar novo sitemap.
    - [ ] Monitorar erros de rastreamento (404s).
- [x] **Canonical URLs**: Verificar se todas as páginas apontam para si mesmas como canônicas para evitar conteúdo duplicado.

## Fase 2: Otimização On-Page (Conteúdo)
**Objetivo:** Posicionar o site para termos relacionados a "Audiovisual", "Vídeo" e "Produção".

- [x] **Revisão de Palavras-Chave**:
    - [x] Foco: "Produtora de Vídeo", "Audiovisual Estratégico", "Filmmaker", "Edição de Vídeo".
    - [x] Secundário: "Marketing de Conteúdo" (manter como contexto, mas não foco principal).
- [x] **Meta Tags (Títulos e Descrições)**:
    - [x] Revisar CTR (Click-Through Rate): Títulos atrativos e descrições com call-to-action.
    - [x] Garantir que "Audiovisual" esteja nos primeiros 60 caracteres do Title.
- [x] **Heading Structure (H1-H6)**:
    - [x] Garantir apenas um H1 por página.
    - [x] H2 e H3 contendo palavras-chave semânticas.
- [x] **Otimização de Imagens**:
    - [x] Alt Text: Revisar descrições das imagens para incluir termos de audiovisual.
    - [x] Nomes de arquivo: Garantir que arquivos novos tenham nomes descritivos (ex: `producao-video-institucional.jpg`).

## Fase 3: SEO Técnico e Performance (Core Web Vitals)
**Objetivo:** Melhorar a experiência do usuário e sinais de ranking técnico.

- [ ] **Lighthouse Audit**: Rodar auditoria completa e focar em atingir score 90+ em Performance e SEO.
- [x] **Otimização de Carregamento**:
    - [x] Verificar uso correto do componente `<Image>` do Next.js (prioridade LCP).
    - [x] Lazy loading de componentes pesados (ex: vídeos, mapas, iframes).
    - [x] Otimização de fontes (Next/Font).
- [x] **Metadados Sociais (Open Graph)**:
    - [x] Validar imagens de compartilhamento (OG Images) no WhatsApp/LinkedIn.
    - [x] Testar títulos e descrições no Facebook Debugger / LinkedIn Post Inspector.

## Fase 4: Dados Estruturados (Schema.org)
**Objetivo:** Ganhar destaque nos resultados de busca com Rich Snippets.

- [x] **ProfessionalService / VideoProductionService**:
    - [x] Refinar o schema atual da Home.
    - [x] Adicionar `priceRange`, `areaServed`, `openingHours`.
- [x] **Service Schema**:
    - [x] Implementar schema específico nas páginas de serviço (ex: `Service` type).
- [x] **FAQ Schema**:
    - [x] Adicionar dados estruturados de FAQ nas páginas de serviços que têm perguntas frequentes.
- [x] **BreadcrumbList**:
    - [x] Implementar schema de navegação para aparecer nos resultados de busca.
- [ ] **VideoObject**:
    - [ ] Se houver portfólio de vídeo, adicionar schema de vídeo para aparecer na aba "Vídeos" do Google.

## Fase 5: SEO Local (Google Meu Negócio)
**Objetivo:** Capturar buscas locais ("Produtora de vídeo perto de mim").

- [ ] **Google Business Profile**:
    - [ ] Atualizar Nome da Empresa.
    - [ ] Atualizar Categoria (de Agência de Marketing para Produtora de Vídeo/Serviços de Mídia).
    - [ ] Atualizar descrição e serviços.
    - [ ] Adicionar fotos novas/vídeos.
- [ ] **Citações Locais**: Atualizar nome em outros diretórios se houver (Bing Places, Apple Maps).
