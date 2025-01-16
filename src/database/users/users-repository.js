import { sql } from '../db.js';
import { User } from '../../models/User.js';

export class UsersRepository {
  async list(search = '') {
    const query = search
      ? await sql`SELECT * FROM users WHERE username ILIKE ${'%' + search + '%'}`
      : await sql`SELECT * FROM users`;
    return query;
  }

  async createUser(data) {
    const user = new User(data);

    await sql`
      INSERT INTO Users (username, email, password)
      VALUES (${user.username}, ${user.email}, ${user.password});
    `;
  }

  async update(userId, data) {
    const user = new User(data);

    const result = await sql`
      UPDATE Users
      SET 
        Username = ${user.username}, 
        Email = ${user.email}, 
        Password = ${user.password}
      WHERE Id = ${userId}
      RETURNING *; -- Retorna os registros atualizados
    `;

    return result.length; // Retorna o número de registros alterados
  }

  async delete(userId) {
    const result = await sql`
    DELETE FROM Users
    WHERE Id = ${userId}
    RETURNING *; -- Retorna as linhas deletadas
  `;

    return result.length;
  }
}