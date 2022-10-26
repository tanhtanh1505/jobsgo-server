const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const HttpException = require("./utils/HttpException");
const cookieParser = require("cookie-parser");
const socket = require("./socket/index");
const userRoutes = require("./routes/user");
const jobsRoutes = require("./routes/jobdescription");
const employerRouter = require("./routes/employer");
const swagger = require("./utils/swagger");

const setup = require("./setup/index");

let port = process.env.PORT || 5000;

dotenv.config();
const app = express();
const server = http.createServer(app);

setup.run();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

socket.listen(server);

app.use("/", userRoutes);
app.use("/jobs", jobsRoutes);
app.use("/employer", employerRouter);

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
