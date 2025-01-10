import { randomUUID } from 'node:crypto';

export class DataBaseMemory {
  #products = new Map();

  list(search) {
    return Array.from(this.#products.entries())
      .map((productsArray) => {
        const id = productsArray[0];
        const data = productsArray[1];

        return {
          id,
          ...data,
        }
      })
      .filter(product => {
        if (search) {
          return product.title.includes(search)
        }

        return true;
      });
  }

  create(product) {
    const productId = randomUUID();

    this.#products.set(productId, product);
  };

  update(id, product) {
    this.#products.set(id, product);
  };

  delete(id) {
    this.#products.delete(id);
  };
}