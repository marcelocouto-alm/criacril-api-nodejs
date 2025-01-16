import fastifyPlugin from 'fastify-plugin';
import { UsersRepository } from '../database/users/users-repository.js';

const database = new UsersRepository();

const authRoutes = async (server, options) => {
  const JWT_SECRET = process.env.AUTH_TOKEN_SECRET;

  server.post('/login', async (request, response) => {
    const { username, password } = request.body;

    const user = { username: 'admin', password: 'senha123' };

    if (username !== user.username || password !== user.password) {
      return response.status(401).send({ error: 'Invalid credentials' });
    }

    // Gerar o token JWT
    const token = server.jwt.sign({ username: user.username });

    return response.send({ token });
  });

};

export default fastifyPlugin(authRoutes);