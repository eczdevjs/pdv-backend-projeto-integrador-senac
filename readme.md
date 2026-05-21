# 🛒 E-PDV System - Backend

Este repositório contém o código do **Backend** do projeto MVP de sistema de automação comercial para microempreendedores, desenvolvido para o Projeto Integrador do Senac.

📌 Links do Projeto
- Repositório Frontend: https://github.com/eczdevjs/pdv-frontend-projeto-integrador-senac
- ▶️ Demonstração em Vídeo (YouTube): https://www.youtube.com/watch?v=k_fSXlfXJnE

## 🚀 Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina:
- Git
- Node.js (versão 18 ou superior)
- Banco de dados PostgreSQL ativo

### Passo a passo

1. Clone este repositório:
```bash
git clone [https://github.com/eczdevjs/pdv-backend-projeto-integrador-senac.git](https://github.com/eczdevjs/pdv-backend-projeto-integrador-senac.git)
```
2. Acesse a pasta do projeto:
```bash
cd pdv-backend-projeto-integrador-senac
```

3. Instale as dependências:
```bash 
npm install
```

4. Configure as variáveis de ambiente:

   4.1- Abra o seu gerenciador do PostgreSQL (pgAdmin ou terminal) e crie um banco de dados vazio.

   4.2- Duplique o arquivo .env.example e renomeie para .env.

   4.3 -Preencha conforme o modelo, as credenciais de conexão do seu banco de dados local no arquivo .env.

5. Inicialize o banco de dados conforme sua preferência:
#### Opção A — Com banco de dados populado para demonstração (produtos, fornecedores, fotos, estoque):
```bash 
    npm run db:demo
```

##### Opção B — Banco de dados limpo:
```bash 
    npm run db:clean
```
6. Inicie o servidor de desenvolvimento:
```bash 
    npm run server
```

O servidor iniciará na porta 3001 — acesse http://localhost:3001

---

## 🌐 Como Testar a API (Insomnia)

Para facilitar os testes das rotas do **E-PDV**, disponibilizamos uma coleção pronta do Insomnia com todos os endpoints estruturados (Autenticação, Clientes, Produtos, Estoque, etc.).

### 🛠️ Passo 1: Importar a Coleção
1. Abra o **Insomnia**.
2. No canto superior esquerdo, clique em **Import** (ou vá em *Preferences > Data > Import Data*).
3. Selecione a opção **From File** (A partir de um arquivo).
4. Navegue até a pasta do projeto e selecione o arquivo: `/docs/insomnia_collection.json`.

### 🔑 Passo 2: Entendendo a Estratégia de Autenticação (Bearer Token)
A API utiliza segurança baseada em **JWT (JSON Web Token)** com a estratégia **Bearer Token** para proteger rotas sensíveis. Para testar rotas protegidas, siga o fluxo abaixo:

*Crie um usuário. Em seguida, para logar em uma seção:

1. Na pasta **TOKENS**, selecione a requisição **GERAR TOKEN**.
2. Envie um e-mail e senha válidos no corpo (Body) da requisição para efetuar o login.
3. Na resposta da API, copie o código do `token` gerado.
4. Vá até a rota que deseja testar (ex: Criar Produto), acesse a aba **Header**, e substitua o texto `INSERIR_TOKEN_AQUI` pelo token copiado, mantendo a palavra `Bearer` antes dele.
   * *Exemplo final do Header:* `Authorization: Bearer eyJhbGciOiJIUzI1Ni...`

---

✒️ Autores

### @eczdevjs