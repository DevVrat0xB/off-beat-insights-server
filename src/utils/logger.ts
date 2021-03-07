import { createLogger, transports, format } from "winston";

// log configurations.
const logConfiguration = {
  // DIFFERENT LOG DESTINATION(S)
  transports: [
    // Console log structure.
    new transports.Console({
      level: "debug",
      format: format.combine(
        format.timestamp({ format: "DD MMM,YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (log) => `[${log.level}] (${[log.timestamp]})${log.message}`
        )
      ),
    }),

    // File(s) log structure.
    new transports.File({
      level: "verbose",
      filename: "logs/all.log", // Contains logs of verbose and higher priority.
      format: format.combine(
        format.timestamp({ format: "DD MMM,YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (log) => `[${log.level}] (${[log.timestamp]})${log.message}`
        )
      ),
    }),
    new transports.File({
      level: "error",
      filename: "logs/errors.log", // Contains logs of error and higher priority.
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: "DD MMM,YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (log) => `[${log.level}] (${[log.timestamp]})${log.message}`
        )
      ),
    }),
  ],
};

// Instantiating Winston Logger.
const logger = createLogger(logConfiguration);
logger.info("Winston has started logging");

export default logger;
