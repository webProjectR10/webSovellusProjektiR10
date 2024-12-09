import { pool } from "../helpers/db.js";

const addFavorite = async (userId, movieID) => {
  return await pool.query(
    "INSERT INTO favorites (userID, movieID,) VALUES ($1, $2) RETURNING *",
    [userId, movieID]
  );
};

const getFavorite = async () => {
  return await pool.query(
    "SELECT favorites.userID, favorites.movieID, users.first_name, users.last_name FROM favorites LEFT JOIN users ON favorites.userID = users.userID"
  );
};

const getFavoriteById = async (id) => {
  return await pool.query(
    "SELECT favorites.userID, favorites.movieID, users.first_name, users.last_name FROM favorites LEFT JOIN users ON favorites.userID = users.userID WHERE favorites.userID = $1",
    [id]
  );
};

const deleteFavorite = async (id) => {
  return await pool.query("DELETE FROM favorites WHERE favoriteID = $1;", [id]);
};

export { addFavorite, getFavorite, getFavoriteById, deleteFavorite };
