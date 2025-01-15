import { sql } from '../db.js';
import { Product } from '../../models/Product.js';

export class ProductsRepository {
  async list(search = '') {
    const query = search
      ? await sql`SELECT * FROM products WHERE title ILIKE ${'%' + search + '%'}`
      : await sql`SELECT * FROM products`;
    return query;
  }

  async create(data) {
    const product = new Product(data);

    await sql`
    INSERT INTO Products (Title, Description, ImageUrl, Height, Width, Price)
    VALUES (
      ${product.title}, 
      ${product.description}, 
      ${product.imageUrl}, 
      ${product.height}, 
      ${product.width}, 
      ${product.price}
    );
  `;
  }

  async update(productId, data) {
    const product = new Product(data);

    const result = await sql`
    UPDATE Products
    SET 
      Title = ${product.title}, 
      Description = ${product.description}, 
      ImageUrl = ${product.imageUrl}, 
      Height = ${product.height}, 
      Width = ${product.width}, 
      Price = ${product.price}
    WHERE Id = ${productId}
    RETURNING *; -- Retorna os registros atualizados
  `;

    return result.length; // Retorna o número de registros alterados
  }

  async delete(productId) {
    const result = await sql`
    DELETE FROM Products 
    WHERE Id = ${productId}
    RETURNING *; -- Retorna as linhas deletadas
  `;

    return result.length;
  }
}