# Sistema de Gerenciamento de Escalas Escolares

Um sistema moderno para gestão de escalas e horários de professores em ambiente escolar, construído com React, Node.js e PostgreSQL.

## Tecnologias

- Frontend: React com Vite, Tailwind CSS, shadcn/ui
- Backend: Node.js, Express
- Banco de dados: PostgreSQL (via Supabase)
- ORM: Drizzle

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis com seus valores do Supabase:
     - `SUPABASE_URL`: URL do seu projeto Supabase
     - `SUPABASE_KEY`: Chave anônima do seu projeto Supabase

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

## Deploy na Vercel

1. Configure as variáveis de ambiente no projeto Vercel:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`

2. Faça o deploy:
```bash
vercel
```