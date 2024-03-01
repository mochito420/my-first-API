import { readData, writeData } from "../../controllers/json-controler.js";

export class UserModel {
  static async getUsers() {
    const altualsData = await readData();

    if (!altualsData.users) {
      return `Users not found`;
    } else {
      const userJson = altualsData.users;
      return userJson;
    }
  }

  static async getUserByID({ id }) {
    const altualsData = await readData();

    if (altualsData.users) {
      const userByID = altualsData.users.find((user) => user.id === id);

      if (!userByID) {
        return `user with the ID: ${id} was not found`;
      } else {
        return userByID;
      }
    }
  }

  static async createUser({ input }) {
    const altualsData = await readData();

    if (altualsData.users) {
      altualsData.users.push({ ...input, id: altualsData.users.length });

      await writeData(altualsData);
    }
    return { input };
  }

  static async updateUser({ id, input }) {
    const altualsData = await readData();
    const update = input;

    if (altualsData.users) {
      const userToModify = altualsData.users.find((user) => user.id === id);

      if (!userToModify) {
        return `the user whit the ID: ${id} not exist`;
      } else {
        altualsData.users = altualsData.users.map((user) => {
          if (user.id === id) {
            return { ...user, ...update };
          } else {
            return user;
          }
        });
        await writeData(altualsData);
      }
    }
  }

  static async deleteUser({ id }) {
    const altualsData = await readData();

    if (altualsData.users) {
      const indexToDelete = altualsData.users.findIndex(
        (user) => user.id === id
      );
      const userDeleted = altualsData.users.find((user) => user.id === id);

      if (indexToDelete === -1) {
        console.log(`the user whit the ID: ${id} not exist`);
        return `the user whit the ID: ${id} not exist`;
      } else {
        altualsData.users.splice(indexToDelete, 1);
        await writeData(altualsData);
        console.log(`the user ${JSON.stringify(userDeleted)} was deleted succesfuly`);
        return `the user ${JSON.stringify(userDeleted)} was deleted succesfuly`;
      }
    }
  }
}

// const users = UserModel.updateUser({ id: 6, input: {
//   "username": "Evan Bryant Silva"
// } });
// console.log(users);
