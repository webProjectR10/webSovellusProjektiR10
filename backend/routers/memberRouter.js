import { Router } from "express";
import {
  handleGetGroupsByUser,
  handleGetMembersByGroup,
  handleDeleteUserFromGroup,
  handleAddMember,
} from "../controllers/memberController.js";

const router = Router();

router.get("/:groupid", handleGetMembersByGroup);

router.get("/byUser/:userid", handleGetGroupsByUser);

router.post("/add", handleAddMember);

router.delete("/delete", handleDeleteUserFromGroup);

export default router;
