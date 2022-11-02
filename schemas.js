const Joi = require("joi");

module.exports.createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  phone: Joi.string().required(),
  role: Joi.string().required().valid("JobSeeker", "Employer"),
  avatar: Joi.string().allow(""),
  address: Joi.string().allow(""),
});

//create employer schema
module.exports.createEmployerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  username: Joi.string().required(),
  phone: Joi.string().required(),
  avatar: Joi.string().allow(""),
  address: Joi.string().allow(""),
  about: Joi.string().allow(""),
  wallpaper: Joi.string().allow(""),
  size: Joi.number().allow(""),
});

module.exports.loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports.updateUserSchema = Joi.object({
  name: Joi.string(),
  avatar: Joi.string().allow(""),
  address: Joi.string().allow(""),
});

module.exports.updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});
