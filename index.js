require("dotenv").config();
const express = require("express");
const logger = require("./config/logger/logger.config");
const authRouter = require("./routes/auth.router");
const { mongoConnect, mongoDisconnect } = require("./config/db/db.connection");

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

mongoConnect.then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
});

process.on("SIGINT", function () {
  mongoDisconnect();
  process.exit(0);
});

module.exports = app;
