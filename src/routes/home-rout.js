import url from "url";
import { FileHandler } from "../func/filehandler.js";

export function homeRouter(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  const reqMethod = req.method;

  if (reqPath.startsWith("/home") && reqMethod === "GET") {
    req.url = "/index.html";
    FileHandler.serveStatic(req, res);
  } else if (reqMethod === "GET") {
    FileHandler.serveStatic(req, res);
  } else {
    res.writeHead(405);
    res.end("method no allowed");
  }
}
