import { Router } from "express";
import {
  registerUser,
  userLogin,
  handleGetAllUsers,
  handleGetUserById,
  handleUserDelete,
  logOut,
} from "../controllers/userController.js";

const router = Router();

router.get("/", handleGetAllUsers);

router.post("/register", registerUser);

router.post("/login", userLogin);

router.post("/logout", logOut);

router.get("/:userid", handleGetUserById);


router.delete("/delete/:userid", handleUserDelete);


export default router;