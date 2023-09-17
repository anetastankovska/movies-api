import { UserModel } from "../models/user.model.js";

// Controllers are in charge of handling the request listner functions
export class UserController {

  // 1. Get all users
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();

      return res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  // 2.  Get user by id
  static async getUserById(req, res) {
    try {
      const { id: userId } = req.params;

      const foundUser = await UserModel.getUserById(userId);

      return res.json(foundUser);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }

  // 3.  Create new user
  static async createUser(req, res) {
    try {
      const userData = req.body;

      const newUser = await UserModel.createUser(userData);

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  // 4. Login user
  static async login(req, res) {
    try {
      const mail = req.body.email;
      const pass = req.body.password;
      
      const all = await UserModel.getAllUsers();
      console.log(mail, pass)
      const found = all.find(user => user.email == mail && user.password == pass)
      console.log(all[0])
      if (!found) throw new Error("User not found or incorrect credentials")

      return res.status(200).json({user: `${found.firstName} ${found.lastName}`})
    } catch (error) {
      console.log(error);
      return res.status(404).json({msg: error.message});
    }
  }

  // 5.  Update user
  static async updateUser(req, res) {
    try {
      const { id: userId } = req.params;
      const updateData = req.body;

      const updatedUser = await UserModel.updateUser(
        userId,
        updateData
      );

      return res.json(updatedUser);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  // 6. Delete all users
  static async deleteAllUsers(req, res) {
    try {
      await UserModel.deleteAllUsers();

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  // 7. Delete user by id
  static async deleteUser(req, res) {
    try {
      const { id: userId } = req.params;

      await UserModel.deleteUser(userId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }
}
