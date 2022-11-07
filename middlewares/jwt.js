const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const CommentModel = require("../models/comment");
const JobModel = require("../models/job");
const HttpException = require("../utils/HttpException");
const Role = require("../constants/user");

module.exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const bearer = "Bearer ";

    if (!authHeader || !authHeader.startsWith(bearer)) {
      throw new HttpException(401, "Access denied. No credentials sent!");
    }

    const token = authHeader.replace(bearer, "");
    const secretKey = process.env.JWT_ACCESS_KEY || "";

    // Verify Token
    const decoded = jwt.verify(token, secretKey);
    const user = await UserModel.findOne({ id: decoded.id });

    if (!user) {
      throw new HttpException(401, "Authentication failed!");
    }

    req.user = user;
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

module.exports.isEmployer = async (req, res, next) => {
  try {
    if (req.user.role != Role.Employer) {
      throw new HttpException(404, "You are not employer");
    }

    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

module.exports.isJobSeeker = async (req, res, next) => {
  try {
    if (req.user.role != Role.JobSeeker) {
      throw new HttpException(404, "You are not jobseeker");
    }

    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

module.exports.isJobsCreator = async (req, res, next) => {
  try {
    const cur_job = await JobModel.findOne({ id: req.params.jobId });
    if (cur_job.author != req.user.id) {
      throw new HttpException(404, "You are not author");
    }

    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

module.exports.isCommentCreator = async (req, res, next) => {
  try {
    const cur_comment = await CommentModel.findOne({ id: req.params.commentId });
    if (cur_comment.author != req.user.id) {
      throw new HttpException(404, "You are not author");
    }

    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};
