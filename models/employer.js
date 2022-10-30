const query = require("../db/dbConnection");
const { multipleColumnSet, multipleColumnGet } = require("../utils/common");

class EmployerModel {
  find = async (params = {}) => {
    let sql = `SELECT * FROM user INNER JOIN employer ON user.id = employer.id`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnGet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnGet(params);

    const sql = `SELECT * FROM user INNER JOIN employer ON user.id = employer.id WHERE ${columnSet} LIMIT 1`;

    console.log(sql);
    const result = await query(sql, [...values]);

    return result[0];
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE employer SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };
}

module.exports = new EmployerModel();
