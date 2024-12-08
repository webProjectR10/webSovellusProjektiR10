import { Router } from "express";
import {
  handleGetGroupsByUser,
  handleGetMembersByGroup,
  handleDeleteUserFromGroup,
} from "../controllers/memberController.js";

const router = Router();

router.get("/:groupid", handleGetMembersByGroup);

router.get("/byUser/:userid", handleGetGroupsByUser);

router.delete("/delete", handleDeleteUserFromGroup);

export default router;
