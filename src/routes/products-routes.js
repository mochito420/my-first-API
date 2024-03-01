import { ProductsController } from "../controllers/product-controller.js";
import url from "url";

export function productsRouter(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  const reqMethod = req.method;

  if (reqPath === "/products" && reqMethod === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    ProductsController.getAll(req, res);
  } else if (reqPath === "/products" && reqMethod === "POST") {
    ProductsController.create(req, res);
  } else if (reqPath === "/products" && reqMethod === "PATCH") {
    ProductsController.update(req, res);
  } else if (reqPath === "/products" && reqMethod === "DELETE") {
    ProductsController.delete(req, res);
  }
}
