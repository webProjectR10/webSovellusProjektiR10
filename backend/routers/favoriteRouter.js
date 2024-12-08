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

router.post("/add", handleAddFavorite);

router.delete("/delete", handleFavoriteDelete);

export default router;
