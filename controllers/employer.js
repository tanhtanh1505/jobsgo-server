const JobModel = require("../models/job");
const UserModel = require("../models/user");
const EmployerModel = require("../models/employer");
const { v4: uuidv4 } = require("uuid");
const Role = require("../constants/user");
const bcrypt = require("bcryptjs");

module.exports.register = async (req, res) => {
  const { username, name, password, email, phone, avatar, address, about, wallpaper, size } = req.body;
  const id = uuidv4();
  var user = await UserModel.findOne({ username });
  if (user) {
    return res.status(409).send("Username already in use");
  }
  user = await UserModel.findOne({ email });
  if (user) {
    return res.status(409).send("Email already in use");
  }
  user = await UserModel.findOne({ phone });
  if (user) {
    return res.status(409).send("Phone already in use");
  }
  hashedpassword = await bcrypt.hash(password, 8);
  const newUser = await UserModel.create({
    id,
    username,
    password: hashedpassword,
    name,
    email,
    phone,
    role: Role.Employer,
    avatar,
    address,
  });
  if (newUser) {
    const newEmployer = await EmployerModel.create({ id: id, about: about, wallpaper: wallpaper, size: size });
    if (newEmployer) {
      return res.status(200).send("Employer registered successfully");
    }
    return res.status(500).send("Error registering employer");
  }
  return res.status(500).send("Error registering employer");
};

//edit profile
module.exports.editProfile = async (req, res) => {
  const { about, wallpaper, size } = req.body;
  const employer = await EmployerModel.findOne({ id: req.user.id });
  if (!employer) {
    return res.status(409).send("Employer not found");
  }
  const newEmployer = await EmployerModel.update(
    {
      about,
      wallpaper,
      size,
    },
    req.user.id
  );
  if (newEmployer) {
    return res.status(200).send("Employer edited successfully");
  }
  return res.status(500).send("Error editing employer");
};

//get current employer
module.exports.getCurrentEmployer = async (req, res) => {
  return res.status(200).send(await getEmployerWithoutPassword(req.user.id));
};

//get employer by id
module.exports.getEmployerById = async (req, res) => {
  return res.status(200).send(await getEmployerWithoutPassword(req.params.id));
};

getEmployerWithoutPassword = async (id) => {
  const employer = await EmployerModel.findOne({ id: id });
  if (!employer) {
    return null;
  }
  const { password, ...employerWithoutPassword } = employer;
  return employerWithoutPassword;
};
