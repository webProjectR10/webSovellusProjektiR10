import { Router } from "express";
import {
  handleGetGroupsByUser,
  handleGetMembersByGroup,
} from "../controllers/memberController.js";

const router = Router();

router.get("/:groupid", handleGetMembersByGroup);

router.get("/byUser/:userid", handleGetGroupsByUser);
export default router;
