const query = require("../db/dbConnection");
const { multipleColumnSet } = require("../utils/common");
const { v4: uuidv4 } = require("uuid");
class JobModel {
  find = async (params = {}) => {
    let sql = `SELECT * FROM job`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM job WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    return result[0];
  };

  create = async (
    {
      title,
      description,
      requirements,
      tags,
      startTime = null,
      endTime = null,
      salary,
      typeOfWorking,
      sex,
      positions,
      slots,
      exp,
      location,
      benefits,
      imageUrl,
    },
    author
  ) => {
    const sql = `INSERT INTO job (id, title, description, requirements, tags, startTime, endTime, salary, typeOfWorking, sex, positions, slots, exp, location, benefits, imageUrl, author) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    const id = uuidv4();
    const result = await query(sql, [
      id,
      title,
      description,
      requirements,
      tags,
      startTime,
      endTime,
      salary,
      typeOfWorking,
      sex,
      positions,
      slots,
      exp,
      location,
      benefits,
      imageUrl,
      author,
    ]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE job SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM job WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
}

module.exports = new JobModel();
