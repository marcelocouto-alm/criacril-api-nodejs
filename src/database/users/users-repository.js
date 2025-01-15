import { sql } from '../db.js';
import { User } from '../../models/User.js';

export class UsersRepository {
  async list(search = '') {
    const query = search
      ? await sql`SELECT * FROM users WHERE title ILIKE ${'%' + search + '%'}`
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
}