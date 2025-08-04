import { io } from "socket.io-client";
let socket = null;
export const connectSocket = (userId) => {
  if (!userId) {
    console.warn("No userId provided for socket connection.");
    return null;
  }
  socket = io(
    import.meta.env.MODE === "development" ? "http://localhost:3000" : "/",
    {
      query: { userId },
    }
  );
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("Socket disconnected");
    socket = null;
  } else {
    console.log("Socket is not connected");
  }
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket is not connected. Please connect first.");
  }
  return socket;
};
