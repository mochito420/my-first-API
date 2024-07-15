import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import mime from "mime-types";
import url from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class FileHandler {
  static async serveStatic(req, res) {
    if (req.method === "GET") {
      const reqPath = url.parse(req.url, true).pathname;
      const filePath = path.join(
        __dirname,
        "../view",
        reqPath === "/home" ? "index.html" : req.url
      );

      console.log(`servin files ${filePath}`);
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          console.log(err);
          return;
        }
        const mimeType = mime.lookup(filePath);

        res.writeHead(200, { "content-type": mimeType });
        res.end(data);
      });
    }
  }
}
