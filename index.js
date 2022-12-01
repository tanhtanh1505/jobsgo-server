const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const HttpException = require("./utils/HttpException");
const cookieParser = require("cookie-parser");
const socket = require("./socket/index");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const jobsRoutes = require("./routes/job");
const commentRoutes = require("./routes/comment");
const educationRoutes = require("./routes/education");
const employerRouter = require("./routes/employer");
const jobseekerRouter = require("./routes/jobseeker");
const applicationRouter = require("./routes/application");
const helperRouter = require("./routes/helper");
const chatRouter = require("./routes/chat");
const cvRouter = require("./routes/cv");
const swagger = require("./utils/swagger");

const setup = require("./setup/index");

let port = process.env.PORT || 5000;

dotenv.config();
const app = express();
const server = http.createServer(app);

if (process.env.USE_REDIS == true) {
  setup.run();
}

// app.use(cors());
app.use(function (req, res, next) {
  const corsWhitelist = ["https://woparadise.tech", "http://localhost:3000", "https://jobsgo-3d607.web.app"];

  const origin = req.headers.origin;
  if (corsWhitelist.indexOf(origin) > -1) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use(cookieParser());
app.use(express.json());

socket.listen(server);

app.use("/", authRoutes);
app.use("/user", userRoutes);
app.use("/jobseeker", jobseekerRouter);
app.use("/employer", employerRouter);
app.use("/comments", commentRoutes);
app.use("/job", jobsRoutes);
app.use("/application", applicationRouter);
app.use("/education", educationRoutes);
app.use("/chat", chatRouter);
app.use("/cv", cvRouter);
app.use("/helper", helperRouter);

app.get("/", (req, res) => {
  res.status(200).end("hi");
});

swagger.swaggerDocs(app, port);

app.all("*", (req, res, next) => {
  next(new HttpException(404, "Page not found :("));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Loi rui" } = err;
  res.status(status).end(message);
});

server.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
