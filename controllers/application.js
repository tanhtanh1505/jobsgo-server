const ApplicationModel = require("../models/application");
const JobModel = require("../models/job");
const Role = require("../constants/user");
const HttpException = require("../utils/HttpException");

class ApplicationController {
  getApplicationOfJob = async (req, res) => {
    //id of job
    const result = await ApplicationModel.findApplicationOfJob(req.params.id);
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
    const application = await ApplicationModel.findBy({ jobId: req.params.id, jobseekerId: req.user.id });
    if (application && application.length > 0) {
      return res.send("Already applied");
    }

    const result = await ApplicationModel.create(req.user.id, req.params.id);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Application was created!");
  };

  //mark application
  markApplication = async (req, res) => {
    const application = await ApplicationModel.findBy({ jobId: req.params.id, jobseekerId: req.user.id });
    if (!(application && application.length > 0)) {
      await this.createApplication(req, res);
    }

    const result = await ApplicationModel.mark(req.user.id, req.params.id);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Application was marked!");
  };

  unmarkApplication = async (req, res) => {
    const application = await ApplicationModel.findBy({ jobId: req.params.id, jobseekerId: req.user.id });
    if (!(application && application.length > 0)) {
      throw new HttpException(500, "Application not exist");
    }

    const result = await ApplicationModel.unmark(req.user.id, req.params.id);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Application was unmarked!");
  };

  //accept an application
  acceptApplication = async (req, res) => {
    const result = await ApplicationModel.accept(req.params.id, req.params.jobId);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Application was accepted!");
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
