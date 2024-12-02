import { pool } from "../helpers/db.js";

const getGroups = async () => {
  return await pool.query("SELECT groupid, name, ownerid, first_name, last_name from groups LEFT JOIN users ON groups.ownerid = users.userid");
};

const insertGroup = async (name, ownerid) => {
  return await pool.query(
    "INSERT INTO groups (name, ownerid) VALUES ($1, $2) RETURNING *",
    [name, ownerid]
  );
};

const getGroupById = async (groupid) => {
  return await pool.query("SELECT groupid, name, ownerid, first_name, last_name FROM groups LEFT JOIN users ON groups.ownerid = users.userid WHERE groupid = $1;", [groupid]);
};

const deleteGroup = async (groupid) => {
  return await pool.query("DELETE FROM groups WHERE groupid = $1", [groupid]);
};

const updateGroup = async (groupid, name, ownerid) => {
  return await pool.query(
    "UPDATE groups SET name = $1, ownerid = $2 WHERE groupid = $3 RETURNING *",
    [name, ownerid, groupid]
  );
};
export { getGroups, insertGroup, getGroupById, deleteGroup, updateGroup };
