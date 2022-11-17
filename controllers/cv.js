const { uploadFile } = require("../helper/uploadImageHelper");
const { createPDF } = require("../helper/saveToPdf");
//save file to s3
module.exports.create = async (req, res) => {
  const avatar = req.file;
  const { title, description } = req.body;

  if (!avatar) {
    return res.status(400).send("No avatar uploaded");
  }
  // const url = await uploadFile(avatar);
  // console.log(`File uploaded to ${url}`);
  console.log(title, description);
  return res.status(200).send(url);
};

module.exports.generatePdf = async (req, res) => {
  const { cv } = req.body;
  const url = await createPDF({ cv: cv });
  res.send(url);
};
