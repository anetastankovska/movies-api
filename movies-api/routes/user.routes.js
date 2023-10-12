import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

export const userRouter = Router();

// 1. Get all users
// http://localhost:4000/api/users
userRouter.get("/", UserController.getAllUsers);
// 2. Get user by id
// http://localhost:4000/api/users/id
userRouter.get("/:id", UserController.getUserById);
// 3. Create user
// http://localhost:4000/api/users/register
userRouter.post("/register", UserController.createUser);
// 4. Login as user
// http://localhost:4000/api/users/login
userRouter.post("/login", UserController.login);
// 5. Update user
// http://localhost:4000/api/users/id
userRouter.patch("/:id", UserController.updateUser);
// 6. Delete all users
// http://localhost:4000/api/users/all
userRouter.delete("/all", UserController.deleteAllUsers);
// 7. Delete user
// http://localhost:4000/api/users/id
userRouter.delete("/:id", UserController.deleteUser);


