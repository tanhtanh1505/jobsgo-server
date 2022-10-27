const applicationController = require("../controllers/application");
const router = require("express").Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/auth");

/**
 * @openapi
 * /applications:
 *  get:
 *      summary: get applications of current user
 *      description: get own applications of current user
 *      tags:
 *      - Application
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/", middleware.verifyToken, catchAsync(applicationController.getMyApplication));

/**
 * @openapi
 * /applications/{id}/create:
 *  post:
 *      summary: create an application
 *      description: for jobseeker create an application of jobId
 *      tags:
 *      - Application
 *      parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/:id/create", middleware.verifyToken, middleware.isJobSeeker, catchAsync(applicationController.createApplication));

/**
 * @openapi
 * /applications/{id}/mark:
 *  post:
 *      summary: mark an application
 *      description: for jobseeker to mark an application of jobId
 *      tags:
 *      - Application
 *      parameters:
 *       - in: path
 *         name: jobId
 *         type: string
 *         required: true
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/:id/mark", middleware.verifyToken, middleware.isJobSeeker, catchAsync(applicationController.markApplication));

/**
 * @openapi
 * /applications/{id}/unmark:
 *  post:
 *      summary: unmark an application
 *      description: for jobseeker to unmark an application of jobId
 *      tags:
 *      - Application
 *      parameters:
 *       - in: path
 *         name: jobId
 *         type: string
 *         required: true
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/:id/unmark", middleware.verifyToken, middleware.isJobSeeker, catchAsync(applicationController.unmarkApplication));

/**
 * @openapi
 * /applications/{id}:
 *  get:
 *      summary: get application for employer
 *      description: get own application by jobId for employer
 *      tags:
 *      - Application
 *      parameters:
 *       - in: path
 *         name: jobId
 *         type: string
 *         required: true
 *      responses:
 *              200:
 *                  description: success
 */
router.get("/:id", middleware.verifyToken, middleware.isJobsCreator, catchAsync(applicationController.getApplicationOfJob));

module.exports = router;
