import { Router } from "express";
import {
  registerUser,
  userLogin,
  getUsers,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);

router.post("/register", registerUser);

router.post("/login", userLogin);

export default router;
