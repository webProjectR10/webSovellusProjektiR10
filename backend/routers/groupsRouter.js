import { Router } from "express";
import {
  createGroup,
  handleGetGroups,
  handleGetGroupsById,
  handleGroupDelete,
  handleGroupUpdate,
} from "../controllers/groupController.js";

const router = Router();

router.get("/", handleGetGroups);

router.get("/:groupid", handleGetGroupsById);

router.post("/create/group", createGroup);

router.delete("/delete/:groupid", handleGroupDelete);

router.put("/update/:groupid", handleGroupUpdate);

export default router;
