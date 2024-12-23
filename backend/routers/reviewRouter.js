import { Router } from "express";

import {
  handleGetReviewById,
  handleGetReviews,
  handleAddReview,
  handleDeleteReview,
  handleGetReviewByMovie,
} from "../controllers/reviewController.js";

const router = Router();

router.get("/", handleGetReviews);

router.get("/:reviewid", handleGetReviewById);

router.get("/byMovie/:movieid", handleGetReviewByMovie);

router.post("/add", handleAddReview);

router.delete("/delete/:reviewid", handleDeleteReview);

export default router;
