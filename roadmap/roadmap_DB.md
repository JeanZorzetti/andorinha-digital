# Roadmap de Banco de Dados: PostgreSQL + Prisma ORM

Este roadmap detalha a migração do conteúdo estático (arquivos `.ts`) para um banco de dados relacional PostgreSQL, gerenciado pelo Prisma ORM. O objetivo é preparar o terreno para o futuro Painel Administrativo.

## Fase 1: Configuração do Ambiente
**Objetivo:** Preparar o projeto para conectar ao banco de dados.

- [x] **Instalação do Prisma**:
    - [x] Instalar `prisma` como dependência de desenvolvimento.
    - [ ] Instalar `@prisma/client`.
    - [x] Inicializar o Prisma (`npx prisma init`).
- [ ] **Configuração do Banco de Dados**:
    - [ ] Configurar `docker-compose.yml` para rodar PostgreSQL localmente (para desenvolvimento).
    - [ ] Configurar variáveis de ambiente (`DATABASE_URL`) no `.env`.
    - [ ] Documentar credenciais de acesso para o Easypanel (VPS).

## Fase 2: Modelagem de Dados (Schema)
**Objetivo:** Traduzir as interfaces TypeScript atuais para tabelas do banco.

- [ ] **Modelagem do Blog**:
    - [ ] Criar model `BlogPost` (id, title, content, slug, etc.).
    - [ ] Criar model `Author` (relação com posts).
    - [ ] Criar model `Category` (relação com posts).
- [ ] **Modelagem de Cases**:
    - [ ] Criar model `CaseStudy` (id, client, challenge, solution, results, etc.).
    - [ ] Criar model `Testimonial` (relação com cases).
- [ ] **Modelagem de Serviços**:
    - [ ] Criar model `Service` (id, title, price, features, etc.).
- [ ] **Variáveis de Produção**:
    - [ ] Definir como as variáveis de ambiente serão injetadas no Easypanel.
