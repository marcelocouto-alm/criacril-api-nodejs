import fastifyPlugin from 'fastify-plugin';
import { UsersRepository } from '../database/users/users-repository.js';
import bcrypt from 'bcrypt';

const database = new UsersRepository();

const authRoutes = async (server) => {
  server.post('/login', async (request, response) => {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response.status(400).send({ error: 'Email and password are required.' });
      }

      const user = await database.findUserByEmail(email);

      if (!user) {
        return response.status(401).send({ error: 'Invalid email or password.' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return response.status(401).send({ error: 'Invalid email or password.' });
      }

      const token = server.jwt.sign(
        { username: user.username },
        { expiresIn: '7d' }
      );

      return response.send({ message: 'Login successful.', token });
    } catch (error) {
      console.error('Error during login:', error);
      return response.status(500).send({ error: 'Failed to log in.' });
    }
  });
};

export default fastifyPlugin(authRoutes);