const query = require("../db/dbConnection");
const { multipleColumnSet } = require("../utils/common");
const Role = require("../constants/user");
const { v4: uuidv4 } = require("uuid");
class UserModel {
  find = async (params = {}) => {
    let sql = `SELECT * FROM user`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM user WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  };

  create = async ({ username, password, name, email, phone, role = Role.JobSeeker, avatar = "" }) => {
    const sql = `INSERT INTO user (id, username, password, name, email, phone, role, avatar) VALUES (?,?,?,?,?,?,?,?)`;
    const id = uuidv4();
    const result = await query(sql, [id, username, password, name, email, phone, role, avatar]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM user WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new UserModel();
