export class Product {
  constructor({ title, description, imageUrl, height, width, price }) {
    if (!title || typeof title !== 'string') {
      throw new Error('Title is required and must be a string.');
    }

    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.height = height;
    this.width = width;
    this.price = price;
  }
}