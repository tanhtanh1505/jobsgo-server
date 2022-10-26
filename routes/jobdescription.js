const jobDescriptionController = require("../controllers/jobdescription");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

//crete
router.post("/create", middleware.verifyToken, catchAsync(jobDescriptionController.create));

//get, edit, delete
router
  .route("/:id")
  .get(catchAsync(jobDescriptionController.find))
  .put(middleware.verifyToken, catchAsync(jobDescriptionController.edit))
  .delete(middleware.verifyToken, catchAsync(jobDescriptionController.delete));

module.exports = router;
