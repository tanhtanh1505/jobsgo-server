const query = require("../db/dbConnection");
const { multipleColumnSet, multipleColumnGet } = require("../utils/common");
const Role = require("../constants/user");
const { v4: uuidv4 } = require("uuid");
class ApplicationModel {
  find = async (params = {}) => {
    let sql = `SELECT * FROM application`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnGet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM application WHERE ${columnSet} LIMIT 1`;

    const result = await query(sql, [...values]);

    return result[0];
  };

  findBy = async (params) => {
    const { columnSet, values } = multipleColumnGet(params);

    var sql = `SELECT * FROM application WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    return result;
  };

  //find all applications of a job
  findApplicationOfJob = async (jobId) => {
    const sql = `SELECT * FROM application WHERE jobId = ?`;
    const result = await query(sql, [jobId]);
    return result;
  };

  //find all applications of a user
  findApplicationOfJobSeeker = async (user_id) => {
    const sql = `SELECT * FROM application WHERE jobseekerId = ?`;
    const result = await query(sql, [user_id]);
    return result;
  };

  create = async (jobseekerId, jobId) => {
    const sql = `INSERT INTO application (jobseekerId, jobId) VALUES (?,?)`;
    const result = await query(sql, [jobseekerId, jobId]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  //mark an application as accepted
  accept = async (jobseekerId, jobId) => {
    const sql = `UPDATE application SET status = 'accepted' WHERE jobseekerId = ? AND jobId = ?`;
    const result = await query(sql, [jobseekerId, jobId]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  //mark an application in bookbark
  mark = async (jobseekerId, jobId) => {
    const sql = `UPDATE application SET marked = 1 WHERE jobseekerId = ? AND jobId = ?`;
    const result = await query(sql, [jobseekerId, jobId]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  unmark = async (jobseekerId, jobId) => {
    const sql = `UPDATE application SET marked = 0 WHERE jobseekerId = ? AND jobId = ?`;
    const result = await query(sql, [jobseekerId, jobId]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  delete = async (jobseekerId, jobId) => {
    const sql = `DELETE FROM application WHERE jobseekerId = ? AND jobId = ?`;
    const result = await query(sql, [jobseekerId, jobId]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new ApplicationModel();
