import { DataService } from "../services/data.service.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const moviesPath = path.join(__dirname, "..", "data", "movies.json");

// Model files are in charge of CRUD operations with the database (Movies.json)
export class MovieModel {
  // Save Movies
  static async saveMovies(movies) {
    await DataService.saveJSONFile(moviesPath, movies);
  }

  // 1. Get all Movies
  static async getAllMovies() {
    const Movies = await DataService.readJSONFile(moviesPath);

    return Movies;

    // One line function
    // return DataService.readJSONFile(MoviesPath);
  }
  //2. Get Movie by id
  static async getMovieById(movieId) {
    const Movies = await this.getAllMovies();

    const foundMovie = Movies.find(Movie => Movie.id === movieId);

    if (!foundMovie) throw new Error("Movie not found");

    return foundMovie;
  }
  //   3. Create new Movie
  static async createMovie(movieData) {
    const movies = await this.getAllMovies();

    // some checks all elements and returns a boolean that is true if for at least one of the element the expression used in the callback is true otherwise it returns false
    const nameExists = movies.some(
      Movie => Movie.name === movieData.name
    );

    if (nameExists) throw new Error("Movie with same name already exists!");

    const newMovie = {
      id: uuid(),
      ...movieData,
    };

    const updatedMovies = [...movies, newMovie];

    await this.saveMovies(updatedMovies);

    return newMovie;
  }
  //   4. Update Movie
  static async updateMovie(movieId, updateData) {
    const Movies = await this.getAllMovies();

    const foundMovie = await this.getMovieById(movieId);

    if (updateData.id) throw new Error("Invalid updates");

    const updatedMovie = { ...foundMovie, ...updateData };

    const updatedMovies = Movies.map(Movie =>
      Movie.id === updatedMovie.id ? updatedMovie : Movie
    );

    await this.saveMovies(updatedMovies);

    return updatedMovie;
  }
  // 5. Delete all Movies
  static async deleteAllMovies() {
    await this.saveMovies([]);
  }
  // 6. Delete Movie by id
  static async deleteMovie(MovieId) {
    const Movies = this.getAllMovies();

    const updatedMovies = Movies.filter(
      Movie => Movie.id !== MovieId
    );

    if (updatedMovies.length === Movies.length)
      throw new Error("Movie not found");

    await this.saveMovies(updatedMovies);
  }
}
