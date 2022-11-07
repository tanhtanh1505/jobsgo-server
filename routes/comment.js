const commentController = require("../controllers/comment");
const router = require("express").Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

/**
 * @openapi
 * /job/{id}/comments:
 *  get:
 *      summary: get all comments of a job
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
 * /job/{id}/comments/create:
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
router.post("/create", middleware.verifyToken, catchAsync(commentController.createComment));

/**
 * @openapi
 * /job/{id}/comments/{commentId}:
 *  get:
 *      summary: get comment by id
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
 * /job/{id}/comments/{commentId}:
 *  put:
 *      summary: update comment
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
 * /job/{id}/comments/{commentId}:
 *  delete:
 *      summary: Delete a comment
 *      description: Delete a comment
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
