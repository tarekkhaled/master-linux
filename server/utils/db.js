const mongoose = require("mongoose");
const Logger = require("./logger");
const logger = new Logger("Database Connection");
const connect = (mongodbURL, port) => {
  try {
    mongoose
      .connect(mongodbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      })
      .then(() =>
        logger.debug(`Connected successfully to mongoDB on port ${port}`)
      );
  } catch (e) {
    logger.error(`Couldn't connected to mongodb due to ${e}`);
  }
};

module.exports = connect;
