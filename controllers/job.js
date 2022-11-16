const UserModel = require("../models/user");
const EmployerModel = require("../models/employer");
const BookmarkModel = require("../models/bookmark");
const JobModel = require("../models/job");
const HttpException = require("../utils/HttpException");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const sheets = require("../utils/sheets/index");
class JobController {
  getAll = async (req, res) => {
    let listJob = await JobModel.find();
    var resListJob = [];
    for (let job of listJob) {
      var tempJob = job;

      // get name author
      const author = await EmployerModel.findOne({ id: job.author });
      tempJob.authorName = author.name;
      tempJob.authorAddress = author.address;
      tempJob.authorEmail = author.email;
      tempJob.authorPhone = author.phone;
      tempJob.authorAvatar = author.avatar;
      tempJob.authorAbout = author.about;
      tempJob.authorSize = author.size;
      resListJob.push(tempJob);
    }
    res.send(resListJob);
  };

  getOneSuggestion = async (req, res) => {
    const listJob = await JobModel.findLimit({}, 1);
    var resListJob = [];
    for (let job of listJob) {
      var tempJob = job;

      // get name author
      const author = await EmployerModel.findOne({ id: job.author });
      tempJob.authorName = author.name;
      tempJob.authorAddress = author.address;
      tempJob.authorEmail = author.email;
      tempJob.authorPhone = author.phone;
      tempJob.authorAvatar = author.avatar;
      tempJob.authorAbout = author.about;
      tempJob.authorSize = author.size;
      resListJob.push(tempJob);
    }
    res.send(resListJob);
  };

  getListSuggestion = async (req, res) => {
    const { number } = req.params;
    const listJob = await JobModel.findLimit({}, number);
    var resListJob = [];
    for (let job of listJob) {
      // get bookmark
      var tempJob = job;
      const bookmark = await BookmarkModel.findOne({ jobId: job.id, jobseekerId: req.user.id });
      if (bookmark) {
        tempJob.bookmark = true;
      } else {
        tempJob.bookmark = false;
      }
      // get name author
      const author = await EmployerModel.findOne({ id: job.author });
      tempJob.authorName = author.name;
      tempJob.authorAddress = author.address;
      tempJob.authorEmail = author.email;
      tempJob.authorPhone = author.phone;
      tempJob.authorAvatar = author.avatar;
      tempJob.authorAbout = author.about;
      tempJob.authorSize = author.size;
      resListJob.push(tempJob);
    }
    res.send(resListJob);
  };

  getPageSuggestion = async (req, res) => {
    const { jobPerPage, pageNumber } = req.params;
    const listJob = await JobModel.findLimitOffset({}, jobPerPage, (pageNumber - 1) * jobPerPage);
    var resListJob = [];
    for (let job of listJob) {
      // get bookmark
      var tempJob = job;
      if (req.user) {
        const bookmark = await BookmarkModel.findOne({ jobId: job.id, jobseekerId: req.user.id });
        if (bookmark) {
          tempJob.bookmark = true;
        } else {
          tempJob.bookmark = false;
        }
      }
      // get name author
      const author = await EmployerModel.findOne({ id: job.author });
      tempJob.authorName = author.name;
      tempJob.authorAddress = author.address;
      tempJob.authorEmail = author.email;
      tempJob.authorPhone = author.phone;
      tempJob.authorAvatar = author.avatar;
      tempJob.authorAbout = author.about;
      tempJob.authorSize = author.size;
      resListJob.push(tempJob);
    }
    res.send(resListJob);
  };

  getById = async (req, res) => {
    const job = await JobModel.findOne({ id: req.params.jobId });
    if (!job) {
      throw new HttpException(404, "Job not found");
    }
    var tempJob = job;
    if (req.user) {
      const bookmark = await BookmarkModel.findOne({ jobId: job.id, jobseekerId: req.user.id });
      if (bookmark) {
        tempJob.bookmark = true;
      } else {
        tempJob.bookmark = false;
      }
    }
    // get name author
    const author = await EmployerModel.findOne({ id: job.author });
    tempJob.authorName = author.name;
    tempJob.authorAddress = author.address;
    tempJob.authorEmail = author.email;
    tempJob.authorPhone = author.phone;
    tempJob.authorAvatar = author.avatar;
    tempJob.authorAbout = author.about;
    tempJob.authorSize = author.size;

    res.send(tempJob);
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

  //get list marked
  listMarked = async (req, res) => {
    let listJob = await JobModel.find();
    var resListJob = [];
    for (let job of listJob) {
      var tempJob = job;
      const bookmark = await BookmarkModel.findOne({ jobId: job.id, jobseekerId: req.user.id });
      if (bookmark) {
        tempJob.bookmark = true;
        const author = await EmployerModel.findOne({ id: job.author });
        tempJob.authorName = author.name;
        tempJob.authorAddress = author.address;
        tempJob.authorEmail = author.email;
        tempJob.authorPhone = author.phone;
        tempJob.authorAvatar = author.avatar;
        tempJob.authorAbout = author.about;
        tempJob.authorSize = author.size;
        resListJob.push(tempJob);
      } else {
        tempJob.bookmark = false;
      }
    }
    res.send(resListJob);
  };

  isMarked = async (req, res) => {
    const { jobId } = req.params;
    const { id } = req.user;
    const user = await UserModel.findOne({ id });
    if (!user) {
      throw new HttpException(404, "User not found");
    }
    const bookmark = await BookmarkModel.findOne({ jobId, jobseekerId: user.id });

    if (!bookmark) {
      res.send(false);
    } else {
      res.send(true);
    }
  };

  createMark = async (req, res) => {
    const result = await BookmarkModel.create(req.user.id, req.params.jobId);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.send("Bookmark was created!");
  };

  deleteMark = async (req, res) => {
    const result = await BookmarkModel.delete(req.user.id, req.params.jobId);
    if (!result) {
      throw new HttpException(404, "Bookmark not found");
    }

    res.send("Bookmark has been deleted");
  };
}

module.exports = new JobController();
