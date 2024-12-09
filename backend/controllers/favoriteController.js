import { ApiError } from "../helpers/ApiError.js";
import {
  addFavorite,
  deleteFavorite,
  getFavorite,
  getFavoriteById,
} from "../models/favoriteModel.js";

const handleGetFavorites = async (req, res, next) => {
  try {
    const result = await getFavorite();
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
};

const handleGetFavoritesByUserId = async (req, res, next) => {
  try {
    const userID = parseInt(req.params.userID);
    const result = await getFavoriteById(userID);
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleAddFavorite = async (req, res, next) => {
  try {
    const favoriteFromDb = await addFavorite(req.body.userid, req.body.movieID);

    const favorite = groupFromDb.rows[0];

    return res.status(201).json({
      favoriteid: favorite.favoriteID,
      userid: favorite.userID,
      movieid: favorite.movieID,
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleFavoriteDelete = async (req, res, next) => {
  try {
    const result = await deleteFavorite(req.params.favoriteid);
    if (result.rows === 0) {
      return next(new ApiError("favorite not found", 404));
    }
    res.status(200).json("favorite deleted");
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

export {
  handleGetFavorites,
  handleGetFavoritesByUserId,
  handleAddFavorite,
  handleFavoriteDelete,
};
