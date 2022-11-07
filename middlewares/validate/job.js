const { createJobSchema, updateJobSchema } = require("../../schemas/job");
const HttpException = require("../../utils/HttpException");

module.exports.validateCreateJob = (req, res, next) => {
  const { error } = createJobSchema.validate(req.body);
  if (error) {
    throw new HttpException(500, error.message);
  }
  next();
};

module.exports.validateUpdateJob = (req, res, next) => {
  const { error } = updateJobSchema.validate(req.body);
  if (error) {
    throw new HttpException(500, error.message);
  }
  next();
};
