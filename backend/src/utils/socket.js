const { Server } = require("socket.io");
const userSocketMap = {}; //Stores:{userId: socketId}
let io;
const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(" A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    console.log("User ID from socket connection:", userId);

    if (!userId) {
      socket.disconnect();
      console.error("User ID is required for socket connection.");
      return;
    }
    userSocketMap[userId] = socket.id;
    console.log("User socket map:", Object.keys(userSocketMap));

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      if (userId) {
        delete userSocketMap[userId];
      }
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

module.exports = {
  initSocket,
  getReceiverSocketId,
  io,
};
