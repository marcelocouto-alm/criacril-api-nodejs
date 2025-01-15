import fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';

const server = fastify();

const JWT_SECRET = process.env.AUTH_TOKEN_SECRET;

// Registra o plugin JWT
server.register(fastifyJwt, {
  secret: JWT_SECRET
});
