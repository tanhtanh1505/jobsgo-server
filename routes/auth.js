const userController = require("../controllers/user");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/jwt");
const validateAuth = require("../middlewares/validate/auth");

/**
 * @openapi
 * /login:
 *  post:
 *      summary: login
 *      tags:
 *      - Auth
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
router.post("/login", validateAuth.validateLogin, catchAsync(userController.userLogin));
/**
 * @openapi
 * /logout:
 *  post:
 *      summary: logout
 *      tags:
 *      - Auth
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
 *      - Auth
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/refreshToken", catchAsync(userController.refreshRToken));

/**
 * @openapi
 * /reset-password:
 *  post:
 *      summary: send email to reset password
 *      tags:
 *      - Auth
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: "123@gmail.com"
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/reset-password", validateAuth.validateSendRequestResetPassword, catchAsync(userController.resetPassword));

/**
 * @openapi
 * /reset-password/{token}:
 *  post:
 *      summary: reset password via token
 *      tags:
 *      - Auth
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/reset-password/:token", catchAsync(userController.changePassword));

module.exports = router;
