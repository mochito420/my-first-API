import url from "url";
import { JSONMiddelware } from "../func/middelwares.js";
import { UserModel } from "../models/local/users-model.js";

export class UserController {
  static async getAll(req, res) {
    const urlParams = url.parse(req.url, true).query;
    const { id } = urlParams;

    if (!id) {
      const users = await UserModel.getUsers();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "lista de users", users: users }));
    } else {
      const userByID = await UserModel.getUserByID({ id: parseInt(id) });

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "usuario buscado por id", user: userByID })
      );
    } 
  }

  static async createUser(req, res) {
    JSONMiddelware(req, res, async () => {
      if (
        req.body &&
        req.body.hasOwnProperty("username") &&
        req.body.hasOwnProperty("password")
      ) {
        const newUser = await UserModel.createUser({ input: req.body });

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "new user created", data: newUser }));
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error:
              "tienes que ingresar un username y una password para crear un usurario",
          })
        );
      }
    });
  }

  static async updateUser(req, res) {
    const urlParams = url.parse(req.url, true).query;
    const { id } = urlParams;

    JSONMiddelware(req, res, async () => {
      if (req.body && req.body.hasOwnProperty("username") ||req.body.hasOwnProperty("password")) {
        const updatedUser = await UserModel.updateUser({id: parseInt(id) , input:req.body})

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "user was modificated",
            userupdated: updatedUser,
            modification: req.body,
          })
        );
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error:
              "tienes que ingresar un username o una password nueva para modificar un usurario",
          })
        );
      }
    });
  }

  static async deleteUser(req, res) {
    const urlParams = url.parse(req.url, true).query;
    const { id } = urlParams;

    const userDeleted = await UserModel.deleteUser({ id: parseInt(id) });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: userDeleted })
    );
  }
}
