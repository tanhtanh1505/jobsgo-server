const applicationController = require("../controllers/application");
const router = require("express").Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/jwt");
const { validateCreateApplication } = require("../middlewares/validate/application");

// /**
//  * @openapi
//  * /job/{jobId}/application:
//  *  get:
//  *      summary: get applications of current user
//  *      description: get own applications of current user
//  *      tags:
//  *      - Application
//  *      responses:
//  *              200:
//  *                  description: success
//  */
// router.get("/", middleware.verifyToken, catchAsync(applicationController.getMyApplication));

/**
 * @openapi
 * /job/{jobId}/application:
 *  post:
 *      summary: create an application
 *      description: for jobseeker create an application for job
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
router.post("/", middleware.verifyToken, validateCreateApplication, middleware.isJobSeeker, catchAsync(applicationController.createApplication));

/**
 * @openapi
 * /job/{jobId}/application/{applicationId}:
 *  put:
 *      summary: update application status for employer
 *      description: for employer update application status of applicationId
 *      tags:
 *      - Application
 *      parameters:
 *       - in: path
 *         name: jobId
 *         type: string
 *         required: true
 *       - in: path
 *         name: applicationId
 *         type: string
 *         required: true
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          status:
 *                             example: "Accepted"
 *      responses:
 *              200:
 *                  description: success
 */
router.put("/", middleware.verifyToken, catchAsync(applicationController.updateStatus));

/**
 * @openapi
 * /job/{jobId}/application:
 *  get:
 *      summary: get application of job for employer
 *      description: get application of job for employer
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
router.get("/", middleware.verifyToken, catchAsync(applicationController.getApplicationOfJob));

module.exports = router;
