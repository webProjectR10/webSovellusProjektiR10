import { ApiError } from "../helpers/ApiError.js";
import {
  getMembersByGroup,
  getGroupsByUser,
  deleteUserFromGroup,
  addMember,
} from "../models/memberModel.js";

const handleGetMembersByGroup = async (req, res, next) => {
  try {
    const result = await getMembersByGroup(req.params.groupid);
    return res.status(200).json({
      members: result.rows,
      memberCount: parseInt(result.rows.length),
    });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const handleAddMember = async (req, res, next) => {
  try {
    if (!req.body.userid.length || !req.body.groupid) {
      return next(new ApiError("no user or group provided", 400));
    }
    const memberFromDb = await addMember(req.body.userid, req.body.groupid);

    const member = memberFromDb.rows[0];

    return res.status(201).json({
      memberid: member.memberid,
      userid: member.userid,
      groupid: member.groupid,
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleGetGroupsByUser = async (req, res, next) => {
  try {
    const result = await getGroupsByUser(req.params.userid);
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

const handleDeleteUserFromGroup = async (req, res, next) => {
  try {
    const userid = req.body.userid;
    const groupid = req.body.groupid;
    const result = await deleteUserFromGroup(userid, groupid);
    if (result.rows === 0) {
      return next(new ApiError("user or group not found", 404));
    }
    return res
      .status(200)
      .json({ message: "User successfully deleted from group" });
  } catch (error) {
    return next(new ApiError(error.message));
  }
};

export {
  handleGetMembersByGroup,
  handleGetGroupsByUser,
  handleDeleteUserFromGroup,
  handleAddMember,
};
