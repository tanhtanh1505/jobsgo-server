const query = require("../db/dbConnection");
const { multipleColumnSet } = require("../utils/common");

class JobseekerModel {
  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE jobseeker SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };
}

module.exports = new JobseekerModel();
