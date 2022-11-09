const JobModel = require("../models/job");
const UserModel = require("../models/user");
const JobseekerModel = require("../models/jobseeker");
const { v4: uuidv4 } = require("uuid");
const Role = require("../constants/user");
const bcrypt = require("bcryptjs");
const mailService = require("../services/mail");

module.exports.register = async (req, res) => {
  const {
    username,
    name,
    password,
    email,
    phone,
    avatar,
    address,
    age,
    gender,
    experience,
    advanedSkill,
    salary,
    workplace,
    cv,
    careerFeild,
    typeOfJob,
  } = req.body;
  const id = uuidv4();
  var user = await UserModel.findOne({ username });
  if (user) {
    return res.status(409).send("Username already in use");
  }
  user = await UserModel.findOne({ email });
  if (user) {
    return res.status(409).send("Email already in use");
  }
  user = await UserModel.findOne({ phone });
  if (user) {
    return res.status(409).send("Phone already in use");
  }
  const hashedpassword = await bcrypt.hash(password, 8);
  const newUser = await UserModel.create({
    id,
    username,
    password: hashedpassword,
    name,
    email,
    phone,
    role: Role.JobSeeker,
    avatar,
    address,
  });
  if (newUser) {
    const newJobseeker = await JobseekerModel.create({
      id: id,
      age: age,
      gender: gender,
      experience: experience,
      advanedSkill: advanedSkill,
      salary: salary,
      workplace: workplace,
      cv: cv,
      careerFeild: careerFeild,
      typeOfJob: typeOfJob,
    });
    if (newJobseeker) {
      return res.status(200).send("Jobseeker registered successfully");
    }
    return res.status(500).send("Error registering Jobseeker");
  }
  return res.status(500).send("Error registering Jobseeker and user");
};

//edit profile
module.exports.updateProfile = async (req, res) => {
  const { age, gender, experience, advanedSkill, salary, workplace, cv, careerFeild, typeOfJob } = req.body;
  const jobseeker = await JobseekerModel.findOne({ id: req.user.id });
  if (!jobseeker) {
    return res.status(409).send("Jobseeker not found");
  }
  const newJobseeker = await JobseekerModel.update(
    {
      age,
      gender,
      experience,
      advanedSkill,
      salary,
      workplace,
      cv,
      careerFeild,
      typeOfJob,
    },
    req.user.id
  );
  if (newJobseeker) {
    const url = `${process.env.CLIENT_URL}`;

    const mailOptions = {
      from: "service@tanhuet.com",
      to: email,
      subject: "Welcome to Working On Paradise",
      html: `
        <h1>Hi ${name}</h1>
        <p>Welcome to <a href=${url}>Work On Paradise</a></p>
        <p>Wish you have an amazing experience with us </p>
        </br>

        <p>Thank you</p>
      `,
    };

    mailService.sendMail(mailOptions);

    return res.status(200).send("Jobseeker edited successfully");
  }
  return res.status(500).send("Error editing Jobseeker");
};

module.exports.getCurrentJobseeker = async (req, res) => {
  return res.status(200).send(await getJobseekerWithoutPassword(req.user.id));
};

//get Jobseeker by id
module.exports.getJobseekerById = async (req, res) => {
  return res.status(200).send(await getJobseekerWithoutPassword(req.params.id));
};

getJobseekerWithoutPassword = async (id) => {
  const jobseeker = await JobseekerModel.findOne({ id: id });
  if (!jobseeker) {
    return null;
  }
  const { password, ...jobseekerWithoutPassword } = jobseeker;
  return jobseekerWithoutPassword;
};
