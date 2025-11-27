# TimeWise  - Gerenciador Inteligente de Tempo

Uma aplicação web fullstack para gerenciamento inteligente de tempo e atividades. Com interface mobile-first intuitiva, permite organizar atividades, visualizar estatísticas em tempo real e melhorar produtividade através de dicas e relatórios personalizados.

### Equipe
- Jesse Anthony Leonel da Silva Salviano - RA: 1362319106
- Lacielton Felix Brito - RA: 1362520591
- Lucas Vinícius de Souza Soare - RA: 1362316926
- Luan Fonseca de Lima - RA: 1362318141
- Maria Waleska Otavio dos Santos Silva - RA: 1362415094
- Victor Maximiano de Souza - RA: 1362415094

# Orientadores

Frontend: HTML5 + CSS3 + JavaScript Vanilla | Backend: Python Flask | Testes: Cypress | Documentação: Storybook

##  Funcionalidades

### Autenticação & Perfil
✅ Sistema de login/registro com validação  
✅ Perfil do usuário com estatísticas pessoais  
✅ Histórico de atividades por usuário  

### Gerenciamento de Atividades
✅ Adicionar/deletar atividades com horários  
✅ Categorização automática (Trabalho, Estudos, Exercício, Lazer)  
✅ Lista de atividades em tempo real  

### Calendário & Planejamento
✅ Calendário interativo mensal  
✅ Marcar dias com atividades  
✅ Adicionar atividades por data específica  

### Dashboard & Relatórios
✅ Gráficos em Doughnut Chart (Chart.js)  
✅ Distribuição de tempo por categoria  
✅ Dicas de produtividade variadas  

### Personalização
✅ Modo escuro/claro  
✅ Preferências de horários (dormir/acordar)  
✅ Controle de notificações  
✅ Tutorial interativo para novos usuários  

### Interface
✅ Design mobile-first responsivo  
✅ Navegação bottom-nav para dispositivos móveis  
✅ Sidebar colapsível  
✅ Paleta de cores moderna  

## Tecnologias

### Frontend
- HTML5 - Estrutura semântica
- CSS3 - Estilos responsivos com variáveis CSS
- JavaScript Vanilla - Lógica de aplicação (sem frameworks)
- Chart.js - Gráficos interativos
- LocalStorage - Armazenamento persistente

### Backend
- Python 3.8+ - Linguagem servidor
- Flask - Framework web minimalista
- Flask-CORS - Suporte a requisições cross-origin
- JSON - Formato de dados

### Testes & Documentação
- Cypress - Testes E2E automatizados
- Storybook - Documentação de componentes
- Vite - Build tool para otimização

##  Estrutura do Projeto


## Estrutura do Projeto

```bash
timewise/
├── .github/workflows/
|    ├──static.yml
├── .storybook/
│   ├── main.js
│   ├── preview.js
├── cypress/e2e/
│    ├── home.cy.js  
├── src_stories/
│   ├── assets/
│   │   ├── accessibility.png
│	├── accessibility.png
│   │   ├── addon-library.png
│   │   ├── assets.png
│   │   ├── avi-file-image.avif
│   │   ├── context.png
│   │   ├── discord.png
│   │   ├── figma-plugin.png
│   │   ├── github.svg
│   │   ├── share.png
│   │   ├── styling.png
│   │   ├── testing.png
│   │   ├── theming.png
│   │   └── youtube.svg
│   ├── Configure.mdx.swl
│   ├── Configure.mdx.swm
│   ├── Configure.mdx.swp
│   ├── Atividade.stories.js
│   ├── button.css
│   ├── Buttons.js
│   ├── Buttons.stories.js
│   ├── Configure.cypress.js
│   ├── header.css
│   ├── Headers.
│   ├── Header.stories.js
│   ├── page.css
│   ├── Pages
│   ├── Page.stories.js
│  
│
├── .gitignore
├── app.py
├── calendario.html
├── cypress.config.js
├── dashboard.html
├── index.html
├── login.html
├── package-lock.json
├── package.json
├── perfil.html
├── preferencias.html
├── README_CYPRESS_STORYBOOK.md
├── README.md
├── registro.html
├── requirements.txt
├── script.js
├── sidebar.css
├── sobre.html
└── style.css
```



##  Como Executar

### Pré-requisitos
- Node.js (npm ou yarn)
- Python 3.8+ (pip)
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### 1. Instalar Dependências

Frontend (Node.js):
```bash
npm install
```

Backend (Python):
```bash
pip install -r requirements.txt
```

### 2. Iniciar o Backend (Flask)

```bash
python app.py
```

Backend rodará em: http://localhost:5000

#### Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `api/usuarios` | Lista todos os usuários |
| POST | `api/usuarios` | Cria novo usuário |
| GET | `api/atividades` | Lista atividades (filtrado por `usuario_id`) |
| POST | `api/atividades` | Cria nova atividade |
| DELETE | `api/atividades/<id>` | Deleta atividade |
| GET | `api/relatorio` | Gera relatório (filtrado por `usuario_id`) |

