import url from "url";
import { JSONMiddelware } from "../func/middelwares.js";
import { ProductsModel } from "../models/local/product-model.js";

export class ProductsController {
  static async getAll(req, res) {
    const urlParams = url.parse(req.url, true).query;
    const { id } = urlParams;

    if (!id) {
      const data = await ProductsModel.readProducts();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "lista de productos", products: data })
      );
    } else {
      const productToShow = await ProductsModel.readProductByID({
        id: parseInt(id),
      });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "solicitaste un producto",
          data: productToShow,
        })
      );
    }
  }

  static async create(req, res) {
    JSONMiddelware(req, res, async () => {
      if (
        req.body &&
        req.body.hasOwnProperty("item") &&
        req.body.hasOwnProperty("type") &&
        req.body.hasOwnProperty("price") &&
        req.body.hasOwnProperty("unidad")
      ) {
        const newProduct = await ProductsModel.createProduct({
          input: req.body,
        });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `se ha creado un nuevo producto`,
            information: newProduct,
          })
        );
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message:
              "debes ingresar un nombre un tipo un precio y una unidad para crear un producto",
            newproduct: req.body,
          })
        );
      }
    });
  }

  static async update(req, res) {
    const urlParams = url.parse(req.url, true).query;
    const { id } = urlParams;

    JSONMiddelware(req, res, async () => {
      if (
        (req.body && req.body.hasOwnProperty("item")) ||
        req.body.hasOwnProperty("type") ||
        req.body.hasOwnProperty("price") ||
        req.body.hasOwnProperty("unidad")
      ) {
        const producToModify = await ProductsModel.updateProduct({
          id: parseInt(id),
          input: req.body,
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "modificaste un producto",
            productmodify: producToModify,
            modification: req.body,
          })
        );
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error:
              "debes ingresar almenos un item, type, price, unidad para modificar un producto",
          })
        );
      }
    });
  }

  static async delete(req, res) {
    const urlParams = url.parse(req.url, true).query;
    const { id } = urlParams;

    const productDeleted = await ProductsModel.deleteProduct({
      id: parseInt(id),
    });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "has eliminando un producto",
        delatedProduct: productDeleted,
      })
    );
  }
}
