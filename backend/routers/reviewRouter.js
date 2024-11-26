import { Router } from "express";

import { handleGetReviewById, handleGetReviews, handleAddReview, handleDeleteReview } from "../controllers/reviewController.js"

const router = Router();

router.get("/", handleGetReviews)

router.get("/:reviewid", handleGetReviewById)

router.post("/add", handleAddReview)

router.delete("/delete/:reviewid", handleDeleteReview)

export default router;
