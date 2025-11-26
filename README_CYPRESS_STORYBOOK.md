Guia rápido — Cypress e Storybook (TimeWise)

Passos recomendados (zsh):

1) Inicializar npm (se ainda não tiver um `package.json` configurado):

   npm init -y

2) Instalar ferramentas de desenvolvimento (localmente no projeto):

   npm install --save-dev cypress http-server

3) Instalar Storybook para HTML (use o inicializador do Storybook):

   npx sb init --type html

   Observação: `sb init` adiciona dependências e cria a pasta `.storybook` automaticamente. Já criei um `.storybook/main.js` de exemplo no repositório; se você rodar `npx sb init --type html`, ele poderá sobrescrever ou complementar essa configuração.

4) Scripts úteis (já atualizados em `package.json`):

   - `npm run start` : serve os arquivos estáticos em `http://localhost:8000` (usa `http-server`).
   - `npm run cypress:open` : abre o runner interativo do Cypress.
   - `npm run cypress:run` : executa testes Cypress em modo headless.
   - `npm run storybook` : inicia Storybook em `http://localhost:6006`.
   - `npm run build-storybook` : gera a versão estática do Storybook.

5) Executando Cypress (passos):

   # certifique-se de que o servidor estático esteja rodando
   npm run start

   # em outra aba do terminal, abra o Cypress
   npx cypress open

   # ou executar headless
   npx cypress run

6) Executando Storybook:

   # instala e inicializa (se ainda não fez)
   npx sb init --type html

   # iniciar o servidor Storybook
   npm run storybook

7) Arquivos que adicionei como exemplos:

   - `cypress.config.js` : configuração mínima apontando `baseUrl` para `http://localhost:8000`.
   - `cypress/e2e/home.cy.js` : teste simples que carrega `index.html` e testa elementos básicos.
   - `.storybook/main.js` : configuração minimal para `@storybook/html`.
   - `src/stories/Atividade.stories.js` : story de exemplo para o componente de atividade.

Notas e dicas:

- Uso do servidor: você pode continuar usando `python3 -m http.server 8000`, mas o script `npm run start` usa `http-server` (instale via npm) para controle melhor de cache e headers.
- Storybook normalmente se integra melhor a frameworks (React/Vue/Angular). Para projetos estáticos HTML, `@storybook/html` funciona bem para documentar e visualizar componentes.
- Cypress precisa que o site esteja servindo em uma URL; use `npm run start` ou `python -m http.server` antes de rodar os testes.
- Se quiser, eu posso:
  - A) Ajustar `script.js` para adicionar atributos `data-testid` para facilitar os seletores de testes.
  - B) Gerar mais stories (header, lista de atividades, forms) e testes Cypress correspondentes.

Quer que eu gere `data-testid` nos elementos ou crie mais stories/testes automáticos?