module.exports.listen = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
  });

  console.log(`Socket is listening`);

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("joinRoom", async (roomId) => {
      if (roomId) await socket.join(roomId);
    });

    socket.on("sendMessage", (roomId, message) => {
      if (roomId) io.sockets.in(roomId).emit("receiveMessage", message);
    });

    socket.on("disconnect", async (roomId) => {
      if (roomId) {
        await socket.leave(roomId);
      }
    });
  });
};
