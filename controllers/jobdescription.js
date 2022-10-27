const UserModel = require("../models/user");
const JobModel = require("../models/job");
const HttpException = require("../utils/HttpException");
const dotenv = require("dotenv");
dotenv.config();

class JobController {
  getAll = async (req, res) => {
    let list = await JobModel.find();
    res.send(list);
  };

  getById = async (req, res) => {
    const job = await JobModel.findOne({ id: req.params.id });
    if (!job) {
      throw new HttpException(404, "Job not found");
    }
    res.send(job);
  };

  getMyJob = async (req, res) => {
    let listJobs = await JobModel.find({ author: req.user.id });

    res.send(listJobs);
  };

  create = async (req, res) => {
    const { title, description, requirement, tags } = req.body;

    if (!title || !description || !requirement || !tags)
      throw new HttpException(500, "Fill all required feild: title, description, requirement, tags");

    const result = await JobModel.create(req.body, req.user.id);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Jobs was created!");
  };

  update = async (req, res) => {
    const result = await JobModel.update(req.body, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? "User not found" : affectedRows && changedRows ? "User updated successfully" : "Updated faild";

    res.send({ message, info });
  };

  delete = async (req, res) => {
    const result = await JobModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Job not found");
    }
    res.send("Job has been deleted");
  };
}

module.exports = new JobController();
