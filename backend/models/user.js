import { pool } from "../helpers/db.js";

const insertUser = async (fName, lName, email, hashedPassword) => {
  return await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [fName, lName, email, hashedPassword]
  );
};

const selectUserByEmail = async (email) => {
  return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

const getAllUsers = async () => {
  return await pool.query(
    "SELECT userid, first_name, last_name, email FROM users"
  );
};

const getUserById = async (userid) => {
  return await pool.query(
    "SELECT userid, first_name, last_name, email FROM users WHERE userid = $1",
    [userid]
  );
};

const deleteUser = async (userid) => {
  return await pool.query("DELETE FROM users WHERE userid = $1", [userid]);
};

export { insertUser, selectUserByEmail, getAllUsers, getUserById, deleteUser };
