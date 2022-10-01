import { LogLevel } from '@nestjs/common';

export interface LoggerConfigInterface {
  logLevel: LogLevel[];
  transportLogLevel?: LogLevel[];
}
