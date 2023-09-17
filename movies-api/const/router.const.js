import { Router } from "express";
import { userRouter } from "../routes/user.routes.js";
import { movieRouter } from "../routes/movie.routes.js";

export const globalRouter = Router();

globalRouter.use("/users", userRouter);
globalRouter.use("/movies", movieRouter);
