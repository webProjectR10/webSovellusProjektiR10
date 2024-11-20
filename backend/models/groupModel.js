import { pool } from "../helpers/db.js";

const getGroups = async () => {
  return await pool.query("SELECT * FROM groups");
};

export { getGroups };
