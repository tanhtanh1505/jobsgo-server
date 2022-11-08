const UserModel = require("../models/user");
const JobModel = require("../models/job");
const HttpException = require("../utils/HttpException");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const sheets = require("../utils/sheets/index");
class JobController {
  getAll = async (req, res) => {
    let list = await JobModel.find();
    res.send(list);
  };

  getById = async (req, res) => {
    const job = await JobModel.findOne({ id: req.params.jobId });
    if (!job) {
      throw new HttpException(404, "Job not found");
    }
    res.send(job);
  };

  getMyJob = async (req, res) => {
    let listJobs = await JobModel.find({ author: req.user.id });

    res.send(listJobs);
  };

  create = async (req, res) => {
    const { title, description, requirements, tags, startTime, endTime, salary, typeOfWorking, gender, positions, slots, exp, benefits, imageUrl } =
      req.body;
    const newJobId = uuidv4();
    const result = await JobModel.create({
      id: newJobId,
      title,
      description,
      requirements,
      tags,
      author: req.user.id,
      startTime,
      endTime,
      salary,
      typeOfWorking,
      gender,
      positions,
      slots,
      exp,
      benefits,
      imageUrl,
    });

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Jobs was created!");
  };

  update = async (req, res) => {
    const result = await JobModel.update(req.body, req.params.jobId);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? "Job not found" : affectedRows && changedRows ? "Job updated successfully" : "Updated faild";

    res.send({ message, info });
  };

  delete = async (req, res) => {
    const result = await JobModel.delete(req.params.jobId);
    if (!result) {
      throw new HttpException(404, "Job not found");
    }
    res.send("Job has been deleted");
  };

  //import from google sheet
  import = async (req, res) => {
    const sheetName = "Data";
    const { sheetId } = req.body;
    const client = await sheets.authorize();
    const values = [
      [
        "title",
        "description",
        "requirements",
        "tags",
        "startTime",
        "endTime",
        "salary",
        "typeOfWorking",
        "gender",
        "positions",
        "slots",
        "exp",
        "benefits",
        "imageUrl",
      ],
    ];
    const listOfSheet = await sheets.getListOfSheets(client, sheetId);

    console.log(listOfSheet);
    if (Array.from(listOfSheet).indexOf(sheetName) == -1) {
      await sheets.createSheet(client, sheetId, sheetName);
    }
    const data = await sheets.getValues(client, sheetId, sheetName);
    console.log(data);

    if (!data || data.length <= 0) {
      await sheets.updateValues(client, sheetId, sheetName, values);
    } else {
      //validate format
      for (let i = 0; i < data[0].length; i++) {
        if (data[0][i] != values[0][i]) {
          throw new HttpException(400, "Sheet format is not correct");
        }
      }

      //import data
      for (let i = 1; i < data.length; i++) {
        const newJobId = uuidv4();
        const result = await JobModel.create({
          id: newJobId,
          title: data[i][0],
          description: data[i][1],
          requirements: data[i][2],
          tags: data[i][3],
          author: req.user.id,
          startTime: data[i][4],
          endTime: data[i][5],
          salary: data[i][6],
          typeOfWorking: data[i][7],
          gender: data[i][8],
          positions: data[i][9],
          slots: data[i][10],
          exp: data[i][11],
          benefits: data[i][12],
          imageUrl: data[i][13],
        });

        if (!result) {
          throw new HttpException(500, "Something went wrong");
        }
      }
    }
    res.send("Import success");
  };
}

module.exports = new JobController();
