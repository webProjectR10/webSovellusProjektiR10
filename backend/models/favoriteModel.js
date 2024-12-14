import { pool } from "../helpers/db.js";

// Add a movie to the favorites list
const addFavorite = async (userId, movieId) => {
  return await pool.query(
    "INSERT INTO favorites (userID, movieID) VALUES ($1, $2) RETURNING *",
    [userId, movieId]
  );
};

// Get all favorite movies
const getFavorite = async () => {
  return await pool.query(
    "SELECT favorites.userID, favorites.movieID, users.first_name, users.last_name FROM favorites LEFT JOIN users ON favorites.userID = users.userID"
  );
};

// Get favorite movies by a specific user ID
const getFavoriteById = async (userId) => {
  return await pool.query(
    "SELECT favorites.userID, favorites.movieID, users.first_name, users.last_name FROM favorites LEFT JOIN users ON favorites.userID = users.userID WHERE favorites.userID = $1",
    [userId]
  );
};

// Remove a movie from the favorites list by its ID
const deleteFavorite = async (userId, movieId) => {
  return await pool.query(
    "DELETE FROM favorites WHERE userID = $1 AND movieID = $2",
    [userId, movieId]
  );
};

export { addFavorite, getFavorite, getFavoriteById, deleteFavorite };

