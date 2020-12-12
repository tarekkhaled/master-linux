// External imports
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// Internal imports
const Logger = require("../utils/logger");
const connectDb = require("../utils/db");
const {
  // searchImage,
  loginUser,
  signupUser,
  checkImage,
  permissionAllowed,
  logoutUser
} = require("../utils/controllers");

// const {
//     uploadImage,
//     addImageTag,
//     deleteImage
// } = require("./images");

// configuration app
process.env.NODE_ENV !== "production" && dotenv.config();
const logger = new Logger("Starting Server(app.js)");
const port = process.env.PORT || 3800;
const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.disable("x-powered-by");
app.use("/api", permissionAllowed);

// Routes
app.use("/auth/login", loginUser);
app.use("/auth/signup", signupUser);
app.use("/auth/logout",logoutUser);
// app.use("/api/images/upload", checkImage, uploadImage);
// app.use("/api/images/tags", addImageTag);
// app.use("/api/images/:id", deleteImage);
// app.use("/search", searchImage);

const startServer = async () => {
  try {
    await connectDb(process.env.DATABASE);
    app.listen(port, () => {
      logger.debug(`App is starting listening to port ${port}`);
    });
  } catch (e) {
    logger.error(`Couldn't starting the server due to ${e}`);
  }
};

module.exports = startServer;
