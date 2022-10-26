const JobDescriptionModel = require("../models/jobdescription");

class EmployerController {
  getOwnerJobs = async (req, res) => {
    const result = await JobDescriptionModel.find({ author: req.params.id });
    res.send(result);
  };
}

module.exports = new EmployerController();
