const employerController = require("../controllers/employer");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/jwt");
const { validateCreateEmployer, validateUpdateEmployer } = require("../middlewares/validate/employer");
const commentController = require("../controllers/comment");
const { validateCreateComment } = require("../middlewares/validate/comment");

/**
 * @openapi
 * /employer:
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
router.post("/", validateCreateEmployer, catchAsync(employerController.register));

/**
 * @openapi
 * /employer:
 *  put:
 *      summary: update profile of employer
 *      description: update profile of employer
 *      tags:
 *      - Employer
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
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
router.put("/", middleware.verifyToken, middleware.isEmployer, validateUpdateEmployer, catchAsync(employerController.updateProfile));

/**
 * @openapi
 * /employer:
 *  get:
 *      summary: get current employer profile
 *      tags:
 *      - Employer
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/", middleware.verifyToken, catchAsync(employerController.getCurrentEmployer));

/**
 * @openapi
 * /employer/{id}:
 *  get:
 *      summary: get employer by id
 *      tags:
 *      - Employer
 *      parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: id
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/:id", catchAsync(employerController.getEmployerById));

/**
 * @openapi
 * /employer/{id}/comments:
 *  get:
 *      summary: get all comments of a employer
 *      tags:
 *      - Comment
 *      parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/:id/comments", catchAsync(commentController.getCommentOfEmployer));

/**
 * @openapi
 * /employer/{id}/comment:
 *  post:
 *      summary: create a comment
 *      tags:
 *      - Comment
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
 *                          content:
 *                             example: "content"
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/:id/comment", middleware.verifyToken, validateCreateComment, catchAsync(commentController.createComment));

module.exports = router;
