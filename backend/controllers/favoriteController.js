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
    if (!req.body.userID || !req.body.movieid) {
      return next(new ApiError("No user or movie provided", 400));
    }

    const favoriteFromDb = await addFavorite(req.body.userid, req.body.movieid);

    const favorite = favoriteFromDb.rows[0];

    return res.status(201).json({
      favoriteid: favorite.favoriteid,
      userid: favorite.userid,
      movieid: favorite.movieid,
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleFavoriteDelete = async (req, res, next) => {
  try {
    const result = await deleteFavorite(req.body.favoriteid);
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
