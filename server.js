import { fastify } from 'fastify';
import { DataBasePostgres } from './src/database/database-postgres.js';
import { uploadImageToImgBB } from './src/services/imgbb-service.js'

const server = fastify();
const database = new DataBasePostgres();

server.post('/product', async (request, response) => {
  try {
    const { imageUrl, ...rest } = request.body;

    if (!imageUrl) {
      return response.status(400).send({ error: 'No image provided' });
    }

    // Extrair o conteúdo da base64 (removendo o prefixo "data:image/png;base64,")
    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');

    // Chamar a função para fazer upload da imagem para o ImgBB
    const imageUrlUploaded = await uploadImageToImgBB(base64Data);

    const product = await database.create({
      imageUrl: imageUrlUploaded,
      ...rest
    });

    return response.status(201).send({
      message: 'Product created successfully.',
      product
    });
  } catch (error) {
    console.error('Error handling file upload or product creation:', error);
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
  let productId;

  try {
    productId = request.params.id;

    const { imageUrl, ...rest } = request.body;

    if (!imageUrl) {
      return response.status(400).send({ error: 'No image provided' });
    }

    const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageUrlUploaded = await uploadImageToImgBB(base64Data);

    const rowsUpdated = await database.update(productId, {
      imageUrl: imageUrlUploaded,
      ...rest
    });

    if (rowsUpdated === 0) {
      return response.status(404).send({ error: 'Product not found.' });
    }

    return response.status(200).send({
      message: 'Product updated successfully.',
      productId
    });
  } catch (error) {
    console.error(`Error updating product with ID ${productId || 'unknown'}:`, error.message);
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
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
});
