import { sql } from './db.js';

export class DataBasePostgres {
  async list(search = '') {
    const query = search
      ? await sql`SELECT * FROM products WHERE title ILIKE ${'%' + search + '%'}`
      : await sql`SELECT * FROM products`;
    return query;
  }

  async create(product) {
    const { title, description, imageUrl, height, width, price } = product;

    await sql`
    INSERT INTO Products (Title, Description, ImageUrl, Height, Width, Price)
    VALUES (
      ${title}, 
      ${description}, 
      ${imageUrl}, 
      ${height}, 
      ${width}, 
      ${price}
    );
  `;
  }

  async update(productId, product) {
    const { title, description, imageUrl, height, width, price } = product;

    console.log(product);

    await sql`
    UPDATE Products
    SET 
      Title = ${title}, 
      Description = ${description}, 
      ImageUrl = ${imageUrl}, 
      Height = ${height}, 
      Width = ${width}, 
      Price = ${price}
    WHERE Id = ${productId};
  `;
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