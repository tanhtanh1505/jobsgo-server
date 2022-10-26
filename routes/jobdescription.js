const jobDescriptionController = require("../controllers/jobdescription");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

router.post("/create", middleware.verifyToken, middleware.isEmployer, catchAsync(jobDescriptionController.create));

router.get("/all", catchAsync(jobDescriptionController.getAll));
router.get("/all-mine", middleware.verifyToken, middleware.isEmployer, catchAsync(jobDescriptionController.getMyJobDescription));

//get, edit, delete
router
  .route("/:id")
  .get(catchAsync(jobDescriptionController.getById))
  .put(middleware.verifyToken, middleware.isJobsCreator, catchAsync(jobDescriptionController.update))
  .delete(middleware.verifyToken, middleware.isJobsCreator, catchAsync(jobDescriptionController.delete));

module.exports = router;
