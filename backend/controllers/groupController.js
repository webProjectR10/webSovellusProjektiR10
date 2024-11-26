import { ApiError } from "../helpers/ApiError.js";
import {
  deleteGroup,
  getGroupById,
  getGroups,
  insertGroup,
} from "../models/groupModel.js";

const handleGetGroups = async (req, res, next) => {
  try {
    const result = await getGroups();
    return res.status(200).json(result.rows);
  } catch (error) {
    return next(error);
  }
};

const handleGetGroupsById = async (req, res, next) => {
  try {
    const groupId = parseInt(req.params.groupid);
    const result = await getGroupById(groupId);
    if (result.rows.length === 0) {
      return next(new ApiError("group not found", 404));
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const createGroup = async (req, res, next) => {
  try {
    if (!req.body.name || req.body.name.length === 0) {
      return next(new ApiError("invalid name for group", 400));
    }
    const groupFromDb = await insertGroup(req.body.name, req.body.ownerid);

    const group = groupFromDb.rows[0];

    return res.status(201).json({
      groupid: group.groupid,
      name: group.name,
      ownerid: group.ownerid,
    });
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};

const handleGroupDelete = async (req, res, next) => {
  try {
    const result = await deleteGroup(req.params.groupid);
    if (result.rows === 0) {
      return next(new ApiError("Group not found", 404));
    }
    res.status(200).json("group deleted");
  } catch (error) {
    return next(new ApiError(error.message, 400));
  }
};
export { handleGetGroups, handleGetGroupsById, createGroup, handleGroupDelete };
