import { DataService } from "../services/data.service.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const usersPath = path.join(__dirname, "..", "data", "users.json");

// Model files are in charge of CRUD operations with the database (Users.json)
export class UserModel {
  // Save Users
  static async saveUsers(users) {
    await DataService.saveJSONFile(usersPath, users);
  }

  // 1. Get all Users
  static async getAllUsers() {
    const Users = await DataService.readJSONFile(usersPath);

    return Users;

    // One line function
    // return DataService.readJSONFile(UsersPath);
  }
  //2. Get User by id
  static async getUserById(userId) {
    const Users = await this.getAllUsers();

    const foundUser = Users.find(User => User.id === userId);

    if (!foundUser) throw new Error("User not found");

    return foundUser;
  }
  //   3. Create new User
  static async createUser(userData) {
    const users = await this.getAllUsers();

    // some checks all elements and returns a boolean that is true if for at least one of the element the expression used in the callback is true otherwise it returns false
    const emailExists = users.some(
      User => User.email === userData.email
    );

    if (emailExists) throw new Error("Email already exists!");

    const newUser = {
      id: uuid(),
      ...userData,
    };

    const updatedUsers = [...users, newUser];

    await this.saveUsers(updatedUsers);

    return newUser;
  }
  //   4. Update User
  static async updateUser(userId, updateData) {
    const Users = await this.getAllUsers();

    const foundUser = await this.getUserById(userId);

    if (updateData.id) throw new Error("Invalid updates");

    const updatedUser = { ...foundUser, ...updateData };

    const updatedUsers = Users.map(User =>
      User.id === updatedUser.id ? updatedUser : User
    );

    await this.saveUsers(updatedUsers);

    return updatedUser;
  }
  // 5. Delete all Users
  static async deleteAllUsers() {
    await this.saveUsers([]);
  }
  // 6. Delete User by id
  static async deleteUser(UserId) {
    const Users = this.getAllUsers();

    const updatedUsers = Users.filter(
      User => User.id !== UserId
    );

    if (updatedUsers.length === Users.length)
      throw new Error("User not found");

    await this.saveUsers(updatedUsers);
  }
}
