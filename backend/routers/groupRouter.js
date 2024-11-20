import { Router } from "express";
import { handleGetAllGroups } from "../controllers/groupController.js";

const router = Router();

router.get("/", handleGetAllGroups);

export default router;
