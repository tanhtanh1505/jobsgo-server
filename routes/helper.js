const router = require("express").Router();
const { uploadFileToS3 } = require("../helper/uploadImageHelper");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const catchAsync = require("../utils/catchAsync");

router.post("/upload", upload.single("file"), catchAsync(uploadFileToS3));

module.exports = router;
