import http from "http";
import url from "url";
import { JSONMiddelware } from "./func/middelwares.js";
import { Products } from "./models/Products.js";

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true); // request url to url objet
  const reqPath = parsedUrl.pathname; //  path of request url obj
  const reqMethod = req.method; // request method
  const urlParams = parsedUrl.query; // url params using the url querys

  if (reqPath === "/products" && reqMethod === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const { id } = urlParams;

    if (!id) {
      const data = await Products.readProducts();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "lista de productos", products: data })
      );
    } else {
      const productToShow = await Products.readProductByID({
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
  } else if (reqPath === "/products" && reqMethod === "POST") {
    JSONMiddelware(req, res, async () => {
      if (
        req.body &&
        req.body.hasOwnProperty("item") &&
        req.body.hasOwnProperty("type") &&
        req.body.hasOwnProperty("price") &&
        req.body.hasOwnProperty("unidad")
      ) {
        const newProduct = await Products.createProduct({ input: req.body });

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
  } else if (reqPath === "/products" && reqMethod === "PATCH") {
    const { id } = urlParams;

    JSONMiddelware(req, res, async () => {
      const producToModify = await Products.updateProduct({
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
    });
  } else if (reqPath === "/products" && reqMethod === "DELETE") {
    const { id } = urlParams;

    const productDeleted = await Products.deleteProduct({ id: parseInt(id) });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "has eliminando un producto",
        delatedProduct: productDeleted,
      })
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/html" }); //page sin metodo ni endpoint
    res.end("page Not found ");
  }
});

const port = 4200;

server.listen(port, () =>
  console.log(`server on in http://localhost:${port}/`)
);
