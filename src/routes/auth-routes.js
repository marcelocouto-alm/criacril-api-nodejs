import fastifyPlugin from 'fastify-plugin';
import { UsersRepository } from '../database/users/users-repository.js';

const database = new UsersRepository();

const authRoutes = async (server, options) => {
  const JWT_SECRET = process.env.AUTH_TOKEN_SECRET;

  server.post('/login', async (request, response) => {
    try {
      const { username, email, password } = request.body;

      if (!username || !email || !password) {
        return response.status(400).send({ error: 'Username, email, and password are required.' });
      }

      await database.createUser({ username, email, password });

      return response.status(201).send({
        message: 'User created successfully.'
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return response.status(500).send({ error: 'Failed to create user.' });
    }
  });

  server.get('/login', async (request, response) => {
    try {
      const search = request.query.search;
      const products = await database.list(search);

      return response.status(200).send(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return response.status(500).send({ error: 'Failed to fetch products.' });
    }
  });
};

export default fastifyPlugin(authRoutes);