const employerController = require("../controllers/employer");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

router.get("/:id/alljobs", catchAsync(employerController.getOwnerJobs));

/**
 * @openapi
 * /register:
 *  post:
 *      summary: register a new employer
 *      description: register a new Employer
 *      tags:
 *      - Employer
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              example: "tanhne"
 *                          name:
 *                              example: "Tanh"
 *                          email:
 *                              example: "tanhtanh1505@gmail.com"
 *                          phone:
 *                              example: "0944150502"
 *                          role:
 *                              example: "JobSeeker"
 *                          avatar:
 *                              example: "avatar"
 *                          password:
 *                              type: string
 *                              example: "123"
 *                          about:
 *                              example: "abouthehe"
 *                          wallpaper:
 *                              example: "wallpaper"
 *                          size:
 *                              example: 1000
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/register", middleware.validateCreateEmployer, catchAsync(employerController.register));

module.exports = router;
