const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookie = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/authroutes");
const messageRoutes = require("./routes/messageroutes");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const { initSocket } = require("./utils/socket");

dotenv.config();
const app = express();
app.use(express.static("public"));
const server = http.createServer(app);

initSocket(server);

app.use(express.json());
app.use(cookie());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./temp/",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log("message", err));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("Server is running at 3000");
});
