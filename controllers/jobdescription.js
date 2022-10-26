const UserModel = require("../models/user");
const JobDescriptionModel = require("../models/jobdescription");
const HttpException = require("../utils/HttpException");
const dotenv = require("dotenv");
dotenv.config();

class JobDescriptionController {
  getAll = async (req, res) => {
    let list = await JobDescriptionModel.find();
    res.send(list);
  };

  getById = async (req, res) => {
    const jobdescription = await JobDescriptionModel.findOne({ id: req.params.id });
    if (!jobdescription) {
      throw new HttpException(404, "JobDescription not found");
    }
    res.send(jobdescription);
  };

  getMyJobDescription = async (req, res) => {
    let listJobs = await JobDescriptionModel.find({ author: req.user.id });

    res.send(listJobs);
  };

  create = async (req, res) => {
    const { title, description, requirement, tag } = req.body;

    if (!title || !description || !requirement || !tag) throw new HttpException(500, "Fill all required feild: title, description, requirement, tag");

    const result = await JobDescriptionModel.create(req.body, req.user.id);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Jobs was created!");
  };

  update = async (req, res) => {
    const result = await JobDescriptionModel.update(req.body, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? "User not found" : affectedRows && changedRows ? "User updated successfully" : "Updated faild";

    res.send({ message, info });
  };

  delete = async (req, res) => {
    const result = await UserModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Job not found");
    }
    res.send("Job has been deleted");
  };
}

module.exports = new JobDescriptionController();
