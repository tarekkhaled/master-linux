const mongoose = require("mongoose");
const Logger = require("./logger");
const logger = new Logger("Database Connection");
const connect = async (mongodbURL, port) => {
  try {
    await mongoose.connect(mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    logger.debug(`Connected successfully to mongoDB on port ${port}`);
  } catch (e) {
    logger.error(`Couldn't connected to mongodb due to ${e}`);
  }
};

module.exports = connect;
