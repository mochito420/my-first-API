import { ProductsControler } from "../controllers/product-controller.js";
import url from "url";

export function productsRouter(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  const reqMethod = req.method;

  if (reqPath === "/products" && reqMethod === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    ProductsControler.getAll(req, res);
  } else if (reqPath === "/products" && reqMethod === "POST") {
    ProductsControler.create(req, res);
  } else if (reqPath === "/products" && reqMethod === "PATCH") {
    ProductsControler.update(req, res);
  } else if (reqPath === "/products" && reqMethod === "DELETE") {
    ProductsControler.delete(req, res);
  }
}
