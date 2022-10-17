import { registerAs } from '@nestjs/config';
import { LogLevel } from '@nestjs/common';
import { LoggerConfigInterface } from '../modules/logger/interfaces';

export const loggerConfig = registerAs(
  'LOGGER_MODULE_CONFIG',
  (): LoggerConfigInterface => ({
    logLevel: process.env?.LOG_LEVEL
      ? splitLogLevel(process.env.LOG_LEVEL)
      : ['error'],
    transportLogLevel: process.env?.TRANSPORT_LOG_LEVEL
      ? splitLogLevel(process.env.TRANSPORT_LOG_LEVEL)
      : ['error'],
  })
);

/**
 * Helper to split log level string and assign to correct log level type.
 *
 * @param levels
 */
function splitLogLevel(levels: string): LogLevel[] {
  // get raw strings
  const levelTypes: string[] = levels.split(',');
  // map all to log level enum
  return levelTypes.map(levelType => {
    return levelType.trim() as LogLevel;
  });
}
