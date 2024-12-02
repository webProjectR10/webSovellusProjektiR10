import { ApiError } from "../helpers/ApiError.js";
import { getMembersByGroup, getGroupsByUser } from "../models/memberModel.js";

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

export { handleGetMembersByGroup, handleGetGroupsByUser };
