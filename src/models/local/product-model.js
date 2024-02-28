import { readData, writeData } from "../../controllers/json-controler.js";

export class ProductsModel {
  static async readProducts() {
    const altualsData = await readData(); //read data

    if (!altualsData.products) {
      return `products not found`; //si no tiene un array de productos devulve not found
    } else {
      const jsonToReturn = altualsData.products;
      return jsonToReturn; //si el json tiene un array de productos devuelve el array de productos
    }
  }
  static async readProductByID({ id }) {
    const altualsData = await readData();

    if (altualsData.products) {
      const productToRead = altualsData.products.find(
        (product) => product.id === id
      );

      if (!productToRead) {
        return `the product whit ID: ${id} not exist`;
      } else {
        return productToRead;
      }
    }
  }
  static async createProduct({ input }) {
    const altualsData = await readData();

    if (altualsData.products) {
      altualsData.products.push({ ...input, id: altualsData.products.length });
      await writeData(altualsData);
    }

    return input;
  }

  static async updateProduct({ id, input }) {
    const altualsData = await readData();
    const update = input;

    if (altualsData.products) {
      const productToUpdate = altualsData.products.find(
        (product) => product.id === id
      );

      if (!productToUpdate) {
        return `product whit the ID: ${id} not found`;
      } else {
        altualsData.products = altualsData.products.map((product) => {
          if (product.id === id) {
            return { ...product, ...update };
          } else {
            return product;
          }
        });
        await writeData(altualsData);
      }
    }
  }

  static async deleteProduct({ id }) {
    const altualsData = await readData();

    if (altualsData.products) {
      const index = altualsData.products.findIndex(
        (product) => product.id === id
      );

      if(index === -1){
        return `the product whit the ID: ${id} was not found` 
      } else {
        const deletedProduct = altualsData.products.find(
          (product) => product.id === id
        );
        altualsData.products.splice(index, 1)

        await writeData(altualsData)

        return JSON.stringify(deletedProduct)
      }
    }
  }
}

