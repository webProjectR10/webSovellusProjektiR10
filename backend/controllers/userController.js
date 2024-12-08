import { hash, compare } from "bcrypt";
import dotenv from "dotenv";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  insertUser,
  selectUserByEmail,
} from "../models/userModel.js";
import { ApiError } from "../helpers/ApiError.js";
import jwt from "jsonwebtoken";
import {
  addTokenToBlacklist,
  isTokenBlacklisted,
  blacklistedTokens
} from "../models/Blacklist.js";

dotenv.config();

const createUserObject = (userid, fName, lName, email, token = undefined) => {
  return {
    userid: userid,
    first_name: fName,
    last_name: lName,
    email: email,
    ...(token !== undefined && { token: token }),
  };
};

const registerUser = async (req, res, next) => {
  try {
    if (!req.body.email || req.body.email.length === 0) {
      return next(new ApiError("invalid email for user", 400));
    }
    if (
      !req.body.password ||
      req.body.password.length < 8 ||
      !/[A-Z]/.test(req.body.password) ||
      !/[0-9]/.test(req.body.password) ||
      !/[a-z]/.test(req.body.password)
    ) {
      return next(new ApiError("invalid password for user", 400));
    }

    const hashedPassword = await hash(req.body.password, 10);

    const userFromDb = await insertUser(
      req.body.fName,
      req.body.lName,
      req.body.email,
      hashedPassword
    );

    const user = userFromDb.rows[0];

    return res.status(201).json({
      userid: user.userid,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const userLogin = async (req, res, next) => {
  try {
    const userFromDb = await selectUserByEmail(req.body.email);
    if (userFromDb.rowCount === 0) {
      return next(new ApiError("user doesnt exist", 404));
    }
    const user = userFromDb.rows[0];
    if (!(await compare(req.body.password, user.password))) {
      return next(new ApiError("invalid credentials", 500));
    }
    const token = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    return res
      .status(200)
      .json(
        createUserObject(
          user.userid,
          user.first_name,
          user.last_name,
          user.email,
          token
        )
      );
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const logOut = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(200).json({ message: "Token doenst exists" });
    }

    if ( isTokenBlacklisted(token) ) {
      return res.status(200).json({ message: "Token doenst exists" });
    }

    await addTokenToBlacklist(token);

    res.status(200).json({ message: "successfully logged out" });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const handleGetAllUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result.rows);
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const handleGetUserById = async (req, res, next) => {
  try {
    const result = await getUserById(req.params.userid);
    res.status(200).json(result.rows);
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const handleUserDelete = async (req, res, next) => {
  try {
    const result = await deleteUser(req.params.userid);
    if (result.rowCount === 0) {
      res.status(404).json({ message: "user not found" });
    }
    res.status(200).json("user deleted");
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

export {
  registerUser,
  userLogin,
  handleGetAllUsers,
  handleGetUserById,
  handleUserDelete,
  logOut,
};
