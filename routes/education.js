const educationController = require("../controllers/education");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/jwt");
const { validateCreateEducation, validateUpdateEducation } = require("../middlewares/validate/education");

/**
 * @openapi
 * /education/create:
 *  post:
 *      summary: create an education for job seeker
 *      tags:
 *      - Education
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          school:
 *                              example: "school"
 *                          degree:
 *                              example: "degree"
 *                          major:
 *                              example: "major"
 *                          startDate:
 *                              example: "2022-11-01"
 *                          endDate:
 *                              example: "2022-12-01"
 *                          description:
 *                              example: "description"
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/create", middleware.verifyToken, middleware.isJobSeeker, validateCreateEducation, catchAsync(educationController.create));

/**
 * @openapi
 * /education/all-mine:
 *  get:
 *      summary: get all own educations of current user
 *      tags:
 *      - Education
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/all-mine", middleware.verifyToken, middleware.isJobSeeker, catchAsync(educationController.getMine));

//get, edit, delete
router
  .route("/:educationId")
  /**
   * @openapi
   * /education/{educationId}:
   *  get:
   *      summary: get education by id
   *      tags:
   *      - Education
   *      parameters:
   *       - in: path
   *         name: educationId
   *         type: string
   *         required: true
   *      responses:
   *              200:
   *                  description: success
   */
  .get(middleware.verifyToken, middleware.isEducationCreator, catchAsync(educationController.getById))
  /**
   * @openapi
   * /education/{educationId}:
   *  put:
   *      summary: edit an own education
   *      tags:
   *      - Education
   *      parameters:
   *       - in: path
   *         name: educationId
   *         type: string
   *         required: true
   *      requestBody:
   *          require: true
   *          content:
   *              application/json:
   *                  schema:
   *                      type: object
   *                      properties:
   *                          school:
   *                              example: "school"
   *                          degree:
   *                              example: "degree"
   *                          major:
   *                              example: "major"
   *                          startDate:
   *                              example: "2022-11-01"
   *                          endDate:
   *                              example: "2022-12-01"
   *                          description:
   *                              example: "description"
   *      responses:
   *              200:
   *                  description: success
   */
  .put(middleware.verifyToken, middleware.isEducationCreator, catchAsync(educationController.update))
  /**
   * @openapi
   * /education/{educationId}:
   *  delete:
   *      summary: delete own education
   *      tags:
   *      - Education
   *      parameters:
   *       - in: path
   *         name: educationId
   *         type: string
   *         required: true
   *      responses:
   *              200:
   *                  description: success
   */
  .delete(middleware.verifyToken, middleware.isEducationCreator, catchAsync(educationController.delete));

module.exports = router;
