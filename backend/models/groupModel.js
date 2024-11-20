import { pool } from "../helpers/db.js";

const getGroups = async () => {
  return await pool.query("SELECT * FROM groups");
};

const insertGroup = async (name, ownerid) => {
  return await pool.query(
    "INSERT INTO groups (name, ownerid) VALUES ($1, $2) RETURNING *",
    [name, ownerid]
  );
};

const getGroupById = async (groupid) => {
  return await pool.query("SELECT * FROM groups WHERE groupid = $1", [groupid]);
};

const deleteGroup = async (groupid) => {
  return await pool.query("DELETE FROM groups WHERE groupid = $1", [groupid]);
};
export { getGroups, insertGroup, getGroupById, deleteGroup };
