const JobModel = require("../models/job");
const UserModel = require("../models/user");
const EmployerModel = require("../models/employer");
const { v4: uuidv4 } = require("uuid");
const Role = require("../constants/user");

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
  const newUser = await UserModel.create({
    id,
    username,
    password,
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

module.exports.getOwnerJobs = async (req, res) => {
  const result = await JobModel.find({ author: req.params.id });
  res.send(result);
};

module.exports.getJob = async (req, res) => {
  const result = await JobModel.findOne({ id: req.params.id });
  res.send(result);
};

module.exports.createJob = async (req, res) => {
  const result = await JobModel.create(req.body, req.params.id);
  res.send(result);
};

module.exports.updateJob = async (req, res) => {
  const result = await JobModel.update(req.body, req.params.id);
  res.send(result);
};

module.exports.deleteJob = async (req, res) => {
  const result = await JobModel.delete(req.params.id);
  res.send(result);
};
