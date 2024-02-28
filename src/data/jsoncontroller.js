import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathFile = path.join(__dirname, "data.json");


//funcion asyncrona para leer el archivo json
async function readData() {
  try {
    const data = await fs.readFile(pathFile, "utf-8"); //leeo el archivo donde guardo los datos
    console.log(`json was read`);
    return JSON.parse(data); //lo parsea en json
  } catch (error) {
    console.error(`error reading file: ${error.message}`);
    return null; //si la direccion esta mal returna null
  }
}
//funcion asyncrona para escribir en el json
async function writeData(data) {
  try {
    await fs.writeFile(pathFile, JSON.stringify(data, null, 2), "utf-8"); //si la direccion del archivo existe trasforma
    console.log(`data write in the json`); //el parametro en json y lo escribe en archivo
  } catch (error) {
    console.error(`error writing json: ${error.message}`);
    return `error writing json: ${error.message}`;
  }
}
//funcion asincrona para escribir un dato en archivo json
async function createNewProduct(newData) {
  const actualsData = await readData(); //guardo la data del json en una variable

  if (actualsData) {
    actualsData.products.push({ ...newData, id: actualsData.products.length }); //meto el nuevo dato y un id
    await writeData(actualsData); //escribe los datos en el json
  }

  console.log(`new data created ${JSON.stringify(newData)}`);
  return newData;
}

//funcion asincrona para borrar cosas del json
async function deleteProductByID(id) {
  const actualsData = await readData(); //data del json

  if (actualsData.products) {
    const products = actualsData.products;
    const index = products.findIndex((element) => element.id === id);

    if (index !== -1) {     //si encuentra el producto con el id
      const productDeleted = actualsData.products.find(
        (element) => element.id === id
      ); //producto que se elimina

      actualsData.products.splice(index, 1); //se elimina el producto que coincide con el ID

      await writeData(actualsData.products); //se actualiza el archivo json

      return productDeleted; //retorna el producto que se elimina
    } else {
      console.log(`the product whit the ID: ${id} was not found`);
      return `the product whit the ID: ${id} was not found`; //si no se encuentra el product con el ID alerta
    }
  }
}

//funcion para leer los productos
async function readProducts() {
  const altualsData = await readData(); //read data

  if (altualsData.products) {
    const jsonToReturn = altualsData.products;
    return jsonToReturn; //si el json tiene un array de productos devuelve el array de productos
  } else {
    return `products not found`; //si no tiene un array de productos devulve not found
  }
}
//funcion para leer producto por su id
async function readProductByID(id) {
  const altualsData = await readData();

  if (altualsData.products) {
    const products = altualsData.products; //array de productos

    const productToShow = products.find(
      (element) => element.id === parseInt(id) //busco el producto en el array de productos
    );

    if (!productToShow) {
      return `the product whit ID: ${id} was not found`; //si no los encuentra devuelve un string
    } else {
      return productToShow; //si lo encuentra lo devuelve
    }
  }
}

//funcion para modificar un dato
async function modifyProductByID(id, modification) {
  const altualsData = await readData();
  const modificationData = modification; //nuevo dato

  if (altualsData.products) { //comprueba si hay un array de productos en el json
    const productToModify = altualsData.products.find(
      (element) => element.id === id //matchea un producto con el id
    );

    if (!productToModify) {
      return `product with the ID ${id} not exist`; //comprueba que el id matchee si no devuelve un string
    } else {
      altualsData.products = altualsData.products.map((element) => {
        if (element.id === id) {//se comprueba de vuelta si coincide el id
          return { ...element, ...modificationData }; //se muta el producto con el el nuevo dato
        } else {
          return element; //si no hay un nuevo dato no se modifica
        }
      });
      const modifiedPropertys = Object.keys(modificationData).toString();

      await writeData(altualsData); //se guarda los cambios en el json
    }
  }
}

export {
  readData,
  writeData,
  createNewProduct,
  readProducts,
  readProductByID,
  deleteProductByID,
  modifyProductByID,
};