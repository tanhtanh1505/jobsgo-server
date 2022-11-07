const Joi = require("joi");
const applicationStatus = require("../constants/application");

module.exports.createApplicationSchema = Joi.object({
  jobseekerId: Joi.string().required(),
  jobId: Joi.string().required(),
});

module.exports.updateApplicationSchema = Joi.object({
  status: Joi.string().required().valid(applicationStatus),
});
