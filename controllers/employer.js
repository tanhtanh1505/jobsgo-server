const JobModel = require("../models/job");

class EmployerController {
  getOwnerJobs = async (req, res) => {
    const result = await JobModel.find({ author: req.params.id });
    res.send(result);
  };

  getJob = async (req, res) => {
    const result = await JobModel.findOne({ id: req.params.id });
    res.send(result);
  };

  createJob = async (req, res) => {
    const result = await JobModel.create(req.body, req.params.id);
    res.send(result);
  };

  updateJob = async (req, res) => {
    const result = await JobModel.update(req.body, req.params.id);
    res.send(result);
  };

  deleteJob = async (req, res) => {
    const result = await JobModel.delete(req.params.id);
    res.send(result);
  };
}

module.exports = new EmployerController();
