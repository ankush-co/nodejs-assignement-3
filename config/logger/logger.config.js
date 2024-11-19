const { createLogger, format, transports } = require("winston");

const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({
          all: true,
        }),
        format.printf((info) => {
          return `${dateFormat()} | ${info.level} | ${info.message}`;
        })
      ),
    }),
    new transports.File({
      filename: "./logs/console.log",
      format: format.combine(
        format.timestamp({
          format: dateFormat,
        }),
        format.json()
      ),
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "./logs/exceptions.log",
      format: format.combine(
        format.timestamp({
          format: dateFormat,
        }),
        format.json()
      ),
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: "./logs/rejections.log",
      format: format.combine(
        format.timestamp({
          format: dateFormat,
        }),
        format.json()
      ),
    }),
  ],
});

module.exports = logger;
