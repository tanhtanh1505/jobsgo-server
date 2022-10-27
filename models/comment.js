const query = require("../db/dbConnection");
const { multipleColumnSet } = require("../utils/common");
const Role = require("../constants/user");
const { v4: uuidv4 } = require("uuid");
class CommentModel {
  find = async (params = {}) => {
    let sql = `SELECT * FROM comment`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM comment WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    return result[0];
  };

  //find all comments of a job
  findCommentOfJob = async (job_id) => {
    const sql = `SELECT * FROM comment WHERE job_id = ?`;
    const result = await query(sql, [job_id]);
    return result;
  };

  create = async (author, job_id, content) => {
    const id = uuidv4();
    const sql = `INSERT INTO comment (id, author, job_id, content) VALUES (?,?,?,?)`;
    const result = await query(sql, [id, author, job_id, content]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE comment SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM comment WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new CommentModel();
