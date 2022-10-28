const userController = require("../controllers/user");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

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
 *                          about:
 *                              example: "abouthehe"
 *                          interested:
 *                              example: "interestedhehe"
 *      responses:
 *              200:
 *                  description: success
 */
router.put("/edit-profile", middleware.verifyToken, catchAsync(userController.updateUser));
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
router.get("/allUser", catchAsync(userController.getAllUsers));
/**
 * @openapi
 * /user/{username}:
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
router.get("/:username", catchAsync(userController.getUserByUserName));
// router.post("/uploadAvatar", catchAsync(user.uploadAvatar));

module.exports = router;
