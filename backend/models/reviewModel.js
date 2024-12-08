import { pool } from "../helpers/db.js";

const addReview = async (userId, movieID, rating, comment) => {
  return await pool.query(
    "INSERT INTO review (userID, movieID, stars, text, date_given) VALUES ($1, $2, $3, $4, now()) RETURNING *",
    [userId, movieID, rating, comment]
  );
};

const getReviews = async () => {
  return await pool.query(
    "SELECT review.userID, review.movieID, review.reviewid, review.stars, review.text, review.date_given, users.first_name, users.last_name FROM review LEFT JOIN users ON review.userID = users.userid"
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

export { addReview, getReviews, getReviewById, updateReview, deleteReview };
