import { Router } from "express";
import {
  createGroup,
  handleGetGroups,
  handleGetGroupsById,
  handleGroupDelete,
} from "../controllers/groupController.js";

const router = Router();

router.get("/", handleGetGroups);

router.get("/:groupid", handleGetGroupsById);

router.post("/create/group", createGroup);

router.delete("/delete/:groupid", handleGroupDelete);

export default router;
