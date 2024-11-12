import { pool } from "../helpers/db.js";

const insertUser = async (fName, lName, email, hashedPassword) => {
  return await pool.query(
    "INSERT INTO user (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *"[
      (fName, lName, email, hashedPassword)
    ]
  );
};

const selectUserByEmail = async (email) => {
  return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
};

export { insertUser, selectUserByEmail };
