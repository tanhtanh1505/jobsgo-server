const router = require("express").Router();
const { uploadFileToS3 } = require("../helper/uploadImageHelper");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const catchAsync = require("../utils/catchAsync");

/**
 * @openapi
 * /helper/upload:
 *  post:
 *      summary: Upload image to S3
 *      tags:
 *      - Helper
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
router.post("/upload", upload.single("file"), catchAsync(uploadFileToS3));

module.exports = router;
