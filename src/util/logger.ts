import appRoot from 'app-root-path';
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  transports: [
    new transports.File({
      level: 'info',
      filename: `${appRoot}/logs/combined.log`,
      maxsize: 5242880,
      maxFiles: 5,
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      level: 'error',
      filename: `${appRoot}/logs/errors.log`,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5,
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp(),
        format.errors({ stack: true }),
        format.printf(
          (info) => `${info.timestamp} [${info.level}]: ${info.message}`,
        ),
      ),
    }),
  ],
  exitOnError: false,
});
