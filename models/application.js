const query = require("../db/dbConnection");
const { multipleColumnSet } = require("../utils/common");
const Role = require("../constants/user");
const { v4: uuidv4 } = require("uuid");
class ApplicationModel {
  find = async (params = {}) => {
    let sql = `SELECT * FROM application`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM application WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    return result[0];
  };

  findBy = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    var sql = `SELECT * FROM application WHERE ${columnSet}`;

    sql = sql.replace(",", " AND");

    console.log(sql);

    const result = await query(sql, [...values]);

    return result;
  };

  //find all applications of a job
  findApplicationOfJob = async (job_id) => {
    const sql = `SELECT * FROM application WHERE job_id = ?`;
    const result = await query(sql, [job_id]);
    return result;
  };

  //find all applications of a user
  findApplicationOfJobSeeker = async (user_id) => {
    const sql = `SELECT * FROM application WHERE jobseeker_id = ?`;
    const result = await query(sql, [user_id]);
    return result;
  };

  create = async (jobseeker_id, job_id) => {
    const sql = `INSERT INTO application (jobseeker_id, job_id) VALUES (?,?)`;
    const result = await query(sql, [jobseeker_id, job_id]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  //mark an application as accepted
  accept = async (jobseeker_id, job_id) => {
    const sql = `UPDATE application SET status = 'accepted' WHERE jobseeker_id = ? AND job_id = ?`;
    const result = await query(sql, [jobseeker_id, job_id]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  //mark an application in bookbark
  mark = async (jobseeker_id, job_id) => {
    const sql = `UPDATE application SET status = 'marked' WHERE jobseeker_id = ? AND job_id = ?`;
    const result = await query(sql, [jobseeker_id, job_id]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  delete = async (jobseeker_id, job_id) => {
    const sql = `DELETE FROM application WHERE jobseeker_id = ? AND job_id = ?`;
    const result = await query(sql, [jobseeker_id, job_id]);

    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new ApplicationModel();
