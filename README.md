<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">Places API built with NestJs and Postgres</p>
  
## Description

Places API that counts with CRUD of places, users create route and authentication route.

Crie uma API simples para gerenciar lugares (CRUD). Esta API deve permitir:
   
    • Criar um usuario
    • Autenticar um usuario
    • Criar um lugar
    • Editar um lugar
    • Deletar um lugar
    • Obter um lugar específico ou todos os locais
    • Listar lugares e filtrá-los por nome

Observações:
    
    • Você deve utilizar o banco PostgreSQL;

Um local deve ter os seguintes campos:
   
    •  name
    •  city
    •  state
    •  created at
    •  updated at

Requisitos:
    
    • Todas as respostas da API devem ser JSON
    • Forneça um arquivo README com instruções de uso (como executar, endpoints, etc.)
    • Forneça um ambiente de teste docker

Recomendações:
    • Testes, testes e testes
    • Código em inglês (métodos, classes, variáveis, etc)

Avaliação:
    
    • Estrutura, arquitetura e organização do projeto
    • Boas práticas de programação

## Installation

```bash
$ npm install
```
## Before running the app
```bash
# 1. RUN npm install;
# 2. RUN docker compose up;
# 3. Fill in all environment variables;
# 4. Make sure the database is created;
# 5. Run all migrations;
# 6. Reload the app container;
# 7. Open http://localhost:3000/docs in your browser.
```
## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Database Commands

```bash
# run migrations
$ npm run migration:run
```
## Test Commands

```bash
# run coverage
$ npm run test:cov
```
## Support

To facilitate the consumption of the API, the Swagger UI library was used, the documentation is located in the "/docs" route.
## Contacts

- Linkedin - [Silasoli](https://www.linkedin.com/in/silasoli/)
- Website - [Silasoli](https://silasoli.github.io/)
- Github - [Silasoli](https://github.com/silasoli/)

