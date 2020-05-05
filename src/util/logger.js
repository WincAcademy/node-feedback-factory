const { createLogger, transports, format } = require("winston");
const { combine, timestamp, colorize, printf } = format;

const logger = createLogger({
  format: format.json(),
  transports: [
    new transports.File({filename: "temp/logs/error.log", level: "error"}),
    new transports.File({filename: "temp/logs/combined.log"})
  ]
});

const consoleTransporter = new transports.Console({
  format: combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp, ...extra }) => {
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(extra).length ? JSON.stringify(extra, null, 2) : ''
      }`;
    })
  ),
});

if (process.env.NODE_ENV !== "production") {
  logger.add(consoleTransporter);
}

module.exports = logger;
