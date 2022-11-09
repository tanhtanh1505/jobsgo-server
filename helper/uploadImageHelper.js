require("dotenv").config();
const AWS = require("aws-sdk");
const fs = require("fs");
const { getRandomKey } = require("./getRandomKey");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRETKEY,
});

module.exports.uploadFileToS3 = async (req, res) => {
  const file = req.file;
  const { path, mimetype } = file;
  var folder = "/files";
  if (mimetype.startsWith("image/")) {
    folder = "/images";
  }
  const params = {
    Bucket: `${process.env.AWS_BUCKET_NAME}${folder}`,
    Key: getRandomKey(),
    Body: fs.createReadStream(path),
    ContentType: mimetype,
  };
  s3.upload(params, (error, data) => {
    if (error) {
      fs.unlinkSync(path);
      return res.status(500).send(error);
    }
    fs.unlinkSync(path);
    res.status(200).send(data.Location);
  });
};
