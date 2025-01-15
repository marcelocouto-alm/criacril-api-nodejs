export class User {
  constructor({ username, email, password }) {
    if (!username || typeof username !== 'string') {
      throw new Error('Username is required and must be a string.');
    }

    if (!email || typeof email !== 'string') {
      throw new Error('Email is required and must be a string.');
    }

    if (!password || typeof password !== 'string') {
      throw new Error('Password is required and must be a string.');
    }

    this.username = username;
    this.email = email;
    this.password = password;
  }
}