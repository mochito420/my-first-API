import http from "http";
import { productsRouter } from "./routes/products-routes.js";
import { notFoundPage } from "./routes/notfound-rout.js";

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/products")) {
    productsRouter(req, res);
  } else {
    notFoundPage(req, res)
  }

});

const port = process.env.port ?? 4200;

server.listen(port, () =>
  console.log(`server on in http://localhost:${port}/`)
);
