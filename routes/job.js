const jobController = require("../controllers/job");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/jwt");
const { validateCreateJob, validateUpdateJob } = require("../middlewares/validate/job");

/**
 * @openapi
 * /job/create:
 *  post:
 *      summary: create a job for employer
 *      tags:
 *      - Job
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              example: "title"
 *                          description:
 *                              example: "description"
 *                          requirements:
 *                              example: "requirements"
 *                          tags:
 *                              example: "tags"
 *                          startTime:
 *                              example: "2022-11-01"
 *                          endTime:
 *                              example: "2022-12-01"
 *                          salary:
 *                              example: 1000
 *                          typeOfWorking:
 *                              example: "fulltime"
 *                          gender:
 *                              example: "male"
 *                          positions:
 *                              example: "staff"
 *                          slots:
 *                              example: 10
 *                          exp:
 *                              example: "1 year"
 *                          benefits:
 *                              example: "benefit"
 *                          imageUrl:
 *                              example: "imageUrl"
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/create", middleware.verifyToken, middleware.isEmployer, validateCreateJob, catchAsync(jobController.create));

/**
 * @openapi
 * /job/all:
 *  get:
 *      summary: get all jobs
 *      tags:
 *      - Job
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/all", catchAsync(jobController.getAll));

/**
 * @openapi
 * /job/all-mine:
 *  get:
 *      summary: get all own jobs of current user
 *      tags:
 *      - Job
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/all-mine", middleware.verifyToken, middleware.isEmployer, catchAsync(jobController.getMyJob));

//get, edit, delete
router
  .route("/:jobId")
  /**
   * @openapi
   * /job/{id}:
   *  get:
   *      summary: get job by id
   *      tags:
   *      - Job
   *      parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *      responses:
   *              200:
   *                  description: success
   */
  .get(catchAsync(jobController.getById))
  /**
   * @openapi
   * /job/{jobId}:
   *  put:
   *      summary: edit an own job for employer
   *      tags:
   *      - Job
   *      parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *      requestBody:
   *          require: true
   *          content:
   *              application/json:
   *                  schema:
   *                      type: object
   *                      properties:
   *                          title:
   *                              example: "title"
   *                          description:
   *                              example: "description"
   *                          requirement:
   *                              example: "requirement"
   *                          tags:
   *                              example: "tags"
   *                          startTime:
   *                              example: "2022-11-01"
   *                          endTime:
   *                              example: "2022-12-01"
   *                          salary:
   *                              example: 1000
   *                          typeOfWorking:
   *                              example: "fulltime"
   *                          gender:
   *                              example: "male"
   *                          position:
   *                              example: "staff"
   *                          slots:
   *                              example: 10
   *                          exp:
   *                              example: "1 year"
   *                          benefits:
   *                              example: "benefit"
   *                          imageUrl:
   *                              example: "imageUrl"
   *      responses:
   *              200:
   *                  description: success
   */
  .put(middleware.verifyToken, middleware.isJobsCreator, validateUpdateJob, catchAsync(jobController.update))
  /**
   * @openapi
   * /job/{jobId}:
   *  delete:
   *      summary: delete own job for employer
   *      tags:
   *      - Job
   *      parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *      responses:
   *              200:
   *                  description: success
   */
  .delete(middleware.verifyToken, middleware.isJobsCreator, catchAsync(jobController.delete));

module.exports = router;
