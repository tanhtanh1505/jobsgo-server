const { createApplicationSchema, updateApplicationSchema } = require("../../schemas/application");
const HttpException = require("../../utils/HttpException");
module.exports.validateCreateApplication = (req, res, next) => {
  const { error } = createApplicationSchema.validate(req.body);
  if (error) {
    throw new HttpException(500, error.message);
  }
  next();
};

module.exports.validateUpdateApplication = (req, res, next) => {
  const { error } = updateApplicationSchema.validate(req.body);
  if (error) {
    throw new HttpException(500, error.message);
  }
  next();
};
