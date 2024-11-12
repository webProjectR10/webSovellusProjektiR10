import { hash, compare } from "bcrypt";
import dotenv from "dotenv";
import { getAllUsers, insertUser, selectUserByEmail } from "../models/user.js";
import { ApiError } from "../helpers/apiError.js";
import jwt from "jsonwebtoken";

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
      !/[0-9]/.test(req.body.password)
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
    console.log(error.message);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const userFromDb = await selectUserByEmail(req.body.email);
    if (userFromDb.rowCount === 0) {
      return next(new ApiError("invalid credentials"));
    }
    const user = userFromDb.rows[0];
    if (!(await compare(req.body.password, user.password))) {
      return next(new ApiError("invalid credentials"));
    }
    const token = jwt.sign(req.body.email, process.env.JWT_SECRET_KEY);
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
    console.log(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await getAllUsers();
    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
};

export { registerUser, userLogin, getUsers };
