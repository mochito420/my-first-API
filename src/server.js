import http from "http";
import { ProductsControler } from "./controllers/product-controller.js";
import url  from "url";

const server = http.createServer(async (req, res) => {
  const reqPath = url.parse(req.url, true).pathname; 
  const reqMethod = req.method; 

  if (reqPath === "/products" && reqMethod === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    ProductsControler.getAll(req, res)

  } else if (reqPath === "/products" && reqMethod === "POST") {

    ProductsControler.create(req, res)

  } else if (reqPath === "/products" && reqMethod === "PATCH") {

    ProductsControler.update(req,res)

  } else if (reqPath === "/products" && reqMethod === "DELETE") {
    
    ProductsControler.delete(req, res)
    
  } else {
    res.writeHead(404, { "Content-Type": "text/html" }); 
    res.end("page Not found ");
  }
});

const port = 4200;

server.listen(port, () =>
  console.log(`server on in http://localhost:${port}/`)
);
