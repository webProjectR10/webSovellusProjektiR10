import { Router } from "express";
import {
  createRequest,
  handleGetRequestsByGroup,
  handleGetRequestsByUser,
  handleDeleteRequest,
} from "../controllers/groupRequestController.js";

const router = Router();

router.get("/group/:groupid", handleGetRequestsByGroup);

router.get("/user/:userid", handleGetRequestsByUser);

router.post("/create", createRequest);

router.delete("/:requestid", handleDeleteRequest);

export default router;