import { fastify } from 'fastify';
import { DataBasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DataBasePostgres();

server.post('/product', async (request, response) => {
  try {
    const { title, description, imageUrl, height, width, price } = request.body;

    await database.create({
      title,
      description,
      imageUrl,
      height,
      width,
      price,
    });

    return response.status(201).send({ message: 'Product created successfully.' });
  } catch (error) {
    console.error('Error creating product:', error);
    return response.status(500).send({ error: 'Failed to create product.' });
  }
});

server.get('/products', async (request, response) => {
  try {
    const search = request.query.search;
    const products = await database.list(search);

    return response.status(200).send(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return response.status(500).send({ error: 'Failed to fetch products.' });
  }
});

server.put('/product/:id', async (request, response) => {
  try {
    const productId = request.params.id;
    const { title, description, imageUrl, height, width, price } = request.body;

    await database.update(productId, {
      title,
      description,
      imageUrl,
      height,
      width,
      price,
    });

    return response.status(200).send({ message: 'Product updated successfully.' });
  } catch (error) {
    console.error(`Error updating product with ID ${request.params.id}:`, error);
    return response.status(500).send({ error: 'Failed to update product.' });
  }
});

server.delete('/product/:id', async (request, reply) => {
  try {
    const productId = request.params.id;

    const rowsDeleted = await database.delete(productId);

    if (rowsDeleted === 0) {
      return reply.status(404).send({ error: 'Product not found.' });
    }

    return reply.status(200).send({ message: 'Product deleted successfully.' });
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    return reply.status(500).send({ error: 'Failed to delete product.' });
  }
});

server.listen({
  port: process.env.PORT ?? 3333,
})