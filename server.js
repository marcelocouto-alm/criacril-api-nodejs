import fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import authHook from './src/middlewares/auth-hook.js';
import authRoutes from './src/routes/auth-routes.js';
import userRoutes from './src/routes/user-routes.js';
import productRoutes from './src/routes/product-routes.js';

const server = fastify();

// Configura o plugin JWT
const JWT_SECRET = process.env.AUTH_TOKEN_SECRET;
server.register(fastifyJwt, {
  secret: JWT_SECRET
});

// Aplica o hook global para proteger todas as rotas
server.addHook('onRequest', authHook);

// Registra as rotas
server.register(authRoutes);
server.register(userRoutes);
server.register(productRoutes);

// Inicializa o servidor
server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});