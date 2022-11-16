const { uploadFile } = require("../helper/uploadImageHelper");

//save file to s3
module.exports.create = async (req, res) => {
  const avatar = req.file;
  if (!avatar) {
    return res.status(400).send("No avatar uploaded");
  }
  const url = await uploadFile(avatar);
  console.log(`File uploaded to ${url}`);
  return res.status(200).send(url);
};
