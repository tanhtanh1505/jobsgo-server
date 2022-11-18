const cvController = require("../controllers/cv");
const router = require("express").Router();
const catchAsync = require("../utils/catchAsync");
const middleware = require("../middlewares/jwt");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

/**
 * @openapi
 * /cv-manager/create:
 *  post:
 *      summary: Create CV
 *      tags:
 *      - Cv
 *      requestBody:
 *          require: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          file:
 *                              type: string
 *                              format: binary
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/create", upload.single("file"), catchAsync(cvController.create));

/**
 * @openapi
 * /cv-manager/generate:
 *  post:
 *      summary: Generate CV
 *      tags:
 *      - Cv
 *      requestBody:
 *          require: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          cv:
 *                              example: {}
 *      responses:
 *              200:
 *                  description: success
 */
router.post("/generate", catchAsync(cvController.generatePdf));

module.exports = router;
