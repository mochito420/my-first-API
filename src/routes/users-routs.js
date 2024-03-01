import { UserController } from "../controllers/users-controller.js";
import url from "url";

export function usersRouter(req, res) {
  const reqPath = url.parse(req.url, true).pathname;
  const reqMethod = req.method;

  if (reqPath === "/users" && reqMethod === "GET") {
    UserController.getAll(req, res)
  } else if (reqPath === '/users' && reqMethod === 'POST'){
    UserController.createUser(req, res)
  } else if(reqPath === '/users' && reqMethod === 'PATCH'){
    UserController.updateUser(req, res)
  } else if( reqPath === '/users' && reqMethod === 'DELETE'){
    UserController.deleteUser(req,res)
  }
}
