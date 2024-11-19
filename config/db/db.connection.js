const { default: mongoose } = require("mongoose");
const logger = require("../logger/logger.config");

const mongoConnect = new Promise(async (resolve, reject) => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    resolve();
  } catch (error) {
    logger.error(`${error.message}`);
    reject();
  }
});

const mongoDisconnect = () => {
  mongoose.connection.close();
  logger.info("Mongo connection terminated");
};

module.exports = { mongoConnect, mongoDisconnect };
