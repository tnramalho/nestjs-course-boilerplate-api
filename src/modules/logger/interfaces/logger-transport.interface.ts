import { LogLevel } from '@nestjs/common';

export interface LoggerTransportInterface {
  log(message: string, logLevel: LogLevel, error?: Error): void;
}
