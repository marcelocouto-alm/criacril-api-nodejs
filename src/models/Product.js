export class Product {
  constructor({ title, description, imageUrl, height, width, price }) {
    if (!title || typeof title !== 'string') {
      throw new Error('Title is required and must be a string.');
    }

    if (!description || typeof description !== 'string') {
      throw new Error('Description is required and must be a string.');
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('Image URL is required and must be a string.');
    }

    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.height = height;
    this.width = width;
    this.price = price;
  }
}