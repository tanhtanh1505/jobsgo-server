const { uploadFile } = require("../helper/uploadImageHelper");
const { createPDF } = require("../helper/saveToPdf");
//save file to s3
module.exports.create = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }
  const url = await uploadFile(file);
  return res.status(200).send(url);
};

module.exports.generatePdf = async (req, res) => {
  const { cv } = req.body;
  const url = await createPDF({ cv: cv });
  res.send(url);
};
