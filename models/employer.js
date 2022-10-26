const query = require("../db/dbConnection");
const { multipleColumnSet } = require("../utils/common");
const Role = require("../constants/user");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("./user");

class EmployerModel extends UserModel {
  updateAbout = async () => {
    console.log("update about");
  };
}

module.exports = new EmployerModel();
