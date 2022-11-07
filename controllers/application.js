const ApplicationModel = require("../models/application");
const JobModel = require("../models/job");
const Role = require("../constants/user");
const HttpException = require("../utils/HttpException");

class ApplicationController {
  getById = async (req, res, next) => {
    const application = await ApplicationModel.findOne({ id: req.params.id });
    if (!application) {
      throw new HttpException(404, "Application not found");
    }

    res.send(application);
  };

  getApplicationOfJob = async (req, res) => {
    //id of job
    const result = await ApplicationModel.findApplicationOfJob(req.params.jobId);
    res.send(result);
  };

  getMyApplication = async (req, res) => {
    if (req.user.role == Role.JobSeeker) {
      const result = await ApplicationModel.findApplicationOfJobSeeker(req.user.id);
      res.send(result);
    } else {
      const jobs = await JobModel.find({ author: req.user.id });
      var list = [];
      for (const job of jobs) {
        const result = await ApplicationModel.findApplicationOfJob(job.id);
        list.push(...result);
      }
      res.send(list);
    }
  };

  createApplication = async (req, res) => {
    //id of job
    const application = await ApplicationModel.findBy({ jobId: req.params.jobId, jobseekerId: req.user.id });
    if (application && application.length > 0) {
      return res.send("Already applied");
    }

    const result = await ApplicationModel.create(req.user.id, req.params.jobId);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Application was created!");
  };

  updateStatus = async (req, res) => {
    const result = await ApplicationModel.update(req.body.status, req.user.id, req.params.jobId);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Application status was updated!");
  };

  deleteApplication = async (req, res) => {
    const result = await ApplicationModel.delete(req.params.ApplicationId);
    if (!result) {
      throw new HttpException(404, "Application not found");
    }

    res.send("Application has been deleted");
  };
}

module.exports = new ApplicationController();
