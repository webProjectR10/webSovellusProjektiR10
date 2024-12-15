import { Router } from "express";
import {
  handleAddFavorite,
  handleFavoriteDelete,
  handleGetFavorites,
  handleGetFavoritesByUserId,
} from "../controllers/favoriteController.js";

const router = Router();

router.get("/", handleGetFavorites);

router.get("/:userID", handleGetFavoritesByUserId);

router.post("/add", handleAddFavorite);  // Keep only one definition

router.post("/remove", handleFavoriteDelete); // Change from delete to post for consistency

export default router;
