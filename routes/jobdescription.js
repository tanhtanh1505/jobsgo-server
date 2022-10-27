const jobDescriptionController = require("../controllers/jobdescription");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

/**
 * @openapi
 * /jobs/create:
 *  post:
 *      tags:
 *      - JobDescription
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
router.post("/create", middleware.verifyToken, middleware.isEmployer, catchAsync(jobDescriptionController.create));

/**
 * @openapi
 * /jobs/all:
 *  get:
 *      tags:
 *      - JobDescription
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/all", catchAsync(jobDescriptionController.getAll));

/**
 * @openapi
 * /jobs/all-mine:
 *  get:
 *      tags:
 *      - JobDescription
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/all-mine", middleware.verifyToken, middleware.isEmployer, catchAsync(jobDescriptionController.getMyJob));

//get, edit, delete
router
  .route("/:id")
  /**
   * @openapi
   * /jobs/{id}:
   *  get:
   *      tags:
   *      - JobDescription
   *      parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *      responses:
   *              200:
   *                  description: success
   */
  .get(catchAsync(jobDescriptionController.getById))
  /**
   * @openapi
   * /jobs/{id}:
   *  put:
   *      tags:
   *      - JobDescription
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
  .put(middleware.verifyToken, middleware.isJobsCreator, catchAsync(jobDescriptionController.update))
  /**
   * @openapi
   * /jobs/{id}:
   *  delete:
   *      tags:
   *      - JobDescription
   *      parameters:
   *       - in: path
   *         name: id
   *         type: string
   *         required: true
   *      responses:
   *              200:
   *                  description: success
   */
  .delete(middleware.verifyToken, middleware.isJobsCreator, catchAsync(jobDescriptionController.delete));

module.exports = router;
