import { ApiError } from "../helpers/ApiError.js";
import {
  insertGroupRequest,
  getGroupRequestsByGroup,
  getGroupRequestsByUser,
  getGroupRequestByRequestId,
  deleteGroupRequest,
} from "../models/groupRequestModel.js";
import { addMember } from "../models/memberModel.js";

const handleGetRequestsByGroup = async (req, res, next) => {
  try {
    const groupid = parseInt(req.params.groupid);
    const result = await getGroupRequestsByGroup(groupid);
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
};

const handleGetRequestsByUser = async (req, res, next) => {
  try {
    const userid = parseInt(req.params.userid);
    const result = await getGroupRequestsByUser(userid);
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
};

const createRequest = async (req, res, next) => {
  try {
    const { userid, groupid } = req.body;

    if (!userid || !groupid) {
      return next(new ApiError("Missing userId or groupId", 400));
    }

    const requestFromDb = await insertGroupRequest(userid, groupid);

    return res.status(201).json(requestFromDb.rows[0]);
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleDeleteRequest = async (req, res, next) => {
  try {
    const requestid = parseInt(req.params.requestid);
    const result = await deleteGroupRequest(requestid);

    if (result.rowCount === 0) {
      console.log("Request ID:", requestid);
      return next(new ApiError("Request not found", 404));
      
    }

    return res.status(200).json({ message: "Request deleted" });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const acceptRequest = async (req, res, next) => {
    try {
      const requestid = parseInt(req.params.requestid);
      const request = await getGroupRequestByRequestId(requestid);
  
      if (request.rowCount === 0) {
        return next(new ApiError("Request not found", 404));
      }
      console.log(request.rows[0])
      const { userid, groupid } = request.rows[0];
      console.log(userid, groupid);
  
      const addMemberResponse = await addMember(userid, groupid );
  
      await deleteGroupRequest(requestid);
  
      return res.status(200).json({
        message: "Request accepted and user added to the group",
        member: addMemberResponse,
      });
    } catch (error) {
      return next(new ApiError(error.message, 400));
    }
  };

  const rejectRequest = async (req, res, next) => {
    try {
      const { requestid } = req.params;
      const result = await deleteGroupRequest(requestid);
  
      if (result.rowCount === 0) {
        return next(new ApiError("Request not found", 404));
      }
  
      return res.status(200).json({ message: "Request rejected" });
    } catch (error) {
      return next(new ApiError(error.message, 400));
    }
  };

export {
  handleGetRequestsByGroup,
  handleGetRequestsByUser,
  createRequest,
  handleDeleteRequest,
  acceptRequest,
  rejectRequest
};