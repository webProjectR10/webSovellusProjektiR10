import { pool } from "../helpers/db.js";

const addReview = async (userid, movieid, comment, rating) => {
  return await pool.query(
    "INSERT INTO review (userid, movieid, stars, text, date_given) VALUES ($1, $2, $3, $4, now()) RETURNING *",
    [userid, movieid, rating, comment]
  );
};

const getReviews = async () => {
  return await pool.query(
    "SELECT review.userID, review.movieID, review.reviewid, review.stars, review.text, review.date_given, users.first_name, users.last_name FROM review LEFT JOIN users ON review.userID = users.userid"
  );
};

const getReviewsByMovie = async (movieid) => {
  return await pool.query(
    "SELECT review.movieid,review.date_given, review.stars, review.text, users.first_name, users.last_name FROM review LEFT JOIN users ON users.userid = review.userid WHERE movieid = $1",
    [movieid]
  );
};

const getReviewById = async (id) => {
  return await pool.query(
    "SELECT review.userID, review.reviewid, review.movieID, review.stars, review.text, review.date_given, users.first_name, users.last_name FROM review LEFT JOIN users ON review.userID = users.userid WHERE review.reviewid = $1",
    [id]
  );
};

const updateReview = async (id, rating, comment) => {
  return await pool.query(
    "UPDATE review SET stars = $1, text = $2, date_given = NOW() WHERE reviewID = $3 RETURNING *;",
    [rating, comment, id]
  );
};

const deleteReview = async (id) => {
  return await pool.query("DELETE FROM review WHERE reviewID = $1;", [id]);
};

export {
  addReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  getReviewsByMovie,
};
