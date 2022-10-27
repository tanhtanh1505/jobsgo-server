const userController = require("../controllers/user");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

/**
 * @openapi
 * /register:
 *  post:
 *      summary: register a new user
 *      description: register a new user, set role to Employer or JobSeeker
 *      tags:
 *      - User
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
 *                          interested:
 *                              example: "interestedhehe"
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/register", catchAsync(userController.createUser));

/**
 * @openapi
 * /login:
 *  post:
 *      summary: login
 *      tags:
 *      - User
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              example: "tanhne"
 *                          password:
 *                              type: string
 *                              example: "123"
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/login", catchAsync(userController.userLogin));
/**
 * @openapi
 * /logout:
 *  post:
 *      summary: logout
 *      tags:
 *      - User
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/logout", middleware.verifyToken, catchAsync(userController.userLogout));
/**
 * @openapi
 * /refreshToken:
 *  post:
 *      summary: refresh token
 *      tags:
 *      - User
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/refreshToken", catchAsync(userController.refreshRToken));
/**
 * @openapi
 * /profile:
 *  get:
 *      summary: get profile of user
 *      tags:
 *      - User
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/profile", middleware.verifyToken, catchAsync(userController.getCurrentUser));
/**
 * @openapi
 * /info/{username}:
 *  get:
 *      summary: get info of other user
 *      tags:
 *      - User
 *      parameters:
 *       - in: path
 *         name: username
 *         type: string
 *         required: true
 *         description: username
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/info/:username", catchAsync(userController.getUserByUserName));
// router.post("/uploadAvatar", catchAsync(user.uploadAvatar));

module.exports = router;
