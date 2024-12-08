import { pool } from "../helpers/db.js";

const getMembersByGroup = async (groupid) => {
  return await pool.query(
    "SELECT members.memberid, members.userid, members.groupid, users.first_name, users.last_name, groups.name, groups.groupid FROM members LEFT JOIN groups ON groups.groupid = members.groupid LEFT JOIN users ON users.userid = members.userid WHERE members.groupid = $1",
    [groupid]
  );
};

const getGroupsByUser = async (userid) => {
  return await pool.query(
    "SELECT members.memberid, members.userid, members.groupid, users.first_name, users.last_name, groups.name, groups.groupid FROM members LEFT JOIN groups ON groups.groupid = members.groupid LEFT JOIN users ON users.userid = members.userid WHERE members.userid = $1",
    [userid]
  );
};
export { getMembersByGroup, getGroupsByUser };
