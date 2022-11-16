let PDF = require("handlebars-pdf");
var fs = require("fs");
var path = process.cwd();
var buffer = fs.readFileSync("./cv.hbs");

const DUMMYCV = {
  id: "1",
  name: "Cv's Name",
  nameUser: "Job",
  birthday: "2009-02-02",
  phone: "0123456789",
  email: "hiepxxxxxx@gmail.com",
  website: "none",
  address: "109xxxxxx",
  sex: "male",
  experience: [
    {
      company: "Google",
      startDate: "2000-10-10",
      endDate: "2000-10-10",
      position: "Manager",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt eget nullam non nisi est sit amet facilisis. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant.",
    },
    {
      company: "Google",
      startDate: "2020-10-10",
      endDate: "2000-10-10",
      position: "manager",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt eget nullam non nisi est sit amet facilisis. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant.",
    },
  ],
  activities: [
    {
      organization: "Hiepdx",
      startDate: "2020-10-10",
      endDate: "2020-10-10",
      position: "manager",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt eget nullam non nisi est sit amet facilisis. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant.",
    },
  ],
  education: [
    {
      school: "Hiepdx",
      startDate: "2020-10-10",
      endDate: "2020-10-10",
      position: "manager",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt eget nullam non nisi est sit amet facilisis. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant.",
    },
  ],
  skills: [
    {
      skill: "design",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt eget nullam non nisi est sit amet facilisis. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant.",
    },
    {
      skill: "cloud",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt eget nullam non nisi est sit amet facilisis. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant.",
    },
  ],
};

let document = {
  template: buffer.toString(),
  context: { cv: DUMMYCV },
  path: "./test-" + Math.random() + ".pdf",
};

PDF.create(document)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });
