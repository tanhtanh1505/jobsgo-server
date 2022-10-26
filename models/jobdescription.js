const query = require("../db/dbConnection");
const { multipleColumnSet } = require("../utils/common");
const { v4: uuidv4 } = require("uuid");
class JobDescriptionModel {
  find = async (params = {}) => {
    let sql = `SELECT * FROM jobs_description`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM jobs_description WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    return result[0];
  };

  create = async ({ title, description, requirement, start_time = null, end_time = null, tag }, author) => {
    const sql = `INSERT INTO jobs_description (id, title, description, requirement, author, start_time, end_time, tag) VALUES (?,?,?,?,?,?,?,?)`;
    const id = uuidv4();
    console.log({ title, description, requirement, start_time, end_time, tag });
    const result = await query(sql, [id, title, description, requirement, author, start_time, end_time, tag]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE jobs_description SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM jobs_description WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new JobDescriptionModel();
