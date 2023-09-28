import { MovieModel } from "../models/movie.model.js";

// Controllers are in charge of handling the request listner functions
export class MovieController {

  // 1. Get all movies
  static async getAllMovies(req, res) {
    try {
      const movies = await MovieModel.getAllMovies();

      return res.json(movies);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  //   2. Get movie by id
  static async getMovieById(req, res) {
    try {
      const { id: movieId } = req.params;

      const foundMovie = await MovieModel.getMovieById(movieId);

      return res.json(foundMovie);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }

  //   3. Create new movie
  static async createMovie(req, res) {
    try {
      const movieData = req.body;

      const newMovie = await MovieModel.createMovie(movieData);

      return res.status(201).json(newMovie);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  //   4. Update movie
  static async updateMovie(req, res) {
    try {
      const { id: movieId } = req.params;
      const updateData = req.body;

      const updatedMovie = await MovieModel.updateMovie(
        movieId,
        updateData
      );

      return res.json(updatedMovie);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }

  // 5. Delete all movies
  static async deleteAllMovies(req, res) {
    try {
      await MovieModel.deleteAllMovies();

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  }

  // 6. Delete movie by id
  static async deleteMovie(req, res) {
    try {
      const { id: movieId } = req.params;

      await MovieModel.deleteMovie(movieId);

      return res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: error.message });
    }
  }

  // 7. Rate movie by id
  static async rateMovie(req, res) {
    // console.log(req);
    try {
    // console.log(req);
      const { id: movieId } = req.params;
      const updateData = req.body;

      const updatedMovie = await MovieModel.rateMovie(
        movieId,
        updateData
      );

      return res.json(updatedMovie);
    } catch (error) {
      // console.log(error);
      return res.status(400).json({ msg: error.message });
    }
  }
}
