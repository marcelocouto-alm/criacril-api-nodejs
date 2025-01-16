import fastifyPlugin from 'fastify-plugin';
import { UsersRepository } from '../database/users/users-repository.js';
import bcrypt from 'bcrypt';

const database = new UsersRepository();

const authRoutes = async (server, options) => {
  server.post('/user', async (request, response) => {
    try {
      const { username, email, password } = request.body;

      if (!username || !email || !password) {
        return response.status(400).send({ error: 'Username, email, and password are required.' });
      }

      // Gera um hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      await database.createUser({ username, email, password: hashedPassword });

      return response.status(201).send({
        message: 'User created successfully.'
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return response.status(500).send({ error: 'Failed to create user.' });
    }
  });

  server.get('/users', async (request, response) => {
    try {
      const search = request.query.search;
      const products = await database.list(search);

      return response.status(200).send(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      return response.status(500).send({ error: 'Failed to fetch products.' });
    }
  });

  server.put('/user/:id', async (request, response) => {
    let userId;

    try {
      userId = request.params.id;

      const rowsUpdated = await database.update(userId, request.body);

      if (rowsUpdated === 0) {
        return response.status(404).send({ error: 'User not found.' });
      }

      return response.status(200).send({
        message: 'User updated successfully.',
        userId
      });
    } catch (error) {
      console.error(`Error updating user with ID ${userId || 'unknown'}:`, error.message);
      return response.status(500).send({ error: 'Failed to update user.' });
    }
  });

  server.delete('/user/:id', async (request, response) => {
    try {
      const userId = request.params.id;

      const rowsDeleted = await database.delete(userId);

      if (rowsDeleted === 0) {
        return response.status(404).send({ error: 'User not found.' });
      }

      return response.status(200).send({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error(error);
      return response.status(500).send({ error: 'Failed to delete user.' });
    }
  });
};

export default fastifyPlugin(authRoutes);