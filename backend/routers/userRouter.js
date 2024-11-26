import { Router } from "express";
import {
  registerUser,
  userLogin,
  handleGetAllUsers,
  handleGetUserById,
  handleUserDelete,
} from "../controllers/userController.js";

const router = Router();

router.get("/", handleGetAllUsers);

router.get("/:userid", handleGetUserById);

router.post("/register", registerUser);

router.post("/login", userLogin);

router.delete("/delete/:userid", handleUserDelete);

export default router;