
# Criacril API

Este projeto é uma API desenvolvida com Fastify, que permite o gerenciamento de produtos. A API permite criar, listar, atualizar e excluir produtos, e também faz o upload de imagens para o ImgBB. A seguir, é fornecido um guia de como usar a API e informações sobre a configuração do projeto.

## Funcionalidades

A API tem os seguintes endpoints:

- **POST /product**: Cria um novo produto, fazendo upload da imagem para o ImgBB.
- **GET /products**: Lista todos os produtos cadastrados, com a opção de pesquisa pelo título.
- **PUT /product/:id**: Atualiza um produto específico, incluindo o upload de uma nova imagem para o ImgBB.
- **DELETE /product/:id**: Exclui um produto específico.

## Requisitos

Antes de rodar o projeto, você precisa garantir que tenha o seguinte instalado:

- Node.js (v18 ou superior)
- PostgreSQL
- Uma chave de API para o ImgBB (você pode obter em [ImgBB](https://imgbb.com))

## Serviços Utilizados

### ImgBB

Para upload de imagens, a API utiliza o serviço ImgBB. A imagem é enviada em formato Base64 e retorna uma URL pública.

- Função: uploadImageToImgBB(imageBase64)
- Dependências:
  - axios

## Dependências

- Fastify: Framework web para Node.js.
- Postgres: Cliente PostgreSQL.
- Axios: Para chamadas HTTP (ex.: upload de imagens para o ImgBB).
- Dotenv: Gerenciamento de variáveis de ambiente.

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/SeuUsuario/criacril-api.git
```

2. Navegue até o diretório do projeto:

```bash
cd criacril-api
```

3. Instale as dependências:

```bash
npm install
```

4. Crie o banco de dados PostgreSQL e a tabela de produtos. O comando SQL para criar a tabela está incluído no arquivo de inicialização.

5. Defina a variável de ambiente `IMG_BB_API_KEY` com sua chave de API ImgBB. Você pode configurar essa variável no arquivo `.env`:

```bash
IMG_BB_API_KEY=SuaChaveDeAPI
```

6. Inicie o servidor:

```bash
npm start
```

O servidor estará disponível em `http://localhost:3333`.

## Como Usar

### 1. Criar um Produto

Requisição: `POST /product`

Corpo da Requisição:
```json
{
  "title": "Produto Exemplo",
  "description": "Descrição do produto.",
  "imageUrl": "data:image/png;base64,...",
  "height": 10.5,
  "width": 20.3,
  "price": 100.0
}
```

Resposta de Sucesso:
```json
{
  "message": "Product created successfully.",
  "product": {
    "id": "UUID-do-produto",
    "title": "Produto Exemplo",
    "description": "Descrição do produto.",
    "imageUrl": "URL-da-imagem-uploadada",
    "height": 10.5,
    "width": 20.3,
    "price": 100.0
  }
}
```

### 2. Listar Produtos

Requisição: `GET /products?search=Produto`

Resposta de Sucesso:
```json
[
  {
    "id": "UUID-do-produto",
    "title": "Produto Exemplo",
    "description": "Descrição do produto.",
    "imageUrl": "URL-da-imagem-uploadada",
    "height": 10.5,
    "width": 20.3,
    "price": 100.0
  }
]
```

### 3. Atualizar um Produto

Requisição: `PUT /product/:id`

Corpo da Requisição:
```json
{
  "title": "Produto Atualizado",
  "description": "Nova descrição.",
  "imageUrl": "data:image/png;base64,...",
  "height": 12.5,
  "width": 22.3,
  "price": 120.0
}
```

Resposta de Sucesso:
```json
{
  "message": "Product updated successfully.",
  "productId": "UUID-do-produto"
}
```

### 4. Excluir um Produto

Requisição: `DELETE /product/:id`

Resposta de Sucesso:
```json
{
  "message": "Product deleted successfully."
}
```

## Estrutura de Arquivos

O projeto possui a seguinte estrutura:

```
criacril-api/
├── src/
│   ├── database/
│   │   └── database-postgres.js
│   ├── models/
│   │   └── Product.js
│   ├── services/
│   │   └── imgbb-service.js
├── .env
├── package.json
├── README.md
└── server.js
```
