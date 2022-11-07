const UserModel = require("../models/user");
const JobModel = require("../models/job");
const HttpException = require("../utils/HttpException");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");

class JobController {
  getAll = async (req, res) => {
    let list = await JobModel.find();
    res.send(list);
  };

  getById = async (req, res) => {
    const job = await JobModel.findOne({ id: req.params.jobId });
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
    const { title, description, requirements, tags, startTime, endTime, salary, typeOfWorking, gender, positions, slots, exp, benefits, imageUrl } =
      req.body;
    const newJobId = uuidv4();
    const result = await JobModel.create({
      id: newJobId,
      title,
      description,
      requirements,
      tags,
      author: req.user.id,
      startTime,
      endTime,
      salary,
      typeOfWorking,
      gender,
      positions,
      slots,
      exp,
      benefits,
      imageUrl,
    });

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Jobs was created!");
  };

  update = async (req, res) => {
    const result = await JobModel.update(req.body, req.params.jobId);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? "Job not found" : affectedRows && changedRows ? "Job updated successfully" : "Updated faild";

    res.send({ message, info });
  };

  delete = async (req, res) => {
    const result = await JobModel.delete(req.params.jobId);
    if (!result) {
      throw new HttpException(404, "Job not found");
    }
    res.send("Job has been deleted");
  };
}

module.exports = new JobController();
