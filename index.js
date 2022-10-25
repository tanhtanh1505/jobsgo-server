const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const HttpException = require("./utils/HttpException");
const redis = require("redis");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");

const setup = require("./setup/index");

dotenv.config();
const app = express();
const server = http.createServer(app);

setup.run();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// const socketIo = require("socket.io")(server, {
//   cors: {
//     origin: "*",
//   },
// });

// socketIo.on("connection", (socket) => {
//   let onlineUser = "";

//   socket.on("join", (username) => {
//     console.log("Connected", socket.id);
//     onlineUser = username;
//     client.set(username, socket.id);
//   });
//   socket.on("sendNewMessage", (message) => {
//     client
//       .get(message.recieverId)
//       .then((data) => {
//         socketIo.to(`${data}`).emit("getMessage", JSON.stringify(message));
//       })
//       .catch((err) => console.log(err));
//   });

//   socket.on("disconnect", () => {
//     client.del(onlineUser);
//     console.log("Client disconnected");
//   });
// });

app.use("/", userRoutes);
app.get("/", (req, res) => {
  res.status(200).end("hi");
});

app.all("*", (req, res, next) => {
  next(new HttpException(404, "Page not found :("));
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Loi rui" } = err;
  res.status(status).end(message);
});

let port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running in ${port}`);
});
