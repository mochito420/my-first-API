import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pathFile = path.join(__dirname,'../data', "data.json");

//funcion asyncrona para leer el archivo json
export async function readData() {
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
export async function writeData(data) {
  try {
    await fs.writeFile(pathFile, JSON.stringify(data, null, 2), "utf-8"); //si la direccion del archivo existe trasforma
    console.log(`data write in the json`); //el parametro en json y lo escribe en archivo
  } catch (error) {
    console.error(`error writing json: ${error.message}`);
    return `error writing json: ${error.message}`;
  }
}