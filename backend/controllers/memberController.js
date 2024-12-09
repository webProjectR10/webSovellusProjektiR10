import { ApiError } from "../helpers/ApiError.js";
import {
  getMembersByGroup,
  getGroupsByUser,
  deleteUserFromGroup,
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
};