### 3. Iniciar o Frontend

Desenvolvimento com Vite:
```bash
npm run dev
```

Frontend rodará em: http://localhost:5173 (ou http://localhost:8000)

Storybook (Documentação de Componentes):
```bash
npm run storybook
```

Storybook rodará em: http://localhost:6006

### 4. Testes

```bash
npm run cypress:open        #Cypress interativo
npm run cypress:run         #Testes em modo headless
npm run build-storybook     #Build estático do Storybook
```

##  Páginas da Aplicação

| Página | Rota | Descrição |
|--------|------|-----------|
| Login | `login.html` | Autenticação (entrada principal) |
| Registro | `registro.html` | Criar nova conta |
| Início | `index.html` | Homepage com dica + adicionar atividades |
| Dashboard | `dashboard.html` | Gráficos e relatórios |
| Calendário | `calendario.html` | Gerenciar atividades por data |
| Preferências | `preferencias.html` | Configurações e modo escuro |
| Perfil | `perfil.html` | Dados e estatísticas do usuário |
| Sobre | `sobre.html` | Informações sobre TimeWise |

##  Autenticação

### Sistema de Login
- Armazenamento: LocalStorage (frontend) + Backend Flask (opcional)
- Dados de teste padrão:
  - Email: `user@gmail.com`
  - Senha: `1234`

### Fluxo de Autenticação
1. Usuário acessa `login.html`
2. Preenche email/senha e envia formulário
3. Sistema valida contra usuários registrados
4. Se válido, armazena `usuarioAtual` no LocalStorage
5. Redireciona para `index.html`

### Proteção de Rotas
- Todas as páginas verificam autenticação
- Sem autenticação → redireciona para `login.html`

##  Dados & Modelos

### Usuário
```javascript
{
  id: number,
  nome: string,
  email: string,
  password: string,
  ocupacao: string,
  dataCriacao: ISO8601
}
```

### Atividade
```javascript
{
  id: number,
  nome: string,
  horaInicio: "HH:MM",
  horaFim: "HH:MM",
  usuarioId: number,
  dataSelecionada: "DD/MM/YYYY" (opcional),
  dataCriacao: ISO8601
}
```

### Categorias Automáticas
Atividades são categorizadas automaticamente pelo nome:
- Trabalho: contém trabalho
- Estudos: contém estudo, aula, aprender
- Exercício: contém exercício, esporte, corrida
- Lazer: contém lazer, "filme, jogo
- Outros: qualquer outra atividade

##  Design & Estilos

### Paleta de Cores
```css
--primary-color: #00BCD4       Cyan 
--secondary-color: #FF4444     Red 
--success-color: #4CAF50       Green
--warning-color: #FFD700       Gold 
--danger-color: #FF6B6B        Red Light 
```

### Layout
- Mobile-first: Otimizado para dispositivos móveis
- Flexbox: Layout principal
- CSS Grid: Calendário
- Responsivo: Adapta-se a desktops automaticamente

##  Persistência de Dados

Dados salvos no LocalStorage:
- `usuarios` - Array de usuários registrados
- `atividades` - Array de atividades
- `usuarioAtual` - Usuário logado
- `preferencias` - Configurações do usuário
- `tutorialVisto` - Flag de tutorial

Nota: Para persistência real, integre com banco de dados backend.

##  Testes

### Cypress E2E
```bash
# Terminal 1: inicie o servidor
npm run dev

# Terminal 2: abra Cypress
npm run cypress:open
```

Testes em `cypress/e2e/home.cy.js`

### Storybook
```bash
npm run storybook
```

Visualize componentes em http://localhost:6006

##  Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia Vite em desenvolvimento |
| `npm run build` | Build para produção |
| `npm run preview` | Preview do build |
| `npm run storybook` | Inicia Storybook |
| `npm run build-storybook` | Build estático Storybook |
| `npm run cypress:open` | Cypress interativo |
| `npm run cypress:run` | Cypress headless |

##  Troubleshooting

### Não consigo fazer login
- Use: `user@gmail.com` / `1234`
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique se LocalStorage está habilitado

### Backend não conecta
- Flask rodando em `http://localhost:5000`?
- CORS habilitado? (Flask-CORS está instalado)
- Developer Tools (F12) → Network → procure por erros

### Atividades desaparecem
- Verifique se LocalStorage foi limpo
- Tente modo privado/anônimo
- Recarregue a página


##  Contribuindo

1. Fork do repositório
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit (`git commit -m 'Adiciona nova feature'`)
4. Push (`git push origin feature/nova-feature`)
5. Abra um Pull Request

##  Licença

Licença ISC - veja o arquivo `LICENSE` para detalhes.

##  GitHub Pages
Link para a landing page do projeto
(https://jesse-salviano.github.io/TimeWise/login.html)

