Markdown
# 🛒 E-PDV System - Backend (ou Frontend)

Este repositório contém o código do **Backend** do projeto MVP de sistema de automação comercial para microempreendedores, desenvolvido para o Projeto Integrador do Senac.

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
   git clone https://github.com/eczdevjs/pdv-backend-projeto-integrador-senac.git
Acesse a pasta do projeto:

Bash
cd seu-repositorio-backend
Instale as dependências:

Bash
npm install

Configure as variáveis de ambiente:

Duplique o arquivo .env.example e renomeie para .env
Prencha-o com as informações.

Abra o seu gerenciador do PostgreSQL (pgAdmin ou terminal) e crie um banco de dados vazio.

Preencha as credenciais de conexão do seu banco de dados localno arquivo .env .


Caso queira iniciar com o banco de dados totalmente limpo:
Bash
npm run db:clean

Opção com banco de dados populado como demonstração:
Bash
npm run db:demo

Inicie o servidor de desenvolvimento:

Bash
npm run server

O servidor iniciará na porta 3001 - acesse http://localhost:3001

📌 Links do Projeto
Repositório Frontend: https://github.com/eczdevjs/pdv-frontend-projeto-integrador-senac

Demonstração em Vídeo (YouTube): https://www.youtube.com/watch?v=k_fSXlfXJnE

✒️ Autores
@eczdevjs


