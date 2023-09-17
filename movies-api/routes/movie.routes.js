import { Router } from "express";
import { MovieController } from "../controllers/movie.controller.js";

export const movieRouter = Router();

// 1. Get all movies 
// http://localhost:4000/api/movies
movieRouter.get("/", MovieController.getAllMovies);
// 2. Get movie by id
// http://localhost:4000/api/movies/id
movieRouter.get("/:id", MovieController.getMovieById);
// 3. Create movie
// http://localhost:4000/api/movies
movieRouter.post("/", MovieController.createMovie);
// 4. Update movie
// http://localhost:4000/api/movies/id
movieRouter.patch("/:id", MovieController.updateMovie);
// 5. Delete all movies
// http://localhost:4000/api/movies/all
movieRouter.delete("/all", MovieController.deleteAllMovies);
// 6. Delete movie
// http://localhost:4000/api/movies/id
movieRouter.delete("/:id", MovieController.deleteMovie);

