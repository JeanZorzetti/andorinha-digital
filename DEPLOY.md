# Guia de Deploy

## Variáveis de Ambiente

Para fazer o deploy desta aplicação com sucesso (ex: na Vercel), você deve configurar as seguintes variáveis de ambiente nas configurações do seu projeto:

### Obrigatório

- **`DATABASE_URL`**: A string de conexão para o seu banco de dados PostgreSQL.
    - Formato: `postgresql://USUARIO:SENHA@HOST:PORTA/BANCO?schema=public`
    - Exemplo (Supabase/Neon/VPS): `postgresql://postgres:minhasenha@db.exemplo.com:5432/andorinha?schema=public`
    - **Importante**: Certifique-se de que seu banco de dados esteja acessível pela internet (ou pelos IPs da Vercel).

### Processo de Build

O projeto está configurado para rodar `prisma generate` automaticamente antes do build através do script `postinstall`. Isso requer que uma `DATABASE_URL` válida esteja presente durante a fase de build.

## Resolução de Problemas

### "Environment variable not found: DATABASE_URL"
Se você ver este erro durante o build, significa que você não adicionou a `DATABASE_URL` nas configurações do seu projeto na Vercel.
1. Vá para o Dashboard do seu Projeto na Vercel.
2. Clique em **Settings** (Configurações) > **Environment Variables** (Variáveis de Ambiente).
3. Adicione uma nova variável:
   - Key (Chave): `DATABASE_URL`
   - Value (Valor): [Sua String de Conexão PostgreSQL]
   - Environments: Production, Preview, Development (todos marcados)
4. Faça o Redeploy.
