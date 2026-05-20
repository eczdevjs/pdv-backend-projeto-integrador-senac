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

✒️ Autores

### @eczdevjs