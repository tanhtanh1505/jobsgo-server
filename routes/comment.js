const commentController = require("../controllers/comment");
const router = require("express").Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

/**
 * @openapi
 * /jobs/{id}/comments:
 *  get:
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
router.get("/", catchAsync(commentController.getCommentOfJob));

/**
 * @openapi
 * /jobs/{id}/comments/create:
 *  post:
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
router.post("/create", middleware.verifyToken, catchAsync(commentController.createComment));

/**
 * @openapi
 * /jobs/{id}/comments/{commentId}:
 *  get:
 *      tags:
 *      - Comment
 *      parameters:
 *       - in: path
 *         name: commentId
 *         type: string
 *         required: true
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/:commentId", catchAsync(commentController.getComment));

/**
 * @openapi
 * /jobs/{id}/comments/{commentId}:
 *  put:
 *      tags:
 *      - Comment
 *      parameters:
 *       - in: path
 *         name: commentId
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
 *                            example: "content"
 *      responses:
 *              200:
 *                  description: success
 */
router.put("/:commentId", middleware.verifyToken, catchAsync(commentController.updateComment));

/**
 * @openapi
 * /jobs/{id}/comments/{commentId}:
 *  delete:
 *      tags:
 *      - Comment
 *      parameters:
 *       - in: path
 *         name: commentId
 *         type: string
 *         required: true
 *      responses:
 *              200:
 *                  description: success
 */
router.delete("/:commentId", middleware.verifyToken, middleware.isCommentCreator, catchAsync(commentController.deleteComment));

module.exports = router;
