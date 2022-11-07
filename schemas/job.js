const Joi = require("joi");

module.exports.createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  requirements: Joi.string().required(),
  tags: Joi.string(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  salary: Joi.number().required(),
  typeOfWorking: Joi.string().required().valid("fulltime", "parttime"),
  gender: Joi.string().valid("male", "female", "all"),
  positions: Joi.string().required(),
  slots: Joi.number().required(),
  exp: Joi.string().required(),
  benefits: Joi.string().required(),
  imageUrl: Joi.string(),
});

module.exports.updateJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  requirements: Joi.string().required(),
  tags: Joi.string(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  salary: Joi.number().required(),
  typeOfWorking: Joi.string().required().valid("fulltime", "parttime"),
  gender: Joi.string().valid("male", "female", "all"),
  positions: Joi.string().required(),
  slots: Joi.number().required(),
  exp: Joi.string().required(),
  benefits: Joi.string().required(),
  imageUrl: Joi.string(),
});
