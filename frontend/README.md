# Quiz de Capitais do Mundo

Sistema de quiz para testar conhecimentos gerais sobre capitais do mundo.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1
- React Hook Form 7.53.1
- Zod 3.23.8

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Providers globais
│   └── router.tsx         # Configuração de rotas
├── pages/                 # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/             # Página inicial
│   └── NotFound/         # Página 404
├── core/                  # Componentes e lógica compartilhada
│   ├── components/       # Componentes genéricos
│   ├── lib/              # Configurações de bibliotecas
│   ├── types/            # Tipos globais
│   └── utils/            # Funções utilitárias
├── domain/               # Domínios de negócio (a serem implementados)
└── assets/               # Assets estáticos
    └── styles/           # Estilos globais
```

## Configuração

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## Arquitetura

O projeto segue uma arquitetura modular baseada em domínios:

- **app/**: Configuração e inicialização da aplicação
- **pages/**: Componentes de página para roteamento
- **core/**: Componentes e lógica reutilizáveis
- **domain/**: Módulos de negócio específicos (a serem implementados)

## Padrões de Código

- TypeScript strict mode habilitado
- Componentes funcionais com hooks
- Tailwind CSS para estilização
- TanStack Query para gerenciamento de estado do servidor
- React Hook Form + Zod para formulários e validação

## Próximos Passos

1. Implementar domínio de quiz
2. Criar componentes de quiz
3. Integrar com API backend
4. Adicionar testes

## Licença

Todos os direitos reservados © 2024