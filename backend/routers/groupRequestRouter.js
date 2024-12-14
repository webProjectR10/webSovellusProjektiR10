import { Router } from "express";
import {
  createRequest,
  handleGetRequestsByGroup,
  handleGetRequestsByUser,
  handleDeleteRequest,
  acceptRequest,
  rejectRequest
} from "../controllers/groupRequestController.js";

const router = Router();

router.get("/group/:groupid", handleGetRequestsByGroup);

router.get("/user/:userid", handleGetRequestsByUser);

router.post("/create", createRequest);

router.delete("/:requestid", handleDeleteRequest);

router.post("/:requestid/accept", acceptRequest);
router.post("/:requestid/reject", rejectRequest);

export default router;