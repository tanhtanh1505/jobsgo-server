const employerController = require("../controllers/employer");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

router.get("/:id/alljobs", catchAsync(employerController.getOwnerJobs));

module.exports = router;
