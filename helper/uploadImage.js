const dotenv = require("dotenv");
dotenv.config();
const AWS = require("aws-sdk");
const { getRandomKey } = require("./getRandomKey");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRETKEY,
});

// var uploadParams = { Bucket: process.env.S3_BUCKET_NAME, Key: getRandomKey(), Body: "", ContentType: "image/png" };
// var file = "test.jpg";

// // Configure the file stream and obtain the upload parameters
// var fs = require("fs");
// var fileStream = fs.createReadStream(file);
// fileStream.on("error", function (err) {
//   console.log("File Error", err);
// });
// uploadParams.Body = fileStream;

// // call S3 to retrieve upload file to specified bucket
// s3.upload(uploadParams, function (err, data) {
//   if (err) {
//     console.log(process.env.AWS_ACCESSKEY_ID);
//     console.log("Error", err);
//   }
//   if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });

function promiseUpload(params) {
  return new Promise(function (resolve, reject) {
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports.upload = async (imageName, base64Image, type) => {
  const params = {
    Bucket: `${process.env.S3_BUCKET_NAME}/images`,
    Key: imageName,
    Body: new Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ""), "base64"),
    ContentType: type,
  };

  let data;

  try {
    data = await promiseUpload(params);
  } catch (err) {
    console.error(err);

    return "";
  }

  return data.Location;
};
