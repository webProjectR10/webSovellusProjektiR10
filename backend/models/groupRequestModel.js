import { pool } from "../helpers/db.js";

const insertGroupRequest = async (userid, groupid) => {
  return await pool.query(
    "INSERT INTO group_requests (userid, groupid) VALUES ($1, $2) RETURNING *",
    [userid, groupid]
  );
};

const getGroupRequestsByGroup = async (groupid) => {
  return await pool.query(
    "SELECT gr.requestid, gr.userid, gr.groupid, u.first_name, u.last_name FROM group_requests gr LEFT JOIN users u ON gr.userid = u.userid WHERE gr.groupid = $1",
    [groupid]
  );
};

const getGroupRequestsByUser = async (userid) => {
  return await pool.query(
    "SELECT gr.requestid, gr.userid, gr.groupid, g.name as group_name FROM group_requests gr LEFT JOIN groups g ON gr.groupid = g.groupid WHERE gr.userid = $1",
    [userid]
  );
};

const deleteGroupRequest = async (requestid) => {
  return await pool.query(
    "DELETE FROM group_requests WHERE requestid = $1",
    [requestid]
  );
};

export {
  insertGroupRequest,
  getGroupRequestsByGroup,
  getGroupRequestsByUser,
  deleteGroupRequest,
};