import { Router } from "express";
import { registerUser, userLogin } from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);

router.post("/login", userLogin)

export default router;