const jobController = require("../controllers/job");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

/**
 * @openapi
 * /jobs/create:
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
 *                          requirement:
 *                              example: "requirement"
 *                          tags:
 *                              example: "tags"
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/create", middleware.verifyToken, middleware.isEmployer, catchAsync(jobController.create));

/**
 * @openapi
 * /jobs/all:
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
 * /jobs/all-mine:
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
  .route("/:id")
  /**
   * @openapi
   * /jobs/{id}:
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
   * /jobs/{id}:
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
   *      responses:
   *              200:
   *                  description: success
   */
  .put(middleware.verifyToken, middleware.isJobsCreator, catchAsync(jobController.update))
  /**
   * @openapi
   * /jobs/{id}:
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
