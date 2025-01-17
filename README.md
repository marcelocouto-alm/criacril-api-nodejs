# Criacril API

Este projeto é uma API desenvolvida com Fastify, que permite o gerenciamento de produtos. A API permite criar, listar, atualizar e excluir produtos, e também faz o upload de imagens para o ImgBB. A seguir, é fornecido um guia de como usar a API e informações sobre a configuração do projeto.

## Recursos Principais

- **Autenticação JWT**: Proteção para rotas.
- **Gerenciamento de Produtos**: Criar, listar, atualizar e deletar produtos.
- **Gerenciamento de Usuários**: Criar, listar, atualizar e deletar usuários.
- **Upload de Imagens**: Integração com ImgBB para upload de imagens.

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SeuUsuario/criacril-api.git
   cd criacril-api
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. Crie o banco de dados PostgreSQL e as tabela de produtos e usuários. Os comandos SQL para criar as tabelas estão incluídos nos arquivos `create-products-table.js` e `create-users-table.js`.

4. **Configure o ambiente:**
   Crie um arquivo `.env` na raiz do projeto e configure as variáveis:
   ```env
   AUTH_TOKEN_SECRET=seu_segredo
   DATABASE_URL=sua_url_do_banco_de_dados
   IMG_BB_API_KEY=sua_chave_do_imgbb
   PORT=3333
   ```

---

## Estrutura do Projeto

```
criacril-api/
├── src/
│   ├── config/
│   │   └── authConfig.js
│   ├── database/
│   │   ├── products/
│   │   │   ├── create-products-table.js
│   │   │   └── products-repository.js
│   │   ├── users/
│   │   │   ├── create-users-table.js
│   │   │   └── users-repository.js
│   │   └── db.js
│   ├── middlewares/
│   │   └── authHook.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth-routes.js
│   │   ├── product-routes.js
│   │   └── user-routes.js
│   └── services/
│       └── imgbb-service.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
├── routes.http
└── server.js
```

---

## Requisitos

Antes de rodar o projeto, você precisa garantir que tenha o seguinte instalado:

- Node.js (v18 ou superior)
- Uma chave de API para o ImgBB (você pode obter em [ImgBB](https://imgbb.com))

---

## Serviços Utilizados

### ImgBB

Para upload de imagens, a API utiliza o serviço ImgBB. A imagem é enviada em formato Base64 e retorna uma URL pública.

- Função: uploadImageToImgBB(imageBase64)
- Dependências:
  - axios

---

## Rotas Disponíveis

### Autenticação

- **Login**:
  ```http
  POST /login
  Content-Type: application/json
  {
    "email": "exemplo@teste.com",
    "password": "sua_senha"
  }
  ```

### Produtos

- **Criar Produto**:
  ```http
  POST /product
  Content-Type: application/json
  Authorization: Bearer <seu_token>
  {
    "title": "Produto Teste",
    "description": "Descrição do produto",
    "imageUrl": "iVBOR...",
    "height": 1.80,
    "width": 1.50,
    "price": 10.99
  }
  ```
- **Listar Produtos**:
  ```http
  GET /products?search=
  Authorization: Bearer <seu_token>
  ```
- **Atualizar Produto**:
  ```http
  PUT /product/:id
  Content-Type: application/json
  Authorization: Bearer <seu_token>
  {
    "title": "Produto Atualizado",
    "description": "Descrição atualizada",
    "imageUrl": "iVBOR...",
    "height": 2.00,
    "width": 1.60,
    "price": 15.99
  }
  ```
- **Deletar Produto**:
  ```http
  DELETE /product/:id
  Authorization: Bearer <seu_token>
  ```

### Usuários

- **Criar Usuário**:
  ```http
  POST /user
  Content-Type: application/json
  {
    "username": "usuario_teste",
    "email": "exemplo@teste.com",
    "password": "senha"
  }
  ```
- **Listar Usuários**:
  ```http
  GET /users?search=
  Authorization: Bearer <seu_token>
  ```
- **Atualizar Usuário**:
  ```http
  PUT /user/:id
  Content-Type: application/json
  Authorization: Bearer <seu_token>
  {
    "username": "usuario_atualizado",
    "email": "atualizado@teste.com",
    "password": "nova_senha"
  }
  ```
- **Deletar Usuário**:
  ```http
  DELETE /user/:id
  Authorization: Bearer <seu_token>
  ```

---

## Rodando o Projeto

1. **Inicie o servidor:**
   ```bash
   npm start
   ```

2. **Acesse o servidor:**
   O servidor será iniciado em `http://localhost:3333`.

---

## Dependências

- **Axios**: Cliente HTTP para realizar requisições.
- **Bcrypt**: Biblioteca para hash e verificação de senhas.
- **Buffer**: Manipulação de dados binários no Node.js.
- **Dotenv**: Carrega variáveis de ambiente a partir de arquivos .env.
- **Fastify**: Framework web.
- **Fastify-JWT**: Gerenciamento de autenticação.
- **Postgres**: Conexão com banco de dados.

Para ver a lista completa, consulte o arquivo `package.json`.

