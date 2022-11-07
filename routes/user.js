const userController = require("../controllers/user");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/jwt");
const { validateCreateUser, validateUpdateUser } = require("../middlewares/validate/user");

/**
 * @openapi
 * /user/profile:
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
 * /user/edit-profile:
 *  put:
 *      summary: edit profile of user
 *      description: edit profile of user
 *      tags:
 *      - User
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              example: "Tanh"
 *                          avatar:
 *                              example: "avatar"
 *                          address:
 *                              example: "address"
 *      responses:
 *              200:
 *                  description: success
 */
router.put("/update", middleware.verifyToken, validateUpdateUser, catchAsync(userController.updateUser));
/**
 * @openapi
 * /user/delete:
 *  delete:
 *      summary: delete user
 *      tags:
 *      - User
 *      responses:
 *              200:
 *                  description: success
 */
router.delete("/delete", middleware.verifyToken, catchAsync(userController.deleteUser));
/**
 * @openapi
 * /user/allUser:
 *  delete:
 *      summary: api test get all user
 *      tags:
 *      - User
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/allUser", catchAsync(userController.getAllUsers));
/**
 * @openapi
 * /user/{username}:
 *  get:
 *      summary: get user by username
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
router.get("/:username", catchAsync(userController.getUserByUserName));

// router.post("/uploadAvatar", catchAsync(user.uploadAvatar));

module.exports = router;
