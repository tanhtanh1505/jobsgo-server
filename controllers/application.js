const ApplicationModel = require("../models/application");
const JobModel = require("../models/job");
const Role = require("../constants/user");

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
    const application = await ApplicationModel.findBy({ job_id: req.params.id, jobseeker_id: req.user.id });
    if (application) {
      return res.send("Already applied");
    }

    const result = await ApplicationModel.create(req.user.id, req.params.id);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Application was created!");
  };

  //accept an application
  acceptApplication = async (req, res) => {
    const result = await ApplicationModel.accept(req.params.id, req.params.job_id);

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
