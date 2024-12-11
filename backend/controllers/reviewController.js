import {
  addReview,
  getReviews,
  getReviewById,
  deleteReview,
  getReviewsByMovie,
} from "../models/reviewModel.js";
import { ApiError } from "../helpers/ApiError.js";

const handleAddReview = async (req, res, next) => {
  try {
    if (!req.body.stars) {
      return next(new ApiError("Review must have rating", 401));
    }
    const reviewFromDb = await addReview(
      req.body.userid,
      req.body.movieid,
      req.body.text,
      req.body.stars
    );

    const review = reviewFromDb.rows[0];
    return res.status(201).json({
      reviewid: review.reviewid,
      userid: review.userid,
      movieid: review.movieid,
      text: review.text,
      stars: review.stars,
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleGetReviews = async (req, res, next) => {
  try {
    const result = await getReviews();
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};
const handleGetReviewById = async (req, res, next) => {
  try {
    const result = await getReviewById(req.params.reviewid);
    if (result.rows.length === 0) {
      return next(new ApiError("review not found", 404));
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleUpdateReview = async (req, res, next) => {
  const client = await pool.connect();
  try {
    const result = await updateReview(
      req.body.rating,
      req.body.comment,
      req.body.movieid
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

const handleDeleteReview = async (req, res, next) => {
  try {
    const result = await deleteReview(req.params.reviewID);
    if (result.rows === 0) {
      return next(new ApiError("Review not found", 404));
    }
    res.status(200).json("review deleted");
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleGetReviewByMovie = async (req, res, next) => {
  try {
    const result = await getReviewsByMovie(req.params.movieid);
    if (result.rows === 0) {
      return next(new ApiError("no reviews found", 404));
    }
    res.status(200).json(result.rows);
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

export {
  handleAddReview,
  handleGetReviews,
  handleGetReviewById,
  handleUpdateReview,
  handleDeleteReview,
  handleGetReviewByMovie,
};
